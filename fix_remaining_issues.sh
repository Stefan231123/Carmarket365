#!/bin/bash

echo "Fixing remaining translation issues..."

# Fix remaining corrupted words in advanced search and other sections
sed -i '' 's/Cari/Cars/g' shared/translations/en.ts
sed -i '' 's/Citrn/Citroën/g' shared/translations/en.ts

# Fix any remaining Russian transliterations
sed -i '' 's/these/data/g' shared/translations/en.ts
sed -i '' 's/arsExperience/Years Experience/g' shared/translations/en.ts

# Fix mixed language patterns that may still exist
sed -i '' 's/Price Tsena i mestopolozhenie Location/Price and Location/g' shared/translations/en.ts
sed -i '' 's/Features Funktsii i optsii Options/Features and Options/g' shared/translations/en.ts

# Fix any remaining grammatical issues in advanced search section
sed -i '' 's/streamlinotd/streamlined/g' shared/translations/en.ts

# Fix section comments that may be corrupted
sed -i '' 's/\/\/ Razdely/\/\/ Sections/g' shared/translations/en.ts
sed -i '' 's/\/\/ Polya detaley carya/\/\/ Vehicle Details Fields/g' shared/translations/en.ts

# Fix any remaining apostrophe issues in descriptions
sed -i '' "s/you're looking/you're looking/g" shared/translations/en.ts
sed -i '' "s/don't pay/don't pay/g" shared/translations/en.ts

# Fix any remaining mixed text patterns
sed -i '' 's/notxt/Next/g' shared/translations/en.ts
sed -i '' 's/phonot/Phone/g' shared/translations/en.ts
sed -i '' 's/outlinot/Outline/g' shared/translations/en.ts
sed -i '' 's/ar:/year:/g' shared/translations/en.ts
sed -i '' 's/ar"/year"/g' shared/translations/en.ts

echo "Remaining issues fixed successfully!"