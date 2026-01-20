#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Translation files to analyze
const translationFiles = [
  'shared/translations/en.ts',
  'shared/translations/sq.ts',
  'shared/translations/mk.ts',
  'shared/translations/sl.ts',
  'shared/translations/lv.ts',
  'shared/translations/ru.ts'
];

console.log('🔍 TRANSLATION SYSTEM ANALYSIS');
console.log('==============================\n');

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const stats = {
      fileName: path.basename(filePath),
      totalLines: lines.length,
      fileSize: (fs.statSync(filePath).size / 1024).toFixed(2) + ' KB',
      duplicateProperties: [],
      syntaxErrors: [],
      missingImports: [],
      structureIssues: []
    };

    // Check for duplicate properties
    const propertyMatches = content.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/gm);
    if (propertyMatches) {
      const propertyCount = {};
      propertyMatches.forEach(match => {
        const prop = match.trim().replace(':', '');
        propertyCount[prop] = (propertyCount[prop] || 0) + 1;
      });
      
      for (const [prop, count] of Object.entries(propertyCount)) {
        if (count > 1) {
          stats.duplicateProperties.push({ property: prop, count });
        }
      }
    }

    // Check for syntax issues
    if (content.includes('import { TranslationStrings }') && 
        !content.includes('export const') && 
        !content.includes('TranslationStrings')) {
      stats.missingImports.push('Missing export declaration');
    }

    // Check for unclosed braces or syntax issues
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      stats.syntaxErrors.push(`Unmatched braces: ${openBraces} open, ${closeBraces} close`);
    }

    // Check for missing semicolons or commas
    const problematicLines = lines.filter((line, index) => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             trimmed.includes(':') && 
             !trimmed.endsWith(',') && 
             !trimmed.endsWith('{') &&
             !trimmed.endsWith('}') &&
             !trimmed.includes('//') &&
             !trimmed.includes('export') &&
             !trimmed.includes('import');
    });

    if (problematicLines.length > 0) {
      stats.syntaxErrors.push(`Potential missing commas: ${problematicLines.length} lines`);
    }

    return stats;

  } catch (error) {
    return {
      fileName: path.basename(filePath),
      error: error.message
    };
  }
}

// Analyze each translation file
translationFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const analysis = analyzeFile(fullPath);
    
    console.log(`📄 ${analysis.fileName}`);
    console.log(`   Size: ${analysis.fileSize}`);
    console.log(`   Lines: ${analysis.totalLines}`);
    
    if (analysis.error) {
      console.log(`   ❌ ERROR: ${analysis.error}`);
    } else {
      if (analysis.duplicateProperties.length > 0) {
        console.log(`   🔄 Duplicate Properties: ${analysis.duplicateProperties.length}`);
        analysis.duplicateProperties.slice(0, 5).forEach(dup => {
          console.log(`      - ${dup.property}: ${dup.count} times`);
        });
      }
      
      if (analysis.syntaxErrors.length > 0) {
        console.log(`   ⚠️  Syntax Issues: ${analysis.syntaxErrors.length}`);
        analysis.syntaxErrors.forEach(error => {
          console.log(`      - ${error}`);
        });
      }
      
      if (analysis.duplicateProperties.length === 0 && analysis.syntaxErrors.length === 0) {
        console.log(`   ✅ No obvious issues detected`);
      }
    }
    console.log('');
  } else {
    console.log(`❌ File not found: ${filePath}\n`);
  }
});

// Check TypeScript compilation issues
console.log('🔍 TYPESCRIPT COMPILATION CHECK');
console.log('================================\n');
try {
  const tscOutput = execSync('npx tsc --noEmit --skipLibCheck', { 
    cwd: __dirname,
    encoding: 'utf8',
    timeout: 60000
  });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  const errorOutput = error.stdout || error.stderr || error.message;
  const translationErrors = errorOutput
    .split('\n')
    .filter(line => line.includes('translations/'))
    .slice(0, 20); // Show first 20 translation-related errors

  if (translationErrors.length > 0) {
    console.log('❌ Translation-related TypeScript errors:');
    translationErrors.forEach(error => console.log(`   ${error}`));
  } else {
    console.log('ℹ️  No translation-specific TypeScript errors found');
  }
}

console.log('\n🎯 RECOMMENDATIONS');
console.log('==================');
console.log('1. Fix duplicate properties in translation files');
console.log('2. Ensure proper TypeScript interface compliance');
console.log('3. Add comprehensive error handling');
console.log('4. Implement lazy loading for large translation files');
console.log('5. Create validation system for translation completeness');