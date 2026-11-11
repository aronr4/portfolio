const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

const bodyIndex = content.indexOf('<body');
const bodyContent = content.substring(bodyIndex);

// Let's parse out all components with data-framer-name
const componentNames = [];
const compRegex = /data-framer-name="([^"]+)"/g;
let match;
while ((match = compRegex.exec(bodyContent)) !== null) {
  componentNames.push(match[1]);
}
console.log('Total Framer named elements:', componentNames.length);
console.log('Elements list:', Array.from(new Set(componentNames)));

// Let's find all images and their associated labels or alts
const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
const images = [];
let imgMatch;
while ((imgMatch = imgRegex.exec(bodyContent)) !== null) {
  const full = imgMatch[0];
  const src = imgMatch[1];
  const alt = (full.match(/alt="([^"]*)"/) || [])[1] || '';
  images.push({ src, alt });
}
console.log('Total images in body:', images.length);
console.log('Images in body:', JSON.stringify(images, null, 2));
