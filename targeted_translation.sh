#!/bin/bash

FILE="shared/translations/en.ts"

echo "Targeted translation of specific remaining content..."

# Modal and contact related
sed -i '' \
-e "s/'Svyazatsya s prodavtsom'/'Contact Seller'/g" \
-e "s/'Otpravit soobshchenie ob etom avtomobile'/'Send message about this car'/g" \
-e "s/'Soobshchenie uspeshno otpravleno!'/'Message sent successfully!'/g" \
-e "s/'Vashe soobshchenie otpravleno prodavtsu. Oni svyazhutsya s vami v blizhayshee vremya.'/'Your message has been sent to the seller. They will contact you soon.'/g" \
-e "s/'Naydite Vash Ideal Car'/'Find Your Ideal Car'/g" \
$FILE

# Common phrases that appear frequently
sed -i '' \
-e "s/'prodavtsom'/'seller'/g" \
-e "s/'prodavets'/'seller'/g" \
-e "s/'pokupatel'/'buyer'/g" \
-e "s/'avtomobile'/'car'/g" \
-e "s/'avtomobil'/'car'/g" \
-e "s/'soobshchenie'/'message'/g" \
-e "s/'otpravleno'/'sent'/g" \
-e "s/'otpravit'/'send'/g" \
-e "s/'svyazatsya'/'contact'/g" \
-e "s/'svyazhutsya'/'will contact'/g" \
-e "s/'blizhayshee vremya'/'soon'/g" \
-e "s/'uspeshno'/'successfully'/g" \
-e "s/'naydite'/'find'/g" \
-e "s/'ideal'/'ideal'/g" \
$FILE

# Form validation messages
sed -i '' \
-e "s/'Pozhaluysta, zapolnite vse obyazatelnye polya'/'Please fill in all required fields'/g" \
-e "s/'Nepravilnyy format email'/'Invalid email format'/g" \
-e "s/'Slishkom korotkyy parol'/'Password too short'/g" \
-e "s/'Parol dolzhen soderzhat minimum'/'Password must contain at least'/g" \
-e "s/'zapolnite'/'fill in'/g" \
-e "s/'obyazatelnye polya'/'required fields'/g" \
-e "s/'nepravilnyy format'/'invalid format'/g" \
-e "s/'slishkom korotkyy'/'too short'/g" \
-e "s/'dolzhen soderzhat'/'must contain'/g" \
-e "s/'minimum'/'at least'/g" \
$FILE

# Vehicle listing terms
sed -i '' \
-e "s/'Dobavit v izbrannoe'/'Add to Favorites'/g" \
-e "s/'Udalit iz izbrannogo'/'Remove from Favorites'/g" \
-e "s/'Posmotret podrobnee'/'View Details'/g" \
-e "s/'Svyazatsya s prodavtsom'/'Contact Seller'/g" \
-e "s/'dobavit v izbrannoe'/'add to favorites'/g" \
-e "s/'udalit iz izbrannogo'/'remove from favorites'/g" \
-e "s/'posmotret podrobnee'/'view details'/g" \
-e "s/'izbrannoe'/'favorites'/g" \
-e "s/'podrobnee'/'details'/g" \
$FILE

# Navigation and UI elements  
sed -i '' \
-e "s/'Glavnoe menyu'/'Main Menu'/g" \
-e "s/'Poisk avtomobiley'/'Car Search'/g" \
-e "s/'Kategorii transporta'/'Vehicle Categories'/g" \
-e "s/'Popolnit balans'/'Top Up Balance'/g" \
-e "s/'Istoriya pokupok'/'Purchase History'/g" \
-e "s/'Nastroyki akkaunuta'/'Account Settings'/g" \
-e "s/'glavnoe menyu'/'main menu'/g" \
-e "s/'poisk avtomobiley'/'car search'/g" \
-e "s/'kategorii transporta'/'vehicle categories'/g" \
-e "s/'popolnit balans'/'top up balance'/g" \
-e "s/'istoriya pokupok'/'purchase history'/g" \
-e "s/'nastroyki akkaunuta'/'account settings'/g" \
$FILE

# Error messages
sed -i '' \
-e "s/'Proizoshla oshibka pri otpravke'/'An error occurred while sending'/g" \
-e "s/'Proizoshla oshibka pri zagruzke'/'An error occurred while loading'/g" \
-e "s/'Proizoshla oshibka'/'An error occurred'/g" \
-e "s/'Poprobuite pozhe'/'Try again later'/g" \
-e "s/'Netu internetu'/'No internet connection'/g" \
-e "s/'proizoshla oshibka'/'an error occurred'/g" \
-e "s/'poprobuite pozhe'/'try again later'/g" \
-e "s/'netu internetu'/'no internet connection'/g" \
$FILE

# Status messages
sed -i '' \
-e "s/'Zagruzka dannykh...'/'Loading data...'/g" \
-e "s/'Sohranenie dannykh...'/'Saving data...'/g" \
-e "s/'Obrabotka zaprosa...'/'Processing request...'/g" \
-e "s/'Uspeshno sozdano'/'Successfully created'/g" \
-e "s/'Uspeshno izmeneno'/'Successfully updated'/g" \
-e "s/'Uspeshno udaleno'/'Successfully deleted'/g" \
-e "s/'zagruzka dannykh'/'loading data'/g" \
-e "s/'sohranenie dannykh'/'saving data'/g" \
-e "s/'obrabotka zaprosa'/'processing request'/g" \
-e "s/'uspeshno sozdano'/'successfully created'/g" \
-e "s/'uspeshno izmeneno'/'successfully updated'/g" \
-e "s/'uspeshno udaleno'/'successfully deleted'/g" \
$FILE

echo "Targeted translation completed"

# Check for specific patterns that might still exist
echo "Checking for remaining Russian patterns..."
grep -o "'[^']*[шщьъыэюя][^']*'" $FILE | head -10
grep -o "'[^']*tsya[^']*'" $FILE | head -5

echo "Translation completed successfully!"