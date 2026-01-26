import { TranslationStrings } from '../translations';

export const sqTranslations: TranslationStrings = {
  brand: {
    name: 'CarMarket365'
  },
  common: {
    loading: 'Po ngarkohet...',
    error: 'Gabim',
    retry: 'Provoni përsëri',
    close: 'Mbyll',
    cancel: 'Anulo',
    confirm: 'Konfirmo',
    continue: 'Vazhdo',
    back: 'Kthehu',
    next: 'Tjetër',
    previous: 'E mëparshme',
    search: 'Kërko',
    filter: 'Filtro',
    clear: 'Pastro',
    save: 'Ruaj',
    edit: 'Edito',
    delete: 'Fshi',
    add: 'Shto',
    view: 'Shiko',
    contact: 'Kontakt',
    phone: 'Telefon',
    email: 'Email',
    address: 'Adresa',
    location: 'Vendndodhja',
    price: 'Çmimi',
    currency: 'USD',
    year: 'Viti',
    make: 'Marka',
    model: 'Modeli',
    mileage: 'Kilometrazhi',
    condition: 'Gjendja',
    features: 'Karakteristikat',
    description: 'Përshkrimi',
    images: 'Imazhet',
    seller: 'Shitësi',
    dealer: 'Diler',
    private: 'Privat',
    yes: 'Po',
    no: 'Jo',
    menu: 'Menu',
    new: 'I ri',
    certified: 'I certifikuar',
    vehicle: 'Automjeti',
    message: 'Mesazhi',
    default: 'E parazgjedhur',
    secondary: 'E dytë',
    outline: 'Konture',
    ghost: 'Fantazmë',
    link: 'Lidhje',
    destructive: 'Shkatërrues',
    small: 'I vogël',
    large: 'I madh',
    option: 'Opsioni',
    sending: 'Duke dërguar...',
    processing: 'Duke procesuar...',
    errorLoadingImage: 'Gabim në ngarkimin e imazhit',
  },

  // Forms - validation, labels, placeholders, actions
  forms: {
    validation: {
      nameRequired: 'Emri është i detyrueshëm',
      emailRequired: 'Email-i është i detyrueshëm',
      emailInvalid: 'Ju lutem vendosni një email të vlefshëm',
      phoneRequired: 'Numri i telefonit është i detyrueshëm',
      messageRequired: 'Mesazhi është i detyrueshëm',
      loanAmountRequired: 'Shuma e kredisë është e detyrueshme',
      annualIncomeRequired: 'Të ardhurat vjetore janë të detyrueshme',
      creditScoreRequired: 'Vlerësimi i kredisë është i detyrueshëm',
      employmentStatusRequired: 'Statusi i punësimit është i detyrueshëm',
      yearsAtJobRequired: 'Vitet në punën aktuale janë të detyrueshme',
      monthlyExpensesRequired: 'Shpenzimet mujore janë të detyrueshme',
      makeRequired: 'Marka është e detyrueshme',
      modelRequired: 'Modeli është i detyrueshëm',
      yearRequired: 'Viti është i detyrueshëm',
      yearInvalid: 'Vit i pavlefshëm',
      mileageRequired: 'Kilometrazhi është i detyrueshëm',
      mileageNegative: 'Kilometrazhi nuk mund të jetë negativ',
      dateRequired: 'Ju lutem zgjidhni një datë',
      timeRequired: 'Ju lutem zgjidhni një kohë',
    },
    labels: {
      fullName: 'Emri i plotë',
      email: 'Email',
      phone: 'Numri i telefonit',
      message: 'Mesazhi',
    },
    placeholders: {
      selectMake: 'Zgjidhni markën',
      selectModel: 'Zgjidhni modelin',
      selectYear: 'Zgjidhni vitin',
      selectCondition: 'Zgjidhni gjendjen',
      selectFuelType: 'Zgjidhni llojin e karburantit',
      selectTransmission: 'Zgjidhni transmisionin',
      selectBodyType: 'Zgjidhni llojin e karocerisë',
      selectDrivetrain: 'Zgjidhni sistemin e lëvizjes',
      enterName: 'Vendosni emrin tuaj të plotë',
      enterEmail: 'Vendosni email-in tuaj',
      enterPassword: 'Vendosni fjalëkalimin tuaj',
      enterPhone: 'Vendosni numrin tuaj të telefonit',
      enterModel: 'Vendosni modelin',
      enterMileage: 'Vendosni kilometrazhin',
      enterPrice: 'Vendosni çmimin',
      enterLocation: 'Vendosni vendndodhjen',
      enterCity: 'Vendosni qytetin',
      enterDescription: 'Vendosni përshkrimin',
      searchCars: 'Kërko makina...',
      searchListings: 'Kërko shpallje...',
      searchFAQs: 'Kërko në pyetjet e shpeshta...',
      anyMake: 'Çdo markë',
      anyModel: 'Çdo model',
      anyYear: 'Çdo vit',
      anyMileage: 'Çdo kilometrazh',
      minPrice: 'Çmimi minimal',
      maxPrice: 'Çmimi maksimal',
      role: 'Roli',
      sortBy: 'Rendit sipas',
      filterBy: 'Filtro sipas',
      dealerNameOrCity: 'Emri i dilerit ose qyteti',
      allStates: 'Të gjitha rajonet',
      allSpecialties: 'Të gjitha specializimet',
      egFiftyThousand: 'p.sh. 50,000',
      successMessage: 'Mesazh suksesi',
      requiredFieldMessage: 'Kjo fushë është e detyrueshme',
      contactMessage: 'Përshëndetje, jam i interesuar për {year} {make} {model}. Ju lutem kontaktoni me më shumë detaje.',
      enterMessage: 'Vendosni mesazhin tuaj',
    },
    actions: {
      sendMessage: 'Dërgo mesazhin',
    },
  },

  // Modals - titles, descriptions, success messages
  modals: {
    contactCar: {
      title: 'Kontakto shitësin',
      description: 'Dërgo një mesazh për këtë automjet',
      successTitle: 'Mesazhi u dërgua me sukses!',
      successDescription: 'Mesazhi juaj është dërguar tek shitësi. Ai do të kontaktojë me ju së shpejti.',
    },
    financing: {
      title: 'Merr Para-aprovimin për Financim',
      description: 'Merr para-aprovimin për financimin e automjetit në minuta',
      badges: {
        financingAvailable: 'Financimi i Disponueshëm',
      },
      employmentStatus: {
        retired: 'I pensionuar',
        student: 'Student',
        unemployed: 'I papunë',
      },
      successTitle: 'Para-aprovimi u dorëzua me sukses!',
      successDescription: 'Aplikimi juaj për para-aprovim është dorëzuar. Ne do t\'ju kontaktojmë brenda 24 orëve me rezultatin.',
    },
    scheduleTestDrive: {
      title: 'Planifiko provën e drejtimit',
      description: 'Rezervoni një takim për provë drejtimi për këtë automjet',
      badge: 'Prova e drejtimit e disponueshme',
      success: {
        title: 'Prova e drejtimit u planifikua!',
        description: 'Kërkesa juaj për provë drejtimi u dërgua tek shitësi. Ata do t\'ju kontaktojnë për të konfirmuar takimin.',
      },
    },
    tradeIn: {
      title: 'Vlerësuesi i Këmbimit',
      description: 'Merrni një vlerësim të menjëhershëm për vlerën e këmbimit të automjetit tuaj aktual',
      vehicleInformation: 'Informacioni i Automjetit',
      historyCondition: 'Historiku dhe Gjendja',
      conditionOptions: {
          condition: {
            excellent: 'E shkëlqyer',
            good: 'E mirë',
            fair: 'E kënaqshme',
            poor: 'E dobët'
          },
          accident: {
            none: 'Pa Aksidente',
            minor: 'Aksident i Vogël',
            major: 'Aksident i Madh',
            multiple: 'Shumë Aksidente'
          },
          serviceHistory: {
            complete: 'Historik i Plotë Shërbimi',
            partial: 'Historik i Pjesshëm Shërbimi',
            none: 'Pa Historik Shërbimi'
          },
          modifications: {
            none: 'Pa Modifikime',
            minor: 'Modifikime të Vogla',
            major: 'Modifikime të Mëdha'
          },
        },
      results: {
        estimatedValue: 'Vlera e Vlerësuar e Këmbimit',
        range: 'Gama',
        confidence: 'Niveli i Besimit',
        market: 'Kushtet e Tregut',
        positiveFactors: 'Faktorë Pozitivë',
        negativeFactors: 'Faktorë Negativë',
        recommendations: {
          title: 'Rekomandimet',
          maintenance: 'Konsideroni zgjidhjen e çështjeve të mirëmbajtjes para këmbimit',
          documentation: 'Mblidhni të gjitha dokumentet e shërbimit dhe dokumentacionin',
          inspection: 'Bëni një inspektim profesional për vlerësim të saktë',
          timing: 'Konsideroni kohëzgjatjen e tregut për markën dhe modelin tuaj',
          marketConditions: 'Konsideroni kushtet aktuale të tregut kur planifikoni këmbimin',
          multipleAppraisals: 'Merrni vlerësime të shumta për të siguruar vlerë të drejtë',
          maintenanceRecords: 'Ruani evidencat e mirëmbajtjes për të dëshmuar kujdesin për automjetin',
          cleanVehicle: 'Pastroni automjetin plotësisht para vlerësimit'
        },
        disclaimer: 'Kjo është një vlerë e vlerësuar bazuar në informacionin e dhënë. Vlerat aktuale të këmbimit mund të ndryshojnë në varësi të politikave të shitësve, kushteve aktuale të tregut dhe inspektimit fizik të automjetit.',
        disclaimerText: 'Vlerësimi është bazuar në informacionin e dhënë dhe kushtet aktuale të tregut.',
      },
      loading: {
        calculating: 'Po llogaritet vlerësimi juaj...',
        fetchingData: 'Po merren të dhënat e tregut...'
      },
    },
  },

  header: {
    welcome: 'Mirë se vini në CarMarket365',
    signIn: 'Kyçu',
    signOut: 'Dil',
    myAccount: 'Llogaria ime',
    dashboard: 'Paneli',
    home: 'Fillore',
    browseCars: 'Shfleto makinat',
    sellCar: 'Shit',
    savedCars: 'Makinat e ruajtura',
    financing: 'Financimi',
    about: 'Rreth nesh - Faqja e përmirësuar',
    contact: 'Kontakt',
    faq: 'Pyetje të shpeshta',
    help: 'Ndihmë',
    advancedSearch: 'Kërkimi i avancuar',
  },

  hero: {
    title: 'Gjeni Makinën Tuaj të Përsosur',
    subtitle: 'Kërkoni nëpër mijëra makina cilësore të përdorura nga dilerë të verifikuar dhe shitës privatë',
    searchButton: 'Kërko Makina',
    advancedSearch: 'Kërkim i Avancuar',
    vehicleTypes: {
      cars: 'Makina',
      motorbikes: 'Motorë',
      trucks: 'Kamionë',
    },
    searchForm: {
      make: 'Marka',
      model: 'Modeli',
      priceFrom: 'Çmimi Nga',
      priceTo: 'Çmimi Deri',
      yearFrom: 'Viti Nga',
      mileage: 'Kilometrazhi (km)',
      location: 'Vendndodhja',
      anyMake: 'Çdo Markë',
      anyModel: 'Çdo Model',
      minPrice: 'Çmimi Minimal',
      maxPrice: 'Çmimi Maksimal',
      minYear: 'Viti Minimal',
      anyYear: 'Çdo Vit',
      anyMileage: 'Çdo Kilometrazh',
      maxMileage: 'Kilometrazhi Maksimal',
      noMin: 'Pa Minimum',
      noMax: 'Pa Maksimum',
      enterLocation: 'Shkruani qytetin ose kodin postar',
    },
    availableCars: 'Mbi 50,000 makina të disponueshme në mbarë vendin',
  },

  // Last Search Section
  lastSearch: {
    title: 'Kërkimi i fundit',
    description: 'Makina BMW nga €20,000 - €35,000, vitet 2019-2022 • 247 rezultate të gjetur',
    viewMore: 'Shiko më shumë',
    matchPercentage: '% përputhje',
  },

  // Interesting Suggestions Section
  suggestions: {
    title: 'Kjo mund t\'ju interesojë',
    description: 'Shpallje të reja BMW që përputhen me kriteret tuaja • Sapo të shtuar në platformë',
    seeMore: 'Shiko më shumë sugjerime',
    daysAgo: 'd më parë',
  },

  // Popular Brands Section
  brands: {
    title: 'Blej sipas markës',
    description: 'Shfletoni makina nga prodhuesit më popullor',
    carsCount: 'makina',
  },

  cars: {
    title: 'Makina për shitje',
    searchPlaceholder: 'Marka, modeli ose fjalë kyçe',
    noResults: 'Nuk u gjetën makina që përputhen me kriteret tuaja',
    resultsCount: 'U gjetën {count} automjete',
    viewDetails: 'Shiko detajet',
    contactSeller: 'Kontakto shitësin',
    saveToFavorites: 'Ruaj në të preferuarat',
    removeFromFavorites: 'Hiq nga të preferuarat',
    carDetails: 'Detajet e makinës',
    specifications: 'Specifikimet',
    fuelType: 'Lloji i karburantit',
    transmission: 'Transmisioni',
    bodyType: 'Lloji i karocerisë',
    exteriorColor: 'Ngjyra e jashtme',
    interiorColor: 'Ngjyra e brendshme',
    drivetrain: 'Sistemi i lëvizjes',
    vin: 'Numri VIN',
    inspection: 'Kontrolli teknik',
    history: 'Historia',
    financing: 'Financimi',
    testDrive: 'Provë drejtimi',
    makeOffer: 'Bëj ofertë',
    featured: 'Shpallje të zgjedhura',
    handpicked: 'Makina të përzgjedhura për ju',
    discover: 'Zbuloni automjetet tona premium të përzgjedhura me kujdes',
    allCars: 'Të gjitha makinat',
    newCars: 'Makina të reja',
    certifiedPreOwned: 'Të certifikuara të përdorura',
    electric: 'Elektrike',
    luxury: 'Luksoze',
    viewAllCars: 'Shiko të gjitha makinat',
  },

  filters: {
    title: 'Filtrat e kërkimit',
    anyMake: 'Çdo markë',
    anyModel: 'Çdo model',
    anyYear: 'Çdo vit',
    priceRange: 'Diapazoni i çmimit',
    priceMin: 'Çmimi minimal',
    priceMax: 'Çmimi maksimal',
    yearRange: 'Diapazoni i vitit',
    yearMin: 'Viti minimal',
    yearMax: 'Viti maksimal',
    mileageMax: 'Kilometrazhi maksimal',
    location: 'Vendndodhja',
    fuelTypes: 'Lloji i karburantit',
    transmissionTypes: 'Transmisioni',
    bodyTypes: 'Lloji i karocerisë',
    condition: 'Gjendja',
    applyFilters: 'Apliko filtrat',
    clearFilters: 'Pastro filtrat',
  },

  auth: {
    signIn: 'Kyçu',
    signUp: 'Regjistrohu',
    signOut: 'Dil',
    email: 'Email',
    password: 'Fjalëkalimi',
    confirmPassword: 'Konfirmo fjalëkalimin',
    firstName: 'Emri',
    lastName: 'Mbiemri',
    phoneNumber: 'Numri i telefonit',
    rememberMe: 'Më mbaj mend',
    forgotPassword: 'Fjalëkalim i harruar?',
    createAccount: 'Krijo llogari',
    alreadyHaveAccount: 'Keni tashmë një llogari?',
    dontHaveAccount: 'Nuk keni ende një llogari?',
    loginWith: 'Ose vazhdo me',
    registerAs: 'Regjistrohu si',
    privatePerson: 'Person privat',
    dealerAccount: 'Llogari dileri',
    userType: 'Unë jam',
    
    // SignIn page specific
    backToHome: 'Back to Home',
    signInToAccount: 'Sign in to your account',
    welcomeBack: 'Welcome back',
    enterCredentials: 'Enter your credentials to access your account',
    privatePersonDescription: 'Buy or sell your car',
    dealerDescription: 'Professional seller',
    pro: 'Pro',
    enterYourEmail: 'Enter your email',
    enterYourPassword: 'Enter your password',
    signingIn: 'Signing In...',
    orContinueWith: 'Or continue with',
    google: 'Google',
    facebook: 'Facebook',
    createPrivateAccount: 'Create Private Account',
    registerAsDealer: 'Register as Dealer',
    dealerBenefits: 'Dealer Benefits',
    professionalDashboard: '• Professional dealer dashboard',
    inventoryManagement: '• Advanced inventory management',
    customerTracking: '• Customer inquiry tracking',
    enhancedVisibility: '• Enhanced listing visibility',
    analyticsInsights: '• Analytics and insights',
    
    // UserSignUp page specific
    createYourAccount: 'Create Your Account',
    joinThousands: 'Join thousands of car enthusiasts',
    privateAccount: 'Private Account',
    buyAndSellCars: 'Buy and sell cars, save favorites, and manage your listings',
    fullName: 'Full Name',
    enterFullName: 'Shkruaj emrin tënd të plotë',
    emailAddress: 'Email Address',
    createStrongPassword: 'Create a strong password',
    confirmYourPassword: 'Confirm your password',
    mustBeCharacters: 'Must be at least 8 characters',
    agreeToTerms: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    creatingAccount: 'Creating Account...',
    wantSellAsDealer: 'Want to sell cars as a dealer?',
    createDealerAccount: 'Create Dealer Account',
    joinCommunityText: 'By creating an account, you join our community of car enthusiasts and agree to our platform guidelines.',
    
    // Error messages for signup
    pleaseAgreeTerms: 'Please agree to the terms and conditions',
    passwordsNotMatch: 'Passwords do not match',
    passwordMinLength: 'Password must be at least 8 characters long',
    registrationFailed: 'Registration failed',
    
    // DealerSignUp page specific
    backToSignIn: 'Back to Sign In',
    dealerRegistration: 'Dealer Registration',
    joinCarMarketDealer: 'Join CarMarket365 as a professional dealer',
    businessInformation: 'Business Information',
    tellUsAboutBusiness: 'Tell us about your dealership or business',
    businessName: 'Business Name',
    businessNamePlaceholder: 'Your Business Name GmbH',
    businessType: 'Business Type',
    selectBusinessType: 'Select business type',
    carDealership: 'Car Dealership',
    usedCarLot: 'Used Car Lot',
    autoTrader: 'Auto Trader',
    carBroker: 'Car Broker',
    rentalCompany: 'Rental Company',
    other: 'Other',
    vatNumber: 'VAT Number',
    vatNumberPlaceholder: 'DE123456789',
    taxId: 'Tax ID',
    optional: 'Optional',
    yearEstablished: 'Year Established',
    selectYear: 'Select year',
    businessDescription: 'Business Description',
    businessDescriptionPlaceholder: 'Describe your business, specializations, and services...',
    contactPerson: 'Contact Person',
    primaryContactInfo: 'Primary contact information for your business',
    position: 'Position',
    positionPlaceholder: 'e.g., Owner, Sales Manager',
    businessEmail: 'Business Email',
    businessEmailPlaceholder: 'business@example.com',
    businessAddress: 'Business Address',
    dealershipLocation: "Your dealership's physical location",
    streetAddress: 'Street Address',
    streetAddressPlaceholder: '123 Business Street',
    city: 'City',
    cityPlaceholder: 'Munich',
    stateRegion: 'State/Region',
    stateRegionPlaceholder: 'Bavaria',
    postalCode: 'Postal Code',
    postalCodePlaceholder: '80331',
    country: 'Country',
    selectCountry: 'Select country',
    germany: 'Germany',
    austria: 'Austria',
    switzerland: 'Switzerland',
    netherlands: 'Netherlands',
    belgium: 'Belgium',
    france: 'France',
    italy: 'Italy',
    spain: 'Spain',
    accountSetup: 'Account Setup',
    createSecureDealerAccount: 'Create your secure dealer account',
    termsAndAgreements: 'Terms and Agreements',
    acceptTermsConditions: 'I accept the Terms and Conditions',
    agreeToTermsAndDealer: 'You agree to our Terms of Service and Dealer Agreement.',
    acceptPrivacyPolicy: 'I accept the Privacy Policy',
    understandDataCollection: 'You understand how we collect and use your data.',
    receiveMarketingCommunications: 'I would like to receive marketing communications',
    getUpdatesFeatures: 'Get updates about new features and business opportunities.',
    alreadyHaveAccountSignIn: 'Already have an account? Sign In',
    
    // Validation error messages for dealer signup
    businessNameRequired: 'Business name is required',
    businessTypeRequired: 'Business type is required',
    vatNumberRequired: 'VAT number is required',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    phoneRequired: 'Phone number is required',
    streetRequired: 'Street address is required',
    cityRequired: 'City is required',
    postalCodeRequired: 'Postal code is required',
    passwordRequired: 'Password is required',
    confirmPasswordRequired: 'Please confirm password',
    validEmailRequired: 'Please enter a valid email address',
    validVatNumber: 'Please enter a valid VAT number (e.g., DE123456789)',
    passwordMinEightChars: 'Password must be at least 8 characters',
    acceptTermsRequired: 'You must accept the terms and conditions',
    acceptPrivacyRequired: 'You must accept the privacy policy',
  },

  sell: {
    title: 'Shit makinën tuaj',
    expressTitle: 'Shitje ekspres',
    sellYourCar: 'Shit automjetin tuaj',
    carInformation: 'Informacionet e makinës',
    uploadPhotos: 'Ngarko foto',
    setPrice: 'Cakto çmimin',
    contactInformation: 'Informacionet e kontaktit',
    publish: 'Publiko',
    draft: 'Ruaj si draft',
    preview: 'Parashiko',
    required: 'I detyrueshëm',
    optional: 'Opsional',
    addPhotos: 'Shto foto',
    removePhoto: 'Hiq foton',
    mainPhoto: 'Foto kryesore',
    additionalInfo: 'Informacione shtesë',
    sellerNotes: 'Shënimet e shitësit',
    
    // Step titles
    steps: {
      vehicleType: 'Lloji i automjetit',
      basicInfo: 'Informacione bazë',
      details: 'Detaje',
      photosAndContact: 'Foto dhe kontakti',
    },
    
    // Vehicle type selection
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'Ç\'lloj automjeti po shitni?',
      basicInformation: 'Informacione bazë',
      basicInfoDescription: 'Na tregoni për {vehicleType} tuaj',
      additionalDetails: 'Detaje shtesë',
      additionalDetailsDescription: 'Shtoni më shumë detaje për {vehicleType} tuaj',
      photosAndContact: 'Foto dhe informacionet e kontaktit',
      photosAndContactDescription: 'Shtoni foto dhe detajet tuaja të kontaktit',
      vehicleDetails: 'Detajet e automjetit',
      photosAndContactInfo: 'Fotot dhe informacionet e kontaktit',
      uploadVehiclePhotos: 'Ngarko fotot e automjetit',
      addUpToTenPhotos: 'Shtoni deri në 10 foto'
    },
    
    // Form fields and labels
    fields: {
      make: 'Marka',
      model: 'Modeli',
      year: 'Viti',
      mileage: 'Kilometrazha',
      condition: 'Gjendja',
      fuelType: 'Lloji i karburantit',
      transmission: 'Transmisioni',
      exteriorColor: 'Ngjyra e jashtme',
      interiorColor: 'Ngjyra e brendshme',
      askingPrice: 'Çmimi i kërkuar',
      featuresAndOptions: 'Karakteristikat dhe opsionet',
      description: 'Përshkrimi',
      vehiclePhotos: 'Fotot e automjetit',
      contactName: 'Emri për kontakt',
      phoneNumber: 'Numri i telefonit',
      emailAddress: 'Adresa e email-it',
      location: 'Vendndodhja',
    },
    
    // Placeholders
    
    // Button labels
    buttons: {
      nextStep: 'Hapi tjetër',
      previous: 'I mëparshëm',
      createListing: 'Krijo shpalljen',
    },
    
    // Preview section
    preview: {
      title: 'Parapamje',
      yourVehicle: 'Automjeti juaj',
      milesLabel: 'kilometra',
      priceLabel: 'Çmimi',
      photosCount: '{count} foto{plural}',
      photo: '',
      photos: '',
    },
    
    // Photo upload
    photos: {
      instruction: 'Shtoni deri në 10 foto me cilësi të lartë të automjetit tuaj. Foto e parë do të jetë imazhi kryesor që shfaqet në rezultatet e kërkimit.',
      selected: '{count} foto{plural} të zgjedhura',
      photo: '',
      photos: '',
    },
    
    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    
    // Fuel types
    fuelTypes: {
      gasoline: 'Benzinë',
      electric: 'Elektrik',
      hybrid: 'Hibrid',
      diesel: 'Dizel',
      pluginHybrid: 'Hibrid me shtypje',
      flexFuel: 'Karburant fleksibël',
      cng: 'CNG',
      lpg: 'LPG',
    },
    
    // Transmissions
    transmissions: {
      automatic: 'Automatik',
      manual: 'Manuali',
      cvt: 'CVT',
    },

    // Body Types
    bodyTypes: {
      sedan: 'Sedan',
      suv: 'SUV',
      truck: 'Kamion',
      coupe: 'Kupë',
      hatchback: 'Hatchback',
      convertible: 'Kabriolet',
      wagon: 'Vagon',
      van: 'Furgon',
      crossover: 'Crossover',
    },

    // Drivetrains
    drivetrains: {
      fwd: 'Tërheqje përpara',
      rwd: 'Tërheqje prapa',
      awd: 'Tërheqje të gjitha rrotat',
      fourwd: 'Katër rrota lëvizëse',
    },

    // Colors
    colors: {
      black: 'E zezë',
      white: 'E bardhë',
      silver: 'Argjendtë',
      gray: 'Gri',
      red: 'E kuqe',
      blue: 'Blu',
      green: 'E gjelbër',
      brown: 'Kafe',
      gold: 'Ari',
      orange: 'Portokalli',
      purple: 'Vjollcë',
      yellow: 'E verdhë',
    },
    
    // Conditions
    conditions: {
      new: 'E re',
      likeNew: 'Si e re',
      excellent: 'Të shkëlqyer',
      veryGood: 'Shumë të mira',
      good: 'Të mira',
      fair: 'Të pranueshme',
      poor: 'Të dobëta',
    },
    
    // Features list
    features: {
      airConditioning: 'Kondicionimi i ajrit',
      leatherSeats: 'Ulëse lëkure',
      heatedSeats: 'Ulëse të ngrohta',
      sunroof: 'Çati diellore',
      gpsNavigation: 'Navigimi GPS',
      backupCamera: 'Kamera e parkimit',
      bluetooth: 'Bluetooth',
      usbPorts: 'Portet USB',
      premiumSound: 'Sistemi audio premium',
      keylessEntry: 'Hyrje pa çelës',
      remoteStart: 'Ndezja në distancë',
      cruiseControl: 'Kontrolli i kursit',
      parkingSensors: 'Sensorët e parkimit',
      blindSpotMonitoring: 'Monitorimi i pikës së verbër',
    },
  },

  countries: {
    northMacedonia: 'Maqedonia e Veriut',
    albania: 'Shqipëria',
    kosovo: 'Kosova',
    slovenia: 'Sllovenia',
    latvia: 'Letonia',
    global: 'Global',
    chooseCountry: 'Zgjidhni vendin tuaj',
    changeCountry: 'Ndrysho vendin',
    detectedLocation: 'Vendndodhja e zbuluar',
    currentSite: 'Faqja aktuale',
    localBenefits: 'Përfitimet lokale',
    localCurrency: 'Monedha dhe çmimet lokale',
    localLanguages: 'Mbështetja e gjuhës amtare',
    localDealers: 'Dilerët dhe inventari lokal',
    regionalFeatures: 'Karakteristikat rajonale',
  },

  redirect: {
    welcome: 'Mirë se vini në CarMarket365!',
    detectedFrom: 'Zbuluam se po vizitoni nga',
    redirectMessage: 'Do të ridrejtoheni në faqen tonë të {country} për përvojën më të mirë lokale, ose mund të zgjidhni një vend tjetër.',
    continueToSite: 'Vazhdo në faqen e {country}',
    chooseDifferent: 'Zgjidh një vend tjetër',
    localBenefitsTitle: 'Përfitimet lokale për {country}',
    howDetected: 'Si e zbuluam këtë?',
    hideDetails: 'Fshih detajet',
    changeAnytime: 'Mund ta ndryshoni preferencën tuaj të vendit në çdo kohë nga kreu.',
    countrySpecificExperience: 'Çdo faqe vendi ofron përmbajtje të lokalizuar, çmime dhe opsione gjuhësore për përvojën më të mirë.',
    adminTestingMode: 'Modaliteti i administratorit/testimit',
    adminNotAvailable: 'Modaliteti i administratorit/testimit - nuk është i disponueshëm për klientët',
    selectCountryToContinue: 'Ju lutemi zgjidhni vendin tuaj për të vazhduar. Kjo do të përcaktojë faqen tuaj lokale, gjuhën dhe monedhën.',
  },

  pages: {
    about: 'Rreth nesh',
    carReviews: 'Recensionet e makinave',
    safetyTips: 'Këshilla sigurie',
    dealerSupport: 'Mbështetja e dilerëve',
    contactUs: 'Na kontaktoni',
    cookiePolicy: 'Politika e cookies',
    imprint: 'Impresumi',
    accessibility: 'Aksesueshmëria',
    signUp: 'Regjistrohu',
    signIn: 'Kyçu',
    dashboard: 'Paneli',
    adminDashboard: 'Paneli i administratorit',
    dealerDashboard: 'Paneli i dilerit',
    privateDashboard: 'Paneli privat',
    browseCars: 'Shfleto makinat',
    savedCars: 'Makinat e ruajtura',
    sellCar: 'Shit makinën',
    financing: 'Financimi',
    advancedSearch: 'Kërkim i avancuar',
    carDetail: 'Detajet e makinës',
    dealers: 'Dilerët',
    myAccount: 'Llogaria ime',
    settings: 'Cilësimet',
    helpCenter: 'Qendra e ndihmës',
    feedback: 'Përshtypjet',
    disclaimer: 'Përgjegjshmëria',
    carInsurance: 'Sigurimi i makinës',
    underConstruction: 'Në ndërtim',
    underConstructionMessage: 'Kjo faqe është aktualisht në ndërtim. Po punojmë fort për t\'ju sjellë karakteristika të mahnitshme. Ju lutemi kontrolloni përsëri së shpejti ose vazhdoni të eksploroni faqen tonë kryesore.',
    backToHome: 'Kthehu në fillore',

    // Kushtet e Shërbimit
    termsOfService: {
      title: 'Kushtet e Shërbimit',
      subtitle: 'Kushtet ligjore dhe konditat për përdorimin e platformës sonë të tregut të makinave.',
      backToHome: 'Kthehu në fillore',
      termsAndConditions: 'Kushtet dhe Konditat',
      termsDescription: 'Ju lutemi lexoni këto kushte me kujdes përpara përdorimit të platformës sonë.',
      overviewText: 'Këto Kushte të Shërbimit rregullojnë përdorimin tuaj të CarMarket365 dhe përcaktojnë të drejtat dhe përgjegjësitë e të gjithë përdoruesve. Duke aksesuar platformën tonë, ju pajtoheni të jeni të lidhur nga këto kushte.',
      userResponsibilities: 'Përgjegjësitë e Përdoruesit',
      userResponsibilitiesList: [
        'Të jepni informacione të sakta',
        'Të ruani komunikim të respektuar',
        'Të ndiqni të gjitha ligjet e zbatueshme',
        'Të mbrojnë kredencialet e llogarisë suaj'
      ],
      platformRules: 'Rregullat e Platformës',
      platformRulesList: [
        'Asnjë shpallje mashtrues',
        'Përshkrimi i ndershëm i automjetit',
        'Komunikim profesional',
        'Respektoni privatësinë e përdoruesve të tjerë'
      ],
      serviceLimitations: 'Kufizimet e Shërbimit',
      serviceLimitationsList: [
        'Disponueshmëria e platformës nuk garantohet',
        'Mirëmbajtja mund të shkaktojë kohë për punë',
        'Përgjegjshmëria e kufizuar për veprimet e përdoruesve',
        'Asnjë garanci për përmbajtjen e palëve të treta'
      ],
      disputeResolution: 'Zgjidhja e Mosmarrëveshjeve',
      disputeResolutionList: [
        'Komunikimi i drejtpërdrejtë inkurajohet',
        'Ndërmjetësimi i platformës është i disponueshëm',
        'Procedurat e përshkallëzimit përcaktohen',
        'Zgjidhjet ligjore ruhen'
      ],
      additionalTerms: 'Kushte Shtesë të Rëndësishme',
      additionalTermsDescription: 'Dispozita kyçe që rregullojnë përdorimin tuaj të platformës sonë.',
      accountManagement: 'Menaxhimi i Llogarisë',
      accountManagementList: [
        'Një llogari për person',
        'Kërkesat e sigurta për fjalëkalim',
        'Politikat e pezullimit të llogarisë',
        'Ruajtja e të dhënave pas përfundimit'
      ],
      intellectualProperty: 'Pronësia Intelektuale',
      intellectualPropertyList: [
        'Pronësia e përmbajtjes së platformës',
        'Të drejtat e përmbajtjes së krijuar nga përdoruesit',
        'Udhëzimet e përdorimit të markës tregtare',
        'Politikat e shkeljes së të drejtave të autorit'
      ],
      questionsAboutTerms: 'Pyetje Rreth Këtyre Kushteve?',
      questionsText: 'Nëse keni pyetje rreth këtyre kushteve ose keni nevojë për sqarime në çdo dispozitë, ju lutemi kontaktoni ekipin tonë ligjor në legal@carmarket365.com',
      returnToPlatform: 'Kthehu në Platformë',
      contactLegalTeam: 'Kontakto Ekipin Ligjor'
    },

    // Politika e Privatësisë
    privacyPolicy: {
      title: 'Politika e Privatësisë',
      subtitle: 'Privatësia juaj është e rëndësishme për ne. Mësoni si i mbledhim, përdorim dhe mbrojmë informacionet tuaja personale.',
      backToHome: 'Kthehu në fillore',
      ourPrivacyCommitment: 'Angazhimi Ynë për Privatësinë',
      commitmentDescription: 'Në CarMarket365, jemi të angazhuar për mbrojtjen e privatësisë suaj dhe sigurimin që informacionet tuaja personale të jenë të sigurta.',
      overviewText: 'Kjo politikë privatësie shpjegon se si i mbledhim, përdorim, zbulojmë dhe mbroimë informacionet tuaja kur përdorni platformën tonë të tregut të makinave. Jemi të angazhuar për të mbajtur standardet më të larta të mbrojtjes së privatësisë dhe sigurisë së të dhënave.',
      dataSecurity: 'Siguria e të Dhënave',
      dataSecurityList: [
        'Enkriptimi i standardit të industrisë',
        'Transmeti i sigurt i të dhënave',
        'Kontrolle sigurie të rregullta',
        'Kontrollet e aksesit të kufizuar'
      ],
      transparency: 'Transparenca',
      transparencyList: [
        'Praktikat e qarta të mbledhjes së të dhënave',
        'Të hapur për përdorimin e të dhënave',
        'Përditësime të rregullta të politikave',
        'Njoftimi i përdoruesit për ndryshimet'
      ],
      userRights: 'Të Drejtat e Përdoruesit',
      userRightsList: [
        'Aksesi në të dhënat tuaja',
        'E drejta për të korrigjuar informacionin',
        'Kërkesa për fshirjen e të dhënave',
        'Përjashtim nga komunikimet'
      ],
      dataMinimization: 'Minimizimi i të Dhënave',
      dataMinimizationList: [
        'Mbledhja vetëm e të dhënave të nevojshme',
        'Përdorimi i kufizuar për qëllime',
        'Skadimi automatik i të dhënave',
        'Pastrimi i rregullt i të dhënave'
      ],
      informationWeCollect: 'Informacionet që Mbledhim',
      informationDescription: 'Ne mbledhim informacione që jepni drejtpërdrejt dhe automatikisht kur përdorni platformën tonë.',
      personalInformation: 'Informacionet Personale',
      personalInformationList: [
        'Emri dhe detajet e kontaktit',
        'Informacionet e regjistrimit të llogarisë',
        'Preferencat e komunikimit',
        'Informacionet e profilit'
      ],
      usageData: 'Të Dhënat e Përdorimit',
      usageDataList: [
        'Të dhënat e ndërveprimit të faqes së internetit',
        'Kërkimi dhe historia e shfletimit',
        'Informacionet e pajisjes dhe shfletuesit',
        'Të dhënat e vendndodhjes (kur lejohen)'
      ],
      questionsAboutPrivacy: 'Pyetje Rreth Privatësisë?',
      privacyQuestionsText: 'Nëse keni pyetje rreth kësaj politike privatësie ose praktikave tona të të dhënave, ju lutemi kontaktoni ekipin tonë të privatësisë në privacy@carmarket365.com',
      returnToPlatform: 'Kthehu në Platformë',
      contactPrivacyTeam: 'Kontakto Ekipin e Privatësisë'
    },

    // Faqja Vendmbajtëse
    placeholder: {
      underConstruction: 'Në ndërtim',
      underConstructionMessage: 'Kjo faqe është aktualisht në ndërtim. Po punojmë fort për t\'ju sjellë karakteristika të mahnitshme. Ju lutemi kontrolloni përsëri së shpejti ose vazhdoni të eksploroni faqen tonë kryesore.',
      backToHome: 'Kthehu në fillore',
      contactUs: 'Na kontaktoni'
    },

    // Faqja e Pyetjeve të Shpeshta
    faq: {
      title: 'Pyetje të Shpeshta',
      subtitle: 'Gjeni përgjigje për pyetjet e zakonshme rreth blerjes, shitjes, financimit dhe përdorimit të CarMarket365.',
      searchPlaceholder: 'Kërkoni në pyetjet e shpeshta...',
      browseByCategory: 'Shfletoni sipas Kategorisë',
      allQuestions: 'Të Gjitha Pyetjet',
      stillNeedHelp: 'Ende Keni Nevojë për Ndihmë?',
      stillNeedHelpDescription: 'Nuk gjeni atë që kërkoni? Ekipi ynë i mbështetjes është këtu për të ndihmuar.',
      callSupport: 'Telefono Mbështetjen',
      emailUs: 'Na Dërgoni Email',
      liveChat: 'Chat i Drejtpërdrejtë',
      available247: 'I disponueshëm 24/7',
      noResultsFound: 'Nuk u gjetën rezultate',
      noResultsText: 'Provoni të kërkoni me fjalë kyçe të ndryshme ose shfletoni sipas kategorisë.',
      clearSearch: 'Pastro Kërkimin',
      commonQuestionsAbout: 'Pyetje të zakonshme rreth',
      
      categories: {
        buying: 'Blerja e Makinave',
        selling: 'Shitja e Makinave',
        financing: 'Financimi dhe Pagesat',
        safety: 'Siguria dhe Mbrojtja',
        account: 'Llogaria dhe Mbështetja'
      },

      buyingFaqs: [
        {
          question: 'Si kërkoi makina në CarMarket365?',
          answer: 'Mund të kërkoni makina duke përdorur formularin e kërkimit në faqen kryesore ose faqen Shfletoni Makinat. Filtroni sipas markës, modelit, vitit, intervalit të çmimit, vendndodhjes dhe më shumë. Përdorni kërkimin e avancuar për opsione të detajuara të filtrimit.'
        },
        {
          question: 'A janë të gjitha shpalljet e verifikuara?',
          answer: 'Po, të gjitha shpalljet në CarMarket365 janë të verifikuara. Ne bëjmë kontrolle të sfondit për të gjithë dilerët dhe shitësit privatë, dhe inspektojmë informacionet e automjetit për saktësi para shpalljes.'
        },
        {
          question: 'A mund të planifikoj një provë drejtimi?',
          answer: 'Absolutisht! Mund të planifikoni prova drejtimi drejtpërdrejt përmes faqes së detajeve të makinës. Kontaktoni shitësin për të organizuar një kohë dhe vendndodhje të përshtatshme për provën tuaj të drejtimit.'
        },
        {
          question: 'Çfarë duhet të sjell për të parë një makinë?',
          answer: 'Sillni një licencë drejtimi të vlefshme, vërtetim sigurie dhe çdo letër parapagimi financimi. Nëse planifikoni të blini, sillni një çek kasieri ose dokumente financimi.'
        },
        {
          question: 'Si e di nëse një makinë ka çmim të drejtë?',
          answer: 'Ne ofrojmë vlerësime të vlerës së tregut për të gjitha automjetet. Gjithashtu mund të krahasoni automjete të ngjashme, të kontrolloni raportin e historisë së automjetit dhe të përdorni mjetet tona të analizës së çmimit.'
        },
      ],

      sellingFaqs: [
        {
          question: 'Si shpall makinën time për shitje?',
          answer: 'Përdorni formularin tonë "Shit Makinën Tuaj" për të krijuar një shpallje. Do t\'ju duhen detajet e automjetit, fotot, informacionet e gjendjes dhe detajet e kontaktit. Procesi merr rreth 10-15 minuta.'
        },
        {
          question: 'A ka tarifë për të shpallur makinën time?',
          answer: 'Shpalljet bazë janë falas për shitësit privatë. Ne ofrojmë opsione shpalljevch premium me dukuri të rritur për një tarifë të vogël. Dilerët kanë struktura çmimesh të ndryshme.'
        },
        {
          question: 'Sa kohë duhet për të shitur një makinë?',
          answer: 'Në mesatare, makinat me çmim të mirë dhe foto të mira shiten brenda 2-4 javësh. Faktorët përfshijnë çmimin, gjendjen, kërkesën e tregut dhe cilësinë e shpalljes.'
        },
        {
          question: 'Çfarë dokumentesh më duhen për të shitur makinën time?',
          answer: 'Do t\'ju duhet titulli i automjetit, regjistrimi, regjistrimet e mirëmbajtjes dhe një identifikim të vlefshëm. Disa shtete kërkojnë dokumentación shtesë - ne ofrojmë udhëzime specifike për shtetin.'
        },
        {
          question: 'Si e çmojs makinën time në mënyrë konkurruese?',
          answer: 'Përdorni mjeti ynë falas të vlerësimit të automjetit, kërkoni shpallje të ngjashme, konsideroni gjendjen e makinës suaj, kilometrazhin dhe çdo riparim apo përmirësim të fundit.'
        },
      ],

      financingFaqs: [
        {
          question: 'A mund të marr financim përmes CarMarket365?',
          answer: 'Po, ne bashkëpunojmë me disa kreditorë për të ofruar opsione financimi konkurues. Mund të përpaproni online në minuta pa prekur rezultatin tuaj të kreditit.'
        },
        {
          question: 'Çfarë rezultati krediti më duhet për financim automobili?',
          answer: 'Ne punojmë me kreditorë që pranojnë rezultate të ndryshme krediti, nga i shkëlqyer deri në kredi të dobët. Kërkesat ndryshojnë sipas kreditorit, por ne ndihmojmë të gjejmë opsione për shumicën e situatave.'
        },
        {
          question: 'Si funksionon procesi i aplikimit për kredi?',
          answer: 'Plotësoni aplikimin tonë online, merrni menjëherë paraprovim, zgjidhni automjetin tuaj dhe finalizoni kredinë. I gjithë procesi mund të kryhet online ose në telefon.'
        },
        {
          question: 'Cila është ndryshimi midis para-kualifikimit dhe para-aprovimit?',
          answer: 'Para-kualifikimi ju jep një vlerësim të bazuar në informacione bazë. Para-aprovimi përfshin një kontroll krediti dhe ofron një ofertë të qëndrueshme kredie me kushte specifike.'
        },
        {
          question: 'A mund të këmbej makinën time aktuale?',
          answer: 'Shumë nga partnerët tanë dilerë pranojnë këmbime. Merrni një vlerësim këmbimi duke përdorur mjeti ynë të vlerësimit, pastaj diskutoni opsionet me dilerin gjatë blerjes.'
        },
      ],

      safetyFaqs: [
        {
          question: 'Si qëndroj i sigurt kur blej një makinë?',
          answer: 'Takohuni në vende publike, sillni një mik, verifikoni identitetin e shitësit, inspektoni automjetin plotësisht dhe përdorni metoda pagese të sigurta. Kurrë mos dërgoni para me transfer ose paguani para se të shihni makinën.'
        },
        {
          question: 'Cilat metoda pagese janë më të sigurtat?',
          answer: 'Përdorni çekë kasieri, transfere bankare ose financim përmes kreditorëve të verifikuar. Shmangni transferet me tela, çekët personalë ose paratë cash për shuma të mëdha.'
        },
        {
          question: 'Si verifikoj se një shitës është i ligjshëm?',
          answer: 'Kontrolloni profilin e tyre në CarMarket365, lexoni recensionet, verifikoni informacionet e kontaktit dhe takohuni personalisht. Të gjithë dilerët tanë janë para-verifikuar dhe kanë kontroll sfondi.'
        },
        {
          question: 'Çfarë duhet të bëj nëse dyshoj mashtrim?',
          answer: 'Raportoni menjëherë aktivitetin e dyshimtë përmes platformës sonë ose kontaktoni ekipin tonë të mbështetjes. Ne e marrim mashtrimin seriozisht dhe hetojmë të gjitha raportet menjëherë.'
        },
        {
          question: 'A janë raportet e historisë së automjetit të besueshme?',
          answer: 'Po, ne ofrojmë raporte gjithëpërfshirëse historie automjeti nga burime të besuara. Këto përfshijnë historinë e aksidenteve, regjistrimet e mirëmbajtjes dhe informacionet e titullit.'
        },
      ],

      accountFaqs: [
        {
          question: 'Si krioi një llogari?',
          answer: 'Klikoni "Regjistrohu" në çdo faqe dhe jepni email-in tuaj, numrin e telefonit dhe informacionet bazë. Gjithashtu mund të regjistroheni duke përdorur Google ose Facebook për regjistrim më të shpejtë.'
        },
        {
          question: 'Harrova fjalëkalimin tim. Si ta rivendos?',
          answer: 'Klikoni "Fjalëkalim i harruar" në faqen e kyçjes, shkruani email-in tuaj dhe ndiqni udhëzimet e rivendosjes që do t\'ju dërgojmë. Lidhja e rivendosjes është e vlefshme për 24 orë.'
        },
        {
          question: 'Si përditësoj informacionet e profilit tim?',
          answer: 'Kyçuni në llogarinë tuaj dhe shkoni në "Cilësimet e Llogarisë" ku mund të përditësoni informacionet personale, detajet e kontaktit dhe preferencat.'
        },
        {
          question: 'A mund të ruaj makina për t\'i parë më vonë?',
          answer: 'Po! Klikoni ikonën e zemrës në çdo shpallje makine për ta ruajtur në të preferuarat tuaja. Aksesoni makinat tuaja të ruajtura në çdo kohë nga paneli i llogarisë.'
        },
        {
          question: 'Si kontaktoj mbështetjen për klientë?',
          answer: 'Përdorni faqen tonë Na Kontaktoni, telefononi (555) 123-HELP, email-o support@carmarket365.com, ose përdorni funksionin e chat-it në këndin e poshtëm djathtas të çdo faqe.'
        },
      ],
    },
    
    registeredDealers: {
      dealers: {
        automaxpremium: 'AutoMaks Premium',
        citymotorsgmbh: 'City Motors GmbH',
        ecowheelshamburg: 'EkoRrota Hamburg',
        rheinautosolutions: 'Rein Auto Zgjidhjet'
      }
    }
  },


  carSpecs: {
  },

  dashboard: {
    overview: 'Përmbledhje',
    listings: 'Shpalljet',
    inquiries: 'Pyetjet',
    analytics: 'Analitika',
    reports: 'Raportet',
    userManagement: 'Menaxhimi i përdoruesve',
    allListings: 'Të gjitha shpalljet',
    myListings: 'Shpalljet e mia',
    savedCars: 'Makinat e ruajtura',
    lastSearch: 'Kërkimi i fundit',
    expressSale: 'Express Sale',
    contact: 'Kontakt',
    settings: 'Cilësimet',
    profile: 'Profili',
    adminPanel: 'Paneli i administratorit',
    dealerDashboard: 'Paneli i dilerit',
    myDashboard: 'Paneli im',
    signInToAccessDashboard: 'Kyçuni për të aksesuar panelin',
  },

  business: {
    quickLinks: 'Lidhje të shpejta',
    support: 'Mbështetja',
    legal: 'Ligjore',
    companyInfo: 'Informacionet e kompanisë',
    searchCars: 'Kërko makina',
    sellYourCar: 'Shit makinën tuaj',
    registeredDealers: 'Dilerë të regjistruar',
    carReviews: 'Recensionet e makinave',
    contactUs: 'Na kontaktoni',
    safetyTips: 'Këshilla sigurie',
    dealerSupport: 'Mbështetja e dilerëve',
    frequentlyAskedQuestions: 'Pyetje të shpeshta',
    privacyPolicy: 'Politika e privatësisë',
    termsOfService: 'Kushtet e shërbimit',
    cookiePolicy: 'Politika e cookies',
    imprint: 'Impresumi',
    accessibility: 'Aksesueshmëria',
    allRightsReserved: 'Të gjitha të drejtat e rezervuara',
    trustedMarketplace: 'Treg i besuar',
    qualityUsedCars: 'Makina të përdorura me cilësi',
    perfectVehicle: 'Automjeti i përsosur',
    thousandsOfListings: 'Mijëra shpallje',
  },

  footer: {
    aboutUs: 'Tregu juaj i besuar për makina cilësore të përdorura. Gjeni automjetin tuaj të përsosur nga mijëra shpallje.',
    quickLinks: 'Lidhje të shpejta',
    searchCars: 'Kërkoni makina',
    sellYourCar: 'Shisni makinën tuaj',
    registeredDealers: 'Dilerë të regjistruar',
    carReviews: 'Recensionet e makinave',
    support: 'Mbështetja',
    contactUs: 'Na kontaktoni',
    safetyTips: 'Këshilla sigurie',
    dealerSupport: 'Mbështetja e dilerëve',
    faq: 'Pyetje të shpeshta',
    legal: 'Ligjore',
    privacyPolicy: 'Politika e privatësisë',
    termsOfService: 'Kushtet e shërbimit',
    cookiePolicy: 'Politika e cookies',
    imprint: 'Impresumi',
    accessibility: 'Aksesueshmëria',
    dashboard: 'Paneli',
    adminPanel: 'Paneli i administratorit',
    dealerDashboard: 'Paneli i dilerit',
    myDashboard: 'Paneli im',
    signInToAccess: 'Kyçuni për të hyrë në panel',
    followUs: 'Na ndiqni',
    newsletter: 'Buletini',
    subscribeNewsletter: 'Abonohu në buletin',
    emailAddress: 'Adresa e email-it',
    subscribe: 'Abonohu',
    copyright: 'E drejta e autorit',
    allRightsReserved: 'Të gjitha të drejtat e rezervuara',
  },

  errors: {
    generic: 'Diçka shkoi keq. Ju lutemi provoni përsëri.',
    network: 'Gabim në rrjet. Ju lutemi kontrolloni lidhjen tuaj.',
    notFound: 'Artikulli i kërkuar nuk u gjet.',
    unauthorized: 'Nuk jeni të autorizuar të aksesoni këtë resurs.',
    forbidden: 'Aksesi në këtë resurs është i ndaluar.',
    serverError: 'Gabim në server. Ju lutemi provoni më vonë.',
    validation: 'Ju lutemi kontrolloni të dhënat tuaja dhe provoni përsëri.',
    required: 'Kjo fushë është e detyrueshme.',
    invalidEmail: 'Ju lutemi shkruani një adresë email të vlefshme.',
    invalidPhone: 'Ju lutemi shkruani një numër telefoni të vlefshëm.',
    passwordTooShort: 'Fjalëkalimi duhet të jetë të paktën 8 karaktere i gjatë.',
    passwordMismatch: 'Fjalëkalimet nuk përputhen.',
    fileTooBig: 'Madhësia e skedarit është shumë e madhe.',
    invalidFileType: 'Lloj skedari i pavlefshëm.',
    noInternetConnection: 'Nuk ka lidhje interneti.',
    sessionExpired: 'Sesioni juaj ka skaduar. Ju lutemi kyçuni përsëri.',
    errorBoundary: {
      message: 'Diçka shkoi keq. Ju lutemi rifreskoni faqen.',
      details: 'Detajet e gabimit',
      stackTrace: 'Gjurmimi i gabimit:',
      refreshPage: 'Rifresko faqen',
      tryAgain: 'Provo përsëri',
    },
  },


  // Browse Cars Page
  browseCars: {
    title: 'për shitje',
    searchPlaceholder: 'Marka, modeli ose fjalë kyçe',
    filtersButton: 'Shfaq filtrat',
    sortBy: 'Rendit sipas',
    sortOptions: {
      relevance: 'Relevanca',
      priceLowToHigh: 'Çmimi: nga i ulët te i lartë',
      priceHighToLow: 'Çmimi: nga i lartë te i ulët',
      yearNewestFirst: 'Viti: më të rinj së pari',
      yearOldestFirst: 'Viti: më të vjetër së pari',
      mileageLowToHigh: 'Kilometrazhi: nga i ulët te i lartë',
      mileageHighToLow: 'Kilometrazhi: nga i lartë te i ulët',
      addedRecently: 'Shtuar kohët e fundit',
    },
    viewOptions: {
      grid: 'Rrjetë',
      list: 'Listë',
    },
    carCard: {
      viewDetails: 'Shiko detajet',
      contactSeller: 'Kontakto',
      saveToFavorites: 'Ruaj në të preferuarat',
      saved: 'U ruajt',
      featured: 'Në fokus',
      certified: 'I certifikuar',
      newArrival: 'Ardhje e re',
      priceReduced: 'Çmim i reduktuar',
      greatDeal: 'Ofertë e shkëlqyer',
      kmAbbrev: 'km',
      miAbbrev: 'mi',
      year: 'viti',
      automatic: 'Automatike',
      manual: 'Manuale',
      gasoline: 'Benzinë',
      diesel: 'Dizel',
      electric: 'Elektrike',
      hybrid: 'Hibride',
      showPhone: 'Trego telefonin',
      hidePhone: 'Fsheh telefonin',
      callNow: 'Telefono tani',
      sendMessage: 'Dërgo mesazh',
      scheduleTour: 'Cakto vizitë',
      reportListing: 'Raportoje shpalljen',
      shareListing: 'Shpërnda shpalljen',
    },
    searchSuggestions: {
      title: 'Sugjerime kërkimi',
      recentSearches: 'Kërkesat e fundit',
      clearRecent: 'Pastro të fundit',
      popularSearches: 'Kërkesat popullore',
      suggestedBrands: 'Markat e sugjeruara',
      suggestedModels: 'Modelet e sugjeruara',
      noRecentSearches: 'Nuk ka kërkesa të fundit',
    },
    errorStates: {
      failedToLoad: 'Dështoi ngarkimi',
      networkError: 'Gabim në rrjet',
      tryAgain: 'Provo përsëri',
      contactSupport: 'Kontaktoni mbështetjen',
    },
  },

  // Advanced Search
  advancedSearch: {
    title: 'Kërkimi i përparuar i automjeteve',
    subtitle: 'Gjeni automjetin tuaj të përkryer me filtra të detajuara kërkimi',
    backToHome: 'Kthehu tek faqja kryesore',
    make: 'Marka',
    model: 'Modeli',
    allModels: 'Të gjitha modelet',
    bodyType: 'Lloji i karrocërisë',
    fuelType: 'Lloji i karburantit',
    anyMake: 'Çfarëdo marke',
    anyBodyType: 'Çfarëdo lloji i karrocërisë',
    anyFuelType: 'Çfarëdo lloji i karburantit',
    additionalProperties: 'Vetitë shtesë',
    searchCars: 'Kërko automjete',
    saveSearch: 'Ruaj kërkimin',
    clearAll: 'Pastroji të gjitha',
    active: 'aktiv',
    filters: 'filtra',
    filter: 'filtër',
    
    sections: {
      basicInformation: {
        title: 'Informacioni bazë',
        description: 'Vendosni kriteret tuaja kryesore të kërkimit',
      },
      technicalSpecs: {
        title: 'Specifikimet teknike',
        description: 'Detajet e motorit, transmisionit dhe performancës',
      },
      featuresEquipment: {
        title: 'Veçoritë dhe pajisjet',
        description: 'Zgjidhni veçoritë dhe pajisjet e dëshiruara',
      },
      preferencesAndCertifications: {
        title: 'Preferencat dhe çertifikimet',
        description: 'Preferencat dhe çertifikimet shtesë',
      },
      vehicleDetails: {
        title: 'Detajet e automjetit',
      },
      priceLocation: {
        title: 'Çmimi dhe vendndodhja',
      },
      featuresOptions: {
        title: 'Veçoritë dhe opsionet',
        description: 'Zgjidhni veçoritë që janë të rëndësishme për ju',
      },
      sellerCondition: {
        title: 'Shitësi dhe gjendja e automjetit',
        description: 'Lloji i shitësit dhe gjendja e automjetit'
      },
      appearance: {
        title: 'Ngjyra e karocerisë dhe puna e bojës',
        description: 'Pamja e jashtme dhe ngjyra'
      },
      interior: {
        title: 'Ngjyra e brendshme dhe tapiceria',
        description: 'Pamja e brendshme dhe materialet'
      },
      interiorAppearance: {
        description: 'Pamja e brendshme dhe materialet'
      },
      history: {
        title: 'Pronarët e mëparshëm dhe historia',
        description: 'Detajet e pronësisë dhe historisë së automjetit'
      },
      ownershipHistory: {
        description: 'Detajet e pronësisë dhe historisë së automjetit'
      },
    },

  },

  // Advanced Search specific translations
  fields: {
    previousOwners: 'Pronarët e mëparshëm',
    hadAccident: 'Ka pasur aksident',
    interiorColor: 'Ngjyra e brendshme',
    upholstery: 'Tapiceria'
  },
  labels: {
    owner: 'pronar',
    ownerPlural: 'ë'
  },
  placeholders: {
    anyMaterial: 'Çdo material',
    anyColor: 'Çdo ngjyrë'
  },
    
    
    
    ranges: {
      priceRange: 'Spektri i çmimeve',
      yearRange: 'Spektri i viteve',
      mileageRange: 'Spektri i kilometrazhit (km)',
    },
    
    // Additional properties options
    additionalProperties: {
      certifiedPreOwned: 'I certifikuar dhe i përdorur më parë',
      singleOwner: 'Një pronar',
      accidentFree: 'Pa aksidente',
      serviceRecordsAvailable: 'Evidencat e shërbimit të disponueshme',
      underWarranty: 'Nën garanci',
      recentlyServiced: 'I riparuar kohët e fundit',
      lowMileage: 'Kilometrazh i ulët',
      garageKept: 'Mbajtur në garazh',
      winterPackage: 'Paketa dimërore',
      sportPackage: 'Paketa sportive'
    },
    
    distances: {
      25: 'Brenda 25 km',
      50: 'Brenda 50 km',
      100: 'Brenda 100 km',
      200: 'Brenda 200 km',
      250: 'Brenda 250 km',
      500: 'Brenda 500 km',
      nationwide: 'Në të gjithë vendin',
    },
    
    mileage: {
      under10k: 'Nën 10.000 km',
      under25k: 'Nën 25.000 km',
      under50k: 'Nën 50.000 km',
      under75k: 'Nën 75.000 km',
      under100k: 'Nën 100.000 km',
      under150k: 'Nën 150.000 km',
    },
    
    sellerTypes: {
      dealersOnly: 'Vetëm tregtarët',
      privateOnly: 'Vetëm shitësit privatë',
      certifiedOnly: 'Vetëm tregtarët e çertifikuar',
    },
    
    doors: {
      '2': '2 dyer',
      '3': '3 dyer',
      '4': '4 dyer',
      '5': '5 dyer',
    },
    
    seats: {
      2: '2 ulëse',
      4: '4 ulëse',
      5: '5 ulëse',
      7: '7 ulëse',
      '8+': '8+ ulëse',
    },
    
    // Të dhëna statike të automjeteve për Kërkim të Avancuar
    staticVehicleData: {
      makes: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citroen', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
      bodyTypes: [
        'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Kabriolet', 'Karrocë', 'Pikap', 'Furgon',
        'Minivan', 'Crossover', 'Kompakt', 'Subkompakt', 'Mesatar', 'I madh',
        'Makinë sportive', 'Luksoze', 'Elektrike', 'Hibride'
      ],
      fuelTypes: [
        'Benzinë', 'Naftë', 'Hibride', 'Elektrike', 'Hibride me prizë', 'CNG', 'LPG',
        'Karburant fleksibël', 'Hidrogjen', 'Bio-naftë', 'Etanol E85'
      ],
      transmissions: [
        'Manual', 'Automatik', 'CVT', 'Gjysmë-automatik', 'Çift këmbe', 'Manual 6-shpejtësi',
        'Automatik 7-shpejtësi', 'Automatik 8-shpejtësi', 'Automatik 9-shpejtësi', 'Automatik 10-shpejtësi'
      ],
      
      additionalProperties: ['Makina e Certifikuar', 'Një Pronar', 'Pa Aksident', 'Rekorde Shërbimi Disponueshme', 'Nën Garanci', 'Shërbim i Fundit', 'Kilometrazh i Ulët', 'Ruajtur në Garazh', 'Paketa Dimërore', 'Paketa Sportive'],
      
      drivetrains: [
        'Rrota të përparmë', 'Rrota të pasme', 'Të gjitha rrotat', '4WD', 
        'Kohë të pjesshme 4WD', 'Kohë të plotë 4WD', 'AWD elektronik', 'AWD mekanik'
      ],
      colors: [
        'E zezë', 'E bardhë', 'Argjendore', 'Gri', 'Gri', 'Blu', 'E kuqe', 'E gjelbër', 'Kafe', 
        'Ari', 'E verdhë', 'Portokalli', 'Vjollcë', 'Bezhë', 'Kestenja', 'Bronz', 'Bakër',
        'E bardhë perlë', 'Argjendore metalike', 'Blu e errët', 'E kuqe gare', 'E gjelbër pylli',
        'Qymyr', 'Platinë', 'Tjetër'
      ],
      conditions: [
        'E re', 'Si e re', 'E shkëlqyer', 'Shumë e mirë', 'E mirë', 'E kënaqshme', 'E përdorur', 
        'E certifikuar e përdorur', 'E rinovuar', 'E restauruar', 'Klasike', 'Vintage'
      ],
      
      sellerTypes: ['Shitës Privat', 'Diler', 'Diler i Certifikuar', 'Flota/Qira'],
      
      interiorColors: ['E zezë', 'Gri', 'Bezhë', 'Kafe', 'Tan', 'E bardhë', 'E kuqe', 'Blu', 'Tjetër'],
      
      paintworkTypes: ['Metalik', 'Perlë', 'Mat', 'Shkëlqyese', 'Tjetër'],
      
      upholsteryTypes: ['Pëlhurë', 'Lëkurë e plotë', 'Lëkurë pjesore', 'Alcantara', 'Lëkurë artificiale', 'Tjetër'],
      
      guaranteeOptions: ['Garanci prodhuesi', 'Garanci dileri', 'Garanci e zgjeruar', 'Pa garanci'],
      
      previousOwnersOptions: ['1', '2', '3', '4', '5+'],
      
      turboOptions: ['Natyror Aspiruar', 'Turbo', 'Supercharger', 'Twin Turbo', 'Bi-Turbo'],
      
      enginePositions: ['Përpara', 'Mesme', 'Prapa'],
      
      serviceBookOptions: ['Po', 'Jo', 'Dixhital', 'Pjesore'],
      
      yesNoUnknownOptions: ['Po', 'Jo', 'E panjohur'],
      
      roadworthinessOptions: ['Valide', 'Skaduar', 'E re', 'Nuk kërkohet'],
      
      environmentalBadges: ['Shenja e Gjelbër', 'Shenja e Verdhë', 'Shenja e Kuqe', 'Shenja e Blu', 'Pa Shenjë'],
      
      electricRangeOptions: ['0-50 km', '51-100 km', '101-200 km', '201-300 km', '300+ km', 'Nuk aplikohet'],
      features: [
        'Kondicionim ajri', 'Ulëse lëkure', 'Sistem navigimi', 'Bluetooth', 'Port USB',
        'Kamerë për prapa', 'Sensorë parkimi', 'Ulëse të ngrohura', 'Çati dielli', 'Rrotat aliazh',
        'Kontroll shpejtësie', 'Frenë ABS', 'Kontroll elektronik stabiliteti', 'Airbag',
        'Start me telekomandë', 'Hyrje pa çelës', 'Dritare elektrike', 'Drejtim i fuqizuar', 'Xhama të errëta',
        'Sistem audio premium', 'Radio satelitore', 'CD player', 'MP3 player', 'DVD player',
        'Karikues wireless', 'Apple CarPlay', 'Android Auto', 'Paralajmërim për dalje nga rruga',
        'Monitorim pika të verbër', 'Paralajmërim përplasje frontale', 'Frenime emergjence automatike',
        'Kontroll adaptiv shpejtësie', 'Ndihmë për parkim', 'Kamerë për prapa', 'Kamerë 360 gradë',
        'Timon i ngrohur', 'Ulëse të ftohura', 'Ulëse të ajrosura', 'Ulëse me kujtesë',
        'Ulëse të rregullueshme elektrike', 'Ulëse rreshti i tretë', 'Ulëse të pasme të palosshme', 
        'Mbulesë bagazhi', 'Mbajtës çatie', 'Paket tërheqje', 'Shkallë anësore', 'Shkallë anësore'
      ],
      certifications: [
        'E certifikuar e përdorur', 'Garanci prodhues', 'Garanci e zgjeruar', 
        'Ndihmë rrugore', 'Raport historie automjeti', 'Inspektim shumë-pikësh',
        'Testuar për emetim', 'Inspektuar për siguri', 'I certifikuar nga dealer', 'I certifikuar nga palë e tretë',
        'Carfax i verifikuar', 'AutoCheck i verifikuar', 'Pa aksidente', 'Një pronar',
        'Regjistrime shërbimi të disponueshme', 'Mirëmbajtje e përditësuar'
      ]
    },
    
    // Missing keys from AdvancedSearch component
    description: 'Përdorni filtrat tanë gjithëpërfshirës të kërkimit për të zbuluar automjetin e saktë që po kërkoni',
    searchingRealTime: 'Duke kërkuar në kohë reale...',
    searchControls: 'Kontrollet e Kërkimit',
    refineSearchCriteria: 'Rafinoni kriteret tuaja të kërkimit',
    searching: 'Duke kërkuar...',
    clearAllFilters: 'Pastro të gjithë filtrat',
    activeFilters: 'Filtrat Aktiv',
    realTimeSearch: 'Rezultatet e kërkimit në kohë reale',
    carsFound: 'Makina të Gjetura',
    hasMore: 'Më shumë të disponueshme',
    allShown: 'Të gjitha janë treguar',
    equipment: 'Pajisje',
    countries: 'Vendet',
    colors: 'Ngjyrat',
    emissions: 'Emetimet',
  },

  // Contact Us Page
  contact: {
    departments: {
      phoneSupport: 'Mbështetje telefonike',
      emailAddresses: 'Adresat e email-it',
      businessHours: 'Orët e punës',
      mainOffice: 'Zyrja kryesore',
    },
    departmentTypes: {
      salesDepartment: 'Departamenti i shitjes',
      customerService: 'Shërbimi ndaj klientit',
      financingDepartment: 'Departamenti i financimit',
      generalInquiries: 'Pyetjet e përgjithshme',
      salesQuestions: 'Pyetjet e shitjes',
      support: 'Mbështetje',
    },
    hours: {
      mondayFriday: 'E hënë - E premte',
      saturday: 'E shtunë',
      sunday: 'E diel',
      timeRange: {
        mondayFriday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    office: {
      address: {
        street: 'Auto Plaza 123',
        city: 'Prishtinë 10000',
        country: 'Kosovë',
      },
      getDirections: 'Merrni udhëzimet',
    },
    form: {
      title: 'Na dërgoni një mesazh',
      subtitle: 'Plotësoni formularin më poshtë dhe ne do t\'ju përgjigjemi brenda 24 orëve.',
      inquiryType: {
        label: 'Me çfarë mund t\'ju ndihmojmë?',
        placeholder: 'Zgjidhni llojin e kërkesës',
        options: {
          buying: 'Blerja e një makine',
          selling: 'Shitja e një makine',
          financing: 'Pyetjet për financim',
          dealer: 'Partneriteti i tregtarëve',
          support: 'Mbështetje teknike',
          other: 'Tjetër',
        },
      },
      required: '*',
      submitButton: 'Dërgo mesazhin',
      disclaimer: 'Duke dërguar këtë formular, ju pranoni Kushtet tona të Shërbimit dhe Politikën e Privatësisë.',
    },
    quickHelp: {
      title: 'Ndihmë e shpejtë',
      subtitle: 'Po kërkoni përgjigje të menjëhershme? Kontrolloni këto burime.',
    },
  },

  dealerProfile: {
    dealerNotFound: 'Shitësi nuk u gjet',
    dealerNotFoundMessage: 'Profili i shitësit që kërkoni nuk ekziston.',
    viewAllDealers: 'Shiko të gjithë shitësit',
    browseCars: 'Shfleto makinat',
    backToDealers: 'Kthehu tek shitësit',
    showroom: 'ekspozitë',
    verifiedDealer: 'Shitës i verifikuar',
    milesAway: 'milje larg',
    callDealer: 'Thirr shitësin',
    viewInventory: 'Shiko inventarin',
    visitWebsite: 'Vizito faqen e internetit',
    overview: 'Përmbledhje',
    inventory: 'Inventar',
    reviews: 'Vlerësime',
    contact: 'Kontakt',
    about: 'Rreth',
    servicesOffered: 'Shërbimet e ofruara',
    certificationsAwards: 'Certifikata dhe çmime',
    quickStats: 'Statistika të shpejta',
    established: 'Themeluar',
    teamSize: 'Madhësia e ekipit',
    people: 'njerëz',
    recentSales: 'Shitjet e fundit',
    thisMonth: 'këtë muaj',
    customerSatisfaction: 'Kënaqësia e klientëve',
    responseTime: 'Koha e përgjigjjes',
    businessHours: 'Orët e punës',
    mondayFriday: 'E hënë - E premte:',
    saturday: 'E shtunë:',
    sunday: 'E diel:',
    currentInventory: 'Inventari aktual',
    hasVehiclesAvailable: 'automjete aktualisht të disponueshme',
    viewFullInventory: 'Shiko inventarin e plotë',
    browseAllVehicles: 'Shfleto të gjitha automjetet e disponueshme nga',
    browseCarsCount: 'makina',
    customerReviews: 'Vlerësimet e klientëve',
    verifiedCustomerReviews: 'vlerësime të verifikuara nga klientët',
    verifiedPurchase: 'Blerje e verifikuar',
    contactInformation: 'Informacioni i kontaktit',
    primaryPhone: 'Telefoni kryesor',
    emailAddress: 'Adresa e email-it',
    website: 'Faqja e internetit',
    physicalAddress: 'Adresa fizike',
    getDirections: 'Merr udhëzimet',
    interactiveMapPlaceholder: 'Harta interaktive do të ishte këtu',
    openInGoogleMaps: 'Hap në Google Maps',
  },

  dealerSupport: {
    backToHome: 'Kthehu në shtëpi',
    title: 'Mbështetja e shitësve',
    subtitle: 'Mbështetje e dedikuar për shitësit e regjistruar. Merrni ndihmë me listimet tuaja, menaxhimin e llogarisë dhe veçoritë e platformës.',
    supportCenter: 'Qendra e mbështetjes së shitësve',
    supportCenterDescription: 'Mbështetje gjithëpërfshirëse për partnerët tanë të regjistruar shitës.',
    quickActions: 'Veprime të shpejta',
    accountManagement: 'Menaxhimi i llogarisë',
    accountManagementDesc: 'Menaxhoni cilësimet dhe preferencat e llogarisë tuaj si shitës',
    manageAccount: 'Menaxho llogarinë',
    listingHelp: 'Ndihmë për listime',
    listingHelpDesc: 'Merrni ndihmë me listimet e automjeteve dhe inventarin tuaj',
    getListingHelp: 'Merr ndihmë për listime',
    analyticsReports: 'Analitika dhe raporte',
    analyticsReportsDesc: 'Shikoni metrikat e performancës dhe gjeneroni raporte',
    viewAnalytics: 'Shiko analitikën',
    contactSupport: 'Kontakto mbështetjen',
    contactSupportDesc: 'Lidhuni me ekipin tonë të mbështetjes',
    contactUs: 'Na kontaktoni',
    supportChannels: 'Kanalet e mbështetjes',
    supportChannelsDesc: 'Mënyra të shumta për të marrë ndihmë kur ju nevojitet',
    phone: 'Telefon',
    phoneNumber: '1-800-555-0199',
    email: 'Email',
    emailAddress: 'dealers@carmarket365.com',
    liveChat: 'Chat i drejtpërdrejtë',
    startChat: 'Fillo bisedë',
    businessHours: 'Orët e punës',
    mondayFriday: 'E hënë - E premte: 8:00 - 20:00 EST',
    weekendHours: 'E shtunë: 9:00 - 17:00 EST',
    phoneHours: 'Mbështetja telefonike e disponueshme gjatë orëve të punës',
    emailHours: 'Mbështetja me email: 24/7 përgjigje brenda 4 orësh',
    chatHours: 'Chat i drejtpërdrejtë i disponueshëm gjatë orëve të punës',
    commonTopics: 'Temat e zakonshme',
    commonTopicsDesc: 'Temat e kërkuara shpesh për mbështetje',
    gettingStarted: 'Fillimi',
    gettingStartedDesc: 'Orientimi i shitësve të rinj dhe konfigurimi i llogarisë',
    listingOptimization: 'Optimizimi i listimeve',
    listingOptimizationDesc: 'Këshilla për të përmirësuar dukshmërinë e listimeve tuaja',
    paymentBilling: 'Pagesa dhe faturimi',
    paymentBillingDesc: 'Pyetje rreth faturimit dhe probleme me pagesat',
  },


  expressSell: {
    title: 'Shit makinën tënde shpejt',
    subtitle: 'Vendos makinën tënde në shitje për minuta me procesin tonë të shpejtë të shitjes',
    backToHome: 'Kthehu në shtëpi',
    step: 'Hapi',
    of: 'nga',
    carDetails: 'Detajet e makinës',
    carDetailsDescription: 'Na thuaj për makinën tënde për të krijuar një listim tërheqës',
    make: 'Marka',
    makeRequired: 'Marka *',
    selectMake: 'Përzgjidh markën',
    model: 'Modeli',
    modelRequired: 'Modeli *',
    selectModel: 'Përzgjidh modelin',
    year: 'Viti',
    yearRequired: 'Viti *',
    selectYear: 'Përzgjidh vitin',
    mileage: 'Kilometrat',
    mileageRequired: 'Kilometrat *',
    enterMileage: 'Shkruaj kilometrat',
    kilometers: 'kilometra',
    fuelType: 'Lloji i karburantit',
    fuelTypeRequired: 'Lloji i karburantit *',
    selectFuelType: 'Përzgjidh llojin e karburantit',
    gasoline: 'Benzinë',
    diesel: 'Naftë',
    electric: 'Elektrike',
    hybrid: 'Hibride',
    transmission: 'Transmisioni',
    transmissionRequired: 'Transmisioni *',
    selectTransmission: 'Përzgjidh transmisionin',
    manual: 'Manual',
    automatic: 'Automatik',
    condition: 'Gjendja',
    conditionRequired: 'Gjendja *',
    selectCondition: 'Përzgjidh gjendjen',
    excellent: 'Shkëlqyeshme',
    veryGood: 'Shumë mirë',
    good: 'Mirë',
    fair: 'Mesatare',
    price: 'Çmimi',
    priceRequired: 'Çmimi *',
    enterPrice: 'Shkruaj çmimin e kërkuar',
    euros: 'euro',
    description: 'Përshkrimi',
    descriptionOptional: 'Përshkrimi (Opsional)',
    enterDescription: 'Shkruaj përshkrimin',
    descriptionPlaceholder: 'Përshkruaj karakteristikat, gjendjen dhe historinë e makinës tënde...',
    photosAndContact: 'Fotot dhe kontakti',
    photosAndContactDescription: 'Shto fotot dhe informacionet e kontaktit',
    carPhotos: 'Fotot e makinës',
    carPhotosRequired: 'Fotot e makinës *',
    uploadPhotos: 'Ngarko fotot',
    photosUploaded: 'foto të ngarkuara',
    contactInformation: 'Informacioni i kontaktit',
    fullName: 'Emri i plotë',
    fullNameRequired: 'Emri i plotë *',
    enterName: 'Shkruaj emrin tënd të plotë',
    phoneNumber: 'Numri i telefonit',
    phoneRequired: 'Telefoni *',
    enterPhone: 'Shkruaj numrin e telefonit',
    emailAddress: 'Adresa e email-it',
    emailRequired: 'Email-i *',
    enterEmail: 'Shkruaj adresën e email-it',
    location: 'Vendndodhja',
    locationRequired: 'Vendndodhja *',
    enterLocation: 'Shkruaj vendndodhjen tënde',
    preview: 'Parapamja',
    previewDescription: 'Shiko listimin tënd para se ta publikosh',
    yourListing: 'Listimi yt',
    listingPreview: 'Parapamja e listimit',
    photos: 'Fotot',
    contactDetails: 'Detajet e kontaktit',
    previous: 'I mëparshmi',
    next: 'Tjetri',
    publishListing: 'Publiko listimin',
    successMessage: 'Makina jote është listuar me sukses!',
    requiredField: 'Kjo fushë është e detyrueshme',
  },

  admin: {
    panel: 'Paneli i administratorit',
    dashboard: 'Paneli i administratorit',
  },

  // Paneli privat
  privateDashboard: {
    title: 'Paneli im',
    subtitle: 'Menaxho listat e automjeteve dhe llogari',
    welcome: 'Mirë se erdhe përsëri',
    savedCars: 'Automjetet e ruajtura',
    lastSearch: 'Kërkimi i fundit',
    search: 'Kërko',
    yourListings: 'Listat tuaja',
    expressSale: 'Express Sale',
    express: 'Shpejtë',
    contact: 'Kontakto',
    settings: 'Cilësimet',
    saved: 'I ruajtur',
    viewDetails: 'Shiko detajet',
    remove: 'Hiq',
    startNewSearch: 'Fillo kërkim të ri',
    viewMyListings: 'Shiko listat e mia',
    savedOn: 'I ruajtur më',
    welcomeBack: 'Mirë se erdhe përsëri',
    manageExperience: 'menaxho përvojën tënde në tregun e automjeteve',
    // Last Search Tab
    lastSearches: 'Kërkimet e fundit',
    recentSearchHistory: 'Historia e kërkimeve të fundit dhe kërkim e ruajtura',
    newSearch: 'Kërkim i ri',
    resultsFound: 'rezultate u gjetën',
    searchedOn: 'Kërkuar më',
    searchAgain: 'Kërko përsëri',
    viewResults: 'Shiko rezultatet',
    results: 'Rezultate',
    // User Listings Tab
    myListings: 'Listat e mia',
    carsListedForSale: 'Automjetet që keni vendosur për shitje',
    createNewListing: 'Krijo listë të re',
    newListing: 'Listë e re',
    views: 'shikimet',
    inquiries: 'pyetjet',
    listed: 'Listuar',
    edit: 'Redakto',
    view: 'Shiko',
    delete: 'Fshi',
    // Express Sale Tab
    expressSaleListings: 'Express Sale Listings',
    quickSaleRequests: 'Kërkesat për shitje të shpejtë të dërguara tek shitësit',
    newExpressSale: 'New Express Sale',
    newExpress: 'Shpejtë e re',
    underReview: 'Në shqyrtim',
    photos: 'foto',
    estimatedValue: 'Vlera e vlerësuar:',
    submittedOn: 'Dërguar më',
    // Contact Details Tab
    contactDetails: 'Detajet e kontaktit',
    manageContactInfo: 'Menaxho informacionet e kontaktit dhe profilin',
    personalInformation: 'Informacione personale',
    updateProfileDetails: 'Përditëso detajet e profilit',
    changePhoto: 'Ndrysho foton',
    firstName: 'Emri',
    lastName: 'Mbiemri',
    emailAddress: 'Adresa e email-it',
    phoneNumber: 'Numri i telefonit',
    city: 'Qyteti',
    country: 'Vendi',
    saveChanges: 'Ruaj ndryshimet',
    // Account Settings Tab
    accountSettings: 'Cilësimet e llogarisë',
    manageAccountPreferences: 'Menaxho preferencat e llogarisë dhe cilësimet e privatësisë',
    notifications: 'Njoftimet',
    configureNotifications: 'Konfiguro si të marrësh njoftimet',
    emailNotifications: 'Njoftimet me email',
    receiveUpdatesViaEmail: 'Merr përditësimet përmes email-it',
    newListingsAlerts: 'Alarmet për lista të reja',
    notifyNewCarsMatching: 'Merr njoftimet për automjete të reja që përputhen me kërkim tuaja',
    priceDropAlerts: 'Alarmet për uljen e çmimit',
    notifyPriceDrops: 'Merr njoftimet kur automjetet e ruajtura ulin çmimin',
    inquiryNotifications: 'Njoftimet për pyetjet',
    notifyInquiries: 'Merr njoftimet për pyetjet në listat tuaja',
    privacySettings: 'Cilësimet e privatësisë',
    controlPrivacyPreferences: 'Kontrollo preferencat e privatësisë dhe ndarjen e të dhënave',
    profileVisibility: 'Dukshmëria e profilit',
    makeProfileVisible: 'Bëje profilin të dukshëm për përdoruesit e tjerë',
    showContactInfo: 'Trego informacionet e kontaktit',
    displayContactOnListings: 'Shfaq informacionet e kontaktit në lista',
    dataAnalytics: 'Analitika e të dhënave',
    helpImproveService: 'Ndihmo për të përmirësuar shërbimin me analitikën e përdorimit',
    accountManagement: 'Menaxhimi i llogarisë',
    manageAccountAndData: 'Menaxho llogarinë dhe të dhënat',
    downloadMyData: 'Shkarko të dhënat e mia',
    changePassword: 'Ndrysho fjalëkalimin',
    deleteAccount: 'Fshi llogarinë',
    // Success/Error Messages
    profileUpdatedSuccessfully: 'Profili u përditësua me sukses!',
    carRemovedFromSaved: 'Automjeti u hoq nga lista e ruajturave!',
    listingDeletedSuccessfully: 'Lista u fshi me sukses!',
    welcomeBackMessage: 'Mirë se erdhe përsëri {name} - menaxho përvojën tende në tregun e automjeteve',
    // Status translations
    statusActive: 'Aktiv',
    statusUnderReview: 'Në shqyrtim',
    statusSold: 'E shitur',
    statusExpired: 'E skaduar',
    // Fuel type translations
    fuelDiesel: 'Dizeli',
    fuelPetrol: 'Benzinë',
    fuelHybrid: 'Hibrid',
    fuelElectric: 'Elektrik',
    fuelGas: 'Gaz'
  },

  // Automjetet e ruajtura
  savedCars: {
    title: 'Automjetet e ruajtura',
    subtitle: 'Menaxho automjetet e tua të preferuara dhe listën e dëshirave',
    filterBySavedDate: 'Filtro sipas datës së ruajtjes',
    filterByPriceRange: 'Filtro sipas diapazonit të çmimit',
    sortBy: 'Rendit sipas',
    newest: 'Më të rejat',
    oldest: 'Më të vjetrat',
    priceLowToHigh: 'Çmimi: Nga i ulët tek i lartë',
    priceHighToLow: 'Çmimi: Nga i lartë tek i ulët',
    noSavedCars: 'Nuk keni automjete të ruajtura',
    startBrowsing: 'Filloni të shfletoni automjetet për të ruajtur të preferuarat tuaja',
    browseVehicles: 'Shfleto automjetet',
    savedOn: 'I ruajtur më',
    removeFromSaved: 'Hiq nga të ruajturat',
    viewDetails: 'Shiko detajet',
    contactDealer: 'Kontakto',
    scheduleViewing: 'Cakto takim për shikim',
    compareVehicles: 'Krahaso automjetet',
    selectToCompare: 'Përzgjidhni automjetet për krahasim',
    compare: 'Krahaso',
    clearSelection: 'Pastro përzgjedhjen',
    clearAll: 'Pastro të gjitha'
  },

  // Shis automjetin
  sellVehicle: {
    title: 'Shis automjetin tënd',
    subtitle: 'Krijo një listim të detajuar për automjetin tënd',
    stepIndicator: 'Hapi {current} nga {total}',
    basicInfo: 'Informacioni bazë',
    vehicleDetails: 'Detajet e automjetit',
    photosUpload: 'Ngarkimi i fotove',
    pricing: 'Çmimi',
    review: 'Shqyrto dhe publiko',
    
    // Informacioni bazë
    make: 'Marka',
    model: 'Modeli',
    year: 'Viti',
    mileage: 'Kilometrazhi',
    km: 'km',
    condition: 'Gjendja',
    fuelType: 'Lloji i karburantit',
    transmission: 'Transmisioni',
    transmissionTypes: {
      manual: 'Manual',
      automatic: 'Automatik',
      semiautomatic: 'Gjysmëautomatik'
    },
    bodyType: 'Lloji i karoseries',
    
    // Detajet e automjetit
    engineSize: 'Madhësia e motorit',
    horsepower: 'Fuqia në kuaj',
    color: 'Ngjyra',
    numberOfDoors: 'Numri i dyerve',
    numberOfSeats: 'Numri i vendeve',
    features: 'Karakteristikat',
    safetyFeatures: 'Karakteristikat e sigurisë',
    description: 'Përshkrimi',
    descriptionPlaceholder: 'Përshkruaj automjetin tënd, historinë, gjendjen...',
    
    // Fotot
    uploadPhotos: 'Ngarko fotot',
    dragDropPhotos: 'Tërhiq dhe lësho fotot këtu, ose kliko për të përzgjedhur',
    maxPhotos: 'Maksimumi 20 foto',
    photoRequirements: 'Kërkesat për fotot',
    requirementsList: [
      'Cilësi e lartë (minimumi 800x600 piksele)',
      'Format JPG, PNG ose WebP',
      'Maksimumi 5MB për foto',
      'Foto nga të gjitha anët e automjetit',
      'Foto nga brendësia',
      'Foto nga motori dhe kilometrat'
    ],
    
    // Çmimi
    askingPrice: 'Çmimi i kërkuar',
    marketValue: 'Vlera e tregut',
    priceAnalysis: 'Analiza e çmimit',
    competitive: 'Konkurrues',
    aboveMarket: 'Mbi treg',
    belowMarket: 'Nën treg',
    negotiable: 'I diskutueshëm',
    contactPreferences: 'Preferencat e kontaktit',
    allowPhoneCalls: 'Lejo thirrjet telefonike',
    allowMessages: 'Lejo mesazhet',
    allowEmails: 'Lejo email-et',
    
    // Shqyrtimi
    reviewListing: 'Shqyrto listimin',
    publishListing: 'Publiko listimin',
    saveDraft: 'Ruaj draft',
    termsAndConditions: 'Kushtet e përdorimit',
    agreeToTerms: 'Pajtohem me kushtet e përdorimit',
    
    // Mesazhet
    listingPublished: 'Listimi u publikua me sukses!',
    draftSaved: 'Drafti u ruajt',
    errorSaving: 'Gabim në ruajtje',
    continue: 'Vazhdo',
    previous: 'Mëparshmi',
    next: 'Tjetri'
  },

  // Faqja kryesore
  indexPage: {
    quickFilters: {
      title: 'Filtrat e shpejtë',
      allVehicles: 'Të gjitha automjetet',
      cars: 'Makina',
      trucks: 'Kamionë',
      motorcycles: 'Motorra',
      electric: 'Elektrikë',
      luxury: 'Luksoze'
    },
    stats: {
      title: 'Pse CarMarket365?',
      vehiclesAvailable: 'Automjete të disponueshme',
      verifiedDealers: 'Shitës të verifikuar',
      happyCustomers: 'Klientë të kënaqur',
      yearsExperience: 'Vite përvojë'
    },
    featuredListings: {
      title: 'Lista të zgjedhura',
      subtitle: 'Automjete të zgjedhura nga partnerët tanë',
      viewAll: 'Shiko të gjitha'
    },
    howItWorks: {
      title: 'Si funksionon',
      subtitle: 'Gjej automjetin tënd ideal në tre hapa të thjeshtë',
      steps: [
        {
          title: 'Kërko automjete',
          description: 'Shfleto bazën tonë të madhe të automjeteve të verifikuara'
        },
        {
          title: 'Krahaso opsionet',
          description: 'Krahaso çmimet, karakteristikat dhe vlerësimet'
        },
        {
          title: 'Bli me besim',
          description: 'Bli nga shitës të besueshëm me garanci'
        },
      ]
    },
    popularBrands: {
      title: 'Markat e populluara',
      subtitle: 'Eksploro automjetet nga prodhuesit kryesorë'
    },
    testimonials: {
      title: 'Çfarë thonë klientët tanë',
      subtitle: 'Lexo përvojat reale nga blerësit tanë të kënaqur'
    },
    newsletter: {
      title: 'Qëndro i përditësuar',
      subtitle: 'Merr listat më të reja dhe ofertat ekskluzive direkt në email',
      emailPlaceholder: 'Shkruaj email-in tënd',
      subscribe: 'Abonohu'
    },
    cta: {
      buyer: {
        title: 'Gati për të blerë?',
        subtitle: 'Gjej automjetin tënd të përsosur sot',
        button: 'Shfleto automjetet'
      },
      seller: {
        title: 'Dëshiron të shisësh?',
        subtitle: 'Vër automjetin tënd në shitje në minuta',
        button: 'Shis automjetin'
      },
    },
  },

  // Faqet e gabimeve

  // Faqet ligjore
  legal: {
    accessibility: {
      title: 'Aksesueshmëria',
      subtitle: 'Angazhimi ynë për të bërë CarMarket365 të aksesueshem për të gjithë.',
      backToHome: 'Kthehu te faqja kryesore',
      commitmentTitle: 'Angazhimi ynë për Aksesueshmërinë',
      commitmentDescription: 'CarMarket365 është i dedikuar për të ofruar një përvojë gjithëpërfshirëse.',
      commitmentText: 'Ne besojmë se të gjithë duhet të kenë akses të barabartë në platformën tonë, pavarësisht nga aftësitë e tyre.',
      
      visual: {
        title: 'Mbështetja Vizuale',
        features: [
          'Kontrast i lartë për lexueshmëri më të mirë',
          'Madhësi e rregullueshme e shkronjave',
          'Navigim i qartë dhe i strukturuar',
          'Përshkrimet alternative për imazhet'
        ]
      },
      motor: {
        title: 'Mbështetja Motorike',
        features: [
          'Navigim i plotë me klaviatë',
          'Zona të mëdha për klikim',
          'Kohë e mjaftueshme për veprime',
          'Kontrolle të thjeshtë dhe të qarta'
        ]
      },
      audio: {
        title: 'Mbështetja Audio',
        features: [
          'Transkriptime për përmbajtjen audio',
          'Titra për videot',
          'Alternatë tekstuale për tingujt',
          'Kompatibilitet me lexuesit e ekranit'
        ]
      },
      cognitive: {
        title: 'Mbështetja Kognitive',
        features: [
          'Gjuhë e thjeshtë dhe e qartë',
          'Instruksione hap pas hapi',
          'Mesazhe gabimi të dobishme',
          'Organizim logjik i përmbajtjes'
        ]
      },
      
      standardsTitle: 'Standardet e Aksesueshmërisë',
      standardsDescription: 'Platforma jonë është ndërtuar në përputhje me standardet ndërkombëtare.',
      wcagTitle: 'Përputhshmëria WCAG 2.1',
      wcagDescription: 'Ne synojmë përputhshmëri me udhëzimet WCAG 2.1 AA për aksesueshmëri në web.',
      compatibilityTitle: 'Kompatibiliteti me Teknologjitë Ndihmëse',
      compatibilityDescription: 'Platforma jonë është testuar me lexuesit e ekranit dhe teknologji të tjera ndihmëse.',
      
      feedbackTitle: 'Komente mbi Aksesueshmërinë?',
      feedbackText: 'Nëse hasni probleme me aksesueshmërinë ose keni sugjerime për përmirësim, na kontaktoni në accessibility@carmarket365.com',
      returnToPlatform: 'Kthehu te Platforma',
      contactTeam: 'Kontakto Ekipin'
    },

    cookies: {
      title: 'Politika e Cookies',
      subtitle: 'Si i përdorim cookies për të përmirësuar përvojën tuaj.',
      backToHome: 'Kthehu te faqja kryesore',
      policyTitle: 'Politika jonë e Cookies',
      policyDescription: 'Ne përdorim cookies për të ofruar shërbimin më të mirë të mundshëm.',
      policyText: 'Cookies janë skedarë të vegjël teksti që ruhen në pajisjen tuaj kur vizitoni faqen tonë. Ato na ndihmojnë të ofrojmë një përvojë të personalizuar.',
      
      essential: {
        title: 'Cookies Thelbësorë',
        features: [
          'Mbështetja e sesionit të përdoruesit',
          'Ruajtja e preferencave të sigurisë',
          'Funksionaliteti bazë i platformës',
          'Zbatimi i cilësimeve të privatësisë'
        ]
      },
      functional: {
        title: 'Cookies Funksionalë',
        features: [
          'Kujtimi i preferencave tuaja',
          'Ruajtja e cilësimeve të gjuhës',
          'Personalizimi i pamjes',
          'Ruajtja e kërkimeve të fundit'
        ]
      },
      analytics: {
        title: 'Cookies Analitikë',
        features: [
          'Kuptimi i përdorimit të faqes',
          'Përmirësimi i performancës',
          'Identifikimi i problemeve teknike',
          'Optimizimi i përmbajtjes'
        ]
      },
      marketing: {
        title: 'Cookies Marketingu',
        features: [
          'Reklamat e relevantishme',
          'Matja e efektivitetit të reklamave',
          'Personalizimi i përmbajtjes',
          'Ndjekja e konvertimeve'
        ]
      },
      
      managementTitle: 'Menaxhimi i Preferencave të Cookies',
      managementDescription: 'Ju keni kontroll të plotë mbi cookies që përdorim në pajisjen tuaj.',
      
      browserTitle: 'Cilësimet e Shfletuesit',
      browserFeatures: [
        'Bllokoni ose lejoni cookies',
        'Fshini cookies ekzistues',
        'Vendosni kohëzgjatjen e cookies',
        'Menaxhoni cookies e palëve të treta'
      ],
      
      platformTitle: 'Kontrollet e Platformës',
      platformFeatures: [
        'Qendra e preferencave të cookies',
        'Opsione për t\'u tërhequr',
        'Cilësimet e detajuara të kontrollit',
        'Përditësimet e rregullta të preferencave'
      ],
      
      questionsTitle: 'Pyetje mbi Cookies?',
      questionsText: 'Nëse keni pyetje mbi politikën tonë të cookies ose keni nevojë për ndihmë në menaxhimin e preferencave, na kontaktoni në cookies@carmarket365.com',
      returnToPlatform: 'Kthehu te Platforma',
      cookieSupport: 'Mbështetja për Cookies'
    },

    imprint: {
      title: 'Impresumi',
      subtitle: 'Informacione ligjore dhe detaje të kompanisë siç kërkohet nga ligji.',
      backToHome: 'Kthehu te faqja kryesore',
      legalInfoTitle: 'Informacione Ligjore (Impressum)',
      legalInfoDescription: 'Informacione të kompanisë dhe detaje ligjore siç kërkohet nga ligji.',
      legalInfoText: 'Kjo faqe përmban informacionet e kërkuara ligjërisht për CarMarket365 siç urdhërohet nga ligjet dhe rregulloret në fuqi. Të gjitha informacionet e dhëna janë aktuale dhe të sakta.',
      
      companyDetails: {
        title: 'Detajet e Kompanisë',
        companyName: 'Emri i Kompanisë',
        companyNameValue: 'CarMarket365 GmbH',
        registrationNumber: 'Numri i Regjistrimit',
        registrationNumberValue: 'HRB 123456 B',
        vatId: 'ID e TVSH-së',
        vatIdValue: 'DE123456789',
        commercialRegister: 'Regjistri Tregtar',
        commercialRegisterValue: 'Amtsgericht Berlin'
      },
      
      businessAddress: {
        title: 'Adresa e Biznesit',
        registeredAddress: 'Adresa e Regjistruar',
        street: 'Unter den Linden 1',
        city: '10117 Berlin',
        country: 'Gjermani'
      },
      
      management: {
        title: 'Drejtimi',
        managingDirector: 'Drejtor Ekzekutiv',
        managingDirectorValue: 'Max Mustermann',
        authorizedRepresentative: 'Përfaqësues i Autorizuar',
        authorizedRepresentativeValue: 'Anna Schmidt'
      },
      
      contactInfo: {
        title: 'Informacione Kontakti',
        phone: 'Telefon',
        phoneValue: '+49 (0) 30 12345678',
        email: 'Email',
        emailValue: 'info@carmarket365.com',
        businessHours: 'Orari i Biznesit',
        businessHoursValue: 'Hën-Pre: 9:00 - 18:00 CET'
      },
      
      legalNotice: {
        title: 'Njoftim Ligjor',
        paragraph1: 'CarMarket365 është i angazhuar për të ofruar informacione të sakta dhe të azhurnuara. Megjithatë, ne nuk mund të garantojmë plotësinë ose saktësinë e të gjithë përmbajtjes.',
        paragraph2: 'Kjo platformë shërben si një treg që lidh blerësit dhe shitësit e automjeteve. CarMarket365 nuk është përgjegjës për saktësinë e listave ose sjelljes së përdoruesve.',
        paragraph3: 'Për mosmarrëveshje ose ankesa, ju lutemi na kontaktoni duke përdorur informacionet e dhëna më lart. Ne përpiqemi të zgjidhim të gjitha çështjet në mënyrë të shpejtë dhe të drejtë.'
      },
      
      questionsTitle: 'Pyetje Ligjore?',
      questionsText: 'Për pyetje ligjore ose për të raportuar shqetësime, ju lutemi kontaktoni departamentin tonë ligjor në legal@carmarket365.com',
      returnToPlatform: 'Kthehu te Platforma',
      contactLegal: 'Kontakto Ekipin Ligjor'
    },
  },

  // Paneli i Shitësit
  dealerDashboard: {
    title: 'Paneli i Shitësit',
    subtitle: 'Menaxhoni shpaljet tuaja të automjeteve, ndiqni performancën dhe zhvilloni biznesin',
    
    // Navigimi i skedave
    tabs: {
      overview: 'Përmbledhje',
      myListings: 'Shpaljet e Mia',
      inquiries: 'Pyetjet',
      analytics: 'Analitika',
    },
    
    // Skeda e përmbledhjes
    overview: {
      // Kartat e statistikave
      
      // Seksioni i performancës
      performance: {
        title: 'Performanca Mujore',
        description: 'Automjetet e shitura në muaj këtë vit',
        monthlyData: {
          january: 'Janar',
          december: 'Dhjetor',
          november: 'Nëntor',
          sold: 'të shitura',
        },
      },
      
      // Pyetjet e fundit
      recentInquiries: {
        title: 'Pyetjet e Fundit',
        description: 'Pyetjet më të reja të klientëve',
        inquiryTypes: {
          viewing: 'shikimi',
          price: 'çmimi',
          financing: 'financimi',
        },
        timeAgo: {
          hoursAgo: 'orë më parë',
        },
      },
      
      // Butonat e veprimeve
    },
    
    // Skeda Shpaljet e Mia
    myListings: {
      title: 'Shpaljet e Mia',
      
      // Kërkimi dhe filtrat
      searchPlaceholder: 'Kërko shpallje...',
      filterByStatus: 'Filtro sipas gjendjes',
      statusOptions: {
        allStatus: 'Të Gjitha Gjendje',
        active: 'Aktive',
        sold: 'E Shitur',
        pending: 'Në Pritje',
      },
      exportReport: 'Eksporto Raport',
      export: 'Eksporto',
      
      // Kokat e tabelës
      tableHeaders: {
        car: 'Makinë',
        price: 'Çmimi',
        status: 'Gjendja',
        views: 'Shikimet',
        inquiries: 'Pyetjet',
        listed: 'E Shpallur',
        actions: 'Veprimet',
      },
      
      // Etiketat e gjendjes
      statusBadges: {
        active: 'Aktive',
        sold: 'E Shitur',
        pending: 'Në Pritje',
      },
      
      // Veprimet
      
      // Pamja mobile
      mobileView: {
        views: 'shikimet',
        inquiries: 'pyetjet',
      },
    },
    
    // Skeda Pyetjeve
    
    // Skeda Analitika
    
    // Mesazhi i fundit
    footerMessage: 'Mjetet profesionale të shitësit - ',
    activeListingsCount: 'shpallje aktive',
  },

  // Paneli i Administratorit
  adminDashboard: {
    title: 'Paneli i Administratorit',
    subtitle: 'Menaxhimi i platformës, mbikëqyrja dhe qendra gjithëpërfshirëse e kontrollit',
    
    // Navigimi i skedave
    
    // Skeda e përmbledhjes
    
    // Skeda Të Gjitha Shpaljet
    allListings: {
      title: 'Të Gjitha Shpaljet',
      
      // Kërkimi dhe filtrat
      searchPlaceholder: 'Kërko shpallje...',
      filterByStatus: 'Filtro sipas gjendjes',
      
      // Kokat e tabelës
      
      // Etiketat e gjendjes
      
      // Veprimet
    },
    
    // Skeda Menaxhimit të Përdoruesve
    userManagement: {
      title: 'Menaxhimi i Përdoruesve',
      description: 'Shikoni dhe menaxhoni të gjithë përdoruesit e platformës',
      
      // Kërkimi dhe filtrat
      searchPlaceholder: 'Kërko sipas email-it ose emrit...',
      roleFilter: {
        placeholder: 'Roli',
      },
      
      // Kokat e tabelës
      
      // Etiketat e roleve
      roleBadges: {
        admin: 'Administratori',
        dealer: 'Shitësi',
        customer: 'Klienti',
      },
      
      // Etiketat e gjendjes
      
      // Mesazhet shtesë të statusit
      statusMessages: {
        joinedOn: 'U bashkua më',
        lastLoginOn: 'Hyrja e fundit më',
        neverLoggedIn: 'Kurrë nuk ka hyrë',
      },
      
      // Veprimet
    },
    
    // Skeda Raporteve
    reports: {
      // Statistikat e platformës
      platformStatistics: {
        title: 'Statistikat e Platformës',
        description: 'Metrikat kryesore të platformës',
      },
      
      // Moderimi i përmbajtjeve
      contentModeration: {
        title: 'Moderimi i Përmbajtjeve',
        description: 'Përmbajtjet që kërkojnë rishikim',
        items: {
          flaggedListings: 'Shpaljet e Sinjalizuara',
          pendingDealerApplications: 'Aplikimet e Shitësve në Pritje',
          reportedUsers: 'Përdoruesit e Raportuar',
          disputes: 'Mosmarrëveshjet',
        },
      },
    },
    
    // Mesazhi i fundit
    footerMessage: 'Kontrolli administrativ - ',
    systemStatus: 'Statusi i Sistemit: Online',
  },

  // Testi i Vendit
  countryTest: {
    title: 'Testi i Ndarjes së Vendit',
    subtitle: 'Testoni se si filtrohen shpaljet e automjeteve sipas vendit/nëndomenit',
    currentCountryConfiguration: 'Konfigurimi Aktual i Vendit',
    currentCountryDescription: 'Kjo tregon vendin aktualisht të zbuluar dhe cilësimet e tij',
    detectedCountry: 'Vendi i Zbuluar',
    domain: 'Domeni',
    languages: 'Gjuhët',
    developmentMode: 'Modaliteti i Zhvillimit',
    enabled: 'I aktivizuar',
    disabled: 'I çaktivizuar',
    developmentCountrySwitcher: 'Ndërrues Vendi Zhvillimi',
    switcherDescription: 'Ndërroni midis vendeve për të testuar funksionalitetin e ndarjes',
    selectTestCountry: 'Zgjidhni Vendin e Testit',
    chooseCountryToTest: 'Zgjidhni një vend për të testuar',
    resetToDefault: 'Riktheje tek Parazgjedhja',
    noteTitle: 'Shënim:',
    noteText: 'Në prodhim, vendet zbulohen automatikisht nga nëndomeni (p.sh., mk.carmarket365.com, al.carmarket365.com). Ky ndërrues funksionon vetëm në modalitetin e zhvillimit.',
    carListingsFor: 'Shpaljet e Automjeteve për',
    carListingsDescription: 'duhet të shfaqen më poshtë',
    loadingCars: 'Po ngarkohen automjetet...',
    foundCars: 'U gjetën {count} automjet(e) në {country}',
    countryFilteredResults: 'Rezultatet e filtruara sipas vendit',
    noCarsFound: 'Nuk u gjetën automjete',
    noCarsFoundDescription: 'Asnjë automjet nuk është shpallur aktualisht në {country}.',
    tryDifferentCountry: 'Provoni të ndërroni në një vend tjetër duke përdorur ndërruesin më lart.',
    howItWorks: 'Si Funksionon',
    automaticCountryDetection: 'Zbulimi Automatik i Vendit',
    automaticDetectionDescription: 'Sistemi zbulondon automatikisht vendin nga nëndomeni (p.sh., mk.carmarket365.com për Maqedoninë, al.carmarket365.com për Shqipërinë).',
    countrySpecificListings: 'Shpaljet Specifike të Vendit',
    countrySpecificDescription: 'Shpaljet e automjeteve filtrohen automatikisht për të treguar vetëm automjetet nga vendi aktual. Kjo siguron që përdoruesit në Maqedoni të shohin vetëm shpaljet maqedonase, përdoruesit shqiptarë të shohin vetëm shpaljet shqiptare, etj.',
    crossCountryProtection: 'Mbrojtja Ndërmjet Vendeve',
    crossCountryDescription: 'Nëse dikush përpiqet të qaset në një shpallje automjeti nga një vend tjetër (përmes URL-së direkte), ai do të marrë një mesazh gabimi që thotë se shpallja nuk është e disponueshme në rajonin e tyre.',
    listingSubmission: 'Parashtrimi i Shpalljes',
    listingSubmissionDescription: 'Kur përdoruesit parashtruan shpallje të reja automjetesh, kodi i vendit vendoset automatikisht bazuar në nëndomenin e tyre aktual, duke siguruar që shpaljet janë të dukshme vetëm në vendin e duhur.',
  },

  // Formularët dhe Hyrjet

  // Static content for About page
  about: {
    staticContent: {
      team: [
        {
          name: 'Arben Hoxha',
          role: 'Drejtues Ekzekutiv dhe Themelues',
          bio: '15+ vjet në industrinë e automobilave. Dikur Nën-president në AutoNation.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Endrit Kastrati',
          role: 'Drejtues i Teknologjisë',
          bio: 'Ish-inxhinier i Tesla me ekspertizë në teknologjinë e automobilave.',
          image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Elona Basha',
          role: 'Drejtuese e Suksesit të Klientëve',
          bio: '10+ vjet në shërbimin e shkëlqyer ndaj klientëve dhe udhëheqjen e ekipit.',
          image: 'https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Florin Krasniqi',
          role: 'Nën-president i Operacioneve',
          bio: 'Ekspert i zinxhirit të furnizimit me përvojë në logjistikën e automobilave.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
      ],
      milestones: [
        {
          year: '2009',
          title: 'Themelimi i Kompanisë',
          description: 'Filloi si një treg i vogël makinash të përdorura në Tiranë me një vizion për të revolucionarizuar blerjen e makinave.'
        },
        {
          year: '2012',
          title: 'Lançimi i Platformës Dixhitale',
          description: 'Lancoi tregun tonë të parë në linjë, duke e bërë blerjen e makinave më të arritshme.'
        },
        {
          year: '2015',
          title: 'Partneri i 500-të i Shitësit',
          description: 'Arriti një gur kilometrik të madh duke u bashkuar me shitësin tonë të 500-të të verifikuar.'
        },
        {
          year: '2018',
          title: 'Zgjerimi Kombëtar',
          description: 'Zgjeroi operacionet për t\'u shërbyer klientëve në të gjithë Shqipërinë dhe vendet fqinje.'
        },
        {
          year: '2020',
          title: 'Lançimi i Aplikacionit Mobil',
          description: 'Prezantoi aplikacionin tonë mobil, duke e bërë blerjen e makinave edhe më të përshtatshme.'
        },
        {
          year: '2023',
          title: '50,000 Makina të Shitura',
          description: 'Festoi ndihmën e mbi 45,000 klientëve për të gjetur automjetin e tyre të përkryer.'
        },
      ],
      awards: [
        {
          title: 'Tregu Më i Mirë i Automobilave 2023',
          organization: 'Çmimet e Zgjedhjes së Konsumatorëve',
          year: '2023',
          description: 'I njohur për shërbimin e jashtëzakonshëm ndaj klientëve dhe inovacionin e platformës'
        },
        {
          title: 'Startup-i më i Shpejtë në Rritje',
          organization: 'Çmimet e Inovacionit në Teknologji',
          year: '2022',
          description: 'I pranuar për rritjen e shpejtë dhe zgjerimin e tregut'
        },
        {
          title: 'Shkelqim në Shërbimin ndaj Klientëve',
          organization: 'Çmimet e Industrisë së Automobilave',
          year: '2023',
          description: 'I nderuar për kënaqësinë e jashtëzakonshme të klientëve dhe mbështetjen'
        },
      ]
    },
    content: {
      heroTitle: 'Rreth CarMarket365',
      heroSubtitle: 'Jemi në një mision për ta bërë blerjen dhe shitjen e makinave të thjeshtë, transparente dhe të këndshme. Që nga 2009, kemi qenë duke lidhur blerësit dhe shitësit me besim dhe inovacion.',
      missionTitle: 'Misioni Ynë',
      missionContent: 'Të revolucionarizojmë përvojën e blerjes dhe shitjes së makinave duke ofruar një platformë transparente, të besueshme dhe miqësore që lidh njerëzit me automjetin e tyre të përkryer.',
      missionDescription: 'Ne besojmë se çdokush meriton qasje në transport të besueshëm dhe çmime të drejta, pa stres dhe pasiguri që tradicionalisht shoqërohet me blerjen e makinave.',
      visionTitle: 'Vizioni Ynë',
      visionContent: 'Të bëhemi tregu më i besueshëm i automobilave në botë, ku çdo transaksion ndërtohet mbi transparencë, cilësi dhe kënaqësi të klientëve.',
      visionDescription: 'Ne imagjinojmë një të ardhme ku blerja ose shitja e një makine është aq e thjeshtë sa disa klikime, me besim të plotë në proces dhe rezultat.',
      valuesTitle: 'Vlerat Tona',
      valuesDescription: 'Këto parime themelore udhëheqin gjithçka që bëjmë dhe formësojnë kulturën tonë të kompanisë',
      teamTitle: 'Takohuni me Ekipin Tonë',
      teamDescription: 'Profesionistë të pasionuar të dedikuar për transformimin e industrisë së automobilave',
      journeyTitle: 'Udhëtimi Ynë',
      journeyDescription: 'Gurët e kilometrave kyç që kanë formësuar kompanine tonë gjatë viteve',
      awardsTitle: 'Çmime dhe Njohje',
      awardsDescription: 'Jemi krenarë që jemi njohur nga udhëheqësit e industrisë për inovacionin dhe shërbimin tonë',
      ctaTitle: 'Gati të Bashkoheni me Udhëtimin Tonë?',
      ctaDescription: 'Nëse jeni duke kërkuar për makinën tuaj të ardhshme ose doni të jeni pjesë e ekipit tonë, do të donim të dëgjonim prej jush.',
      joinTeam: 'Bashkohuni me Ekipin Tonë',
      contactUs: 'Na Kontaktoni',
      browseCars: 'Shfleto Makinat',
      connect: 'Lidhu'
    },
  },

  carReviews: {
    title: 'Recensionet e Makinave',
    subtitle: 'Recensione eksperte dhe komente prej përdoruesve për t\'ju ndihmuar të merrni vendime të informuara për blerjen e makinës tuaj të ardhshme.',
    backToHome: 'Kthehu te Faqja Kryesore',
    
    // Main content
    overviewTitle: 'Recensione dhe Vlerësime të Makinave',
    overviewDescription: 'Recensione gjithëpërfshirëse për t\'ju ndihmuar të merrni vendime të informuara për blerjen e automjeteve.',
    overviewText: 'Seksioni ynë i recensioneve të makinave ofron analiza të detajuara nga ekspertë të automobilizmit dhe përvojat e vërteta të pronëve për t\'ju ndihmuar të kuptoni çdo aspekt të automjeteve që po shqyrtoni.',
    
    // Review types
    expertReviews: {
      title: 'Recensione Eksperte',
      features: [
        'Gazetari profesionale e automobilizmit',
        'Analizë e detajuar e performancës',
        'Vlerësime sigurie dhe besueshmërie',
        'Testim krahasues i automjeteve'
      ]
    },
    ownerReviews: {
      title: 'Recensione të Pronëve',
      features: [
        'Përvojat e vërteta të pronësisë',
        'Komente afatgjata të besueshmërisë',
        'Njohuri mbi kostot e mirëmbajtjes',
        'Përshtypje nga përdorimi ditor'
      ]
    },
    ratingSystem: {
      title: 'Sistemi i Vlerësimit',
      features: [
        'Sistemi i vlerësimit me 5 yje',
        'Rezultate specifike për kategori',
        'Rekomandim i përgjithshëm',
        'Shpërbërje e avantazheve dhe disavantazheve'
      ]
    },
    marketInsights: {
      title: 'Vëzhgime të Tregut',
      features: [
        'Analizë e vlerës së rishitjes',
        'Raporte të tendencave të tregut',
        'Rekomandime për vlerën më të mirë',
        'Udhëzues për blerje sezionale'
      ]
    },
    
    // Categories
    categoriesTitle: 'Kategoritë e Recensioneve',
    categoriesDescription: 'Recensionet tona mbulojnë të gjitha aspektet e pronësisë dhe performancës së automjeteve.',
    comfort: {
      title: 'Komoditeti dhe Brendësia',
      items: [
        'Komoditeti i ulëseve',
        'Hapësira e brendshme dhe ruajtja',
        'Veçoritë teknologjike',
        'Cilësia e ndërtimit dhe materialet'
      ]
    },
    safety: {
      title: 'Siguria dhe Besueshmëria',
      items: [
        'Vlerësimet dhe veçoritë e sigurisë',
        'Besueshmëria dhe mirëmbajtja',
        'Mbulimi i garancisë',
        'Historiku i thirrjeve për kthim'
      ]
    },
    
    // Coming soon
    comingSoonTitle: 'Recensionet Vijnë Së Shpejti!',
    comingSoonText: 'Aktualisht po ndërtojmë bazën tonë gjithëpërfshirëse të recensioneve. Recensionet eksperte dhe komentet e pronëve do të jenë të disponueshme së shpejti për t\'ju ndihmuar të udhëzoni vendimet tuaja të blerjes së makinave.',
    browseCars: 'Shfleto Makinat e Disponueshme',
    exploreInventory: 'Eksploro Inventarin'
  },

  // Static vehicle data for AdvancedSearch



  // Përkthime shtesë për tekstin e koduar
  hardcodedFixes: {
    // Specifikisht për CountryTestPage
    countryTestPage: {
      codeLabel: 'Kodi:',
      loadingCars: 'Duke ngarkuar makinat...',
      errorPrefix: 'Gabim:',
      carListingsFor: 'Listat e makinave për',
      onlyListedDescription: 'Vetëm makinat e listuara në <strong>{country} ({code})</strong> duhet të shfaqen më poshtë',
      foundCarsIn: 'U gjetën {count} makina në {country}',
      countryFilteredResults: '🔒 Rezultate të filtruara sipas vendit',
      noCarsFound: 'Nuk u gjetën makina',
      noCarsInCountry: 'Aktualisht nuk ka makina të listuara në {country}.',
      trySwitchingCountry: 'Provoni të ndryshoni vendin duke përdorur ndërruesin më sipër.',
      carIdAndCountry: 'ID: {id} | Vendi: {country}',
      developmentNote: '<strong>Shënim:</strong> Në prodhim, vendet zbulohen automatikisht nga nëndomena (p.sh., mk.carmarket365.com, al.carmarket365.com). Ky ndërrues funksionon vetëm në modalitetin e zhvillimit.',
    },

    // AdminDashboard - shenja statusi dhe të dhëna të simuluara

    // DealerDashboard të dhëna të simuluara

    // Financimi tekste të koduara


    // Faqja Dealers - tekste të koduara


    // Faqja DealerSupport - tekste të koduara

    // Faqja Accessibility - tekste të koduara

    // Faqja CookiePolicy - tekste të koduara
    cookiePolicy: {
      managingPreferences: 'Menaxhimi i Preferencave tuaja të Cookies',
      managingPreferencesDescription: 'Ju keni kontroll mbi cookies që përdorim në pajisjen tuaj.',
      browserSettings: 'Cilësimet e Shfletuesit',
      platformControls: 'Kontrollet e Platformës',
      questionsAboutCookies: 'Pyetje Rreth Cookies?',
      questionsMessage: 'Nëse keni pyetje rreth politikës sonë të cookies ose keni nevojë për ndihmë në menaxhimin e preferencave tuaja, na kontaktoni në cookies@carmarket365.com',
      returnToPlatform: 'Kthehu në Platformë',
      cookieSupport: 'Mbështetja për Cookies',
      browserSettingsItems: [
        'Blloko ose lejo cookies',
        'Fshi cookies ekzistuese',
        'Vendos skadimin e cookies',
        'Menaxho cookies të palëve të treta'
      ],
      platformControlsItems: [
        'Qendra e preferencave të cookies',
        'Opsionet e refuzimit të disponueshme',
        'Cilësimet e kontrollit të detajuar',
        'Përditësimet e rregullta të preferencave'
      ],
      essentialFeatures: [
        'Kyçja dhe autentifikimi',
        'Funksionaliteti i shportës së blerjeve',
        'Siguria dhe parandalimi i mashtrimit',
        'Operacionet bazë të faqes'
      ],
      functionalFeatures: [
        'Mbaj mend preferencat tuaja',
        'Përzgjedhja e gjuhës',
        'Përvojë e personalizuar e përdoruesit',
        'Shërbimet e bazuara në vendndodhje'
      ],
      analyticsFeatures: [
        'Statistikat e përdorimit të faqes',
        'Optimizimi i performancës',
        'Raportimi dhe ndreqja e gabimeve',
        'Njohuri të sjelljes së përdoruesit'
      ],
      marketingFeatures: [
        'Reklama të personalizuara',
        'Gjurmo efektivitetin e fushatave reklamuese',
        'Integrimi me mediat sociale',
        'Rimarketingut dhe risynimit'
      ],
    },

    // Faqja SafetyTips - tekste të koduara
  },

  // UI Demo Page
  uiDemo: {
    title: 'Demo e Komponentëve UI të Përmirësuara',
    subtitle: 'Prezantimi i komponentëve UI të integruara së fundmi me funksionalitet të përmirësuar',
    components: 'Komponentë',
    forms: 'Format',
    buttons: 'Butonat',
    cards: 'Kartat',
  },

  // Final fixes section
  finalFixes: {
    // ExpressSell page - Car brands, models, and placeholders
    
    // Faqja DealerSignUp - Placeholder-ët e formës
    dealerSignUp: {
      firstNamePlaceholder: 'Agron',
      lastNamePlaceholder: 'Krasniqi',
    },
    
    // Faqja SavedCars - Placeholder i filtrit
    
    // Faqja UIDemo - Placeholder-ët demo
  },

  // CarDetail section with mockData
  carDetail: {
    backToSearch: 'Kthehu në kërkim',
    
    // Vehicle Title and Info
    vehicleTitle: 'Titulli i Automjetit',
    locationLabel: 'Vendndodhja',
    priceLabel: 'Çmimi',
    originalPrice: 'Çmimi Origjinal',
    savingsAmount: 'Zbritje',
    
    // Status Badges
    certified: 'I Certifikuar',
    featured: 'I Promovuar',
    newArrival: 'Arritje e Re',
    priceReduced: 'Çmim i Ulur',
    greatDeal: 'Ofertë e Shkëlqyer',
    verified: 'I Verifikuar',
    
    // Image Gallery
    mainImage: 'Imazh Kryesor',
    imageGallery: 'Galeria e Imazheve',
    viewFullscreen: 'Shiko në Ekran të Plotë',
    imageCounter: 'nga',
    
    // Tabs and Content
    
    // Overview Tab
    
    // Features Tab
    
    // Inspection Tab
    inspection: {
      title: 'Raporti i Inspektimit',
      lastUpdated: 'Përditësuar për herë të fundit:',
      excellentCondition: 'Gjendje e Shkëlqyer',
      pointInspection: 'Përfunduar inspektimi 150-pikësh',
      inspectionCompleted: 'inspektimi përfunduar',
      inspectionScore: 'Rezultati i Inspektimit',
    },
    
    // History Tab
    
    // Action Buttons
    
    // Seller Information
    
    // Financing Section
    
    // Error States
    
    // Loading States
    
    // Contact and Communication
    
    // Test Drive
    testDrive: {
      scheduleTestDrive: 'Programo Test Drive',
      preferredDate: 'Data e preferuar',
      preferredTime: 'Koha e preferuar',
      contactInfo: 'Informacioni i kontaktit',
      additionalNotes: 'Shënime shtesë',
      submitRequest: 'Dërgo Kërkesën',
    },
    
    // Mock Data Values
  },

  // Karakteristikat e Avancuara
  advancedFeatures: {
    // Kërkimi i Avancuar
    
    // Krahasimi
    comparison: {
      title: 'Krahasimi i Makinave',
      clearAll: 'Pastro të Gjitha',
      compareCars: 'Krahaso Makinat',
      compareNow: 'Krahaso Tani',
      
      // Fushat e krahasimit
      
      // Shiriti i krahasimit
      bar: {
        compareCars: 'Krahaso Makinat',
        selected: 'të zgjedhura',
        max: 'maks.',
        compare: 'Krahaso',
        clear: 'Pastro',
      },
      
      // E padisponueshme
      notAvailable: 'N/D',
    },
    
    // Kalkulatori i Financimit
    financingCalculator: {
      title: 'Kalkulatori i Financimit',
      
      // Seksionet
      
      // Fushat
      
      // Etiketat
      
      // Butonat
      
      // Shënimet
      notes: {
        title: 'Njoftim i rëndësishëm',
        estimate: 'Ky është një vlerësim. Kushtet aktuale mund të ndryshojnë.',
        ratesSubject: 'Shkallët e interesit mund të ndryshojnë.',
        additionalFees: 'Mund të aplikohen tarifa shtesë.',
        considerPreApproval: 'Konsideroni para-miratimin për kushte më të mira.',
        disclaimer: 'Ky kalkulator jep një vlerësim bazuar në informacionin e dhënë. Kushtet aktuale të financimit mund të ndryshojnë bazuar në historikun e kredisë, të ardhurat dhe faktorë të tjerë.',
      },
    },
  },

  // Navigimi
  navigation: {
    backToHome: 'Kthehu tek faqja kryesore',
  }
};