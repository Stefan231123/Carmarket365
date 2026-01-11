#!/bin/bash

# Script to translate Russian/transliterated text to English in en.ts

# Common Russian to English translations
sed -i '' 's/Osnovn informatsiya/Basic Information/g' en.ts
sed -i '' 's/Kontaktn informatsiya/Contact Information/g' en.ts
sed -i '' 's/Dopolniteln informatsiya/Additional Information/g' en.ts
sed -i '' 's/Fotografii i kontaktn informatsiya/Photos and Contact Information/g' en.ts
sed -i '' 's/avtomobil/car/g' en.ts
sed -i '' 's/avtomobiley/cars/g' en.ts
sed -i '' 's/avtomobilya/car/g' en.ts
sed -i '' 's/transport/vehicle/g' en.ts
sed -i '' 's/Vashe/Your/g' en.ts
sed -i '' 's/Vasha/Your/g' en.ts
sed -i '' 's/Vash/Your/g' en.ts
sed -i '' 's/poln imya/full name/g' en.ts
sed -i '' 's/imya/name/g' en.ts
sed -i '' 's/telefon/phone/g' en.ts
sed -i '' 's/telefona/phone/g' en.ts
sed -i '' 's/email/email/g' en.ts
sed -i '' 's/opishat/describe/g' en.ts
sed -i '' 's/fotografii/photos/g' en.ts
sed -i '' 's/zagruzit/upload/g' en.ts
sed -i '' 's/sokhranit/save/g' en.ts
sed -i '' 's/chernovik/draft/g' en.ts
sed -i '' 's/predvaritel/preview/g' en.ts
sed -i '' 's/prosmotr/view/g' en.ts
sed -i '' 's/opublikovat/publish/g' en.ts
sed -i '' 's/obyavlenie/listing/g' en.ts
sed -i '' 's/obyavleniya/listings/g' en.ts
sed -i '' 's/prodazh/sell/g' en.ts
sed -i '' 's/pokupk/buy/g' en.ts
sed -i '' 's/prodayte/sell/g' en.ts
sed -i '' 's/svoy/your/g' en.ts
sed -i '' 's/dilery/dealers/g' en.ts
sed -i '' 's/dilerov/dealers/g' en.ts
sed -i '' 's/obzory/reviews/g' en.ts
sed -i '' 's/bezopasnost/safety/g' en.ts
sed -i '' 's/sovety/tips/g' en.ts
sed -i '' 's/support/support/g' en.ts
sed -i '' 's/pomoshch/help/g' en.ts
sed -i '' 's/voprosy/questions/g' en.ts
sed -i '' 's/otvety/answers/g' en.ts
sed -i '' 's/chasto/frequently/g' en.ts
sed -i '' 's/zadavaem/asked/g' en.ts
sed -i '' 's/informatsiya/information/g' en.ts
sed -i '' 's/konfidentsialnost/privacy/g' en.ts
sed -i '' 's/politika/policy/g' en.ts
sed -i '' 's/usloviya/terms/g' en.ts
sed -i '' 's/obsluzhivaniyu/service/g' en.ts
sed -i '' 's/obsluzhivaniya/service/g' en.ts
sed -i '' 's/faylov/files/g' en.ts
sed -i '' 's/cookie/cookie/g' en.ts
sed -i '' 's/dostupnost/accessibility/g' en.ts

echo "Basic translations completed. Manual review needed for remaining content."