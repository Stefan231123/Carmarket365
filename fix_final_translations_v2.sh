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
sed -i '' 's/Specifications i optsii/Specifications and Options/g' shared/translations/en.ts

# Fix advanced search specific terms
sed -i '' 's/Advanced Search aktiven/Advanced Search Active/g' shared/translations/en.ts
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

# Fix common corrupted words throughout file
sed -i '' 's/vehiclen vehicles/vehicles/g' shared/translations/en.ts
sed -i '' 's/vehiclen vehiclesa/vehicles/g' shared/translations/en.ts
sed -i '' 's/vehiclen vehicleso/vehicle/g' shared/translations/en.ts
sed -i '' 's/carya/car/g' shared/translations/en.ts
sed -i '' 's/selli/selling/g' shared/translations/en.ts
sed -i '' 's/buye/buying/g' shared/translations/en.ts
sed -i '' 's/viewa/viewing/g' shared/translations/en.ts
sed -i '' 's/pricesa/price/g' shared/translations/en.ts
sed -i '' 's/verifyeny/verified/g' shared/translations/en.ts
sed -i '' 's/verifyyaem/verify/g' shared/translations/en.ts
sed -i '' 's/verifyyayte/verify/g' shared/translations/en.ts
sed -i '' 's/prodavtsa/seller/g' shared/translations/en.ts
sed -i '' 's/prodavtsov/sellers/g' shared/translations/en.ts
sed -i '' 's/phonotu/phone/g' shared/translations/en.ts
sed -i '' 's/onlayn/online/g' shared/translations/en.ts
sed -i '' 's/chastn/private/g' shared/translations/en.ts
sed -i '' 's/mnot/me/g' shared/translations/en.ts

# Fix notification settings text
sed -i '' 's/Uspeshno podpisan!/Successfully subscribed!/g' shared/translations/en.ts
sed -i '' 's/Kontaktn soobshchenie otpravleno!/Contact message sent!/g' shared/translations/en.ts
sed -i '' 's/Dobavleno v izbrann!/Added to favorites!/g' shared/translations/en.ts
sed -i '' 's/Udaleno iz izbrann!/Removed from favorites!/g' shared/translations/en.ts

# Fix admin panel text
sed -i '' 's/Panotl administratora/Administrator Panel/g' shared/translations/en.ts
sed -i '' 's/Panotl upravleniya administratora/Administrator Dashboard/g' shared/translations/en.ts

# Fix page titles
sed -i '' 's/Tsentr support/Support Center/g' shared/translations/en.ts
sed -i '' 's/Obratn svyaz/Feedback/g' shared/translations/en.ts
sed -i '' 's/Otkaz ot otvetstvennotss/Disclaimer/g' shared/translations/en.ts
sed -i '' 's/Avtostrakhovanie/Car Insurance/g' shared/translations/en.ts
sed -i '' 's/V razrabotke/Under Construction/g' shared/translations/en.ts
sed -i '' 's/Vernutsya na glavnuyu/Back to Home/g' shared/translations/en.ts
sed -i '' 's/Svyazhites s nami/Contact Us/g' shared/translations/en.ts

echo "Final translation cleanup completed!"
echo "Backup created successfully"