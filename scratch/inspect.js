const fs = require('fs');

const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

// Match image URLs
const imgRegex = /https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+\.(?:jpg|jpeg|png|webp|svg)/gi;
const imgs = Array.from(new Set(content.match(imgRegex) || []));
console.log('Framer images count:', imgs.length);
console.log('Sample images:', JSON.stringify(imgs.slice(0, 20), null, 2));

// Match video URLs or assets
const assetRegex = /https:\/\/framerusercontent\.com\/assets\/[a-zA-Z0-9_\-\.]+/gi;
const assets = Array.from(new Set(content.match(assetRegex) || []));
console.log('Assets:', JSON.stringify(assets.slice(0, 10), null, 2));

// Search for section headings and text in the home page
const searchIndexRaw = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/366/content.md', 'utf8');
const searchIndexJson = searchIndexRaw.substring(searchIndexRaw.indexOf('{'));
const data = JSON.parse(searchIndexJson);
console.log('Home page data:', JSON.stringify(data['/'], null, 2));
