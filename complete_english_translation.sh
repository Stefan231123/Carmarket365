#!/bin/bash

FILE="shared/translations/en.ts"

echo "Starting comprehensive word-by-word English translation..."

# Phase 1: Core UI and Navigation
sed -i '' \
-e "s/'Glavnaya'/'Home'/g" \
-e "s/'Poisk'/'Search'/g" \
-e "s/'Katalog'/'Catalog'/g" \
-e "s/'O nas'/'About Us'/g" \
-e "s/'Kontakty'/'Contact'/g" \
-e "s/'Pomoshch'/'Help'/g" \
-e "s/'Nastroyki'/'Settings'/g" \
-e "s/'Profil'/'Profile'/g" \
-e "s/'Vkhod'/'Login'/g" \
-e "s/'Vykhod'/'Logout'/g" \
-e "s/'Registratsiya'/'Registration'/g" \
-e "s/'Avtorizatsiya'/'Authorization'/g" \
-e "s/'Menyu'/'Menu'/g" \
-e "s/'Stranitsa'/'Page'/g" \
-e "s/'Nazad'/'Back'/g" \
-e "s/'Dalee'/'Next'/g" \
-e "s/'Gotovo'/'Done'/g" \
-e "s/'Otmena'/'Cancel'/g" \
$FILE

echo "Phase 1: Core UI completed"

# Phase 2: Vehicle Terms
sed -i '' \
-e "s/'Avtomobil'/'Car'/g" \
-e "s/'Mashina'/'Car'/g" \
-e "s/'Avto'/'Vehicle'/g" \
-e "s/'Transport'/'Vehicle'/g" \
-e "s/'Marka'/'Make'/g" \
-e "s/'Model'/'Model'/g" \
-e "s/'God vypuska'/'Year'/g" \
-e "s/'God'/'Year'/g" \
-e "s/'Tsena'/'Price'/g" \
-e "s/'Stoimost'/'Cost'/g" \
-e "s/'Probeg'/'Mileage'/g" \
-e "s/'Kilometrazh'/'Mileage'/g" \
-e "s/'Sostoyanie'/'Condition'/g" \
-e "s/'Novyy'/'New'/g" \
-e "s/'Poderzhannyy'/'Used'/g" \
-e "s/'Bu'/'Used'/g" \
$FILE

echo "Phase 2: Vehicle terms completed"

# Phase 3: Technical Specifications
sed -i '' \
-e "s/'Dvigatel'/'Engine'/g" \
-e "s/'Moshchnost'/'Power'/g" \
-e "s/'Obem'/'Volume'/g" \
-e "s/'Toplivo'/'Fuel'/g" \
-e "s/'Benzin'/'Gasoline'/g" \
-e "s/'Dizel'/'Diesel'/g" \
-e "s/'Gaz'/'Gas'/g" \
-e "s/'Elektro'/'Electric'/g" \
-e "s/'Korobka peredach'/'Transmission'/g" \
-e "s/'Korobka'/'Transmission'/g" \
-e "s/'Mekhanika'/'Manual'/g" \
-e "s/'Avtomat'/'Automatic'/g" \
-e "s/'Robot'/'Robot'/g" \
-e "s/'Variator'/'CVT'/g" \
-e "s/'Privod'/'Drive'/g" \
-e "s/'Perednyy privod'/'Front-wheel drive'/g" \
-e "s/'Zadnyy privod'/'Rear-wheel drive'/g" \
-e "s/'Polnyy privod'/'All-wheel drive'/g" \
$FILE

echo "Phase 3: Technical specs completed"

# Phase 4: Car Body and Features
sed -i '' \
-e "s/'Kuzov'/'Body'/g" \
-e "s/'Sedan'/'Sedan'/g" \
-e "s/'Khetchbek'/'Hatchback'/g" \
-e "s/'Universal'/'Wagon'/g" \
-e "s/'Kupe'/'Coupe'/g" \
-e "s/'Kabriolet'/'Convertible'/g" \
-e "s/'Vnedorozhnik'/'SUV'/g" \
-e "s/'Krossover'/'Crossover'/g" \
-e "s/'Miniven'/'Minivan'/g" \
-e "s/'Pikap'/'Pickup'/g" \
-e "s/'Tsvet'/'Color'/g" \
-e "s/'Krasnyy'/'Red'/g" \
-e "s/'Sinyy'/'Blue'/g" \
-e "s/'Chernyy'/'Black'/g" \
-e "s/'Belyy'/'White'/g" \
-e "s/'Seryy'/'Gray'/g" \
-e "s/'Zelenyy'/'Green'/g" \
-e "s/'Zheltyy'/'Yellow'/g" \
$FILE

echo "Phase 4: Body and colors completed"

# Phase 5: Location and Contact
sed -i '' \
-e "s/'Gorod'/'City'/g" \
-e "s/'Region'/'Region'/g" \
-e "s/'Strana'/'Country'/g" \
-e "s/'Adres'/'Address'/g" \
-e "s/'Lokatsiya'/'Location'/g" \
-e "s/'Mestopolozhenie'/'Location'/g" \
-e "s/'Telefon'/'Phone'/g" \
-e "s/'Nomer telefona'/'Phone number'/g" \
-e "s/'Email'/'Email'/g" \
-e "s/'Elektronnaya pochta'/'Email'/g" \
-e "s/'Sayt'/'Website'/g" \
-e "s/'Kontakt'/'Contact'/g" \
-e "s/'Kontaktnaya informatsiya'/'Contact information'/g" \
-e "s/'Svyaz'/'Contact'/g" \
$FILE

echo "Phase 5: Location and contact completed"

# Phase 6: Actions and Operations
sed -i '' \
-e "s/'Kupit'/'Buy'/g" \
-e "s/'Pokupka'/'Purchase'/g" \
-e "s/'Prodat'/'Sell'/g" \
-e "s/'Prodazha'/'Sale'/g" \
-e "s/'Smotret'/'View'/g" \
-e "s/'Posmotret'/'View'/g" \
-e "s/'Prosmotr'/'View'/g" \
-e "s/'Redaktirovat'/'Edit'/g" \
-e "s/'Izmenit'/'Edit'/g" \
-e "s/'Udalit'/'Delete'/g" \
-e "s/'Udalenie'/'Deletion'/g" \
-e "s/'Dobavit'/'Add'/g" \
-e "s/'Dobavlenie'/'Addition'/g" \
-e "s/'Sohranit'/'Save'/g" \
-e "s/'Sokhranenie'/'Saving'/g" \
-e "s/'Otpravit'/'Send'/g" \
-e "s/'Otpravka'/'Sending'/g" \
-e "s/'Podtverdit'/'Confirm'/g" \
-e "s/'Podtverzhdenie'/'Confirmation'/g" \
$FILE

echo "Phase 6: Actions completed"

# Phase 7: Status and States
sed -i '' \
-e "s/'Aktivnyy'/'Active'/g" \
-e "s/'Neaktivnyy'/'Inactive'/g" \
-e "s/'Dostupnyy'/'Available'/g" \
-e "s/'Nedostupnyy'/'Unavailable'/g" \
-e "s/'Otkrytyy'/'Open'/g" \
-e "s/'Zakrytyy'/'Closed'/g" \
-e "s/'Prodano'/'Sold'/g" \
-e "s/'V prodazhe'/'For Sale'/g" \
-e "s/'Rezerv'/'Reserved'/g" \
-e "s/'Zabronirovan'/'Reserved'/g" \
-e "s/'Gotov'/'Ready'/g" \
-e "s/'V obrabotke'/'Processing'/g" \
-e "s/'Ozhidanie'/'Waiting'/g" \
-e "s/'Zagruzka'/'Loading'/g" \
-e "s/'Oshibka'/'Error'/g" \
-e "s/'Uspeshno'/'Success'/g" \
$FILE

echo "Phase 7: Status and states completed"

# Phase 8: Form Fields and Validation
sed -i '' \
-e "s/'Imya'/'Name'/g" \
-e "s/'Familiya'/'Last Name'/g" \
-e "s/'Otchestvo'/'Middle Name'/g" \
-e "s/'Vozrast'/'Age'/g" \
-e "s/'Pol'/'Gender'/g" \
-e "s/'Muzhskoy'/'Male'/g" \
-e "s/'Zhenskiy'/'Female'/g" \
-e "s/'Data rozhdeniya'/'Date of Birth'/g" \
-e "s/'Data'/'Date'/g" \
-e "s/'Vremya'/'Time'/g" \
-e "s/'Parol'/'Password'/g" \
-e "s/'Podtverdite parol'/'Confirm Password'/g" \
-e "s/'Stariy parol'/'Old Password'/g" \
-e "s/'Novyy parol'/'New Password'/g" \
$FILE

echo "Phase 8: Form fields completed"

# Phase 9: Financial Terms
sed -i '' \
-e "s/'Kredit'/'Credit'/g" \
-e "s/'Zaem'/'Loan'/g" \
-e "s/'Platezh'/'Payment'/g" \
-e "s/'Vznos'/'Down Payment'/g" \
-e "s/'Protsent'/'Interest'/g" \
-e "s/'Stavka'/'Rate'/g" \
-e "s/'Summa'/'Amount'/g" \
-e "s/'Nalogi'/'Taxes'/g" \
-e "s/'Strahovanie'/'Insurance'/g" \
-e "s/'Skidka'/'Discount'/g" \
-e "s/'Komissiya'/'Commission'/g" \
-e "s/'Valyuta'/'Currency'/g" \
-e "s/'Rubl'/'Ruble'/g" \
-e "s/'Dollar'/'Dollar'/g" \
-e "s/'Evro'/'Euro'/g" \
$FILE

echo "Phase 9: Financial terms completed"

# Phase 10: Time and Dates
sed -i '' \
-e "s/'Segodnya'/'Today'/g" \
-e "s/'Vchera'/'Yesterday'/g" \
-e "s/'Zavtra'/'Tomorrow'/g" \
-e "s/'Nedelya'/'Week'/g" \
-e "s/'Mesyats'/'Month'/g" \
-e "s/'God'/'Year'/g" \
-e "s/'Den'/'Day'/g" \
-e "s/'Chas'/'Hour'/g" \
-e "s/'Minuta'/'Minute'/g" \
-e "s/'Ponedelnik'/'Monday'/g" \
-e "s/'Vtornik'/'Tuesday'/g" \
-e "s/'Sreda'/'Wednesday'/g" \
-e "s/'Chetverg'/'Thursday'/g" \
-e "s/'Pyatnitsa'/'Friday'/g" \
-e "s/'Subbota'/'Saturday'/g" \
-e "s/'Voskresenye'/'Sunday'/g" \
$FILE

echo "Phase 10: Time and dates completed"

# Phase 11: Common Adjectives and Descriptions
sed -i '' \
-e "s/'Bolshoy'/'Large'/g" \
-e "s/'Malenkiy'/'Small'/g" \
-e "s/'Sredniy'/'Medium'/g" \
-e "s/'Vysokiy'/'High'/g" \
-e "s/'Nizkiy'/'Low'/g" \
-e "s/'Dlinniy'/'Long'/g" \
-e "s/'Korotkiy'/'Short'/g" \
-e "s/'Shirokiy'/'Wide'/g" \
-e "s/'Uzkiy'/'Narrow'/g" \
-e "s/'Khorosho'/'Good'/g" \
-e "s/'Plokho'/'Bad'/g" \
-e "s/'Otlichno'/'Excellent'/g" \
-e "s/'Prekrasno'/'Great'/g" \
-e "s/'Normalny'/'Normal'/g" \
-e "s/'Obyazatelen'/'Required'/g" \
-e "s/'Obyazatelna'/'Required'/g" \
-e "s/'Obyazatelno'/'Required'/g" \
$FILE

echo "Phase 11: Adjectives completed"

# Phase 12: Clean up remaining transliterated patterns
sed -i '' \
-e "s/'Da'/'Yes'/g" \
-e "s/'Net'/'No'/g" \
-e "s/'Mozhet byt'/'Maybe'/g" \
-e "s/'Konechno'/'Of course'/g" \
-e "s/'Spasibo'/'Thank you'/g" \
-e "s/'Pozhaluysta'/'Please'/g" \
-e "s/'Izvinite'/'Sorry'/g" \
-e "s/'Prosto'/'Simple'/g" \
-e "s/'Slozhno'/'Complex'/g" \
-e "s/'Legko'/'Easy'/g" \
-e "s/'Trudno'/'Difficult'/g" \
-e "s/'Byстro'/'Fast'/g" \
-e "s/'Medlenno'/'Slow'/g" \
-e "s/'Tochno'/'Exact'/g" \
-e "s/'Nepravlno'/'Incorrect'/g" \
-e "s/'Pravlno'/'Correct'/g" \
$FILE

echo "Phase 12: Common expressions completed"

# Phase 13: Clean up word endings and patterns
sed -i '' \
-e "s/\([a-z]*\)nyy\b/\1/g" \
-e "s/\([a-z]*\)naya\b/\1/g" \
-e "s/\([a-z]*\)noe\b/\1/g" \
-e "s/\([a-z]*\)nye\b/\1/g" \
-e "s/\([a-z]*\)ogo\b/\1/g" \
-e "s/\([a-z]*\)omu\b/\1/g" \
-e "s/\([a-z]*\)ymi\b/\1/g" \
-e "s/\([a-z]*\)ykh\b/\1/g" \
-e "s/\([a-z]*\)ost\b/\1/g" \
-e "s/\([a-z]*\)nost\b/\1/g" \
-e "s/\([a-z]*\)tsiya\b/\1tion/g" \
-e "s/\([a-z]*\)siya\b/\1sion/g" \
$FILE

echo "Phase 13: Pattern cleanup completed"

echo "=== Translation Summary ==="
TOTAL_STRINGS=$(grep -o "'[^']*'" $FILE | wc -l | tr -d ' ')
ENGLISH_STRINGS=$(grep -o "'[A-Z][A-Za-z .,!?-]*'" $FILE | wc -l | tr -d ' ')
NON_ENGLISH=$(grep -o "'[^']*[yxzj][^']*'" $FILE | wc -l | tr -d ' ')

echo "Total translation strings: $TOTAL_STRINGS"
echo "English pattern strings: $ENGLISH_STRINGS"
echo "Potentially non-English remaining: $NON_ENGLISH"
echo "Comprehensive English translation completed!"