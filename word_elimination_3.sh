#!/bin/bash

FILE="shared/translations/en.ts"

echo "Phase 3: 4+ frequency words..."

# Function and price terms (4+ occurrences)
sed -i '' -e 's/функциями/features/g' -e 's/функции/functions/g' -e 's/функцио/function/g' -e 's/функциям/features/g' $FILE
sed -i '' -e 's/цену/price/g' -e 's/цены/prices/g' -e 's/ценим/value/g' -e 's/ценовой/price/g' $FILE

# Enhanced terms (4+ occurrences)
sed -i '' -e 's/улучшенными/enhanced/g' -e 's/улучшенные/enhanced/g' -e 's/улучшенную/enhanced/g' -e 's/улучшенным/enhanced/g' -e 's/улучшенной/enhanced/g' -e 's/улучшенных/enhanced/g' $FILE

# Test terms (4+ occurrences)
sed -i '' -e 's/тест/test/g' $FILE

# Rate terms (4+ occurrences)
sed -i '' -e 's/ставки/rates/g' -e 's/ставка/rate/g' -e 's/ставок/rates/g' -e 's/ставляет/provides/g' -e 's/ставляются/provided/g' -e 's/ставлен/provided/g' -e 's/ставить/set/g' $FILE

# Vehicle condition terms (4+ occurrences)
sed -i '' -e 's/средств/vehicles/g' -e 's/состояние/condition/g' -e 's/состоянии/condition/g' -e 's/состояния/condition/g' -e 's/состояниями/conditions/g' $FILE

# Network terms (4+ occurrences)
sed -i '' -e 's/сеть/network/g' $FILE

# Series terms (4+ occurrences)
sed -i '' -e 's/серия/series/g' $FILE

# Solution terms (4+ occurrences)
sed -i '' -e 's/решениям/solutions/g' -e 's/решение/solution/g' $FILE

# Sales terms (4+ occurrences)
sed -i '' -e 's/продавца/seller/g' -e 's/продавец/seller/g' -e 's/продавцом/seller/g' -e 's/продавцами/sellers/g' $FILE

# Performance terms (4+ occurrences)
sed -i '' -e 's/производительности/performance/g' -e 's/производительным/high-performance/g' $FILE

# Platform terms (4+ occurrences)
sed -i '' -e 's/платформы/platform/g' -e 's/платформу/platform/g' -e 's/платформой/platform/g' -e 's/платформа/platform/g' -e 's/платформе/platform/g' $FILE

# Error terms (4+ occurrences)
sed -i '' -e 's/ошибок/errors/g' $FILE

# Basic terms (4+ occurrences)
sed -i '' -e 's/основе/basis/g' -e 's/Основные/Basic/g' -e 's/основные/basic/g' -e 's/осново/basic/g' $FILE

# Experience terms (4+ occurrences)
sed -i '' -e 's/опыт/experience/g' -e 's/опыта/experience/g' -e 's/опытом/experience/g' -e 's/опытного/experienced/g' $FILE

# Operation terms (4+ occurrences)
sed -i '' -e 's/операции/operations/g' -e 's/операций/operations/g' $FILE

# Service terms (4+ occurrences)
sed -i '' -e 's/обслуживающий/service/g' $FILE

# Processing terms (4+ occurrences)
sed -i '' -e 's/обраб/process/g' $FILE

# Help terms (4+ occurrences)
sed -i '' -e 's/мочь/help/g' $FILE

# Location terms (4+ occurrences)
sed -i '' -e 's/место/place/g' $FILE

# Additional terms (4+ occurrences)
sed -i '' -e 's/лнители/additional/g' $FILE

# Analysis terms (4+ occurrences)
sed -i '' -e 's/лиз/analysis/g' $FILE

# Card terms (4+ occurrences)
sed -i '' -e 's/карточки/cards/g' -e 's/карточка/card/g' $FILE

# History terms (4+ occurrences)
sed -i '' -e 's/истории/history/g' $FILE

# Information terms (4+ occurrences)
sed -i '' -e 's/информация/information/g' -e 's/информацию/information/g' -e 's/информации/information/g' $FILE

# Instinct terms (4+ occurrences)
sed -i '' -e 's/инстинктам/instincts/g' $FILE

# Task terms (4+ occurrences)
sed -i '' -e 's/зад/task/g' $FILE

# Other terms (4+ occurrences)
sed -i '' -e 's/друга/other/g' -e 's/другу/other/g' -e 's/другими/others/g' $FILE

# Design terms (4+ occurrences)
sed -i '' -e 's/дизайн/design/g' $FILE

# When terms (4+ occurrences)
sed -i '' -e 's/гда/when/g' $FILE

# Meet terms (4+ occurrences)
sed -i '' -e 's/встречайтесь/meet/g' -e 's/встречу/meeting/g' -e 's/встречи/meetings/g' -e 's/встречаться/meet/g' -e 's/встретиться/meet/g' $FILE

# Fast terms (4+ occurrences)
sed -i '' -e 's/быстро/quickly/g' -e 's/быстрый/fast/g' -e 's/быстрого/fast/g' -e 's/быстрее/faster/g' $FILE

# Add terms (4+ occurrences)
sed -i '' -e 's/бавьте/add/g' -e 's/бавлен/added/g' $FILE

# Address terms (4+ occurrences)
sed -i '' -e 's/адресу/address/g' -e 's/адрес/address/g' $FILE

# Fleet terms (4+ occurrences)
sed -i '' -e 's/автопарков/fleets/g' $FILE

# For location (4+ occurrences)
sed -i '' -e 's/ С / With /g' -e 's/^С /With /g' $FILE

# Calculate terms (4+ occurrences)
sed -i '' -e 's/Рассчитать/Calculate/g' $FILE

# Verified terms (4+ occurrences)
sed -i '' -e 's/Проверен/Verified/g' -e 's/проверен/verified/g' -e 's/проверены/verified/g' -e 's/проверенных/verified/g' $FILE

# Report terms (4+ occurrences)
sed -i '' -e 's/Отч/Report/g' $FILE

# Not terms (4+ occurrences)
sed -i '' -e 's/Не /Not /g' -e 's/ Не / Not /g' $FILE

# For terms (4+ occurrences)
sed -i '' -e 's/За /For /g' -e 's/ За / For /g' $FILE

# Leading terms (4+ occurrences)
sed -i '' -e 's/Ведущий/Leading/g' $FILE

echo "Phase 3 completed"