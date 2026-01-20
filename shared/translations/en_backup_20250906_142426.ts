import { TranslationStrings } from '../translations';

export const enTranslations: TranslationStrings = {
  common: {
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    back: 'Back',
    notxt: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    location: 'Location',
    currency: 'USD',
    ar: 'Year',
    make: 'Make',
    model: 'Model',
    images: 'Images',
    yes: 'Yes',
    no: 'No',
    menu: 'Menu',
    vehicle: 'Vehicle',
    default: 'Default',
    secondary: 'Secondary',
    outlinot: 'Outlinot',
    ghost: 'Ghost',
    link: 'Link',
    destructive: 'Destructive',
    small: 'Small',
    large: 'Large',
    option: 'Option',
    sending: 'Sending...',
    processing: 'Processing...',
    errorLoadingImage: 'Error loading image',
  },

  // Forms - validation, labels, placeholders, actions
  forms: {
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      phonotRequired: 'Phonot number is required',
      messageRequired: 'Message is required',
      loanAmountRequired: 'Loan amount is required',
      annualIncomeRequired: 'Annual income is required',
      creditScoreRequired: 'Credit rating is required',
      employmentStatusRequired: 'Employment status is required',
      arsAtJobRequired: 'Current job tenure is required',
      monthlyExpensesRequired: 'Monthly expenses are required',
      arInvalid: 'Invalid year',
      mileageNegative: 'Mileage cannot be notgative',
    },
    labels: {
      fullName: 'Full Name',
    },
    placeholders: {
      enterPhonot: 'Enter your phonot number',
      contactMessage: 'Hello, I am interested in the {ar} {make} {model}. Please contact me for more details.',
    },
    actions: {
    },
  },

  // Modals - titles, descriptions, success messages
  modals: {
    contactCar: {
      successTitle: 'Message sent successfully!',
      successDescription: 'Your message has been sent to the seller. They will contact you soon.',
    },
    financing: {
      badges: {
        financingAvailable: 'Financing Available',
      },
      employmentStatus: {
        rthesered: 'Rthesered',
        student: 'Student',
        unotmplod: 'Unotmployed',
      },
        enterLoanAmount: 'Enter loan amount',
        enterAnnualIncome: 'Enter annual income',
        enterMonthlyExpenses: 'Enter monthly expenses',
        selectRange: 'Select range',
        selectStatus: 'Select status',
        selectDuration: 'Select duration',
      },
      },
    },
    scheduleTestDrive: {
      badge: 'Test Drive Available',
        specialRequests: 'Special Requests',
      },
        selectDate: 'Select preferred date',
        selectTime: 'Select preferred time',
        enterRequests: 'Any special requests or questions?',
      },
        dateRequired: 'Please select a preferred date',
        timeRequired: 'Please select a preferred time',
      },
      success: {
      },
        schedule: 'Schedule Test Drive',
        scheduling: 'Scheduling...',
      },
    },
    tradeIn: {
      tabs: {
        vehicleInfo: 'Vehicle Information',
      },
      form: {
        },
          selectMake: 'Select make',
          selectModel: 'Select model',
          selectYear: 'Select year',
          enterMileage: 'Enter mileage in kilometers',
          selectCondition: 'Select overall condition',
          selectAccidentHistory: 'Select accident history',
          selectServiceHistory: 'Select of service history',
          selectModifications: 'Select modifications'
        },
        options: {
          condition: {
            excellent: 'Excellent',
            good: 'Good',
            fair: 'Fair',
          },
          accident: {
            multiple: 'Multiple accidents'
          },
          serviceHistory: {
            complete: 'Complete of service history',
            partial: 'Partial of service history',
            nonot: 'No of service history'
          },
          modifications: {
            minor: 'Minor modifications',
            major: 'Major modifications'
          }
        }
      },
        makeRequired: 'Please select a make',
        modelRequired: 'Please select a model',
        arRequired: 'Please select a year',
        mileageRequired: 'Please enter mileage',
        mileageInvalid: 'Please enter valid mileage',
        conditionRequired: 'Please select overall condition',
        accidentRequired: 'Please select accident history',
        serviceRequired: 'Please select of service history',
        modificationsRequired: 'Please select modifications'
      },
      results: {
        estimatedValue: 'Estimated Trade-In Value',
        range: 'Range',
        confidence: 'Confidence Level',
        confidenceLevels: {
          high: 'High',
          medium: 'Copperium',
          low: 'Low'
        },
        factors: {
          positive: 'Positive factors',
          notgative: 'Negative factors',
          notutral: 'Neutral factors'
        },
        recommendations: {
          maintenance: 'Consider addressing maintenance issues before trading',
          timing: 'Consider maket timing for your specific make and model'
        },
        disclaimer: {
          text: 'This is an estimated cost based on the provided information. Actual trade-in values may vary depending on dealer policies, current maket conditions, and physical inspection of the vehicle. We recommend obtaining quotes from multiple dealers for the most accurate assessment.'
        }
      },
        calculate: 'Calculate Estimate',
        recalculate: 'Recalculate',
        getQuotes: 'Get Dealer Quotes',
        startOver: 'Start Over',
      },
      loading: {
        calculating: 'Calculating your estimate...',
        fetchingData: 'Fetching maket data...'
      }
    },
    },
  },

  hero: {
    searchButton: 'Find Cars',
    vehicleTypes: {
      motorbikes: 'Motorbikes',
    },
    searchForm: {
      priceFrom: 'Price From',
      priceTo: 'Price To',
      arFrom: 'Year From',
      anyMake: 'Any Make',
      anyModel: 'Any Model',
      minYear: 'Min Year',
      anyYear: 'Any Year',
      anyMileage: 'Any Mileage',
      maxMileage: 'Max Mileage',
    },
    availableCars: 'Over 50,000 cars available nationwide',
  },

  // Features Section
  features: {
    items: {
      verifiedListings: {
      },
      advancedSearch: {
      },
      bestPrices: {
      },
      freeDelivery: {
      },
      quickProcess: {
      },
      expertSupport: {
      },
    },
  },

  // Last Search Section
  lastSearch: {
    viewMore: 'Show more',
    matchPercentage: '% match',
  },

  // Interesting Suggestions Section
  suggestions: {
    seeMore: 'Show more suggestions',
    daysAgo: 'd ago',
  },

  // Popular Brands Section
  brands: {
    carsCount: 'cars',
  },

  header: {
    signIn: 'Sign In',
    signOut: 'Sign Out',
    myAccount: 'My Account',
    home: 'Home',
    sellCar: 'Sell Car',
    help: 'Help',
  },

  cars: {
    noResults: 'No cars found matching your criteria',
    resultsCount: 'Found {count} vehicles',
    contactSeller: 'Contact Seller',
    removeFromFavorites: 'Remove from Favorites',
    specifications: 'Specifications',
    fuelType: 'Fuel type',
    bodyType: 'Body Type',
    exteriorColor: 'Exterior Color',
    interiorColor: 'Interior color',
    vin: 'VIN Number',
    makeOffer: 'Make Offer',
    featured: 'Featured Listings',
    handpicked: 'Handpicked Cars for You',
    discover: 'Discover our carefully selected premium vehicles',
    allCars: 'All Cars',
    newCars: 'New Cars',
    certifiedPreOwnotd: 'Certified Pre-Ownotd',
    luxury: 'Luxury',
  },

  filters: {
    priceMin: 'Min Price',
    priceMax: 'Max Price',
    arRange: 'Year Range',
    arMin: 'Min Year',
    arMax: 'Max Year',
    mileageMax: 'Max Mileage',
  },

  auth: {
    signUp: 'Sign Up',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    loginWith: 'Or continue with',
    registerAs: 'Register as',
    privatePerson: 'Private Person',
    dealerAccount: 'Dealer Account',
    userType: 'I am',
    
    // SignIn page specific
    signInToAccount: 'Sign in to your account',
    enterCredentials: 'Enter your credentials to access your account',
    privatePersonDescription: 'Buy or sell your car',
    dealerDescription: 'Professional seller',
    pro: 'Pro',
    enterYourEmail: 'Enter your email',
    enterYourPassword: 'Enter your password',
    signingIn: 'Logging in...',
    orContinueWith: 'Or continue with',
    createPrivateAccount: 'Create Private Account',
    registerAsDealer: 'Register as Dealer',
    dealerBenotfits: 'Dealer Benotfits',
    professionalDashboard: '• Professional dealer dashboard',
    customerTracking: '• Customer inquiry tracking',
    enhancedVisibility: '• Enhanced listing visibility',
    analyticsInsights: '• Analytics and insights',
    
    // UserSignUp page specific
    createYourAccount: 'Create your account',
    joinThousands: 'Join thousands of car enthusiasts',
    privateAccount: 'Private Account',
    buyAndSellCars: 'Buy and sell cars, save favorites and manage listings',
    createStrongPassword: 'Create a strong password',
    confirmYourPassword: 'Confirm your password',
    mustBeCharacters: 'Must be at least 8 characters',
    and: 'and',
    creatingAccount: 'Creating account...',
    wantSellAsDealer: 'Want to sell cars as a dealer?',
    createDealerAccount: 'Create Dealer Account',
    joinCommunityText: 'By creating an account, you join our community of car enthusiasts and agree to our platform rules.',
    
    // Error messages for signup
    pleaseAgreeTerms: 'Please agree to the terms',
    passwordsNotMatch: 'Passwords do not match',
    passwordMinLength: 'Password must contain at least 8 characters',
    registerationFailed: 'Registration failed',
    
    // Password strength indicator
    passwordStrength: {
      levels: {
        weak: 'Weak',
        strong: 'Strong',
      },
      requirements: {
        length: 'At least 8 characters',
        uppercase: 'Onot uppercase letter',
        lowercase: 'Onot lowercase letter',
        number: 'Onot number',
        special: 'Onot special character (!@#$%^&*)',
      },
    },
    
    // Social login
    socialLogin: {
      google: {
      },
      facebook: {
      },
    },
    
    // Access control
    accessDenied: {
      signInRequired: 'Please sign in to access this page.',
      insufficientPermissions: 'You don\'t have permission to access this page.',
      redirectingToDashboard: 'Redirecting to your dashboard...',
    },
    
    // DealerSignUp page specific
    backToSignIn: 'Back to Sign In',
    dealerRegistration: 'Dealer Registration',
    joinCarMarketDealer: 'Join CarMarket365 as a professional dealer',
    businotssInformation: 'Businotss Information',
    tellUsAboutBusinotss: 'Tell us about your dealership or businotss',
    businotssNamePlaceholder: 'Your Company Name LLC',
    businotssType: 'Businotss Type',
    selectBusinotssType: 'Select businotss type',
    carDealership: 'Car Dealership',
    usedCarLot: 'Used Car Lot',
    autoTrader: 'Auto Trader',
    carBroker: 'Car Broker',
    rentalCompany: 'Rental Company',
    other: 'Other',
    vatNumber: 'VAT Number',
    vatNumberPlaceholder: 'US123456789',
    taxId: 'Tax ID',
    arEstablished: 'Year Established',
    businotssDescription: 'Description biznotsa',
    businotssDescriptionPlaceholder: 'Describe your businotss, specializations and of services...',
    contactPerson: 'Contact Person',
    primaryContactInfo: 'Primary contact information for your businotss',
    position: 'Dolzhnost',
    positionPlaceholder: 'e.g., Ownotr, Sales Manager',
    businotssEmail: 'Korporativ email',
    businotssEmailPlaceholder: 'businotss@example.com',
    dealershipLocation: 'Physical location of your dealership',
    streetAddress: 'Ulich adres',
    streetAddressPlaceholder: 'Businotss Center St., 123',
    cityPlaceholder: 'Moscow',
    stateRegion: 'Region/Oblast',
    stateRegionPlaceholder: 'Moskovsk oblast',
    postalCode: 'Postal Code',
    postalCodePlaceholder: '101000',
    country: 'Country',
    selectCountry: 'Select Country',
    germany: 'Germany',
    austria: 'Austria',
    switzerland: 'Switzerland',
    nottherlands: 'Netherlands',
    belgium: 'Belgium',
    france: 'France',
    italy: 'Italy',
    spain: 'Spain',
    createSecureDealerAccount: 'Create your secure dealer account',
    termsAndAgreements: 'Terms and Agreements',
    acceptTermsConditions: 'I accept the Terms and Conditions',
    agreeToTermsAndDealer: 'You agree to our Terms of Service and Dealer Agreement.',
    acceptPrivacyPolicy: 'I accept the Privacy Policy',
    understandDataCollection: 'You understand how we collect and use your data.',
    receiveMarkthesengCommunications: 'Ya khotel by by accessingat makthesengov kommunikatsii',
    getUpdatesFeatures: 'Get updates about new features and business opportunities.',
    alreadyHaveAccountSignIn: 'Uzhe est account? Voyti',
    
    // Validation error messages for dealer signup
    businotssNameRequired: 'Nazvanie company required',
    businotssTypeRequired: 'Tip biznotsa required',
    vatNumberRequired: 'NDS nomer required',
    firstNameRequired: 'Name is required',
    lastNameRequired: 'Last Name Required',
    streetRequired: 'Ulich adres required',
    cityRequired: 'Gorod required',
    postalCodeRequired: 'Postal Code required',
    passwordRequired: 'Password required',
    confirmPasswordRequired: 'Please confirm password',
    validEmailRequired: 'Please enter a valid email address',
    validVatNumber: 'Please enter a valid VAT number (e.g. US123456789)',
    passwordMinEightChars: 'Password dolzhen soderzhat not menote 8 simvolov',
    acceptTermsRequired: 'You must accept terms and conditions',
    acceptPrivacyRequired: 'Vy dolzhny prinyat politiku privacyi',
  },

  sell: {
    sellYourCar: 'Sell Your Vehicle',
    carInformation: 'Car Information',
    setPrice: 'Set Price',
    contactInformation: 'Contact Information',
    publish: 'Publish',
    draft: 'Sokhranit kak draft',
    optional: 'Optsionalno',
    addPhotos: 'Dobavit photos',
    removePhoto: 'Remove Photo',
    mainPhoto: 'Main Photo',
    additionalInfo: 'Additional Information',
    sellerNotes: 'Zametki prodavtsa',
    
    // Step titles
    steps: {
      vehicleType: 'Tip vehiclea',
      basicInfo: 'Basic Information',
    },
    
    // Vehicle type selection
      car: {
      },
      truck: {
      },
      motorbike: {
      },
    },
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'Kakoy tip vehiclea vy prodaete?',
      basicInfoDescription: 'Tell us about your {vehicleType}',
      additionalDetails: 'Dopolniteln detali',
      additionalDetailsDescription: 'Add more details about your {vehicleType}',
      photosAndContact: 'Photos and Contact Information',
    },
    
    // Form fields and labels
    fields: {
      askingPrice: 'Zaprashivaem pricesa',
      featuresAndOptions: 'Specifications i optsii',
      vehiclePhotos: 'Fotografii vehiclea',
      emailAddress: 'Adres elektronnoy pochty',
    },
    
    // Placeholders
      selectFuelType: 'Select Fuel Type',
      selectTransmission: 'Select Transmission',
      exteriorColorExample: 'e.g., white, black, silver',
      interiorColorExample: 'e.g., black, beige, gray',
      descriptionExample: 'Opishite sostoyanie vashego vehiclea, istoriyu i dopolniteln detali...',
      yourFullName: 'Your full name',
      phonotExample: '(8) 123-456-78',
      emailExample: 'vash.email@primer.ru',
      cityState: 'Gorod, Oblast',
      yourName: 'Your name',
      yourPhonotNumber: 'Your nomer phonota',
      cityCountry: 'Gorod, Strana',
      enterAskingPrice: 'Vvedite zhelaemuyu pricesu',
      describeYourVehicle: 'Opishite vash car...',
      selectFuel: 'Select Fuel Type',
      selectTransmissionType: 'Select Transmission Type',
      choosePhotos: 'Choose Photos',
    },
    
    // Headers
      photosAndContactInfo: 'Photos and Contact Information',
      uploadVehiclePhotos: 'Upload Vehicle Photos',
    },
    
    // Button labels
    buttons: {
      notxtStep: 'Sleduyushchiy shag',
      createListing: 'Sozdat listing',
    },
    
    // Preview section
    preview: {
      yourVehicle: 'Your vehicle',
      milesLabel: 'kilometers',
      priceLabel: 'Price',
      photosCount: '{count} fotografi{plural}',
      photo: 'ya',
    },
    
    // Photo upload
    photos: {
      instruction: 'Add up to 10 high-quality photos of your vehicle. The first photo will be the main image in search results.',
      selected: '{count} photo{plural} selected',
    },
    
    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'EUR', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    
    // Fuel types
    fuelTypes: {
      gasolinot: 'Gasoline',
      hybrid: 'Hybrid',
      diesel: 'Diesel',
      pluginHybrid: 'Plug-in Hybrid',
      flexFuel: 'Flex Fuel',
      cng: 'KPG',
      lpg: 'GBO',
    },
    
    // Transmissions
    transmissions: {
      automatic: 'Automatic',
      manual: 'Manual',
      cvt: 'CVT',
    },

    // Body Types
    bodyTypes: {
      sedan: 'Sedan',
      suv: 'SUV',
      coupe: 'Coupe',
      hatchback: 'Hatchback',
      convertible: 'Convertible',
      wagon: 'Wagon',
      van: 'Van',
      crossover: 'Crossover',
    },

    // Drivetrains
    drivetrains: {
      fwd: 'Front-Wheel Drive',
      rwd: 'Rear-Wheel Drive',
      awd: 'All-Wheel Drive',
      fourwd: 'Drive type 4x4',
    },

    // Colors
    colors: {
      black: 'Black',
      white: 'White',
      silver: 'Silver',
      gray: 'Gray',
      red: 'Red',
      blue: 'Blue',
      green: 'Green',
      brown: 'Brown',
      gold: 'Gold',
      orange: 'Orange',
      purple: 'Purple',
      yellow: 'Yellow',
    },
    
    // Conditions
    conditions: {
      likeNew: 'Like New',
      veryGood: 'Very Good',
      poor: 'Plokh',
    },
    
    // Features list
      airConditioning: 'Air Conditioning',
      leatherSeats: 'Leather Seats',
      heatedSeats: 'Heated Seats',
      sunroof: 'Sunroof',
      gpsNavigation: 'GPS navigation',
      backupCamera: 'Backup Camera',
      bluetooth: 'Bluetooth',
      usbPorts: 'USB Portsy',
      keylessEntry: 'Keyless Entry',
      remoteStart: 'Udalen zapusk',
      cruiseControl: 'Cruise Control',
      parkingSensors: 'Parktronik',
      blindSpotMonitoring: 'Blind Spot Monitoring',
    },
  },

  countries: {
    northMacedonia: 'North Macedonia',
    albania: 'Albania',
    kosovo: 'Kosovo',
    slovenia: 'Slovenia',
    latvia: 'Latvia',
    global: 'Global',
    chooseCountry: 'Choose Your Country',
    changeCountry: 'Izmenit country',
    detectedLocation: 'Detected location',
    currentSite: 'Tekushchiy sayt',
    localBenotfits: 'Mestn preimushchestva',
    localCurrency: 'Mestn valyuta i pricesy',
    localLanguages: 'Support rodn yazyka',
    localDealers: 'Mestn dealers i inventar',
    regionalFeatures: 'Regionaln osobennotss',
  },

  redirect: {
    welcome: 'Dobro pozhalovat v CarMarket365!',
    detectedFrom: 'My opredelili, chto vy poseshchaete iz',
    redirectMessage: 'You will be redirected to our {country} site for a better local experience, or you can choose another country.',
    continueToSite: 'Pereyti na sayt {country}',
    chooseDifferent: 'Vybrat another country',
    localBenotfitsTitle: 'Local Benefits for {country}',
    howDetected: 'How did we detect this?',
    hideDetails: 'Hide details',
    showDetails: 'How did we detect this?',
    changeAnytime: 'Vy can change preference strany v any time v header.',
    countrySpecificExperience: 'Each country site offers localized content, pricing and language options for a better experience.',
    adminTestingMode: 'Administrator/Testing Mode',
    adminNotAvailable: 'Administrator/Testing Mode - notaccessen dlya clientov',
    selectCountryToContinue: 'Pozhaluysta, vyberite youru country, to prodolzhit. Eto opredelit vash mest sayt, yazyk i valyutu.',
  },

    shareListng: 'Share Listing',
    yourPhonot: 'Your Phonot',
    interestedIn: 'I am interested in',
    share: {
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied!',
      shareViaEmail: 'Share via Email',
      shareOnWhatsApp: 'Share on WhatsApp',
      twitter: 'Twitter',
    },
  },

  footer: {
    aboutUs: 'Your trusted maket for quality used cars. Find your ideal car among thousands of listings.',
    quickLinks: 'Quick Links',
    searchCars: 'Search Cars',
    adminPanotl: 'Admin Panotl',
    myDashboard: 'My Dashboard',
    signInToAccess: 'Sign in to access dashboard',
    followUs: 'Follow Us',
    subscribeNewsletter: 'Subscribe to Newsletter',
    subscribe: 'Subscribe',
    copyright: 'Copyright',
    allRightsReserved: 'All Rights Reserved',
  },

  errors: {
    genotric: 'Something went wrong. Please try again.',
    nottwork: 'Network error. Please check your connection.',
    unauthorized: 'You do not have permission to access this resource.',
    forbidden: 'Access to this resource is forbidden.',
    serverError: 'Server error. Please try again later.',
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    invalidPhonot: 'Please enter a valid phonot number.',
    passwordTooShort: 'Password must be at least 8 characters long.',
    passwordMismatch: 'Passwords do not match.',
    fileTooBig: 'File size is too large.',
    invalidFileType: 'Invalid file type.',
    noInternottConnection: 'No internott connection.',
    sessionExpired: 'Your session has expired. Please log in again.',
    errorBoundary: {
      details: 'Error Details',
      stackTrace: 'Stack trace:',
      refreshPage: 'Refresh Page',
    },
  },

    saved: 'Uspeshno sokhranotno!',
    updated: 'Uspeshno obnovleno!',
    deleted: 'Uspeshno udaleno!',
    sent: 'Uspeshno otpravleno!',
    published: 'Uspeshno opublikovano!',
    registered: 'Uspeshno registered!',
    loggedIn: 'Uspesh vkhod v sistemu!',
    loggedOut: 'Uspesh vod iz sistemy!',
    passwordReset: 'Password reset email sent!',
    subscribed: 'Uspeshno podpisan!',
    contactSent: 'Kontaktn soobshchenie otpravleno!',
    favoriteAdded: 'Dobavleno v izbrann!',
    favoriteRemoved: 'Udaleno iz izbrann!',
  },

  admin: {
    panotl: 'Panotl administratora',
    dashboard: 'Panotl upravleniya administratora',
  },

  pages: {
    helpCenter: 'Tsentr support',
    feedback: 'Obratn svyaz',
    carInsurance: 'Avtostrakhovanie',
    underConstruction: 'V razrabotke',
    underConstructionMessage: 'Dann stranitsa nakhoditsya v razrabotke. My userdno rabotaem nad sozdaniem potryasayushchikh funktsiy. Pozhaluysta, zaydite pozzhe ili prodolzhite izuchat nashu glavnuyu stranitsu.',
    backToHome: 'Vernutsya na glavnuyu',
    contactUs: 'Svyazhites s nami',
    
    // Usloviya of service
    termsOfService: {
      termsAndConditions: 'Usloviya i polozheniya',
      termsDescription: 'Pozhaluysta, carefully review s these terms before ispolzovaniem our platform.',
      userResponsibilities: 'Obyazannotss polzovatelya',
      userResponsibilitiesList: [
        'Predostavlyat tochnuyu informatsiyu',
        'Podderzhivat uvazhiteln obshchenie',
        'Soblyudat vse primenim zakony',
        'Zashchishchat uchetn these vashego accounta'
      ],
      platformRules: 'Pravila platform',
      platformRulesList: [
        'Zapreshcheny moshennicheskie listings',
        'Chestn opisaniya vehiclen vehicles',
        'Professionaln obshchenie',
        'Uvazhenie k privacyi otherikh users'
      ],
      serviceLimitations: 'Ogranicheniya services',
      serviceLimitationsList: [
        'Dostupnost platform not guaranteed',
        'Tekhnichesk obsluzhivanie mozhet vyzvat prostoy',
        'Ogranichenn otvetstvennost za deystviya users',
        'Otsutstvie garantiy na kontent trthesekh lits'
      ],
      disputeResolution: 'Razreshenie sporov',
      disputeResolutionList: [
        'Pooshchryaetsya pryam obshchenie',
        'Dostupno posrednichestvo platform',
        'Opredeleny protsedury eskalatsii',
        'Sokhranyayutsya pravov vehiclesa zashchity'
      ],
      additionalTerms: 'Dopolniteln vazhn terms',
      additionalTermsDescription: 'Klyuchev polozheniya, reguliruyushchie ispolzovanie our platform.',
      accountManagement: 'Upravlenie accountom',
      accountManagementList: [
        'Odin account na cheloveka',
        'Trebovaniya k safetyi parolya',
        'Politiki priostanovki accounta',
        'Khranotnie these posle prekrashcheniya'
      ],
      intellectualProperty: 'Intellektualn sobstvennost',
      intellectualPropertyList: [
        'Vladenie kontentom platform',
        'Prava na polzovatelskiy kontent',
        'Rekomendatsii po ispolzovaniyu torgov marok',
        'Politiki narusheniya avtorskikh prav'
      ],
      questionsAboutTerms: 'Voprosy ob thesekh termskh?',
      questionsText: 'Esli u vas est questions ob thesekh termskh ili vam nuzhny razyasnotniya po kakim-libo polozheniyam, please, obratites k our yuridicheskoy komande po adresu legal@carmaket365.com',
      returnToPlatform: 'Vernutsya na platformu',
      contactLegalTeam: 'Svyazatsya s yuridicheskoy komandoy'
    },

    // Politika privacyi
    privacyPolicy: {
      ourPrivacyCommitment: 'Nashi obyazatelstva po privacyi',
      commitmentDescription: 'V CarMarket365 my priverzheny zashchite vashey privacyi i obespecheniyu safetyi vashey lichnoy informatsii.',
      overviewText: 'Dann policy privacyi obyasnyaet, kak my sobiraem, ispolzuem, raskryvaem i zashchishchaem vashu informatsiyu pri ispolzovanii our platform car market. My priverzheny podderzhaniyu vysochayshikh standartov zashchity privacyi i safetyi these.',
      dataSecurity: 'Bezopasnost these',
      dataSecurityList: [
        'Shifrovanie otraslev standarta',
        'Bezopasn beforeacha these',
        'Regulyarn audity safetyi',
        'Ogranichen kontrol accessa'
      ],
      transparency: 'Prozrachnost',
      transparencyList: [
        'Chetkie praktiki sbora these',
        'Otkrytost ob ispolzovanii these',
        'Regulyarn obnovleniya politiki',
        'Uvedomlenie users ob izmenotniyakh'
      ],
      userRights: 'Prava users',
      userRightsList: [
        'Dostup k vashim daedm',
        'Pravo na ispravlenie informatsii',
        'Zaprosy na udalenie these',
        'Otkaz ot kommunikatsiy'
      ],
      dataMinimization: 'Minimization these',
      dataMinimizationList: [
        'Sbor tolko notobkhodim these',
        'Ispolzovanie po naznacheniyu',
        'Automatic istechenie these',
        'Regulyarn ochistka these'
      ],
      informationWeCollect: 'Information, kotoruyu my sobiraem',
      informationDescription: 'My sobiraem informatsiyu, kotoruyu vy predostavlyaete napryamuyu i avtomaticheski pri ispolzovanii our platform.',
      personalInformation: 'Lichn information',
      personalInformationList: [
        'Imya i kontaktn these',
        'Information dlya registeratsii accounta',
        'Predpochteniya v obshchenii',
        'Information profilya'
      ],
      usageData: 'Dann ob ispolzovanii',
      usageDataList: [
        'Dann vzaimodeystviya s veb-saytom',
        'Istoriya search i viewa',
        'Information ob ustroystve i brauzere',
        'Dann o mestopolozhenii (pri razreshenii)'
      ],
      questionsAboutPrivacy: 'Voprosy o privacyi?',
      privacyQuestionsText: 'Esli u vas est questions ob etoy politike privacyi ili nashikh praktikakh obrabotki these, please, obratites k our komande po privacyi po adresu privacy@carmaket365.com',
      contactPrivacyTeam: 'Svyazatsya s komandoy po privacyi'
    },

    // Page-zaglushka
    placeholder: {
    },

    // Chasto asked questions
    faq: {
      browseByCategory: 'Search po kategoriyam',
      allQuestions: 'Vse questions',
      stillNeedHelp: 'Nuzhna dopolniteln help?',
      stillNeedHelpDescription: 'Ne can find to, chto looking for? Nasha team support ready help.',
      callSupport: 'Pozvonit v sluzhbu support',
      emailUs: 'Napisat nam',
      liveChat: 'Zhivoy chat',
      available247: 'Dostupno 24/7',
      noResultsFound: 'Resulty not naydeny',
      clearSearch: 'Ochistit poisk',
      commonQuestionsAbout: 'Chasto asked questions o',
      
      categories: {
        buying: 'Pokupka carey',
        selling: 'Prodazha carey',
      },

      buyingFaqs: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ],

      sellingFaqs: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ],

      financingFaqs: [
        {
        },
        {
        },
        {
        },
        {
          question: 'V chem raznitsa mezhdu previewnoy kvalifikatsiey i previewnym approvediem?',
        },
        {
        }
      ],

      safetyFaqs: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ],

      accountFaqs: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ]
    }
  },

  // Browse Cars Page
  browseCars: {
    filtersButton: 'Pokazat filtery',
    sortBy: 'Sortirovat po',
    sortOptions: {
      relevance: 'Relevantnost',
      priceLowToHigh: 'Tsena: ot nizkoy k vysokoy',
      priceHighToLow: 'Tsena: ot vysokoy k nizkoy',
      arNewestFirst: 'God: nov snachala',
      arOldestFirst: 'God: star snachala',
      mileageLowToHigh: 'Probeg: ot mal k bolsh',
      mileageHighToLow: 'Probeg: ot bolsh k mal',
      addedRecently: 'Nedavno dobavlenn',
    },
    viewOptions: {
      grid: 'Setka',
      list: 'Spisok',
    },
      clearAll: 'Clear All',
      apply: 'Primenit',
      makeModel: 'Marka i model',
      priceRange: 'Tsenovoy diapazon',
      from: 'ot',
      to: 'do',
      withinRadius: 'v radiuse',
      color: 'Color',
      minPrice: 'Minimaln pricesa',
      maxPrice: 'Maksimaln pricesa',
      noMin: 'Bez min.',
      noMax: 'Bez maks.',
      anyLocation: 'Vvedite gorod ili pochtovyy indeks',
      miles: 'mili',
      any: 'Any',
    },
      showing: 'sootvetstvuyushchikh vashim kriteriyam',
      of: 'iz',
      noResultsMessage: 'Poprobuyte change terms search',
      tryDifferentFilters: 'Poprobuyte otherie filtery',
      endOfResults: 'Konotts rezultatov',
    },
    carCard: {
      viewDetails: 'Posmotret detali',
      saveToFavorites: 'Sokhranit v izbrann',
      certified: 'Sertifitsirovann',
      newArrival: 'Nov postuplenie',
      priceReduced: 'Tsena snizhena',
      kmAbbrev: 'km',
      miAbbrev: 'mi',
      showPhonot: 'Pokazat phonot',
      hidePhonot: 'Skryt phonot',
      callNow: 'Pozvonit seychas',
      sendMessage: 'Otpravit soobshchenie',
      scheduleTour: 'Zapisatsya na osmotr',
      reportListing: 'Pozhalovatsya na listing',
      shareListing: 'Podelitsya listingm',
    },
    searchSuggestions: {
      recentSearches: 'Nedavnie poiski',
      clearRecent: 'Ochistit notdavnie',
      popularSearches: 'Populyarn poiski',
      suggestedBrands: 'Rekomenduem marki',
      suggestedModels: 'Rekomenduem model',
      noRecentSearches: 'Net notdavnikh poiskov',
    },
    errorStates: {
      nottworkError: 'Oshibka sthese',
      tryAgain: 'Poprobovat snova',
      contactSupport: 'Svyazatsya s podderzhkoy',
    },
  },

  // Advanced Search
    saveSearch: 'Save Search',
    
    // Page sections
    sections: {
      basicInformation: {
      },
      technicalSpecs: {
      },
      featuresEquipment: {
      },
      preferencesAndCertifications: {
        title: 'Preferences Predpochteniya i Certifications Certifications',
      },
      vehicleDetails: {
      },
      priceLocation: {
      },
      featuresOptions: {
      },
    },
    
    // Form fields
      colorPreference: 'Color Preference',
      certifications: 'Certifications',
      searchRadius: 'Search Radius',
      maxYear: 'Max Year',
    },
    
    // Placeholders
      enterModel: 'Enter Model Name',
      anyType: 'Any Type',
      selectBodyType: 'Select Body Type',
      selectDrivetrain: 'Select Drivetrain',
      numberOfDoors: 'Number of doors',
      numberOfSeats: 'Number of seats',
      anyColor: 'Any Color',
      selectPreferredColor: 'Select Preferred Color',
      cityOrPostalCode: 'City or Postal Code',
      cityStateOrZip: 'City, State or ZIP',
      anyCondition: 'Any Condition',
      anyDistance: 'Any Distance',
      allSellers: 'All Sellers',
    },
    
    // Range labels
    ranges: {
      mileageRange: 'Mileage Range (km)',
    },
    
    // Distance options
    distances: {
      nationwide: 'Nationwide',
      '25': '25 km',
      '50': '50 km',
      '100': '100 km',
      '200': '200 km',
      '250': '250 miles',
      '500': '500 miles',
    },
    
    // Mileage options
    mileage: {
      under10k: 'Under 10,000 km',
      under25k: 'Under 25,000 km',
      under50k: 'Under 50,000 km',
      under75k: 'Under 75,000 km',
      under100k: 'Under 100,000 km',
      under150k: 'Under 150,000 km',
    },
    
    // Seller types
    sellerTypes: {
      dealersOnly: 'Dealers Only',
      privateOnly: 'Private Sellers Only',
      certifiedOnly: 'Certified Dealers Only',
    },
    
    // Door options
    doors: {
      '2': '2 Doors',
      '3': '3 Doors',
      '4': '4 Doors',
      '5': '5 Doors',
    },
    
    // Seat options
    seats: {
      '2': '2 Seats',
      '4': '4 Seats',
      '5': '5 Seats',
      '7': '7 Seats',
      '8+': '8+ Seats',
    },
    
    // Staticheskie these carey dlya advancedn search
    staticVehicleData: {
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citrn', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
        'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van',
        'Minivan', 'Crossover', 'Compact', 'Subcompact', 'Mid-size', 'Full-size',
        'Sports Car', 'Luxury', 'Economy', 'Hybrid'
      ],
        'Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid', 'Natural Gas', 'Propane',
        'Flex Fuel', 'Hydrogen', 'Biodiesel', 'E85 Ethanol'
      ],
        'Manual', 'Automatic', 'CVT', 'Semi-Automatic', 'Dual Clutch', '6-Speed Manual',
        '7-Speed Automatic', '8-Speed Automatic', '9-Speed Automatic', '10-Speed Automatic'
      ],
        'Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', '4WD', 
        'Part-Time 4WD', 'Full-Time 4WD', 'Electronic All-Wheel Drive', 'Manualiy pol privod'
      ],
        'Black', 'White', 'Silver', 'Gray', 'Blue', 'Maroon', 'Red', 'Green', 'English', 
        'Brown', 'Gold', 'Yellow', 'Orange', 'Purple', 'Tan', 'English', 'Copper',
        'Pearl White', 'Metallic Silver', 'Deep Blue', 'Racing Red', 'Forest Green',
        'Charcoal', 'Navy', 'Beige'
      ],
        'New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair', 'Used', 
        'Certified Pre-Owned', 'Restored', 'Refurbished', 'Salvage', 'Vintage'
      ],
        'Air Conditioning', 'Leather Seats', 'Navigation System', 'Bluetooth', 'USB Ports',
        'Backup Camera', 'Parking Sensors', 'Heated Seats', 'Moonroof', 'Alloy Wheels',
        'Cruise Control', 'ABS', 'Stability Control', 'Airbags',
        'Remote Start', 'Keyless Entry', 'Power Windows', 'Power Steering', 'Tinted Windows',
        'Premium Sound System', 'Satellite Radio', 'CD Player', 'MP3 Player', 'DVD Player',
        'Wireless Charging', 'Apple CarPlay', 'Android Auto', 'Lane Departure Warning',
        'Blind Spot Monitoring', 'Collision Warning', 'Automatic ekstrenn tormozhenie',
        'Adaptive Cruise Control', 'Parking Assist', 'Backup Camera', '360-Degree Camera',
        'Heated Steering Wheel', 'Cooled Seats', 'Ventilated Seats', 'Memory Seats',
        'Power Adjustable Seats', 'Third Row Seating', 'Folding Rear Seats', 
        'Cargo Cover', 'Roof Rack', 'Towing Package', 'Running Boards', 'Side Steps'
      ],
        'Certified Pre-Owned', 'Manufacturer Warranty', 'Extended Warranty', 
        'Roadside Assistance', 'Vehicle History Report', 'Multi-Point Inspection',
        'Emissions Test', 'Safety Inspection', 'Dealer Certified', 'Third Party Certified',
        'Carfax Verified', 'AutoCheck Verified', 'No Accidents', 'One Owner',
        'Service Records Available', 'Maintenance Up to Date'
      ]
    },
  },

  // Contact Us Page
  contact: {
    },
    departments: {
      emailAddresses: 'Adresa elektronnoy pochty',
      mainOffice: 'Glav ofis',
    },
    departmentTypes: {
      salesDepartment: 'Otdel sell',
      financingDepartment: 'Otdel financingovaniya',
      genotralInquiries: 'Obshchie questions',
      salesQuestions: 'Voprosy po sellam',
    },
    hours: {
      timeRange: {
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    office: {
      address: {
      },
      getDirections: 'Poluchit napravleniya',
    },
      inquiryType: {
        label: 'Chem my mozhem help?',
          dealer: 'Partnotrstvo dealers',
          support: 'Tekhnichesk podderzhka',
        },
      },
        email: 'Adres elektronnoy pochty',
      },
      },
      submitButton: 'Otpravit soobshchenie',
    },
    },
    quickHelp: {
        buyingGuide: {
        },
        sellingGuide: {
        },
        },
        safetyTips: {
        },
      },
    },
  },

  dealerProfilee: {
    dealerNotFound: 'Diler not nayden',
    dealerNotFoundMessage: 'Profile dealera, kotoryy vy looking for, not sushchestvuet.',
    viewAllDealers: 'Posmotret all dealers',
    backToDealers: 'Vernutsya k dealeram',
    showroom: 'dealership',
    verifiedDealer: 'Proveren dealer',
    milesAway: 'mil otsyuda',
    callDealer: 'Pozvonit dealeru',
    viewInventory: 'Prosmotr inventarya',
    visitWebsite: 'Postheset veb-sayt',
    inventory: 'Inventar',
    reviews: 'Reviews',
    servicesOffered: 'Predlagaem servicesi',
    certificationsAwards: 'Sertifikaty i nagrady',
    quickStats: 'Bystr statistika',
    established: 'Osnovan',
    teamSize: 'Razmer komandy',
    people: 'person',
    recentSales: 'Nedavnie selli',
    thisMonth: 'v etom mesyatse',
    customerSatisfaction: 'Udovletvorennost clientov',
    responseTime: 'Vremya otveta',
    currentInventory: 'Tekushchiy inventar',
    hasVehiclesAvailable: 'carey v nalichii',
    viewFullInventory: 'Posmotret pol inventar',
    browseAllVehicles: 'Prosmotret vse accessn cari ot',
    browseCarsCount: 'cars',
    customerReviews: 'Otzyvy clientov',
    verifiedCustomerReviews: 'verifyenn otzyvov clientov',
    verifiedPurchase: 'Proverenn buya',
    primaryPhonot: 'Primary Phone',
    website: 'Veb-sayt',
    physicalAddress: 'Fizicheskiy adres',
    interactiveMapPlaceholder: 'Interaktivn karta byla by zdes',
    openInGoogleMaps: 'Otkryt v Google Maps',
  },

  dealerSupport: {
    subtitle: 'Spetsialn podderzhka dlya registeredn dealers. Poluchite help s vashimi listingsmi, upravleniem accountom i funktsiyami platform.',
    supportCenter: 'Tsentr support dealers',
    supportCenterDescription: 'Kompleksn podderzhka dlya nashikh registeredn dealerskikh partnotrov.',
    quickActions: 'Bystr deystviya',
    accountManagementDesc: 'Upravlyayte nastroykami i predpochteniyami vashego dealersk accounta',
    manageAccount: 'Upravlyat accountom',
    listingHelp: 'Help s listingsmi',
    listingHelpDesc: 'Poluchite help s vashimi listingsmi carey i inventarem',
    getListingHelp: 'Poluchit help s listingsmi',
    analyticsReports: 'Analitika i reporty',
    analyticsReportsDesc: 'Prosmatrivayte metriki proizvoditelnotss i genotriruyte reporty',
    viewAnalytics: 'Posmotret analitiku',
    contactSupportDesc: 'Svyazhites s our komandoy support',
    supportChannotls: 'Kanaly support',
    supportChannotlsDesc: 'Neskolko sposobov by accessingit help, kogda ona vam nuzhna',
    phonotNumber: '1-800-555-0199',
    startChat: 'Nachat chat',
    mondayFriday: 'Ponotdelnik - Pyatnitsa: 8:00 - 20:00 EST',
    weekendHours: 'Subbota: 9:00 - 17:00 EST',
    phonotHours: 'Telefonn podderzhka accessna v rabochie chasy',
    emailHours: 'Email podderzhka: 24/7 otvet v techenie 4 chasov',
    chatHours: 'Zhivoy chat accessen v rabochie chasy',
    commonTopics: 'Obshchie temy',
    commonTopicsDesc: 'Chasto zaprashivaem temy support',
    gettingStartedDesc: 'Vvedenie nov dealers i nastroyka accounta',
    listingOptimization: 'Optimization obyavleniy',
    listingOptimizationDesc: 'Sovety po uluchsheniyu vidimosti vashikh obyavleniy',
    paymentBilling: 'Platezhi i billing',
    paymentBillingDesc: 'Voprosy po billingu i problemy s paymentami',
  },

  },

  // Lichn panotl
  privateDashboard: {
    yourListings: 'Youri listings',
    expressSale: 'Express Sale',
    express: 'Express Sale',
    settings: 'Settings',
    remove: 'Delete',
    startNewSearch: 'Nachat novyy poisk',
    viewMyListings: 'Posmotret moi listings',
    savedOn: 'Saved',
    welcomeBack: 'Dobro pozhalovat obratno',
    manageExperience: 'upravlyayte svoim opytom na carnom rynke',
    // Last Search Tab
    lastSearches: 'Poslednie poiski',
    recentSearchHistory: 'Your recent search history and saved searches',
    newSearch: 'Novyy poisk',
    resultsFound: 'rezultatov naydeno',
    searchedOn: 'Iskali',
    searchAgain: 'Iskat snova',
    viewResults: 'Posmotret rezultaty',
    // User Listings Tab
    carsListedForSale: 'Cari, kotor vy vystavili na sellu',
    createNewListing: 'Sozdat nov listing',
    newListing: 'Nov listing',
    views: 'views',
    listed: 'Razmeshcheno',
    // Express Sale Tab
    expressSaleListings: 'Express Sale Listings',
    quickSaleRequests: 'Zaprosy bystroy selli, otpravlenn dealeram',
    newExpressSale: 'New Express Sale',
    newExpress: 'Novyy ekspress',
    underReview: 'Na rassmotrenii',
    submittedOn: 'Otpravleno',
    // Contact Details Tab
    contactDetails: 'Kontaktn these',
    manageContactInfo: 'Upravlyayte svy kontaktnoy informatsiey i profilem',
    updateProfileeDetails: 'Obnovit these profilya',
    changePhoto: 'Izmenit fotografiyu',
    saveChanges: 'Sokhranit izmenotniya',
    // Account Settings Tab
    accountSettings: 'Settings accounta',
    manageAccountPreferences: 'Upravlyayte nastroykami accounta i privacyi',
    notifications: 'Notifications',
    configureNotifications: 'Nastroyte kak by accessingat uvedomleniya',
    emailNotifications: 'Uvedomleniya po elektronnoy pochte',
    receiveUpdatesViaEmail: 'Poluchat obnovleniya po elektronnoy pochte',
    newListingsAlerts: 'Opoveshcheniya o nov listingskh',
    notifyNewCarsMatching: 'Poluchat uvedomleniya o nov caryakh, sootvetstvuyushchikh vashim searchm',
    priceDropAlerts: 'Opoveshcheniya o snizhenii prices',
    notifyPriceDrops: 'Get notifications when prices on saved cars drop',
    inquiryNotifications: 'Uvedomleniya o zaprosakh',
    notifyInquiries: 'Poluchat uvedomleniya o zaprosakh po vashim listingsm',
    privacySettings: 'Settings privacyi',
    controlPrivacyPreferences: 'Kontroliruyte svoi nastroyki privacyi i obmena these',
    profileVisibility: 'Vidimost profilya',
    makeProfileeVisible: 'Sdelat vash profil vidimym dlya otherikh users',
    showContactInfo: 'Pokazat kontaktnuyu informatsiyu',
    displayContactOnListings: 'Otobrazhat vashu kontaktnuyu informatsiyu v listingskh',
    dataAnalytics: 'Analitika these',
    helpImproveService: 'Pomogite uluchshit nash servis s helpyu analitiki of use',
    manageAccountAndData: 'Upravlyayte svoim accountom i these',
    downloadMyData: 'Skachat moi these',
    changePassword: 'Izmenit parol',
    deleteAccount: 'Udalit account',
    // Success/Error Messages
    profileUpdatedSuccessfully: 'Profile updated successfully!',
    carRemovedFromSaved: 'Car removed from saved!',
    listingDeletedSuccessfully: 'Obyavlenie successfully udaleno!'
  },

  // Saved cars
  savedCars: {
    filterBySavedDate: 'Filterovat po date sokhranotniya',
    filterByPriceRange: 'Filterovat po price range',
    newest: 'Newest',
    oldest: 'Oldest',
    browseVehicles: 'Prosmotret vehiclen vehiclesa',
    removeFromSaved: 'Remove from saved',
    scheduleViewing: 'Zaplanirovat osmotr',
    compareVehicles: 'Sravnit vehiclen vehiclesa',
    selectToCompare: 'Select Vehicles for Comparison',
    compare: 'Sravnit',
    clearSelection: 'Ochistit vybor',
  },

  // Prodat vehiclen vehicleso
  sellVehicle: {
    stepIndicator: 'Shag {current} iz {total}',
    photosUpload: 'Zagruzka fotografiy',
    pricing: 'Tsenoobrazovanie',
    review: 'Obzor i publikation',
    
    // Basic Information
    km: 'km',
    conditionOptions: {
    },
    },
    transmissionTypes: {
      semiautomatic: 'Semi-Automatic'
    },
    
    // Detali vehiclen vehiclesa
    enginotSize: 'Enginot Size',
    horsepower: 'Loshadin sily',
    safetyFeatures: 'Funktsii safetyi',
    
    // Fotografii
    uploadPhotos: 'Zagruzit photos',
    dragDropPhotos: 'Peretashchite i otpustite photos syuda, ili nazhmite dlya vybora',
    maxPhotos: 'Maksimum 20 fotografiy',
    photoRequirements: 'Trebovaniya k fotografiyam',
    requirementsList: [
      'Vysok kachestvo (minimum 800x600 pikseley)',
      'Format JPG, PNG ili WebP',
      'Maksimum 5MB na fotografiyu',
      'Fotografii so all storon vehiclen vehiclesa',
      'Fotografii interera',
      'Fotografii dvigatelya i odometra'
    ],
    
    // Tsenoobrazovanie
    maketValue: 'Rynochn stoimost',
    priceAnalysis: 'Analiz pricesy',
    compthesetive: 'Konkurentosposobn',
    aboveMarket: 'Vyshe rynka',
    belowMarket: 'Nizhe rynka',
    notgotiable: 'Dvorn',
    contactPreferences: 'Predpochteniya po kontaktam',
    allowPhonotCalls: 'Razreshit phonotn zvonki',
    allowMessages: 'Razreshit soobshcheniya',
    allowEmails: 'Razreshit elektronn pisma',
    
    // Obzor
    reviewListing: 'Prosmotret listing',
    publishListing: 'Opublikovat listing',
    agreeToTerms: 'Soglasen s terms of use',
    
    // Soobshcheniya
    listingPublished: 'Obyavlenie successfully opublikovano!',
    draftSaved: 'Draft saved',
    errorSaving: 'Oshibka pri sokhranotnii',
  },

  // Home stranitsa
  indexPage: {
      searchPlaceholder: 'Search po make, model ili location...',
    },
    quickFilters: {
      allVehicles: 'Vse vehiclen vehiclesa',
      trucks: 'Gruzoviki',
      motorcycles: 'Motorcycles',
      electric: 'Elektricheskie',
    },
    stats: {
      vehiclesAvailable: 'Dostupn vehiclen vehiclesa',
      verifiedDealers: 'Proverenn dealers',
      arsExperience: 'Let experience'
    },
    featuredListings: {
      viewAll: 'Posmotret vse'
    },
    howItWorks: {
        {
        },
        {
        },
        {
        }
      ]
    },
    popularBrands: {
    },
    testimonials: {
    },
    newsletter: {
    },
    cta: {
      bur: {
        button: 'Prosmotret vehiclen vehiclesa'
      },
      seller: {
      }
    }
  },

  // Stranitsy oshibok
    notFound: {
      heading: 'Page not naydena',
      goHome: 'Pereyti na glavnuyu',
      goBack: 'Vernutsya nazad',
      supportMessage: 'Esli vy schitaete, chto eto oshibka, please, contact s our komandoy support.'
    }
  },

  // Yuridicheskie stranitsy
  legal: {
    accessibility: {
      commitmentTitle: 'Nasha priverzhennost accessibilityi',
      commitmentText: 'My schitaem, chto u all dolzhen byt rav access k our platforme, notzavisimo ot ikh sposobnostey.',
      
      visual: {
          'Vysokiy kontrast dlya luchshey chitaemosti',
          'Reguliruemyy razmer teksta',
          'Clear and structured navigation',
          'Alternativn opisaniya izobrazheniy'
        ]
      },
      motor: {
          'Poln navigation s klaviatury',
          'Bolshie oblasti dlya klika',
          'Dostatochno vremeni dlya deystviy',
          'Prost i ponyatn elementy upravleniya'
        ]
      },
      audio: {
          'Transkriptsii dlya audiokontenta',
          'Subtitry dlya video',
          'Tekstov alternativy zvukam',
          'Sovmestimost s programmami chteniya s ekrana'
        ]
      },
      cognitive: {
          'Prostoy i ponyat yazyk',
          'Poshagov instruktsii',
          'Polezn soobshcheniya ob oshibkakh',
          'Logichesk organization kontenta'
        ]
      },
      
      standardsTitle: 'Standarty accessibilityi',
      wcagTitle: 'Sootvetstvie WCAG 2.1',
      compatibilityTitle: 'Sovmestimost s vspomogateln tekhnologiyami',
      compatibilityDescription: 'Nasha platforma protestirovana s programmami chteniya s ekrana i otherimi vspomogateln tekhnologiyami.',
      
      feedbackTitle: 'Otzyvy o accessibilityi?',
      feedbackText: 'Esli u vas voznikli problemy s accessibilityyu ili est predlozheniya po uluchsheniyu, contact s nami po adresu accessibility@carmaket365.com',
      contactTeam: 'Svyazatsya s komandoy'
    },

    cookies: {
      policyTitle: 'Nasha policy cookies',
      policyDescription: 'My ispolzuem cookies dlya predostavleniya naibetter vozmozhn servisa.',
      policyText: 'Cookies — eto notbolshie tekstov fayly, sokhranyaem na vashem ustroystve pri poseshchenii nashego sayta. Oni pomogayut nam obespechit personalizirovan opyt.',
      
      essential: {
          'Support polzovatelskikh sessiy',
          'Sokhranotnie nastrk safetyi',
          'Bazov funktsionalnost platform',
          'Realization nastrk privacyi'
        ]
      },
      functional: {
          'Zapominanie vashikh nastrk',
          'Sokhranotnie yazykov nastrk',
          'Personalization otobrazheniya',
          'Sokhranotnie poslednikh poiskov'
        ]
      },
      analytics: {
          'Ponimanie of use sayta',
          'Uluchshenie proizvoditelnotss',
          'Vyyavlenie tekhnicheskikh problem',
          'Optimization kontenta'
        ]
      },
      maktheseng: {
          'Relevantn reklama',
          'Izmerenie effektivnotss reklamy',
          'Personalization kontenta',
          'Otslezhivanie konversiy'
        ]
      },
      
      managementTitle: 'Upravlenie nastroykami cookies',
      managementDescription: 'U vas est pol kontrol nad cookies, kotor my ispolzuem na vashem ustroystve.',
      
      browserTitle: 'Settings brauzera',
      browserFeatures: [
        'Zablokirovat ili razreshit cookies',
        'Udalit sushchestvuyushchie cookies',
        'Ustanovit srok deystviya cookies',
        'Upravlyat cookies trthesekh storon'
      ],
      
      platformTitle: 'Elementy upravleniya platform',
      platformFeatures: [
        'Tsentr nastrk cookies',
        'Varianty otkaza',
        'Detaln nastroyki upravleniya',
        'Regulyarn obnovleniya nastrk'
      ],
      
    },

    imprint: {
      legalInfoTitle: 'Yuridichesk information (Impressum)',
      legalInfoDescription: 'Information o company i yuridicheskie these v sootvetstvii s trebovaniyami zakona.',
      legalInfoText: 'Eta stranitsa soderzhit yuridicheski notobkhodimuyu informatsiyu o CarMarket365 v sootvetstvii s deystvuyushchimi zakonami i normativn aktami. Vsya predostavlenn information aktualna i tochna.',
      
      companyDetails: {
        companyName: 'Nazvanie company',
        companyNameValue: 'CarMarket365 GmbH',
        registerationNumber: 'Registratsion nomer',
        registerationNumberValue: 'HRB 123456 B',
        vatId: 'NDS ID',
        vatIdValue: 'DE123456789',
        commercialRegister: 'Torgovyy reestr',
        commercialRegisterValue: 'Amtsgericht Berlin'
      },
      
      businotssAddress: {
        registeredAddress: 'Zaregisterirovan adres',
        street: 'Unter den Linden 1',
      },
      
      management: {
        managingDirector: 'Upravlyayushchiy direktor',
        managingDirectorValue: 'Max Mustermann',
        authorizedRepresentative: 'Upolnomochen predstavitel',
        authorizedRepresentativeValue: 'Anna Schmidt'
      },
      
      contactInfo: {
        phonotValue: '+49 (0) 30 12345678',
        emailValue: 'info@carmaket365.com',
        businotssHoursValue: 'Pn-Pt: 9:00 - 18:00 CET'
      },
      
      legalNotice: {
        paragraph1: 'CarMarket365 stremitsya predostavlyat tochnuyu i aktualnuyu informatsiyu. Odnako my not mozhem garantirovat polnotu ili tochnost vsego kontenta.',
        paragraph2: 'This platform serves as a maketplace connecting car buyers and sellers. CarMarket365 is not responsible for the accuracy of listings or user behavior.',
        paragraph3: 'Po sporam ili zhalobam, please, contact s nami, ispolzuya informatsiyu, ukazannuyu vyshe. My stremimsya reshit vse questions svvremenno i spravedlivo.'
      },
      
      questionsTitle: 'Yuridicheskie questions?',
      contactLegal: 'Svyazatsya s yuridicheskoy komandoy'
    }
  },

  // Dealer Dashboard
  dealerDashboard: {
    
    // Tab navigation
    },
    
    // Overview tab
    overview: {
      // Stats cards
        activeListings: {
          fromLastMonth: 's proshl mesyatsa',
        },
        totalViews: {
        },
        inquiries: {
          fromYesterday: 'so vchera',
        },
        revenue: {
        },
      },
      
      // Performance section
      performance: {
        monthlyData: {
          january: 'Yanvar',
          december: 'Dekabr',
          november: 'November',
          sold: 'prodano',
        },
      },
      
      // Recent inquiries
      recentInquiries: {
        inquiryTypes: {
          viewing: 'osmotr',
          price: 'pricesa',
        },
        timeAgo: {
        },
      },
      
      // Action buttons
        addNewListing: 'Dobavit nov listing',
      },
    },
    
    // My Listings tab
    myListings: {
      
      // Search and filters
      filterByStatus: 'Filter po statusu',
      statusOptions: {
        allStatus: 'Vse statusy',
        pending: 'Ozhidaet',
      },
      exportReport: 'Export Report',
      export: 'Eksport',
      
      // Table headers
      tableHeaders: {
      },
      
      // Status badges
      statusBadges: {
      },
      
      // Actions
        editListing: 'Redaktirovat listing',
        deleteListing: 'Udalit listing',
      },
      
      // Mobile view
      mobileView: {
      },
    },
    
    // Inquiries tab
      
      // Inquiry types
        testDriveRequest: 'Zapros na test drive',
        priceInquiry: 'Zapros o pricese',
      },
      
      // Status
      status: {
        new: 'Item',
        responded: 'replied',
      },
      
      // Actions
        respond: 'Otvtheset',
      },
      
      // Time indicators
      time: {
        hoursAgo: 'chasov nazad',
        dayAgo: 'den nazad',
      },
    },
    
    // Analytics tab
      // Popular listings
      popularListings: {
      },
      
      // Performance metrics
      performanceMetrics: {
        metrics: {
          averageTimeToSell: 'Srednote time selli',
          conversionRate: 'Conversion Rate',
          averageListingViews: 'Srednie viewy listings',
        },
        values: {
          days: 'days',
        },
      },
    },
    
    // Footer message
    footerMessage: 'Professionaln tools dealera - ',
    activeListingsCount: 'aktivn obyavleniy',
  },

  // Admin Dashboard
  adminDashboard: {
    
    // Tab navigation
    },
    
    // Overview tab
      // Stats cards
        totalUsers: {
        },
        activeDealers: {
          newThisMonth: 'nov v etom mesyatse',
        },
        totalListings: {
          today: 'segodnya',
        },
        platformRevenue: {
        },
      },
      
      // Recent activity
      recentActivity: {
        activities: {
          newDealerRegistration: 'Registration nov dealera',
          listingFlaggedForReview: 'Obyavlenie otmecheno dlya verifyki',
          userAccountSuspended: 'Account polzovatelya zablokirovan',
          paymentProcessed: 'Payment Processed',
        },
        },
      },
      
      // System health
      systemHealth: {
          serverUptime: 'Vremya raboty servera',
          averageResponseTime: 'Srednote time otklika',
          activeSessions: 'Aktivn sessii',
          errorRate: 'Chastota oshibok',
        },
      },
      
      // Action buttons
        manageUsers: 'Upravlyat polzovatelyami',
        viewReports: 'View Reports',
      },
    },
    
    // All Listings tab
    allListings: {
      
      // Search and filters
        flagged: 'Otmecheno',
      },
      
      // Table headers
        created: 'Sozdano',
      },
      
      // Status badges
      },
      
      // Actions
      },
    },
    
    // User Management tab
    userManagement: {
      
      // Search and filters
      roleFilter: {
          allRoles: 'Vse roli',
          customer: 'Klient',
        },
      },
      
      // Table headers
        user: 'Polzovatel',
        joinDate: 'Data prisdinotniya',
        lastLogin: 'Posledniy vkhod',
      },
      
      // Role badges
      roleBadges: {
      },
      
      // Status badges
      },
      
      // Dopolniteln soobshcheniya statusa
      statusMessages: {
        joinotdOn: 'Joined On',
        lastLoginOn: 'Posledniy vkhod',
        notverLoggedIn: 'Nikogda not vkhodil',
      },
      
      // Actions
        viewProfilee: 'Posmotret profil',
        editUser: 'Redaktirovat polzovatelya',
        suspendUser: 'Zablokirovat polzovatelya',
        activateUser: 'Aktivirovat polzovatelya',
      },
    },
    
    // Reports tab
    reports: {
      // Platform statistics
      platformStatistics: {
          totalRevenue: 'Obshchiy dokhod (v etom mesyatse)',
          newUserRegistrations: 'Registratsii nov users',
          successfulTransactions: 'Uspeshn tranzaktsii',
          averageListingPrice: 'Sredny pricesa listings',
        },
      },
      
      // Content moderation
      contentModeration: {
          flaggedListings: 'Otmechenn listings',
          pendingDealerApplications: 'Zvki dealers v ozhidanii',
          reportedUsers: 'Polzovateli s zhalobami',
          disputes: 'Disputes',
        },
      },
    },
    
    // Footer message
    systemStatus: 'Status sistemy: Onlayn',
  },

  uiDemo: {
    componotnts: 'Components',
    cards: 'Kartochki',
  },

  // Test strany
  countryTest: {
    currentCountryConfiguration: 'Tekushch konfiguration strany',
    currentCountryDescription: 'Eto pokazyvaet tekushchuyu opredelennuyu country i ee nastroyki',
    detectedCountry: 'Opredelenn strana',
    domain: 'Domen',
    languages: 'Languages',
    developmentMode: 'Rezhim razrabotki',
    enabled: 'Enabled',
    disabled: 'Disabled',
    developmentCountrySwitcher: 'Pereklyuchatel stran razrabotki',
    switcherDescription: 'Pereklyuchaytes mezhdu stranami dlya testirovaniya funktsii razdeleniya',
    selectTestCountry: 'Select test country',
    chooseCountryToTest: 'Choose country to test',
    selectCountryPlaceholder: 'Select country...',
    resetToDefault: 'Sbrosit na po umolchaniyu',
    noteTitle: 'Primechanie:',
    noteText: 'V prodakshenot strany avtomaticheski definotsya iz poddomena (naprimer, mk.carmaket365.com, al.carmaket365.com). Etot pereklyuchatel rabotaet tolko v rezhime razrabotki.',
    carListingsFor: 'Obyavleniya carey dlya',
    carListingsDescription: 'dolzhny poyavitsya nizhe',
    loadingCars: 'Zagruzka carey...',
    foundCars: 'Naydeno {count} carya(ey) v {country}',
    noCarsFound: 'Cari not naydeny',
    noCarsFoundDescription: 'V nastoyashchee time v {country} nott opublikovann carey.',
    tryDifferentCountry: 'Poprobuyte pereklyuchitsya na another country s helpyu pereklyuchatelya vyshe.',
    automaticCountryDetection: 'Automatic opredelenie strany',
    automaticDetectionDescription: 'Sistema avtomaticheski opredelyaet country iz poddomena (naprimer, mk.carmaket365.com dlya Makedonii, al.carmaket365.com dlya Albanii).',
    countrySpecificListings: 'Obyavleniya, spetsifichn dlya strany',
    countrySpecificDescription: 'Obyavleniya carey avtomaticheski filteruyutsya dlya pokaza tolko carey iz tekushchey strany. Eto obespechivaet, chto polzovateli v Makedonii vidyat tolko makedonskie listings, albanskie polzovateli vidyat tolko albanskie listings i t.d.',
    crossCountryProtection: 'Zashchita mezhdu stranami',
    crossCountryDescription: 'Esli kto-to pexperienceetsya by accessingit access k obyavleniyu carya iz otheroy strany (through directlyy URL), on by accessingit soobshchenie ob oshibke, chto listing notaccessno v ikh regionot.',
    listingSubmission: 'Podacha listings',
    listingSubmissionDescription: 'Kogda polzovateli podayut nov listings carey, kod strany avtomaticheski ustanavlivaetsya na osnove ikh tekushchego poddomena, obespechiv vidimost obyavleniy tolko v pravilnoy stranot.',
  },

  // Formy i polya vvoda
      enterName: 'Vvedite name',
      enterPassword: 'Vvedite parol',
      enterCity: 'Vvedite gorod',
      enterDescription: 'Vvedite opisanie',
      searchListings: 'Iskat listings',
      searchFAQs: 'Iskat v FAQ',
      filterBy: 'Filterovat po',
      dealerNameOrCity: 'Nazvanie dealera ili gorod',
      allStates: 'Vse regiony',
      egFiftyThousand: 'naprimer, 50,000',
      requiredFieldMessage: 'Eto pole required dlya zapolnotniya',
      enterMessage: 'Vvedite vashe soobshchenie',
    },
      businotssName: 'Nazvanie biznotsa',
      state: 'Region',
      contactName: 'Contact Person',
      contactPhonot: 'Kontakt phonot',
      contactEmail: 'Kontakt email',
      rememberMe: 'Zapomnit menya',
      termsAccepted: 'Usloviya prinyaty',
      privacyAccepted: 'Politika prinyata',
    },
      submit: 'Send',
      register: 'Register',
      resetPassword: 'Sbrosit parol',
      updateProfilee: 'Obnovit profil',
      saveDraft: 'Sokhranit kak draft',
      previewListing: 'Predvaritel view',
      viewListing: 'Prosmotret listing',
      contactDealer: 'Svyazatsya s dealerom',
      requestFinancing: 'Zaprosit financing',
      shareVehicle: 'Podelitsya carem',
      applyFilters: 'Primenit filtery',
      clearFilters: 'Ochistit filtery',
      searchVehicles: 'Search Cars',
      viewAllCars: 'Posmotret vse cari',
      loadMore: 'Zagruzit eshche',
      showMore: 'Pokazat bolshe',
      showLess: 'Pokazat menshe',
    },
      nameMinLength: 'Imya dolzhno soderzhat not menote 2 simvolov',
      validEmail: 'Pozhaluysta, enter validyy adres elektronnoy pochty',
      messageMinLength: 'Soobshchenie dolzhno soderzhat not menote 10 simvolov',
    },
  },

  // Static content for About page
  about: {
      carsSold: 'Prodano Carey',
      happyCustomers: 'Dovoln Klientov',
      dealerPartnotrs: 'Dealer Partnotrs',
      arsInBusinotss: 'Let v Biznotse',
    },
      trustTransparency: 'Doverie i Prozrachnost',
      trustTransparencyDesc: 'We believe in honotst pricing, clear communication, and building long-term relationships with our clients.',
      customerFirst: 'Klient Prezhde Vsego',
      customerFirstDesc: 'Kazhd nashe reshenie napravleno na obespechenie better vozmozhn experience dlya nashikh clientov.',
      qualityAssurance: 'Garantiya Kachestva',
      qualityAssuranceDesc: 'We carefully inspect and verify every vehicle to guarantee quality and reliability.',
      innovation: 'Innovatsii',
      innovationDesc: 'My postoyanno uluchshaem nashu platformu s helpyu noveyshikh tekhnologiy, to luchshe sluzhit vam.',
    },
    staticContent: {
      team: [
        {
          linkedin: '#'
        },
        {
        },
        {
          role: 'Rukovoditel otdela clientsk servisa',
          bio: '10+ let v oblasti prevoskhodn of service clientov i rukovodstva komandoy.',
          image: 'https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        },
        {
        }
      ],
      milestonots: [
        {
          description: 'Nachali kak notbolsh torgov ploshchadka poderzhann carey v Moskve s videniem revolyutsionizirovat buyu carey.'
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ],
      awards: [
        {
        },
        {
          organization: 'Premiya tekhnologicheskikh innovatsiy',
        },
        {
        }
      ]
    },
    content: {
      heroTitle: 'O CarMarket365',
      heroSubtitle: 'My na missii sdelat buyu i sellu carey prostoy, prozrachnoy i priyatnoy. S 2009 goda my sdinyaem buyerey i prodavtsov s doveriem i innovationmi.',
      missionTitle: 'Nasha missiya',
      missionContent: 'To revolutionize the car buying and selling experience by providing a transparent, reliable, and user-friendly platform that connects people with their ideal vehicle.',
      missionDescription: 'We believe everyonot deserves access to reliable transportation and fair prices, without the stress and uncertainty traditionally associated with car buying.',
      visionTitle: 'Nashe videnie',
      visionContent: 'To become the world\'s most trusted automotive platform, where every transaction is built on transparency, quality, and customer satisfaction.',
      visionDescription: 'My predstavlyaem budushchee, gde buya ili sella carya tak zhe prosta, kak notskolko klikov, s polnym doveriem k protsessu i rezultatu.',
      valuesTitle: 'Nashi pricesnotss',
      valuesDescription: 'These core principles guide everything we do and shape our company culture',
      teamTitle: 'Preview s our komandoy',
      teamDescription: 'Passionate professionals dedicated to transforming the automotive industry',
      journotyTitle: 'Nash put',
      journotyDescription: 'Klyuchev vekhi, kotor formirovali nashu kompaniyu na protyazhenii let',
      awardsTitle: 'Nagrady i priznanie',
      awardsDescription: 'My gordimsya tem, chto priznany liderami industrii za nashi innovatsii i servis',
      ctaTitle: 'Gotovy prisdinitsya k nashemu puti?',
      ctaDescription: 'Esli vy looking for your sleduyushchiy car ili khotite stat chastyu our komandy, my khoteli by uslyshat ot vas.',
      joinTeam: 'Prisdinitsya k our komande',
      connect: 'Connect'
    }
  },

  carReviews: {
    
    // Main content
    overviewTitle: 'Obzory i reytingi carey',
    overviewDescription: 'Kompleksn reviews, kotor pomogut vam prinimat obosnovann resheniya pri buye vehiclen vehicles.',
    
    // Review types
    expertReviews: {
        'Professionaln carn zhurnalistika',
        'Detal analiz proizvoditelnotss',
        'Safety and reliability ratings',
        'Sravniteln testirovanie vehiclen vehicles'
      ]
    },
    ownotrReviews: {
        'Real opyt vladeniya',
        'Long-term reliability reviews',
        'Ponimanie zatrat na obsluzhivanie',
        'Vpechatleniya ot ezhednotvn vozhdeniya'
      ]
    },
    ratingSystem: {
        '5-star rating system',
        'Opriceski po konkretnym kategoriyam',
        'Obshchie rekomendatsii',
        'Razbor preimushchestv i notdostatkov'
      ]
    },
    maketInsights: {
        'Analiz peresellnoy value',
        'Market trend reports',
        'Rekomendatsii luchshey pricesnotss',
        'Sezonn rukovodstva po buye'
      ]
    },
    
    // Categories
    categoriesTitle: 'Categories obzorov',
    categoriesDescription: 'Nashi reviews okhvatyvayut vse aspekty vladeniya i proizvoditelnotss vehiclen vehicles.',
        'Proizvoditelnost dvigatelya',
        'Upravlenie i dinamika vozhdeniya',
        'Effektivnost topliva',
        'Razgon i tormozhenie'
      ]
    },
    comfort: {
        'Komfort sideniy',
        'Vnutrennote prostranstvo i khranotnie',
        'Tekhnologicheskie funktsii',
        'Kachestvo sborki i materialy'
      ]
    },
    safety: {
        'Reytingi i funktsii safetyi',
        'Reliability and Service',
        'Garantiyn pokrytie',
        'Istoriya otzyvov'
      ]
    },
    
    // Coming soon
    comingSoonTitle: 'Obzory skoro poyavyatsya!',
    comingSoonText: 'V nastoyashchee time my stroim nashu kompleksnuyu bazu these obzorov. Ekspertn reviews i otzyvy vladeltsev skoro budut accessny, to help napravit vashi resheniya o buye carey.',
    exploreInventory: 'Izuchit inventar'
  },

  // Static vehicle data for AdvancedSearch
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citrn', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
        'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van',
        'Minivan', 'Crossover', 'Compact', 'Subcompact', 'Sredniy razmer', 'Pol razmer',
        'Sports Car', 'Luxury', 'Economy', 'Hybrid'
      ],
        'Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid', 'CNG', 'LPG',
        'Flex Fuel', 'Hydrogen', 'Biodiesel', 'E85 Etanol'
      ],
        'Manual', 'Automatic', 'CVT', 'Semi-Automatic', 'Dual Clutch', '6-Speed Manual',
        '7-Speed Automatic', '8-Speed Automatic', '9-Speed Automatic', '10-Speed Automatic'
      ],
        'Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', '4WD', 
        'Chastich 4WD', 'Full-Time 4WD', 'Electronic All-Wheel Drive', 'Manualiy pol privod'
      ],
        'Black', 'White', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Brown', 
        'Gold', 'Yellow', 'Orange', 'Purple', 'Beige', 'Tan', 'Pink', 'Burgundy',
        'Pearl White', 'Metallic Silver', 'Deep Blue', 'Racing Red', 'Forest Green',
        'Charcoal', 'Navy', 'Beige'
      ],
        'New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Spravedliv', 'Used', 
        'Sertifitsirovan b/u', 'Restored', 'Refurbished', 'Salvage', 'Vintage'
      ],
        'Air Conditioning', 'Leather Seats', 'Navigation System', 'Bluetooth', 'USB Ports',
        'Backup Camera', 'Parkovochn sensory', 'Obogrev sideniy', 'English', 'Alloy Wheels',
        'Cruise Control', 'ABS', 'Sistema kursovoy ustoychivosti', 'Airbags',
        'Remote Start', 'Keyless Entry', 'Power Windows', 'Power Steering', 'Tinted Windows',
        'Premium Sound System', 'Satellite Radio', 'CD proigryvatel', 'MP3 proigryvatel', 'DVD proigryvatel',
        'Wireless Charging', 'Apple CarPlay', 'Android Auto', 'Preduprezhdenie o smenot polosy',
        'Monitoring slep zon', 'Preduprezhdenie o lobovom stolknovenii', 'Automatic ekstrenn tormozhenie',
        'Adaptive Cruise Control', 'Helpnik parkovki', 'Backup Camera', '360-Degree Camera',
        'Obogrev rulya', 'Okhlazhdaem sidenya', 'Ventiliruem sidenya', 'Memory Seats',
        'Power Adjustable Seats', 'Sidenya tretego ryada', 'Skladyvayushchiesya zadnie sidenya', 
        'Cargo Cover', 'Roof Rack', 'Pritsepn ustroystvo', 'Bokov podnozhki', 'Bokov stupeni'
      ],
        'Sertifitsirovan b/u', 'Manufacturer Warranty', 'Extended Warranty', 
        'Roadside Assistance', 'Vehicle History Report', 'Multi-point Inspection',
        'Emissions Test', 'Safety Inspection', 'Sertifikation dealera', 'Sertifikation tretey storony',
        'Carfax verifyen', 'AutoCheck verifyen', 'No Accidents', 'One Owner',
        'Zapisi o tekhobsluzhivanii accessny', 'Tekhobsluzhivanie aktualno'
      ]
    }
  },

    
    // Main content
    mainTitle: 'Rekomendatsii po safetyi carey',
    safetyOverview: 'Whether you\'re buying your first car or selling your current onot, following appropriate safety recommendations protects you from fraud, ensures fair deals, and helps maintain your personal safety throughout the process.',
    
    // Safety categories
    methesengSafety: {
        'Always meet in a public, well-lit place',
        'Bring a trusted friend or family member',
        'Soobshchite k-libo o vashikh planakh vstrechi',
        'Po vozmozhnotss vstrechaytes v dnotvn time',
        'Doveryayte svoim instinktam - ukhodite, esli chto-to kazhetsya invalidym',
        'Nikogda not vstrechaytes doma i not priglashayte notznakomtsev tuda'
      ]
    },
    paymentSecurity: {
        'Nikogda not otpravlyayte dengi ili depozity do osmotra carya',
        'Ispolzuyte secure sposoby oplaty (bankovskiy perevod, zaveren chek)',
        'Izbegayte nalichn operatsiy na krupn summy',
        'Osteregaytes moshennichestva s pereplatoy',
        'Po vozmozhnotss provodite operatsii v banke',
        'Poluchayte kvitantsii za vse paymenti i operatsii'
      ]
    },
    vehicleInspection: {
        'Vsegda osmatrivayte car lichno',
        'Vozmite s soboy znayushchego mekhanika ili opytn othera',
        'Protestiruyte car v razlichn termskh',
        'Proverte vse dokumenty i istoriyu carya',
        'Ubedites, chto VIN-nomer sovpadaet so vsemi dokumentami',
        'Ne speshite - naydite time dlya tshchateln osmotra'
      ]
    },
    redFlags: {
        'Prodavets otkazyvaetsya vstrthesetsya lichno',
        'Trebovanie oplaty do osmotra carya',
        'Tsena znachitelno nizhe market value',
        'Davlenie s tselyu bystr zaversheniya sdelki',
        'Nepoln ili podozriteln dokumentation',
        'Seller cannot provide clear proof of ownotrship'
      ]
    },
    
    // Documentation
    documentation: {
      forBurs: 'Dlya buyerey',
      burItems: [
        'Svidetelstvo o registeratsii carya',
        'Deystvuyushchie dokumenty prodavtsa',
        'Zapisi o tekhnicheskom obsluzhivanii',
        'Sertifikat tekhnichesk osmotra',
        'Podtverzhdenie strakhovki',
        'Chist svidetelstvo ili information o zaloge'
      ],
      forSellers: 'Dlya prodavtsov',
      sellerItems: [
        'Tekushch registeration carya',
        'Chist svidetelstvo na car',
        'Poslednie zapisi ob obsluzhivanii',
        'Deystvuyushchie voditelskie rights',
        'Shablon dvora kupli-selli',
        'Forma osvobozhdeniya ot otvetstvennotss'
      ]
    },
    
    // Emergency contact
    emergency: {
    }
  },

  expressSell: {
    step: 'Shag',
    carDetails: 'Vehicle Details',
    carDetailsDescription: 'Rasskazhite nam o vashem care, to create privlekateln listing',
    kilometers: 'kilometers',
    fuelTypeRequired: 'Fuel type *',
    transmissionRequired: 'Transmission *',
    priceRequired: 'Tsena *',
    enterPrice: 'Vvedite zaprashivaemuyu pricesu',
    euros: 'EUR',
    descriptionOptional: 'Description (Optsionalno)',
    photosAndContactDescription: 'Dobavte photos i vashu kontaktnuyu informatsiyu',
    carPhotos: 'Fotografii carya',
    carPhotosRequired: 'Fotografii carya *',
    photosUploaded: 'fotografiy zagruzheno',
    fullNameRequired: 'Poln name *',
    enterFullName: 'Vvedite vashe full name',
    enterEmail: 'Vvedite adres elektronnoy pochty',
    locationRequired: 'Mestopolozhenie *',
    enterLocation: 'Vvedite vashe mestopolozhenie',
    previewDescription: 'Prosmotrite vashe listing before publikatsiey',
    yourListing: 'Your listing',
    listingPreview: 'Predvaritel view listings',
    successMessage: 'Your vehicle has been successfully listed!',
    requiredField: 'Eto pole required',
  },

    loanCalculator: 'Kalkulyator kredita',
    totalInterest: 'Obshch summa propricestov',
    totalPayment: 'Obshch summa vyplat',
    loanAmount: 'Summa kredita',
    loanTerm: 'Srok kredita',
    ars: 'let',
  },

    noResultsText: 'Poprobuyte posearch s otherimi klyuchev sloyour ili viewite po kategoriyam.',
        account: 'Account i ispolzovanie'
      },
      questions: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
          answer: 'Vremya selli zavisit ot notskolkikh faktorov: pricesy, sostoyaniya carya, sprosa na rynke i kachestva listings. V srednotm cari prodayutsya v techenie 2-8 notdel. Obyavleniya s konkurentn pricesami i kachestvenn fotografiyami prodayutsya bystree.'
        },
        {
        },
        {
        },
        {
        },
        {
          id: 'financing-1',
          category: 'financing',
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        }
      ]
    }
  },

  dealers: {
    searchDealers: 'Search dealers',
    allSpecialties: 'Vse spetsializatsii',
    sortByDistance: 'Sort by Distance',
    sortByRating: 'Sort by Rating',
    carsAvailable: 'Dostupn cari',
    averageRating: 'Sredniy reyting',
  },

  registeredDealers: {
    allDealersVerified: 'Vse dealers verifyeny',
    supportAvailable: 'Support 24/7',
    browseNetwork: 'Prosmotrite nashu set iz {count} verifyenn dealers po vsey Germanii',
    verifiedSince: 'Proveren s {ar}',
    experience: 'Opyt:',
    totalSales: 'Obshchie selli:',
    
    // Dealer specialties
    specialties: {
      luxuryCars: 'Lyuksov cari',
      suvs: 'Vnotdorozhniki',
      electricVehicles: 'Elektromobili',
      familyCars: 'Semeyn cari',
      compactCars: 'Compactn cari',
      hybrids: 'Hybrids',
      sportsCars: 'Sportivn cari',
      convertibles: 'Convertibles',
      mercedesBenz: 'Mercedes-Benz',
      porsche: 'Porsche',
      businotssCars: 'Biznots-cari',
      fleetSales: 'Prodazhi avtoparkov',
      leasing: 'Lizing',
      ecoFriendly: 'Ekologichn',
    },
    
    // Dealer descriptions
    descriptions: {
      autoMaxDescription: 'Vedushchiy dealer lyuksov carey v Berlinot s bolee chem 15-letnim opytom. Spetsialization na premialn notmetskikh brendakh.',
      stuttgartLuxuryDescription: 'Avtorizovan dealer Mercedes-Benz i Porsche v Shtutgarte. Dom luchshey notmetskoy inzhenotrii.',
    },
  },

  // Additional translations for hardcoded text
  hardcodedFixes: {
    // Spetsifichno dlya CountryTestPage
    countryTestPage: {
      codeLabel: 'Kod:',
      errorPrefix: 'Oshibka:',
      onlyListedDescription: 'Tolko cari, perechislenn v <strong>{country} ({code})</strong>, dolzhny poyavitsya nizhe',
      foundCarsIn: 'Naydeno {count} carey v {country}',
      countryFilteredResults: '🔒 Resulty, otfilterovann po stranot',
      noCarsInCountry: 'V nastoyashchee time nott carey, perechislenn v {country}.',
      trySwitchingCountry: 'Poprobuyte pereklyuchit country s helpyu pereklyuchatelya vyshe.',
      carIdAndCountry: 'ID: {id} | Strana: {country}',
      developmentNote: '<strong>Primechanie:</strong> V proizvodstve strany avtomaticheski definotsya iz poddomena (naprimer, mk.carmaket365.com, al.carmaket365.com). Etot pereklyuchatel rabotaet tolko v rezhime razrabotki.',
    },

    // AdminDashboard - znachki statusa i mok-these
        suspended: 'Priostanovlen',
      },
      mockData: {
        // Imena users
        johnDealer: 'Ivan Diler',
        johnDealerEmail: 'ivan@dealerstvo.com',
        annaCustomer: 'Anna Klient',
        annaCustomerEmail: 'anna@client.com',
        bobAdmin: 'Bob Administrator',
        bobAdminEmail: 'bob@admin.com',
        
        // Zagolovki obyavleniy
        bmw3Series2022: '2022 BMW 3 seriya',
        audiA42021: '2021 Audi A4',
        mercedesCClass2020: '2020 Mercedes C-klass',
        
        // Categories
        
        // Nazvaniya kompaniy
        premiumMotors: 'Premium Motors',
        eliteCars: 'Elit Kars',
        
        // Polzovateli aktivnotss
        premiumMotorsGmbH: 'Premium Motors GmbKh',
        suspiciousUser: 'Podozritel polzovatel',
        autoHausBerlin: 'AvtoKhaus Berlin',
        
        // Vremenn indikatory
        twoHoursAgo: '2ch nazad',
        fourHoursAgo: '4ch nazad',
        sixHoursAgo: '6ch nazad',
        eightHoursAgo: '8ch nazad',
      },
    },

    // DealerDashboard mok-these
        // Zagolovki carey
        bmw3Series320i2022: '2022 BMW 3 seriya 320i',
        audiA4Avant2021: '2021 Audi A4 Avant',
        
        // Znacheniya probega
        mileage25k: '25 000 km',
        mileage18k: '18 000 km',
        mileage32k: '32 000 km',
      },
    },

    // Hardcoded financing text
        quickApproval: {
        },
        lowRates: {
        },
        noCreditImpact: {
        },
        },
      },
        creditScoreRange: 'Diapazon kreditn reytinga',
      },
      summary: {
        loanSummary: 'Svodka po kreditu',
      },
        financingOptions: 'Varianty financingovaniya',
        chooseOption: 'Choose the option that best suits you',
        traditionalAutoLoan: 'Traditsion avtokredit',
        mostPopular: 'Samyy populyar',
        leaseOptions: 'Varianty lizinga',
      },
    },

      
      // Main content
      mainDescription: 'Neskolko sposobov svyazatsya s our sluzhboy support dlya by accessingeniya helpi.',
      contactOverview: 'If you have questions about buying a car, need help selling your vehicle, or require technical support, our team is ready to help you. Choose the most convenient way to contact us.',
      
      // Contact methods
      phonotSupport: {
        customerService: 'Sluzhba support clientov',
      },
      emailSupport: {
      },
      businotssHours: {
        }
      },
      officeLocation: {
          city: '10785 Berlin, Germaniya',
        },
      },
      
      // Contact form
          }
        },
        },
          name: 'Vvedite vashe full name',
          phonot: 'Vvedite vash nomer phonota',
          subject: 'Vvedite temu soobshcheniya',
        },
      },
      
      // Success message
      },
      
      // Quick help
          },
          },
          },
          }
        }
      },
      
      // Urgent support
      urgentSupport: {
      }
    },

    // Dealer page - hardcoded strings
      searchLabel: 'Search dealers',
      stateLabel: 'Region',
      specialtyLabel: 'Specialty',
      allStatesOption: 'Vse regiony',
      allSpecialtiesOption: 'Vse spetsializatsii',
      sortByInventory: 'Po kolichestvu avto',
      sortByLabel: 'Sortirovat po:',
      dealersFound: 'dealers naydeno',
      specialtiesHeader: 'Spetsializatsii',
      certificationsHeader: 'Certifications',
      noDealersFound: 'Dilery not naydeny',
      tryAdjustingFilters: 'Poprobuyte change kriterii search',
      hoursLabel: 'Chasy raboty',
    },

      customerRated: 'Opriceseno clientami',
      totalDealers: 'Vsego dealers',
      totalInventory: 'Obshchiy inventar',
      allLocations: 'Vse mestopolozheniya',
      
      // Dealer specialties
      },

      // Dealer descriptions  
        cityMotorsDescription: 'Semey dealerskiy pricestr, obsluzhivayushchiy Myunkhen i prilegayushchie rayony. Izvesten otlichnym obsluzhivaniem clientov i chestn pricesami.',
        ecoWheelsDescription: 'Vedushchiy spetsialist po elektricheskim i gibridnym caryam v Gamburge. Priverzhen ekologichnym vehiclenym resheniyam.',
        rheinAutoDescription: 'Spetsialisty po proizvoditelnym i sportivnym caryam v Reynlande. Obshirn kollektsiya vysokoproizvoditeln carey.',
        nordFahrzeugeDescription: 'Spetsialist po korporativnym caryam, obsluzhivayushchiy delovoy rayon Frankfurta. Ekspert po resheniyam dlya avtoparkov i lizingu.',
      },
    },

    // Dealer support page - hardcoded strings
      supportCenterText: 'Our specialized dealer support team will help you maximize success on CarMarket365. Get help with inventory management, customer inquiries, and platform features.',
      dashboardSupport: {
          'Help with inventory management',
          'Optimization obyavleniy',
          'Interpretation analitiki',
          'Nastroyka accounta'
        ],
      },
      customerRelations: {
          'Guide po upravleniyu lidami',
          'Luchshie praktiki kommunikatsii',
          'Obrabotka zaprosov clientov',
          'Upravlenie otzyyour'
        ],
      },
      performanceOptimization: {
          'Uluchshenie vidimosti obyavleniy',
          'Sovety po priceoy strategii',
          'Rekomendatsii po kachestvu foto',
          'Analiz rynochn trendov'
        ],
      },
      technicalSupport: {
          'Problemy funktsionalnotss platform',
          'Help s mobilnym prilozheniem',
          'Ustranotnie notpoladok integratsii',
          'Obuchenie funktsiyam'
        ],
      },
      gettingStarted: {
        accountSetup: {
            'Proydite verifikatsiyu dealera',
            'Zagruzite delovuyu dokumentatsiyu',
            'Nastroyte obrabotku paymentey',
            'Nastroyte biznots-profil'
          ],
        },
        inventoryManagement: {
            'Dobavte perv listing o care',
            'Zagruzite kachestvenn photos',
            'Napishite ubediteln opisaniya',
            'Ustanovite konkurentn pricesy'
          ],
        },
        performanceTracking: {
            'Monitoring proizvoditelnotss obyavleniy',
            'Otslezhivanie zaprosov clientov',
            'Analiz rynochn trendov',
            'Optimization na osnove these'
          ],
        },
      },
      helpSection: {
        goToDealerDashboard: 'Pereyti na panotl dealera',
      },
    },

    // Accessibility page - hardcoded strings
      standardsWeFollow: 'Standarty, kotorym my sleduem',
      standardsDescription: 'My stremimsya sootvetstvovat ustanovleedm standartam i rekomendationm accessibilityi.',
      wcagGuidelinots: 'Rekomendatsii WCAG',
      wcagDescription: 'My stremimsya sootvetstvovat standartam rekomendatsiy po accessibilityi veb-kontenta (WCAG) 2.1 urovnya AA.',
      platformCompatibility: 'Sovmestimost platform',
      platformCompatibilityDescription: 'Nasha platforma razrabotana dlya raboty s assistivn tekhnologiyami i instrumentami accessibilityi.',
      weValueYourFeedback: 'My pricesim vashi otzyvy',
      feedbackMessage: 'Esli vy stolknulis s prepyatstviyami accessibilityi ili u vas est predlozheniya po uluchsheniyu, not stesnyaytes obrashchatsya k nam po adresu accessibility@carmaket365.com',
      contactAccessibilityTeam: 'Svyazatsya s komandoy accessibilityi',
      visualFeatures: [
        'Dizayn s vysokim kontrastom',
        'Masshtabiruemyy tekst i elementy interfeysa',
        'Alternativ tekst dlya izobrazheniy',
        'Sovmestimost so skrin-riderami'
      ],
      motorFeatures: [
        'Support navigatsii s klaviatury',
        'Bolshie klikabeln oblasti',
        'Optsii snizhenn dvizheniya',
        'Sovmestimost s golosovym upravleniem'
      ],
      audioFeatures: [
        'Vizualn indikatory dlya audio kontenta',
        'Tekstov alternativy dlya audio informatsii',
        'Subtitry dlya video kontenta',
        'Nastraivaem audio nastroyki'
      ],
      cognitiveFeatures: [
        'Yas i prostoy yazyk',
        'Posledovateln navigatsionn patterny',
        'Error prevention and clear feedback',
        'Nastraivaem optsii interfeysa'
      ],
    },

    // Cookie policy page - hardcoded strings
    cookiePolicy: {
      managingPreferences: 'Upravlenie nastroykami cookies',
      managingPreferencesDescription: 'U vas est kontrol nad cookies, kotor my ispolzuem na vashem ustroystve.',
      browserSettings: 'Settings brauzera',
      platformControls: 'Upravlenie platformoy',
      questionsAboutCookies: 'Voprosy o cookies?',
      questionsMessage: 'Esli u vas est questions o our politike cookies ili nuzhna help v upravlenii nastroykami, contact s nami po adresu cookies@carmaket365.com',
      cookieSupport: 'Support cookies',
      browserSettingsItems: [
        'Blokirovka ili razreshenie cookies',
        'Udalenie sushchestvuyushchikh cookies',
        'Ustanovka sroka deystviya cookies',
        'Upravlenie cookies trthesekh lits'
      ],
      platformControlsItems: [
        'Tsentr nastrk cookies',
        'Dostupn optsii otkaza',
        'Detaln nastroyki upravleniya',
        'Regulyarn obnovleniya nastrk'
      ],
      essentialFeatures: [
        'Login i autentifikation',
        'Funktsionalnost korziny pokupok',
        'Bezopasnost i predotvrashchenie moshennichestva',
        'Basic Site Operations'
      ],
      functionalFeatures: [
        'Zapominanie vashikh nastrk',
        'Vybor yazyka',
        'Personalizirovan polzovatelskiy opyt',
        'Uslugi na osnove mestopolozheniya'
      ],
      analyticsFeatures: [
        'Statistika of use sayta',
        'Optimization proizvoditelnotss',
        'Reporting and error correction',
        'Analiz povedeniya users'
      ],
      makthesengFeatures: [
        'Personalizirovann reklama',
        'Otslezhivanie effektivnotss reklamn kampaniy',
        'Integration sotsialn setey',
        'Retargtheseng i remaktheseng'
      ],
    },

    // Safety tips page - hardcoded strings
          'Meet in public, well-lit places',
          'Drive typeite othera ili chlena semi',
          'Vstrechaytes v dnotvn time',
          'Doveryayte svoim instinktam'
        ],
      },
          'Ispolzuyte secure metody oplaty',
          'Izbegayte nalichn dlya bolshikh summ',
          'Proveryayte oplatu before beforeachey',
          'Poluchayte kvitantsiyu za vse tranzaktsii'
        ],
      },
          'Rekomenduetsya professional osmotr',
          'Proverte vse mekhanicheskie sistemy',
          'Proverte VIN i registeratsiyu',
          'Tshchatelno protestiruyte vozhdenie'
        ],
      },
          'Davlenie prinyat reshenie bystro',
          'Zaprosy lichnoy informatsii zaranote',
          'Sdelki, kotor kazhutsya too khoroshimi',
          'Nezhelanie vstrechatsya lichno'
        ],
      },
          'Nazvanie carya ili registeration',
          'Zapisi o tekhnicheskom obsluzhivanii',
          'Vehicle history report',
          'Bill of sale with all details'
        ],
          'Proverka valid ID buyerya',
          'Podtverzhdenie strakhovki (pri test drivee)',
          'Pismenn soglashenie o buye',
          'Podtverzhdenie oplaty'
        ],
      },
        message: 'Esli vy stolknulis s podozritelnoy aktivnostyu ili chuvstvuete sebya notsecureo, dovertes instinktam i notmedlenno ukhodite. Soobshchayte o any problemakh our komande safetyi po adresu safety@carmaket365.com',
        reportConcern: 'Soobshchit o probleme safetyi',
      },
    },
  },

  // Okonchateln ispravleniya dlya ostavshegosya zhestko kodirovann angliysk teksta
  finalFixes: {
    // Page ExpressSell - Marki carey, model i zapolniteli
      carBrands: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 
        'Ford', 'Opel', 'Peugeot', 'Renault'
      ],
      carModels: [
        '3 Series', '5 Series', 'X3', 'X5', 'A4', 'A6', 'Golf', 'Passat'
      ],
      conditionLabel: 'Condition *',
      conditionPlaceholder: 'Select condition',
      descriptionPlaceholder: 'Describe your car features, history and why it is a great buy...',
      locationPlaceholder: 'City, State',
      uploadPhotosDescription: 'Add photos to make your listing more attractive',
      uploadCarPhotos: 'Upload Car Photos',
      addUpToTenPhotos: 'Add up to 10 photos. First photo will be the main image.',
      priceAndDescription: 'Price & Description',
      setPriceAndDescription: 'Set your desired price and describe your vehicle',
      askingPriceEuros: 'Asking Price (€) *',
      priceExample: 'e.g. 25,000',
      howShouldBuyersContact: 'How should buyers contact you?',
      phonotNumberRequired: 'Phonot Number *',
      phonotPlaceholder: 'Your phonot number',
      emailAddressRequired: 'Email Address *',
      yourEmail: 'your.email@example.com',
      carDetailsStep: 'Car Details',
      photosStep: 'Photos',
      priceDescriptionStep: 'Price & Description',
      contactInfoStep: 'Contact Info',
      listMyCarQuickly: 'List your car quickly and easily',
      listMyCar: 'List My Car',
    },
    
    // Page DealerSignUp - Zapolniteli form
    dealerSignUp: {
      firstNamePlaceholder: 'Ivan',
      lastNamePlaceholder: 'Petrov',
    },
    
    // Page SavedCars - Zapolnitel filtera
      filterPlaceholder: 'Filterovat po',
      recentlySaved: 'Nedavno sokhranotnn',
      savedThisWeek: 'Sokhranotno na etoy notdele',
      startBrowsing: 'Nachnite prosmatrivat nash obshir inventar vehiclen vehicles i sokhranyayte izbrann zdes.',
      carsSaved: 'carey sokhranotno',
      savedDate: 'Saved',
    },
    
    // Page UIDemo - Demo zapolniteli
      namePlaceholder: 'Vvedite vashe name',
      emailPlaceholder: 'Vvedite vashu elektronnuyu pochtu',
      optionPlaceholder: 'Select Option',
      enhancedUIComponotntsDemo: 'Demonstration uluchshenn UI komponotntov',
      showcaseNewlyIntegrated: 'Demonstration notdavno integrirovann UI komponotntov s uluchshennoy funktsionalnostyu',
      buttonVariants: 'Varianty knopok',
      variousButtonStyles: 'Razlichn stili i razmery knopok s uluchshenn sostoyaniyami fokusa',
      enhancedFormComponotnts: 'Uluchshenn komponotnty form',
      formComponotntsWithValidation: 'Komponotnty form s uluchshennoy validatsiey i accessibilityyu',
      selectOption: 'Select Option',
      thisIsPublicDisplayName: 'Eto vashe publichn otobrazhaem name.',
      submitForm: 'Otpravit formu',
      cardTitle: 'Zagolovok kartochki',
      cardDescription: 'Eto opisanie kartochki s uluchsheedm stilem',
      cardContentExample: 'Soderzhim kartochki idet zdes s uluchshenn intervalami i tipografikoy.',
      anotherCard: 'Drug kartochka',
      cardsNowResponsive: 'Kartochki teper imeyut luchshiy adaptiv dizayn',
      cardAction: 'Deystvie kartochki',
      enhancedFeatures: 'Uluchshenn funktsii',
      improvedAccessibility: 'Improved accessibility and design tokens',
      feature1: 'Funktsiya 1',
      feature2: 'Funktsiya 2',
      enhancedAccordion: 'Uluchshen akkordeon',
      accordionWithAnimations: 'Akkordeon s uluchshenn animationmi i accessibilityyu',
      whatAreNewFeatures: 'Kakie nov funktsii?',
      newFeaturesAnswer: 'Uluchshenn UI komponotnty vklyuchayut uluchshennuyu accessibility, luchshie sostoyaniya fokusa, soglasovann dizayn tokeny i uluchshenn animatsii. Vse komponotnty teper sleduyut sovremeedm dizayn patternam i luchshim praktikam.',
      howDoFormsWork: 'Kak rabotayut form?',
      formsWorkAnswer: 'Komponotnty form postrny s integratsiey React Hook Form, avtomaticheskoy validatsiey i uluchshenn funktsiyami accessibilityi. Oni obespechivayut luchshuyu obrabotku oshibok i obratnuyu svyaz s polzovatelem.',
      whatAboutImages: 'Chto s obrabotkoy izobrazheniy?',
      imagesAnswer: 'Komponotnt ImageWithFallback obespechivaet avtomaticheskuyu obrabotku oshibok dlya povrezhdenn izobrazheniy, pokazyv zapolnitel po umolchaniyu kogda izobrazheniya not zagruzhayutsya. Eto uluchshaet polzovatelskiy opyt vo vsem prilozhenii.',
      imageWithFallback: 'Izobrazhenie s rezervom',
      demonstratesAutoFallback: 'Demonstriruet avtomaticheskiy rezerv dlya povrezhdenn izobrazheniy',
      workingImage: 'Rabochee izobrazhenie',
      brokenImageFallback: 'Povrezhdenn izobrazhenie (pokazyvaet rezerv)',
    },
  },

  carDetail: {
    // Header and Navigation
    backToSearch: 'Nazad k poisku',
    
    // Vehicle Title and Info
    vehicleTitle: 'Zagolovok carya',
    locationLabel: 'Location',
    originalPrice: 'Pervonachaln pricesa',
    savingsAmount: 'Discount',
    
    // Status Badges
    greatDeal: 'Vygodn predlozhenie',
    verified: 'Proveren',
    
    // Image Gallery
    mainImage: 'Glavn izobrazhenie',
    imageGallery: 'Galereya izobrazheniy',
    viewFullscreen: 'Prosmotr v polnkrannom rezhime',
    imageCounter: 'iz',
    
    // Tabs and Content
    },
    
    // Overview Tab
    },
    
    // Features Tab
    },
    
    // Inspection Tab
    inspection: {
      lastUpdated: 'Poslednote obnovlenie:',
      excellentCondition: 'Excellent sostoyanie',
      pointInspection: 'Zavershena 150-tochechn inspektsiya',
      inspectionCompleted: 'inspektsiya zavershena',
      inspectionScore: 'Opriceska inspektsii',
    },
    
    // History Tab
    history: {
      vehicleHistory: 'Istoriya carya',
      listedForSale: 'Vystavlen na sellu',
      vehicleAdded: 'Car dobavlen na ploshchadku',
      lastService: 'Poslednote obsluzhivanie',
      regularMaintenance: 'Planov obsluzhivanie zaversheno',
    },
    
    // Action Buttons
      getPreApproved: 'Poluchit previewn approvedie',
      calculatePayment: 'Calculate Payment',
      viewDealerProfilee: 'Prosmotret profil dealera',
      viewAllDealerCars: 'Posmotret vse cari dealera',
    },
    
    // Seller Information
      sellerInformation: 'Information o prodavtse',
      dealerRating: 'Dealer Rating',
    },
    
    // Financing Section
      estimatedPayment: 'Estimated Monthly Payment',
      basedOnTerms: 'Na osnove',
      aprForMonths: 'godov na',
      withDown: 'mesyatsev s pervonachalnym vznosom',
    },
    
    // Mock Data Values
      unknownMake: 'Neizvestn marka',
      unknownModel: 'Neizvestn model',
      unknown: 'Neizvestno',
      frontWheelDrive: 'Front-Wheel Drive',
      wellMaintainotd: 'Khorosho obsluzhivaem vehiclen vehicleso v otlichnom sostoyanii.',
      inspectionReport: 'Car byl verifyen i sootvetstvuet nashim standartam kachestva.',
      locationNotSpecified: 'Mestopolozhenie not ukazano',
      privateSeller: 'Private Seller',
        powerSteering: 'Power Steering',
        electricWindows: 'Electric Windows',
        centralLocking: 'Tsentral zamok',
        airbags: 'Airbags',
        abs: 'ABS',
        powerBrakes: 'Usilitel tormozov',
        amfmRadio: 'AM/FM radio',
      },
      drivetrain: 'Front-Wheel Drive',
      historyEvents: [
        'Kuplen novym v 2020 year',
        'Regulyarn obsluzhivanie kazhd 10 000 km',
        'Net avariy v history',
        'One Owner do sikh por'
      ],
      // Locations
      locations: {
        'Berlin, Germany': 'Berlin, Germaniya',
        'Munich, Germany': 'Myunkhen, Germaniya',
        'Hamburg, Germany': 'Gamburg, Germaniya',
        'Frankfurt, Germany': 'Frankfurt, Germaniya',
        'Colognot, Germany': 'Colognot, Germany',
        'Stuttgart, Germany': 'Shtutgart, Germaniya',
        'Dresden, Germany': 'Drezden, Germaniya',
        'Leipzig, Germany': 'Leyptsig, Germaniya',
        'Nuremberg, Germany': 'Nyurnberg, Germaniya',
        'Düsseldorf, Germany': 'Dyusseldorf, Germaniya'
      },
      // Dealers
        'Premium Motors': 'Premium Motors',
        'BMW Center': 'BMW Tsentr',
        'Auto House': 'Avto Khaus',
        'Elite Motors': 'Elit Motors',
        'Sports Cars GmbH': 'Sport Kars GmbKh',
        'City Motors': 'Siti Motors',
        'BMW Dresden': 'BMW Drezden',
        'Auto Leipzig': 'Avto Leyptsig',
        'Premium Cars': 'Premium Kars',
        'BMW Düsseldorf': 'BMW Dyusseldorf'
      },
      // Fuel types
      fuel: {
        'Diesel': 'Diesel',
        'Petrol': 'Gasoline',
        'Electric': 'Elektrichestvo',
        'Electric': 'Hybrid'
      },
      // Transmission types
      transmission: {
        'Automatic': 'Automatic',
        'Manual': 'Manual',
        'Semi-Automatic': 'Semi-Automatic'
      }
    },
    
    // Error States
      carNotFound: 'Car not nayden',
      failedToLoad: 'Ne udalos upload detali carya.',
      dsntExist: 'The car you are looking for does not exist or has been removed.',
      hasBeenRemoved: 'has been removed',
      backToCars: 'Nazad k caryam',
    },
    
    // Loading States
      loadingVehicle: 'Zagruzka carya...',
      loadingDetails: 'Zagruzka detaley...',
    },
    
    // Contact and Communication
      preferredContactMethod: 'Predpochtitel sposob svyazi',
      additionalMessage: 'Dopolniteln soobshchenie',
      sendInquiry: 'Otpravit zapros',
      emailDealer: 'Napisat dealeru',
    },
    
    // Test Drive
    testDrive: {
      preferredDate: 'Predpochtiteln data',
      preferredTime: 'Predpochtiteln time',
      additionalNotes: 'Dopolniteln zametki',
      submitRequest: 'Otpravit zapros',
    },
    
    // Share Feature
      shareOnSocial: 'Share on Social Networks',
      linkCopiedToClipboard: 'Link copied to clipboard!',
      emailToFriend: 'Email to Friend',
      genotrateQR: 'Genotrate QR Code',
    },
  },

  // Rasshirenn funktsii
  advancedFeatures: {
    // Advanced Search
      active: 'Advanced Search aktiven',
      
      // Razdely
      },
      
      // Polya detaley carya
        arTo: 'Year To',
      },
      
      // Zapolniteli
        anyPrice: 'Any Price',
        anyFuel: 'Any Fuel',
        anyTransmission: 'Any Transmission',
        anyBodyType: 'Any Body Type',
        anyDrivetrain: 'Any Drivetrain',
        cityStateZip: 'City, State or ZIP',
        anyRadius: 'Any Distance',
        anySeller: 'Any Seller',
      },
      
      // Optsii
          over100k: 'Over 100,000 km',
        },
        radius: {
          miles25: '25 km',
          miles50: '50 km',
          miles100: '100 km',
          miles200: '200 km',
        },
        sellerType: {
          private: 'Private Seller',
          both: 'Both',
        },
      },
      
      // Specifications
        allWheelDrive: 'All-Wheel Drive',
        bluetoothConnectivity: 'Bluetooth Connectivity',
        navigationSystem: 'Navigation System',
        parkingAssist: 'Parking Assist',
        powerWindows: 'Power Windows',
        pushButtonStart: 'Zapusk knopkoy',
        thirdRowSeating: 'Third Row Seating',
        towingPackage: 'Pritsepn ustroystvo',
        premiumSound: 'Premium Sound System',
        adaptiveCruiseControl: 'Adaptive Cruise Control',
        lanotKeepAssist: 'Help uderzhaniya v polose',
        automaticEmergencyBraking: 'Automatic ekstrenn tormozhenie',
        ventilatedSeats: 'Ventilated Seats',
        wirelessCharging: 'Wireless Charging',
        panoramicSunroof: 'Panoram lyuk',
        memorySeats: 'Memory Seats',
        headUpDisplay: 'Prktsion displey',
        nightVision: 'Nochn videnie',
        massagingSeats: 'Massazhn sidenya',
      },
    },
    
    // Sravnotnie
    comparison: {
      compareCars: 'Sravnit cari',
      compareNow: 'Sravnit seychas',
      
      // Polya sravnotniya
        enginot: 'Enginot',
        torque: 'Krutyashchiy moment',
        fuelEconomy: 'Fuel consumption',
        seatingCapacity: 'Vmestimost',
        warranty: 'Warranty',
        dealerInfo: 'Information o dealere',
      },
      
      // Panotl sravnotniya
      bar: {
        max: 'maks.',
      },
      
      // Neaccessno
      notAvailable: 'N/D',
    },
    
    // Kalkulyator financingovaniya
    financingCalculator: {
      
      // Razdely
        downPayment: 'Pervonachal vznos',
        loanTerms: 'Usloviya kredita',
      },
      
      // Polya
        vehiclePrice: 'Tsena carya',
        salesTax: 'Nalog s sell',
        dealerFees: 'Komissii dealera',
        tradeInValue: 'Stoimost obmena',
        downPaymentPercent: 'Propricest pervonachaln vznosa',
        interestRate: 'Propricestn stavka (GPS)',
        monthlyPayment: 'Raschet ezhemesyach payment',
        totalLoanAmount: 'Obshch summa kredita',
        totalCost: 'Obshch stoimost',
      },
      
      // Metki
        months: 'mesyatsev',
        percent: '%',
        perMonth: '/mesyats',
        interestPaid: 'Vyplachenn propricesty',
        totalPaid: 'Obshch vyplata',
      },
      
      // Knopki
        reset: 'Sbrosit kalkulyator',
        findFinancing: 'Nayti varianty financingovaniya',
      },
      
      // Primechaniya
      notes: {
        estimate: 'Eto priblizitel raschet. Fakticheskie terms mogut otlichatsya.',
        taxesVary: 'Nalv stavki razlichayutsya v zavisimosti ot mestopolozheniya.',
        additionalFees: 'Mogut primenyatsya dopolniteln sbory.',
      },
    },
  },

      noSavedCars: 'Poka nott sokhranotnn carey',
      view: 'Details'
    }
  }
};