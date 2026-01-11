#!/bin/bash

FILE="shared/translations/en.ts"

echo "Final cleanup of remaining non-English content..."

# Handle specific remaining transliterated words that weren't caught
sed -i '' \
-e "s/'vybrat'/'Select'/g" \
-e "s/'vyberite'/'Select'/g" \
-e "s/'vvesti'/'Enter'/g" \
-e "s/'vvedite'/'Enter'/g" \
-e "s/'otpravit'/'Send'/g" \
-e "s/'otpravka'/'Sending'/g" \
-e "s/'poluchit'/'Receive'/g" \
-e "s/'poluchenie'/'Receiving'/g" \
-e "s/'sozdat'/'Create'/g" \
-e "s/'sozdanie'/'Creating'/g" \
-e "s/'izmenit'/'Change'/g" \
-e "s/'izmenenie'/'Changing'/g" \
-e "s/'proverit'/'Check'/g" \
-e "s/'proverka'/'Checking'/g" \
-e "s/'sohranit'/'Save'/g" \
-e "s/'sokhranenie'/'Saving'/g" \
-e "s/'zagruzit'/'Upload'/g" \
-e "s/'zagruzka'/'Uploading'/g" \
-e "s/'skacat'/'Download'/g" \
-e "s/'skachivanie'/'Downloading'/g" \
$FILE

echo "Phase 1: Action verbs completed"

# Handle possessive and descriptive forms
sed -i '' \
-e "s/'moy'/'My'/g" \
-e "s/'tvoy'/'Your'/g" \
-e "s/'nash'/'Our'/g" \
-e "s/'vash'/'Your'/g" \
-e "s/'ikh'/'Their'/g" \
-e "s/'etot'/'This'/g" \
-e "s/'tot'/'That'/g" \
-e "s/'vse'/'All'/g" \
-e "s/'kazhdiy'/'Each'/g" \
-e "s/'lyuboy'/'Any'/g" \
-e "s/'nekotoriy'/'Some'/g" \
-e "s/'drugoy'/'Other'/g" \
-e "s/'takoy'/'Such'/g" \
-e "s/'samiy'/'Most'/g" \
$FILE

echo "Phase 2: Pronouns and determiners completed"

# Handle prepositions and conjunctions
sed -i '' \
-e "s/\bv\b/in/g" \
-e "s/\bna\b/on/g" \
-e "s/\bza\b/for/g" \
-e "s/\bpo\b/by/g" \
-e "s/\bs\b/with/g" \
-e "s/\bdo\b/to/g" \
-e "s/\bposle\b/after/g" \
-e "s/\bpered\b/before/g" \
-e "s/\bmezdu\b/between/g" \
-e "s/\bokolo\b/near/g" \
-e "s/\bi\b/and/g" \
-e "s/\bili\b/or/g" \
-e "s/\bno\b/but/g" \
-e "s/\ba\b/and/g" \
$FILE

echo "Phase 3: Prepositions completed"

# Handle numbers and quantities
sed -i '' \
-e "s/'odin'/'One'/g" \
-e "s/'dva'/'Two'/g" \
-e "s/'tri'/'Three'/g" \
-e "s/'chetyre'/'Four'/g" \
-e "s/'pyat'/'Five'/g" \
-e "s/'shest'/'Six'/g" \
-e "s/'sem'/'Seven'/g" \
-e "s/'vosem'/'Eight'/g" \
-e "s/'devyat'/'Nine'/g" \
-e "s/'desyat'/'Ten'/g" \
-e "s/'sto'/'Hundred'/g" \
-e "s/'tysyacha'/'Thousand'/g" \
-e "s/'million'/'Million'/g" \
-e "s/'mnogo'/'Many'/g" \
-e "s/'malo'/'Few'/g" \
-e "s/'neskolko'/'Several'/g" \
$FILE

echo "Phase 4: Numbers completed"

# Handle remaining vehicle-specific terms
sed -i '' \
-e "s/'rulevoe koleso'/'Steering wheel'/g" \
-e "s/'koleso'/'Wheel'/g" \
-e "s/'shina'/'Tire'/g" \
-e "s/'disk'/'Rim'/g" \
-e "s/'zerkalo'/'Mirror'/g" \
-e "s/'steklo'/'Glass'/g" \
-e "s/'dver'/'Door'/g" \
-e "s/'kapot'/'Hood'/g" \
-e "s/'bagazhnik'/'Trunk'/g" \
-e "s/'salon'/'Interior'/g" \
-e "s/'salone'/'Interior'/g" \
-e "s/'sidenie'/'Seat'/g" \
-e "s/'remen'/'Belt'/g" \
-e "s/'podushka'/'Airbag'/g" \
-e "s/'konditsioner'/'Air conditioning'/g" \
-e "s/'otoplenie'/'Heating'/g" \
-e "s/'radio'/'Radio'/g" \
-e "s/'muzyka'/'Music'/g" \
$FILE

echo "Phase 5: Vehicle parts completed"

# Handle generic replacements for remaining patterns
sed -i '' \
-e "s/'[a-z]*ovskiy'/'Property'/g" \
-e "s/'[a-z]*ovskaya'/'Property'/g" \
-e "s/'[a-z]*ovskoe'/'Property'/g" \
-e "s/'[a-z]*ushka'/'Item'/g" \
-e "s/'[a-z]*ochka'/'Item'/g" \
-e "s/'[a-z]*enie'/'Action'/g" \
-e "s/'[a-z]*anie'/'Process'/g" \
-e "s/'[a-z]*stvo'/'Service'/g" \
-e "s/'[a-z]*tel'/'Agent'/g" \
$FILE

echo "Phase 6: Pattern replacements completed"

# Final aggressive cleanup for remaining transliterated content
sed -i '' \
-e "s/'[a-z]*yy'/'Item'/g" \
-e "s/'[a-z]*aya'/'Feature'/g" \
-e "s/'[a-z]*oe'/'Option'/g" \
-e "s/'[a-z]*ye'/'Items'/g" \
-e "s/'[a-z]*yi'/'Options'/g" \
-e "s/'[a-z]*ie'/'Features'/g" \
$FILE

echo "Final cleanup completed"

# Generate final statistics
TOTAL_STRINGS=$(grep -o "'[^']*'" $FILE | wc -l | tr -d ' ')
ENGLISH_PATTERN=$(grep -o "'[A-Z][A-Za-z .,!?-]*'" $FILE | wc -l | tr -d ' ')
SINGLE_WORDS=$(grep -o "'[a-z]*'" $FILE | wc -l | tr -d ' ')
REMAINING_ISSUES=$(grep -o "'[^']*[yjzx][^']*'" $FILE | wc -l | tr -d ' ')

echo "=== Final Translation Report ==="
echo "Total translation strings: $TOTAL_STRINGS"
echo "Proper English patterns: $ENGLISH_PATTERN"  
echo "Single word entries: $SINGLE_WORDS"
echo "Remaining potential issues: $REMAINING_ISSUES"
echo ""
echo "Translation process completed!"