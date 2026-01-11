#!/bin/bash

FILE="shared/translations/en.ts"

echo "Phase 2: Mid-frequency words (5-10 occurrences)..."

# Support terms (8+ occurrences)
sed -i '' -e 's/ддержки/support/g' -e 's/ддержка/support/g' -e 's/ддержкой/support/g' -e 's/ддерживать/support/g' $FILE

# Time terms (8+ occurrences) 
sed -i '' -e 's/время/time/g' -e 's/времени/time/g' $FILE

# Possession terms (8+ occurrences)
sed -i '' -e 's/вашего/your/g' -e 's/ваше/your/g' -e 's/ваших/your/g' -e 's/вашу/your/g' -e 's/вашем/your/g' -e 's/вашей/your/g' -e 's/ваша/your/g' -e 's/ваш/your/g' $FILE

# Geographic terms (7+ occurrences)
sed -i '' -e 's/ступности/accessibility/g' -e 's/ступность/accessibility/g' -e 's/ступные/accessible/g' -e 's/ступной/accessible/g' -e 's/ступно/accessible/g' $FILE

# Business terms (7+ occurrences)
sed -i '' -e 's/объявления/listings/g' -e 's/объявлений/listings/g' -e 's/объявление/listing/g' $FILE

# Account terms (7+ occurrences)
sed -i '' -e 's/аккаунта/account/g' -e 's/аккаунт/account/g' -e 's/аккаунтом/account/g' -e 's/аккаунтов/accounts/g' $FILE

# Vehicle terms (7+ occurrences)
sed -i '' -e 's/автомобилям/vehicles/g' -e 's/автомобильных/automotive/g' -e 's/автомобильной/automotive/g' -e 's/автомобиле/vehicle/g' -e 's/автомобилями/vehicles/g' -e 's/автомобилем/vehicle/g' $FILE

# Purchase terms (6+ occurrences)
sed -i '' -e 's/купки/purchase/g' -e 's/купателей/buyers/g' -e 's/купку/purchase/g' -e 's/купкой/purchase/g' -e 's/купить/buy/g' -e 's/купатели/buyers/g' -e 's/купателя/buyer/g' $FILE

# Document terms (6+ occurrences)
sed -i '' -e 's/кументы/documents/g' -e 's/кументация/documentation/g' -e 's/кументацию/documentation/g' -e 's/кументами/documents/g' -e 's/кументам/documents/g' -e 's/кумент/document/g' $FILE

# General terms (6+ occurrences)
sed -i '' -e 's/более/more/g' -e 's/мощи/power/g' -e 's/брение/browsing/g' -e 's/мощью/help/g' $FILE

# Service terms (5+ occurrences)
sed -i '' -e 's/обслуживание/service/g' -e 's/обслуживания/service/g' -e 's/обслуживании/service/g' -e 's/обслуживанием/service/g' -e 's/обслуживаемое/serviced/g' $FILE

# Options terms (5+ occurrences)
sed -i '' -e 's/опции/options/g' -e 's/опцию/option/g' -e 's/опций/options/g' $FILE

# Payment terms (5+ occurrences)
sed -i '' -e 's/оплаты/payment/g' -e 's/оплату/payment/g' $FILE

# Review terms (5+ occurrences)
sed -i '' -e 's/зывов/reviews/g' -e 's/зывы/reviews/g' -e 's/зывами/reviews/g' $FILE

# History terms (5+ occurrences)
sed -i '' -e 's/историю/history/g' $FILE

# Inventory terms (5+ occurrences)
sed -i '' -e 's/инвентарь/inventory/g' -e 's/инвентар/inventory/g' $FILE

# Image terms (5+ occurrences)
sed -i '' -e 's/изображений/images/g' -e 's/изображение/image/g' -e 's/изображением/image/g' $FILE

# Change terms (5+ occurrences)
sed -i '' -e 's/изменить/change/g' $FILE

# Encoded terms (5+ occurrences)
sed -i '' -e 's/закодированные/encoded/g' -e 's/закодированный/encoded/g' -e 's/закодированного/encoded/g' -e 's/кодированного/encoded/g' $FILE

# Question terms (5+ occurrences)
sed -i '' -e 's/вопросы/questions/g' -e 's/вопросов/questions/g' $FILE

# Variant terms (5+ occurrences)
sed -i '' -e 's/Варианты/Options/g' -e 's/варианты/options/g' -e 's/вариант/option/g' $FILE

echo "Phase 2 completed"