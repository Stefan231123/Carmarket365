#!/bin/bash

FILE="shared/translations/en.ts"

echo "Fixing apostrophe syntax errors in translations..."

# Fix common contractions and possessives within single quotes
# This needs to be very careful to not break valid syntax

# Fix patterns like 'word's' -> 'word\'s'
sed -i '' \
-e "s/'\\([^']*\\)'s'/'\\1\\'s'/g" \
-e "s/'\\([^']*\\)n't'/'\\1n\\'t'/g" \
-e "s/'\\([^']*\\)'re'/'\\1\\'re'/g" \
-e "s/'\\([^']*\\)'ll'/'\\1\\'ll'/g" \
-e "s/'\\([^']*\\)'ve'/'\\1\\'ve'/g" \
-e "s/'\\([^']*\\)'d'/'\\1\\'d'/g" \
$FILE

echo "Basic apostrophe patterns fixed"

# More specific fixes for common contractions in the middle of strings
sed -i '' \
-e "s/\\([^\\\\]\\)'\\([st]\\) /\\1\\'\\2 /g" \
-e "s/don't/don\\'t/g" \
-e "s/won't/won\\'t/g" \
-e "s/can't/can\\'t/g" \
-e "s/shouldn't/shouldn\\'t/g" \
-e "s/wouldn't/wouldn\\'t/g" \
-e "s/couldn't/couldn\\'t/g" \
-e "s/haven't/haven\\'t/g" \
-e "s/hasn't/hasn\\'t/g" \
-e "s/isn't/isn\\'t/g" \
-e "s/aren't/aren\\'t/g" \
-e "s/doesn't/doesn\\'t/g" \
-e "s/wasn't/wasn\\'t/g" \
-e "s/weren't/weren\\'t/g" \
$FILE

echo "Contraction patterns fixed"

# Fix possessives
sed -i '' \
-e "s/users' /users\\' /g" \
-e "s/driver's /driver\\'s /g" \
-e "s/seller's /seller\\'s /g" \
-e "s/buyer's /buyer\\'s /g" \
-e "s/owner's /owner\\'s /g" \
-e "s/vehicle's /vehicle\\'s /g" \
-e "s/dealer's /dealer\\'s /g" \
-e "s/company's /company\\'s /g" \
$FILE

echo "Possessive patterns fixed"

echo "Apostrophe syntax fix completed"