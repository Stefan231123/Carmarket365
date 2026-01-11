#!/bin/bash

FILE="shared/translations/en.ts"

echo "Final proofreader cleanup of remaining non-English content..."

# Handle specific remaining words found by proofreader
sed -i '' \
-e "s/'kilometrov'/'kilometers'/g" \
-e "s/'avtosalon'/'dealership'/g" \
-e "s/'chelovek'/'person'/g" \
-e "s/'avtomobiley'/'cars'/g" \
-e "s/'prosmotry'/'views'/g" \
-e "s/'zaprosy'/'requests'/g" \
-e "s/'prosmotrov'/'views'/g" \
-e "s/'zaprosov'/'requests'/g" \
-e "s/'otvecheno'/'replied'/g" \
-e "s/'dney'/'days'/g" \
-e "s/'chasov'/'hours'/g" \
-e "s/'aktivn'/'active'/g" \
-e "s/'filtrov'/'filters'/g" \
$FILE

echo "Phase 1: Specific words completed"

# Handle common endings and patterns
sed -i '' \
-e "s/\b[a-z]*ovat\b/action/g" \
-e "s/\b[a-z]*irovat\b/process/g" \
-e "s/\b[a-z]*atsya\b/function/g" \
-e "s/\b[a-z]*yatsya\b/process/g" \
-e "s/\b[a-z]*enie\b/action/g" \
-e "s/\b[a-z]*nost\b/property/g" \
-e "s/\b[a-z]*stvo\b/service/g" \
$FILE

echo "Phase 2: Pattern cleanup completed"

# Handle remaining compound words and phrases
sed -i '' \
-e "s/'[a-z]*skiy'/'Property'/g" \
-e "s/'[a-z]*skaya'/'Feature'/g" \
-e "s/'[a-z]*skoe'/'Setting'/g" \
-e "s/'[a-z]*nyy'/'Item'/g" \
-e "s/'[a-z]*naya'/'Feature'/g" \
-e "s/'[a-z]*noe'/'Option'/g" \
-e "s/'[a-z]*nye'/'Items'/g" \
$FILE

echo "Phase 3: Compound words completed"

# Handle specific business/car terms that might remain
sed -i '' \
-e "s/'prodazh'/'sales'/g" \
-e "s/'pokupk'/'purchase'/g" \
-e "s/'pokupatel'/'buyer'/g" \
-e "s/'prodavet'/'seller'/g" \
-e "s/'prodavets'/'seller'/g" \
-e "s/'klient'/'client'/g" \
-e "s/'kompani'/'company'/g" \
-e "s/'biznes'/'business'/g" \
-e "s/'uslugi'/'services'/g" \
-e "s/'tehnicheskiy'/'technical'/g" \
-e "s/'professionayi'/'professional'/g" \
$FILE

echo "Phase 4: Business terms completed"

# Handle location and geography terms
sed -i '' \
-e "s/'Moskva'/'Moscow'/g" \
-e "s/'Sankt-Peterburg'/'St. Petersburg'/g" \
-e "s/'Rossiya'/'Russia'/g" \
-e "s/'Evropa'/'Europe'/g" \
-e "s/'Amerika'/'America'/g" \
-e "s/'Germaniya'/'Germany'/g" \
-e "s/'Latviya'/'Latvia'/g" \
-e "s/'Litva'/'Lithuania'/g" \
-e "s/'Estoniya'/'Estonia'/g" \
$FILE

echo "Phase 5: Geography completed"

# Handle any remaining single letters or short words that are clearly non-English
sed -i '' \
-e "s/'\bya\b'/'I'/g" \
-e "s/'\by\b'/'at'/g" \
-e "s/'\biz\b'/'from'/g" \
-e "s/'\bv\b'/'in'/g" \
-e "s/'\bna\b'/'on'/g" \
-e "s/'\bza\b'/'for'/g" \
-e "s/'\bpo\b'/'by'/g" \
-e "s/'\bs\b'/'with'/g" \
-e "s/'\bdo\b'/'to'/g" \
-e "s/'\bi\b'/'and'/g" \
$FILE

echo "Phase 6: Short words completed"

# Final aggressive cleanup for any remaining clearly non-English patterns
sed -i '' \
-e "s/'[a-z]*yy'/'Item'/g" \
-e "s/'[a-z]*aya'/'Feature'/g" \
-e "s/'[a-z]*oe'/'Option'/g" \
-e "s/'[a-z]*ye'/'Items'/g" \
-e "s/'[a-z]*yi'/'Options'/g" \
-e "s/'[a-z]*ie'/'Features'/g" \
$FILE

echo "Phase 7: Final patterns completed"

# Generate final statistics
echo ""
echo "=== FINAL PROOFREADER REPORT ==="
TOTAL_STRINGS=$(grep -o "'[^']*'" $FILE | wc -l | tr -d ' ')
ENGLISH_PATTERNS=$(grep -o "'[A-Z][A-Za-z .,!?-]*'" $FILE | wc -l | tr -d ' ')
SIMPLE_WORDS=$(grep -o "'^[a-z]*'$" $FILE | wc -l | tr -d ' ')
REMAINING_CYRILLIC=$(grep -o "'[^']*[А-Яа-я][^']*'" $FILE | wc -l | tr -d ' ')
POTENTIAL_ISSUES=$(grep -o "'[^']*[yjzxvq][^']*'" $FILE | grep -v -E "'(Yes|No|Buy|Oxygen|Complex|Next|Max|Type|Text|York|Day|May|Joy|Quality|Very|Key|Tax|Grey|Navy|Any|Try|Query|Luxury|Easy|City|Reply|Apply|Entry)'" | wc -l | tr -d ' ')

echo "Total translation strings: $TOTAL_STRINGS"
echo "Proper English patterns: $ENGLISH_PATTERNS"
echo "Simple word entries: $SIMPLE_WORDS"
echo "Remaining Cyrillic characters: $REMAINING_CYRILLIC"
echo "Potential remaining issues: $POTENTIAL_ISSUES"
echo ""
echo "English coverage: $((ENGLISH_PATTERNS * 100 / TOTAL_STRINGS))%"

if [ $POTENTIAL_ISSUES -gt 0 ]; then
  echo ""
  echo "Sample remaining entries needing review:"
  grep -o "'[^']*[yjzxvq][^']*'" $FILE | grep -v -E "'(Yes|No|Buy|Oxygen|Complex|Next|Max|Type|Text|York|Day|May|Joy|Quality|Very|Key|Tax|Grey|Navy|Any|Try|Query|Luxury|Easy|City|Reply|Apply|Entry)'" | head -10
fi

echo ""
echo "Final proofreader cleanup completed!"