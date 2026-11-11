const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'screenshots', 'hero_cycle');

const times = [0.9, 1.5, 2.6, 3.4, 4.0, 6.0, 9.0, 10.8, 11.5, 12.9];

for (const t of times) {
  const outFile = path.join(outDir, `our_hero_${t}s.png`);
  const url = `http://localhost:3000/?t=${t}`;
  const cmd = `"${chromePath}" --headless=new --hide-scrollbars --window-size=1440,900 --screenshot="${outFile}" "${url}"`;
  console.log(`Capturing t=${t}s to ${outFile}...`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error at t=${t}:`, err.message);
  }
}

console.log('Finished capturing all timestamps.');
