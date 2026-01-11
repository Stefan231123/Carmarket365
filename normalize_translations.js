import fs from 'fs';
import vm from 'vm';

function parseTranslationObject(content) {
  // Find the export statement and extract the object
  const exportMatch = content.match(/export\s+const\s+\w+Translations:\s*\w+\s*=\s*(\{[\s\S]*\});?\s*$/);
  
  if (!exportMatch) {
    throw new Error('Could not find translation object export');
  }
  
  const objectContent = exportMatch[1];
  
  // Create a safe evaluation environment
  const sandbox = {};
  const context = vm.createContext(sandbox);
  
  try {
    // Evaluate the object in the sandbox
    const result = vm.runInContext(`(${objectContent})`, context);
    return result;
  } catch (error) {
    console.error('Error parsing object:', error);
    console.error('Object content preview:', objectContent.substring(0, 200));
    return null;
  }
}

function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, currentPath));
    } else {
      keys.push(currentPath);
    }
  }
  return keys;
}

function getValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) {
      current[key] = {};
    }
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function removeProperty(obj, path) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => current?.[key], obj);
  if (target) {
    delete target[lastKey];
  }
}

function createNormalizedTranslation(enObj, mkObj) {
  // Create a deep copy of the English object structure
  const normalized = JSON.parse(JSON.stringify(enObj));
  
  // Get all keys from both objects
  const enKeys = getAllKeys(enObj);
  const mkKeys = getAllKeys(mkObj);
  
  console.log(`English keys: ${enKeys.length}`);
  console.log(`Macedonian keys: ${mkKeys.length}`);
  
  // Create sets for efficient lookup
  const enKeySet = new Set(enKeys);
  const mkKeySet = new Set(mkKeys);
  
  // Find missing and extra keys
  const missingInMk = enKeys.filter(key => !mkKeySet.has(key));
  const extraInMk = mkKeys.filter(key => !enKeySet.has(key));
  
  console.log(`Missing in MK: ${missingInMk.length}`);
  console.log(`Extra in MK: ${extraInMk.length}`);
  
  // For each English key, try to get the Macedonian translation
  for (const key of enKeys) {
    const mkValue = getValue(mkObj, key);
    if (mkValue !== undefined) {
      // Use the Macedonian translation if it exists
      setValue(normalized, key, mkValue);
    } else {
      // Keep the English value as placeholder if no Macedonian translation exists
      console.log(`Missing translation for: ${key}`);
      // You could add a TODO marker or use the English value
      const enValue = getValue(enObj, key);
      setValue(normalized, key, `TODO: ${enValue}`);
    }
  }
  
  return normalized;
}

function objectToString(obj, indent = 2, currentIndent = 0) {
  const spaces = ' '.repeat(currentIndent);
  const nextSpaces = ' '.repeat(currentIndent + indent);
  
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    if (typeof obj === 'string') {
      // Escape single quotes in strings and use single quotes
      return `'${obj.replace(/'/g, "\\'")}'`;
    }
    return JSON.stringify(obj);
  }
  
  const entries = Object.entries(obj);
  if (entries.length === 0) {
    return '{}';
  }
  
  let result = '{\n';
  entries.forEach(([key, value], index) => {
    result += `${nextSpaces}${key}: `;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result += objectToString(value, indent, currentIndent + indent);
    } else {
      result += objectToString(value, indent, currentIndent + indent);
    }
    
    if (index < entries.length - 1) {
      result += ',';
    }
    result += '\n';
  });
  
  result += `${spaces}}`;
  return result;
}

async function main() {
  const enFilePath = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts';
  const mkFilePath = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts';
  
  console.log('Reading translation files...');
  
  try {
    // Read files
    const enContent = fs.readFileSync(enFilePath, 'utf8');
    const mkContent = fs.readFileSync(mkFilePath, 'utf8');
    
    console.log('Parsing English translations...');
    const enObj = parseTranslationObject(enContent);
    
    console.log('Parsing Macedonian translations...');
    const mkObj = parseTranslationObject(mkContent);
    
    if (!enObj || !mkObj) {
      console.error('Failed to parse one or both translation files');
      return;
    }
    
    console.log('Creating normalized translation...');
    const normalized = createNormalizedTranslation(enObj, mkObj);
    
    // Generate the new file content
    const header = `import { TranslationStrings } from '../translations';

export const mkTranslations: TranslationStrings = `;
    
    const footer = ';';
    
    console.log('Converting to string format...');
    const objectString = objectToString(normalized);
    const finalContent = header + objectString + footer;
    
    // Write the normalized file
    const outputPath = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk_normalized.ts';
    fs.writeFileSync(outputPath, finalContent);
    
    console.log(`\nNormalized file created: ${outputPath}`);
    console.log(`Final key count: ${getAllKeys(normalized).length}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();