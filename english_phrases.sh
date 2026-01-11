#!/bin/bash

FILE="shared/translations/en.ts"

echo "Converting Russian phrases to English..."

# Email and contact phrases
sed -i '' \
-e "s/'Elektronnaya pochta'/'Email'/" \
-e "s/'Imya obyazatelno'/'Name is required'/" \
-e "s/'Email obyazatelen'/'Email is required'/" \
-e "s/'Pozhaluysta, vvedite deystvitelnyy email'/'Please enter a valid email'/" \
-e "s/'Nomer telefona obyazatelen'/'Phone number is required'/" \
-e "s/'Soobshchenie obyazatelno'/'Message is required'/" \
$FILE

# Financial terms
sed -i '' \
-e "s/'Summa kredita obyazatelna'/'Loan amount is required'/" \
-e "s/'Godovoy dokhod obyazatelen'/'Annual income is required'/" \
-e "s/'Kreditnyy reyting obyazatelen'/'Credit rating is required'/" \
-e "s/'Status zanyatosti obyazatelen'/'Employment status is required'/" \
-e "s/'Stazh na tekushchey rabote obyazatelen'/'Current job tenure is required'/" \
-e "s/'Ezhemesyachnye raskhody obyazatelny'/'Monthly expenses are required'/" \
$FILE

# Vehicle terms
sed -i '' \
-e "s/'Marka obyazatelna'/'Make is required'/" \
-e "s/'Model obyazatelna'/'Model is required'/" \
-e "s/'God vypuska obyazatelen'/'Year is required'/" \
-e "s/'Tsena obyazatelna'/'Price is required'/" \
-e "s/'Sostoyanie'/'Condition'/" \
-e "s/'Izobrazheniya'/'Images'/" \
-e "s/'Valyuta'/'Currency'/" \
$FILE

# Common phrases
sed -i '' \
-e "s/'Chastnyy'/'Private'/" \
-e "s/'Delovoy'/'Business'/" \
-e "s/'Prodavets'/'Seller'/" \
-e "s/'Pokupatel'/'Buyer'/" \
-e "s/'Diler'/'Dealer'/" \
$FILE

# Form validation messages
sed -i '' \
-e "s/'Pole obyazatelno'/'Field is required'/" \
-e "s/'Nepravilnyy format'/'Invalid format'/" \
-e "s/'Slishkom korotko'/'Too short'/" \
-e "s/'Slishkom dlinno'/'Too long'/" \
$FILE

# Status messages
sed -i '' \
-e "s/'Uspeshno otpravleno'/'Successfully sent'/" \
-e "s/'Proizoshla oshibka'/'An error occurred'/" \
-e "s/'Zagruzka...'/'Loading...'/" \
-e "s/'Sokhraneno'/'Saved'/" \
$FILE

echo "Phrase conversion completed"

# More comprehensive word replacements
sed -i '' \
-e "s/obyazatelen/required/g" \
-e "s/obyazatelna/required/g" \
-e "s/obyazatelno/required/g" \
-e "s/obyazatelny/required/g" \
-e "s/deystviteln/valid/g" \
-e "s/nepraviln/invalid/g" \
-e "s/vvedite/enter/g" \
-e "s/pozhaluysta/please/g" \
-e "s/slishkom/too/g" \
-e "s/korotk/short/g" \
-e "s/dlin/long/g" \
-e "s/format/format/g" \
$FILE

echo "Word pattern replacements completed"

# Count remaining
REMAINING=$(grep -o "'[^']*'" $FILE | grep -v -E "'[A-Z][a-z .,!?-]*'$" | wc -l | tr -d ' ')
echo "Remaining non-English entries: $REMAINING"