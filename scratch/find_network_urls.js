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
    '--remote-debugging-port=9229',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);
  const targets = await getJson('http://127.0.0.1:9229/json/list');
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Network.requestWillBeSent') {
      networkUrls.push(msg.params.request.url);
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const networkUrls = [];

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(resolve => ws.onopen = resolve);
  await sendCommand('Network.enable');
  await sendCommand('Page.enable');
  await sendCommand('Page.navigate', { url: 'https://dossier.framer.website/services' });
  await sleep(6000);

  fs.writeFileSync('c:\\Users\\aron\\OneDrive\\Desktop\\new folio\\scratch\\services_network_urls.json', JSON.stringify(networkUrls, null, 2));
  console.log('Network URLs captured:', networkUrls.length);

  try { chromeProcess.kill(); } catch(e) {}
  process.exit(0);
}

main().catch(console.error);
