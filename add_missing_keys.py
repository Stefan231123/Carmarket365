#!/usr/bin/env python3

import re
import os

def read_file(filepath):
    """Read and return file content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def get_english_value(en_content, key_path):
    """Extract the English value for a given key path"""
    parts = key_path.split('.')
    
    # Find the section
    section = parts[0]
    section_pattern = rf'^  {re.escape(section)}:\s*\{{([^}}]*?)^\s*\}},'
    section_match = re.search(section_pattern, en_content, re.MULTILINE | re.DOTALL)
    
    if not section_match:
        return None
    
    section_content = section_match.group(1)
    
    # Find the specific key
    if len(parts) == 2:
        key = parts[1]
        key_pattern = rf"^\s*{re.escape(key)}:\s*['\"]([^'\"]*)['\"]"
        key_match = re.search(key_pattern, section_content, re.MULTILINE)
        if key_match:
            return key_match.group(1)
    
    return None

def translate_to_macedonian(english_text):
    """Basic translation mapping for common terms"""
    translations = {
        # Authentication terms
        'Sign In': 'Најави се',
        'Sign Up': 'Регистрирај се',
        'Sign Out': 'Одјави се',
        'Email': 'Е-пошта',
        'Password': 'Лозинка',
        'Confirm Password': 'Потврди лозинка',
        'First Name': 'Име',
        'Last Name': 'Презиме',
        'Phone Number': 'Телефонски број',
        'Remember Me': 'Запамети ме',
        'Forgot Password?': 'Заборавена лозинка?',
        'Create Account': 'Креирај сметка',
        'Already have an account?': 'Веќе имаш сметка?',
        "Don't have an account yet?": 'Немаш сметка сеуште?',
        'Or continue with': 'Или продолжи со',
        'Register as': 'Регистрирај се како',
        'Private Person': 'Приватна личност',
        'Dealer Account': 'Дилерска сметка',
        'I am a': 'Јас сум',
        
        # Business terms
        'Back to Home': 'Назад кон почетна',
        'Welcome back': 'Добро дојдовте назад',
        'Enter your credentials to access your account': 'Внесете ги вашите податоци за пристап до сметката',
        'Buy or sell your car': 'Купи или продај го твоето возило',
        'Professional seller': 'Професионален продавач',
        'Pro': 'Про',
        'Enter your email': 'Внеси ја твојата е-пошта',
        'Enter your password': 'Внеси ја твојата лозинка',
        'Signing In...': 'Се најавувам...',
        'Google': 'Google',
        'Facebook': 'Facebook',
        'Create Private Account': 'Креирај приватна сметка',
        'Register as Dealer': 'Регистрирај се како дилер',
        'Dealer Benefits': 'Дилерски бенефити',
        '• Professional dealer dashboard': '• Професионална дилерска контролна табла',
        '• Advanced inventory management': '• Напредно управување со инвентар',
        '• Customer inquiry tracking': '• Следење на барања од клиенти',
        '• Enhanced listing visibility': '• Подобрена видливост на огласи',
        '• Analytics and insights': '• Анализи и увиди',
        
        # Account creation
        'Create Your Account': 'Креирај ја твојата сметка',
        'Join thousands of car enthusiasts': 'Придружи се на илјадници ентузијасти за возила',
        'Private Account': 'Приватна сметка',
        'Buy and sell cars, save favorites, and manage your listings': 'Купувај и продавај возила, зачувувај омилени и управувај со твоите огласи',
        'Full Name': 'Полно име',
        'Enter your full name': 'Внеси го твоето полно име',
        'Email Address': 'Е-пошта адреса',
        'Create a strong password': 'Креирај јака лозинка',
        'Confirm your password': 'Потврди ја твојата лозинка',
        'Must be at least 8 characters': 'Мора да има најмалку 8 карактери',
        'I agree to the': 'Се согласувам со',
        'Terms of Service': 'Услови за користење',
        'and': 'и',
        'Privacy Policy': 'Политика на приватност',
        'Creating Account...': 'Креирам сметка...',
        'Want to sell cars as a dealer?': 'Сакаш да продаваш возила како дилер?',
        'Create Dealer Account': 'Креирај дилерска сметка',
        'By creating an account, you join our community of car enthusiasts and agree to our platform guidelines.': 'Со креирање сметка, се придружуваш на нашата заедница од ентузијасти за возила и се согласуваш со нашите правила на платформата.',
        
        # Error messages
        'Please agree to the terms and conditions': 'Ве молиме согласете се со условите',
        'Passwords do not match': 'Лозинките не се совпаѓаат',
        'Password must be at least 8 characters long': 'Лозинката мора да има најмалку 8 карактери',
        'Registration failed': 'Регистрацијата не успеа',
        
        # Dealer registration
        'Back to Sign In': 'Назад кон најава',
        'Dealer Registration': 'Дилерска регистрација',
        'Join CarMarket365 as a professional dealer': 'Придружи се на CarMarket365 како професионален дилер',
        'Business Information': 'Информации за бизнисот',
        'Tell us about your dealership or business': 'Кажи ни за твојот дилерски центар или бизнис',
        'Business Name': 'Име на бизнис',
        'Your Business Name GmbH': 'Име на твојот бизнис ДОО',
        'Business Type': 'Тип на бизнис',
        'Select business type': 'Избери тип на бизнис',
        'Car Dealership': 'Автомобилски салон',
        'Used Car Lot': 'Салон за користени возила',
        'Auto Trader': 'Автомобилски трговец',
        'Car Broker': 'Автомобилски брокер',
        'Rental Company': 'Компанија за изнајмување',
        'Other': 'Друго',
        'VAT Number': 'ДДВ број',
        'DE123456789': 'MK123456789',
        'Tax ID': 'Даночен број',
        'Optional': 'Опционално',
        'Year Established': 'Година на основање',
        'Select year': 'Избери година',
        'Business Description': 'Опис на бизнисот',
        'Describe your business, specializations, and services...': 'Опиши го твојот бизнис, специјализации и услуги...',
        'Contact Person': 'Контакт личност',
        'Primary contact information for your business': 'Примарни контакт информации за твојот бизнис',
        'Position': 'Позиција',
        'e.g., Owner, Sales Manager': 'пр., Сопственик, Менаџер за продажба',
        'Business Email': 'Бизнис е-пошта',
        'business@example.com': 'biznis@primer.com',
        'Business Address': 'Адреса на бизнисот',
        "Your dealership's physical location": 'Физичка локација на твојот салон',
        'Street Address': 'Улица и број',
        '123 Business Street': 'Бизнис улица 123',
        'City': 'Град',
        'Munich': 'Скопје',
        'State/Region': 'Држава/Регион',
        'Bavaria': 'Северна Македонија',
        'Postal Code': 'Поштенски код',
        '80331': '1000',
        'Country': 'Земја',
        'Select country': 'Избери земја',
        'Germany': 'Германија',
        'Austria': 'Австрија',
        'Switzerland': 'Швајцарија',
        'Netherlands': 'Холандија',
        'Belgium': 'Белгија',
        'France': 'Франција',
        'Italy': 'Италија',
        'Spain': 'Шпанија',
        'Account Setup': 'Поставување на сметка',
        'Create your secure dealer account': 'Креирај ја твојата безбедна дилерска сметка',
        'Terms and Agreements': 'Услови и договори',
        'I accept the Terms and Conditions': 'Ги прифаќам условите',
        'You agree to our Terms of Service and Dealer Agreement.': 'Се согласуваш со нашите услови за користење и дилерски договор.',
        'I accept the Privacy Policy': 'Ја прифаќам политиката на приватност',
        'You understand how we collect and use your data.': 'Разбираш како ги собираме и користиме твоите податоци.',
        'I would like to receive marketing communications': 'Сакам да примам маркетинг комуникации',
        'Get updates about new features and business opportunities.': 'Прими ажурирања за нови функции и бизнис можности.',
        'Already have an account? Sign In': 'Веќе имаш сметка? Најави се',
        
        # Validation messages
        'Business name is required': 'Името на бизнисот е задолжително',
        'Business type is required': 'Типот на бизнис е задолжителен',
        'VAT number is required': 'ДДВ бројот е задолжителен',
        'First name is required': 'Името е задолжително',
        'Last name is required': 'Презимето е задолжително',
        'Email is required': 'Е-поштата е задолжителна',
        'Phone number is required': 'Телефонскиот број е задолжителен',
        'Street address is required': 'Уличната адреса е задолжителна',
        'City is required': 'Градот е задолжителен',
        'Postal code is required': 'Поштенскиот код е задолжителен',
        'Password is required': 'Лозинката е задолжителна',
        'Please confirm password': 'Ве молиме потврдете ја лозинката',
        'Please enter a valid email address': 'Ве молиме внесете валидна е-пошта адреса',
        'Please enter a valid VAT number (e.g., DE123456789)': 'Ве молиме внесете валиден ДДВ број (пр., MK123456789)',
        'Password must be at least 8 characters': 'Лозинката мора да има најмалку 8 карактери',
        'You must accept the terms and conditions': 'Мора да ги прифатиш условите',
        'You must accept the privacy policy': 'Мора да ја прифатиш политиката на приватност',
        
        # Other translations
        'Browse Inventory': 'Прелистај инвентар',
        'Featured Vehicles': 'Издвоени возила',
        'Find Dealers': 'Најди дилери',
        'Get Started': 'Започни',
        'Search for cars, trucks, motorcycles...': 'Пребарај возила, камиони, мотоцикли...',
        'Sell Your Car': 'Продај го твоето возило',
        'Why Choose Us': 'Зошто да нѐ избереш',
        
        # Legal terms
        'Contact Legal Team': 'Контактирај го правниот тим',
        'Share Listing': 'Сподели оглас',
        
        # FAQ terms
        'All Questions': 'Сите прашања',
        'Available 24/7': 'Достапно 24/7',
        'Browse by Category': 'Прелистај по категорија',
        'Call Support': 'Повикај поддршка',
        'Clear Search': 'Исчисти пребарување',
        'Common Questions About': 'Често поставувани прашања за',
        'Email Us': 'Испрати ни е-пошта',
        'Live Chat': 'Директен разговор',
        'No Results Found': 'Нема пронајдени резултати',
        'We couldn\'t find any questions matching your search.': 'Не можевме да најдеме прашања што се совпаѓаат со вашето пребарување.',
        'Still Need Help?': 'Сѐ уште треба помош?',
        'Contact our support team for personalized assistance.': 'Контактирај го нашиот тим за поддршка за персонализирана помош.',
        'support@carmarket365.com': 'podrska@carmarket365.com',
        '+1 (555) 123-4567': '+389 (2) 123-4567',
        
        # Saved cars
        'Browse Cars': 'Прелистај возила',
        'Contact Seller': 'Контактирај продавач',
        'You haven\'t saved any cars yet. Browse our inventory to find vehicles you like.': 'Сѐ уште немаш зачувано возила. Прелистај го нашиот инвентар за да најдеш возила што ти се допаѓаат.',
        
        # Sell Vehicle steps
        'Contact Info': 'Контакт информации',
        'Photos': 'Фотографии',
        'Pricing and Contact': 'Цени и контакт',
        'Publish': 'Објави',
        'Review and Publish': 'Прегледај и објави',
        'Vehicle Information': 'Информации за возилото',
        
        # Financing
        'APR': 'ГКС',
        'Calculate your monthly payment with our financing tool': 'Пресметај ја твојата месечна рата со нашиот алат за финансирање',
        'Down Payment': 'Првична уплата',
        'Interest Rate': 'Каматна стапка',
        'Auto Financing Calculator': 'Калкулатор за автомобилско финансирање',
        'Vehicle Price': 'Цена на возилото',
        'Get pre-approved for your next car purchase': 'Добиј претходно одобрување за твојата следна купување на возило',
        'Flexible Financing Solutions': 'Флексибилни решенија за финансирање',
    }
    
    return translations.get(english_text, english_text)

def add_missing_keys(mk_content, en_content, missing_keys):
    """Add missing keys to the Macedonian translation"""
    
    # Group keys by section
    sections = {}
    for key in missing_keys:
        parts = key.split('.')
        if len(parts) >= 2:
            section = parts[0]
            if section not in sections:
                sections[section] = []
            sections[section].append('.'.join(parts[1:]))
    
    print(f"Adding keys for {len(sections)} sections:")
    for section, keys in sections.items():
        print(f"  {section}: {len(keys)} keys")
    
    # Handle auth section
    if 'auth' in sections:
        auth_keys = sections['auth']
        
        # Check if auth section already exists
        auth_exists = re.search(r'^\s*auth:\s*\{', mk_content, re.MULTILINE)
        
        if not auth_exists:
            # Create new auth section
            auth_translations = {}
            for key in auth_keys:
                en_value = get_english_value(en_content, f'auth.{key}')
                if en_value:
                    mk_value = translate_to_macedonian(en_value)
                    auth_translations[key] = mk_value
            
            # Build the auth section
            auth_section = "  auth: {\n"
            for key, value in sorted(auth_translations.items()):
                # Escape single quotes in the value
                escaped_value = value.replace("'", "\\'")
                auth_section += f"    {key}: '{escaped_value}',\n"
            auth_section += "  },\n"
            
            # Insert auth section after common section
            common_end = re.search(r'(^\s*common:\s*\{.*?\n\s*\}),\n', mk_content, re.MULTILINE | re.DOTALL)
            if common_end:
                insertion_point = common_end.end()
                mk_content = mk_content[:insertion_point] + "\n" + auth_section + mk_content[insertion_point:]
    
    # Handle hardcodedFixes section
    if 'hardcodedFixes' in sections:
        hardcoded_section = """  hardcodedFixes: {
    financing: {
      calculator: {
        aprLabel: 'ГКС',
        description: 'Пресметај ја твојата месечна рата со нашиот алат за финансирање',
        downPayment: 'Првична уплата',
        interestRate: 'Каматна стапка',
        title: 'Калкулатор за автомобилско финансирање',
        vehiclePrice: 'Цена на возилото',
      },
      hero: {
        subtitle: 'Добиј претходно одобрување за твојата следна купување на возило',
        title: 'Флексибилни решенија за финансирање',
      },
    },
  },
"""
        # Find a good insertion point
        auth_end = re.search(r'(^\s*auth:\s*\{.*?\n\s*\}),\n', mk_content, re.MULTILINE | re.DOTALL)
        if auth_end:
            insertion_point = auth_end.end()
            mk_content = mk_content[:insertion_point] + "\n" + hardcoded_section + mk_content[insertion_point:]
    
    # Handle indexPage keys
    if 'indexPage' in sections:
        indexpage_keys = [
            ('browseInventory', 'Прелистај инвентар'),
            ('featuredVehicles', 'Издвоени возила'),
            ('findDealers', 'Најди дилери'),
            ('getStarted', 'Започни'),
            ('heroSubtitle', 'Најди го совршеното возило на еден клик'),
            ('heroTitle', 'Најголем пазар за возила'),
            ('searchPlaceholder', 'Пребарај возила, камиони, мотоцикли...'),
            ('sellYourCar', 'Продај го твоето возило'),
            ('whyChooseUs', 'Зошто да нѐ избереш'),
        ]
        
        # Find indexPage section and add keys
        indexpage_pattern = r'(^\s*indexPage:\s*\{[^}]*?)(\n\s*\})'
        indexpage_match = re.search(indexpage_pattern, mk_content, re.MULTILINE | re.DOTALL)
        if indexpage_match:
            existing_content = indexpage_match.group(1)
            closing = indexpage_match.group(2)
            
            new_keys = ""
            for key, value in indexpage_keys:
                if key not in existing_content:
                    new_keys += f"    {key}: '{value}',\n"
            
            if new_keys:
                updated_section = existing_content + new_keys + closing
                mk_content = mk_content.replace(indexpage_match.group(0), updated_section)
    
    # Handle legal section
    if 'legal' in sections:
        legal_keys = """    imprint: {
      businessAddress: {
        city: 'Скопје',
        country: 'Северна Македонија',
        street: 'Булевар ВМРО 7',
      },
      contactLegalTeam: 'Контактирај го правниот тим',
    },"""
        
        # Find legal section and add keys
        legal_pattern = r'(^\s*legal:\s*\{[^}]*?)(\n\s*\})'
        legal_match = re.search(legal_pattern, mk_content, re.MULTILINE | re.DOTALL)
        if legal_match:
            existing_content = legal_match.group(1)
            closing = legal_match.group(2)
            updated_section = existing_content + legal_keys + closing
            mk_content = mk_content.replace(legal_match.group(0), updated_section)
    
    # Handle modals section
    if 'modals' in sections:
        # Find modals section and add key
        modals_pattern = r'(^\s*modals:\s*\{[^}]*?)(\n\s*\})'
        modals_match = re.search(modals_pattern, mk_content, re.MULTILINE | re.DOTALL)
        if modals_match:
            existing_content = modals_match.group(1)
            closing = modals_match.group(2)
            new_key = "    shareListng: 'Сподели оглас',\n"  # Note: keeping the typo as in original
            updated_section = existing_content + new_key + closing
            mk_content = mk_content.replace(modals_match.group(0), updated_section)
    
    # Handle pages.faq section  
    if 'pages' in sections:
        pages_faq_keys = """      faq: {
        color: '#3B82F6',
        content: {
          allQuestions: 'Сите прашања',
          available247: 'Достапно 24/7',
          browseByCategory: 'Прелистај по категорија',
          callSupport: 'Повикај поддршка',
          clearSearch: 'Исчисти пребарување',
          commonQuestionsAbout: 'Често поставувани прашања за',
          emailUs: 'Испрати ни е-пошта',
          liveChat: 'Директен разговор',
          noResultsFound: 'Нема пронајдени резултати',
          noResultsText: 'Не можевме да најдеме прашања што се совпаѓаат со вашето пребарување.',
          stillNeedHelp: 'Сѐ уште треба помош?',
          stillNeedHelpDescription: 'Контактирај го нашиот тим за поддршка за персонализирана помош.',
          supportEmail: 'podrska@carmarket365.com',
          supportPhoneNumber: '+389 (2) 123-4567',
        },
        faqCategories: [
          { id: 'buying', name: 'Купување', icon: 'car', color: '#3B82F6', faqs: [] },
          { id: 'selling', name: 'Продавање', icon: 'dollar-sign', color: '#10B981', faqs: [] },
          { id: 'account', name: 'Сметка', icon: 'user', color: '#F59E0B', faqs: [] },
          { id: 'financing', name: 'Финансирање', icon: 'credit-card', color: '#EF4444', faqs: [] },
          { id: 'safety', name: 'Безбедност', icon: 'shield', color: '#8B5CF6', faqs: [] }
        ],
      },"""
        
        # Find pages section and add faq
        pages_pattern = r'(^\s*pages:\s*\{[^}]*?)(\n\s*\})'
        pages_match = re.search(pages_pattern, mk_content, re.MULTILINE | re.DOTALL)
        if pages_match:
            existing_content = pages_match.group(1)
            closing = pages_match.group(2)
            updated_section = existing_content + pages_faq_keys + closing
            mk_content = mk_content.replace(pages_match.group(0), updated_section)
    
    # Handle savedCars section
    if 'savedCars' in sections:
        savedcars_keys = """    browseCars: 'Прелистај возила',
    contactSeller: 'Контактирај продавач',
    noSavedCarsMessage: 'Сѐ уште немаш зачувано возила. Прелистај го нашиот инвентар за да најдеш возила што ти се допаѓаат.',"""
        
        # Find savedCars section and add keys
        savedcars_pattern = r'(^\s*savedCars:\s*\{[^}]*?)(\n\s*\})'
        savedcars_match = re.search(savedcars_pattern, mk_content, re.MULTILINE | re.DOTALL)
        if savedcars_match:
            existing_content = savedcars_match.group(1)
            closing = savedcars_match.group(2)
            updated_section = existing_content + savedcars_keys + closing
            mk_content = mk_content.replace(savedcars_match.group(0), updated_section)
    
    # Handle sellVehicle section
    if 'sellVehicle' in sections:
        sellvehicle_keys = """    contactInfo: 'Контакт информации',
    photos: 'Фотографии',
    pricingAndContact: 'Цени и контакт',
    publish: 'Објави',
    reviewAndPublish: 'Прегледај и објави',
    vehicleInformation: 'Информации за возилото',"""
        
        # Find sellVehicle section and add keys
        sellvehicle_pattern = r'(^\s*sellVehicle:\s*\{[^}]*?)(\n\s*\})'
        sellvehicle_match = re.search(sellvehicle_pattern, mk_content, re.MULTILINE | re.DOTALL)
        if sellvehicle_match:
            existing_content = sellvehicle_match.group(1)
            closing = sellvehicle_match.group(2)
            updated_section = existing_content + sellvehicle_keys + closing
            mk_content = mk_content.replace(sellvehicle_match.group(0), updated_section)
    
    return mk_content

def main():
    # File paths
    missing_keys_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/missing_in_mk.txt'
    mk_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts'
    en_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts'
    
    # Read the keys to add
    with open(missing_keys_file, 'r', encoding='utf-8') as f:
        keys_to_add = []
        for line in f:
            line = line.strip()
            if '→' in line:
                key = line.split('→')[1]
                keys_to_add.append(key)
            elif line and not line.startswith('#'):
                keys_to_add.append(line)
    
    print(f"Found {len(keys_to_add)} keys to add")
    
    # Read the files
    mk_content = read_file(mk_file)
    en_content = read_file(en_file)
    
    print(f"Original MK file size: {len(mk_content)} characters")
    
    # Add the missing keys
    updated_content = add_missing_keys(mk_content, en_content, keys_to_add)
    print(f"Updated MK file size: {len(updated_content)} characters")
    
    # Write the updated content
    write_file(mk_file, updated_content)
    print("Successfully added missing keys to mk.ts")

if __name__ == "__main__":
    main()