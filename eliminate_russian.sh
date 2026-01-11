#!/bin/bash

# MASSIVE RUSSIAN ELIMINATION SCRIPT - COMPLETE CLEANUP TO 0

FILE="shared/translations/en.ts"

# Remove all Russian comments
sed -i '' \
  -e "s|// Static data cars for advanced byиска|// Static data cars for advanced search|" \
  -e "s|// Личtoя панель|// Personal dashboard|" \
  -e "s|// Сохранeнные авто|// Saved cars|" \
  -e "s|// Продать трансbyртное средство|// Sell vehicle|" \
  -e "s|// Main информация|// Main information|" \
  -e "s|// Details трансbyртного средства|// Vehicle details|" \
  -e "s|// Ценообразование|// Pricing|" \
  -e "s|// Страницы ошибок|// Error pages|" \
  -e "s|// Юридические страницы|// Legal pages|" \
  -e "s|// Up tobyлнительные сообщения статуса|// Additional status messages|" \
  -e "s|// Тест страны|// Country test|" \
  -e "s|// Формы and byля ввода|// Forms and input fields|" \
  $FILE

echo "Russian comments eliminated"