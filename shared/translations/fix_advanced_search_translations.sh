#!/bin/bash

# Comprehensive script to translate advanced search from Russian to English

# Main titles and labels
sed -i '' 's/Rasshiren Search Carey/Advanced Search/g' en.ts
sed -i '' 's/Naydite your ideal car s podrobn filtrami search i predpochteniyami/Find your ideal car with detailed search filters and preferences/g' en.ts
sed -i '' 's/Vernutsya na Glavnuyu/Back to Home/g' en.ts
sed -i '' 's/Search Carey/Search Cars/g' en.ts
sed -i '' 's/Sokhranit Search/Save Search/g' en.ts
sed -i '' 's/filtr/filter/g' en.ts

# Sections
sed -i '' 's/Osnovn Information/Basic Information/g' en.ts
sed -i '' 's/Ustanovite osnovn kriterii search/Set basic search criteria/g' en.ts
sed -i '' 's/Tekhnicheskie Specifications/Technical Specifications/g' en.ts
sed -i '' 's/Dvigatel, korobka beforeach i detali proizvoditelnotss/Engine, transmission and performance details/g' en.ts
sed -i '' 's/Funktsii i Oborudovanie/Features & Equipment/g' en.ts
sed -i '' 's/Vyberite zhelaem funktsii i oborudovanie/Select desired features and equipment/g' en.ts
sed -i '' 's/Predpochteniya i Sertifikatsii/Preferences & Certifications/g' en.ts
sed -i '' 's/Dopolniteln predpochteniya i certificatesii/Additional preferences and certifications/g' en.ts
sed -i '' 's/Detali Carya/Vehicle Details/g' en.ts
sed -i '' 's/Tsena i Mestopolozhenie/Price & Location/g' en.ts
sed -i '' 's/Funktsii i Optsii/Features & Options/g' en.ts
sed -i '' 's/Vyberite funktsii, kotor vazhny dlya vas/Select features that are important to you/g' en.ts

# Form fields
sed -i '' 's/Tip Kuzova/Body Type/g' en.ts
sed -i '' 's/Tip Topliva/Fuel Type/g' en.ts
sed -i '' 's/Korobka Peredach/Transmission/g' en.ts
sed -i '' 's/Dveri/Doors/g' en.ts
sed -i '' 's/Mesta/Seats/g' en.ts
sed -i '' 's/Vnotshniy Tsvet/Exterior Color/g' en.ts
sed -i '' 's/Tsvet Salona/Interior Color/g' en.ts
sed -i '' 's/Tsvetov Predpochteniya/Color Preference/g' en.ts
sed -i '' 's/Sertifikatsii/Certifications/g' en.ts
sed -i '' 's/Radius search/Search Radius/g' en.ts
sed -i '' 's/Tip Prodavtsa/Seller Type/g' en.ts
sed -i '' 's/Min\. God/Min Year/g' en.ts
sed -i '' 's/Maks\. God/Max Year/g' en.ts
sed -i '' 's/Maksimal Probeg/Max Mileage/g' en.ts

# Placeholders
sed -i '' 's/Vyberite marku/Select Make/g' en.ts
sed -i '' 's/Vvedite nazvanie model/Enter Model Name/g' en.ts
sed -i '' 's/Lyub Marka/Any Make/g' en.ts
sed -i '' 's/Lyub Model/Any Model/g' en.ts
sed -i '' 's/Lyuboy Tip/Any Type/g' en.ts
sed -i '' 's/Vyberite tip kuzova/Select Body Type/g' en.ts
sed -i '' 's/Vyberite sostoyanie/Select Condition/g' en.ts
sed -i '' 's/Vyberite tip topliva/Select Fuel Type/g' en.ts
sed -i '' 's/Vyberite korobku beforeach/Select Transmission/g' en.ts
sed -i '' 's/Vyberite privod/Select Drivetrain/g' en.ts
sed -i '' 's/Lyuboy Tsvet/Any Color/g' en.ts
sed -i '' 's/Vyberite predpochtitel tsvet/Select Preferred Color/g' en.ts
sed -i '' 's/Gorod ili pochtovyy indeks/City or Postal Code/g' en.ts
sed -i '' 's/Lyuboy Probeg/Any Mileage/g' en.ts
sed -i '' 's/Lyub Sostoyanie/Any Condition/g' en.ts
sed -i '' 's/Lyub Rasstoyanie/Any Distance/g' en.ts
sed -i '' 's/Vse Prodavtsy/All Sellers/g' en.ts

# Range labels
sed -i '' 's/Diapazon Tsen/Price Range/g' en.ts
sed -i '' 's/Diapazon Let/Year Range/g' en.ts
sed -i '' 's/Diapazon Probega (km)/Mileage Range (km)/g' en.ts

# Distance options
sed -i '' 's/Po Vsey Stranot/Nationwide/g' en.ts
sed -i '' 's/250 mil/250 miles/g' en.ts
sed -i '' 's/500 mil/500 miles/g' en.ts

# Mileage options
sed -i '' 's/Do 10 000 km/Under 10,000 km/g' en.ts
sed -i '' 's/Do 25 000 km/Under 25,000 km/g' en.ts
sed -i '' 's/Do 50 000 km/Under 50,000 km/g' en.ts
sed -i '' 's/Do 75 000 km/Under 75,000 km/g' en.ts
sed -i '' 's/Do 100 000 km/Under 100,000 km/g' en.ts
sed -i '' 's/Do 150 000 km/Under 150,000 km/g' en.ts

# Seller types
sed -i '' 's/Tolko Dilery/Dealers Only/g' en.ts
sed -i '' 's/Tolko Chastn Prodavtsy/Private Sellers Only/g' en.ts
sed -i '' 's/Tolko Sertifitsirovann Dilery/Certified Dealers Only/g' en.ts

# Door and seat options
sed -i '' 's/2 dveri/2 Doors/g' en.ts
sed -i '' 's/3 dveri/3 Doors/g' en.ts
sed -i '' 's/4 dveri/4 Doors/g' en.ts
sed -i '' 's/5 dverey/5 Doors/g' en.ts
sed -i '' 's/2 mesta/2 Seats/g' en.ts
sed -i '' 's/4 mesta/4 Seats/g' en.ts
sed -i '' 's/5 mest/5 Seats/g' en.ts
sed -i '' 's/7 mest/7 Seats/g' en.ts
sed -i '' 's/8+ mest/8+ Seats/g' en.ts

echo "Advanced search translations completed."