import { TranslationStrings } from '../translations';

export const enTranslations: TranslationStrings = {
  brand: {
    name: 'CarMarket365'
  },
  contact: {
    phone: '+49 (0) 30 12345678',
    email: 'info@carmarket365.com',
    address: 'Berlin, Germany'
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
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
    phone: 'Phone',
    email: 'Email',
    location: 'Location',
    price: 'Price',
    currency: 'USD',
    year: 'Year',
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
    outline: 'Outline',
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
  
    ascending: 'Ascending',
  
    descending: 'Descending',
  },

  // Forms - validation, labels, placeholders, actions
  forms: {
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      phoneRequired: 'Phone number is required',
      messageRequired: 'Message is required',
      loanAmountRequired: 'Loan amount is required',
      annualIncomeRequired: 'Annual income is required',
      creditScoreRequired: 'Credit rating is required',
      employmentStatusRequired: 'Employment status is required',
      yearsAtJobRequired: 'Current job tenure is required',
      monthlyExpensesRequired: 'Monthly expenses are required',
      makeRequired: 'Make is required',
      modelRequired: 'Model is required',
      yearRequired: 'Year required',
      yearInvalid: 'Invalid year',
      mileageRequired: 'Mileage required',
      mileageNegative: 'Mileage cannot be negative',
      dateRequired: 'Please select a date',
      timeRequired: 'Please select a time',
    },
    labels: {
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone number',
      message: 'Message',
    },
    placeholders: {
      enterFullName: 'Enter your full name',
      enterEmail: 'Enter your email',
      enterPhone: 'Enter your Phone number',
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
        retired: 'Retired',
        student: 'Student',
        unemployed: 'Unemployed',
      },
      financialInformation: 'Financial Information',
      desiredLoanAmount: 'Desired Loan Amount',
    },
    scheduleTestDrive: {
      title: 'Schedule Test Drive',
      description: 'Book an appointment to test drive this vehicle',
      badge: 'Test Drive Available',
      success: {
        title: 'Test Drive Scheduled!',
        description: 'Your test drive request has been sent to the seller. They will contact you to confirm the appointment.',
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
        options: {
          condition: {
            excellent: 'Excellent',
            good: 'Good',
            fair: 'Fair',
            poor: 'Poor'
          },
          accident: {
            none: 'No accidents',
            minor: 'Minor accident',
            major: 'Major accident',
            multiple: 'Multiple accidents'
          },
          serviceHistory: {
            complete: 'Complete of service history',
            partial: 'Partial of service history',
            none: 'No of service history'
          },
          modifications: {
            none: 'No modifications',
            minor: 'Minor modifications',
            major: 'Major modifications'
          }
        }
      },
      results: {
        title: 'Your Trade-In Estimate',
        estimatedValue: 'Estimated Trade-In Value',
        range: 'Range',
        confidence: 'Confidence Level',
        confidenceLevels: {
          high: 'High',
          medium: 'Medium',
          low: 'Low'
        },
        factors: {
          title: 'Factors affecting your estimate',
          positive: 'Positive factors',
          negative: 'Negative factors',
          neutral: 'Neutral factors'
        },
        recommendations: {
          title: 'Recommendations',
          maintenance: 'Consider addressing maintenance issues before trading',
          documentation: 'Gather all of service records and documentation',
          inspection: 'Get a professional inspection for accurate assessment',
          timing: 'Consider maket timing for your specific make and model',
          marketConditions: 'Consider current market conditions when timing your trade-in',
          multipleAppraisals: 'Get multiple appraisals to ensure fair value',
          maintenanceRecords: 'Keep maintenance records to demonstrate vehicle care',
          cleanVehicle: 'Clean your vehicle thoroughly before appraisal'
        },
        disclaimer: {
          title: 'Important Notice',
          text: 'This is an estimated cost based on the provided information. Actual trade-in values may vary depending on dealer policies, current maket conditions, and physical inspection of the vehicle. We recommend obtaining quotes from multiple dealers for the most accurate assessment.'
        }
      },
      loading: {
        calculating: 'Calculating your estimate...',
        fetchingData: 'Fetching maket data...'
      }
    },
  
        excellentService: 'Excellent Service History',
  
        highAge: 'High Age',
  
        highMileage: 'High Mileage',
  
        lowAge: 'Low Age',
  
        lowMileage: 'Low Mileage',
  
        majorAccidents: 'Major Accidents',
  
        poorCondition: 'Poor Condition',
  
        additionalInfoPlaceholder: 'Any additional information about your vehicle...',
  
        locationExample: 'e.g., New York, NY',
  
        mileageExample: 'e.g., 50,000',
  
        modelExample: 'e.g., Civic, Camry, Golf',
  
        regular: 'Regular Maintenance',
  },

  hero: {
    title: 'Find Your Ideal Car',
    subtitle: 'Browse thousands of quality pre-owned vehicles',
    searchButton: 'Find Cars',
    advancedSearch: 'Advanced Search',
    vehicleTypes: {
      cars: 'Cars',
      motorbikes: 'Motorbikes',
      trucks: 'Trucks',
    
    bodyColor: 'Body Color',
  
    euroEmission: 'Euro Emission Standard',
  
    fullServiceHistory: 'Full Service History',
  
    guarantee: 'Warranty/Guarantee',
  
    hadAccident: 'Has Had Accident',
  
    mileageFrom: 'Mileage From',
  
    mileageTo: 'Mileage To',
  
    nonSmoking: 'Non-Smoking Vehicle',
  
    onlyWithImages: 'Only with Images',
  
    paintWork: 'Paint Work Done',
  
    powerFrom: 'Power From (HP)',
  
    powerTo: 'Power To (HP)',
  
    searchTerm: 'Search Term',
  
    upholstery: 'Upholstery Type',
  },
    searchForm: {
      make: 'Make',
      model: 'Model',
      priceFrom: 'Price From',
      priceTo: 'Price To',
      yearFrom: 'Year From',
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
        description: 'Complete your purchase in minutes with our streamlined buying process and digital paperwork.',
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
    sellCar: 'Sell',
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
    certifiedPreOwned: 'Certified Pre-Owned',
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
    yearRange: 'Year Range',
    yearMin: 'Min Year',
    yearMax: 'Max Year',
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
    phoneNumber: 'Phone Number',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Your Password',
    resetPasswordDescription: 'Enter your email address and we\'ll send you a link to reset your password.',
    sendResetLink: 'Send Reset Link',
    checkYourEmail: 'Check Your Email',
    resetLinkSent: 'We\'ve sent a password reset link to',
    nextSteps: 'Next Steps',
    checkEmailInbox: 'Check your email inbox (and spam folder)',
    clickResetLink: 'Click the reset link in the email',
    createNewPassword: 'Create your new password',
    tryAnotherEmail: 'Try Another Email',
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
    dealerBenefits: 'Dealer Benefits',
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
        uppercase: 'One uppercase letter',
        lowercase: 'One lowercase letter',
        number: 'One number',
        special: 'One special character (!@#€%^&*)',
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
    businessInformation: 'Business Information',
    tellUsAboutBusiness: 'Tell us about your dealership or business',
    businessName: 'Business Name',
    businessNamePlaceholder: 'Your Company Name LLC',
    businessType: 'Business Type',
    selectBusinessType: 'Select business type',
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
    yearEstablished: 'Year Established',
    selectYear: 'Select Year',
    businessDescription: 'Business Description',
    businessDescriptionPlaceholder: 'Describe your business, specializations and services...',
    contactPerson: 'Contact Person',
    primaryContactInfo: 'Primary contact information for your business',
    position: 'Position',
    positionPlaceholder: 'e.g., Owner, Sales Manager',
    businessEmail: 'Corporate Email',
    businessEmailPlaceholder: 'business@example.com',
    businessAddress: 'Business Address',
    dealershipLocation: 'Physical location of your dealership',
    streetAddress: 'Street Address',
    streetAddressPlaceholder: 'Business Center St., 123',
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
    businessNameRequired: 'Company name required',
    businessTypeRequired: 'Business type required',
    vatNumberRequired: 'VAT number required',
    firstNameRequired: 'Name is required',
    lastNameRequired: 'Last Name Required',
    emailRequired: 'Email is required',
    phoneRequired: 'Phone number is required',
    streetRequired: 'Street address required',
    cityRequired: 'City required',
    postalCodeRequired: 'Postal Code required',
    passwordRequired: 'Password required',
    confirmPasswordRequired: 'Please confirm password',
    validEmailRequired: 'Please enter a valid email address',
    validVatNumber: 'Please enter a valid VAT number (e.g. US123456789)',
    passwordMinEightChars: 'Password must contain at least 8 characters',
    acceptTermsRequired: 'You must accept terms and conditions',
    acceptPrivacyRequired: 'You must accept the privacy policy',
  },

  sell: {
    title: 'Sell Your Car',
    expressTitle: 'Express Sale',
    sellYourCar: 'Sell Your Vehicle',
    carInformation: 'Car Information',
    uploadPhotos: 'Upload Photos',
    setPrice: 'Set Price',
    contactInformation: 'Contact Information',
    publish: 'Publish',
    draft: 'Save as draft',
    preview: 'Preview',
    required: 'Required',
    optional: 'Optional',
    addPhotos: 'Add photos',
    removePhoto: 'Remove Photo',
    mainPhoto: 'Main Photo',
    additionalInfo: 'Additional Information',
    sellerNotes: 'Seller Notes',
    
    // Step titles
    steps: {
      vehicleType: 'Vehicle Type',
      basicInfo: 'Basic Information',
      details: 'Details',
      photosAndContact: 'Photos and Contact',
    },
    
    // Vehicle type selection
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'What type of vehicle are you selling?',
      basicInformation: 'Basic Information',
      basicInfoDescription: 'Tell us about your {vehicleType}',
      additionalDetails: 'Additional Details',
      additionalDetailsDescription: 'Add more details about your {vehicleType}',
      photosAndContact: 'Photos and Contact Information',
      photosAndContactDescription: 'Add photos and contact information',
      vehicleDetails: 'Vehicle Details',
      photosAndContactInfo: 'Photos and Contact Information',
      uploadVehiclePhotos: 'Upload Vehicle Photos',
      addUpToTenPhotos: 'Add up to 10 photos',
    },
    
    // Form fields and labels
    fields: {
      make: 'Make',
      model: 'Model',
      year: 'Year',
      mileage: 'Mileage',
      condition: 'Condition',
      fuelType: 'Fuel type',
      transmission: 'Transmission',
      exteriorColor: 'Exterior Color',
      interiorColor: 'Interior Color',
      askingPrice: 'Asking Price',
      featuresAndOptions: 'Specifications and Options',
      description: 'Description',
      vehiclePhotos: 'Vehicle Photos',
      contactName: 'Contact Name',
      phoneNumber: 'Phone number',
      emailAddress: 'Email address',
      location: 'Location',
    },
    
    // Placeholders
    
    
    // Button labels
    buttons: {
      nextStep: 'Next Step',
      previous: 'Previous',
      createListing: 'Create Listing',
    },
    
    // Preview section
    preview: {
      title: 'Preview',
      yourVehicle: 'Your vehicle',
      milesLabel: 'kilometers',
      priceLabel: 'Price',
      photosCount: '{count} photo{plural}',
      photo: '',
      photos: 's',
    },
    
    // Photo upload
    photos: {
      instruction: 'Add up to 10 high-quality photos of your vehicle. The first photo will be the main image in search results.',
      selected: '{count} photo{plural} selected',
      photo: '',
      photos: 's',
    },
    
    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'EUR', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    
    // Fuel types
    fuelTypes: {
      gasoline: 'Gasoline',
      electric: 'Electric',
      hybrid: 'Hybrid',
      diesel: 'Diesel',
      pluginHybrid: 'Plug-in Hybrid',
      flexFuel: 'Flex Fuel',
      cng: 'CNG',
      lpg: 'LPG',
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
      truck: 'Truck',
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
      fourwd: '4x4 Drive',
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
      poor: 'Poor',
    },
    
    // Features list
  
      needsWork: 'Needs Work',
  },

  countries: {
    northMacedonia: 'North Macedonia',
    albania: 'Albania',
    kosovo: 'Kosovo',
    slovenia: 'Slovenia',
    latvia: 'Latvia',
    global: 'Global',
    chooseCountry: 'Choose Your Country',
    changeCountry: 'Change country',
    detectedLocation: 'Detected location',
    currentSite: 'Current site',
    localBenefits: 'Local benefits',
    localCurrency: 'Local currency and prices',
    localLanguages: 'Native language support',
    localDealers: 'Local dealers and inventory',
    regionalFeatures: 'Regional features',
  },

  business: {
    qualityUsedCars: 'Quality used cars from',
    registeredDealers: 'registered dealers',
  },

  redirect: {
    welcomeMessage: 'Welcome to CarMarket365!',
    detectionMessage: 'We detected you\'re visiting from {country}. You\'ll be redirected to our {country} site for the best local experience, or you can choose a different country.',
    localBenefits: 'Local Benefits for {country}',
    continueButton: 'Continue to {country} site',
    chooseCountryButton: 'Choose a different country',
    hideDetails: 'Hide details',
    showDetails: 'How did we detect this?',
    benefits: {
      currency: 'Local currency and pricing',
      dealers: 'Local dealers and inventory',
      features: 'Region-specific features'
    },
    details: {
      ipDetection: 'We use your IP address to suggest the most relevant local site.',
      targetDomain: 'Target domain',
      changePreference: 'You can change this preference anytime from the header.'
    },
    // Legacy keys for backwards compatibility
    welcome: 'Welcome to CarMarket365!',
    detectedFrom: 'We detected that you are visiting from',
    redirectMessage: 'You will be redirected to our {country} site for a better local experience, or you can choose another country.',
    continueToSite: 'Go to {country} site',
    chooseDifferent: 'Choose another country',
    localBenefitsTitle: 'Local Benefits for {country}',
    howDetected: 'How did we detect this?',
    changeAnytime: 'You can change country preference at any time in header.',
    countrySpecificExperience: 'Each country site offers localized content, pricing and language options for a better experience.',
    adminTestingMode: 'Administrator/Testing Mode',
    adminNotAvailable: 'Administrator/Testing Mode - not accessible to customers',
    selectCountryToContinue: 'Please select your country to continue. This determines your local site, language and currency.',
  },


  footer: {
    aboutUs: 'Your trusted market for quality used cars. Find your ideal car among thousands of listings.',
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
    adminPanel: 'Admin Panel',
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
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'The requested item was not found.',
    unauthorized: 'You do not have permission to access this resource.',
    forbidden: 'Access to this resource is forbidden.',
    serverError: 'Server error. Please try again later.',
    validation: 'Please check your data and try again.',
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    invalidPhone: 'Please enter a valid Phone number.',
    passwordTooShort: 'Password must be at least 8 characters long.',
    passwordMismatch: 'Passwords do not match.',
    fileTooBig: 'File size is too large.',
    invalidFileType: 'Invalid file type.',
    noInternetConnection: 'No internet connection.',
    sessionExpired: 'Your session has expired. Please log in again.',
    errorBoundary: {
      message: 'Something went wrong. Please try refreshing the page.',
      details: 'Error Details',
      stackTrace: 'Stack trace:',
      refreshPage: 'Refresh Page',
      tryAgain: 'Try Again',
    },
  },


  admin: {
    panotl: 'Administrator Panel',
    dashboard: 'Administrator Dashboard',
  },

  dealer: {
    notFound: 'Dealer Not Found',
    information: 'Dealer Information',
    businessHours: 'Business Hours',
    vehicleInventory: 'Vehicle Inventory',
    viewListing: 'View Listing',
    editListing: 'Edit Listing',
    deleteListing: 'Delete Listing',
  },

  pages: {
    help: {
      title: 'Help Center',
    },
    feedback: {
      title: 'Feedback',
    },
    insurance: {
      title: 'Car Insurance',
    },
    placeholder: {
      underConstructionMessage: 'This page is under construction. We are working hard to create amazing features. Please come back later or continue exploring our main page.',
      backToHome: 'Back to Home',
      contactUs: 'Contact Us',
    },
    helpCenter: 'Support Center',
    feedback: 'Feedback',
    disclaimer: 'Disclaimer',
    carInsurance: 'Car Insurance',
    underConstruction: 'Under Construction',
    underConstructionMessage: 'This page is under construction. We are working hard to create amazing features. Please come back later or continue exploring our main page.',
    backToHome: 'Back to Home',
    contactUs: 'Contact Us',
    
    // Usloviya of service
    termsOfService: {
      title: 'Terms of Service',
      subtitle: 'Legal terms for using our car market platform.',
      backToHome: 'Back to Home',
      termsAndConditions: 'Terms and Conditions',
      termsDescription: 'Please carefully review these terms before using our platform.',
      overviewText: 'These Terms of Service govern your use of the CarMarket365 platform and define the rights and obligations of all users. By accessing our platform, you agree to comply with these terms.',
      userResponsibilities: 'User Responsibilities',
      userResponsibilitiesList: [
        'Provide accurate information',
        'Maintain respectful communication',
        'Comply with all applicable laws',
        'Protect your account credentials'
      ],
      platformRules: 'Platform Rules',
      platformRulesList: [
        'No fraudulent listings allowed',
        'Honest vehicle descriptions',
        'Professional communication',
        'Respect for other users privacy'
      ],
      serviceLimitations: 'Service Limitations',
      serviceLimitationsList: [
        'Platform availability not guaranteed',
        'Technical maintenance may cause downtime',
        'Limited liability for user actions',
        'No warranties on third-party content'
      ],
      disputeResolution: 'Dispute Resolution',
      disputeResolutionList: [
        'Direct communication encouraged',
        'Platform mediation available',
        'Escalation procedures defined',
        'Consumer protection rights preserved'
      ],
      additionalTerms: 'Additional Important Terms',
      additionalTermsDescription: 'Key provisions governing the use of our platform.',
      accountManagement: 'Account Management',
      accountManagementList: [
        'One account per person',
        'Password security requirements',
        'Account suspension policies',
        'Data retention after termination'
      ],
      intellectualProperty: 'Intellectual Property',
      intellectualPropertyList: [
        'Platform content ownership',
        'User content rights',
        'Trademark usage guidelines',
        'Copyright infringement policies'
      ],
      questionsAboutTerms: 'Questions about these terms?',
      questionsText: 'If you have questions about these terms or need clarification on any provisions, please contact our legal team at legal@carmarket365.com',
      returnToPlatform: 'Return to Platform',
      contactLegalTeam: 'Contact Legal Team'
    },

    // Politika privacyi
    privacyPolicy: {
      title: 'Privacy Policy',
      subtitle: 'Your privacy is important to us. Learn how we collect, use, and protect your personal information.',
      backToHome: 'Back to Home',
      ourPrivacyCommitment: 'Our Privacy Commitment',
      commitmentDescription: 'At CarMarket365 we are committed to protecting your privacy and ensuring the security of your personal information.',
      overviewText: 'This privacy policy explains how we collect, use, disclose, and protect your information when using our car market platform. We are committed to maintaining the highest standards of privacy protection and data security.',
      dataSecurity: 'Data Security',
      dataSecurityList: [
        'Industry-standard encryption',
        'Secure data transmission',
        'Regular security audits',
        'Limited access control'
      ],
      transparency: 'Transparency',
      transparencyList: [
        'Clear data collection practices',
        'Openness about data usage',
        'Regular policy updates',
        'User notification of changes'
      ],
      userRights: 'Prava users',
      userRightsList: [
        'Access to your data',
        'Right to correct information',
        'Data deletion requests',
        'Opt-out of communications'
      ],
      dataMinimization: 'Data Minimization',
      dataMinimizationList: [
        'Collect only necessary data',
        'Purpose-specific usage',
        'Automatic data expiry',
        'Regular data cleanup'
      ],
      informationWeCollect: 'Information We Collect',
      informationDescription: 'We collect information that you provide directly and automatically when using our platform.',
      personalInformation: 'Personal Information',
      personalInformationList: [
        'Name and contact details',
        'Account registration information',
        'Communication preferences',
        'Profile information'
      ],
      usageData: 'Usage Data',
      usageDataList: [
        'Website interaction data',
        'Search and viewing history',
        'Device and browser information',
        'Location data (if permitted)'
      ],
      questionsAboutPrivacy: 'Questions about privacy?',
      privacyQuestionsText: 'If you have questions about this privacy policy or our data handling practices, please contact our privacy team at privacy@carmarket365.com',
      returnToPlatform: 'Return to Platform',
      contactPrivacyTeam: 'Contact Privacy Team'
    },

    // Page-zaglushka

    // Chasto asked questions
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about buying, selling, financing, and using CarMarket365.',
      searchPlaceholder: 'Search in FAQ...',
      browseByCategory: 'Browse by Category',
      allQuestions: 'All Questions',
      stillNeedHelp: 'Still need help?',
      stillNeedHelpDescription: 'Can\'t find what you\'re looking for? Our support team is ready to help.',
      callSupport: 'Call Support',
      emailUs: 'Email Us',
      liveChat: 'Live Chat',
      available247: 'Available 24/7',
      noResultsFound: 'No results found',
      noResultsText: 'Try searching with different keywords or browse by categories.',
      clearSearch: 'Clear Search',
      commonQuestionsAbout: 'Common questions about',
      
      categories: {
        buying: 'Buying Cars',
        selling: 'Car Sales',
        financing: 'Financing and Payments',
        safety: 'Bezopasnost i zashchita',
        account: 'Account and Support'
      },

      buyingFaqs: [
        {
          question: 'How to find cars on CarMarket365?',
          answer: 'You can search cars using the search form on the main page or on the "Browse Cars" page. Filter by make, model, year, price range, location and many others. Use advanced search for detailed filtering.'
        },
        {
          question: 'Are all listings verified?',
          answer: 'Yes, all listings on CarMarket365 are verified. We verify the background data of all dealers and private sellers, and also verify vehicle information for accuracy before listing.'
        },
        {
          question: 'Can I schedule a test drive?',
          answer: 'Of course! You can schedule a test drive directly through the car details page. Contact the seller to arrange a suitable time and place for the test drive.'
        },
        {
          question: 'What should I bring to view a car?',
          answer: 'Bring valid driver\'s license, proof of insurance and any pre-approval financing letters. If you plan to purchase, bring a cashier\'s check or financing documents.'
        },
        {
          question: 'How do I know if the car price is fair?',
          answer: 'We provide market value estimates for all vehicles. You can also compare similar cars, check vehicle history reports and use our price analysis tools.'
        }
      ],

      sellingFaqs: [
        {
          question: 'Kak razmestit listing o selle mgo car?',
          answer: 'Use the "Sell Cyear" form to create listings. Vam ponadobyatsya detali vehiclesa, photos, information o sostoyanii i kontaktn data. The process takes about 10-15 minutes.'
        },
        {
          question: 'Is there a fee for posting listings?',
          answer: 'Basic listings are free for private sellers. We offer premium listing options with enhanced visibility for a small fee. Dealers have different pricing structures.'
        },
        {
          question: 'How long does it take to sell a car?',
          answer: 'On average, cars with proper pricing and good photos sell within 2-4 weeks. Factors include pricing, condition, market demand and listing quality.'
        },
        {
          question: 'Kakie dokumenty me nuzhny dlya sellingng car?',
          answer: 'Vam ponadobitsya svidetelstvo o prave sobstvennotss, registeration, service records i deystvuyushchiy pasport. V notkotor regionakh trebuyutsya dopolniteln dokumenty - my provide regionaln rekomendatsii.'
        },
        {
          question: 'Kak ustanovit konkurentnuyu pricesu na moy car?',
          answer: 'Use our free vehicle valuation tools, study similar listings, consider your car condition, mileage and any recent repairs or improvements.'
        }
      ],

      financingFaqs: [
        {
          question: 'Mogu li ya by accessingit financing through CarMarket365?',
          answer: 'Yes, we partner with several lenders to offer competitive financing options. You can get pre-approved online in just a few minutes without impacting your credit score.'
        },
        {
          question: 'What credit score do I need for auto financing?',
          answer: 'We work with lenders who accept various credit ratings, from excellent to poor. Requirements vary by lender, but we help find options for most situations.'
        },
        {
          question: 'How does the credit application process work?',
          answer: 'Zapolnite nashu online-zvku, to get instant pre-approval, select your vehicleso and complete the loan process. The entire process can be completed online or by phone.'
        },
        {
          question: 'V chem raznitsa mezhdu previewnoy kvalifikatsiey i previewnym approvediem?',
          answer: 'Pre-qualification gives you an estimate based on basic information. Pre-approval includes credit history verification and provides a firm credit offer with specific terms.'
        },
        {
          question: 'Mogu li ya obmenyat moy tekushchiy car?',
          answer: 'Many of our partner dealers accept trade-ins. Get a trade-in estimate using our valuation tool, then discuss options with the dealer when purchasing.'
        }
      ],

      safetyFaqs: [
        {
          question: 'Kak ostavatsya v safetyi pri buying car?',
          answer: 'Meet in public places, bring someone with you, verify seller identity, carefully inspect the vehicle and use secure payment methods. Never transfer money before inspecting the car.'
        },
        {
          question: 'Kakie sposoby oplaty sam secure?',
          answer: 'Use cashier\'s checks, bank transfers or financing through verified lenders. Avoid wire transfers, personal checks or cash for large amounts.'
        },
        {
          question: 'Kak check, chto seller zakon?',
          answer: 'Check their CarMarket365 profile, read reviews, verify their contact information and meet in person. All our dealers are pre-verified and have passed background checks.'
        },
        {
          question: 'Chto delat, esli ya podozrevayu moshennichestvo?',
          answer: 'Immediately report suspicious activity through our platform or contact our support team. We take fraud seriously and promptly investigate all reports.'
        },
        {
          question: 'Nadezhny li reporty ob history vehiclesa?',
          answer: 'Yes, we provide comprehensive vehicle history reports from reliable sources. They include accident history, service records and ownership information.'
        }
      ],

      accountFaqs: [
        {
          question: 'Kak create account?',
          answer: 'Click "Register" on any page and provide your email address, phone number and basic information. You can also register through Google or Facebook for faster registration.'
        },
        {
          question: 'Ya zabyl parol. Kak ego sbrosit?',
          answer: 'Click "Forgot password?" on the login page, enter your email address and follow the reset instructions we send you. The reset link is valid for 24 hours.'
        },
        {
          question: 'Kak obnovit informatsiyu v mm profile?',
          answer: 'Log into your account and go to "Account Settings" where you can update personal information, contact details and preferences.'
        },
        {
          question: 'Can I save cars for viewing later?',
          answer: 'Yes! Click the heart icon on any car listing to save it to favorites. Access your saved cars anytime from your account dashboard.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'Use the "Contact Us" page, call (555) 123-HELP, email support@carmaket365.com or use the chat function in the lower right corner of any page.'
        }
      ]
    },
    
    // FAQ page structure
  },

  // Browse Cars Page
  browseCars: {
    title: 'For Sale',
    searchPlaceholder: 'Brand, model or keyword',
    filtersButton: 'Show Filters',
    sortBy: 'Sort By',
    sortOptions: {
      relevance: 'Relevance',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      arNewestFirst: 'Year: Newest First',
      arOldestFirst: 'Year: Oldest First',
      mileageLowToHigh: 'Mileage: Low to High',
      mileageHighToLow: 'Mileage: High to Low',
      addedRecently: 'Recently Added',
    },
    viewOptions: {
      grid: 'Grid',
      list: 'List',
    },
    carCard: {
      viewDetails: 'View Details',
      contactSeller: 'Contact',
      saveToFavorites: 'Save to Favorites',
      saved: 'Saved',
      featured: 'Featured',
      certified: 'Certified',
      newArrival: 'New Arrival',
      priceReduced: 'Price Reduced',
      greatDeal: 'Great Deal',
      kmAbbrev: 'km',
      miAbbrev: 'mi',
      year: 'year',
      automatic: 'Automatic',
      manual: 'Manual',
      gasoline: 'Gasoline',
      diesel: 'Diesel',
      electric: 'Electric',
      hybrid: 'Hybrid',
      showPhone: 'Show Phone',
      hidePhone: 'Hide Phone',
      callNow: 'Call Now',
      sendMessage: 'Send Message',
      scheduleTour: 'Schedule Tour',
      reportListing: 'Report Listing',
      shareListing: 'Share Listing',
    },
    searchSuggestions: {
      title: 'Search Suggestions',
      recentSearches: 'Recent Searches',
      clearRecent: 'Clear recent',
      popularSearches: 'Popular searches',
      suggestedBrands: 'Suggested brands',
      suggestedModels: 'Suggested models',
      noRecentSearches: 'No recent searches',
    },
    errorStates: {
      failedToLoad: 'Failed to load',
      networkError: 'Network error',
      tryAgain: 'Try again',
      contactSupport: 'Contact support',
    },
  },

  // Advanced Search

  // Legal Pages

  // Contact Us Page

  dealerProfilee: {
    dealerNotFound: 'Dealer not found',
    dealerNotFoundMessage: 'The dealer profile you are looking for does not exist.',
    viewAllDealers: 'View all dealers',
    browseCars: 'Browse Cars',
    backToDealers: 'Back to dealers',
    showroom: 'dealership',
    verifiedDealer: 'Verified dealer',
    milesAway: 'miles away',
    callDealer: 'Call dealer',
    viewInventory: 'View inventory',
    visitWebsite: 'Visit website',
    overview: 'Overview',
    inventory: 'Inventory',
    reviews: 'Reviews',
    contact: 'Contact',
    about: 'About Us',
    servicesOffered: 'Services offered',
    certificationsAwards: 'Certifications and awards',
    quickStats: 'Quick statistics',
    established: 'Established',
    teamSize: 'Team size',
    people: 'person',
    recentSales: 'Recent sales',
    thisMonth: 'this month',
    customerSatisfaction: 'Customer satisfaction',
    responseTime: 'Response time',
    businotssHours: 'Business hours',
    mondayFriday: 'Monday - Friday:',
    saturday: 'Saturday:',
    sunday: 'Sunday:',
    currentInventory: 'Current inventory',
    hasVehiclesAvailable: 'cars available',
    viewFullInventory: 'View full inventory',
    browseAllVehicles: 'Browse all available cars from',
    browseCarsCount: 'cars',
    customerReviews: 'Customer reviews',
    verifiedCustomerReviews: 'verified customer reviews',
    verifiedPurchase: 'Verified purchase',
    contactInformation: 'Contact Information',
    primaryPhone: 'Primary Phone',
    emailAddress: 'Email address',
    website: 'Website',
    physicalAddress: 'Physical address',
    getDirections: 'Get directions',
    interactiveMapPlaceholder: 'Interactive map would be here',
    openInGoogleMaps: 'Open in Google Maps',
  },

  dealerSupport: {
    backToHome: 'Vernutsya domoy',
    title: 'Support dealers',
    subtitle: 'Spetsialn podderzhka dlya registeredn dealers. Poluchite help s vashimi listingsmi, upravleniem accountom i funktsiyami platform.',
    supportCenter: 'Support Center dealers',
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
    contactUs: 'Contact Us',
    supportChannotls: 'Kanaly support',
    supportChannotlsDesc: 'Neskolko sposobov by accessingit help, kogda ona vam nuzhna',
    phone: 'Phone',
    phoneNumber: '1-800-555-0199',
    email: 'Email',
    emailAddress: 'dealers@carmaket365.com',
    liveChat: 'Zhivoy chat',
    startChat: 'Nachat chat',
    businotssHours: 'Rabochie chasy',
    mondayFriday: 'Ponotdelnik - Pyatnitsa: 8:00 - 20:00 EST',
    weekendHours: 'Subbota: 9:00 - 17:00 EST',
    PhoneHours: 'Telefonn podderzhka accessna v rabochie chasy',
    emailHours: 'Email podderzhka: 24/7 otvet v techenie 4 chasov',
    chatHours: 'Zhivoy chat accessen v rabochie chasy',
    commonTopics: 'Obshchie temy',
    commonTopicsDesc: 'Chasto zaprashivaem temy support',
    gettingStarted: 'Nachalo raboty',
    gettingStartedDesc: 'Vvedenie nov dealers i nastroyka accounta',
    listingOptimization: 'Listing Optimization',
    listingOptimizationDesc: 'Tips to improve visibility of your listings',
    paymentBilling: 'Payment and Billing',
    paymentBillingDesc: 'Billing questions and payment issues',
  },


  // Private Dashboard
  privateDashboard: {
    title: 'My Dashboard',
    subtitle: 'Manage your vehicle listings and account',
    welcome: 'Welcome back',
    savedCars: 'Saved Cars',
    lastSearch: 'Last Search',
    search: 'Search',
    yourListings: 'Your Listings',
    expressSale: 'Express Sale',
    express: 'Express Sale',
    contact: 'Contact',
    settings: 'Settings',
    saved: 'Saved',
    viewDetails: 'View Details',
    remove: 'Remove',
    startNewSearch: 'Start New Search',
    viewMyListings: 'View My Listings',
    savedOn: 'Saved on',
    welcomeBack: 'Welcome back',
    manageExperience: 'manage your car market experience',
    // Last Search Tab
    lastSearches: 'Recent Searches',
    recentSearchHistory: 'Your recent search history and saved searches',
    newSearch: 'New Search',
    resultsFound: 'results found',
    searchedOn: 'Searched on',
    searchAgain: 'Search Again',
    viewResults: 'View Results',
    results: 'Results',
    // User Listings Tab
    myListings: 'My Listings',
    carsListedForSale: 'Cars you have listed for sale',
    createNewListing: 'Create New Listing',
    newListing: 'New Listing',
    views: 'views',
    inquiries: 'inquiries',
    listed: 'Listed on',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    // Express Sale Tab
    expressSaleListings: 'Express Sale Listings',
    quickSaleRequests: 'Quick sale requests submitted to dealers',
    newExpressSale: 'New Express Sale',
    newExpress: 'New Express',
    underReview: 'Under Review',
    photos: 'photos',
    estimatedValue: 'Estimated Value:',
    submittedOn: 'Submitted on',
    // Contact Details Tab
    contactDetails: 'Contact Details',
    manageContactInfo: 'Manage your contact information and profile',
    personalInformation: 'Personal Information',
    updateProfileDetails: 'Update your profile details',
    changePhoto: 'Change Photo',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    city: 'City',
    country: 'Country',
    saveChanges: 'Save Changes',
    // Account Settings Tab
    accountSettings: 'Account Settings',
    manageAccountPreferences: 'Manage your account settings and privacy preferences',
    notifications: 'Notifications',
    configureNotifications: 'Configure how you receive notifications',
    emailNotifications: 'Email Notifications',
    receiveUpdatesViaEmail: 'Receive updates via email',
    newListingsAlerts: 'New Listings Alerts',
    notifyNewCarsMatching: 'Get notifications about new cars matching your searches',
    priceDropAlerts: 'Price Drop Alerts',
    notifyPriceDrops: 'Get notifications when prices on saved cars drop',
    inquiryNotifications: 'Inquiry Notifications',
    notifyInquiries: 'Get notifications about inquiries on your listings',
    privacySettings: 'Privacy Settings',
    controlPrivacyPreferences: 'Control your privacy preferences and data sharing',
    profileVisibility: 'Profile Visibility',
    makeProfileVisible: 'Make your profile visible to other users',
    showContactInfo: 'Show Contact Information',
    displayContactOnListings: 'Display your contact information on listings',
    dataAnalytics: 'Data Analytics',
    helpImproveService: 'Help improve our service with usage analytics',
    accountManagement: 'Account Management',
    manageAccountAndData: 'Manage your account and data',
    downloadMyData: 'Download My Data',
    changePassword: 'Change Password',
    deleteAccount: 'Delete Account',
    // Success/Error Messages
    profileUpdatedSuccessfully: 'Profile updated successfully!',
    carRemovedFromSaved: 'Car removed from saved!',
    listingDeletedSuccessfully: 'Listing successfully deleted!'
  },

  // Saved cars
  savedCars: {
    title: 'Saved Cars',
    subtitle: 'Manage your saved vehicles and wishlist',
    filterBySavedDate: 'Filter by saved date',
    filterByPriceRange: 'Filter by price range',
    sortBy: 'Sort by',
    newest: 'Newest',
    oldest: 'Oldest',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    noSavedCars: 'No saved cars',
    startBrowsing: 'Start browsing vehicles to save favorites',
    browseVehicles: 'Browse Vehicles',
    savedOn: 'Saved',
    removeFromSaved: 'Remove from saved',
    viewDetails: 'Posmotret detali',
    contactDealer: 'Contact',
    scheduleViewing: 'Zaplanirovat osmotr',
    compareVehicles: 'Sravnit vehiclesa',
    selectToCompare: 'Select Vehicles for Comparison',
    compare: 'Sravnit',
    clearSelection: 'Ochistit vybor',
    clearAll: 'Clear All'
  },

  // Prodat vehicleso
  sellVehicle: {
    title: 'Sell Your Vehicle',
    subtitle: 'Create detailed listing for your vehicle',
    stepIndicator: 'Step {current} of {total}',
    basicInfo: 'Basic Information',
    vehicleDetails: 'Vehicle Details',
    photosUpload: 'Upload Photos',
    pricing: 'Pricing',
    review: 'Review and Publish',
    
    // Basic Information
    make: 'Make',
    model: 'Model',
    year: 'Year',
    mileage: 'Mileage',
    km: 'km',
    condition: 'Condition',
    conditionOptions: {
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor'
    },
    fuelType: 'Fuel type',
    transmission: 'Transmission',
    transmissionTypes: {
      manual: 'Manual',
      automatic: 'Automatic',
      semiautomatic: 'Semi-Automatic'
    },
    bodyType: 'Body Type',
    
    // Vehicle Details
    engineSize: 'Engine Size',
    horsepower: 'Horsepower',
    color: 'Color',
    numberOfDoors: 'Number of doors',
    numberOfSeats: 'Number of seats',
    features: 'Specifications',
    safetyFeatures: 'Safety Features',
    description: 'Description',
    descriptionPlaceholder: 'Describe your vehicle, its history, condition...',
    
    // Photos
    uploadPhotos: 'Upload photos',
    dragDropPhotos: 'Drag and drop photos here, or click to select',
    maxPhotos: 'Maximum 20 photos',
    photoRequirements: 'Photo Requirements',
    requirementsList: [
      'High quality (minimum 800x600 pixels)',
      'JPG, PNG or WebP format',
      'Maximum 5MB per photo',
      'Photos from all sides of vehicle',
      'Interior photos',
      'Engine and odometer photos'
    ],
    
    // Pricing
    askingPrice: 'Asking Price',
    marketValue: 'Market Value',
    priceAnalysis: 'Price Analysis',
    competitive: 'Competitive',
    aboveMarket: 'Above Market',
    belowMarket: 'Below Market',
    negotiable: 'Negotiable',
    contactPreferences: 'Contact Preferences',
    allowPhoneCalls: 'Allow phone calls',
    allowMessages: 'Allow messages',
    allowEmails: 'Allow emails',
    
    // Review
    reviewListing: 'Review Listing',
    publishListing: 'Publish Listing',
    saveDraft: 'Save Draft',
    termsAndConditions: 'Terms and Conditions',
    agreeToTerms: 'I agree to the terms and conditions',
    
    // Messages
    listingPublished: 'Listing published successfully!',
    draftSaved: 'Draft saved',
    errorSaving: 'Error saving listing',
    continue: 'Continue',
    previous: 'Previous',
    next: 'Next'
  },

  // Home stranitsa
  indexPage: {
    quickFilters: {
      title: 'Quick Filters',
      allVehicles: 'All Vehicles',
      cars: 'Cars',
      trucks: 'Trucks',
      motorcycles: 'Motorcycles',
      electric: 'Electric',
      luxury: 'Luxury'
    },
    stats: {
      title: 'Why CarMarket365?',
      vehiclesAvailable: 'Available Vehicles',
      verifiedDealers: 'Verified Dealers',
      happyCustomers: 'Happy Customers',
      yearsExperience: 'Years Experience'
    },
    featuredListings: {
      title: 'Featured Listings',
      subtitle: 'Selected vehicles from our partners',
      viewAll: 'View All'
    },
    howItWorks: {
      title: 'Kak eto rabotaet',
      subtitle: 'Find your ideal vehicle in three simple steps',
      steps: [
        {
          title: 'Naydite vehiclesa',
          description: 'Browse our extensive database of verified vehicles'
        },
        {
          title: 'Compare Options',
          description: 'Compare prices, features and reviews'
        },
        {
          title: 'Pokupayte s uverennostyu',
          description: 'Buy from trusted dealers with warranties'
        }
      ]
    },
    popularBrands: {
      title: 'Populyarn marki',
      subtitle: 'Issleduyte vehiclesa ot vedushchikh avtoproizvoditeley'
    },
    testimonials: {
      title: 'What our customers say',
      subtitle: 'Read real reviews from our satisfied customers'
    },
    newsletter: {
      title: 'Stay Updated',
      subtitle: 'Get the latest listings and exclusive offers delivered directly to your email',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe'
    },
    cta: {
      bur: {
        title: 'Gotovy kupit?',
        subtitle: 'Find your ideal vehicle today',
        button: 'Prosmotret vehiclesa'
      },
      seller: {
        title: 'Khotite prodat?',
        subtitle: 'List your vehicle for sale in minutes',
        button: 'Sell Vehicle'
      }
    }
  },

  // Stranitsy oshibok

  // Yuridicheskie stranitsy
  legal: {

    cookies: {
      title: 'Politika cookies',
      subtitle: 'Kak my ispolzuem cookies dlya uluchsheniya vashego experience.',
      backToHome: 'Back to Home',
      policyTitle: 'Nasha policy cookies',
      policyDescription: 'My ispolzuem cookies dlya predostavleniya naibetter vozmozhn servisa.',
      policyText: 'Cookies — eto notbolshie tekstov fayly, sokhranyaem na vashem ustroystve pri poseshchenii nashego sayta. Oni pomogayut nam obespechit personalizirovan opyt.',
      
      makdatang: {
        title: 'Markdatangov cookies',
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
        'Upravlyat cookies trdatakh storon'
      ],
      
      platformTitle: 'Elementy upravleniya platform',
      platformFeatures: [
        'Cookie Settings Center',
        'Varianty otkaza',
        'Detaln nastroyki upravleniya',
        'Regular Settings Updates'
      ],
      
      questionsTitle: 'Voprosy o cookies?',
      questionsText: 'Esli u vas est questions o our politike cookies ili nuzhna help v upravlenii nastroykami, contact s nami po adresu cookies@carmaket365.com',
      returnToPlatform: 'Return to Platform',
      cookieSupport: 'Support cookies'
    },

  },

  // Dealer Dashboard
  dealerDashboard: {
    title: 'Dealer Dashboard',
    subtitle: 'Manage your listings, track performance and grow your business',
    
    // Tab navigation
    
    // Overview tab
    overview: {
      // Stats cards
      
      // Performance section
      performance: {
        title: 'Monthly Performance',
        description: 'Number of cars sold by month this year',
        monthlyData: {
          january: 'January',
          december: 'December',
          november: 'November',
          sold: 'sold',
        },
      },
      
      // Recent inquiries
      recentInquiries: {
        title: 'Recent Inquiries',
        description: 'Latest client requests',
        inquiryTypes: {
          viewing: 'Viewing',
          price: 'Price Inquiry',
          financing: 'Financing',
        },
        timeAgo: {
          hoursAgo: 'hours ago',
        },
      },
      
      // Action buttons
    },
    
    // My Listings tab
    myListings: {
      title: 'My Listings',
      
      // Search and filters
      searchPlaceholder: 'Search listings...',
      filterByStatus: 'Filter by status',
      statusOptions: {
        allStatus: 'All Status',
        active: 'Active',
        sold: 'Sold',
        pending: 'Pending',
      },
      exportReport: 'Export Report',
      export: 'Export',
      
      // Table headers
      tableHeaders: {
        car: 'Car',
        price: 'Price',
        status: 'Status',
        views: 'Views',
        inquiries: 'Inquiries',
        listed: 'Listed',
        actions: 'Actions',
      },
      
      // Status badges
      statusBadges: {
        active: 'Active',
        sold: 'Sold',
        pending: 'Pending',
      },
      
      // Actions
      
      // Mobile view
      mobileView: {
        views: 'views',
        inquiries: 'requests',
      },
    },
    
    // Inquiries tab
    
    // Analytics tab
    
    // Express Sale Listings tab
    expressListings: {
      title: 'Express Sale Listings',
      description: 'Private sellers looking for quick sales in your area',
      newListings: 'new',
      searchPlaceholder: 'Search express listings...',
      filterByStatus: 'Status',
      expressBadge: 'Express',
      sellerContact: 'Seller Contact',
      submittedOn: 'Submitted on',
      emptyState: {
        title: 'No Express Listings',
        description: 'Private sellers haven\'t submitted any express sale requests yet.'
      },
      info: {
        title: 'About Express Sale Listings',
        description: 'These are listings from private sellers who want to sell their cars quickly. You can contact them directly to make offers and help facilitate sales in your area.'
      }
    },
    
    // Footer message
    footerMessage: 'Professional dealer tools - ',
    activeListingsCount: 'active listings',
  },

  // Admin Dashboard
  adminDashboard: {
    title: 'Administrator Panel',
    subtitle: 'Platform management, monitoring and comprehensive admin control',
    
    // Tab navigation
    
    // Overview tab
    
    // All Listings tab
    allListings: {
      title: 'All Listings',
      
      // Search and filters
      searchPlaceholder: 'Search listings...',
      filterByStatus: 'Filter by status',
      
      // Table headers
      
      // Status badges
      
      // Actions
    },
    
    // User Management tab
    userManagement: {
      title: 'User Management',
      description: 'View and manage all platform users',
      
      // Search and filters
      searchPlaceholder: 'Search by email or name...',
      roleFilter: {
        placeholder: 'Role',
      },
      
      // Table headers
      
      // Role badges
      roleBadges: {
        admin: 'Administrator',
        dealer: 'Dealer',
        customer: 'Customer',
      },
      
      // Status badges
      
      // Additional status messages
      statusMessages: {
        joinedOn: 'Joined On',
        lastLoginOn: 'Last Login',
        neverLoggedIn: 'Never logged in',
      },
      
      // Actions
    },
    
    // Reports tab
    reports: {
      // Platform statistics
      platformStatistics: {
        title: 'Platform Statistics',
        description: 'Key platform indicators',
      },
      
      // Content moderation
      contentModeration: {
        title: 'Content Moderation',
        description: 'Content requiring verification',
      },
    },
    
    // Footer message
    footerMessage: 'Administrative Control - ',
    systemStatus: 'System Status: Online',
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
    foundCars: 'Naydeno {count} car(ey) v {country}',
    countryFilteredResults: 'Resulty, otfilterovann po stranot',
    noCarsFound: 'Cars not naydeny',
    noCarsFoundDescription: 'V nastoyashchee time v {country} nott opublikovann carey.',
    tryDifferentCountry: 'Poprobuyte pereklyuchitsya na another country s helpyu pereklyuchatelya vyshe.',
    howItWorks: 'Kak eto rabotaet',
    automaticCountryDetection: 'Automatic opredelenie strany',
    automaticDetectionDescription: 'Sistema avtomaticheski opredelyaet country iz poddomena (naprimer, mk.carmaket365.com dlya Makedonii, al.carmaket365.com dlya Albanii).',
    countrySpecificListings: 'Obyavleniya, spetsifichn dlya strany',
    countrySpecificDescription: 'Obyavleniya carey avtomaticheski filteruyutsya dlya pokaza tolko carey iz tekushchey strany. Eto obespechivaet, chto polzovateli v Makedonii vidyat tolko makedonskie listings, albanskie polzovateli vidyat tolko albanskie listings i t.d.',
    crossCountryProtection: 'Zashchita mezhdu stranami',
    crossCountryDescription: 'If someone tries to access a car listing from another country (through a direct URL), they will receive an error message that the listing is not accessible in their region.',
    listingSubmission: 'Podacha listings',
    listingSubmissionDescription: 'Kogda polzovateli podayut nov listings carey, kod strany avtomaticheski ustanavlivaetsya na osnove ikh tekushchego poddomena, obespechiv vidimost obyavleniy tolko v pravilnoy stranot.',
  },

  // Formy i polya vvoda

  // Static content for About page
  about: {
    staticContent: {
      team: [
        {
          name: 'Alex Peterson',
          role: 'CEO & Founder',
          bio: '15+ years in the automotive industry. Former VP at AutoNation.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Michael Smith',
          role: 'Chief Technology Officer',
          bio: 'Former Tesla engineer with expertise in automotive technologies.',
          image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Sarah Johnson',
          role: 'Head of Customer Service',
          bio: '10+ years in customer excellence and team leadership.',
          image: 'https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'David Wilson',
          role: 'VP of Operations',
          bio: 'Supply chain expert with experience in automotive logistics.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        }
      ],
      milestonots: [
        {
          year: '2009',
          title: 'Osnovanie company',
          description: 'Nachali kak notbolsh torgov ploshchadka poderzhann carey v Moskve s videniem revolyutsionizirovat buyu carey.'
        },
        {
          year: '2012',
          title: 'Zapusk tsifrovoy platform',
          description: 'Zapustili nashu pervuyu online-ploshchadku, sdelav buyu carey bolee accessnoy.'
        },
        {
          year: '2015',
          title: '500th Partnotr Dealer',
          description: 'Reached an important milestonot by partnotring with our 500th verified dealer.'
        },
        {
          year: '2018',
          title: 'Natsionaln ekspansiya',
          description: 'Rasshirili operatsii dlya of service clientov po vsey Rossii i stranam SNG.'
        },
        {
          year: '2020',
          title: 'Zapusk mobiln prilozheniya',
          description: 'Launched our mobile app, making car shopping even more convenient.'
        },
        {
          year: '2023',
          title: '50,000 prodata carey',
          description: 'Otprazdnovali help bolee chem 45,000 clientam v poiske ikh idealn car.'
        }
      ],
      awards: [
        {
          title: 'Luchsh carn ploshchadka 2023',
          organization: 'Premiya vybora potrebiteley',
          year: '2023',
          description: 'Recognized for outstanding customer service and platform innovation'
        },
        {
          title: 'Samyy bystrorastushchiy startap',
          organization: 'Premiya tekhnologicheskikh innovatsiy',
          year: '2022',
          description: 'Otmechena za bystryy rost i advancedie rynka'
        },
        {
          title: 'Prevoskhodstvo v obsluzhivanii clientov',
          organization: 'Premii carnoy industrii',
          year: '2023',
          description: 'Nagrazhdena za isklyuchiteln udovletvorenie clientov i podderzhku'
        }
      ]
    },
  },

  carReviews: {
    title: 'Car Reviews',
    subtitle: 'Expert reviews and user feedback to help you make informed decisions when buying your next car.',
    backToHome: 'Back to Home',
    
    // Main content
    overviewTitle: 'Car Reviews & Ratings',
    overviewDescription: 'Comprehensive reviews to help you make informed vehicle purchasing decisions.',
    overviewText: 'Our car reviews section provides detailed analysis from automotive experts and real owner experiences to help you understand all aspects of the vehicles you\'re considering.',
    
    // Review types
    expertReviews: {
      title: 'Expert Reviews',
      features: [
        'Professional automotive journalism',
        'Detailed performance analysis',
        'Safety and reliability ratings',
        'Comparative vehicle testing'
      ]
    },
    ownerReviews: {
      title: 'Owner Reviews',
      features: [
        'Real ownership experiences',
        'Long-term reliability insights',
        'Maintenance cost understanding',
        'Daily driving impressions'
      ]
    },
    ratingSystem: {
      title: 'Rating System',
      features: [
        '5-star rating system',
        'Category-specific scoring',
        'Overall recommendations',
        'Pros and cons breakdown'
      ]
    },
    marketInsights: {
      title: 'Market Analytics',
      features: [
        'Resale value analysis',
        'Market trend reports',
        'Best value recommendations',
        'Seasonal buying guides'
      ]
    },
    
    // Categories
    categoriesTitle: 'Review Categories',
    categoriesDescription: 'Our reviews cover all aspects of vehicle ownership and performance.',
    comfort: {
      title: 'Comfort & Interior',
      items: [
        'Seat comfort',
        'Interior space and storage',
        'Technology features',
        'Build quality and materials'
      ]
    },
    safety: {
      title: 'Safety & Reliability',
      items: [
        'Safety ratings and features',
        'Reliability and service history',
        'Warranty coverage',
        'Recall history'
      ]
    },
    
    // Coming soon
    comingSoonTitle: 'Reviews Coming Soon!',
    comingSoonText: 'We\'re currently building our comprehensive review database. Expert reviews and owner feedback will be available soon to help guide your car buying decisions.',
    browseCars: 'Browse Available Cars',
    exploreInventory: 'Explore Inventory'
  },


  expressSell: {
    title: 'Prodayte your car bystro',
    subtitle: 'Razmestite vash car za minuty s helpyu nashego ekspress-protsessa sellingng',
    backToHome: 'Back to Home',
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
    year: 'Year',
    yearRequired: 'God *',
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
    priceRequired: 'Price *',
    enterPrice: 'Enter asking price',
    euros: 'EUR',
    description: 'Description',
    descriptionOptional: 'Description (Optional)',
    enterDescription: 'Enter description',
    descriptionPlaceholder: 'Describe features, condition and history of your car...',
    photosAndContact: 'Photos and Contact',
    photosAndContactDescription: 'Add photos and your contact information',
    carPhotos: 'Car Photos',
    carPhotosRequired: 'Car Photos *',
    uploadPhotos: 'Upload Photos',
    photosUploaded: 'photos uploaded',
    contactInformation: 'Contact Information',
    fullName: 'Full Name',
    fullNameRequired: 'Full Name *',
    enterFullName: 'Enter your full name',
    phoneNumber: 'Phone number',
    phoneRequired: 'Telefon *',
    enterPhone: 'Vvedite nomer Phonea',
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
    contactDetails: 'Kontaktn data',
    previous: 'Previous',
    next: 'Next',
    publishListing: 'Publish Listing',
    successMessage: 'Your vehicle has been successfully listed!',
    requiredField: 'This field is required',
  },



  dealers: {
    title: 'Find Verified Dealers',
    subtitle: 'Connect with verified dealers in your region. Quality cars, professional service and competitive prices.',
    searchDealers: 'Search dealers',
    dealerNameOrCity: 'Dealer name or city',
    allStates: 'All regions',
    allSpecialties: 'All specialties',
    sortBy: 'Sort by',
    sortByDistance: 'Sort by Distance',
    sortByRating: 'Sort by Rating',
    sortByInventory: 'Inventory',
    verifiedDealers: 'Verified Dealers',
    carsAvailable: 'Available Cars',
    averageRating: 'Average Rating',
  },

  registeredDealers: {
    title: 'Registered Dealers',
    subtitle: 'Browse our network of verified car dealers',
    viewProfile: 'View Profile',
    viewInventory: 'View Inventory',
    contactDealer: 'Contact Dealer',
    backToHome: 'Back to Home',
    allDealersVerified: 'All dealers verified',
    customerRated: 'Customer rated',
    supportAvailable: 'Support 24/7',
    browseNetwork: 'Browse our network of {count} verified dealers across Germany',
    reviews: 'reviews',
    verifiedSince: 'Verified since {year}',
    experience: 'Experience:',
    totalSales: 'Total sales:',
    viewDealerProfile: 'View Dealer Profile',
    years: 'years',
    
    // Dealer specialties
    specialties: {
      luxuryCars: 'Luxury Cars',
      suvs: 'SUVs',
      electricVehicles: 'Electric Vehicles',
      familyCars: 'Family Cars',
      compactCars: 'Compact Cars',
      hybrids: 'Hybrid Vehicles',
      sportsCars: 'Sports Cars',
      convertibles: 'Convertibles',
      performance: 'High Performance',
      mercedesBenz: 'Mercedes-Benz',
      porsche: 'Porsche',
      luxury: 'Luxury Brands',
      businessCars: 'Business Cars',
      fleetSales: 'Fleet Sales',
      leasing: 'Leasing Solutions',
      ecoFriendly: 'Eco-Friendly',
    },
    
    // Dealer descriptions
    descriptions: {
      autoMaxDescription: 'Leading luxury car dealer in Berlin with over 15 years of experience. Specializing in premium German brands.',
      cityMotorsDescription: 'Family-owned dealership serving Munich and surroundings. Known for excellent customer service and fair pricing.',
      ecoWheelsDescription: 'Leading specialist in electric and hybrid vehicles in Hamburg. Committed to sustainable vehicle solutions.',
      rheinAutoDescription: 'Sports car specialists in the Rhine region. Extensive collection of high-performance vehicles.',
      stuttgartLuxuryDescription: 'Authorized Mercedes-Benz and Porsche dealer in Stuttgart. Home of the finest German engineering.',
      nordFahrzeugeDescription: 'Corporate vehicle specialist serving Frankfurt\'s business district. Expert in fleet solutions and leasing.',
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
      noCarsFound: 'Cars not naydeny',
      noCarsInCountry: 'V nastoyashchee time nott carey, perechislenn v {country}.',
      trySwitchingCountry: 'Poprobuyte pereklyuchit country s helpyu pereklyuchatelya vyshe.',
      carIdAndCountry: 'ID: {id} | Strana: {country}',
      developmentNote: '<strong>Primechanie:</strong> V proizvodstve strany avtomaticheski definotsya iz poddomena (naprimer, mk.carmaket365.com, al.carmaket365.com). Etot pereklyuchatel rabotaet tolko v rezhime razrabotki.',
    },

    // AdminDashboard - status badges and mock data

    // DealerDashboard mock data

    // Hardcoded financing text


    // Dealer page - hardcoded strings


    // Dealer support page - hardcoded strings

    // Accessibility page - hardcoded strings

    // Cookie policy page - hardcoded strings

    // Safety tips page - hardcoded strings
  },

  // Okonchateln ispravleniya dlya ostavshegosya zhestko kodirovann angliysk teksta
  finalFixes: {
    // Page ExpressSell - Marki carey, model i zapolniteli
    
    // Page DealerSignUp - Zapolniteli form
    dealerSignUp: {
      firstNamePlaceholder: 'Ivan',
      lastNamePlaceholder: 'Petrov',
    },
    
    // Page SavedCars - Zapolnitel filtera
    
    // Page UIDemo - Demo zapolniteli
  },

  carDetail: {
    // Header and Navigation
    backToSearch: 'Back to search',
    
    // Vehicle Title and Info
    vehicleTitle: 'Vehicle Title',
    locationLabel: 'Location',
    priceLabel: 'Price',
    originalPrice: 'Original Price',
    savingsAmount: 'Discount',
    
    // Status Badges
    certified: 'Certified',
    featured: 'Featured',
    newArrival: 'New Arrival',
    priceReduced: 'Price Reduced',
    greatDeal: 'Great Deal',
    verified: 'Verified',
    
    // Image Gallery
    mainImage: 'Main Image',
    imageGallery: 'Image Gallery',
    viewFullscreen: 'View Fullscreen',
    imageCounter: 'of',
    
    // Tabs and Content
    
    // Overview Tab
    
    // Features Tab
    
    // Inspection Tab
    inspection: {
      title: 'Inspection Report',
      lastUpdated: 'Last Updated:',
      excellentCondition: 'Excellent Condition',
      pointInspection: 'Completed 150-point inspection',
      inspectionCompleted: 'inspection completed',
      inspectionScore: 'Inspection Score',
    },
    
    // History Tab
    
    // Action Buttons
    
    // Seller Information
    
    // Financing Section
    
    // Mock Data Values
    
    // Error States
    
    // Loading States
    
    // Contact and Communication
    
    // Test Drive
    testDrive: {
      scheduleTestDrive: 'Schedule Test Drive',
      preferredDate: 'Predpochtiteln data',
      preferredTime: 'Predpochtiteln time',
      contactInfo: 'Contact Information',
      additionalNotes: 'Dopolniteln zametki',
      submitRequest: 'Otpravit zapros',
    },
    
    // Share Feature
  },

    
    // Sravnotnie
    comparison: {
      title: 'Sravnotnie carey',
      clearAll: 'Clear All',
      compareCars: 'Sravnit cari',
      compareNow: 'Sravnit seychas',
      
      // Polya sravnotniya
      
      // Panotl sravnotniya
      byear: {
        compareCars: 'Sravnit cari',
        selected: 'vybrano',
        max: 'maks.',
        compare: 'Sravnit',
        clear: 'Clear',
      },
      
      // Neaccessno
      notAvailable: 'N/D',
    },
    
    // Financing Calculator
    financingCalculator: {
      title: 'Financing Calculator',
      
      // Sections
      
      // Fields
      
      // Metki
      
      // Knopki
      
      // Primechaniya
      notes: {
        estimate: 'This is an approximate calculation. Actual terms may differ.',
        disclaimer: 'Payment calculations are estimates and may not reflect actual loan terms.',
        taxesVary: 'Tax rates vary by location.',
        additionalFees: 'Additional fees may apply.',
      },
    },
  

  // Missing translations added - Essential keys



  // Navigation
  navigation: {
    backToHome: 'Back to Home',
  }
};