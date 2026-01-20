#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🏗️  CREATING MINIMAL INTERFACE-COMPLIANT TRANSLATIONS');
console.log('=====================================================\n');

/**
 * Parse the TranslationStrings interface to extract the structure
 */
function parseInterfaceStructure() {
  const interfaceFile = fs.readFileSync(path.join(__dirname, 'shared/translations.ts'), 'utf8');
  
  // Find the interface definition
  const interfaceMatch = interfaceFile.match(/export interface TranslationStrings \{([\s\S]*?)\n\}/);
  if (!interfaceMatch) {
    throw new Error('Could not find TranslationStrings interface');
  }
  
  const interfaceContent = interfaceMatch[1];
  console.log('📋 Parsing TranslationStrings interface...');
  
  // Parse the structure - this is a simplified parser
  const structure = {};
  const lines = interfaceContent.split('\n');
  let currentSection = null;
  let braceLevel = 0;
  let currentObject = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed || trimmed.startsWith('//')) continue;
    
    // Count braces
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    braceLevel += openBraces - closeBraces;
    
    // Top-level sections
    if (braceLevel === 1 && trimmed.includes(': {')) {
      const sectionMatch = trimmed.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\{/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        structure[currentSection] = {};
        currentObject = structure[currentSection];
        console.log(`  📂 Found section: ${currentSection}`);
      }
    }
    
    // Simple string properties
    else if (braceLevel === 1 && trimmed.includes(': string;')) {
      const propertyMatch = trimmed.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*string;/);
      if (propertyMatch && currentSection) {
        structure[currentSection][propertyMatch[1]] = '';
      }
    }
    
    // Properties inside nested objects (braceLevel === 2)
    else if (braceLevel === 2 && trimmed.includes(': string;')) {
      const propertyMatch = trimmed.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*string;/);
      if (propertyMatch && currentObject) {
        currentObject[propertyMatch[1]] = '';
      }
    }
    
    // Nested objects
    else if (braceLevel === 2 && trimmed.includes(': {')) {
      const objectMatch = trimmed.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\{/);
      if (objectMatch && currentObject) {
        currentObject[objectMatch[1]] = {};
      }
    }
  }
  
  console.log(`✅ Parsed ${Object.keys(structure).length} main sections\n`);
  return structure;
}

/**
 * Create minimal English translations
 */
function createMinimalEnglishTranslations(structure) {
  console.log('🔨 Creating minimal English translations...');
  
  const translations = {};
  
  for (const [sectionName, sectionData] of Object.entries(structure)) {
    translations[sectionName] = {};
    
    for (const [key, value] of Object.entries(sectionData)) {
      if (typeof value === 'object') {
        translations[sectionName][key] = {};
        for (const subKey of Object.keys(value)) {
          // Create meaningful defaults based on key names
          translations[sectionName][key][subKey] = createDefaultValue(subKey);
        }
      } else {
        translations[sectionName][key] = createDefaultValue(key);
      }
    }
  }
  
  return translations;
}

/**
 * Create minimal Albanian translations (copy structure, translate basic terms)
 */
function createMinimalAlbanianTranslations(structure) {
  console.log('🔨 Creating minimal Albanian translations...');
  
  const translations = {};
  const basicTranslations = {
    title: 'Titulli',
    description: 'Përshkrimi',
    name: 'Emri',
    email: 'Email',
    phone: 'Telefon',
    password: 'Fjalëkalimi',
    loading: 'Po ngarkohet...',
    error: 'Gabim',
    success: 'Sukses',
    cancel: 'Anulo',
    confirm: 'Konfirmo',
    save: 'Ruaj',
    edit: 'Edito',
    delete: 'Fshi',
    search: 'Kërko',
    filter: 'Filtro',
    close: 'Mbyll',
    back: 'Kthehu',
    next: 'Tjetër',
    continue: 'Vazhdo',
    submit: 'Dërgo',
    price: 'Çmimi',
    year: 'Viti',
    make: 'Marka',
    model: 'Modeli',
    location: 'Vendndodhja'
  };
  
  for (const [sectionName, sectionData] of Object.entries(structure)) {
    translations[sectionName] = {};
    
    for (const [key, value] of Object.entries(sectionData)) {
      if (typeof value === 'object') {
        translations[sectionName][key] = {};
        for (const subKey of Object.keys(value)) {
          translations[sectionName][key][subKey] = basicTranslations[subKey] || createDefaultValue(subKey, 'sq');
        }
      } else {
        translations[sectionName][key] = basicTranslations[key] || createDefaultValue(key, 'sq');
      }
    }
  }
  
  return translations;
}

/**
 * Create a reasonable default value based on the key name
 */
function createDefaultValue(key, lang = 'en') {
  const commonDefaults = {
    en: {
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
      name: 'Name',
      fullName: 'Full Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      password: 'Password',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      continue: 'Continue',
      submit: 'Submit',
      required: 'Required',
      optional: 'Optional',
      placeholder: 'Placeholder'
    },
    sq: {
      title: 'Titulli',
      subtitle: 'Nëntitulli',
      description: 'Përshkrimi',
      name: 'Emri',
      fullName: 'Emri i Plotë',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      email: 'Email',
      phone: 'Telefon',
      address: 'Adresa',
      password: 'Fjalëkalimi',
      loading: 'Po ngarkohet...',
      error: 'Gabim',
      success: 'Sukses',
      cancel: 'Anulo',
      confirm: 'Konfirmo',
      save: 'Ruaj',
      edit: 'Edito',
      delete: 'Fshi',
      search: 'Kërko',
      filter: 'Filtro',
      close: 'Mbyll',
      back: 'Kthehu',
      next: 'Tjetër',
      continue: 'Vazhdo',
      submit: 'Dërgo',
      required: 'E detyrueshme',
      optional: 'Opsionale',
      placeholder: 'Placeholder'
    }
  };
  
  const defaults = commonDefaults[lang] || commonDefaults.en;
  
  // Check for exact matches first
  if (defaults[key]) {
    return defaults[key];
  }
  
  // Generate based on patterns
  if (key.includes('Required')) {
    return defaults.required;
  }
  if (key.includes('placeholder') || key.includes('Placeholder')) {
    return defaults.placeholder;
  }
  if (key.includes('title') || key.includes('Title')) {
    return defaults.title;
  }
  if (key.includes('description') || key.includes('Description')) {
    return defaults.description;
  }
  
  // Fallback: make it human-readable
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
}

/**
 * Generate the TypeScript file content
 */
function generateTranslationFile(translations, lang) {
  const varName = `${lang}Translations`;
  
  const content = `import { TranslationStrings } from '../translations';

export const ${varName}: TranslationStrings = ${JSON.stringify(translations, null, 2)};
`;
  
  return content;
}

/**
 * Main execution
 */
async function main() {
  try {
    // Parse the interface structure
    const structure = parseInterfaceStructure();
    
    // Create backup of existing files
    const backupTimestamp = Date.now();
    
    ['en.ts', 'sq.ts'].forEach(file => {
      const filePath = path.join(__dirname, 'shared/translations', file);
      if (fs.existsSync(filePath)) {
        const backupPath = `${filePath}.backup-${backupTimestamp}`;
        fs.copyFileSync(filePath, backupPath);
        console.log(`📁 Backed up ${file}`);
      }
    });
    
    // Generate translations
    const enTranslations = createMinimalEnglishTranslations(structure);
    const sqTranslations = createMinimalAlbanianTranslations(structure);
    
    // Write files
    const enContent = generateTranslationFile(enTranslations, 'en');
    const sqContent = generateTranslationFile(sqTranslations, 'sq');
    
    const enPath = path.join(__dirname, 'shared/translations/en.ts');
    const sqPath = path.join(__dirname, 'shared/translations/sq.ts');
    
    fs.writeFileSync(enPath, enContent);
    fs.writeFileSync(sqPath, sqContent);
    
    console.log('✅ Created minimal English translations');
    console.log('✅ Created minimal Albanian translations');
    
    console.log(`\n📊 File sizes:`);
    console.log(`   English: ${(fs.statSync(enPath).size / 1024).toFixed(2)} KB`);
    console.log(`   Albanian: ${(fs.statSync(sqPath).size / 1024).toFixed(2)} KB`);
    
    // Quick TypeScript check
    console.log('\n🔍 Testing TypeScript compilation...');
    const { execSync } = require('child_process');
    
    try {
      execSync(`npx tsc --noEmit ${enPath} ${sqPath}`, {
        cwd: __dirname,
        stdio: 'pipe'
      });
      console.log('✅ TypeScript compilation successful!');
    } catch (error) {
      console.log('⚠️  Some TypeScript issues remain - will need refinement');
      console.log(error.stdout?.toString().slice(0, 500) + '...');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();