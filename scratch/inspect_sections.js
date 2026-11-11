const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

// Let's find the section boundaries by searching for major headings:
// 'Digital', 'Work.', 'What  we do.', 'Big  wins.', "Let's"
const headings = ['Digital', 'Work.', 'What  we do.', 'Big  wins.', "Let's"];
for (const h of headings) {
  const idx = content.indexOf(h);
  console.log(`Heading "${h}" found at index:`, idx);
  if (idx !== -1) {
    // print surrounding 500 chars
    console.log('--- Context for', h, '---');
    console.log(content.substring(Math.max(0, idx - 200), idx + 300).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  }
}
