#!/usr/bin/env node

/**
 * Simple Translation Extraction Tool
 * Uses a more robust approach to extract translations from TypeScript files
 */

const fs = require('fs');
const path = require('path');

class SimpleTranslationExtractor {
  constructor() {
    this.translations = {};
    this.metadata = {
      extractedAt: new Date().toISOString(),
      version: '1.0.0',
      totalKeys: 0,
      languages: []
    };
  }

  /**
   * Extract translations using AST-like parsing
   */
  extractFromFile(filePath, languageCode) {
    console.log(`🔍 Extracting translations from: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Use a more robust approach - execute the file in a safe context
      const translations = this.parseTranslationsSafely(content);
      
      this.translations[languageCode] = {
        language: languageCode,
        file: path.basename(filePath),
        extractedAt: new Date().toISOString(),
        totalKeys: Object.keys(translations).length,
        translations
      };

      this.metadata.languages.push(languageCode);
      this.metadata.totalKeys += Object.keys(translations).length;
      
      console.log(`✅ Extracted ${Object.keys(translations).length} translation keys for ${languageCode}`);
      
    } catch (error) {
      console.error(`❌ Error extracting ${languageCode}:`, error.message);
      throw error;
    }
  }

  /**
   * Parse translations by evaluating the object safely
   */
  parseTranslationsSafely(content) {
    // Extract the object content between the = { and }; 
    const objectMatch = content.match(/export const \w+Translations:\s*TranslationStrings\s*=\s*(\{[\s\S]*?\});?\s*$/);
    
    if (!objectMatch) {
      throw new Error('Could not find translation object in file');
    }

    let objectContent = objectMatch[1];
    
    // Remove comments
    objectContent = objectContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    try {
      // Create a safe evaluation context
      const evalContext = {
        console: { log: () => {} }, // Disable console
        require: () => {}, // Disable require
        process: undefined,
        global: undefined,
        __dirname: undefined,
        __filename: undefined
      };
      
      // Safely evaluate the object
      const evalFunc = new Function('context', `
        with (context) {
          return ${objectContent};
        }
      `);
      
      const translationObject = evalFunc(evalContext);
      
      // Flatten the nested object
      return this.flattenObject(translationObject);
      
    } catch (error) {
      console.error('Error evaluating translation object:', error.message);
      // Fallback to manual parsing
      return this.parseManually(objectContent);
    }
  }

  /**
   * Recursively flatten a nested object into dot notation keys
   */
  flattenObject(obj, prefix = '') {
    const flattened = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively flatten nested objects
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else if (typeof value === 'string') {
        // Store string values with context information
        flattened[newKey] = {
          key: newKey,
          value: value,
          section: prefix || 'root',
          context: this.inferContext(newKey, value),
          line: 0 // We don't have line numbers with this approach
        };
      }
      // Skip arrays and other non-string values
    }
    
    return flattened;
  }

  /**
   * Fallback manual parsing for complex cases
   */
  parseManually(content) {
    const translations = {};
    
    // Simple regex-based extraction for key-value pairs
    const keyValueRegex = /(\w+(?:\.\w+)*)\s*:\s*['"`]([^'"`]*(?:\\.[^'"`]*)*)['"`]/g;
    let match;
    
    while ((match = keyValueRegex.exec(content)) !== null) {
      const [, key, value] = match;
      translations[key] = {
        key: key,
        value: value,
        section: key.split('.')[0] || 'root',
        context: this.inferContext(key, value),
        line: 0
      };
    }
    
    return translations;
  }

  /**
   * Infer context from key name and value
   */
  inferContext(key, value) {
    const keyLower = key.toLowerCase();
    const valueLower = value.toLowerCase();
    
    if (keyLower.includes('placeholder')) return 'Form placeholder text';
    if (keyLower.includes('button') || keyLower.includes('btn')) return 'Button label';
    if (keyLower.includes('title')) return 'Page or section title';
    if (keyLower.includes('description') || keyLower.includes('desc')) return 'Description text';
    if (keyLower.includes('error')) return 'Error message';
    if (keyLower.includes('success')) return 'Success message';
    if (keyLower.includes('label')) return 'Form label';
    if (keyLower.includes('modal')) return 'Modal dialog text';
    if (keyLower.includes('tooltip') || keyLower.includes('hint')) return 'Tooltip or hint text';
    if (keyLower.includes('header') || keyLower.includes('nav')) return 'Navigation text';
    if (keyLower.includes('footer')) return 'Footer text';
    if (keyLower.includes('menu')) return 'Menu item';
    if (keyLower.includes('tab')) return 'Tab label';
    
    // Infer from value content
    if (valueLower.includes('click') || valueLower.includes('press')) return 'Action instruction';
    if (value.endsWith('...')) return 'Loading or progress text';
    if (value.endsWith('?')) return 'Question or prompt';
    if (value.endsWith('!')) return 'Alert or exclamation';
    
    return 'General UI text';
  }

  /**
   * Export to CSV format for proofreaders
   */
  exportToCSV(outputPath, languages) {
    const allKeys = new Set();
    
    // Collect all unique keys
    languages.forEach(lang => {
      if (this.translations[lang]) {
        Object.keys(this.translations[lang].translations).forEach(key => {
          allKeys.add(key);
        });
      }
    });

    const sortedKeys = Array.from(allKeys).sort();
    
    // Create CSV header
    const header = ['Key', 'Section', 'Context', ...languages, 'Proofreader Notes'];
    const rows = [header];

    // Create data rows
    sortedKeys.forEach(key => {
      const firstLang = languages.find(lang => 
        this.translations[lang] && this.translations[lang].translations[key]
      );
      
      const firstTranslation = firstLang ? this.translations[firstLang].translations[key] : null;
      
      const row = [
        key,
        firstTranslation?.section || '',
        firstTranslation?.context || ''
      ];
      
      // Add translation values for each language
      languages.forEach(lang => {
        const translation = this.translations[lang]?.translations[key];
        row.push(translation?.value || '');
      });
      
      // Add empty notes column
      row.push('');
      
      rows.push(row);
    });

    // Convert to CSV
    const csvContent = rows.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    fs.writeFileSync(outputPath, csvContent, 'utf8');
    console.log(`✅ Exported proofreading CSV (${sortedKeys.length} keys): ${outputPath}`);
  }

  /**
   * Export to JSON format
   */
  exportToJSON(outputPath) {
    const output = {
      metadata: this.metadata,
      translations: this.translations
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
    console.log(`✅ Exported to JSON: ${outputPath}`);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
🚗 CarMarket365 Translation Extractor

Usage: node extract-translations-simple.cjs <lang1:file1> [lang2:file2] ...

Examples:
  node extract-translations-simple.cjs en:shared/translations/en.ts sq:shared/translations/sq.ts
  node extract-translations-simple.cjs mk:shared/translations/mk.ts sl:shared/translations/sl.ts lv:shared/translations/lv.ts
    `);
    process.exit(1);
  }

  const extractor = new SimpleTranslationExtractor();
  const outputDir = 'proofreading-exports';
  const languages = [];
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🚀 Starting translation extraction...\n');
  
  // Process each language file
  for (let i = 0; i < args.length; i++) {
    const [lang, file] = args[i].split(':');
    if (!lang || !file) {
      console.error(`❌ Invalid format: ${args[i]}. Expected lang:file`);
      continue;
    }
    
    const fullPath = path.resolve(file);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`);
      continue;
    }
    
    try {
      extractor.extractFromFile(fullPath, lang);
      languages.push(lang);
    } catch (error) {
      console.error(`❌ Failed to extract ${lang}: ${error.message}`);
    }
  }
  
  if (languages.length === 0) {
    console.error('❌ No translations were successfully extracted');
    process.exit(1);
  }
  
  // Export to different formats
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
  
  extractor.exportToJSON(path.join(outputDir, `translations-${timestamp}.json`));
  extractor.exportToCSV(path.join(outputDir, `translations-for-proofreading-${timestamp}.csv`), languages);
  
  console.log(`\n✅ Extraction complete!`);
  console.log(`📁 Files saved to: ${outputDir}/`);
  console.log(`📧 Share this file with proofreaders: translations-for-proofreading-${timestamp}.csv`);
  console.log(`\n📊 Summary:`);
  console.log(`   Languages: ${languages.join(', ')}`);
  console.log(`   Total keys: ${extractor.metadata.totalKeys}`);
  console.log(`   Unique keys: ${new Set(Object.values(extractor.translations).flatMap(t => Object.keys(t.translations))).size}`);
}

if (require.main === module) {
  main();
}

module.exports = SimpleTranslationExtractor;