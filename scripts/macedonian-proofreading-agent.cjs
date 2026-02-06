#!/usr/bin/env node

/**
 * 🇲🇰 CarMarket365 Macedonian Proofreading Agent
 * 
 * Specialized tool for reviewing and improving Macedonian translations
 * in the CarMarket365 automotive marketplace platform.
 * 
 * Features:
 * - Grammar and syntax validation
 * - Automotive terminology consistency
 * - Cultural localization assessment
 * - Quality scoring (1-10 scale)
 * - Detailed improvement recommendations
 * 
 * Usage:
 *   node scripts/macedonian-proofreading-agent.cjs [command] [options]
 * 
 * Commands:
 *   review    - Comprehensive quality review of Macedonian translations
 *   extract   - Extract Macedonian translations for specialized review
 *   analyze   - Analyze translation quality and provide detailed report
 *   validate  - Quick validation of Macedonian grammar and terminology
 */

const fs = require('fs');
const path = require('path');

// Macedonian Automotive Terminology Dictionary
const MACEDONIAN_AUTO_TERMS = {
  // Engine terms
  'engine': 'мотор',
  'motor': 'мотор',
  'horsepower': 'коњски сили',
  'hp': 'кс',
  'displacement': 'зафатнина',
  'cylinder': 'цилиндер',
  'turbo': 'турбо',
  'diesel': 'дизел',
  'petrol': 'бензин',
  'gasoline': 'бензин',
  'hybrid': 'хибрид',
  'electric': 'електричен',
  
  // Transmission terms
  'transmission': 'менувач',
  'gearbox': 'менувач',
  'manual': 'рачен',
  'automatic': 'автоматски',
  'cvt': 'CVT',
  'gear': 'брзина',
  
  // Body types
  'sedan': 'лимузина',
  'hatchback': 'хечбек',
  'wagon': 'караван',
  'suv': 'џип',
  'coupe': 'купе',
  'convertible': 'кабриолет',
  'pickup': 'пикап',
  
  // Features
  'air conditioning': 'климатизер',
  'navigation': 'навигација',
  'bluetooth': 'блутут',
  'leather seats': 'кожни седишта',
  'sunroof': 'отворлив кров',
  'parking sensors': 'сензори за паркирање',
  'abs': 'АБС',
  'esp': 'ЕСП',
  'airbag': 'воздушна перничка',
  
  // Conditions
  'new': 'нов',
  'used': 'употребуван',
  'excellent': 'извонредна',
  'good': 'добра',
  'fair': 'задоволителна',
  'condition': 'состојба',
  
  // Actions
  'buy': 'купи',
  'sell': 'продај',
  'contact': 'контактирај',
  'view': 'прегледај',
  'search': 'барај',
  'filter': 'филтрирај',
  'compare': 'спореди',
  'save': 'зачувај'
};

// Common Macedonian Grammar Patterns
const GRAMMAR_PATTERNS = {
  // Common endings for adjectives
  masculine_adj: /[а-я]+[тн]$/,
  feminine_adj: /[а-я]+[ан]а$/,
  neuter_adj: /[а-я]+[тн]о$/,
  
  // Verb patterns
  present_3rd_singular: /[а-я]+[аеи]$/,
  past_masculine: /[а-я]+ше$/,
  past_feminine: /[а-я]+ше$/,
  
  // Plural patterns
  masculine_plural: /[а-я]+и$/,
  feminine_plural: /[а-я]+и$/,
  neuter_plural: /[а-я]+а$/
};

// Quality Assessment Criteria
const QUALITY_CRITERIA = {
  grammar: {
    weight: 0.3,
    tests: ['verb_agreement', 'gender_agreement', 'case_usage', 'punctuation']
  },
  terminology: {
    weight: 0.25,
    tests: ['automotive_terms', 'consistency', 'technical_accuracy']
  },
  cultural: {
    weight: 0.2,
    tests: ['formality_level', 'local_references', 'market_appropriateness']
  },
  ux: {
    weight: 0.15,
    tests: ['clarity', 'readability', 'action_clarity']
  },
  technical: {
    weight: 0.1,
    tests: ['variable_handling', 'text_length', 'special_characters']
  }
};

class MacedonianProofreadingAgent {
  constructor() {
    this.translationsPath = 'shared/translations/mk.ts';
    this.reportsPath = 'macedonian-proofreading-reports';
    this.backupsPath = 'translation-backups';
    
    // Ensure directories exist
    this.ensureDirectories();
  }
  
  ensureDirectories() {
    [this.reportsPath, this.backupsPath].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }
  
  /**
   * Extract translations from TypeScript file
   */
  extractTranslations(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Remove TypeScript syntax and extract translation object
      const cleanContent = content
        .replace(/^export\s+const\s+\w+Translations.*?=\s*/, '')
        .replace(/;?\s*$/, '');
      
      // Safely evaluate the object
      const translations = this.parseTranslationObject(cleanContent);
      return translations;
    } catch (error) {
      console.error(`Error extracting translations from ${filePath}:`, error.message);
      return null;
    }
  }
  
  /**
   * Parse translation object from string
   */
  parseTranslationObject(content) {
    try {
      // Remove comments and clean up TypeScript syntax
      let cleaned = content
        .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove block comments
        .replace(/\/\/.*$/gm, '')          // Remove line comments
        .replace(/^\s*import\s+.*$/gm, '') // Remove import statements
        .replace(/^\s*export\s+.*?=\s*/, '') // Remove export declaration
        .replace(/;?\s*$/, '')             // Remove trailing semicolon
        .trim();
      
      // Handle TypeScript syntax more carefully
      if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
        return eval(`(${cleaned})`);
      } else {
        console.error('Invalid translation object format');
        return {};
      }
    } catch (error) {
      console.error('Error parsing translation object:', error.message);
      return {};
    }
  }
  
  /**
   * Flatten nested translation object
   */
  flattenTranslations(obj, prefix = '') {
    const flattened = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        flattened[fullKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(flattened, this.flattenTranslations(value, fullKey));
      }
    }
    
    return flattened;
  }
  
  /**
   * Analyze translation quality
   */
  analyzeTranslation(key, text) {
    const analysis = {
      key,
      text,
      issues: [],
      suggestions: [],
      scores: {},
      overallScore: 0
    };
    
    // Grammar analysis
    analysis.scores.grammar = this.analyzeGrammar(text);
    
    // Terminology analysis
    analysis.scores.terminology = this.analyzeTerminology(key, text);
    
    // Cultural analysis
    analysis.scores.cultural = this.analyzeCultural(key, text);
    
    // UX analysis
    analysis.scores.ux = this.analyzeUX(key, text);
    
    // Technical analysis
    analysis.scores.technical = this.analyzeTechnical(text);
    
    // Calculate overall score
    analysis.overallScore = this.calculateOverallScore(analysis.scores);
    
    // Generate suggestions based on analysis
    this.generateSuggestions(analysis);
    
    return analysis;
  }
  
  /**
   * Analyze grammar quality
   */
  analyzeGrammar(text) {
    let score = 10;
    
    // Check for common grammar issues
    const issues = [];
    
    // Check for proper Cyrillic usage (allowing common automotive and business characters)
    if (/[^\u0400-\u04FF\u0500-\u052F\s\d\.,!?\-():+\/A-Za-z{}*%€@•&^#$]/.test(text)) {
      issues.push('Contains non-standard characters');
      score -= 2;
    }
    
    // Check for proper punctuation spacing
    if (/[.,!?][а-ша-ш]/i.test(text)) {
      issues.push('Missing space after punctuation');
      score -= 1;
    }
    
    // Check for double spaces
    if (/\s{2,}/.test(text)) {
      issues.push('Multiple consecutive spaces');
      score -= 0.5;
    }
    
    return Math.max(score, 1);
  }
  
  /**
   * Analyze terminology consistency
   */
  analyzeTerminology(key, text) {
    let score = 10;
    const section = key.split('.')[0];
    
    // Check for automotive terminology
    const lowerText = text.toLowerCase();
    
    // Identify potential automotive terms that should be standardized
    const potentialTerms = Object.keys(MACEDONIAN_AUTO_TERMS).filter(term => 
      lowerText.includes(term.toLowerCase())
    );
    
    potentialTerms.forEach(term => {
      const macedonianTerm = MACEDONIAN_AUTO_TERMS[term];
      if (!text.includes(macedonianTerm)) {
        score -= 1;
      }
    });
    
    // Check for consistency with automotive context
    if (['cars', 'sell', 'filters'].includes(section)) {
      // Should use automotive-specific terminology
      if (text.includes('кола') && !text.includes('автомобил') && !text.includes('возило')) {
        // Consider context - "кола" is informal but acceptable in some contexts
      }
    }
    
    return Math.max(score, 1);
  }
  
  /**
   * Analyze cultural appropriateness
   */
  analyzeCultural(key, text) {
    let score = 10;
    const section = key.split('.')[0];
    
    // Check formality level appropriateness
    const hasInformalMarkers = /\b(ајде|баш|многу)\b/i.test(text);
    const hasFormalMarkers = /\b(почитувани|уважени)\b/i.test(text);
    
    // Business context should be more formal
    if (['auth', 'legal', 'errors'].includes(section) && hasInformalMarkers) {
      score -= 2;
    }
    
    // User-facing actions can be less formal
    if (['common', 'hero'].includes(section) && hasFormalMarkers) {
      score -= 1; // Less penalty for being too formal
    }
    
    return Math.max(score, 1);
  }
  
  /**
   * Analyze user experience quality
   */
  analyzeUX(key, text) {
    let score = 10;
    
    // Check text length for UI elements
    if (key.includes('button') || key.includes('link')) {
      if (text.length > 20) {
        score -= 2; // Too long for buttons
      }
    }
    
    // Check clarity for error messages
    if (key.includes('error')) {
      if (text.length < 10) {
        score -= 2; // Too short to be helpful
      }
      if (!text.includes('.')) {
        score -= 1; // Should end with period for clarity
      }
    }
    
    // Check for action clarity
    if (key.includes('action') || key.includes('submit')) {
      const actionWords = ['купи', 'продај', 'контактирај', 'прегледај', 'барај'];
      const hasActionWord = actionWords.some(word => text.toLowerCase().includes(word));
      if (!hasActionWord) {
        score -= 2; // Unclear action
      }
    }
    
    return Math.max(score, 1);
  }
  
  /**
   * Analyze technical aspects
   */
  analyzeTechnical(text) {
    let score = 10;
    
    // Check for proper variable handling
    const variables = text.match(/{[^}]+}/g) || [];
    variables.forEach(variable => {
      if (!/^{[a-zA-Z_][a-zA-Z0-9_]*}$/.test(variable)) {
        score -= 1; // Malformed variable
      }
    });
    
    // Check for HTML entities that should be avoided
    if (/&\w+;/.test(text)) {
      score -= 1;
    }
    
    return Math.max(score, 1);
  }
  
  /**
   * Calculate overall quality score
   */
  calculateOverallScore(scores) {
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const [criterion, weight] of Object.entries(QUALITY_CRITERIA)) {
      if (scores[criterion]) {
        totalScore += scores[criterion] * weight.weight;
        totalWeight += weight.weight;
      }
    }
    
    return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0;
  }
  
  /**
   * Generate improvement suggestions
   */
  generateSuggestions(analysis) {
    const { scores, key, text } = analysis;
    
    if (scores.grammar < 8) {
      analysis.suggestions.push({
        type: 'grammar',
        priority: 'high',
        suggestion: 'Review grammar and syntax for proper Macedonian structure'
      });
    }
    
    if (scores.terminology < 7) {
      analysis.suggestions.push({
        type: 'terminology',
        priority: 'high',
        suggestion: 'Standardize automotive terminology using approved Macedonian terms'
      });
    }
    
    if (scores.cultural < 6) {
      analysis.suggestions.push({
        type: 'cultural',
        priority: 'medium',
        suggestion: 'Adjust formality level to match Macedonian business culture expectations'
      });
    }
    
    if (scores.ux < 6) {
      analysis.suggestions.push({
        type: 'ux',
        priority: 'medium',
        suggestion: 'Improve clarity and user-friendliness of interface text'
      });
    }
    
    // Specific suggestions based on content
    if (text.length > 50 && (key.includes('button') || key.includes('label'))) {
      analysis.suggestions.push({
        type: 'ux',
        priority: 'high',
        suggestion: 'Shorten text for better UI fit - consider more concise phrasing'
      });
    }
  }
  
  /**
   * Generate comprehensive quality report
   */
  generateReport(analysisResults) {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const reportPath = path.join(this.reportsPath, `macedonian-quality-report-${timestamp}.md`);
    
    const totalTranslations = analysisResults.length;
    const averageScore = analysisResults.reduce((sum, result) => sum + result.overallScore, 0) / totalTranslations;
    
    const issuesByType = {};
    const scoreDistribution = { excellent: 0, good: 0, acceptable: 0, poor: 0 };
    
    analysisResults.forEach(result => {
      // Categorize score
      if (result.overallScore >= 9) scoreDistribution.excellent++;
      else if (result.overallScore >= 7) scoreDistribution.good++;
      else if (result.overallScore >= 5) scoreDistribution.acceptable++;
      else scoreDistribution.poor++;
      
      // Count issues
      result.suggestions.forEach(suggestion => {
        issuesByType[suggestion.type] = (issuesByType[suggestion.type] || 0) + 1;
      });
    });
    
    const report = `# 🇲🇰 Macedonian Translation Quality Report

## Executive Summary
**Generated:** ${new Date().toLocaleString()}  
**Total Translations Analyzed:** ${totalTranslations}  
**Average Quality Score:** ${averageScore.toFixed(1)}/10

## Quality Distribution
- **Excellent (9-10):** ${scoreDistribution.excellent} translations (${((scoreDistribution.excellent/totalTranslations)*100).toFixed(1)}%)
- **Good (7-8.9):** ${scoreDistribution.good} translations (${((scoreDistribution.good/totalTranslations)*100).toFixed(1)}%)
- **Acceptable (5-6.9):** ${scoreDistribution.acceptable} translations (${((scoreDistribution.acceptable/totalTranslations)*100).toFixed(1)}%)
- **Poor (1-4.9):** ${scoreDistribution.poor} translations (${((scoreDistribution.poor/totalTranslations)*100).toFixed(1)}%)

## Issues by Category
${Object.entries(issuesByType)
  .map(([type, count]) => `- **${type.charAt(0).toUpperCase() + type.slice(1)}:** ${count} issues`)
  .join('\n')}

## Priority Improvements

### High Priority Issues
${analysisResults
  .filter(result => result.suggestions.some(s => s.priority === 'high'))
  .map(result => `- **${result.key}:** ${result.text}\n  Score: ${result.overallScore}/10\n  Issues: ${result.suggestions.filter(s => s.priority === 'high').map(s => s.suggestion).join('; ')}`)
  .slice(0, 10)
  .join('\n\n')}

### Terminology Standardization Needed
${analysisResults
  .filter(result => result.scores.terminology < 7)
  .map(result => `- **${result.key}:** "${result.text}" (Score: ${result.scores.terminology}/10)`)
  .slice(0, 10)
  .join('\n')}

### Grammar Improvements Needed
${analysisResults
  .filter(result => result.scores.grammar < 8)
  .map(result => `- **${result.key}:** "${result.text}" (Score: ${result.scores.grammar}/10)`)
  .slice(0, 10)
  .join('\n')}

## Detailed Analysis

${analysisResults
  .filter(result => result.overallScore < 7)
  .map(result => `
### ${result.key}
**Text:** "${result.text}"  
**Overall Score:** ${result.overallScore}/10

**Scores by Category:**
- Grammar: ${result.scores.grammar}/10
- Terminology: ${result.scores.terminology}/10  
- Cultural: ${result.scores.cultural}/10
- UX: ${result.scores.ux}/10
- Technical: ${result.scores.technical}/10

**Suggestions:**
${result.suggestions.map(s => `- ${s.suggestion} (${s.priority} priority)`).join('\n')}
`).join('\n')}

## Recommendations

### Immediate Actions (Next 1-2 weeks)
1. **Fix High Priority Issues:** Address the ${analysisResults.filter(r => r.suggestions.some(s => s.priority === 'high')).length} translations with high priority issues
2. **Standardize Automotive Terms:** Create glossary and apply to ${Object.keys(issuesByType).includes('terminology') ? issuesByType.terminology : 0} affected translations
3. **Grammar Review:** Professional review of ${analysisResults.filter(r => r.scores.grammar < 8).length} translations with grammar issues

### Medium-term Goals (Next month)
1. **Cultural Adaptation:** Review formality levels and local market appropriateness
2. **UX Optimization:** Improve clarity and readability of interface text
3. **Consistency Review:** Ensure terminology consistency across all sections

### Long-term Strategy (Next quarter)
1. **Native Speaker Review:** Comprehensive review by native Macedonian speakers
2. **User Testing:** Test translations with actual Macedonian users
3. **Automated Quality Checks:** Implement ongoing quality monitoring

## Quality Assurance Checklist
- [ ] All automotive terms use standardized Macedonian terminology
- [ ] Grammar and syntax follow Macedonian language rules
- [ ] Formality level appropriate for automotive business context
- [ ] Text length suitable for UI constraints
- [ ] Cultural references appropriate for North Macedonian market
- [ ] Technical terms accurately translated
- [ ] User actions clearly expressed
- [ ] Error messages helpful and non-technical

---

**Report generated by Macedonian Proofreading Agent v1.0**  
**CarMarket365 Translation Quality System**
`;

    fs.writeFileSync(reportPath, report);
    console.log(`📊 Quality report generated: ${reportPath}`);
    
    return {
      reportPath,
      averageScore,
      totalTranslations,
      issuesByType,
      scoreDistribution
    };
  }
  
  /**
   * Main review command
   */
  async review(options = {}) {
    console.log('🇲🇰 Starting Macedonian Translation Quality Review...\n');
    
    // Create backup
    const backupPath = this.createBackup();
    console.log(`📦 Backup created: ${backupPath}`);
    
    // Extract translations
    const translations = this.extractTranslations(this.translationsPath);
    if (!translations) {
      console.error('❌ Failed to extract translations');
      return;
    }
    
    // Flatten for analysis
    const flatTranslations = this.flattenTranslations(translations);
    console.log(`📋 Analyzing ${Object.keys(flatTranslations).length} translations...\n`);
    
    // Analyze each translation
    const analysisResults = [];
    let processed = 0;
    
    for (const [key, text] of Object.entries(flatTranslations)) {
      const analysis = this.analyzeTranslation(key, text);
      analysisResults.push(analysis);
      
      processed++;
      if (processed % 50 === 0) {
        console.log(`⏳ Processed ${processed}/${Object.keys(flatTranslations).length} translations...`);
      }
    }
    
    console.log('\n📊 Generating quality report...');
    const reportSummary = this.generateReport(analysisResults);
    
    console.log('\n✅ Macedonian Translation Review Complete!');
    console.log(`📈 Average Quality Score: ${reportSummary.averageScore.toFixed(1)}/10`);
    console.log(`📊 Report: ${reportSummary.reportPath}`);
    
    return reportSummary;
  }
  
  /**
   * Create backup of translation file
   */
  createBackup() {
    const timestamp = Date.now();
    const backupPath = path.join(this.backupsPath, `mk-${timestamp}.ts`);
    
    if (fs.existsSync(this.translationsPath)) {
      fs.copyFileSync(this.translationsPath, backupPath);
    }
    
    return backupPath;
  }
  
  /**
   * Extract translations for specialized review
   */
  extract(outputPath = null) {
    console.log('🔍 Extracting Macedonian translations for specialized review...\n');
    
    const translations = this.extractTranslations(this.translationsPath);
    if (!translations) {
      console.error('❌ Failed to extract translations');
      return;
    }
    
    const flatTranslations = this.flattenTranslations(translations);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    
    const extractPath = outputPath || `macedonian-translations-${timestamp}.json`;
    
    const extractData = {
      language: 'Macedonian (mk)',
      extractedAt: new Date().toISOString(),
      totalTranslations: Object.keys(flatTranslations).length,
      automotive_terms_glossary: MACEDONIAN_AUTO_TERMS,
      translations: Object.entries(flatTranslations).map(([key, text]) => ({
        key,
        text,
        section: key.split('.')[0],
        context: this.getContextHint(key),
        autoterms_used: this.identifyAutoTerms(text)
      }))
    };
    
    fs.writeFileSync(extractPath, JSON.stringify(extractData, null, 2));
    console.log(`📄 Macedonian translations extracted to: ${extractPath}`);
    console.log(`📊 Total translations: ${Object.keys(flatTranslations).length}`);
    
    return extractPath;
  }
  
  /**
   * Get context hint for translation key
   */
  getContextHint(key) {
    const section = key.split('.')[0];
    const context_hints = {
      common: 'Common UI elements and actions',
      header: 'Website navigation and header',
      hero: 'Homepage main section',
      cars: 'Car listings and vehicle details',
      filters: 'Search and filtering interface',
      auth: 'User login and registration',
      sell: 'Car selling interface',
      errors: 'Error messages and validation',
      modals: 'Dialog boxes and popups',
      footer: 'Website footer information'
    };
    
    return context_hints[section] || 'General interface text';
  }
  
  /**
   * Identify automotive terms in text
   */
  identifyAutoTerms(text) {
    const lowerText = text.toLowerCase();
    return Object.entries(MACEDONIAN_AUTO_TERMS)
      .filter(([_, macedonian]) => lowerText.includes(macedonian.toLowerCase()))
      .map(([english, macedonian]) => ({ english, macedonian }));
  }
  
  /**
   * Quick validation command
   */
  validate(quick = false) {
    console.log('🚀 Quick Macedonian Translation Validation...\n');
    
    const translations = this.extractTranslations(this.translationsPath);
    if (!translations) {
      console.error('❌ Failed to extract translations');
      return;
    }
    
    const flatTranslations = this.flattenTranslations(translations);
    const issues = [];
    
    for (const [key, text] of Object.entries(flatTranslations)) {
      // Quick grammar check - allow common characters used in automotive translations
      // Allow: Cyrillic, Latin, numbers, punctuation, currency, email characters, bullet points
      if (/[^\u0400-\u04FF\u0500-\u052F\s\d\.,!?\-():+\/A-Za-z{}*%€@•&^#$]/.test(text)) {
        issues.push({
          key,
          text,
          issue: 'Non-standard characters detected'
        });
      }
      
      // Check for obvious errors
      if (text.includes('  ')) {
        issues.push({
          key,
          text,
          issue: 'Double spaces found'
        });
      }
      
      if (quick && issues.length > 10) break; // Limit for quick check
    }
    
    console.log(`\n📊 Validation Results:`);
    console.log(`✅ Total translations: ${Object.keys(flatTranslations).length}`);
    console.log(`⚠️  Issues found: ${issues.length}`);
    
    if (issues.length > 0) {
      console.log('\n🔍 Issues detected:');
      issues.slice(0, 10).forEach(issue => {
        console.log(`- ${issue.key}: "${issue.text}" (${issue.issue})`);
      });
      
      if (issues.length > 10) {
        console.log(`... and ${issues.length - 10} more issues`);
      }
    }
    
    return issues;
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  const agent = new MacedonianProofreadingAgent();
  
  switch (command) {
    case 'review':
      agent.review();
      break;
      
    case 'extract':
      const outputPath = args[1];
      agent.extract(outputPath);
      break;
      
    case 'analyze':
      agent.review();
      break;
      
    case 'validate':
      const quick = args.includes('--quick');
      agent.validate(quick);
      break;
      
    case 'help':
    default:
      console.log(`
🇲🇰 CarMarket365 Macedonian Proofreading Agent

Usage: node scripts/macedonian-proofreading-agent.cjs [command] [options]

Commands:
  review      Comprehensive quality review with detailed report
  extract     Extract translations for external proofreading
  analyze     Analyze quality and generate improvement recommendations
  validate    Quick validation of grammar and basic issues

Options:
  --quick     For validate command: show only first 10 issues

Examples:
  node scripts/macedonian-proofreading-agent.cjs review
  node scripts/macedonian-proofreading-agent.cjs extract macedonian-review.json
  node scripts/macedonian-proofreading-agent.cjs validate --quick

Features:
  ✅ Grammar and syntax validation
  ✅ Automotive terminology consistency
  ✅ Cultural localization assessment
  ✅ Quality scoring (1-10 scale)
  ✅ Detailed improvement recommendations
  ✅ Integration with existing translation system
      `);
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = { MacedonianProofreadingAgent };