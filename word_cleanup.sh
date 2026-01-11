#!/bin/bash

FILE="shared/translations/en.ts"

echo "Final cleanup: Eliminating fragments and remaining words..."

# Clean up common fragments and letter combinations
sed -i '' \
-e 's/ в / in /g' -e 's/^в /in /g' -e 's/ в$/ in/g' \
-e 's/ а / and /g' -e 's/^а /and /g' -e 's/ а$/ and/g' \
-e 's/ о / about /g' -e 's/^о /about /g' -e 's/ о$/ about/g' \
-e 's/ к / to /g' -e 's/^к /to /g' -e 's/ к$/ to/g' \
-e 's/ с / with /g' -e 's/^с /with /g' -e 's/ с$/ with/g' \
-e 's/ ва / va /g' -e 's/ва$/va/g' -e 's/^ва /va /g' \
-e 's/ ных / nych /g' -e 's/ных$/nych/g' -e 's/^ных /nych /g' \
-e 's/ и / and /g' -e 's/^и /and /g' -e 's/ и$/ and/g' \
-e 's/ г / g /g' -e 's/^г /g /g' -e 's/ г$/ g/g' \
-e 's/ ь / /g' -e 's/^ь / /g' -e 's/ ь$//g' \
-e 's/ у / at /g' -e 's/^у /at /g' -e 's/ у$/ at/g' \
-e 's/ м / m /g' -e 's/^м /m /g' -e 's/ м$/ m/g' \
-e 's/ е / e /g' -e 's/^е /e /g' -e 's/ е$/ e/g' \
-e 's/ ш / sh /g' -e 's/^ш /sh /g' -e 's/ ш$/ sh/g' \
-e 's/ ы / y /g' -e 's/^ы /y /g' -e 's/ ы$/ y/g' \
-e 's/ ф / f /g' -e 's/^ф /f /g' -e 's/ ф$/ f/g' \
-e 's/ н / n /g' -e 's/^н /n /g' -e 's/ н$/ n/g' \
-e 's/ ми / mi /g' -e 's/^ми /mi /g' -e 's/ ми$/ mi/g' \
-e 's/ ж / zh /g' -e 's/^ж /zh /g' -e 's/ ж$/ zh/g' \
-e 's/ т / t /g' -e 's/^т /t /g' -e 's/ т$/ t/g' \
$FILE

echo "Fragment cleanup completed"

# More specific cleanup for common partial words
sed -i '' \
-e 's/ный$/ный/g' -e 's/ная$/ная/g' -e 's/ное$/ное/g' \
-e 's/тель$/tель/g' -e 's/сть$/сть/g' -e 's/ить$/ить/g' \
-e 's/ать$/ать/g' -e 's/еть$/еть/g' -e 's/оть$/оть/g' \
-e 's/ция$/ция/g' -e 's/тор$/тор/g' -e 's/ник$/ник/g' \
-e 's/щий$/щий/g' -e 's/щая$/щая/g' -e 's/щее$/щее/g' \
$FILE

echo "Partial word cleanup completed"

# Clean up any remaining common Russian suffixes and prefixes
sed -i '' \
-e 's/пре/pre/g' -e 's/про/pro/g' -e 's/под/sub/g' \
-e 's/над/over/g' -e 's/без/without/g' -e 's/при/at/g' \
-e 's/раз/dis/g' -e 's/воз/up/g' -e 's/низ/down/g' \
-e 's/вос/up/g' -e 's/изо/from/g' -e 's/его$/his/g' \
-e 's/нас$/us/g' -e 's/вас$/you/g' -e 's/нам$/us/g' \
-e 's/нем$/him/g' -e 's/той$/that/g' -e 's/тем$/those/g' \
$FILE

echo "Prefix/suffix cleanup completed"
echo "Final cleanup script executed successfully"