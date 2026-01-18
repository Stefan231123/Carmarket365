// Test translation loading
const { mkTranslations } = require('./shared/translations/mk.ts');

console.log('=== TRANSLATION DEBUG TEST ===');
console.log('1. Does mkTranslations exist?', !!mkTranslations);

if (mkTranslations) {
  console.log('2. Does pages exist?', !!mkTranslations.pages);
  
  if (mkTranslations.pages) {
    console.log('3. Does pages.cookiePolicy exist?', !!mkTranslations.pages.cookiePolicy);
    
    if (mkTranslations.pages.cookiePolicy) {
      console.log('4. Cookie policy structure:', Object.keys(mkTranslations.pages.cookiePolicy));
      console.log('5. Title:', mkTranslations.pages.cookiePolicy.title);
      console.log('6. Essential exists?', !!mkTranslations.pages.cookiePolicy.essential);
      
      if (mkTranslations.pages.cookiePolicy.essential) {
        console.log('7. Essential items:', mkTranslations.pages.cookiePolicy.essential.items);
      }
    }
  }
}