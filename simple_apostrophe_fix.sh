#!/bin/bash

FILE="shared/translations/en.ts"

echo "Simple apostrophe syntax fixes..."

# Only fix the specific lines that are causing errors
sed -i '' \
-e "s/dontHaveAccount: 'Don't have an account yet?',/dontHaveAccount: \"Don't have an account yet?\",/" \
-e "s/stillNeedHelpDescription: 'Can't find what you're looking for\? Our support team is ready to help\.',/stillNeedHelpDescription: \"Can't find what you're looking for? Our support team is ready to help.\",/" \
-e "s/'Respect for other users' privacy'/'Respect for other users\\' privacy'/" \
-e "s/'Bring a valid driver's license, proof of insurance, and any pre-approval financing letters\. If you plan to purchase, bring a cashier's check or financing documents\.'/\"Bring a valid driver's license, proof of insurance, and any pre-approval financing letters. If you plan to purchase, bring a cashier's check or financing documents.\"/" \
-e "s/'Use our free vehicle valuation tool, research similar listings, consider your car's condition, mileage and any recent repairs or improvements\.'/\"Use our free vehicle valuation tool, research similar listings, consider your car's condition, mileage and any recent repairs or improvements.\"/" \
$FILE

echo "Simple apostrophe fixes completed"