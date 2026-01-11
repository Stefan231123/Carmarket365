#!/usr/bin/env tsx
/**
 * CarMarket365 Translation System Validator
 * 
 * Comprehensive validation script for translation system testing
 * Validates translation completeness, consistency, and implementation quality
 */

import fs from 'fs/promises';
import path from 'path';
import { translations, translate, SupportedLanguage } from '../shared/translations';

interface ValidationResult {
  timestamp: string;
  totalKeys: number;
  coverage: number;
  missingKeys: Record<SupportedLanguage, string[]>;
  orphanedKeys: Record<SupportedLanguage, string[]>;
  inconsistentStructure: string[];
  hardcodedStrings: string[];
  performanceMetrics: PerformanceMetrics;
  summary: ValidationSummary;
}

interface PerformanceMetrics {
  translationLoadTime: number;
  averageTranslationTime: number;
  memoryUsage: NodeJS.MemoryUsage;
  translationsPerSecond: number;
}

interface ValidationSummary {
  passed: boolean;
  criticalIssues: number;
  warnings: number;
  recommendations: string[];
}

export class TranslationValidator {
  private readonly supportedLanguages: SupportedLanguage[] = ['en', 'mk', 'sq', 'sl', 'lv', 'ru'];
  private readonly clientPath: string;
  private readonly reportPath: string;

  constructor() {
    this.clientPath = path.join(process.cwd(), 'client');
    this.reportPath = path.join(process.cwd(), 'qa-reports');
  }

  /**
   * Main validation function - runs all translation tests
   */
  async runCompleteValidation(): Promise<ValidationResult> {
    console.log('🚀 Starting CarMarket365 Translation System Validation...\n');
    
    const startTime = Date.now();
    
    // Ensure report directory exists
    await this.ensureReportDirectory();
    
    const result: ValidationResult = {
      timestamp: new Date().toISOString(),
      totalKeys: 0,
      coverage: 0,
      missingKeys: {} as Record<SupportedLanguage, string[]>,
      orphanedKeys: {} as Record<SupportedLanguage, string[]>,
      inconsistentStructure: [],
      hardcodedStrings: [],
      performanceMetrics: {} as PerformanceMetrics,
      summary: {
        passed: false,
        criticalIssues: 0,
        warnings: 0,
        recommendations: []
      }
    };

    try {
      // Step 1: Validate translation keys
      console.log('📋 Step 1: Validating translation keys...');
      await this.validateTranslationKeys(result);
      
      // Step 2: Scan for hardcoded strings
      console.log('🔍 Step 2: Scanning for hardcoded strings...');
      await this.scanForHardcodedStrings(result);
      
      // Step 3: Performance testing
      console.log('⚡ Step 3: Running performance tests...');
      await this.runPerformanceTests(result);
      
      // Step 4: Generate summary
      console.log('📊 Step 4: Generating summary...');
      this.generateSummary(result);
      
      // Step 5: Save report
      await this.saveReport(result);
      
      const duration = Date.now() - startTime;
      console.log(`✅ Validation completed in ${duration}ms\n`);
      
      this.displayResults(result);
      
      return result;
      
    } catch (error) {
      console.error('❌ Validation failed:', error);
      throw error;
    }
  }

  /**
   * Validates translation key completeness and consistency
   */
  private async validateTranslationKeys(result: ValidationResult): Promise<void> {
    // Get all keys from English (reference language)
    const referenceKeys = this.extractAllKeys(translations.en);
    result.totalKeys = referenceKeys.length;
    
    console.log(`   Found ${referenceKeys.length} translation keys in reference language`);
    
    // Validate each language against reference
    for (const lang of this.supportedLanguages) {
      const langKeys = this.extractAllKeys(translations[lang]);
      result.missingKeys[lang] = referenceKeys.filter(key => !langKeys.includes(key));
      result.orphanedKeys[lang] = langKeys.filter(key => !referenceKeys.includes(key));
      
      console.log(`   ${lang.toUpperCase()}: ${langKeys.length} keys, ${result.missingKeys[lang].length} missing, ${result.orphanedKeys[lang].length} orphaned`);
    }
    
    // Calculate overall coverage
    const totalKeys = referenceKeys.length;
    const completedKeys = this.supportedLanguages
      .reduce((sum, lang) => sum + (totalKeys - result.missingKeys[lang].length), 0);
    result.coverage = (completedKeys / (totalKeys * this.supportedLanguages.length)) * 100;
    
    // Check for structural inconsistencies
    result.inconsistentStructure = this.validateStructure();
  }

  /**
   * Scans codebase for hardcoded strings
   */
  private async scanForHardcodedStrings(result: ValidationResult): Promise<void> {
    const hardcodedStrings: string[] = [];
    
    try {
      await this.scanDirectory(this.clientPath, hardcodedStrings);
      result.hardcodedStrings = hardcodedStrings;
      console.log(`   Found ${hardcodedStrings.length} potential hardcoded strings`);
    } catch (error) {
      console.warn('   Warning: Could not scan for hardcoded strings:', error.message);
    }
  }

  /**
   * Recursively scans directory for TypeScript/React files
   */
  private async scanDirectory(dirPath: string, hardcodedStrings: string[]): Promise<void> {
    try {
      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        
        try {
          const stat = await fs.stat(itemPath);
          
          if (stat.isDirectory() && !this.isIgnoredDirectory(item)) {
            await this.scanDirectory(itemPath, hardcodedStrings);
          } else if (this.isReactFile(item)) {
            await this.scanFile(itemPath, hardcodedStrings);
          }
        } catch (error) {
          console.warn(`   Warning: Could not process ${itemPath}:`, error.message);
        }
      }
    } catch (error) {
      console.warn(`   Warning: Could not read directory ${dirPath}:`, error.message);
    }
  }

  /**
   * Scans individual file for hardcoded strings
   */
  private async scanFile(filePath: string, hardcodedStrings: string[]): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Regex patterns for detecting hardcoded strings
      const patterns = [
        // String literals not in t() calls
        /(['"`])(?:[^'"`\\]|\\.)*\1/g,
        // JSX text content (not in attributes)
        />\s*([A-Za-z][^<]*[A-Za-z])\s*</g,
        // Button/link text
        /((?:button|link|label).*>)\s*([A-Za-z][^<]*[A-Za-z])\s*(<)/gi
      ];
      
      // Exclude patterns (legitimate constants)
      const exclusions = [
        /^['"`]https?:\/\//,  // URLs
        /^['"`]#[a-f0-9]/,    // Colors
        /^['"`]\d/,           // Numbers
        /^['"`][a-z-]+['"`]$/,// CSS classes
        /t\s*\(/,             // Already using translation function
        /console\./,          // Console statements
        /import\s+/,          // Import statements
        /export\s+/,          // Export statements
      ];
      
      const suspiciousStrings = this.findSuspiciousStrings(content, patterns, exclusions);
      
      if (suspiciousStrings.length > 0) {
        const relativePath = path.relative(process.cwd(), filePath);
        suspiciousStrings.forEach(str => {
          hardcodedStrings.push(`${relativePath}: ${str}`);
        });
      }
    } catch (error) {
      console.warn(`   Warning: Could not scan file ${filePath}:`, error.message);
    }
  }

  /**
   * Finds suspicious strings that might be hardcoded
   */
  private findSuspiciousStrings(content: string, patterns: RegExp[], exclusions: RegExp[]): string[] {
    const suspicious: string[] = [];
    
    for (const pattern of patterns) {
      const matches = content.match(pattern) || [];
      
      for (const match of matches) {
        let isExcluded = false;
        
        for (const exclusion of exclusions) {
          if (exclusion.test(match)) {
            isExcluded = true;
            break;
          }
        }
        
        if (!isExcluded && this.looksLikeUserText(match)) {
          suspicious.push(match.trim());
        }
      }
    }
    
    return [...new Set(suspicious)]; // Remove duplicates
  }

  /**
   * Heuristic to determine if text looks like user-facing content
   */
  private looksLikeUserText(text: string): boolean {
    // Remove quotes
    const cleaned = text.replace(/^['"`]|['"`]$/g, '');
    
    // Skip if too short or looks like code
    if (cleaned.length < 3) return false;
    if (/^[a-z-_]+$/i.test(cleaned)) return false; // Looks like identifier
    if (/^[A-Z_]+$/.test(cleaned)) return false;   // Looks like constant
    if (/^\d/.test(cleaned)) return false;         // Starts with number
    if (/[{}[\]()]/.test(cleaned)) return false;   // Contains code symbols
    
    // Look for characteristics of user text
    const hasSpaces = /\s/.test(cleaned);
    const hasCapitalization = /[A-Z]/.test(cleaned);
    const hasMultipleWords = cleaned.split(/\s+/).length > 1;
    
    return hasSpaces || (hasCapitalization && hasMultipleWords);
  }

  /**
   * Runs performance tests on translation system
   */
  private async runPerformanceTests(result: ValidationResult): Promise<void> {
    const startTime = performance.now();
    
    // Measure translation loading time
    const loadStartTime = performance.now();
    Object.values(translations);
    const translationLoadTime = performance.now() - loadStartTime;

    // Measure individual translation performance
    const testKeys = this.getRandomTranslationKeys(1000);
    const translationStartTime = performance.now();
    
    for (const key of testKeys) {
      translate('en', key);
    }
    
    const translationEndTime = performance.now();
    const totalTranslationTime = translationEndTime - translationStartTime;
    const averageTranslationTime = totalTranslationTime / testKeys.length;
    const translationsPerSecond = 1000 / averageTranslationTime;

    // Measure memory usage
    const memoryUsage = process.memoryUsage();

    result.performanceMetrics = {
      translationLoadTime,
      averageTranslationTime,
      memoryUsage,
      translationsPerSecond
    };

    console.log(`   Translation system loaded in ${translationLoadTime.toFixed(2)}ms`);
    console.log(`   Average translation time: ${averageTranslationTime.toFixed(4)}ms`);
    console.log(`   Translations per second: ${translationsPerSecond.toFixed(0)}`);
  }

  /**
   * Generates validation summary and recommendations
   */
  private generateSummary(result: ValidationResult): void {
    const summary = result.summary;
    
    // Count critical issues
    let criticalIssues = 0;
    let warnings = 0;
    
    // Check for missing translations (critical)
    for (const lang of this.supportedLanguages) {
      criticalIssues += result.missingKeys[lang].length;
    }
    
    // Check for hardcoded strings (critical)
    criticalIssues += result.hardcodedStrings.length;
    
    // Count warnings
    for (const lang of this.supportedLanguages) {
      warnings += result.orphanedKeys[lang].length;
    }
    warnings += result.inconsistentStructure.length;
    
    summary.criticalIssues = criticalIssues;
    summary.warnings = warnings;
    summary.passed = criticalIssues === 0;
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (result.coverage < 100) {
      recommendations.push(`Improve translation coverage from ${result.coverage.toFixed(1)}% to 100%`);
    }
    
    if (result.hardcodedStrings.length > 0) {
      recommendations.push(`Replace ${result.hardcodedStrings.length} hardcoded strings with t() functions`);
    }
    
    if (result.performanceMetrics.averageTranslationTime > 1) {
      recommendations.push('Consider optimizing translation performance - average time exceeds 1ms');
    }
    
    if (result.performanceMetrics.memoryUsage.heapUsed > 100 * 1024 * 1024) {
      recommendations.push('Monitor memory usage - heap usage is high');
    }
    
    const totalOrphaned = Object.values(result.orphanedKeys).reduce((sum, keys) => sum + keys.length, 0);
    if (totalOrphaned > 0) {
      recommendations.push(`Review ${totalOrphaned} orphaned translation keys`);
    }
    
    summary.recommendations = recommendations;
  }

  /**
   * Displays validation results to console
   */
  private displayResults(result: ValidationResult): void {
    console.log('\n' + '='.repeat(60));
    console.log('   CARMARKET365 TRANSLATION VALIDATION REPORT');
    console.log('='.repeat(60));
    
    // Overall status
    const status = result.summary.passed ? '✅ PASSED' : '❌ FAILED';
    const statusColor = result.summary.passed ? '\x1b[32m' : '\x1b[31m';
    console.log(`${statusColor}%s\x1b[0m`, `\n🎯 OVERALL STATUS: ${status}`);
    
    // Key metrics
    console.log(`\n📊 KEY METRICS:`);
    console.log(`   • Translation Coverage: ${result.coverage.toFixed(1)}%`);
    console.log(`   • Total Translation Keys: ${result.totalKeys}`);
    console.log(`   • Critical Issues: ${result.summary.criticalIssues}`);
    console.log(`   • Warnings: ${result.summary.warnings}`);
    
    // Performance metrics
    console.log(`\n⚡ PERFORMANCE METRICS:`);
    console.log(`   • Load Time: ${result.performanceMetrics.translationLoadTime.toFixed(2)}ms`);
    console.log(`   • Avg Translation Time: ${result.performanceMetrics.averageTranslationTime.toFixed(4)}ms`);
    console.log(`   • Translations/Second: ${result.performanceMetrics.translationsPerSecond.toFixed(0)}`);
    console.log(`   • Memory Usage: ${(result.performanceMetrics.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}MB`);
    
    // Issues breakdown
    if (result.summary.criticalIssues > 0 || result.summary.warnings > 0) {
      console.log(`\n🚨 ISSUES FOUND:`);
      
      // Missing translations
      const totalMissing = Object.values(result.missingKeys).reduce((sum, keys) => sum + keys.length, 0);
      if (totalMissing > 0) {
        console.log(`   • Missing Translations: ${totalMissing}`);
        Object.entries(result.missingKeys).forEach(([lang, keys]) => {
          if (keys.length > 0) {
            console.log(`     - ${lang.toUpperCase()}: ${keys.length} missing`);
          }
        });
      }
      
      // Hardcoded strings
      if (result.hardcodedStrings.length > 0) {
        console.log(`   • Hardcoded Strings: ${result.hardcodedStrings.length}`);
      }
      
      // Orphaned keys
      const totalOrphaned = Object.values(result.orphanedKeys).reduce((sum, keys) => sum + keys.length, 0);
      if (totalOrphaned > 0) {
        console.log(`   • Orphaned Keys: ${totalOrphaned}`);
      }
    }
    
    // Recommendations
    if (result.summary.recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS:`);
      result.summary.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }
    
    console.log(`\n📄 Full report saved to: qa-reports/translation-validation-${new Date().toISOString().split('T')[0]}.json`);
    console.log('='.repeat(60) + '\n');
  }

  /**
   * Utility functions
   */
  private extractAllKeys(obj: any, prefix = ''): string[] {
    const keys: string[] = [];
    
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...this.extractAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  }

  private validateStructure(): string[] {
    const issues: string[] = [];
    
    // Check that all languages have the same structure
    const referenceStructure = this.getObjectStructure(translations.en);
    
    for (const lang of this.supportedLanguages) {
      if (lang === 'en') continue;
      
      const langStructure = this.getObjectStructure(translations[lang]);
      const structureDiff = this.compareStructures(referenceStructure, langStructure);
      
      if (structureDiff.length > 0) {
        issues.push(`${lang}: Structure differs from reference (${structureDiff.length} differences)`);
      }
    }
    
    return issues;
  }

  private getObjectStructure(obj: any, prefix = ''): string[] {
    const structure: string[] = [];
    
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        structure.push(fullKey);
        structure.push(...this.getObjectStructure(obj[key], fullKey));
      } else {
        structure.push(fullKey);
      }
    }
    
    return structure.sort();
  }

  private compareStructures(struct1: string[], struct2: string[]): string[] {
    const diff: string[] = [];
    
    for (const key of struct1) {
      if (!struct2.includes(key)) {
        diff.push(key);
      }
    }
    
    for (const key of struct2) {
      if (!struct1.includes(key)) {
        diff.push(key);
      }
    }
    
    return diff;
  }

  private getRandomTranslationKeys(count: number): string[] {
    const allKeys = this.extractAllKeys(translations.en);
    const randomKeys: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * allKeys.length);
      randomKeys.push(allKeys[randomIndex]);
    }
    
    return randomKeys;
  }

  private isIgnoredDirectory(dirname: string): boolean {
    const ignored = ['node_modules', '.git', 'dist', 'build', '.next', '.vscode'];
    return ignored.includes(dirname);
  }

  private isReactFile(filename: string): boolean {
    return filename.endsWith('.tsx') || filename.endsWith('.ts') || filename.endsWith('.jsx') || filename.endsWith('.js');
  }

  private async ensureReportDirectory(): Promise<void> {
    try {
      await fs.access(this.reportPath);
    } catch {
      await fs.mkdir(this.reportPath, { recursive: true });
    }
  }

  private async saveReport(result: ValidationResult): Promise<void> {
    const reportFilename = `translation-validation-${new Date().toISOString().split('T')[0]}.json`;
    const reportPath = path.join(this.reportPath, reportFilename);
    
    await fs.writeFile(reportPath, JSON.stringify(result, null, 2), 'utf-8');
    
    // Also save a summary report
    const summaryFilename = `translation-summary-${new Date().toISOString().split('T')[0]}.md`;
    const summaryPath = path.join(this.reportPath, summaryFilename);
    
    const summaryContent = this.generateMarkdownSummary(result);
    await fs.writeFile(summaryPath, summaryContent, 'utf-8');
  }

  private generateMarkdownSummary(result: ValidationResult): string {
    const status = result.summary.passed ? '✅ PASSED' : '❌ FAILED';
    
    return `# Translation Validation Report

**Date:** ${new Date(result.timestamp).toLocaleDateString()}
**Status:** ${status}

## Summary
- **Translation Coverage:** ${result.coverage.toFixed(1)}%
- **Total Keys:** ${result.totalKeys}
- **Critical Issues:** ${result.summary.criticalIssues}
- **Warnings:** ${result.summary.warnings}

## Performance Metrics
- **Load Time:** ${result.performanceMetrics.translationLoadTime.toFixed(2)}ms
- **Average Translation Time:** ${result.performanceMetrics.averageTranslationTime.toFixed(4)}ms
- **Translations per Second:** ${result.performanceMetrics.translationsPerSecond.toFixed(0)}
- **Memory Usage:** ${(result.performanceMetrics.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)}MB

## Issues by Language

${this.supportedLanguages.map(lang => {
  const missing = result.missingKeys[lang].length;
  const orphaned = result.orphanedKeys[lang].length;
  return `### ${lang.toUpperCase()}
- Missing Keys: ${missing}
- Orphaned Keys: ${orphaned}`;
}).join('\n\n')}

## Recommendations
${result.summary.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

## Hardcoded Strings Found
${result.hardcodedStrings.length > 0 ? 
  result.hardcodedStrings.map(str => `- ${str}`).join('\n') : 
  'None found ✅'
}
`;
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new TranslationValidator();
  validator.runCompleteValidation()
    .then((result) => {
      process.exit(result.summary.passed ? 0 : 1);
    })
    .catch((error) => {
      console.error('❌ Validation script failed:', error);
      process.exit(1);
    });
}