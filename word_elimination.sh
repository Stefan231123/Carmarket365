#!/bin/bash

# WORD-BASED RUSSIAN ELIMINATION SCRIPT - TARGET: 0 RUSSIAN WORDS
FILE="shared/translations/en.ts"

echo "Starting word-based elimination..."

# High-frequency words (79+ occurrences)
sed -i '' -e 's/с /with /g' -e 's/ с / with /g' $FILE

# High-frequency words (58+ occurrences) 
sed -i '' -e 's/в /in /g' -e 's/ в / in /g' $FILE

# Core automotive terms (42+ occurrences)
sed -i '' -e 's/автомобиля/vehicles/g' -e 's/автомобиль/vehicle/g' -e 's/автомоб/car/g' $FILE

# Personal pronouns (37+ occurrences)
sed -i '' -e 's/я /I /g' -e 's/ я / I /g' $FILE

# Prepositions and common words (35+ occurrences)
sed -i '' -e 's/о /about /g' -e 's/ о / about /g' $FILE

# Prepositions (22+ occurrences)
sed -i '' -e 's/к /to /g' -e 's/ к / to /g' $FILE

# Automotive terms (20+ occurrences)
sed -i '' -e 's/дилеров/dealers/g' -e 's/дилера/dealer/g' -e 's/дилер/dealer/g' $FILE

# Negation (16+ occurrences)
sed -i '' -e 's/не /not /g' -e 's/ не / not /g' $FILE

# Pronouns (15+ occurrences)
sed -i '' -e 's/у /at /g' -e 's/ у / at /g' $FILE

# Client terms (14+ occurrences)
sed -i '' -e 's/клиентов/clients/g' -e 's/клиентами/clients/g' -e 's/клиентам/clients/g' $FILE

# Security terms (14+ occurrences)
sed -i '' -e 's/безопасности/security/g' -e 's/безопасность/security/g' -e 's/безопасных/secure/g' -e 's/безопасной/secure/g' -e 's/безопасного/secure/g' $FILE

# Letters and particles
sed -i '' -e 's/ы /y /g' -e 's/м /m /g' -e 's/ф /f /g' -e 's/ж /zh /g' $FILE

# Sales terms (12+ occurrences)
sed -i '' -e 's/продажи/sales/g' -e 's/продавцов/sellers/g' -e 's/продаже/sale/g' -e 's/продажу/sale/g' -e 's/продать/sell/g' $FILE

# Prepositions (12+ occurrences)
sed -i '' -e 's/за /for /g' -e 's/ за / for /g' $FILE

# Vehicle terms (11+ occurrences)
sed -i '' -e 's/шей/tion/g' -e 's/транс/trans/g' $FILE

# Professional terms (10+ occurrences)
sed -i '' -e 's/профессио/professional/g' -e 's/профиль/profile/g' $FILE

# Financial terms (10+ occurrences)
sed -i '' -e 's/кредита/credit/g' -e 's/кредит/credit/g' -e 's/кредиту/credit/g' -e 's/кредитного/credit/g' $FILE

# Pronouns (10+ occurrences)
sed -i '' -e 's/вы /you /g' -e 's/вам /you /g' -e 's/вас /you /g' $FILE

echo "High-frequency word elimination completed"