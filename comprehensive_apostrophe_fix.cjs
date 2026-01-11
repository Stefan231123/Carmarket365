const fs = require('fs');

const filePath = 'shared/translations/en.ts';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Fixing all apostrophe syntax errors...');

// Replace problematic apostrophes within single-quoted strings
// This regex finds single-quoted strings and fixes unescaped apostrophes within them
content = content.replace(/'([^'\\]*)([^\\])'([^'\\]*)'('|,|\]|\}|;)/g, (match, before, apostrophe, after, ending) => {
  // If there's an unescaped apostrophe, fix it
  const fixed = `'${before}${apostrophe === "'" ? "\\'" : apostrophe}${after.replace(/'/g, "\\'")}\'${ending}`;
  return fixed;
});

// More targeted fixes for common patterns
const fixes = [
  // Convert single quotes with apostrophes to double quotes
  { from: /'([^']*'[^']*)'/, to: '"$1"' },
  
  // Common contractions
  { from: /don't/g, to: "don\\'t" },
  { from: /won't/g, to: "won\\'t" },
  { from: /can't/g, to: "can\\'t" },
  { from: /shouldn't/g, to: "shouldn\\'t" },
  { from: /wouldn't/g, to: "wouldn\\'t" },
  { from: /couldn't/g, to: "couldn\\'t" },
  { from: /haven't/g, to: "haven\\'t" },
  { from: /hasn't/g, to: "hasn\\'t" },
  { from: /isn't/g, to: "isn\\'t" },
  { from: /aren't/g, to: "aren\\'t" },
  { from: /doesn't/g, to: "doesn\\'t" },
  { from: /wasn't/g, to: "wasn\\'t" },
  { from: /weren't/g, to: "weren\\'t" },
  { from: /you're/g, to: "you\\'re" },
  { from: /we're/g, to: "we\\'re" },
  { from: /they're/g, to: "they\\'re" },
  { from: /I'm/g, to: "I\\'m" },
  { from: /you'll/g, to: "you\\'ll" },
  { from: /we'll/g, to: "we\\'ll" },
  { from: /they'll/g, to: "they\\'ll" },
  { from: /I'll/g, to: "I\\'ll" },
  
  // Common possessives
  { from: /user's/g, to: "user\\'s" },
  { from: /users'/g, to: "users\\'" },
  { from: /driver's/g, to: "driver\\'s" },
  { from: /seller's/g, to: "seller\\'s" },
  { from: /buyer's/g, to: "buyer\\'s" },
  { from: /owner's/g, to: "owner\\'s" },
  { from: /vehicle's/g, to: "vehicle\\'s" },
  { from: /dealer's/g, to: "dealer\\'s" },
  { from: /company's/g, to: "company\\'s" },
  { from: /car's/g, to: "car\\'s" }
];

fixes.forEach(fix => {
  content = content.replace(fix.from, fix.to);
});

// Write the fixed content back to file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Apostrophe syntax errors fixed!');