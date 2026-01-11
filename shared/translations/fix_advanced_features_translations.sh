#!/bin/bash

# Fix the second advancedSearch section in advancedFeatures

# Main titles
sed -i '' 's/Rasshiren poisk/Advanced Search/g' en.ts
sed -i '' 's/Rasshiren poisk aktiven/Advanced Search Active/g' en.ts
sed -i '' 's/Ochistit vse/Clear All/g' en.ts
sed -i '' 's/Iskat cari/Search Cars/g' en.ts

# Section titles
sed -i '' 's/Detali carya/Vehicle Details/g' en.ts
sed -i '' 's/Tsena i mestopolozhenie/Price & Location/g' en.ts
sed -i '' 's/Funktsii i optsii/Features & Options/g' en.ts

# Field names
sed -i '' 's/God ot/Year From/g' en.ts
sed -i '' 's/God do/Year To/g' en.ts
sed -i '' 's/Min\. pricesa/Min Price/g' en.ts
sed -i '' 's/Maks\. pricesa/Max Price/g' en.ts
sed -i '' 's/Maks\. probeg/Max Mileage/g' en.ts
sed -i '' 's/Tip kuzova/Body Type/g' en.ts
sed -i '' 's/Vnotshniy tsvet/Exterior Color/g' en.ts
sed -i '' 's/Vnutrenniy tsvet/Interior Color/g' en.ts
sed -i '' 's/Tip prodavtsa/Seller Type/g' en.ts

# Placeholders
sed -i '' 's/Lyub marka/Any Make/g' en.ts
sed -i '' 's/Lyub model/Any Model/g' en.ts
sed -i '' 's/Lyuboy god/Any Year/g' en.ts
sed -i '' 's/Lyub pricesa/Any Price/g' en.ts
sed -i '' 's/Lyuboy probeg/Any Mileage/g' en.ts
sed -i '' 's/Lyub toplivo/Any Fuel/g' en.ts
sed -i '' 's/Lyub korobka/Any Transmission/g' en.ts
sed -i '' 's/Lyuboy kuzov/Any Body Type/g' en.ts
sed -i '' 's/Lyuboy privod/Any Drivetrain/g' en.ts
sed -i '' 's/Lyuboy tsvet/Any Color/g' en.ts
sed -i '' 's/Gorod, oblast ili indeks/City, State or ZIP/g' en.ts
sed -i '' 's/Lyub rasstoyanie/Any Distance/g' en.ts
sed -i '' 's/Lyuboy seller/Any Seller/g' en.ts

# Options
sed -i '' 's/Svyshe 100 000 km/Over 100,000 km/g' en.ts
sed -i '' 's/Po vsey stranot/Nationwide/g' en.ts
sed -i '' 's/Chast seller/Private Seller/g' en.ts
sed -i '' 's/Oba/Both/g' en.ts

# Features with mixed content
sed -i '' 's/Bluetooth-svyaz/Bluetooth Connectivity/g' en.ts

echo "Advanced features section translations completed."