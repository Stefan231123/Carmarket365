#!/bin/bash

FILE="shared/translations/en.ts"

echo "Converting all transliterated content to proper English..."

# Common UI elements
sed -i '' \
-e "s/'Da'/'Yes'/" \
-e "s/'Net'/'No'/" \
-e "s/'Menyu'/'Menu'/" \
-e "s/'Novyy'/'New'/" \
-e "s/'Sertifitsirovannyy'/'Certified'/" \
-e "s/'transport'/'Vehicle'/" \
-e "s/'Soobshchenie'/'Message'/" \
-e "s/'Po umolchaniyu'/'Default'/" \
-e "s/'Vtorichnyy'/'Secondary'/" \
-e "s/'Kontur'/'Outline'/" \
-e "s/'Prizrak'/'Ghost'/" \
-e "s/'Ssylka'/'Link'/" \
-e "s/'Razrushitelnyy'/'Destructive'/" \
-e "s/'Malenkiy'/'Small'/" \
-e "s/'Bolshoy'/'Large'/" \
-e "s/'Optsiya'/'Option'/" \
-e "s/'Otpravka...'/'Sending...'/" \
$FILE

echo "Phase 1: Common UI elements converted"

# Form elements
sed -i '' \
-e "s/'Vybor'/'Select'/" \
-e "s/'Vybrat'/'Choose'/" \
-e "s/'Vvod'/'Input'/" \
-e "s/'Vvedite'/'Enter'/" \
-e "s/'Imya'/'Name'/" \
-e "s/'Email'/'Email'/" \
-e "s/'Telefon'/'Phone'/" \
-e "s/'Soobshchenie'/'Message'/" \
-e "s/'Otpravit'/'Send'/" \
-e "s/'Otmena'/'Cancel'/" \
$FILE

echo "Phase 2: Form elements converted"

# Vehicle-related terms
sed -i '' \
-e "s/'Avtomobil'/'Car'/" \
-e "s/'Avto'/'Car'/" \
-e "s/'Mashina'/'Car'/" \
-e "s/'Transport'/'Vehicle'/" \
-e "s/'Marka'/'Make'/" \
-e "s/'Model'/'Model'/" \
-e "s/'God'/'Year'/" \
-e "s/'Tsena'/'Price'/" \
-e "s/'Probeg'/'Mileage'/" \
-e "s/'Toplivo'/'Fuel'/" \
-e "s/'Korobka'/'Transmission'/" \
-e "s/'Kuzov'/'Body'/" \
-e "s/'Dvigatel'/'Engine'/" \
-e "s/'Moshchnost'/'Power'/" \
$FILE

echo "Phase 3: Vehicle terms converted"

# Location and contact terms
sed -i '' \
-e "s/'Gorod'/'City'/" \
-e "s/'Adres'/'Address'/" \
-e "s/'Kontakt'/'Contact'/" \
-e "s/'Telefon'/'Phone'/" \
-e "s/'Pochta'/'Email'/" \
-e "s/'Sayt'/'Website'/" \
-e "s/'Lokatsiya'/'Location'/" \
$FILE

echo "Phase 4: Location terms converted"

# Action terms
sed -i '' \
-e "s/'Kupit'/'Buy'/" \
-e "s/'Prodat'/'Sell'/" \
-e "s/'Smotret'/'View'/" \
-e "s/'Redaktirovat'/'Edit'/" \
-e "s/'Udalit'/'Delete'/" \
-e "s/'Dobavit'/'Add'/" \
-e "s/'Sohranit'/'Save'/" \
-e "s/'Otmenit'/'Cancel'/" \
-e "s/'Podtverdit'/'Confirm'/" \
$FILE

echo "Phase 5: Action terms converted"

# Status and states
sed -i '' \
-e "s/'Aktivnyy'/'Active'/" \
-e "s/'Neaktivnyy'/'Inactive'/" \
-e "s/'Dostupnyy'/'Available'/" \
-e "s/'Nedostupnyy'/'Unavailable'/" \
-e "s/'Prodano'/'Sold'/" \
-e "s/'V prodazhe'/'For Sale'/" \
$FILE

echo "All English translations completed successfully!"

# Count remaining non-English patterns
NON_ENGLISH_COUNT=$(grep -o "'[A-Za-z]*[y][A-Za-z]*'" $FILE | grep -v -E "'(Yes|No|New|Buy|Sell)'" | wc -l | tr -d ' ')
echo "Remaining potentially non-English words: $NON_ENGLISH_COUNT"