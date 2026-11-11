const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'public', 'screenshots');

// We can capture by viewport height 982x1200 or scroll positions
console.log('Capturing scroll sections...');

// Let's create an HTML comparison page that embeds both images for easy viewing!
const compareHtml = `<!DOCTYPE html>
<html>
<head>
  <title>982px Comparison - Local vs Reference</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #fff; padding: 20px; }
    .grid { display: flex; gap: 20px; }
    .col { flex: 1; }
    img { width: 100%; border: 1px solid #333; border-radius: 8px; }
    h2 { font-size: 18px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <h1>982px Tablet Comparison</h1>
  <div class="grid">
    <div class="col">
      <h2>Our Site (Measured Tokens)</h2>
      <img src="our_site_revealed_982.png" />
    </div>
    <div class="col">
      <h2>Reference (dossier.framer.website)</h2>
      <img src="reference_revealed_982.png" />
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'compare.html'), compareHtml);
console.log('Comparison HTML written to', path.join(outDir, 'compare.html'));
