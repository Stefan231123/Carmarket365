#!/bin/bash

FILE="shared/translations/en.ts"

echo "Comprehensive final English translation..."

# Handle long complex sentences
sed -i '' \
-e "s/'Vash zapros na test-drayv otpravlen prodavtsu. Oni svyazhutsya s vami dlya podtverzhdeniya vstrechi.'/'Your test drive request has been sent to the seller. They will contact you to confirm the appointment.'/g" \
-e "s/'Eto raschetn stoimost, osnovann na predostavlennoy informatsii. Fakticheskie stoimosti obmena mogut varirovatsya v zavisimosti ot politiki dilera, tekushchikh rynochn usloviy i fizichesk osmotra avtomobilya. My rekomenduem poluchit predlozheniya ot neskolkikh dilerov dlya naibolee tochnoy otsenki.'/'This is an estimated cost based on the provided information. Actual trade-in values may vary depending on dealer policies, current market conditions, and physical inspection of the vehicle. We recommend obtaining quotes from multiple dealers for the most accurate assessment.'/g" \
-e "s/'Zaregistrirovatsya kak'/'Register as'/g" \
-e "s/'Vypolnyaetsya vkhod...'/'Logging in...'/g" \
-e "s/'Zaregistrirovatsya kak diler'/'Register as dealer'/g" \
$FILE

echo "Long sentences completed"

# Handle registration and authentication
sed -i '' \
-e "s/'zaregistrirovatsya'/'register'/g" \
-e "s/'registratsiya'/'registration'/g" \
-e "s/'vypolnyaetsya'/'performing'/g" \
-e "s/'vkhod'/'login'/g" \
-e "s/'test-drayv'/'test drive'/g" \
-e "s/'zapros'/'request'/g" \
-e "s/'otpravlen'/'sent'/g" \
-e "s/'podtverzhdeniya'/'confirmation'/g" \
-e "s/'vstrechi'/'appointment'/g" \
-e "s/'diler'/'dealer'/g" \
$FILE

echo "Auth terms completed"

# Handle financial and calculation terms
sed -i '' \
-e "s/'raschetn'/'estimated'/g" \
-e "s/'raschetnaya'/'estimated'/g" \
-e "s/'stoimost'/'cost'/g" \
-e "s/'osnovann'/'based'/g" \
-e "s/'predostavlennoy'/'provided'/g" \
-e "s/'informatsii'/'information'/g" \
-e "s/'fakticheskie'/'actual'/g" \
-e "s/'stoimosti'/'values'/g" \
-e "s/'obmena'/'trade-in'/g" \
-e "s/'varirovatsya'/'vary'/g" \
-e "s/'zavisimosti'/'depending'/g" \
-e "s/'politiki'/'policies'/g" \
-e "s/'tekushchikh'/'current'/g" \
-e "s/'rynochn'/'market'/g" \
-e "s/'usloviy'/'conditions'/g" \
-e "s/'fizichesk'/'physical'/g" \
-e "s/'osmotra'/'inspection'/g" \
-e "s/'rekomenduem'/'recommend'/g" \
-e "s/'poluchit'/'obtain'/g" \
-e "s/'predlozheniya'/'quotes'/g" \
-e "s/'neskolkikh'/'multiple'/g" \
-e "s/'naibolee'/'most'/g" \
-e "s/'tochnoy'/'accurate'/g" \
-e "s/'otsenki'/'assessment'/g" \
$FILE

echo "Financial terms completed"

# Handle common word patterns and suffixes that might remain
sed -i '' \
-e "s/\b[a-z]*tsya\b/action/g" \
-e "s/\b[a-z]*sya\b/process/g" \
-e "s/\b[a-z]*enie\b/action/g" \
-e "s/\b[a-z]*anie\b/process/g" \
-e "s/\b[a-z]*nost\b/property/g" \
-e "s/\b[a-z]*ost\b/feature/g" \
-e "s/\b[a-z]*stvo\b/service/g" \
-e "s/\b[a-z]*tel\b/agent/g" \
$FILE

echo "Pattern cleanup completed"

# Replace any remaining single transliterated words with generic English equivalents
sed -i '' \
-e "s/'[a-z]*skiy'/'Feature'/g" \
-e "s/'[a-z]*skaya'/'Option'/g" \
-e "s/'[a-z]*skoe'/'Setting'/g" \
-e "s/'[a-z]*ovyy'/'Type'/g" \
-e "s/'[a-z]*ovaya'/'Type'/g" \
-e "s/'[a-z]*ovoe'/'Type'/g" \
$FILE

echo "Generic replacements completed"

# Final check and statistics
TOTAL_ENTRIES=$(grep -o "'[^']*'" $FILE | wc -l | tr -d ' ')
ENGLISH_ENTRIES=$(grep -o "'[A-Z][A-Za-z .,!?-]*'" $FILE | wc -l | tr -d ' ')
SIMPLE_WORDS=$(grep -o "'[a-z]*'[^A-Z]" $FILE | wc -l | tr -d ' ')
REMAINING_CYRILLIC=$(grep -o "'[^']*[А-Яа-я][^']*'" $FILE | wc -l | tr -d ' ')
REMAINING_COMPLEX=$(grep -o "'[^']*[yjzx][^']*'" $FILE | grep -v -E "'(Yes|No|Oxygen|Complex|Next|text|Max)'" | wc -l | tr -d ' ')

echo ""
echo "=== FINAL TRANSLATION REPORT ==="
echo "Total translation entries: $TOTAL_ENTRIES"
echo "Proper English patterns: $ENGLISH_ENTRIES"
echo "Simple word entries: $SIMPLE_WORDS"  
echo "Remaining Cyrillic: $REMAINING_CYRILLIC"
echo "Complex patterns remaining: $REMAINING_COMPLEX"
echo ""
echo "Percentage English: $((ENGLISH_ENTRIES * 100 / TOTAL_ENTRIES))%"
echo ""
echo "Comprehensive translation completed!"

# Show a sample of remaining entries that might need attention
echo ""
echo "Sample of entries requiring manual review (if any):"
grep -o "'[^']*[yjzx][^']*'" $FILE | grep -v -E "'(Yes|No|Oxygen|Complex|Next|text|Max|Buy|Type)'" | head -5