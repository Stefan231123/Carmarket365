#!/usr/bin/env python3

import re
import json

def read_file(filepath):
    """Read and return file content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def parse_translation_keys(content):
    """Parse translation file and extract all dot-notation keys"""
    # Remove the outer export structure to get just the object
    export_match = re.search(r'export const \w+Translations: TranslationStrings = ({.*});', content, re.DOTALL)
    if not export_match:
        raise ValueError("Could not find translation object")
    
    object_content = export_match.group(1)
    
    # Remove comments
    object_content = re.sub(r'//.*?\n', '\n', object_content)
    object_content = re.sub(r'/\*.*?\*/', '', object_content, flags=re.DOTALL)
    
    keys = set()
    
    def extract_keys_recursive(text, prefix=''):
        """Recursively extract keys from nested object structure"""
        
        # Find property definitions
        prop_pattern = r'^\s*(\w+):\s*(.+?)(?=,?\s*(?:\w+:|$|\}))'
        
        lines = text.split('\n')
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            # Match property definitions
            prop_match = re.match(r'^\s*(\w+):\s*(.+)', line)
            if prop_match:
                prop_name = prop_match.group(1)
                prop_value = prop_match.group(2)
                
                current_key = f"{prefix}.{prop_name}" if prefix else prop_name
                
                # If it starts with {, it's an object
                if prop_value.strip().startswith('{'):
                    # Find the matching closing brace
                    brace_count = 0
                    obj_content = ""
                    j = i
                    
                    while j < len(lines):
                        current_line = lines[j]
                        obj_content += current_line + '\n'
                        
                        for char in current_line:
                            if char == '{':
                                brace_count += 1
                            elif char == '}':
                                brace_count -= 1
                                if brace_count == 0:
                                    # Extract the object content between braces
                                    obj_inner = obj_content[obj_content.find('{')+1:obj_content.rfind('}')]
                                    extract_keys_recursive(obj_inner, current_key)
                                    i = j
                                    break
                        
                        if brace_count == 0:
                            break
                        j += 1
                    
                # If it starts with [, it's an array - count array items
                elif prop_value.strip().startswith('['):
                    bracket_count = 0
                    array_content = ""
                    j = i
                    
                    while j < len(lines):
                        current_line = lines[j]
                        array_content += current_line + '\n'
                        
                        for char in current_line:
                            if char == '[':
                                bracket_count += 1
                            elif char == ']':
                                bracket_count -= 1
                                if bracket_count == 0:
                                    # Count objects in array
                                    array_objects = re.findall(r'\{[^}]*\}', array_content)
                                    for idx, obj in enumerate(array_objects):
                                        # Extract properties from each object
                                        for obj_prop in re.findall(r'(\w+):\s*[^,\}]+', obj):
                                            keys.add(f"{current_key}[{idx}].{obj_prop}")
                                    i = j
                                    break
                        
                        if bracket_count == 0:
                            break
                        j += 1
                
                # Otherwise, it's a simple property
                else:
                    keys.add(current_key)
            
            i += 1
    
    extract_keys_recursive(object_content)
    return keys

def simple_parse_keys(content):
    """Simple key extraction using regex patterns"""
    keys = set()
    
    # Remove comments
    content = re.sub(r'//.*?\n', '\n', content)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Find all property assignments
    lines = content.split('\n')
    current_path = []
    
    for line in lines:
        stripped = line.strip()
        
        # Count braces to track nesting level
        open_braces = stripped.count('{')
        close_braces = stripped.count('}')
        
        # Extract property name if it's a property definition
        prop_match = re.match(r'^(\w+):\s*', stripped)
        if prop_match:
            prop_name = prop_match.group(1)
            
            # Determine full key path
            full_key = '.'.join(current_path + [prop_name]) if current_path else prop_name
            
            # If it's a simple value (not object/array), add as key
            if not stripped.endswith('{') and not '[' in stripped:
                keys.add(full_key)
            elif stripped.endswith('{'):
                # It's an object, add to path
                current_path.append(prop_name)
        
        # Adjust path based on closing braces
        if close_braces > 0:
            for _ in range(min(close_braces, len(current_path))):
                if current_path:
                    current_path.pop()
    
    return keys

def complete_normalization():
    """Complete normalization of Macedonian translation file"""
    
    # File paths
    en_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts'
    mk_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts'
    mk_backup = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk_backup.ts'
    
    print("Starting complete normalization...")
    
    # Create backup
    mk_content = read_file(mk_file)
    write_file(mk_backup.replace('.ts', '_prenorm.ts'), mk_content)
    print("Created backup of current mk.ts")
    
    # Use the original backup as source for restoration
    original_backup = read_file(mk_backup)
    print("Loading original backup...")
    
    # Parse English file to get target keys
    en_content = read_file(en_file)
    
    try:
        en_keys = simple_parse_keys(en_content)
        mk_keys = simple_parse_keys(original_backup)
        
        print(f"English keys found: {len(en_keys)}")
        print(f"Original Macedonian keys found: {len(mk_keys)}")
        
        # Find differences
        missing_keys = en_keys - mk_keys
        extra_keys = mk_keys - en_keys
        
        print(f"Missing keys: {len(missing_keys)}")
        print(f"Extra keys: {len(extra_keys)}")
        
        # Start with original backup and make targeted removals/additions
        normalized_content = original_backup
        
        # Remove extra sections completely
        sections_to_remove = [
            'business', 'carDetail', 'carSpecs', 'dashboard', 'cars',
            'registeredDealers', 'sellVehicle', 'hero'
        ]
        
        for section in sections_to_remove:
            # Remove entire section
            section_pattern = rf'^\s*{re.escape(section)}:\s*\{{.*?\n\s*\}},'
            matches = list(re.finditer(section_pattern, normalized_content, re.MULTILINE | re.DOTALL))
            
            for match in reversed(matches):  # Remove in reverse order to maintain positions
                normalized_content = normalized_content[:match.start()] + normalized_content[match.end():]
            
            print(f"Removed {section} section")
        
        # Clean up faq section array data
        faq_pattern = r'(faq:\s*\{[^}]*?)(categories:\s*\[[^\]]*\],?|faqs:\s*\[[^\]]*\],?|answer:\s*[^,\n]*,?|question:\s*[^,\n]*,?|id:\s*[^,\n]*,?|name:\s*[^,\n]*,?|icon:\s*[^,\n]*,?|color:\s*[^,\n]*,?)'
        normalized_content = re.sub(faq_pattern, r'\1', normalized_content, flags=re.MULTILINE | re.DOTALL)
        
        # Remove extra keys from remaining sections
        extra_patterns = [
            r'^\s*pages:\s*\{[^{}]*(?:about|accessibility|adminDashboard|advancedSearch|browseCars|carDetail|carReviews|cookiePolicy|dashboard|dealerDashboard|dealerSupport|dealers|financing|imprint|myAccount|privacyPolicy|privateDashboard|safetyTips|savedCars|sellCar|settings|signIn|signUp|termsOfService):\s*[^,\n]*,?',
        ]
        
        for pattern in extra_patterns:
            normalized_content = re.sub(pattern, '', normalized_content, flags=re.MULTILINE)
        
        # Add missing auth section if it doesn't exist
        if 'auth:' not in normalized_content:
            auth_section = """
  auth: {
    signIn: 'Најави се',
    signUp: 'Регистрирај се',
    signOut: 'Одјави се',
    email: 'Е-пошта',
    password: 'Лозинка',
    confirmPassword: 'Потврди лозинка',
    firstName: 'Име',
    lastName: 'Презиме',
    phoneNumber: 'Телефонски број',
    rememberMe: 'Запамети ме',
    forgotPassword: 'Заборавена лозинка?',
    createAccount: 'Креирај сметка',
    alreadyHaveAccount: 'Веќе имаш сметка?',
    dontHaveAccount: 'Немаш сметка сеуште?',
    loginWith: 'Или продолжи со',
    registerAs: 'Регистрирај се како',
    privatePerson: 'Приватна личност',
    dealerAccount: 'Дилерска сметка',
    userType: 'Јас сум',
    backToHome: 'Назад кон почетна',
    signInToAccount: 'Најави се во твојата сметка',
    welcomeBack: 'Добро дојдовте назад',
    enterCredentials: 'Внесете ги вашите податоци за пристап до сметката',
    privatePersonDescription: 'Купи или продај го твоето возило',
    dealerDescription: 'Професионален продавач',
    pro: 'Про',
    enterYourEmail: 'Внеси ја твојата е-пошта',
    enterYourPassword: 'Внеси ја твојата лозинка',
    signingIn: 'Се најавувам...',
    orContinueWith: 'Или продолжи со',
    google: 'Google',
    facebook: 'Facebook',
    createPrivateAccount: 'Креирај приватна сметка',
    registerAsDealer: 'Регистрирај се како дилер',
    dealerBenefits: 'Дилерски бенефити',
    professionalDashboard: '• Професионална дилерска контролна табла',
    inventoryManagement: '• Напредно управување со инвентар',
    customerTracking: '• Следење на барања од клиенти',
    enhancedVisibility: '• Подобрена видливост на огласи',
    analyticsInsights: '• Анализи и увиди',
    createYourAccount: 'Креирај ја твојата сметка',
    joinThousands: 'Придружи се на илјадници ентузијасти за возила',
    privateAccount: 'Приватна сметка',
    buyAndSellCars: 'Купувај и продавај возила, зачувувај омилени и управувај со твоите огласи',
    fullName: 'Полно име',
    enterFullName: 'Внеси го твоето полно име',
    emailAddress: 'Е-пошта адреса',
    createStrongPassword: 'Креирај јака лозинка',
    confirmYourPassword: 'Потврди ја твојата лозинка',
    mustBeCharacters: 'Мора да има најмалку 8 карактери',
    agreeToTerms: 'Се согласувам со',
    termsOfService: 'Услови за користење',
    and: 'и',
    privacyPolicy: 'Политика на приватност',
    creatingAccount: 'Креирам сметка...',
    wantSellAsDealer: 'Сакаш да продаваш возила како дилер?',
    createDealerAccount: 'Креирај дилерска сметка',
    joinCommunityText: 'Со креирање сметка, се придружуваш на нашата заедница од ентузијасти за возила и се согласуваш со нашите правила на платформата.',
    pleaseAgreeTerms: 'Ве молиме согласете се со условите',
    passwordsNotMatch: 'Лозинките не се совпаѓаат',
    passwordMinLength: 'Лозинката мора да има најмалку 8 карактери',
    registrationFailed: 'Регистрацијата не успеа',
    backToSignIn: 'Назад кон најава',
    dealerRegistration: 'Дилерска регистрација',
    joinCarMarketDealer: 'Придружи се на CarMarket365 како професионален дилер',
    businessInformation: 'Информации за бизнисот',
    tellUsAboutBusiness: 'Кажи ни за твојот дилерски центар или бизнис',
    businessName: 'Име на бизнис',
    businessNamePlaceholder: 'Име на твојот бизнис ДОО',
    businessType: 'Тип на бизнис',
    selectBusinessType: 'Избери тип на бизнис',
    carDealership: 'Автомобилски салон',
    usedCarLot: 'Салон за користени возила',
    autoTrader: 'Автомобилски трговец',
    carBroker: 'Автомобилски брокер',
    rentalCompany: 'Компанија за изнајмување',
    other: 'Друго',
    vatNumber: 'ДДВ број',
    vatNumberPlaceholder: 'MK123456789',
    taxId: 'Даночен број',
    optional: 'Опционално',
    yearEstablished: 'Година на основање',
    selectYear: 'Избери година',
    businessDescription: 'Опис на бизнисот',
    businessDescriptionPlaceholder: 'Опиши го твојот бизнис, специјализации и услуги...',
    contactPerson: 'Контакт личност',
    primaryContactInfo: 'Примарни контакт информации за твојот бизнис',
    position: 'Позиција',
    positionPlaceholder: 'пр., Сопственик, Менаџер за продажба',
    businessEmail: 'Бизнис е-пошта',
    businessEmailPlaceholder: 'biznis@primer.com',
    businessAddress: 'Адреса на бизнисот',
    dealershipLocation: 'Физичка локација на твојот салон',
    streetAddress: 'Улица и број',
    streetAddressPlaceholder: 'Бизнис улица 123',
    city: 'Град',
    cityPlaceholder: 'Скопје',
    stateRegion: 'Држава/Регион',
    stateRegionPlaceholder: 'Северна Македонија',
    postalCode: 'Поштенски код',
    postalCodePlaceholder: '1000',
    country: 'Земја',
    selectCountry: 'Избери земја',
    germany: 'Германија',
    austria: 'Австрија',
    switzerland: 'Швајцарија',
    netherlands: 'Холандија',
    belgium: 'Белгија',
    france: 'Франција',
    italy: 'Италија',
    spain: 'Шпанија',
    accountSetup: 'Поставување на сметка',
    createSecureDealerAccount: 'Креирај ја твојата безбедна дилерска сметка',
    termsAndAgreements: 'Услови и договори',
    acceptTermsConditions: 'Ги прифаќам условите',
    agreeToTermsAndDealer: 'Се согласуваш со нашите услови за користење и дилерски договор.',
    acceptPrivacyPolicy: 'Ја прифаќам политиката на приватност',
    understandDataCollection: 'Разбираш како ги собираме и користиме твоите податоци.',
    receiveMarketingCommunications: 'Сакам да примам маркетинг комуникации',
    getUpdatesFeatures: 'Прими ажурирања за нови функции и бизнис можности.',
    alreadyHaveAccountSignIn: 'Веќе имаш сметка? Најави се',
    businessNameRequired: 'Името на бизнисот е задолжително',
    businessTypeRequired: 'Типот на бизнис е задолжителен',
    vatNumberRequired: 'ДДВ бројот е задолжителен',
    firstNameRequired: 'Името е задолжително',
    lastNameRequired: 'Презимето е задолжително',
    emailRequired: 'Е-поштата е задолжителна',
    phoneRequired: 'Телефонскиот број е задолжителен',
    streetRequired: 'Уличната адреса е задолжителна',
    cityRequired: 'Градот е задолжителен',
    postalCodeRequired: 'Поштенскиот код е задолжителен',
    passwordRequired: 'Лозинката е задолжителна',
    confirmPasswordRequired: 'Ве молиме потврдете ја лозинката',
    validEmailRequired: 'Ве молиме внесете валидна е-пошта адреса',
    validVatNumber: 'Ве молиме внесете валиден ДДВ број (пр., MK123456789)',
    passwordMinEightChars: 'Лозинката мора да има најмалку 8 карактери',
    acceptTermsRequired: 'Мора да ги прифатиш условите',
    acceptPrivacyRequired: 'Мора да ја прифатиш политиката на приватност',
  },
"""
            
            # Insert after common section
            common_end = re.search(r'(^\s*common:\s*\{.*?\n\s*\}),\n', normalized_content, re.MULTILINE | re.DOTALL)
            if common_end:
                insertion_point = common_end.end()
                normalized_content = normalized_content[:insertion_point] + auth_section + normalized_content[insertion_point:]
        
        # Clean up formatting
        normalized_content = re.sub(r',(\s*,)+', ',', normalized_content)  # Remove duplicate commas
        normalized_content = re.sub(r',(\s*\})', r'\1', normalized_content)  # Remove comma before closing brace
        normalized_content = re.sub(r'\n\s*\n\s*\n', '\n\n', normalized_content)  # Remove extra blank lines
        
        # Write normalized content
        write_file(mk_file, normalized_content)
        print("Normalization completed!")
        
        # Verify the result
        normalized_keys = simple_parse_keys(normalized_content)
        print(f"Final Macedonian key count: {len(normalized_keys)}")
        print(f"Target English key count: {len(en_keys)}")
        
        if len(normalized_keys) == len(en_keys):
            print("✅ Perfect parity achieved!")
        else:
            diff = len(normalized_keys) - len(en_keys)
            if diff > 0:
                print(f"⚠️  Still {diff} extra keys")
            else:
                print(f"⚠️  Still missing {-diff} keys")
        
    except Exception as e:
        print(f"Error during normalization: {e}")
        # Restore from backup if something goes wrong
        write_file(mk_file, original_backup)
        print("Restored from backup due to error")

if __name__ == "__main__":
    complete_normalization()