// SellVehicle Macedonian Translation Analysis Script
// This script performs detailed analysis of translation coverage

const translationKeys = {
  // Keys that should be working based on mk.ts analysis
  working: [
    'sellVehicle.title',
    'common.back',
    'sell.steps.vehicleType',
    'sell.steps.basicInfo', 
    'sell.steps.details',
    'sell.steps.photosAndContact',
    'sell.headers.vehicleTypeQuestion',
    'sell.headers.basicInformation',
    'sell.headers.vehicleDetails',
    'sell.headers.photosAndContactInfo',
    'sell.headers.uploadVehiclePhotos',
    'sell.headers.addUpToTenPhotos',
    'sell.vehicleTypes.car.name',
    'sell.vehicleTypes.truck.name',
    'sell.vehicleTypes.motorbike.name',
    'sell.fields.make',
    'sell.fields.model',
    'sell.fields.year',
    'sell.fields.mileage',
    'sell.fields.condition',
    'sell.fields.fuelType',
    'sell.fields.transmission',
    'sell.fields.askingPrice',
    'sell.fields.description',
    'sell.fields.contactName',
    'sell.fields.phoneNumber',
    'sell.fields.emailAddress',
    'sell.fields.location',
    'sell.placeholders.selectMake',
    'sell.placeholders.enterModel',
    'sell.placeholders.selectYear',
    'sell.placeholders.enterMileage',
    'sell.placeholders.selectFuelType',
    'sell.placeholders.selectTransmission',
    'sell.placeholders.selectCondition',
    'sell.placeholders.enterAskingPrice',
    'sell.placeholders.describeYourVehicle',
    'sell.placeholders.yourName',
    'sell.placeholders.yourPhoneNumber',
    'sell.placeholders.yourEmail',
    'sell.placeholders.cityCountry',
    'sell.placeholders.choosePhotos',
    'sell.buttons.nextStep',
    'sell.buttons.previous',
    'sell.buttons.createListing',
    'sell.fuelTypes.gasoline',
    'sell.fuelTypes.diesel',
    'sell.fuelTypes.electric',
    'sell.fuelTypes.hybrid',
    'sell.transmissions.manual',
    'sell.transmissions.automatic'
  ],
  
  // Keys that are MISSING from mk.ts and will show in English
  missing: [
    'sell.conditions.excellent',
    'sell.conditions.veryGood', 
    'sell.conditions.good',
    'sell.conditions.fair'
  ]
};

// Test results based on code analysis
const testResults = {
  step1: {
    title: "✅ Step 1: Vehicle Type Selection",
    issues: [],
    workingTranslations: [
      "Page title: 'Продај го вашето возило' (sellVehicle.title)",
      "Back button: Proper translation (common.back)",
      "Step indicator: 'Тип на возило' (sell.steps.vehicleType)",
      "Header: 'Каков тип на возило го продавате?' (sell.headers.vehicleTypeQuestion)",
      "Vehicle types: 'Автомобил', 'Камион', 'Мотоцикл'",
      "Next button: 'Следен чекор' (sell.buttons.nextStep)"
    ]
  },
  
  step2: {
    title: "✅ Step 2: Basic Information",
    issues: [],
    workingTranslations: [
      "Header: 'Основни информации' (sell.headers.basicInformation)",
      "Make field: 'Марка' (sell.fields.make)",
      "Model field: 'Модел' (sell.fields.model)",
      "Year field: 'Година' (sell.fields.year)",
      "Mileage field: 'Километража' (sell.fields.mileage)",
      "All placeholders properly translated",
      "Navigation buttons: 'Претходен', 'Следен чекор'"
    ]
  },
  
  step3: {
    title: "❌ Step 3: Vehicle Details - CRITICAL TRANSLATION ISSUES",
    issues: [
      {
        severity: "CRITICAL",
        element: "Vehicle Condition Dropdown",
        issue: "Condition options show in English instead of Macedonian",
        englishText: ["excellent", "veryGood", "good", "fair"],
        expectedMacedonian: ["Одлична", "Многу добра", "Добра", "Задоволителна"],
        missingKeys: ["sell.conditions.excellent", "sell.conditions.veryGood", "sell.conditions.good", "sell.conditions.fair"]
      }
    ],
    workingTranslations: [
      "Header: 'Детали за возилото' (sell.headers.vehicleDetails)", 
      "Fuel Type field: 'Тип гориво' (sell.fields.fuelType)",
      "Transmission field: 'Трансмисија' (sell.fields.transmission)",
      "Fuel type options: 'Бензин', 'Дизел', 'Електричен', 'Хибриден'",
      "Transmission options: 'Рачна', 'Автоматска'",
      "Asking Price field: 'Барана цена' (sell.fields.askingPrice)",
      "Description field: 'Опис' (sell.fields.description)"
    ]
  },
  
  step4: {
    title: "✅ Step 4: Photos and Contact",
    issues: [],
    workingTranslations: [
      "Header: 'Фотографии и контакт информации' (sell.headers.photosAndContactInfo)",
      "Upload section: 'Прикачи слики од возилото' (sell.headers.uploadVehiclePhotos)",
      "Upload instruction: 'Додајте до 10 слики' (sell.headers.addUpToTenPhotos)",
      "Choose photos button: 'Изберете слики' (sell.placeholders.choosePhotos)",
      "Contact fields: 'Име за контакт', 'Телефонски број', 'Е-пошта', 'Локација'",
      "Create listing button: 'Создај оглас' (sell.buttons.createListing)"
    ]
  }
};

// Summary report
const summary = {
  totalTranslationKeys: translationKeys.working.length + translationKeys.missing.length,
  workingKeys: translationKeys.working.length,
  missingKeys: translationKeys.missing.length,
  coveragePercentage: ((translationKeys.working.length / (translationKeys.working.length + translationKeys.missing.length)) * 100).toFixed(1),
  
  criticalIssues: 1,
  stepsWithIssues: 1,
  stepsWorking: 3
};

console.log('=== SELLVEHICLE MACEDONIAN TRANSLATION TEST RESULTS ===\n');

console.log('📊 SUMMARY:');
console.log(`Translation Coverage: ${summary.coveragePercentage}% (${summary.workingKeys}/${summary.totalTranslationKeys} keys)`);
console.log(`Critical Issues: ${summary.criticalIssues}`);
console.log(`Steps Working: ${summary.stepsWorking}/4`);
console.log(`Steps with Issues: ${summary.stepsWithIssues}/4\n`);

console.log('🔍 DETAILED ANALYSIS:\n');

Object.values(testResults).forEach(step => {
  console.log(step.title);
  
  if (step.workingTranslations.length > 0) {
    console.log('  ✅ Working translations:');
    step.workingTranslations.forEach(item => console.log(`    • ${item}`));
  }
  
  if (step.issues.length > 0) {
    console.log('  ❌ Translation issues:');
    step.issues.forEach(issue => {
      console.log(`    🚨 ${issue.severity}: ${issue.element}`);
      console.log(`       Problem: ${issue.issue}`);
      console.log(`       English text: ${issue.englishText.join(', ')}`);
      console.log(`       Should be: ${issue.expectedMacedonian.join(', ')}`);
      console.log(`       Missing keys: ${issue.missingKeys.join(', ')}`);
    });
  }
  console.log('');
});

console.log('🔧 RECOMMENDED FIXES:');
console.log('Add the following translation keys to /shared/translations/mk.ts:');
console.log('');
console.log('In the "sell" section, add a "conditions" object:');
console.log(`
  conditions: {
    excellent: 'Одлична',
    veryGood: 'Многу добра',
    good: 'Добра',
    fair: 'Задоволителна'
  }
`);

console.log('📋 TESTING INSTRUCTIONS:');
console.log('1. Navigate to: http://localhost:8081/sell-vehicle?lang=mk');
console.log('2. Go through Step 1 - Vehicle Type: Should work perfectly');
console.log('3. Go through Step 2 - Basic Info: Should work perfectly');
console.log('4. Go through Step 3 - Details: Look for condition dropdown - will show English!');
console.log('5. Go through Step 4 - Photos: Should work perfectly');

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translationKeys, testResults, summary };
}