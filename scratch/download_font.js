const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fontUrl = 'https://framerusercontent.com/third-party-assets/fontshare/wf/MKEEQN57GWBZOSYWCRODNJOOZNPLMAKN/5SPTSZGHEACWWLF34DQ4WAA4OGU6PQIF/KN7DX4F6PXB74R6L2K2Y4NH3CB7FC53Q.woff2';
const dest = path.join(dir, 'ClashGrotesk-Semibold.woff2');

const file = fs.createWriteStream(dest);
https.get(fontUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      console.log('Clash Grotesk 600 downloaded successfully to', dest, 'Size:', fs.statSync(dest).size);
    });
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Error downloading font:', err.message);
});
