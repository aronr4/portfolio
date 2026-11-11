const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

// Find all tags with data-framer-name
const matches = [];
const r = /<([a-z0-9]+)[^>]*data-framer-name="([^"]+)"[^>]*>/gi;
let m;
while ((m = r.exec(content)) !== null) {
  matches.push({ tag: m[1], name: m[2], index: m.index });
}

// Filter to major components
const majors = matches.filter(x => ['Hero', 'Work', 'Services', 'Testimonials', 'CTA', 'Menu', 'Row 1', 'Project 1', 'Project 2', 'Projects 3+'].includes(x.name));
console.log('Majors:', JSON.stringify(majors, null, 2));
