const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

const heroIdx = content.indexOf('data-framer-name="Hero"');
console.log('Hero index:', heroIdx);
if (heroIdx !== -1) {
  const snippet = content.substring(heroIdx - 300, heroIdx + 1200);
  console.log('Snippet:');
  console.log(snippet);
}
