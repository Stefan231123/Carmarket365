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
sed -i '' 's/vehiclen vehiclesa/vehicles/g' shared/translations/en.ts
sed -i '' 's/vehiclen vehicleso/vehicle/g' shared/translations/en.ts
sed -i '' 's/carya/car/g' shared/translations/en.ts
sed -i '' 's/selli/selling/g' shared/translations/en.ts
sed -i '' 's/buye/buying/g' shared/translations/en.ts
sed -i '' 's/viewa/viewing/g' shared/translations/en.ts
sed -i '' 's/pricesa/price/g' shared/translations/en.ts
sed -i '' 's/listings/listings/g' shared/translations/en.ts
sed -i '' 's/verifyeny/verified/g' shared/translations/en.ts
sed -i '' 's/verifyyaem/verify/g' shared/translations/en.ts
sed -i '' 's/verifyyayte/verify/g' shared/translations/en.ts
sed -i '' 's/prodavtsa/seller/g' shared/translations/en.ts
sed -i '' 's/prodavtsov/sellers/g' shared/translations/en.ts
sed -i '' 's/phonotu/phone/g' shared/translations/en.ts
sed -i '' 's/onlayn/online/g' shared/translations/en.ts
sed -i '' 's/chastn/private/g' shared/translations/en.ts
sed -i '' 's/these/data/g' shared/translations/en.ts
sed -i '' 's/mnot/me/g' shared/translations/en.ts

# Fix longer Russian phrases in FAQ and other sections
sed -i '' 's/Da, vse listings na CarMarket365 verifyeny\./Yes, all listings on CarMarket365 are verified./g' shared/translations/en.ts
sed -i '' 's/My provodim verifyku biograficheskikh these all dealers i chastn prodavtsov/We verify the background information of all dealers and private sellers/g' shared/translations/en.ts
sed -i '' 's/a also verifyyaem informatsiyu o vehiclen vehiclesakh na tochnost before razmeshcheniem\./and also verify vehicle information for accuracy before listing./g' shared/translations/en.ts

# Fix test drive related text
sed -i '' 's/Konotchno! Vy can schedule na test drive directly/Of course! You can schedule a test drive directly/g' shared/translations/en.ts
sed -i '' 's/through stranitsu s details carya\./through the vehicle details page./g' shared/translations/en.ts
sed -i '' 's/Svyazhites s seller, to arrange o suitable vremeni i place dlya test drivea\./Contact the seller to arrange a suitable time and place for the test drive./g' shared/translations/en.ts

# Fix pricing and market analysis text  
sed -i '' 's/My provide estimates market value dlya all vehiclen vehicles\./We provide market value estimates for all vehicles./g' shared/translations/en.ts
sed -i '' 's/Vy also can compare similar cari/You can also compare similar cars/g' shared/translations/en.ts
sed -i '' 's/check report ob history vehiclen vehiclesa/check vehicle history reports/g' shared/translations/en.ts
sed -i '' 's/i ispolzovat nashi tools analysis prices\./and use our price analysis tools./g' shared/translations/en.ts

# Fix selling process text
sed -i '' 's/Ispolzuyte formu "Prodat car" dlya sozdaniya listings\./Use the "Sell Car" form to create listings./g' shared/translations/en.ts
sed -i '' 's/Vam ponadobyatsya detali vehiclen vehiclesa, photos/You will need vehicle details, photos/g' shared/translations/en.ts
sed -i '' 's/information o sostoyanii i kontaktn these\./condition information and contact data./g' shared/translations/en.ts
sed -i '' 's/Protsess zanimaet okolo 10-15 minut\./The process takes about 10-15 minutes./g' shared/translations/en.ts

# Fix time and documentation text
sed -i '' 's/Skolko vremeni trebuetsya dlya selli carya?/How long does it take to sell a car?/g' shared/translations/en.ts
sed -i '' 's/Kakie dokumenty mnot nuzhny dlya selli carya?/What documents do I need to sell a car?/g' shared/translations/en.ts

# Fix valuation text
sed -i '' 's/Ispolzuyte nash besplat instrument estimates vehiclen vehicles/Use our free vehicle valuation tool/g' shared/translations/en.ts
sed -i '' 's/izuchite similar listings/study similar listings/g' shared/translations/en.ts
sed -i '' 's/uchtite sostoyanie vashego carya, probeg/consider your car condition, mileage/g' shared/translations/en.ts
sed -i '' 's/i anyoy notdavniy remont ili uluchsheniya\./and any recent repairs or improvements./g' shared/translations/en.ts

# Fix financing text
sed -i '' 's/Zapolnite nashu onlayn-zvku/Complete our online application/g' shared/translations/en.ts
sed -i '' 's/by accessingite mgnovenn previewn approvedie/to get instant pre-approval/g' shared/translations/en.ts
sed -i '' 's/vyberite vashe vehiclen vehicleso/select your vehicle/g' shared/translations/en.ts
sed -i '' 's/i zavershite oformlenie kredita\./and complete the loan process./g' shared/translations/en.ts
sed -i '' 's/Ves protsess mozhno zavershit onlayn ili po phonotu\./The entire process can be completed online or by phone./g' shared/translations/en.ts

# Fix safety text
sed -i '' 's/Kak ostavatsya v safetyi pri buye carya?/How to stay safe when buying a car?/g' shared/translations/en.ts
sed -i '' 's/Vstrechaytes v obshchestvenn mestakh/Meet in public places/g' shared/translations/en.ts
sed -i '' 's/berite s soboy othera/bring someone with you/g' shared/translations/en.ts
sed -i '' 's/tshchatelno osmatrivayte vehiclen vehicleso/carefully inspect the vehicle/g' shared/translations/en.ts
sed -i '' 's/i use secure sposoby oplaty\./and use secure payment methods./g' shared/translations/en.ts
sed -i '' 's/Nikogda not perevodite dengi/Never transfer money/g' shared/translations/en.ts
sed -i '' 's/i not platite do osmotra carya\./and don't pay before inspecting the car./g' shared/translations/en.ts

# Fix vehicle history text
sed -i '' 's/Nadezhny li reporty ob history vehiclen vehiclesa?/Are vehicle history reports reliable?/g' shared/translations/en.ts
sed -i '' 's/Da, my provide kompleksn reporty ob history vehiclen vehicles/Yes, we provide comprehensive vehicle history reports/g' shared/translations/en.ts
sed -i '' 's/iz nadezhn istochnikov\./from reliable sources./g' shared/translations/en.ts
sed -i '' 's/Oni vklyuchayut istoriyu avariy/They include accident history/g' shared/translations/en.ts
sed -i '' 's/zapisi ob obsluzhivanii/service records/g' shared/translations/en.ts
sed -i '' 's/i informatsiyu o rightskh sobstvennotss\./and ownership information./g' shared/translations/en.ts

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

# Fix under construction message
sed -i '' 's/Dann stranitsa nakhoditsya v razrabotke\./This page is under construction./g' shared/translations/en.ts
sed -i '' 's/My userdno rabotaem nad sozdaniem potryasayushchikh funktsiy\./We are working hard to create amazing features./g' shared/translations/en.ts
sed -i '' 's/Pozhaluysta, zaydite pozzhe ili prodolzhite izuchat nashu glavnuyu stranitsu\./Please check back later or continue exploring our main page./g' shared/translations/en.ts
sed -i '' 's/Vernutsya na glavnuyu/Back to Home/g' shared/translations/en.ts
sed -i '' 's/Svyazhites s nami/Contact Us/g' shared/translations/en.ts

echo "Final translation cleanup completed!"
echo "Backup saved as: shared/translations/en_backup_$(date +%Y%m%d_%H%M%S).ts"