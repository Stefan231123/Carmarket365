// Debug script to test Albanian translations
const { translate } = require('./shared/translations.ts');

console.log('Testing Albanian imprint translations:');
console.log('Title:', translate('sq', 'pages.imprint.title'));
console.log('Subtitle:', translate('sq', 'pages.imprint.subtitle'));
console.log('Legal Info Title:', translate('sq', 'pages.imprint.legalInfoTitle'));
console.log('Company Details Title:', translate('sq', 'pages.imprint.companyDetails.title'));
console.log('Business Address Title:', translate('sq', 'pages.imprint.businessAddress.title'));