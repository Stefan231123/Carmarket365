#!/bin/bash

FILE="shared/translations/en.ts"

echo "Phase 4: 3-frequency words..."

# Form terms (3+ occurrences)
sed -i '' -e 's/форм/forms/g' -e 's/формы/forms/g' -e 's/форму/form/g' $FILE

# Duration/flow terms (3+ occurrences)
sed -i '' -e 's/течение/duration/g' $FILE

# Text terms (3+ occurrences)
sed -i '' -e 's/текст/text/g' -e 's/текста/text/g' $FILE

# Amount terms (3+ occurrences)
sed -i '' -e 's/сумма/amount/g' -e 's/суммы/amounts/g' $FILE

# Country terms (3+ occurrences)
sed -i '' -e 's/стране/country/g' -e 's/страны/countries/g' -e 's/страну/country/g' -e 's/странице/page/g' -e 's/страницы/pages/g' $FILE

# Collision terms (3+ occurrences)
sed -i '' -e 's/столкнулись/encountered/g' -e 's/столкновении/collision/g' $FILE

# Standards terms (3+ occurrences)
sed -i '' -e 's/стандартам/standards/g' $FILE

# Message terms (3+ occurrences)
sed -i '' -e 's/сообщение/message/g' -e 's/сообщения/messages/g' -e 's/сообщить/report/g' -e 's/сообщайте/report/g' $FILE

# Deal terms (3+ occurrences)
sed -i '' -e 's/сделки/deals/g' -e 's/сделок/deals/g' -e 's/сделку/deal/g' -e 's/сделках/deals/g' -e 's/сделка/deal/g' -e 's/сделать/make/g' -e 's/сделав/making/g' $FILE

# Communication terms (3+ occurrences)
sed -i '' -e 's/связь/communication/g' -e 's/связи/communications/g' -e 's/связанных/related/g' -e 's/связавшись/contacting/g' -e 's/свяжитесь/contact/g' -e 's/свяжемся/contact/g' $FILE

# Own terms (3+ occurrences)
sed -i '' -e 's/свой/own/g' -e 's/своим/own/g' -e 's/своей/own/g' $FILE

# Certificate terms (3+ occurrences)
sed -i '' -e 's/свидетельство/certificate/g' $FILE

# Recommendation terms (3+ occurrences)
sed -i '' -e 's/рекомендации/recommendations/g' -e 's/рекомендуем/recommend/g' -e 's/рекомендациям/recommendations/g' -e 's/рекомендаций/recommendations/g' -e 's/рекомендуемые/recommended/g' $FILE

# Interest terms (3+ occurrences)
sed -i '' -e 's/проценты/interest/g' -e 's/процентов/percent/g' -e 's/процентные/interest/g' -e 's/процент/percent/g' $FILE

# View terms (3+ occurrences)
sed -i '' -e 's/просм/view/g' -e 's/просматривайте/browse/g' -e 's/просматривать/browse/g' $FILE

# Check terms (3+ occurrences)
sed -i '' -e 's/проверки/verification/g' -e 's/проверить/verify/g' -e 's/проверяйте/check/g' -e 's/проверяем/verify/g' -e 's/проверка/verification/g' $FILE

# Problem terms (3+ occurrences)
sed -i '' -e 's/проблеме/problem/g' -e 's/проблемах/problems/g' $FILE

# Example terms (3+ occurrences)
sed -i '' -e 's/пример/example/g' $FILE

# Payment terms (3+ occurrences)
sed -i '' -e 's/платежей/payments/g' -e 's/платеж/payment/g' -e 's/платежи/payments/g' $FILE

# Experience terms (3+ occurrences)
sed -i '' -e 's/опытом/experience/g' $FILE

# Description terms (3+ occurrences)
sed -i '' -e 's/описание/description/g' -e 's/описания/descriptions/g' $FILE

# Area terms (3+ occurrences)
sed -i '' -e 's/области/area/g' $FILE

# Need terms (3+ occurrences)
sed -i '' -e 's/нуж/need/g' $FILE

# Below terms (3+ occurrences)
sed -i '' -e 's/ниже/below/g' $FILE

# Several terms (3+ occurrences)
sed -i '' -e 's/несколько/several/g' -e 's/нескольких/several/g' -e 's/несколькими/several/g' $FILE

# Fraud terms (3+ occurrences)
sed -i '' -e 's/мошенничества/fraud/g' $FILE

# My terms (3+ occurrences)
sed -i '' -e 's/мой/my/g' -e 's/моего/my/g' $FILE

# Can terms (3+ occurrences)
sed -i '' -e 's/может/can/g' -e 's/могу/can/g' -e 's/могут/can/g' -e 's/могает/helps/g' $FILE

# Better terms (3+ occurrences)
sed -i '' -e 's/лучения/obtaining/g' -e 's/лучшие/best/g' -e 's/лучшего/best/g' -e 's/лучше/better/g' -e 's/лучшую/best/g' -e 's/лучшим/best/g' -e 's/лучший/best/g' -e 's/лучшей/best/g' -e 's/лучшая/best/g' $FILE

# Personal terms (3+ occurrences)
sed -i '' -e 's/личных/personal/g' -e 's/лично/personally/g' -e 's/личным/personal/g' -e 's/личность/identity/g' -e 's/личном/personal/g' -e 's/личную/personal/g' -e 's/личной/personal/g' $FILE

# Competitive terms (3+ occurrences)
sed -i '' -e 's/конкурентные/competitive/g' -e 's/конкурентными/competitive/g' $FILE

# Team terms (3+ occurrences)
sed -i '' -e 's/команда/team/g' -e 's/команде/team/g' -e 's/коман/team/g' $FILE

# Content terms (3+ occurrences)
sed -i '' -e 's/контента/content/g' $FILE

# Seems terms (3+ occurrences)
sed -i '' -e 's/кажется/seems/g' $FILE

# Their terms (3+ occurrences)
sed -i '' -e 's/их/their/g' $FILE

# Search terms (3+ occurrences)
sed -i '' -e 's/иска/search/g' -e 's/иск/search/g' $FILE

# Industry terms (3+ occurrences)
sed -i '' -e 's/индустрии/industry/g' $FILE

# Name terms (3+ occurrences)
sed -i '' -e 's/имя/name/g' -e 's/иметь/have/g' $FILE

# Visual terms (3+ occurrences)
sed -i '' -e 's/зрительной/visual/g' -e 's/зрительный/visual/g' -e 's/зрительным/visual/g' -e 's/зритель/viewer/g' $FILE

# Here terms (3+ occurrences)
sed -i '' -e 's/здесь/here/g' $FILE

# Takes terms (3+ occurrences)
sed -i '' -e 's/занимает/takes/g' $FILE

# Details terms (3+ occurrences)
sed -i '' -e 's/детали/details/g' -e 's/деталей/details/g' -e 's/детальный/detailed/g' -e 's/детальные/detailed/g' -e 's/деталями/details/g' $FILE

# Guarantee terms (3+ occurrences)
sed -i '' -e 's/гарантии/warranty/g' -e 's/гарантировать/guarantee/g' $FILE

# In terms (3+ occurrences)
sed -i '' -e 's/во /in /g' $FILE

# Trust terms (3+ occurrences)
sed -i '' -e 's/веряйте/trust/g' -e 's/верим/believe/g' -e 's/верием/believe/g' -e 's/верифицируем/verify/g' -e 's/верифицированным/verified/g' -e 's/верификацию/verification/g' -e 's/веренного/verified/g' $FILE

# Options terms (3+ occurrences)
sed -i '' -e 's/варианты/options/g' $FILE

# Was terms (3+ occurrences)
sed -i '' -e 's/был/was/g' $FILE

# Safe terms (3+ occurrences)
sed -i '' -e 's/безопасные/safe/g' $FILE

# Audio terms (3+ occurrences)
sed -i '' -e 's/аудио/audio/g' $FILE

# Enhanced category (3+ occurrences)
sed -i '' -e 's/Улучшенные/Enhanced/g' $FILE

# Sum terms (3+ occurrences)
sed -i '' -e 's/Сумма/Amount/g' $FILE

# Term duration (3+ occurrences)
sed -i '' -e 's/Срок/Term/g' $FILE

# Compatibility (3+ occurrences)
sed -i '' -e 's/Совместимость/Compatibility/g' $FILE

# Fields (3+ occurrences)
sed -i '' -e 's/Поля/Fields/g' $FILE

# First (3+ occurrences)
sed -i '' -e 's/Перво/First/g' -e 's/первый/first/g' -e 's/первую/first/g' -e 's/первое/first/g' $FILE

# Tracking (3+ occurrences)
sed -i '' -e 's/Отслеживание/Tracking/g' $FILE

# Munich (3+ occurrences)
sed -i '' -e 's/Мюнхен/Munich/g' $FILE

# Calculator (3+ occurrences)
sed -i '' -e 's/Калькулятор/Calculator/g' -e 's/калькулятор/calculator/g' $FILE

# Records (3+ occurrences)
sed -i '' -e 's/Записи/Records/g' -e 's/записи/records/g' -e 's/записаться/register/g' $FILE

# Monthly (3+ occurrences)
sed -i '' -e 's/Ежемесячный/Monthly/g' -e 's/ежемесячный/monthly/g' $FILE

# Important (3+ occurrences)
sed -i '' -e 's/Важные/Important/g' $FILE

# Berlin (3+ occurrences)
sed -i '' -e 's/Берлин/Berlin/g' -e 's/Берлине/Berlin/g' $FILE

echo "Phase 4 completed"