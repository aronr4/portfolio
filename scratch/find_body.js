const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

const bodyIndex = content.indexOf('<body');
console.log('body index:', bodyIndex);
if (bodyIndex !== -1) {
  console.log('Snippet after <body:');
  console.log(content.substring(bodyIndex, bodyIndex + 2000));
}
