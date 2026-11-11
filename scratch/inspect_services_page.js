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
  console.log('Starting headless Chrome...');
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--window-size=1440,900',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await sleep(2500);

  const targets = await getJson('http://127.0.0.1:9224/json/list');
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

  console.log('Navigating to https://dossier.framer.website/services...');
  await sendCommand('Page.navigate', { url: 'https://dossier.framer.website/services' });
  await sleep(4000);

  // Inspect page details
  const evalRes = await sendCommand('Runtime.evaluate', {
    expression: `(() => {
      // 1. Videos
      const videos = Array.from(document.querySelectorAll('video')).map(v => ({
        src: v.src || (v.querySelector('source') ? v.querySelector('source').src : ''),
        poster: v.poster,
        autoplay: v.autoplay,
        loop: v.loop,
        muted: v.muted,
        playsInline: v.playsInline,
        rect: v.getBoundingClientRect(),
        style: {
          width: window.getComputedStyle(v).width,
          height: window.getComputedStyle(v).height,
          objectFit: window.getComputedStyle(v).objectFit,
          borderRadius: window.getComputedStyle(v).borderRadius,
          position: window.getComputedStyle(v).position,
        }
      }));

      // 2. Sections and Headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, p, [data-framer-name]')).map(el => {
        const text = el.innerText ? el.innerText.trim() : '';
        if (!text || text.length > 200) return null;
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          framerName: el.getAttribute('data-framer-name'),
          text: text.slice(0, 100),
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          rect: el.getBoundingClientRect()
        };
      }).filter(Boolean);

      // 3. Structure
      const mainChildren = Array.from(document.querySelectorAll('#main > *, [data-framer-component-type="Stack"]')).map(el => {
        return {
          framerName: el.getAttribute('data-framer-name'),
          className: el.className,
          textSample: (el.innerText || '').slice(0, 150).replace(/\\s+/g, ' '),
          rect: el.getBoundingClientRect(),
        };
      });

      // 4. Background and colors
      return {
        title: document.title,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        videos,
        headings: headings.slice(0, 50),
        mainChildren: mainChildren.slice(0, 30)
      };
    })()`,
    returnByValue: true
  });

  console.log('Result extracted!');
  fs.writeFileSync(path.resolve(__dirname, 'services_spec.json'), JSON.stringify(evalRes.result.value, null, 2));

  // Take full desktop screenshot
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(1000);
  const shot1440 = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\services_1440.png', Buffer.from(shot1440.data, 'base64'));

  // Tablet screenshot
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 982,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(1000);
  const shot982 = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\services_982.png', Buffer.from(shot982.data, 'base64'));

  // Mobile screenshot
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await sleep(1000);
  const shot390 = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\services_390.png', Buffer.from(shot390.data, 'base64'));

  console.log('Screenshots saved!');
  try {
    chromeProcess.kill();
  } catch (e) {}
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
