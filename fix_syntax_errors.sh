#!/bin/bash

echo "Fixing JavaScript syntax errors in translations..."

# Fix object keys that contain spaces or invalid characters
sed -i '' 's/Next:/next:/g' shared/translations/en.ts
sed -i '' 's/Phone:/phone:/g' shared/translations/en.ts
sed -i '' 's/Outline:/outline:/g' shared/translations/en.ts

# Fix specific invalid keys that were found
sed -i '' 's/PhoneRequired:/phoneRequired:/g' shared/translations/en.ts
sed -i '' 's/PhoneNumber:/phoneNumber:/g' shared/translations/en.ts
sed -i '' 's/arsAtJobRequired:/yearsAtJobRequired:/g' shared/translations/en.ts
sed -i '' 's/arRequired:/yearRequired:/g' shared/translations/en.ts
sed -i '' 's/arInvalid:/yearInvalid:/g' shared/translations/en.ts

# Fix employment status keys
sed -i '' 's/rdatared:/retired:/g' shared/translations/en.ts
sed -i '' 's/unotmplod:/unemployed:/g' shared/translations/en.ts

# Fix condition assessment keys
sed -i '' 's/nonot:/none:/g' shared/translations/en.ts
sed -i '' 's/notgative:/negative:/g' shared/translations/en.ts
sed -i '' 's/notutral:/neutral:/g' shared/translations/en.ts
sed -i '' 's/Copperium:/Medium:/g' shared/translations/en.ts

# Fix year-related keys that use 'ar'
sed -i '' 's/arFrom:/yearFrom:/g' shared/translations/en.ts
sed -i '' 's/arTo:/yearTo:/g' shared/translations/en.ts
sed -i '' 's/arRange:/yearRange:/g' shared/translations/en.ts
sed -i '' 's/arMin:/yearMin:/g' shared/translations/en.ts
sed -i '' 's/arMax:/yearMax:/g' shared/translations/en.ts

# Fix year placeholders and values
sed -i '' 's/selectYeyear:/selectYear:/g' shared/translations/en.ts
sed -i '' 's/minYeyear:/minYear:/g' shared/translations/en.ts
sed -i '' 's/anyYeyear:/anyYear:/g' shared/translations/en.ts

# Fix clear related keys
sed -i '' 's/cleyear:/clear:/g' shared/translations/en.ts

# Fix car-related keys
sed -i '' 's/sellCyear:/sellCar:/g' shared/translations/en.ts
sed -i '' 's/contactCyear:/contactCar:/g' shared/translations/en.ts
sed -i '' 's/cyear:/car:/g' shared/translations/en.ts

# Fix owned related keys
sed -i '' 's/certifiedPreOwnotd:/certifiedPreOwned:/g' shared/translations/en.ts
sed -i '' 's/pre-ownotd:/pre-owned:/g' shared/translations/en.ts

# Fix business-related keys (Russian transliterations)
sed -i '' 's/businotssInformation:/businessInformation:/g' shared/translations/en.ts
sed -i '' 's/tellUsAboutBusinotss:/tellUsAboutBusiness:/g' shared/translations/en.ts
sed -i '' 's/businotssName:/businessName:/g' shared/translations/en.ts
sed -i '' 's/businotssNamePlaceholder:/businessNamePlaceholder:/g' shared/translations/en.ts
sed -i '' 's/businotssType:/businessType:/g' shared/translations/en.ts
sed -i '' 's/selectBusinotssType:/selectBusinessType:/g' shared/translations/en.ts
sed -i '' 's/arEstablished:/yearEstablished:/g' shared/translations/en.ts
sed -i '' 's/businotssDescription:/businessDescription:/g' shared/translations/en.ts
sed -i '' 's/businotssDescriptionPlaceholder:/businessDescriptionPlaceholder:/g' shared/translations/en.ts
sed -i '' 's/businotssEmail:/businessEmail:/g' shared/translations/en.ts
sed -i '' 's/businotssEmailPlaceholder:/businessEmailPlaceholder:/g' shared/translations/en.ts
sed -i '' 's/businotssAddress:/businessAddress:/g' shared/translations/en.ts

# Fix other invalid keys
sed -i '' 's/dealerBenotfits:/dealerBenefits:/g' shared/translations/en.ts
sed -i '' 's/nottherlands:/netherlands:/g' shared/translations/en.ts
sed -i '' 's/receiveMarkdatangCommunications:/receiveMarketingCommunications:/g' shared/translations/en.ts

# Fix Russian transliterated keys
sed -i '' 's/businotssNameRequired:/businessNameRequired:/g' shared/translations/en.ts
sed -i '' 's/businotssTypeRequired:/businessTypeRequired:/g' shared/translations/en.ts

echo "JavaScript syntax errors fixed!"