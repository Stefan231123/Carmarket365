import { TranslationStrings } from '../translations';

export const slTranslations: TranslationStrings = {
  common: {
    loading: 'Nalaganje...',
    error: 'Napaka',
    retry: 'Poskusi znova',
    close: 'Zapri',
    cancel: 'Prekliči',
    confirm: 'Potrdi',
    continue: 'Nadaljuj',
    back: 'Nazaj',
    next: 'Naprej',
    previous: 'Prejšnji',
    search: 'Išči',
    filter: 'Filtriraj',
    clear: 'Počisti',
    save: 'Shrani',
    edit: 'Uredi',
    delete: 'Izbriši',
    add: 'Dodaj',
    view: 'Poglej',
    contact: 'Kontakt',
    phone: 'Telefon',
    email: 'E-pošta',
    location: 'Lokacija',
    price: 'Cena',
    currency: 'Valuta',
    year: 'Leto',
    make: 'Znamka',
    model: 'Model',
    mileage: 'Kilometrina',
    condition: 'Stanje',
    features: 'Lastnosti',
    description: 'Opis',
    images: 'Slike',
    seller: 'Prodajalec',
    dealer: 'Trgovec',
    private: 'Zasebno',
    yes: 'Da',
    no: 'Ne',
    menu: 'Meni',
    new: 'Novo',
    certified: 'Certificirano',
    vehicle: 'vozilo',
    name: 'Ime',
    message: 'Sporočilo',
    default: 'Privzeto',
    secondary: 'Sekundarno',
    outline: 'Oris',
    ghost: 'Fantom',
    link: 'Povezava',
    destructive: 'Destruktivno',
    small: 'Majhno',
    large: 'Veliko',
    option: 'Možnost',
    sending: 'Pošiljanje...',
    processing: 'Obdelovanje...',
    loading: 'Nalaganje...',
    errorLoadingImage: 'Napaka pri nalaganju slike',
  },

  // Forms - validation, labels, placeholders, actions
  forms: {
    validation: {
      nameRequired: 'Ime je obvezno',
      emailRequired: 'E-pošta je obvezna',
      emailInvalid: 'Prosimo, vnesite veljavno e-pošto',
      phoneRequired: 'Telefonska številka je obvezna',
      messageRequired: 'Sporočilo je obvezno',
      loanAmountRequired: 'Znesek posojila je obvezen',
      annualIncomeRequired: 'Letni dohodek je obvezen',
      creditScoreRequired: 'Kreditna ocena je obvezna',
      employmentStatusRequired: 'Status zaposlitve je obvezen',
      yearsAtJobRequired: 'Leta na trenutnem delovnem mestu so obvezna',
      monthlyExpensesRequired: 'Mesečni stroški so obvezni',
      makeRequired: 'Znamka je obvezna',
      modelRequired: 'Model je obvezen',
      yearRequired: 'Leto je obvezno',
      yearInvalid: 'Neveljavno leto',
      mileageRequired: 'Kilometrina je obvezna',
      mileageNegative: 'Kilometrina ne more biti negativna',
      dateRequired: 'Prosimo, izberite datum',
      timeRequired: 'Prosimo, izberite čas',
    },
    labels: {
      fullName: 'Polno ime',
      email: 'E-pošta',
      phone: 'Telefonska številka',
      message: 'Sporočilo',
    },
    placeholders: {
      enterFullName: 'Vnesite vaše polno ime',
      enterEmail: 'Vnesite vašo e-pošto',
      enterPhone: 'Vnesite vašo telefonsko številko',
      contactMessage: 'Pozdravljeni, zanima me {year} {make} {model}. Prosimo, kontaktirajte me z več podrobnostmi.',
    },
    actions: {
      sendMessage: 'Pošlji sporočilo',
    },
  },

  // Modals - titles, descriptions, success messages
  modals: {
    contactCar: {
      title: 'Kontaktiraj prodajalca',
      description: 'Pošlji sporočilo o tem vozilu',
      successTitle: 'Sporočilo uspešno poslano!',
      successDescription: 'Vaše sporočilo je bilo poslano prodajalcu. Kmalu vas bodo kontaktirali.',
    },
    financing: {
      title: 'Pridobite predhodno odobritev za financiranje',
      description: 'Pridobite predhodno odobritev za avtomobilsko financiranje v minutah',
      badges: {
        financingAvailable: 'Financiranje na voljo',
      },
      employmentStatus: {
        retired: 'Upokojen',
        student: 'Študent',
        unemployed: 'Brezposeln',
      },
      financialInformation: 'Finančni podatki',
      desiredLoanAmount: 'Željen znesek posojila',
      placeholders: {
        enterFullName: 'Vnesite svoje polno ime',
        enterPhone: 'Vnesite svojo telefonsko številko',
        enterEmail: 'Vnesite svoj e-poštni naslov',
        enterLoanAmount: 'Vnesite znesek posojila',
        enterAnnualIncome: 'Vnesite letni dohodek',
        enterMonthlyExpenses: 'Vnesite mesečne stroške',
        selectRange: 'Izberite razpon',
        selectStatus: 'Izberite status',
        selectDuration: 'Izberite trajanje',
      },
      validation: {
        validEmail: 'Prosimo, vnesite veljaven e-poštni naslov',
        monthlyExpensesRequired: 'Mesečni stroški so obvezni',
      },
    },
    scheduleTestDrive: {
      title: 'Razporedi testno vožnjo',
      description: 'Rezervirajte termin za testno vožnjo tega vozila',
      badge: 'Testna vožnja na voljo',
      labels: {
        fullName: 'Polno ime',
        email: 'E-naslov',
        phone: 'Telefonska številka',
        preferredDate: 'Želeni datum',
        preferredTime: 'Želeni čas',
        specialRequests: 'Posebne zahteve',
      },
      placeholders: {
        enterFullName: 'Vnesite svoje polno ime',
        enterEmail: 'Vnesite svoj e-naslov',
        enterPhone: 'Vnesite svojo telefonsko številko',
        selectDate: 'Izberite želeni datum',
        selectTime: 'Izberite želeni čas',
        enterRequests: 'Imate kakšne posebne zahteve ali vprašanja?',
      },
      validation: {
        emailInvalid: 'Prosimo, vnesite veljaven e-naslov',
        dateRequired: 'Prosimo, izberite želeni datum',
        timeRequired: 'Prosimo, izberite želeni čas',
      },
      success: {
        title: 'Testna vožnja je razporejena!',
        description: 'Vaša prošnja za testno vožnjo je bila poslana prodajalcu. Kontaktirali vas bodo za potrditev termina.',
      },
      actions: {
        cancel: 'Prekliči',
        schedule: 'Razporedi testno vožnjo',
        scheduling: 'Razporejam...',
      },
    },
    tradeIn: {
      title: 'Ocenjevalec menjave',
      description: 'Pridobite takojšnjo oceno vrednosti menjave vašega trenutnega vozila',
      tabs: {
        vehicleInfo: 'Podatki o vozilu',
        condition: 'Stanje',
        results: 'Rezultati'
      },
      form: {
        labels: {
          make: 'Znamka',
          model: 'Model',
          year: 'Leto',
          mileage: 'Kilometrina (km)',
          condition: 'Splošno stanje',
          accident: 'Zgodovina nesreč',
          serviceHistory: 'Zgodovina servisiranja',
          modifications: 'Spremembe'
        },
        placeholders: {
          selectMake: 'Izberite znamko',
          selectModel: 'Izberite model',
          selectYear: 'Izberite leto',
          enterMileage: 'Vnesite kilometrino v kilometrih',
          selectCondition: 'Izberite splošno stanje',
          selectAccidentHistory: 'Izberite zgodovino nesreč',
          selectServiceHistory: 'Izberite zgodovino servisiranja',
          selectModifications: 'Izberite spremembe'
        },
        options: {
          condition: {
            excellent: 'Odličo',
            good: 'Dobro',
            fair: 'Sprejemljivo',
            poor: 'Slabo'
          },
          accident: {
            none: 'Brez nesreč',
            minor: 'Manjša nesreča',
            major: 'Večja nesreča',
            multiple: 'Več nesreč'
          },
          serviceHistory: {
            complete: 'Popolna zgodovina servisiranja',
            partial: 'Delna zgodovina servisiranja',
            none: 'Brez zgodovine servisiranja'
          },
          modifications: {
            none: 'Brez sprememb',
            minor: 'Manjše spremembe',
            major: 'Večje spremembe'
          }
        }
      },
      validation: {
        makeRequired: 'Prosimo, izberite znamko',
        modelRequired: 'Prosimo, izberite model',
        yearRequired: 'Prosimo, izberite leto',
        mileageRequired: 'Prosimo, vnesite kilometrino',
        mileageInvalid: 'Prosimo, vnesite veljavno kilometrino',
        conditionRequired: 'Prosimo, izberite splošno stanje',
        accidentRequired: 'Prosimo, izberite zgodovino nesreč',
        serviceRequired: 'Prosimo, izberite zgodovino servisiranja',
        modificationsRequired: 'Prosimo, izberite spremembe'
      },
      results: {
        title: 'Vaša ocena menjave',
        estimatedValue: 'Ocenjena vrednost menjave',
        range: 'Razpon',
        confidence: 'Raven zaupanja',
        confidenceLevels: {
          high: 'Visoka',
          medium: 'Srednja',
          low: 'Nizka'
        },
        factors: {
          title: 'Dejavniki, ki vplivajo na vašo oceno',
          positive: 'Pozitivni dejavniki',
          negative: 'Negativni dejavniki',
          neutral: 'Nevtralni dejavniki'
        },
        recommendations: {
          title: 'Priporočila',
          maintenance: 'Razmislite o reševanju problemov z vzdrževanjem pred menjavo',
          documentation: 'Zberite vso servisno dokumentacijo',
          inspection: 'Opravite strokovni pregled za točno oceno',
          timing: 'Upoštevajte tržno situacijo za vašo specifično znamko in model'
        },
        disclaimer: {
          title: 'Pomembno opozorilo',
          text: 'To je ocenjena vrednost na podlagi podanih informacij. Dejanske vrednosti menjave se lahko razlikujejo glede na politike prodajalcev, trenutne tržne razmere in fizični pregled vozila. Priporočamo, da pridobite ponudbe od več prodajalcev za najnatančnejšo oceno.'
        }
      },
      actions: {
        calculate: 'Izračunaj oceno',
        recalculate: 'Ponovno izračunaj',
        getQuotes: 'Pridobi ponudbe prodajalcev',
        startOver: 'Začni znova',
        close: 'Zapri',
        next: 'Naprej',
        previous: 'Nazaj'
      },
      loading: {
        calculating: 'Izračunavanje vaše ocene...',
        fetchingData: 'Pridobivanje tržnih podatkov...'
      }
    },
    badges: {
      new: 'Novo',
      certified: 'Certificirano',
    },
    share: {
      title: 'Delite ta avtomobil',
      description: 'Delite to vozilo s prijatelji in družino',
      copyLink: 'Kopiraj povezavo',
      linkCopied: 'Povezava kopirana!',
      linkCopiedToClipboard: 'Povezava kopirana v odložišče',
      shareViaEmail: 'Deli preko e-pošte',
      shareOnWhatsApp: 'Deli na WhatsApp',
      facebook: 'Facebook',
      twitter: 'Twitter',
      close: 'Zapri'
    },
  },

  header: {
    welcome: 'Dobrodošli v CarMarket365',
    signIn: 'Prijavite se',
    signOut: 'Odjavite se',
    myAccount: 'Moj račun',
    dashboard: 'Nadzorna plošča',
    home: 'Domov',
    browseCars: 'Prebrskaj vozila',
    sellCar: 'Prodaj',
    savedCars: 'Shranjena vozila',
    financing: 'Financiranje',
    about: 'O nas',
    contact: 'Kontakt',
    faq: 'Pogosta vprašanja',
    help: 'Pomoč',
  },

  hero: {
    title: 'Poiščite Vaše Popolno Vozilo',
    subtitle: 'Prebrskajte med tisoči kakovostnih rabljenih vozil od verificiranih trgovcev in zasebnih prodajalcev',
    searchButton: 'Išči Vozila',
    advancedSearch: 'Napredno Iskanje',
    vehicleTypes: {
      cars: 'Avtomobili',
      motorbikes: 'Motocikli',
      trucks: 'Tovornjaki',
    },
    searchForm: {
      make: 'Znamka',
      model: 'Model',
      priceFrom: 'Cena Od',
      priceTo: 'Cena Do',
      yearFrom: 'Leto Od',
      mileage: 'Kilometrina (km)',
      location: 'Lokacija',
      anyMake: 'Katera koli znamka',
      anyModel: 'Kateri koli model',
      minPrice: 'Najnižja cena',
      maxPrice: 'Najvišja cena',
      minYear: 'Najstarejše leto',
      anyYear: 'Katero koli leto',
      anyMileage: 'Katera koli kilometrina',
      maxMileage: 'Največja kilometrina',
      noMin: 'Brez minimuma',
      noMax: 'Brez maksimuma',
      enterLocation: 'Vnesite mesto ali poštno številko',
    },
    availableCars: 'Več kot 50.000 vozil na voljo po vsej Sloveniji',
  },

  // Last Search Section
  lastSearch: {
    title: 'Zadnje iskanje',
    description: 'BMW vozila od €20.000 - €35.000, letniki 2019-2022 • Najdenih 247 rezultatov',
    viewMore: 'Prikaži več',
    matchPercentage: '% ujemanja',
  },

  // Interesting Suggestions Section
  suggestions: {
    title: 'To vas morda zanima',
    description: 'Novi BMW oglasi, ki ustrezajo vašim kriterijem • Pravkar dodani na platformo',
    seeMore: 'Prikaži več predlogov',
    daysAgo: 'd nazaj',
  },

  // Popular Brands Section
  brands: {
    title: 'Nakupuj po znamki',
    description: 'Brskajte po vozilih najbolj priljubljenih proizvajalcev',
    carsCount: 'vozil',
  },

  cars: {
    title: 'Vozila za prodajo',
    searchPlaceholder: 'Znamka, model ali ključna beseda',
    noResults: 'Ni najdenih vozil, ki bi ustrezala vašim kriterijem',
    resultsCount: 'Najdenih {count} vozil',
    viewDetails: 'Poglej podrobnosti',
    contactSeller: 'Kontaktiraj prodajalca',
    saveToFavorites: 'Shrani med priljubljene',
    removeFromFavorites: 'Odstrani iz priljubljenih',
    carDetails: 'Podrobnosti vozila',
    specifications: 'Specifikacije',
    fuelType: 'Vrsta goriva',
    transmission: 'Menjalnik',
    bodyType: 'Vrsta karoserije',
    exteriorColor: 'Zunanja barva',
    interiorColor: 'Notranja barva',
    drivetrain: 'Pogon',
    vin: 'VIN številka',
    inspection: 'Tehnični pregled',
    history: 'Zgodovina vozila',
    financing: 'Financiranje',
    testDrive: 'Testna vožnja',
    makeOffer: 'Naredite ponudbo',
    featured: 'Izbrani oglasi',
    handpicked: 'Skrbno izbrana vozila za vas',
    discover: 'Odkrijte naša skrbno izbrana premium vozila',
    allCars: 'Vsa vozila',
    newCars: 'Nova vozila',
    certifiedPreOwned: 'Certificirana rabljena',
    electric: 'Električna',
    luxury: 'Luksuzna',
    viewAllCars: 'Poglej vsa vozila',
  },

  filters: {
    title: 'Filtri iskanja',
    anyMake: 'Katera koli znamka',
    anyModel: 'Kateri koli model',
    anyYear: 'Katero koli leto',
    priceRange: 'Cenovni razpon',
    priceMin: 'Najnižja cena',
    priceMax: 'Najvišja cena',
    yearRange: 'Letni razpon',
    yearMin: 'Najstarejše leto',
    yearMax: 'Najnovejše leto',
    mileageMax: 'Največ kilometrov',
    location: 'Lokacija',
    fuelTypes: 'Vrsta goriva',
    transmissionTypes: 'Menjalnik',
    bodyTypes: 'Vrsta karoserije',
    condition: 'Stanje',
    applyFilters: 'Uporabi filtre',
    clearFilters: 'Počisti filtre',
  },

  auth: {
    signIn: 'Prijavite se',
    signUp: 'Registrirajte se',
    signOut: 'Odjavite se',
    email: 'E-poštni naslov',
    password: 'Geslo',
    confirmPassword: 'Potrdite geslo',
    firstName: 'Ime',
    lastName: 'Priimek',
    phoneNumber: 'Telefonska številka',
    rememberMe: 'Zapomni si me',
    forgotPassword: 'Pozabljeno geslo?',
    createAccount: 'Ustvarite račun',
    alreadyHaveAccount: 'Že imate račun?',
    dontHaveAccount: 'Še nimate računa?',
    loginWith: 'Ali nadaljujte z',
    registerAs: 'Registriraj se kot',
    privatePerson: 'Zasebna oseba',
    dealerAccount: 'Trgovski račun',
    userType: 'Jaz sem',
    
    // SignIn page specific
    backToHome: 'Nazaj domov',
    signInToAccount: 'Prijavite se v svoj račun',
    welcomeBack: 'Dobrodošli nazaj',
    enterCredentials: 'Vnesite svoje podatke za dostop do računa',
    privatePersonDescription: 'Kupite ali prodajte svoj avtomobil',
    dealerDescription: 'Profesionalni prodajalec',
    pro: 'Pro',
    enterYourEmail: 'Vnesite svoj e-poštni naslov',
    enterYourPassword: 'Vnesite svoje geslo',
    signingIn: 'Prijavljanje...',
    orContinueWith: 'Ali nadaljujte z',
    google: 'Google',
    facebook: 'Facebook',
    createPrivateAccount: 'Create Private Account',
    registerAsDealer: 'Register as Dealer',
    dealerBenefits: 'Prednosti trgovca',
    professionalDashboard: '• Professional dealer dashboard',
    inventoryManagement: '• Advanced inventory management',
    customerTracking: '• Customer inquiry tracking',
    enhancedVisibility: '• Enhanced listing visibility',
    analyticsInsights: '• Analytics and insights',
    
    // UserSignUp page specific
    createYourAccount: 'Create Your Account',
    joinThousands: 'Join thousands of car enthusiasts',
    privateAccount: 'Zasebni račun',
    buyAndSellCars: 'Buy and sell cars, save favorites, and manage your listings',
    fullName: 'Polno ime',
    enterFullName: 'Enter your full name',
    emailAddress: 'E-poštni naslov',
    createStrongPassword: 'Create a strong password',
    confirmYourPassword: 'Confirm your password',
    mustBeCharacters: 'Must be at least 8 characters',
    agreeToTerms: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Pravilnik o zasebnosti',
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
    dealerRegistration: 'Registracija trgovca',
    joinCarMarketDealer: 'Join CarMarket365 as a professional dealer',
    businessInformation: 'Poslovne informacije',
    tellUsAboutBusiness: 'Tell us about your dealership or business',
    businessName: 'Ime podjetja',
    businessNamePlaceholder: 'Your Business Name GmbH',
    businessType: 'Vrsta podjetja',
    selectBusinessType: 'Select business type',
    carDealership: 'Avtosalon',
    usedCarLot: 'Used Car Lot',
    autoTrader: 'Trgovec z avtomobili',
    carBroker: 'Avtomobilski posrednik',
    rentalCompany: 'Podjetje za najem',
    other: 'Other',
    vatNumber: 'VAT Number',
    vatNumberPlaceholder: 'DE123456789',
    taxId: 'Tax ID',
    optional: 'Optional',
    yearEstablished: 'Leto ustanovitve',
    selectYear: 'Select year',
    businessDescription: 'Opis podjetja',
    businessDescriptionPlaceholder: 'Describe your business, specializations, and services...',
    contactPerson: 'Kontaktna oseba',
    primaryContactInfo: 'Primary contact information for your business',
    position: 'Position',
    positionPlaceholder: 'e.g., Owner, Sales Manager',
    businessEmail: 'Poslovni e-naslov',
    businessEmailPlaceholder: 'business@example.com',
    businessAddress: 'Poslovni naslov',
    dealershipLocation: "Your dealership's physical location",
    streetAddress: 'Ulica in številka',
    streetAddressPlaceholder: '123 Business Street',
    city: 'City',
    cityPlaceholder: 'Munich',
    stateRegion: 'State/Region',
    stateRegionPlaceholder: 'Bavaria',
    postalCode: 'Poštna številka',
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
    accountSetup: 'Nastavitev računa',
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
    resetPassword: 'Ponastavi geslo',
    resetPasswordDescription: 'Vnesite svoj e-poštni naslov in poslali vam bomo povezavo za ponastavitev gesla.',
    sendResetLink: 'Pošlji povezavo za ponastavitev',
    checkYourEmail: 'Preverite svojo e-pošto',
    resetLinkSent: 'Povezavo za ponastavitev gesla smo poslali na',
    nextSteps: 'Naslednji koraki',
    checkEmailInbox: 'Preverite svoj poštni nabiralnik (in mapo za neželeno pošto)',
    clickResetLink: 'Kliknite povezavo za ponastavitev v e-pošti',
    createNewPassword: 'Ustvarite novo geslo',
    tryAnotherEmail: 'Poskusite z drugim e-poštnim naslovom',
    
    // Missing auth translations
    registerationFailed: 'Registracija ni uspela',
    dealershipLocation: 'Fizična lokacija vaše trgovine',
    
    accessDenied: {
      title: 'Dostop zavrnjen',
      signInRequired: 'Prosimo, prijavite se za dostop do te strani.',
      redirectingToDashboard: 'Preusmerjanje na vašo nadzorno ploščo...',
    },
    
    passwordStrength: {
      label: 'Moč gesla',
      levels: {
        weak: 'Šibko',
        medium: 'Srednje',
        strong: 'Močno',
      },
      requirements: {
        label: 'Zahteve:',
        length: 'Najmanj 8 znakov',
        uppercase: 'Ena velika črka',
        lowercase: 'Ena mala črka',
        number: 'Ena številka',
        special: 'En poseben znak (!@#€%^&*)',
      },
    },
    
    socialLogin: {
      signingIn: 'Prijavljanje...',
      facebook: {
        description: 'Povežite se s Facebookom za dostop do vašega CarMarket365 računa.',
      },
      google: {
        description: 'Uporabite svoj Google račun za hitro prijavo ali ustvarjanje novega računa.',
      },
    },
  },

  sell: {
    title: 'Prodajte svoje vozilo',
    expressTitle: 'Ekspresna prodaja',
    sellYourCar: 'Prodajte svoje vozilo',
    carInformation: 'Podatki o vozilu',
    uploadPhotos: 'Naložite fotografije',
    setPrice: 'Nastavite ceno',
    contactInformation: 'Kontaktni podatki',
    publish: 'Objavi',
    draft: 'Shrani kot osnutek',
    preview: 'Predogled',
    required: 'Obvezno',
    optional: 'Neobvezno',
    addPhotos: 'Dodaj fotografije',
    removePhoto: 'Odstrani fotografijo',
    mainPhoto: 'Glavna fotografija',
    additionalInfo: 'Dodatne informacije',
    sellerNotes: 'Opombe prodajalca',
    
    // Step titles
    steps: {
      vehicleType: 'Tip vozila',
      basicInfo: 'Osnovne informacije',
      details: 'Podrobnosti',
      photosAndContact: 'Fotografije in kontakt',
    },
    
    // Vehicle type selection
    vehicleTypes: {
      car: {
        name: 'Avtomobil',
        description: 'Sedan, SUV, coupe, hatchback',
      },
      truck: {
        name: 'Tovornjak',
        description: 'Pickup tovornjaki, komercialna vozila',
      },
      motorbike: {
        name: 'Motorno kolo',
        description: 'Motocikli, skuterji, ATV',
      },
    },
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'Kakšno vrsto vozila prodajate?',
      basicInformation: 'Osnovne informacije',
      basicInfoDescription: 'Povejte nam o svojem {vehicleType}',
      additionalDetails: 'Dodatne podrobnosti',
      additionalDetailsDescription: 'Dodajte več podrobnosti o svojem {vehicleType}',
      photosAndContact: 'Fotografije in kontaktni podatki',
      photosAndContactDescription: 'Dodajte fotografije in svoje kontaktne podatke',
    },
    
    // Form fields and labels
    fields: {
      make: 'Znamka',
      model: 'Model',
      year: 'Leto',
      mileage: 'Kilometrina',
      condition: 'Stanje',
      fuelType: 'Vrsta goriva',
      transmission: 'Menjalnik',
      exteriorColor: 'Zunanja barva',
      interiorColor: 'Notranja barva',
      askingPrice: 'Zahtevana cena',
      featuresAndOptions: 'Značilnosti in opcije',
      description: 'Opis',
      vehiclePhotos: 'Fotografije vozila',
      contactName: 'Ime za kontakt',
      phoneNumber: 'Telefonska številka',
      emailAddress: 'E-poštni naslov',
      location: 'Lokacija',
    },
    
    // Placeholders
    placeholders: {
      selectMake: 'Izberi znamko',
      enterModel: 'Vnesite model',
      selectYear: 'Izberi leto',
      selectCondition: 'Izberi stanje',
      enterMileage: 'Vnesite kilometrino',
      selectFuelType: 'Izberi vrsto goriva',
      selectTransmission: 'Izberi menjalnik',
      exteriorColorExample: 'npr. bela, črna, srebrna',
      interiorColorExample: 'npr. črna, bež, siva',
      priceExample: '25.000',
      descriptionExample: 'Opišite stanje svojega vozila, zgodovino in dodatne podrobnosti...',
      yourFullName: 'Vaše polno ime',
      phoneExample: '(01) 123-4567',
      emailExample: 'vas.email@primer.si',
      cityState: 'Mesto, Država',
      yourName: 'Vaše ime',
      yourPhoneNumber: 'Vaša telefonska številka',
      yourEmail: 'Vaša e-pošta',
      cityCountry: 'Mesto, Država',
      enterAskingPrice: 'Vnesite željeno ceno',
      describeYourVehicle: 'Opišite svoje vozilo...',
      selectFuel: 'Izberite tip goriva',
      selectTransmissionType: 'Izberite tip menjalnika',
      choosePhotos: 'Izberite fotografije',
    },
    
    // Headers
    headers: {
      vehicleTypeQuestion: 'Kakšen tip vozila prodajate?',
      basicInformation: 'Osnovne informacije',
      basicInfoDescription: 'Povejte nam o svojem {vehicleType}',
      additionalDetails: 'Dodatne podrobnosti',
      additionalDetailsDescription: 'Dodajte več podrobnosti o svojem {vehicleType}',
      photosAndContact: 'Fotografije in kontaktni podatki',
      photosAndContactDescription: 'Dodajte fotografije in svoje kontaktne podatke',
      vehicleDetails: 'Podrobnosti vozila',
      photosAndContactInfo: 'Fotografije in kontaktni podatki',
      uploadVehiclePhotos: 'Naloži fotografije vozila',
      addUpToTenPhotos: 'Dodajte do 10 fotografij',
    },
    
    // Button labels
    buttons: {
      nextStep: 'Naslednji korak',
      previous: 'Nazaj',
      createListing: 'Ustvari oglas',
    },
    
    // Preview section
    preview: {
      title: 'Predogled',
      yourVehicle: 'Vaše vozilo',
      milesLabel: 'kilometrov',
      priceLabel: 'Cena',
      photosCount: '{count} fotografij{plural}',
      photo: 'a',
      photos: '',
    },
    
    // Photo upload
    photos: {
      instruction: 'Dodajte do 10 visokokakovostnih fotografij svojega vozila. Prva fotografija bo glavna slika, prikazana v rezultatih iskanja.',
      selected: '{count} fotografij{plural} izbranih',
      photo: 'a',
      photos: '',
    },
    
    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    
    // Fuel types
    fuelTypes: {
      gasoline: 'Bencin',
      electric: 'Električno',
      hybrid: 'Hibridno',
      diesel: 'Dizel',
      pluginHybrid: 'Priključni hibrid',
      flexFuel: 'Fleksibilno gorivo',
      cng: 'CNG',
      lpg: 'UNP',
    },
    
    // Transmissions
    transmissions: {
      automatic: 'Samodejni',
      manual: 'Ročni',
      cvt: 'CVT',
    },
    
    bodyTypes: {
      sedan: 'Sedan',
      suv: 'SUV',
      truck: 'Tovornjak',
      coupe: 'Kupe',
      hatchback: 'Hatchback',
      convertible: 'Kabriolet',
      wagon: 'Karavan',
      van: 'Minibus',
      crossover: 'Crossover'
    },
    drivetrains: {
      fwd: 'Sprednji pogon',
      rwd: 'Zadnji pogon',
      awd: 'Pogon na vsa kolesa',
      fourwd: 'Štirikolesni pogon'
    },
    colors: {
      black: 'Črna',
      white: 'Bela',
      silver: 'Srebrna',
      gray: 'Siva',
      red: 'Rdeča',
      blue: 'Modra',
      green: 'Zelena',
      brown: 'Rjava',
      gold: 'Zlata',
      orange: 'Oranžna',
      purple: 'Vijolična',
      yellow: 'Rumena'
    },
    // Conditions
    conditions: {
      new: 'Novo',
      likeNew: 'Kot novo',
      excellent: 'Odlično',
      veryGood: 'Zelo dobro',
      good: 'Dobro',
      fair: 'Zadovoljivo',
      poor: 'Slabo'
    },
    
    // Features list
    features: {
      airConditioning: 'Klimatska naprava',
      leatherSeats: 'Usnjeni sedeži',
      heatedSeats: 'Ogrevani sedeži',
      sunroof: 'Strešno okno',
      gpsNavigation: 'GPS navigacija',
      backupCamera: 'Kamera za vzvratno vožnjo',
      bluetooth: 'Bluetooth',
      usbPorts: 'USB vhodi',
      premiumSound: 'Vrhunski zvočni sistem',
      keylessEntry: 'Vstop brez ključa',
      remoteStart: 'Daljinsko zaganjanje',
      cruiseControl: 'Tempomat',
      parkingSensors: 'Senzorji za parkiranje',
      blindSpotMonitoring: 'Nadzor mrtvega kota',
    },
  },

  countries: {
    northMacedonia: 'Severna Makedonija',
    albania: 'Albanija',
    kosovo: 'Kosovo',
    slovenia: 'Slovenija',
    latvia: 'Latvija',
    global: 'Globalno',
    chooseCountry: 'Izberite svojo državo',
    changeCountry: 'Spremenite državo',
    detectedLocation: 'Zaznana lokacija',
    currentSite: 'Trenutna spletna stran',
    localBenefits: 'Lokalne prednosti',
    localCurrency: 'Lokalna valuta in cene',
    localLanguages: 'Podpora v maternem jeziku',
    localDealers: 'Lokalni trgovci in zaloge',
    regionalFeatures: 'Regionalne funkcionalnosti',
  },

  redirect: {
    welcome: 'Dobrodošli v CarMarket365!',
    detectedFrom: 'Zaznali smo, da obiskujete iz',
    redirectMessage: 'Preusmerjeni boste na našo spletno stran za {country} za najboljšo lokalno izkušnjo, ali pa lahko izberete drugo državo.',
    continueToSite: 'Nadaljuj na stran za {country}',
    chooseDifferent: 'Izberi drugo državo',
    localBenefitsTitle: 'Lokalne prednosti za {country}',
    howDetected: 'Kako smo to zaznali?',
    hideDetails: 'Skrij podrobnosti',
    changeAnytime: 'Svojo preferenco države lahko spremenite kadarkoli v glavi strani.',
    countrySpecificExperience: 'Vsaka nacionalna stran ponuja lokalizirano vsebino, cene in jezikovne možnosti za najboljšo izkušnjo.',
    adminTestingMode: 'Skrbniški/testni način',
    adminNotAvailable: 'Skrbniški/testni način - ni na voljo strankam',
    selectCountryToContinue: 'Prosimo, izberite svojo državo za nadaljevanje. To bo določilo vašo lokalno stran, jezik in valuto.',
  },

  modals: {
    close: 'Zapri',
    confirm: 'Potrdi',
    cancel: 'Prekliči',
    save: 'Shrani',
    delete: 'Izbriši',
    contactSeller: 'Kontaktiraj prodajalca',
    scheduleTestDrive: 'Razporedi testno vožnjo',
    requestFinancing: 'Zaprosite za financiranje',
    reportListing: 'Prijavi oglas',
    shareListing: 'Deli oglas',
    sendMessage: 'Pošlji sporočilo',
    yourName: 'Vaše ime',
    yourEmail: 'Vaš e-poštni naslov',
    yourPhone: 'Vaša telefonska številka',
    message: 'Sporočilo',
    interestedIn: 'Zanima me',
    preferredTime: 'Prednostni čas',
    additionalNotes: 'Dodatne opombe',
    
    badges: {
      new: 'Nov',
      certified: 'Certificiran',
      financing: 'Financiranje',
      warrantyIncluded: 'Garancija vključena',
    },

    contactCar: {
      title: 'Kontaktiraj prodajalca',
      description: 'Pošlji sporočilo glede tega vozila',
      successTitle: 'Sporočilo uspešno poslano!',
      successDescription: 'Vaše sporočilo je bilo poslano prodajalcu. Kmalu vas bodo kontaktirali.',
    },

    financing: {
      title: 'Pridobite predhodno odobritev za financiranje',
      description: 'Pridobite predhodno odobritev za avtomobilsko financiranje v minutah',
      badges: {
        financingAvailable: 'Financiranje na voljo',
      },
      employmentStatus: {
        retired: 'Upokojen',
        student: 'Študent',
        unemployed: 'Brezposeln',
      },
      placeholders: {
        fullName: 'Polno ime',
        email: 'E-poštni naslov',
        phone: 'Telefonska številka',
        annualIncome: 'Letni dohodek',
        employmentStatus: 'Status zaposlitve',
        creditScore: 'Kreditna ocena',
        downPayment: 'Polog',
        loanTerm: 'Doba posojila',
      },
      validation: {
        fullNameRequired: 'Polno ime je obvezno',
        emailRequired: 'E-poštni naslov je obvezen',
        emailInvalid: 'Neveljavna e-poštna oblika',
        phoneRequired: 'Telefonska številka je obvezna',
        phoneInvalid: 'Neveljavna telefonska številka',
        annualIncomeRequired: 'Letni dohodek je obvezen',
        annualIncomeInvalid: 'Neveljavna oblika dohodka',
        employmentStatusRequired: 'Status zaposlitve je obvezen',
        creditScoreRequired: 'Kreditna ocena je obvezna',
        downPaymentRequired: 'Polog je obvezen',
        downPaymentInvalid: 'Neveljavna oblika pologa',
        loanTermRequired: 'Doba posojila je obvezna',
      },
      successTitle: 'Zahteva za predhodno odobritev uspešno poslana!',
      successDescription: 'Vaša zahteva za financiranje je bila poslana. Prejeli boste odziv v 24 urah.',
      actions: {
        submit: 'Pošlji zahtevo',
        cancel: 'Prekliči',
      },
    },
  },

  pages: {
    about: 'O nas',
    carReviews: 'Ocene vozil',
    safetyTips: 'Varnostni nasveti',
    dealerSupport: 'Podpora trgovcem',
    faq: 'Pogosta vprašanja',
    contactUs: 'Kontaktirajte nas',
    privacyPolicy: 'Pravilnik o zasebnosti',
    termsOfService: 'Pogoji uporabe',
    cookiePolicy: 'Pravilnik o piškotkih',
    imprint: 'Impressum',
    accessibility: 'Dostopnost',
    signUp: 'Registracija',
    signIn: 'Prijava',
    dashboard: 'Nadzorna plošča',
    adminDashboard: 'Skrbniška nadzorna plošča',
    dealerDashboard: 'Trgovska nadzorna plošča',
    privateDashboard: 'Osebna nadzorna plošča',
    browseCars: 'Prebrskaj vozila',
    savedCars: 'Shranjena vozila',
    sellCar: 'Prodaj vozilo',
    financing: 'Financiranje',
    advancedSearch: 'Napredno iskanje',
    carDetail: 'Podrobnosti vozila',
    dealers: 'Trgovci',
    myAccount: 'Moj račun',
    settings: 'Nastavitve',
    helpCenter: 'Center za pomoč',
    feedback: 'Povratne informacije',
    disclaimer: 'Izjava o omejitvi odgovornosti',
    carInsurance: 'Zavarovanje vozil',
    underConstruction: 'V gradnji',
    underConstructionMessage: 'Ta stran je trenutno v gradnji. Trdo delamo, da vam prinesemo neverjetne funkcionalnosti. Prosimo, preverite ponovno kmalu ali nadaljujte z raziskovanjem naše domače strani.',
    backToHome: 'Nazaj na domov',
  },

  forms: {
    placeholders: {
      selectMake: 'Izberite znamko',
      selectModel: 'Izberite model',
      selectYear: 'Izberite leto',
      selectCondition: 'Izberite stanje',
      selectFuelType: 'Izberite vrsto goriva',
      selectTransmission: 'Izberite menjalnik',
      selectBodyType: 'Izberite vrsto karoserije',
      selectDrivetrain: 'Izberite pogon',
      enterName: 'Vnesite ime',
      enterEmail: 'Vnesite e-poštni naslov',
      enterPassword: 'Vnesite geslo',
      enterPhone: 'Vnesite telefonsko številko',
      enterModel: 'Vnesite model',
      enterMileage: 'Vnesite kilometrino',
      enterPrice: 'Vnesite ceno',
      enterLocation: 'Vnesite lokacijo',
      enterCity: 'Vnesite mesto',
      enterDescription: 'Vnesite opis',
      searchCars: 'Išči vozila',
      searchListings: 'Išči oglase',
      searchFAQs: 'Išči v pogostih vprašanjih',
      anyMake: 'Katera koli znamka',
      anyModel: 'Kateri koli model',
      anyYear: 'Katero koli leto',
      anyMileage: 'Katera koli kilometrina',
      minPrice: 'Najnižja cena',
      maxPrice: 'Najvišja cena',
      role: 'Vloga',
      sortBy: 'Razvrsti po',
      filterBy: 'Filtriraj po',
    },
    labels: {
      businessName: 'Ime podjetja',
      businessType: 'Vrsta podjetja',
      vatNumber: 'Davčna številka',
      firstName: 'Ime',
      lastName: 'Priimek',
      email: 'E-poštni naslov',
      password: 'Geslo',
      confirmPassword: 'Potrdite geslo',
      phoneNumber: 'Telefonska številka',
      street: 'Ulica',
      city: 'Mesto',
      state: 'Regija',
      postalCode: 'Poštna številka',
      country: 'Država',
      make: 'Znamka',
      model: 'Model',
      year: 'Leto',
      mileage: 'Kilometrina',
      condition: 'Stanje',
      fuelType: 'Vrsta goriva',
      transmission: 'Menjalnik',
      bodyType: 'Vrsta karoserije',
      exteriorColor: 'Zunanja barva',
      interiorColor: 'Notranja barva',
      price: 'Cena',
      description: 'Opis',
      contactName: 'Kontaktno ime',
      contactPhone: 'Kontaktna telefonska številka',
      contactEmail: 'Kontaktni e-poštni naslov',
      location: 'Lokacija',
      rememberMe: 'Zapomni si me',
      termsAccepted: 'Sprejemam pogoje uporabe',
      privacyAccepted: 'Sprejemam pravilnik o zasebnosti',
    },
    buttons: {
      submit: 'Pošlji',
      register: 'Registriraj se',
      signIn: 'Prijavite se',
      signUp: 'Registrirajte se',
      signOut: 'Odjavite se',
      backToSignIn: 'Nazaj na prijavo',
      backToHome: 'Nazaj na domov',
      createAccount: 'Ustvarite račun',
      forgotPassword: 'Pozabljeno geslo',
      resetPassword: 'Ponastavi geslo',
      updateProfile: 'Posodobi profil',
      uploadPhotos: 'Naloži fotografije',
      removePhoto: 'Odstrani fotografijo',
      publishListing: 'Objavi oglas',
      saveDraft: 'Shrani osnutek',
      previewListing: 'Predogled oglasa',
      editListing: 'Uredi oglas',
      deleteListing: 'Izbriši oglas',
      viewListing: 'Poglej oglas',
      viewDetails: 'Poglej podrobnosti',
      contactDealer: 'Kontaktiraj trgovca',
      scheduleTestDrive: 'Razporedi testno vožnjo',
      requestFinancing: 'Zaprosite za financiranje',
      shareVehicle: 'Deli vozilo',
      saveToFavorites: 'Shrani med priljubljene',
      removeFromFavorites: 'Odstrani iz priljubljenih',
      applyFilters: 'Uporabi filtre',
      clearFilters: 'Počisti filtre',
      clearSearch: 'Počisti iskanje',
      searchVehicles: 'Išči vozila',
      viewAllCars: 'Poglej vsa vozila',
      loadMore: 'Naloži več',
      showMore: 'Prikaži več',
      showLess: 'Prikaži manj',
    },
  },

  carSpecs: {
    conditions: {
      new: 'Novo',
      likeNew: 'Kot novo',
      excellent: 'Odlično',
      veryGood: 'Zelo dobro',
      good: 'Dobro',
      fair: 'Zadovoljivo',
      poor: 'Slabo',
      used: 'Rabljeno',
      certifiedPreOwned: 'Certificirano rabljeno',
    },
    fuelTypes: {
      gasoline: 'Bencin',
      petrol: 'Bencin',
      diesel: 'Dizel',
      electric: 'Električni pogon',
      hybrid: 'Hibridni pogon',
      pluginHybrid: 'Vključni hibrid',
      cng: 'Zemeljski plin (CNG)',
      lpg: 'Utekočinjeni naftni plin (LPG)',
      flexFuel: 'Fleksibilno gorivo',
    },
    transmissions: {
      manual: 'Ročni menjalnik',
      automatic: 'Avtomatski menjalnik',
      cvt: 'Brezstopenjski menjalnik (CVT)',
      semiAutomatic: 'Polavtomatski menjalnik',
    },
    bodyTypes: {
      sedan: 'Sedan',
      suv: 'SUV (Športni terenci)',
      hatchback: 'Hečbek',
      coupe: 'Kupé',
      convertible: 'Kabriolet',
      wagon: 'Karavan',
      pickup: 'Pickup',
      truck: 'Tovornjak',
      van: 'Kombi',
      minivan: 'Večnamenska vozila',
    },
    drivetrains: {
      fwd: 'Sprednji pogon (FWD)',
      rwd: 'Zadnji pogon (RWD)',
      awd: 'Pogon na vsa kolesa (AWD)',
      fourWD: 'Štirikolesni pogon (4WD)',
    },
    colors: {
      black: 'Črna',
      white: 'Bela',
      silver: 'Srebrna',
      gray: 'Siva',
      grey: 'Siva',
      blue: 'Modra',
      red: 'Rdeča',
      green: 'Zelena',
      brown: 'Rjava',
      gold: 'Zlata',
      yellow: 'Rumena',
      orange: 'Oranžna',
      purple: 'Vijolična',
      beige: 'Bež',
      other: 'Druga',
      unknown: 'Neznana',
    },
    features: {
      airConditioning: 'Klimatska naprava',
      leatherSeats: 'Usnjeni sedeži',
      heatedSeats: 'Ogrevani sedeži',
      cooledSeats: 'Hlajeni sedeži',
      sunroof: 'Strešno okno',
      moonroof: 'Panoramska streha',
      gpsNavigation: 'GPS navigacija',
      backupCamera: 'Kamera za vzvratno vožnjo',
      bluetooth: 'Bluetooth',
      usbPorts: 'USB priključki',
      wirelessCharging: 'Brezžično polnjenje',
      premiumSound: 'Premium zvočni sistem',
      keylessEntry: 'Brezključno odklepanje',
      remoteStart: 'Daljinski zagon',
      cruiseControl: 'Tempomat',
      parkingSensors: 'Parkirni senzorji',
      blindSpotMonitoring: 'Nadzor slepega kota',
      alloyWheels: 'Aluminijasta platišča',
      antiLockBrakes: 'ABS zavore',
      electronicStabilityControl: 'ESP elektronski nadzor stabilnosti',
      airbags: 'Zračne blazine',
      powerSteering: 'Servo volan',
      electricWindows: 'Električna okna',
      centralLocking: 'Centralno zaklepanje',
      powerBrakes: 'Servo zavore',
      amFmRadio: 'AM/FM radio',
    },
  },

  dashboard: {
    overview: 'Pregled',
    listings: 'Oglasi',
    inquiries: 'Povpraševanja',
    analytics: 'Analitika',
    reports: 'Poročila',
    userManagement: 'Upravljanje uporabnikov',
    allListings: 'Vsi oglasi',
    myListings: 'Moji oglasi',
    savedCars: 'Shranjena vozila',
    lastSearch: 'Zadnje iskanje',
    expressSale: 'Hitra prodaja',
    contact: 'Kontakt',
    settings: 'Nastavitve',
    profile: 'Profil',
    adminPanel: 'Skrbniška plošča',
    dealerDashboard: 'Trgovska plošča',
    myDashboard: 'Moja plošča',
    signInToAccessDashboard: 'Prijavite se za dostop do nadzorne plošče',
  },

  business: {
    quickLinks: 'Hitre povezave',
    support: 'Podpora',
    legal: 'Pravno',
    companyInfo: 'Podatki o podjetju',
    searchCars: 'Išči vozila',
    sellYourCar: 'Prodaj svoje vozilo',
    registeredDealers: 'Registrirani trgovci',
    carReviews: 'Ocene vozil',
    contactUs: 'Kontaktirajte nas',
    safetyTips: 'Varnostni nasveti',
    dealerSupport: 'Podpora trgovcem',
    frequentlyAskedQuestions: 'Pogosta vprašanja',
    privacyPolicy: 'Pravilnik o zasebnosti',
    termsOfService: 'Pogoji uporabe',
    cookiePolicy: 'Pravilnik o piškotkih',
    imprint: 'Impressum',
    accessibility: 'Dostopnost',
    allRightsReserved: 'Vse pravice pridržane',
    trustedMarketplace: 'Zaupanja vreden trg',
    qualityUsedCars: 'Kakovostna rabljena vozila',
    perfectVehicle: 'Popolno vozilo',
    thousandsOfListings: 'Tisoči oglasov',
  },

  footer: {
    aboutUs: 'Vaš zanesljiv trg za kakovostna rabljena vozila. Poiščite svoje popolno vozilo med tisoči oglasi.',
    quickLinks: 'Hitre povezave',
    searchCars: 'Iskanje vozil',
    sellYourCar: 'Prodajte svoje vozilo',
    registeredDealers: 'Registrirani trgovci',
    carReviews: 'Ocene vozil',
    support: 'Podpora',
    contactUs: 'Kontaktirajte nas',
    safetyTips: 'Varnostni nasveti',
    dealerSupport: 'Podpora trgovcem',
    faq: 'Pogosto zastavljena vprašanja',
    legal: 'Pravno',
    privacyPolicy: 'Pravilnik o zasebnosti',
    termsOfService: 'Pogoji uporabe',
    cookiePolicy: 'Pravilnik o piškotkih',
    imprint: 'Impressum',
    accessibility: 'Dostopnost',
    dashboard: 'Nadzorna plošča',
    adminPanel: 'Skrbniški panel',
    dealerDashboard: 'Trgovska nadzorna plošča',
    myDashboard: 'Moja nadzorna plošča',
    signInToAccess: 'Prijavite se za dostop do nadzorne plošče',
    followUs: 'Sledite nam',
    newsletter: 'Glasilo',
    subscribeNewsletter: 'Naročite se na glasilo',
    emailAddress: 'E-poštni naslov',
    subscribe: 'Naročite se',
    copyright: '© 2024 CarMarket365',
    allRightsReserved: 'Vse pravice pridržane',
  },

  financing: {
    title: 'Financiranje vozil',
    subtitle: 'Poiščite najboljše možnosti financiranja za nakup svojega naslednjega avtomobila.',
    loanCalculator: 'Kalkulator kredita',
    monthlyPayment: 'Mesečna rata',
    totalInterest: 'Skupni obresti',
    totalPayment: 'Skupno plačilo',
    loanAmount: 'Znesek kredita',
    interestRate: 'Obrestna mera',
    loanTerm: 'Doba kredita',
    years: 'leta',
    calculate: 'Izračunaj',
    financialInformation: 'Finančne informacije',
    desiredLoanAmount: 'Želeni znesek kredita',
    enterLoanAmount: 'Vnesite znesek kredita',
    enterAnnualIncome: 'Vnesite letni dohodek',
    enterMonthlyExpenses: 'Vnesite mesečne stroške',
    selectRange: 'Izberite razpon',
    selectStatus: 'Izberite status',
    selectDuration: 'Izberite trajanje'
  },

  errors: {
    generic: 'Nekaj je šlo narobe. Prosimo, poskusite znova.',
    network: 'Napaka v omrežju. Prosimo, preverite svojo internetno povezavo.',
    notFound: 'Zahtevani element ni bil najden.',
    unauthorized: 'Nimate dovoljenja za dostop do tega vira.',
    forbidden: 'Dostop do tega vira je prepovedan.',
    serverError: 'Napaka strežnika. Prosimo, poskusite znova pozneje.',
    validation: 'Prosimo, preverite svoje vnose in poskusite znova.',
    required: 'To polje je obvezno.',
    invalidEmail: 'Prosimo, vnesite veljaven e-poštni naslov.',
    invalidPhone: 'Prosimo, vnesite veljavno telefonsko številko.',
    passwordTooShort: 'Geslo mora biti dolgo vsaj 8 znakov.',
    passwordMismatch: 'Gesli se ne ujemata.',
    fileTooBig: 'Velikost datoteke je prevelika.',
    invalidFileType: 'Neveljavna vrsta datoteke.',
    noInternetConnection: 'Ni internetne povezave.',
    sessionExpired: 'Vaša seja je potekla. Prosimo, prijavite se znova.',
    errorBoundary: {
      message: 'Nekaj je šlo narobe. Prosimo, osvežite stran.',
      details: 'Podrobnosti napake',
      stackTrace: 'Sled napake:',
      refreshPage: 'Osveži stran',
      tryAgain: 'Poskusi znova',
    },
  },

  success: {
    saved: 'Uspešno shranjeno!',
    updated: 'Uspešno posodobljeno!',
    deleted: 'Uspešno izbrisano!',
    sent: 'Uspešno poslano!',
    published: 'Uspešno objavljeno!',
    registered: 'Uspešno registriran!',
    loggedIn: 'Uspešno prijavljeni!',
    loggedOut: 'Uspešno odjavljeni!',
    passwordReset: 'E-pošta za ponastavitev gesla je bila poslana!',
    subscribed: 'Uspešno naročeni!',
    contactSent: 'Kontaktno sporočilo je bilo uspešno poslano!',
    favoriteAdded: 'Dodano med priljubljene!',
    favoriteRemoved: 'Odstranjeno iz priljubljenih!',
  },

  admin: {
    panel: 'Skrbniška plošča',
    dashboard: 'Skrbniška nadzorna plošča',
  },

  dealer: {
    notFound: 'Prodajalec ni bil najden',
    information: 'Informacije o prodajalcu',
    businessHours: 'Poslovni čas',
    vehicleInventory: 'Zaloga vozil',
    viewListing: 'Prikaži objavo',
    editListing: 'Uredi objavo',
    deleteListing: 'Izbriši objavo'
  },

  pages: {
    help: {
      title: 'Center za pomoč'
    },
    feedback: {
      title: 'Povratne informacije'
    },
    disclaimer: {
      title: 'Izjava o omejitvi odgovornosti'
    },
    insurance: {
      title: 'Avtomobilsko zavarovanje'
    },
    about: 'O nas',
    carReviews: 'Ocene vozil',
    safetyTips: 'Varnostni nasveti',
    dealerSupport: 'Podpora trgovcem',
    faq: 'Pogosta vprašanja',
    contactUs: 'Kontaktirajte nas',
    privacyPolicy: 'Pravilnik o zasebnosti',
    termsOfService: 'Pogoji uporabe',
    cookiePolicy: 'Pravilnik o piškotkih',
    imprint: 'Impressum',
    accessibility: 'Dostopnost',
    signUp: 'Registracija',
    signIn: 'Prijava',
    dashboard: 'Nadzorna plošča',
    adminDashboard: 'Skrbniška nadzorna plošča',
    dealerDashboard: 'Trgovska nadzorna plošča',
    privateDashboard: 'Osebna nadzorna plošča',
    browseCars: 'Prebrskaj vozila',
    savedCars: 'Shranjena vozila',
    sellCar: 'Prodaj vozilo',
    financing: 'Financiranje',
    advancedSearch: 'Napredno iskanje',
    carDetail: 'Podrobnosti vozila',
    dealers: 'Trgovci',
    myAccount: 'Moj račun',
    settings: 'Nastavitve',
    helpCenter: 'Center za pomoč',
    feedback: 'Povratne informacije',
    disclaimer: 'Izjava o omejitvi odgovornosti',
    carInsurance: 'Zavarovanje vozil',
    underConstruction: 'V gradnji',
    underConstructionMessage: 'Ta stran je trenutno v gradnji. Trdo delamo, da vam prinesemo neverjetne funkcionalnosti. Prosimo, preverite ponovno kmalu ali nadaljujte z raziskovanjem naše domače strani.',
    backToHome: 'Nazaj na domov',

    // Pogoji uporabe
    termsOfService: {
      title: 'Pogoji uporabe',
      subtitle: 'Pravni pogoji in določila za uporabo naše platforme za trgovanje z vozili.',
      backToHome: 'Nazaj na domov',
      termsAndConditions: 'Splošni pogoji',
      termsDescription: 'Prosimo, skrbno preberite te pogoje pred uporabo naše platforme.',
      overviewText: 'Ti pogoji uporabe urejajo vašo uporabo spletne strani CarMarket365 ter opredeljujejo pravice in odgovornosti vseh uporabnikov. Z dostopom do naše platforme se strinjate z zavezanostjo k tem pogojem.',
      userResponsibilities: 'Uporabnikove odgovornosti',
      userResponsibilitiesList: [
        'Zagotavljanje točnih informacij',
        'Vzdrževanje spoštljive komunikacije',
        'Spoštovanje vseh veljavnih zakonov',
        'Varovanje poverilnic vašega računa'
      ],
      platformRules: 'Pravila platforme',
      platformRulesList: [
        'Brez goljufivih oglasov',
        'Iskreni opisi vozil',
        'Profesionalna komunikacija',
        'Spoštovanje zasebnosti drugih uporabnikov'
      ],
      serviceLimitations: 'Omejitve storitve',
      serviceLimitationsList: [
        'Dostopnost platforme ni zagotovljena',
        'Vzdrževanje lahko povzroči nedelovanje',
        'Omejena odgovornost za dejanja uporabnikov',
        'Brez jamstva za vsebino tretjih oseb'
      ],
      disputeResolution: 'Reševanje sporov',
      disputeResolutionList: [
        'Spodbujamo neposredno komunikacijo',
        'Na voljo je posredovanje platforme',
        'Določeni postopki eskalacije',
        'Ohranjene pravne možnosti'
      ],
      additionalTerms: 'Dodatni pomembni pogoji',
      additionalTermsDescription: 'Ključne določbe, ki urejajo vašo uporabo naše platforme.',
      accountManagement: 'Upravljanje računa',
      accountManagementList: [
        'En račun na osebo',
        'Zahteve za varno geslo',
        'Pravilniki o začasni ukinitvi računa',
        'Hranjenje podatkov po končanju'
      ],
      intellectualProperty: 'Intelektualna lastnina',
      intellectualPropertyList: [
        'Lastništvo vsebine platforme',
        'Pravice do uporabniško ustvarjene vsebine',
        'Smernice za uporabo blagovnih znamk',
        'Pravilniki o kršitvah avtorskih pravic'
      ],
      questionsAboutTerms: 'Vprašanja o teh pogojih?',
      questionsText: 'Če imate vprašanja o teh pogojih ali potrebujete pojasnila o katerihkoli določbah, prosimo kontaktirajte našo pravno ekipo na legal@carmarket365.com',
      returnToPlatform: 'Vrnitev na platformo',
      contactLegalTeam: 'Kontaktiraj pravno ekipo'
    },

    // Pravilnik o zasebnosti
    privacyPolicy: {
      title: 'Pravilnik o zasebnosti',
      subtitle: 'Vaša zasebnost nam je pomembna. Preberite, kako zbiramo, uporabljamo in varujemo vaše osebne podatke.',
      backToHome: 'Nazaj na domov',
      ourPrivacyCommitment: 'Naša zavezanost zasebnosti',
      commitmentDescription: 'Pri CarMarket365 smo zavezani varovanju vaše zasebnosti in zagotavljanju varnosti vaših osebnih podatkov.',
      overviewText: 'Ta pravilnik o zasebnosti razlaga, kako zbiramo, uporabljamo, razkrivamo in varujemo vaše podatke, ko uporabljate našo platformo za trgovanje z vozili. Zavezani smo vzdrževanju najvišjih standardov zaščite zasebnosti in varnosti podatkov.',
      dataSecurity: 'Varnost podatkov',
      dataSecurityList: [
        'Šifriranje po industrijskih standardih',
        'Varen prenos podatkov',
        'Redni varnostni pregledi',
        'Omejen dostop do podatkov'
      ],
      transparency: 'Preglednost',
      transparencyList: [
        'Jasne prakse zbiranja podatkov',
        'Odkritost o uporabi podatkov',
        'Redne posodobitve pravilnika',
        'Obveščanje uporabnikov o spremembah'
      ],
      userRights: 'Pravice uporabnikov',
      userRightsList: [
        'Dostop do vaših podatkov',
        'Pravica do popravka informacij',
        'Zahteve za brisanje podatkov',
        'Odjava iz komunikacij'
      ],
      dataMinimization: 'Minimizacija podatkov',
      dataMinimizationList: [
        'Zbiranje le potrebnih podatkov',
        'Uporaba omejena na namen',
        'Samodejno pretekanje podatkov',
        'Redno čiščenje podatkov'
      ],
      informationWeCollect: 'Podatki, ki jih zbiramo',
      informationDescription: 'Zbiramo podatke, ki jih posredujete neposredno in samodejno, ko uporabljate našo platformo.',
      personalInformation: 'Osebni podatki',
      personalInformationList: [
        'Ime in kontaktni podatki',
        'Podatki za registracijo računa',
        'Komunikacijske preference',
        'Informacije profila'
      ],
      usageData: 'Podatki o uporabi',
      usageDataList: [
        'Podatki o interakciji s spletno stranjo',
        'Zgodovina iskanja in brskanja',
        'Podatki o napravi in brskalniku',
        'Lokacijski podatki (ob dovoljenju)'
      ],
      questionsAboutPrivacy: 'Vprašanja o zasebnosti?',
      privacyQuestionsText: 'Če imate vprašanja o tem pravilniku o zasebnosti ali naših praksah ravnanja s podatki, prosimo kontaktirajte našo ekipo za zasebnost na privacy@carmarket365.com',
      returnToPlatform: 'Vrnitev na platformo',
      contactPrivacyTeam: 'Kontaktiraj ekipo za zasebnost'
    },

    // Nadomestna stran
    placeholder: {
      underConstruction: 'V gradnji',
      underConstructionMessage: 'Ta stran je trenutno v gradnji. Trdo delamo, da vam prinesemo neverjetne funkcionalnosti. Prosimo, preverite ponovno kmalu ali nadaljujte z raziskovanjem naše domače strani.',
      backToHome: 'Nazaj na domov',
      contactUs: 'Kontaktirajte nas'
    },

    // Pogosto zastavljena vprašanja
    faq: {
      title: 'Pogosto zastavljena vprašanja',
      subtitle: 'Poiščite odgovore na pogosta vprašanja o nakupu, prodaji, financiranju in uporabi CarMarket365.',
      searchPlaceholder: 'Išči med pogostimi vprašanji...',
      browseByCategory: 'Pregledaj po kategorijah',
      allQuestions: 'Vsa vprašanja',
      stillNeedHelp: 'Še vedno potrebujete pomoč?',
      stillNeedHelpDescription: 'Ne najdete, kar iščete? Naša podporna ekipa je tu, da vam pomaga.',
      callSupport: 'Pokličite podporo',
      emailUs: 'Pošljite e-pošto',
      liveChat: 'Klepet v živo',
      available247: 'Na voljo 24/7',
      noResultsFound: 'Ni najdenih rezultatov',
      noResultsText: 'Poskusite iskanje z drugimi ključnimi besedami ali preglejte po kategorijah.',
      clearSearch: 'Počisti iskanje',
      commonQuestionsAbout: 'Pogosta vprašanja o',
      
      categories: {
        buying: 'Nakup vozil',
        selling: 'Prodaja vozil',
        financing: 'Financiranje in plačila',
        safety: 'Varnost in varovanje',
        account: 'Račun in podpora'
      },

      buyingFaqs: [
        {
          question: 'Kako iščem vozila na CarMarket365?',
          answer: 'Vozila lahko iščete z uporabo iskalnega obrazca na domači strani ali na strani Prebrskaj vozila. Filtrirajte po znamki, modelu, letu, cenovnem razponu, lokaciji in več. Za podrobno filtriranje uporabite napredno iskanje.'
        },
        {
          question: 'So vsi oglasi preverjeni?',
          answer: 'Da, vsi oglasi na CarMarket365 so preverjeni. Izvajamo preverjanja vseh trgovcev in zasebnih prodajalcev ter preverjamo točnost informacij o vozilih pred objavo oglasa.'
        },
        {
          question: 'Lahko razporedim testno vožnjo?',
          answer: 'Seveda! Testno vožnjo lahko razporedite neposredno preko strani s podrobnostmi vozila. Kontaktirajte prodajalca za dogovor primernega časa in lokacije testne vožnje.'
        },
        {
          question: 'Kaj naj prinesem za ogled vozila?',
          answer: 'Prinesite veljavno vozniško dovoljenje, potrdilo o zavarovanju in morebitna pisma o predhodni odobritvi financiranja. Če nameravate kupiti, prinesite bančni ček ali financijske dokumente.'
        },
        {
          question: 'Kako vem, ali je vozilo pošteno ocenjeno?',
          answer: 'Za vsa vozila zagotavljamo ocene tržne vrednosti. Lahko primerjate podobna vozila, preverite poročilo o zgodovini vozila in uporabite naša orodja za analizo cen.'
        }
      ],

      sellingFaqs: [
        {
          question: 'Kako objavim svoje vozilo za prodajo?',
          answer: 'Uporabite obrazec "Prodaj svoje vozilo" za ustvaritev oglasa. Potrebovali boste podatke o vozilu, fotografije, informacije o stanju in kontaktne podatke. Postopek traja približno 10-15 minut.'
        },
        {
          question: 'Je objavitev mojega vozila plačljiva?',
          answer: 'Osnovni oglasi so brezplačni za zasebne prodajalce. Ponujamo tudi premium možnosti oglasov z izboljšano vidnostjo za majhno pristojbino. Trgovci imajo druge cenovne strukture.'
        },
        {
          question: 'Kako dolgo traja prodaja vozila?',
          answer: 'V povprečju se dobro ocenjena vozila z dobrimi fotografijami prodajo v 2-4 tednih. Dejavniki vključujejo ceno, stanje, povpraševanje na trgu in kakovost oglasa.'
        },
        {
          question: 'Katere dokumente potrebujem za prodajo vozila?',
          answer: 'Potrebovali boste prometno dovoljenje vozila, registracijo, evidence vzdrževanja in veljaven osebni dokument. Nekatere države zahtevajo dodatno dokumentacijo - zagotavljamo smernice za posamezne države.'
        },
        {
          question: 'Kako konkurenčno ocenem svoje vozilo?',
          answer: 'Uporabite naše brezplačno orodje za ocenjevanje vozil, raziskajte podobne oglase, upoštevajte stanje vašega vozila, kilometrino in morebitna nedavna popravila ali izboljšave.'
        }
      ],

      financingFaqs: [
        {
          question: 'Lahko dobim financiranje preko CarMarket365?',
          answer: 'Da, sodelujemo z več posojilodajalci, da ponudimo konkurenčne možnosti financiranja. Predhodno odobritev lahko dobite online v nekaj minutah, ne da bi to vplivalo na vašo kreditno oceno.'
        },
        {
          question: 'Kakšno kreditno oceno potrebujem za avtomobilsko financiranje?',
          answer: 'Sodelujemo s posojilodajalci, ki sprejemajo različne kreditne ocene, od odličnih do slabih. Zahteve se razlikujejo glede na posojilodajalca, vendar pomagamo najti možnosti za večino situacij.'
        },
        {
          question: 'Kako poteka postopek vloge za posojilo?',
          answer: 'Izpolnite našo spletno vlogo, takoj dobite predhodno odobritev, izberite svoje vozilo in dokončajte posojilo. Celoten postopek se lahko opravi online ali po telefonu.'
        },
        {
          question: 'Kakšna je razlika med predhodno kvalifikacijo in predhodno odobritvijo?',
          answer: 'Predhodna kvalifikacija vam da oceno na podlagi osnovnih informacij. Predhodna odobritev vključuje preverjanje kreditne sposobnosti in zagotavlja trdno ponudbo posojila z določenimi pogoji.'
        },
        {
          question: 'Lahko menjam svoje trenutno vozilo?',
          answer: 'Mnogi naši trgovski partnerji sprejemajo menjave. Pridobite oceno menjave z uporabo našega orodja za ocenjevanje, nato se o možnostih pogovorite s trgovcem pri nakupu.'
        }
      ],

      safetyFaqs: [
        {
          question: 'Kako ostanem varen pri nakupu vozila?',
          answer: 'Srečajte se na javnih mestih, prinesite prijatelja, preverite identiteto prodajalca, temeljito preglejte vozilo in uporabite varne načine plačevanja. Nikoli ne nakazujte denarja ali ne plačajte, preden vidite vozilo.'
        },
        {
          question: 'Kateri načini plačevanja so najvarnejši?',
          answer: 'Uporabite bančne čeke, bančne nakazila ali financiranje preko preverjenih posojilodajalcev. Izogibajte se bančnim nakazilom, osebnim čekom ali gotovini za velike zneske.'
        },
        {
          question: 'Kako preverim, ali je prodajalec legitimen?',
          answer: 'Preverite njihov profil CarMarket365, preberite ocene, preverite kontaktne podatke in se srečajte osebno. Vsi naši trgovci so predhodno preverjeni in overjeni.'
        },
        {
          question: 'Kaj naj storim, če sum prevaro?',
          answer: 'Sumljivo dejavnost takoj prijavite preko naše platforme ali kontaktirajte našo podporno ekipo. Prevare jemljemo resno in vse prijave hitro preučimo.'
        },
        {
          question: 'So poročila o zgodovini vozil zanesljiva?',
          answer: 'Da, zagotavljamo celovita poročila o zgodovini vozil iz zaupanja vrednih virov. Ta vključujejo zgodovino nezgod, evidence vzdrževanja in informacije o prometu.'
        }
      ],

      accountFaqs: [
        {
          question: 'Kako ustvarim račun?',
          answer: 'Kliknite "Registriraj se" na kateri koli strani in vnesite svoj e-poštni naslov, telefonsko številko in osnovne informacije. Lahko se tudi registrirate z Google ali Facebook za hitrejšo registracijo.'
        },
        {
          question: 'Pozabil sem geslo. Kako ga ponastavim?',
          answer: 'Kliknite "Pozabljeno geslo" na strani za prijavo, vnesite svoj e-poštni naslov in sledite navodilom za ponastavitev, ki vam jih bomo poslali. Povezava za ponastavitev velja 24 ur.'
        },
        {
          question: 'Kako posodobim podatke svojega profila?',
          answer: 'Prijavite se v svoj račun in pojdite na "Nastavitve računa", kjer lahko posodobite osebne podatke, kontaktne podatke in preference.'
        },
        {
          question: 'Lahko shranim vozila za kasnejši ogled?',
          answer: 'Da! Kliknite ikono srca na katerem koli oglasu vozila, da ga shranite med priljubljene. Do shranjenih vozil lahko dostopate kadarkoli iz nadzorne plošče vašega računa.'
        },
        {
          question: 'Kako kontaktiram podporo za stranke?',
          answer: 'Uporabite našo stran "Kontaktirajte nas", pokličite (555) 123-HELP, pošljite e-pošto na support@carmarket365.com ali uporabite funkcijo klepeta v spodnjem desnem kotu katere koli strani.'
        }
      ]
    }
  },

  // Browse Cars Page
  browseCars: {
    title: 'na prodaj',
    searchPlaceholder: 'Znamka, model ali ključna beseda',
    filtersButton: 'Prikaži filtre',
    sortBy: 'Razvrsti po',
    sortOptions: {
      relevance: 'Relevantnost',
      priceLowToHigh: 'Cena: od nizke do visoke',
      priceHighToLow: 'Cena: od visoke do nizke',
      yearNewestFirst: 'Leto: najnovejša najprej',
      yearOldestFirst: 'Leto: najstarejša najprej',
      mileageLowToHigh: 'Kilometrina: od nizke do visoke',
      mileageHighToLow: 'Kilometrina: od visoke do nizke',
      addedRecently: 'Nedavno dodano',
    },
    viewOptions: {
      grid: 'Mreža',
      list: 'Seznam',
    },
    filters: {
      title: 'Filtri iskanja',
      clearAll: 'Počisti vse',
      apply: 'Uporabi',
      makeModel: 'Znamka in model',
      priceRange: 'Cenovni razpon',
      from: 'od',
      to: 'do',
      yearRange: 'Leto od',
      mileageRange: 'Maksimalna kilometrina',
      location: 'Lokacija',
      withinRadius: 'v radiju',
      fuelType: 'Vrsta goriva',
      transmission: 'Menjalnik',
      bodyType: 'Tip karoserije',
      condition: 'Stanje',
      features: 'Značilnosti',
      color: 'Barva',
      drivetrain: 'Pogon',
      minPrice: 'Minimalna cena',
      maxPrice: 'Maksimalna cena',
      noMin: 'Brez min.',
      noMax: 'Brez maks.',
      anyLocation: 'Vnesite mesto ali poštno številko',
      kilometers: 'km',
      miles: 'milj',
      any: 'Karkoli',
    },
    results: {
      showing: 'ki se ujemajo z vašimi kriteriji',
      of: 'od',
      results: 'vozil najdenih',
      noResults: 'Najdeno ni bilo nobeno vozilo',
      noResultsMessage: 'Poskusite prilagoditi iskalne pojme',
      tryDifferentFilters: 'Poskusite z različnimi filtri',
      loadMore: 'Naloži več',
      endOfResults: 'Konec rezultatov',
    },
    carCard: {
      viewDetails: 'Poglej podrobnosti',
      contactSeller: 'Kontakt',
      saveToFavorites: 'Shrani med priljubljene',
      saved: 'Shranjeno',
      featured: 'Izpostavljeno',
      certified: 'Certificirano',
      newArrival: 'Nova dobava',
      priceReduced: 'Znižana cena',
      greatDeal: 'Odlična ponudba',
      kmAbbrev: 'km',
      miAbbrev: 'mi',
      year: 'leto',
      automatic: 'Avtomatski',
      manual: 'Ročni',
      gasoline: 'Bencin',
      diesel: 'Dizel',
      electric: 'Električni',
      hybrid: 'Hibridni',
      showPhone: 'Prikaži telefon',
      hidePhone: 'Skrij telefon',
      callNow: 'Pokliči zdaj',
      sendMessage: 'Pošlji sporočilo',
      scheduleTour: 'Načrtuj ogled',
      reportListing: 'Prijavi oglas',
      shareListing: 'Deli oglas',
    },
    searchSuggestions: {
      title: 'Predlogi iskanja',
      recentSearches: 'Nedavna iskanja',
      clearRecent: 'Počisti nedavna',
      popularSearches: 'Priljubljena iskanja',
      suggestedBrands: 'Predlagane znamke',
      suggestedModels: 'Predlagani modeli',
      noRecentSearches: 'Ni nedavnih iskanj',
    },
    errorStates: {
      failedToLoad: 'Nalaganje ni uspelo',
      networkError: 'Napaka omrežja',
      tryAgain: 'Poskusi znova',
      contactSupport: 'Kontaktiraj podporo',
    },
  },

  // Advanced Search
  advancedSearch: {
    title: 'Napredna Preiskava Avtomobilov',
    subtitle: 'Poiščite svoje popolno vozilo z podrobnimi filtri in preferencami',
    backToHome: 'Nazaj na Domov',
    make: 'Znamka',
    model: 'Model',
    allModels: 'Vsi modeli',
    bodyType: 'Tip karoserije',
    fuelType: 'Vrsta goriva',
    anyMake: 'Katera koli znamka',
    anyBodyType: 'Kateri koli tip karoserije',
    anyFuelType: 'Katera koli vrsta goriva',
    additionalProperties: 'Dodatne lastnosti',
    searchCars: 'Išči Vozila',
    saveSearch: 'Shrani Iskanje',
    clearAll: 'Počisti Vse',
    active: 'aktivnih',
    filters: 'filtrov',
    filter: 'filter',
    
    // Page sections
    sections: {
      basicInformation: {
        title: 'Osnovne Informacije',
        description: 'Nastavite svoje glavne kriterije iskanja',
      },
      technicalSpecs: {
        title: 'Tehnične Specifikacije',
        description: 'Motor, menjalnik in podrobnosti o zmogljivosti',
      },
      featuresEquipment: {
        title: 'Oprema in Lastnosti',
        description: 'Izberite želeno opremo in lastnosti',
      },
      preferencesAndCertifications: {
        title: 'Preference in Certifikati',
        description: 'Dodatne preference in certifikacije',
      },
      vehicleDetails: {
        title: 'Podrobnosti Vozila',
      },
      priceLocation: {
        title: 'Cena in Lokacija',
      },
      featuresOptions: {
        title: 'Lastnosti in Možnosti',
        description: 'Izberite lastnosti, ki so vam pomembne',
      },
    },
    
    // Form fields
    fields: {
      make: 'Znamka',
      model: 'Model',
      bodyType: 'Tip Karoserije',
      condition: 'Stanje',
      fuelType: 'Vrsta Goriva',
      transmission: 'Menjalnik',
      drivetrain: 'Pogon',
      doors: 'Vrata',
      seats: 'Sedeži',
      exteriorColor: 'Zunanja Barva',
      interiorColor: 'Notranja Barva',
      colorPreference: 'Barvne Preference',
      certifications: 'Certifikacije',
      location: 'Lokacija',
      radius: 'Radij',
      searchRadius: 'Radij iskanja',
      sellerType: 'Tip Prodajalca',
      priceFrom: 'Cena od',
      minYear: 'Najstarejše Leto',
      maxYear: 'Najnovejše Leto',
      maxMileage: 'Največja Kilometrina',
      additionalProperties: 'Dodatne lastnosti',
    },
    
    // Placeholders
    placeholders: {
      selectMake: 'Izberite znamko',
      enterModel: 'Vnesite ime modela',
      anyMake: 'Katera Koli Znamka',
      allMakes: 'Vse Znamke',
      anyModel: 'Kateri Koli Model',
      anyType: 'Kateri Koli Tip',
      anyBodyType: 'Kateri Koli Tip Karoserije',
      anyFuelType: 'Katera Koli Vrsta Goriva',
      selectBodyType: 'Izberite tip karoserije',
      selectCondition: 'Izberite stanje',
      selectFuelType: 'Izberite vrsto goriva',
      selectTransmission: 'Izberite menjalnik',
      selectDrivetrain: 'Izberite pogon',
      numberOfDoors: 'Število vrat',
      numberOfSeats: 'Število sedežev',
      anyColor: 'Katera Koli Barva',
      selectPreferredColor: 'Izberite željeno barvo',
      cityOrPostalCode: 'Mesto ali poštna številka',
      cityStateOrZip: 'Mesto, Regija ali Pošta',
      anyMileage: 'Katera Koli Kilometrina',
      anyCondition: 'Katero Koli Stanje',
      anyDistance: 'Katera Koli Razdalja',
      allSellers: 'Vsi Prodajalci',
      any: 'Katero Koli',
    },
    
    // Range labels
    ranges: {
      priceRange: 'Cenovni Razpon',
      yearRange: 'Letni Razpon',
      mileageRange: 'Razpon Kilometrine (km)',
    },
    
    // Distance options
    distances: {
      25: 'V oddaljenosti 25 km',
      50: 'V oddaljenosti 50 km',
      100: 'V oddaljenosti 100 km',
      200: 'V oddaljenosti 200 km',
      250: 'V oddaljenosti 250 km',
      500: 'V oddaljenosti 500 km',
      nationwide: 'Po Vsej Državi',
    },
    
    // Mileage options
    mileage: {
      under10k: 'Pod 10.000 km',
      under25k: 'Pod 25.000 km',
      under50k: 'Pod 50.000 km',
      under75k: 'Pod 75.000 km',
      under100k: 'Pod 100.000 km',
      under150k: 'Pod 150.000 km',
    },
    
    // Seller types
    sellerTypes: {
      dealersOnly: 'Samo Trgovci',
      privateOnly: 'Samo Zasebni Prodajalci',
      certifiedOnly: 'Samo Certificirani Trgovci',
    },
    
    // Door options
    doors: {
      '2': '2 vrati',
      '3': '3 vrata',
      '4': '4 vrata',
      '5': '5 vrat',
    },
    
    // Seat options
    seats: {
      2: '2 sedeža',
      4: '4 sedeži',
      5: '5 sedežev',
      7: '7 sedežev',
      '8+': '8+ sedežev',
    },
    
    // Statični podatki vozil za napredno iskanje
    staticVehicleData: {
      makes: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citroen', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
      bodyTypes: [
        'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Kabriolet', 'Karavan', 'Pickup', 'Van',
        'Minivan', 'Crossover', 'Kompaktni', 'Subkompaktni', 'Srednji', 'Velik',
        'Športni avtomobil', 'Luksuzni', 'Električni', 'Hibridni'
      ],
      fuelTypes: [
        'Bencin', 'Dizel', 'Hibridni', 'Električni', 'Priključni hibrid', 'CNG', 'LPG',
        'Fleksibilno gorivo', 'Vodik', 'Biodizel', 'Etanol E85'
      ],
      transmissions: [
        'Ročni', 'Avtomatski', 'CVT', 'Polavtomatski', 'Dvojna sklopka', '6-stopenjski ročni',
        '7-stopenjski avtomatski', '8-stopenjski avtomatski', '9-stopenjski avtomatski', '10-stopenjski avtomatski'
      ],
      drivetrains: [
        'Sprednji pogon', 'Zadnji pogon', 'Pogon na vsa kolesa', '4WD', 
        'Delni 4WD', 'Stalen 4WD', 'Elektronski AWD', 'Mehanični AWD'
      ],
      colors: [
        'Črna', 'Bela', 'Srebrna', 'Siva', 'Siva', 'Modra', 'Rdeča', 'Zelena', 'Rjava', 
        'Zlata', 'Rumena', 'Oranžna', 'Vijolična', 'Bež', 'Kostanjeva', 'Bronasta', 'Bakrena',
        'Biserno bela', 'Kovinsko srebrna', 'Temno modra', 'Dirkaška rdeča', 'Gozdno zelena',
        'Ogljeno', 'Platinasta', 'Drugo'
      ],
      conditions: [
        'Novo', 'Kot novo', 'Odlično', 'Zelo dobro', 'Dobro', 'Zadovoljivo', 'Rabljeno', 
        'Certificirano rabljeno', 'Obnovljeno', 'Restavrirano', 'Klasično', 'Vintage'
      ],
      features: [
        'Klimatska naprava', 'Usnjeni sedeži', 'Navigacijski sistem', 'Bluetooth', 'USB vrata',
        'Kamera za vzvratno vožnjo', 'Parkirni senzorji', 'Ogrevani sedeži', 'Streha', 'Aluminijaste platišča',
        'Tempomat', 'ABS zavore', 'Elektronski nadzor stabilnosti', 'Zračne blazine',
        'Daljinski zagon', 'Brezključni vstop', 'Električna okna', 'Servo volan', 'Zatemnjena stekla',
        'Vrhunski zvočni sistem', 'Satelitski radio', 'CD predvajalnik', 'MP3 predvajalnik', 'DVD predvajalnik',
        'Brezžično polnjenje', 'Apple CarPlay', 'Android Auto', 'Opozorilo za zapuščanje voznega pasu',
        'Nadzor mrtvega kota', 'Opozorilo o trčenju', 'Avtomatsko zasilno zaviranje',
        'Prilagodljiv tempomat', 'Pomoč pri parkiranju', 'Kamera za vzvratno vožnjo', '360-stopinjska kamera',
        'Ogrevano krmilo', 'Hlajeni sedeži', 'Prezračevani sedeži', 'Sedeži s spominom',
        'Električno nastavljivi sedeži', 'Tretja vrsta sedežev', 'Zložljivi zadnji sedeži', 
        'Pokrov prtljažnika', 'Strešna nosilka', 'Vlečni paket', 'Stopničke', 'Stranske stopničke'
      ],
      certifications: [
        'Certificirano rabljeno', 'Garancija proizvajalca', 'Podaljšana garancija', 
        'Cestna pomoč', 'Poročilo o zgodovini vozila', 'Večtočkovni pregled',
        'Preizkušeno za emisije', 'Varnostno pregledano', 'Certificirano s strani prodajalca', 'Certificirano s strani tretje strani',
        'Carfax preverjeno', 'AutoCheck preverjeno', 'Brez nesreč', 'En lastnik',
        'Na voljo servisni zapisi', 'Vzdrževanje ažurno'
      ]
    },
    
    // Missing keys from AdvancedSearch component
    description: 'Uporabite naše obsežne iskalniške filtre za odkrivanje točnega vozila, ki ga iščete',
    searchingRealTime: 'Iskanje v realnem času...',
    searchControls: 'Kontrole iskanja',
    refineSearchCriteria: 'Izpopolnite svoje kriterije iskanja',
    searching: 'Iščem...',
    clearAllFilters: 'Počisti vse filtre',
    activeFilters: 'Aktivni filtri',
    realTimeSearch: 'Rezultati iskanja v realnem času',
    carsFound: 'Najdeni avtomobili',
    hasMore: 'Na voljo več',
    allShown: 'Vsi prikazani',
    equipment: 'Oprema',
    countries: 'Države',
    colors: 'Barve',
    emissions: 'Emisije',
  },

  // Contact Us Page
  contact: {
    hero: {
      title: 'Kontaktirajte nas',
      subtitle: 'Stopite v stik z našo ekipo. Tukaj smo, da vam pomagamo najti vaš popoln avtomobil ali odgovorimo na vsa vaša vprašanja.',
    },
    departments: {
      phoneSupport: 'Telefonska podpora',
      emailAddresses: 'E-poštni naslovi',
      businessHours: 'Delovni čas',
      mainOffice: 'Glavna pisarna',
    },
    departmentTypes: {
      salesDepartment: 'Oddelek za prodajo',
      customerService: 'Služba za stranke',
      financingDepartment: 'Oddelek za financiranje',
      generalInquiries: 'Splošne poizvedbe',
      salesQuestions: 'Vprašanja o prodaji',
      support: 'Podpora',
    },
    hours: {
      mondayFriday: 'Ponedeljek - petek',
      saturday: 'Sobota',
      sunday: 'Nedelja',
      timeRange: {
        mondayFriday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    office: {
      address: {
        street: 'Avtomobilska plaza 123',
        city: 'Ljubljana 1000',
        country: 'Slovenija',
      },
      getDirections: 'Pridobite navodila',
    },
    form: {
      title: 'Pošljite nam sporočilo',
      subtitle: 'Izpolnite spodnji obrazec in odgovorili vam bomo v 24 urah.',
      inquiryType: {
        label: 'S čim vam lahko pomagamo?',
        placeholder: 'Izberite vrsto poizvedbe',
        options: {
          buying: 'Nakup avtomobila',
          selling: 'Prodaja avtomobila',
          financing: 'Vprašanja o financiranju',
          dealer: 'Partnerstvo s trgovci',
          support: 'Tehnična podpora',
          other: 'Drugo',
        },
      },
      fields: {
        fullName: 'Polno ime',
        email: 'E-poštni naslov',
        phone: 'Telefonska številka',
        subject: 'Zadeva',
        message: 'Sporočilo',
      },
      placeholders: {
        name: 'Vaše polno ime',
        email: 'vasa.posta@primer.si',
        phone: '+386 31 123 456',
        subject: 'Kratka vrstica zadeve',
        message: 'Prosimo, navedite podrobnosti o vaši poizvedbi...',
      },
      required: '*',
      submitButton: 'Pošlji sporočilo',
      disclaimer: 'S pošiljanjem tega obrazca se strinjate z našimi Pogoji storitve in Pravilnikom o zasebnosti.',
    },
    success: {
      title: 'Sporočilo je bilo uspešno poslano!',
      message: 'Hvala, ker ste nas kontaktirali. Odgovorili vam bomo v 24 urah.',
    },
    quickHelp: {
      title: 'Hitra pomoč',
      subtitle: 'Iščete takojšnje odgovore? Preverite te vire.',
      options: {
        buyingGuide: {
          title: 'Vodnik za nakup',
          description: 'Naučite se, kako kupiti avtomobil',
        },
        sellingGuide: {
          title: 'Vodnik za prodajo',
          description: 'Nasveti za prodajo vašega avtomobila',
        },
        faq: {
          title: 'Pogosta vprašanja',
          description: 'Pogosto zastavljena vprašanja',
        },
        safetyTips: {
          title: 'Varnostni nasveti',
          description: 'Varen nakup in prodaja',
        },
      },
    },
  },

  dealerProfile: {
    dealerNotFound: 'Trgovec ni najden',
    dealerNotFoundMessage: 'Profil trgovca, ki ga iščete, ne obstaja.',
    viewAllDealers: 'Pokaži vse trgovce',
    browseCars: 'Prebrskaj avtomobile',
    backToDealers: 'Nazaj na trgovce',
    showroom: 'razstavni salon',
    verifiedDealer: 'Preverjen trgovec',
    milesAway: 'milj stran',
    callDealer: 'Pokliči trgovca',
    viewInventory: 'Prikaz zaloge',
    visitWebsite: 'Obiskaj spletno stran',
    overview: 'Pregled',
    inventory: 'Zaloga',
    reviews: 'Ocene',
    contact: 'Kontakt',
    about: 'O nas',
    servicesOffered: 'Ponujene storitve',
    certificationsAwards: 'Certifikati in nagrade',
    quickStats: 'Hitri statistiki',
    established: 'Ustanovljen',
    teamSize: 'Velikost ekipe',
    people: 'ljudi',
    recentSales: 'Nedavne prodaje',
    thisMonth: 'ta mesec',
    customerSatisfaction: 'Zadovoljstvo strank',
    responseTime: 'Čas odziva',
    businessHours: 'Poslovni časi',
    mondayFriday: 'Ponedeljek - Petek:',
    saturday: 'Sobota:',
    sunday: 'Nedelja:',
    currentInventory: 'Trenutna zaloga',
    hasVehiclesAvailable: 'vozil trenutno na voljo',
    viewFullInventory: 'Prikaži celotno zalogo',
    browseAllVehicles: 'Prebrskaj vsa razpoložljiva vozila od',
    browseCarsCount: 'avtomobilov',
    customerReviews: 'Ocene strank',
    verifiedCustomerReviews: 'preverjene ocene strank',
    verifiedPurchase: 'Preverjen nakup',
    contactInformation: 'Kontaktni podatki',
    primaryPhone: 'Glavni telefon',
    emailAddress: 'E-naslov',
    website: 'Spletna stran',
    physicalAddress: 'Fizičen naslov',
    getDirections: 'Pridobi navodila',
    interactiveMapPlaceholder: 'Interaktivni zemljevid bi bil tukaj',
    openInGoogleMaps: 'Odpri v Google Maps',
  },

  dealerSupport: {
    backToHome: 'Nazaj domov',
    title: 'Podpora trgovcem',
    subtitle: 'Namenjena podpora registriranim trgovcem. Poiščite pomoč pri svojih oglasih, upravljanju računa in funkcijah platforme.',
    supportCenter: 'Center za podporo trgovcem',
    supportCenterDescription: 'Celovita podpora za naše registrirane trgovske partnerje.',
    quickActions: 'Hitre akcije',
    accountManagement: 'Upravljanje računa',
    accountManagementDesc: 'Upravljajte nastavitve in preference svojega trgovskega računa',
    manageAccount: 'Upravljaj račun',
    listingHelp: 'Pomoč pri oglasih',
    listingHelpDesc: 'Poiščite pomoč pri svojih oglasih vozil in inventarju',
    getListingHelp: 'Pridobi pomoč za oglase',
    analyticsReports: 'Analitika in poročila',
    analyticsReportsDesc: 'Oglejte si metrike uspešnosti in generirajte poročila',
    viewAnalytics: 'Ogled analitike',
    contactSupport: 'Kontaktiraj podporo',
    contactSupportDesc: 'Stopite v stik z našo podporno ekipo',
    contactUs: 'Kontaktirajte nas',
    supportChannels: 'Kanali podpore',
    supportChannelsDesc: 'Več načinov za pridobitev pomoči, ko jo potrebujete',
    phone: 'Telefon',
    phoneNumber: '1-800-555-0199',
    email: 'E-pošta',
    emailAddress: 'dealers@carmarket365.com',
    liveChat: 'Klepet v živo',
    startChat: 'Začni klepet',
    businessHours: 'Poslovni čas',
    mondayFriday: 'Ponedeljek - Petek: 8:00 - 20:00 EST',
    weekendHours: 'Sobota: 9:00 - 17:00 EST',
    phoneHours: 'Telefonska podpora na voljo med poslovnim časom',
    emailHours: 'E-poštna podpora: 24/7 odgovor v 4 urah',
    chatHours: 'Klepet v živo na voljo med poslovnim časom',
    commonTopics: 'Pogoste teme',
    commonTopicsDesc: 'Pogosto zahtevane teme podpore',
    gettingStarted: 'Začetek',
    gettingStartedDesc: 'Uvajanje novih trgovcev in nastavitev računa',
    listingOptimization: 'Optimizacija oglasov',
    listingOptimizationDesc: 'Nasveti za izboljšanje vidnosti vaših oglasov',
    paymentBilling: 'Plačilo in obračunavanje',
    paymentBillingDesc: 'Vprašanja o obračunavanju in težave s plačili',
  },

  admin: {
    panel: 'Skrbniški panel',
    dashboard: 'Skrbniška nadzorna plošča',
  },

  // Zasebna nadzorna plošča
  privateDashboard: {
    title: 'Moja nadzorna plošča',
    subtitle: 'Upravljajte svoje oglase vozil in račun',
    welcome: 'Dobrodošli nazaj',
    savedCars: 'Shranjena vozila',
    lastSearch: 'Zadnje iskanje',
    search: 'Išči',
    yourListings: 'Vaši oglasi',
    expressSale: 'Hitra prodaja',
    express: 'Ekspres',
    contact: 'Kontakt',
    settings: 'Nastavitve',
    saved: 'Shranjeno',
    viewDetails: 'Poglej podrobnosti',
    remove: 'Odstrani',
    startNewSearch: 'Začni novo iskanje',
    viewMyListings: 'Poglej moje oglase',
    savedOn: 'Shranjeno dne',
    welcomeBack: 'Dobrodošli nazaj',
    manageExperience: 'upravljajte svojo izkušnjo na trgu avtomobilov',
    // Last Search Tab
    lastSearches: 'Zadnja iskanja',
    recentSearchHistory: 'Vaša nedavna zgodovina iskanj in shranjena iskanja',
    newSearch: 'Novo iskanje',
    resultsFound: 'rezultatov najdenih',
    searchedOn: 'Iskano dne',
    searchAgain: 'Išči znova',
    viewResults: 'Poglej rezultate',
    results: 'Rezultati',
    // User Listings Tab
    myListings: 'Moji oglasi',
    carsListedForSale: 'Vozila, ki jih imate na voljo za prodajo',
    createNewListing: 'Ustvari nov oglas',
    newListing: 'Nov oglas',
    views: 'ogledi',
    inquiries: 'povpraševanja',
    listed: 'Oglaševan',
    edit: 'Uredi',
    view: 'Poglej',
    delete: 'Briši',
    // Express Sale Tab
    expressSaleListings: 'Express Sale Listings',
    quickSaleRequests: 'Zahteve za hitro prodajo poslane trgovcem',
    newExpressSale: 'New Express Sale',
    newExpress: 'Nov ekspres',
    underReview: 'V pregledu',
    photos: 'fotografije',
    estimatedValue: 'Ocenjena vrednost:',
    submittedOn: 'Poslano dne',
    // Contact Details Tab
    contactDetails: 'Kontaktni podatki',
    manageContactInfo: 'Upravljajte svoje kontaktne podatke in profil',
    personalInformation: 'Osebni podatki',
    updateProfileDetails: 'Posodobite podrobnosti profila',
    changePhoto: 'Spremeni fotografijo',
    firstName: 'Ime',
    lastName: 'Priimek',
    emailAddress: 'E-naslov',
    phoneNumber: 'Telefonska številka',
    city: 'Mesto',
    country: 'Država',
    saveChanges: 'Shrani spremembe',
    // Account Settings Tab
    accountSettings: 'Nastavitve računa',
    manageAccountPreferences: 'Upravljajte svoje preference računa in nastavitve zasebnosti',
    notifications: 'Obvestila',
    configureNotifications: 'Konfigurirajte, kako prejemati obvestila',
    emailNotifications: 'E-obvestila',
    receiveUpdatesViaEmail: 'Prejemajte posodobitve po e-pošti',
    newListingsAlerts: 'Opozorila za nove oglase',
    notifyNewCarsMatching: 'Prejemajte obvestila o novih avtomobilih, ki se ujemajo z vašimi iskanji',
    priceDropAlerts: 'Opozorila za znižanje cen',
    notifyPriceDrops: 'Prejemajte obvestila, ko shranjeni avtomobili znižajo ceno',
    inquiryNotifications: 'Obvestila o povpraševanjih',
    notifyInquiries: 'Prejemajte obvestila o povpraševanjih za vaše oglase',
    privacySettings: 'Nastavitve zasebnosti',
    controlPrivacyPreferences: 'Nadzorujte svoje preference zasebnosti in deljenja podatkov',
    profileVisibility: 'Vidnost profila',
    makeProfileVisible: 'Naredite svoj profil viden drugim uporabnikom',
    showContactInfo: 'Prikaži kontaktne podatke',
    displayContactOnListings: 'Prikaži svoje kontaktne podatke v oglasih',
    dataAnalytics: 'Analitika podatkov',
    helpImproveService: 'Pomagajte izboljšati našo storitev z analitiko uporabe',
    accountManagement: 'Upravljanje računa',
    manageAccountAndData: 'Upravljajte svoj račun in podatke',
    downloadMyData: 'Prenesi moje podatke',
    changePassword: 'Spremeni geslo',
    deleteAccount: 'Izbriši račun',
    // Success/Error Messages
    profileUpdatedSuccessfully: 'Profil je bil uspešno posodobljen!',
    carRemovedFromSaved: 'Avtomobil je bil odstranjen iz shranjenih!',
    listingDeletedSuccessfully: 'Oglas je bil uspešno izbrisan!'
  },

  // Shranjena vozila
  savedCars: {
    title: 'Shranjena vozila',
    subtitle: 'Upravljajte svoja priljubljena vozila in seznam želja',
    filterBySavedDate: 'Filtriraj po datumu shranjevanja',
    filterByPriceRange: 'Filtriraj po cenovnem razponu',
    sortBy: 'Razvrsti po',
    newest: 'Najnovejša',
    oldest: 'Najstarejša',
    priceLowToHigh: 'Cena: Od nizke do visoke',
    priceHighToLow: 'Cena: Od visoke do nizke',
    noSavedCars: 'Nimate shranjenih vozil',
    startBrowsing: 'Začnite brskati po vozilih, da shranite svoja priljubljena',
    browseVehicles: 'Brskaj po vozilih',
    savedOn: 'Shranjeno dne',
    removeFromSaved: 'Odstrani iz shranjenih',
    viewDetails: 'Poglej podrobnosti',
    contactDealer: 'Kontakt',
    scheduleViewing: 'Naroči ogled',
    compareVehicles: 'Primerjaj vozila',
    selectToCompare: 'Izberite vozila za primerjavo',
    compare: 'Primerjaj',
    clearSelection: 'Počisti izbor',
    clearAll: 'Počisti vse'
  },

  // Prodaj vozilo
  sellVehicle: {
    title: 'Prodaj svoje vozilo',
    subtitle: 'Ustvari podroben oglas za svoje vozilo',
    stepIndicator: 'Korak {current} od {total}',
    basicInfo: 'Osnovni podatki',
    vehicleDetails: 'Podrobnosti vozila',
    photosUpload: 'Nalaganje fotografij',
    pricing: 'Določanje cene',
    review: 'Pregled in objava',
    
    // Osnovni podatki
    make: 'Znamka',
    model: 'Model',
    year: 'Leto',
    mileage: 'Kilometraža',
    km: 'km',
    condition: 'Stanje',
    conditionOptions: {
      excellent: 'Odlično',
      good: 'Dobro',
      fair: 'Zadovoljivo',
      poor: 'Slabo'
    },
    fuelType: 'Vrsta goriva',
    fuelTypes: {
      gasoline: 'Bencin',
      diesel: 'Dizel',
      electric: 'Električno',
      hybrid: 'Hibridno'
    },
    transmission: 'Menjalnik',
    transmissionTypes: {
      manual: 'Ročni',
      automatic: 'Avtomatski',
      semiautomatic: 'Polavtomatski'
    },
    bodyType: 'Tip karoserije',
    
    // Podrobnosti vozila
    engineSize: 'Prostornina motorja',
    horsepower: 'Konjska moč',
    color: 'Barva',
    numberOfDoors: 'Število vrat',
    numberOfSeats: 'Število sedežev',
    features: 'Značilnosti',
    safetyFeatures: 'Varnostne značilnosti',
    description: 'Opis',
    descriptionPlaceholder: 'Opišite svoje vozilo, njegovo zgodovino, stanje...',
    
    // Fotografije
    uploadPhotos: 'Naloži fotografije',
    dragDropPhotos: 'Povlecite in spustite fotografije sem ali kliknite za izbiro',
    maxPhotos: 'Največ 20 fotografij',
    photoRequirements: 'Zahteve za fotografije',
    requirementsList: [
      'Visoka kakovost (minimum 800x600 pikslov)',
      'Format JPG, PNG ali WebP',
      'Največ 5MB na fotografijo',
      'Fotografije z vseh strani vozila',
      'Fotografije notranjosti',
      'Fotografije motorja in števca kilometrov'
    ],
    
    // Določanje cene
    askingPrice: 'Zahtevana cena',
    marketValue: 'Tržna vrednost',
    priceAnalysis: 'Analiza cene',
    competitive: 'Konkurenčna',
    aboveMarket: 'Nad trgom',
    belowMarket: 'Pod trgom',
    negotiable: 'Dogovorljiva',
    contactPreferences: 'Preference kontakta',
    allowPhoneCalls: 'Dovoli telefonske klice',
    allowMessages: 'Dovoli sporočila',
    allowEmails: 'Dovoli e-pošto',
    
    // Pregled
    reviewListing: 'Preglej oglas',
    publishListing: 'Objavi oglas',
    saveDraft: 'Shrani osnutek',
    termsAndConditions: 'Pogoji uporabe',
    agreeToTerms: 'Strinjam se s pogoji uporabe',
    
    // Sporočila
    listingPublished: 'Oglas je bil uspešno objavljen!',
    draftSaved: 'Osnutek je shranjen',
    errorSaving: 'Napaka pri shranjevanju',
    continue: 'Nadaljuj',
    previous: 'Prejšnji',
    next: 'Naslednji'
  },

  // Glavna stran
  indexPage: {
    hero: {
      title: 'Poiščite svoje popolno vozilo',
      subtitle: 'Brskajte po tisočih preverjenih vozil od zanesljivih prodajalcev in zasebnikov',
      searchPlaceholder: 'Išči po znamki, modelu ali lokaciji...',
      search: 'Išči',
      advancedSearch: 'Napredno iskanje'
    },
    quickFilters: {
      title: 'Hitri filtri',
      allVehicles: 'Vsa vozila',
      cars: 'Avtomobili',
      trucks: 'Tovornjaki',
      motorcycles: 'Motorna kolesa',
      electric: 'Električna',
      luxury: 'Luksuzna'
    },
    stats: {
      title: 'Zakaj CarMarket365?',
      vehiclesAvailable: 'Razpoložljiva vozila',
      verifiedDealers: 'Preverjeni prodajalci',
      happyCustomers: 'Zadovoljni kupci',
      yearsExperience: 'Let izkušenj'
    },
    featuredListings: {
      title: 'Predstavljeni oglasi',
      subtitle: 'Izbrana vozila naših partnerjev',
      viewAll: 'Poglej vse'
    },
    howItWorks: {
      title: 'Kako deluje',
      subtitle: 'Poiščite svoje idealno vozilo v treh preprostih korakih',
      steps: [
        {
          title: 'Poiščite vozila',
          description: 'Brskajte po naši obsežni bazi preverjenih vozil'
        },
        {
          title: 'Primerjajte možnosti',
          description: 'Primerjajte cene, značilnosti in ocene'
        },
        {
          title: 'Kupite z zaupanjem',
          description: 'Kupujte od zanesljivih prodajalcev z garancijami'
        }
      ]
    },
    popularBrands: {
      title: 'Priljubljene znamke',
      subtitle: 'Raziščite vozila vodilnih avtomobilskih proizvajalcev'
    },
    testimonials: {
      title: 'Kaj pravijo naši stranke',
      subtitle: 'Preberite resnične izkušnje naših zadovoljnih kupcev'
    },
    newsletter: {
      title: 'Ostanite obveščeni',
      subtitle: 'Prejemajte najnovejše oglase in ekskluzivne ponudbe neposredno v svoj e-poštni predal',
      emailPlaceholder: 'Vnesite svoj e-naslov',
      subscribe: 'Naroči se'
    },
    cta: {
      buyer: {
        title: 'Pripravljeni na nakup?',
        subtitle: 'Poiščite svoje popolno vozilo danes',
        button: 'Brskaj po vozilih'
      },
      seller: {
        title: 'Želite prodati?',
        subtitle: 'Postavite svoje vozilo na prodajo v minutah',
        button: 'Prodaj vozilo'
      }
    }
  },

  // Strani z napakami
  errors: {
    notFound: {
      title: '404',
      heading: 'Stran ni bila najdena',
      message: 'Stran, ki jo iščete, ne obstaja ali je bila premaknjena.',
      goHome: 'Pojdi na domačo stran',
      goBack: 'Pojdi nazaj',
      supportMessage: 'Če menite, da gre za napako, se obrnite na našo podporno skupino.'
    }
  },

  // Pravne strani
  legal: {
    accessibility: {
      title: 'Dostopnost',
      subtitle: 'Naša zaveza, da bo CarMarket365 dostopen vsem.',
      backToHome: 'Nazaj na domačo stran',
      commitmentTitle: 'Naša zaveza dostopnosti',
      commitmentDescription: 'CarMarket365 se zavezuje k zagotavljanju vključujoče izkušnje.',
      commitmentText: 'Verjamemo, da bi morali imeti vsi enak dostop do naše platforme, ne glede na svoje sposobnosti.',
      
      visual: {
        title: 'Vizualna podpora',
        features: [
          'Visok kontrast za boljšo berljivost',
          'Nastavljiva velikost besedila',
          'Jasna in strukturirana navigacija',
          'Alternativni opisi slik'
        ]
      },
      motor: {
        title: 'Motorna podpora',
        features: [
          'Popolna navigacija s tipkovnico',
          'Večja območja za klik',
          'Dovolj časa za dejanja',
          'Preprosti in jasni kontrolniki'
        ]
      },
      audio: {
        title: 'Zvočna podpora',
        features: [
          'Prepisi za zvočno vsebino',
          'Podnapisi za videe',
          'Besedilne alternative za zvoke',
          'Kompatibilnost z bralniki zaslona'
        ]
      },
      cognitive: {
        title: 'Kognitivna podpora',
        features: [
          'Preprost in jasen jezik',
          'Navodila korak za korakom',
          'Koristna sporočila o napakah',
          'Logična organizacija vsebine'
        ]
      },
      
      standardsTitle: 'Standardi dostopnosti',
      standardsDescription: 'Naša platforma je zgrajena v skladu z mednarodnimi standardi.',
      wcagTitle: 'Skladnost WCAG 2.1',
      wcagDescription: 'Stremimo k skladnosti s smernicami WCAG 2.1 AA za spletno dostopnost.',
      compatibilityTitle: 'Kompatibilnost s pomožnimi tehnologijami',
      compatibilityDescription: 'Naša platforma je testirana z bralniki zaslona in drugimi pomožnimi tehnologijami.',
      
      feedbackTitle: 'Povratne informacije o dostopnosti?',
      feedbackText: 'Če naletite na težave z dostopnostjo ali imate predloge za izboljšave, nas kontaktirajte na accessibility@carmarket365.com',
      returnToPlatform: 'Nazaj na platformo',
      contactTeam: 'Kontaktiraj ekipo'
    },

    cookies: {
      title: 'Pravilnik o piškotkih',
      subtitle: 'Kako uporabljamo piškotke za izboljšanje vaše izkušnje.',
      backToHome: 'Nazaj na domačo stran',
      policyTitle: 'Naš pravilnik o piškotkih',
      policyDescription: 'Uporabljamo piškotke za zagotavljanje najboljše možne storitve.',
      policyText: 'Piškotki so majhne besedilne datoteke, shranjene v vaši napravi ob obisku naše strani. Pomagajo nam zagotoviti personalizirano izkušnjo.',
      
      essential: {
        title: 'Bistveni piškotki',
        features: [
          'Podpora uporabniške seje',
          'Shranjevanje varnostnih nastavitev',
          'Osnovna funkcionalnost platforme',
          'Implementacija nastavitev zasebnosti'
        ]
      },
      functional: {
        title: 'Funkcionalni piškotki',
        features: [
          'Zapomni si vaše nastavitve',
          'Shranjevanje jezikovnih nastavitev',
          'Personalizacija prikaza',
          'Shranjevanje nedavnih iskanj'
        ]
      },
      analytics: {
        title: 'Analitični piškotki',
        features: [
          'Razumevanje uporabe strani',
          'Izboljšanje učinkovitosti',
          'Identifikacija tehničnih težav',
          'Optimizacija vsebine'
        ]
      },
      marketing: {
        title: 'Trženjski piškotki',
        features: [
          'Relevantni oglasi',
          'Merjenje učinkovitosti oglasov',
          'Personalizacija vsebine',
          'Sledenje konverzijam'
        ]
      },
      
      managementTitle: 'Upravljanje nastavitev piškotkov',
      managementDescription: 'Imate popoln nadzor nad piškotki, ki jih uporabljamo v vaši napravi.',
      
      browserTitle: 'Nastavitve brskalnika',
      browserFeatures: [
        'Blokiraj ali dovoli piškotke',
        'Izbriši obstoječe piškotke',
        'Nastavi potečnost piškotkov',
        'Upravljaj piškotke tretjih oseb'
      ],
      
      platformTitle: 'Kontrole platforme',
      platformFeatures: [
        'Center nastavitev piškotkov',
        'Možnosti odjave',
        'Podrobne nastavitve kontrole',
        'Redne posodobitve nastavitev'
      ],
      
      questionsTitle: 'Vprašanja o piškotkih?',
      questionsText: 'Če imate vprašanja o našem pravilniku o piškotkih ali potrebujete pomoč pri upravljanju nastavitev, nas kontaktirajte na cookies@carmarket365.com',
      returnToPlatform: 'Nazaj na platformo',
      cookieSupport: 'Podpora za piškotke'
    },

    imprint: {
      title: 'Impressum',
      subtitle: 'Pravne informacije in podrobnosti o podjetju, kot jih zahteva zakon.',
      backToHome: 'Nazaj na domačo stran',
      legalInfoTitle: 'Pravne informacije (Impressum)',
      legalInfoDescription: 'Informacije o podjetju in pravne podrobnosti, kot jih zahteva zakon.',
      legalInfoText: 'Ta stran vsebuje zakonsko zahtevane informacije o CarMarket365, kot jih nalagajo veljavni zakoni in predpisi. Vse podane informacije so trenutne in točne.',
      
      companyDetails: {
        title: 'Podrobnosti podjetja',
        companyName: 'Ime podjetja',
        companyNameValue: 'CarMarket365 GmbH',
        registrationNumber: 'Registrska številka',
        registrationNumberValue: 'HRB 123456 B',
        vatId: 'ID za DDV',
        vatIdValue: 'DE123456789',
        commercialRegister: 'Trgovski register',
        commercialRegisterValue: 'Amtsgericht Berlin'
      },
      
      businessAddress: {
        title: 'Poslovni naslov',
        registeredAddress: 'Registriran naslov',
        street: 'Unter den Linden 1',
        city: '10117 Berlin',
        country: 'Nemčija'
      },
      
      management: {
        title: 'Vodstvo',
        managingDirector: 'Izvršni direktor',
        managingDirectorValue: 'Max Mustermann',
        authorizedRepresentative: 'Pooblaščeni zastopnik',
        authorizedRepresentativeValue: 'Anna Schmidt'
      },
      
      contactInfo: {
        title: 'Kontaktne informacije',
        phone: 'Telefon',
        phoneValue: '+49 (0) 30 12345678',
        email: 'E-pošta',
        emailValue: 'info@carmarket365.com',
        businessHours: 'Poslovni čas',
        businessHoursValue: 'Pon-Pet: 9:00 - 18:00 CET'
      },
      
      legalNotice: {
        title: 'Pravno obvestilo',
        paragraph1: 'CarMarket365 se zavezuje k zagotavljanju točnih in posodobljenih informacij. Vendar ne moremo zagotoviti popolnosti ali točnosti vse vsebine.',
        paragraph2: 'Ta platforma služi kot tržnica, ki povezuje kupce in prodajalce vozil. CarMarket365 ni odgovoren za točnost oglasov ali vedenje uporabnikov.',
        paragraph3: 'Za spore ali pritožbe nas prosimo kontaktirajte z uporabo zgoraj navedenih informacij. Trudimo se rešiti vse zadeve pravočasno in pošteno.'
      },
      
      questionsTitle: 'Pravna vprašanja?',
      questionsText: 'Za pravna vprašanja ali prijavo pomislekov se obrnite na našo pravno službo na legal@carmarket365.com',
      returnToPlatform: 'Nazaj na platformo',
      contactLegal: 'Kontaktiraj pravno ekipo'
    }
  },

  // Dealer Dashboard
  dealerDashboard: {
    title: 'Prodajalski nadzor',
    subtitle: 'Upravljajte svoje oglase vozil, spremljajte uspešnost in razvijajte svojo dejavnost',
    
    // Tab navigation
    tabs: {
      overview: 'Pregled',
      myListings: 'Moji oglasi',
      expressListings: 'Ekspresni oglasi',
      inquiries: 'Povpraševanja',
      analytics: 'Analitika',
    },
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        activeListings: {
          title: 'Aktivni oglasi',
          description: '+2 od prejšnji mesec',
          fromLastMonth: 'od prejšnji mesec',
        },
        totalViews: {
          title: 'Skupaj ogledov',
          description: '+15% od prejšnji mesec',
          fromLastMonth: 'od prejšnji mesec',
        },
        inquiries: {
          title: 'Povpraševanja',
          description: '+7 od včeraj',
          fromYesterday: 'od včeraj',
        },
        revenue: {
          title: 'Prihodki',
          description: '+12% od prejšnji mesec',
          fromLastMonth: 'od prejšnji mesec',
        },
      },
      
      // Performance section
      performance: {
        title: 'Mesečna uspešnost',
        description: 'Prodana vozila na mesec letos',
        monthlyData: {
          january: 'Januar',
          december: 'December',
          november: 'November',
          sold: 'prodano',
        },
      },
      
      // Recent inquiries
      recentInquiries: {
        title: 'Nedavna povpraševanja',
        description: 'Najnovejša povpraševanja strank',
        inquiryTypes: {
          viewing: 'ogled',
          price: 'cena',
          financing: 'financiranje',
        },
        timeAgo: {
          hoursAgo: 'h nazaj',
        },
      },
      
      // Action buttons
      actions: {
        addNewListing: 'Dodaj nov oglas',
        viewAnalytics: 'Poglej analitiko',
      },
    },
    
    // My Listings tab
    myListings: {
      title: 'Moji oglasi',
      
      // Search and filters
      searchPlaceholder: 'Išči oglase...',
      filterByStatus: 'Filtriraj po statusu',
      statusOptions: {
        allStatus: 'Vsi statusi',
        active: 'Aktivni',
        sold: 'Prodani',
        pending: 'V obravnavi',
      },
      exportReport: 'Izvozi poročilo',
      export: 'Izvozi',
      
      // Table headers
      tableHeaders: {
        car: 'Vozilo',
        price: 'Cena',
        status: 'Status',
        views: 'Ogledi',
        inquiries: 'Povpraševanja',
        listed: 'Objavljeno',
        actions: 'Dejanja',
      },
      
      // Status badges
      statusBadges: {
        active: 'Aktivni',
        sold: 'Prodani',
        pending: 'V obravnavi',
      },
      
      // Actions
      actions: {
        viewListing: 'Poglej oglas',
        editListing: 'Uredi oglas',
        deleteListing: 'Izbriši oglas',
      },
      
      // Mobile view
      mobileView: {
        views: 'ogledov',
        inquiries: 'povpraševanj',
      },
    },
    
    // Inquiries tab
    inquiries: {
      title: 'Povpraševanja strank',
      description: 'Upravljajte in odgovarjajte na povpraševanja strank',
      
      // Inquiry types
      inquiryTypes: {
        testDriveRequest: 'Zahteva za testno vožnjo',
        priceInquiry: 'Povpraševanje o ceni',
      },
      
      // Status
      status: {
        new: 'novo',
        responded: 'odgovorjeno',
      },
      
      // Actions
      actions: {
        respond: 'Odgovori',
      },
      
      // Time indicators
      time: {
        hoursAgo: 'ur nazaj',
        dayAgo: 'dan nazaj',
      },
    },
    
    // Analytics tab
    analytics: {
      // Popular listings
      popularListings: {
        title: 'Priljubljeni oglasi',
        description: 'Najbolj oglédani oglasi ta mesec',
        views: 'ogledov',
        inquiries: 'povpraševanj',
      },
      
      // Performance metrics
      performanceMetrics: {
        title: 'Kazalniki uspešnosti',
        description: 'Ključni kazalniki uspešnosti',
        metrics: {
          averageTimeToSell: 'Povprečen čas prodaje',
          conversionRate: 'Stopnja pretvorbe',
          averageListingViews: 'Povprečno ogledov oglasa',
          responseTime: 'Odzivni čas',
        },
        values: {
          days: 'dni',
          hours: 'ur',
        },
      },
    },
    
    // Footer
    activeListingsCount: 'aktivnih oglasov',
  },

  // Admin Dashboard
  adminDashboard: {
    title: 'Administrativni nadzor',
    subtitle: 'Upravljanje platforme, nadzor in celovit nadzorni center',
    
    // Tab navigation
    tabs: {
      overview: 'Pregled',
      allListings: 'Vsi oglasi',
      userManagement: 'Upravljanje uporabnikov',
      reports: 'Poročila',
    },
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        totalUsers: {
          title: 'Skupaj uporabnikov',
          description: '+15% od prejšnji mesec',
          fromLastMonth: 'od prejšnji mesec',
        },
        activeDealers: {
          title: 'Aktivni prodajalci',
          description: '+8 novih ta mesec',
          newThisMonth: 'novih ta mesec',
        },
        totalListings: {
          title: 'Skupaj oglasov',
          description: '+23 danes',
          today: 'danes',
        },
        platformRevenue: {
          title: 'Prihodki platforme',
          description: '+12% od prejšnji mesec',
          fromLastMonth: 'od prejšnji mesec',
        },
      },
      
      // Recent activity
      recentActivity: {
        title: 'Nedavna aktivnost',
        description: 'Najnovejše aktivnosti platforme',
        activities: {
          newDealerRegistration: 'Nova registracija prodajalca',
          listingFlaggedForReview: 'Oglas označen za pregled',
          userAccountSuspended: 'Uporabniški račun suspendiran',
        },
        timeAgo: {
          minutesAgo: 'min nazaj',
          hoursAgo: 'h nazaj',
        },
      },
      
      // System health
      systemHealth: {
        title: 'Zdravje sistema',
        description: 'Nadzor sistemskih metrik',
        metrics: {
          serverUptime: 'Čas delovanja strežnika',
          responseTime: 'Odzivni čas',
          errorRate: 'Stopnja napak',
        },
        values: {
          days: 'dni',
          milliseconds: 'ms',
          percentage: '%',
        },
      },
      
      // Action buttons
      actions: {
        manageUsers: 'Upravljaj uporabnike',
        reviewListings: 'Preglej oglase',
        systemSettings: 'Sistemske nastavitve',
      },
    },
    
    // All Listings tab
    allListings: {
      title: 'Vsi oglasi',
      
      // Search and filters
      searchPlaceholder: 'Išči oglase...',
      filterByStatus: 'Filtriraj po statusu',
      statusOptions: {
        allStatus: 'Vsi statusi',
        active: 'Aktivni',
        sold: 'Prodani',
        pending: 'V obravnavi',
        flagged: 'Označeni',
      },
      
      // Table headers
      tableHeaders: {
        car: 'Vozilo',
        dealer: 'Prodajalec',
        price: 'Cena',
        status: 'Status',
        views: 'Ogledi',
        listed: 'Objavljeno',
        actions: 'Dejanja',
      },
      
      // Status badges
      statusBadges: {
        active: 'Aktivni',
        sold: 'Prodani',
        pending: 'V obravnavi',
        flagged: 'Označeni',
      },
      
      // Actions
      actions: {
        viewListing: 'Poglej oglas',
        editListing: 'Uredi oglas',
        suspendListing: 'Suspendiraj oglas',
        deleteListing: 'Izbriši oglas',
      },
    },
    
    // User Management tab
    userManagement: {
      title: 'Upravljanje uporabnikov',
      
      // Search and filters
      searchPlaceholder: 'Išči uporabnike...',
      filterByRole: 'Filtriraj po vlogi',
      roleOptions: {
        allRoles: 'Vse vloge',
        user: 'Uporabnik',
        dealer: 'Prodajalec',
        admin: 'Administrator',
      },
      
      // Table headers
      tableHeaders: {
        user: 'Uporabnik',
        email: 'E-pošta',
        role: 'Vloga',
        status: 'Status',
        joined: 'Pridružen',
        actions: 'Dejanja',
      },
      
      // Role badges
      roleBadges: {
        user: 'Uporabnik',
        dealer: 'Prodajalec',
        admin: 'Administrator',
      },
      
      // Status badges
      statusBadges: {
        active: 'Aktivni',
        suspended: 'Suspendiran',
        pending: 'V obravnavi',
      },
      
      // Dodatna sporočila statusa
      statusMessages: {
        joinedOn: 'Pridružil se',
        lastLoginOn: 'Zadnja prijava',
        neverLoggedIn: 'Nikoli se ni prijavil',
      },
      
      // Actions
      actions: {
        viewProfile: 'Poglej profil',
        editUser: 'Uredi uporabnika',
        suspendUser: 'Suspendiraj uporabnika',
        activateUser: 'Aktiviraj uporabnika',
      },
    },
    
    // Reports tab
    reports: {
      // Platform statistics
      platformStats: {
        title: 'Statistike platforme',
        description: 'Ključne metrike platforme',
        metrics: {
          totalRegistrations: 'Skupaj registracij',
          averageListingTime: 'Povprečen čas oglasa',
          successfulTransactions: 'Uspešne transakcije',
          customerSatisfaction: 'Zadovoljstvo strank',
        },
        values: {
          users: 'uporabnikov',
          days: 'dni',
          transactions: 'transakcij',
          rating: 'ocena',
        },
      },
      
      // Content moderation
      contentModeration: {
        title: 'Moderiranje vsebine',
        description: 'Pregled in moderiranje vsebine',
        items: {
          pendingReviews: 'Čakajoči pregledi',
          flaggedContent: 'Označena vsebina',
          reportedUsers: 'Prijavljeni uporabniki',
          resolvedIssues: 'Rešene zadeve',
        },
      },
    },
    
    // Footer
    systemStatus: 'status sistema',
  },

  // Test države
  countryTest: {
    title: 'Test ločevanja po državah',
    subtitle: 'Testirajte, kako so oglasi avtomobilov filtrirani po državi/poddomeni',
    currentCountryConfiguration: 'Trenutna konfiguracija države',
    currentCountryDescription: 'To prikazuje trenutno zaznano državo in njene nastavitve',
    detectedCountry: 'Zaznana država',
    domain: 'Domena',
    languages: 'Jeziki',
    developmentMode: 'Razvojni način',
    enabled: 'Omogočeno',
    disabled: 'Onemogočeno',
    developmentCountrySwitcher: 'Razvojni preklopnik držav',
    switcherDescription: 'Preklopite med državami za testiranje funkcionalnosti ločevanja',
    selectTestCountry: 'Izberite testno državo',
    chooseCountryToTest: 'Izberite državo za testiranje',
    resetToDefault: 'Ponastavi na privzeto',
    noteTitle: 'Opomba:',
    noteText: 'V produkciji so države samodejno zaznane iz poddomene (npr. mk.carmarket365.com, al.carmarket365.com). Ta preklopnik deluje samo v razvojnem načinu.',
    carListingsFor: 'Oglasi avtomobilov za',
    carListingsDescription: 'se naj bi prikazali spodaj',
    loadingCars: 'Nalaganje avtomobilov...',
    foundCars: 'Najdenih {count} avtomobil(ov) v {country}',
    countryFilteredResults: 'Rezultati filtrirani po državi',
    noCarsFound: 'Ni najdenih avtomobilov',
    noCarsFoundDescription: 'Trenutno ni objavljenih avtomobilov v {country}.',
    tryDifferentCountry: 'Poskusite preklopiti na drugo državo z uporabo preklopnika zgoraj.',
    howItWorks: 'Kako deluje',
    automaticCountryDetection: 'Samodejno zaznavanje države',
    automaticDetectionDescription: 'Sistem samodejno zazna državo iz poddomene (npr. mk.carmarket365.com za Makedonijo, al.carmarket365.com za Albanijo).',
    countrySpecificListings: 'Oglasi specifični za državo',
    countrySpecificDescription: 'Oglasi avtomobilov so samodejno filtrirani, da prikazujejo samo avtomobile iz trenutne države. To zagotavlja, da uporabniki v Makedoniji vidijo samo makedonske oglase, albanski uporabniki vidijo samo albanske oglase, itd.',
    crossCountryProtection: 'Zaščita med državami',
    crossCountryDescription: 'Če nekdo poskuša dostopati do oglasa avtomobila iz druge države (preko neposredne URL povezave), bo prejel sporočilo o napaki, ki pravi, da oglas ni na voljo v njihovi regiji.',
    listingSubmission: 'Oddaja oglasa',
    listingSubmissionDescription: 'Ko uporabniki oddajajo nove oglase avtomobilov, se koda države samodejno nastavi glede na njihovo trenutno poddomena, kar zagotavlja, da so oglasi vidni samo v pravi državi.',
  },

  // Obrazci in vnosi
  forms: {
    placeholders: {
      selectMake: 'Izberi znamko',
      selectModel: 'Izberi model',
      selectYear: 'Izberi leto',
      selectCondition: 'Izberi stanje',
      selectFuelType: 'Izberi tip goriva',
      selectTransmission: 'Izberi menjalno',
      selectBodyType: 'Izberi tip karoserije',
      selectDrivetrain: 'Izberi pogon',
      enterName: 'Vnesi ime',
      enterEmail: 'Vnesi e-pošto',
      enterPassword: 'Vnesi geslo',
      enterPhone: 'Vnesi telefon',
      enterModel: 'Vnesi model',
      enterMileage: 'Vnesi kilometrino',
      enterPrice: 'Vnesi ceno',
      enterLocation: 'Vnesi lokacijo',
      enterCity: 'Vnesi mesto',
      enterDescription: 'Vnesi opis',
      searchCars: 'Išči avtomobile',
      searchListings: 'Išči oglase',
      searchFAQs: 'Išči v FAQ',
      anyMake: 'Katerkoli izdelovalec',
      anyModel: 'Katerikoli model',
      anyYear: 'Katerokoli leto',
      anyMileage: 'Katerakoli kilometrina',
      minPrice: 'Minimalna cena',
      maxPrice: 'Maksimalna cena',
      role: 'Vloga',
      sortBy: 'Razvrsti po',
      filterBy: 'Filtriraj po',
      dealerNameOrCity: 'Ime prodajalca ali mesto',
      allStates: 'Vse države',
      allSpecialties: 'Vse specialnosti',
      egFiftyThousand: 'npr. 50.000',
      successMessage: 'Vaš oglas je bil uspešno ustvarjen!',
      requiredFieldMessage: 'To polje je obvezno',
      enterMessage: 'Vnesite vaše sporočilo',
    },
    labels: {
      businessName: 'Ime podjetja',
      businessType: 'Tip podjetja',
      vatNumber: 'DDV številka',
      firstName: 'Ime',
      lastName: 'Priimek',
      email: 'E-pošta',
      password: 'Geslo',
      confirmPassword: 'Potrdi geslo',
      phoneNumber: 'Telefonska številka',
      street: 'Ulica',
      city: 'Mesto',
      state: 'Država',
      postalCode: 'Poštna številka',
      country: 'Država',
      make: 'Znamka',
      model: 'Model',
      year: 'Leto',
      mileage: 'Kilometrina',
      condition: 'Stanje',
      fuelType: 'Tip goriva',
      transmission: 'Menjalnik',
      bodyType: 'Tip karoserije',
      exteriorColor: 'Zunanja barva',
      interiorColor: 'Notranja barva',
      price: 'Cena',
      description: 'Opis',
      contactName: 'Ime kontakta',
      contactPhone: 'Telefon kontakta',
      contactEmail: 'E-pošta kontakta',
      location: 'Lokacija',
      rememberMe: 'Zapomni si me',
      termsAccepted: 'Pogoji sprejeti',
      privacyAccepted: 'Zasebnost sprejeta',
    },
    buttons: {
      submit: 'Pošlji',
      register: 'Registriraj se',
      signIn: 'Prijavi se',
      signUp: 'Registriraj se',
      signOut: 'Odjavi se',
      backToSignIn: 'Nazaj na prijavo',
      backToHome: 'Nazaj na domov',
      createAccount: 'Ustvari račun',
      forgotPassword: 'Pozabljeno geslo',
      resetPassword: 'Ponastavi geslo',
      updateProfile: 'Posodobi profil',
      uploadPhotos: 'Naloži fotografije',
      removePhoto: 'Odstrani fotografijo',
      publishListing: 'Objavi oglas',
      saveDraft: 'Shrani kot osnutek',
      previewListing: 'Predogled oglasa',
      editListing: 'Uredi oglas',
      deleteListing: 'Izbriši oglas',
      viewListing: 'Poglej oglas',
      viewDetails: 'Poglej podrobnosti',
      contactDealer: 'Kontaktiraj prodajalca',
      scheduleTestDrive: 'Rezerviraj preizkusno vožnjo',
      requestFinancing: 'Zahtevaj financiranje',
      shareVehicle: 'Deli vozilo',
      saveToFavorites: 'Shrani v priljubljene',
      removeFromFavorites: 'Odstrani iz priljubljenih',
      applyFilters: 'Uporabi filtre',
      clearFilters: 'Počisti filtre',
      clearSearch: 'Počisti iskanje',
      searchVehicles: 'Išči vozila',
      viewAllCars: 'Poglej vse avtomobile',
      loadMore: 'Naloži več',
      showMore: 'Prikaži več',
      showLess: 'Prikaži manj',
    },
    validation: {
      nameMinLength: 'Ime mora imeti vsaj 2 znaka',
      validEmail: 'Prosimo, vnesite veljaven e-poštni naslov',
      messageMinLength: 'Sporočilo mora imeti vsaj 10 znakov',
    },
  },

  // Static content for About page
  about: {
    stats: {
      carsSold: 'Prodanih Avtomobilov',
      happyCustomers: 'Zadovoljnih Strank',
      dealerPartners: 'Partnerskih Prodajalcev',
      yearsInBusiness: 'Let v Poslu',
    },
    values: {
      trustTransparency: 'Zaupanje in Preglednost',
      trustTransparencyDesc: 'Verjamemo v poštene cene, jasno komunikacijo in gradnjo dolgotrajnih odnosov z našimi strankami.',
      customerFirst: 'Stranka na Prvem Mestu',
      customerFirstDesc: 'Vsaka odločitev, ki jo sprejmemo, je usmerjena k zagotavljanju najboljše možne izkušnje za naše stranke.',
      qualityAssurance: 'Zagotavljanje Kakovosti',
      qualityAssuranceDesc: 'Temeljito pregledamo in preverimo vsako vozilo, da zagotovimo kakovost in zanesljivost.',
      innovation: 'Inovacije',
      innovationDesc: 'Svojo platformo nenehno izboljšujemo z najnovejšo tehnologijo, da vam lažje postrežemo.',
    },
    staticContent: {
      team: [
        {
          name: 'Matej Novak',
          role: 'Izvršni direktor in ustanovitelj',
          bio: '15+ let v avtomobilski industriji. Prej podpredsednik pri AutoNation.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Anže Kranjc',
          role: 'Tehnični direktor',
          bio: 'Nekdanji inženir pri Tesli z ekspertizo v avtomobilski tehnologiji.',
          image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Nina Horvat',
          role: 'Vodja za uspeh strank',
          bio: '10+ let v odličnosti storitev strankam in vodenju ekipe.',
          image: 'https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Marko Zupan',
          role: 'Podpredsednik za operacije',
          bio: 'Strokovnjak za dobavno verigo s poznanim avtomobilske logistike.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        }
      ],
      milestones: [
        {
          year: '2009',
          title: 'Ustanovitev podjetja',
          description: 'Začeli smo kot majhna prodajna mesta rabljenih avtomobilov v Ljubljani z vizijo revolucioniranja nakupa avtomobilov.'
        },
        {
          year: '2012',
          title: 'Zagon digitalne platforme',
          description: 'Zagnali smo naš prvi spletni trg, kar je nakupovanje avtomobilov naredilo dostopnejše.'
        },
        {
          year: '2015',
          title: '500. partner prodajalec',
          description: 'Dosegli smo pomemben mejnik s partnerstvom z našim 500. preverjenim prodajalcem.'
        },
        {
          year: '2018',
          title: 'Nacionalna širitev',
          description: 'Razširili smo poslovanje na strežbo strankam po vsej Sloveniji in sosednjih državah.'
        },
        {
          year: '2020',
          title: 'Zagon mobilne aplikacije',
          description: 'Predstavili smo našo mobilno aplikacijo, ki je nakupovanje avtomobilov naredilo še priročnejše.'
        },
        {
          year: '2023',
          title: '50.000 prodanih avtomobilov',
          description: 'Proslavili smo pomaganje več kot 45.000 strankam pri iskanju njihovega popolnega vozila.'
        }
      ],
      awards: [
        {
          title: 'Najboljši avtomobilski trg 2023',
          organization: 'Nagrade za izbiro potrošnikov',
          year: '2023',
          description: 'Priznani za odličnost storitev strankam in inovativnost platforme'
        },
        {
          title: 'Najhitreje rastoči startup',
          organization: 'Nagrade za tehnološke inovacije',
          year: '2022',
          description: 'Priznani za hitro rast in širitev na trgu'
        },
        {
          title: 'Odličnost v storitvah strankam',
          organization: 'Nagrade avtomobilske industrije',
          year: '2023',
          description: 'Počaščeni za izjemno zadovoljstvo strank in podporo'
        }
      ]
    },
    content: {
      heroTitle: 'O CarMarket365',
      heroSubtitle: 'Na misiji smo, da naredimo nakup in prodajo avtomobilov enostavno, pregledno in prijetno. Od leta 2009 povezujemo kupce in prodajalce z zaupanjem in inovacijami.',
      missionTitle: 'Naša misija',
      missionContent: 'Revolucionirati izkušnjo nakupa in prodaje avtomobilov z zagotavljanjem pregledne, zanesljive in uporabniku prijazne platforme, ki ljudi povezuje z njihovim popolnim vozilom.',
      missionDescription: 'Verjamemo, da si vsi zaslužijo dostop do zanesljivega prevoza in poštenih cen, brez stresa in negotovosti, ki se tradicionalno povezujeta z nakupovanjem avtomobilov.',
      visionTitle: 'Naša vizija',
      visionContent: 'Postati najbolj zaupanja vreden avtomobilski trg na svetu, kjer je vsaka transakcija zgrajena na preglednosti, kakovosti in zadovoljstvu strank.',
      visionDescription: 'Predstavljamo si prihodnost, kjer je nakup ali prodaja avtomobila tako enostavna kot nekaj klikov, s popolnim zaupanjem v proces in rezultat.',
      valuesTitle: 'Naše vrednote',
      valuesDescription: 'Ti temeljni principi vodijo vse, kar počnemo, in oblikujejo kulturo našega podjetja',
      teamTitle: 'Spoznajte naš tim',
      teamDescription: 'Strastni strokovnjaki, predani transformaciji avtomobilske industrije',
      journeyTitle: 'Naša pot',
      journeyDescription: 'Ključni mejniki, ki so oblikovali naše podjetje skozi leta',
      awardsTitle: 'Nagrade in priznanja',
      awardsDescription: 'Ponosni smo, da smo priznani od vodilnih v industriji za naše inovacije in storitve',
      ctaTitle: 'Pripravljeni se pridružiti naši poti?',
      ctaDescription: 'Če iščete svoj naslednji avtomobil ali se želite pridružiti našemu timu, bi radi slišali od vas.',
      joinTeam: 'Pridruži se našemu timu',
      contactUs: 'Kontaktiraj nas',
      browseCars: 'Brskaj po avtomobilih',
      connect: 'Poveži se'
    }
  },

  carReviews: {
    title: 'Ocena avtomobilov',
    subtitle: 'Strokovne ocene in povratne informacije uporabnikov za pomoč pri sprejemanju premišljenih odločitev o nakupu naslednjega avtomobila.',
    backToHome: 'Nazaj na domačo stran',
    
    // Main content
    overviewTitle: 'Ocene in ocenjevanja avtomobilov',
    overviewDescription: 'Celovite ocene za pomoč pri sprejemanju premišljenih odločitev o nakupu vozil.',
    overviewText: 'Naš oddelek za ocene avtomobilov zagotavlja podrobne analize avtomobilskih strokovnjakov in resnične izkušnje lastnikov, ki vam pomagajo razumeti vse vidike vozil, ki jih preučujete.',
    
    // Review types
    expertReviews: {
      title: 'Strokovne ocene',
      features: [
        'Profesionalno avtomobilsko novinarstvo',
        'Podrobna analiza zmogljivosti',
        'Ocene varnosti in zanesljivosti',
        'Primerjalno testiranje vozil'
      ]
    },
    ownerReviews: {
      title: 'Ocene lastnikov',
      features: [
        'Resnične izkušnje lastništva',
        'Dolgoročne povratne informacije o zanesljivosti',
        'Vpogled v stroške vzdrževanja',
        'Vtisi iz vsakodnevne vožnje'
      ]
    },
    ratingSystem: {
      title: 'Sistem ocenjevanja',
      features: [
        'Sistem ocenjevanja s 5 zvezdicami',
        'Ocene specifične za kategorije',
        'Splošno priporočilo',
        'Razčlenitev prednosti in slabosti'
      ]
    },
    marketInsights: {
      title: 'Tržni vpogledi',
      features: [
        'Analiza preprodajne vrednosti',
        'Poročila o tržnih trendih',
        'Priporočila za najboljšo vrednost',
        'Vodniki za sezonske nakupe'
      ]
    },
    
    // Categories
    categoriesTitle: 'Kategorije ocen',
    categoriesDescription: 'Naše ocene pokrivajo vse vidike lastništva in zmogljivosti vozil.',
    performance: {
      title: 'Zmogljivost',
      items: [
        'Zmogljivost motorja',
        'Upravljanje in dinamika vožnje',
        'Učinkovitost goriva',
        'Pospeševanje in zaviranje'
      ]
    },
    comfort: {
      title: 'Udobje in notranjost',
      items: [
        'Udobje sedežev',
        'Notranji prostor in shranjevanje',
        'Tehnološke značilnosti',
        'Kakovost izdelave in materiali'
      ]
    },
    safety: {
      title: 'Varnost in zanesljivost',
      items: [
        'Varnostne ocene in funkcije',
        'Zanesljivost in vzdrževanje',
        'Garancijsko pokritje',
        'Zgodovina odpoklicev'
      ]
    },
    
    // Coming soon
    comingSoonTitle: 'Ocene kmalu na voljo!',
    comingSoonText: 'Trenutno gradimo našo obsežno bazo ocen. Strokovne ocene in povratne informacije lastnikov bodo kmalu na voljo za pomoč pri vodenju vaših odločitev o nakupu avtomobilov.',
    browseCars: 'Brskaj po razpoložljivih avtomobilih',
    exploreInventory: 'Razišči inventar'
  },

  // Static vehicle data for AdvancedSearch
  advancedSearch: {
    staticVehicleData: {
      makes: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citroen', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
      bodyTypes: [
        'Sedan', 'SUV', 'Hatchback', 'Kupé', 'Kabriolet', 'Karavan', 'Tovornjak', 'Furgonet',
        'Minivan', 'Crossover', 'Kompaktni', 'Subkompaktni', 'Srednja velikost', 'Polna velikost',
        'Športni avtomobil', 'Luksuzni', 'Električni', 'Hibridni'
      ],
      fuelTypes: [
        'Bencin', 'Diesel', 'Hibridni', 'Električni', 'Priključno hibridni', 'CNG', 'LPG',
        'Flex Fuel', 'Vodik', 'Bio-diesel', 'E85 Etanol'
      ],
      transmissions: [
        'Ročni', 'Avtomatski', 'CVT', 'Polavtomatski', 'Dvojna sklopka', '6-stopenjski ročni',
        '7-stopenjski avtomatski', '8-stopenjski avtomatski', '9-stopenjski avtomatski', '10-stopenjski avtomatski'
      ],
      drivetrains: [
        'Sprednji pogon', 'Zadnji pogon', 'Pogon na vsa kolesa', '4WD', 
        'Občasni 4WD', 'Stalni 4WD', 'Elektronski AWD', 'Mehanični AWD'
      ],
      colors: [
        'Črna', 'Bela', 'Srebrna', 'Siva', 'Modra', 'Rdeča', 'Zelena', 'Rjava', 
        'Zlata', 'Rumena', 'Oranžna', 'Vijolična', 'Bež', 'Tan', 'Bronasta', 'Bakrova',
        'Bisernatno bela', 'Kovinska srebrna', 'Globoko modra', 'Dirkalna rdeča', 'Gozdno zelena',
        'Ogljeno siva', 'Platinasta', 'Drugo'
      ],
      conditions: [
        'Nov', 'Kot nov', 'Odličen', 'Zelo dober', 'Dober', 'Pravičen', 'Rabljen', 
        'Certificiran pred-lastništvo', 'Obnovljen', 'Restavriran', 'Klasičen', 'Vintage'
      ],
      features: [
        'Klimatska naprava', 'Usnjeni sedeži', 'Navigacijski sistem', 'Bluetooth', 'USB vrata',
        'Kamera za vzvratno vožnjo', 'Senzorji za parkiranje', 'Greta sedeži', 'Sončna streha', 'Aluminijasta platišča',
        'Tempomat', 'Protiblokaža zavor', 'Elektronski nadzor stabilnosti', 'Zračne blazine',
        'Daljinski zagon', 'Brezključni vstop', 'Električna okna', 'Servo volan', 'Zatemnjena okna',
        'Premium zvočni sistem', 'Satelitski radio', 'CD predvajalnik', 'MP3 predvajalnik', 'DVD predvajalnik',
        'Brezžično polnjenje', 'Apple CarPlay', 'Android Auto', 'Opozorilo za zapuščanje voznega pasu',
        'Nadzor slepega kota', 'Opozorilo za trčenje spredaj', 'Avtomatsko zasilno zaviranje',
        'Adaptivni tempomat', 'Pomoč pri parkiranju', 'Kamera za vzvratno vožnjo', '360-stopinjska kamera',
        'Ogrevan volan', 'Hlajeni sedeži', 'Prezračevani sedeži', 'Spominski sedeži',
        'Električno nastavljivi sedeži', 'Sedeži tretje vrste', 'Zložljivi zadnji sedeži', 
        'Pokrov za prtljago', 'Strešni nosilci', 'Paket za vleko', 'Stranske stopnice', 'Strani stopniki'
      ],
      certifications: [
        'Certificiran pred-lastništvo', 'Proizvajalčeva garancija', 'Podaljšana garancija', 
        'Pomoč na cesti', 'Poročilo o zgodovini vozila', 'Večtočkovni pregled',
        'Testirano za emisije', 'Varnostno pregledano', 'Certificiran od prodajalca', 'Certificiran s strani tretje osebe',
        'Carfax preverjen', 'AutoCheck preverjen', 'Brez nesreč', 'En lastnik',
        'Servisi zapisi na voljo', 'Vzdrževanje ažurno'
      ]
    }
  },

  safetyTips: {
    title: 'Varnostni nasveti',
    subtitle: 'Bistveni varnostni nasveti za varno nakupovanje, prodajo in vzdrževanje vašega vozila.',
    backToHome: 'Nazaj na domačo',
    
    // Main content
    mainTitle: 'Smernice za varnost vozil',
    mainDescription: 'Celoviti varnostni nasveti za varno nakupovanje in prodajo avtomobilov.',
    safetyOverview: 'Ne glede na to, ali kupujete svoj prvi avtomobil ali prodajate sedanjega, sledenje ustreznim varnostnim smernicam vas varuje pred goljufijami, zagotavlja poštene posle in pomaga vzdrževati vašo osebno varnost skozi ves proces.',
    
    // Safety categories
    meetingSafety: {
      title: 'Varnost srečanja',
      items: [
        'Vedno se srečajte na javnem, dobro osvetljenem mestu',
        'Pripeljite zanesljivega prijatelja ali družinskega člana',
        'Povejte komu o vaših načrtih srečanja',
        'Po možnosti se srečajte med dnevom',
        'Zaupajte svojim instinktom - odidite, če se vam kaj ne zdi v redu',
        'Nikoli se ne srečajte doma ali ne vabite tujcev tja'
      ]
    },
    paymentSecurity: {
      title: 'Varnost plačevanja',
      items: [
        'Nikoli ne pošljite denarja ali varščin, preden vidite vozilo',
        'Uporabite varne načine plačevanja (bančni nakazilo, overjeni ček)',
        'Izogibajte se gotovinski transakciji za velike zneske',
        'Pazite na prevare s preplačevanjem',
        'Po možnosti izvedite transakcije v banki',
        'Pridobite potrdila za vsa plačila in transakcije'
      ]
    },
    vehicleInspection: {
      title: 'Pregled vozila',
      items: [
        'Vedno si oglejte vozilo osebno',
        'Pripeljite izkušenega mehanika ali prijatelja',
        'Testirajte vozilo v različnih pogojih',
        'Preverite vse dokumente in zgodovino vozila',
        'Preverite, da se VIN številka ujema z vsemi dokumenti',
        'Ne hitite - vzemite si čas za temeljit pregled'
      ]
    },
    redFlags: {
      title: 'Opozorilni znaki',
      items: [
        'Prodajalec zavrača osebno srečanje',
        'Zahteva plačilo pred ogledom vozila',
        'Cena je bistveno pod tržno vrednostjo',
        'Pritisk za hitro zaključitev transakcije',
        'Nepopolna ali sumljiva dokumentacija',
        'Prodajalec ne more zagotoviti jasnega dokaza o lastništvu'
      ]
    },
    
    // Documentation
    documentation: {
      title: 'Potrebna dokumentacija',
      description: 'Pomembni dokumenti za preverjanje in pridobivanje med transakcijami vozil.',
      forBuyers: 'Za kupce',
      buyerItems: [
        'Potrdilo o registraciji vozila',
        'Veljavna identifikacija prodajalca',
        'Zapisi o servisu in vzdrževanju',
        'Potrdilo o tehničnem pregledu',
        'Potrditev zavarovanja',
        'Jasen naslov ali informacije o hipoteki'
      ],
      forSellers: 'Za prodajalce',
      sellerItems: [
        'Trenutna registracija vozila',
        'Jasen naslov vozila',
        'Nedavni zapisi vzdrževanja',
        'Veljavno vozniško dovoljenje',
        'Predloga kupoprodajne pogodbe',
        'Obrazec za razrešitev odgovornosti'
      ]
    },
    
    // Emergency contact
    emergency: {
      title: 'Potrebujete pomoč ali imate pomisleke?',
      message: 'Če naletite na sumljivo dejavnost ali potrebujete pomoč, ne oklevajte kontaktirati lokalne oblasti ali poročati o problemu naši podporni ekipi.',
      browseCars: 'Prebrskaj varne oglase',
      reportConcern: 'Prijavih skrb'
    }
  },

  faq: {
    title: 'Pogosto zastavljena vprašanja',
    subtitle: 'Poiščite odgovore na pogosta vprašanja o nakupu, prodaji, financiranju in uporabi CarMarket365.',
    searchPlaceholder: 'Išči med pogostimi vprašanji...',
    browseByCategory: 'Pregledaj po kategorijah',
    allQuestions: 'Vsa vprašanja',
    stillNeedHelp: 'Še vedno potrebujete pomoč?',
    stillNeedHelpDescription: 'Ne najdete tistega, kar iščete? Naša podporna ekipa je tukaj za pomoč.',
    callSupport: 'Pokličite podporo',
    emailUs: 'Pošljite nam sporočilo',
    liveChat: 'Živ klepet',
    available247: 'Na voljo 24/7',
    noResultsFound: 'Ni najdenih rezultatov',
    noResultsText: 'Poskusite iskati z različnimi ključnimi besedami ali pregledajte po kategorijah.',
    clearSearch: 'Počisti iskanje',
    staticContent: {
      categories: {
        buying: 'Nakup avtomobilov',
        selling: 'Prodaja avtomobilov',
        financing: 'Financiranje in plačila',
        safety: 'Varnost in zaščita',
        account: 'Račun in uporaba'
      },
      questions: [
        {
          id: 'buy-1',
          category: 'buying',
          question: 'Kako lahko kupim svoj prvi avtomobil na CarMarket365?',
          answer: 'Za nakup avtomobila začnite z iskanjem vozil z našimi podrobnimi filtri. Ko najdete vozilo, ki vam je všeč, kontaktirajte prodajalca direktno preko naše platforme. Vedno priporočamo pregled vozila pred nakupom in preverjanje dokumentacije.'
        },
        {
          id: 'buy-2',
          category: 'buying',
          question: 'Ali so prodajalci na platformi preverjeni?',
          answer: 'Da, vsi profesionalni prodajalci so preverjeni s strani naše ekipe. Tudi zasebni prodajalci gredo skozi osnovni proces preverjanja. Poiščite znak preverjanja na profilih prodajalcev za popolno preglednost.'
        },
        {
          id: 'buy-3',
          category: 'buying',
          question: 'Ali lahko testiram avtomobil pred nakupom?',
          answer: 'Seveda! Večina prodajalcev dovoljuje preizkusne vožnje. Kontaktirajte prodajalca za dogovor za preizkusno vožnjo. Vedno prinesite veljaven vozniški dovoljenje in se prepričajte, da ima avtomobil veljavno zavarovanje.'
        },
        {
          id: 'buy-4',
          category: 'buying',
          question: 'Kaj naj preverim pred nakupom avtomobila?',
          answer: 'Preverite: zgodovino vozila, pravne dokumente, fizično stanje, glavne sisteme (motor, zavore, prenos) in naredite preizkusno vožnjo. Priporočamo tudi pregled s strani zaupanja vrednega mehanika.'
        },
        {
          id: 'buy-5',
          category: 'buying',
          question: 'Ali CarMarket365 zagotavlja garancije za vozila?',
          answer: 'CarMarket365 je platforma, ki povezuje kupce s prodajalci. Garancije zagotavljajo individualni prodajalci. Večina profesionalnih prodajalcev ponuja omejene garancije. Preverite podrobnosti garancije s prodajalcem pred nakupom.'
        },
        {
          id: 'sell-1',
          category: 'selling',
          question: 'Koliko stane prodaja avtomobila na CarMarket365?',
          answer: 'Osnovno oglaševanje je brezplačno za zasebne prodajalce. Ponujamo tudi premium možnosti z dodatnimi funkcijami, kot so boljši prikaz in profesionalno fotografiranje. Profesionalni prodajalci imajo mesečne pakete z naprednimi funkcijami.'
        },
        {
          id: 'sell-2',
          category: 'selling',
          question: 'Kako dolgo traja prodaja avtomobila?',
          answer: 'Čas prodaje je odvisen od več dejavnikov: cene, stanja vozila, povpraševanja na trgu in kakovosti oglasa. V povprečju se avtomobili prodajo v 2-8 tednih. Oglasi s konkurenčnimi cenami in kakovostnimi fotografijami se prodajo hitreje.'
        },
        {
          id: 'sell-3',
          category: 'selling',
          question: 'Kako lahko povečam možnosti za prodajo mojega avtomobila?',
          answer: 'Uporabite profesionalne fotografije, napišite podrobne opise, nastavite konkurenčne cene, bodite pošteni glede stanja vozila in hitro odgovarjajte na vprašanja. Razmislite tudi o naši storitvi profesionalnega fotografiranja.'
        },
        {
          id: 'sell-4',
          category: 'selling',
          question: 'Katere dokumente potrebujem za prodajo avtomobila?',
          answer: 'Potrebujete: prometno dovoljenje, osebni dokument, tehnični pregled in dokazilo o trenutnem zavarovanju. Za avtomobile, stare več kot 4 leta, potrebujete tudi certifikat o tehničnem pregledu.'
        },
        {
          id: 'sell-5',
          category: 'selling',
          question: 'Ali lahko spremenem ceno svojega oglasa?',
          answer: 'Da, ceno lahko spremenite kadarkoli iz vaše nadzorne plošče. Priporočamo spremljanje trga in prilagajanje cen po potrebi za maksimiziranje zanimanja kupcev.'
        },
        {
          id: 'financing-1',
          category: 'financing',
          question: 'Ali CarMarket365 ponuja možnosti financiranja?',
          answer: 'Sodelujemo z več partnerskimi finančnimi institucijami za ponudbo kreditnih možnosti. Preko naše platforme lahko zaprosijo za pred-odobritev. Obrestne mere in pogoji so odvisni od vašega finančnega profila in izbranega vozila.'
        },
        {
          id: 'financing-2',
          category: 'financing',
          question: 'Katere informacije so potrebne za prijavo za kredit?',
          answer: 'Prijava zahteva: osebne podatke, mesečne dohodke, informacije o zaposlitvi, kreditno zgodovino in podrobnosti o vozilu, ki ga želite kupiti. Proces pred-odobritve običajno traja 10-15 minut.'
        },
        {
          id: 'financing-3',
          category: 'financing',
          question: 'Kakšna je najnižja obrestna mera, ki jo lahko dobim?',
          answer: 'Obrestne mere se začnejo pri 3.9% APR za kvalificirane kandidate. Dejanska mera je odvisna od vašega kreditnega rezultata, dohodkov, obdobja kredita in tipa vozila. Uporabite naš kreditni kalkulator za začetno oceno.'
        },
        {
          id: 'safety-1',
          category: 'safety',
          question: 'Kako biti varen pri nakupu od zasebnega prodajalca?',
          answer: 'Vedno se srečajte na javnih mestih, prinesite prijatelja, preglejte vozilo pri dnevni svetlobi, preverite identiteto prodajalca in ne nosite velikih količin gotovine. Uporabite naše priporočene načine plačevanja za varne transakcije.'
        },
        {
          id: 'safety-2',
          category: 'safety',
          question: 'Kaj naj naredim, če se prodajalec zdi sumljiv?',
          answer: 'Zaupajte svojim instinktom. Če se vam kaj zdi sumljivo, ne nadaljujte s transakcijo. Prijavite sumljivo aktivnost naši varnostni ekipi na safety@carmarket365.com. Raziskali bomo in ukrepali ustrezno.'
        },
        {
          id: 'safety-3',
          category: 'safety',
          question: 'Kako lahko preverim, ali je vozilo ukradeno?',
          answer: 'Preverite VIN vozila v naših bazah podatkov in zahtevajte poročilo o zgodovini vozila. Preverite, da se VIN na vozilu ujema z dokumenti. Če imate dvome, kontaktirajte lokalne oblasti pred nakupom.'
        },
        {
          id: 'account-1',
          category: 'account',
          question: 'Kako ustvarim račun na CarMarket365?',
          answer: 'Kliknite "Registriraj se" na vrhu strani. Izbirate lahko med zasebnim računom (za kupce in zasebne prodajalce) ali profesionalnim računom (za prodajalce in dealerje). Proces je brezplačen in traja le nekaj minut.'
        },
        {
          id: 'account-2',
          category: 'account',
          question: 'Ali lahko kasneje spremenem tip svojega računa?',
          answer: 'Da, kadarkoli se lahko nadgradite iz zasebnega v profesionalni račun. Kontaktirajte našo podporo strankam za pomoč pri prenosu. Upoštevajte, da nekatere funkcije morda ne bodo prenosljive.'
        },
        {
          id: 'account-3',
          category: 'account',
          question: 'Kako ponastavim svoje geslo?',
          answer: 'Kliknite "Pozabljeno geslo?" na strani za prijavo. Vnesite svoj e-poštni naslov in poslali vam bomo povezavo za ponastavitev. Povezava je veljavna 24 ur iz varnostnih razlogov.'
        },
        {
          id: 'account-4',
          category: 'account',
          question: 'Kako izbrišem svoj račun?',
          answer: 'Račun lahko izbrišete iz nastavitev računa ali z direktnim kontaktiranjem. Upoštevajte, da je brisanje trajno in boste izgubili vse svoje podatke in oglase.'
        },
        {
          id: 'account-5',
          category: 'account',
          question: 'Ali lahko imam več računov?',
          answer: 'Vsaka oseba lahko ima samo en aktiven račun. Več računov lahko vodi do suspendiranja računa. Če morate spremeniti tip računa, kontaktirajte našo podporo za pomoč.'
        }
      ]
    }
  },

  // Dodatne prevedbe za trdo kodirano besedilo
  hardcodedFixes: {
    // Specifično za CountryTestPage
    countryTestPage: {
      codeLabel: 'Koda:',
      loadingCars: 'Nalaganje avtomobilov...',
      errorPrefix: 'Napaka:',
      carListingsFor: 'Seznami avtomobilov za',
      onlyListedDescription: 'Samo avtomobili, navedeni v <strong>{country} ({code})</strong>, naj se prikažejo spodaj',
      foundCarsIn: 'Najdenih {count} avtomobilov v {country}',
      countryFilteredResults: '🔒 Rezultati, filtrirani po državah',
      noCarsFound: 'Ni najdenih avtomobilov',
      noCarsInCountry: 'Trenutno ni navedenih avtomobilov v {country}.',
      trySwitchingCountry: 'Poskusite zamenjati državo z zgornjim preklopnikom.',
      carIdAndCountry: 'ID: {id} | Država: {country}',
      developmentNote: '<strong>Opomba:</strong> V produkciji so države samodejno zaznane iz poddomene (npr. mk.carmarket365.com, al.carmarket365.com). Ta preklopnik deluje samo v razvojnem načinu.',
    },

    // AdminDashboard - značke stanja in lažni podatki
    adminDashboard: {
      statusBadges: {
        suspended: 'Suspendiran',
      },
      mockData: {
        // Imena uporabnikov
        johnDealer: 'Janez Trgovec',
        johnDealerEmail: 'janez@trgovec.com',
        annaCustomer: 'Ana Stranka',
        annaCustomerEmail: 'ana@stranka.com',
        bobAdmin: 'Bojan Skrbnik',
        bobAdminEmail: 'bojan@admin.com',
        
        // Naslovi oglasov
        bmw3Series2022: '2022 BMW 3 serija',
        audiA42021: '2021 Audi A4',
        mercedesCClass2020: '2020 Mercedes C-razred',
        
        // Kategorije
        sedan: 'Limuzina',
        luxury: 'Luksuz',
        
        // Imena podjetij
        premiumMotors: 'Premium Motors',
        eliteCars: 'Elite Cars',
        
        // Uporabniki dejavnosti
        premiumMotorsGmbH: 'Premium Motors d.o.o.',
        suspiciousUser: 'Sumljiv uporabnik',
        autoHausBerlin: 'AutoHaus Berlin',
        
        // Časovni kazalniki
        twoHoursAgo: 'pred 2h',
        fourHoursAgo: 'pred 4h',
        sixHoursAgo: 'pred 6h',
        eightHoursAgo: 'pred 8h',
      },
    },

    // DealerDashboard lažni podatki
    dealerDashboard: {
      mockData: {
        // Naslovi avtomobilov
        bmw3Series320i2022: '2022 BMW 3 serija 320i',
        audiA4Avant2021: '2021 Audi A4 Avant',
        mercedesCClass2020: '2020 Mercedes C-razred',
        
        // Vrednosti kilometrine
        mileage25k: '25.000 km',
        mileage18k: '18.000 km',
        mileage32k: '32.000 km',
      },
    },

    // Financiranje trdo kodirane besede
    financing: {
      features: {
        quickApproval: {
          title: 'Hitra odobritev',
          description: 'Odobritev v minutah',
        },
        lowRates: {
          title: 'Nizke obrestne mere',
          description: 'Konkurenčne obrestne mere',
        },
        noCreditImpact: {
          title: 'Brez vpliva na kredit',
          description: 'Samo mehka kreditna preveritev',
        },
        expertSupport: {
          title: 'Strokovna podpora',
          description: 'Predani strokovnjaki za posojila',
        },
      },
      form: {
        creditScoreRange: 'Razpon kreditne ocene',
        loanTerm: 'Doba posojila',
      },
      summary: {
        loanSummary: 'Povzetek posojila',
        loanAmount: 'Znesek posojila',
        monthlyPayment: 'Mesečna rata',
        totalInterest: 'Skupne obresti',
        totalPayment: 'Skupno plačilo',
      },
      options: {
        financingOptions: 'Možnosti financiranja',
        chooseOption: 'Izberite možnost, ki vam najbolj ustreza',
        traditionalAutoLoan: 'Tradicionalno avtomobilsko posojilo',
        mostPopular: 'Najbolj priljubljeno',
        leaseOptions: 'Možnosti najema',
      },
    },

    contact: {
      title: 'Kontaktirajte nas',
      subtitle: 'Stopite v stik z našo ekipo za podporo, vprašanja ali pomoč pri nakupu ali prodaji avtomobila.',
      backToHome: 'Nazaj na domačo stran',
      
      // Main content
      mainTitle: 'Stopite v stik',
      mainDescription: 'Več načinov za stik z našo podporno ekipo za pomoč.',
      contactOverview: 'Ne glede na to, ali imate vprašanja o nakupu avtomobila, potrebujete pomoč pri prodaji vašega vozila ali potrebujete tehnično podporo, naša predana ekipa je tu, da vam pomaga. Izberite način stika, ki vam najbolj ustreza.',
      
      // Contact methods
      phoneSupport: {
        title: 'Telefonska podpora',
        salesDepartment: 'Prodajni oddelek',
        customerService: 'Služba za stranke',
        financingDepartment: 'Finančni oddelek'
      },
      emailSupport: {
        title: 'E-poštna podpora',
        generalInquiries: 'Splošne poizvedbe',
        salesQuestions: 'Vprašanja o prodaji',
        support: 'Tehnična podpora'
      },
      businessHours: {
        title: 'Delovni čas',
        mondayFriday: 'Ponedeljek - Petek',
        saturday: 'Sobota',
        sunday: 'Nedelja',
        timeRange: {
          mondayFriday: '8:00 - 20:00',
          saturday: '9:00 - 18:00',
          sunday: '10:00 - 16:00'
        }
      },
      officeLocation: {
        title: 'Lokacija pisarne',
        address: {
          street: 'Potsdamer Platz 1',
          city: '10785 Berlin, Nemčija',
          country: 'Nemčija'
        },
        getDirections: 'Pridobi navodila'
      },
      
      // Contact form
      form: {
        title: 'Pošljite nam sporočilo',
        subtitle: 'Izpolnite spodnji obrazec in odgovorili vam bomo čim prej.',
        required: '*',
        inquiryType: {
          label: 'Vrsta poizvedbe',
          placeholder: 'Izberite vrsto poizvedbe',
          options: {
            buying: 'Nakup avtomobila',
            selling: 'Prodaja avtomobila',
            financing: 'Financiranje',
            dealer: 'Storitve za trgovce',
            support: 'Tehnična podpora',
            other: 'Drugo'
          }
        },
        fields: {
          fullName: 'Polno ime',
          email: 'E-poštni naslov',
          phone: 'Telefonska številka',
          subject: 'Zadeva',
          message: 'Sporočilo'
        },
        placeholders: {
          name: 'Vnesite vaše polno ime',
          email: 'Vnesite vaš e-poštni naslov',
          phone: 'Vnesite vašo telefonsko številko',
          subject: 'Vnesite zadevo sporočila',
          message: 'Povejte nam, kako vam lahko pomagamo...'
        },
        submitButton: 'Pošlji sporočilo',
        disclaimer: 'Običajno odgovorimo v 24 urah med delovnimi dnevi.'
      },
      
      // Success message
      success: {
        title: 'Sporočilo poslano!',
        message: 'Hvala, ker ste nas kontaktirali. Prejeli smo vaše sporočilo in odgovorili vam bomo v 24 urah.'
      },
      
      // Quick help
      quickHelp: {
        title: 'Hitra pomoč',
        subtitle: 'Poiščite odgovore na pogosta vprašanja ali pridobite takojšnjo pomoč.',
        options: {
          buyingGuide: {
            title: 'Vodnik za nakup avtomobila',
            description: 'Spoznajte naš postopek nakupa avtomobilov'
          },
          sellingGuide: {
            title: 'Vodnik za prodajo avtomobila', 
            description: 'Pridobite pomoč za prodajo vašega vozila'
          },
          faq: {
            title: 'Pogosta vprašanja',
            description: 'Preglejte pogosto zastavljena vprašanja'
          },
          safetyTips: {
            title: 'Varnostni nasveti',
            description: 'Pomembne varnostne smernice'
          }
        }
      },
      
      // Urgent support
      urgentSupport: {
        title: 'Potrebujete takojšnjo pomoč?',
        message: 'Za nujna vprašanja ali takojšnjo pomoč pokličite našo podporno linijo ali preglejte naše razpoložljive avtomobile.',
        browseCars: 'Preglejte avtomobile',
        callNow: 'Pokličite zdaj'
      }
    },

    // Stran trgovcev - trdno kodirane nize
    dealers: {
      searchLabel: 'Išči trgovce',
      stateLabel: 'Država',
      specialtyLabel: 'Specialiteta',
      allStatesOption: 'Vse države',
      allSpecialtiesOption: 'Vse specialitete',
      sortByDistance: 'Razdalja',
      sortByRating: 'Najvišje ocenjeni',
      sortByInventory: 'Največja zaloga',
      sortByLabel: 'Razvrsti po:',
      dealersFound: 'trgovcev najdenih',
      specialtiesHeader: 'Specialitete',
      certificationsHeader: 'Certifikati',
      noDealersFound: 'Ni najdenih trgovcev',
      tryAdjustingFilters: 'Poskusite prilagoditi svoje iskalne kriterije',
      viewProfile: 'Prikaži profil',
      contact: 'Kontakt',
      clearFilters: 'Počisti filtre',
      milesAway: 'milj stran',
      cars: 'avtomobili',
      reviews: 'ocene',
      hoursLabel: 'Ure',
    },

    registeredDealers: {
      title: 'Registrirani trgovci',
      subtitle: 'Preglejte naše omrežje preverjenih avtomobilskih trgovcev',
      viewProfile: 'Prikaži profil',
      viewInventory: 'Prikaži inventar',
      contactDealer: 'Kontaktiraj trgovca',
      backToHome: 'Nazaj domov',
      allDealersVerified: 'Vsi trgovci so preverjeni',
      customerRated: 'Ocenjeno s strani strank',
      supportAvailable: 'Podpora 24/7',
      browseNetwork: 'Preglejte naše omrežje {count} preverjenih trgovcev po vsej Nemčiji',
      reviews: 'ocen',
      verifiedSince: 'Preverjen od {year}',
      experience: 'Izkušnje:',
      totalSales: 'Skupne prodaje:',
      viewDealerProfile: 'Prikaži profil trgovca',
      verifiedDealers: 'Preverjeni trgovci',
      totalDealers: 'Skupaj trgovcev',
      averageRating: 'Povprečna ocena',
      totalInventory: 'Skupni inventar',
      searchDealers: 'Išči trgovce',
      allLocations: 'Vse lokacije',
      sortBy: 'Razvrsti po',
      years: 'let',
      
      // Dealer specialties
      specialties: {
        luxuryCars: 'Luksuzni avtomobili',
        suvs: 'Terenska vozila',  
        electricVehicles: 'Električni avtomobili',
        familyCars: 'Družinski avtomobili',
        compactCars: 'Kompaktni avtomobili',
        hybrids: 'Hibridi',
        sportsCars: 'Športni avtomobili',
        convertibles: 'Kabrioli',
        performance: 'Zmogljivost',
        mercedesBenz: 'Mercedes-Benz',
        porsche: 'Porsche',
        luxury: 'Luksuz',
        businessCars: 'Poslovni avtomobili',
        fleetSales: 'Prodaja voznih parkov',
        leasing: 'Najem',
        ecoFriendly: 'Okolju prijazno',
      },

      // Dealer descriptions  
      descriptions: {
        autoMaxDescription: 'Vodilni trgovec z luksuznimi avtomobili v Berlinu z več kot 15 let izkušenj. Specializiran za premium nemške znamke.',
        cityMotorsDescription: 'Družinsko podjetje, ki služi Münchenu in okoliškim območjem. Znano po odličnem servisu za stranke in poštenih cenah.',
        ecoWheelsDescription: 'Vodilni specialist za električne in hibridne avtomobile v Hamburgu. Predan trajnostnim prometnim rešitvam.',
        rheinAutoDescription: 'Specialisti za zmogljive in športne avtomobile v Porenju. Obsežna kolekcija visokozmogljivih vozil.',
        stuttgartLuxuryDescription: 'Pooblaščeni trgovec Mercedes-Benz in Porsche v Stuttgartu. Dom najfinešega nemškega inženirstva.',
        nordFahrzeugeDescription: 'Specialist za korporacijska vozila, ki služi poslovnemu okrožju Frankfurta. Strokovnjak za rešitve voznih parkov in najema.',
      },
    },

    // Stran podpore trgovcem - trdno kodirane nize
    dealerSupport: {
      supportCenterText: 'Naša predana ekipa podpore trgovcem je tu, da vam pomaga maksimizirati vaš uspeh na CarMarket365. Pridobite pomoč z upravljanjem zalog, poizvedbami strank in funkcijami platforme.',
      dashboardSupport: {
        title: 'Podpora nadzorni plošči',
        items: [
          'Pomoč pri upravljanju zalog',
          'Optimizacija oglasov',
          'Interpretacija analitike',
          'Konfiguracija računa'
        ],
      },
      customerRelations: {
        title: 'Odnosi s strankami',
        items: [
          'Navodila za upravljanje potencialnih strank',
          'Najboljše komunikacijske prakse',
          'Obravnavanje poizvedb strank',
          'Upravljanje ocen'
        ],
      },
      performanceOptimization: {
        title: 'Optimizacija uspešnosti',
        items: [
          'Izboljšanje vidnosti oglasov',
          'Nasveti za cenovno strategijo',
          'Navodila za kakovost fotografij',
          'Vpogledi v tržne trende'
        ],
      },
      technicalSupport: {
        title: 'Tehnična podpora',
        items: [
          'Težave s funkcionalnostjo platforme',
          'Pomoč z mobilno aplikacijo',
          'Odpravljanje težav z integracijo',
          'Usposabljanje za funkcije'
        ],
      },
      gettingStarted: {
        title: 'Začetek kot trgovec',
        description: 'Korak za korakom navodila za nastavitev vašega trgovskega računa in maksimiziranje vašega uspeha.',
        accountSetup: {
          title: 'Nastavitev računa',
          items: [
            'Izpolnite preverjanje trgovca',
            'Naložite poslovno dokumentacijo',
            'Nastavite obdelavo plačil',
            'Konfigurirajte poslovni profil'
          ],
        },
        inventoryManagement: {
          title: 'Upravljanje zalog',
          items: [
            'Dodajte svoj prvi oglas vozila',
            'Naložite visokokakovostne fotografije',
            'Napišite prepričljive opise',
            'Nastavite konkurenčne cene'
          ],
        },
        performanceTracking: {
          title: 'Sledenje uspešnosti',
          items: [
            'Nadzorujte uspešnost oglasov',
            'Sledite poizvedbam strank',
            'Analizirajte tržne trende',
            'Optimizirajte na podlagi podatkov'
          ],
        },
      },
      helpSection: {
        title: 'Potrebujete pomoč? Tu smo za vas!',
        message: 'Naša ekipa podpore trgovcem je na voljo, da vam pomaga uspeti. Kontaktirajte nas na dealers@carmarket365.com ali preko vaše trgovske nadzorne plošče.',
        returnToPlatform: 'Vrnite se na platformo',
        goToDealerDashboard: 'Pojdite na trgovsko nadzorno ploščo',
      },
    },

    // Stran dostopnosti - trdno kodirane nize
    accessibility: {
      standardsWeFollow: 'Standardi, ki jim sledimo',
      standardsDescription: 'Trudimo se izpolnjevati uveljavljene standarde in smernice dostopnosti.',
      wcagGuidelines: 'WCAG smernice',
      wcagDescription: 'Stremimo k izpolnjevanju standardov smernic za dostopnost spletnih vsebin (WCAG) 2.1 raven AA.',
      platformCompatibility: 'Združljivost platforme',
      platformCompatibilityDescription: 'Naša platforma je zasnovana za delovanje s pomožnimi tehnologijami in orodji za dostopnost.',
      weValueYourFeedback: 'Cenimo vašo povratno informacijo',
      feedbackMessage: 'Če naletite na kakšne ovire dostopnosti ali imate predloge za izboljšave, se ne oklevajte obrniti na nas na accessibility@carmarket365.com',
      returnToPlatform: 'Vrnite se na platformo',
      contactAccessibilityTeam: 'Kontaktirajte ekipo za dostopnost',
      visualFeatures: [
        'Visokokontrastna zasnova',
        'Skalabilni besedilni in vmesniški elementi',
        'Nadomestno besedilo za slike',
        'Združljivost z bralniki zaslona'
      ],
      motorFeatures: [
        'Podpora navigacije s tipkovnico',
        'Velika klikliva področja',
        'Možnosti zmanjšanega gibanja',
        'Združljivost z glasovnim nadzorom'
      ],
      audioFeatures: [
        'Vizualni kazalniki za zvočno vsebino',
        'Besedilne alternative za zvočne informacije',
        'Podnapisi za video vsebino',
        'Prilagodljive zvočne nastavitve'
      ],
      cognitiveFeatures: [
        'Jasen in preprost jezik',
        'Dosledni navigacijski vzorci',
        'Preprečevanje napak in jasne povratne informacije',
        'Prilagodljive možnosti vmesnika'
      ],
    },

    // Stran pravil o piškotkih - trdno kodirane nize
    cookiePolicy: {
      managingPreferences: 'Upravljanje vaših nastavitev piškotkov',
      managingPreferencesDescription: 'Imate nadzor nad piškotki, ki jih uporabljamo na vaši napravi.',
      browserSettings: 'Nastavitve brskalnika',
      platformControls: 'Nadzori platforme',
      questionsAboutCookies: 'Vprašanja o piškotkih?',
      questionsMessage: 'Če imate vprašanja o naši politiki piškotkov ali potrebujete pomoč pri upravljanju svojih nastavitev, se obrnite na nas na cookies@carmarket365.com',
      returnToPlatform: 'Vrnite se na platformo',
      cookieSupport: 'Podpora za piškotke',
      browserSettingsItems: [
        'Blokirajte ali dovolite piškotke',
        'Izbrišite obstoječe piškotke',
        'Nastavite potekanje piškotkov',
        'Upravljajte piškotke tretjih oseb'
      ],
      platformControlsItems: [
        'Center za nastavitve piškotkov',
        'Na voljo možnosti zavrnitve',
        'Podrobne nastavitve nadzora',
        'Redne posodobitve nastavitev'
      ],
      essentialFeatures: [
        'Prijava in preverjanje pristnosti',
        'Funkcionalnost nakupovalne košarice',
        'Varnost in preprečevanje goljufij',
        'Osnovne operacije spletne strani'
      ],
      functionalFeatures: [
        'Zapomnite si vaše nastavitve',
        'Izbira jezika',
        'Prilagojena uporabniška izkušnja',
        'Storitve na osnovi lokacije'
      ],
      analyticsFeatures: [
        'Statistike uporabe spletne strani',
        'Optimizacija uspešnosti',
        'Poročanje in odpravljanje napak',
        'Vpogledi v uporabniško vedenje'
      ],
      marketingFeatures: [
        'Prilagojeni oglasi',
        'Sledenje učinkovitosti oglaševalskih kampanj',
        'Integracija družabnih medijev',
        'Ponovno ciljanje in ponovno trženje'
      ],
    },

    // Stran varnostnih nasvetov - trdno kodirane nize
    safetyTips: {
      mainTitle: 'Varnost nakupa in prodaje avtomobilov',
      mainDescription: 'Bistvene varnostne smernice za zaščito med transakcijami vozil.',
      safetyOverview: 'Vaša varnost je naša največja prednost. Sledite tem smernicam za zagotovitev varnih in uspešnih izkušenj nakupa in prodaje avtomobilov na naši platformi.',
      meetingSafety: {
        title: 'Varnost srečanja',
        items: [
          'Srečajte se na javnih, dobro osvetljenih lokacijah',
          'Pripeljite prijatelja ali družinskega člana',
          'Srečajte se podnevi',
          'Zaupajte svojemu instinktu'
        ],
      },
      paymentSecurity: {
        title: 'Varnost plačil',
        items: [
          'Uporabljajte varne načine plačila',
          'Izogibajte se gotovini za velike zneske',
          'Preverite plačilo pred prenosom',
          'Pridobite račun za vse transakcije'
        ],
      },
      vehicleInspection: {
        title: 'Pregled vozila',
        items: [
          'Priporočen je strokovni pregled',
          'Preverite vse mehanske sisteme',
          'Preverite VIN in registracijo',
          'Temeljito preizkusite vožnjo'
        ],
      },
      redFlags: {
        title: 'Opozorilni znaki',
        items: [
          'Pritisk za hitro odločitev',
          'Zahteve za osebne informacije vnaprej',
          'Posli, ki se zdijo predobri',
          'Nenaklonjenost osebnim srečanjem'
        ],
      },
      documentation: {
        title: 'Bistvena dokumentacija',
        description: 'Pomembni dokumenti za preverjanje in pridobivanje med vašo transakcijo.',
        forBuyers: 'Za kupce',
        forSellers: 'Za prodajalce',
        buyerItems: [
          'Naslov vozila ali registracija',
          'Zapisi storitev in vzdrževanja',
          'Poročilo o zgodovini vozila',
          'Račun za prodajo z vsemi podrobnostmi'
        ],
        sellerItems: [
          'Preverjanje veljavnega osebnega dokumenta kupca',
          'Dokaz o zavarovanju (če se testira vožnja)',
          'Pisni kupoprodajni sporazum',
          'Potrditev plačila'
        ],
      },
      emergency: {
        title: 'Ostanite varni in prijavite težave',
        message: 'Če naletite na sumljivo dejavnost ali se počutite nevarno, zaupajte svojemu instinktu in nemudoma odidite. Prijavite vse pomisleke naši varnostni ekipi na safety@carmarket365.com',
        browseCars: 'Varno brskajte po avtomobilih',
        reportConcern: 'Prijavite varnostni pomislek',
      },
    },
  },

  // Končne popravke za preostali trdo kodirani angleški tekst
  finalFixes: {
    // Stran ExpressSell - Znamke avtomobilov, modeli in označevalci mesta
    expressSell: {
      carBrands: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 
        'Ford', 'Opel', 'Peugeot', 'Renault'
      ],
      carModels: [
        '3 serija', '5 serija', 'X3', 'X5', 'A4', 'A6', 'Golf', 'Passat'
      ],
      conditionLabel: 'Stanje *',
      conditionPlaceholder: 'Izberi stanje',
      descriptionPlaceholder: 'Opišite lastnosti vašega avtomobila, zgodovino in zakaj je odličen nakup...',
      namePlaceholder: 'Vaše polno ime',
      locationPlaceholder: 'Mesto, Država',
      uploadPhotos: 'Naloži fotografije',
      uploadPhotosDescription: 'Dodajte fotografije, da bo vaš oglas privlačnejši',
      uploadCarPhotos: 'Naloži fotografije avtomobila',
      addUpToTenPhotos: 'Dodajte do 10 fotografij. Prva fotografija bo glavna slika.',
      choosePhotos: 'Izberi fotografije',
      mainPhoto: 'Glavna fotografija',
      priceAndDescription: 'Cena in opis',
      setPriceAndDescription: 'Nastavite zahtevano ceno in opišite svoj avtomobil',
      askingPriceEuros: 'Zahtevana cena (€) *',
      priceExample: 'npr. 25.000',
      contactInformation: 'Kontaktni podatki',
      howShouldBuyersContact: 'Kako naj vas kupci kontaktirajo?',
      fullNameRequired: 'Polno ime *',
      yourFullName: 'Vaše polno ime',
      phoneNumberRequired: 'Telefonska številka *',
      emailAddressRequired: 'E-poštni naslov *',
      yourEmail: 'vasa.posta@primer.com',
      locationRequired: 'Lokacija *',
      cityState: 'Mesto, Država',
      carDetailsStep: 'Podatki o avtomobilu',
      photosStep: 'Fotografije',
      priceDescriptionStep: 'Cena in opis',
      contactInfoStep: 'Kontaktni podatki',
      backToHome: 'Nazaj na domov',
      listMyCarQuickly: 'Oglasite svoj avtomobil hitro in enostavno',
      previous: 'Prejšnji',
      next: 'Naslednji',
      listMyCar: 'Oglasite moj avtomobil',
      title: 'Express Sale',
      phonePlaceholder: 'Vaša telefonska številka',
    },
    
    // Stran DealerSignUp - Označevalci mest v obrazcih
    dealerSignUp: {
      firstNamePlaceholder: 'Janez',
      lastNamePlaceholder: 'Novak',
    },
    
    // Stran SavedCars - Označevalec mesta filtra
    savedCars: {
      filterPlaceholder: 'Filtriraj po',
      sortBy: 'Razvrsti po',
      recentlySaved: 'Nedavno shranjeni',
      priceLowToHigh: 'Cena: Od nizke do visoke',
      priceHighToLow: 'Cena: Od visoke do nizke',
      yearNewestFirst: 'Leto: Najnovejši najprej',
      yearOldestFirst: 'Leto: Najstarejši najprej',
      allCars: 'Vsi avtomobili',
      savedThisWeek: 'Shranjeni ta teden',
      back: 'Nazaj',
      noSavedCars: 'Ni shranjenih avtomobilov',
      startBrowsing: 'Začnite brskati po našem obsežnem inventarju vozil in tukaj shranite svoje priljubljene.',
      browseVehicles: 'Brskaj po vozilih',
      title: 'Shranjeni avtomobili',
      clearAll: 'Počisti vse',
      carsSaved: 'shranjenih avtomobilov',
      savedDate: 'Shranjeno',
      contact: 'Kontakt',
      view: 'Poglej',
    },
    
    // Stran UIDemo - Demo označevalci mest
    uiDemo: {
      namePlaceholder: 'Vnesite svoje ime',
      emailPlaceholder: 'Vnesite svoj e-poštni naslov',
      optionPlaceholder: 'Izberite možnost',
      enhancedUIComponentsDemo: 'Demo izboljšanih UI komponent',
      showcaseNewlyIntegrated: 'Predstavitev novo integriranih UI komponent z izboljšano funkcionalnostjo',
      buttonVariants: 'Različice gumbov',
      variousButtonStyles: 'Različni slogi in velikosti gumbov z izboljšanimi stanji fokusa',
      enhancedFormComponents: 'Izboljšane komponente obrazcev',
      formComponentsWithValidation: 'Komponente obrazcev z izboljšano validacijo in dostopnostjo',
      selectOption: 'Izberi možnost',
      thisIsPublicDisplayName: 'To je vaše javno prikazno ime.',
      submitForm: 'Pošlji obrazec',
      cardTitle: 'Naslov kartice',
      cardDescription: 'To je opis kartice z izboljšanim stilom',
      cardContentExample: 'Vsebina kartice gre tukaj z izboljšanim razmakom in tipografijo.',
      anotherCard: 'Druga kartica',
      cardsNowResponsive: 'Kartice imajo zdaj boljši odziven dizajn',
      cardAction: 'Dejanje kartice',
      enhancedFeatures: 'Izboljšane funkcije',
      improvedAccessibility: 'Izboljšana dostopnost in dizajnski žetoni',
      feature1: 'Funkcija 1',
      feature2: 'Funkcija 2',
      enhancedAccordion: 'Izboljšana harmonika',
      accordionWithAnimations: 'Harmonika z izboljšanimi animacijami in dostopnostjo',
      whatAreNewFeatures: 'Katere so nove funkcije?',
      newFeaturesAnswer: 'Izboljšane UI komponente vključujejo izboljšano dostopnost, boljša stanja fokusa, dosledne dizajnske žetone in izboljšane animacije. Vse komponente zdaj sledijo sodobnim dizajnskim vzorcem in najboljšim praksam.',
      howDoFormsWork: 'Kako delujejo obrazci?',
      formsWorkAnswer: 'Komponente obrazcev so zgrajene z integracijo React Hook Form, samodejno validacijo in izboljšanimi funkcijami dostopnosti. Zagotavljajo boljše upravljanje napak in povratne informacije uporabnikov.',
      whatAboutImages: 'Kaj je z upravljanjem slik?',
      imagesAnswer: 'Komponenta ImageWithFallback zagotavlja samodejno upravljanje napak za pokvarjene slike, prikazuje osnovni označevalec mesta, ko se slike ne naložijo. To izboljša uporabniško izkušnjo v celotni aplikaciji.',
      imageWithFallback: 'Slika z rezervo',
      demonstratesAutoFallback: 'Demonstrira samodejno rezervo za pokvarjene slike',
      workingImage: 'Delujoča slika',
      brokenImageFallback: 'Pokvarjena slika (prikaže rezervo)',
    },
  },

  // CarDetail section with mockData
  carDetail: {
    backToSearch: 'Nazaj na iskanje',
    
    // Mock Data Values
    mockData: {
      unknownMake: 'Neznana znamka',
      unknownModel: 'Neznan model',
      excellent: 'Odličen',
      gasoline: 'Bencin',
      automatic: 'Samodejni',
      unknown: 'Neznano',
      black: 'Črna',
      sedan: 'Sedan',
      frontWheelDrive: 'Sprednji pogon',
      wellMaintained: 'Dobro vzdrževano vozilo v odličnem stanju.',
      inspectionReport: 'Vozilo je bilo pregledano in izpolnjuje naše standarde kakovosti.',
      locationNotSpecified: 'Lokacija ni navedena',
      privateSeller: 'Zasebni prodajalec',
      features: {
        airConditioning: 'Klimatska naprava',
        powerSteering: 'Servo volan',
        electricWindows: 'Električna okna',
        centralLocking: 'Centralno zaklepanje',
        airbags: 'Zračne blazine',
        abs: 'ABS',
        powerBrakes: 'Servo zavore',
        amfmRadio: 'AM/FM radio',
      },
      condition: 'Odličen',
      interiorColor: 'Črna',
      drivetrain: 'Sprednji pogon',
      description: 'Dobro vzdrževano vozilo v odličnem stanju.',
      historyEvents: [
        'Kupljen nov leta 2020',
        'Redni servis na vsakih 10.000 km',
        'Brez nesreč v zgodovini',
        'En lastnik do sedaj'
      ],
      // Locations
      locations: {
        'Berlin, Germany': 'Berlin, Nemčija',
        'Munich, Germany': 'München, Nemčija',
        'Hamburg, Germany': 'Hamburg, Nemčija',
        'Frankfurt, Germany': 'Frankfurt, Nemčija',
        'Cologne, Germany': 'Köln, Nemčija',
        'Stuttgart, Germany': 'Stuttgart, Nemčija',
        'Dresden, Germany': 'Dresden, Nemčija',
        'Leipzig, Germany': 'Leipzig, Nemčija',
        'Nuremberg, Germany': 'Nürnberg, Nemčija',
        'Düsseldorf, Germany': 'Düsseldorf, Nemčija'
      },
      // Dealers
      dealers: {
        'Premium Motors': 'Premium Motors',
        'BMW Center': 'BMW Center',
        'Auto House': 'Auto House',
        'Elite Motors': 'Elite Motors',
        'Sports Cars GmbH': 'Športni Avtomobili GmbH',
        'City Motors': 'City Motors',
        'BMW Dresden': 'BMW Dresden',
        'Auto Leipzig': 'Auto Leipzig',
        'Premium Cars': 'Premium Cars',
        'BMW Düsseldorf': 'BMW Düsseldorf'
      },
      // Fuel types
      fuel: {
        'Diesel': 'Diesel',
        'Petrol': 'Bencin',
        'Electric': 'Električno',
        'Hybrid': 'Hibrid'
      },
      // Transmission types
      transmission: {
        'Automatic': 'Samodejni',
        'Manual': 'Ročni',
        'Semi-Automatic': 'Polsamodejni'
      }
    },
    
    // Car Detail UI Elements
    vehicleTitle: 'Naslov vozila',
    locationLabel: 'Lokacija',
    priceLabel: 'Cena',
    originalPrice: 'Prvotna cena',
    savingsAmount: 'Prihranjen znesek',
    certified: 'Certificirano',
    featured: 'Izpostavljeno',
    newArrival: 'Nova ponudba',
    priceReduced: 'Znižana cena',
    greatDeal: 'Odlična ponudba',
    verified: 'Preverjen',
    mainImage: 'Glavna slika',
    imageGallery: 'Galerija slik',
    viewFullscreen: 'Poglej v celozaslonskem načinu',
    imageCounter: 'od',

    actions: {
      callDealer: 'Pokličite trgovca',
      sendMessage: 'Pošljite sporočilo',
      scheduleTestDrive: 'Dogovorite testno vožnjo',
      getPreApproved: 'Pridobite predhodno odobritev',
      calculatePayment: 'Izračunajte plačilo',
      viewDealerProfile: 'Poglej profil trgovca',
      viewAllDealerCars: 'Poglej vse avtomobile trgovca',
      shareVehicle: 'Delite vozilo',
      saveToFavorites: 'Shrani med priljubljene',
      removeFromFavorites: 'Odstrani iz priljubljenih',
    },

    contact: {
      contactDealer: 'Kontaktirajte trgovca',
      preferredContactMethod: 'Prednostna metoda kontakta',
      additionalMessage: 'Dodatno sporočilo',
      sendInquiry: 'Pošljite povpraševanje',
      callNow: 'Pokličite zdaj',
      emailDealer: 'Pošljite e-pošto trgovcu',
      scheduleViewing: 'Dogovorite si ogled',
    },

    errors: {
      carNotFound: 'Avtomobil ni najden',
      failedToLoad: 'Nalaganje podrobnosti avtomobila ni uspelo',
      dsntExist: 'Avtomobil, ki ga iščete, ne obstaja ali je bil odstranjen',
      hasBeenRemoved: 'je bil odstranjen',
      backToCars: 'Nazaj na avtomobile',
    },

    features: {
      title: 'Lastnosti',
      featuresAndOptions: 'Lastnosti in oprema',
    },

    financing: {
      title: 'Možnosti financiranja',
      financingOptions: 'Možnosti financiranja',
      estimatedPayment: 'Predviden mesečni obrok',
      monthlyPayment: '/mesec',
      basedOnTerms: 'Na podlagi',
      aprForMonths: 'let pri',
      withDown: 'meseca z akontacijo',
      getPreApproved: 'Pridobite predhodno odobritev',
      calculatePayment: 'Izračunajte plačilo',
    },

    history: {
      title: 'Zgodovina vozila',
      vehicleHistory: 'Zgodovina vozila',
      listedForSale: 'Objavljeno za prodajo',
      vehicleAdded: 'Vozilo dodano na platformo',
      lastService: 'Zadnji servis',
      regularMaintenance: 'Redno vzdrževanje opravljeno',
    },

    inspection: {
      title: 'Poročilo o pregledu',
      lastUpdated: 'Zadnja posodobitev:',
      excellentCondition: 'Odlično stanje',
      pointInspection: 'Opravljen 150-točkovni pregled',
      inspectionCompleted: 'pregled opravljen',
      inspectionScore: 'Ocena pregleda',
    },

    loading: {
      loadingVehicle: 'Nalaganje vozila...',
      loadingDetails: 'Nalaganje podrobnosti...',
    },

    overview: {
      vehicleDetails: 'Podrobnosti vozila',
      mileage: 'Kilometrina',
      fuelType: 'Vrsta goriva',
      transmission: 'Menjalnik',
      year: 'Leto',
      exteriorColor: 'Zunanja barva',
      interiorColor: 'Notranja barva',
      bodyType: 'Tip karoserije',
      drivetrain: 'Vrsta pogona',
      vin: 'VIN',
      description: 'Opis',
      miles: 'milj',
    },

    seller: {
      title: 'Prodajalec',
      sellerInformation: 'Podatki o prodajalcu',
      dealerRating: 'Ocena trgovca',
      reviews: 'ocen',
      verified: 'Preverjen',
      phone: 'Telefon',
      email: 'E-pošta',
    },

    share: {
      shareVehicle: 'Delite vozilo',
      shareOnSocial: 'Delite na družbenih omrežjih',
      copyLink: 'Kopiraj povezavo',
      linkCopied: 'Povezava kopirana!',
      linkCopiedToClipboard: 'Povezava kopirana v odložišče!',
      emailToFriend: 'Pošlji prijatelju po e-pošti',
      genotrateQR: 'Generiraj QR kodo',
    },

    tabs: {
      overview: 'Pregled',
      features: 'Lastnosti',
      inspection: 'Pregled',
      history: 'Zgodovina',
    },

    testDrive: {
      scheduleTestDrive: 'Dogovorite testno vožnjo',
      preferredDate: 'Prednostni datum',
      preferredTime: 'Prednostni čas',
      contactInfo: 'Kontaktni podatki',
      additionalNotes: 'Dodatne opombe',
      submitRequest: 'Pošljite zahtevo',
    },
  },

  // Napredne funkcije
  advancedFeatures: {
    // Napredno iskanje
    advancedSearch: {
      title: 'Napredno iskanje',
      active: 'Napredno iskanje aktivno',
      filters: 'Filtri',
      clearAll: 'Počisti vse',
      searchCars: 'Išči avtomobile',
      
      // Odseki
      sections: {
        vehicleDetails: 'Podrobnosti vozila',
        priceLocation: 'Cena in lokacija',
        featuresOptions: 'Funkcije in možnosti',
      },
      
      // Polja podrobnosti vozila
      fields: {
        make: 'Znamka',
        model: 'Model',
        yearFrom: 'Leto od',
        yearTo: 'Leto do',
        priceMin: 'Min. cena',
        priceMax: 'Maks. cena',
        mileageMax: 'Maks. kilometrina',
        fuelType: 'Vrsta goriva',
        transmission: 'Menjalnik',
        bodyType: 'Vrsta karoserije',
        drivetrain: 'Pogon',
        exteriorColor: 'Zunanja barva',
        interiorColor: 'Notranja barva',
        location: 'Lokacija',
        radius: 'Radij iskanja',
        sellerType: 'Vrsta prodajalca',
      },
      
      // Oznake mest
      placeholders: {
        anyMake: 'Katerakoli znamka',
        anyModel: 'Katerikoli model',
        anyYear: 'Katerokoli leto',
        anyPrice: 'Katerakoli cena',
        anyMileage: 'Katerakoli kilometrina',
        anyFuel: 'Katerokoli gorivo',
        anyTransmission: 'Katerikoli menjalnik',
        anyBodyType: 'Katerakoli karoserija',
        anyDrivetrain: 'Katerikoli pogon',
        anyColor: 'Katerakoli barva',
        cityStateZip: 'Mesto, država ali pošta',
        anyRadius: 'Katerakoli razdalja',
        anySeller: 'Katerikoli prodajalec',
      },
      
      // Možnosti
      options: {
        mileage: {
          under10k: 'Pod 10.000 km',
          under25k: 'Pod 25.000 km',
          under50k: 'Pod 50.000 km',
          under75k: 'Pod 75.000 km',
          under100k: 'Pod 100.000 km',
          under150k: 'Pod 150.000 km',
          over100k: 'Nad 100.000 km',
        },
        radius: {
          miles25: '25 km',
          miles50: '50 km',
          miles100: '100 km',
          miles200: '200 km',
          nationwide: 'Po vsej državi',
        },
        sellerType: {
          dealer: 'Trgovec',
          private: 'Zasebni prodajalec',
          both: 'Oba',
        },
      },
      
      // Funkcije
      features: {
        airConditioning: 'Klimatska naprava',
        allWheelDrive: 'Štirikolesni pogon',
        backupCamera: 'Kamera za vzvratno vožnjo',
        blindSpotMonitoring: 'Nadzor mrtvega kota',
        bluetoothConnectivity: 'Bluetooth povezljivost',
        cruiseControl: 'Tempomat',
        heatedSeats: 'Ogrevana sedeža',
        leatherSeats: 'Usnjeni sedeži',
        navigationSystem: 'Navigacijski sistem',
        parkingAssist: 'Pomoč pri parkiranju',
        powerWindows: 'Električna okna',
        pushButtonStart: 'Zagon z gumbom',
        remoteStart: 'Daljinski zagon',
        sunroof: 'Streha',
        thirdRowSeating: 'Tretja vrsta sedežev',
        towingPackage: 'Paket za vleko',
        premiumSound: 'Premium zvočni sistem',
        adaptiveCruiseControl: 'Prilagodljivi tempomat',
        laneKeepAssist: 'Pomoč pri ohranjanju voznega pasu',
        automaticEmergencyBraking: 'Avtomatsko zasilno zaviranje',
        keylessEntry: 'Vstop brez ključa',
        ventilatedSeats: 'Prezračevani sedeži',
        wirelessCharging: 'Brezžično polnjenje',
        panoramicSunroof: 'Panoramska streha',
        memorySeats: 'Sedeži s spominom',
        headUpDisplay: 'Projekcijski zaslon',
        nightVision: 'Nočni vid',
        massagingSeats: 'Masažni sedeži',
      },
    },
    
    // Primerjava
    comparison: {
      title: 'Primerjava vozil',
      clearAll: 'Počisti vse',
      compareCars: 'Primerja avtomobile',
      compareNow: 'Primerja zdaj',
      
      // Polja primerjave
      fields: {
        price: 'Cena',
        year: 'Leto',
        mileage: 'Kilometrina',
        fuelType: 'Vrsta goriva',
        transmission: 'Menjalnik',
        drivetrain: 'Pogon',
        bodyType: 'Vrsta karoserije',
        exteriorColor: 'Zunanja barva',
        interiorColor: 'Notranja barva',
        engine: 'Motor',
        horsepower: 'Konjske moči',
        torque: 'Navor',
        fuelEconomy: 'Poraba goriva',
        seatingCapacity: 'Kapaciteta sedežev',
        features: 'Ključne funkcije',
        safety: 'Varnostne funkcije',
        warranty: 'Garancija',
        dealerInfo: 'Informacije trgovca',
      },
      
      // Vrstica primerjave
      bar: {
        compareCars: 'Primerja avtomobile',
        selected: 'izbrani',
        max: 'maks.',
        compare: 'Primerja',
        clear: 'Počisti',
      },
      
      // Ni na voljo
      notAvailable: 'N/D',
    },
    
    // Kalkulator financiranja
    financingCalculator: {
      title: 'Kalkulator financiranja',
      
      // Odseki
      sections: {
        vehicleDetails: 'Podrobnosti vozila',
        downPayment: 'Začetna vplačila',
        loanTerms: 'Pogoji posojila',
        monthlyPayment: 'Mesečna plačila',
        loanSummary: 'Povzetek posojila',
      },
      
      // Polja
      fields: {
        vehiclePrice: 'Cena vozila',
        salesTax: 'Davek na promet',
        dealerFees: 'Pristojbine trgovca',
        tradeInValue: 'Vrednost menjave',
        downPayment: 'Začetno vplačilo',
        downPaymentPercent: 'Odstotek začetnega vplačila',
        loanTerm: 'Doba posojila',
        interestRate: 'Obrestna mera (EOM)',
        monthlyPayment: 'Ocenjeno mesečno plačilo',
        totalLoanAmount: 'Skupni znesek posojila',
        totalInterest: 'Skupne obresti',
        totalCost: 'Skupni strošek',
      },
      
      // Oznake
      labels: {
        months: 'mesecev',
        years: 'let',
        percent: '%',
        perMonth: '/mesec',
        loanAmount: 'Znesek posojila',
        interestPaid: 'Plačane obresti',
        totalPaid: 'Skupno plačano',
      },
      
      // Gumbi
      buttons: {
        calculate: 'Izračunaj plačilo',
        reset: 'Resetiraj kalkulator',
        getPreApproved: 'Pridobi predodobritvı',
        findFinancing: 'Najdi možnosti financiranja',
      },
      
      // Opombe
      notes: {
        estimate: 'To je ocena. Dejanski pogoji se lahko razlikujejo.',
        disclaimer: 'Izračuni plačil so ocene in morda ne odražajo dejanskih pogojev posojila.',
        taxesVary: 'Davčne stopnje se razlikujejo glede na lokacijo.',
        additionalFees: 'Možne so dodatne pristojbine.',
      },
    },
  },

  finalFixes: {
    savedCars: {
      title: 'Shranjena vozila',
      back: 'Nazaj',
      noSavedCars: 'Še ni shranjenih vozil',
      startBrowsing: 'Začnite z brskanjem po naši ponudbi, da shranite svoja najljubša vozila za pozneje.',
      browseVehicles: 'Prebrskaj vozila',
      carsSaved: 'vozil shranjeno',
      clearAll: 'Počisti vse',
      sortBy: 'Razvrsti po',
      recentlySaved: 'Nedavno shranjena',
      priceLowToHigh: 'Cena: od najnižje do najvišje',
      priceHighToLow: 'Cena: od najvišje do najnižje',
      yearNewestFirst: 'Leto: najprej najnovejša',
      yearOldestFirst: 'Leto: najprej najstarejša',
      filterPlaceholder: 'Filter',
      allCars: 'Vsa vozila',
      savedThisWeek: 'Shranjena ta teden',
      savedDate: 'Shranjeno',
      contact: 'Kontakt',
      view: 'Podrobnosti'
    }
  },

  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'The requested item was not found.',
    unauthorized: 'You do not have permission to access this resource.',
    forbidden: 'Access to this resource is forbidden.',
    serverError: 'Server error. Please try again later.',
    validation: 'Please check your data and try again.',
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    invalidPhone: 'Please enter a valid phone number.',
    passwordTooShort: 'Password must be at least 8 characters long.',
    passwordMismatch: 'Passwords do not match.',
    fileTooBig: 'File size is too large.',
    invalidFileType: 'Invalid file type.',
    noInternetConnection: 'No internet connection.',
    sessionExpired: 'Your session has expired. Please log in again.',
    errorBoundary: {
      message: 'Something went wrong. Please try refreshing the page.',
      details: 'Podrobnosti napake',
      stackTrace: 'Stack trace:',
      refreshPage: 'Osveži stran',
    },
  },

  // About Section - comprehensive company information
  about: {
    content: {
      heroTitle: 'O CarMarket365',
      heroSubtitle: 'Povezujemo kupce in prodajalce avtomobilov z zaupanjem, transparentnostjo in izjemnim servisom od leta 2019.',
      missionTitle: 'Naša misija',
      missionDescription: 'Revolucionirati izkušnjo nakupa in prodaje avtomobilov z inovativno tehnologijo, transparentnimi praksami in brezcompromisnim servisom za stranke.',
      missionContent: 'Verjamemo, da mora biti nakup ali prodaja avtomobila razburljiva in brezskrbna izkušnja. Naša platforma združuje najnaprednejšo tehnologijo z človeškimi izkušnjami za ustvarjanje najbolj obsežnega in uporabniku prijaznega avtomobilskega trga.',
      visionTitle: 'Naša vizija',
      visionContent: 'Postati najbolj zaupanja vreden in inovativen avtomobilski trg na svetovni ravni, kjer je vsaka transakcija varna, transparentna in zadovoljiva za vse vpletene strani.',
      valuesTitle: 'Naše vrednote',
      valuesDescription: 'Načela, ki vodijo vse, kar počnemo',
      teamTitle: 'Spoznajte našo ekipo',
      teamDescription: 'Strastni strokovnjaki za CarMarket365',
      journeyTitle: 'Naša pot',
      journeyDescription: 'Od majhnega zagonskega podjetja do vodilnega avtomobilskega trga, našo pot sta vodila inovacija in zadovoljstvo strank.',
      awardsTitle: 'Nagrade in priznanja',
      awardsDescription: 'Priznani za odličnost v strežbi strankam in inovacije v avtomobilski industriji.',
      ctaTitle: 'Pripravljeni za začetek?',
      ctaDescription: 'Pridružite se tisočem zadovoljnih strank, ki so našle svoj popoln avtomobil prek CarMarket365.',
      browseCars: 'Prebrskaj avtomobile',
      joinTeam: 'Pridruži se naši ekipi',
      contactUs: 'Kontaktiraj nas',
      connect: 'Povežite se z nami',
    },
  },

  // Express Sell Section - quick car selling functionality
  expressSell: {
    title: 'Prodajte svoj avtomobil hitro',
    subtitle: 'Objavite svoj avtomobil v minutah z našim hitrim procesom prodaje',
    backToHome: 'Nazaj domov',
    step: 'Korak',
    of: 'od',
    carDetails: 'Podrobnosti vozila',
    carDetailsDescription: 'Povejte nam o svojem avtomobilu, da ustvarimo privlačno objavo',
    make: 'Znamka',
    model: 'Model',
    year: 'Leto',
    mileage: 'Kilometrina',
    fuelType: 'Vrsta goriva',
    transmission: 'Menjalnik',
    condition: 'Stanje',
    price: 'Cena',
    description: 'Opis',
    carPhotos: 'Fotografije avtomobila',
    fullName: 'Polno ime',
    phoneNumber: 'Telefonska številka',
    location: 'Lokacija',
    makeRequired: 'Znamka *',
    selectMake: 'Izberite znamko',
    modelRequired: 'Model *',
    selectModel: 'Izberite model',
    yearRequired: 'Leto *',
    selectYear: 'Izberite leto',
    mileageRequired: 'Kilometrina *',
    enterMileage: 'Vnesite kilometrino',
    kilometers: 'kilometrov',
    fuelTypeRequired: 'Vrsta goriva *',
    selectFuelType: 'Izberite vrsto goriva',
    gasolinot: 'Bencin',
    diesel: 'Dizel',
    electric: 'Električni',
    hybrid: 'Hibrid',
    transmissionRequired: 'Menjalnik *',
    selectTransmission: 'Izberite menjalnik',
    manual: 'Ročni',
    automatic: 'Avtomatski',
    conditionRequired: 'Stanje *',
    selectCondition: 'Izberite stanje',
    excellent: 'Odlično',
    veryGood: 'Zelo dobro',
    good: 'Dobro',
    fair: 'Sprejemljivo',
    priceRequired: 'Cena *',
    enterPrice: 'Vnesite želeno ceno',
    euros: 'EUR',
    descriptionOptional: 'Opis (izbirno)',
    enterDescription: 'Vnesite opis',
    descriptionPlaceholder: 'Opišite lastnosti, stanje in zgodovino svojega avtomobila...',
    photosAndContact: 'Fotografije in kontakt',
    photosAndContactDescription: 'Dodajte fotografije in svoje kontaktne podatke',
    carPhotosRequired: 'Fotografije avtomobila *',
    uploadPhotos: 'Naložite fotografije',
    photosUploaded: 'fotografij naloženih',
    contactInformation: 'Kontaktni podatki',
    fullNameRequired: 'Polno ime *',
    enterFullName: 'Vnesite svoje polno ime',
    phoneRequired: 'Telefon *',
    enterPhone: 'Vnesite telefonsko številko',
    emailAddress: 'E-poštni naslov',
    emailRequired: 'E-pošta *',
    enterEmail: 'Vnesite e-poštni naslov',
    locationRequired: 'Lokacija *',
    enterLocation: 'Vnesite svojo lokacijo',
    preview: 'Predogled',
    previewDescription: 'Preglejte svojo objavo pred objavo',
    yourListing: 'Vaša objava',
    listingPreview: 'Predogled objave',
    photos: 'Fotografije',
    contactDetails: 'Kontaktni podatki',
    previous: 'Prejšnji',
    next: 'Naprej',
    publishListing: 'Objavi objavo',
    successMessage: 'Vaše vozilo je bilo uspešno objavljeno!',
    requiredField: 'To polje je obvezno',
  },

  // Dealer Profile Section
  dealerProfilee: {
    dealerNotFound: 'Trgovec ni najden',
    dealerNotFoundMessage: 'Profil trgovca, ki ga iščete, ne obstaja.',
    viewAllDealers: 'Poglej vse trgovce',
    browseCars: 'Prebrskaj avtomobile',
    backToDealers: 'Nazaj na trgovce',
    showroom: 'trgovina',
    verifiedDealer: 'Preverjen trgovec',
    milesAway: 'milj stran',
    callDealer: 'Pokličite trgovca',
    viewInventory: 'Poglej zalogo',
    visitWebsite: 'Obiščite spletno stran',
    overview: 'Pregled',
    inventory: 'Zaloga',
    reviews: 'Ocene',
    contact: 'Kontakt',
    about: 'O nas',
    servicesOffered: 'Ponujene storitve',
    certificationsAwards: 'Certifikati in nagrade',
    quickStats: 'Hitri statistični podatki',
    established: 'Ustanovljen',
    teamSize: 'Velikost tima',
    people: 'oseb',
    recentSales: 'Nedavne prodaje',
    thisMonth: 'ta mesec',
    customerSatisfaction: 'Zadovoljstvo strank',
    responseTime: 'Odzivni čas',
    businotssHours: 'Poslovni čas',
    mondayFriday: 'Ponedeljek - Petek:',
    saturday: 'Sobota:',
    sunday: 'Nedelja:',
    currentInventory: 'Trenutna zaloga',
    hasVehiclesAvailable: 'avtomobilov na voljo',
    viewFullInventory: 'Poglej celotno zalogo',
    browseAllVehicles: 'Prebrskaj vsa razpoložljiva vozila',
    browseCarsCount: 'avtomobilov',
    customerReviews: 'Ocene strank',
    verifiedCustomerReviews: 'preverjen ocene strank',
    verifiedPurchase: 'Preverjen nakup',
    contactInformation: 'Kontaktni podatki',
    primaryPhone: 'Glavni telefon',
    emailAddress: 'E-poštni naslov',
    website: 'Spletna stran',
    physicalAddress: 'Fizični naslov',
    getDirections: 'Pridobi navodila',
    interactiveMapPlaceholder: 'Interaktivni zemljevid bi bil tukaj',
    openInGoogleMaps: 'Odpri v Google Maps',
  },

  // Express Listings Section  
  expressListings: {
    title: 'Objave za hitro prodajo',
    description: 'Zasebni prodajalci, ki iščejo hitro prodajo v vaši okolici',
    newListings: 'novo',
    searchPlaceholder: 'Išči hitre objave...',
    filterByStatus: 'Status',
    expressBadge: 'Hitro',
    sellerContact: 'Kontakt prodajalca',
    submittedOn: 'Poslano dne',
    actions: {
      contact: 'Kontaktirajte prodajalca',
      viewContact: 'Poglej kontakt',
    },
    emptyState: {
      title: 'Ni hitrih objav',
    },
    info: {
      title: 'O objavah za hitro prodajo',
      description: 'To so objave zasebnih prodajalcev, ki želijo hitro prodati svoje avtomobile. Kontaktirate jih lahko neposredno za ponudbe in pomagate olajšati prodajo v vaši okolici.',
    },
    statusBadges: {
      new: 'Novo',
      contacted: 'Kontaktirano',
      sold: 'Prodano',
      expired: 'Poteklo',
    },
    statusOptions: {
      allStatus: 'Vsi statusi',
      new: 'Novo',
      contacted: 'Kontaktirano',
      sold: 'Prodano',
      expired: 'Poteklo',
    },
  },

  // Pages Section - comprehensive static pages
  pages: {
    accessibility: {
      title: 'Dostopnost',
      subtitle: 'Naša zaveza, da bo CarMarket365 dostopen vsem.',
      backToHome: 'Nazaj domov',
      commitmentTitle: 'Naša zaveza dostopnosti',
      commitmentDescription: 'CarMarket365 se zavezuje zagotavljanju digitalne dostopnosti za osebe s posebnimi potrebami.',
      commitmentText: 'Nenehno izboljšujemo uporabniško izkušnjo za vse in uporabljamo ustrezne standarde dostopnosti, da zagotovimo enak dostop vsem uporabnikom. Naš cilj je ustvariti vključujočo platformo, ki služi vsem članom naše skupnosti.',
      visual: {
        title: 'Vizualna dostopnost',
      },
      audio: {
        title: 'Zvočna dostopnost',
      },
      motor: {
        title: 'Motorna dostopnost',
      },
      cognitive: {
        title: 'Kognitivna dostopnost',
      },
      standards: {
        title: 'Standardi, ki jih sledimo',
        description: 'Naša implementacija dostopnosti sledi mednarodno priznanim standardom in najboljšim praksam.',
        wcagGuidelines: 'WCAG 2.1 smernice',
        wcagDescription: 'Sledimo smernicam za dostopnost spletnih vsebin (WCAG) 2.1 stopnja AA, da zagotovimo, da naša platforma izpolnjuje mednarodne zahteve dostopnosti.',
        platformCompatibility: 'Kompatibilnost z asistivnimi tehnologijami',
        platformCompatibilityDescription: 'Naša platforma je testirana s priljubljenimi bralniki zaslona (JAWS, NVDA, VoiceOver), programsko opremo za glasovno prepoznavanje in drugimi asistivnimi tehnologijami.',
      },
      feedback: {
        title: 'Cenimo vaše povratne informacije',
        message: 'Če imate težave z dostopnostjo ali predloge za izboljšave, kontaktirajte našo ekipo za dostopnost na accessibility@carmarket365.com',
        returnToPlatform: 'Vrnite se na platformo',
        contactTeam: 'Kontaktirajte ekipo za dostopnost',
      },
    },
    cookiePolicy: {
      title: 'Pravilnik o piškotkih',
      subtitle: 'Spoznajte, kako uporabljamo piškotke in podobne tehnologije za izboljšanje vaše izkušnje.',
      backToHome: 'Nazaj domov',
      policyTitle: 'Naš pravilnik o piškotkih',
      policyDescription: 'Piškotke uporabljamo odgovorno za izboljšanje vaše izkušnje brskanja in zagotavljanje personaliziranih storitev.',
      policyText: 'Ta pravilnik o piškotkih pojasnjuje, kako CarMarket365 uporablja piškotke in podobne tehnologije sledenja na naši spletni strani. Verjamemo v transparentnost glede podatkov, ki jih zbiramo, in kako jih uporabljamo za izboljšanje vaše izkušnje.',
      managingPreferences: 'Upravljanje nastavitev piškotkov',
      managingPreferencesDescription: 'Imate nadzor nad piškotki, ki jih uporabljamo, in svoje nastavitve lahko upravljate kadarkoli.',
      browserSettings: 'Nastavitve brskalnika',
      platformControls: 'Kontrole platforme',
      questionsAboutCookies: 'Vprašanja o piškotkih?',
      questionsMessage: 'Če imate vprašanja o našem pravilniku o piškotkih ali potrebujete pomoč pri upravljanju nastavitev, nas kontaktirajte na cookies@carmarket365.com',
      returnToPlatform: 'Vrnite se na platformo',
      cookieSupport: 'Podpora za piškotke',
      essential: {
        title: 'Bistveni piškotki',
      },
      functional: {
        title: 'Funkcionalni piškotki',
      },
      analytics: {
        title: 'Analitični piškotki',
      },
      marketing: {
        title: 'Trženjski piškotki',
      },
    },
    imprint: {
      title: 'Pravno obvestilo',
      subtitle: 'Pravne informacije in podrobnosti podjetja za CarMarket365.',
      backToHome: 'Nazaj domov',
      legalInfoTitle: 'Pravne informacije',
      legalInfoDescription: 'Uradne informacije o podjetju in pravne podrobnosti, kot zahteva nemška zakonodaja.',
      legalInfoText: 'To pravno obvestilo (Impressum) vsebuje zakonsko zahtevane informacije o CarMarket365 GmbH v skladu z nemško zakonodajo (§ 5 TMG). Te informacije so obvezne za vse komercialne spletne strani, ki delujejo v Nemčiji.',
      questionsTitle: 'Pravna vprašanja?',
      questionsText: 'Za pravna povpraševanja, vprašanja o licenciranju ali prijavah pravnih težav kontaktirajte naš pravni oddelek na legal@carmarket365.com',
      returnToPlatform: 'Vrnite se na platformo',
    },
  },

  // Additional missing smaller sections
  accessibility: {
    wcagGuidelinots: 'Smernice WCAG',
  },
  
  actions: {
    viewReports: 'Poglej poročila',
    viewProfile: 'Poglej profil',
    editUser: 'Uredi uporabnika',
    suspendUser: 'Suspendiraj uporabnika',
    activateUser: 'Aktiviraj uporabnika',
  },
  
  admin: {
    panotl: 'Skrbniška plošča',
  },
  
  advancedSearch: {
    lastSearches: 'Zadnja iskanja',
  },
  
  allListings: {
    tableHeaders: {
      image: 'Slika',
      title: 'Naslov',
      category: 'Kategorija',
      seller: 'Prodajalec',
      created: 'Ustvarjeno',
    },
  },
  
  browseCars: {
    sortOptions: {
      arNewestFirst: 'Leto: Najnovejše prvo',
      arOldestFirst: 'Leto: Najstarejše prvo',
    },
  },
  
  comparison: {
    byear: {
      compareCars: 'Primerjaj avtomobile',
      selected: 'izbrano',
      max: 'maks.',
      compare: 'Primerjaj',
      clear: 'Počisti',
    },
    fields: {
      enginot: 'Motor',
    },
  },
  
  contact: {
    businessHours: {
      timeRange: {
        mondayFriday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    officeLocation: {
      title: 'Lokacija pisarne',
      getDirections: 'Pridobi navodila',
      address: {
        street: 'Potsdamer Platz 1',
        city: '10785 Berlin',
        country: 'Nemčija',
      },
    },
  },
  
  dealers: {
    title: 'Poiščite preverjene trgovce',
    subtitle: 'Povežite se s preverjenimi trgovci v vaši regiji. Kakovostni avtomobili, profesionalni servis in konkurenčne cene.',
    searchDealers: 'Išči trgovce',
    dealerNameOrCity: 'Ime trgovca ali mesto',
    allStates: 'Vse regije',
    allSpecialties: 'Vse specialnosti',
    sortBy: 'Razvrsti po',
    verifiedDealers: 'Preverjeni trgovci',
    carsAvailable: 'Razpoložljivi avtomobili',
    averageRating: 'Povprečna ocena',
    viewProfilee: 'Poglej profil',
  },
  
  faq: {
    name: 'Nakup avtomobilov',
    icon: 'Avtomobil',
    color: 'bg-blue-100 text-blue-600',
    content: {
      browseByCategory: 'Prebrskaj po kategorijah',
      browseDescription: 'Hitro poiščite odgovore z izbiro kategorije spodaj',
      allQuestions: 'Vsa vprašanja',
      commonQuestionsAbout: 'Pogosta vprašanja o',
      noResultsFound: 'Ni najdenih rezultatov',
      noResultsText: 'Poskusite iskati z drugimi ključnimi besedami ali prebrskajte po kategorijah.',
      clearSearch: 'Počisti iskanje',
      stillNeedHelp: 'Še vedno potrebujete pomoč?',
      callSupport: 'Pokličite podporo',
      emailUs: 'Pošljite nam e-pošto',
      liveChat: 'Živ klepet',
      available247: 'Na voljo 24/7',
      supportPhoneNumber: '+49 (0) 30 12345678',
      supportEmail: 'support@carmarket365.com',
    },
  },
  
  features: {
    title: 'Zakaj izbrati CarFinder?',
    subtitle: 'Nakup avtomobila naredimo preprost, varen in transparenten z našo obsežno platformo',
    items: {
      advancedSearch: {
        title: 'Napredno iskanje',
      },
      bestPrices: {
        title: 'Najboljše cene',
        description: 'Konkurenčne cene brez skritih stroškov. Vsakič dobite najboljšo vrednost za svoj denar.',
      },
      expertSupport: {
        title: 'Strokovna podpora',
        description: 'Naša predana ekipa je tu, da vam pomaga pri vsakem koraku, od iskanja do nakupa.',
      },
      freeDelivery: {
        title: 'Brezplačna dostava',
        description: 'Svoj avtomobil dobite dostavljen na dom v radiju 50 milj. Varen in zanesljiv transport.',
      },
      quickProcess: {
        title: 'Hiter proces',
        description: 'Dokončajte nakup v minutah z našim poenostavljenim procesom nakupa in digitalnim dokumentiranjem.',
      },
      verifiedListings: {
        title: 'Preverjene objave',
        description: 'Vsi avtomobili so pregledani in preverjeni s strani naše ekipe strokovnjakov za zagotavljanje kakovosti in pristnosti.',
      },
    },
  },
  
  // Various additional small sections
  icon: 'Ščit',
  color: 'bg-red-100 text-red-600',
  footerMessage: 'Skrbniški nadzor - ',
  
  content: {
    journotyTitle: 'Naša pot',
    journotyDescription: 'Ključni mejniki, ki so oblikovali naše podjetje skozi leta',
  },
  
  contentModeration: {
    flaggedListings: 'Označene objave',
    pendingDealerApplications: 'Čakajoče prijave trgovcev',
    disputes: 'Spori',
  },
  
  countryTest: {
    selectCountryPlaceholder: 'Izberite državo...',
  },
  
  cta: {
    bur: {
      title: 'Pripravljeni za nakup?',
      subtitle: 'Poiščite svoje idealno vozilo danes',
      button: 'Prebrskaj vozila',
    },
  },
  
  dealerSupport: {
    supportChannotls: 'Kanali podpore',
    supportChannotlsDesc: 'Več načinov za dostop do pomoči, ko jo potrebujete',
    businotssHours: 'Poslovni čas',
    PhoneHours: 'Telefonska podpora je na voljo v poslovnem času',
  },
  
  errors: {
    errorBoundary: {
      tryAgain: 'Poskusi znova',
    },
  },
  
  finalFixes: {
    expressSell: {
      PhoneNumberRequired: 'Telefonska številka *',
      PhonePlaceholder: 'Vaša telefonska številka',
      listMyCyear: 'Objavi moj avtomobil',
    },
    savedCars: {
      arOldestFirst: 'Leto: najstarejše prvo',
      arNewestFirst: 'Leto: najnovejše prvo',
    },
    uiDemo: {
      enhancedFormComponotnts: 'Izboljšani komponenti obrazca',
      formComponotntsWithValidation: 'Komponenti obrazca z izboljšano validacijo in dostopnostjo',
    },
  },
  
  legal: {
    cookies: {
      makdatang: {
        title: 'Trženjski piškotki',
      },
    },
    imprint: {
      companyDetails: {
        registerationNumber: 'Registracijska številka',
        registerationNumberValue: 'HRB 123456 B',
      },
      contactInfo: {
        PhoneValue: '+49 (0) 30 12345678',
        businotssHours: 'Poslovni čas',
        businotssHoursValue: 'Pon-Pet: 9:00 - 18:00 CET',
      },
    },
  },


  
  // Additional missing sections for 100% coverage
  
  // Complete status badges
  statusBadges: {
    pending: 'V teku',
    approved: 'Odobreno',
    rejected: 'Zavrnjeno',
    active: 'Aktiven',
    suspended: 'Suspendiran',
  },
  
  // Complete status messages
  statusMessages: {
    success: 'Uspešno',
    pending: 'V teku',
    failed: 'Neuspešno',
    joinedOn: 'Pridružen dne',
    lastLoginOn: 'Zadnja prijava',
    neverLoggedIn: 'Nikoli prijavljen',
  },
  
  // Complete system health
  systemHealth: {
    uptime: 'Čas delovanja',
    status: 'Status',
    averageResponseTime: 'Povprečni odzivni čas',
    activeSessions: 'Aktivne seje',
  },
  
  // Complete table headers
  tableHeaders: {
    user: 'Uporabnik',
    role: 'Vloga',
    status: 'Status',
    joined: 'Pridružen',
    lastActive: 'Zadnja aktivnost',
    actions: 'Dejanja',
    image: 'Slika',
    title: 'Naslov',
    category: 'Kategorija',
    seller: 'Prodajalec',
    created: 'Ustvarjeno',
    joinDate: 'Datum pridružitve',
    lastLogin: 'Zadnja prijava',
  },
  
  // Complete role badges
  roleBadges: {
    admin: 'Skrbnik',
    dealer: 'Trgovec',
    user: 'Uporabnik',
    customer: 'Stranka',
  },
  
  // Complete reports section
  reports: {
    generate: 'Generiraj',
    salesReport: 'Poročilo o prodaji',
    userReport: 'Poročilo o uporabnikih',
    trafficReport: 'Poročilo o prometu',
    revenueReport: 'Poročilo o prihodkih',
    monthlyReport: 'Mesečno poročilo',
    platformStatistics: {
      title: 'Statistike platforme',
      description: 'Ključni kazalniki platforme',
      totalRevenue: 'Skupni prihodek (ta mesec)',
      newUserRegistrations: 'Nove registracije uporabnikov',
      successfulTransactions: 'Uspešne transakcije',
      averageListingPrice: 'Povprečna cena objave',
    },
  },
  
  // Complete registered dealers
  registeredDealers: {
    totalDealers: 'Skupaj trgovcev',
    activeDealers: 'Aktivni trgovci',
    newThisMonth: 'Novi ta mesec',
    viewProfilee: 'Poglej profil',
    ars: 'let',
    specialties: {
      businotssCars: 'Poslovni avtomobili',
    },
  },
  
  // Complete recent activity
  recentActivity: {
    recentActivity: 'Nedavna dejavnost',
    paymentProcessed: 'Plačilo obdelano',
  },
  
  // Complete redirect
  redirect: {
    redirecting: 'Preusmerjanje...',
    showDetails: 'Kako smo to zaznali?',
  },
  
  // Complete UI demo
  uiDemo: {
    title: 'Demonstracija UI komponent',
    description: 'Raziščite naš oblikovalski sistem in UI komponente',
    subtitle: 'Raziščite naš oblikovalski sistem in UI komponente',
    componotnts: 'Komponente',
    forms: 'Obrazci',
    buttons: 'Gumbi',
    navigation: 'Navigacija',
    cards: 'Kartice',
  },
  
  // Complete user management
  userManagement: {
    totalUsers: 'Skupaj uporabnikov',
    activeUsers: 'Aktivni uporabniki',
    newUsers: 'Novi uporabniki',
    suspendedUsers: 'Suspendirani uporabniki',
    userActivity: 'Aktivnost uporabnikov',
    manage: 'Upravljaj',
    description: 'Poglejte in upravljajte vse uporabnike platforme',
    roleFilter: {
      placeholder: 'Vloga',
      allRoles: 'Vse vloge',
      customer: 'Stranka',
      dealer: 'Trgovec',
      admin: 'Skrbnik',
    },
  },
  
  // Enhanced sell section
  sell: {
    quickSellTitle: 'Hitra prodaja',
    quickSellDescription: 'Prodajte svoj avtomobil v minutah',
    fullListingTitle: 'Polna objava',
    fullListingDescription: 'Ustvarite podrobno objavo z vsemi lastnostmi',
    professionalPhotos: 'Profesionalne fotografije',
    marketAnalysis: 'Analiza trga',
    advertisingBoosts: 'Oglaševalski dvigi',
    sellWithUs: 'Prodajte z nami',
    whySellWithUs: 'Zakaj prodajati z nami',
    sellDescription: 'Dosegnite več kupcev z našo platformo',
    getStarted: 'Začnite',
    instantValuation: 'Takojšnja vrednotitev',
    instantValuationDescription: 'Pridobite takojšnjo oceno vrednosti svojega avtomobila',
    scheduleAppraisal: 'Dogovorite ocenjevanje',
    scheduleAppraisalDescription: 'Rezervirajte termin za profesionalno ocenjevanje',
    sellFast: 'Prodajte hitro',
    sellFastDescription: 'Hitre prodaje zasebnim kupcem',
    guaranteedSale: 'Garantirana prodaja',
    guaranteedSaleDescription: 'Mi kupimo vaš avtomobil neposredno',
    howItWorks: 'Kako deluje',
    step1: 'Vnesite podrobnosti',
    step1Description: 'Povejte nam o svojem avtomobilu',
    step2: 'Naložite fotografije',
    step2Description: 'Dodajte kakovostne fotografije',
    step3: 'Objavite objavo',
    step3Description: 'Vaš avtomobil gre na trg',
    step4: 'Povežite se s kupci',
    step4Description: 'Prejemajte povpraševanja kupcev',
    
    benefits: {
      noFees: 'Brez skritih stroškov',
      wideReach: 'Širok doseg',
      expertSupport: 'Strokovna podpora',
      securepayments: 'Varna plačila',
      qualityBuyers: 'Kakovostni kupci',
      fastProcess: 'Hiter proces',
    },
    
    bodyTypes: {
      sedan: 'Sedan',
      suv: 'SUV',
      truck: 'Tovornjak',
      coupe: 'Kupe',
      hatchback: 'Hatchback',
      convertible: 'Kabriolet',
      wagon: 'Karavan',
      van: 'Minibus',
      crossover: 'Crossover',
    },
    
    colors: {
      black: 'Črna',
      white: 'Bela',
      silver: 'Srebrna',
      gray: 'Siva',
      red: 'Rdeča',
      blue: 'Modra',
      green: 'Zelena',
      brown: 'Rjava',
      gold: 'Zlata',
      orange: 'Oranžna',
      purple: 'Vijolična',
      yellow: 'Rumena',
    },
    
    conditions: {
      new: 'Novo',
      likeNew: 'Kot novo',
      excellent: 'Odlično',
      veryGood: 'Zelo dobro',
      good: 'Dobro',
      fair: 'Sprejemljivo',
      poor: 'Slabo',
    },
    
    drivetrains: {
      fwd: 'Sprednji pogon',
      rwd: 'Zadnji pogon',
      awd: 'Pogon na vsa kolesa',
      fourwd: '4x4 pogon',
    },
    
    fuelTypes: {
      gasoline: 'Bencin',
      diesel: 'Dizel',
      electric: 'Električni',
      hybrid: 'Hibrid',
      pluginHybrid: 'Priključni hibrid',
      flexFuel: 'Flex gorivo',
      cng: 'CNG',
      lpg: 'LPG',
    },
    
    placeholders: {
      PhoneExample: '(031) 123-456',
    },
  },
  
  // Complete final fixes
  finalFixes: {
    expressSell: {
      PhoneNumberRequired: 'Telefonska številka *',
      PhonePlaceholder: 'Vaša telefonska številka',
      listMyCyear: 'Objavi moj avtomobil',
    },
    savedCars: {
      arOldestFirst: 'Leto: najstarejše prvo',
      arNewestFirst: 'Leto: najnovejše prvo',
    },
    uiDemo: {
      enhancedFormComponotnts: 'Izboljšani komponenti obrazca',
      formComponotntsWithValidation: 'Komponenti obrazca z izboljšano validacijo in dostopnostjo',
    },
  },
  
  // Content section
  content: {
    journotyTitle: 'Naša pot',
    journotyDescription: 'Ključni mejniki, ki so oblikovali naše podjetje skozi leta',
  },
  
  // Content moderation
  contentModeration: {
    flaggedListings: 'Označene objave',
    pendingDealerApplications: 'Čakajoče prijave trgovcev',
    disputes: 'Spori',
  },
  
  // Country test
  countryTest: {
    selectCountryPlaceholder: 'Izberite državo...',
  },
  
  // CTA section
  cta: {
    bur: {
      title: 'Pripravljeni za nakup?',
      subtitle: 'Poiščite svoje idealno vozilo danes',
      button: 'Prebrskaj vozila',
    },
  },
  
  // Dealer support
  dealerSupport: {
    supportChannotls: 'Kanali podpore',
    supportChannotlsDesc: 'Več načinov za dostop do pomoči, ko jo potrebujete',
    businotssHours: 'Poslovni čas',
    PhoneHours: 'Telefonska podpora je na voljo v poslovnem času',
  },
  
  // Additional missing items
  icon: 'Ščit',
  color: 'bg-red-100 text-red-600',
  footerMessage: 'Skrbniški nadzor - ',
  
  accessibility: {
    wcagGuidelinots: 'Smernice WCAG',
  },
  
  actions: {
    viewReports: 'Poglej poročila',
    viewProfile: 'Poglej profil',
    editUser: 'Uredi uporabnika',
    suspendUser: 'Suspendiraj uporabnika',
    activateUser: 'Aktiviraj uporabnika',
  },
  
  admin: {
    panotl: 'Skrbniška plošča',
  },
  
  advancedSearch: {
    lastSearches: 'Zadnja iskanja',
  },
  
  browseCars: {
    sortOptions: {
      arNewestFirst: 'Leto: Najnovejše prvo',
      arOldestFirst: 'Leto: Najstarejše prvo',
    },
  },
  
  comparison: {
    byear: {
      compareCars: 'Primerjaj avtomobile',
      selected: 'izbrano',
      max: 'maks.',
      compare: 'Primerjaj',
      clear: 'Počisti',
    },
    fields: {
      enginot: 'Motor',
    },
  },
  
  contact: {
    businessHours: {
      timeRange: {
        mondayFriday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    officeLocation: {
      title: 'Lokacija pisarne',
      getDirections: 'Pridobi navodila',
      address: {
        street: 'Potsdamer Platz 1',
        city: '10785 Berlin',
        country: 'Nemčija',
      },
    },
  },
  
  errors: {
    errorBoundary: {
      tryAgain: 'Poskusi znova',
    },
  },
  
  legal: {
    cookies: {
      makdatang: {
        title: 'Trženjski piškotki',
      },
    },
    imprint: {
      companyDetails: {
        registerationNumber: 'Registracijska številka',
        registerationNumberValue: 'HRB 123456 B',
      },
      contactInfo: {
        PhoneValue: '+49 (0) 30 12345678',
        businotssHours: 'Poslovni čas',
        businotssHoursValue: 'Pon-Pet: 9:00 - 18:00 CET',
      },
    },
  },


  // Car Detail Section - comprehensive car viewing page
  carDetail: {
    vehicleTitle: 'Naslov vozila',
    locationLabel: 'Lokacija',
    priceLabel: 'Cena',
    originalPrice: 'Prvotna cena',
    savingsAmount: 'Prihranjen znesek',
    certified: 'Certificirano',
    featured: 'Izpostavljeno',
    newArrival: 'Nova ponudba',
    priceReduced: 'Znižana cena',
    greatDeal: 'Odlična ponudba',
    verified: 'Preverjen',
    mainImage: 'Glavna slika',
    imageGallery: 'Galerija slik',
    viewFullscreen: 'Poglej v celozaslonskem načinu',
    imageCounter: 'od',

    actions: {
      callDealer: 'Pokličite trgovca',
      sendMessage: 'Pošljite sporočilo',
      scheduleTestDrive: 'Dogovorite testno vožnjo',
      getPreApproved: 'Pridobite predhodno odobritev',
      calculatePayment: 'Izračunajte plačilo',
      viewDealerProfile: 'Poglej profil trgovca',
      viewAllDealerCars: 'Poglej vse avtomobile trgovca',
      shareVehicle: 'Delite vozilo',
      saveToFavorites: 'Shrani med priljubljene',
      removeFromFavorites: 'Odstrani iz priljubljenih',
    },

    contact: {
      contactDealer: 'Kontaktirajte trgovca',
      preferredContactMethod: 'Prednostna metoda kontakta',
      additionalMessage: 'Dodatno sporočilo',
      sendInquiry: 'Pošljite povpraševanje',
      callNow: 'Pokličite zdaj',
      emailDealer: 'Pošljite e-pošto trgovcu',
      scheduleViewing: 'Dogovorite si ogled',
    },

    errors: {
      carNotFound: 'Avtomobil ni najden',
      failedToLoad: 'Nalaganje podrobnosti avtomobila ni uspelo',
      dsntExist: 'Avtomobil, ki ga iščete, ne obstaja ali je bil odstranjen',
      hasBeenRemoved: 'je bil odstranjen',
      backToCars: 'Nazaj na avtomobile',
    },

    features: {
      title: 'Lastnosti',
      featuresAndOptions: 'Lastnosti in oprema',
    },

    financing: {
      title: 'Možnosti financiranja',
      financingOptions: 'Možnosti financiranja',
      estimatedPayment: 'Predviden mesečni obrok',
      monthlyPayment: '/mesec',
      basedOnTerms: 'Na podlagi',
      aprForMonths: 'let pri',
      withDown: 'meseca z akontacijo',
      getPreApproved: 'Pridobite predhodno odobritev',
      calculatePayment: 'Izračunajte plačilo',
    },

    history: {
      title: 'Zgodovina vozila',
      vehicleHistory: 'Zgodovina vozila',
      listedForSale: 'Objavljeno za prodajo',
      vehicleAdded: 'Vozilo dodano na platformo',
      lastService: 'Zadnji servis',
      regularMaintenance: 'Redno vzdrževanje opravljeno',
    },

    inspection: {
      title: 'Poročilo o pregledu',
      lastUpdated: 'Zadnja posodobitev:',
      excellentCondition: 'Odlično stanje',
      pointInspection: 'Opravljen 150-točkovni pregled',
      inspectionCompleted: 'pregled opravljen',
      inspectionScore: 'Ocena pregleda',
    },

    loading: {
      loadingVehicle: 'Nalaganje vozila...',
      loadingDetails: 'Nalaganje podrobnosti...',
    },

    overview: {
      vehicleDetails: 'Podrobnosti vozila',
      mileage: 'Kilometrina',
      fuelType: 'Vrsta goriva',
      transmission: 'Menjalnik',
      year: 'Leto',
      exteriorColor: 'Zunanja barva',
      interiorColor: 'Notranja barva',
      bodyType: 'Tip karoserije',
      drivetrain: 'Vrsta pogona',
      vin: 'VIN',
      description: 'Opis',
      miles: 'milj',
    },

    seller: {
      title: 'Prodajalec',
      sellerInformation: 'Podatki o prodajalcu',
      dealerRating: 'Ocena trgovca',
      reviews: 'ocen',
      verified: 'Preverjen',
      phone: 'Telefon',
      email: 'E-pošta',
    },

    share: {
      shareVehicle: 'Delite vozilo',
      shareOnSocial: 'Delite na družbenih omrežjih',
      copyLink: 'Kopiraj povezavo',
      linkCopied: 'Povezava kopirana!',
      linkCopiedToClipboard: 'Povezava kopirana v odložišče!',
      emailToFriend: 'Pošlji prijatelju po e-pošti',
      genotrateQR: 'Generiraj QR kodo',
    },

    tabs: {
      overview: 'Pregled',
      features: 'Lastnosti',
      inspection: 'Pregled',
      history: 'Zgodovina',
    },

    testDrive: {
      scheduleTestDrive: 'Dogovorite testno vožnjo',
      preferredDate: 'Prednostni datum',
      preferredTime: 'Prednostni čas',
      contactInfo: 'Kontaktni podatki',
      additionalNotes: 'Dodatne opombe',
      submitRequest: 'Pošljite zahtevo',
    },
  },

  // Express Sell Section - quick car selling functionality
  expressSell: {
    title: 'Prodajte svoj avtomobil hitro',
    subtitle: 'Objavite svoj avtomobil v minutah z našim hitrim procesom prodaje',
    backToHome: 'Nazaj domov',
    step: 'Korak',
    of: 'od',
    carDetails: 'Podrobnosti vozila',
    carDetailsDescription: 'Povejte nam o svojem avtomobilu, da ustvarimo privlačno objavo',
    makeRequired: 'Znamka *',
    selectMake: 'Izberite znamko',
    modelRequired: 'Model *',
    selectModel: 'Izberite model',
    yearRequired: 'Leto *',
    selectYear: 'Izberite leto',
    mileageRequired: 'Kilometrina *',
    enterMileage: 'Vnesite kilometrino',
    kilometers: 'kilometrov',
    fuelTypeRequired: 'Vrsta goriva *',
    selectFuelType: 'Izberite vrsto goriva',
    gasolinot: 'Bencin',
    diesel: 'Dizel',
    electric: 'Električni',
    hybrid: 'Hibrid',
    transmissionRequired: 'Menjalnik *',
    selectTransmission: 'Izberite menjalnik',
    manual: 'Ročni',
    automatic: 'Avtomatski',
    conditionRequired: 'Stanje *',
    selectCondition: 'Izberite stanje',
    excellent: 'Odlično',
    veryGood: 'Zelo dobro',
    good: 'Dobro',
    fair: 'Sprejemljivo',
    priceRequired: 'Cena *',
    enterPrice: 'Vnesite želeno ceno',
    euros: 'EUR',
    descriptionOptional: 'Opis (izbirno)',
    enterDescription: 'Vnesite opis',
    descriptionPlaceholder: 'Opišite lastnosti, stanje in zgodovino svojega avtomobila...',
    photosAndContact: 'Fotografije in kontakt',
    photosAndContactDescription: 'Dodajte fotografije in svoje kontaktne podatke',
    carPhotosRequired: 'Fotografije avtomobila *',
    uploadPhotos: 'Naložite fotografije',
    photosUploaded: 'fotografij naloženih',
    contactInformation: 'Kontaktni podatki',
    fullNameRequired: 'Polno ime *',
    enterFullName: 'Vnesite svoje polno ime',
    phoneRequired: 'Telefon *',
    enterPhone: 'Vnesite telefonsko številko',
    emailAddress: 'E-poštni naslov',
    emailRequired: 'E-pošta *',
    enterEmail: 'Vnesite e-poštni naslov',
    locationRequired: 'Lokacija *',
    enterLocation: 'Vnesite svojo lokacijo',
    preview: 'Predogled',
    previewDescription: 'Preglejte svojo objavo pred objavo',
    yourListing: 'Vaša objava',
    listingPreview: 'Predogled objave',
    photos: 'Fotografije',
    contactDetails: 'Kontaktni podatki',
    previous: 'Prejšnji',
    next: 'Naprej',
    publishListing: 'Objavi objavo',
    successMessage: 'Vaše vozilo je bilo uspešno objavljeno!',
    requiredField: 'To polje je obvezno',
  },

  // Navigacija
  navigation: {
    backToHome: 'Nazaj na Domov',
  }
};