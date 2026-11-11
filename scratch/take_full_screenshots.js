const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'public', 'screenshots');

const ourFull = path.join(outDir, 'our_site_full_982.png');
const refFull = path.join(outDir, 'reference_full_982.png');

console.log('Capturing full page of local site...');
try {
  // Capture with large height to see the whole landing page
  execSync(`"${chrome}" --headless --disable-gpu --virtual-time-budget=5000 --hide-scrollbars --window-size=982,8000 --screenshot="${ourFull}" http://localhost:3000`, { timeout: 45000 });
  console.log('Local full page captured:', ourFull, 'Size:', fs.statSync(ourFull).size);
} catch (e) {
  console.error('Error:', e.message);
}

console.log('Capturing full page of reference...');
try {
  execSync(`"${chrome}" --headless --disable-gpu --virtual-time-budget=5000 --hide-scrollbars --window-size=982,8000 --screenshot="${refFull}" https://dossier.framer.website/`, { timeout: 60000 });
  console.log('Reference full page captured:', refFull, 'Size:', fs.statSync(refFull).size);
} catch (e) {
  console.error('Error:', e.message);
}
