#!/bin/bash

# CarMarket365 Translation Review Environment Setup Script
# This script sets up the secure proofreading environment

echo "🔐 CarMarket365 Translation Review Environment Setup"
echo "=================================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up environment variables..."
cat > .env.review << EOF
# CarMarket365 Review Environment Configuration
VITE_REVIEW_MODE=true
VITE_REVIEW_BASE_URL=http://localhost:8083
VITE_REVIEW_SESSION_TIMEOUT=7200000
VITE_REVIEW_MAX_FEEDBACK=200
VITE_ENVIRONMENT=review
EOF

echo "🌐 Starting development server with review mode..."
echo "   Access URL: http://localhost:8083"
echo "   Review URL: http://localhost:8083/translation-review"
echo ""
echo "🔑 Demo Access Tokens:"
echo "   Master Token: CARMARKET365_REVIEW_2024"
echo "   Macedonian:   MK_REVIEWER_2024"
echo "   Albanian:     SQ_REVIEWER_2024"
echo "   Slovenian:    SL_REVIEWER_2024"
echo "   Russian:      RU_REVIEWER_2024"
echo "   Latvian:      LV_REVIEWER_2024"
echo ""
echo "📋 For complete instructions, see: TRANSLATION_REVIEW_GUIDE.md"
echo ""
echo "🚀 Starting server..."

# Start the development server
npm run dev