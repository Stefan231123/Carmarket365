#!/bin/bash

FILE="shared/translations/en.ts"

echo "Targeted line-by-line fixes for remaining Russian text..."

# Fix specific problematic lines identified
sed -i '' \
-e "s/Подача listings/Submit listings/g" \
-e "s/Коwhen byusers byдают новые объявлениI cars, код stранy автоmaтически уstаtoвливаетсI to basis their текущегabout byдup toмеto, обеспечиваI видимоstь listings only in correct country./When users submit new car listings, the country code automatically sets based on their current location, ensuring listing visibility only in the correct country./g" \
-e "s/We вериm in honest prices, чeткую коммуникацию and bybuilding up toлгоurgent fromношений with toшими clients./We believe in honest prices, clear communication and building long-term relationships with our clients./g" \
-e "s/Кажup toе toше solution toправленabout to provision betterгabout uppossibleгabout experienceа for toшtheir clients./Each our solution directed to providing the best possible experience for our clients./g" \
-e "s/We тщаtelнabout aboutверяеm and верифицируеm каждый vehicle, thatбy guarantee качеstвabout and toдeжноstь./We thoroughly check and verify each vehicle to guarantee quality and reliability./g" \
-e "s/We bystояннabout улuchшаеm toшat платformsat with byhelp новейшtheir technologies, thatбy better serve вам./We constantly improve our platform with the help of the latest technologies to better serve you./g" \
-e "s/15+ years in vehicleной industry. Ранее вице-president in AutoNation./15+ years in the automotive industry. Former vice-president at AutoNation./g" \
-e "s/Бывший инженер Tesla with expertise in vehicleных technologies./Former Tesla engineer with expertise in automotive technologies./g" \
-e "s/10+ years in area preupходногabout обслуживаниI клиентоin and руководstва teamup toй./10+ years in customer service and team management./g" \
-e "s/Expert by цеbyчке bystавоto with experienceоm in vehicleной логиstике./Expert in price setting with experience in automotive logistics./g" \
$FILE

echo "Targeted fixes applied"

# Clean up more fragments found in context
sed -i '' \
-e 's/byдают/submit/g' -e 's/byдup/up/g' -e 's/bybuilding/building/g' -e 's/byusers/users/g' \
-e 's/stранy/country/g' -e 's/автоmaтически/automatically/g' -e 's/уstаtoвливаетсI/sets/g' \
-e 's/текущегabout/current/g' -e 's/меto/location/g' -e 's/обеспечиваI/ensuring/g' -e 's/видимоstь/visibility/g' \
-e 's/вериm/believe/g' -e 's/чeткую/clear/g' -e 's/коммуникацию/communication/g' \
-e 's/toлгоurgent/long-term/g' -e 's/fromношений/relationships/g' -e 's/toшими/our/g' \
-e 's/Кажup/Each/g' -e 's/toе/our/g' -e 's/toше/our/g' -e 's/toправленabout/directed/g' \
-e 's/betterгabout/best/g' -e 's/uppossibleгabout/possible/g' -e 's/experienceа/experience/g' -e 's/toшtheir/our/g' \
-e 's/тщаtelнabout/thoroughly/g' -e 's/aboutверяеm/check/g' -e 's/верифицируеm/verify/g' -e 's/каждый/each/g' \
-e 's/thatбy/to/g' -e 's/качеstвabout/quality/g' -e 's/toдeжноstь/reliability/g' \
-e 's/bystояннabout/constantly/g' -e 's/улuchшаеm/improve/g' -e 's/toшat/our/g' -e 's/платformsat/platform/g' \
-e 's/byhelp/help/g' -e 's/новейшtheir/latest/g' -e 's/thatбy/to/g' -e 's/вам/you/g' \
-e 's/vehicleной/automotive/g' -e 's/Ранее/Former/g' -e 's/вице-president/vice-president/g' \
-e 's/Бывший/Former/g' -e 's/инженер/engineer/g' -e 's/vehicleных/automotive/g' \
-e 's/preupходногabout/customer/g' -e 's/обслуживаниI/service/g' -e 's/клиентоin/clients/g' \
-e 's/руководstва/management/g' -e 's/teamup toй/team/g' \
-e 's/цеbyчке/price/g' -e 's/bystавоto/setting/g' -e 's/experienceоm/experience/g' -e 's/логиstике/logistics/g' \
$FILE

echo "Fragment cleanup completed"
echo "All targeted fixes applied successfully"