#!/bin/bash

# Final comprehensive translation cleanup for English
# Fix remaining Russian, transliterated text, and grammar issues

echo "Starting final translation cleanup..."

# Backup the current file
cp shared/translations/en.ts shared/translations/en_backup_$(date +%Y%m%d_%H%M%S).ts

# Fix basic Russian/transliterated patterns
sed -i '' 's/Obyazannotss polzovatelya/User Responsibilities/g' shared/translations/en.ts
sed -i '' 's/Chestn opisaniya vehiclen vehicles/Honest vehicle descriptions/g' shared/translations/en.ts
sed -i '' 's/Prava na polzovatelskiy kontent/User content rights/g' shared/translations/en.ts
sed -i '' 's/o mestopolozhenii (pri razreshenii)/about location (if permitted)/g' shared/translations/en.ts
sed -i '' 's/Specifications i optsii/Specifications and Options/g' shared/translations/en.ts

# Fix advanced search specific terms
sed -i '' 's/Advanced Search aktiven/Advanced Search Active/g' shared/translations/en.ts
sed -i '' 's/Price Tsena i mestopolozhenie Location/Price and Location/g' shared/translations/en.ts
sed -i '' 's/Features Funktsii i optsii Options/Features and Options/g' shared/translations/en.ts
sed -i '' 's/Polya detaley carya/Vehicle Details Fields/g' shared/translations/en.ts
sed -i '' 's/Razdely/Sections/g' shared/translations/en.ts

# Fix quick filters section
sed -i '' 's/Bystr filtery/Quick Filters/g' shared/translations/en.ts
sed -i '' 's/Vse vehiclen vehiclesa/All Vehicles/g' shared/translations/en.ts
sed -i '' 's/Gruzoviki/Trucks/g' shared/translations/en.ts
sed -i '' 's/Elektricheskie/Electric/g' shared/translations/en.ts

# Fix stats section  
sed -i '' 's/Pochemu CarMarket365?/Why CarMarket365?/g' shared/translations/en.ts
sed -i '' 's/Dostupn vehiclen vehiclesa/Available Vehicles/g' shared/translations/en.ts
sed -i '' 's/Proverenn dealers/Verified Dealers/g' shared/translations/en.ts
sed -i '' 's/Dovoln clienty/Happy Customers/g' shared/translations/en.ts
sed -i '' 's/Let experience/Years Experience/g' shared/translations/en.ts

# Fix featured listings
sed -i '' 's/Rekomenduem listings/Featured Listings/g' shared/translations/en.ts
sed -i '' 's/Selected vehicles from our partnotrs/Selected vehicles from our partners/g' shared/translations/en.ts

# Fix body types with mixed text
sed -i '' 's/Sredniy razmer/Mid-size/g' shared/translations/en.ts
sed -i '' 's/Pol razmer/Full-size/g' shared/translations/en.ts

# Fix fuel types
sed -i '' 's/E85 Etanol/E85 Ethanol/g' shared/translations/en.ts

# Fix common corrupted words throughout file
sed -i '' 's/vehiclen vehicles/vehicles/g' shared/translations/en.ts
