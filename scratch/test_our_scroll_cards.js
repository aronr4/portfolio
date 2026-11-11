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
    '--remote-debugging-port=9232',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);
  const targets = await getJson('http://127.0.0.1:9232/json/list');
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

  await sendCommand('Page.navigate', { url: 'http://localhost:3000/services' });
  await sleep(3500);

  const scrollSteps = [0, 200, 400, 600, 800];
  const measurements = [];

  for (const sy of scrollSteps) {
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${sy});`
    });
    await sleep(400);

    const stepRes = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('section div.grid > div'));
        return {
          scrollY: window.scrollY,
          tops: cards.map(c => Math.round(c.getBoundingClientRect().top)),
          heights: cards.map(c => Math.round(c.getBoundingClientRect().height)),
          transforms: cards.map(c => window.getComputedStyle(c).transform)
        };
      })()`,
      returnByValue: true
    });

    measurements.push(stepRes.result.value);

    // Capture screenshot at sy = 800 (when aligned in straight row)
    if (sy === 800) {
      const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_cards_aligned_800.png', Buffer.from(shot.data, 'base64'));
    }
  }

  console.log('Measurements:', JSON.stringify(measurements, null, 2));

  try { chromeProcess.kill(); } catch(e) {}
  process.exit(0);
}

main().catch(console.error);
