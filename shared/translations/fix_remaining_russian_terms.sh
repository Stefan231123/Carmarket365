#!/bin/bash

# Fix remaining Russian/transliterated terms found in the file

# Common words that appear frequently
sed -i '' 's/Vyberite god/Select Year/g' en.ts
sed -i '' 's/Vyberite country/Select Country/g' en.ts
sed -i '' 's/Vyberite tip transmissii/Select Transmission Type/g' en.ts
sed -i '' 's/Vyberite photos/Choose Photos/g' en.ts
sed -i '' 's/Vyberite youru country/Choose Your Country/g' en.ts
sed -i '' 's/Vyberite tip zaprosa/Select Request Type/g' en.ts
sed -i '' 's/Osnovnoy phonot/Primary Phone/g' en.ts
sed -i '' 's/Vyberite vehiclen vehiclesa dlya sravnotniya/Select Vehicles for Comparison/g' en.ts
sed -i '' 's/Osnovn cookies/Essential Cookies/g' en.ts
sed -i '' 's/Vyberite model/Select Model/g' en.ts
sed -i '' 's/Vyberite transmissiyu/Select Transmission/g' en.ts
sed -i '' 's/Osnovn rekomendatsii po safetyi dlya buyi, selli i of service vashego carya/Basic safety recommendations for buying, selling and servicing your car/g' en.ts
sed -i '' 's/Vyberite variant, kotoryy luchshe vsego podkhodit vam/Choose the option that best suits you/g' en.ts
sed -i '' 's/Osnovn operatsii sayta/Basic Site Operations/g' en.ts
sed -i '' 's/Osnovn rekomendatsii po safetyi dlya zashchity vo time carn sdelok/Basic safety recommendations for protection during car transactions/g' en.ts
sed -i '' 's/Vyberite optsiyu/Select Option/g' en.ts
sed -i '' 's/Osnovn kharakteristiki/Basic Features/g' en.ts

# Complex phrases that need translation
sed -i '' 's/Esli u vas est questions o buye carya, vam nuzhna help v selle vashego vehiclen vehiclesa ili trebuetsya tekhnichesk podderzhka, nasha prethese team ready vam help\. Vyberite naibolee udob dlya vas sposob svyazi\./If you have questions about buying a car, need help selling your vehicle, or require technical support, our team is ready to help you. Choose the most convenient way to contact us./g' en.ts

echo "Remaining Russian terms fixed."