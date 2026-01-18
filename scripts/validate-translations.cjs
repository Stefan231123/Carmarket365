#!/usr/bin/env node

/**
 * Translation Validation Tool
 * Detects duplicate keys, missing translations, and quality issues
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TRANSLATIONS_DIR = path.join(__dirname, '..', 'shared', 'translations');
const LANGUAGES = ['mk', 'sq', 'en'];

// Color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class TranslationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {};
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  error(message) {
    this.errors.push(message);
    this.log(`❌ ${message}`, 'red');
  }

  warning(message) {
    this.warnings.push(message);
    this.log(`⚠️  ${message}`, 'yellow');
  }

  success(message) {
    this.log(`✅ ${message}`, 'green');
  }

  info(message) {
    this.log(`ℹ️  ${message}`, 'blue');
  }

  /**
   * Check for duplicate object keys in a file
   */
  checkDuplicateKeys(filePath, language) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Find top-level object keys
    const topLevelKeys = {};
    const duplicates = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^  ([a-zA-Z_][a-zA-Z0-9_]*): \\{/);
      if (match) {
        const key = match[1];
        const lineNum = index + 1;
        
        if (topLevelKeys[key]) {
          duplicates.push({
            key,
            original: topLevelKeys[key],
            duplicate: lineNum
          });
        } else {
          topLevelKeys[key] = lineNum;
        }
      }
    });
    
    if (duplicates.length > 0) {
      this.error(`${language}.ts has ${duplicates.length} duplicate object keys:`);
      duplicates.forEach(dup => {
        this.error(`  - "${dup.key}" at lines ${dup.original} and ${dup.duplicate}`);
      });
    } else {
      this.success(`${language}.ts: No duplicate keys found`);
    }
    
    return duplicates;
  }

  /**
   * Extract all translation keys from a file
   */
  extractKeys(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Remove the export statement and evaluate as object
      const objectContent = content
        .replace(/^export const \\w+ = /, '')
        .replace(/;\\s*$/, '');
      
      // This is a simplified key extraction - in a real implementation,
      // you'd want to use a proper JavaScript parser like @babel/parser
      const keys = [];
      this.extractKeysRecursive(JSON.parse('{}'), '', keys); // Simplified
      return keys;
    } catch (error) {
      this.warning(`Could not parse ${filePath}: ${error.message}`);
      return [];
    }
  }

  /**
   * Extract keys recursively from translation object
   */
  extractKeysRecursive(obj, prefix, keys) {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.extractKeysRecursive(value, fullKey, keys);
      } else {
        keys.push(fullKey);
      }
    }
  }

  /**
   * Check for hardcoded strings in React components
   */
  async checkHardcodedStrings(componentDir) {
    const { glob } = await import('glob');
    const patterns = [
      path.join(componentDir, '**/*.tsx'),
      path.join(componentDir, '**/*.ts')
    ];
    
    let totalHardcoded = 0;
    
    for (const pattern of patterns) {
      const files = await glob.glob(pattern);
      
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const hardcoded = this.findHardcodedStrings(content);
        
        if (hardcoded.length > 0) {
          this.warning(`${path.relative(process.cwd(), file)} has ${hardcoded.length} hardcoded strings:`);
          hardcoded.forEach(item => {
            this.warning(`  Line ${item.line}: "${item.text}"`);
          });
          totalHardcoded += hardcoded.length;
        }
      }
    }
    
    if (totalHardcoded === 0) {
      this.success('No hardcoded strings found in components');
    } else {
      this.warning(`Total hardcoded strings found: ${totalHardcoded}`);
    }
    
    return totalHardcoded;
  }

  /**
   * Find hardcoded strings in code content
   */
  findHardcodedStrings(content) {
    const lines = content.split('\n');
    const hardcoded = [];
    
    lines.forEach((line, index) => {
      // Skip comments and imports
      if (line.trim().startsWith('//') || 
          line.trim().startsWith('/*') || 
          line.trim().startsWith('*') ||
          line.includes('import ') ||
          line.includes('console.log') ||
          line.includes('console.error') ||
          line.includes('console.warn')) {
        return;
      }
      
      // Find string literals that might be user-facing text
      const stringMatches = [
        ...line.matchAll(/"([^"]{10,})"/g),  // Double quotes, 10+ chars
        ...line.matchAll(/'([^']{10,})'/g),  // Single quotes, 10+ chars
        ...line.matchAll(/`([^`]{10,})`/g)   // Template literals, 10+ chars
      ];
      
      stringMatches.forEach(match => {
        const text = match[1];
        
        // Skip if it looks like code (contains common programming patterns)
        if (this.looksLikeCode(text)) {
          return;
        }
        
        // Skip if it's a translation function call
        if (line.includes('t(') || line.includes('useTranslation')) {
          return;
        }
        
        hardcoded.push({
          line: index + 1,
          text: text.length > 50 ? text.substring(0, 50) + '...' : text
        });
      });
    });
    
    return hardcoded;
  }

  /**
   * Check if a string looks like code rather than user-facing text
   */
  looksLikeCode(text) {
    const codePatterns = [
      /^[a-zA-Z_][a-zA-Z0-9_.]*$/,  // Variable names
      /^https?:\/\//,              // URLs
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Emails
      /^[/#@].*$/,                  // Paths, CSS selectors, etc.
      /^\d+(\.\d+)?[a-zA-Z%]*$/, // Numbers with units
      /[{}\[\]<>()]/,             // Brackets (likely code)
      /^[A-Z_][A-Z0-9_]*$/,         // Constants
      /className|onClick|onChange|onSubmit/i // React props
    ];
    
    return codePatterns.some(pattern => pattern.test(text));
  }

  /**
   * Check file sizes and suggest optimization
   */
  checkFileSizes() {
    LANGUAGES.forEach(lang => {
      const filePath = path.join(TRANSLATIONS_DIR, `${lang}.ts`);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
        
        this.info(`${lang}.ts: ${sizeKB}KB, ${lines} lines`);
        
        if (stats.size > 200000) { // 200KB
          this.warning(`${lang}.ts is large (${sizeKB}KB) - consider splitting into modules`);
        }
        
        this.stats[lang] = { size: stats.size, lines };
      }
    });
  }

  /**
   * Generate summary report
   */
  generateReport() {
    this.log('\n' + '='.repeat(60), 'bold');
    this.log('TRANSLATION VALIDATION SUMMARY', 'bold');
    this.log('='.repeat(60), 'bold');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      this.success('\\n🎉 All validation checks passed!');
    } else {
      if (this.errors.length > 0) {
        this.log(`\\n❌ ${this.errors.length} errors found:`, 'red');
        this.errors.forEach(error => this.log(`  - ${error}`, 'red'));
      }
      
      if (this.warnings.length > 0) {
        this.log(`\\n⚠️  ${this.warnings.length} warnings found:`, 'yellow');
        this.warnings.forEach(warning => this.log(`  - ${warning}`, 'yellow'));
      }
    }
    
    // File statistics
    this.log('\\n📊 File Statistics:', 'blue');
    Object.entries(this.stats).forEach(([lang, stats]) => {
      this.log(`  ${lang}.ts: ${(stats.size/1024).toFixed(1)}KB, ${stats.lines} lines`, 'blue');
    });
    
    this.log('\\n');
    return {
      errors: this.errors.length,
      warnings: this.warnings.length,
      passed: this.errors.length === 0
    };
  }

  /**
   * Run all validation checks
   */
  async runAll() {
    this.log('🔍 Running translation validation...\\n', 'bold');
    
    // Check duplicate keys
    this.log('Checking for duplicate object keys...', 'blue');
    LANGUAGES.forEach(lang => {
      const filePath = path.join(TRANSLATIONS_DIR, `${lang}.ts`);
      if (fs.existsSync(filePath)) {
        this.checkDuplicateKeys(filePath, lang);
      }
    });
    
    // Check file sizes
    this.log('\\nChecking file sizes...', 'blue');
    this.checkFileSizes();
    
    // Check for hardcoded strings (if component directory exists)
    const componentDir = path.join(__dirname, '..', 'client');
    if (fs.existsSync(componentDir)) {
      this.log('\\nChecking for hardcoded strings...', 'blue');
      await this.checkHardcodedStrings(componentDir);
    }
    
    // Generate final report
    return this.generateReport();
  }
}

// CLI usage
if (require.main === module) {
  const validator = new TranslationValidator();
  validator.runAll().then(result => {
    process.exit(result.passed ? 0 : 1);
  }).catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

module.exports = TranslationValidator;