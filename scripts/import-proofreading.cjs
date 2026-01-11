#!/usr/bin/env node

/**
 * Translation Import Tool
 * Safely imports proofreader changes back into TypeScript translation files
 * with validation and backup functionality
 */

const fs = require('fs');
const path = require('path');

class TranslationImporter {
  constructor() {
    this.backupDir = 'translation-backups';
    this.changesApplied = 0;
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Import proofreader changes from JSON file
   */
  async importChanges(changesFile, translationFiles) {
    console.log('🔄 Starting translation import process...\n');
    
    // Load changes
    const changes = this.loadChanges(changesFile);
    console.log(`📝 Loaded ${Object.keys(changes.modifications).length} modifications from ${changes.metadata.proofreader}`);
    
    // Create backup directory
    this.createBackupDirectory();
    
    // Process each translation file
    for (const [lang, filePath] of Object.entries(translationFiles)) {
      await this.processTranslationFile(lang, filePath, changes.modifications);
    }
    
    // Report results
    this.printReport();
    
    if (this.errors.length > 0) {
      console.log('\n❌ Import completed with errors. Please review the issues above.');
      process.exit(1);
    } else {
      console.log('\n✅ Import completed successfully!');
    }
  }

  loadChanges(changesFile) {
    try {
      const content = fs.readFileSync(changesFile, 'utf8');
      const changes = JSON.parse(content);
      
      if (!changes.modifications) {
        throw new Error('Invalid changes file format - missing modifications');
      }
      
      return changes;
    } catch (error) {
      console.error('❌ Error loading changes file:', error.message);
      process.exit(1);
    }
  }

  createBackupDirectory() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    this.backupSubdir = path.join(this.backupDir, `backup-${timestamp}`);
    fs.mkdirSync(this.backupSubdir, { recursive: true });
  }

  async processTranslationFile(lang, filePath, modifications) {
    console.log(`\n🔍 Processing ${lang}: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      this.errors.push(`File not found: ${filePath}`);
      return;
    }
    
    // Create backup
    const backupPath = path.join(this.backupSubdir, `${lang}.ts.backup`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`  💾 Backup created: ${backupPath}`);
    
    try {
      // Read original file
      const originalContent = fs.readFileSync(filePath, 'utf8');
      
      // Apply modifications
      const modifiedContent = this.applyModifications(originalContent, lang, modifications);
      
      // Validate the result
      if (this.validateTypeScript(modifiedContent)) {
        // Write the modified file
        fs.writeFileSync(filePath, modifiedContent, 'utf8');
        console.log(`  ✅ Successfully updated ${lang} translations`);
      } else {
        this.errors.push(`TypeScript validation failed for ${lang}`);
      }
      
    } catch (error) {
      this.errors.push(`Error processing ${lang}: ${error.message}`);
    }
  }

  applyModifications(content, lang, modifications) {
    let modifiedContent = content;
    let fileChanges = 0;
    
    // Extract the translation object
    const objectMatch = content.match(/export const \w+Translations:\s*TranslationStrings\s*=\s*(\{[\s\S]*\});?\s*$/);
    
    if (!objectMatch) {
      throw new Error('Could not find translation object in file');
    }
    
    // Process each modification
    Object.entries(modifications).forEach(([key, changes]) => {
      if (changes.languages && changes.languages[lang]) {
        const newValue = changes.languages[lang];
        const oldValueMatch = this.findTranslationValue(content, key);
        
        if (oldValueMatch) {
          // Escape quotes in the new value
          const escapedValue = newValue.replace(/'/g, "\\'");
          
          // Replace the old value with the new one
          const oldPattern = new RegExp(
            `(\\s*${this.escapeRegex(key)}\\s*:\\s*')([^'\\\\]*(?:\\\\.[^'\\\\]*)*)(')`
          );
          
          const replacement = `$1${escapedValue}$3`;
          
          if (oldPattern.test(modifiedContent)) {
            modifiedContent = modifiedContent.replace(oldPattern, replacement);
            fileChanges++;
            this.changesApplied++;
          } else {
            this.warnings.push(`Could not find pattern for key: ${key} in ${lang}`);
          }
        } else {
          this.warnings.push(`Translation key not found: ${key} in ${lang}`);
        }
      }
    });
    
    console.log(`  📝 Applied ${fileChanges} changes to ${lang}`);
    return modifiedContent;
  }

  findTranslationValue(content, key) {
    // Create a regex to find the specific translation key and its value
    const pattern = new RegExp(
      `\\s*${this.escapeRegex(key)}\\s*:\\s*'([^'\\\\]*(?:\\\\.[^'\\\\]*)*)'`
    );
    
    return content.match(pattern);
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
  }

  validateTypeScript(content) {
    try {
      // Basic syntax validation
      
      // Check for balanced braces
      const openBraces = (content.match(/\\{/g) || []).length;
      const closeBraces = (content.match(/\\}/g) || []).length;
      
      if (openBraces !== closeBraces) {
        this.warnings.push('Unbalanced braces detected');
        return false;
      }
      
      // Check for proper export statement
      if (!content.includes('export const') || !content.includes('TranslationStrings')) {
        this.warnings.push('Invalid export statement');
        return false;
      }
      
      // Check for unescaped quotes
      const invalidQuotes = content.match(/'[^']*'[^']*'/);
      if (invalidQuotes) {
        this.warnings.push('Potentially unescaped quotes detected');
      }
      
      return true;
    } catch (error) {
      this.warnings.push(`Validation error: ${error.message}`);
      return false;
    }
  }

  printReport() {
    console.log('\n📊 Import Report');
    console.log('================');
    console.log(`✅ Changes applied: ${this.changesApplied}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(error => console.log(`   • ${error}`));
    }
    
    console.log(`\n💾 Backups saved to: ${this.backupSubdir}`);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
Usage: node import-proofreading.js <changes.json> <lang1:file1> [lang2:file2] ...

Arguments:
  changes.json    JSON file exported from proofreading tool
  lang:file       Language code and corresponding translation file

Examples:
  node import-proofreading.js changes.json en:translations/en.ts sq:translations/sq.ts
  node import-proofreading.js proofreader-changes.json mk:translations/mk.ts
    `);
    process.exit(1);
  }

  const changesFile = args[0];
  const translationFiles = {};
  
  // Parse translation file arguments
  for (let i = 1; i < args.length; i++) {
    const [lang, file] = args[i].split(':');
    if (!lang || !file) {
      console.error(`Invalid format: ${args[i]}. Expected lang:file`);
      continue;
    }
    
    const fullPath = path.resolve(file);
    translationFiles[lang] = fullPath;
  }
  
  if (Object.keys(translationFiles).length === 0) {
    console.error('No valid translation files provided');
    process.exit(1);
  }
  
  // Run the import
  const importer = new TranslationImporter();
  importer.importChanges(changesFile, translationFiles)
    .catch(error => {
      console.error('Fatal error:', error.message);
      process.exit(1);
    });
}

if (require.main === module) {
  main();
}

module.exports = TranslationImporter;