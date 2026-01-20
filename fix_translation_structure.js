#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🛠️  COMPREHENSIVE TRANSLATION STRUCTURE FIX');
console.log('============================================\n');

/**
 * Clean and restructure translation files to match TranslationStrings interface
 */
function fixTranslationFile(filePath, lang) {
  console.log(`🔧 Processing ${path.basename(filePath)}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Create backup
    const backupPath = `${filePath}.backup-${Date.now()}`;
    fs.writeFileSync(backupPath, content);
    console.log(`📁 Backup created: ${path.basename(backupPath)}`);
    
    // Parse and clean the content
    const cleanedContent = parseAndCleanTranslation(content, lang);
    
    // Write fixed content
    fs.writeFileSync(filePath, cleanedContent);
    console.log(`✅ Fixed ${path.basename(filePath)} - Size: ${(cleanedContent.length / 1024).toFixed(2)} KB\n`);
    
    return true;
    
  } catch (error) {
    console.log(`❌ Error fixing ${path.basename(filePath)}: ${error.message}\n`);
    return false;
  }
}

/**
 * Parse and clean translation content
 */
function parseAndCleanTranslation(content, lang) {
  // Extract the variable name from existing content
  const varNameMatch = content.match(/export const (\w+Translations)/);
  const varName = varNameMatch ? varNameMatch[1] : `${lang}Translations`;
  
  // Try to extract the object content between the first { and last }
  const objectStart = content.indexOf('= {');
  const objectEnd = content.lastIndexOf('};');
  
  if (objectStart === -1 || objectEnd === -1) {
    throw new Error('Invalid translation file structure');
  }
  
  const objectContent = content.substring(objectStart + 3, objectEnd).trim();
  
  // Parse the object and remove duplicates
  const cleanedObject = removeDuplicatesFromObject(objectContent);
  
  // Reconstruct the file
  return `import { TranslationStrings } from '../translations';

export const ${varName}: TranslationStrings = {
${cleanedObject}
};
`;
}

/**
 * Remove duplicate properties from object content
 */
function removeDuplicatesFromObject(objectContent) {
  const lines = objectContent.split('\n');
  const result = [];
  const seenPaths = new Set();
  let currentPath = [];
  let braceLevel = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed || trimmed.startsWith('//')) {
      result.push(line);
      continue;
    }
    
    // Track brace level
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    const prevBraceLevel = braceLevel;
    braceLevel += openBraces - closeBraces;
    
    // Handle property lines
    const propertyMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*/);
    
    if (propertyMatch) {
      const propertyName = propertyMatch[1];
      
      // Update current path based on brace level changes
      if (trimmed.includes(': {')) {
        // Starting a new object
        if (prevBraceLevel === 0) {
          currentPath = [propertyName];
        } else {
          currentPath = currentPath.slice(0, prevBraceLevel);
          currentPath.push(propertyName);
        }
      } else if (prevBraceLevel > 0) {
        // Regular property inside an object
        const fullPath = [...currentPath, propertyName].join('.');
        
        if (seenPaths.has(fullPath)) {
          console.log(`   🗑️  Removing duplicate: ${fullPath}`);
          continue;
        } else {
          seenPaths.add(fullPath);
        }
      }
    }
    
    // Handle closing braces - update current path
    if (trimmed === '},' || trimmed === '}') {
      if (braceLevel === 0) {
        currentPath = [];
      } else {
        currentPath = currentPath.slice(0, braceLevel);
      }
    }
    
    result.push(line);
  }
  
  return result.join('\n');
}

// Main execution
async function main() {
  const filesToFix = [
    { path: 'shared/translations/en.ts', lang: 'en' },
    { path: 'shared/translations/sq.ts', lang: 'sq' },
    { path: 'shared/translations/mk.ts', lang: 'mk' },
  ];
  
  let fixedCount = 0;
  
  for (const { path: filePath, lang } of filesToFix) {
    const fullPath = path.join(__dirname, filePath);
    
    if (fs.existsSync(fullPath)) {
      if (fixTranslationFile(fullPath, lang)) {
        fixedCount++;
      }
    } else {
      console.log(`❌ File not found: ${filePath}\n`);
    }
  }
  
  console.log(`🎉 Fixed ${fixedCount} translation files successfully!`);
  
  // Check TypeScript compilation after fixes
  console.log('\n🔍 Checking TypeScript compilation...');
  const { execSync } = require('child_process');
  
  try {
    execSync('npx tsc --noEmit --skipLibCheck shared/translations/*.ts', {
      cwd: __dirname,
      stdio: 'pipe'
    });
    console.log('✅ TypeScript compilation successful!');
  } catch (error) {
    console.log('⚠️  Still some TypeScript issues remaining - will need manual review');
  }
}

main().catch(error => {
  console.error('❌ Script failed:', error.message);
});