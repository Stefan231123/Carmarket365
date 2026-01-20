#!/usr/bin/env node

/**
 * Comprehensive Duplicate Key Fixer
 * Fixes all types of duplicate keys in translation files
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'shared', 'translations');

class ComprehensiveDuplicateFixer {
  constructor() {
    this.backupDir = path.join(TRANSLATIONS_DIR, 'backups', new Date().toISOString().split('T')[0]);
    this.duplicatesFixed = 0;
    this.sizeReduction = 0;
  }

  log(message, color = '\x1b[0m') {
    console.log(`${color}${message}\x1b[0m`);
  }

  createBackups() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    const files = fs.readdirSync(TRANSLATIONS_DIR).filter(f => f.endsWith('.ts'));
    
    files.forEach(file => {
      const source = path.join(TRANSLATIONS_DIR, file);
      const backup = path.join(this.backupDir, file);
      
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, backup);
        this.log(`✅ Backup created: ${backup}`, '\x1b[32m');
      }
    });
  }

  /**
   * Parse TypeScript object to find duplicate keys
   */
  findDuplicateKeys(content) {
    const lines = content.split('\n');
    const duplicates = [];
    const keyOccurrences = new Map();
    
    // Track all key occurrences with their line numbers
    lines.forEach((line, lineIndex) => {
      // Match object key patterns (accounting for various indentation and formatting)
      const keyMatch = line.match(/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
      
      if (keyMatch) {
        const [, indentation, key, value] = keyMatch;
        
        if (!keyOccurrences.has(key)) {
          keyOccurrences.set(key, []);
        }
        
        keyOccurrences.get(key).push({
          lineIndex,
          line: line.trim(),
          indentation,
          value: value.trim(),
          fullLine: line
        });
      }
    });
    
    // Find keys with multiple occurrences
    keyOccurrences.forEach((occurrences, key) => {
      if (occurrences.length > 1) {
        duplicates.push({
          key,
          occurrences: occurrences.sort((a, b) => a.lineIndex - b.lineIndex)
        });
      }
    });
    
    return duplicates;
  }

  /**
   * Determine which duplicate to keep (keep the most comprehensive one)
   */
  selectBestDuplicate(duplicates) {
    return duplicates.reduce((best, current) => {
      // Prefer object definitions over simple strings
      if (current.value.includes('{') && !best.value.includes('{')) {
        return current;
      }
      if (best.value.includes('{') && !current.value.includes('{')) {
        return best;
      }
      
      // Prefer longer definitions
      if (current.value.length > best.value.length) {
        return current;
      }
      
      // If equal, prefer the first occurrence
      return best;
    });
  }

  /**
   * Fix duplicates in a single file
   */
  fixDuplicatesInFile(filePath, language) {
    this.log(`\n🔧 Analyzing ${language}.ts for duplicate keys...`, '\x1b[34m');
    
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const originalSize = originalContent.length;
    const duplicateKeys = this.findDuplicateKeys(originalContent);
    
    if (duplicateKeys.length === 0) {
      this.log(`✅ No duplicate keys found in ${language}.ts`, '\x1b[32m');
      return;
    }
    
    this.log(`🔍 Found ${duplicateKeys.length} duplicate keys in ${language}.ts:`);
    
    const lines = originalContent.split('\n');
    const linesToRemove = new Set();
    let duplicatesInThisFile = 0;
    
    duplicateKeys.forEach(({ key, occurrences }) => {
      this.log(`   • Key "${key}" appears ${occurrences.length} times`);
      
      // Select the best occurrence to keep
      const bestOccurrence = this.selectBestDuplicate(occurrences);
      
      // Mark other occurrences for removal
      occurrences.forEach(occurrence => {
        if (occurrence.lineIndex !== bestOccurrence.lineIndex) {
          linesToRemove.add(occurrence.lineIndex);
          duplicatesInThisFile++;
          this.log(`     - Removing duplicate at line ${occurrence.lineIndex + 1}`, '\x1b[33m');
        }
      });
      
      this.log(`     ✓ Keeping best version at line ${bestOccurrence.lineIndex + 1}`, '\x1b[32m');
    });
    
    // Remove duplicate lines (working backwards to preserve line numbers)
    const newLines = lines.filter((_, index) => !linesToRemove.has(index));
    const newContent = newLines.join('\n');
    
    // Write the fixed file
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    // Calculate savings
    const newSize = newContent.length;
    const savedBytes = originalSize - newSize;
    const savedLines = lines.length - newLines.length;
    
    this.duplicatesFixed += duplicatesInThisFile;
    this.sizeReduction += savedBytes;
    
    this.log(`✅ Fixed ${language}.ts:`, '\x1b[32m');
    this.log(`   • Removed ${duplicatesInThisFile} duplicate keys`);
    this.log(`   • Saved ${savedLines} lines`);
    this.log(`   • Reduced size by ${(savedBytes / 1024).toFixed(1)}KB (${((savedBytes / originalSize) * 100).toFixed(1)}%)`);
  }

  /**
   * Validate that the fixed file is still valid TypeScript
   */
  validateFixedFile(filePath, language) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Basic syntax validation
      const braceBalance = (content.match(/\{/g) || []).length - (content.match(/\}/g) || []).length;
      const parenBalance = (content.match(/\(/g) || []).length - (content.match(/\)/g) || []).length;
      
      if (braceBalance !== 0) {
        this.log(`❌ ${language}.ts - Unbalanced braces (${braceBalance})`, '\x1b[31m');
        return false;
      }
      
      if (parenBalance !== 0) {
        this.log(`❌ ${language}.ts - Unbalanced parentheses (${parenBalance})`, '\x1b[31m');
        return false;
      }
      
      // Check for remaining duplicates
      const duplicates = this.findDuplicateKeys(content);
      if (duplicates.length > 0) {
        this.log(`⚠️  ${language}.ts - Still has ${duplicates.length} duplicate keys`, '\x1b[33m');
        duplicates.forEach(({ key, occurrences }) => {
          this.log(`     • "${key}" appears ${occurrences.length} times`);
        });
        return false;
      }
      
      this.log(`✅ ${language}.ts validation passed`, '\x1b[32m');
      return true;
    } catch (error) {
      this.log(`❌ ${language}.ts validation failed: ${error.message}`, '\x1b[31m');
      return false;
    }
  }

  /**
   * Run the complete fix process
   */
  async run() {
    this.log('🔧 Starting comprehensive duplicate key fixing...\n', '\x1b[1m');
    
    try {
      // Create backups
      this.log('📦 Creating backups...');
      this.createBackups();
      
      // Find all translation files
      const translationFiles = fs.readdirSync(TRANSLATIONS_DIR)
        .filter(f => f.endsWith('.ts') && f !== 'index.ts')
        .map(f => f.replace('.ts', ''));
      
      this.log(`\n📄 Found translation files: ${translationFiles.join(', ')}`);
      
      const results = {};
      
      // Fix each translation file
      for (const lang of translationFiles) {
        const filePath = path.join(TRANSLATIONS_DIR, `${lang}.ts`);
        
        if (fs.existsSync(filePath)) {
          this.fixDuplicatesInFile(filePath, lang);
          results[lang] = this.validateFixedFile(filePath, lang);
        }
      }
      
      // Summary
      this.log('\n' + '='.repeat(60), '\x1b[1m');
      this.log('DUPLICATE FIXING SUMMARY', '\x1b[1m');
      this.log('='.repeat(60), '\x1b[1m');
      
      const allPassed = Object.values(results).every(result => result);
      
      this.log(`\n📊 Results:`);
      this.log(`   • Total duplicates fixed: ${this.duplicatesFixed}`);
      this.log(`   • Total size reduction: ${(this.sizeReduction / 1024).toFixed(1)}KB`);
      
      if (allPassed) {
        this.log('\n🎉 All files fixed successfully!', '\x1b[32m');
        this.log('\n📋 Next steps:');
        this.log('  1. Test the application: npm run build');
        this.log('  2. Check for any broken translations');
        this.log('  3. Commit changes if everything works');
      } else {
        this.log('\n❌ Some files had validation errors', '\x1b[31m');
        this.log('\n🔄 To restore from backup:');
        Object.entries(results).forEach(([lang, passed]) => {
          if (!passed) {
            this.log(`  cp ${this.backupDir}/${lang}.ts ${TRANSLATIONS_DIR}/${lang}.ts`);
          }
        });
      }
      
      this.log(`\n📁 Backups saved in: ${this.backupDir}`, '\x1b[34m');
      
    } catch (error) {
      this.log(`❌ Process failed: ${error.message}`, '\x1b[31m');
      this.log(`\n🔄 Restore from backups if needed: ${this.backupDir}`, '\x1b[33m');
      process.exit(1);
    }
  }
}

// CLI usage
if (require.main === module) {
  const fixer = new ComprehensiveDuplicateFixer();
  fixer.run();
}

module.exports = ComprehensiveDuplicateFixer;