#!/bin/bash

# Fix extensive Russian/transliterated terms throughout the file

# Common Russian endings and phrases
sed -i '' 's/Poluchayte obnovleniya o nov funktsiyakh i biznots-vozmozhnostyakh/Get updates about new features and business opportunities/g' en.ts
sed -i '' 's/Familiya required/Last Name Required/g' en.ts
sed -i '' 's/Vy dolzhny prinyat terms i polozheniya/You must accept terms and conditions/g' en.ts
sed -i '' 's/Udalit fotografiyu/Remove Photo/g' en.ts
sed -i '' 's/Home fotografiya/Main Photo/g' en.ts
sed -i '' 's/Imya dlya svyazi/Contact Name/g' en.ts
sed -i '' 's/Zagruzit photos carya/Upload Vehicle Photos/g' en.ts

# Photo upload instructions
sed -i '' 's/Dobavte do 10 vysokokachestvenn fotografiy vashego vehiclea\. Perv fotografiya budet osnovnym izobrazheniem v rezultatakh search\./Add up to 10 high-quality photos of your vehicle. The first photo will be the main image in search results./g' en.ts

# Selected photos
sed -i '' 's/{count} photo{plural} selected/{count} photo{plural} selected/g' en.ts

# Features
sed -i '' 's/Kozhan sideniya/Leather Seats/g' en.ts

# Countries
sed -i '' 's/Severn Makedoniya/North Macedonia/g' en.ts

# Redirect messages
sed -i '' 's/Vy will be redirected na nash sayt {country} dlya better local experience, ili vy can choose another country\./You will be redirected to our {country} site for a better local experience, or you can choose another country./g' en.ts

# Local benefits
sed -i '' 's/Mestn preimushchestva dlya {country}/Local Benefits for {country}/g' en.ts

# Country experience
sed -i '' 's/Kazhdyy sayt strany predlagaet lokalizovan kontent, pricesy i yazykov optsii dlya better experience\./Each country site offers localized content, pricing and language options for a better experience./g' en.ts

# Admin mode
sed -i '' 's/Rezhim administratora\/testirovaniya/Administrator\/Testing Mode/g' en.ts
sed -i '' 's/Rezhim administratora\/testirovaniya - notaccessen dlya clientov/Administrator\/Testing Mode - Not Available for Customers/g' en.ts

# Password reset
sed -i '' 's/Pismo dlya sbrosa parolya otpravleno!/Password reset email sent!/g' en.ts

echo "Extensive Russian terms fixed."