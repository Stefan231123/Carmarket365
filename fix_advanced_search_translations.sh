#!/bin/bash

echo "Fixing advanced search translations - adding missing keys and cleaning up corrupted text..."

# First, let's fix the corrupted section titles
sed -i '' 's/Features Funktsii i Oborudovanie Equipment/Features & Equipment/g' shared/translations/en.ts
sed -i '' 's/Preferences Predpochteniya i Certifications Certifications/Preferences & Certifications/g' shared/translations/en.ts
sed -i '' 's/Price Tsena i Mestopolozhenie Location/Price & Location/g' shared/translations/en.ts
sed -i '' 's/Features Funktsii i Optsii Options/Features & Options/g' shared/translations/en.ts

# Fix corrupted conditions in staticVehicleData
sed -i '' 's/Spravedliv/Fair/g' shared/translations/en.ts
sed -i '' 's/Sertifitsirovan b\/u/Certified Pre-Owned/g' shared/translations/en.ts

# Fix corrupted drivetrains
sed -i '' 's/Chastich 4WD/Part-Time 4WD/g' shared/translations/en.ts
sed -i '' 's/Manualiy pol privod/Manual All-Wheel Drive/g' shared/translations/en.ts

# Fix corrupted features
sed -i '' 's/Parkovochn sensory/Parking Sensors/g' shared/translations/en.ts
sed -i '' 's/Obogrev sideniy/Heated Seats/g' shared/translations/en.ts
sed -i '' 's/Sistema kursovoy ustoychivosti/Electronic Stability Control/g' shared/translations/en.ts
sed -i '' 's/CD proigryvatel/CD Player/g' shared/translations/en.ts
sed -i '' 's/MP3 proigryvatel/MP3 Player/g' shared/translations/en.ts
sed -i '' 's/DVD proigryvatel/DVD Player/g' shared/translations/en.ts
sed -i '' 's/Preduprezhdenie o smenot polosy/Lane Change Warning/g' shared/translations/en.ts
sed -i '' 's/Monitoring slep zon/Blind Spot Monitoring/g' shared/translations/en.ts
sed -i '' 's/Preduprezhdenie o lobovom stolknovenii/Forward Collision Warning/g' shared/translations/en.ts
sed -i '' 's/Automatic ekstrenn tormozhenie/Automatic Emergency Braking/g' shared/translations/en.ts
sed -i '' 's/Helpnik parkovki/Parking Assist/g' shared/translations/en.ts
sed -i '' 's/Obogrev rulya/Heated Steering Wheel/g' shared/translations/en.ts
sed -i '' 's/Okhlazhdaem sidenya/Cooled Seats/g' shared/translations/en.ts
sed -i '' 's/Ventiliruem sidenya/Ventilated Seats/g' shared/translations/en.ts
sed -i '' 's/Sidenya tretego ryada/Third Row Seating/g' shared/translations/en.ts
sed -i '' 's/Skladyvayushchiesya zadnie sidenya/Folding Rear Seats/g' shared/translations/en.ts
sed -i '' 's/Pritsepn ustroystvo/Towing Package/g' shared/translations/en.ts
sed -i '' 's/Bokov podnozhki/Side Steps/g' shared/translations/en.ts
sed -i '' 's/Bokov stupeni/Running Boards/g' shared/translations/en.ts

# Fix corrupted certifications
sed -i '' 's/Sertifitsirovan b\/u/Certified Pre-Owned/g' shared/translations/en.ts

# Fix feature names in features section
sed -i '' 's/Zapusk knopkoy/Push Button Start/g' shared/translations/en.ts
sed -i '' 's/lanotKeepAssist/Lane Keep Assist/g' shared/translations/en.ts
sed -i '' 's/Help uderzhaniya v polose/Lane Keep Assist/g' shared/translations/en.ts

# Fix Russian comments
sed -i '' 's/\/\/ Optsii/\/\/ Options/g' shared/translations/en.ts
sed -i '' 's/\/\/ Zapolniteli/\/\/ Placeholders/g' shared/translations/en.ts

echo "Advanced search translations cleaned up!"