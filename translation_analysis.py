#!/usr/bin/env python3
"""
Comprehensive Translation Quality Analysis for Car Market Platform
Analyzes TypeScript compilation errors, duplicates, and structural issues
"""

import os
import re
import json
from typing import Dict, List, Any, Set
from pathlib import Path

class TranslationQualityAnalyzer:
    def __init__(self, translations_dir: str):
        self.translations_dir = Path(translations_dir)
        self.languages = ['en', 'mk', 'sq', 'sl', 'lv', 'ru']
        self.results = {
            'critical_errors': [],
            'warnings': [],
            'bundle_analysis': {},
            'consistency_analysis': {},
            'quality_scores': {}
        }
    
    def analyze_file_structure(self) -> Dict[str, Any]:
        """Analyze translation file structure and sizes"""
        structure = {}
        total_size = 0
        
        for lang in self.languages:
            file_path = self.translations_dir / f"{lang}.ts"
            if file_path.exists():
                size = file_path.stat().st_size
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    lines = len(content.splitlines())
                    chars = len(content)
                    words = len(content.split())
                
                structure[lang] = {
                    'size_bytes': size,
                    'lines': lines,
                    'characters': chars,
                    'words': words,
                    'exists': True
                }
                total_size += size
            else:
                structure[lang] = {'exists': False}
        
        # Calculate bundle impact
        structure['total_size'] = total_size
        structure['size_mb'] = total_size / (1024 * 1024)
        structure['estimated_gzip_size'] = total_size * 0.3  # Rough compression estimate
        
        return structure
    
    def find_duplicate_properties(self, file_path: Path) -> List[Dict[str, Any]]:
        """Find duplicate properties in a translation file"""
        duplicates = []
        
        if not file_path.exists():
            return duplicates
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find property declarations
            property_pattern = r'^\s*(\w+):\s*[\'"`]'
            lines = content.splitlines()
            properties = {}
            
            for i, line in enumerate(lines, 1):
                match = re.search(property_pattern, line)
                if match:
                    prop_name = match.group(1)
                    if prop_name in properties:
                        duplicates.append({
                            'property': prop_name,
                            'line1': properties[prop_name],
                            'line2': i,
                            'severity': 'CRITICAL'
                        })
                    else:
                        properties[prop_name] = i
                        
        except Exception as e:
            duplicates.append({
                'property': 'FILE_ERROR',
                'error': str(e),
                'severity': 'CRITICAL'
            })
        
        return duplicates
    
    def analyze_typescript_errors(self, file_path: Path) -> List[Dict[str, Any]]:
        """Simulate TypeScript error analysis"""
        errors = []
        
        if not file_path.exists():
            return [{'type': 'FILE_NOT_FOUND', 'file': str(file_path), 'severity': 'CRITICAL'}]
        
        # Common error patterns to look for
        error_patterns = [
            (r'(\w+):\s*[\'"`].*[\'"`],?\s*[\r\n]\s*\1:', 'DUPLICATE_PROPERTY'),
            (r'(\w+):\s*\{[^}]*\},?\s*[\r\n]\s*\1:', 'DUPLICATE_OBJECT'),
            (r'[\'"`][^\'"`]*[\'"`]\s*:\s*[\'"`][^\'"`]*[\'"`],?\s*[\r\n]\s*[\'"`][^\'"`]*[\'"`]\s*:', 'DUPLICATE_QUOTED_KEY'),
        ]
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            for pattern, error_type in error_patterns:
                matches = re.finditer(pattern, content, re.MULTILINE | re.IGNORECASE)
                for match in matches:
                    line_num = content[:match.start()].count('\n') + 1
                    errors.append({
                        'type': error_type,
                        'line': line_num,
                        'matched_text': match.group(0)[:100] + '...' if len(match.group(0)) > 100 else match.group(0),
                        'severity': 'HIGH'
                    })
        
        except Exception as e:
            errors.append({
                'type': 'PARSE_ERROR',
                'error': str(e),
                'severity': 'CRITICAL'
            })
        
        return errors
    
    def analyze_translation_completeness(self) -> Dict[str, Any]:
        """Analyze translation completeness across languages"""
        completeness = {}
        
        # Get English as reference
        en_file = self.translations_dir / "en.ts"
        if not en_file.exists():
            return {'error': 'English reference file not found'}
        
        # Extract keys from English file (simplified)
        try:
            with open(en_file, 'r', encoding='utf-8') as f:
                en_content = f.read()
            
            # Simple key extraction (this is a basic implementation)
            en_keys = set(re.findall(r'^\s*(\w+):', en_content, re.MULTILINE))
            
            for lang in self.languages:
                if lang == 'en':
                    completeness[lang] = {'completion_rate': 100.0, 'missing_keys': 0}
                    continue
                
                lang_file = self.translations_dir / f"{lang}.ts"
                if lang_file.exists():
                    with open(lang_file, 'r', encoding='utf-8') as f:
                        lang_content = f.read()
                    
                    lang_keys = set(re.findall(r'^\s*(\w+):', lang_content, re.MULTILINE))
                    missing_keys = en_keys - lang_keys
                    completion_rate = (len(lang_keys) / len(en_keys)) * 100 if en_keys else 0
                    
                    completeness[lang] = {
                        'completion_rate': round(completion_rate, 2),
                        'missing_keys': len(missing_keys),
                        'extra_keys': len(lang_keys - en_keys),
                        'total_keys': len(lang_keys)
                    }
                else:
                    completeness[lang] = {
                        'completion_rate': 0.0,
                        'missing_keys': len(en_keys),
                        'error': 'File not found'
                    }
        
        except Exception as e:
            completeness['error'] = str(e)
        
        return completeness
    
    def calculate_quality_scores(self) -> Dict[str, float]:
        """Calculate overall quality scores for each language"""
        scores = {}
        
        for lang in self.languages:
            file_path = self.translations_dir / f"{lang}.ts"
            
            if not file_path.exists():
                scores[lang] = 0.0
                continue
            
            # Quality factors
            score = 100.0
            
            # Check for duplicates
            duplicates = self.find_duplicate_properties(file_path)
            score -= len(duplicates) * 10  # -10 points per duplicate
            
            # Check for TypeScript errors
            errors = self.analyze_typescript_errors(file_path)
            critical_errors = [e for e in errors if e.get('severity') == 'CRITICAL']
            high_errors = [e for e in errors if e.get('severity') == 'HIGH']
            
            score -= len(critical_errors) * 15  # -15 points per critical error
            score -= len(high_errors) * 5     # -5 points per high error
            
            # File size penalty (if too large)
            if file_path.exists():
                size_kb = file_path.stat().st_size / 1024
                if size_kb > 100:  # Penalty for files over 100KB
                    score -= (size_kb - 100) * 0.1
            
            scores[lang] = max(0.0, round(score, 2))
        
        return scores
    
    def run_full_analysis(self) -> Dict[str, Any]:
        """Run comprehensive quality analysis"""
        print("🔍 Running Comprehensive Translation Quality Analysis...")
        
        # File structure analysis
        print("📁 Analyzing file structure...")
        self.results['bundle_analysis'] = self.analyze_file_structure()
        
        # Error analysis for each language
        print("🐛 Analyzing TypeScript errors...")
        for lang in self.languages:
            file_path = self.translations_dir / f"{lang}.ts"
            
            # Find duplicates
            duplicates = self.find_duplicate_properties(file_path)
            if duplicates:
                self.results['critical_errors'].extend([
                    f"{lang}.ts: {d['property']} duplicate on lines {d.get('line1', '?')} and {d.get('line2', '?')}"
                    for d in duplicates
                ])
            
            # Find TypeScript errors
            ts_errors = self.analyze_typescript_errors(file_path)
            for error in ts_errors:
                if error.get('severity') == 'CRITICAL':
                    self.results['critical_errors'].append(
                        f"{lang}.ts line {error.get('line', '?')}: {error['type']}"
                    )
                elif error.get('severity') == 'HIGH':
                    self.results['warnings'].append(
                        f"{lang}.ts line {error.get('line', '?')}: {error['type']}"
                    )
        
        # Translation completeness
        print("📊 Analyzing translation completeness...")
        self.results['consistency_analysis'] = self.analyze_translation_completeness()
        
        # Quality scores
        print("⭐ Calculating quality scores...")
        self.results['quality_scores'] = self.calculate_quality_scores()
        
        return self.results
    
    def generate_report(self, output_file: str = None) -> str:
        """Generate a comprehensive quality assessment report"""
        report = []
        
        # Executive Summary
        report.append("# 🚗 Car Market Translation System Quality Assessment Report")
        report.append("=" * 60)
        report.append("")
        
        # Critical Issues Summary
        critical_count = len(self.results['critical_errors'])
        warning_count = len(self.results['warnings'])
        
        report.append(f"## 🚨 Executive Summary")
        report.append(f"- **Critical Issues:** {critical_count}")
        report.append(f"- **Warnings:** {warning_count}")
        report.append(f"- **Overall Status:** {'🔴 CRITICAL' if critical_count > 0 else '🟡 ATTENTION NEEDED' if warning_count > 0 else '🟢 GOOD'}")
        report.append("")
        
        # Bundle Size Analysis
        bundle_data = self.results['bundle_analysis']
        report.append(f"## 📦 Bundle Size Analysis")
        report.append(f"- **Total Size:** {bundle_data['total_size']:,} bytes ({bundle_data['size_mb']:.2f} MB)")
        report.append(f"- **Estimated Gzipped:** {bundle_data['estimated_gzip_size']:,} bytes")
        report.append("")
        
        # Individual file sizes
        for lang in self.languages:
            if lang in bundle_data and bundle_data[lang].get('exists'):
                data = bundle_data[lang]
                report.append(f"  - **{lang.upper()}:** {data['size_bytes']:,} bytes, {data['words']:,} words, {data['lines']:,} lines")
        report.append("")
        
        # Quality Scores
        scores = self.results['quality_scores']
        report.append(f"## ⭐ Quality Scores (0-100)")
        for lang in self.languages:
            score = scores.get(lang, 0)
            status = "🟢" if score >= 80 else "🟡" if score >= 60 else "🔴"
            report.append(f"- **{lang.upper()}:** {score}/100 {status}")
        report.append("")
        
        # Critical Errors
        if self.results['critical_errors']:
            report.append(f"## 🔴 Critical Issues Requiring Immediate Attention")
            for i, error in enumerate(self.results['critical_errors'][:10], 1):  # Top 10
                report.append(f"{i}. {error}")
            if len(self.results['critical_errors']) > 10:
                report.append(f"... and {len(self.results['critical_errors']) - 10} more issues")
            report.append("")
        
        # Warnings
        if self.results['warnings']:
            report.append(f"## 🟡 Warnings")
            for i, warning in enumerate(self.results['warnings'][:10], 1):  # Top 10
                report.append(f"{i}. {warning}")
            if len(self.results['warnings']) > 10:
                report.append(f"... and {len(self.results['warnings']) - 10} more warnings")
            report.append("")
        
        # Translation Completeness
        completeness = self.results['consistency_analysis']
        if 'error' not in completeness:
            report.append(f"## 📊 Translation Completeness")
            for lang in self.languages:
                if lang in completeness:
                    data = completeness[lang]
                    rate = data.get('completion_rate', 0)
                    missing = data.get('missing_keys', 0)
                    status = "🟢" if rate >= 95 else "🟡" if rate >= 80 else "🔴"
                    report.append(f"- **{lang.upper()}:** {rate}% complete, {missing} missing keys {status}")
            report.append("")
        
        # Recommendations
        report.append(f"## 🎯 Priority Recommendations")
        
        if critical_count > 0:
            report.append("### 🔴 IMMEDIATE ACTION REQUIRED:")
            report.append("1. **Fix TypeScript compilation errors** - blocking production builds")
            report.append("2. **Remove duplicate properties** - causing runtime conflicts")
            report.append("3. **Validate interface compliance** - ensure type safety")
        
        if warning_count > 0:
            report.append("### 🟡 HIGH PRIORITY:")
            report.append("1. **Standardize translation completeness** across all languages")
            report.append("2. **Optimize bundle size** - consider code splitting for large files")
            report.append("3. **Implement translation validation** in CI/CD pipeline")
        
        report.append("### 💡 IMPROVEMENTS:")
        report.append("1. **Add automated testing** for translation integrity")
        report.append("2. **Implement progressive loading** for large translation files")
        report.append("3. **Set up monitoring** for translation errors in production")
        report.append("")
        
        # Technical Metrics
        report.append(f"## 📈 Technical Metrics")
        avg_score = sum(scores.values()) / len(scores) if scores else 0
        report.append(f"- **Average Quality Score:** {avg_score:.1f}/100")
        report.append(f"- **Files with Critical Issues:** {sum(1 for lang in self.languages if scores.get(lang, 0) < 60)}/{len(self.languages)}")
        report.append(f"- **Bundle Performance Impact:** {'HIGH' if bundle_data['size_mb'] > 1 else 'MEDIUM' if bundle_data['size_mb'] > 0.5 else 'LOW'}")
        
        report_text = "\n".join(report)
        
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(report_text)
            print(f"📝 Report saved to: {output_file}")
        
        return report_text

if __name__ == "__main__":
    # Run the analysis
    analyzer = TranslationQualityAnalyzer("shared/translations")
    results = analyzer.run_full_analysis()
    
    # Generate report
    report = analyzer.generate_report("translation_quality_assessment_report.md")
    
    # Print summary
    print("\n" + "="*60)
    print("🏁 ANALYSIS COMPLETE")
    print("="*60)
    print(f"Critical Issues: {len(results['critical_errors'])}")
    print(f"Warnings: {len(results['warnings'])}")
    
    # Print top issues
    if results['critical_errors']:
        print(f"\n🔴 Top Critical Issues:")
        for i, issue in enumerate(results['critical_errors'][:3], 1):
            print(f"  {i}. {issue}")
    
    if results['warnings']:
        print(f"\n🟡 Top Warnings:")
        for i, warning in enumerate(results['warnings'][:3], 1):
            print(f"  {i}. {warning}")