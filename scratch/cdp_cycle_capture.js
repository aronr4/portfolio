const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'screenshots', 'hero_cycle');
const timestamps = [0.9, 1.5, 2.6, 3.4, 4.0, 6.0, 9.0, 10.8, 11.5, 12.9];

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
  console.log('Starting headless Chrome with remote debugging...');
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    '--hide-scrollbars',
    '--disable-gpu',
    'about:blank'
  ]);

  await sleep(2000);

  const targets = await getJson('http://127.0.0.1:9222/json/list');
  console.log('Targets found:', targets.length);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

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
  console.log('CDP WebSocket connected!');

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  for (const t of timestamps) {
    console.log(`Navigating to t=${t}s...`);
    await sendCommand('Page.navigate', { url: `http://localhost:3000/?t=${t}` });
    
    // Wait for page to finish rendering and timeline to seek
    await sleep(1500);

    // Call GSAP seek directly to ensure exact frame position
    await sendCommand('Runtime.evaluate', {
      expression: `if (window.__heroTimeline) { window.__heroTimeline.seek(${t}, false); window.__heroTimeline.pause(); }`
    });

    await sleep(200);

    console.log(`Capturing screenshot at t=${t}s...`);
    const screenshot = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const buffer = Buffer.from(screenshot.data, 'base64');
    const outFile = path.join(outDir, `our_hero_${t}s.png`);
    fs.writeFileSync(outFile, buffer);
    console.log(`Saved ${buffer.length} bytes to ${outFile}`);
  }

  ws.close();
  chromeProcess.kill();
  console.log('All cycle screenshots captured successfully!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
