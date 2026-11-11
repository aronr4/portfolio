const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

// Find HTML inside <div id="main">
const mainIndex = content.indexOf('<div id="main">');
if (mainIndex !== -1) {
  const mainChunk = content.substring(mainIndex, mainIndex + 80000);
  
  // Extract visible texts and their parent tags/classes
  const textMatches = [];
  const regex = />([^<]{3,})</g;
  let m;
  while ((m = regex.exec(mainChunk)) !== null) {
    const text = m[1].trim();
    if (text && !text.startsWith('{') && !text.startsWith('@')) {
      textMatches.push(text);
    }
  }
  console.log('Main texts count:', textMatches.length);
  console.log('Sample texts in order:');
  console.log(textMatches.slice(0, 80).join('\n'));
} else {
  console.log('main div not found');
}
