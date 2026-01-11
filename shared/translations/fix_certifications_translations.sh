#!/bin/bash

# Fix certifications array translations

sed -i '' 's/Sertifitsirovan poderzhan/Certified Pre-Owned/g' en.ts
sed -i '' 's/Garantiya proizvoditelya/Manufacturer Warranty/g' en.ts
sed -i '' 's/Rasshirenn garantiya/Extended Warranty/g' en.ts
sed -i '' 's/Tekhhelp na doroge/Roadside Assistance/g' en.ts
sed -i '' 's/Otchet ob history carya/Vehicle History Report/g' en.ts
sed -i '' 's/Mntochechn verifyka/Multi-Point Inspection/g' en.ts
sed -i '' 's/Proverka vybrosov/Emissions Test/g' en.ts
sed -i '' 's/Proverka safetyi/Safety Inspection/g' en.ts
sed -i '' 's/Sertifitsirovano dealerom/Dealer Certified/g' en.ts
sed -i '' 's/Sertifitsirovano tretey storonoy/Third Party Certified/g' en.ts
sed -i '' 's/Provereno Carfax/Carfax Verified/g' en.ts
sed -i '' 's/Provereno AutoCheck/AutoCheck Verified/g' en.ts
sed -i '' 's/Bez avariy/No Accidents/g' en.ts
sed -i '' 's/Odin vladelets/One Owner/g' en.ts
sed -i '' 's/Dostupny servisn zapisi/Service Records Available/g' en.ts
sed -i '' 's/Obsluzhivanie aktualno/Maintenance Up to Date/g' en.ts

echo "Certifications translations completed."