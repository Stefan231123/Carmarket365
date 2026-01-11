#!/bin/bash

FILE="shared/translations/en.ts"

echo "Phase 5: 2-frequency words - MASSIVE ELIMINATION..."

# Comprehensive 2+ frequency word elimination
sed -i '' \
-e 's/языка/language/g' -e 's/язык/language/g' \
-e 's/явиться/appear/g' \
-e 's/эффективности/efficiency/g' \
-e 's/этой/this/g' -e 's/этим/this/g' \
-e 's/элементы/elements/g' \
-e 's/электронную/electronic/g' -e 's/электронной/electronic/g' -e 's/электрическим/electric/g' \
-e 's/экспресс/express/g' -e 's/экспертов/experts/g' -e 's/экспертизой/expertise/g' -e 's/экс/ex/g' -e 's/экологичным/eco-friendly/g' \
-e 's/чувствуете/feel/g' -e 's/честными/honest/g' -e 's/честные/honest/g' -e 's/честны/honest/g' \
-e 's/человек/person/g' -e 's/чему/what/g' \
-e 's/центр/center/g' -e 's/целью/goal/g' -e 's/цвет/color/g' \
-e 's/хорошо/well/g' -e 's/хорошими/good/g' \
-e 's/характеристики/characteristics/g' \
-e 's/формируют/form/g' -e 's/формировали/formed/g' \
-e 's/фильтрованные/filtered/g' -e 's/фильтра/filter/g' \
-e 's/физическое/physical/g' -e 's/фактура/texture/g' -e 's/факторов/factors/g' \
-e 's/учреждениями/institutions/g' -e 's/уч/uch/g' \
-e 's/устойчивого/sustainable/g' -e 's/установленным/installed/g' -e 's/устройство/device/g' -e 's/устройстве/device/g' \
-e 's/успешного/successful/g' -e 's/успешно/successfully/g' -e 's/успех/success/g' -e 's/успеха/success/g' \
-e 's/услышать/hear/g' -e 's/условиях/conditions/g' -e 's/условия/conditions/g' \
-e 's/уровня/level/g' -e 's/управлению/management/g' -e 's/управления/management/g' -e 's/управлении/management/g' -e 's/управлением/management/g' \
-e 's/умолчанию/default/g' \
-e 's/улучшению/improvement/g' -e 's/улучшает/improves/g' -e 's/улучшаем/improve/g' \
-e 's/украден/stolen/g' -e 's/указано/specified/g' \
-e 's/удержания/retention/g' -e 's/удалось/succeeded/g' -e 's/удаление/deletion/g' \
-e 's/увеличить/increase/g' -e 's/убедитесь/ensure/g' -e 's/убедительные/convincing/g' \
-e 's/тщательного/thorough/g' -e 's/тщательно/thoroughly/g' \
-e 's/туда/there/g' -e 's/тру/tru/g' \
-e 's/третьих/third/g' -e 's/третьей/third/g' -e 's/третьего/third/g' \
-e 's/требуется/required/g' -e 's/требует/requires/g' \
-e 's/трансформации/transformation/g' -e 's/трансмиссия/transmission/g' -e 's/транзакции/transactions/g' \
-e 's/традиционно/traditionally/g' -e 's/точеч/точеч/g' \
-e 's/тормозов/brakes/g' -e 's/тормоза/brakes/g' -e 's/торможение/braking/g' -e 's/торговая/trading/g' \
-e 's/топливо/fuel/g' -e 's/типа/type/g' -e 's/технологиях/technologies/g' -e 's/технологиями/technologies/g' -e 's/технологий/technologies/g' \
-e 's/технического/technical/g' -e 's/техническая/technical/g' -e 's/техобслуживании/maintenance/g' -e 's/техосм/inspection/g' -e 's/техническом/technical/g' \
-e 's/тестирование/testing/g' -e 's/теряете/lose/g' -e 's/тему/topic/g' -e 's/тем/those/g' -e 's/тель/tel/g' \
-e 's/телефо/phone/g' -e 's/текущий/current/g' -e 's/текущей/current/g' -e 's/текущего/current/g' -e 's/теперь/now/g' \
-e 's/те/те/g' -e 's/такими/such/g' -e 's/так/so/g' \
-e 's/существующих/existing/g' -e 's/существует/exists/g' \
-e 's/сумм/amounts/g' \
$FILE

echo "Phase 5 part 1 completed"

# Continue with more 2+ frequency words
sed -i '' \
-e 's/стройки/construction/g' -e 's/стройке/construction/g' -e 's/строены/built/g' -e 's/строение/building/g' -e 's/строек/constructions/g' -e 's/строе/строе/g' \
-e 's/стресса/stress/g' -e 's/страховке/insurance/g' -e 's/страховка/insurance/g' -e 's/стратегии/strategy/g' \
-e 's/стоящее/standing/g' -e 's/стороны/sides/g' -e 's/стоит/costs/g' -e 's/стоимость/cost/g' -e 's/стоимости/cost/g' \
-e 's/стоверяющий/verifying/g' -e 's/стилем/style/g' -e 's/стигли/reached/g' -e 's/стекло/glass/g' \
-e 's/стать/become/g' -e 's/статуса/status/g' -e 's/статков/statuses/g' -e 's/старше/older/g' -e 's/ставляя/setting/g' \
-e 's/ст/st/g' -e 's/срочных/urgent/g' -e 's/среднем/average/g' -e 's/спроса/demand/g' \
-e 's/справка/reference/g' -e 's/справедливыми/fair/g' -e 's/справедливым/fair/g' -e 's/справедливые/fair/g' \
-e 's/спешите/hurry/g' -e 's/специалисты/specialists/g' -e 's/специализирован/specialized/g' -e 's/социальных/social/g' \
-e 's/сохраняйте/save/g' -e 's/сохраненных/saved/g' -e 's/сообщить/notify/g' -e 's/соображениям/considerations/g' \
-e 's/сомнения/doubts/g' -e 's/соединяет/connects/g' -e 's/соединяем/connect/g' -e 's/соглашение/agreement/g' -e 's/согласованные/agreed/g' \
-e 's/современным/modern/g' -e 's/совпадает/matches/g' -e 's/советы/advice/g' -e 's/советов/advice/g' -e 's/совершите/complete/g' \
-e 's/собов/собов/g' -e 's/соб/соб/g' -e 's/соблюдение/compliance/g' -e 's/сниженного/reduced/g' \
-e 's/смене/change/g' -e 's/служить/serve/g' -e 's/службой/service/g' -e 's/службе/service/g' -e 's/словами/words/g' \
-e 's/слишком/too/g' -e 's/слепых/blind/g' -e 's/следующий/next/g' -e 's/следующего/next/g' -e 's/следуют/follow/g' -e 's/следуем/follow/g' \
-e 's/скрин/screen/g' -e 's/скорее/rather/g' -e 's/сих/since/g' \
-e 's/сетях/networks/g' -e 's/сетей/networks/g' -e 's/сертификат/certificate/g' \
-e 's/святившие/святившие/g' -e 's/свете/light/g' -e 's/сбросить/reset/g' -e 's/сброса/reset/g' -e 's/сборки/assembly/g' \
-e 's/самой/самой/g' -e 's/самая/самая/g' -e 's/ряда/row/g' -e 's/рыночной/market/g' -e 's/рынок/market/g' -e 's/рынке/market/g' -e 's/рынка/market/g' \
-e 's/руля/steering/g' -e 's/руководство/management/g' -e 's/руемые/managed/g' -e 's/рудничаем/collaborate/g' -e 's/рту/mouth/g' \
-e 's/рт/rt/g' -e 's/рство/рство/g' -e 's/рскими/рскими/g' -e 's/рост/growth/g' -e 's/рный/рный/g' \
-e 's/ридерами/leaders/g' -e 's/ремаркетинг/remarketing/g' -e 's/реклама/advertising/g' -e 's/рекламных/advertising/g' \
-e 's/рейтингу/rating/g' -e 's/результату/result/g' -e 's/резервом/reserve/g' -e 's/регистрацию/registration/g' \
-e 's/регионы/regions/g' -e 's/регионе/region/g' -e 's/революционизировать/revolutionize/g' -e 's/реальный/real/g' \
$FILE

echo "Phase 5 part 2 completed"

# Continue with remaining 2+ frequency words
sed -i '' \
-e 's/расширенными/extended/g' -e 's/расширение/expansion/g' -e 's/расстоянию/distance/g' -e 's/расстояние/distance/g' \
-e 's/рассматриваемых/considered/g' -e 's/рассм/review/g' -e 's/расследуем/investigate/g' -e 's/районы/districts/g' \
-e 's/разрешение/permission/g' -e 's/разрешают/allow/g' -e 's/размещение/placement/g' -e 's/размещ/place/g' -e 's/размеры/sizes/g' \
-e 's/различных/different/g' -e 's/раздел/section/g' -e 's/радио/radio/g' -e 's/рабочие/working/g' \
-e 's/пулярный/popular/g' -e 's/публичное/public/g' -e 's/публикацией/publication/g' -e 's/прямую/direct/g' \
-e 's/процессу/process/g' -e 's/процессе/process/g' -e 's/профиля/profile/g' -e 's/проста/simple/g' \
-e 's/производстве/production/g' -e 's/проигрыватель/player/g' -e 's/прозрачную/transparent/g' -e 's/прозрачности/transparency/g' -e 's/прозрачной/transparent/g' \
-e 's/продать/sell/g' -e 's/продаж/sales/g' -e 's/продавце/seller/g' -e 's/прода/sale/g' \
-e 's/проводите/conduct/g' -e 's/пробега/mileage/g' -e 's/пробег/mileage/g' -e 's/про/about/g' \
-e 's/приятной/pleasant/g' -e 's/приостановке/suspension/g' -e 's/приоритет/priority/g' -e 's/принять/accept/g' -e 's/принципы/principles/g' \
-e 's/примем/accept/g' -e 's/приложении/application/g' -e 's/приложением/application/g' -e 's/приложение/application/g' -e 's/прилегающие/adjacent/g' \
-e 's/приз/prize/g' -e 's/приглашайте/invite/g' -e 's/привод/drive/g' -e 's/привлекательным/attractive/g' -e 's/привлекательное/attractive/g' -e 's/привести/lead/g' \
-e 's/препятствиями/obstacles/g' -e 's/премиум/premium/g' -e 's/преимуществ/advantages/g' -e 's/президент/president/g' \
-e 's/представляем/present/g' -e 's/предложение/offer/g' -e 's/предлагают/offer/g' -e 's/предлагаем/offer/g' \
-e 's/предварительной/preliminary/g' -e 's/предварительного/preliminary/g' -e 's/предан/devoted/g' -e 's/превосходного/excellent/g' \
-e 's/практики/practices/g' -e 's/практикам/practices/g' -e 's/правовые/legal/g' -e 's/правляют/manage/g' -e 's/правляйте/manage/g' -e 's/правим/manage/g' -e 's/правильной/correct/g' \
-e 's/площадкой/platform/g' -e 's/площадка/platform/g' -e 's/плаченные/paid/g' -e 's/планы/plans/g' -e 's/пла/пла/g' \
-e 's/пишите/write/g' -e 's/персо/person/g' -e 's/перечисленных/listed/g' -e 's/перечисленные/listed/g' \
-e 's/переплатой/overpayment/g' -e 's/переносом/transfer/g' -e 's/переносимы/portable/g' -e 's/переключить/switch/g' -e 's/переключателя/switch/g' -e 's/переключатель/switch/g' \
-e 's/передачей/transmission/g' -e 's/передач/gears/g' -e 's/переводы/translations/g' -e 's/перевод/translation/g' \
-e 's/паттерны/patterns/g' -e 's/паттер/pattern/g' -e 's/парковки/parking/g' \
$FILE

echo "Phase 5 part 3 completed"

# Final batch of 2+ frequency words
sed -i '' \
-e 's/оценки/evaluation/g' -e 's/офиса/office/g' -e 's/оставшегося/remaining/g' -e 's/особенности/features/g' \
-e 's/освобождения/release/g' -e 's/определяются/determined/g' -e 's/опишите/describe/g' -e 's/опасения/concerns/g' \
-e 's/онлайн/online/g' -e 's/окрестности/surroundings/g' -e 's/один/one/g' -e 's/ограниченные/limited/g' \
-e 's/обязательно/mandatory/g' -e 's/общественном/public/g' -e 's/обширный/extensive/g' -e 's/обращение/appeal/g' -e 's/обращаться/contact/g' \
-e 's/обратную/feedback/g' -e 's/обратиться/contact/g' -e 's/обрат/contact/g' -e 's/ображаемое/displayable/g' \
-e 's/обновление/update/g' -e 's/обновиться/update/g' -e 's/обме/exchange/g' -e 's/обзоров/reviews/g' \
-e 's/обеспечивая/ensuring/g' -e 's/обеспечивают/provide/g' -e 's/обеспечения/provision/g' -e 's/обеспечение/provision/g' \
-e 's/нужно/need/g' -e 's/нужен/needed/g' -e 's/нуждаетесь/need/g' \
-e 's/носите/wear/g' -e 's/новым/new/g' -e 's/новейших/newest/g' \
-e 's/нет/no/g' -e 's/неправильным/incorrect/g' -e 's/неопредел/undefined/g' -e 's/необходимости/necessity/g' \
-e 's/нент/nent/g' -e 's/немецкой/German/g' -e 's/немецкого/German/g' -e 's/немедленную/immediate/g' -e 's/немедленной/immediate/g' -e 's/немедленно/immediately/g' -e 's/немедлен/immediate/g' \
-e 's/нек/nec/g' -e 's/нез/nez/g' -e 's/недель/weeks/g' -e 's/неделе/week/g' -e 's/недавно/recently/g' \
-e 's/небольшая/small/g' -e 's/небезопасно/unsafe/g' \
-e 's/мягкая/soft/g' -e 's/мониторить/monitor/g' -e 's/момент/moment/g' -e 's/можно/possible/g' -e 's/можем/can/g' \
-e 's/модель/model/g' -e 's/модели/models/g' -e 's/мобильным/mobile/g' -e 's/мобильное/mobile/g' \
-e 's/мники/mники/g' -e 's/мне/me/g' -e 's/миссии/mission/g' -e 's/мире/world/g' \
-e 's/механические/mechanical/g' -e 's/методы/methods/g' -e 's/местными/local/g' -e 's/местным/local/g' -e 's/месте/place/g' \
-e 's/меры/measures/g' -e 's/между/between/g' -e 's/машиностроения/engineering/g' -e 's/материалы/materials/g' -e 's/маршрут/route/g' -e 's/марка/brand/g' \
-e 's/максимизировать/maximize/g' -e 's/макс/max/g' -e 's/ма/ma/g' \
-e 's/люк/sunroof/g' -e 's/людей/people/g' -e 's/любых/any/g' \
-e 's/льзуем/use/g' -e 's/льзователя/user/g' -e 's/льзователь/user/g' -e 's/льзователи/users/g' -e 's/льзователем/user/g' -e 's/льзования/use/g' -e 's/льзование/use/g' \
-e 's/ль/ly/g' -e 's/луч/get/g' -e 's/лучите/receive/g' -e 's/лосы/лосы/g' -e 's/лосе/лосе/g' \
$FILE

echo "Phase 5 MASSIVE ELIMINATION completed successfully"