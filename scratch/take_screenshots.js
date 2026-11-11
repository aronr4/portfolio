const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const ourSiteOut = path.join(outDir, 'our_site_revealed_982.png');
const refSiteOut = path.join(outDir, 'reference_revealed_982.png');

console.log('Taking settled screenshot of our site with virtual-time-budget=4000...');
try {
  execSync(`"${chrome}" --headless --disable-gpu --virtual-time-budget=4000 --hide-scrollbars --window-size=982,1400 --screenshot="${ourSiteOut}" http://localhost:3000`, { timeout: 30000 });
  console.log('Our site screenshot size:', fs.statSync(ourSiteOut).size);
} catch (e) {
  console.error('Error:', e.message);
}

console.log('Taking settled screenshot of reference with virtual-time-budget=4000...');
try {
  execSync(`"${chrome}" --headless --disable-gpu --virtual-time-budget=4000 --hide-scrollbars --window-size=982,1400 --screenshot="${refSiteOut}" https://dossier.framer.website/`, { timeout: 45000 });
  console.log('Reference screenshot size:', fs.statSync(refSiteOut).size);
} catch (e) {
  console.error('Error:', e.message);
}
