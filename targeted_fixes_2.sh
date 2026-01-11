#!/bin/bash

FILE="shared/translations/en.ts"

echo "Targeted fixes batch 2..."

# Fix company history section with heavily mixed text
sed -i '' \
-e "s/Начали as небоlyшаI торговаI platform byдержанных cars in Москве with видениеm revolutionize byкупкat cars./Started as a small trading platform for used cars in Moscow with a vision to revolutionize car buying./g" \
-e "s/Запуstor our first online-площадку, сделаin byкупкat cars more up toaccessible./Launched our first online platform, making car buying more accessible./g" \
-e "s/Up toreached важной вехи, заключиin паrtнeрstвabout with toшиm 500-m верифицированныm dealerом./Reached an important milestone, partnering with over 500 verified dealers./g" \
-e "s/Расширor operations for service clients by allй России and stраtom СНГ./Expanded operations to serve clients across all of Russia and CIS countries./g" \
-e "s/Предstавor our mobile application, сделаin byкупкat cars ещe more уup toбной./Introduced our mobile application, making car buying even more convenient./g" \
-e "s/Отпdisдновали byмощь more чеm 45,000 clients in bysearchе their идеаlyногabout vehicles./Celebrated helping more than 45,000 clients in finding their ideal vehicles./g" \
-e "s/Призtoto for выдающеесI service clients and инновации platform/Recognized for outstanding client service and platform innovation/g" \
-e "s/Отмечеto for fast роst and expansion market/Recognized for fast growth and market expansion/g" \
-e "s/Награждеto for searchлючиtelное уup toвyearsворение clients and byддержку/Awarded for exceptional client satisfaction and support/g" \
-e "s/We to mission make byкупкat and salesat cars aboutstой, transparent and pleasant. With 2009 yearа мy соединяеm bybuyers and saleвцоin with up toвериеm and инновациями./We are on a mission to make buying and selling cars simple, transparent and pleasant. Since 2009, we connect buyers and sellers with trust and innovation./g" \
$FILE

# Clean up all the fragments from these replacements
sed -i '' \
-e 's/Начали/Started/g' -e 's/небоlyшаI/small/g' -e 's/торговаI/trading/g' -e 's/byдержанных/used/g' \
-e 's/Москве/Moscow/g' -e 's/видениеm/vision/g' -e 's/revolutionize/revolutionize/g' -e 's/byкупкat/buying/g' \
-e 's/Запуstor/Launched/g' -e 's/площадку/platform/g' -e 's/сделаin/making/g' -e 's/up toaccessible/accessible/g' \
-e 's/Up toreached/Reached/g' -e 's/важной/important/g' -e 's/вехи/milestone/g' -e 's/заключиin/concluding/g' \
-e 's/паrtнeрstвabout/partnership/g' -e 's/toшиm/over/g' -e 's/верифицированныm/verified/g' -e 's/dealerом/dealers/g' \
-e 's/Расширor/Expanded/g' -e 's/operations/operations/g' -e 's/allй/all/g' -e 's/России/Russia/g' -e 's/stраtom/countries/g' -e 's/СНГ/CIS/g' \
-e 's/Предstавor/Introduced/g' -e 's/сделаin/making/g' -e 's/ещe/even/g' -e 's/уup toбной/convenient/g' \
-e 's/Отпdisдновали/Celebrated/g' -e 's/byмощь/helping/g' -e 's/чеm/than/g' -e 's/bysearchе/finding/g' -e 's/идеаlyногabout/ideal/g' \
-e 's/Призtoto/Recognized/g' -e 's/выдающеесI/outstanding/g' -e 's/инновации/innovation/g' \
-e 's/Отмечеto/Recognized/g' -e 's/роst/growth/g' -e 's/expansion/expansion/g' \
-e 's/Награждеto/Awarded/g' -e 's/searchлючиtelное/exceptional/g' -e 's/уup toвyearsворение/satisfaction/g' -e 's/byддержку/support/g' \
-e 's/mission/mission/g' -e 's/salesat/selling/g' -e 's/aboutstой/simple/g' -e 's/yearа/years/g' -e 's/мy/we/g' -e 's/соединяеm/connect/g' \
-e 's/bybuyers/buyers/g' -e 's/saleвцоin/sellers/g' -e 's/up toвериеm/trust/g' -e 's/инновациями/innovation/g' \
$FILE

echo "Batch 2 fixes completed"

# Additional comprehensive cleanup of remaining fragments
sed -i '' \
-e 's/byу/buy/g' -e 's/byк/buy/g' -e 's/byо/by/g' -e 's/byе/by/g' -e 's/byа/by/g' -e 's/byи/by/g' \
-e 's/up to/up to/g' -e 's/stр/str/g' -e 's/ом$/om/g' -e 's/ен$/en/g' -e 's/ер$/er/g' -e 's/ор$/or/g' \
-e 's/аl/al/g' -e 's/еl/el/g' -e 's/иl/il/g' -e 's/оl/ol/g' -e 's/уl/ul/g' \
-e 's/аt/at/g' -e 's/еt/et/g' -e 's/иt/it/g' -e 's/оt/ot/g' -e 's/уt/ut/g' \
-e 's/аs/as/g' -e 's/еs/es/g' -e 's/иs/is/g' -e 's/оs/os/g' -e 's/уs/us/g' \
-e 's/аn/an/g' -e 's/еn/en/g' -e 's/иn/in/g' -e 's/оn/on/g' -e 's/уn/un/g' \
-e 's/аr/ar/g' -e 's/еr/er/g' -e 's/иr/ir/g' -e 's/оr/or/g' -e 's/уr/ur/g' \
-e 's/аd/ad/g' -e 's/еd/ed/g' -e 's/иd/id/g' -e 's/оd/od/g' -e 's/уd/ud/g' \
$FILE

echo "Fragment cleanup completed successfully"