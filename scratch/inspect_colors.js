const fs = require('fs');
const content = fs.readFileSync('C:/Users/aron/.gemini/antigravity/brain/b6057b70-464f-4761-904e-4d9dc567d9fb/.system_generated/steps/340/content.md', 'utf8');

// Find sections and their background colors or classes
const sectionMatches = content.match(/<section[^>]*>.*?<\/section>/gs) || content.match(/<main[^>]*>.*?<\/main>/gs);
console.log('Sections/main found:', sectionMatches ? sectionMatches.length : 0);

// Let's find background colors in inline styles or css classes
const bgColors = content.match(/background(?:-color)?:\s*[^;]+/gi);
console.log('Unique background colors:', Array.from(new Set(bgColors || [])).slice(0, 30));

// Let's check text colors
const colors = content.match(/color:\s*[^;]+/gi);
console.log('Unique colors:', Array.from(new Set(colors || [])).slice(0, 20));
