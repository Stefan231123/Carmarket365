#!/bin/bash

echo "Fixing complex phrases and corrupted patterns..."

# Fix corrupted selling patterns
sed -i '' 's/sellingngng/selling/g' shared/translations/en.ts
sed -i '' 's/Prodazha carey/Car Sales/g' shared/translations/en.ts
sed -i '' 's/Prodazha car/Sell Car/g' shared/translations/en.ts

# Fix FAQ questions that got corrupted
sed -i '' 's/Skolko vremeni trebuetsya dlya selling car?/How long does it take to sell a car?/g' shared/translations/en.ts
sed -i '' 's/Kakie dokumenty me nuzhny dlya selling car?/What documents do I need to sell a car?/g' shared/translations/en.ts

# Fix longer Russian phrases in FAQ sections
sed -i '' 's/Da, vse listings na CarMarket365 verified\./Yes, all listings on CarMarket365 are verified./g' shared/translations/en.ts
sed -i '' 's/My provodim verify biograficheskikh data all dealers i private sellers/We verify the background data of all dealers and private sellers/g' shared/translations/en.ts

# Fix test drive text
sed -i '' 's/Konotchno! Vy can schedule na test drive directly/Of course! You can schedule a test drive directly/g' shared/translations/en.ts
sed -i '' 's/through stranitsu s details car\./through the car details page./g' shared/translations/en.ts
sed -i '' 's/Svyazhites s seller, to arrange o suitable vremeni i place dlya test drive\./Contact the seller to arrange a suitable time and place for the test drive./g' shared/translations/en.ts

# Fix document requirements text
sed -i '' 's/Chto me vzyat s soboy dlya view car?/What should I bring when viewing a car?/g' shared/translations/en.ts

# Fix pricing analysis text
sed -i '' 's/Kak uznat, spravedliva li price car?/How do I know if the car price is fair?/g' shared/translations/en.ts
sed -i '' 's/My provide estimates market value dlya all vehicles\./We provide market value estimates for all vehicles./g' shared/translations/en.ts
sed -i '' 's/Vy also can compare similar cars/You can also compare similar cars/g' shared/translations/en.ts
sed -i '' 's/check report ob history vehicle/check vehicle history reports/g' shared/translations/en.ts
sed -i '' 's/i ispolzovat nashi tools analysis prices\./and use our price analysis tools./g' shared/translations/en.ts

# Fix selling process text
sed -i '' 's/Kak razmestit listing o sell car?/How to create a listing to sell my car?/g' shared/translations/en.ts
sed -i '' 's/Ispolzuyte formu "Sell Car" dlya sozdaniya listings\./Use the "Sell Car" form to create listings./g' shared/translations/en.ts
sed -i '' 's/Vam ponadobyatsya detali vehicle, photos/You will need vehicle details, photos/g' shared/translations/en.ts
sed -i '' 's/information o sostoyanii i kontakt data\./condition information and contact data./g' shared/translations/en.ts
sed -i '' 's/Protsess zanimaet okolo 10-15 minut\./The process takes about 10-15 minutes./g' shared/translations/en.ts

# Fix valuation text  
sed -i '' 's/Ispolzuyte nash besplat instrument estimates vehicle/Use our free vehicle valuation tool/g' shared/translations/en.ts
sed -i '' 's/izuchite similar listings/study similar listings/g' shared/translations/en.ts
sed -i '' 's/uchtite sostoyanie vashego car, probeg/consider your car condition, mileage/g' shared/translations/en.ts
sed -i '' 's/i any recent remont ili uluchsheniya\./and any recent repairs or improvements./g' shared/translations/en.ts

# Fix financing text
sed -i '' 's/Zapolnite nashu online-applicationu/Complete our online application/g' shared/translations/en.ts
sed -i '' 's/by accessing instant preview approval/to get instant pre-approval/g' shared/translations/en.ts
sed -i '' 's/vyberite vashe vehicle/select your vehicle/g' shared/translations/en.ts
sed -i '' 's/i zavershite oformlenie kredita\./and complete the loan process./g' shared/translations/en.ts
sed -i '' 's/Ves protsess mozhno zavershit online ili po phone\./The entire process can be completed online or by phone./g' shared/translations/en.ts

# Fix safety text
sed -i '' 's/Kak ostavatsya v safety pri buying car?/How to stay safe when buying a car?/g' shared/translations/en.ts
sed -i '' 's/Vstrechaytes v obshchestven mestakh/Meet in public places/g' shared/translations/en.ts
sed -i '' 's/berite s soboy other/bring someone with you/g' shared/translations/en.ts
sed -i '' 's/tshchatelno osmatrivayte vehicle/carefully inspect the vehicle/g' shared/translations/en.ts
sed -i '' 's/i use secure sposoby oplaty\./and use secure payment methods./g' shared/translations/en.ts
sed -i '' 's/Nikogda ne perevodite dengi/Never transfer money/g' shared/translations/en.ts
sed -i '' 's/i ne platite do osmotra car\./and dont pay before inspecting the car./g' shared/translations/en.ts

# Fix vehicle history text
sed -i '' 's/Nadezhny li reporty ob history vehicle?/Are vehicle history reports reliable?/g' shared/translations/en.ts
sed -i '' 's/Da, my provide kompleksn reporty ob history vehicles/Yes, we provide comprehensive vehicle history reports/g' shared/translations/en.ts
sed -i '' 's/iz nadezhn istochnikov\./from reliable sources./g' shared/translations/en.ts
sed -i '' 's/Oni vklyuchayut istoriyu avariy/They include accident history/g' shared/translations/en.ts
sed -i '' 's/zapisi ob obsluzhivanii/service records/g' shared/translations/en.ts
sed -i '' 's/i informatsiyu o rights sobstvennotss\./and ownership information./g' shared/translations/en.ts

# Fix under construction message
sed -i '' 's/Dan stranitsa nakhoditsya v razrabotke\./This page is under construction./g' shared/translations/en.ts
sed -i '' 's/My userdno rabotaem nad sozdaniem potryasayushchikh funktsiy\./We are working hard to create amazing features./g' shared/translations/en.ts
sed -i '' 's/Pozhaluysta, zaydite pozhe ili prodolzhite izuchat nashu glavnuyu stranitsu\./Please check back later or continue exploring our main page./g' shared/translations/en.ts

echo "Complex phrases fixed successfully!"