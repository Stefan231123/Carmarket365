import { TranslationStrings } from '../translations';

export const mkTranslations: TranslationStrings = {
  brand: {
    name: 'CarMarket365'
  },
  common: {
    loading: 'Вчитување...',
    error: 'Грешка',
    retry: 'Обиди се повторно',
    close: 'Затвори',
    cancel: 'Откажи',
    confirm: 'Потврди',
    continue: 'Продолжи',
    back: 'Назад',
    next: 'Следно',
    previous: 'Претходно',
    search: 'Пребарај',
    filter: 'Филтер',
    clear: 'Исчисти',
    save: 'Зачувај',
    edit: 'Уреди',
    'delete': 'Избриши',
    add: 'Додај',
    view: 'Погледни',
    contact: 'Контакт',
    phone: 'Телефон',
    email: 'Е-пошта',
    address: 'Адреса',
    location: 'Локација',
    price: 'Цена',
    currency: 'USD',
    year: 'Година',
    make: 'Марка',
    model: 'Модел',
    mileage: 'Пробег',
    condition: 'Состојба',
    features: 'Карактеристики',
    description: 'Опис',
    images: 'Слики',
    seller: 'Продавач',
    dealer: 'Дилер',
    private: 'Приватен',
    yes: 'Да',
    no: 'Не',
    menu: 'Мени',
    'new': 'Нов',
    certified: 'Сертифициран',
    vehicle: 'Возило',
    message: 'Порака',
    default: 'Основно',
    secondary: 'Секундарно',
    outline: 'Контура',
    ghost: 'Дух',
    link: 'Врска',
    destructive: 'Деструктивно',
    small: 'Мало',
    large: 'Големо',
    option: 'Опција',
    sending: 'Праќа...',
    processing: 'Процесирање...',
    errorLoadingImage: 'Грешка при вчитување слика'
  },

  // Forms - validation, labels, placeholders, actions
  forms: {
    validation: {
      nameRequired: 'Името е задолжително',
      emailRequired: 'Е-поштата е задолжителна',
      emailInvalid: 'Ве молиме внесете валидна е-пошта',
      phoneRequired: 'Телефонскиот број е задолжителен',
      phoneInvalid: 'Невалиден телефон',
      messageRequired: 'Пораката е задолжителна',
      required: 'Ова поле е задолжително',
      passwordRequired: 'Лозинката е задолжителна',
      passwordMinLength: 'Лозинката мора да има најмалку 8 знаци',
      confirmPasswordRequired: 'Потврдете ја лозинката',
      passwordsNotMatch: 'Лозинките не се совпаѓаат',
      lastNameRequired: 'Презимето е задолжително',
      fullNameRequired: 'Целосното име е задолжително',
      loanAmountRequired: 'Износот на кредитот е задолжителен',
      annualIncomeRequired: 'Годишната заработка е задолжителна',
      creditScoreRequired: 'Кредитниот рејтинг е задолжителен',
      employmentStatusRequired: 'Статусот на вработеност е задолжителен',
      yearsAtJobRequired: 'Годините на работа се задолжителни',
      monthlyExpensesRequired: 'Месечните трошоци се задолжителни',
      makeRequired: 'Марката е задолжителна',
      modelRequired: 'Моделот е задолжителен',
      yearRequired: 'Годината е задолжителна',
      yearInvalid: 'Невалидна година',
      mileageRequired: 'Пробегот е задолжителен',
      mileageNegative: 'Пробегот не може да биде негативен',
      dateRequired: 'Изберете датум',
      timeRequired: 'Изберете време'
    },
    labels: {
      fullName: 'Целосно име',
      email: 'Е-пошта',
      phone: 'Телефонски број',
      message: 'Порака'
    },
    placeholders: {
      enterFullName: 'Внесете го вашето целосно име',
      enterEmail: 'Внесете ја вашата е-пошта',
      enterPhone: 'Внесете го вашиот телефон',
      contactMessage: 'Здраво, сум заинтересиран за {year} {make} {model}. Ве молам контактирајте ме за повеќе детали.'
    },
    actions: {
      sendMessage: 'Испрати порака',
      submit: 'Испрати',
      scheduleTestDrive: 'Закажи тест возење',
      requestFinancing: 'Побарај финансирање'
    }
  },

  // Modals - titles, descriptions, success messages
  modals: {
    contactCar: {
      title: 'Контактирај продавач',
      description: 'Испрати порака за овој автомобил',
      successTitle: 'Пораката е успешно испратена!',
      successDescription: 'Вашата порака е испратена до продавачот. Тие ќе ве контактираат наскоро.'
    },
    expressSell: {
      title: 'Продајте го вашиот автомобил брзо',
      subtitle: 'Поставете го вашиот автомобил за минути со нашиот експрес процес на продажба',
      backToHome: 'Назад на почетна',
      step: 'Чекор',
      of: 'од',
      carDetails: 'Детали за автомобилот',
      carDetailsDescription: 'Кажете ни за вашиот автомобил за да создадеме привлечен оглас',
      make: 'Марка',
      makeRequired: 'Марка *',
      selectMake: 'Изберете марка',
      model: 'Модел',
      modelRequired: 'Модел *',
      selectModel: 'Изберете модел',
      year: 'Година',
      yearRequired: 'Година *',
      selectYear: 'Изберете година',
      mileage: 'Пробег',
      mileageRequired: 'Пробег *',
      enterMileage: 'Внесете пробег',
      kilometers: 'километри',
      fuelType: 'Тип на гориво',
      fuelTypeRequired: 'Тип на гориво *',
      selectFuelType: 'Изберете тип на гориво',
      gasolinot: 'Бензин',
      diesel: 'Дизел',
      electric: 'Електрично',
      hybrid: 'Хибрид',
      transmission: 'Менувач',
      transmissionRequired: 'Менувач *',
      selectTransmission: 'Изберете менувач',
      manual: 'Рачен',
      automatic: 'Автоматски',
      condition: 'Состојба',
      conditionRequired: 'Состојба *',
      selectCondition: 'Изберете состојба',
      excellent: 'Одлична',
      veryGood: 'Многу добра',
      good: 'Добра',
      fair: 'Задоволителна',
      price: 'Цена',
      priceRequired: 'Цена *',
      enterPrice: 'Внесете барана цена',
      euros: 'EUR',
      description: 'Опис',
      descriptionOptional: 'Опис (по избор)',
      enterDescription: 'Внесете опис',
      descriptionPlaceholder: 'Опишете ги карактеристиките, состојбата и историјата на вашиот автомобил...',
      photosAndContact: 'Фотографии и контакт',
      photosAndContactDescription: 'Додајте фотографии и вашите контакт информации',
      carPhotos: 'Фотографии од автомобилот',
      carPhotosRequired: 'Фотографии од автомобилот *',
      uploadPhotos: 'Прикачи фотографии',
      photosUploaded: 'фотографии прикачени',
      contactInformation: 'Контакт информации',
      fullName: 'Целосно име',
      fullNameRequired: 'Целосно име *',
      enterFullName: 'Внесете го вашето целосно име',
      phoneNumber: 'Телефонски број',
      phoneRequired: 'Телефон *',
      enterPhone: 'Внесете телефонски број',
      emailAddress: 'Е-пошта адреса',
      emailRequired: 'Е-пошта *',
      enterEmail: 'Внесете е-пошта адреса',
      location: 'Локација',
      locationRequired: 'Локација *',
      enterLocation: 'Внесете ја вашата локација',
      preview: 'Преглед',
      previewDescription: 'Прегледајте го вашиот оглас пред објавување',
      yourListing: 'Вашиот оглас',
      listingPreview: 'Преглед на огласот',
      photos: 'Фотографии',
      contactDetails: 'Контакт детали',
      previous: 'Претходно',
      next: 'Следно',
      publishListing: 'Објави оглас',
      successMessage: 'Вашето возило е успешно поставено!',
      requiredField: 'Ова поле е задолжително',
    },
    financing: {
      title: 'Добијте претходно одобрување за финансирање',
      description: 'Добијте претходно одобрување за автомобилско финансирање во минути',
      badges: {
        financingAvailable: 'Финансирање достапно'
      },
      employmentStatus: {
        retired: 'Пензионер',
        student: 'Студент',
        unemployed: 'Невработен'
      },
    },
    scheduleTestDrive: {
      title: 'Закажи тест возење',
      description: 'Закажи средба за тест возење на ова возило',
      badge: 'Тест возење достапно',
      success: {
        title: 'Тест возењето е закажано!',
        description: 'Вашето барање за тест возење е испратено до продавачот. Тие ќе ве контактираат за потврда на терминот.',
        schedule: 'Закажи',
        scheduling: 'Закажување'
      },
    },
    tradeIn: {
      title: 'Проценувач на замена',
      description: 'Добијте моментална процена на вредноста на замена на вашиот тековен автомобил',
      tabs: {
        vehicleInfo: 'Информации за возилото',
        condition: 'Состојба',
        results: 'Резултати'
      },
      form: {
        options: {
          condition: {
            excellent: 'Одлична',
            good: 'Добра',
            fair: 'Задоволителна',
            poor: 'Лоша'
          },
          accident: {
            none: 'Нема несреќи',
            minor: 'Мала несреќа',
            major: 'Голема несреќа',
            multiple: 'Повеќе несреќи'
          },
          serviceHistory: {
            complete: 'Комплетна историја на сервисирање',
            partial: 'Делумна историја на сервисирање',
            none: 'Нема историја на сервисирање'
          },
          modifications: {
            none: 'Нема модификации',
            minor: 'Мали модификации',
            major: 'Големи модификации'
          }
        }
      },
      results: {
        title: 'Вашата процена на замена',
        estimatedValue: 'Проценета вредност на замена',
        range: 'Опсег',
        confidence: 'Ниво на доверба',
        confidenceLevels: {
          high: 'Високо',
          medium: 'Средно',
          low: 'Ниско'
        },
        factors: {
          title: 'Фактори што влијаат на вашата процена',
          positive: 'Позитивни фактори',
          negative: 'Негативни фактори',
          neutral: 'Неутрални фактори'
        },
        recommendations: {
          title: 'Препораки',
          maintenance: 'Размислете за решавање на проблемите со одржување пред заменката',
          documentation: 'Соберете ги сите записи за сервисирање и документација',
          inspection: 'Направете професионален преглед за точна оценка',
          timing: 'Размислете за времето на пазарот за вашата марка и модел',
          marketConditions: 'Размислете за тековните пазарни услови при планирање на заменката',
          multipleAppraisals: 'Направете повеќе проценки за да осигурате фер вредност',
          maintenanceRecords: 'Чувајте записи за одржување за да покажете грижа за возилото',
          cleanVehicle: 'Исчистете го возилото темелно пред проценката'
        },
        disclaimer: {
          title: 'Важна забелешка',
          text: 'Ова е проценета цена врз основа на дадените информации. Вистинските вредности на замена може да варираат во зависност од политиките на дилерот, тековните пазарни услови и физичкиот преглед на возилото. Препорачуваме добивање понуди од повеќе дилери за најточна оценка.'
        }
      },
      loading: {
        calculating: 'Пресметување на вашата процена...',
        fetchingData: 'Преземање на пазарни податоци...'
      }
    },
  },

  hero: {
    title: 'Најди го својот идеален автомобил',
    subtitle: 'Прелистај низ илјадници квалитетни половни возила',
    searchButton: 'Најди автомобили',
    advancedSearch: 'Напреден пребарај',
    vehicleTypes: {
      cars: 'Автомобили',
      motorbikes: 'Мотоцикли',
      trucks: 'Камиони'
    },
    searchForm: {
      make: 'Марка',
      model: 'Модел',
      priceFrom: 'Цена од',
      priceTo: 'Цена до',
      yearFrom: 'Година од',
      mileage: 'Пробег (км)',
      location: 'Локација',
      anyMake: 'Која било марка',
      anyModel: 'Кој било модел',
      minPrice: 'Мин цена',
      maxPrice: 'Макс цена',
      minYear: 'Мин година',
      anyYear: 'Која било година',
      anyMileage: 'Кој било пробег',
      maxMileage: 'Макс пробег',
      noMin: 'Без мин',
      noMax: 'Без макс',
      enterLocation: 'Внесете град или поштенски код'
    },
    availableCars: 'Над 50,000 автомобили достапни низ целата земја'
  },

  // Features Section
  features: {
    title: 'Зошто да изберете CarFinder?',
    subtitle: 'Го правиме купувањето автомобили едноставно, безбедно и транспарентно со нашата сеопфатна платформа',
    items: {
      verifiedListings: {
        title: 'Верификувани огласи',
        description: 'Сите автомобили се прегледани и верификувани од нашиот тим експерти за да се обезбеди квалитет и автентичност.'
      },
      advancedSearch: {
        title: 'Напреден пребарај',
        description: 'Најдете точно она што го барате со нашите моќни филтри за пребарување и паметни препораки.'
      },
      bestPrices: {
        title: 'Најдобри цени',
        description: 'Конкурентни цени без скриени трошоци. Добијте најдобра вредност за вашите пари секогаш.'
      },
      freeDelivery: {
        title: 'Бесплатна достава',
        description: 'Добијте го вашиот автомобил доставен на вратата во радиус од 50 километри. Безбеден и сигурен транспорт.'
      },
      quickProcess: {
        title: 'Брз процес',
        description: 'Завршете ја вашата купувачка во минути со нашиот поедностав процес за купување и дигитална документација.'
      },
      expertSupport: {
        title: 'Експертска поддршка',
        description: 'Нашиот посветен тим е тука да ви помогне во секој чекор, од пребарувањето до купувањето.'
      }
    }
  },

  // Last Search Section
  lastSearch: {
    title: 'Последно пребарување',
    description: 'BMW автомобили од €20,000 - €35,000, години 2019-2022 • Најдени 247 резултати',
    viewMore: 'Прикажи повеќе',
    matchPercentage: '% совпаѓање'
  },

  // Interesting Suggestions Section
  suggestions: {
    title: 'Ова може да ве интересира',
    description: 'Свежи BMW огласи што се совпаѓаат со вашите критериуми • Неодамна додадени на платформата',
    seeMore: 'Прикажи повеќе предлози',
    daysAgo: 'д. пред'
  },

  // Popular Brands Section
  brands: {
    title: 'Купувај по марки',
    description: 'Прелистај автомобили од најпопуларните производители',
    carsCount: 'автомобили'
  },

  header: {
    welcome: 'Добредојдовте на CarMarket365',
    signIn: 'Најави се',
    signOut: 'Одјави се',
    myAccount: 'Мојот профил',
    dashboard: 'Контролна табла',
    home: 'Дома',
    browseCars: 'Прелистај автомобили',
    sellCar: 'Продај автомобил',
    savedCars: 'Зачувани автомобили',
    financing: 'Финансирање',
    about: 'За нас',
    contact: 'Контакт',
    faq: 'Често поставувани прашања',
    help: 'Помош'
  },

  cars: {
    title: 'Автомобили на продажба',
    searchPlaceholder: 'Марка, модел или клучен збор',
    noResults: 'Не се најдени автомобили кои одговараат на вашите критериуми',
    resultsCount: 'Најдени {count} возила',
    viewDetails: 'Погледни детали',
    contactSeller: 'Контактирај продавач',
    saveToFavorites: 'Зачувај во омилени',
    removeFromFavorites: 'Отстрани од омилени',
    carDetails: 'Детали за автомобилот',
    specifications: 'Спецификации',
    fuelType: 'Тип на гориво',
    transmission: 'Менувач',
    bodyType: 'Тип на каросерија',
    exteriorColor: 'Надворешна боја',
    interiorColor: 'Внатрешна боја',
    drivetrain: 'Тип на погон',
    vin: 'ВИН број',
    inspection: 'Преглед',
    history: 'Историја',
    financing: 'Финансирање',
    testDrive: 'Тест возење',
    makeOffer: 'Направи понуда',
    featured: 'Препорачани огласи',
    handpicked: 'Рачно избрани автомобили за вас',
    discover: 'Откријте ги нашите внимателно избрани премиум возила',
    allCars: 'Сите автомобили',
    newCars: 'Нови автомобили',
    certifiedPreOwned: 'Сертифицирани половни',
    electric: 'Електрични',
    luxury: 'Луксузни',
    viewAllCars: 'Погледни ги сите автомобили'
  },

  filters: {
    title: 'Филтри за пребарување',
    anyMake: 'Која било марка',
    anyModel: 'Кој било модел',
    anyYear: 'Која било година',
    priceRange: 'Ценовен опсег',
    priceMin: 'Мин цена',
    priceMax: 'Макс цена',
    yearRange: 'Опсег на години',
    yearMin: 'Мин година',
    yearMax: 'Макс година',
    mileageMax: 'Макс пробег',
    location: 'Локација',
    fuelTypes: 'Тип на гориво',
    transmissionTypes: 'Менувач',
    bodyTypes: 'Тип на каросерија',
    condition: 'Состојба',
    applyFilters: 'Примени филтри',
    clearFilters: 'Исчисти филтри'
  },

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
    rememberMe: 'Запомни ме',
    forgotPassword: 'Заборавена лозинка?',
    createAccount: 'Создај профил',
    alreadyHaveAccount: 'Веќе имаш профил?',
    dontHaveAccount: 'Немаш профил?',
    loginWith: 'Или продолжи со',
    registerAs: 'Регистрирај се како',
    privatePerson: 'Приватно лице',
    dealerAccount: 'Дилерски профил',
    userType: 'Јас сум',

    // SignIn page specific
    backToHome: 'Назад на почетна',
    signInToAccount: 'Најави се на твојот профил',
    welcomeBack: 'Добредојде назад',
    enterCredentials: 'Внеси ги твоите податоци за да пристапиш до твојот профил',
    privatePersonDescription: 'Купи или продај твој автомобил',
    dealerDescription: 'Професионален продавач',
    pro: 'Про',
    enterYourEmail: 'Внесете ја вашата е-пошта',
    enterYourPassword: 'Внесете ја вашата лозинка',
    signingIn: 'Најавување...',
    orContinueWith: 'Или продолжи со',
    google: 'Google',
    facebook: 'Facebook',
    createPrivateAccount: 'Создај приватен профил',
    registerAsDealer: 'Регистрирај се како дилер',
    dealerBenefits: 'Дилерски бенефиции',
    professionalDashboard: '• Професионална дилерска контролна табла',
    inventoryManagement: '• Напредно управување со инвентар',
    customerTracking: '• Следење на клиентски барања',
    enhancedVisibility: '• Подобрена видливост на огласи',
    analyticsInsights: '• Аналитика и увиди',

    // UserSignUp page specific
    createYourAccount: 'Создај го твојот профил',
    joinThousands: 'Приклучи се на илјадници ентузијасти за автомобили',
    privateAccount: 'Приватен профил',
    buyAndSellCars: 'Купувај и продавај автомобили, зачувувај омилени и управувај со огласи',
    fullName: 'Целосно име',
    enterFullName: 'Внесете го вашето целосно име',
    emailAddress: 'Е-пошта адреса',
    createStrongPassword: 'Создај силна лозинка',
    confirmYourPassword: 'Потврди ја твојата лозинка',
    mustBeCharacters: 'Мора да има најмалку 8 знаци',
    agreeToTerms: 'Се согласувам со',
    termsOfService: 'Услови на користење',
    and: 'и',
    privacyPolicy: 'Политика за приватност',
    creatingAccount: 'Создавање профил...',
    wantSellAsDealer: 'Сакаш да продаваш автомобили како дилер?',
    createDealerAccount: 'Создај дилерски профил',
    joinCommunityText: 'Со создавање профил, се приклучуваш на нашата заедница на автомобилски ентузијасти и се согласуваш со правилата на нашата платформа.',

    // Error messages for signup
    pleaseAgreeTerms: 'Ве молиме согласете се со условите',
    passwordsNotMatch: 'Лозинките не се совпаѓаат',
    passwordMinLength: 'Лозинката мора да содржи најмалку 8 знаци',
    registrationFailed: 'Регистрацијата не успеа',

    // Password strength indicator
    passwordStrength: {
      label: 'Јачина на лозинката',
      levels: {
        weak: 'Слаба',
        medium: 'Средна',
        strong: 'Силна'
      },
      requirements: {
        label: 'Барања:',
        length: 'Најмалку 8 знаци',
        uppercase: 'Една голема буква',
        lowercase: 'Една мала буква',
        number: 'Еден број',
        special: 'Еден специјален знак (!@#$%^&*)'
      }
    },

    // Social login
    socialLogin: {
      signingIn: 'Најавување...',
      google: {
        description: 'Користете го вашиот Google профил за брзо најавување или создавање нов профил.'
      },
      facebook: {
        description: 'Поврзете се со Facebook за да пристапите до вашиот CarMarket365 профил.'
      }
    },

    // Access control
    accessDenied: {
      title: 'Пристапот одбиен',
      signInRequired: 'Ве молиме најавете се за да пристапите до оваа страна.',
      insufficientPermissions: 'Немате дозвола за пристап до оваа страна.',
      redirectingToDashboard: 'Пренасочување кон вашата контролна табла...'
    },

    // DealerSignUp page specific
    backToSignIn: 'Назад кон најавување',
    dealerRegistration: 'Дилерска регистрација',
    joinCarMarketDealer: 'Приклучи се на CarMarket365 како професионален дилер',
    businessInformation: 'Информации за бизнисот',
    tellUsAboutBusiness: 'Кажете ни за вашиот дилерски центар или бизнис',
    businessName: 'Име на бизнисот',
    businessNamePlaceholder: 'Вашата Компанија ДОО',
    businessType: 'Тип на бизнис',
    selectBusinessType: 'Изберете тип на бизнис',
    carDealership: 'Автомобилски дилерски центар',
    usedCarLot: 'Плац за половни автомобили',
    autoTrader: 'Авто трговец',
    carBroker: 'Авто брокер',
    rentalCompany: 'Компанија за изнајмување',
    other: 'Друго',
    vatNumber: 'ДДВ број',
    vatNumberPlaceholder: 'МК123456789',
    taxId: 'Даночен број',
    optional: 'Опционално',
    yearEstablished: 'Година на основање',
    selectYear: 'Изберете година',
    businessDescription: 'Опис на бизнисот',
    businessDescriptionPlaceholder: 'Опишете го вашиот бизнис, специјализации и услуги...',
    contactPerson: 'Контакт лице',
    primaryContactInfo: 'Примарни контакт информации за вашиот бизнис',
    position: 'Позиција',
    positionPlaceholder: 'нпр., Сопственик, Менаџер за продажба',
    businessEmail: 'Деловна е-пошта',
    businessEmailPlaceholder: 'biznis@primer.com',
    businessAddress: 'Деловна адреса',
    dealershipLocation: 'Физичка локација на вашиот дилерски центар',
    streetAddress: 'Улична адреса',
    streetAddressPlaceholder: 'Деловен центар ул., 123',
    city: 'Град',
    cityPlaceholder: 'Скопје',
    stateRegion: 'Регион/Област',
    stateRegionPlaceholder: 'Скопски регион',
    postalCode: 'Поштенски код',
    postalCodePlaceholder: '1000',
    country: 'Земја',
    selectCountry: 'Изберете земја',
    germany: 'Германија',
    austria: 'Австрија',
    switzerland: 'Швајцарија',
    netherlands: 'Холандија',
    belgium: 'Белгија',
    france: 'Франција',
    italy: 'Италија',
    spain: 'Шпанија',
    accountSetup: 'Поставување на профил',
    createSecureDealerAccount: 'Создајте го вашиот безбеден дилерски профил',
    termsAndAgreements: 'Услови и договори',
    acceptTermsConditions: 'Ги прифаќам Условите и одредбите',
    agreeToTermsAndDealer: 'Се согласувате со нашите Услови на користење и Дилерски договор.',
    acceptPrivacyPolicy: 'Ја прифаќам Политиката за приватност',
    understandDataCollection: 'Разбирате како ги собираме и користиме вашите податоци.',
    receiveMarketingCommunications: 'Сакам да добивам маркетинг комуникации',
    getUpdatesFeatures: 'Добивајте вести за нови функции и деловни можности.',
    alreadyHaveAccountSignIn: 'Веќе имате профил? Најавете се',

    // Validation error messages for dealer signup
    businessNameRequired: 'Името на компанијата е задолжително',
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
    validVatNumber: 'Ве молиме внесете валиден ДДВ број (нпр. МК123456789)',
    passwordMinEightChars: 'Лозинката мора да содржи најмалку 8 знаци',
    acceptTermsRequired: 'Морате да ги прифатите условите и одредбите',
    acceptPrivacyRequired: 'Морате да ја прифатите политиката за приватност'
  },

  // Advanced Search

  sell: {
    title: 'Продадете го вашиот автомобил',
    sellYourCar: 'Продадете го вашето возило',
    carInformation: 'Информации за автомобилот',
    uploadPhotos: 'Прикачи фотографии',
    setPrice: 'Постави цена',
    contactInformation: 'Контакт информации',
    publish: 'Објави',
    draft: 'Зачувај како нацрт',
    preview: 'Преглед',
    required: 'Задолжително',
    optional: 'Опционално',
    addPhotos: 'Додај фотографии',
    removePhoto: 'Отстрани фотографија',
    mainPhoto: 'Главна фотографија',
    additionalInfo: 'Дополнителни информации',
    sellerNotes: 'Забелешки на продавачот',

    // Step titles
    steps: {
      vehicleType: 'Тип на возило',
      basicInfo: 'Основни информации',
      details: 'Детали',
      photosAndContact: 'Фото и контакти'
    },

    // Vehicle type selection

    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'Кој тип на возило го продавате?',
      basicInformation: 'Основни информации',
      basicInfoDescription: 'Кажете ни за вашиот {vehicleType}',
      additionalDetails: 'Дополнителни детали',
      additionalDetailsDescription: 'Додајте повеќе детали за вашиот {vehicleType}',
      photosAndContact: 'Фотографии и контакт информации',
      photosAndContactDescription: 'Додајте фотографии и ваши контакт податоци',
      vehicleDetails: 'Детали за автомобилот',
      photosAndContactInfo: 'Фотографии и контакт информации',
      uploadVehiclePhotos: 'Прикачи фотографии од автомобилот',
      addUpToTenPhotos: 'Додај до 10 фотографии'
    },

    // Form fields and labels

    // Placeholders

    // Button labels
    buttons: {
      nextStep: 'Следен чекор',
      previous: 'Претходно',
      createListing: 'Создај оглас'
    },

    // Preview section
    preview: {
      title: 'Преглед',
      yourVehicle: 'Вашето возило',
      milesLabel: 'километри',
      priceLabel: 'Цена',
      photosCount: '{count} фотографи{plural}',
      photo: 'ја',
      photos: 'и'
    },

    // Photo upload
    photos: {
      instruction: 'Додајте до 10 високо квалитетни фотографии од вашето возило. Првата фотографија ќе биде главната слика во резултатите од пребарувањето.',
      selected: '{count} фото{plural} избрани',
      photo: 'ја',
      photos: 'и'
    },

    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],

    // Fuel types
    fuelTypes: {
      gasoline: 'Бензин',
      electric: 'Електричен',
      hybrid: 'Хибрид',
      diesel: 'Дизел',
      pluginHybrid: 'Приклучлив хибрид',
      flexFuel: 'Флекс гориво',
      cng: 'КПГ',
      lpg: 'ТНГ'
    },

    // Transmissions
    transmissions: {
      automatic: 'Автоматски',
      manual: 'Рачен',
      cvt: 'CVT'
    },

    // Body Types
    bodyTypes: {
      sedan: 'Седан',
      suv: 'SUV',
      truck: 'Камион',
      coupe: 'Купе',
      hatchback: 'Хечбек',
      convertible: 'Кабриолет',
      wagon: 'Караван',
      van: 'Фургон',
      crossover: 'Кросовер'
    },

    // Drivetrains
    drivetrains: {
      fwd: 'Преден погон',
      rwd: 'Заден погон',
      awd: 'Погон на сите тркала',
      fourwd: 'Погон 4x4'
    },

    // Colors
    colors: {
      black: 'Црна',
      white: 'Бела',
      silver: 'Сребрена',
      gray: 'Сива',
      red: 'Црвена',
      blue: 'Сина',
      green: 'Зелена',
      brown: 'Кафена',
      gold: 'Златна',
      orange: 'Портокалова',
      purple: 'Виолетова',
      yellow: 'Жолта'
    },

    // Conditions
    conditions: {
      new: 'Нова',
      likeNew: 'Како нова',
      excellent: 'Одлична',
      veryGood: 'Многу добра',
      good: 'Добра',
      fair: 'Задоволителна',
      poor: 'Лоша'
    },

    // Features list
  },

  countries: {
    northMacedonia: 'Северна Македонија',
    albania: 'Албанија',
    kosovo: 'Косово',
    slovenia: 'Словенија',
    latvia: 'Латвија',
    global: 'Глобално',
    chooseCountry: 'Изберете ја вашата земја',
    changeCountry: 'Смени земја',
    detectedLocation: 'Откриена локација',
    currentSite: 'Тековен сајт',
    localBenefits: 'Локални бенефиции',
    localCurrency: 'Локална валута и цени',
    localLanguages: 'Поддршка на родниот јазик',
    localDealers: 'Локални дилери и инвентар',
    regionalFeatures: 'Регионални особености'
  },
  business: {
    qualityUsedCars: 'Квалитетни употребувани автомобили од',
    registeredDealers: 'регистрирани дилери'
  },
  redirect: {
    welcome: 'Добредојдовте на CarMarket365!',
    detectedFrom: 'Откриваме дека пристапувате од',
    redirectMessage: 'Ќе бидете пренасочени кон нашиот {country} сајт за подобро локално искуство, или можете да изберете друга земја.',
    continueToSite: 'Продолжи кон {country} сајтот',
    chooseDifferent: 'Избери друга земја',
    localBenefitsTitle: 'Локални бенефиции за {country}',
    howDetected: 'Како го откриваме ова?',
    hideDetails: 'Скриј детали',
    showDetails: 'Како го откриваме ова?',
    changeAnytime: 'Можете да го смените преференцето за земја во секое време во заглавието.',
    countrySpecificExperience: 'Секој земјин сајт нуди локализирана содржина, цени и јазични опции за подобро искуство.',
    adminTestingMode: 'Режим на администратор/тестирање',
    adminNotAvailable: 'Режим на администратор/тестирање - недостапен за клиенти',
    selectCountryToContinue: 'Ве молиме изберете ја вашата земја за да продолжите. Ова ќе го определи вашиот локален сајт, јазик и валута.'
  },


  footer: {
    aboutUs: 'Вашиот доверлив пазар за квалитетни половни автомобили. Најдете го вашиот идеален автомобил меѓу илјадници огласи.',
    quickLinks: 'Брзи врски',
    searchCars: 'Пребарај автомобили',
    sellYourCar: 'Продај го твојот автомобил',
    registeredDealers: 'Регистрирани дилери',
    carReviews: 'Рецензии за автомобили',
    support: 'Поддршка',
    contactUs: 'Контактирај не',
    safetyTips: 'Совети за безбедност',
    dealerSupport: 'Поддршка за дилери',
    faq: 'Често поставувани прашања',
    legal: 'Правни информации',
    privacyPolicy: 'Политика за приватност',
    termsOfService: 'Услови на користење',
    cookiePolicy: 'Политика за колачиња',
    imprint: 'Импресум',
    accessibility: 'Пристапност',
    dashboard: 'Контролна табла',
    adminPanel: 'Администраторска табла',
    dealerDashboard: 'Дилерска контролна табла',
    myDashboard: 'Мојата контролна табла',
    signInToAccess: 'Најавете се за пристап до контролната табла',
    followUs: 'Следете не',
    newsletter: 'Билтен',
    subscribeNewsletter: 'Претплатете се на билтенот',
    emailAddress: 'Е-пошта адреса',
    subscribe: 'Претплати се',
    copyright: 'Авторски права',
    allRightsReserved: 'Сите права се задржани'
  },

  errors: {
    generic: 'Нешто тргна наопаку. Ве молиме обидете се повторно.',
    network: 'Мрежна грешка. Ве молиме проверете ја вашата конекција.',
    notFound: 'Бараната ставка не е најдена.',
    unauthorized: 'Немате дозвола за пристап до овој ресурс.',
    forbidden: 'Пристапот до овој ресурс е забранет.',
    serverError: 'Серверска грешка. Ве молиме обидете се повторно подоцна.',
    validation: 'Ве молиме проверете ги вашите податоци и обидете се повторно.',
    required: 'Ова поле е задолжително.',
    invalidEmail: 'Ве молиме внесете валидна е-пошта адреса.',
    invalidPhone: 'Ве молиме внесете валиден телефонски број.',
    passwordTooShort: 'Лозинката мора да има најмалку 8 знаци.',
    passwordMismatch: 'Лозинките не се совпаѓаат.',
    fileTooBig: 'Големината на фајлот е премногу голема.',
    invalidFileType: 'Невалиден тип на фајл.',
    noInternetConnection: 'Нема интернет конекција.',
    sessionExpired: 'Вашата сесија истече. Ве молиме најавете се повторно.',
    errorBoundary: {
      message: 'Нешто тргна наопаку. Ве молиме обидете се да ја освежите страницата.',
      details: 'Детали за грешката',
      stackTrace: 'Стек трага:',
      refreshPage: 'Освежи страница',
      tryAgain: 'Обиди се повторно'
    }
  },


  admin: {
    panel: 'Администраторска табла',
    dashboard: 'Администраторска контролна табла'
  },

  pages: {
    helpCenter: 'Центар за помош',
    feedback: 'Повратни информации',
    disclaimer: 'Одрекување од одговорност',
    carInsurance: 'Автомобилско осигурување',
    underConstruction: 'Во изградба',
    underConstructionMessage: 'Оваа страница е во изградба. Напорно работиме на создавање неверојатни функции. Ве молиме зајдете подоцна или продолжете со истражување на нашата главна страница.',
    backToHome: 'Назад на почетна',
    contactUs: 'Контактирај не',

    // Terms of Service
    termsOfService: {
      title: 'Услови на користење',
      subtitle: 'Правните услови за користење на нашата платформа за автомобилски пазар.',
      backToHome: 'Назад на почетна',
      termsAndConditions: 'Услови и одредби',
      termsDescription: 'Ве молиме внимателно прочитајте ги овие услови пред користење на нашата платформа.',
      overviewText: 'Овие Услови на користење го регулираат вашето користење на платформата CarMarket365 и ги дефинираат правата и обврските на сите корисници. Со пристапување на нашата платформа, се согласувате да ги почитувате овие услови.',
      userResponsibilities: 'Обврски на корисникот',
      userResponsibilitiesList: [
        'Обезбедување точни информации',
        'Одржување почитувана комуникација',
        'Почитување на сите применливи закони',
        'Заштитување на податоците од вашиот профил'
      ],
      platformRules: 'Правила на платформата',
      platformRulesList: [
        'Забранети се измамнички огласи',
        'Честни описи на возилата',
        'Професионална комуникација',
        'Почитување на приватноста на другите корисници'
      ],
      serviceLimitations: 'Ограничувања на услугите',
      serviceLimitationsList: [
        'Достапноста на платформата не е гарантирана',
        'Техничко одржување може да предизвика прекини',
        'Ограничена одговорност за дејства на корисниците',
        'Отсуство на гаранции за содржини од трети страни'
      ],
      disputeResolution: 'Решавање спорови',
      disputeResolutionList: [
        'Се поттикнува директна комуникација',
        'Достапно е посредување на платформата',
        'Дефинирани се процедури за ескалација',
        'Се задржуваат правните средства за заштита'
      ],
      additionalTerms: 'Дополнителни важни услови',
      additionalTermsDescription: 'Клучни одредби што го регулираат користењето на нашата платформа.',
      accountManagement: 'Управување со профил',
      accountManagementList: [
        'Еден профил по лице',
        'Барања за безбедност на лозинка',
        'Политики за суспендирање профил',
        'Чување податоци по прекинување'
      ],
      intellectualProperty: 'Интелектуална сопственост',
      intellectualPropertyList: [
        'Сопственост на содржината на платформата',
        'Права на корисничката содржина',
        'Препораки за користење трговски марки',
        'Политики за нарушување авторски права'
      ],
      questionsAboutTerms: 'Прашања за овие услови?',
      questionsText: 'Ако имате прашања за овие услови или ви требаат појаснувања за некои одредби, ве молиме контактирајте го нашиот правен тим на legal@carmarket365.com',
      returnToPlatform: 'Назад на платформата',
      contactLegalTeam: 'Контактирај го правниот тим'
    },

    // Privacy Policy
    privacyPolicy: {
      title: 'Политика за приватност',
      subtitle: 'Вашата приватност е важна за нас. Дознајте како ги собираме, користиме и заштитуваме вашите лични информации.',
      backToHome: 'Назад на почетна',
      ourPrivacyCommitment: 'Нашите обврски за приватност',
      commitmentDescription: 'Во CarMarket365 сме посветени на заштитување на вашата приватност и обезбедување безбедност на вашите лични информации.',
      overviewText: 'Оваа политика за приватност објаснува како ги собираме, користиме, откриваме и заштитуваме вашите информации при користење на нашата платформа за автомобилски пазар. Посветени сме на одржување највисоки стандарди за заштита на приватноста и безбедност на податоците.',
      dataSecurity: 'Безбедност на податоците',
      dataSecurityList: [
        'Шифрирање според индустриски стандарди',
        'Безбедна трансмисија на податоци',
        'Редовни аудити за безбедност',
        'Ограничена контрола на пристап'
      ],
      transparency: 'Транспарентност',
      transparencyList: [
        'Јасни практики за собирање податоци',
        'Отвореност за користење податоци',
        'Редовни ажурирања на политиката',
        'Известување корисници за промени'
      ],
      userRights: 'Права на корисниците',
      userRightsList: [
        'Пристап до вашите податоци',
        'Право на исправка на информации',
        'Барања за бришење податоци',
        'Одбивање од комуникации'
      ],
      dataMinimization: 'Минимизација на податоци',
      dataMinimizationList: [
        'Собирање само потребни податоци',
        'Користење според намената',
        'Автоматско истекување податоци',
        'Редовно чистење податоци'
      ],
      informationWeCollect: 'Информации што ги собираме',
      informationDescription: 'Ги собираме информациите што ги обезбедувате директно и автоматски при користење на нашата платформа.',
      personalInformation: 'Лични информации',
      personalInformationList: [
        'Име и контакт податоци',
        'Информации за регистрација на профил',
        'Преференции за комуникација',
        'Информации за профилот'
      ],
      usageData: 'Податоци за користење',
      usageDataList: [
        'Податоци за интеракција со веб-сајтот',
        'Историја на пребарување и прегледување',
        'Информации за уред и прелистувач',
        'Податоци за локација (кога е дозволено)'
      ],
      questionsAboutPrivacy: 'Прашања за приватноста?',
      privacyQuestionsText: 'Ако имате прашања за оваа политика за приватност или нашите практики за обработка на податоци, ве молиме контактирајте го нашиот тим за приватност на privacy@carmarket365.com',
      returnToPlatform: 'Назад на платформата',
      contactPrivacyTeam: 'Контактирај го тимот за приватност'
    },

    // Placeholder page
    placeholder: {
      underConstruction: 'Во изградба',
      underConstructionMessage: 'Оваа страница е во изградба. Напорно работиме на создавање неверојатни функции. Ве молиме зајдете подоцна или продолжете со истражување на нашата главна страница.',
      backToHome: 'Назад на почетна',
      contactUs: 'Контактирај не'
    },

    // FAQ
    faq: {
      title: 'Често поставувани прашања',
      subtitle: 'Најдете одговори на честите прашања за купување, продажба, финансирање и користење на CarMarket365.',
      searchPlaceholder: 'Пребарај во FAQ...',
      browseByCategory: 'Прелистај по категории',
      allQuestions: 'Сите прашања',
      stillNeedHelp: 'Треба ви дополнителна помош?',
      stillNeedHelpDescription: 'Не можете да најдете она што го барате? Нашиот тим за поддршка е спремен да помогне.',
      callSupport: 'Повикај поддршка',
      emailUs: 'Испрати ни е-пошта',
      liveChat: 'Жив разговор',
      available247: 'Достапно 24/7',
      noResultsFound: 'Нема најдени резултати',
      noResultsText: 'Обидете се со пребарување со други клучни зборови или прелистајте по категории.',
      clearSearch: 'Исчисти пребарување',
      commonQuestionsAbout: 'Често поставувани прашања за',

      categories: {
        buying: 'Купување автомобили',
        selling: 'Продажба автомобили',
        financing: 'Финансирање и плаќања',
        safety: 'Безбедност и заштита',
        account: 'Профил и поддршка'
      },

      buyingFaqs: [
        {
          question: 'Како да најдам автомобили на CarMarket365?',
          answer: 'Можете да пребарувате автомобили користејќи го формуларот за пребарување на главната страница или на страницата "Прелистај автомобили". Филтрирајте по марка, модел, година, ценовен опсег, локација и многу повеќе. Користете го напредниот пребарај за детална филтрација.'
        },
        {
          question: 'Дали сите огласи се верификувани?',
          answer: 'Да, сите огласи на CarMarket365 се верификувани. Спроведуваме проверки на заднината на сите дилери и приватни продавачи, како и верификуваме информации за возилата за точност пред објавување.'
        },
        {
          question: 'Можам ли да закажам тест возење?',
          answer: 'Секако! Можете да закажете тест возење директно од страницата со детали за автомобилот. Контактирајте го продавачот за да се договорите за соодветно време и место за тест возењето.'
        },
        {
          question: 'Што да понесам за гледање автомобил?',
          answer: 'Понесете важечка возачка дозвола, потврда за осигурување и било какви писма за предодобрување за финансирање. Ако планирате да купувате, понесете банкарски чек или документи за финансирање.'
        },
        {
          question: 'Како да знам дали цената на автомобилот е фер?',
          answer: 'Ние обезбедуваме проценки на пазарната вредност за сите возила. Можете исто така да споредите слични автомобили, да проверите извештај за историјата на возилото и да ги користите нашите алатки за анализа на цени.'
        }
      ],

      sellingFaqs: [
        {
          question: 'Како да објавам оглас за мојот автомобил?',
          answer: 'Користете го формуларот "Продај автомобил" за создавање оглас. Ќе ви требаат детали за возилото, фотографии, информации за состојбата и контакт податоци. Процесот трае околу 10-15 минути.'
        },
        {
          question: 'Дали има надоместок за објавување оглас?',
          answer: 'Основните огласи се бесплатни за приватни продавачи. Ние нудиме премиум опции за огласи со зголемена видливост за мала надоместок. Дилерите имаат различни структури на цени.'
        },
        {
          question: 'Колку време е потребно да се продаде автомобил?',
          answer: 'Во просек, автомобилите со правилна цена и добри фотографии се продаваат за 2-4 недели. Факторите вклучуваат ценообразување, состојба, пазарна побарувачка и квалитет на огласот.'
        },
        {
          question: 'Кои документи ми требаат за продажба на автомобил?',
          answer: 'Ќе ви требаат уверение за сопственост, регистрација, записи за одржување и важечка лична карта. Во некои региони се потребни дополнителни документи - ние обезбедуваме регионални препораки.'
        },
        {
          question: 'Како да поставам конкурентна цена на мојот автомобил?',
          answer: 'Користете ја нашата бесплатна алатка за процена на возила, истражувајте слични огласи, земете ја предвид состојбата на вашиот автомобил, пробегот и било какви неодамнешни поправки или подобрувања.'
        }
      ],

      financingFaqs: [
        {
          question: 'Можам ли да добијам финансирање преку CarMarket365?',
          answer: 'Да, соработуваме со неколку кредитори за да понудиме конкурентни опции за финансирање. Можете да добиете предодобрување онлајн за неколку минути без влијание врз вашиот кредитен рејтинг.'
        },
        {
          question: 'Кој кредитен рејтинг ми е потребен за автомобилски кредит?',
          answer: 'Работиме со кредитори кои прифаќаат различни кредитни рејтинзи, од одлични до лоши. Барањата варираат по кредитори, но ние помагаме да се најдат опции за повеќето ситуации.'
        },
        {
          question: 'Како функционира процесот на аплицирање за кредит?',
          answer: 'Пополнете ја нашата онлајн апликација, добијте моментално предодобрување, изберете го вашето возило и завршете го оформувањето на кредитот. Целиот процес може да се заврши онлајн или по телефон.'
        },
        {
          question: 'Која е разликата меѓу предквалификација и предодобрување?',
          answer: 'Предквалификацијата ви дава процена врз основа на основни информации. Предодобрувањето вклучува проверка на кредитната историја и обезбедува цврста кредитна понуда со конкретни услови.'
        },
        {
          question: 'Можам ли да го заменам мојот тековен автомобил?',
          answer: 'Многу од нашите партнерски дилери прифаќаат автомобили во замена. Добијте процена на заменката со нашата алатка за процена, потоа дискутирајте опции со дилерот при купување.'
        }
      ],

      safetyFaqs: [
        {
          question: 'Како да останам безбеден при купување автомобил?',
          answer: 'Средбите прави на јавни места, земи пријател, провери го идентитетот на продавачот, внимателно прегледај го возилото и користи безбедни начини на плаќање. Никогаш не прави трансфер на пари или не плаќај пред да го видиш автомобилот.'
        },
        {
          question: 'Кои начини на плаќање се најбезбедни?',
          answer: 'Користи банкарски чекови, банкарски трансфери или финансирање преку верификувани кредитори. Избегнувај банкарски трансфери, лични чекови или готовина за големи суми.'
        },
        {
          question: 'Како да проверам дали продавачот е легитимен?',
          answer: 'Провери го нивниот профил на CarMarket365, прочитај рецензии, потврди ги нивните контакт информации и средби се лично. Сите наши дилери се предходно проверени и поминале проверки на заднината.'
        },
        {
          question: 'Што да правам ако сомневам измама?',
          answer: 'Веднаш пријави сомнителна активност преку нашата платформа или контактирај го нашиот тим за поддршка. Ние сериозно се однесуваме кон измамите и брзо истражуваме сите пријави.'
        },
        {
          question: 'Дали извештаите за историјата на возилото се веродостојни?',
          answer: 'Да, ние обезбедуваме сеопфатни извештаи за историјата на возилата од веродостојни извори. Тие вклучуваат историја на несреќи, записи за одржување и информации за сопственост.'
        }
      ],

      accountFaqs: [
        {
          question: 'Како да создадам профил?',
          answer: 'Кликни "Регистрирај се" на било која страница и обезбеди ја твојата е-пошта адреса, телефонски број и основни информации. Можеш исто да се регистрираш преку Google или Facebook за побрза регистрација.'
        },
        {
          question: 'Ја заборавив лозинката. Како да ја ресетирам?',
          answer: 'Кликни "Заборавена лозинка?" на страницата за најавување, внеси ја твојата е-пошта адреса и следи ги инструкциите за ресетирање што ќе ти ги пратиме. Врската за ресетирање важи 24 часа.'
        },
        {
          question: 'Како да ги ажурирам информациите во мојот профил?',
          answer: 'Најави се во твојот профил и оди во "Поставки на профил", каде што можеш да ги ажурираш личните информации, контакт податоците и преференциите.'
        },
        {
          question: 'Можам ли да зачувам автомобили за гледање подоцна?',
          answer: 'Да! Кликни на иконката со срце на било кој оглас за автомобил за да го зачуваш во омилени. Пристапи до зачуваните автомобили во секое време од контролната табла на твојот профил.'
        },
        {
          question: 'Како да контактирам со поддршката?',
          answer: 'Користи ја страницата "Контактирај не", повикај (555) 123-ПОМОШ, испрати е-пошта на support@carmarket365.com или користи ја функцијата за разговор во долниот десен агол на било која страница.'
        }
      ]
    }
  },

  // Browse Cars Page
  browseCars: {
    title: 'Автомобили на продажба',
    searchPlaceholder: 'Марка, модел или клучен збор',
    filtersButton: 'Прикажи филтри',
    sortBy: 'Сортирај по',
    sortOptions: {
      relevance: 'Релевантност',
      priceLowToHigh: 'Цена: од ниска кон висока',
      priceHighToLow: 'Цена: од висока кон ниска',
      yearNewestFirst: 'Година: нови прво',
      yearOldestFirst: 'Година: стари прво',
      mileageLowToHigh: 'Пробег: од мал кон голем',
      mileageHighToLow: 'Пробег: од голем кон мал',
      addedRecently: 'Неодамна додадени'
    },
    viewOptions: {
      grid: 'Мрежа',
      list: 'Листа'
    },
    carCard: {
      viewDetails: 'Погледни детали',
      contactSeller: 'Контактирај',
      saveToFavorites: 'Зачувај во омилени',
      saved: 'Зачувано',
      featured: 'Препорачано',
      certified: 'Сертифицирано',
      newArrival: 'Ново пристигнување',
      priceReduced: 'Намалена цена',
      greatDeal: 'Одлична понуда',
      kmAbbrev: 'км',
      miAbbrev: 'ми',
      year: 'година',
      automatic: 'Автоматски',
      manual: 'Рачен',
      gasoline: 'Бензин',
      diesel: 'Дизел',
      electric: 'Електричен',
      hybrid: 'Хибрид',
      showPhone: 'Прикажи телефон',
      hidePhone: 'Скриј телефон',
      callNow: 'Повикај сега',
      sendMessage: 'Испрати порака',
      scheduleTour: 'Закажи разгледување',
      reportListing: 'Пријави оглас',
      shareListing: 'Сподели оглас'
    },
    searchSuggestions: {
      title: 'Предлози за пребарување',
      recentSearches: 'Неодамнешни пребарувања',
      clearRecent: 'Исчисти неодамнешни',
      popularSearches: 'Популарни пребарувања',
      suggestedBrands: 'Предложени марки',
      suggestedModels: 'Предложени модели',
      noRecentSearches: 'Нема неодамнешни пребарувања'
    },
    errorStates: {
      failedToLoad: 'Неуспешно вчитување',
      networkError: 'Мрежна грешка',
      tryAgain: 'Обиди се повторно',
      contactSupport: 'Контактирај поддршка'
    }
  },

  // Advanced Search

  // Contact page
  contact: {
    departments: {
      title: 'Изберете го вашето одделение'
    },
    departmentTypes: {
      general: 'Општи прашања',
      buying: 'Помош за купување',
      selling: 'Поддршка за продажба',
      technical: 'Техничка поддршка',
      dealer: 'Дилерски услуги',
      feedback: 'Повратни информации'
    },
    hours: {
      title: 'Работно време',
      timeRange: {
        weekdays: 'Понеделник - Петок: 8:00 - 20:00',
        saturday: 'Сабота: 9:00 - 17:00',
        sunday: 'Недела: 10:00 - 16:00'
      }
    },
    office: {
      title: 'Наша канцеларија',
      address: {
        street: 'Македонија бб',
        city: 'Скопје 1000',
        country: 'Северна Македонија'
      }
    },
    quickHelp: {
      title: 'Брза помош',
    },
    
    registeredDealers: {
      dealers: {
        automaxpremium: 'АвтоМакс Премиум',
        citymotorsgmbh: 'Сити Моторс ГмбХ',
        ecowheelshamburg: 'ЕкоВилс Хамбург',
        rheinautosolutions: 'Рајн Авто Решенија'
      }
    }
  },

  // Report listing and share
  reportListing: 'Пријави оглас',
  shareListing: 'Сподели оглас',
  sendMessage: 'Испрати порака',
  yourName: 'Вашето име',
  yourPhone: 'Вашиот телефон',
  interestedIn: 'Заинтересиран сум за',
  additionalNotes: 'Дополнителни забелешки',

  share: {
    copyLink: 'Копирај врска',
    linkCopied: 'Врската е копирана!',
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    twitter: 'Twitter'
  },





  // Dashboard sections (simplified versions for now)
  dealerDashboard: {
    overview: {
      stats: {
        activeListings: {
          title: 'Активни огласи',
          value: '24'
        },
        totalViews: {
          title: 'Вкупно прегледи',
          value: '1,247'
        },
        inquiries: {
          title: 'Барања',
          value: '18'
        },
        revenue: {
          title: 'Приходи',
          value: '€45,230'
        }
      }
    }
  },

  adminDashboard: {
  },

  // Car detail page sections
  carDetail: {
    seller: {
      title: 'Продавач',
      dealer: 'Дилер',
      private: 'Приватен',
      rating: 'Рејтинг',
      reviews: 'рецензии'
    }
  },

  // Продај возило
  // Private Dashboard
  privateDashboard: {
    title: 'Мој контролен панел',
    subtitle: 'Управувај со твоите огласи за возила и корисничка сметка',
    welcome: 'Добредојде',
    savedCars: 'Зачувани автомобили',
    lastSearch: 'Последно пребарување',
    search: 'Пребарување',
    yourListings: 'Вашите огласи',
    expressSale: 'Експресна продажба',
    express: 'Експресна продажба',
    contact: 'Контакт',
    settings: 'Поставки',
    saved: 'Зачувани',
    viewDetails: 'Погледни детали',
    remove: 'Отстрани',
    startNewSearch: 'Започни ново пребарување',
    viewMyListings: 'Погледни ги моите огласи',
    savedOn: 'Зачувано на',
    welcomeBack: 'Добредојде назад',
    manageExperience: 'управувајте со вашето искуство на пазарот за автомобили',
    // Last Search Tab
    lastSearches: 'Неодамнешни пребарувања',
    recentSearchHistory: 'Вашата историја на неодамнешни пребарувања и зачувани пребарувања',
    newSearch: 'Ново пребарување',
    resultsFound: 'резултати најдени',
    searchedOn: 'Пребарано на',
    searchAgain: 'Пребарај повторно',
    viewResults: 'Погледни резултати',
    results: 'Резултати',
    // User Listings Tab
    myListings: 'Мои огласи',
    carsListedForSale: 'Автомобили што ги имате ставено на продажба',
    createNewListing: 'Создај нов оглас',
    newListing: 'Нов оглас',
    views: 'прегледи',
    inquiries: 'прашања',
    listed: 'Поставен на',
    edit: 'Уреди',
    view: 'Погледни',
    delete: 'Избриши',
    // Express Sale Tab
    expressSaleListings: 'Огласи за експресна продажба',
    quickSaleRequests: 'Брзи барања за продажба поднесени до дилери',
    newExpressSale: 'Нова експресна продажба',
    newExpress: 'Нова експресна',
    underReview: 'Во разгледување',
    photos: 'фотографии',
    estimatedValue: 'Проценета вредност:',
    submittedOn: 'Поднесено на',
    // Contact Details Tab
    contactDetails: 'Контакт детали',
    manageContactInfo: 'Управувај со твоите контакт информации и профил',
    personalInformation: 'Лични информации',
    updateProfileDetails: 'Ажурирај ги деталите на твојот профил',
    changePhoto: 'Смени фотографија',
    firstName: 'Име',
    lastName: 'Презиме',
    emailAddress: 'Е-пошта',
    phoneNumber: 'Телефонски број',
    city: 'Град',
    country: 'Земја',
    saveChanges: 'Зачувај измени',
    // Account Settings Tab
    accountSettings: 'Поставки на сметката',
    manageAccountPreferences: 'Управувај со поставките на сметката и приватноста',
    notifications: 'Известувања',
    configureNotifications: 'Конфигурирај како ги примаш известувањата',
    emailNotifications: 'Е-пошта известувања',
    receiveUpdatesViaEmail: 'Примај ажурирања преку е-пошта',
    newListingsAlerts: 'Предупредувања за нови огласи',
    notifyNewCarsMatching: 'Добивај известувања за нови автомобили што се совпаѓаат со твоите пребарувања',
    priceDropAlerts: 'Предупредувања за намалување на цени',
    notifyPriceDrops: 'Добивај известувања кога цените на зачуваните автомобили ќе паднат',
    inquiryNotifications: 'Известувања за прашања',
    notifyInquiries: 'Добивај известувања за прашања на твоите огласи',
    privacySettings: 'Поставки за приватност',
    controlPrivacyPreferences: 'Контролирај ги твоите поставки за приватност и споделување на податоци',
    profileVisibility: 'Видливост на профилот',
    makeProfileVisible: 'Направи го твојот профил видлив за другите корисници',
    showContactInfo: 'Прикажи контакт информации',
    displayContactOnListings: 'Прикажи ги твоите контакт информации на огласите',
    dataAnalytics: 'Аналитика на податоци',
    helpImproveService: 'Помогни ни да ја подобриме нашата услуга со аналитика на користењето',
    accountManagement: 'Управување со сметката',
    manageAccountAndData: 'Управувај со твојата сметка и податоци',
    downloadMyData: 'Преземи ги моите податоци',
    changePassword: 'Смени лозинка',
    deleteAccount: 'Избриши сметка',
    // Success/Error Messages
    profileUpdatedSuccessfully: 'Профилот е успешно ажуриран!',
    carRemovedFromSaved: 'Автомобилот е отстранет од зачувани!',
    listingDeletedSuccessfully: 'Огласот е успешно избришан!'
  },

  savedCars: {
    title: 'Зачувани автомобили',
    subtitle: 'Управувај со твоите омилени автомобили и листата на желби',
    filterBySavedDate: 'Филтрирај по датум на зачувување',
    filterByPriceRange: 'Филтрирај по ценовен опсег',
    sortBy: 'Подреди по',
    newest: 'Најновите',
    oldest: 'Најстарите',
    priceLowToHigh: 'Цена: Од ниска кон висока',
    priceHighToLow: 'Цена: Од висока кон ниска',
    noSavedCars: 'Немате зачувани автомобили',
    startBrowsing: 'Започнете да разгледувате автомобили за да ги зачувате своите омилени',
    browseVehicles: 'Разгледај автомобили',
    savedOn: 'Зачувано на',
    removeFromSaved: 'Отстрани од зачувани',
    viewDetails: 'Погледни детали',
    contactDealer: 'Контактирај',
    scheduleViewing: 'Закажи разгледување',
    compareVehicles: 'Спореди автомобили',
    selectToCompare: 'Избери автомобили за споредба',
    compare: 'Спореди',
    clearSelection: 'Исчисти избор',
    clearAll: 'Исчисти сё',
    back: 'Назад',
    carsSaved: 'автомобили зачувани',
    recentlySaved: 'Неодамна зачувани',
    yearNewestFirst: 'Година: Нови прво',
    yearOldestFirst: 'Година: Стари прво',
    filterPlaceholder: 'Филтрирај по',
    allCars: 'Сите автомобили',
    savedThisWeek: 'Зачувани оваа недела',
    savedDate: 'Зачувано на',
    contact: 'Контакт',
    view: 'Погледни'
  },


  sellVehicle: {
    title: 'Продај го вашето возило',
    subtitle: 'Создај детален оглас за вашето возило',
    stepIndicator: 'Чекор {current} од {total}',
    basicInfo: 'Основни информации',
    vehicleDetails: 'Детали за возилото',
    photosUpload: 'Прикачи слики',
    pricing: 'Ценообразување',
    review: 'Прегледај и објави',
    
    // Основни информации
    make: 'Марка',
    model: 'Модел',
    year: 'Година',
    mileage: 'Пробег',
    km: 'км',
    condition: 'Состојба',
    conditionOptions: {
      excellent: 'Одлична',
      good: 'Добра',
      fair: 'Задоволителна',
      poor: 'Лоша'
    },
    fuelType: 'Тип на гориво',
    transmission: 'Трансмисија',
    transmissionTypes: {
      manual: 'Мануелна',
      automatic: 'Автоматска',
      semiautomatic: 'Полу-автоматска'
    },
    bodyType: 'Тип на каросерија',
    
    // Детали за возилото
    engineSize: 'Зафатнина на мотор',
    horsepower: 'Коњски сили',
    color: 'Боја',
    numberOfDoors: 'Број на врати',
    numberOfSeats: 'Број на седишта',
    features: 'Спецификации',
    safetyFeatures: 'Безбедносни карактеристики',
    description: 'Опис',
    descriptionPlaceholder: 'Опишете го вашето возило, неговата историја, состојба...',
    
    // Слики
    uploadPhotos: 'Прикачи слики',
    dragDropPhotos: 'Повлечете и пуштете слики тука, или кликнете за избор',
    maxPhotos: 'Максимум 20 слики',
    photoRequirements: 'Барања за слики',
    requirementsList: [
      'Висок квалитет (минимум 800x600 пиксели)',
      'JPG, PNG или WebP формат',
      'Максимум 5MB по слика',
      'Слики од сите страни на возилото',
      'Слики од внатрешноста',
      'Слики од моторот и километражата'
    ],
    
    // Ценообразување
    askingPrice: 'Барана цена',
    marketValue: 'Пазарна вредност',
    priceAnalysis: 'Анализа на цена',
    competitive: 'Конкурентна',
    aboveMarket: 'Над пазарната',
    belowMarket: 'Под пазарната',
    negotiable: 'Договорна',
    contactPreferences: 'Преференци за контакт',
    allowPhoneCalls: 'Дозволи телефонски повици',
    allowMessages: 'Дозволи пораки',
    allowEmails: 'Дозволи е-пошти',
    
    // Преглед
    reviewListing: 'Прегледај оглас',
    publishListing: 'Објави оглас',
    saveDraft: 'Зачувај нацрт',
    termsAndConditions: 'Услови и одредби',
    agreeToTerms: 'Се согласувам со условите и одредбите',
    
    // Пораки
    listingPublished: 'Огласот е успешно објавен!',
    draftSaved: 'Нацртот е зачуван',
    errorSaving: 'Грешка при зачувување на огласот',
    continue: 'Продолжи',
    previous: 'Претходно',
    next: 'Следно'
  },

  // Additional sections for complete coverage
  indexPage: {
    quickFilters: {
      title: 'Брзи филтри',
      newCars: 'Нови автомобили',
      usedCars: 'Половни автомобили',
      electric: 'Електрични',
      luxury: 'Луксузни'
    },
  },


  legal: {
    accessibility: {
      title: 'Изјава за пристапност',
      commitment: 'Нашата посветеност на пристапноста'
    },
    cookies: {
      title: 'Политика за колачиња',
      essential: 'Основни колачиња',
      functional: 'Функционални колачиња',
      analytics: 'Аналитички колачиња',
      marketing: 'Маркетинг колачиња'
    }
  },

  navigation: {
    backToHome: 'Назад на почетна'
  },

  // Advanced Search specific translations  
  fields: {
    previousOwners: 'Претходни сопственици',
    hadAccident: 'Имал несреќа',
    interiorColor: 'Боја на ентериер',
    upholstery: 'Тапацирање'
  },
  labels: {
    owner: 'сопственик',
    ownerPlural: 'и'
  },
  placeholders: {
    anyMaterial: 'Било кој материјал',
    anyColor: 'Било која боја'
  }
};