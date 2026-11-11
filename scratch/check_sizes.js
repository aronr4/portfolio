const fs = require('fs');

const s09 = fs.statSync('public/screenshots/hero_cycle/our_hero_0.9s.png').size;
const s15 = fs.statSync('public/screenshots/hero_cycle/our_hero_1.5s.png').size;
console.log('Size 0.9s:', s09, 'Size 1.5s:', s15);
