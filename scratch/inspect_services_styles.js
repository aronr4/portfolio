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
    '--remote-debugging-port=9228',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await sleep(2500);
  const targets = await getJson('http://127.0.0.1:9228/json/list');
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
      function getStyles(el) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.className,
          rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
          display: cs.display,
          flexDirection: cs.flexDirection,
          gridTemplateColumns: cs.gridTemplateColumns,
          gap: cs.gap,
          padding: cs.padding,
          margin: cs.margin,
          backgroundColor: cs.backgroundColor,
          borderRadius: cs.borderRadius,
          border: cs.border,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color
        };
      }

      // 1. Hero
      const hero = document.querySelector('[data-framer-name="Hero"]');
      const heroH1 = hero ? hero.querySelector('h1') : null;
      const heroP = hero ? hero.querySelector('p') : null;
      const heroOverlay = hero ? hero.querySelector('[data-framer-name="Overlay"]') : null;

      // 2. About / Stat cards section
      const aboutSec = document.querySelector('section[data-framer-name="About"]') || document.querySelector('section');
      const statCards = aboutSec ? Array.from(aboutSec.querySelectorAll('[data-framer-name="Default"]')).map(getStyles) : [];

      // 3. Focus section
      const focusH2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Focus'));
      const focusSec = focusH2 ? focusH2.closest('section') || focusH2.parentElement.parentElement : null;
      const serviceItems = focusSec ? Array.from(focusSec.querySelectorAll('[data-framer-name="Vertical"]')).map(getStyles) : [];

      // 4. Explore section
      const exploreH2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Explore'));
      const exploreSec = exploreH2 ? exploreH2.closest('section') || exploreH2.parentElement.parentElement : null;

      return {
        hero: getStyles(hero),
        heroH1: getStyles(heroH1),
        heroP: getStyles(heroP),
        aboutSec: getStyles(aboutSec),
        statCards,
        focusH2: getStyles(focusH2),
        focusSec: getStyles(focusSec),
        serviceItems,
        exploreH2: getStyles(exploreH2),
        exploreSec: getStyles(exploreSec)
      };
    })()`,
    returnByValue: true
  });

  fs.writeFileSync('c:\\Users\\aron\\OneDrive\\Desktop\\new folio\\scratch\\services_styles_measured.json', JSON.stringify(evalRes.result.value, null, 2));
  console.log('Measured styles saved');
  try { chromeProcess.kill(); } catch(e) {}
  process.exit(0);
}

main().catch(console.error);
