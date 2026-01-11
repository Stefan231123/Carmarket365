#!/bin/bash

echo "Fixing FAQ translations..."

# Fix remaining FAQ questions and answers
sed -i '' 's/Vse li listings verified?/Are all listings verified?/g' shared/translations/en.ts
sed -i '' 's/My provodim verifyku biograficheskikh data all dealers i private sellers, a also verify informatsiyu o vehiclesakh na tochnost before razmeshcheniem\./We verify the background data of all dealers and private sellers, and also verify vehicle information for accuracy before listing./g' shared/translations/en.ts

# Fix test drive FAQ
sed -i '' 's/Mozhno li zaplanirovat test drive?/Can I schedule a test drive?/g' shared/translations/en.ts

# Fix document FAQ
sed -i '' 's/Chto me vzyat s soboy dlya view car?/What should I bring when viewing a car?/g' shared/translations/en.ts

# Fix pricing FAQ
sed -i '' 's/Kak uznat, spravedliva li price car?/How do I know if the car price is fair?/g' shared/translations/en.ts

# Fix listing creation FAQ
sed -i '' 's/Kak razmestit listing o sell car?/How to create a listing to sell my car?/g' shared/translations/en.ts

# Fix selling time FAQ
sed -i '' 's/Skolko vremeni trebuetsya dlya selling car?/How long does it take to sell a car?/g' shared/translations/en.ts

# Fix document requirements for selling
sed -i '' 's/Kakie dokumenty me nuzhny dlya selling car?/What documents do I need to sell a car?/g' shared/translations/en.ts

# Fix valuation FAQ
sed -i '' 's/Kak otsenuvat cost car?/How to assess car value?/g' shared/translations/en.ts

# Fix financing FAQ
sed -i '' 's/Kak poluchit finansirovanie?/How to get financing?/g' shared/translations/en.ts

# Fix safety FAQ
sed -i '' 's/Kak ostavatsya v safety pri buying car?/How to stay safe when buying a car?/g' shared/translations/en.ts

# Fix vehicle history FAQ
sed -i '' 's/Nadezhny li reporty ob history vehicle?/Are vehicle history reports reliable?/g' shared/translations/en.ts

# Fix any remaining Russian text in FAQ answers
sed -i '' 's/My provide comprehensive reporty ob history vehicles from reliable sources\./We provide comprehensive vehicle history reports from reliable sources./g' shared/translations/en.ts

# Fix comments that may still be in Russian
sed -i '' 's/\/\/ Staticheskie data carey dlya advancedn search/\/\/ Static car data for advanced search/g' shared/translations/en.ts

echo "FAQ translations fixed!"