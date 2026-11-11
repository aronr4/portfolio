const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

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
    '--remote-debugging-port=9231',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);
  const targets = await getJson('http://127.0.0.1:9231/json/list');
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

  const scrollSteps = [0, 200, 400, 600, 800, 1000, 1200];
  const results = [];

  for (const sy of scrollSteps) {
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${sy});`
    });
    await sleep(400);

    const stepRes = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const aboutSec = document.querySelector('section[data-framer-name="About"]') || document.querySelector('section');
        const cards = aboutSec ? Array.from(aboutSec.querySelectorAll('[data-framer-name="Default"]')) : [];
        return {
          scrollY: window.scrollY,
          cards: cards.map((c, i) => {
            const cs = window.getComputedStyle(c);
            const rect = c.getBoundingClientRect();
            return {
              index: i,
              transform: cs.transform,
              opacity: cs.opacity,
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              dataAppear: c.getAttribute('data-framer-appear-id'),
              styleAttr: c.getAttribute('style')
            };
          })
        };
      })()`,
      returnByValue: true
    });

    results.push(stepRes.result.value);

    // Also take screenshot at 800 and 1000
    if (sy === 800 || sy === 1000) {
      const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\ref_cards_scroll_${sy}.png`, Buffer.from(shot.data, 'base64'));
    }
  }

  fs.writeFileSync('c:\\Users\\aron\\OneDrive\\Desktop\\new folio\\scratch\\ref_scroll_cards_data.json', JSON.stringify(results, null, 2));
  console.log('Scroll cards data saved');

  try { chromeProcess.kill(); } catch(e) {}
  process.exit(0);
}

main().catch(console.error);
