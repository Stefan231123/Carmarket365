#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const translationFiles = [
  'shared/translations/en.ts',
  'shared/translations/sq.ts',
  'shared/translations/mk.ts',
  'shared/translations/sl.ts',
  'shared/translations/lv.ts',
  'shared/translations/ru.ts'
];

console.log('🔧 FIXING TRANSLATION DUPLICATE PROPERTIES');
console.log('==========================================\n');

function createBackup(filePath) {
  const backupPath = `${filePath}.backup-${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`📁 Backup created: ${path.basename(backupPath)}`);
  return backupPath;
}

function fixDuplicateProperties(content, fileName) {
  console.log(`🔍 Processing ${fileName}...`);
  
  // Split content into lines for processing
  const lines = content.split('\n');
  const processedLines = [];
  const seenProperties = new Map();
  let currentObjectPath = [];
  let braceLevel = 0;
  let inObjectLiteral = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Track object nesting level
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    braceLevel += openBraces - closeBraces;
    
    // Check if we're entering/exiting object literals
    if (trimmed.includes(': {') || trimmed.includes('= {')) {
      inObjectLiteral = true;
    }
    
    // Extract property name from line
    const propertyMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
    
    if (propertyMatch && inObjectLiteral && braceLevel > 1) {
      const propertyName = propertyMatch[1];
      const fullPath = `${currentObjectPath.join('.')}.${propertyName}`;
      
      if (seenProperties.has(fullPath)) {
        console.log(`   ❌ Removing duplicate: ${fullPath} at line ${i + 1}`);
        continue; // Skip this duplicate line
      } else {
        seenProperties.set(fullPath, i + 1);
      }
    }
    
    // Track current object path for nested properties
    if (propertyMatch && trimmed.endsWith(': {')) {
      if (braceLevel <= 2) {
        currentObjectPath = [propertyMatch[1]];
      } else if (braceLevel === 3) {
        currentObjectPath = currentObjectPath.slice(0, 1);
        currentObjectPath.push(propertyMatch[1]);
      }
    }
    
    // Reset path when closing objects
    if (trimmed === '},' || trimmed === '}') {
      if (braceLevel === 1) {
        currentObjectPath = [];
      } else if (braceLevel === 2 && currentObjectPath.length > 1) {
        currentObjectPath.pop();
      }
    }
    
    processedLines.push(line);
  }
  
  return processedLines.join('\n');
}

function fixSyntaxIssues(content) {
  // Fix missing commas
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
    
    // Add missing comma if line ends with string and next line starts with property
    if (trimmed.length > 0 && 
        trimmed.includes(':') && 
        trimmed.endsWith("'") && 
        !trimmed.endsWith(',') && 
        nextLine.match(/^[a-zA-Z_]/)) {
      fixedLines.push(line + ',');
      console.log(`   🔧 Added missing comma at line ${i + 1}`);
    } else {
      fixedLines.push(line);
    }
  }
  
  return fixedLines.join('\n');
}

function validateTranslationStructure(content, fileName) {
  console.log(`✅ Validating ${fileName} structure...`);
  
  // Check basic structure
  if (!content.includes('import { TranslationStrings }')) {
    console.log(`   ⚠️  Missing TranslationStrings import`);
    return false;
  }
  
  if (!content.includes('export const')) {
    console.log(`   ⚠️  Missing export declaration`);
    return false;
  }
  
  // Check brace balance
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    console.log(`   ❌ Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
    return false;
  }
  
  console.log(`   ✅ Structure validation passed`);
  return true;
}

// Process each translation file
async function processTranslationFiles() {
  for (const filePath of translationFiles) {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ File not found: ${filePath}\n`);
      continue;
    }
    
    try {
      // Create backup
      createBackup(fullPath);
      
      // Read original content
      const originalContent = fs.readFileSync(fullPath, 'utf8');
      console.log(`📄 Original size: ${(originalContent.length / 1024).toFixed(2)} KB`);
      
      // Fix duplicate properties
      let fixedContent = fixDuplicateProperties(originalContent, path.basename(filePath));
      
      // Fix syntax issues
      fixedContent = fixSyntaxIssues(fixedContent);
      
      // Validate structure
      if (!validateTranslationStructure(fixedContent, path.basename(filePath))) {
        console.log(`❌ Failed validation for ${path.basename(filePath)}\n`);
        continue;
      }
      
      // Write fixed content
      fs.writeFileSync(fullPath, fixedContent, 'utf8');
      console.log(`💾 Fixed file saved: ${(fixedContent.length / 1024).toFixed(2)} KB`);
      console.log(`📊 Size reduction: ${((originalContent.length - fixedContent.length) / 1024).toFixed(2)} KB\n`);
      
    } catch (error) {
      console.log(`❌ Error processing ${path.basename(filePath)}: ${error.message}\n`);
    }
  }
}

// Run the fixes
processTranslationFiles().then(() => {
  console.log('🎉 Translation file processing completed!');
  console.log('📋 Next steps:');
  console.log('1. Run TypeScript compilation check');
  console.log('2. Test translation loading');
  console.log('3. Verify all languages work correctly');
}).catch(error => {
  console.error('❌ Process failed:', error.message);
});