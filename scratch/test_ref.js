const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'screenshots', 'hero_cycle');

const times = [1.5, 4.0, 10.8];

for (const t of times) {
  const outFile = path.join(outDir, `ref_hero_${t}s.png`);
  const budget = Math.floor(t * 1000) + 1200; // time budget including network load
  const cmd = `"${chromePath}" --headless=new --hide-scrollbars --window-size=1440,900 --virtual-time-budget=${budget} --screenshot="${outFile}" "https://dossier.framer.website/"`;
  console.log(`Capturing ref at ${t}s with budget ${budget}...`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Captured ${outFile}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
