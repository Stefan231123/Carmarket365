#!/bin/bash

FILE="shared/translations/en.ts"

echo "Converting all content to English..."

# Common UI terms
sed -i '' \
-e "s/'Загрузка...'/'Loading...'/" \
-e "s/'Ошибка'/'Error'/" \
-e "s/'Повторить'/'Retry'/" \
-e "s/'Закрыть'/'Close'/" \
-e "s/'Отмена'/'Cancel'/" \
-e "s/'Подтвердить'/'Confirm'/" \
-e "s/'Продолжить'/'Continue'/" \
-e "s/'Назад'/'Back'/" \
-e "s/'Далее'/'Next'/" \
-e "s/'Предыдущий'/'Previous'/" \
-e "s/'Поиск'/'Search'/" \
-e "s/'Фильтр'/'Filter'/" \
-e "s/'Очистить'/'Clear'/" \
-e "s/'Сохранить'/'Save'/" \
-e "s/'Редактировать'/'Edit'/" \
-e "s/'Удалить'/'Delete'/" \
-e "s/'Добавить'/'Add'/" \
-e "s/'Просмотр'/'View'/" \
-e "s/'Контакт'/'Contact'/" \
$FILE

echo "Basic UI terms converted"

# After that, run our character-by-character replacement for any remaining Cyrillic
./safe_final_elimination.sh

echo "Full English conversion completed"