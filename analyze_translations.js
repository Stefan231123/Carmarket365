import fs from 'fs';

function extractAllKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...extractAllKeys(value, currentPath));
    } else {
      keys.push(currentPath);
    }
  }
  return keys;
}

function extractKeysFromContent(content, prefix = '', level = 0) {
  const keys = [];
  const lines = content.split('\n');
  const indent = '  '.repeat(level);
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || line.endsWith('*/')) {
      i++;
      continue;
    }
    
    // Match property definitions
    const propertyMatch = line.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*(.+)$/);
    if (propertyMatch) {
      const [, key, value] = propertyMatch;
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      // Check if this is an object (starts with { or continues on next line with {)
      if (value.trim() === '{' || value.trim().startsWith('{')) {
        // This is an object, find its closing brace
        let braceCount = (value.match(/\{/g) || []).length;
        let objectContent = '';
        let j = i + 1;
        
        while (j < lines.length && braceCount > 0) {
          const objLine = lines[j];
          braceCount += (objLine.match(/\{/g) || []).length;
          braceCount -= (objLine.match(/\}/g) || []).length;
          if (braceCount > 0) {
            objectContent += objLine + '\n';
          }
          j++;
        }
        
        // Recursively extract keys from the object
        keys.push(...extractKeysFromContent(objectContent, currentPath, level + 1));
        i = j;
      } else {
        // This is a leaf property
        keys.push(currentPath);
        i++;
      }
    } else {
      i++;
    }
  }
  
  return keys;
}

function parseTranslationFile(filePath) {
  console.log(`Reading file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the start of the translation object
  const objectStart = content.indexOf('{');
  if (objectStart === -1) {
    console.error('Could not find object start in file:', filePath);
    return null;
  }
  
  // Find the end of the translation object (last closing brace)
  const objectEnd = content.lastIndexOf('};');
  if (objectEnd === -1) {
    console.error('Could not find object end in file:', filePath);
    return null;
  }
  
  // Extract the object content
  const objectContent = content.substring(objectStart + 1, objectEnd);
  
  try {
    const keys = extractKeysFromContent(objectContent);
    return keys;
  } catch (error) {
    console.error('Error parsing translation file:', filePath);
    console.error(error.message);
    return null;
  }
}

function main() {
  const enFilePath = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts';
  const mkFilePath = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts';
  
  console.log('Analyzing translation files...\n');
  
  // Parse both files
  console.log('Parsing English translation file...');
  const enKeys = parseTranslationFile(enFilePath);
  
  console.log('Parsing Macedonian translation file...');
  const mkKeys = parseTranslationFile(mkFilePath);
  
  if (!enKeys || !mkKeys) {
    console.error('Failed to parse one or both translation files');
    return;
  }
  
  // Sort the keys
  enKeys.sort();
  mkKeys.sort();
  
  console.log(`\nKey Statistics:`);
  console.log(`English keys: ${enKeys.length}`);
  console.log(`Macedonian keys: ${mkKeys.length}`);
  console.log(`Coverage: ${((mkKeys.length / enKeys.length) * 100).toFixed(1)}%`);
  
  // Find differences
  const enKeySet = new Set(enKeys);
  const mkKeySet = new Set(mkKeys);
  
  const missingInMk = enKeys.filter(key => !mkKeySet.has(key));
  const extraInMk = mkKeys.filter(key => !enKeySet.has(key));
  
  console.log(`\nDiscrepancies:`);
  console.log(`Missing in Macedonian: ${missingInMk.length}`);
  console.log(`Extra in Macedonian: ${extraInMk.length}`);
  
  if (missingInMk.length > 0) {
    console.log(`\nKeys missing in Macedonian (first 50):`);
    missingInMk.slice(0, 50).forEach(key => console.log(`  - ${key}`));
    if (missingInMk.length > 50) {
      console.log(`  ... and ${missingInMk.length - 50} more`);
    }
  }
  
  if (extraInMk.length > 0) {
    console.log(`\nExtra keys in Macedonian (first 50):`);
    extraInMk.slice(0, 50).forEach(key => console.log(`  + ${key}`));
    if (extraInMk.length > 50) {
      console.log(`  ... and ${extraInMk.length - 50} more`);
    }
  }
  
  // Save detailed analysis to files
  fs.writeFileSync('en_keys.txt', enKeys.join('\n'));
  fs.writeFileSync('mk_keys.txt', mkKeys.join('\n'));
  fs.writeFileSync('missing_in_mk.txt', missingInMk.join('\n'));
  fs.writeFileSync('extra_in_mk.txt', extraInMk.join('\n'));
  
  console.log(`\nDetailed analysis saved to:`);
  console.log(`- en_keys.txt (${enKeys.length} keys)`);
  console.log(`- mk_keys.txt (${mkKeys.length} keys)`);
  console.log(`- missing_in_mk.txt (${missingInMk.length} keys)`);
  console.log(`- extra_in_mk.txt (${extraInMk.length} keys)`);
}

main();