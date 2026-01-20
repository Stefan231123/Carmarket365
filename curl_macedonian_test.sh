#!/bin/bash

# Comprehensive Macedonian Translation Testing Script
# Tests all translated sections using curl and grep

BASE_URL="http://localhost:8084"
LANGUAGE="mk"
REPORT_FILE="macedonian_translation_test_report.html"

echo "🚀 Starting Macedonian Translation Testing"
echo "📍 Base URL: $BASE_URL"
echo "🌍 Language: $LANGUAGE"
echo "================================================="

# Initialize report
cat > "$REPORT_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="mk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Macedonian Translation Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        .header { background: #007BFF; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { border: 2px solid #ddd; margin: 20px 0; padding: 15px; border-radius: 8px; }
        .pass { border-color: #4CAF50; background: #f1f8e9; }
        .fail { border-color: #f44336; background: #ffebee; }
        .warning { border-color: #FF9800; background: #fff3e0; }
        .result { margin: 10px 0; padding: 8px; border-radius: 4px; }
        .pass-result { background: #d4edda; color: #155724; }
        .fail-result { background: #f8d7da; color: #721c24; }
        .warning-result { background: #fff3cd; color: #856404; }
        .code { font-family: monospace; background: #f5f5f5; padding: 5px; border-radius: 3px; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat { text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🇲🇰 Macedonian Translation Test Report</h1>
        <p>Comprehensive testing of translated sections</p>
        <p>Generated on: $(date)</p>
    </div>
EOF

# Test counters
total_tests=0
passed_tests=0
failed_tests=0

# Function to test a page
test_page() {
    local page_path="$1"
    local section_name="$2"
    local expected_translations="$3"
    
    echo ""
    echo "🧪 Testing: $section_name"
    echo "📄 Page: $page_path"
    
    total_tests=$((total_tests + 1))
    
    # Build full URL
    if [[ $page_path == /* ]]; then
        full_url="$BASE_URL$page_path?lang=$LANGUAGE"
    else
        full_url="$BASE_URL/$page_path?lang=$LANGUAGE"
    fi
    
    echo "🌐 URL: $full_url"
    
    # Fetch page content
    content=$(curl -s -L --connect-timeout 10 "$full_url" 2>/dev/null)
    curl_exit_code=$?
    
    # Initialize section in report
    cat >> "$REPORT_FILE" << EOF
    <div class="section" id="${section_name// /_}">
        <h3>🧪 $section_name</h3>
        <p><strong>URL:</strong> <span class="code">$full_url</span></p>
EOF
    
    if [ $curl_exit_code -ne 0 ] || [ -z "$content" ]; then
        echo "   ❌ Failed to load page (curl exit code: $curl_exit_code)"
        failed_tests=$((failed_tests + 1))
        
        cat >> "$REPORT_FILE" << EOF
        <div class="result fail-result">❌ Page failed to load (curl exit code: $curl_exit_code)</div>
    </div>
EOF
        return 1
    fi
    
    echo "   ✅ Page loaded successfully ($(echo "$content" | wc -c) bytes)"
    
    # Check for expected translations
    found_translations=0
    total_translations=0
    translation_details=""
    
    IFS='|' read -ra TRANSLATIONS <<< "$expected_translations"
    for translation in "${TRANSLATIONS[@]}"; do
        total_translations=$((total_translations + 1))
        if echo "$content" | grep -q "$translation"; then
            found_translations=$((found_translations + 1))
            echo "   ✅ Found: '$translation'"
            translation_details="$translation_details<div class='result pass-result'>✅ Found: '$translation'</div>"
        else
            echo "   ❌ Missing: '$translation'"
            translation_details="$translation_details<div class='result fail-result'>❌ Missing: '$translation'</div>"
        fi
    done
    
    # Check for English fallbacks (potential issues)
    english_fallbacks=$(echo "$content" | grep -oE '\b(Car|Vehicle|Sell|Buy|Make|Model|Year|Price|Contact|Submit|Dashboard|Settings|Profile|Save|Edit|Delete)\b' | wc -l)
    
    if [ "$english_fallbacks" -gt 10 ]; then
        echo "   ⚠️  High number of English fallbacks detected: $english_fallbacks"
        translation_details="$translation_details<div class='result warning-result'>⚠️ English fallbacks detected: $english_fallbacks instances</div>"
    else
        echo "   ✅ Minimal English fallbacks: $english_fallbacks"
        translation_details="$translation_details<div class='result pass-result'>✅ Minimal English fallbacks: $english_fallbacks</div>"
    fi
    
    # Calculate translation coverage
    if [ $total_translations -gt 0 ]; then
        coverage=$((found_translations * 100 / total_translations))
    else
        coverage=0
    fi
    
    echo "   📊 Translation Coverage: $coverage% ($found_translations/$total_translations)"
    
    # Check for common HTML structure
    has_form=$(echo "$content" | grep -c '<form')
    has_buttons=$(echo "$content" | grep -c '<button\|<input[^>]*type="submit"')
    has_nav=$(echo "$content" | grep -c '<nav\|<header')
    
    echo "   🔧 Structure: Forms($has_form), Buttons($has_buttons), Navigation($has_nav)"
    
    # Check for potential layout issues (very basic)
    has_viewport=$(echo "$content" | grep -c 'viewport')
    has_charset=$(echo "$content" | grep -c 'charset')
    
    echo "   📱 Layout basics: Viewport($has_viewport), Charset($has_charset)"
    
    # Determine overall result
    section_class="warning"
    overall_status="⚠️"
    if [ $coverage -ge 80 ] && [ $english_fallbacks -le 5 ]; then
        passed_tests=$((passed_tests + 1))
        section_class="pass"
        overall_status="✅"
        echo "   ✅ PASSED: Good translation coverage and minimal fallbacks"
    elif [ $coverage -ge 60 ]; then
        echo "   ⚠️  WARNING: Acceptable but could be improved"
    else
        failed_tests=$((failed_tests + 1))
        section_class="fail"
        overall_status="❌"
        echo "   ❌ FAILED: Poor translation coverage or too many fallbacks"
    fi
    
    # Add to report
    cat >> "$REPORT_FILE" << EOF
        <div class="result ${section_class}-result">$overall_status Overall Result: Translation Coverage $coverage%</div>
        $translation_details
        <div class="result">🔧 Page Structure: Forms($has_form), Buttons($has_buttons), Navigation($has_nav)</div>
        <div class="result">📱 Layout Elements: Viewport($has_viewport), Charset($has_charset)</div>
    </div>
EOF
    
    return 0
}

# Test all sections
echo ""
echo "🔍 Testing SellVehicle Section..."
test_page "/sell-vehicle" "SellVehicle Section" "Продај го вашето возило|Основни информации|Детали за возилото|марка|модел|година|пробег|состојба"

echo ""
echo "🔍 Testing ExpressSell Section..."  
test_page "/express-sell" "ExpressSell Section" "Продајте го вашиот автомобил брзо|Детали за автомобилот|Фотографии и контакт|Марка|Модел|Цена|внесете|изберете"

echo ""
echo "🔍 Testing PrivateDashboard Section..."
test_page "/private-dashboard" "PrivateDashboard Section" "Мој контролен панел|Зачувани автомобили|Вашите огласи|Експресна продажба|Поставки|Погледни детали"

echo ""
echo "🔍 Testing Navigation Section..."
test_page "/" "Navigation & Business Section" "Назад на почетна|регистрирани дилери|Квалитетни употребувани автомобили"

echo ""
echo "🔍 Testing Additional Business Section..."
test_page "/dealer-signup" "Business Registration Section" "регистрирани дилери|бизнис|компанија"

# Generate final statistics
pass_rate=$((passed_tests * 100 / total_tests))

echo ""
echo "================================================="
echo "📊 FINAL RESULTS"
echo "================================================="
echo "📈 Total Tests: $total_tests"
echo "✅ Passed: $passed_tests"
echo "❌ Failed: $failed_tests"
echo "📊 Pass Rate: $pass_rate%"
echo ""

# Finalize HTML report
cat >> "$REPORT_FILE" << EOF
    
    <div class="section pass">
        <h3>📊 Final Summary</h3>
        <div class="stats">
            <div class="stat">
                <h4>$total_tests</h4>
                <p>Total Tests</p>
            </div>
            <div class="stat">
                <h4>$passed_tests</h4>
                <p>Passed</p>
            </div>
            <div class="stat">
                <h4>$failed_tests</h4>
                <p>Failed</p>
            </div>
            <div class="stat">
                <h4>$pass_rate%</h4>
                <p>Pass Rate</p>
            </div>
        </div>
EOF

if [ $pass_rate -ge 80 ]; then
    echo "🎉 EXCELLENT: Macedonian translations are ready for production!"
    cat >> "$REPORT_FILE" << EOF
        <div class="result pass-result">🎉 <strong>EXCELLENT</strong>: Macedonian translations are ready for production!</div>
EOF
elif [ $pass_rate -ge 60 ]; then
    echo "⚠️  GOOD: Minor issues found, recommend fixes before production"
    cat >> "$REPORT_FILE" << EOF
        <div class="result warning-result">⚠️ <strong>GOOD</strong>: Minor issues found, recommend fixes before production</div>
EOF
else
    echo "🚨 CRITICAL: Major issues found, DO NOT deploy to production"
    cat >> "$REPORT_FILE" << EOF
        <div class="result fail-result">🚨 <strong>CRITICAL</strong>: Major issues found, DO NOT deploy to production</div>
EOF
fi

cat >> "$REPORT_FILE" << EOF
        
        <h4>💡 Recommendations:</h4>
        <ol>
            <li>Review and fix any missing translations</li>
            <li>Test user interactions and form submissions</li>
            <li>Verify responsive layouts on different devices</li>
            <li>Conduct cross-browser compatibility testing</li>
            <li>Perform accessibility testing</li>
            <li>Get feedback from native Macedonian speakers</li>
        </ol>
    </div>
    
</body>
</html>
EOF

echo "💡 Recommendations:"
echo "1. Review and fix any missing translations"  
echo "2. Test user interactions and form submissions"
echo "3. Verify responsive layouts on different devices"
echo "4. Conduct cross-browser compatibility testing"
echo "5. Perform accessibility testing" 
echo "6. Get feedback from native Macedonian speakers"
echo ""
echo "📄 Detailed HTML report saved to: $REPORT_FILE"
echo "🌐 Open the report in your browser to view detailed results"
EOF