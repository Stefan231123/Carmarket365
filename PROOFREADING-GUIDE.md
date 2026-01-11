# 🚗 CarMarket365 Translation Proofreading System

A secure, user-friendly system for proofreading translations without exposing source code to external translators and proofreaders.

## 🎯 Overview

This system allows you to:
- Extract translations from TypeScript files into safe, editable formats
- Provide a web interface for proofreaders to review and edit translations
- Safely import approved changes back into your codebase
- Maintain complete version control and backup safety

## 📁 System Components

### 1. **Translation Extractor** (`scripts/extract-translations.js`)
Safely extracts translation strings from TypeScript files and exports them to proofreader-friendly formats.

### 2. **Web Interface** (`proofreading-tools/index.html`)
Browser-based tool for proofreaders to review and edit translations without accessing source code.

### 3. **Import Tool** (`scripts/import-proofreading.js`)
Validates and safely applies proofreader changes back to the TypeScript translation files.

## 🚀 Quick Start Guide

### Step 1: Extract Translations

Extract translations from your TypeScript files:

```bash
cd /path/to/your/project
node scripts/extract-translations.js extract en:shared/translations/en.ts sq:shared/translations/sq.ts mk:shared/translations/mk.ts
```

This creates:
- `proofreading-exports/translations-for-proofreading-YYYY-MM-DD.csv` (for proofreaders)
- Individual language CSV files
- JSON backup file

### Step 2: Send to Proofreaders

1. **Share the main CSV file** with your proofreaders:
   - File: `translations-for-proofreading-YYYY-MM-DD.csv`
   - Can be opened in Excel, Google Sheets, or our web tool

2. **OR use the web interface**:
   - Open `proofreading-tools/index.html` in a browser
   - Upload the CSV file
   - Proofreaders can edit translations directly in the browser

### Step 3: Import Changes

Once proofreading is complete:

```bash
# Import from web tool JSON export
node scripts/import-proofreading.js proofreader-changes.json en:shared/translations/en.ts sq:shared/translations/sq.ts

# OR import from updated CSV (requires manual conversion to changes format)
```

## 🛡️ Security Features

### ✅ What Proofreaders Can See:
- Translation keys (e.g., `header.welcome`, `auth.signIn`)
- Translation text values
- Context hints (e.g., "Button label", "Error message")
- Section organization

### ❌ What Proofreaders Cannot See:
- Source code structure
- Component implementations
- Business logic
- File paths and architecture
- Database queries or API calls
- TypeScript types and interfaces

### 🔒 Safety Measures:
- **Automatic backups** before any changes
- **Validation** of TypeScript syntax
- **Rollback capability** with timestamped backups
- **Change tracking** with modification history
- **Access control** through file-based permissions

## 📋 Detailed Usage

### Extract Translations Command

```bash
node scripts/extract-translations.js extract [language:file] [language:file] ...
```

**Examples:**
```bash
# Extract specific languages
node scripts/extract-translations.js extract en:shared/translations/en.ts sq:shared/translations/sq.ts

# Extract all languages
node scripts/extract-translations.js extract \
  en:shared/translations/en.ts \
  mk:shared/translations/mk.ts \
  sq:shared/translations/sq.ts \
  sl:shared/translations/sl.ts \
  lv:shared/translations/lv.ts \
  ru:shared/translations/ru.ts
```

**Output Files:**
- `translations-for-proofreading-YYYY-MM-DD-HH-MM-SS.csv` - Main file for proofreaders
- `[lang]-translations-YYYY-MM-DD-HH-MM-SS.csv` - Individual language files
- `translations-YYYY-MM-DD-HH-MM-SS.json` - Complete extraction data

### Web Interface Usage

1. **Open the tool**: Open `proofreading-tools/index.html` in any modern browser
2. **Upload file**: Drag and drop or click to upload the CSV file
3. **Review translations**: 
   - Search for specific keys or text
   - Filter by section
   - Edit translations directly
   - Add proofreader notes
4. **Track progress**: View statistics and completion percentage
5. **Export changes**: Download JSON file with modifications

### Import Changes Command

```bash
node scripts/import-proofreading.js <changes.json> <lang:file> [lang:file] ...
```

**Examples:**
```bash
# Import changes for specific languages
node scripts/import-proofreading.js proofreader-changes.json \
  en:shared/translations/en.ts \
  sq:shared/translations/sq.ts

# Import with full paths
node scripts/import-proofreading.js ~/Downloads/translation-changes-2025-01-15.json \
  en:/full/path/to/shared/translations/en.ts \
  sq:/full/path/to/shared/translations/sq.ts
```

## 📊 File Formats

### CSV Format (Excel-compatible)
```csv
Key,Section,Context,en,sq,mk,Proofreader Notes
"header.welcome","header","Page title","Welcome to CarMarket365","Mirë se vini në CarMarket365","Добро дојдовте во CarMarket365",""
"auth.signIn","auth","Button label","Sign In","Kyçu","Најави се",""
```

### JSON Changes Format
```json
{
  "metadata": {
    "exportedAt": "2025-01-15T10:30:00.000Z",
    "totalTranslations": 1250,
    "modifiedTranslations": 45,
    "proofreader": "John Smith"
  },
  "modifications": {
    "header.welcome": {
      "languages": {
        "sq": "Mirë se erdhi në CarMarket365",
        "mk": "Добро дојдовте во CarMarket365"
      },
      "notes": "Updated to use more welcoming tone"
    }
  }
}
```

## 🔧 Advanced Configuration

### Custom Context Detection

You can customize context detection in `extract-translations.js`:

```javascript
extractContext(line) {
  if (line.includes('placeholder')) return 'Form placeholder text';
  if (line.includes('button')) return 'Button label';
  if (line.includes('title')) return 'Page or section title';
  if (line.includes('description')) return 'Description text';
  if (line.includes('error')) return 'Error message';
  if (line.includes('success')) return 'Success message';
  
  // Add your custom patterns here
  if (line.includes('modal')) return 'Modal dialog text';
  if (line.includes('tooltip')) return 'Tooltip text';
  
  return 'General UI text';
}
```

### Validation Rules

Customize validation rules in `import-proofreading.js`:

```javascript
validateTypeScript(content) {
  // Add custom validation rules
  if (content.includes('TODO') || content.includes('FIXME')) {
    this.warnings.push('Contains TODO/FIXME markers');
  }
  
  // Check for specific patterns
  if (!content.includes('export const')) {
    return false;
  }
  
  return true;
}
```

## 🚨 Troubleshooting

### Common Issues

**1. "Could not find translation object in file"**
- Ensure the TypeScript file has the correct export format:
  ```typescript
  export const langTranslations: TranslationStrings = { ... };
  ```

**2. "TypeScript validation failed"**
- Check for unbalanced braces `{}`
- Ensure quotes are properly escaped in translations
- Verify the export statement is intact

**3. "Translation key not found"**
- The key structure may have changed since extraction
- Check if the key exists in the current file version
- Verify the key path is correct (e.g., `section.subsection.key`)

**4. Changes not applied**
- Ensure the language code matches the file being imported
- Check file permissions
- Verify the file path is correct

### Recovery from Errors

**Restore from backup:**
```bash
# List available backups
ls translation-backups/

# Restore specific file
cp translation-backups/backup-2025-01-15-10-30-00/sq.ts.backup shared/translations/sq.ts
```

**Manual validation:**
```bash
# Check TypeScript syntax
npx tsc --noEmit shared/translations/sq.ts

# Run the development server to test
npm run dev
```

## 🔄 Workflow Recommendations

### For Development Teams

1. **Before major releases**: Extract all translations for comprehensive review
2. **Regular maintenance**: Monthly extraction of new/changed translations
3. **Quality assurance**: Always test imported translations in development environment
4. **Version control**: Commit translation changes with descriptive messages

### For Proofreaders

1. **Consistency**: Use the search function to find similar translations
2. **Context awareness**: Pay attention to the context hints provided
3. **Cultural adaptation**: Consider local market differences, not just literal translation
4. **Notes**: Use the notes field to explain significant changes or ask questions

### Best Practices

- **Test immediately**: Run `npm run dev` after importing to catch issues early
- **Small batches**: Process translations in smaller batches for easier review
- **Backup strategy**: Keep multiple backup generations
- **Communication**: Maintain clear communication channels with proofreaders
- **Documentation**: Update this guide as your workflow evolves

## 📞 Support

For technical issues or questions:
1. Check the troubleshooting section above
2. Review the TypeScript console errors if any
3. Examine the backup files in `translation-backups/`
4. Validate JSON changes files before importing

---

**Happy proofreading! 🎉**

*This system ensures your codebase remains secure while enabling efficient translation workflows.*