#!/usr/bin/env node

/**
 * Safe Duplicate Objects Fixer
 * Merges duplicate translation objects while preserving all content
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'shared', 'translations');

class DuplicateObjectFixer {
  constructor() {
    this.backupDir = path.join(TRANSLATIONS_DIR, 'backups', new Date().toISOString().split('T')[0]);
  }

  log(message, color = '\x1b[0m') {
    console.log(`${color}${message}\x1b[0m`);
  }

  createBackups() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    ['mk.ts', 'sq.ts'].forEach(file => {
      const source = path.join(TRANSLATIONS_DIR, file);
      const backup = path.join(this.backupDir, file);
      
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, backup);
        this.log(`✅ Backup created: ${backup}`, '\x1b[32m');
      }
    });
  }

  /**
   * Find all finalFixes objects and their boundaries
   */
  findFinalFixesObjects(content) {
    const lines = content.split('\\n');
    const objects = [];
    let inFinalFixes = false;
    let braceCount = 0;
    let currentObject = null;

    lines.forEach((line, index) => {
      if (line.trim().match(/^finalFixes:\\s*\\{/)) {
        currentObject = {
          startLine: index,
          content: [],
          endLine: null
        };
        inFinalFixes = true;
        braceCount = 1;
        currentObject.content.push(line);
      } else if (inFinalFixes) {
        currentObject.content.push(line);
        
        // Count braces to find the end
        const openBraces = (line.match(/\\{/g) || []).length;
        const closeBraces = (line.match(/\\}/g) || []).length;
        braceCount += openBraces - closeBraces;
        
        if (braceCount === 0 && line.trim().endsWith('},')) {
          currentObject.endLine = index;
          objects.push(currentObject);
          inFinalFixes = false;
          currentObject = null;
        }
      }
    });

    return objects;
  }

  /**
   * Extract content from finalFixes object
   */
  extractFinalFixesContent(objectLines) {
    const content = {};
    let currentKey = null;
    let braceCount = 0;
    let keyContent = [];

    objectLines.slice(1, -1).forEach(line => { // Skip first and last line
      const keyMatch = line.match(/^\\s+([a-zA-Z][a-zA-Z0-9_]*):\\s*\\{/);
      
      if (keyMatch) {
        // Save previous key content
        if (currentKey && keyContent.length > 0) {
          content[currentKey] = keyContent.join('\\n');
        }
        
        // Start new key
        currentKey = keyMatch[1];
        keyContent = [line];
        braceCount = 1;
      } else if (currentKey) {
        keyContent.push(line);
        
        const openBraces = (line.match(/\\{/g) || []).length;
        const closeBraces = (line.match(/\\}/g) || []).length;
        braceCount += openBraces - closeBraces;
        
        if (braceCount === 0 && line.trim().endsWith('},')) {
          content[currentKey] = keyContent.join('\\n');
          currentKey = null;
          keyContent = [];
        }
      }
    });
    
    return content;
  }

  /**
   * Merge all finalFixes objects into one comprehensive object
   */
  mergeFinalFixesObjects(objects) {
    const mergedContent = {};
    
    objects.forEach((obj, index) => {
      this.log(`📝 Processing finalFixes object #${index + 1} (lines ${obj.startLine + 1}-${obj.endLine + 1})`);
      
      const content = this.extractFinalFixesContent(obj.content);
      
      Object.entries(content).forEach(([key, value]) => {
        if (mergedContent[key]) {
          this.log(`⚠️  Duplicate key "${key}" found - keeping most comprehensive version`, '\x1b[33m');
          
          // Keep the longer/more comprehensive version
          if (value.length > mergedContent[key].length) {
            mergedContent[key] = value;
            this.log(`   → Using newer version (${value.length} chars vs ${mergedContent[key].length} chars)`);
          } else {
            this.log(`   → Keeping existing version (${mergedContent[key].length} chars vs ${value.length} chars)`);
          }
        } else {
          mergedContent[key] = value;
          this.log(`✅ Added key "${key}"`);
        }
      });
    });
    
    return mergedContent;
  }

  /**
   * Generate merged finalFixes object string
   */
  generateMergedFinalFixes(mergedContent) {
    const lines = ['  finalFixes: {'];
    
    Object.entries(mergedContent).forEach(([key, content]) => {
      // Add the content (which includes the key line and closing brace)
      const contentLines = content.split('\\n');
      lines.push(...contentLines);
    });
    
    lines.push('  },');
    return lines.join('\\n');
  }

  /**
   * Fix duplicate objects in a file
   */
  fixDuplicatesInFile(filePath, language) {
    this.log(`\\n🔧 Fixing duplicates in ${language}.ts...`, '\x1b[34m');
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\\n');
    
    // Find all finalFixes objects
    const finalFixesObjects = this.findFinalFixesObjects(content);
    
    if (finalFixesObjects.length <= 1) {
      this.log(`✅ No duplicate finalFixes objects found in ${language}.ts`, '\x1b[32m');
      return;
    }
    
    this.log(`🔍 Found ${finalFixesObjects.length} finalFixes objects in ${language}.ts`);
    
    // Merge all objects
    const mergedContent = this.mergeFinalFixesObjects(finalFixesObjects);
    
    // Generate the new merged object
    const mergedFinalFixes = this.generateMergedFinalFixes(mergedContent);
    
    // Remove all original finalFixes objects (working backwards to preserve line numbers)
    let newLines = [...lines];
    for (let i = finalFixesObjects.length - 1; i >= 0; i--) {
      const obj = finalFixesObjects[i];
      newLines.splice(obj.startLine, obj.endLine - obj.startLine + 1);
    }
    
    // Insert the merged object at the position of the first original object
    const insertPosition = finalFixesObjects[0].startLine;
    const mergedLines = mergedFinalFixes.split('\\n');
    newLines.splice(insertPosition, 0, ...mergedLines);
    
    // Write the fixed file
    const newContent = newLines.join('\\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    // Calculate savings
    const originalLines = lines.length;
    const newLineCount = newLines.length;
    const savedLines = originalLines - newLineCount;
    
    this.log(`✅ Fixed ${language}.ts:`, '\x1b[32m');
    this.log(`   • Merged ${finalFixesObjects.length} finalFixes objects into 1`);
    this.log(`   • Preserved ${Object.keys(mergedContent).length} unique keys`);
    this.log(`   • Saved ${savedLines} lines (${originalLines} → ${newLineCount})`);
    this.log(`   • Reduced file size by ${((savedLines / originalLines) * 100).toFixed(1)}%`);
  }

  /**
   * Validate the fixed file
   */
  validateFixedFile(filePath, language) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for syntax errors (basic check)
      if (content.includes('finalFixes: {')) {
        const finalFixesCount = (content.match(/finalFixes:\\s*\\{/g) || []).length;
        
        if (finalFixesCount === 1) {
          this.log(`✅ ${language}.ts validation passed - single finalFixes object found`, '\x1b[32m');
          return true;
        } else {
          this.log(`❌ ${language}.ts validation failed - found ${finalFixesCount} finalFixes objects`, '\x1b[31m');
          return false;
        }
      } else {
        this.log(`⚠️  ${language}.ts - no finalFixes object found`, '\x1b[33m');
        return true; // Not an error if no finalFixes
      }
    } catch (error) {
      this.log(`❌ ${language}.ts validation failed: ${error.message}`, '\x1b[31m');
      return false;
    }
  }

  /**
   * Run the complete fix process
   */
  async run() {
    this.log('🔧 Starting duplicate object fixing process...\\n', '\x1b[1m');
    
    try {
      // Create backups
      this.log('📦 Creating backups...');
      this.createBackups();
      
      // Fix each language file
      const languages = ['mk', 'sq'];
      const results = {};
      
      for (const lang of languages) {
        const filePath = path.join(TRANSLATIONS_DIR, `${lang}.ts`);
        
        if (fs.existsSync(filePath)) {
          this.fixDuplicatesInFile(filePath, lang);
          results[lang] = this.validateFixedFile(filePath, lang);
        } else {
          this.log(`⚠️  ${lang}.ts not found, skipping...`, '\x1b[33m');
        }
      }
      
      // Summary
      this.log('\\n' + '='.repeat(60), '\x1b[1m');
      this.log('DUPLICATE FIXING SUMMARY', '\x1b[1m');
      this.log('='.repeat(60), '\x1b[1m');
      
      const allPassed = Object.values(results).every(result => result);
      
      if (allPassed) {
        this.log('\\n🎉 All files fixed successfully!', '\x1b[32m');
        this.log('\\n📋 Next steps:');
        this.log('  1. Test the application thoroughly');
        this.log('  2. Check for any missing translations');
        this.log('  3. Run the validation script: node scripts/validate-translations.js');
        this.log('  4. Commit the changes if everything works');
      } else {
        this.log('\\n❌ Some files had validation errors', '\x1b[31m');
        this.log('\\n🔄 To restore from backup:');
        Object.entries(results).forEach(([lang, passed]) => {
          if (!passed) {
            this.log(`  cp ${this.backupDir}/${lang}.ts ${TRANSLATIONS_DIR}/${lang}.ts`);
          }
        });
      }
      
      this.log(`\\n📁 Backups saved in: ${this.backupDir}`, '\x1b[34m');
      
    } catch (error) {
      this.log(`❌ Process failed: ${error.message}`, '\x1b[31m');
      this.log(`\\n🔄 Restore from backups: ${this.backupDir}`, '\x1b[33m');
      process.exit(1);
    }
  }
}

// CLI usage
if (require.main === module) {
  const fixer = new DuplicateObjectFixer();
  fixer.run();
}

module.exports = DuplicateObjectFixer;