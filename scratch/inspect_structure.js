const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

// Find all text nodes or structured blocks in the HTML
// Let's search for Framer components or div structures
const matches = content.match(/<div data-framer-name="[^"]+"/g);
console.log('Framer component names:', matches ? matches.slice(0, 30) : 'none');

// Let's search for headings or aria labels
const headings = content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gs);
console.log('Headings found:', headings ? headings.length : 0);
if (headings) {
  headings.forEach(h => console.log(h.replace(/<[^>]+>/g, ' ').trim()));
}
