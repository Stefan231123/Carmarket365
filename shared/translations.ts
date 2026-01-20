// Translation system for CarMarket365
export type SupportedLanguage = 'mk' | 'sq' | 'sl' | 'lv' | 'ru' | 'en';

export interface TranslationStrings {
  // Common/Global
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    cancel: string;
    confirm: string;
    continue: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    clear: string;
    save: string;
    edit: string;
    delete: string;
    add: string;
    view: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    price: string;
    currency: string;
    year: string;
    make: string;
    model: string;
    mileage: string;
    condition: string;
    features: string;
    description: string;
    images: string;
    seller: string;
    dealer: string;
    private: string;
    yes: string;
    no: string;
    menu: string;
    new: string;
    certified: string;
    vehicle: string;
    sending: string;
    outline: string;
    ghost: string;
    link: string;
    destructive: string;
    small: string;
    large: string;
    option: string;
  };

  // Forms - validation, labels, placeholders, actions (removed duplicate - more comprehensive version below)

  // Modals - titles, descriptions, success messages (removed duplicate - more comprehensive version below)

  // Header & Navigation
  header: {
    welcome: string;
    signIn: string;
    signOut: string;
    myAccount: string;
    dashboard: string;
    home: string;
    browseCars: string;
    sellCar: string;
    savedCars: string;
    financing: string;
    about: string;
    contact: string;
    faq: string;
    help: string;
  };

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    searchButton: string;
    advancedSearch: string;
    vehicleTypes: {
      cars: string;
      motorbikes: string;
      trucks: string;
    };
    searchForm: {
      make: string;
      model: string;
      priceFrom: string;
      priceTo: string;
      yearFrom: string;
      mileage: string;
      location: string;
      anyMake: string;
      anyModel: string;
      minPrice: string;
      maxPrice: string;
      minYear: string;
      anyYear: string;
      anyMileage: string;
      maxMileage: string;
      noMin: string;
      noMax: string;
      enterLocation: string;
    };
    availableCars: string;
  };

  // Last Search Section
  lastSearch: {
    title: string;
    description: string;
    viewMore: string;
    matchPercentage: string;
  };

  // Interesting Suggestions Section
  suggestions: {
    title: string;
    description: string;
    seeMore: string;
    daysAgo: string;
  };

  // Popular Brands Section
  brands: {
    title: string;
    description: string;
    carsCount: string;
  };

  // Car Market Specific
  cars: {
    title: string;
    searchPlaceholder: string;
    noResults: string;
    resultsCount: string;
    viewDetails: string;
    contactSeller: string;
    saveToFavorites: string;
    removeFromFavorites: string;
    carDetails: string;
    specifications: string;
    fuelType: string;
    transmission: string;
    bodyType: string;
    exteriorColor: string;
    interiorColor: string;
    drivetrain: string;
    vin: string;
    inspection: string;
    history: string;
    financing: string;
    testDrive: string;
    makeOffer: string;
    featured: string;
    handpicked: string;
    discover: string;
    allCars: string;
    newCars: string;
    certifiedPreOwned: string;
    electric: string;
    luxury: string;
    viewAllCars: string;
  };

  // Filters
  filters: {
    title: string;
    anyMake: string;
    anyModel: string;
    anyYear: string;
    priceRange: string;
    priceMin: string;
    priceMax: string;
    yearRange: string;
    yearMin: string;
    yearMax: string;
    mileageMax: string;
    location: string;
    fuelTypes: string;
    transmissionTypes: string;
    bodyTypes: string;
    condition: string;
    applyFilters: string;
    clearFilters: string;
  };

  // Authentication
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    rememberMe: string;
    forgotPassword: string;
    createAccount: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loginWith: string;
    registerAs: string;
    privatePerson: string;
    dealerAccount: string;
    userType: string;
    backToHome: string;
    signInToAccount: string;
    welcomeBack: string;
    enterCredentials: string;
    privatePersonDescription: string;
    dealerDescription: string;
    pro: string;
    enterYourEmail: string;
    enterYourPassword: string;
    signingIn: string;
    orContinueWith: string;
    google: string;
    facebook: string;
    createPrivateAccount: string;
    registerAsDealer: string;
    dealerBenefits: string;
    professionalDashboard: string;
    inventoryManagement: string;
    customerTracking: string;
    enhancedVisibility: string;
    analyticsInsights: string;
    createYourAccount: string;
    joinThousands: string;
    privateAccount: string;
    buyAndSellCars: string;
    fullName: string;
    enterFullName: string;
    emailAddress: string;
    createStrongPassword: string;
    confirmYourPassword: string;
    mustBeCharacters: string;
    agreeToTerms: string;
    termsOfService: string;
    and: string;
    privacyPolicy: string;
    creatingAccount: string;
    wantSellAsDealer: string;
    createDealerAccount: string;
    joinCommunityText: string;
    pleaseAgreeTerms: string;
    passwordsNotMatch: string;
    passwordMinLength: string;
    registrationFailed: string;
    backToSignIn: string;
    dealerRegistration: string;
    joinCarMarketDealer: string;
    businessInformation: string;
    tellUsAboutBusiness: string;
    businessName: string;
    businessNamePlaceholder: string;
    businessType: string;
    selectBusinessType: string;
    carDealership: string;
    usedCarLot: string;
    autoTrader: string;
    carBroker: string;
    rentalCompany: string;
    other: string;
    vatNumber: string;
    vatNumberPlaceholder: string;
    taxId: string;
    optional: string;
    yearEstablished: string;
    selectYear: string;
    businessDescription: string;
    businessDescriptionPlaceholder: string;
    contactPerson: string;
    primaryContactInfo: string;
    position: string;
    positionPlaceholder: string;
    businessEmail: string;
    businessEmailPlaceholder: string;
    businessAddress: string;
    dealershipLocation: string;
    streetAddress: string;
    streetAddressPlaceholder: string;
    city: string;
    cityPlaceholder: string;
    stateRegion: string;
    stateRegionPlaceholder: string;
    postalCode: string;
    postalCodePlaceholder: string;
    country: string;
    selectCountry: string;
    germany: string;
    austria: string;
    switzerland: string;
    netherlands: string;
    belgium: string;
    france: string;
    italy: string;
    spain: string;
    accountSetup: string;
    createSecureDealerAccount: string;
    termsAndAgreements: string;
    acceptTermsConditions: string;
    agreeToTermsAndDealer: string;
    acceptPrivacyPolicy: string;
    understandDataCollection: string;
    receiveMarketingCommunications: string;
    getUpdatesFeatures: string;
    alreadyHaveAccountSignIn: string;
    businessNameRequired: string;
    businessTypeRequired: string;
    vatNumberRequired: string;
    firstNameRequired: string;
    lastNameRequired: string;
    emailRequired: string;
    phoneRequired: string;
    streetRequired: string;
    cityRequired: string;
    postalCodeRequired: string;
    passwordRequired: string;
    confirmPasswordRequired: string;
    validEmailRequired: string;
    validVatNumber: string;
    passwordMinEightChars: string;
    acceptTermsRequired: string;
    acceptPrivacyRequired: string;
  };

  // Selling
  sell: {
    title: string;
    sellYourCar: string;
    carInformation: string;
    uploadPhotos: string;
    setPrice: string;
    contactInformation: string;
    publish: string;
    draft: string;
    preview: string;
    required: string;
    optional: string;
    addPhotos: string;
    removePhoto: string;
    mainPhoto: string;
    additionalInfo: string;
    sellerNotes: string;
    
    // Step titles
    steps: {
      vehicleType: string;
      basicInfo: string;
      details: string;
      photosAndContact: string;
    };
    
    // Vehicle type selection
    vehicleTypes: {
      car: {
        name: string;
        description: string;
      };
      truck: {
        name: string;
        description: string;
      };
      motorbike: {
        name: string;
        description: string;
      };
    };
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: string;
      basicInformation: string;
      basicInfoDescription: string;
      additionalDetails: string;
      additionalDetailsDescription: string;
      photosAndContact: string;
      photosAndContactDescription: string;
      vehicleDetails: string;
      photosAndContactInfo: string;
      uploadVehiclePhotos: string;
      addUpToTenPhotos: string;
    };
    
    // Form fields and labels
    fields: {
      make: string;
      model: string;
      year: string;
      mileage: string;
      condition: string;
      fuelType: string;
      transmission: string;
      exteriorColor: string;
      interiorColor: string;
      askingPrice: string;
      featuresAndOptions: string;
      description: string;
      vehiclePhotos: string;
      contactName: string;
      phoneNumber: string;
      emailAddress: string;
      location: string;
    };
    
    // Placeholders
    placeholders: {
      selectMake: string;
      enterModel: string;
      selectYear: string;
      selectCondition: string;
      enterMileage: string;
      selectFuelType: string;
      selectTransmission: string;
      exteriorColorExample: string;
      interiorColorExample: string;
      priceExample: string;
      descriptionExample: string;
      yourFullName: string;
      phoneExample: string;
      emailExample: string;
      cityState: string;
      yourName: string;
      yourPhoneNumber: string;
      yourEmail: string;
      cityCountry: string;
      enterAskingPrice: string;
      describeYourVehicle: string;
      selectFuel: string;
      selectTransmissionType: string;
      choosePhotos: string;
    };
    
    // Button labels
    buttons: {
      nextStep: string;
      previous: string;
      createListing: string;
    };
    
    // Preview section (removed duplicate - keeping only one preview section)
    
    // Photo upload
    photos: {
      instruction: string;
      selected: string;
      photo: string;
      photos: string;
    };
    
    // Vehicle makes (can be expanded)
    makes: string[];
    
    // Fuel types
    fuelTypes: {
      gasoline: string;
      electric: string;
      hybrid: string;
      diesel: string;
      pluginHybrid: string;
      flexFuel: string;
      cng: string;
      lpg: string;
    };
    
    // Transmissions
    transmissions: {
      automatic: string;
      manual: string;
      cvt: string;
    };

    // Body Types
    bodyTypes: {
      sedan: string;
      suv: string;
      truck: string;
      coupe: string;
      hatchback: string;
      convertible: string;
      wagon: string;
      van: string;
      crossover: string;
    };

    // Drivetrains
    drivetrains: {
      fwd: string;
      rwd: string;
      awd: string;
      fourwd: string;
    };

    // Colors
    colors: {
      black: string;
      white: string;
      silver: string;
      gray: string;
      red: string;
      blue: string;
      green: string;
      brown: string;
      gold: string;
      orange: string;
      purple: string;
      yellow: string;
    };
    
    // Conditions
    conditions: {
      new: string;
      likeNew: string;
      excellent: string;
      veryGood: string;
      good: string;
      fair: string;
      poor: string;
    };
    
    // Features list
    features: {
      airConditioning: string;
      leatherSeats: string;
      heatedSeats: string;
      sunroof: string;
      gpsNavigation: string;
      backupCamera: string;
      bluetooth: string;
      usbPorts: string;
      premiumSound: string;
      keylessEntry: string;
      remoteStart: string;
      cruiseControl: string;
      parkingSensors: string;
      blindSpotMonitoring: string;
    };
  };

  // Countries & Languages
  countries: {
    northMacedonia: string;
    albania: string;
    kosovo: string;
    slovenia: string;
    latvia: string;
    global: string;
    chooseCountry: string;
    changeCountry: string;
    detectedLocation: string;
    currentSite: string;
    localBenefits: string;
    localCurrency: string;
    localLanguages: string;
    localDealers: string;
    regionalFeatures: string;
  };

  // Redirect & Geolocation
  redirect: {
    welcome: string;
    detectedFrom: string;
    redirectMessage: string;
    continueToSite: string;
    chooseDifferent: string;
    localBenefitsTitle: string;
    howDetected: string;
    hideDetails: string;
    changeAnytime: string;
    countrySpecificExperience: string;
    adminTestingMode: string;
    adminNotAvailable: string;
    selectCountryToContinue: string;
  };

  // Modals & Dialogs
  modals: {
    close: string;
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    contactSeller: string;
    // scheduleTestDrive moved to detailed version below
    requestFinancing: string;
    reportListing: string;
    shareListing: string;
    sendMessage: string;
    yourName: string;
    yourEmail: string;
    yourPhone: string;
    message: string;
    interestedIn: string;
    preferredTime: string;
    additionalNotes: string;
    
    badges: {
      new: string;
      certified: string;
      financing: string;
      warrantyIncluded: string;
    };

    contactCar: {
      title: string;
      description: string;
      successTitle: string;
      successDescription: string;
    };

    financing: {
      title: string;
      description: string;
      badges: {
        financingAvailable: string;
      };
      employmentStatus: {
        retired: string;
        student: string;
        unemployed: string;
      };
      placeholders: {
        fullName: string;
        email: string;
        phone: string;
        annualIncome: string;
        employmentStatus: string;
        creditScore: string;
        downPayment: string;
        loanTerm: string;
      };
      validation: {
        fullNameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        phoneRequired: string;
        phoneInvalid: string;
        annualIncomeRequired: string;
        annualIncomeInvalid: string;
        employmentStatusRequired: string;
        creditScoreRequired: string;
        downPaymentRequired: string;
        downPaymentInvalid: string;
        loanTermRequired: string;
      };
      successTitle: string;
      successDescription: string;
      actions: {
        submit: string;
        cancel: string;
      };
    };

    tradeIn: {
      title: string;
      description: string;
      vehicleInformation: string;
      historyCondition: string;
      labels: {
        make: string;
        model: string;
        year: string;
        mileage: string;
        condition: string;
        accidentHistory: string;
        serviceHistory: string;
        modifications: string;
        location: string;
        additionalInfo: string;
      };
      placeholders: {
        selectMake: string;
        modelExample: string;
        mileageExample: string;
        locationExample: string;
        additionalInfoPlaceholder: string;
      };
      conditionOptions: {
        excellent: { label: string; description: string };
        veryGood: { label: string; description: string };
        good: { label: string; description: string };
        fair: { label: string; description: string };
        poor: { label: string; description: string };
      };
      accidentOptions: {
        none: string;
        minor: string;
        major: string;
      };
      serviceOptions: {
        excellent: string;
        regular: string;
        poor: string;
      };
      modificationOptions: {
        none: string;
        minor: string;
        major: string;
      };
      validation: {
        yearMin: string;
        yearMax: string;
        mileageNegative: string;
      };
      results: {
        estimatedValue: string;
        range: string;
        confidence: string;
        market: string;
        positiveFactors: string;
        negativeFactors: string;
        recommendations: string;
        disclaimer: string;
        disclaimerText: string;
      };
      factors: {
        excellentCondition: string;
        noAccidents: string;
        excellentService: string;
        lowAge: string;
        lowMileage: string;
        poorCondition: string;
        majorAccidents: string;
        highAge: string;
        highMileage: string;
      };
      recommendationsList: string[];
      actions: {
        getEstimate: string;
        calculating: string;
        calculateAnother: string;
        done: string;
        cancel: string;
      };
    };

    scheduleTestDrive: {
      title: string;
      description: string;
      badge: string;
      labels: {
        fullName: string;
        email: string;
        phone: string;
        preferredDate: string;
        preferredTime: string;
        specialRequests: string;
      };
      placeholders: {
        fullName: string;
        email: string;
        phone: string;
        selectDate: string;
        selectTime: string;
        specialRequests: string;
        enterName: string;
        enterEmail: string;
        enterPhone: string;
        enterRequests: string;
      };
      validation: {
        emailInvalid: string;
        dateRequired: string;
        timeRequired: string;
      };
      success: {
        title: string;
        description: string;
      };
      actions: {
        cancel: string;
        schedule: string;
        scheduling: string;
      };
    };
  };

  // Pages & Navigation
  pages: {
    about: string;
    carReviews: string;
    safetyTips: string;
    dealerSupport: string;
    contactUs: string;
    cookiePolicy: {
      title: string;
      subtitle: string;
      backToHome: string;
      policyTitle?: string;
      policyDescription?: string;
      policyText?: string;
      essential?: {
        title: string;
        items: string[];
      };
      functional?: {
        title: string;
        items: string[];
      };
      analytics?: {
        title: string;
        items: string[];
      };
      marketing?: {
        title: string;
        items: string[];
      };
      managingPreferences?: string;
      managingPreferencesDescription?: string;
      browserSettings?: string;
      platformControls?: string;
      browserSettingsItems?: string[];
      platformControlsItems?: string[];
      questionsAboutCookies?: string;
      questionsMessage?: string;
      returnToPlatform?: string;
      cookieSupport?: string;
    };
    imprint: {
      title: string;
      subtitle: string;
      backToHome: string;
      legalInfoTitle?: string;
      legalInfoDescription?: string;
      legalInfoText?: string;
      companyDetails?: {
        title: string;
        companyName: string;
        companyNameValue: string;
        registrationNumber: string;
        registrationNumberValue: string;
        vatId: string;
        vatIdValue: string;
        businessAddress: string;
        businessAddressValue: string;
      };
      contactInformation?: {
        title: string;
        managingDirector: string;
        managingDirectorValue: string;
        phone: string;
        phoneValue: string;
        email: string;
        emailValue: string;
        responsibleForContent: string;
        responsibleForContentValue: string;
      };
      regulatoryInformation?: {
        title: string;
        supervisoryAuthority: string;
        supervisoryAuthorityValue: string;
        professionalRegulations: string;
        professionalRegulationsValue: string;
        disputeResolution: string;
        disputeResolutionValue: string;
      };
      questionsAboutLegal?: string;
      legalQuestionsText?: string;
      returnToPlatform?: string;
      contactLegalDepartment?: string;
    };
    accessibility: {
      title: string;
      subtitle: string;
      backToHome: string;
      commitmentTitle?: string;
      commitmentDescription?: string;
      commitmentText?: string;
      visual?: {
        title: string;
        features: string[];
      };
      motor?: {
        title: string;
        features: string[];
      };
      audio?: {
        title: string;
        features: string[];
      };
      cognitive?: {
        title: string;
        features: string[];
      };
      standardsWeFollow?: string;
      standardsDescription?: string;
      wcagCompliance?: string;
      wcagDescription?: string;
      testing?: string;
      testingDescription?: string;
      feedback?: string;
      feedbackDescription?: string;
      questionsAboutAccessibility?: string;
      accessibilityQuestionsText?: string;
      returnToPlatform?: string;
      contactAccessibilityTeam?: string;
    };
    signUp: string;
    signIn: string;
    dashboard: string;
    adminDashboard: string;
    dealerDashboard: string;
    privateDashboard: string;
    browseCars: string;
    savedCars: string;
    sellCar: string;
    financing: string;
    advancedSearch: string;
    carDetail: string;
    dealers: string;
    myAccount: string;
    settings: string;
    helpCenter: string;
    feedback: string;
    disclaimer: string;
    carInsurance: string;
    underConstruction: string;
    underConstructionMessage: string;
    backToHome: string;

    // Terms of Service
    termsOfService: {
      title: string;
      subtitle: string;
      backToHome: string;
      termsAndConditions: string;
      termsDescription: string;
      overviewText: string;
      userResponsibilities: string;
      userResponsibilitiesList: string[];
      platformRules: string;
      platformRulesList: string[];
      serviceLimitations: string;
      serviceLimitationsList: string[];
      disputeResolution: string;
      disputeResolutionList: string[];
      additionalTerms: string;
      additionalTermsDescription: string;
      accountManagement: string;
      accountManagementList: string[];
      intellectualProperty: string;
      intellectualPropertyList: string[];
      questionsAboutTerms: string;
      questionsText: string;
      returnToPlatform: string;
      contactLegalTeam: string;
    };

    // Privacy Policy
    privacyPolicy: {
      title: string;
      subtitle: string;
      backToHome: string;
      ourPrivacyCommitment: string;
      commitmentDescription: string;
      overviewText: string;
      dataSecurity: string;
      dataSecurityList: string[];
      transparency: string;
      transparencyList: string[];
      userRights: string;
      userRightsList: string[];
      dataMinimization: string;
      dataMinimizationList: string[];
      informationWeCollect: string;
      informationDescription: string;
      personalInformation: string;
      personalInformationList: string[];
      usageData: string;
      usageDataList: string[];
      questionsAboutPrivacy: string;
      privacyQuestionsText: string;
      returnToPlatform: string;
      contactPrivacyTeam: string;
    };

    // Placeholder Page
    placeholder: {
      underConstruction: string;
      underConstructionMessage: string;
      backToHome: string;
      contactUs: string;
    };

    // FAQ Page
    faq: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      browseByCategory: string;
      allQuestions: string;
      stillNeedHelp: string;
      stillNeedHelpDescription: string;
      callSupport: string;
      emailUs: string;
      liveChat: string;
      available247: string;
      noResultsFound: string;
      noResultsText: string;
      clearSearch: string;
      commonQuestionsAbout: string;

      categories: {
        buying: string;
        selling: string;
        financing: string;
        safety: string;
        account: string;
      };

      buyingFaqs: Array<{
        question: string;
        answer: string;
      }>;

      sellingFaqs: Array<{
        question: string;
        answer: string;
      }>;

      financingFaqs: Array<{
        question: string;
        answer: string;
      }>;

      safetyFaqs: Array<{
        question: string;
        answer: string;
      }>;

      accountFaqs: Array<{
        question: string;
        answer: string;
      }>;
      
      // Complete FAQ categories with full data
      faqCategories: Array<{
        id: string;
        name: string;
        icon: string;
        color: string;
        faqs: Array<{
          question: string;
          answer: string;
        }>;
      }>;
      
      // Static content
      content: {
        browseByCategory: string;
        allQuestions: string;
        stillNeedHelp: string;
        stillNeedHelpDescription: string;
        callSupport: string;
        emailUs: string;
        liveChat: string;
        available247: string;
        noResultsFound: string;
        noResultsText: string;
        clearSearch: string;
        commonQuestionsAbout: string;
        supportPhoneNumber: string;
        supportEmail: string;
      };
    };
  };

  // Forms & Input
  forms: {
    validation: {
      [key: string]: string;
    };
    placeholders: {
      selectMake: string;
      selectModel: string;
      selectYear: string;
      selectCondition: string;
      selectFuelType: string;
      selectTransmission: string;
      selectBodyType: string;
      selectDrivetrain: string;
      enterName: string;
      enterEmail: string;
      enterPassword: string;
      enterPhone: string;
      enterModel: string;
      enterMileage: string;
      enterPrice: string;
      enterLocation: string;
      enterCity: string;
      enterDescription: string;
      searchCars: string;
      searchListings: string;
      searchFAQs: string;
      anyMake: string;
      anyModel: string;
      anyYear: string;
      anyMileage: string;
      minPrice: string;
      maxPrice: string;
      role: string;
      sortBy: string;
      filterBy: string;
      dealerNameOrCity: string;
      allStates: string;
      allSpecialties: string;
      egFiftyThousand: string;
      successMessage: string;
      requiredFieldMessage: string;
      contactMessage: string;
      enterMessage: string;
    };
    labels: {
      businessName: string;
      businessType: string;
      vatNumber: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      phoneNumber: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      make: string;
      model: string;
      year: string;
      mileage: string;
      condition: string;
      fuelType: string;
      transmission: string;
      bodyType: string;
      exteriorColor: string;
      interiorColor: string;
      price: string;
      description: string;
      contactName: string;
      contactPhone: string;
      contactEmail: string;
      location: string;
      rememberMe: string;
      termsAccepted: string;
      privacyAccepted: string;
    };
    buttons: {
      submit: string;
      register: string;
      signIn: string;
      signUp: string;
      signOut: string;
      backToSignIn: string;
      backToHome: string;
      createAccount: string;
      forgotPassword: string;
      resetPassword: string;
      updateProfile: string;
      uploadPhotos: string;
      removePhoto: string;
      publishListing: string;
      saveDraft: string;
      previewListing: string;
      editListing: string;
      deleteListing: string;
      viewListing: string;
      viewDetails: string;
      contactDealer: string;
      scheduleTestDrive: string;
      requestFinancing: string;
      shareVehicle: string;
      saveToFavorites: string;
      removeFromFavorites: string;
      applyFilters: string;
      clearFilters: string;
      clearSearch: string;
      searchVehicles: string;
      viewAllCars: string;
      loadMore: string;
      showMore: string;
      showLess: string;
    };
  };

  // Car Specifications & Values
  carSpecs: {
    conditions: {
      new: string;
      likeNew: string;
      excellent: string;
      veryGood: string;
      good: string;
      fair: string;
      poor: string;
      used: string;
      certifiedPreOwned: string;
    };
    fuelTypes: {
      gasoline: string;
      petrol: string;
      diesel: string;
      electric: string;
      hybrid: string;
      pluginHybrid: string;
      cng: string;
      lpg: string;
      flexFuel: string;
    };
    transmissions: {
      manual: string;
      automatic: string;
      cvt: string;
      semiAutomatic: string;
    };
    bodyTypes: {
      sedan: string;
      suv: string;
      hatchback: string;
      coupe: string;
      convertible: string;
      wagon: string;
      pickup: string;
      truck: string;
      van: string;
      minivan: string;
    };
    drivetrains: {
      fwd: string;
      rwd: string;
      awd: string;
      fourWD: string;
    };
    colors: {
      black: string;
      white: string;
      silver: string;
      gray: string;
      grey: string;
      blue: string;
      red: string;
      green: string;
      brown: string;
      gold: string;
      yellow: string;
      orange: string;
      purple: string;
      beige: string;
      other: string;
      unknown: string;
    };
    features: {
      airConditioning: string;
      leatherSeats: string;
      heatedSeats: string;
      cooledSeats: string;
      sunroof: string;
      moonroof: string;
      gpsNavigation: string;
      backupCamera: string;
      bluetooth: string;
      usbPorts: string;
      wirelessCharging: string;
      premiumSound: string;
      keylessEntry: string;
      remoteStart: string;
      cruiseControl: string;
      parkingSensors: string;
      blindSpotMonitoring: string;
      alloyWheels: string;
      antiLockBrakes: string;
      electronicStabilityControl: string;
      airbags: string;
      powerSteering: string;
      electricWindows: string;
      centralLocking: string;
      powerBrakes: string;
      amFmRadio: string;
    };
  };

  // Dashboard & User Interface
  dashboard: {
    overview: string;
    listings: string;
    inquiries: string;
    analytics: string;
    reports: string;
    userManagement: string;
    allListings: string;
    myListings: string;
    savedCars: string;
    lastSearch: string;
    expressSale: string;
    contact: string;
    settings: string;
    profile: string;
    adminPanel: string;
    dealerDashboard: string;
    myDashboard: string;
    signInToAccessDashboard: string;
  };

  // Business & Company
  business: {
    quickLinks: string;
    support: string;
    legal: string;
    companyInfo: string;
    searchCars: string;
    sellYourCar: string;
    registeredDealers: string;
    carReviews: string;
    contactUs: string;
    safetyTips: string;
    dealerSupport: string;
    frequentlyAskedQuestions: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
    imprint: string;
    accessibility: string;
    allRightsReserved: string;
    trustedMarketplace: string;
    qualityUsedCars: string;
    perfectVehicle: string;
    thousandsOfListings: string;
  };

  // Footer
  footer: {
    aboutUs: string;
    quickLinks: string;
    searchCars: string;
    sellYourCar: string;
    registeredDealers: string;
    support: string;
    contactUs: string;
    faq: string;
    legal: string;
    carReviews: string;
    safetyTips: string;
    dealerSupport: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
    imprint: string;
    accessibility: string;
    followUs: string;
    newsletter: string;
    subscribeNewsletter: string;
    emailAddress: string;
    subscribe: string;
    copyright: string;
    allRightsReserved: string;
    dashboard: string;
    adminPanel: string;
    dealerDashboard: string;
    myDashboard: string;
    signInToAccess: string;
  };

  // Error Messages
  errors: {
    generic: string;
    network: string;
    notFound: string;
    unauthorized: string;
    forbidden: string;
    serverError: string;
    validation: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    passwordTooShort: string;
    passwordMismatch: string;
    fileTooBig: string;
    invalidFileType: string;
    noInternetConnection: string;
    sessionExpired: string;
    // Error Boundary
    errorBoundary: {
      message: string;
      details: string;
      stackTrace: string;
      refreshPage: string;
      tryAgain: string;
    };
    // Error pages
    errorPages: {
      notFound: {
        title: string;
        heading: string;
        message: string;
        goHome: string;
        goBack: string;
        supportMessage: string;
      };
    };
  };

  // Success Messages
  success: {
    saved: string;
    updated: string;
    deleted: string;
    sent: string;
    published: string;
    registered: string;
    loggedIn: string;
    loggedOut: string;
    passwordReset: string;
    subscribed: string;
    contactSent: string;
    favoriteAdded: string;
    favoriteRemoved: string;
  };

  // Browse Cars Page
  browseCars: {
    backToSearch: string;
    title: string;
    carsForSale: string;
    motorbikesForSale: string;
    trucksForSale: string;
    vehiclesFound: string;
    loading: string;
    matchingCriteria: string;
    searchFilters: string;
    search: string;
    make: string;
    anyMake: string;
    priceRange: string;
    minPrice: string;
    maxPrice: string;
    noMin: string;
    noMax: string;
    yearFrom: string;
    anyYear: string;
    maxMileage: string;
    anyMileage: string;
    location: string;
    enterLocation: string;
    tryAgain: string;
    hideFilters: string;
    showFilters: string;
    searchCars: string;
    featured: string;
    privateSeller: string;
    locationNotSpecified: string;
    contact: string;
    view: string;
    noCarsFound: string;
    adjustSearchTerms: string;
    clearFilters: string;
    qualityVehicles: string;
    verifiedDealers: string;
    acrossCountry: string;
    searchPlaceholder: string;
    filtersButton: string;
    sortBy: string;
    sortOptions: {
      relevance: string;
      priceLowToHigh: string;
      priceHighToLow: string;
      yearNewestFirst: string;
      yearOldestFirst: string;
      mileageLowToHigh: string;
      mileageHighToLow: string;
      addedRecently: string;
    };
    viewOptions: {
      grid: string;
      list: string;
    };
    filters: {
      title: string;
      clearAll: string;
      apply: string;
      makeModel: string;
      priceRange: string;
      from: string;
      to: string;
      yearRange: string;
      mileageRange: string;
      location: string;
      withinRadius: string;
      fuelType: string;
      transmission: string;
      bodyType: string;
      condition: string;
      features: string;
      color: string;
      drivetrain: string;
      minPrice: string;
      maxPrice: string;
      noMin: string;
      noMax: string;
      anyLocation: string;
      kilometers: string;
      miles: string;
      any: string;
    };
    results: {
      showing: string;
      of: string;
      results: string;
      noResults: string;
      noResultsMessage: string;
      tryDifferentFilters: string;
      loadMore: string;
      endOfResults: string;
    };
    carCard: {
      viewDetails: string;
      contactSeller: string;
      saveToFavorites: string;
      saved: string;
      featured: string;
      certified: string;
      newArrival: string;
      priceReduced: string;
      greatDeal: string;
      kmAbbrev: string;
      miAbbrev: string;
      year: string;
      automatic: string;
      manual: string;
      gasoline: string;
      diesel: string;
      electric: string;
      hybrid: string;
      showPhone: string;
      hidePhone: string;
      callNow: string;
      sendMessage: string;
      scheduleTour: string;
      reportListing: string;
      shareListing: string;
    };
    searchSuggestions: {
      title: string;
      recentSearches: string;
      clearRecent: string;
      popularSearches: string;
      suggestedBrands: string;
      suggestedModels: string;
      noRecentSearches: string;
    };
    errorStates: {
      failedToLoad: string;
      networkError: string;
      tryAgain: string;
      contactSupport: string;
    };
  };

  // Car Detail Page
  carDetail: {
    // Header and Navigation
    backToSearch: string;
    
    // Vehicle Title and Info
    vehicleTitle: string;
    locationLabel: string;
    priceLabel: string;
    originalPrice: string;
    savingsAmount: string;
    
    // Status Badges
    certified: string;
    featured: string;
    newArrival: string;
    priceReduced: string;
    greatDeal: string;
    verified: string;
    
    // Image Gallery
    mainImage: string;
    imageGallery: string;
    viewFullscreen: string;
    imageCounter: string;
    
    // Tabs and Content
    tabs: {
      overview: string;
      features: string;
      inspection: string;
      history: string;
    };
    
    // Overview Tab
    overview: {
      vehicleDetails: string;
      mileage: string;
      fuelType: string;
      transmission: string;
      year: string;
      exteriorColor: string;
      interiorColor: string;
      bodyType: string;
      drivetrain: string;
      vin: string;
      description: string;
      miles: string;
    };
    
    // Features Tab
    features: {
      title: string;
      featuresAndOptions: string;
    };
    
    // Inspection Tab
    inspection: {
      title: string;
      lastUpdated: string;
      excellentCondition: string;
      pointInspection: string;
      inspectionCompleted: string;
      inspectionScore: string;
    };
    
    // History Tab
    history: {
      title: string;
      vehicleHistory: string;
      listedForSale: string;
      vehicleAdded: string;
      lastService: string;
      regularMaintenance: string;
    };
    
    // Action Buttons
    actions: {
      callDealer: string;
      sendMessage: string;
      scheduleTestDrive: string;
      getPreApproved: string;
      calculatePayment: string;
      viewDealerProfile: string;
      viewAllDealerCars: string;
      shareVehicle: string;
      saveToFavorites: string;
      removeFromFavorites: string;
    };
    
    // Seller Information
    seller: {
      title: string;
      sellerInformation: string;
      dealerRating: string;
      reviews: string;
      verified: string;
      phone: string;
      email: string;
    };
    
    // Financing Section
    financing: {
      title: string;
      financingOptions: string;
      estimatedPayment: string;
      monthlyPayment: string;
      basedOnTerms: string;
      aprForMonths: string;
      withDown: string;
      getPreApproved: string;
      calculatePayment: string;
    };
    
    // Error States
    errors: {
      carNotFound: string;
      failedToLoad: string;
      doesntExist: string;
      hasBeenRemoved: string;
      backToCars: string;
    };
    
    // Loading States
    loading: {
      loadingVehicle: string;
      loadingDetails: string;
    };
    
    // Contact and Communication
    contact: {
      contactDealer: string;
      interestedIn: string;
      preferredContactMethod: string;
      additionalMessage: string;
      sendInquiry: string;
      callNow: string;
      emailDealer: string;
      scheduleViewing: string;
    };
    
    // Test Drive
    testDrive: {
      scheduleTestDrive: string;
      preferredDate: string;
      preferredTime: string;
      contactInfo: string;
      additionalNotes: string;
      submitRequest: string;
    };
    
    // Share Feature
    share: {
      shareVehicle: string;
      shareOnSocial: string;
      copyLink: string;
      emailToFriend: string;
      generateQR: string;
    };
    
    // Mock Data Values
    mockData: {
      unknownMake: string;
      unknownModel: string;
      excellent: string;
      gasoline: string;
      automatic: string;
      unknown: string;
      black: string;
      sedan: string;
      frontWheelDrive: string;
      wellMaintained: string;
      inspectionReport: string;
      locationNotSpecified: string;
      privateSeller: string;
      features: {
        airConditioning: string;
        powerSteering: string;
        electricWindows: string;
        centralLocking: string;
        airbags: string;
        abs: string;
        powerBrakes: string;
        amfmRadio: string;
      };
      condition: string;
      interiorColor: string;
      drivetrain: string;
      description: string;
      historyEvents: string[];
      locations: {
        [key: string]: string;
      };
      dealers: {
        [key: string]: string;
      };
      fuel: {
        [key: string]: string;
      };
      transmission: {
        [key: string]: string;
      };
    };
  };

  // Advanced Search
  advancedSearch: {
    title: string;
    subtitle: string;
    backToHome: string;
    searchCars: string;
    saveSearch: string;
    clearAll: string;
    active: string;
    filters: string;
    filter: string;
    
    sections: {
      basicInformation: {
        title: string;
        description: string;
      };
      technicalSpecs: {
        title: string;
        description: string;
      };
      featuresEquipment: {
        title: string;
        description: string;
      };
      preferencesAndCertifications: {
        title: string;
        description: string;
      };
      vehicleDetails: {
        title: string;
      };
      priceLocation: {
        title: string;
      };
      featuresOptions: {
        title: string;
        description: string;
      };
    };
    
    fields: {
      make: string;
      model: string;
      bodyType: string;
      condition: string;
      fuelType: string;
      transmission: string;
      drivetrain: string;
      doors: string;
      seats: string;
      exteriorColor: string;
      interiorColor: string;
      colorPreference: string;
      certifications: string;
      location: string;
      radius: string;
      searchRadius: string;
      sellerType: string;
      minYear: string;
      maxYear: string;
      maxMileage: string;
    };
    
    placeholders: {
      selectMake: string;
      enterModel: string;
      anyMake: string;
      anyModel: string;
      anyType: string;
      selectBodyType: string;
      selectCondition: string;
      selectFuelType: string;
      selectTransmission: string;
      selectDrivetrain: string;
      numberOfDoors: string;
      numberOfSeats: string;
      anyColor: string;
      selectPreferredColor: string;
      cityOrPostalCode: string;
      cityStateOrZip: string;
      anyMileage: string;
      anyCondition: string;
      anyDistance: string;
      allSellers: string;
      any: string;
    };
    
    ranges: {
      priceRange: string;
      yearRange: string;
      mileageRange: string;
    };
    
    distances: {
      nationwide: string;
      '25': string;
      '50': string;
      '100': string;
      '200': string;
      '250': string;
      '500': string;
    };
    
    mileage: {
      under10k: string;
      under25k: string;
      under50k: string;
      under75k: string;
      under100k: string;
      under150k: string;
    };
    
    sellerTypes: {
      dealersOnly: string;
      privateOnly: string;
      certifiedOnly: string;
    };
    
    doors: {
      '2': string;
      '3': string;
      '4': string;
      '5': string;
    };
    
    seats: {
      '2': string;
      '4': string;
      '5': string;
      '7': string;
      '8+': string;
    };
    
    // Static vehicle data for AdvancedSearch
    staticVehicleData: {
      makes: string[];
      bodyTypes: string[];
      fuelTypes: string[];
      transmissions: string[];
      drivetrains: string[];
      colors: string[];
      conditions: string[];
      features: string[];
      certifications: string[];
    };
  };

  // Contact Us Page
  contact: {
    title: string;
    subtitle: string;
    backToHome: string;
    mainTitle: string;
    mainDescription: string;
    contactOverview: string;
    phoneSupport: {
      title: string;
      salesDepartment: string;
      customerService: string;
      financingDepartment: string;
    };
    emailSupport: {
      title: string;
      generalInquiries: string;
      salesQuestions: string;
      support: string;
    };
    businessHours: {
      title: string;
      mondayFriday: string;
      saturday: string;
      sunday: string;
      timeRange: {
        mondayFriday: string;
        saturday: string;
        sunday: string;
      };
    };
    officeLocation: {
      title: string;
      address: {
        street: string;
        city: string;
        country: string;
      };
      getDirections: string;
    };
    hero: {
      title: string;
      subtitle: string;
    };
    departments: {
      phoneSupport: string;
      emailAddresses: string;
      businessHours: string;
      mainOffice: string;
    };
    departmentTypes: {
      salesDepartment: string;
      customerService: string;
      financingDepartment: string;
      generalInquiries: string;
      salesQuestions: string;
      support: string;
    };
    hours: {
      mondayFriday: string;
      saturday: string;
      sunday: string;
      timeRange: {
        mondayFriday: string;
        saturday: string;
        sunday: string;
      };
    };
    office: {
      address: {
        street: string;
        city: string;
        country: string;
      };
      getDirections: string;
    };
    urgentSupport: string;
    form: {
      title: string;
      subtitle: string;
      inquiryType: {
        label: string;
        placeholder: string;
        options: {
          buying: string;
          selling: string;
          financing: string;
          dealer: string;
          support: string;
          other: string;
        };
      };
      fields: {
        fullName: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
      };
      placeholders: {
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
        enterName: string;
      };
      required: string;
      submitButton: string;
      disclaimer: string;
    };
    success: {
      title: string;
      message: string;
    };
    quickHelp: {
      title: string;
      subtitle: string;
      options: {
        buyingGuide: {
          title: string;
          description: string;
        };
        sellingGuide: {
          title: string;
          description: string;
        };
        faq: {
          title: string;
          description: string;
        };
        safetyTips: {
          title: string;
          description: string;
        };
      };
    };
  };

  // Dealer Profile Page
  dealerProfile: {
    dealerNotFound: string;
    dealerNotFoundMessage: string;
    viewAllDealers: string;
    browseCars: string;
    backToDealers: string;
    showroom: string;
    verifiedDealer: string;
    milesAway: string;
    callDealer: string;
    viewInventory: string;
    visitWebsite: string;
    overview: string;
    inventory: string;
    reviews: string;
    contact: string;
    about: string;
    servicesOffered: string;
    certificationsAwards: string;
    quickStats: string;
    established: string;
    teamSize: string;
    people: string;
    recentSales: string;
    thisMonth: string;
    customerSatisfaction: string;
    responseTime: string;
    businessHours: string;
    mondayFriday: string;
    saturday: string;
    sunday: string;
    currentInventory: string;
    hasVehiclesAvailable: string;
    viewFullInventory: string;
    browseAllVehicles: string;
    browseCarsCount: string;
    customerReviews: string;
    verifiedCustomerReviews: string;
    verifiedPurchase: string;
    contactInformation: string;
    primaryPhone: string;
    emailAddress: string;
    website: string;
    physicalAddress: string;
    getDirections: string;
    interactiveMapPlaceholder: string;
    openInGoogleMaps: string;
  };

  // Dealer Support Page
  dealerSupport: {
    backToHome: string;
    title: string;
    subtitle: string;
    supportCenter: string;
    supportCenterDescription: string;
    quickActions: string;
    accountManagement: string;
    accountManagementDesc: string;
    manageAccount: string;
    listingHelp: string;
    listingHelpDesc: string;
    getListingHelp: string;
    analyticsReports: string;
    analyticsReportsDesc: string;
    viewAnalytics: string;
    contactSupport: string;
    contactSupportDesc: string;
    contactUs: string;
    supportChannels: string;
    supportChannelsDesc: string;
    phone: string;
    phoneNumber: string;
    email: string;
    emailAddress: string;
    liveChat: string;
    startChat: string;
    businessHours: string;
    mondayFriday: string;
    weekendHours: string;
    phoneHours: string;
    emailHours: string;
    chatHours: string;
    commonTopics: string;
    commonTopicsDesc: string;
    gettingStarted: string;
    gettingStartedDesc: string;
    listingOptimization: string;
    listingOptimizationDesc: string;
    paymentBilling: string;
    paymentBillingDesc: string;
  };

  // Express Sell Page
  expressSell: {
    title: string;
    subtitle: string;
    backToHome: string;
    step: string;
    of: string;
    carDetails: string;
    carDetailsDescription: string;
    make: string;
    makeRequired: string;
    selectMake: string;
    model: string;
    modelRequired: string;
    selectModel: string;
    year: string;
    yearRequired: string;
    selectYear: string;
    mileage: string;
    mileageRequired: string;
    enterMileage: string;
    kilometers: string;
    fuelType: string;
    fuelTypeRequired: string;
    selectFuelType: string;
    gasoline: string;
    diesel: string;
    electric: string;
    hybrid: string;
    transmission: string;
    transmissionRequired: string;
    selectTransmission: string;
    manual: string;
    automatic: string;
    condition: string;
    conditionRequired: string;
    selectCondition: string;
    excellent: string;
    veryGood: string;
    good: string;
    fair: string;
    price: string;
    priceRequired: string;
    enterPrice: string;
    euros: string;
    description: string;
    descriptionOptional: string;
    enterDescription: string;
    descriptionPlaceholder: string;
    photosAndContact: string;
    photosAndContactDescription: string;
    carPhotos: string;
    carPhotosRequired: string;
    uploadPhotos: string;
    photosUploaded: string;
    contactInformation: string;
    fullName: string;
    fullNameRequired: string;
    enterFullName: string;
    phoneNumber: string;
    phoneRequired: string;
    enterPhone: string;
    emailAddress: string;
    emailRequired: string;
    enterEmail: string;
    location: string;
    locationRequired: string;
    enterLocation: string;
    preview: string;
    previewDescription: string;
    yourListing: string;
    listingPreview: string;
    photos: string;
    contactDetails: string;
    previous: string;
    next: string;
    publishListing: string;
    successMessage: string;
    requiredField: string;
  };

  // About Page
  about: {
    stats: {
      carsSold: string;
      happyCustomers: string;
      dealerPartners: string;
      yearsInBusiness: string;
    };
    values: {
      trustTransparency: string;
      trustTransparencyDesc: string;
      customerFirst: string;
      customerFirstDesc: string;
      qualityAssurance: string;
      qualityAssuranceDesc: string;
      innovation: string;
      innovationDesc: string;
    };
    team: {
      ceoFounder: string;
      cto: string;
      headOfSales: string;
      customerSuccess: string;
      ceoFounderBio: string;
      ctoBio: string;
      headOfSalesBio: string;
      customerSuccessBio: string;
      // Team member data
      teamMembers: Array<{
        name: string;
        role: string;
        bio: string;
        image: string;
        linkedin: string;
      }>;
    };
    // Company milestones data
    milestones: Array<{
      year: string;
      title: string;
      description: string;
    }>;
    // Awards and recognition data
    awards: Array<{
      title: string;
      organization: string;
      year: string;
      description: string;
    }>;
    // Mission and vision content
    content: {
      heroTitle: string;
      heroSubtitle: string;
      missionTitle: string;
      missionContent: string;
      missionDescription: string;
      visionTitle: string;
      visionContent: string;
      visionDescription: string;
      valuesTitle: string;
      valuesDescription: string;
      teamTitle: string;
      teamDescription: string;
      journeyTitle: string;
      journeyDescription: string;
      awardsTitle: string;
      awardsDescription: string;
      ctaTitle: string;
      ctaDescription: string;
      joinTeam: string;
      contactUs: string;
      browseCars: string;
      connect: string;
    };
  };

  // Car Reviews Page
  carReviews: {
    title: string;
    subtitle: string;
    backToHome: string;
    
    // Main content
    overviewTitle: string;
    overviewDescription: string;
    overviewText: string;
    
    // Review types
    expertReviews: {
      title: string;
      features: string[];
    };
    ownerReviews: {
      title: string;
      features: string[];
    };
    ratingSystem: {
      title: string;
      features: string[];
    };
    marketInsights: {
      title: string;
      features: string[];
    };
    
    // Categories
    categoriesTitle: string;
    categoriesDescription: string;
    performance: {
      title: string;
      items: string[];
    };
    comfort: {
      title: string;
      items: string[];
    };
    safety: {
      title: string;
      items: string[];
    };
    
    // Coming soon
    comingSoonTitle: string;
    comingSoonText: string;
    browseCars: string;
    exploreInventory: string;
  };

  // Safety Tips Page
  safetyTips: {
    title: string;
    subtitle: string;
    backToHome: string;
    mainTitle: string;
    mainDescription: string;
    safetyOverview: string;
    meetingSafety: {
      title: string;
      items: string[];
    };
    paymentSecurity: {
      title: string;
      items: string[];
    };
    vehicleInspection: {
      title: string;
      items: string[];
    };
    redFlags: {
      title: string;
      items: string[];
    };
    documentation: {
      title: string;
      description: string;
      forBuyers: string;
      buyerItems: string[];
      forSellers: string;
      sellerItems: string[];
    };
    emergency: {
      title: string;
      message: string;
      browseCars: string;
      reportConcern: string;
    };
  };

  // Financing Page
  financing: {
    title: string;
    subtitle: string;
    loanCalculator: string;
    monthlyPayment: string;
    totalInterest: string;
    totalPayment: string;
    loanAmount: string;
    interestRate: string;
    loanTerm: string;
    years: string;
    calculate: string;
  };

  // FAQ Page
  faq: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    browseByCategory: string;
    allQuestions: string;
    stillNeedHelp: string;
    stillNeedHelpDescription: string;
    callSupport: string;
    emailUs: string;
    liveChat: string;
    available247: string;
    noResultsFound: string;
    noResultsText: string;
    clearSearch: string;
    categories: {
      buying: string;
      selling: string;
      financing: string;
      support: string;
    };
  };

  // Dealers Page  
  dealers: {
    title: string;
    subtitle: string;
    searchDealers: string;
    dealerNameOrCity: string;
    allStates: string;
    allSpecialties: string;
    sortBy: string;
    sortByDistance: string;
    sortByRating: string;
    sortByInventory: string;
    verifiedDealers: string;
    carsAvailable: string;
    averageRating: string;
  };

  // Registered Dealers Page
  registeredDealers: {
    title: string;
    subtitle: string;
    viewProfile: string;
    viewInventory: string;
    contactDealer: string;
    backToHome: string;
    allDealersVerified: string;
    customerRated: string;
    supportAvailable: string;
    browseNetwork: string;
    reviews: string;
    verifiedSince: string;
    experience: string;
    totalSales: string;
    viewDealerProfile: string;
    years: string;
    specialties: {
      luxuryCars: string;
      suvs: string;
      electricVehicles: string;
      familyCars: string;
      compactCars: string;
      hybrids: string;
      sportsCars: string;
      convertibles: string;
      performance: string;
      mercedesBenz: string;
      porsche: string;
      luxury: string;
      businessCars: string;
      fleetSales: string;
      leasing: string;
      ecoFriendly: string;
    };
    descriptions: string;
  };

  // UI Demo Page
  uiDemo: {
    title: string;
    subtitle: string;
    components: string;
    forms: string;
    buttons: string;
    cards: string;
  };

  // Country Test Page
  countryTest: {
    title: string;
    subtitle: string;
    currentCountryConfiguration: string;
    currentCountryDescription: string;
    detectedCountry: string;
    domain: string;
    languages: string;
    developmentMode: string;
    enabled: string;
    disabled: string;
    developmentCountrySwitcher: string;
    switcherDescription: string;
    selectTestCountry: string;
    chooseCountryToTest: string;
    resetToDefault: string;
    noteTitle: string;
    noteText: string;
    carListingsFor: string;
    carListingsDescription: string;
    loadingCars: string;
    foundCars: string;
    countryFilteredResults: string;
    noCarsFound: string;
    noCarsFoundDescription: string;
    tryDifferentCountry: string;
    howItWorks: string;
    automaticCountryDetection: string;
    automaticDetectionDescription: string;
    countrySpecificListings: string;
    countrySpecificDescription: string;
    crossCountryProtection: string;
    crossCountryDescription: string;
    listingSubmission: string;
    listingSubmissionDescription: string;
  };

  // Private Dashboard Page
  privateDashboard: {
    title: string;
    subtitle: string;
    welcome: string;
    myListings: string;
    activeListings: string;
    totalViews: string;
    totalInquiries: string;
    recentActivity: string;
    manageListings: string;
    createNewListing: string;
    viewAllListings: string;
    accountSettings: string;
    notifications: string;
    savedCars: string;
    lastSearch: string;
    search: string;
    yourListings: string;
    expressSale: string;
    express: string;
    contact: string;
    settings: string;
    saved: string;
    viewDetails: string;
    remove: string;
    startNewSearch: string;
    viewMyListings: string;
    savedOn: string;
    welcomeBack: string;
    manageExperience: string;
    lastSearches: string;
    recentSearchHistory: string;
    newSearch: string;
    resultsFound: string;
    searchedOn: string;
    searchAgain: string;
    viewResults: string;
    results: string;
    carsListedForSale: string;
    newListing: string;
    views: string;
    inquiries: string;
    listed: string;
    edit: string;
  };

  // Saved Cars Page
  savedCars: {
    title: string;
    subtitle: string;
    noSavedCars: string;
    noSavedCarsMessage: string;
    browseCars: string;
    removeFromSaved: string;
    viewDetails: string;
    contactSeller: string;
    savedOn: string;
    startBrowsing: string;
    browseVehicles: string;
    contactDealer: string;
    sortBy: string;
    newest: string;
    priceLowToHigh: string;
    priceHighToLow: string;
    clearAll: string;
    clearSelection: string;
  };

  // Sell Vehicle Page
  sellVehicle: {
    title: string;
    subtitle: string;
    vehicleInformation: string;
    uploadPhotos: string;
    pricingAndContact: string;
    reviewAndPublish: string;
    vehicleDetails: string;
    condition: string;
    features: string;
    description: string;
    photos: string;
    pricing: string;
    contactInfo: string;
    publish: string;
  };

  // Index/Home Page
  indexPage: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    featuredVehicles: string;
    whyChooseUs: string;
    getStarted: string;
    sellYourCar: string;
    findDealers: string;
    browseInventory: string;
  };

  // Admin Section
  admin: {
    panel: string;
    dashboard: string;
  };

  // Dealer Dashboard
  dealerDashboard: {
    title: string;
    subtitle: string;
    
    // Tab navigation
    tabs: {
      overview: string;
      myListings: string;
      inquiries: string;
      analytics: string;
    };
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        activeListings: {
          title: string;
          description: string;
          fromLastMonth: string;
        };
        totalViews: {
          title: string;
          description: string;
          fromLastMonth: string;
        };
        inquiries: {
          title: string;
          description: string;
          fromYesterday: string;
        };
        revenue: {
          title: string;
          description: string;
          fromLastMonth: string;
        };
      };
      
      // Performance section
      performance: {
        title: string;
        description: string;
        monthlyData: {
          january: string;
          december: string;
          november: string;
          sold: string;
        };
      };
      
      // Recent inquiries
      recentInquiries: {
        title: string;
        description: string;
        inquiryTypes: {
          viewing: string;
          price: string;
          financing: string;
        };
        timeAgo: {
          hoursAgo: string;
        };
      };
      
      // Action buttons
      actions: {
        addNewListing: string;
        viewAnalytics: string;
      };
    };
    
    // My Listings tab
    myListings: {
      title: string;
      
      // Search and filters
      searchPlaceholder: string;
      filterByStatus: string;
      statusOptions: {
        allStatus: string;
        active: string;
        sold: string;
        pending: string;
      };
      exportReport: string;
      export: string;
      
      // Table headers
      tableHeaders: {
        car: string;
        price: string;
        status: string;
        views: string;
        inquiries: string;
        listed: string;
        actions: string;
      };
      
      // Status badges
      statusBadges: {
        active: string;
        sold: string;
        pending: string;
      };
      
      // Actions
      actions: {
        viewListing: string;
        editListing: string;
        deleteListing: string;
      };
      
      // Mobile view
      mobileView: {
        views: string;
        inquiries: string;
      };
    };
    
    // Inquiries tab
    inquiries: {
      title: string;
      description: string;
      
      // Inquiry types
      inquiryTypes: {
        testDriveRequest: string;
        priceInquiry: string;
      };
      
      // Status
      status: {
        new: string;
        responded: string;
      };
      
      // Actions
      actions: {
        respond: string;
      };
      
      // Time indicators
      time: {
        hoursAgo: string;
        dayAgo: string;
      };
    };
    
    // Analytics tab
    analytics: {
      // Popular listings
      popularListings: {
        title: string;
        description: string;
        views: string;
        inquiries: string;
      };
      
      // Performance metrics
      performanceMetrics: {
        title: string;
        description: string;
        metrics: {
          averageTimeToSell: string;
          conversionRate: string;
          averageListingViews: string;
          responseTime: string;
        };
        values: {
          days: string;
          hours: string;
        };
      };
    };
    
    // Footer message
    footerMessage: string;
    activeListingsCount: string;
  };

  // Admin Dashboard
  adminDashboard: {
    title: string;
    subtitle: string;
    
    // Tab navigation
    tabs: {
      overview: string;
      allListings: string;
      userManagement: string;
      reports: string;
    };
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        totalUsers: {
          title: string;
          description: string;
          fromLastMonth: string;
        };
        activeDealers: {
          title: string;
          description: string;
          newThisMonth: string;
        };
        totalListings: {
          title: string;
          description: string;
          today: string;
        };
        platformRevenue: {
          title: string;
          description: string;
          fromLastMonth: string;
        };
      };
      
      // Recent activity
      recentActivity: {
        title: string;
        description: string;
        activities: {
          newDealerRegistration: string;
          listingFlaggedForReview: string;
          userAccountSuspended: string;
          paymentProcessed: string;
        };
        timeAgo: {
          hoursAgo: string;
        };
      };
      
      // System health
      systemHealth: {
        title: string;
        description: string;
        metrics: {
          serverUptime: string;
          averageResponseTime: string;
          activeSessions: string;
          errorRate: string;
        };
      };
      
      // Action buttons
      actions: {
        manageUsers: string;
        viewReports: string;
      };
    };
    
    // All Listings tab
    allListings: {
      title: string;
      
      // Search and filters
      searchPlaceholder: string;
      filterByStatus: string;
      statusOptions: {
        allStatus: string;
        active: string;
        sold: string;
        pending: string;
        flagged: string;
      };
      
      // Table headers
      tableHeaders: {
        image: string;
        title: string;
        category: string;
        seller: string;
        price: string;
        status: string;
        created: string;
        actions: string;
      };
      
      // Status badges
      statusBadges: {
        active: string;
        sold: string;
        pending: string;
        flagged: string;
      };
      
      // Actions
      actions: {
        viewListing: string;
        editListing: string;
        deleteListing: string;
      };
    };
    
    // User Management tab
    userManagement: {
      title: string;
      description: string;
      
      // Search and filters
      searchPlaceholder: string;
      roleFilter: {
        placeholder: string;
        options: {
          allRoles: string;
          customer: string;
          dealer: string;
          admin: string;
        };
      };
      
      // Table headers
      tableHeaders: {
        user: string;
        role: string;
        status: string;
        joinDate: string;
        lastLogin: string;
        actions: string;
      };
      
      // Role badges
      roleBadges: {
        admin: string;
        dealer: string;
        customer: string;
      };
      
      // Status badges
      statusBadges: {
        active: string;
        suspended: string;
        pending: string;
      };
      
      // Additional status messages
      statusMessages: {
        joinedOn: string;
        lastLoginOn: string;
        neverLoggedIn: string;
      };
      
      // Actions
      actions: {
        viewProfile: string;
        editUser: string;
        suspendUser: string;
        activateUser: string;
      };
    };
    
    // Reports tab
    reports: {
      // Platform statistics
      platformStatistics: {
        title: string;
        description: string;
        metrics: {
          totalRevenue: string;
          newUserRegistrations: string;
          successfulTransactions: string;
          averageListingPrice: string;
        };
      };
      
      // Content moderation
      contentModeration: {
        title: string;
        description: string;
        items: {
          flaggedListings: string;
          pendingDealerApplications: string;
          reportedUsers: string;
          disputes: string;
        };
      };
    };
    
    // Footer message
    footerMessage: string;
    systemStatus: string;
  };

  // Error pages section merged into main errors above

  // Legal pages
  legal: {
    accessibility: {
      title: string;
      subtitle: string;
      backToHome: string;
      commitmentTitle: string;
      commitmentDescription: string;
      commitmentText: string;
      
      visual: {
        title: string;
        features: string[];
      };
      motor: {
        title: string;
        features: string[];
      };
      audio: {
        title: string;
        features: string[];
      };
      cognitive: {
        title: string;
        features: string[];
      };
      
      standardsTitle: string;
      standardsDescription: string;
      wcagTitle: string;
      wcagDescription: string;
      compatibilityTitle: string;
      compatibilityDescription: string;
      
      feedbackTitle: string;
      feedbackText: string;
      returnToPlatform: string;
      contactTeam: string;
    };

    cookies: {
      title: string;
      subtitle: string;
      backToHome: string;
      policyTitle: string;
      policyDescription: string;
      policyText: string;
      
      essential: {
        title: string;
        features: string[];
      };
      functional: {
        title: string;
        features: string[];
      };
      analytics: {
        title: string;
        features: string[];
      };
      marketing: {
        title: string;
        features: string[];
      };
      
      managementTitle: string;
      managementDescription: string;
      
      browserTitle: string;
      browserFeatures: string[];
      
      platformTitle: string;
      platformFeatures: string[];
      
      questionsTitle: string;
      questionsText: string;
      returnToPlatform: string;
      cookieSupport: string;
    };

    imprint: {
      title: string;
      subtitle: string;
      backToHome: string;
      legalInfoTitle: string;
      legalInfoDescription: string;
      legalInfoText: string;
      
      companyDetails: {
        title: string;
        companyName: string;
        companyNameValue: string;
        registrationNumber: string;
        registrationNumberValue: string;
        vatId: string;
        vatIdValue: string;
        commercialRegister: string;
        commercialRegisterValue: string;
      };
      
      businessAddress: {
        title: string;
        registeredAddress: string;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        street: string;
        city: string;
        country: string;
      };
      
      management: {
        title: string;
        managingDirector: string;
        managingDirectorValue: string;
        authorizedRepresentative: string;
        authorizedRepresentativeValue: string;
      };
      
      contactInfo: {
        title: string;
        phone: string;
        phoneValue: string;
        email: string;
        emailValue: string;
        businessHours: string;
        businessHoursValue: string;
      };
      
      legalNotice: {
        title: string;
        paragraph1: string;
        paragraph2: string;
        paragraph3: string;
      };
      
      questionsTitle: string;
      questionsText: string;
      returnToPlatform: string;
      contactLegal: string;
    };
  };

  // Additional hardcoded text fixes
  hardcodedFixes: {
    // CountryTestPage specific
    countryTestPage: {
      codeLabel: string;
      loadingCars: string;
      errorPrefix: string;
      carListingsFor: string;
      onlyListedDescription: string;
      foundCarsIn: string;
      countryFilteredResults: string;
      noCarsFound: string;
      noCarsInCountry: string;
      trySwitchingCountry: string;
      carIdAndCountry: string;
      developmentNote: string;
    };

    // AdminDashboard - status badges and mock data
    adminDashboard: {
      statusBadges: {
        suspended: string;
      };
      mockData: {
        // User names
        johnDealer: string;
        johnDealerEmail: string;
        annaCustomer: string;
        annaCustomerEmail: string;
        bobAdmin: string;
        bobAdminEmail: string;
        
        // Listing titles
        bmw3Series2022: string;
        audiA42021: string;
        mercedesCClass2020: string;
        
        // Categories
        sedan: string;
        luxury: string;
        
        // Company names
        premiumMotors: string;
        eliteCars: string;
        
        // Activity users
        premiumMotorsGmbH: string;
        suspiciousUser: string;
        autoHausBerlin: string;
        
        // Time indicators
        twoHoursAgo: string;
        fourHoursAgo: string;
        sixHoursAgo: string;
        eightHoursAgo: string;
      };
    };

    // DealerDashboard mock data
    dealerDashboard: {
      mockData: {
        // Car titles
        bmw3Series320i2022: string;
        audiA4Avant2021: string;
        mercedesCClass2020: string;
        
        // Mileage values
        mileage25k: string;
        mileage18k: string;
        mileage32k: string;
      };
    };

    // Financing page hardcoded strings
    financing: {
      hero: {
        title: string;
        subtitle: string;
      };
      features: {
        quickApproval: {
          title: string;
          description: string;
        };
        lowRates: {
          title: string;
          description: string;
        };
        noCreditImpact: {
          title: string;
          description: string;
        };
        expertSupport: {
          title: string;
          description: string;
        };
      };
      calculator: {
        title: string;
        description: string;
        vehiclePrice: string;
        downPayment: string;
        interestRate: string;
        aprLabel: string;
      };
      form: {
        creditScoreRange: string;
        loanTerm: string;
      };
      summary: {
        loanSummary: string;
        loanAmount: string;
        monthlyPayment: string;
        totalInterest: string;
        totalPayment: string;
      };
      options: {
        financingOptions: string;
        chooseOption: string;
        traditionalAutoLoan: string;
        traditionalAutoLoanDescription: string;
        mostPopular: string;
        leaseOptions: string;
        leaseOptionsDescription: string;
        badCreditFinancing: string;
        badCreditFinancingDescription: string;
        fixedInterestRates: string;
        termsFromMonths: string;
        noMileageRestrictions: string;
        lowerMonthlyPayments: string;
        latestModelAvailability: string;
        warrantyCoverageIncluded: string;
        noMinimumCreditScore: string;
        creditRebuildingPrograms: string;
        quickApprovalProcess: string;
      };
      tips: {
        title: string;
        checkCreditScore: string;
        checkCreditScoreDesc: string;
        saveForDownPayment: string;
        saveForDownPaymentDesc: string;
        gatherDocumentation: string;
        gatherDocumentationDesc: string;
        considerTotalCost: string;
        considerTotalCostDesc: string;
      };
      contact: {
        needHelp: string;
        needHelpDesc: string;
        callSpecialists: string;
        phone: string;
        emailSupport: string;
        email: string;
        hours: string;
        hoursValue: string;
        getPreApprovedNow: string;
      };
    };

    // Dealers page hardcoded strings
    dealers: {
      searchLabel: string;
      stateLabel: string;
      specialtyLabel: string;
      allStatesOption: string;
      allSpecialtiesOption: string;
      sortByDistance: string;
      sortByRating: string;
      sortByInventory: string;
      sortByLabel: string;
      dealersFound: string;
      specialtiesHeader: string;
      certificationsHeader: string;
      noDealersFound: string;
      tryAdjustingFilters: string;
      viewProfile: string;
      contact: string;
      clearFilters: string;
      milesAway: string;
      cars: string;
      reviews: string;
      hoursLabel: string;
    };

    // DealerSupport page hardcoded strings  
    dealerSupport: {
      supportCenterText: string;
      dashboardSupport: {
        title: string;
        items: string[];
      };
      customerRelations: {
        title: string;
        items: string[];
      };
      performanceOptimization: {
        title: string;
        items: string[];
      };
      technicalSupport: {
        title: string;
        items: string[];
      };
      gettingStarted: {
        title: string;
        description: string;
        accountSetup: {
          title: string;
          items: string[];
        };
        inventoryManagement: {
          title: string;
          items: string[];
        };
        performanceTracking: {
          title: string;
          items: string[];
        };
      };
      helpSection: {
        title: string;
        message: string;
        returnToPlatform: string;
        goToDealerDashboard: string;
      };
    };

    // Accessibility page hardcoded strings
    accessibility: {
      standardsWeFollow: string;
      standardsDescription: string;
      wcagGuidelines: string;
      wcagDescription: string;
      platformCompatibility: string;
      platformCompatibilityDescription: string;
      weValueYourFeedback: string;
      feedbackMessage: string;
      returnToPlatform: string;
      contactAccessibilityTeam: string;
      visualFeatures: string[];
      motorFeatures: string[];
      audioFeatures: string[];
      cognitiveFeatures: string[];
    };

    // CookiePolicy page hardcoded strings
    cookiePolicy: {
      managingPreferences: string;
      managingPreferencesDescription: string;
      browserSettings: string;
      platformControls: string;
      questionsAboutCookies: string;
      questionsMessage: string;
      returnToPlatform: string;
      cookieSupport: string;
      browserSettingsItems: string[];
      platformControlsItems: string[];
      essentialFeatures: string[];
      functionalFeatures: string[];
      analyticsFeatures: string[];
      marketingFeatures: string[];
    };

    // SafetyTips page hardcoded strings
    safetyTips: {
      mainTitle: string;
      mainDescription: string;
      safetyOverview: string;
      meetingSafety: {
        title: string;
        items: string[];
      };
      paymentSecurity: {
        title: string;
        items: string[];
      };
      vehicleInspection: {
        title: string;
        items: string[];
      };
      redFlags: {
        title: string;
        items: string[];
      };
      documentation: {
        title: string;
        description: string;
        forBuyers: string;
        forSellers: string;
        buyerItems: string[];
        sellerItems: string[];
      };
      emergency: {
        title: string;
        message: string;
        browseCars: string;
        reportConcern: string;
      };
    };
  };

  // Final fixes for remaining hardcoded English text
  finalFixes: {
    // ExpressSell page - Car brands, models, and placeholders
    expressSell: {
      carBrands: string[];
      carModels: string[];
      conditionLabel: string;
      conditionPlaceholder: string;
      descriptionPlaceholder: string;
      namePlaceholder: string;
      locationPlaceholder: string;
      uploadPhotos: string;
      uploadPhotosDescription: string;
      uploadCarPhotos: string;
      addUpToTenPhotos: string;
      choosePhotos: string;
      mainPhoto: string;
      priceAndDescription: string;
      setPriceAndDescription: string;
      askingPriceEuros: string;
      priceExample: string;
      contactInformation: string;
      howShouldBuyersContact: string;
      fullNameRequired: string;
      yourFullName: string;
      phoneNumberRequired: string;
      emailAddressRequired: string;
      yourEmail: string;
      locationRequired: string;
      cityState: string;
      carDetailsStep: string;
      photosStep: string;
      priceDescriptionStep: string;
      contactInfoStep: string;
      backToHome: string;
      listMyCarQuickly: string;
      previous: string;
      next: string;
      listMyCar: string;
    };
    
    // DealerSignUp page - Form placeholders  
    dealerSignUp: {
      firstNamePlaceholder: string;
      lastNamePlaceholder: string;
    };
    
    // SavedCars page - Filter placeholder
    savedCars: {
      filterPlaceholder: string;
      sortBy: string;
      recentlySaved: string;
      priceLowToHigh: string;
      priceHighToLow: string;
      yearNewestFirst: string;
      yearOldestFirst: string;
      allCars: string;
      savedThisWeek: string;
      back: string;
      noSavedCars: string;
      startBrowsing: string;
      browseVehicles: string;
      title: string;
      clearAll: string;
      carsSaved: string;
      savedDate: string;
      contact: string;
      view: string;
    };
    
    // UIDemo page - Demo placeholders
    uiDemo: {
      namePlaceholder: string;
      emailPlaceholder: string;
      optionPlaceholder: string;
      enhancedUIComponentsDemo: string;
      showcaseNewlyIntegrated: string;
      buttonVariants: string;
      variousButtonStyles: string;
      enhancedFormComponents: string;
      formComponentsWithValidation: string;
      selectOption: string;
      thisIsPublicDisplayName: string;
      submitForm: string;
      cardTitle: string;
      cardDescription: string;
      cardContentExample: string;
      anotherCard: string;
      cardsNowResponsive: string;
      cardAction: string;
      enhancedFeatures: string;
      improvedAccessibility: string;
      feature1: string;
      feature2: string;
      enhancedAccordion: string;
      accordionWithAnimations: string;
      whatAreNewFeatures: string;
      newFeaturesAnswer: string;
      howDoFormsWork: string;
      formsWorkAnswer: string;
      whatAboutImages: string;
      imagesAnswer: string;
      imageWithFallback: string;
      demonstratesAutoFallback: string;
      workingImage: string;
      brokenImageFallback: string;
    };
  };

  // Advanced Features
  advancedFeatures: {
    // Advanced Search
    advancedSearch: {
      title: string;
      active: string;
      filter: string;
      filters: string;
      clearAll: string;
      searchCars: string;
      sections: {
        vehicleDetails: {
          title: string;
        };
        priceLocation: {
          title: string;
        };
        featuresOptions: {
          title: string;
          description: string;
        };
      };
      fields: {
        make: string;
        model: string;
        minYear: string;
        maxYear: string;
        bodyType: string;
        drivetrain: string;
        fuelType: string;
        transmission: string;
        exteriorColor: string;
        interiorColor: string;
        priceRange: string;
        maxMileage: string;
        condition: string;
        location: string;
        radius: string;
        sellerType: string;
        yearFrom: string;
        yearTo: string;
        priceMin: string;
        priceMax: string;
        mileageMax: string;
      };
      placeholders: {
        anyMake: string;
        anyModel: string;
        any: string;
        anyType: string;
        anyColor: string;
        anyMileage: string;
        anyCondition: string;
        cityStateZip: string;
        anyDistance: string;
        allSellers: string;
        anyYear: string;
        anyPrice: string;
        anyFuel: string;
        anyTransmission: string;
        anyBodyType: string;
        anyDrivetrain: string;
        anyRadius: string;
      };
      options: {
        mileage: {
          under10k: string;
          under25k: string;
          under50k: string;
          under75k: string;
          under100k: string;
          under150k: string;
          over100k: string;
        };
        radius: {
          miles25: string;
          miles50: string;
          miles100: string;
          miles250: string;
          miles500: string;
          nationwide: string;
          miles200: string;
        };
        sellerTypes: {
          dealersOnly: string;
          privateOnly: string;
          certifiedOnly: string;
        };
        years: {
          oneYear: string;
          sevenYears: string;
        };
      };
      features: {
        airConditioning: string;
        leatherSeats: string;
        heatedSeats: string;
        cooledSeats: string;
        sunroof: string;
        moonroof: string;
        gpsNavigation: string;
        backupCamera: string;
        bluetooth: string;
        usbPorts: string;
        wirelessCharging: string;
        premiumSound: string;
        keylessEntry: string;
        remoteStart: string;
        cruiseControl: string;
        adaptiveCruiseControl: string;
        parkingSensors: string;
        blindSpotMonitoring: string;
        laneDepartureWarning: string;
        laneKeepAssist: string;
        automaticEmergencyBraking: string;
        appleCarPlay: string;
        androidAuto: string;
        thirdRowSeating: string;
        towPackage: string;
        allTerrainTires: string;
        sportPackage: string;
        premiumPackage: string;
        allWheelDrive: string;
        bluetoothConnectivity: string;
        navigationSystem: string;
        parkingAssist: string;
        powerWindows: string;
        pushButtonStart: string;
      };
    };

    // Car Comparison
    comparison: {
      title: string;
      clearAll: string;
      compareCars: string;
      compareNow: string;
      fields: {
        price: string;
        year: string;
        mileage: string;
        fuelType: string;
        transmission: string;
        bodyType: string;
        drivetrain: string;
        condition: string;
        exteriorColor: string;
        interiorColor: string;
        location: string;
        dealer: string;
        engine: string;
        horsepower: string;
        torque: string;
        fuelEconomy: string;
        seatingCapacity: string;
        features: string;
      };
      bar: {
        compareCars: string;
        selected: string;
        max: string;
        compare: string;
        clear: string;
      };
      notAvailable: string;
    };

    // Financing Calculator
    financingCalculator: {
      title: string;
      sections: {
        vehicleDetails: string;
        paymentDetails: string;
        loanTerms: string;
        monthlyPayment: string;
        loanSummary: string;
        downPayment: string;
      };
      fields: {
        vehiclePrice: string;
        salesTax: string;
        fees: string;
        downPayment: string;
        tradeInValue: string;
        loanTerm: string;
        interestRate: string;
        dealerFees: string;
        downPaymentPercent: string;
        monthlyPayment: string;
      };
      labels: {
        months: string;
        forMonths: string;
        loanAmount: string;
        totalInterest: string;
        salesTax: string;
        downPayment: string;
        totalCost: string;
        oneYear: string;
        sevenYears: string;
        aprPercent: string;
        feesDescription: string;
        years: string;
        percent: string;
      };
      notes: {
        title: string;
        estimate: string;
        ratesSubject: string;
        additionalFees: string;
        considerPreApproval: string;
        disclaimer: string;
      };
    };
  };
}

// Import all translations - now using clean, rebuilt translation files
import { enTranslations } from './translations/en';
import { mkTranslations } from './translations/mk';
import { sqTranslations } from './translations/sq';
import { slTranslations } from './translations/sl';
import { lvTranslations } from './translations/lv';
import { ruTranslations } from './translations/ru';

// Translation storage - now using proper multilingual support with clean files
export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: enTranslations,
  mk: mkTranslations,
  sq: sqTranslations,
  sl: slTranslations,
  lv: lvTranslations,
  ru: ruTranslations,
};

// Translation utility functions
export function getTranslation(language: SupportedLanguage): TranslationStrings {
  return translations[language] || translations['en'];
}

// Translation utility functions
export function translate(language: SupportedLanguage, key: string): string {
  const keys = key.split('.');
  let value: any = getTranslation(language);
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      let fallback: any = translations['en'];
      for (const fallbackKey of keys) {
        if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
          fallback = fallback[fallbackKey];
        } else {
          return `Missing: ${key}`;
        }
      }
      return fallback;
    }
  }
  
  return typeof value === 'string' ? value : `Invalid: ${key}`;
}

export function translateWithObjects(language: SupportedLanguage, key: string): any {
  const keys = key.split('.');
  let value: any = getTranslation(language);
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      let fallback: any = translations['en'];
      for (const fallbackKey of keys) {
        if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
          fallback = fallback[fallbackKey];
        } else {
          return [`Missing: ${key}`];
        }
      }
      return fallback;
    }
  }
  
  return value;
}