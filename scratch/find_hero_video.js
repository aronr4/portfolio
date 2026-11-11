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
    '--remote-debugging-port=9226',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);

  const targets = await getJson('http://127.0.0.1:9226/json/list');
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
  await sleep(4000);

  const evalRes = await sendCommand('Runtime.evaluate', {
    expression: `(() => {
      // Find the hero container
      const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('header');
      if (!hero) return { error: 'No hero found' };

      // Look at all elements inside hero
      const allInside = Array.from(hero.querySelectorAll('*')).map(el => {
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          className: el.className,
          framerName: el.getAttribute('data-framer-name'),
          bg: cs.backgroundImage,
          src: el.src || el.getAttribute('src'),
          videoSrc: el.querySelector('video') ? el.querySelector('video').src : null,
          innerHTMLSnippet: el.innerHTML ? el.innerHTML.slice(0, 100) : ''
        };
      });

      // Also look for any video anywhere in the entire document
      const allVideos = Array.from(document.querySelectorAll('video, audio, embed, object, source')).map(el => ({
        tag: el.tagName,
        src: el.src,
        currentSrc: el.currentSrc,
        sourceSrc: el.getAttribute('src')
      }));

      // Look for network requests or urls in style sheets
      const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean);

      return {
        heroHtml: hero.outerHTML.slice(0, 3000),
        allVideos,
        scripts
      };
    })()`,
    returnByValue: true
  });

  fs.writeFileSync(path.resolve(__dirname, 'hero_video_spec.json'), JSON.stringify(evalRes.result.value, null, 2));
  console.log('Hero spec saved');
  try {
    chromeProcess.kill();
  } catch(e) {}
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
