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
  console.log('Launching headless Chrome for verification of http://localhost:3000/services...');
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);
  const targets = await getJson('http://127.0.0.1:9230/json/list');
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

  console.log('Navigating to http://localhost:3000/services...');
  await sendCommand('Page.navigate', { url: 'http://localhost:3000/services' });
  await sleep(3500);

  // 1. Desktop 1440px Hero Viewport
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(1000);
  const heroShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_hero_1440.png', Buffer.from(heroShot.data, 'base64'));

  // 2. Scroll to Stats Section to trigger count-up
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 750, behavior: 'instant' });`
  });
  await sleep(2200); // allow count-up animation to complete
  const statsShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_stats_1440.png', Buffer.from(statsShot.data, 'base64'));

  // 3. Scroll to Focus Section
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 1900, behavior: 'instant' });`
  });
  await sleep(1000);
  const focusShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_focus_1440.png', Buffer.from(focusShot.data, 'base64'));

  // 4. Scroll to Explore Section
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 2900, behavior: 'instant' });`
  });
  await sleep(1000);
  const exploreShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_explore_1440.png', Buffer.from(exploreShot.data, 'base64'));

  // 5. Full Desktop Page Screenshot
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 0, behavior: 'instant' });`
  });
  await sleep(1000);
  const full1440 = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_full_1440.png', Buffer.from(full1440.data, 'base64'));

  // 6. Tablet 982px View
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 982,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(1000);
  const full982 = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_full_982.png', Buffer.from(full982.data, 'base64'));

  // 7. Mobile 390px View
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  await sleep(1000);
  const full390 = await sendCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\Users\\aron\\.gemini\\antigravity\\brain\\b6057b70-464f-4761-904e-4d9dc567d9fb\\our_services_full_390.png', Buffer.from(full390.data, 'base64'));

  // 8. Test Pause / Play Button Toggle
  await sendCommand('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sendCommand('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 0, behavior: 'instant' });`
  });
  await sleep(500);

  const toggleRes = await sendCommand('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label*="reel"]');
      const beforeLabel = btn ? btn.getAttribute('aria-label') : null;
      if (btn) btn.click();
      const afterLabel = btn ? btn.getAttribute('aria-label') : null;
      return { beforeLabel, afterLabel };
    })()`,
    returnByValue: true
  });
  console.log('Pause/play button toggle result:', toggleRes.result.value);

  console.log('All verification screenshots captured successfully!');
  try { chromeProcess.kill(); } catch(e) {}
  process.exit(0);
}

main().catch(console.error);
