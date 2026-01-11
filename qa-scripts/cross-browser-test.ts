#!/usr/bin/env tsx
/**
 * CarMarket365 Cross-Browser Translation Testing
 * 
 * Automated cross-browser testing for translation system
 * Tests functionality, performance, and visual consistency across browsers and languages
 */

import { chromium, firefox, webkit, Browser, Page, BrowserContext } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

interface BrowserTestResult {
  browser: string;
  version: string;
  language: string;
  pageUrl: string;
  passed: boolean;
  issues: TestIssue[];
  metrics: PageMetrics;
  screenshots?: string[];
}

interface TestIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'translation' | 'layout' | 'functionality' | 'performance';
  description: string;
  element?: string;
  screenshot?: string;
}

interface PageMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  timeToInteractive: number;
  languageSwitchTime?: number;
  memoryUsage?: number;
}

interface TestConfiguration {
  baseUrl: string;
  languages: string[];
  browsers: BrowserConfig[];
  pages: string[];
  viewports: ViewportConfig[];
  timeout: number;
  screenshotOnFailure: boolean;
}

interface BrowserConfig {
  name: 'chromium' | 'firefox' | 'webkit';
  headless: boolean;
  slowMo?: number;
}

interface ViewportConfig {
  name: string;
  width: number;
  height: number;
}

export class CrossBrowserTranslationTester {
  private config: TestConfiguration;
  private reportPath: string;
  private screenshotPath: string;

  constructor(baseUrl: string = 'http://localhost:5173') {
    this.config = {
      baseUrl,
      languages: ['en', 'mk', 'sq', 'sl', 'lv', 'ru'],
      browsers: [
        { name: 'chromium', headless: true },
        { name: 'firefox', headless: true },
        { name: 'webkit', headless: true }
      ],
      pages: [
        '/',
        '/browse-cars',
        '/sell-car',
        '/about',
        '/contact',
        '/faq',
        '/advanced-search',
        '/dealer-dashboard',
        '/admin-dashboard'
      ],
      viewports: [
        { name: 'desktop', width: 1920, height: 1080 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'mobile', width: 375, height: 812 }
      ],
      timeout: 30000,
      screenshotOnFailure: true
    };

    this.reportPath = path.join(process.cwd(), 'qa-reports', 'cross-browser');
    this.screenshotPath = path.join(this.reportPath, 'screenshots');
  }

  /**
   * Run complete cross-browser testing suite
   */
  async runCompleteTest(): Promise<BrowserTestResult[]> {
    console.log('🚀 Starting Cross-Browser Translation Testing...\n');
    
    const startTime = Date.now();
    const results: BrowserTestResult[] = [];

    // Ensure directories exist
    await this.ensureDirectories();

    // Test each browser
    for (const browserConfig of this.config.browsers) {
      console.log(`🌐 Testing ${browserConfig.name}...`);
      
      const browserResults = await this.testBrowser(browserConfig);
      results.push(...browserResults);
    }

    const duration = Date.now() - startTime;
    console.log(`✅ Cross-browser testing completed in ${duration}ms\n`);

    // Generate and save report
    await this.generateReport(results);
    this.displaySummary(results);

    return results;
  }

  /**
   * Test a specific browser across all languages, pages, and viewports
   */
  private async testBrowser(browserConfig: BrowserConfig): Promise<BrowserTestResult[]> {
    const browser = await this.launchBrowser(browserConfig);
    const results: BrowserTestResult[] = [];

    try {
      const version = await this.getBrowserVersion(browser);
      
      for (const viewport of this.config.viewports) {
        for (const language of this.config.languages) {
          for (const pagePath of this.config.pages) {
            const result = await this.testPage(
              browser,
              browserConfig.name,
              version,
              language,
              pagePath,
              viewport
            );
            results.push(result);
          }
        }
      }
    } finally {
      await browser.close();
    }

    return results;
  }

  /**
   * Test a specific page in a browser with given language and viewport
   */
  private async testPage(
    browser: Browser,
    browserName: string,
    version: string,
    language: string,
    pagePath: string,
    viewport: ViewportConfig
  ): Promise<BrowserTestResult> {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      locale: language,
    });

    const page = await context.newPage();
    const url = `${this.config.baseUrl}${pagePath}?lang=${language}`;
    
    const result: BrowserTestResult = {
      browser: browserName,
      version,
      language,
      pageUrl: url,
      passed: true,
      issues: [],
      metrics: {
        loadTime: 0,
        firstContentfulPaint: 0,
        timeToInteractive: 0,
      },
      screenshots: []
    };

    const startTime = Date.now();

    try {
      // Navigate and measure performance
      await this.navigateAndMeasure(page, url, result);
      
      // Wait for content to load
      await page.waitForLoadState('networkidle', { timeout: this.config.timeout });
      
      result.metrics.loadTime = Date.now() - startTime;

      // Run all translation tests
      await this.runTranslationTests(page, result, viewport);
      
    } catch (error) {
      result.passed = false;
      result.issues.push({
        severity: 'critical',
        category: 'functionality',
        description: `Page failed to load: ${error.message}`,
      });

      if (this.config.screenshotOnFailure) {
        const screenshotPath = await this.takeScreenshot(page, browserName, language, pagePath, viewport.name, 'error');
        if (screenshotPath) result.screenshots?.push(screenshotPath);
      }
    } finally {
      await context.close();
    }

    return result;
  }

  /**
   * Navigate to page and measure performance metrics
   */
  private async navigateAndMeasure(page: Page, url: string, result: BrowserTestResult): Promise<void> {
    // Enable performance tracking
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Measure performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      let firstContentfulPaint = 0;
      const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        firstContentfulPaint = fcpEntry.startTime;
      }

      return {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        firstContentfulPaint,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      };
    });

    result.metrics.firstContentfulPaint = performanceMetrics.firstContentfulPaint;
  }

  /**
   * Run translation-specific tests on the page
   */
  private async runTranslationTests(page: Page, result: BrowserTestResult, viewport: ViewportConfig): Promise<void> {
    // Test 1: Check for missing translation placeholders
    await this.checkMissingTranslations(page, result);
    
    // Test 2: Check layout integrity
    await this.checkLayoutIntegrity(page, result, viewport);
    
    // Test 3: Test language switching (if available)
    await this.testLanguageSwitching(page, result);
    
    // Test 4: Check form functionality
    await this.testFormFunctionality(page, result);
    
    // Test 5: Check interactive elements
    await this.testInteractiveElements(page, result);
    
    // Test 6: Check accessibility
    await this.checkAccessibility(page, result);
  }

  /**
   * Check for missing translation placeholders
   */
  private async checkMissingTranslations(page: Page, result: BrowserTestResult): Promise<void> {
    try {
      // Look for "Missing:" text that indicates translation failures
      const missingElements = await page.locator('text=/Missing:.*/', { hasText: /Missing:/ }).count();
      
      if (missingElements > 0) {
        result.passed = false;
        result.issues.push({
          severity: 'critical',
          category: 'translation',
          description: `Found ${missingElements} missing translation placeholders`,
        });
      }

      // Look for "Invalid:" text that indicates invalid translation keys
      const invalidElements = await page.locator('text=/Invalid:.*/', { hasText: /Invalid:/ }).count();
      
      if (invalidElements > 0) {
        result.passed = false;
        result.issues.push({
          severity: 'high',
          category: 'translation',
          description: `Found ${invalidElements} invalid translation keys`,
        });
      }

      // Check for empty or undefined translations
      const emptyTranslations = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        let count = 0;
        
        elements.forEach(el => {
          const text = el.textContent?.trim();
          if (text === 'undefined' || text === 'null' || text === '') {
            const hasVisibleChildren = Array.from(el.children).some(child => 
              child.textContent?.trim() && child.textContent !== 'undefined' && child.textContent !== 'null'
            );
            if (!hasVisibleChildren && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
              count++;
            }
          }
        });
        
        return count;
      });

      if (emptyTranslations > 0) {
        result.issues.push({
          severity: 'medium',
          category: 'translation',
          description: `Found ${emptyTranslations} elements with empty or undefined content`,
        });
      }

    } catch (error) {
      result.issues.push({
        severity: 'low',
        category: 'translation',
        description: `Translation check failed: ${error.message}`,
      });
    }
  }

  /**
   * Check layout integrity with translated content
   */
  private async checkLayoutIntegrity(page: Page, result: BrowserTestResult, viewport: ViewportConfig): Promise<void> {
    try {
      // Check for horizontal scrollbars (unintended overflow)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });

      if (hasHorizontalScroll && viewport.name !== 'mobile') {
        result.issues.push({
          severity: 'medium',
          category: 'layout',
          description: 'Horizontal scroll detected - possible text overflow',
        });
      }

      // Check for overlapping elements
      const overlappingElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        let overlaps = 0;
        
        Array.from(elements).forEach(el => {
          if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
          
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          
          // Check if element overlaps with its siblings
          const siblings = Array.from(el.parentNode?.children || []);
          siblings.forEach(sibling => {
            if (sibling === el || sibling.tagName === 'SCRIPT' || sibling.tagName === 'STYLE') return;
            
            const siblingRect = sibling.getBoundingClientRect();
            if (siblingRect.width === 0 || siblingRect.height === 0) return;
            
            // Check for overlap
            const overlap = !(rect.right <= siblingRect.left || 
                            rect.left >= siblingRect.right || 
                            rect.bottom <= siblingRect.top || 
                            rect.top >= siblingRect.bottom);
            
            if (overlap) overlaps++;
          });
        });
        
        return overlaps;
      });

      if (overlappingElements > 0) {
        result.issues.push({
          severity: 'low',
          category: 'layout',
          description: `${overlappingElements} potential element overlaps detected`,
        });
      }

      // Check for buttons that might be too small for their text
      const buttonIssues = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        let issues = 0;
        
        buttons.forEach(button => {
          const rect = button.getBoundingClientRect();
          const text = button.textContent?.trim();
          
          // Rough heuristic: if text is long but button is narrow, it might be truncated
          if (text && text.length > 10 && rect.width < 100) {
            issues++;
          }
        });
        
        return issues;
      });

      if (buttonIssues > 0) {
        result.issues.push({
          severity: 'low',
          category: 'layout',
          description: `${buttonIssues} buttons may have text that doesn't fit properly`,
        });
      }

    } catch (error) {
      result.issues.push({
        severity: 'low',
        category: 'layout',
        description: `Layout integrity check failed: ${error.message}`,
      });
    }
  }

  /**
   * Test language switching functionality
   */
  private async testLanguageSwitching(page: Page, result: BrowserTestResult): Promise<void> {
    try {
      // Look for language switcher elements
      const languageSwitcher = page.locator('[data-testid*="language"], [data-testid*="country"], .language-selector, .country-selector');
      
      if (await languageSwitcher.count() === 0) {
        // Language switcher not found - this might be expected on some pages
        return;
      }

      // Record initial content
      const initialTitle = await page.locator('h1').first().textContent();
      const switchStartTime = Date.now();

      // Try to switch language
      await languageSwitcher.first().click({ timeout: 5000 });
      
      // Look for language options
      const languageOptions = page.locator('[data-value], .language-option, [role="option"]');
      const optionCount = await languageOptions.count();
      
      if (optionCount > 0) {
        // Click on a different language option
        await languageOptions.nth(1).click({ timeout: 5000 });
        
        // Wait for content to update
        await page.waitForTimeout(1000);
        
        const newTitle = await page.locator('h1').first().textContent();
        const switchEndTime = Date.now();
        
        result.metrics.languageSwitchTime = switchEndTime - switchStartTime;

        // Check if content actually changed
        if (initialTitle === newTitle && result.language !== 'en') {
          result.issues.push({
            severity: 'high',
            category: 'functionality',
            description: 'Language switching did not update page content',
          });
        }

        // Check if switch was reasonably fast
        if (result.metrics.languageSwitchTime > 3000) {
          result.issues.push({
            severity: 'medium',
            category: 'performance',
            description: `Language switching took ${result.metrics.languageSwitchTime}ms (too slow)`,
          });
        }
      }

    } catch (error) {
      // Language switching failure is not critical - might not be available on all pages
      result.issues.push({
        severity: 'low',
        category: 'functionality',
        description: `Language switching test failed: ${error.message}`,
      });
    }
  }

  /**
   * Test form functionality with translations
   */
  private async testFormFunctionality(page: Page, result: BrowserTestResult): Promise<void> {
    try {
      // Find forms on the page
      const forms = await page.locator('form').count();
      
      if (forms === 0) return; // No forms to test
      
      // Test each form
      for (let i = 0; i < Math.min(forms, 3); i++) { // Limit to first 3 forms
        const form = page.locator('form').nth(i);
        
        // Check that form has translated labels and placeholders
        const inputs = form.locator('input, textarea, select');
        const inputCount = await inputs.count();
        
        for (let j = 0; j < inputCount; j++) {
          const input = inputs.nth(j);
          
          // Check placeholder text
          const placeholder = await input.getAttribute('placeholder');
          if (placeholder && (placeholder.includes('Missing:') || placeholder.includes('Invalid:'))) {
            result.issues.push({
              severity: 'high',
              category: 'translation',
              description: 'Form input has untranslated placeholder',
              element: `Form ${i + 1}, Input ${j + 1}`,
            });
          }
        }

        // Check for form labels
        const labels = form.locator('label');
        const labelCount = await labels.count();
        
        for (let k = 0; k < labelCount; k++) {
          const label = labels.nth(k);
          const labelText = await label.textContent();
          
          if (labelText && (labelText.includes('Missing:') || labelText.includes('Invalid:'))) {
            result.issues.push({
              severity: 'high',
              category: 'translation',
              description: 'Form label has untranslated text',
              element: `Form ${i + 1}, Label ${k + 1}`,
            });
          }
        }
      }

    } catch (error) {
      result.issues.push({
        severity: 'low',
        category: 'functionality',
        description: `Form functionality test failed: ${error.message}`,
      });
    }
  }

  /**
   * Test interactive elements
   */
  private async testInteractiveElements(page: Page, result: BrowserTestResult): Promise<void> {
    try {
      // Test button text translations
      const buttons = await page.locator('button').count();
      
      for (let i = 0; i < Math.min(buttons, 10); i++) { // Test first 10 buttons
        const button = page.locator('button').nth(i);
        const buttonText = await button.textContent();
        
        if (buttonText && (buttonText.includes('Missing:') || buttonText.includes('Invalid:'))) {
          result.issues.push({
            severity: 'medium',
            category: 'translation',
            description: 'Button has untranslated text',
            element: `Button ${i + 1}: ${buttonText}`,
          });
        }
      }

      // Test link text translations
      const links = await page.locator('a').count();
      
      for (let i = 0; i < Math.min(links, 10); i++) { // Test first 10 links
        const link = page.locator('a').nth(i);
        const linkText = await link.textContent();
        
        if (linkText && linkText.trim() && (linkText.includes('Missing:') || linkText.includes('Invalid:'))) {
          result.issues.push({
            severity: 'low',
            category: 'translation',
            description: 'Link has untranslated text',
            element: `Link ${i + 1}: ${linkText}`,
          });
        }
      }

    } catch (error) {
      result.issues.push({
        severity: 'low',
        category: 'functionality',
        description: `Interactive elements test failed: ${error.message}`,
      });
    }
  }

  /**
   * Check basic accessibility
   */
  private async checkAccessibility(page: Page, result: BrowserTestResult): Promise<void> {
    try {
      // Check for images without alt text
      const imagesWithoutAlt = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        let count = 0;
        
        images.forEach(img => {
          if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
            count++;
          }
        });
        
        return count;
      });

      if (imagesWithoutAlt > 0) {
        result.issues.push({
          severity: 'low',
          category: 'functionality',
          description: `${imagesWithoutAlt} images missing alt text (accessibility issue)`,
        });
      }

      // Check for proper heading structure
      const headingStructure = await page.evaluate(() => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const levels: number[] = [];
        
        headings.forEach(heading => {
          const level = parseInt(heading.tagName.charAt(1));
          levels.push(level);
        });
        
        return levels;
      });

      // Basic check: should start with h1 and not skip levels dramatically
      if (headingStructure.length > 0 && headingStructure[0] !== 1) {
        result.issues.push({
          severity: 'low',
          category: 'functionality',
          description: 'Page should start with h1 heading for accessibility',
        });
      }

    } catch (error) {
      result.issues.push({
        severity: 'low',
        category: 'functionality',
        description: `Accessibility check failed: ${error.message}`,
      });
    }
  }

  /**
   * Take screenshot for documentation or debugging
   */
  private async takeScreenshot(
    page: Page,
    browser: string,
    language: string,
    pagePath: string,
    viewport: string,
    type: string
  ): Promise<string | null> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${browser}-${language}-${pagePath.replace(/\//g, '_')}-${viewport}-${type}-${timestamp}.png`;
      const fullPath = path.join(this.screenshotPath, filename);
      
      await page.screenshot({ 
        path: fullPath, 
        fullPage: true,
        type: 'png'
      });
      
      return filename;
    } catch (error) {
      console.warn(`Failed to take screenshot: ${error.message}`);
      return null;
    }
  }

  /**
   * Launch browser with appropriate configuration
   */
  private async launchBrowser(config: BrowserConfig): Promise<Browser> {
    const browsers = { chromium, firefox, webkit };
    const browserType = browsers[config.name];
    
    return await browserType.launch({
      headless: config.headless,
      slowMo: config.slowMo,
      args: config.name === 'chromium' ? [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ] : []
    });
  }

  /**
   * Get browser version for reporting
   */
  private async getBrowserVersion(browser: Browser): Promise<string> {
    try {
      const version = browser.version();
      return version;
    } catch {
      return 'unknown';
    }
  }

  /**
   * Generate comprehensive test report
   */
  private async generateReport(results: BrowserTestResult[]): Promise<void> {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportFilename = `cross-browser-report-${timestamp}.json`;
    const reportPath = path.join(this.reportPath, reportFilename);
    
    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: results.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => r.passed === false).length,
      browsers: [...new Set(results.map(r => r.browser))],
      languages: [...new Set(results.map(r => r.language))],
      averageLoadTime: results.reduce((sum, r) => sum + r.metrics.loadTime, 0) / results.length,
      results
    };

    await fs.writeFile(reportPath, JSON.stringify(summary, null, 2), 'utf-8');
    
    // Generate markdown summary
    const markdownSummary = this.generateMarkdownReport(summary);
    const markdownPath = path.join(this.reportPath, `cross-browser-summary-${timestamp}.md`);
    await fs.writeFile(markdownPath, markdownSummary, 'utf-8');
  }

  /**
   * Generate markdown report
   */
  private generateMarkdownReport(summary: any): string {
    const passRate = ((summary.passed / summary.totalTests) * 100).toFixed(1);
    
    return `# Cross-Browser Translation Test Report

**Date:** ${new Date(summary.timestamp).toLocaleDateString()}
**Total Tests:** ${summary.totalTests}
**Pass Rate:** ${passRate}%

## Summary
- **Passed:** ${summary.passed}
- **Failed:** ${summary.failed}
- **Average Load Time:** ${summary.averageLoadTime.toFixed(0)}ms

## Tested Browsers
${summary.browsers.map((b: string) => `- ${b}`).join('\n')}

## Tested Languages
${summary.languages.map((l: string) => `- ${l}`).join('\n')}

## Issues by Severity
${this.summarizeIssuesBySeverity(summary.results)}

## Performance Overview
${this.generatePerformanceOverview(summary.results)}

## Browser-Specific Issues
${this.summarizeBrowserIssues(summary.results)}
`;
  }

  /**
   * Summarize issues by severity
   */
  private summarizeIssuesBySeverity(results: BrowserTestResult[]): string {
    const severityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
    
    results.forEach(result => {
      result.issues.forEach(issue => {
        severityCounts[issue.severity]++;
      });
    });

    return Object.entries(severityCounts)
      .map(([severity, count]) => `- **${severity.charAt(0).toUpperCase() + severity.slice(1)}:** ${count}`)
      .join('\n');
  }

  /**
   * Generate performance overview
   */
  private generatePerformanceOverview(results: BrowserTestResult[]): string {
    const byBrowser = results.reduce((acc, result) => {
      if (!acc[result.browser]) acc[result.browser] = [];
      acc[result.browser].push(result.metrics.loadTime);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(byBrowser)
      .map(([browser, times]) => {
        const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
        return `- **${browser}:** ${avg.toFixed(0)}ms average`;
      })
      .join('\n');
  }

  /**
   * Summarize browser-specific issues
   */
  private summarizeBrowserIssues(results: BrowserTestResult[]): string {
    const byBrowser = results.reduce((acc, result) => {
      if (!acc[result.browser]) acc[result.browser] = [];
      acc[result.browser].push(...result.issues);
      return acc;
    }, {} as Record<string, TestIssue[]>);

    return Object.entries(byBrowser)
      .map(([browser, issues]) => {
        const criticalIssues = issues.filter(i => i.severity === 'critical').length;
        return `- **${browser}:** ${issues.length} total issues, ${criticalIssues} critical`;
      })
      .join('\n');
  }

  /**
   * Display test summary to console
   */
  private displaySummary(results: BrowserTestResult[]): void {
    const totalTests = results.length;
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => r.passed === false).length;
    const passRate = ((passed / totalTests) * 100).toFixed(1);

    console.log('\n' + '='.repeat(60));
    console.log('   CROSS-BROWSER TRANSLATION TEST SUMMARY');
    console.log('='.repeat(60));

    const statusColor = failed === 0 ? '\x1b[32m' : '\x1b[31m';
    console.log(`${statusColor}%s\x1b[0m`, `\n🎯 OVERALL: ${passed}/${totalTests} tests passed (${passRate}%)`);

    console.log(`\n📊 RESULTS BY BROWSER:`);
    const byBrowser = results.reduce((acc, result) => {
      const key = `${result.browser}`;
      if (!acc[key]) acc[key] = { passed: 0, failed: 0 };
      if (result.passed) acc[key].passed++;
      else acc[key].failed++;
      return acc;
    }, {} as Record<string, { passed: number; failed: number }>);

    Object.entries(byBrowser).forEach(([browser, stats]) => {
      const total = stats.passed + stats.failed;
      const rate = ((stats.passed / total) * 100).toFixed(1);
      console.log(`   ${browser}: ${stats.passed}/${total} (${rate}%)`);
    });

    console.log(`\n🌐 RESULTS BY LANGUAGE:`);
    const byLanguage = results.reduce((acc, result) => {
      if (!acc[result.language]) acc[result.language] = { passed: 0, failed: 0 };
      if (result.passed) acc[result.language].passed++;
      else acc[result.language].failed++;
      return acc;
    }, {} as Record<string, { passed: number; failed: number }>);

    Object.entries(byLanguage).forEach(([lang, stats]) => {
      const total = stats.passed + stats.failed;
      const rate = ((stats.passed / total) * 100).toFixed(1);
      console.log(`   ${lang.toUpperCase()}: ${stats.passed}/${total} (${rate}%)`);
    });

    const avgLoadTime = results.reduce((sum, r) => sum + r.metrics.loadTime, 0) / results.length;
    console.log(`\n⚡ AVERAGE LOAD TIME: ${avgLoadTime.toFixed(0)}ms`);

    console.log(`\n📄 Reports saved to: ${this.reportPath}/`);
    console.log('='.repeat(60) + '\n');
  }

  /**
   * Ensure required directories exist
   */
  private async ensureDirectories(): Promise<void> {
    try {
      await fs.access(this.reportPath);
    } catch {
      await fs.mkdir(this.reportPath, { recursive: true });
    }

    try {
      await fs.access(this.screenshotPath);
    } catch {
      await fs.mkdir(this.screenshotPath, { recursive: true });
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2] || 'http://localhost:5173';
  const tester = new CrossBrowserTranslationTester(baseUrl);
  
  tester.runCompleteTest()
    .then((results) => {
      const failed = results.filter(r => !r.passed).length;
      process.exit(failed > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('❌ Cross-browser testing failed:', error);
      process.exit(1);
    });
}