#!/usr/bin/env node

/**
 * Translation Extraction Tool
 * Safely extracts translation strings from TypeScript files for proofreading
 * without exposing code structure or logic
 */

const fs = require('fs');
const path = require('path');

class TranslationExtractor {
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
   * Extract translations from a TypeScript translation file
   */
  extractFromFile(filePath, languageCode) {
    console.log(`Extracting translations from: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Remove TypeScript syntax and extract object content
      const objectMatch = content.match(/export const \w+Translations:\s*TranslationStrings\s*=\s*(\{[\s\S]*\});?\s*$/);
      
      if (!objectMatch) {
        throw new Error('Could not find translation object in file');
      }

      const objectContent = objectMatch[1];
      const translations = this.parseTranslationObject(objectContent, '');
      
      this.translations[languageCode] = {
        language: languageCode,
        file: path.basename(filePath),
        extractedAt: new Date().toISOString(),
        totalKeys: Object.keys(translations).length,
        translations
      };

      this.metadata.languages.push(languageCode);
      this.metadata.totalKeys += Object.keys(translations).length;
      
      console.log(`✓ Extracted ${Object.keys(translations).length} translation keys for ${languageCode}`);
      
    } catch (error) {
      console.error(`✗ Error extracting ${languageCode}:`, error.message);
      throw error;
    }
  }

  /**
   * Parse TypeScript object content to extract key-value pairs
   */
  parseTranslationObject(content, path = '') {
    const translations = {};
    
    // Remove comments
    content = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Split into lines and process
    const lines = content.split('\n');
    let currentObject = '';
    let braceLevel = 0;
    let inString = false;
    let stringDelimiter = null;
    let currentKey = '';
    let currentValue = '';
    let isParsingValue = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      if (!line || line.startsWith('//')) continue;
      
      // Handle string parsing
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (!inString) {
          if (char === '"' || char === "'") {
            inString = true;
            stringDelimiter = char;
          } else if (char === '{') {
            braceLevel++;
          } else if (char === '}') {
            braceLevel--;
          }
        } else {
          if (char === stringDelimiter && line[j-1] !== '\\') {
            inString = false;
            stringDelimiter = null;
          }
        }
      }
      
      // Extract key-value pairs at the current level
      if (braceLevel === 1 && !inString) {
        const keyValueMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*'([^'\\]*(\\.[^'\\]*)*)'/);
        if (keyValueMatch) {
          const key = keyValueMatch[1];
          const value = keyValueMatch[2];
          const fullKey = path ? `${path}.${key}` : key;
          translations[fullKey] = {
            key: fullKey,
            value: value,
            section: path || 'root',
            context: this.extractContext(line),
            line: i + 1
          };
        }
      }
    }
    
    return translations;
  }

  /**
   * Extract context information for translators
   */
  extractContext(line) {
    // Extract comments or hints about the translation
    const commentMatch = line.match(/\/\/\s*(.+)$/);
    if (commentMatch) {
      return commentMatch[1].trim();
    }
    
    // Infer context from key name
    if (line.includes('placeholder')) return 'Form placeholder text';
    if (line.includes('button')) return 'Button label';
    if (line.includes('title')) return 'Page or section title';
    if (line.includes('description')) return 'Description text';
    if (line.includes('error')) return 'Error message';
    if (line.includes('success')) return 'Success message';
    
    return 'General UI text';
  }

  /**
   * Export translations to different formats
   */
  exportToJSON(outputPath) {
    const output = {
      metadata: this.metadata,
      translations: this.translations
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
    console.log(`✓ Exported to JSON: ${outputPath}`);
  }

  exportToCSV(outputPath, languageCode) {
    if (!this.translations[languageCode]) {
      throw new Error(`Language ${languageCode} not found`);
    }

    const translations = this.translations[languageCode].translations;
    const csv = ['Key,Section,Value,Context,Notes'];
    
    Object.values(translations).forEach(item => {
      const escapedValue = item.value.replace(/"/g, '""');
      csv.push(`"${item.key}","${item.section}","${escapedValue}","${item.context}",""`);
    });
    
    fs.writeFileSync(outputPath, csv.join('\n'), 'utf8');
    console.log(`✓ Exported ${languageCode} to CSV: ${outputPath}`);
  }

  /**
   * Export to Excel-friendly format with multiple languages
   */
  exportToExcel(outputPath) {
    const languages = Object.keys(this.translations);
    if (languages.length === 0) {
      throw new Error('No translations loaded');
    }

    // Get all unique keys
    const allKeys = new Set();
    languages.forEach(lang => {
      Object.keys(this.translations[lang].translations).forEach(key => {
        allKeys.add(key);
      });
    });

    // Create header
    const header = ['Key', 'Section', 'Context', ...languages, 'Proofreader Notes'];
    const rows = [header];

    // Create rows
    Array.from(allKeys).sort().forEach(key => {
      const firstLang = languages[0];
      const firstTranslation = this.translations[firstLang].translations[key];
      
      const row = [
        key,
        firstTranslation?.section || '',
        firstTranslation?.context || ''
      ];
      
      // Add translation values for each language
      languages.forEach(lang => {
        const translation = this.translations[lang].translations[key];
        row.push(translation?.value || '');
      });
      
      // Add empty notes column
      row.push('');
      
      rows.push(row);
    });

    // Convert to CSV format (Excel-compatible)
    const csvContent = rows.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    fs.writeFileSync(outputPath, csvContent, 'utf8');
    console.log(`✓ Exported Excel-compatible CSV: ${outputPath}`);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
Usage: node extract-translations.js <command> <options>

Commands:
  extract <lang1:file1> [lang2:file2] ...  Extract translations from files
  
Examples:
  node extract-translations.js extract en:translations/en.ts sq:translations/sq.ts
  node extract-translations.js extract mk:translations/mk.ts sl:translations/sl.ts
    `);
    process.exit(1);
  }

  const command = args[0];
  
  if (command === 'extract') {
    const extractor = new TranslationExtractor();
    const outputDir = 'proofreading-exports';
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Process each language file
    for (let i = 1; i < args.length; i++) {
      const [lang, file] = args[i].split(':');
      if (!lang || !file) {
        console.error(`Invalid format: ${args[i]}. Expected lang:file`);
        continue;
      }
      
      const fullPath = path.resolve(file);
      if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        continue;
      }
      
      extractor.extractFromFile(fullPath, lang);
    }
    
    // Export to different formats
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    
    extractor.exportToJSON(path.join(outputDir, `translations-${timestamp}.json`));
    extractor.exportToExcel(path.join(outputDir, `translations-for-proofreading-${timestamp}.csv`));
    
    // Export individual language CSVs
    Object.keys(extractor.translations).forEach(lang => {
      extractor.exportToCSV(path.join(outputDir, `${lang}-translations-${timestamp}.csv`), lang);
    });
    
    console.log(`\n✅ Extraction complete! Files saved to: ${outputDir}/`);
    console.log(`📧 Share the Excel CSV file with proofreaders: translations-for-proofreading-${timestamp}.csv`);
  }
}

if (require.main === module) {
  main();
}

module.exports = TranslationExtractor;