// Direct Node.js test of translation function
console.log('Testing translation function...');

// We need to simulate the module environment 
// Let's check if the translation files can be imported

try {
    // Try to load the shared translations
    const fs = require('fs');
    const path = require('path');
    
    console.log('Checking translation files exist...');
    
    const sharedTranslationsPath = path.join(__dirname, 'shared', 'translations.ts');
    const mkTranslationsPath = path.join(__dirname, 'shared', 'translations', 'mk.ts');
    
    console.log('Shared translations exists:', fs.existsSync(sharedTranslationsPath));
    console.log('Macedonian translations exists:', fs.existsSync(mkTranslationsPath));
    
    if (fs.existsSync(mkTranslationsPath)) {
        const mkContent = fs.readFileSync(mkTranslationsPath, 'utf-8');
        
        // Check if specific keys exist
        console.log('\nChecking for specific keys in mk.ts:');
        console.log('Contains "sell: {":', mkContent.includes('sell: {'));
        console.log('Contains "steps: {":', mkContent.includes('steps: {'));
        console.log('Contains "vehicleType: \'Тип на возило\'":', mkContent.includes("vehicleType: 'Тип на возило'"));
        console.log('Contains "vehicleTypes: {":', mkContent.includes('vehicleTypes: {'));
        console.log('Contains "name: \'Автомобил\'":', mkContent.includes("name: 'Автомобил'"));
        console.log('Contains "vehicleTypeQuestion":', mkContent.includes('vehicleTypeQuestion'));
        console.log('Contains "Каков тип на возило":', mkContent.includes('Каков тип на возило'));
    }
    
} catch (error) {
    console.error('Error testing translations:', error.message);
}