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
    '--remote-debugging-port=9225',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2000);

  const targets = await getJson('http://127.0.0.1:9225/json/list');
  console.log('Targets:', targets.map(t => ({ type: t.type, url: t.url })));
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description || JSON.stringify(a)));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails.exception ? msg.params.exceptionDetails.exception.description : msg.params.exceptionDetails.text);
    }
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

  console.log('Navigating to http://localhost:3000...');
  await sendCommand('Page.navigate', { url: 'http://localhost:3000' });

  // Sample every 1s for 15s
  for (let s = 0; s <= 15; s += 1) {
    await sleep(1000);
    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        return {
          href: window.location.href,
          title: document.title,
          hasHero: !!document.getElementById('hero'),
          hasTl: !!window.__heroTimeline,
          tlTime: window.__heroTimeline ? window.__heroTimeline.time() : null,
          tlPaused: window.__heroTimeline ? window.__heroTimeline.paused() : null
        };
      })()`,
      returnByValue: true
    });
    console.log(`t=${s}s ->`, evalRes.result ? evalRes.result.value : evalRes);
  }

  ws.close();
  chromeProcess.kill();
}

main().catch(console.error);
