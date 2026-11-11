const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

const awardIdx = content.indexOf('Award-winning designs.');
console.log('Award index:', awardIdx);
if (awardIdx !== -1) {
  console.log(content.substring(awardIdx - 400, awardIdx + 600));
}
