const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--window-size=1440,1200',
    'about:blank'
  ]);

  await sleep(2500);

  const targets = await getJson('http://127.0.0.1:9225/json/list');
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(resolve => ws.onopen = resolve);
  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');

  await sendCommand('Page.navigate', { url: 'https://dossier.framer.website/services' });
  await sleep(5000);

  // Scroll down to trigger all scroll animations and number counters
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo(0, document.body.scrollHeight / 3);`
  });
  await sleep(2000);
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo(0, (document.body.scrollHeight * 2) / 3);`
  });
  await sleep(2000);
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo(0, document.body.scrollHeight);`
  });
  await sleep(2000);

  const evalRes = await sendCommand('Runtime.evaluate', {
    expression: `(() => {
      // Find all videos, sources, iframes
      const videoElements = Array.from(document.querySelectorAll('video, iframe')).map(v => ({
        tag: v.tagName,
        src: v.src,
        currentSrc: v.currentSrc,
        sources: Array.from(v.querySelectorAll('source')).map(s => s.src),
        poster: v.poster,
        className: v.className,
        parentHtml: v.parentElement ? v.parentElement.outerHTML.slice(0, 300) : ''
      }));

      // Find background videos or media
      const allMedia = Array.from(document.querySelectorAll('[data-framer-name]')).map(el => {
        const name = el.getAttribute('data-framer-name');
        const bg = window.getComputedStyle(el).backgroundImage;
        return { name, bg: bg !== 'none' ? bg : undefined, className: el.className };
      }).filter(x => x.bg);

      // Find stat cards content
      const statCards = Array.from(document.querySelectorAll('[data-framer-name*="Stat"], [data-framer-name*="Card"], [data-framer-name*="Metric"]')).map(el => ({
        name: el.getAttribute('data-framer-name'),
        text: (el.innerText || '').replace(/\\s+/g, ' ').trim(),
        rect: el.getBoundingClientRect(),
        style: {
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          borderRadius: window.getComputedStyle(el).borderRadius,
          padding: window.getComputedStyle(el).padding,
          height: window.getComputedStyle(el).height,
        }
      }));

      // Find Explore section content
      const exploreSection = Array.from(document.querySelectorAll('[data-framer-name*="Explore"], [data-framer-name*="Work"]')).map(el => ({
        name: el.getAttribute('data-framer-name'),
        text: (el.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 300),
        rect: el.getBoundingClientRect()
      }));

      // Entire page text structure
      const sections = Array.from(document.querySelectorAll('section, header, footer, [data-framer-name]')).map(s => {
        const name = s.getAttribute('data-framer-name') || s.tagName;
        const text = (s.innerText || '').replace(/\\s+/g, ' ').trim();
        return { name, tag: s.tagName, length: text.length, snippet: text.slice(0, 120) };
      }).filter(s => s.length > 10 && s.length < 500);

      return {
        videoElements,
        allMedia,
        statCards: statCards.slice(0, 20),
        exploreSection: exploreSection.slice(0, 15),
        sections: sections.slice(0, 40)
      };
    })()`,
    returnByValue: true
  });

  fs.writeFileSync(path.resolve(__dirname, 'services_detail.json'), JSON.stringify(evalRes.result.value, null, 2));
  console.log('Detail saved to services_detail.json');

  // Let's capture another screenshot after scroll to see if Explore has items!
  const shotAfterScroll = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\services_after_scroll.png', Buffer.from(shotAfterScroll.data, 'base64'));

  try {
    chromeProcess.kill();
  } catch(e) {}
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
