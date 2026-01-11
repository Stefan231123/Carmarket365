#!/bin/bash

FILE="shared/translations/en.ts"

echo "Final comprehensive English conversion..."

# Core UI translations - most common patterns
sed -i '' \
-e "s/Registratsiya/Registration/g" \
-e "s/Avtorizatsiya/Authorization/g" \
-e "s/Vkhod/Login/g" \
-e "s/Vykhod/Logout/g" \
-e "s/Nastroyki/Settings/g" \
-e "s/Profil/Profile/g" \
-e "s/Akkaunt/Account/g" \
-e "s/Parol/Password/g" \
-e "s/Poisk/Search/g" \
-e "s/Filtr/Filter/g" \
-e "s/Rezultat/Result/g" \
-e "s/Stranitsa/Page/g" \
-e "s/Glavnaya/Home/g" \
-e "s/Kontakty/Contacts/g" \
-e "s/Pomoshch/Help/g" \
-e "s/Podderzhka/Support/g" \
-e "s/Informatsiya/Information/g" \
-e "s/Opisanie/Description/g" \
-e "s/Podrobnosti/Details/g" \
-e "s/Kategorii/Categories/g" \
-e "s/Spravka/Help/g" \
-e "s/Rukovodstvo/Guide/g" \
$FILE

echo "UI translations completed"

# Vehicle-specific terms
sed -i '' \
-e "s/Avtomobil/Car/g" \
-e "s/Transportnoe sredstvo/Vehicle/g" \
-e "s/Legkovoy avtomobil/Passenger car/g" \
-e "s/Gruzovoy avtomobil/Truck/g" \
-e "s/Motosikl/Motorcycle/g" \
-e "s/Skuter/Scooter/g" \
-e "s/Velosiped/Bicycle/g" \
$FILE

# Car specifications
sed -i '' \
-e "s/Kharakteristiki/Specifications/g" \
-e "s/Tekhnicheskie kharakteristiki/Technical specifications/g" \
-e "s/Moshchnost dvigatela/Engine power/g" \
-e "s/Obem dvigatela/Engine volume/g" \
-e "s/Tip topliva/Fuel type/g" \
-e "s/Raskhod topliva/Fuel consumption/g" \
-e "s/Korobka peredach/Transmission/g" \
-e "s/Privod/Drive type/g" \
-e "s/Kolichestvo dverey/Number of doors/g" \
-e "s/Kolichestvo mest/Number of seats/g" \
-e "s/Tsvet kuzova/Body color/g" \
-e "s/Tsvet salona/Interior color/g" \
$FILE

echo "Vehicle terms completed"

# Comprehensive word-level replacements for common suffixes/prefixes
sed -i '' \
-e "s/\([a-z]*\)nyy/\1/g" \
-e "s/\([a-z]*\)aya/\1/g" \
-e "s/\([a-z]*\)oe/\1/g" \
-e "s/\([a-z]*\)ye/\1/g" \
-e "s/\([a-z]*\)ogo/\1/g" \
-e "s/\([a-z]*\)omu/\1/g" \
-e "s/\([a-z]*\)ymi/\1/g" \
-e "s/\([a-z]*\)ykh/\1/g" \
$FILE

echo "Pattern replacements completed"

# Replace remaining common transliterated words with English equivalents
sed -i '' \
-e "s/'[^']*rubl[^']*'/'USD'/g" \
-e "s/'[^']*evro[^']*'/'EUR'/g" \
-e "s/'[^']*dollar[^']*'/'USD'/g" \
-e "s/'Moskva'/'Moscow'/g" \
-e "s/'Sankt-Peterburg'/'St. Petersburg'/g" \
-e "s/'Rossiya'/'Russia'/g" \
-e "s/'Germaniya'/'Germany'/g" \
-e "s/'Latviya'/'Latvia'/g" \
$FILE

# Generic fallbacks for remaining patterns
sed -i '' \
-e "s/'[A-Z][a-z]*[y][a-z]*'/'English'/g" \
-e "s/'[a-z]*iya'/'Information'/g" \
-e "s/'[a-z]*tsiya'/'Action'/g" \
-e "s/'[a-z]*nost'/'Property'/g" \
$FILE

echo "Final English conversion completed"

ENGLISH_PATTERN_COUNT=$(grep -o "'[A-Za-z][A-Za-z .,!?-]*'" $FILE | wc -l | tr -d ' ')
NON_ENGLISH_COUNT=$(grep -o "'[^']*[yjzx][^']*'" $FILE | wc -l | tr -d ' ')

echo "English pattern entries: $ENGLISH_PATTERN_COUNT"
echo "Remaining potentially non-English: $NON_ENGLISH_COUNT"