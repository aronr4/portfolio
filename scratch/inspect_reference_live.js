const { spawn } = require('child_process');
const http = require('http');

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

  await sleep(2000);

  const targets = await getJson('http://127.0.0.1:9226/json/list');
  const pageTarget = targets.find(t => t.type === 'page');
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

  console.log('Navigating to https://dossier.framer.website/...');
  await sendCommand('Page.navigate', { url: 'https://dossier.framer.website/' });
  await sleep(3000);

  // Sample DOM transforms of the reel on the reference site every 500ms
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    const res = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1');
        const h1Text = h1 ? h1.innerText : '';
        const allTrans = Array.from(document.querySelectorAll('[style*="transform"]')).map(el => ({
          tag: el.tagName,
          className: el.className,
          transform: el.style.transform,
          opacity: el.style.opacity
        })).filter(x => x.transform || x.opacity);
        return {
          time: (i * 0.5).toFixed(1),
          h1Text: h1Text.replace(/\\n/g, ' '),
          activeTransformsCount: allTrans.length,
          sampleTransforms: allTrans.slice(0, 5)
        };
      })()`,
      returnByValue: true
    });
    console.log(`t=${(i * 0.5).toFixed(1)}s ->`, JSON.stringify(res.result.value));
  }

  ws.close();
  chromeProcess.kill();
}

main().catch(console.error);
