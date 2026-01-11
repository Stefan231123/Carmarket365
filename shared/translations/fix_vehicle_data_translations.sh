#!/bin/bash

# Fix vehicle data arrays in staticVehicleData section

# Fix body types
sed -i '' 's/Furgon/Van/g' en.ts
sed -i '' 's/Kompakt/Compact/g' en.ts
sed -i '' 's/Subkompakt/Subcompact/g' en.ts
sed -i '' 's/Srednotrazmer/Mid-size/g' en.ts
sed -i '' 's/Polnorazmer/Full-size/g' en.ts
sed -i '' 's/Sportiv car/Sports Car/g' en.ts
sed -i '' 's/Gibrid/Hybrid/g' en.ts

# Fix fuel types
sed -i '' 's/Gasolinot/Gasoline/g' en.ts
sed -i '' 's/Podklyuchaemyy gibrid/Plug-in Hybrid/g' en.ts
sed -i '' 's/Prirod gaz/Natural Gas/g' en.ts
sed -i '' 's/Propan/Propane/g' en.ts
sed -i '' 's/Gibk toplivo/Flex Fuel/g' en.ts
sed -i '' 's/Vodorod/Hydrogen/g' en.ts
sed -i '' 's/Biodizel/Biodiesel/g' en.ts
sed -i '' 's/Etanol E85/E85 Ethanol/g' en.ts

# Fix transmissions
sed -i '' 's/Mekhanichesk/Manual/g' en.ts
sed -i '' 's/Avtomatichesk/Automatic/g' en.ts
sed -i '' 's/Poluavtomatichesk/Semi-Automatic/g' en.ts
sed -i '' 's/Dvoyn stseplenie/Dual Clutch/g' en.ts
sed -i '' 's/6-stupenchat mekhanichesk/6-Speed Manual/g' en.ts
sed -i '' 's/7-stupenchat avtomatichesk/7-Speed Automatic/g' en.ts
sed -i '' 's/8-stupenchat avtomatichesk/8-Speed Automatic/g' en.ts
sed -i '' 's/9-stupenchat avtomatichesk/9-Speed Automatic/g' en.ts
sed -i '' 's/10-stupenchat avtomatichesk/10-Speed Automatic/g' en.ts

# Fix drivetrains
sed -i '' 's/Peredniy privod/Front-Wheel Drive/g' en.ts
sed -i '' 's/Zadniy privod/Rear-Wheel Drive/g' en.ts
sed -i '' 's/Pol privod/All-Wheel Drive/g' en.ts
sed -i '' 's/Podklyuchaemyy 4WD/Part-Time 4WD/g' en.ts
sed -i '' 's/Postoyan 4WD/Full-Time 4WD/g' en.ts
sed -i '' 's/Elektron pol privod/Electronic All-Wheel Drive/g' en.ts
sed -i '' 's/Mekhanicheskiy pol privod/Mechanical All-Wheel Drive/g' en.ts

# Fix colors
sed -i '' 's/Cher/Black/g' en.ts
sed -i '' 's/Kras/Red/g' en.ts
sed -i '' 's/Zele/Green/g' en.ts
sed -i '' 's/Korichnotvo-zheltyy/Tan/g' en.ts
sed -i '' 's/Med/Copper/g' en.ts
sed -i '' 's/Zhemchuzhno-belyy/Pearl White/g' en.ts
sed -i '' 's/Metallik serebrya/Metallic Silver/g' en.ts
sed -i '' 's/Temno-siniy/Deep Blue/g' en.ts
sed -i '' 's/Gonoch kras/Racing Red/g' en.ts
sed -i '' 's/Lesnoy zele/Forest Green/g' en.ts
sed -i '' 's/Ugol/Charcoal/g' en.ts

# Fix conditions
sed -i '' 's/Kak novyy/Like New/g' en.ts
sed -i '' 's/Otlichn/Excellent/g' en.ts
sed -i '' 's/Ochen khoroshee/Very Good/g' en.ts
sed -i '' 's/Khoroshee/Good/g' en.ts
sed -i '' 's/Udovletvoriteln/Fair/g' en.ts
sed -i '' 's/Poderzhan/Used/g' en.ts
sed -i '' 's/Sertifitsirovan poderzhan/Certified Pre-Owned/g' en.ts
sed -i '' 's/Vosstanovlen/Restored/g' en.ts
sed -i '' 's/Otrestavrirovan/Refurbished/g' en.ts
sed -i '' 's/Vintazh/Vintage/g' en.ts

echo "Vehicle data translations completed."