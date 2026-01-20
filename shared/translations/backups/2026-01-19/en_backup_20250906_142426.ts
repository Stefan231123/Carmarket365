import { TranslationStrings } from '../translations';

export const enTranslations: TranslationStrings = {
  common: {
    loading: 'Loading...',
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
    view: 'View',
    contact: 'Contact',
    phonot: 'Phonot',
    email: 'Email',
    location: 'Location',
    price: 'Price',
    currency: 'USD',
    ar: 'Year',
    make: 'Make',
    model: 'Model',
    mileage: 'Mileage',
    condition: 'Condition',
    features: 'Features',
    description: 'Description',
    images: 'Images',
    seller: 'Seller',
    dealer: 'Dealer',
    private: 'Private',
    yes: 'Yes',
    no: 'No',
    menu: 'Menu',
    new: 'New',
    certified: 'Certified',
    vehicle: 'Vehicle',
    message: 'Message',
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
    loading: 'Loading...',
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
      makeRequired: 'Make is required',
      modelRequired: 'Model is required',
      arRequired: 'Year required',
      arInvalid: 'Invalid year',
      mileageRequired: 'Mileage required',
      mileageNegative: 'Mileage cannot be notgative',
      dateRequired: 'Please select a date',
      timeRequired: 'Please select a time',
    },
    labels: {
      fullName: 'Full Name',
      email: 'Email',
      phonot: 'Phonot number',
      message: 'Message',
    },
    placeholders: {
      enterFullName: 'Enter your full name',
      enterEmail: 'Enter your email',
      enterPhonot: 'Enter your phonot number',
      contactMessage: 'Hello, I am interested in the {ar} {make} {model}. Please contact me for more details.',
    },
    actions: {
      sendMessage: 'Send Message',
    },
  },

  // Modals - titles, descriptions, success messages
  modals: {
    contactCar: {
      title: 'Contact Seller',
      description: 'Send message about this car',
      successTitle: 'Message sent successfully!',
      successDescription: 'Your message has been sent to the seller. They will contact you soon.',
    },
    financing: {
      title: 'Get Pre-Approval for Financing',
      description: 'Get pre-approved for auto financing in minutes',
      badges: {
        financingAvailable: 'Financing Available',
      },
      employmentStatus: {
        rthesered: 'Rthesered',
        student: 'Student',
        unotmplod: 'Unotmployed',
      },
      placeholders: {
        enterFullName: 'Enter your full name',
        enterPhonot: 'Enter your phonot number',
        enterEmail: 'Enter your email address',
        enterLoanAmount: 'Enter loan amount',
        enterAnnualIncome: 'Enter annual income',
        enterMonthlyExpenses: 'Enter monthly expenses',
        selectRange: 'Select range',
        selectStatus: 'Select status',
        selectDuration: 'Select duration',
      },
      validation: {
        validEmail: 'Please enter a valid email',
        monthlyExpensesRequired: 'Monthly expenses are required',
      },
    },
    scheduleTestDrive: {
      title: 'Schedule Test Drive',
      description: 'Book an appointment to test drive this vehicle',
      badge: 'Test Drive Available',
      labels: {
        fullName: 'Full Name',
        email: 'Email',
        phonot: 'Phonot number',
        preferredDate: 'Preferred Date',
        preferredTime: 'Preferred Time',
        specialRequests: 'Special Requests',
      },
      placeholders: {
        enterFullName: 'Enter your full name',
        enterEmail: 'Enter your email address',
        enterPhonot: 'Enter your phonot number',
        selectDate: 'Select preferred date',
        selectTime: 'Select preferred time',
        enterRequests: 'Any special requests or questions?',
      },
      validation: {
        emailInvalid: 'Please enter a valid email',
        dateRequired: 'Please select a preferred date',
        timeRequired: 'Please select a preferred time',
      },
      success: {
        title: 'Test Drive Scheduled!',
        description: 'Your test drive request has been sent to the seller. They will contact you to confirm the appointment.',
      },
      actions: {
        cancel: 'Cancel',
        schedule: 'Schedule Test Drive',
        scheduling: 'Scheduling...',
      },
    },
    tradeIn: {
      title: 'Trade-In Estimator',
      description: 'Get an instant estimate of your current vehicle trade-in value',
      tabs: {
        vehicleInfo: 'Vehicle Information',
        condition: 'Condition',
        results: 'Results'
      },
      form: {
        labels: {
          make: 'Make',
          model: 'Model',
          ar: 'Year',
          mileage: 'Mileage (km)',
          condition: 'Overall Condition',
          accident: 'Accident History',
          serviceHistory: 'Service History',
          modifications: 'Modifications'
        },
        placeholders: {
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
            poor: 'Poor'
          },
          accident: {
            nonot: 'No accidents',
            minor: 'Minor accident',
            major: 'Major accident',
            multiple: 'Multiple accidents'
          },
          serviceHistory: {
            complete: 'Complete of service history',
            partial: 'Partial of service history',
            nonot: 'No of service history'
          },
          modifications: {
            nonot: 'No modifications',
            minor: 'Minor modifications',
            major: 'Major modifications'
          }
        }
      },
      validation: {
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
        title: 'Your Trade-In Estimate',
        estimatedValue: 'Estimated Trade-In Value',
        range: 'Range',
        confidence: 'Confidence Level',
        confidenceLevels: {
          high: 'High',
          medium: 'Copperium',
          low: 'Low'
        },
        factors: {
          title: 'Factors affecting your estimate',
          positive: 'Positive factors',
          notgative: 'Negative factors',
          notutral: 'Neutral factors'
        },
        recommendations: {
          title: 'Recommendations',
          maintenance: 'Consider addressing maintenance issues before trading',
          documentation: 'Gather all of service records and documentation',
          inspection: 'Get a professional inspection for accurate assessment',
          timing: 'Consider maket timing for your specific make and model'
        },
        disclaimer: {
          title: 'Important Notice',
          text: 'This is an estimated cost based on the provided information. Actual trade-in values may vary depending on dealer policies, current maket conditions, and physical inspection of the vehicle. We recommend obtaining quotes from multiple dealers for the most accurate assessment.'
        }
      },
      actions: {
        calculate: 'Calculate Estimate',
        recalculate: 'Recalculate',
        getQuotes: 'Get Dealer Quotes',
        startOver: 'Start Over',
        close: 'Close',
        notxt: 'Next',
        previous: 'Back'
      },
      loading: {
        calculating: 'Calculating your estimate...',
        fetchingData: 'Fetching maket data...'
      }
    },
    badges: {
      new: 'New',
      certified: 'Certified',
    },
  },

  hero: {
    title: 'Find Your Ideal Car',
    subtitle: 'Browse thousands of quality pre-ownotd vehicles',
    searchButton: 'Find Cars',
    advancedSearch: 'Advanced Search',
    vehicleTypes: {
      cars: 'Cars',
      motorbikes: 'Motorbikes',
      trucks: 'Trucks',
    },
    searchForm: {
      make: 'Make',
      model: 'Model',
      priceFrom: 'Price From',
      priceTo: 'Price To',
      arFrom: 'Year From',
      mileage: 'Mileage (km)',
      location: 'Location',
      anyMake: 'Any Make',
      anyModel: 'Any Model',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minYear: 'Min Year',
      anyYear: 'Any Year',
      anyMileage: 'Any Mileage',
      maxMileage: 'Max Mileage',
      noMin: 'No Min',
      noMax: 'No Max',
      enterLocation: 'Enter city or postal code',
    },
    availableCars: 'Over 50,000 cars available nationwide',
  },

  // Features Section
  features: {
    title: 'Why Choose CarFinder?',
    subtitle: 'We make car buying simple, safe, and transparent with our comprehensive platform',
    items: {
      verifiedListings: {
        title: 'Verified Listings',
        description: 'All cars are inspected and verified by our team of experts to ensure quality and authenticity.',
      },
      advancedSearch: {
        title: 'Advanced Search',
        description: 'Find exactly what you\'re looking for with our powerful search filters and smart recommendations.',
      },
      bestPrices: {
        title: 'Best Prices',
        description: 'Competitive pricing with no hidden fees. Get the best value for your money every time.',
      },
      freeDelivery: {
        title: 'Free Delivery',
        description: 'Get your car delivered to your doorstep within 50 miles. Safe and secure transportation.',
      },
      quickProcess: {
        title: 'Quick Process',
        description: 'Complete your purchase in minutes with our streamlinotd buying process and digital paperwork.',
      },
      expertSupport: {
        title: 'Expert Support',
        description: 'Our dedicated team is here to help you every step of the way, from search to purchase.',
      },
    },
  },

  // Last Search Section
  lastSearch: {
    title: 'Last Search',
    description: 'BMW cars from €20,000 - €35,000, years 2019-2022 • Found 247 results',
    viewMore: 'Show more',
    matchPercentage: '% match',
  },

  // Interesting Suggestions Section
  suggestions: {
    title: 'This might interest you',
    description: 'Fresh BMW listings matching your criteria • Recently added to the platform',
    seeMore: 'Show more suggestions',
    daysAgo: 'd ago',
  },

  // Popular Brands Section
  brands: {
    title: 'Shop by Brands',
    description: 'Browse cars from the most popular manufacturers',
    carsCount: 'cars',
  },

  header: {
    welcome: 'Welcome to CarMarket365',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    myAccount: 'My Account',
    dashboard: 'Dashboard',
    home: 'Home',
    browseCars: 'Browse Cars',
    sellCar: 'Sell Car',
    savedCars: 'Saved Cars',
    financing: 'Financing',
    about: 'About Us',
    contact: 'Contact',
    faq: 'Frequently Asked Questions',
    help: 'Help',
  },

  cars: {
    title: 'Cars for Sale',
    searchPlaceholder: 'Make, model or keyword',
    noResults: 'No cars found matching your criteria',
    resultsCount: 'Found {count} vehicles',
    viewDetails: 'View Details',
    contactSeller: 'Contact Seller',
    saveToFavorites: 'Save to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    carDetails: 'Car Details',
    specifications: 'Specifications',
    fuelType: 'Fuel type',
    transmission: 'Transmission',
    bodyType: 'Body Type',
    exteriorColor: 'Exterior Color',
    interiorColor: 'Interior color',
    drivetrain: 'Drive type',
    vin: 'VIN Number',
    inspection: 'Inspection',
    history: 'History',
    financing: 'Financing',
    testDrive: 'Test Drive',
    makeOffer: 'Make Offer',
    featured: 'Featured Listings',
    handpicked: 'Handpicked Cars for You',
    discover: 'Discover our carefully selected premium vehicles',
    allCars: 'All Cars',
    newCars: 'New Cars',
    certifiedPreOwnotd: 'Certified Pre-Ownotd',
    electric: 'Electric',
    luxury: 'Luxury',
    viewAllCars: 'View All Cars',
  },

  filters: {
    title: 'Search Filters',
    anyMake: 'Any Make',
    anyModel: 'Any Model',
    anyYear: 'Any Year',
    priceRange: 'Price Range',
    priceMin: 'Min Price',
    priceMax: 'Max Price',
    arRange: 'Year Range',
    arMin: 'Min Year',
    arMax: 'Max Year',
    mileageMax: 'Max Mileage',
    location: 'Location',
    fuelTypes: 'Fuel Type',
    transmissionTypes: 'Transmission',
    bodyTypes: 'Body Type',
    condition: 'Condition',
    applyFilters: 'Apply Filters',
    clearFilters: 'Clear Filters',
  },

  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phonotNumber: 'Phonot Number',
    rememberMe: 'Remember Me',
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
    backToHome: 'Back to Home',
    signInToAccount: 'Sign in to your account',
    welcomeBack: 'Welcome back',
    enterCredentials: 'Enter your credentials to access your account',
    privatePersonDescription: 'Buy or sell your car',
    dealerDescription: 'Professional seller',
    pro: 'Pro',
    enterYourEmail: 'Enter your email',
    enterYourPassword: 'Enter your password',
    signingIn: 'Logging in...',
    orContinueWith: 'Or continue with',
    google: 'Google',
    facebook: 'Facebook',
    createPrivateAccount: 'Create Private Account',
    registerAsDealer: 'Register as Dealer',
    dealerBenotfits: 'Dealer Benotfits',
    professionalDashboard: '• Professional dealer dashboard',
    inventoryManagement: '• Advanced inventory management',
    customerTracking: '• Customer inquiry tracking',
    enhancedVisibility: '• Enhanced listing visibility',
    analyticsInsights: '• Analytics and insights',
    
    // UserSignUp page specific
    createYourAccount: 'Create your account',
    joinThousands: 'Join thousands of car enthusiasts',
    privateAccount: 'Private Account',
    buyAndSellCars: 'Buy and sell cars, save favorites and manage listings',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    emailAddress: 'Email Address',
    createStrongPassword: 'Create a strong password',
    confirmYourPassword: 'Confirm your password',
    mustBeCharacters: 'Must be at least 8 characters',
    agreeToTerms: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
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
      label: 'Password strength',
      levels: {
        weak: 'Weak',
        medium: 'Copperium',
        strong: 'Strong',
      },
      requirements: {
        label: 'Requirements:',
        length: 'At least 8 characters',
        uppercase: 'Onot uppercase letter',
        lowercase: 'Onot lowercase letter',
        number: 'Onot number',
        special: 'Onot special character (!@#$%^&*)',
      },
    },
    
    // Social login
    socialLogin: {
      signingIn: 'Signing in...',
      google: {
        description: 'Use your Google account to quickly sign in or create a new account.',
      },
      facebook: {
        description: 'Connect with Facebook to access your CarMarket365 account.',
      },
    },
    
    // Access control
    accessDenied: {
      title: 'Access Denied',
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
    businotssName: 'Businotss Name',
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
    optional: 'Optional',
    arEstablished: 'Year Established',
    selectYear: 'Select Year',
    businotssDescription: 'Description biznotsa',
    businotssDescriptionPlaceholder: 'Describe your businotss, specializations and of services...',
    contactPerson: 'Contact Person',
    primaryContactInfo: 'Primary contact information for your businotss',
    position: 'Dolzhnost',
    positionPlaceholder: 'e.g., Ownotr, Sales Manager',
    businotssEmail: 'Korporativ email',
    businotssEmailPlaceholder: 'businotss@example.com',
    businotssAddress: 'Adres biznotsa',
    dealershipLocation: 'Physical location of your dealership',
    streetAddress: 'Ulich adres',
    streetAddressPlaceholder: 'Businotss Center St., 123',
    city: 'City',
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
    accountSetup: 'Nastroyka accounta',
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
    emailRequired: 'Email is required',
    phonotRequired: 'Phonot number is required',
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
    title: 'Sell Your Car',
    sellYourCar: 'Sell Your Vehicle',
    carInformation: 'Car Information',
    uploadPhotos: 'Upload Photos',
    setPrice: 'Set Price',
    contactInformation: 'Contact Information',
    publish: 'Publish',
    draft: 'Sokhranit kak draft',
    preview: 'Predvaritel view',
    required: 'Required',
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
      details: 'Detali',
      photosAndContact: 'Foto i kontakty',
    },
    
    // Vehicle type selection
    vehicleTypes: {
      car: {
        name: 'Car',
        description: 'Sedany, krossovery, kupe, khetchbeki',
      },
      truck: {
        name: 'Gruzovik',
        description: 'Pikapy, commercialeskiy vehicle',
      },
      motorbike: {
        name: 'Mototsikl',
        description: 'Mototsikly, skutery, kvadrotsikly',
      },
    },
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'Kakoy tip vehiclea vy prodaete?',
      basicInformation: 'Basic Information',
      basicInfoDescription: 'Tell us about your {vehicleType}',
      additionalDetails: 'Dopolniteln detali',
      additionalDetailsDescription: 'Add more details about your {vehicleType}',
      photosAndContact: 'Photos and Contact Information',
      photosAndContactDescription: 'Dobavte photos i kontaktn these',
    },
    
    // Form fields and labels
    fields: {
      make: 'Make',
      model: 'Model',
      ar: 'Year',
      mileage: 'Mileage',
      condition: 'Condition',
      fuelType: 'Fuel type',
      transmission: 'Transmission',
      exteriorColor: 'Exterior Color',
      interiorColor: 'Interior Color',
      askingPrice: 'Zaprashivaem pricesa',
      featuresAndOptions: 'Specifications i optsii',
      description: 'Description',
      vehiclePhotos: 'Fotografii vehiclea',
      contactName: 'Contact Name',
      phonotNumber: 'Phonot number',
      emailAddress: 'Adres elektronnoy pochty',
      location: 'Location',
    },
    
    // Placeholders
    placeholders: {
      selectMake: 'Select Make',
      enterModel: 'Vvedite model',
      selectYear: 'Select Year',
      selectCondition: 'Select Condition',
      enterMileage: 'Vvedite probeg',
      selectFuelType: 'Select Fuel Type',
      selectTransmission: 'Select Transmission',
      exteriorColorExample: 'e.g., white, black, silver',
      interiorColorExample: 'e.g., black, beige, gray',
      priceExample: '25.000',
      descriptionExample: 'Opishite sostoyanie vashego vehiclea, istoriyu i dopolniteln detali...',
      yourFullName: 'Your full name',
      phonotExample: '(8) 123-456-78',
      emailExample: 'vash.email@primer.ru',
      cityState: 'Gorod, Oblast',
      yourName: 'Your name',
      yourPhonotNumber: 'Your nomer phonota',
      yourEmail: 'Your email',
      cityCountry: 'Gorod, Strana',
      enterAskingPrice: 'Vvedite zhelaemuyu pricesu',
      describeYourVehicle: 'Opishite vash car...',
      selectFuel: 'Select Fuel Type',
      selectTransmissionType: 'Select Transmission Type',
      choosePhotos: 'Choose Photos',
    },
    
    // Headers
    headers: {
      vehicleTypeQuestion: 'Kakoy tip vehiclea vy prodaete?',
      basicInformation: 'Basic Information',
      basicInfoDescription: 'Tell us about your {vehicleType}',
      additionalDetails: 'Dopolniteln detali',
      additionalDetailsDescription: 'Add more details about your {vehicleType}',
      photosAndContact: 'Photos and Contact Information',
      photosAndContactDescription: 'Dobavte photos i vashi kontaktn these',
      vehicleDetails: 'Vehicle Details',
      photosAndContactInfo: 'Photos and Contact Information',
      uploadVehiclePhotos: 'Upload Vehicle Photos',
      addUpToTenPhotos: 'Dobavit do 10 fotografiy',
    },
    
    // Button labels
    buttons: {
      notxtStep: 'Sleduyushchiy shag',
      previous: 'Previous',
      createListing: 'Sozdat listing',
    },
    
    // Preview section
    preview: {
      title: 'Predvaritel view',
      yourVehicle: 'Your vehicle',
      milesLabel: 'kilometers',
      priceLabel: 'Price',
      photosCount: '{count} fotografi{plural}',
      photo: 'ya',
      photos: 'y',
    },
    
    // Photo upload
    photos: {
      instruction: 'Add up to 10 high-quality photos of your vehicle. The first photo will be the main image in search results.',
      selected: '{count} photo{plural} selected',
      photo: 'ya',
      photos: 'y',
    },
    
    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'EUR', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    
    // Fuel types
    fuelTypes: {
      gasolinot: 'Gasoline',
      electric: 'Electric',
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
      truck: 'Gruzovik',
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
      new: 'New',
      likeNew: 'Like New',
      excellent: 'Excellent',
      veryGood: 'Very Good',
      good: 'Good',
      fair: 'Fair',
      poor: 'Plokh',
    },
    
    // Features list
    features: {
      airConditioning: 'Air Conditioning',
      leatherSeats: 'Leather Seats',
      heatedSeats: 'Heated Seats',
      sunroof: 'Sunroof',
      gpsNavigation: 'GPS navigation',
      backupCamera: 'Backup Camera',
      bluetooth: 'Bluetooth',
      usbPorts: 'USB Portsy',
      premiumSound: 'Premium audio',
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

  modals: {
    close: 'Close',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    contactSeller: 'Contact Seller',
    scheduleTestDrive: 'Schedule Test Drive',
    requestFinancing: 'Request Financing',
    reportListing: 'Report Listing',
    shareListng: 'Share Listing',
    sendMessage: 'Send Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhonot: 'Your Phonot',
    message: 'Message',
    interestedIn: 'I am interested in',
    preferredTime: 'Preferred Time',
    additionalNotes: 'Additional Notes',
    share: {
      title: 'Share This Car',
      description: 'Share this vehicle with friends and family',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied!',
      linkCopiedToClipboard: 'Link copied to clipboard',
      shareViaEmail: 'Share via Email',
      shareOnWhatsApp: 'Share on WhatsApp',
      facebook: 'Facebook',
      twitter: 'Twitter',
      close: 'Close'
    },
  },

  footer: {
    aboutUs: 'Your trusted maket for quality used cars. Find your ideal car among thousands of listings.',
    quickLinks: 'Quick Links',
    searchCars: 'Search Cars',
    sellYourCar: 'Sell Your Car',
    registeredDealers: 'Registered Dealers',
    carReviews: 'Car Reviews',
    support: 'Support',
    contactUs: 'Contact Us',
    safetyTips: 'Safety Tips',
    dealerSupport: 'Dealer Support',
    faq: 'Frequently Asked Questions',
    legal: 'Legal Information',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    imprint: 'Legal Notice',
    accessibility: 'Accessibility',
    dashboard: 'Dashboard',
    adminPanotl: 'Admin Panotl',
    dealerDashboard: 'Dealer Dashboard',
    myDashboard: 'My Dashboard',
    signInToAccess: 'Sign in to access dashboard',
    followUs: 'Follow Us',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Subscribe to Newsletter',
    emailAddress: 'Email Address',
    subscribe: 'Subscribe',
    copyright: 'Copyright',
    allRightsReserved: 'All Rights Reserved',
  },

  errors: {
    genotric: 'Something went wrong. Please try again.',
    nottwork: 'Network error. Please check your connection.',
    notFound: 'The requested item was not found.',
    unauthorized: 'You do not have permission to access this resource.',
    forbidden: 'Access to this resource is forbidden.',
    serverError: 'Server error. Please try again later.',
    validation: 'Please check your data and try again.',
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
      message: 'Something went wrong. Please try refreshing the page.',
      details: 'Error Details',
      stackTrace: 'Stack trace:',
      refreshPage: 'Refresh Page',
      tryAgain: 'Try Again',
    },
  },

  success: {
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
    disclaimer: 'Otkaz ot otvetstvennotss',
    carInsurance: 'Avtostrakhovanie',
    underConstruction: 'V razrabotke',
    underConstructionMessage: 'Dann stranitsa nakhoditsya v razrabotke. My userdno rabotaem nad sozdaniem potryasayushchikh funktsiy. Pozhaluysta, zaydite pozzhe ili prodolzhite izuchat nashu glavnuyu stranitsu.',
    backToHome: 'Vernutsya na glavnuyu',
    contactUs: 'Svyazhites s nami',
    
    // Usloviya of service
    termsOfService: {
      title: 'Usloviya of service',
      subtitle: 'Legal terms of use our platform car market.',
      backToHome: 'Vernutsya na glavnuyu',
      termsAndConditions: 'Usloviya i polozheniya',
      termsDescription: 'Pozhaluysta, carefully review s these terms before ispolzovaniem our platform.',
      overviewText: 'Dann Usloviya of service govern ispolzovanie your platform CarMarket365 i definot rights i obligations all users. Poluch access k our platforme, vy agree comply with these terms.',
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
      title: 'Politika privacyi',
      subtitle: 'Your privacy vazhna dlya nas. Uznayte, kak my sobiraem, ispolzuem i zashchishchaem vashu lichnuyu informatsiyu.',
      backToHome: 'Vernutsya na glavnuyu',
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
      returnToPlatform: 'Vernutsya na platformu',
      contactPrivacyTeam: 'Svyazatsya s komandoy po privacyi'
    },

    // Page-zaglushka
    placeholder: {
      underConstruction: 'V razrabotke',
      underConstructionMessage: 'Dann stranitsa nakhoditsya v razrabotke. My userdno rabotaem nad sozdaniem potryasayushchikh funktsiy. Pozhaluysta, zaydite pozzhe ili prodolzhite izuchat nashu glavnuyu stranitsu.',
      backToHome: 'Vernutsya na glavnuyu',
      contactUs: 'Svyazhites s nami'
    },

    // Chasto asked questions
    faq: {
      title: 'Chasto asked questions',
      subtitle: 'Naydite answers na rasprostranotnn questions o buye, selle, financingovanii i ispolzovanii CarMarket365.',
      searchPlaceholder: 'Search v FAQ...',
      browseByCategory: 'Search po kategoriyam',
      allQuestions: 'Vse questions',
      stillNeedHelp: 'Nuzhna dopolniteln help?',
      stillNeedHelpDescription: 'Ne can find to, chto looking for? Nasha team support ready help.',
      callSupport: 'Pozvonit v sluzhbu support',
      emailUs: 'Napisat nam',
      liveChat: 'Zhivoy chat',
      available247: 'Dostupno 24/7',
      noResultsFound: 'Resulty not naydeny',
      noResultsText: 'Poprobuyte poisk s otherimi klyuchev sloyour ili viewite po kategoriyam.',
      clearSearch: 'Ochistit poisk',
      commonQuestionsAbout: 'Chasto asked questions o',
      
      categories: {
        buying: 'Pokupka carey',
        selling: 'Prodazha carey',
        financing: 'Finansirovanie i paymenti',
        safety: 'Bezopasnost i zashchita',
        account: 'Account i podderzhka'
      },

      buyingFaqs: [
        {
          question: 'Kak find cari na CarMarket365?',
          answer: 'Vy can search cari s helpyu form search na main page ili na page "Prosmotr carey". Filteruyte po make, model, year, price range, location i mnmu other. Ispolzuyte advanced poisk dlya detailed filtering.'
        },
        {
          question: 'Vse li listings verifyeny?',
          answer: 'Da, vse listings na CarMarket365 verifyeny. My provodim verifyku biograficheskikh these all dealers i chastn prodavtsov, a also verifyyaem informatsiyu o vehiclen vehiclesakh na tochnost before razmeshcheniem.'
        },
        {
          question: 'Mogu li ya schedule na test drive?',
          answer: 'Konotchno! Vy can schedule na test drive directly through stranitsu s details carya. Svyazhites s seller, to arrange o suitable vremeni i place dlya test drivea.'
        },
        {
          question: 'Chto mnot vzyat s soboy dlya viewa carya?',
          answer: 'Vozmite deystvuyushchie voditelskie rights, podtverzhdenie strakhovaniya i any pisma o previewnom approvedii financingovaniya. Esli planiruete pokupat, vozmite bankovskiy chek ili dokumenty o financingovanii.'
        },
        {
          question: 'Kak uznat, spravedliva li pricesa carya?',
          answer: 'My provide estimates market value dlya all vehiclen vehicles. Vy also can compare similar cari, check report ob history vehiclen vehiclesa i ispolzovat nashi tools analysis prices.'
        }
      ],

      sellingFaqs: [
        {
          question: 'Kak razmestit listing o selle mgo carya?',
          answer: 'Ispolzuyte formu "Prodat car" dlya sozdaniya listings. Vam ponadobyatsya detali vehiclen vehiclesa, photos, information o sostoyanii i kontaktn these. Protsess zanimaet okolo 10-15 minut.'
        },
        {
          question: 'Est li plata za razmeshchenie listings?',
          answer: 'Bazov listings besplatny dlya chastn prodavtsov. My predlagaem premium varianty obyavleniy s povyshennoy vidimostyu za notbolshuyu platu. U dealers razn struktury pricesoobrazovaniya.'
        },
        {
          question: 'Skolko vremeni trebuetsya dlya selli carya?',
          answer: 'V srednotm cari s pravilnoy pricesoy i khoroshimi fotografiyami prodayutsya v techenie 2-4 notdel. Faktory vklyuchayut pricesoobrazovanie, sostoyanie, rynoch spros i kachestvo listings.'
        },
        {
          question: 'Kakie dokumenty mnot nuzhny dlya selli carya?',
          answer: 'Vam ponadobitsya svidetelstvo o prave sobstvennotss, registeration, zapisi ob obsluzhivanii i deystvuyushchiy pasport. V notkotor regionakh trebuyutsya dopolniteln dokumenty - my provide regionaln rekomendatsii.'
        },
        {
          question: 'Kak ustanovit konkurentnuyu pricesu na moy car?',
          answer: 'Ispolzuyte nash besplat instrument estimates vehiclen vehicles, izuchite similar listings, uchtite sostoyanie vashego carya, probeg i anyoy notdavniy remont ili uluchsheniya.'
        }
      ],

      financingFaqs: [
        {
          question: 'Mogu li ya by accessingit financing through CarMarket365?',
          answer: 'Da, my sotrudnichaem s notskolkimi kreditorami, to predlozhit konkurentn varianty financingovaniya. Vy can by accessingit previewn approvedie onlayn za notskolko minut bez vliyaniya na vash kredit reyting.'
        },
        {
          question: 'Kakoy kredit reyting mnot nuzhen dlya avtokreditovaniya?',
          answer: 'My rabotaem s kreditorami, kotor prinimayut razlichn kreditn reytingi, ot otlichn do plokhikh. Trebovaniya razlichayutsya po kreditoram, no my pomogaem find varianty dlya bolshinstva situatsiy.'
        },
        {
          question: 'Kak rabotaet protsess podachi zvki na kredit?',
          answer: 'Zapolnite nashu onlayn-zvku, by accessingite mgnovenn previewn approvedie, vyberite vashe vehiclen vehicleso i zavershite oformlenie kredita. Ves protsess mozhno zavershit onlayn ili po phonotu.'
        },
        {
          question: 'V chem raznitsa mezhdu previewnoy kvalifikatsiey i previewnym approvediem?',
          answer: 'Predvariteln kvalifikation daet vam opricesku na osnove bazovoy informatsii. Predvariteln approvedie vklyuchaet verifyku kreditnoy history i predostavlyaet tverd kreditn predlozhenie s konkretn terms.'
        },
        {
          question: 'Mogu li ya obmenyat moy tekushchiy car?',
          answer: 'Mnogie iz nashikh partnotrov-dealers prinimayut cari v zachet. Poluchite opricesku obmena s helpyu nashego instrumenta estimates, zatem obsudite varianty s dealerom pri buye.'
        }
      ],

      safetyFaqs: [
        {
          question: 'Kak ostavatsya v safetyi pri buye carya?',
          answer: 'Vstrechaytes v obshchestvenn mestakh, berite s soboy othera, verifyyayte lichnost prodavtsa, tshchatelno osmatrivayte vehiclen vehicleso i use secure sposoby oplaty. Nikogda not perevodite dengi i not platite do osmotra carya.'
        },
        {
          question: 'Kakie sposoby oplaty sam secure?',
          answer: 'Ispolzuyte bankovskie cheki, bankovskie perevody ili financing through verifyenn kreditorov. Izbegayte bankovskikh perevodov, lichn chekov ili nalichn dlya bolshikh summ.'
        },
        {
          question: 'Kak check, chto seller zakon?',
          answer: 'Proverte ikh profil na CarMarket365, prochtite otzyvy, podtverdite ikh kontaktnuyu informatsiyu i vstrettes lichno. Vse nashi dealers previewno verifyeny i proshli verifyku biograficheskikh these.'
        },
        {
          question: 'Chto delat, esli ya podozrevayu moshennichestvo?',
          answer: 'Nemedlenno soobshchite o podozritelnoy aktivnotss through nashu platformu ili obratites k our komande support. My serezno otnosimsya k moshennichestvu i operativno rassleduem vse soobshcheniya.'
        },
        {
          question: 'Nadezhny li reporty ob history vehiclen vehiclesa?',
          answer: 'Da, my provide kompleksn reporty ob history vehiclen vehicles iz nadezhn istochnikov. Oni vklyuchayut istoriyu avariy, zapisi ob obsluzhivanii i informatsiyu o rightskh sobstvennotss.'
        }
      ],

      accountFaqs: [
        {
          question: 'Kak create account?',
          answer: 'Nazhmite "Registration" na anyoy page i predostavte vash elektron adres, nomer phonota i osnovnuyu informatsiyu. Vy also can zaregisterirovatsya through Google ili Facebook dlya bolee bystroy registeratsii.'
        },
        {
          question: 'Ya zabyl parol. Kak ego sbrosit?',
          answer: 'Nazhmite "Zabyli parol?" na page vkhoda, enter vash elektron adres i sleduyte instruktsiyam po sbrosu, kotor my vam otpravim. Ssylka dlya sbrosa valida v techenie 24 chasov.'
        },
        {
          question: 'Kak obnovit informatsiyu v mm profile?',
          answer: 'Voydite v vash account i pereydite v "Settings accounta", gde vy can obnovit lichnuyu informatsiyu, kontaktn these i predpochteniya.'
        },
        {
          question: 'Mogu li ya save cari dlya viewa pozzhe?',
          answer: 'Da! Nazhmite znachok serdtsa na anyom obyavlenii carya, to save ego v izbrann. Poluchite access k sokhranotedm caryam v any time iz panotli upravleniya vashego accounta.'
        },
        {
          question: 'Kak svyazatsya s sluzhboy support?',
          answer: 'Ispolzuyte stranitsu "Svyazhites s nami", zvonite (555) 123-HELP, otpravlyayte pismo na support@carmaket365.com ili use funktsiyu chata v pravom nizhnotm uglu anyoy stranitsy.'
        }
      ]
    }
  },

  // Browse Cars Page
  browseCars: {
    title: 'na sellu',
    searchPlaceholder: 'Marka, model ili klyuchev slovo',
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
    filters: {
      title: 'Filtery search',
      clearAll: 'Clear All',
      apply: 'Primenit',
      makeModel: 'Marka i model',
      priceRange: 'Tsenovoy diapazon',
      from: 'ot',
      to: 'do',
      arRange: 'Year From',
      mileageRange: 'Maksimal probeg',
      location: 'Location',
      withinRadius: 'v radiuse',
      fuelType: 'Fuel type',
      transmission: 'Transmission',
      bodyType: 'Body Type',
      condition: 'Condition',
      features: 'Osobennotss',
      color: 'Color',
      drivetrain: 'Drive type',
      minPrice: 'Minimaln pricesa',
      maxPrice: 'Maksimaln pricesa',
      noMin: 'Bez min.',
      noMax: 'Bez maks.',
      anyLocation: 'Vvedite gorod ili pochtovyy indeks',
      kilometers: 'km',
      miles: 'mili',
      any: 'Any',
    },
    results: {
      showing: 'sootvetstvuyushchikh vashim kriteriyam',
      of: 'iz',
      results: 'carey naydeno',
      noResults: 'Cari not naydeny',
      noResultsMessage: 'Poprobuyte change terms search',
      tryDifferentFilters: 'Poprobuyte otherie filtery',
      loadMore: 'Load More',
      endOfResults: 'Konotts rezultatov',
    },
    carCard: {
      viewDetails: 'Posmotret detali',
      contactSeller: 'Contact',
      saveToFavorites: 'Sokhranit v izbrann',
      saved: 'Saved',
      featured: 'Rekomenduem',
      certified: 'Sertifitsirovann',
      newArrival: 'Nov postuplenie',
      priceReduced: 'Tsena snizhena',
      greatDeal: 'Excellent sdelka',
      kmAbbrev: 'km',
      miAbbrev: 'mi',
      ar: 'god',
      automatic: 'Automatic',
      manual: 'Manual',
      gasolinot: 'Gasoline',
      diesel: 'Diesel',
      electric: 'Electric',
      hybrid: 'Hybrid',
      showPhonot: 'Pokazat phonot',
      hidePhonot: 'Skryt phonot',
      callNow: 'Pozvonit seychas',
      sendMessage: 'Otpravit soobshchenie',
      scheduleTour: 'Zapisatsya na osmotr',
      reportListing: 'Pozhalovatsya na listing',
      shareListing: 'Podelitsya listingm',
    },
    searchSuggestions: {
      title: 'Predlozheniya search',
      recentSearches: 'Nedavnie poiski',
      clearRecent: 'Ochistit notdavnie',
      popularSearches: 'Populyarn poiski',
      suggestedBrands: 'Rekomenduem marki',
      suggestedModels: 'Rekomenduem model',
      noRecentSearches: 'Net notdavnikh poiskov',
    },
    errorStates: {
      failedToLoad: 'Ne udalos upload',
      nottworkError: 'Oshibka sthese',
      tryAgain: 'Poprobovat snova',
      contactSupport: 'Svyazatsya s podderzhkoy',
    },
  },

  // Advanced Search
  advancedSearch: {
    title: 'Advanced Search',
    subtitle: 'Find your ideal car with detailed search filters and preferences',
    backToHome: 'Back to Home',
    searchCars: 'Search Cars',
    saveSearch: 'Save Search',
    clearAll: 'Clear All',
    active: 'active',
    filters: 'filters',
    filter: 'filter',
    
    // Page sections
    sections: {
      basicInformation: {
        title: 'Basic Information',
        description: 'Set basic search criteria',
      },
      technicalSpecs: {
        title: 'Technical Specifications',
        description: 'Engine, transmission and performance details',
      },
      featuresEquipment: {
        title: 'Features Funktsii i Oborudovanie Equipment',
        description: 'Select desired features and equipment',
      },
      preferencesAndCertifications: {
        title: 'Preferences Predpochteniya i Certifications Certifications',
        description: 'Additional preferences and certifications',
      },
      vehicleDetails: {
        title: 'Vehicle Details',
      },
      priceLocation: {
        title: 'Price Tsena i Mestopolozhenie Location',
      },
      featuresOptions: {
        title: 'Features Funktsii i Optsii Options',
        description: 'Select features that are important to you',
      },
    },
    
    // Form fields
    fields: {
      make: 'Make',
      model: 'Model',
      bodyType: 'Body Type',
      condition: 'Condition',
      fuelType: 'Fuel Type',
      transmission: 'Transmission',
      drivetrain: 'Drive type',
      doors: 'Doors',
      seats: 'Seats',
      exteriorColor: 'Exterior Color',
      interiorColor: 'Interior Color',
      colorPreference: 'Color Preference',
      certifications: 'Certifications',
      location: 'Location',
      radius: 'Radius',
      searchRadius: 'Search Radius',
      sellerType: 'Seller Type',
      minYear: 'Min Year',
      maxYear: 'Max Year',
      maxMileage: 'Max Mileage',
    },
    
    // Placeholders
    placeholders: {
      selectMake: 'Select Make',
      enterModel: 'Enter Model Name',
      anyMake: 'Any Make',
      anyModel: 'Any Model',
      anyType: 'Any Type',
      selectBodyType: 'Select Body Type',
      selectCondition: 'Select Condition',
      selectFuelType: 'Select Fuel Type',
      selectTransmission: 'Select Transmission',
      selectDrivetrain: 'Select Drivetrain',
      numberOfDoors: 'Number of doors',
      numberOfSeats: 'Number of seats',
      anyColor: 'Any Color',
      selectPreferredColor: 'Select Preferred Color',
      cityOrPostalCode: 'City or Postal Code',
      cityStateOrZip: 'City, State or ZIP',
      anyMileage: 'Any Mileage',
      anyCondition: 'Any Condition',
      anyDistance: 'Any Distance',
      allSellers: 'All Sellers',
      any: 'Any',
    },
    
    // Range labels
    ranges: {
      priceRange: 'Price Range',
      arRange: 'Year Range',
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
      makes: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citrn', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
      bodyTypes: [
        'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van',
        'Minivan', 'Crossover', 'Compact', 'Subcompact', 'Mid-size', 'Full-size',
        'Sports Car', 'Luxury', 'Economy', 'Hybrid'
      ],
      fuelTypes: [
        'Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid', 'Natural Gas', 'Propane',
        'Flex Fuel', 'Hydrogen', 'Biodiesel', 'E85 Ethanol'
      ],
      transmissions: [
        'Manual', 'Automatic', 'CVT', 'Semi-Automatic', 'Dual Clutch', '6-Speed Manual',
        '7-Speed Automatic', '8-Speed Automatic', '9-Speed Automatic', '10-Speed Automatic'
      ],
      drivetrains: [
        'Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', '4WD', 
        'Part-Time 4WD', 'Full-Time 4WD', 'Electronic All-Wheel Drive', 'Manualiy pol privod'
      ],
      colors: [
        'Black', 'White', 'Silver', 'Gray', 'Blue', 'Maroon', 'Red', 'Green', 'English', 
        'Brown', 'Gold', 'Yellow', 'Orange', 'Purple', 'Tan', 'English', 'Copper',
        'Pearl White', 'Metallic Silver', 'Deep Blue', 'Racing Red', 'Forest Green',
        'Charcoal', 'Navy', 'Beige'
      ],
      conditions: [
        'New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair', 'Used', 
        'Certified Pre-Owned', 'Restored', 'Refurbished', 'Salvage', 'Vintage'
      ],
      features: [
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
      certifications: [
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
    hero: {
      title: 'Svyazhites s nami',
      subtitle: 'Svyazhites s our komandoy. My zdes, to help vam find ideal car ili otvtheset na any questions.',
    },
    departments: {
      phonotSupport: 'Telefonn podderzhka',
      emailAddresses: 'Adresa elektronnoy pochty',
      businotssHours: 'Chasy raboty',
      mainOffice: 'Glav ofis',
    },
    departmentTypes: {
      salesDepartment: 'Otdel sell',
      customerService: 'Sluzhba support',
      financingDepartment: 'Otdel financingovaniya',
      genotralInquiries: 'Obshchie questions',
      salesQuestions: 'Voprosy po sellam',
      support: 'Support',
    },
    hours: {
      mondayFriday: 'Ponotdelnik - Pyatnitsa',
      saturday: 'Saturday',
      sunday: 'Voskresenot',
      timeRange: {
        mondayFriday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    office: {
      address: {
        street: 'Avto Plaza 123',
        city: 'Moskva 101000',
        country: 'Russia',
      },
      getDirections: 'Poluchit napravleniya',
    },
    form: {
      title: 'Otpravte nam soobshchenie',
      subtitle: 'Zapolnite formu nizhe, i my otvthesem v techenie 24 chasov.',
      inquiryType: {
        label: 'Chem my mozhem help?',
        placeholder: 'Select Request Type',
        options: {
          buying: 'Pokupka carya',
          selling: 'Prodazha carya',
          financing: 'Voprosy po financingovaniyu',
          dealer: 'Partnotrstvo dealers',
          support: 'Tekhnichesk podderzhka',
          other: 'Drug',
        },
      },
      fields: {
        fullName: 'Poln name',
        email: 'Adres elektronnoy pochty',
        phonot: 'Phonot number',
        subject: 'Tema',
        message: 'Message',
      },
      placeholders: {
        name: 'Your full name',
        email: 'vasha.pochta@primer.ru',
        phonot: '+7 912 345 67 89',
        subject: 'Kratk opisanie temy',
        message: 'Pozhaluysta, predostavte detali vashego zaprosa...',
      },
      required: '*',
      submitButton: 'Otpravit soobshchenie',
      disclaimer: 'Otpravly etu formu, vy agree s nashimi Usloviyami of service i Politikoy privacyi.',
    },
    success: {
      title: 'Soobshchenie otpravleno successfully!',
      message: 'Spasibo, chto svyazalis s nami. My otvthesem v techenie 24 chasov.',
    },
    quickHelp: {
      title: 'Bystr help',
      subtitle: 'Ishchete notmedlenn answers? Proverte these resursy.',
      options: {
        buyingGuide: {
          title: 'Guide po buye',
          description: 'Uznayte, kak kupit car',
        },
        sellingGuide: {
          title: 'Guide po selle',
          description: 'Sovety po selle vashego carya',
        },
        faq: {
          title: 'FAQ',
          description: 'Chasto asked questions',
        },
        safetyTips: {
          title: 'Sovety po safetyi',
          description: 'Bezopasn buya i sella',
        },
      },
    },
  },

  dealerProfilee: {
    dealerNotFound: 'Diler not nayden',
    dealerNotFoundMessage: 'Profile dealera, kotoryy vy looking for, not sushchestvuet.',
    viewAllDealers: 'Posmotret all dealers',
    browseCars: 'Prosmatrivat cari',
    backToDealers: 'Vernutsya k dealeram',
    showroom: 'dealership',
    verifiedDealer: 'Proveren dealer',
    milesAway: 'mil otsyuda',
    callDealer: 'Pozvonit dealeru',
    viewInventory: 'Prosmotr inventarya',
    visitWebsite: 'Postheset veb-sayt',
    overview: 'Obzor',
    inventory: 'Inventar',
    reviews: 'Reviews',
    contact: 'Contact',
    about: 'About Us',
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
    businotssHours: 'Rabochie chasy',
    mondayFriday: 'Ponotdelnik - Pyatnitsa:',
    saturday: 'Subbota:',
    sunday: 'Voskresenot:',
    currentInventory: 'Tekushchiy inventar',
    hasVehiclesAvailable: 'carey v nalichii',
    viewFullInventory: 'Posmotret pol inventar',
    browseAllVehicles: 'Prosmotret vse accessn cari ot',
    browseCarsCount: 'cars',
    customerReviews: 'Otzyvy clientov',
    verifiedCustomerReviews: 'verifyenn otzyvov clientov',
    verifiedPurchase: 'Proverenn buya',
    contactInformation: 'Contact Information',
    primaryPhonot: 'Primary Phone',
    emailAddress: 'Adres elektronnoy pochty',
    website: 'Veb-sayt',
    physicalAddress: 'Fizicheskiy adres',
    getDirections: 'Poluchit napravleniya',
    interactiveMapPlaceholder: 'Interaktivn karta byla by zdes',
    openInGoogleMaps: 'Otkryt v Google Maps',
  },

  dealerSupport: {
    backToHome: 'Vernutsya domoy',
    title: 'Support dealers',
    subtitle: 'Spetsialn podderzhka dlya registeredn dealers. Poluchite help s vashimi listingsmi, upravleniem accountom i funktsiyami platform.',
    supportCenter: 'Tsentr support dealers',
    supportCenterDescription: 'Kompleksn podderzhka dlya nashikh registeredn dealerskikh partnotrov.',
    quickActions: 'Bystr deystviya',
    accountManagement: 'Upravlenie accountom',
    accountManagementDesc: 'Upravlyayte nastroykami i predpochteniyami vashego dealersk accounta',
    manageAccount: 'Upravlyat accountom',
    listingHelp: 'Help s listingsmi',
    listingHelpDesc: 'Poluchite help s vashimi listingsmi carey i inventarem',
    getListingHelp: 'Poluchit help s listingsmi',
    analyticsReports: 'Analitika i reporty',
    analyticsReportsDesc: 'Prosmatrivayte metriki proizvoditelnotss i genotriruyte reporty',
    viewAnalytics: 'Posmotret analitiku',
    contactSupport: 'Svyazatsya s podderzhkoy',
    contactSupportDesc: 'Svyazhites s our komandoy support',
    contactUs: 'Svyazhites s nami',
    supportChannotls: 'Kanaly support',
    supportChannotlsDesc: 'Neskolko sposobov by accessingit help, kogda ona vam nuzhna',
    phonot: 'Phonot',
    phonotNumber: '1-800-555-0199',
    email: 'Email',
    emailAddress: 'dealers@carmaket365.com',
    liveChat: 'Zhivoy chat',
    startChat: 'Nachat chat',
    businotssHours: 'Rabochie chasy',
    mondayFriday: 'Ponotdelnik - Pyatnitsa: 8:00 - 20:00 EST',
    weekendHours: 'Subbota: 9:00 - 17:00 EST',
    phonotHours: 'Telefonn podderzhka accessna v rabochie chasy',
    emailHours: 'Email podderzhka: 24/7 otvet v techenie 4 chasov',
    chatHours: 'Zhivoy chat accessen v rabochie chasy',
    commonTopics: 'Obshchie temy',
    commonTopicsDesc: 'Chasto zaprashivaem temy support',
    gettingStarted: 'Nachalo raboty',
    gettingStartedDesc: 'Vvedenie nov dealers i nastroyka accounta',
    listingOptimization: 'Optimization obyavleniy',
    listingOptimizationDesc: 'Sovety po uluchsheniyu vidimosti vashikh obyavleniy',
    paymentBilling: 'Platezhi i billing',
    paymentBillingDesc: 'Voprosy po billingu i problemy s paymentami',
  },

  admin: {
    panotl: 'Panotl administratora',
    dashboard: 'Panotl administratora',
  },

  // Lichn panotl
  privateDashboard: {
    title: 'Moya panotl',
    subtitle: 'Upravlyayte svoimi listingsmi o vehiclee i accountom',
    welcome: 'Dobro pozhalovat obratno',
    savedCars: 'Saved Cars',
    lastSearch: 'Posledniy poisk',
    search: 'Search',
    yourListings: 'Youri listings',
    expressSale: 'Express Sale',
    express: 'Express Sale',
    contact: 'Contact',
    settings: 'Settings',
    saved: 'Saved',
    viewDetails: 'Posmotret detali',
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
    results: 'Results',
    // User Listings Tab
    myListings: 'Moi listings',
    carsListedForSale: 'Cari, kotor vy vystavili na sellu',
    createNewListing: 'Sozdat nov listing',
    newListing: 'Nov listing',
    views: 'views',
    inquiries: 'requests',
    listed: 'Razmeshcheno',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    // Express Sale Tab
    expressSaleListings: 'Express Sale Listings',
    quickSaleRequests: 'Zaprosy bystroy selli, otpravlenn dealeram',
    newExpressSale: 'New Express Sale',
    newExpress: 'Novyy ekspress',
    underReview: 'Na rassmotrenii',
    photos: 'photos',
    estimatedValue: 'Opricesochn stoimost:',
    submittedOn: 'Otpravleno',
    // Contact Details Tab
    contactDetails: 'Kontaktn these',
    manageContactInfo: 'Upravlyayte svy kontaktnoy informatsiey i profilem',
    personalInformation: 'Lichn information',
    updateProfileeDetails: 'Obnovit these profilya',
    changePhoto: 'Izmenit fotografiyu',
    firstName: 'Name',
    lastName: 'Last Name',
    emailAddress: 'Adres elektronnoy pochty',
    phonotNumber: 'Phonot number',
    city: 'City',
    country: 'Country',
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
    accountManagement: 'Upravlenie accountom',
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
    title: 'Saved Cars',
    subtitle: 'Upravlyayte svoimi anyim vehiclen vehiclesami i spiskom zhelaniy',
    filterBySavedDate: 'Filterovat po date sokhranotniya',
    filterByPriceRange: 'Filterovat po price range',
    sortBy: 'Sortirovat po',
    newest: 'Newest',
    oldest: 'Oldest',
    priceLowToHigh: 'Tsena: Ot nizkoy k vysokoy',
    priceHighToLow: 'Tsena: Ot vysokoy k nizkoy',
    noSavedCars: 'No saved cars',
    startBrowsing: 'Nachnite prosmatrivat vehiclen vehiclesa, to save izbrann',
    browseVehicles: 'Prosmotret vehiclen vehiclesa',
    savedOn: 'Saved',
    removeFromSaved: 'Remove from saved',
    viewDetails: 'Posmotret detali',
    contactDealer: 'Contact',
    scheduleViewing: 'Zaplanirovat osmotr',
    compareVehicles: 'Sravnit vehiclen vehiclesa',
    selectToCompare: 'Select Vehicles for Comparison',
    compare: 'Sravnit',
    clearSelection: 'Ochistit vybor',
    clearAll: 'Clear All'
  },

  // Prodat vehiclen vehicleso
  sellVehicle: {
    title: 'Sell Your Vehicle',
    subtitle: 'Sozdayte podrobn listing dlya vashego vehiclen vehiclesa',
    stepIndicator: 'Shag {current} iz {total}',
    basicInfo: 'Basic Information',
    vehicleDetails: 'Detali vehiclen vehiclesa',
    photosUpload: 'Zagruzka fotografiy',
    pricing: 'Tsenoobrazovanie',
    review: 'Obzor i publikation',
    
    // Basic Information
    make: 'Make',
    model: 'Model',
    ar: 'Year',
    mileage: 'Mileage',
    km: 'km',
    condition: 'Condition',
    conditionOptions: {
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Plokh'
    },
    fuelType: 'Fuel type',
    fuelTypes: {
      gasolinot: 'Gasoline',
      diesel: 'Diesel',
      electric: 'Electric',
      hybrid: 'Hybrid'
    },
    transmission: 'Transmission',
    transmissionTypes: {
      manual: 'Manual',
      automatic: 'Automatic',
      semiautomatic: 'Semi-Automatic'
    },
    bodyType: 'Body Type',
    
    // Detali vehiclen vehiclesa
    enginotSize: 'Enginot Size',
    horsepower: 'Loshadin sily',
    color: 'Color',
    numberOfDoors: 'Number of doors',
    numberOfSeats: 'Number of seats',
    features: 'Specifications',
    safetyFeatures: 'Funktsii safetyi',
    description: 'Description',
    descriptionPlaceholder: 'Opishite vashe vehiclen vehicleso, ego istoriyu, sostoyanie...',
    
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
    askingPrice: 'Zaprashivaem pricesa',
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
    saveDraft: 'Sokhranit draft',
    termsAndConditions: 'Usloviya of use',
    agreeToTerms: 'Soglasen s terms of use',
    
    // Soobshcheniya
    listingPublished: 'Obyavlenie successfully opublikovano!',
    draftSaved: 'Draft saved',
    errorSaving: 'Oshibka pri sokhranotnii',
    continue: 'Continue',
    previous: 'Previous',
    notxt: 'No'
  },

  // Home stranitsa
  indexPage: {
    hero: {
      title: 'Find Your Ideal Vehicle',
      subtitle: 'Browse thousands of verified vehicles from trusted dealers and private sellers',
      searchPlaceholder: 'Search po make, model ili location...',
      search: 'Search',
      advancedSearch: 'Advanced Search'
    },
    quickFilters: {
      title: 'Bystr filtery',
      allVehicles: 'Vse vehiclen vehiclesa',
      cars: 'Cari',
      trucks: 'Gruzoviki',
      motorcycles: 'Motorcycles',
      electric: 'Elektricheskie',
      luxury: 'Luxury'
    },
    stats: {
      title: 'Pochemu CarMarket365?',
      vehiclesAvailable: 'Dostupn vehiclen vehiclesa',
      verifiedDealers: 'Proverenn dealers',
      happyCustomers: 'Dovoln clienty',
      arsExperience: 'Let experience'
    },
    featuredListings: {
      title: 'Rekomenduem listings',
      subtitle: 'Selected vehicles from our partnotrs',
      viewAll: 'Posmotret vse'
    },
    howItWorks: {
      title: 'Kak eto rabotaet',
      subtitle: 'Find your ideal vehicle in three simple steps',
      steps: [
        {
          title: 'Naydite vehiclen vehiclesa',
          description: 'Prosmatrivayte nashu obshirnuyu bazu verifyenn vehiclen vehicles'
        },
        {
          title: 'Sravnite varianty',
          description: 'Sravnivayte pricesy, kharakteristiki i otzyvy'
        },
        {
          title: 'Pokupayte s uverennostyu',
          description: 'Buy from trusted dealers with warranties'
        }
      ]
    },
    popularBrands: {
      title: 'Populyarn marki',
      subtitle: 'Issleduyte vehiclen vehiclesa ot vedushchikh avtoproizvoditeley'
    },
    testimonials: {
      title: 'Chto govoryat nashi clienty',
      subtitle: 'Prochitayte realn otzyvy ot nashikh dovoln buyerey'
    },
    newsletter: {
      title: 'Ostavaytes v kurse',
      subtitle: 'Poluchayte poslednie listings i eksklyuzivn predlozheniya directly na vashu elektronnuyu pochtu',
      emailPlaceholder: 'Vvedite vash email',
      subscribe: 'Subscribe'
    },
    cta: {
      bur: {
        title: 'Gotovy kupit?',
        subtitle: 'Find your ideal vehicle today',
        button: 'Prosmotret vehiclen vehiclesa'
      },
      seller: {
        title: 'Khotite prodat?',
        subtitle: 'List your vehicle for sale in minutes',
        button: 'Prodat vehiclen vehicleso'
      }
    }
  },

  // Stranitsy oshibok
  errors: {
    notFound: {
      title: '404',
      heading: 'Page not naydena',
      message: 'Page, kotoruyu vy looking for, not sushchestvuet ili byla peremeshchena.',
      goHome: 'Pereyti na glavnuyu',
      goBack: 'Vernutsya nazad',
      supportMessage: 'Esli vy schitaete, chto eto oshibka, please, contact s our komandoy support.'
    }
  },

  // Yuridicheskie stranitsy
  legal: {
    accessibility: {
      title: 'Dostupnost',
      subtitle: 'Nasha priverzhennost delat CarMarket365 accessnym dlya all.',
      backToHome: 'Vernutsya na glavnuyu',
      commitmentTitle: 'Nasha priverzhennost accessibilityi',
      commitmentDescription: 'CarMarket365 stremitsya obespechit inklyuziv opyt.',
      commitmentText: 'My schitaem, chto u all dolzhen byt rav access k our platforme, notzavisimo ot ikh sposobnostey.',
      
      visual: {
        title: 'Vizualn podderzhka',
        features: [
          'Vysokiy kontrast dlya luchshey chitaemosti',
          'Reguliruemyy razmer teksta',
          'Clear and structured navigation',
          'Alternativn opisaniya izobrazheniy'
        ]
      },
      motor: {
        title: 'Dvigateln podderzhka',
        features: [
          'Poln navigation s klaviatury',
          'Bolshie oblasti dlya klika',
          'Dostatochno vremeni dlya deystviy',
          'Prost i ponyatn elementy upravleniya'
        ]
      },
      audio: {
        title: 'Audiopodderzhka',
        features: [
          'Transkriptsii dlya audiokontenta',
          'Subtitry dlya video',
          'Tekstov alternativy zvukam',
          'Sovmestimost s programmami chteniya s ekrana'
        ]
      },
      cognitive: {
        title: 'Kognitivn podderzhka',
        features: [
          'Prostoy i ponyat yazyk',
          'Poshagov instruktsii',
          'Polezn soobshcheniya ob oshibkakh',
          'Logichesk organization kontenta'
        ]
      },
      
      standardsTitle: 'Standarty accessibilityi',
      standardsDescription: 'Nasha platforma postrna v sootvetstvii s mezhdunarodn standartami.',
      wcagTitle: 'Sootvetstvie WCAG 2.1',
      wcagDescription: 'My stremimsya sootvetstvovat rekomendationm WCAG 2.1 AA dlya veb-accessibilityi.',
      compatibilityTitle: 'Sovmestimost s vspomogateln tekhnologiyami',
      compatibilityDescription: 'Nasha platforma protestirovana s programmami chteniya s ekrana i otherimi vspomogateln tekhnologiyami.',
      
      feedbackTitle: 'Otzyvy o accessibilityi?',
      feedbackText: 'Esli u vas voznikli problemy s accessibilityyu ili est predlozheniya po uluchsheniyu, contact s nami po adresu accessibility@carmaket365.com',
      returnToPlatform: 'Vernutsya na platformu',
      contactTeam: 'Svyazatsya s komandoy'
    },

    cookies: {
      title: 'Politika cookies',
      subtitle: 'Kak my ispolzuem cookies dlya uluchsheniya vashego experience.',
      backToHome: 'Vernutsya na glavnuyu',
      policyTitle: 'Nasha policy cookies',
      policyDescription: 'My ispolzuem cookies dlya predostavleniya naibetter vozmozhn servisa.',
      policyText: 'Cookies — eto notbolshie tekstov fayly, sokhranyaem na vashem ustroystve pri poseshchenii nashego sayta. Oni pomogayut nam obespechit personalizirovan opyt.',
      
      essential: {
        title: 'Essential Cookies',
        features: [
          'Support polzovatelskikh sessiy',
          'Sokhranotnie nastrk safetyi',
          'Bazov funktsionalnost platform',
          'Realization nastrk privacyi'
        ]
      },
      functional: {
        title: 'Funktsionaln cookies',
        features: [
          'Zapominanie vashikh nastrk',
          'Sokhranotnie yazykov nastrk',
          'Personalization otobrazheniya',
          'Sokhranotnie poslednikh poiskov'
        ]
      },
      analytics: {
        title: 'Analiticheskie cookies',
        features: [
          'Ponimanie of use sayta',
          'Uluchshenie proizvoditelnotss',
          'Vyyavlenie tekhnicheskikh problem',
          'Optimization kontenta'
        ]
      },
      maktheseng: {
        title: 'Markthesengov cookies',
        features: [
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
      
      questionsTitle: 'Voprosy o cookies?',
      questionsText: 'Esli u vas est questions o our politike cookies ili nuzhna help v upravlenii nastroykami, contact s nami po adresu cookies@carmaket365.com',
      returnToPlatform: 'Vernutsya na platformu',
      cookieSupport: 'Support cookies'
    },

    imprint: {
      title: 'Impressum',
      subtitle: 'Yuridichesk information i these company v sootvetstvii s trebovaniyami zakona.',
      backToHome: 'Vernutsya na glavnuyu',
      legalInfoTitle: 'Yuridichesk information (Impressum)',
      legalInfoDescription: 'Information o company i yuridicheskie these v sootvetstvii s trebovaniyami zakona.',
      legalInfoText: 'Eta stranitsa soderzhit yuridicheski notobkhodimuyu informatsiyu o CarMarket365 v sootvetstvii s deystvuyushchimi zakonami i normativn aktami. Vsya predostavlenn information aktualna i tochna.',
      
      companyDetails: {
        title: 'Dann company',
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
        title: 'Delovoy adres',
        registeredAddress: 'Zaregisterirovan adres',
        street: 'Unter den Linden 1',
        city: '10117 Berlin',
        country: 'Country'
      },
      
      management: {
        title: 'Guide',
        managingDirector: 'Upravlyayushchiy direktor',
        managingDirectorValue: 'Max Mustermann',
        authorizedRepresentative: 'Upolnomochen predstavitel',
        authorizedRepresentativeValue: 'Anna Schmidt'
      },
      
      contactInfo: {
        title: 'Contact Information',
        phonot: 'Phonot',
        phonotValue: '+49 (0) 30 12345678',
        email: 'Email',
        emailValue: 'info@carmaket365.com',
        businotssHours: 'Rabochie chasy',
        businotssHoursValue: 'Pn-Pt: 9:00 - 18:00 CET'
      },
      
      legalNotice: {
        title: 'Yuridichesk uvedomlenie',
        paragraph1: 'CarMarket365 stremitsya predostavlyat tochnuyu i aktualnuyu informatsiyu. Odnako my not mozhem garantirovat polnotu ili tochnost vsego kontenta.',
        paragraph2: 'This platform serves as a maketplace connecting car buyers and sellers. CarMarket365 is not responsible for the accuracy of listings or user behavior.',
        paragraph3: 'Po sporam ili zhalobam, please, contact s nami, ispolzuya informatsiyu, ukazannuyu vyshe. My stremimsya reshit vse questions svvremenno i spravedlivo.'
      },
      
      questionsTitle: 'Yuridicheskie questions?',
      questionsText: 'Po yuridicheskim voprosam ili dlya soobshcheniya o problemakh, please, contact s nashim yuridicheskim otdelom po adresu legal@carmaket365.com',
      returnToPlatform: 'Vernutsya na platformu',
      contactLegal: 'Svyazatsya s yuridicheskoy komandoy'
    }
  },

  // Dealer Dashboard
  dealerDashboard: {
    title: 'Panotl dealera',
    subtitle: 'Upravlyayte svoimi listingsmi, otslezhivayte proizvoditelnost i razvivayte biznots',
    
    // Tab navigation
    tabs: {
      overview: 'Obzor',
      myListings: 'Moi listings',
      inquiries: 'Inquiries',
      analytics: 'Analitika',
    },
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        activeListings: {
          title: 'Aktivn listings',
          description: '+2 s proshl mesyatsa',
          fromLastMonth: 's proshl mesyatsa',
        },
        totalViews: {
          title: 'Vsego viewov',
          description: '+15% s proshl mesyatsa',
          fromLastMonth: 's proshl mesyatsa',
        },
        inquiries: {
          title: 'Title',
          description: '+7 so vchera',
          fromYesterday: 'so vchera',
        },
        revenue: {
          title: 'Title',
          description: '+12% s proshl mesyatsa',
          fromLastMonth: 's proshl mesyatsa',
        },
      },
      
      // Performance section
      performance: {
        title: 'Mesyachn proizvoditelnost',
        description: 'Kolichestvo prothese carey po mesyatsam v etom year',
        monthlyData: {
          january: 'Yanvar',
          december: 'Dekabr',
          november: 'November',
          sold: 'prodano',
        },
      },
      
      // Recent inquiries
      recentInquiries: {
        title: 'Poslednie zaprosy',
        description: 'Noveyshie clientskie zaprosy',
        inquiryTypes: {
          viewing: 'osmotr',
          price: 'pricesa',
          financing: 'Process',
        },
        timeAgo: {
          hoursAgo: 'ch nazad',
        },
      },
      
      // Action buttons
      actions: {
        addNewListing: 'Dobavit nov listing',
        viewAnalytics: 'Posmotret analitiku',
      },
    },
    
    // My Listings tab
    myListings: {
      title: 'Moi listings',
      
      // Search and filters
      searchPlaceholder: 'Search obyavleniy...',
      filterByStatus: 'Filter po statusu',
      statusOptions: {
        allStatus: 'Vse statusy',
        active: 'Aktivn',
        sold: 'Sold',
        pending: 'Ozhidaet',
      },
      exportReport: 'Export Report',
      export: 'Eksport',
      
      // Table headers
      tableHeaders: {
        car: 'Car',
        price: 'Price',
        status: 'Status',
        views: 'Views',
        inquiries: 'Inquiries',
        listed: 'Razmeshcheno',
        actions: 'Actions',
      },
      
      // Status badges
      statusBadges: {
        active: 'Aktivn',
        sold: 'Sold',
        pending: 'Ozhidaet',
      },
      
      // Actions
      actions: {
        viewListing: 'Posmotret listing',
        editListing: 'Redaktirovat listing',
        deleteListing: 'Udalit listing',
      },
      
      // Mobile view
      mobileView: {
        views: 'views',
        inquiries: 'requests',
      },
    },
    
    // Inquiries tab
    inquiries: {
      title: 'Klientskie zaprosy',
      description: 'Upravlyayte i otvechayte na clientskie zaprosy',
      
      // Inquiry types
      inquiryTypes: {
        testDriveRequest: 'Zapros na test drive',
        priceInquiry: 'Zapros o pricese',
      },
      
      // Status
      status: {
        new: 'Item',
        responded: 'replied',
      },
      
      // Actions
      actions: {
        respond: 'Otvtheset',
      },
      
      // Time indicators
      time: {
        hoursAgo: 'chasov nazad',
        dayAgo: 'den nazad',
      },
    },
    
    // Analytics tab
    analytics: {
      // Popular listings
      popularListings: {
        title: 'Populyarn listings',
        description: 'Naibolee prosmatrivaem listings v etom mesyatse',
        views: 'views',
        inquiries: 'requests',
      },
      
      // Performance metrics
      performanceMetrics: {
        title: 'Pokazateli proizvoditelnotss',
        description: 'Klyuchev showeli effektivnotss',
        metrics: {
          averageTimeToSell: 'Srednote time selli',
          conversionRate: 'Conversion Rate',
          averageListingViews: 'Srednie viewy listings',
          responseTime: 'Vremya otveta',
        },
        values: {
          days: 'days',
          hours: 'hours',
        },
      },
    },
    
    // Footer message
    footerMessage: 'Professionaln tools dealera - ',
    activeListingsCount: 'aktivn obyavleniy',
  },

  // Admin Dashboard
  adminDashboard: {
    title: 'Panotl administratora',
    subtitle: 'Upravlenie platformoy, nadzor i vseobemlyushchiy pricestr kontrolya',
    
    // Tab navigation
    tabs: {
      overview: 'Obzor',
      allListings: 'Vse listings',
      userManagement: 'Upravlenie polzovatelyami',
      reports: 'Reports',
    },
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        totalUsers: {
          title: 'Vsego users',
          description: '+15% s proshl mesyatsa',
          fromLastMonth: 's proshl mesyatsa',
        },
        activeDealers: {
          title: 'Aktivn dealers',
          description: '+8 nov v etom mesyatse',
          newThisMonth: 'nov v etom mesyatse',
        },
        totalListings: {
          title: 'Vsego obyavleniy',
          description: '+23 segodnya',
          today: 'segodnya',
        },
        platformRevenue: {
          title: 'Dokhod platform',
          description: '+12% s proshl mesyatsa',
          fromLastMonth: 's proshl mesyatsa',
        },
      },
      
      // Recent activity
      recentActivity: {
        title: 'Posledny aktivnost',
        description: 'Noveyshie deystviya na platforme',
        activities: {
          newDealerRegistration: 'Registration nov dealera',
          listingFlaggedForReview: 'Obyavlenie otmecheno dlya verifyki',
          userAccountSuspended: 'Account polzovatelya zablokirovan',
          paymentProcessed: 'Payment Processed',
        },
        timeAgo: {
          hoursAgo: 'ch nazad',
        },
      },
      
      // System health
      systemHealth: {
        title: 'Sostoyanie sistemy',
        description: 'Pokazateli proizvoditelnotss platform',
        metrics: {
          serverUptime: 'Vremya raboty servera',
          averageResponseTime: 'Srednote time otklika',
          activeSessions: 'Aktivn sessii',
          errorRate: 'Chastota oshibok',
        },
      },
      
      // Action buttons
      actions: {
        manageUsers: 'Upravlyat polzovatelyami',
        viewReports: 'View Reports',
      },
    },
    
    // All Listings tab
    allListings: {
      title: 'Vse listings',
      
      // Search and filters
      searchPlaceholder: 'Search obyavleniy...',
      filterByStatus: 'Filter po statusu',
      statusOptions: {
        allStatus: 'Vse statusy',
        active: 'Aktivn',
        sold: 'Sold',
        pending: 'Ozhidaet',
        flagged: 'Otmecheno',
      },
      
      // Table headers
      tableHeaders: {
        image: 'Izobrazhenie',
        title: 'Zagolovok',
        category: 'Category',
        seller: 'Seller',
        price: 'Price',
        status: 'Status',
        created: 'Sozdano',
        actions: 'Actions',
      },
      
      // Status badges
      statusBadges: {
        active: 'Aktivn',
        sold: 'Sold',
        pending: 'Ozhidaet',
        flagged: 'Otmecheno',
      },
      
      // Actions
      actions: {
        viewListing: 'Posmotret listing',
        editListing: 'Redaktirovat listing',
        deleteListing: 'Udalit listing',
      },
    },
    
    // User Management tab
    userManagement: {
      title: 'Upravlenie polzovatelyami',
      description: 'Prosmatrivayte i upravlyayte vsemi polzovatelyami platform',
      
      // Search and filters
      searchPlaceholder: 'Search po email ili imeni...',
      roleFilter: {
        placeholder: 'Rol',
        options: {
          allRoles: 'Vse roli',
          customer: 'Klient',
          dealer: 'Dealer',
          admin: 'Administrator',
        },
      },
      
      // Table headers
      tableHeaders: {
        user: 'Polzovatel',
        role: 'Rol',
        status: 'Status',
        joinDate: 'Data prisdinotniya',
        lastLogin: 'Posledniy vkhod',
        actions: 'Actions',
      },
      
      // Role badges
      roleBadges: {
        admin: 'Administrator',
        dealer: 'Dealer',
        customer: 'Klient',
      },
      
      // Status badges
      statusBadges: {
        active: 'Aktiven',
        suspended: 'Zablokirovan',
        pending: 'Ozhidaet',
      },
      
      // Dopolniteln soobshcheniya statusa
      statusMessages: {
        joinotdOn: 'Joined On',
        lastLoginOn: 'Posledniy vkhod',
        notverLoggedIn: 'Nikogda not vkhodil',
      },
      
      // Actions
      actions: {
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
        title: 'Statistika platform',
        description: 'Klyuchev showeli platform',
        metrics: {
          totalRevenue: 'Obshchiy dokhod (v etom mesyatse)',
          newUserRegistrations: 'Registratsii nov users',
          successfulTransactions: 'Uspeshn tranzaktsii',
          averageListingPrice: 'Sredny pricesa listings',
        },
      },
      
      // Content moderation
      contentModeration: {
        title: 'Moderation kontenta',
        description: 'Kontent, trebuyushchiy verifyki',
        items: {
          flaggedListings: 'Otmechenn listings',
          pendingDealerApplications: 'Zvki dealers v ozhidanii',
          reportedUsers: 'Polzovateli s zhalobami',
          disputes: 'Disputes',
        },
      },
    },
    
    // Footer message
    footerMessage: 'Administrativ kontrol - ',
    systemStatus: 'Status sistemy: Onlayn',
  },

  uiDemo: {
    title: 'Demonstration UI-komponotntov',
    subtitle: 'Izuchite nashu dizayn-sistemu i UI-komponotnty',
    componotnts: 'Components',
    forms: 'Forms',
    buttons: 'Knopki',
    cards: 'Kartochki',
  },

  // Test strany
  countryTest: {
    title: 'Test razdeleniya po stranam',
    subtitle: 'Proverte, kak listings carey filteruyutsya po stranot/poddomenu',
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
    countryFilteredResults: 'Resulty, otfilterovann po stranot',
    noCarsFound: 'Cari not naydeny',
    noCarsFoundDescription: 'V nastoyashchee time v {country} nott opublikovann carey.',
    tryDifferentCountry: 'Poprobuyte pereklyuchitsya na another country s helpyu pereklyuchatelya vyshe.',
    howItWorks: 'Kak eto rabotaet',
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
  forms: {
    placeholders: {
      selectMake: 'Select Make',
      selectModel: 'Select Model',
      selectYear: 'Select Year',
      selectCondition: 'Select Condition',
      selectFuelType: 'Select Fuel Type',
      selectTransmission: 'Select Transmission',
      selectBodyType: 'Select Body Type',
      selectDrivetrain: 'Select Drivetrain',
      enterName: 'Vvedite name',
      enterEmail: 'Vvedite email',
      enterPassword: 'Vvedite parol',
      enterPhonot: 'Vvedite phonot',
      enterModel: 'Vvedite model',
      enterMileage: 'Vvedite probeg',
      enterPrice: 'Vvedite pricesu',
      enterLocation: 'Vvedite mestopolozhenie',
      enterCity: 'Vvedite gorod',
      enterDescription: 'Vvedite opisanie',
      searchCars: 'Search Cars',
      searchListings: 'Iskat listings',
      searchFAQs: 'Iskat v FAQ',
      anyMake: 'Any Make',
      anyModel: 'Any Model',
      anyYear: 'Any Year',
      anyMileage: 'Any Mileage',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      role: 'Rol',
      sortBy: 'Sortirovat po',
      filterBy: 'Filterovat po',
      dealerNameOrCity: 'Nazvanie dealera ili gorod',
      allStates: 'Vse regiony',
      allSpecialties: 'Vse spetsialnotss',
      egFiftyThousand: 'naprimer, 50,000',
      successMessage: 'Your listing successfully sozdano!',
      requiredFieldMessage: 'Eto pole required dlya zapolnotniya',
      enterMessage: 'Vvedite vashe soobshchenie',
    },
    labels: {
      businotssName: 'Nazvanie biznotsa',
      businotssType: 'Tip biznotsa',
      vatNumber: 'NDS nomer',
      firstName: 'Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phonotNumber: 'Phonot number',
      street: 'Ulitsa',
      city: 'City',
      state: 'Region',
      postalCode: 'Postal Code',
      country: 'Country',
      make: 'Make',
      model: 'Model',
      ar: 'Year',
      mileage: 'Mileage',
      condition: 'Condition',
      fuelType: 'Fuel type',
      transmission: 'Transmission',
      bodyType: 'Body Type',
      exteriorColor: 'Body color',
      interiorColor: 'Interior color',
      price: 'Price',
      description: 'Description',
      contactName: 'Contact Person',
      contactPhonot: 'Kontakt phonot',
      contactEmail: 'Kontakt email',
      location: 'Location',
      rememberMe: 'Zapomnit menya',
      termsAccepted: 'Usloviya prinyaty',
      privacyAccepted: 'Politika prinyata',
    },
    buttons: {
      submit: 'Send',
      register: 'Register',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      backToSignIn: 'Nazad k vkhodu',
      backToHome: 'Nazad na glavnuyu',
      createAccount: 'Sozdat account',
      forgotPassword: 'Zabyli parol',
      resetPassword: 'Sbrosit parol',
      updateProfilee: 'Obnovit profil',
      uploadPhotos: 'Zagruzit foto',
      removePhoto: 'Udalit foto',
      publishListing: 'Opublikovat listing',
      saveDraft: 'Sokhranit kak draft',
      previewListing: 'Predvaritel view',
      editListing: 'Redaktirovat listing',
      deleteListing: 'Udalit listing',
      viewListing: 'Prosmotret listing',
      viewDetails: 'Posmotret detali',
      contactDealer: 'Svyazatsya s dealerom',
      scheduleTestDrive: 'Zapisatsya na test drive',
      requestFinancing: 'Zaprosit financing',
      shareVehicle: 'Podelitsya carem',
      saveToFavorites: 'Dobavit v izbrann',
      removeFromFavorites: 'Ubrat iz izbrann',
      applyFilters: 'Primenit filtery',
      clearFilters: 'Ochistit filtery',
      clearSearch: 'Ochistit poisk',
      searchVehicles: 'Search Cars',
      viewAllCars: 'Posmotret vse cari',
      loadMore: 'Zagruzit eshche',
      showMore: 'Pokazat bolshe',
      showLess: 'Pokazat menshe',
    },
    validation: {
      nameMinLength: 'Imya dolzhno soderzhat not menote 2 simvolov',
      validEmail: 'Pozhaluysta, enter validyy adres elektronnoy pochty',
      messageMinLength: 'Soobshchenie dolzhno soderzhat not menote 10 simvolov',
    },
  },

  // Static content for About page
  about: {
    stats: {
      carsSold: 'Prodano Carey',
      happyCustomers: 'Dovoln Klientov',
      dealerPartnotrs: 'Dealer Partnotrs',
      arsInBusinotss: 'Let v Biznotse',
    },
    values: {
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
          name: 'Aleksey Petrov',
          role: 'Genotral direktor i osnovatel',
          bio: '15+ let v carnoy industrii. Ranote vitse-prezident v AutoNation.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Mikhail Sokolov',
          role: 'Tekhnicheskiy direktor',
          bio: 'Byvshiy inzhenotr Tesla s ekspertizoy v carn tekhnologiyakh.',
          image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Elena Volkova',
          role: 'Rukovoditel otdela clientsk servisa',
          bio: '10+ let v oblasti prevoskhodn of service clientov i rukovodstva komandoy.',
          image: 'https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Dmitriy Kuznottsov',
          role: 'Vitse-prezident po operationm',
          bio: 'Ekspert po tsepochke postavok s opytom v carnoy logistike.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        }
      ],
      milestonots: [
        {
          ar: '2009',
          title: 'Osnovanie company',
          description: 'Nachali kak notbolsh torgov ploshchadka poderzhann carey v Moskve s videniem revolyutsionizirovat buyu carey.'
        },
        {
          ar: '2012',
          title: 'Zapusk tsifrovoy platform',
          description: 'Zapustili nashu pervuyu onlayn-ploshchadku, sdelav buyu carey bolee accessnoy.'
        },
        {
          ar: '2015',
          title: '500th Partnotr Dealer',
          description: 'Reached an important milestonot by partnotring with our 500th verified dealer.'
        },
        {
          ar: '2018',
          title: 'Natsionaln ekspansiya',
          description: 'Rasshirili operatsii dlya of service clientov po vsey Rossii i stranam SNG.'
        },
        {
          ar: '2020',
          title: 'Zapusk mobiln prilozheniya',
          description: 'Launched our mobile app, making car shopping even more convenient.'
        },
        {
          ar: '2023',
          title: '50,000 prothese carey',
          description: 'Otprazdnovali help bolee chem 45,000 clientam v poiske ikh idealn carya.'
        }
      ],
      awards: [
        {
          title: 'Luchsh carn ploshchadka 2023',
          organization: 'Premiya vybora potrebiteley',
          ar: '2023',
          description: 'Priznana za vydayushcheesya obsluzhivanie clientov i innovatsii platform'
        },
        {
          title: 'Samyy bystrorastushchiy startap',
          organization: 'Premiya tekhnologicheskikh innovatsiy',
          ar: '2022',
          description: 'Otmechena za bystryy rost i advancedie rynka'
        },
        {
          title: 'Prevoskhodstvo v obsluzhivanii clientov',
          organization: 'Premii carnoy industrii',
          ar: '2023',
          description: 'Nagrazhdena za isklyuchiteln udovletvorenie clientov i podderzhku'
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
      contactUs: 'Svyazatsya s nami',
      browseCars: 'Prosmotret cari',
      connect: 'Connect'
    }
  },

  carReviews: {
    title: 'Obzory carey',
    subtitle: 'Ekspertn reviews i otzyvy users, kotor pomogut vam prinimat obosnovann resheniya pri buye sleduyushchego carya.',
    backToHome: 'Nazad na glavnuyu',
    
    // Main content
    overviewTitle: 'Obzory i reytingi carey',
    overviewDescription: 'Kompleksn reviews, kotor pomogut vam prinimat obosnovann resheniya pri buye vehiclen vehicles.',
    overviewText: 'Nash razdel obzorov carey predostavlyaet detal analiz ot carn ekspertov i real opyt vladeltsev, to help vam ponyat vse aspekty rassmatrivaem vehiclen vehicles.',
    
    // Review types
    expertReviews: {
      title: 'Ekspertn reviews',
      features: [
        'Professionaln carn zhurnalistika',
        'Detal analiz proizvoditelnotss',
        'Safety and reliability ratings',
        'Sravniteln testirovanie vehiclen vehicles'
      ]
    },
    ownotrReviews: {
      title: 'Otzyvy vladeltsev',
      features: [
        'Real opyt vladeniya',
        'Long-term reliability reviews',
        'Ponimanie zatrat na obsluzhivanie',
        'Vpechatleniya ot ezhednotvn vozhdeniya'
      ]
    },
    ratingSystem: {
      title: 'Sistema reytinga',
      features: [
        '5-star rating system',
        'Opriceski po konkretnym kategoriyam',
        'Obshchie rekomendatsii',
        'Razbor preimushchestv i notdostatkov'
      ]
    },
    maketInsights: {
      title: 'Rynochn analitiki',
      features: [
        'Analiz peresellnoy value',
        'Market trend reports',
        'Rekomendatsii luchshey pricesnotss',
        'Sezonn rukovodstva po buye'
      ]
    },
    
    // Categories
    categoriesTitle: 'Categories obzorov',
    categoriesDescription: 'Nashi reviews okhvatyvayut vse aspekty vladeniya i proizvoditelnotss vehiclen vehicles.',
    performance: {
      title: 'Proizvoditelnost',
      items: [
        'Proizvoditelnost dvigatelya',
        'Upravlenie i dinamika vozhdeniya',
        'Effektivnost topliva',
        'Razgon i tormozhenie'
      ]
    },
    comfort: {
      title: 'Komfort i interer',
      items: [
        'Komfort sideniy',
        'Vnutrennote prostranstvo i khranotnie',
        'Tekhnologicheskie funktsii',
        'Kachestvo sborki i materialy'
      ]
    },
    safety: {
      title: 'Safety and Reliability',
      items: [
        'Reytingi i funktsii safetyi',
        'Reliability and Service',
        'Garantiyn pokrytie',
        'Istoriya otzyvov'
      ]
    },
    
    // Coming soon
    comingSoonTitle: 'Obzory skoro poyavyatsya!',
    comingSoonText: 'V nastoyashchee time my stroim nashu kompleksnuyu bazu these obzorov. Ekspertn reviews i otzyvy vladeltsev skoro budut accessny, to help napravit vashi resheniya o buye carey.',
    browseCars: 'Prosmotret accessn cari',
    exploreInventory: 'Izuchit inventar'
  },

  // Static vehicle data for AdvancedSearch
  advancedSearch: {
    staticVehicleData: {
      makes: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citrn', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
      bodyTypes: [
        'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van',
        'Minivan', 'Crossover', 'Compact', 'Subcompact', 'Sredniy razmer', 'Pol razmer',
        'Sports Car', 'Luxury', 'Economy', 'Hybrid'
      ],
      fuelTypes: [
        'Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid', 'CNG', 'LPG',
        'Flex Fuel', 'Hydrogen', 'Biodiesel', 'E85 Etanol'
      ],
      transmissions: [
        'Manual', 'Automatic', 'CVT', 'Semi-Automatic', 'Dual Clutch', '6-Speed Manual',
        '7-Speed Automatic', '8-Speed Automatic', '9-Speed Automatic', '10-Speed Automatic'
      ],
      drivetrains: [
        'Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', '4WD', 
        'Chastich 4WD', 'Full-Time 4WD', 'Electronic All-Wheel Drive', 'Manualiy pol privod'
      ],
      colors: [
        'Black', 'White', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Brown', 
        'Gold', 'Yellow', 'Orange', 'Purple', 'Beige', 'Tan', 'Pink', 'Burgundy',
        'Pearl White', 'Metallic Silver', 'Deep Blue', 'Racing Red', 'Forest Green',
        'Charcoal', 'Navy', 'Beige'
      ],
      conditions: [
        'New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Spravedliv', 'Used', 
        'Sertifitsirovan b/u', 'Restored', 'Refurbished', 'Salvage', 'Vintage'
      ],
      features: [
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
      certifications: [
        'Sertifitsirovan b/u', 'Manufacturer Warranty', 'Extended Warranty', 
        'Roadside Assistance', 'Vehicle History Report', 'Multi-point Inspection',
        'Emissions Test', 'Safety Inspection', 'Sertifikation dealera', 'Sertifikation tretey storony',
        'Carfax verifyen', 'AutoCheck verifyen', 'No Accidents', 'One Owner',
        'Zapisi o tekhobsluzhivanii accessny', 'Tekhobsluzhivanie aktualno'
      ]
    }
  },

  safetyTips: {
    title: 'Sovety po safetyi',
    subtitle: 'Basic safety recommendations for buying, selling and servicing your car.',
    backToHome: 'Nazad na glavnuyu',
    
    // Main content
    mainTitle: 'Rekomendatsii po safetyi carey',
    mainDescription: 'Kompleksn tips po safetyi dlya secureoy buyi i selli carey.',
    safetyOverview: 'Whether you\'re buying your first car or selling your current onot, following appropriate safety recommendations protects you from fraud, ensures fair deals, and helps maintain your personal safety throughout the process.',
    
    // Safety categories
    methesengSafety: {
      title: 'Bezopasnost vstrech',
      items: [
        'Always meet in a public, well-lit place',
        'Bring a trusted friend or family member',
        'Soobshchite k-libo o vashikh planakh vstrechi',
        'Po vozmozhnotss vstrechaytes v dnotvn time',
        'Doveryayte svoim instinktam - ukhodite, esli chto-to kazhetsya invalidym',
        'Nikogda not vstrechaytes doma i not priglashayte notznakomtsev tuda'
      ]
    },
    paymentSecurity: {
      title: 'Bezopasnost paymentey',
      items: [
        'Nikogda not otpravlyayte dengi ili depozity do osmotra carya',
        'Ispolzuyte secure sposoby oplaty (bankovskiy perevod, zaveren chek)',
        'Izbegayte nalichn operatsiy na krupn summy',
        'Osteregaytes moshennichestva s pereplatoy',
        'Po vozmozhnotss provodite operatsii v banke',
        'Poluchayte kvitantsii za vse paymenti i operatsii'
      ]
    },
    vehicleInspection: {
      title: 'Osmotr carya',
      items: [
        'Vsegda osmatrivayte car lichno',
        'Vozmite s soboy znayushchego mekhanika ili opytn othera',
        'Protestiruyte car v razlichn termskh',
        'Proverte vse dokumenty i istoriyu carya',
        'Ubedites, chto VIN-nomer sovpadaet so vsemi dokumentami',
        'Ne speshite - naydite time dlya tshchateln osmotra'
      ]
    },
    redFlags: {
      title: 'Trevozhn signaly',
      items: [
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
      title: 'Neobkhodim dokumenty',
      description: 'Vazhn dokumenty dlya verifyki i by accessingeniya pri sdelkakh s caryami.',
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
      title: 'Nuzhna help ili est opaseniya?',
      message: 'Esli vy stolknulis s podozritelnoy deyatelnostyu ili nuzhdaetes v helpi, not stesnyaytes obratitsya k localym vlastyam ili soobshchit o probleme our sluzhbe support.',
      browseCars: 'Prosmotret secure listings',
      reportConcern: 'Soobshchit o probleme'
    }
  },

  expressSell: {
    title: 'Prodayte your car bystro',
    subtitle: 'Razmestite vash car za minuty s helpyu nashego ekspress-protsessa selli',
    backToHome: 'Nazad na glavnuyu',
    step: 'Shag',
    of: 'iz',
    carDetails: 'Vehicle Details',
    carDetailsDescription: 'Rasskazhite nam o vashem care, to create privlekateln listing',
    make: 'Make',
    makeRequired: 'Marka *',
    selectMake: 'Select Make',
    model: 'Model',
    modelRequired: 'Model *',
    selectModel: 'Select Model',
    ar: 'Year',
    arRequired: 'God *',
    selectYear: 'Select Year',
    mileage: 'Mileage',
    mileageRequired: 'Probeg *',
    enterMileage: 'Vvedite probeg',
    kilometers: 'kilometers',
    fuelType: 'Fuel type',
    fuelTypeRequired: 'Fuel type *',
    selectFuelType: 'Select Fuel Type',
    gasolinot: 'Gasoline',
    diesel: 'Diesel',
    electric: 'Electric',
    hybrid: 'Hybrid',
    transmission: 'Transmission',
    transmissionRequired: 'Transmission *',
    selectTransmission: 'Select Transmission',
    manual: 'Manual',
    automatic: 'Automatic',
    condition: 'Condition',
    conditionRequired: 'Sostoyanie *',
    selectCondition: 'Select Condition',
    excellent: 'Excellent',
    veryGood: 'Very Good',
    good: 'Good',
    fair: 'Fair',
    price: 'Price',
    priceRequired: 'Tsena *',
    enterPrice: 'Vvedite zaprashivaemuyu pricesu',
    euros: 'EUR',
    description: 'Description',
    descriptionOptional: 'Description (Optsionalno)',
    enterDescription: 'Vvedite opisanie',
    descriptionPlaceholder: 'Opishite osobennotss, sostoyanie i istoriyu vashego carya...',
    photosAndContact: 'Foto i kontakty',
    photosAndContactDescription: 'Dobavte photos i vashu kontaktnuyu informatsiyu',
    carPhotos: 'Fotografii carya',
    carPhotosRequired: 'Fotografii carya *',
    uploadPhotos: 'Zagruzit photos',
    photosUploaded: 'fotografiy zagruzheno',
    contactInformation: 'Contact Information',
    fullName: 'Poln name',
    fullNameRequired: 'Poln name *',
    enterFullName: 'Vvedite vashe full name',
    phonotNumber: 'Phonot number',
    phonotRequired: 'Telefon *',
    enterPhonot: 'Vvedite nomer phonota',
    emailAddress: 'Adres elektronnoy pochty',
    emailRequired: 'Email *',
    enterEmail: 'Vvedite adres elektronnoy pochty',
    location: 'Location',
    locationRequired: 'Mestopolozhenie *',
    enterLocation: 'Vvedite vashe mestopolozhenie',
    preview: 'Predvaritel view',
    previewDescription: 'Prosmotrite vashe listing before publikatsiey',
    yourListing: 'Your listing',
    listingPreview: 'Predvaritel view listings',
    photos: 'Fotografii',
    contactDetails: 'Kontaktn these',
    previous: 'Previous',
    notxt: 'Next',
    publishListing: 'Opublikovat listing',
    successMessage: 'Your vehicle has been successfully listed!',
    requiredField: 'Eto pole required',
  },

  financing: {
    title: 'Avtokreditovanie',
    subtitle: 'Naydite luchshie varianty financingovaniya dlya buyi vashego sleduyushchego carya.',
    loanCalculator: 'Kalkulyator kredita',
    monthlyPayment: 'Monthly Payment',
    totalInterest: 'Obshch summa propricestov',
    totalPayment: 'Obshch summa vyplat',
    loanAmount: 'Summa kredita',
    interestRate: 'Propricestn stavka',
    loanTerm: 'Srok kredita',
    ars: 'let',
    calculate: 'Rasschitat',
  },

  faq: {
    title: 'Chasto asked questions',
    subtitle: 'Naydite answers na rasprostranotnn questions o buye, selle, financingovanii i ispolzovanii CarMarket365.',
    searchPlaceholder: 'Search v FAQ...',
    browseByCategory: 'Search po kategoriyam',
    allQuestions: 'Vse questions',
    stillNeedHelp: 'Nuzhna dopolniteln help?',
    stillNeedHelpDescription: 'Ne can find to, chto looking for? Nasha team support ready help.',
    callSupport: 'Pozvonit v sluzhbu support',
    emailUs: 'Napisat nam',
    liveChat: 'Zhivoy chat',
    available247: 'Dostupno 24/7',
    noResultsFound: 'Resulty not naydeny',
    noResultsText: 'Poprobuyte posearch s otherimi klyuchev sloyour ili viewite po kategoriyam.',
    clearSearch: 'Ochistit poisk',
    staticContent: {
      categories: {
        buying: 'Pokupka carey',
        selling: 'Prodazha carey',
        financing: 'Finansirovanie i paymenti',
        safety: 'Bezopasnost i zashchita',
        account: 'Account i ispolzovanie'
      },
      questions: [
        {
          id: 'buy-1',
          category: 'buying',
          question: 'Kak ya mogu kupit your pervyy car na CarMarket365?',
          answer: 'To buy a car, start by searching for vehicles using our detailed filters. When you find a car you like, contact the seller directly through our platform. We always recommend inspecting the car before purchase and verifying documentation.'
        },
        {
          id: 'buy-2',
          category: 'buying',
          question: 'Provereny li prodavtsy na platforme?',
          answer: 'Da, vse professionaln prodavtsy verifyeny our komandoy. Chastn prodavtsy also prokhodyat bazovyy protsess verifikatsii. Ishchite znak verifikatsii v profilyakh prodavtsov dlya polnoy prozrachnotss.'
        },
        {
          id: 'buy-3',
          category: 'buying',
          question: 'Mogu li ya protestirovat car before buyoy?',
          answer: 'Konotchno! Bolshinstvo prodavtsov razreshayut test drivey. Svyazhites s seller, to naznachit vstrechu dlya test drivea. Vsegda berite deystvuyushchie voditelskie rights i ubedites, chto u carya est deystvuyushch strakhovka.'
        },
        {
          id: 'buy-4',
          category: 'buying',
          question: 'Chto ya dolzhen check before buyoy carya?',
          answer: 'Proverte: istoriyu carya, pravov dokumenty, fizichesk sostoyanie, osnovn sistemy (dvigatel, tormoza, transmissiya) i sovershite test drive. My also rekomenduem osmotr u doverenn mekhanika.'
        },
        {
          id: 'buy-5',
          category: 'buying',
          question: 'Predostavlyaet li CarMarket365 garantii na cari?',
          answer: 'CarMarket365 - eto platforma, kotor sdinyaet buyerey s prodavtsami. Garantii predostavlyayutsya individualn prodavtsami. Bolshinstvo professionaln prodavtsov predlagayut ogranichenn garantii. Proverte detali garantii s seller before buyoy.'
        },
        {
          id: 'sell-1',
          category: 'selling',
          question: 'Skolko stoit prodat car na CarMarket365?',
          answer: 'Bazov razmeshchenie besplatno dlya chastn prodavtsov. My also predlagaem premium optsii s dopolniteln funktsiyami, takimi kak luchsh ekspozitsiya i professionaln fotografiya. U professionaln prodavtsov est mesyachn plany s advancedn funktsiyami.'
        },
        {
          id: 'sell-2',
          category: 'selling',
          question: 'Skolko vremeni zanimaet sella carya?',
          answer: 'Vremya selli zavisit ot notskolkikh faktorov: pricesy, sostoyaniya carya, sprosa na rynke i kachestva listings. V srednotm cari prodayutsya v techenie 2-8 notdel. Obyavleniya s konkurentn pricesami i kachestvenn fotografiyami prodayutsya bystree.'
        },
        {
          id: 'sell-3',
          category: 'selling',
          question: 'Kak ya mogu uvelichit shansy selli mgo carya?',
          answer: 'Ispolzuyte professionaln photos, pishite detaln opisaniya, ustanavlivayte konkurentn pricesy, budte chestny o sostoyanii carya i bystro otvechayte na questions. Takzhe rassmotrite nash servis professionalnoy photos.'
        },
        {
          id: 'sell-4',
          category: 'selling',
          question: 'Kakie dokumenty mnot nuzhny dlya selli carya?',
          answer: 'Vam ponadobyatsya: svidetelstvo o registeratsii, dokument udostoveryayushchiy lichnost, tekhosmotr i spravka o tekushchey strakhovke. Dlya carey starshe 4 let also nuzhen certificate tekhosmotra.'
        },
        {
          id: 'sell-5',
          category: 'selling',
          question: 'Mogu li ya change pricesu mgo listings?',
          answer: 'Da, vy can change pricesu v any time iz vashey panotli upravleniya. My rekomenduem monitorit rynok i korrektirovat pricesy po notobkhodimosti dlya maksimizatsii interesa buyerey.'
        },
        {
          id: 'financing-1',
          category: 'financing',
          question: 'Predlagaet li CarMarket365 varianty financingovaniya?',
          answer: 'We partnotr with several financial institutions to offer credit options. You can apply for pre-approval through our platform. Interest rates and terms depend on your financial profile and chosen vehicle.'
        },
        {
          id: 'financing-2',
          category: 'financing',
          question: 'Kak information nuzhna dlya zvki na kredit?',
          answer: 'Zvka trebuet: personalnuyu informatsiyu, mesyachn dokhody, informatsiyu o trudoustroystve, kreditnuyu istoriyu i detali ob care, kotoryy vy khotite kupit. Protsess previewn approvediya obychno zanimaet 10-15 minut.'
        },
        {
          id: 'financing-3',
          category: 'financing',
          question: 'Kak sam nizk propricestn stavka, kotoruyu ya mogu by accessingit?',
          answer: 'Propricestn stavki nachinayutsya ot 3.9% godov dlya kvalifitsirovann zviteley. Aktualn stavka zavisit ot vashego kreditn reytinga, dokhodov, sroka kredita i tipa carya. Ispolzuyte nash kredit kalkulyator dlya previewnoy estimates.'
        },
        {
          id: 'safety-1',
          category: 'safety',
          question: 'Kak byt v safetyi pri buye u chastn prodavtsa?',
          answer: 'Vsegda vstrechaytes v obshchestvenn mestakh, berite s soboy othera, osmatrivayte car pri dnotvnom svete, verifyyayte lichnost prodavtsa i not nosite bolshie summy nalichn. Ispolzuyte nashi rekomenduem sposoby oplaty dlya secure sdelok.'
        },
        {
          id: 'safety-2',
          category: 'safety',
          question: 'Chto mnot delat, esli seller kazhetsya podozritelnym?',
          answer: 'Doveryayte svoim instinktam. Esli chto-to kazhetsya podozritelnym, not prodolzhayte sdelku. Soobshchite o podozritelnoy aktivnotss our komande safetyi na safety@carmaket365.com. My rassleduem i primem sootvetstvuyushchie mery.'
        },
        {
          id: 'safety-3',
          category: 'safety',
          question: 'Kak ya mogu check, ukraden li car?',
          answer: 'Check the vehicle VIN in our databases and request a vehicle history report. Make sure the VIN on the car matches the documents. If you have doubts, contact local authorities before purchase.'
        },
        {
          id: 'account-1',
          category: 'account',
          question: 'Kak create account na CarMarket365?',
          answer: 'Nazhmite "Zaregisterirovatsya" vverkhu stranitsy. Vy can choose mezhdu chastnym accountom (dlya buyerey i chastn prodavtsov) ili professionalnym accountom (dlya prodavtsov i dealers). Protsess besplat i zanimaet vsego notskolko minut.'
        },
        {
          id: 'account-2',
          category: 'account',
          question: 'Mogu li ya change tip mgo accounta pozzhe?',
          answer: 'Da, vy can v any time obnovitsya s chastn do professionaln accounta. Svyazhites s our podderzhkoy clientov dlya helpi s perenosom. Obratite vnimanie, chto notkotor funktsii mogut byt not perenosimy.'
        },
        {
          id: 'account-3',
          category: 'account',
          question: 'Kak sbrosit moy parol?',
          answer: 'Nazhmite "Zabyli parol?" na page vkhoda. Vvedite vash email adres, i my otpravim vam ssylku dlya sbrosa. Ssylka valida 24 chasa po soobrazheniyam safetyi.'
        },
        {
          id: 'account-4',
          category: 'account',
          question: 'Kak delete moy account?',
          answer: 'Vy can delete vash account iz nastrk accounta ili svyazavshis s nami napryamuyu. Obratite vnimanie, chto udalenie postoyanno, i vy poteryaete vse vashi these i listings.'
        },
        {
          id: 'account-5',
          category: 'account',
          question: 'Mogu li ya imet notskolko accountov?',
          answer: 'Kazhdyy chelovek mozhet imet tolko odin aktiv account. Neskolko accountov mogut privesti k priostanovke accounta. Esli vam nuzhno change tip accounta, contact s our podderzhkoy dlya helpi.'
        }
      ]
    }
  },

  dealers: {
    title: 'Nayti verifyenn dealers',
    subtitle: 'Svyazhites s verifyenn avtosalonami v vashem regionot. Kachestvenn cari, professionaln obsluzhivanie i konkurentn pricesy.',
    searchDealers: 'Search dealers',
    dealerNameOrCity: 'Nazvanie dealera ili gorod',
    allStates: 'Vse regiony',
    allSpecialties: 'Vse spetsializatsii',
    sortBy: 'Sortirovat po',
    sortByDistance: 'Sort by Distance',
    sortByRating: 'Sort by Rating',
    sortByInventory: 'Nalichie',
    verifiedDealers: 'Proverenn dealers',
    carsAvailable: 'Dostupn cari',
    averageRating: 'Sredniy reyting',
  },

  registeredDealers: {
    title: 'Zaregisterirovann dealers',
    subtitle: 'Prosmotrite nashu set verifyenn carn dealers',
    viewProfilee: 'Posmotret profil',
    viewInventory: 'Posmotret inventar',
    contactDealer: 'Svyazatsya s dealerom',
    backToHome: 'Nazad na glavnuyu',
    allDealersVerified: 'Vse dealers verifyeny',
    customerRated: 'Opriceska clientov',
    supportAvailable: 'Support 24/7',
    browseNetwork: 'Prosmotrite nashu set iz {count} verifyenn dealers po vsey Germanii',
    reviews: 'otzyvov',
    verifiedSince: 'Proveren s {ar}',
    experience: 'Opyt:',
    totalSales: 'Obshchie selli:',
    viewDealerProfilee: 'Posmotret profil dealera',
    ars: 'let',
    
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
      performance: 'Proizvoditelnost',
      mercedesBenz: 'Mercedes-Benz',
      porsche: 'Porsche',
      luxury: 'Luxury',
      businotssCars: 'Biznots-cari',
      fleetSales: 'Prodazhi avtoparkov',
      leasing: 'Lizing',
      ecoFriendly: 'Ekologichn',
    },
    
    // Dealer descriptions
    descriptions: {
      autoMaxDescription: 'Vedushchiy dealer lyuksov carey v Berlinot s bolee chem 15-letnim opytom. Spetsialization na premialn notmetskikh brendakh.',
      cityMotorsDescription: 'Semey avtosalon, obsluzhivayushchiy Myunkhen i okrestnotss. Izvesten otlichnym obsluzhivaniem clientov i spravedliv pricesami.',
      ecoWheelsDescription: 'Vedushchiy spetsialist po elektricheskim i gibridnym caryam v Gamburge. Priverzhen resheniyam ustoychiv vehiclea.',
      rheinAutoDescription: 'Spetsialisty po sportivnym caryam v Reynskoy oblasti. Obshirn kollektsiya vysokoproizvoditeln carey.',
      stuttgartLuxuryDescription: 'Avtorizovan dealer Mercedes-Benz i Porsche v Shtutgarte. Dom luchshey notmetskoy inzhenotrii.',
      nordFahrzeugeDescription: 'Spetsialist po korporativnym caryam, obsluzhivayushchiy delovoy rayon Frankfurta. Ekspert po resheniyam avtoparkov i lizingu.',
    },
  },

  // Additional translations for hardcoded text
  hardcodedFixes: {
    // Spetsifichno dlya CountryTestPage
    countryTestPage: {
      codeLabel: 'Kod:',
      loadingCars: 'Zagruzka carey...',
      errorPrefix: 'Oshibka:',
      carListingsFor: 'Spiski carey dlya',
      onlyListedDescription: 'Tolko cari, perechislenn v <strong>{country} ({code})</strong>, dolzhny poyavitsya nizhe',
      foundCarsIn: 'Naydeno {count} carey v {country}',
      countryFilteredResults: '🔒 Resulty, otfilterovann po stranot',
      noCarsFound: 'Cari not naydeny',
      noCarsInCountry: 'V nastoyashchee time nott carey, perechislenn v {country}.',
      trySwitchingCountry: 'Poprobuyte pereklyuchit country s helpyu pereklyuchatelya vyshe.',
      carIdAndCountry: 'ID: {id} | Strana: {country}',
      developmentNote: '<strong>Primechanie:</strong> V proizvodstve strany avtomaticheski definotsya iz poddomena (naprimer, mk.carmaket365.com, al.carmaket365.com). Etot pereklyuchatel rabotaet tolko v rezhime razrabotki.',
    },

    // AdminDashboard - znachki statusa i mok-these
    adminDashboard: {
      statusBadges: {
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
        sedan: 'Sedan',
        luxury: 'Luxury',
        
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
    dealerDashboard: {
      mockData: {
        // Zagolovki carey
        bmw3Series320i2022: '2022 BMW 3 seriya 320i',
        audiA4Avant2021: '2021 Audi A4 Avant',
        mercedesCClass2020: '2020 Mercedes C-klass',
        
        // Znacheniya probega
        mileage25k: '25 000 km',
        mileage18k: '18 000 km',
        mileage32k: '32 000 km',
      },
    },

    // Hardcoded financing text
    financing: {
      features: {
        quickApproval: {
          title: 'Bystr approvedie',
          description: 'Poluchite approvedie za minuty',
        },
        lowRates: {
          title: 'Nizkie stavki',
          description: 'Konkurentn propricestn stavki',
        },
        noCreditImpact: {
          title: 'Bez vliyaniya na kredit',
          description: 'Tolko myagk kreditn verifyka',
        },
        expertSupport: {
          title: 'Ekspertn podderzhka',
          description: 'Prethese spetsialisty po kreditam',
        },
      },
      form: {
        creditScoreRange: 'Diapazon kreditn reytinga',
        loanTerm: 'Srok kredita',
      },
      summary: {
        loanSummary: 'Svodka po kreditu',
        loanAmount: 'Summa kredita',
        monthlyPayment: 'Monthly Payment',
        totalInterest: 'Obshchie propricesty',
        totalPayment: 'Total Payment',
      },
      options: {
        financingOptions: 'Varianty financingovaniya',
        chooseOption: 'Choose the option that best suits you',
        traditionalAutoLoan: 'Traditsion avtokredit',
        mostPopular: 'Samyy populyar',
        leaseOptions: 'Varianty lizinga',
      },
    },

    contact: {
      title: 'Svyazatsya s nami',
      subtitle: 'Svyazhites s our komandoy dlya support, voprosov ili helpi v buye ili selle carya.',
      backToHome: 'Vernutsya na glavnuyu',
      
      // Main content
      mainTitle: 'Svyazhites s nami',
      mainDescription: 'Neskolko sposobov svyazatsya s our sluzhboy support dlya by accessingeniya helpi.',
      contactOverview: 'If you have questions about buying a car, need help selling your vehicle, or require technical support, our team is ready to help you. Choose the most convenient way to contact us.',
      
      // Contact methods
      phonotSupport: {
        title: 'Telefonn podderzhka',
        salesDepartment: 'Otdel sell',
        customerService: 'Sluzhba support clientov',
        financingDepartment: 'Finansovyy otdel'
      },
      emailSupport: {
        title: 'Support po email',
        genotralInquiries: 'Obshchie questions',
        salesQuestions: 'Voprosy po sellam',
        support: 'Tekhnichesk podderzhka'
      },
      businotssHours: {
        title: 'Chasy raboty',
        mondayFriday: 'Ponotdelnik - Pyatnitsa',
        saturday: 'Saturday',
        sunday: 'Voskresenot',
        timeRange: {
          mondayFriday: '8:00 - 20:00',
          saturday: '9:00 - 18:00',
          sunday: '10:00 - 16:00'
        }
      },
      officeLocation: {
        title: 'Mestopolozhenie ofisa',
        address: {
          street: 'Potsdamer Platz 1',
          city: '10785 Berlin, Germaniya',
          country: 'Country'
        },
        getDirections: 'Postroit marshrut'
      },
      
      // Contact form
      form: {
        title: 'Otpravit nam soobshchenie',
        subtitle: 'Zapolnite formu nizhe, i my svyazhemsya s your kak mozhno skoree.',
        required: '*',
        inquiryType: {
          label: 'Tip zaprosa',
          placeholder: 'Select Request Type',
          options: {
            buying: 'Pokupka carya',
            selling: 'Prodazha carya',
            financing: 'Finansirovanie',
            dealer: 'Uslugi dlya dealers',
            support: 'Tekhnichesk podderzhka',
            other: 'Drug'
          }
        },
        fields: {
          fullName: 'Poln name',
          email: 'Email adres',
          phonot: 'Phonot number',
          subject: 'Tema',
          message: 'Message'
        },
        placeholders: {
          name: 'Vvedite vashe full name',
          email: 'Vvedite vash email adres',
          phonot: 'Vvedite vash nomer phonota',
          subject: 'Vvedite temu soobshcheniya',
          message: 'Rasskazhite, kak my mozhem vam help...'
        },
        submitButton: 'Otpravit soobshchenie',
        disclaimer: 'My obychno otvechaem v techenie 24 chasov v rabochie dni.'
      },
      
      // Success message
      success: {
        title: 'Soobshchenie otpravleno!',
        message: 'Spasibo za obrashchenie k nam. My by accessingili vashe soobshchenie i otvthesem v techenie 24 chasov.'
      },
      
      // Quick help
      quickHelp: {
        title: 'Bystr help',
        subtitle: 'Naydite answers na frequently asked questions ili by accessingite notmedlennuyu help.',
        options: {
          buyingGuide: {
            title: 'Guide po buye carya',
            description: 'Uznayte o nashem protsesse buyi carey'
          },
          sellingGuide: {
            title: 'Guide po selle carya', 
            description: 'Poluchite help v selle vashego vehiclen vehiclesa'
          },
          faq: {
            title: 'Chasto asked questions',
            description: 'Prosmotrite frequently asked questions'
          },
          safetyTips: {
            title: 'Sovety po safetyi',
            description: 'Vazhn rekomendatsii po safetyi'
          }
        }
      },
      
      // Urgent support
      urgentSupport: {
        title: 'Nuzhna notmedlenn help?',
        message: 'Dlya srochn voprosov ili notmedlennoy helpi zvonite na nashu liniyu support ili prosmatrivayte nashi accessn cari.',
        browseCars: 'Prosmotret cari',
        callNow: 'Pozvonit seychas'
      }
    },

    // Dealer page - hardcoded strings
    dealers: {
      searchLabel: 'Search dealers',
      stateLabel: 'Region',
      specialtyLabel: 'Specialty',
      allStatesOption: 'Vse regiony',
      allSpecialtiesOption: 'Vse spetsializatsii',
      sortByDistance: 'Po rasstoyaniyu',
      sortByRating: 'Po reytingu',
      sortByInventory: 'Po kolichestvu avto',
      sortByLabel: 'Sortirovat po:',
      dealersFound: 'dealers naydeno',
      specialtiesHeader: 'Spetsializatsii',
      certificationsHeader: 'Certifications',
      noDealersFound: 'Dilery not naydeny',
      tryAdjustingFilters: 'Poprobuyte change kriterii search',
      viewProfilee: 'Posmotret profil',
      contact: 'Contacts',
      clearFilters: 'Ochistit filtery',
      milesAway: 'km',
      cars: 'cars',
      reviews: 'otzyvov',
      hoursLabel: 'Chasy raboty',
    },

    registeredDealers: {
      title: 'Zaregisterirovann dealers',
      subtitle: 'Prosmotrite nashu set verifyenn carn dealers',
      viewProfilee: 'Posmotret profil',
      viewInventory: 'Posmotret inventar',
      contactDealer: 'Svyazatsya s dealerom',
      backToHome: 'Vernutsya domoy',
      allDealersVerified: 'Vse dealers verifyeny',
      customerRated: 'Opriceseno clientami',
      supportAvailable: 'Support 24/7',
      browseNetwork: 'Prosmotrite nashu set iz {count} verifyenn dealers po vsey Germanii',
      reviews: 'otzyvov',
      verifiedSince: 'Proveren s {ar}',
      experience: 'Opyt:',
      totalSales: 'Obshchie selli:',
      viewDealerProfilee: 'Posmotret profil dealera',
      verifiedDealers: 'Proverenn dealers',
      totalDealers: 'Vsego dealers',
      averageRating: 'Sredniy reyting',
      totalInventory: 'Obshchiy inventar',
      searchDealers: 'Search dealers',
      allLocations: 'Vse mestopolozheniya',
      sortBy: 'Sortirovat po',
      ars: 'let',
      
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
        performance: 'Proizvoditelnost',
        mercedesBenz: 'Mercedes-Benz',
        porsche: 'Porsche',
        luxury: 'Luxury',
        businotssCars: 'Biznots cari',
        fleetSales: 'Prodazha avtoparkov',
        leasing: 'Lizing',
        ecoFriendly: 'Ekologichn',
      },

      // Dealer descriptions  
      descriptions: {
        autoMaxDescription: 'Vedushchiy dealer lyuksov carey v Berlinot s opytom bolee 15 let. Spetsializiruetsya na premialn notmetskikh brendakh.',
        cityMotorsDescription: 'Semey dealerskiy pricestr, obsluzhivayushchiy Myunkhen i prilegayushchie rayony. Izvesten otlichnym obsluzhivaniem clientov i chestn pricesami.',
        ecoWheelsDescription: 'Vedushchiy spetsialist po elektricheskim i gibridnym caryam v Gamburge. Priverzhen ekologichnym vehiclenym resheniyam.',
        rheinAutoDescription: 'Spetsialisty po proizvoditelnym i sportivnym caryam v Reynlande. Obshirn kollektsiya vysokoproizvoditeln carey.',
        stuttgartLuxuryDescription: 'Avtorizovan dealer Mercedes-Benz i Porsche v Shtutgarte. Dom better notmetsk mashinostrniya.',
        nordFahrzeugeDescription: 'Spetsialist po korporativnym caryam, obsluzhivayushchiy delovoy rayon Frankfurta. Ekspert po resheniyam dlya avtoparkov i lizingu.',
      },
    },

    // Dealer support page - hardcoded strings
    dealerSupport: {
      supportCenterText: 'Our specialized dealer support team will help you maximize success on CarMarket365. Get help with inventory management, customer inquiries, and platform features.',
      dashboardSupport: {
        title: 'Support panotli upravleniya',
        items: [
          'Help with inventory management',
          'Optimization obyavleniy',
          'Interpretation analitiki',
          'Nastroyka accounta'
        ],
      },
      customerRelations: {
        title: 'Otnosheniya s clientami',
        items: [
          'Guide po upravleniyu lidami',
          'Luchshie praktiki kommunikatsii',
          'Obrabotka zaprosov clientov',
          'Upravlenie otzyyour'
        ],
      },
      performanceOptimization: {
        title: 'Optimization proizvoditelnotss',
        items: [
          'Uluchshenie vidimosti obyavleniy',
          'Sovety po priceoy strategii',
          'Rekomendatsii po kachestvu foto',
          'Analiz rynochn trendov'
        ],
      },
      technicalSupport: {
        title: 'Tekhnichesk podderzhka',
        items: [
          'Problemy funktsionalnotss platform',
          'Help s mobilnym prilozheniem',
          'Ustranotnie notpoladok integratsii',
          'Obuchenie funktsiyam'
        ],
      },
      gettingStarted: {
        title: 'Nachalo raboty v kachestve dealera',
        description: 'Step-by-step guide to setting up your dealer account and maximizing success.',
        accountSetup: {
          title: 'Nastroyka accounta',
          items: [
            'Proydite verifikatsiyu dealera',
            'Zagruzite delovuyu dokumentatsiyu',
            'Nastroyte obrabotku paymentey',
            'Nastroyte biznots-profil'
          ],
        },
        inventoryManagement: {
          title: 'Inventory Management',
          items: [
            'Dobavte perv listing o care',
            'Zagruzite kachestvenn photos',
            'Napishite ubediteln opisaniya',
            'Ustanovite konkurentn pricesy'
          ],
        },
        performanceTracking: {
          title: 'Otslezhivanie proizvoditelnotss',
          items: [
            'Monitoring proizvoditelnotss obyavleniy',
            'Otslezhivanie zaprosov clientov',
            'Analiz rynochn trendov',
            'Optimization na osnove these'
          ],
        },
      },
      helpSection: {
        title: 'Nuzhna help? My zdes dlya vas!',
        message: 'Nasha team support dealers ready help vam dobitsya uspekha. Svyazhites s nami po adresu dealers@carmaket365.com ili through panotl dealera.',
        returnToPlatform: 'Vernutsya na platformu',
        goToDealerDashboard: 'Pereyti na panotl dealera',
      },
    },

    // Accessibility page - hardcoded strings
    accessibility: {
      standardsWeFollow: 'Standarty, kotorym my sleduem',
      standardsDescription: 'My stremimsya sootvetstvovat ustanovleedm standartam i rekomendationm accessibilityi.',
      wcagGuidelinots: 'Rekomendatsii WCAG',
      wcagDescription: 'My stremimsya sootvetstvovat standartam rekomendatsiy po accessibilityi veb-kontenta (WCAG) 2.1 urovnya AA.',
      platformCompatibility: 'Sovmestimost platform',
      platformCompatibilityDescription: 'Nasha platforma razrabotana dlya raboty s assistivn tekhnologiyami i instrumentami accessibilityi.',
      weValueYourFeedback: 'My pricesim vashi otzyvy',
      feedbackMessage: 'Esli vy stolknulis s prepyatstviyami accessibilityi ili u vas est predlozheniya po uluchsheniyu, not stesnyaytes obrashchatsya k nam po adresu accessibility@carmaket365.com',
      returnToPlatform: 'Vernutsya na platformu',
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
      returnToPlatform: 'Vernutsya na platformu',
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
    safetyTips: {
      mainTitle: 'Bezopasnost buyi i selli carey',
      mainDescription: 'Basic safety recommendations for protection during car transactions.',
      safetyOverview: 'Your safety - nash glav prioritet. Sleduyte thesem rekomendationm dlya obespecheniya secure i uspeshn experience buyi i selli carey na our platforme.',
      methesengSafety: {
        title: 'Bezopasnost vstrech',
        items: [
          'Meet in public, well-lit places',
          'Drive typeite othera ili chlena semi',
          'Vstrechaytes v dnotvn time',
          'Doveryayte svoim instinktam'
        ],
      },
      paymentSecurity: {
        title: 'Bezopasnost paymentey',
        items: [
          'Ispolzuyte secure metody oplaty',
          'Izbegayte nalichn dlya bolshikh summ',
          'Proveryayte oplatu before beforeachey',
          'Poluchayte kvitantsiyu za vse tranzaktsii'
        ],
      },
      vehicleInspection: {
        title: 'Osmotr carya',
        items: [
          'Rekomenduetsya professional osmotr',
          'Proverte vse mekhanicheskie sistemy',
          'Proverte VIN i registeratsiyu',
          'Tshchatelno protestiruyte vozhdenie'
        ],
      },
      redFlags: {
        title: 'Trevozhn signaly',
        items: [
          'Davlenie prinyat reshenie bystro',
          'Zaprosy lichnoy informatsii zaranote',
          'Sdelki, kotor kazhutsya too khoroshimi',
          'Nezhelanie vstrechatsya lichno'
        ],
      },
      documentation: {
        title: 'Neobkhodim dokumentation',
        description: 'Vazhn dokumenty dlya verifyki i by accessingeniya vo time vashey sdelki.',
        forBurs: 'Dlya buyerey',
        forSellers: 'Dlya prodavtsov',
        burItems: [
          'Nazvanie carya ili registeration',
          'Zapisi o tekhnicheskom obsluzhivanii',
          'Vehicle history report',
          'Bill of sale with all details'
        ],
        sellerItems: [
          'Proverka valid ID buyerya',
          'Podtverzhdenie strakhovki (pri test drivee)',
          'Pismenn soglashenie o buye',
          'Podtverzhdenie oplaty'
        ],
      },
      emergency: {
        title: 'Ostavaytes v safetyi i soobshchayte o problemakh',
        message: 'Esli vy stolknulis s podozritelnoy aktivnostyu ili chuvstvuete sebya notsecureo, dovertes instinktam i notmedlenno ukhodite. Soobshchayte o any problemakh our komande safetyi po adresu safety@carmaket365.com',
        browseCars: 'Bezopasno prosmatrivayte cari',
        reportConcern: 'Soobshchit o probleme safetyi',
      },
    },
  },

  // Okonchateln ispravleniya dlya ostavshegosya zhestko kodirovann angliysk teksta
  finalFixes: {
    // Page ExpressSell - Marki carey, model i zapolniteli
    expressSell: {
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
      namePlaceholder: 'Your full name',
      locationPlaceholder: 'City, State',
      uploadPhotos: 'Upload Photos',
      uploadPhotosDescription: 'Add photos to make your listing more attractive',
      uploadCarPhotos: 'Upload Car Photos',
      addUpToTenPhotos: 'Add up to 10 photos. First photo will be the main image.',
      choosePhotos: 'Choose Photos',
      mainPhoto: 'Main Photo',
      priceAndDescription: 'Price & Description',
      setPriceAndDescription: 'Set your desired price and describe your vehicle',
      askingPriceEuros: 'Asking Price (€) *',
      priceExample: 'e.g. 25,000',
      contactInformation: 'Contact Information',
      howShouldBuyersContact: 'How should buyers contact you?',
      fullNameRequired: 'Full Name *',
      yourFullName: 'Your full name',
      phonotNumberRequired: 'Phonot Number *',
      phonotPlaceholder: 'Your phonot number',
      emailAddressRequired: 'Email Address *',
      yourEmail: 'your.email@example.com',
      locationRequired: 'Location *',
      cityState: 'City, State',
      carDetailsStep: 'Car Details',
      photosStep: 'Photos',
      priceDescriptionStep: 'Price & Description',
      contactInfoStep: 'Contact Info',
      backToHome: 'Back to Home',
      title: 'Express Sale',
      listMyCarQuickly: 'List your car quickly and easily',
      previous: 'Previous',
      notxt: 'Next',
      listMyCar: 'List My Car',
    },
    
    // Page DealerSignUp - Zapolniteli form
    dealerSignUp: {
      firstNamePlaceholder: 'Ivan',
      lastNamePlaceholder: 'Petrov',
    },
    
    // Page SavedCars - Zapolnitel filtera
    savedCars: {
      filterPlaceholder: 'Filterovat po',
      sortBy: 'Sortirovat po',
      recentlySaved: 'Nedavno sokhranotnn',
      priceLowToHigh: 'Tsena: Ot nizkoy k vysokoy',
      priceHighToLow: 'Tsena: Ot vysokoy k nizkoy',
      arNewestFirst: 'God: Nov snachala',
      arOldestFirst: 'God: Star snachala',
      allCars: 'Vse cari',
      savedThisWeek: 'Sokhranotno na etoy notdele',
      back: 'Back',
      noSavedCars: 'Net sokhranotnn carey',
      startBrowsing: 'Nachnite prosmatrivat nash obshir inventar vehiclen vehicles i sokhranyayte izbrann zdes.',
      browseVehicles: 'Prosmotr vehiclen vehicles',
      title: 'Sokhranotnn cari',
      clearAll: 'Clear All',
      carsSaved: 'carey sokhranotno',
      savedDate: 'Saved',
      contact: 'Contact',
      view: 'View',
    },
    
    // Page UIDemo - Demo zapolniteli
    uiDemo: {
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
    priceLabel: 'Price',
    originalPrice: 'Pervonachaln pricesa',
    savingsAmount: 'Discount',
    
    // Status Badges
    certified: 'Sertifitsirovan',
    featured: 'Featured',
    newArrival: 'Nov postuplenie',
    priceReduced: 'Tsena snizhena',
    greatDeal: 'Vygodn predlozhenie',
    verified: 'Proveren',
    
    // Image Gallery
    mainImage: 'Glavn izobrazhenie',
    imageGallery: 'Galereya izobrazheniy',
    viewFullscreen: 'Prosmotr v polnkrannom rezhime',
    imageCounter: 'iz',
    
    // Tabs and Content
    tabs: {
      overview: 'Obzor',
      features: 'Osobennotss',
      inspection: 'Inspection',
      history: 'History',
    },
    
    // Overview Tab
    overview: {
      vehicleDetails: 'Vehicle Details',
      mileage: 'Mileage',
      fuelType: 'Fuel type',
      transmission: 'Transmission',
      ar: 'Year',
      exteriorColor: 'Exterior Color',
      interiorColor: 'Interior Color',
      bodyType: 'Body Type',
      drivetrain: 'Drive type',
      vin: 'VIN',
      description: 'Description',
      miles: 'km',
    },
    
    // Features Tab
    features: {
      title: 'Osobennotss',
      featuresAndOptions: 'Osobennotss i optsii',
    },
    
    // Inspection Tab
    inspection: {
      title: 'Inspection Report',
      lastUpdated: 'Poslednote obnovlenie:',
      excellentCondition: 'Excellent sostoyanie',
      pointInspection: 'Zavershena 150-tochechn inspektsiya',
      inspectionCompleted: 'inspektsiya zavershena',
      inspectionScore: 'Opriceska inspektsii',
    },
    
    // History Tab
    history: {
      title: 'Istoriya carya',
      vehicleHistory: 'Istoriya carya',
      listedForSale: 'Vystavlen na sellu',
      vehicleAdded: 'Car dobavlen na ploshchadku',
      lastService: 'Poslednote obsluzhivanie',
      regularMaintenance: 'Planov obsluzhivanie zaversheno',
    },
    
    // Action Buttons
    actions: {
      callDealer: 'Pozvonit dealeru',
      sendMessage: 'Otpravit soobshchenie',
      scheduleTestDrive: 'Zapisatsya na test drive',
      getPreApproved: 'Poluchit previewn approvedie',
      calculatePayment: 'Calculate Payment',
      viewDealerProfilee: 'Prosmotret profil dealera',
      viewAllDealerCars: 'Posmotret vse cari dealera',
      shareVehicle: 'Podelitsya carem',
      saveToFavorites: 'Sokhranit v izbrann',
      removeFromFavorites: 'Udalit iz izbrann',
    },
    
    // Seller Information
    seller: {
      title: 'Seller',
      sellerInformation: 'Information o prodavtse',
      dealerRating: 'Dealer Rating',
      reviews: 'otzyvov',
      verified: 'Proveren',
      phonot: 'Phonot',
      email: 'Email',
    },
    
    // Financing Section
    financing: {
      title: 'Varianty financingovaniya',
      financingOptions: 'Varianty financingovaniya',
      estimatedPayment: 'Estimated Monthly Payment',
      monthlyPayment: '/mesyats',
      basedOnTerms: 'Na osnove',
      aprForMonths: 'godov na',
      withDown: 'mesyatsev s pervonachalnym vznosom',
      getPreApproved: 'Poluchit previewn approvedie',
      calculatePayment: 'Calculate Payment',
    },
    
    // Mock Data Values
    mockData: {
      unknownMake: 'Neizvestn marka',
      unknownModel: 'Neizvestn model',
      excellent: 'Excellent',
      gasolinot: 'Gasoline',
      automatic: 'Automatic',
      unknown: 'Neizvestno',
      black: 'Black',
      sedan: 'Sedan',
      frontWheelDrive: 'Front-Wheel Drive',
      wellMaintainotd: 'Khorosho obsluzhivaem vehiclen vehicleso v otlichnom sostoyanii.',
      inspectionReport: 'Car byl verifyen i sootvetstvuet nashim standartam kachestva.',
      locationNotSpecified: 'Mestopolozhenie not ukazano',
      privateSeller: 'Private Seller',
      features: {
        airConditioning: 'Air Conditioning',
        powerSteering: 'Power Steering',
        electricWindows: 'Electric Windows',
        centralLocking: 'Tsentral zamok',
        airbags: 'Airbags',
        abs: 'ABS',
        powerBrakes: 'Usilitel tormozov',
        amfmRadio: 'AM/FM radio',
      },
      condition: 'Excellent',
      interiorColor: 'Black',
      drivetrain: 'Front-Wheel Drive',
      description: 'Khorosho obsluzhivaem vehiclen vehicleso v otlichnom sostoyanii.',
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
      dealers: {
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
    errors: {
      carNotFound: 'Car not nayden',
      failedToLoad: 'Ne udalos upload detali carya.',
      dsntExist: 'The car you are looking for does not exist or has been removed.',
      hasBeenRemoved: 'has been removed',
      backToCars: 'Nazad k caryam',
    },
    
    // Loading States
    loading: {
      loadingVehicle: 'Zagruzka carya...',
      loadingDetails: 'Zagruzka detaley...',
    },
    
    // Contact and Communication
    contact: {
      contactDealer: 'Svyazatsya s dealerom',
      interestedIn: 'Menya interesuet',
      preferredContactMethod: 'Predpochtitel sposob svyazi',
      additionalMessage: 'Dopolniteln soobshchenie',
      sendInquiry: 'Otpravit zapros',
      callNow: 'Pozvonit seychas',
      emailDealer: 'Napisat dealeru',
      scheduleViewing: 'Zapisatsya na view',
    },
    
    // Test Drive
    testDrive: {
      scheduleTestDrive: 'Zapisatsya na test drive',
      preferredDate: 'Predpochtiteln data',
      preferredTime: 'Predpochtiteln time',
      contactInfo: 'Contact Information',
      additionalNotes: 'Dopolniteln zametki',
      submitRequest: 'Otpravit zapros',
    },
    
    // Share Feature
    share: {
      shareVehicle: 'Share Vehicle',
      shareOnSocial: 'Share on Social Networks',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied!',
      linkCopiedToClipboard: 'Link copied to clipboard!',
      emailToFriend: 'Email to Friend',
      genotrateQR: 'Genotrate QR Code',
    },
  },

  // Rasshirenn funktsii
  advancedFeatures: {
    // Advanced Search
    advancedSearch: {
      title: 'Advanced Search',
      active: 'Advanced Search aktiven',
      filters: 'Filters',
      clearAll: 'Clear All',
      searchCars: 'Search Cars',
      
      // Razdely
      sections: {
        vehicleDetails: 'Vehicle Details',
        priceLocation: 'Price Tsena i mestopolozhenie Location',
        featuresOptions: 'Features Funktsii i optsii Options',
      },
      
      // Polya detaley carya
      fields: {
        make: 'Make',
        model: 'Model',
        arFrom: 'Year From',
        arTo: 'Year To',
        priceMin: 'Min Price',
        priceMax: 'Max Price',
        mileageMax: 'Max Mileage',
        fuelType: 'Fuel type',
        transmission: 'Transmission',
        bodyType: 'Body Type',
        drivetrain: 'Drive type',
        exteriorColor: 'Exterior Color',
        interiorColor: 'Interior Color',
        location: 'Location',
        radius: 'Search Radius',
        sellerType: 'Seller Type',
      },
      
      // Zapolniteli
      placeholders: {
        anyMake: 'Any Make',
        anyModel: 'Any Model',
        anyYear: 'Any Year',
        anyPrice: 'Any Price',
        anyMileage: 'Any Mileage',
        anyFuel: 'Any Fuel',
        anyTransmission: 'Any Transmission',
        anyBodyType: 'Any Body Type',
        anyDrivetrain: 'Any Drivetrain',
        anyColor: 'Any Color',
        cityStateZip: 'City, State or ZIP',
        anyRadius: 'Any Distance',
        anySeller: 'Any Seller',
      },
      
      // Optsii
      options: {
        mileage: {
          under10k: 'Under 10,000 km',
          under25k: 'Under 25,000 km',
          under50k: 'Under 50,000 km',
          under75k: 'Under 75,000 km',
          under100k: 'Under 100,000 km',
          under150k: 'Under 150,000 km',
          over100k: 'Over 100,000 km',
        },
        radius: {
          miles25: '25 km',
          miles50: '50 km',
          miles100: '100 km',
          miles200: '200 km',
          nationwide: 'Nationwide',
        },
        sellerType: {
          dealer: 'Dealer',
          private: 'Private Seller',
          both: 'Both',
        },
      },
      
      // Specifications
      features: {
        airConditioning: 'Air Conditioning',
        allWheelDrive: 'All-Wheel Drive',
        backupCamera: 'Backup Camera',
        blindSpotMonitoring: 'Blind Spot Monitoring',
        bluetoothConnectivity: 'Bluetooth Connectivity',
        cruiseControl: 'Cruise Control',
        heatedSeats: 'Heated Seats',
        leatherSeats: 'Leather Seats',
        navigationSystem: 'Navigation System',
        parkingAssist: 'Parking Assist',
        powerWindows: 'Power Windows',
        pushButtonStart: 'Zapusk knopkoy',
        remoteStart: 'Remote Start',
        sunroof: 'Sunroof',
        thirdRowSeating: 'Third Row Seating',
        towingPackage: 'Pritsepn ustroystvo',
        premiumSound: 'Premium Sound System',
        adaptiveCruiseControl: 'Adaptive Cruise Control',
        lanotKeepAssist: 'Help uderzhaniya v polose',
        automaticEmergencyBraking: 'Automatic ekstrenn tormozhenie',
        keylessEntry: 'Keyless Entry',
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
      title: 'Sravnotnie carey',
      clearAll: 'Clear All',
      compareCars: 'Sravnit cari',
      compareNow: 'Sravnit seychas',
      
      // Polya sravnotniya
      fields: {
        price: 'Price',
        ar: 'Year',
        mileage: 'Mileage',
        fuelType: 'Fuel type',
        transmission: 'Transmission',
        drivetrain: 'Drive type',
        bodyType: 'Body Type',
        exteriorColor: 'Exterior Color',
        interiorColor: 'Interior Color',
        enginot: 'Enginot',
        horsepower: 'Loshadin sily',
        torque: 'Krutyashchiy moment',
        fuelEconomy: 'Fuel consumption',
        seatingCapacity: 'Vmestimost',
        features: 'Basic Features',
        safety: 'Sistemy safetyi',
        warranty: 'Warranty',
        dealerInfo: 'Information o dealere',
      },
      
      // Panotl sravnotniya
      bar: {
        compareCars: 'Sravnit cari',
        selected: 'vybrano',
        max: 'maks.',
        compare: 'Sravnit',
        clear: 'Clear',
      },
      
      // Neaccessno
      notAvailable: 'N/D',
    },
    
    // Kalkulyator financingovaniya
    financingCalculator: {
      title: 'Kalkulyator financingovaniya',
      
      // Razdely
      sections: {
        vehicleDetails: 'Vehicle Details',
        downPayment: 'Pervonachal vznos',
        loanTerms: 'Usloviya kredita',
        monthlyPayment: 'Ezhemesyach payment',
        loanSummary: 'Svodka po kreditu',
      },
      
      // Polya
      fields: {
        vehiclePrice: 'Tsena carya',
        salesTax: 'Nalog s sell',
        dealerFees: 'Komissii dealera',
        tradeInValue: 'Stoimost obmena',
        downPayment: 'Pervonachal vznos',
        downPaymentPercent: 'Propricest pervonachaln vznosa',
        loanTerm: 'Srok kredita',
        interestRate: 'Propricestn stavka (GPS)',
        monthlyPayment: 'Raschet ezhemesyach payment',
        totalLoanAmount: 'Obshch summa kredita',
        totalInterest: 'Obshchie propricesty',
        totalCost: 'Obshch stoimost',
      },
      
      // Metki
      labels: {
        months: 'mesyatsev',
        ars: 'let',
        percent: '%',
        perMonth: '/mesyats',
        loanAmount: 'Summa kredita',
        interestPaid: 'Vyplachenn propricesty',
        totalPaid: 'Obshch vyplata',
      },
      
      // Knopki
      buttons: {
        calculate: 'Rasschitat payment',
        reset: 'Sbrosit kalkulyator',
        getPreApproved: 'Poluchit previewn approvedie',
        findFinancing: 'Nayti varianty financingovaniya',
      },
      
      // Primechaniya
      notes: {
        estimate: 'Eto priblizitel raschet. Fakticheskie terms mogut otlichatsya.',
        disclaimer: 'Raschety paymentey yavlyayutsya pribliziteln i mogut not otrazhat fakticheskie terms kredita.',
        taxesVary: 'Nalv stavki razlichayutsya v zavisimosti ot mestopolozheniya.',
        additionalFees: 'Mogut primenyatsya dopolniteln sbory.',
      },
    },
  },

  finalFixes: {
    savedCars: {
      title: 'Sokhranotnn cari',
      back: 'Back',
      noSavedCars: 'Poka nott sokhranotnn carey',
      startBrowsing: 'Nachnite prosmatrivat nash inventar, to save ponravivshiesya cari na potom.',
      browseVehicles: 'Prosmotret cari',
      carsSaved: 'carey sokhranotno',
      clearAll: 'Clear All',
      sortBy: 'Sortirovat po',
      recentlySaved: 'Nedavno sokhranotnn',
      priceLowToHigh: 'Tsena: po vozrastaniyu',
      priceHighToLow: 'Tsena: po ubyvaniyu',
      arNewestFirst: 'God: snachala nov',
      arOldestFirst: 'God: snachala star',
      filterPlaceholder: 'Filter',
      allCars: 'Vse cari',
      savedThisWeek: 'Sokhranotnn na etoy notdele',
      savedDate: 'Saved',
      contact: 'Contact',
      view: 'Details'
    }
  }
};