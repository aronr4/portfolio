const fs = require('fs');
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
    '--remote-debugging-port=9227',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);
  const targets = await getJson('http://127.0.0.1:9227/json/list');
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
      const hero = document.querySelector('[data-framer-name="Hero"]');
      if (!hero) return 'No hero';
      
      function dumpTree(el, depth = 0) {
        if (!el || depth > 8) return null;
        const name = el.getAttribute ? el.getAttribute('data-framer-name') : '';
        const tag = el.tagName;
        const cs = window.getComputedStyle(el);
        const res = {
          tag,
          name,
          bg: cs.backgroundImage,
          children: Array.from(el.children).map(c => dumpTree(c, depth + 1))
        };
        return res;
      }

      // Also search the entire DOM for any string containing .mp4 or .webm or video
      const html = document.documentElement.outerHTML;
      const mp4Matches = html.match(/https?:[^"']+\.(?:mp4|webm|mov)[^"']*/gi) || [];
      const imgMatches = html.match(/https?:[^"']+\.(?:png|jpg|jpeg|webp)[^"']*/gi) || [];

      return {
        tree: dumpTree(hero),
        mp4Matches: [...new Set(mp4Matches)],
        imgSample: [...new Set(imgMatches)].slice(0, 20)
      };
    })()`,
    returnByValue: true
  });

  fs.writeFileSync('c:\\Users\\aron\\OneDrive\\Desktop\\new folio\\scratch\\hero_tree.json', JSON.stringify(evalRes.result.value, null, 2));
  console.log('Tree saved');
  try { chromeProcess.kill(); } catch(e) {}
  process.exit(0);
}

main().catch(console.error);
