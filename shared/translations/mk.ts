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
    search: 'Пребарувај',
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
    currency: 'EUR',
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
      contactMessage: 'Здраво, сум заинтересиран за {year} {make} {model}. Ве молам контактирајте ме за повеќе детали.',
      egFiftyThousand: 'пр. 50.000 км'
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
      subtitle: 'Ставете го вашиот автомобил на продажба за минути со нашиот брз процес на продажба',
      backToHome: 'Назад на почетна',
      step: 'Чекор',
      of: 'од',
      carDetails: 'Детали за автомобилот',
      carDetailsDescription: 'Кажете ни за вашиот автомобил за да создадеме атрактивен оглас',
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
      enterMileage: 'Внесете километража',
      kilometers: 'километри',
      fuelType: 'Тип на гориво',
      fuelTypeRequired: 'Тип на гориво *',
      selectFuelType: 'Изберете тип на гориво',
      gasoline: 'Бензин',
      diesel: 'Дизел',
      electric: 'Електричен',
      hybrid: 'Хибрид',
      transmission: 'Менувач на брзини',
      transmissionRequired: 'Менувач на брзини *',
      selectTransmission: 'Изберете менувач на брзини',
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
      successMessage: 'Вашето возило е успешно објавено!',
      requiredField: 'Ова поле е задолжително',
    },
    financing: {
      title: 'Добијте претходно одобрување за финансирање',
      description: 'Добијте претходно одобрување за финансирање на возила во минути',
      badges: {
        financingAvailable: 'Финансирање достапно'
      },
      employmentStatus: {
        retired: 'Пензиониран',
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
    subtitle: 'Прегледај низ илјадници квалитетни половни возила',
    searchButton: 'Најди автомобили',
    advancedSearch: 'Напредно пребарување',
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
      anyMileage: 'Кој било километража',
      maxMileage: 'Макс километража',
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
        title: 'Напредно пребарување',
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
    description: 'Прегледај автомобили од најпопуларните производители',
    carsCount: 'автомобили'
  },

  header: {
    welcome: 'Добредојдовте на CarMarket365',
    signIn: 'Најави се',
    signOut: 'Одјави се',
    myAccount: 'Мојот профил',
    dashboard: 'Контролна табла',
    home: 'Дома',
    browseCars: 'Прегледај автомобили',
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
    vin: 'ВИН код',
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
    viewAllCars: 'Погледни ги сите автомобили',
    noFeaturedCars: 'Нема достапни препорачани автомобили',
    noFeaturedCarsDescription: 'Проверете повторно наскоро за нови препорачани огласи, или прегледајте ги сите достапни автомобили.',
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
    mileageMax: 'Макс километража',
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
    professionalDashboard: '• Професионална дилерска контролен панел',
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
      redirectingToDashboard: 'Пренасочување кон вашата контролен панел...'
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
    expressTitle: 'Експресна продажба',
    sellYourCar: 'Продадете го вашето возило',
    carInformation: 'Информации за автомобилот',
    uploadPhotos: 'Прикачи фотографии',
    setPrice: 'Постави цена',
    contactInformation: 'Контакт информации',
    publish: 'Објави',
    draft: 'Зачувај како нацрт',
    preview: {
      title: 'Преглед на огласот',
      yourVehicle: 'Вашето возило',
      priceLabel: 'Цена',
      milesLabel: 'км',
      photosCount: '{count} фото{plural} избрани',
    },
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
      addUpToTenPhotos: 'Додај до 10 фотографии',
      vehicleHistory: 'Историја и состојба на возилото',
      listingOptions: 'Опции за огласот',
    },

    // Form fields and labels
    fields: {
      make: 'Марка',
      model: 'Модел',
      year: 'Година',
      mileage: 'Километража',
      condition: 'Состојба',
      fuelType: 'Тип на гориво',
      transmission: 'Менувач',
      exteriorColor: 'Надворешна боја',
      interiorColor: 'Внатрешна боја',
      askingPrice: 'Цена',
      featuresAndOptions: 'Опрема и додатоци',
      description: 'Опис',
      vehiclePhotos: 'Фотографии на возилото',
      contactName: 'Име за контакт',
      phoneNumber: 'Телефонски број',
      emailAddress: 'Е-пошта адреса',
      location: 'Локација',
      bodyType: 'Тип на каросерија',
      drivetrain: 'Погон',
      engineSize: 'Зафатнина на моторот (L)',
      horsePower: 'Коњски сили (КС)',
      doors: 'Врати',
      seats: 'Седишта',
      safetyFeatures: 'Безбедносна опрема',
      upholsteryType: 'Тапацирање',
      paintWorkType: 'Тип на боја',
      previousOwners: 'Претходни сопственици',
      hadAccident: 'Историја на несреќи',
      emissionClass: 'Емисиона класа',
      fuelConsumption: 'Потрошувачка на гориво (Л/100км)',
      warrantyMonths: 'Гаранција (месеци)',
      fullServiceHistory: 'Целосна сервисна историја',
      nonSmokingVehicle: 'Возило без пушење',
      priceNegotiable: 'Цена по договор',
      acceptsTradeIn: 'Прифаќа замена',
      allowTestDrive: 'Дозволува тест возење',
    },

    // Placeholders
    placeholders: {
      selectMake: 'Изберете марка',
      enterModel: 'Внесете модел',
      selectYear: 'Изберете година',
      selectCondition: 'Изберете состојба',
      enterMileage: 'Внесете километража (км)',
      selectFuelType: 'Изберете тип на гориво',
      selectTransmission: 'Изберете менувач',
      exteriorColorExample: 'нпр. Бела, Црна, Сребрена',
      interiorColorExample: 'нпр. Црна, Беж, Сива',
      priceExample: '25.000',
      descriptionExample: 'Опишете ја состојбата на возилото, историјата и дополнителни детали...',
      yourFullName: 'Вашето полно име',
      phoneExample: '(02) 123-4567',
      emailExample: 'vasa.email@primer.com',
      cityState: 'Град, Држава',
      yourName: 'Вашето име',
      yourPhoneNumber: 'Вашиот телефонски број',
      yourEmail: 'Вашата е-пошта',
      cityCountry: 'Град, Земја',
      enterAskingPrice: 'Внесете ја бараната цена',
      describeYourVehicle: 'Опишете го вашето возило...',
      selectFuel: 'Изберете тип на гориво',
      selectTransmissionType: 'Изберете тип на менувач',
      choosePhotos: 'Изберете фотографии',
      selectBodyType: 'Изберете тип на каросерија',
      selectDrivetrain: 'Изберете погон',
      engineSizeFrom: 'Од',
      engineSizeTo: 'До',
      selectDoors: 'Изберете број на врати',
      selectSeats: 'Изберете број на седишта',
      selectUpholstery: 'Изберете тип на тапацирање',
      selectPaintWork: 'Изберете тип на боја',
      selectPreviousOwners: 'Изберете број на претходни сопственици',
      selectAccidentHistory: 'Изберете историја на несреќи',
      selectEmissionClass: 'Изберете емисиона класа',
    },

    // Button labels
    buttons: {
      nextStep: 'Следен чекор',
      previous: 'Претходно',
      createListing: 'Создај оглас'
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
      cng: 'Природен гас',
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
      yellow: 'Жолта',
      beige: 'Беж',
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

    // Vehicle types
    vehicleTypes: {
      car: {
        name: 'Автомобил',
        description: 'Седан, SUV, Купе, Хечбек',
      },
      truck: {
        name: 'Камион',
        description: 'Пикап, комерцијални возила',
      },
      motorbike: {
        name: 'Мотор',
        description: 'Мотоцикли, скутери, ATV',
      },
    },

    // Features list
    features: {
      airConditioning: 'Климатизација',
      leatherSeats: 'Кожни седишта',
      heatedSeats: 'Греани седишта',
      sunroof: 'Шибер',
      gpsNavigation: 'GPS навигација',
      backupCamera: 'Камера за паркирање',
      bluetooth: 'Bluetooth',
      usbPorts: 'USB порти',
      premiumSound: 'Премиум аудио систем',
      keylessEntry: 'Влез без клуч',
      remoteStart: 'Далечинско палење',
      cruiseControl: 'Темпомат',
      parkingSensors: 'Сензори за паркирање',
      blindSpotMonitoring: 'Мониторинг на слепа точка',
    },

    // Upholstery types
    upholsteryTypes: {
      fabric: 'Платно',
      leather: 'Кожа',
      leatherette: 'Еко-кожа',
      alcantara: 'Alcantara',
      vinyl: 'Винил',
      combination: 'Комбинација',
    },

    // Paint work types
    paintWorkTypes: {
      solid: 'Обична',
      metallic: 'Металик',
      pearl: 'Перла',
      matte: 'Мат',
      twoTone: 'Двобојна',
      custom: 'Прилагодена',
    },

    // Emission classes
    emissionClasses: {
      euro1: 'Euro 1',
      euro2: 'Euro 2',
      euro3: 'Euro 3',
      euro4: 'Euro 4',
      euro5: 'Euro 5',
      euro6: 'Euro 6',
      euro6d: 'Euro 6d',
    },

    // Accident history
    accidentHistory: {
      yes: 'Да',
      no: 'Не',
      unknown: 'Непознато',
    },

    // Safety features list
    safetyFeaturesList: {
      abs: 'ABS',
      esp: 'ESP/ESC',
      driverAirbag: 'Ербег за возач',
      passengerAirbag: 'Ербег за патник',
      sideAirbags: 'Странични ербези',
      curtainAirbags: 'Завесни ербези',
      blindSpotMonitor: 'Мониторинг на слепа точка',
      laneDepartureWarning: 'Предупредување за излегување од лента',
      emergencyBraking: 'Автоматско аварно сопирање',
      parkingSensors: 'Сензори за паркирање',
      backupCamera: 'Камера за паркирање',
      camera360: 'Камера 360°',
      tirePressureMonitor: 'Монитор на притисок на гуми',
    },

    // Progress messages
    progress: {
      creatingListing: 'Се создава огласот...',
    },
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
    searchCars: 'Пребарувај автомобили',
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
    dealerDashboard: 'Дилерски контролен панел',
    myDashboard: 'Мојата контролен панел',
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
    dashboard: 'Администраторска контролен панел'
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

    // Cookie Policy
    cookiePolicy: {
      title: 'Политика за колачиња',
      subtitle: 'Како користиме колачиња за да го подобриме вашето искуство на нашата платформа.',
      backToHome: 'Назад на почетна',
      policyTitle: 'Нашата политика за колачиња',
      policyDescription: 'Дознајте како користиме колачиња за да го подобриме вашето корисничко искуство.',
      policyText: 'Користиме колачиња и слични технологии за да ја обезбедиме, заштитиме и подобриме нашата платформа. Оваа политика објаснува што се колачиња, како ги користиме и вашите избори во врска со нивната употреба.',
      essential: {
        title: 'Основни колачиња',
        items: [
          'Автентикација на корисникот и управување со сесии',
          'Безбедност и превенција од измами',
          'Балансирање на оптоварувањето и стабилност на платформата',
          'Преференци за согласност за колачиња'
        ]
      },
      functional: {
        title: 'Функционални колачиња',
        items: [
          'Преференци за јазик и регион',
          'Преференци за филтри за пребарување',
          'Неодамна прегледани огласи',
          'Преференци за приказ и распоред'
        ]
      },
      analytics: {
        title: 'Аналитички колачиња',
        items: [
          'Анализа на посети и сообраќај на страници',
          'Модели на интеракција на корисникот',
          'Следење на перформанси на платформата',
          'Статистики за користење на функции'
        ]
      },
      marketing: {
        title: 'Маркетинг колачиња',
        items: [
          'Персонализирана испорака на содржина',
          'Мерење на рекламни кампањи',
          'Следење преку платформи',
          'Поддршка за ремаркетинг'
        ]
      },
      managingPreferences: 'Управување со вашите преференци',
      managingPreferencesDescription: 'Имате целосна контрола над тоа како се користат колачињата на нашата платформа.',
      browserSettings: 'Поставки на прелистувач',
      browserSettingsItems: [
        'Блокирајте ги сите колачиња',
        'Избришете ги постоечките колачиња',
        'Дозволете само first-party колачиња',
        'Добивајте известувања за колачиња'
      ],
      platformControls: 'Контроли на платформата',
      platformControlsItems: [
        'Вклучете/исклучете ги опционалните колачиња',
        'Управувајте со преференците за согласност',
        'Преземете извештај за податоците од колачињата',
        'Ресетирајте ги сите преференци за колачиња'
      ],
      questionsAboutCookies: 'Прашања за колачињата?',
      questionsMessage: 'Ако имате прашања за нашите практики за колачиња или сакате да дознаете повеќе за вашите опции, контактирајте не.',
      returnToPlatform: 'Назад на платформата',
      cookieSupport: 'Контактирај поддршка за колачиња'
    },

    // Imprint
    imprint: {
      title: 'Импресум',
      subtitle: 'Правни информации и детали за нашата компанија.',
      backToHome: 'Назад на почетна',
      legalInfoTitle: 'Правни информации',
      legalInfoDescription: 'Задолжителни правни информации според законите во ЕУ.',
      legalInfoText: 'Овие информации се обезбедуваат според законските обврски за транспарентност и ги содржат клучните детали за нашата компанија CarMarket365.',
      companyDetails: {
        title: 'Детали за компанијата',
        companyName: 'Име на компанијата',
        companyNameValue: 'CarMarket365 GmbH',
        registrationNumber: 'Регистрационен број',
        registrationNumberValue: 'HRB 123456',
        vatId: 'ДДВ број',
        vatIdValue: 'DE123456789',
        commercialRegister: 'Трговски регистар',
        commercialRegisterValue: 'Амтсгерихт Берлин'
      },
      businessAddress: {
        title: 'Деловна адреса',
        registeredAddress: 'Регистрирана адреса',
        addressLine1: 'Главна улица 123',
        addressLine2: '10115 Берлин',
        addressLine3: 'Германија'
      },
      management: {
        title: 'Раководство',
        managingDirector: 'Управен директор',
        managingDirectorValue: 'Стефан Коцевски',
        authorizedRepresentative: 'Овластен претставник',
        authorizedRepresentativeValue: 'Ана Петровска'
      },
      contactInfo: {
        title: 'Контакт информации',
        phone: 'Телефон',
        phoneValue: '+49 30 123 456 78',
        email: 'Е-пошта',
        emailValue: 'legal@carmarket365.com',
        businessHours: 'Работно време',
        businessHoursValue: 'Понеделник - Петок: 09:00 - 17:00'
      },
      legalNotice: {
        title: 'Правно известување',
        paragraph1: 'Содржината на овој веб-сајт е создадена со најголема можна грижа. Сепак, не можеме да гарантираме за точноста, целосноста или актуелноста на содржината.',
        paragraph2: 'Како давател на услуги, сме одговорни за сопствената содржина на овие страници според општите закони. Сепак, не сме обврзани да ги надгледуваме пренесените или зачувани странски информации или да истражуваме околности што укажуваат на незаконски активности.',
        paragraph3: 'Обврските за отстранување или блокирање на користењето информации според општите закони остануваат недопрени. Сепак, одговорноста во оваа смисла е возможна само од моментот на сознанието за конкретна повреда на правото.'
      },
      questionsTitle: 'Правни прашања?',
      questionsText: 'Ако имате прашања во врска со правните аспекти на нашата услуга или овој импресум, контактирајте го нашиот правен тим.',
      returnToPlatform: 'Назад на платформата',
      contactLegal: 'Контактирај правен тим'
    },

    // Accessibility
    accessibility: {
      title: 'Пристапност',
      subtitle: 'Посветени сме да ја направиме CarMarket365 пристапна за секого.',
      backToHome: 'Назад на почетна',
      commitmentTitle: 'Нашата посветеност кон пристапноста',
      commitmentDescription: 'Создавање на нашата платформа за автомобилски пазар инклузивна и употреблива за сите корисници.',
      commitmentText: 'Во CarMarket365, веруваме дека секој треба да има еднаков пристап до пронаоѓање и продавање возила. Постојано работиме на подобрување на пристапноста на нашата платформа и обезбедување усогласеност со признати стандарди.',
      visual: {
        title: 'Визуелна пристапност',
        features: [
          'Поддршка за висококонтрастен режим',
          'Компатибилност со читачи на екран',
          'Скалабилен текст и интерфејс',
          'Алтернативен текст за сите слики'
        ]
      },
      motor: {
        title: 'Моторна пристапност',
        features: [
          'Целосна навигација со тастатура',
          'Големи цели за кликање',
          'Опции за намалено движење',
          'Компатибилност со гласовна контрола'
        ]
      },
      audio: {
        title: 'Аудио пристапност',
        features: [
          'Визуелни предупредувања и известувања',
          'Титлови за видео содржина',
          'Текстуална комуникација',
          'Без содржина само со аудио'
        ]
      },
      cognitive: {
        title: 'Когнитивна пристапност',
        features: [
          'Јасен и едноставен јазик',
          'Конзистентни обрасци за навигација',
          'Превенција и опоравување од грешки',
          'Предвидливо однесување на интерфејсот'
        ]
      },
      standards: {
        title: 'Стандарди и упатства',
        description: 'Ги следиме воспоставените стандарди за пристапност за да обезбедиме одлично искуство за сите корисници.',
        wcagGuidelines: 'WCAG 2.1 упатства',
        wcagDescription: 'Нашата платформа има за цел да ги исполни WCAG 2.1 стандардите на ниво AA, покривајќи перцепција, оперативност, разбирливост и робусност.',
        platformCompatibility: 'Компатибилност на платформата',
        platformCompatibilityDescription: 'Тестираме со главните читачи на екран вклучувајќи NVDA, JAWS и VoiceOver, и обезбедуваме компатибилност со сите модерни прелистувачи.'
      },
      feedback: {
        title: 'Повратни информации за пристапноста',
        message: 'Ги поздравуваме вашите повратни информации за пристапноста на CarMarket365. Ве молиме известете не ако наидете на какви било пречки.',
        returnToPlatform: 'Назад на платформата',
        contactTeam: 'Контактирај го тимот за пристапност'
      }
    },

    // Placeholder page
    placeholder: {
      underConstruction: 'Во изградба',
      underConstructionMessage: 'Оваа страница е во изградба. Напорно работиме на создавање неверојатни функции. Ве молиме зајдете подоцна или продолжете со истражување на нашата главна страница.',
      backToHome: 'Назад на почетна',
      contactUs: 'Контактирај не'
    },

    // FAQ Page
    faq: {
      content: {
        browseByCategory: 'Прегледај по категории',
        browseDescription: 'Изберете категорија за да најдете релевантни прашања и одговори.',
        allQuestions: 'Сите прашања',
        commonQuestionsAbout: 'Често поставувани прашања за',
        noResultsFound: 'Нема најдени резултати',
        noResultsText: 'Обидете се со пребарување со други клучни зборови или прелистајте по категории.',
        clearSearch: 'Исчисти пребарување',
        stillNeedHelp: 'Треба ви дополнителна помош?',
        stillNeedHelpDescription: 'Не можете да најдете она што го барате? Нашиот тим за поддршка е спремен да помогне.',
        callSupport: 'Повикај поддршка',
        emailUs: 'Испрати ни е-пошта',
        liveChat: 'Жив разговор',
        available247: 'Достапно 24/7',
        supportPhoneNumber: '+49 30 123-HELP',
        supportEmail: 'support@carmarket365.com'
      },
      faqCategories: [
        {
          id: 'buying',
          name: 'Купување автомобили',
          icon: 'Car',
          color: 'bg-blue-100 text-blue-600',
          faqs: [
            {
              question: 'Како да најдам автомобили на CarMarket365?',
              answer: 'Можете да пребарувате автомобили користејќи го формуларот за пребарување на главната страница или на страницата „Прегледај автомобили„. Филтрирајте по марка, модел, година, ценовен опсег, локација и многу повеќе.'
            },
            {
              question: 'Дали сите огласи се верификувани?',
              answer: 'Да, сите огласи на CarMarket365 се верификувани. Спроведуваме проверки на заднината на сите дилери и приватни продавачи.'
            },
            {
              question: 'Можам ли да закажам тест возење?',
              answer: 'Секако! Можете да закажете тест возење директно од страницата со детали за автомобилот. Контактирајте го продавачот за да се договорите за соодветно време и место.'
            }
          ]
        },
        {
          id: 'selling',
          name: 'Продажба автомобили',
          icon: 'DollarSign',
          color: 'bg-green-100 text-green-600',
          faqs: [
            {
              question: 'Како да објавам оглас за мојот автомобил?',
              answer: 'Користете го формуларот „Продај автомобил„ за создавање оглас. Ќе ви требаат детали за возилото, фотографии, информации за состојбата и контакт податоци.'
            },
            {
              question: 'Дали има надоместок за објавување оглас?',
              answer: 'Основните огласи се бесплатни за приватни продавачи. Ние нудиме премиум опции за огласи со зголемена видливост за мала надоместок.'
            },
            {
              question: 'Колку време е потребно да се продаде автомобил?',
              answer: 'Во просек, автомобилите со правилна цена и добри фотографии се продаваат за 2-4 недели.'
            }
          ]
        },
        {
          id: 'safety',
          name: 'Безбедност и заштита',
          icon: 'Shield',
          color: 'bg-red-100 text-red-600',
          faqs: [
            {
              question: 'Како да останам безбеден при купување автомобил?',
              answer: 'Сретнете се на јавни места, донесете некого со вас, верификувајте го идентитетот на продавачот и користете безбедни методи за плаќање.'
            },
            {
              question: 'Што треба да правам ако сомневам на измама?',
              answer: 'Веднаш прекинете ја комуникацијата и пријавете го случајот на нашиот тим за поддршка. Ние ќе истражиме и преземеме соодветни мерки.'
            }
          ]
        },
        {
          id: 'financing',
          name: 'Финансирање',
          icon: 'Users',
          color: 'bg-purple-100 text-purple-600',
          faqs: [
            {
              question: 'Можам ли да добијам финансирање преку CarMarket365?',
              answer: 'Да, соработуваме со неколку кредитори за да понудиме конкурентни опции за финансирање. Можете да добиете предодобрување онлајн за неколку минути.'
            },
            {
              question: 'Кој кредитен рејтинг ми е потребен?',
              answer: 'Работиме со кредитори кои прифаќаат различни кредитни рејтинзи, од одлични до лоши. Барањата варираат по кредитори.'
            }
          ]
        }
      ]
    }
  },

  // Global FAQ (detailed version)
  faq: {
      title: 'Често поставувани прашања',
      subtitle: 'Најдете одговори на честите прашања за купување, продажба, финансирање и користење на CarMarket365.',
      searchPlaceholder: 'Пребарај во FAQ...',
      browseByCategory: 'Прегледај по категории',
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
          answer: 'Можете да пребарувате автомобили користејќи го формуларот за пребарување на главната страница или на страницата „Прегледај автомобили„. Филтрирајте по марка, модел, година, ценовен опсег, локација и многу повеќе. Користете го напредното пребарување за детална филтрација.'
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
          answer: 'Користете го формуларот „Продај автомобил„ за создавање оглас. Ќе ви требаат детали за возилото, фотографии, информации за состојбата и контакт податоци. Процесот трае околу 10-15 минути.'
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
          answer: 'Користете ја нашата бесплатна алатка за процена на возила, истражувајте слични огласи, земете ја предвид состојбата на вашиот автомобил, километражаот и било какви неодамнешни поправки или подобрувања.'
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
          answer: 'Кликни „Регистрирај се„ на било која страница и обезбеди ја твојата е-пошта адреса, телефонски број и основни информации. Можеш исто да се регистрираш преку Google или Facebook за побрза регистрација.'
        },
        {
          question: 'Ја заборавив лозинката. Како да ја ресетирам?',
          answer: 'Кликни „Заборавена лозинка?„ на страницата за најавување, внеси ја твојата е-пошта адреса и следи ги инструкциите за ресетирање што ќе ти ги пратиме. Врската за ресетирање важи 24 часа.'
        },
        {
          question: 'Како да ги ажурирам информациите во мојот профил?',
          answer: 'Најави се во твојот профил и оди во „Поставки на профил„, каде што можеш да ги ажурираш личните информации, контакт податоците и преференциите.'
        },
        {
          question: 'Можам ли да зачувам автомобили за гледање подоцна?',
          answer: 'Да! Кликни на иконката со срце на било кој оглас за автомобил за да го зачуваш во омилени. Пристапи до зачуваните автомобили во секое време од контролната табла на твојот профил.'
        },
        {
          question: 'Како да контактирам со поддршката?',
          answer: 'Користи ја страницата „Контактирај не„, повикај (555) 123-ПОМОШ, испрати е-пошта на support@carmarket365.com или користи ја функцијата за разговор во долниот десен агол на било која страница.'
        }
      ]
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
    title: 'Контактирај не',
    subtitle: 'Ние сме тука за да помогнеме. Контактирајте не за било какви прашања или поддршка.',
    backToHome: 'Назад на почетна',
    mainTitle: 'Како можеме да помогнеме?',
    mainDescription: 'Нашиот тим за поддршка на клиенти е тука за да одговори на вашите прашања и да обезбеди помош.',
    contactOverview: 'Без разлика дали барате помош за купување возило, имате прашања за продажба или сакате да дознаете повеќе за нашите услуги, ние сме достапни низ различни канали за комуникација.',
    
    phoneSupport: {
      title: 'Телефонска поддршка',
      salesDepartment: 'Одделение за продажба',
      customerService: 'Корисничка служба',
      financingDepartment: 'Финансиско одделение'
    },
    
    emailSupport: {
      title: 'Поддршка преку е-пошта',
      generalInquiries: 'Општи прашања',
      salesQuestions: 'Прашања за продажба',
      support: 'Техничка поддршка'
    },
    
    businessHours: {
      title: 'Работно време',
      mondayFriday: 'Понеделник - Петок',
      saturday: 'Сабота',
      sunday: 'Недела',
      timeRange: {
        mondayFriday: '08:00 - 20:00',
        saturday: '09:00 - 17:00',
        sunday: '10:00 - 16:00'
      }
    },
    
    officeLocation: {
      title: 'Локација на канцеларија',
      address: {
        street: 'Македонија бб',
        city: 'Скопје 1000',
        country: 'Северна Македонија'
      },
      getDirections: 'Земи упатства'
    },
    
    form: {
      title: 'Испратете ни порака',
      subtitle: 'Пополнете ја формата подолу и ќе ви одговориме најбрзо што е можно.',
      required: '*',
      inquiryType: {
        label: 'Тип на прашање',
        placeholder: 'Изберете тип на прашање',
        options: {
          buying: 'Купување возило',
          selling: 'Продажба возило',
          financing: 'Финансирање',
          dealer: 'Дилерски услуги',
          support: 'Техничка поддршка',
          other: 'Друго'
        }
      },
      fields: {
        fullName: 'Целосно име',
        email: 'Е-пошта',
        phone: 'Телефон',
        subject: 'Предмет',
        message: 'Порака'
      },
      placeholders: {
        name: 'Вашето име',
        email: 'ваша.епошта@example.com',
        phone: '+389 XX XXX XXX',
        subject: 'Кратко опишете го вашето прашање',
        message: 'Детално опишете го вашето прашање или барање...'
      },
      submitButton: 'Испрати порака',
      disclaimer: 'Со испраќање на оваа форма, се согласувате со нашите услови на користење и политика за приватност.'
    },
    
    success: {
      title: 'Пораката е успешно испратена!',
      message: 'Ви благодариме што не контактиравте. Ќе ви одговориме во рок од 24 часа.'
    },
    
    quickHelp: {
      title: 'Брза помош',
      subtitle: 'Најдете брзи одговори на честите прашања',
      options: {
        buyingGuide: {
          title: 'Водич за купување',
          description: 'Научете како да купите возило на нашата платформа'
        },
        sellingGuide: {
          title: 'Водич за продажба',
          description: 'Дознајте како да го продадете вашето возило'
        },
        faq: {
          title: 'Често поставувани прашања',
          description: 'Најдете одговори на честите прашања'
        },
        safetyTips: {
          title: 'Безбедносни совети',
          description: 'Важни совети за безбедна трансакција'
        }
      }
    },
    
    urgentSupport: {
      title: 'Итна поддршка?',
      message: 'За итни прашања, повикајте не директно или продолжете со прелистување на возила.',
      browseCars: 'Прегледај возила',
      callNow: 'Повикај сега'
    },
    
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
    
    registeredDealers: {
      dealers: {
        automaxpremium: 'АвтоМакс Премиум',
        citymotorsgmbh: 'Сити Моторс ГмбХ',
        ecowheelshamburg: 'ЕкоВилс Хамбург',
        rheinautosolutions: 'Рајн Авто Решенија'
      }
    }
  },

  // Registered Dealers
  registeredDealers: {
    title: 'Регистрирани дилери',
    subtitle: 'Прегледајте ја нашата мрежа на верифицирани дилери на автомобили',
    viewProfile: 'Прикажи профил',
    viewInventory: 'Прикажи инвентар',
    contactDealer: 'Контактирај дилер',
    backToHome: 'Назад на почетна',
    allDealersVerified: 'Сите дилери се верифицирани',
    customerRated: 'Оценети од клиенти',
    supportAvailable: 'Поддршка 24/7',
    browseNetwork: 'Прегледајте ја нашата мрежа од {count} верифицирани дилери низ Германија',
    reviews: 'рецензии',
    verifiedSince: 'Верифициран од {year}',
    experience: 'Искуство:',
    totalSales: 'Вкупна продажба:',
    viewDealerProfile: 'Прикажи профил на дилер',
    years: 'години',

    specialties: {
      luxuryCars: 'Луксузни автомобили',
      suvs: 'SUV',
      electricVehicles: 'Електрични возила',
      familyCars: 'Семејни автомобили',
      compactCars: 'Компактни автомобили',
      hybrids: 'Хибридни возила',
      sportsCars: 'Спортски автомобили',
      convertibles: 'Кабриолети',
      performance: 'Високи перформанси',
      mercedesBenz: 'Mercedes-Benz',
      porsche: 'Porsche',
      luxury: 'Луксузни брендови',
      businessCars: 'Деловни автомобили',
      fleetSales: 'Продажба на флоти',
      leasing: 'Лизинг решенија',
      ecoFriendly: 'Еко-пријателски',
    },

    descriptions: {
      autoMaxDescription: 'Водечки дилер на луксузни автомобили во Берлин со над 15 години искуство. Специјализиран за премиум германски брендови.',
      cityMotorsDescription: 'Семеен дилер кој ги опслужува Минхен и околината. Познат по одличната услуга за клиенти и фер цени.',
      ecoWheelsDescription: 'Водечки специјалист за електрични и хибридни возила во Хамбург. Посветен на одржливи транспортни решенија.',
      rheinAutoDescription: 'Специјалисти за спортски автомобили во регионот на Рајна. Обемна колекција на возила со високи перформанси.',
      stuttgartLuxuryDescription: 'Овластен дилер на Mercedes-Benz и Porsche во Штутгарт. Дом на најдоброто германско инженерство.',
      nordFahrzeugeDescription: 'Специјалист за корпоративни возила кој го опслужува деловниот дистрикт на Франкфурт. Експерт за решенија за флоти и лизинг.',
    },
  },

  // Safety Tips
  safetyTips: {
    title: 'Безбедносни совети',
    subtitle: 'Останете безбедни при купување и продавање возила на нашата платформа.',
    backToHome: 'Назад на почетна',
    mainTitle: 'Ваш водич за безбедност',
    mainDescription: 'Основни безбедносни совети за безбедно искуство при купување и продавање автомобили.',
    safetyOverview: 'Во CarMarket365, вашата безбедност е наш приоритет. Без разлика дали купувате или продавате возило, следењето на овие упатства ќе помогне да обезбедите непречена, безбедна и успешна трансакција.',
    meetingSafety: {
      title: 'Безбедност при средби',
      items: [
        'Сретнете се на јавна, добро осветлена локација',
        'Доведете пријател или член од семејството',
        'Известете некого за вашите планови',
        'Довербете му се на вашиот инстинкт'
      ]
    },
    paymentSecurity: {
      title: 'Безбедност на плаќање',
      items: [
        'Користете безбедни методи на плаќање',
        'Избегнувајте готовина за големи трансакции',
        'Верификувајте го плаќањето пред трансферот',
        'Чувајте ги сите записи за трансакцијата'
      ]
    },
    vehicleInspection: {
      title: 'Инспекција на возилото',
      items: [
        'Секогаш инспектирајте го возилото лично',
        'Побарајте професионална инспекција',
        'Проверете го извештајот за историја на возилото',
        'Направете тест возење пред купување'
      ]
    },
    redFlags: {
      title: 'Предупредувачки знаци',
      items: [
        'Цена значително под пазарната вредност',
        'Продавачот одбива лична средба',
        'Притисок за брзо завршување',
        'Неконзистентни информации за возилото'
      ]
    },
    documentation: {
      title: 'Основна документација',
      description: 'Обезбедете дека сите документи се во ред пред да завршите која било трансакција.',
      forBuyers: 'За купувачи',
      buyerItems: [
        'Верификувајте ја регистрацијата на возилото',
        'Проверете за неплатени долгови',
        'Прегледајте ја сервисната историја',
        'Потврдете дека VIN се совпаѓа со документите'
      ],
      forSellers: 'За продавачи',
      sellerItems: [
        'Подгответе ги сите документи за сопственост',
        'Обезбедете записи за одржување',
        'Откријте ги познатите проблеми',
        'Завршете ги документите за трансфер'
      ]
    },
    emergency: {
      title: 'Треба да пријавите грижа?',
      message: 'Ако наидете на сомнителна активност или се чувствувате небезбедно, ве молиме контактирајте го нашиот тим за безбедност веднаш.',
      browseCars: 'Прегледувајте автомобили безбедно',
      reportConcern: 'Пријави грижа'
    }
  },

  carReviews: {
    title: 'Рецензии на автомобили',
    subtitle: 'Експертски рецензии и повратни информации од корисници за да ви помогнат да донесете информирани одлуки при купување на вашиот следен автомобил.',
    backToHome: 'Назад на почетна',

    // Main content
    overviewTitle: 'Рецензии и оценки на автомобили',
    overviewDescription: 'Сеопфатни рецензии за да ви помогнат да донесете информирани одлуки за купување возило.',
    overviewText: 'Нашиот дел за рецензии на автомобили обезбедува детална анализа од автомобилски експерти и реални искуства на сопственици за да ви помогне да ги разберете сите аспекти на возилата што ги разгледувате.',

    // Review types
    expertReviews: {
      title: 'Експертски рецензии',
      features: [
        'Професионален автомобилски новинарство',
        'Детална анализа на перформансите',
        'Оценки за безбедност и доверливост',
        'Компаративно тестирање на возила'
      ]
    },
    ownerReviews: {
      title: 'Рецензии од сопственици',
      features: [
        'Реални искуства од сопственост',
        'Увиди за долгорочна доверливост',
        'Разбирање на трошоците за одржување',
        'Впечатоци од секојдневно возење'
      ]
    },
    ratingSystem: {
      title: 'Систем за оценување',
      features: [
        'Систем за оценување со 5 ѕвезди',
        'Оценување специфично по категорија',
        'Општи препораки',
        'Разградба на предности и недостатоци'
      ]
    },
    marketInsights: {
      title: 'Пазарна аналитика',
      features: [
        'Анализа на вредноста за препродажба',
        'Извештаи за пазарни трендови',
        'Препораки за најдобра вредност',
        'Сезонски водичи за купување'
      ]
    },

    // Categories
    categoriesTitle: 'Категории на рецензии',
    categoriesDescription: 'Нашите рецензии ги покриваат сите аспекти на сопственоста и перформансите на возилата.',
    performance: {
      title: 'Перформанси и возење',
      items: [
        'Моќност и реактивност на моторот',
        'Ефикасност на гориво и домет',
        'Управување и стабилност на патот',
        'Перформанси на сопирање'
      ]
    },
    comfort: {
      title: 'Комфор и ентериер',
      items: [
        'Удобност на седиштата',
        'Внатрешен простор и складирање',
        'Технолошки карактеристики',
        'Квалитет на изградба и материјали'
      ]
    },
    safety: {
      title: 'Безбедност и доверливост',
      items: [
        'Оценки и карактеристики за безбедност',
        'Доверливост и сервисна историја',
        'Покриеност со гаранција',
        'Историја на повлекувања'
      ]
    },

    // Coming soon
    comingSoonTitle: 'Рецензии наскоро!',
    comingSoonText: 'Моментално ја градиме нашата сеопфатна база на рецензии. Експертските рецензии и повратните информации од сопствениците наскоро ќе бидат достапни за да ви помогнат во вашите одлуки за купување автомобил.',
    browseCars: 'Прегледај достапни автомобили',
    exploreInventory: 'Истражи инвентар'
  },

  // Contact car and sharing
  contactCar: {
    reportListing: 'Пријави оглас',
    shareListing: 'Сподели оглас',
    sendMessage: 'Испрати порака',
    yourName: 'Вашето име',
    yourPhone: 'Вашиот телефон',
    interestedIn: 'Заинтересиран сум за',
    additionalNotes: 'Дополнителни забелешки',
  },

  share: {
    copyLink: 'Копирај врска',
    linkCopied: 'Врската е копирана!',
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    twitter: 'Twitter'
  },





  // Dashboard sections (simplified versions for now)
  dealerDashboard: {
    title: 'Дилерски контролен панел',
    subtitle: 'Управувајте со огласите, следете ги перформансите и развивајте го вашиот бизнис',
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
    title: 'Administrator Panel',
    subtitle: 'Platform management, monitoring and comprehensive admin control',

    // Tab navigation
    tabs: {
      overview: 'Overview',
      allListings: 'All Listings',
      userManagement: 'User Management',
      reports: 'Reports',
    },

    // Преглед таб
    overview: {
      stats: {
        totalUsers: {
          title: 'Total Users',
          description: '+12.5% from last month',
          fromLastMonth: '+12.5% from last month',
        },
        activeDealers: {
          title: 'Active Dealers',
          description: '+8.2% from last month',
          newThisMonth: '+8.2% from last month',
        },
        totalListings: {
          title: 'Total Listings',
          description: '+15.3% from last month',
          today: '+15.3% from last month',
        },
        platformRevenue: {
          title: 'Platform Revenue',
          description: '+22.1% from last month',
          fromLastMonth: '+22.1% from last month',
        },
      },
      recentActivity: {
        title: 'Recent Activity',
        description: 'Latest platform actions and events',
        activities: {
          newDealerRegistration: 'New dealer registration',
          listingFlaggedForReview: 'Listing flagged for review',
          userAccountSuspended: 'User account suspended',
          paymentProcessed: 'Payment processed',
        },
        timeAgo: {
          hoursAgo: 'hours ago',
        },
      },
      systemHealth: {
        title: 'System Health',
        description: 'Platform performance metrics',
        metrics: {
          serverUptime: 'Server Uptime',
          averageResponseTime: 'Average Response Time',
          activeSessions: 'Active Sessions',
          errorRate: 'Error Rate',
        },
      },
      actions: {
        manageUsers: 'Manage Users',
        viewReports: 'View detailed reports',
      },
    },

    // Сите огласи таб
    allListings: {
      title: 'All Listings',
      searchPlaceholder: 'Search listings...',
      filterByStatus: 'Filter by status',
      statusOptions: {
        allStatus: 'All Statuses',
        active: 'Active',
        sold: 'Sold',
        pending: 'Pending',
        flagged: 'Flagged',
      },
      tableHeaders: {
        image: 'Image',
        title: 'Title',
        category: 'Category',
        seller: 'Seller',
        price: 'Price',
        status: 'Status',
        created: 'Created',
        actions: 'Actions',
      },
      statusBadges: {
        active: 'Active',
        sold: 'Sold',
        pending: 'Pending',
        flagged: 'Flagged',
      },
      actions: {
        viewListing: 'View Listing',
        editListing: 'Edit Listing',
        deleteListing: 'Delete Listing',
      },
    },

    // User Management tab
    userManagement: {
      title: 'User Management',
      description: 'View and manage all platform users',
      searchPlaceholder: 'Search by email or name...',
      roleFilter: {
        placeholder: 'Role',
        options: {
          allRoles: 'All Roles',
          customer: 'Customer',
          dealer: 'Dealer',
          admin: 'Admin',
        },
      },
      tableHeaders: {
        user: 'User',
        role: 'Role',
        status: 'Status',
        joinDate: 'Join Date',
        lastLogin: 'Last Login',
        actions: 'Actions',
      },
      roleBadges: {
        admin: 'Administrator',
        dealer: 'Dealer',
        customer: 'Customer',
      },
      statusBadges: {
        active: 'Active',
        suspended: 'Suspended',
        pending: 'Pending',
      },
      statusMessages: {
        joinedOn: 'Joined On',
        lastLoginOn: 'Last Login',
        neverLoggedIn: 'Never logged in',
      },
      actions: {
        viewProfile: 'View Profile',
        editUser: 'Edit User',
        suspendUser: 'Suspend User',
        activateUser: 'Activate User',
      },
    },

    // Reports tab
    reports: {
      platformStatistics: {
        title: 'Platform Statistics',
        description: 'Key platform indicators',
        metrics: {
          totalRevenue: 'Total Revenue',
          newUserRegistrations: 'New User Registrations',
          successfulTransactions: 'Successful Transactions',
          averageListingPrice: 'Average Listing Price',
        },
      },
      contentModeration: {
        title: 'Content Moderation',
        description: 'Content requiring verification',
        items: {
          flaggedListings: 'Flagged Listings',
          pendingDealerApplications: 'Pending Dealer Applications',
          reportedUsers: 'Reported Users',
          disputes: 'Disputes',
        },
      },
    },

    // Footer message
    footerMessage: 'Administrative Control - ',
    systemStatus: 'System Status: Online',
  },

  // Car detail page sections
  carDetail: {
    // Header and Navigation
    backToSearch: 'Назад кон пребарување',

    // Vehicle Title and Info
    vehicleTitle: 'Наслов на возило',
    locationLabel: 'Локација',
    priceLabel: 'Цена',
    originalPrice: 'Оригинална цена',
    savingsAmount: 'Попуст',

    // Status Badges
    certified: 'Сертифицирано',
    featured: 'Препорачано',
    newArrival: 'Ново пристигнување',
    priceReduced: 'Намалена цена',
    greatDeal: 'Одлична понуда',
    verified: 'Верифицирано',

    // Image Gallery
    mainImage: 'Главна слика',
    imageGallery: 'Галерија на слики',
    viewFullscreen: 'Погледни на цел екран',
    imageCounter: 'од',
    noImages: 'Нема достапни слики',
    noImage: 'Нема слика',
    moreFromSeller: 'Повеќе од овој продавач',
    saveCar: 'Зачувај автомобил',
    shareCar: 'Сподели автомобил',

    // Tabs
    tabs: {
      overview: 'Преглед',
      features: 'Карактеристики',
      inspection: 'Инспекција',
      history: 'Историја',
    },

    // Overview Tab
    overview: {
      vehicleDetails: 'Детали за возилото',
      mileage: 'Километража',
      fuelType: 'Тип на гориво',
      transmission: 'Менувач',
      year: 'Година',
      condition: 'Состојба',
      exteriorColor: 'Надворешна боја',
      interiorColor: 'Внатрешна боја',
      bodyType: 'Тип на каросерија',
      drivetrain: 'Тип на погон',
      vin: 'ВИН',
      description: 'Опис',
      miles: 'км',
    },

    // Features Tab
    features: {
      title: 'Карактеристики',
      featuresAndOptions: 'Карактеристики и опции',
      noFeatures: 'Нема наведени карактеристики за ова возило.',
    },

    // Inspection Tab
    inspection: {
      title: 'Извештај од инспекција',
      lastUpdated: 'Последно ажурирано:',
      excellentCondition: 'Одлична состојба',
      pointInspection: 'Завршена инспекција од 150 точки',
      inspectionCompleted: 'инспекцијата е завршена',
      inspectionScore: 'Резултат од инспекција',
    },

    // History Tab
    history: {
      title: 'Историја',
      vehicleHistory: 'Историја на возилото',
      listedForSale: 'Поставено на продажба',
      vehicleAdded: 'Возилото е додадено на платформата',
      lastService: 'Последен сервис',
      regularMaintenance: 'Редовно одржување завршено',
    },

    // Action Buttons
    actions: {
      callDealer: 'Повикај продавач',
      sendMessage: 'Испрати порака',
      scheduleTestDrive: 'Закажи тест возење',
      getPreApproved: 'Добиј претходно одобрување',
      calculatePayment: 'Пресметај плаќање',
      viewDealerProfile: 'Погледни профил на продавач',
      viewAllDealerCars: 'Погледни ги сите автомобили на продавачот',
      shareVehicle: 'Сподели возило',
      saveToFavorites: 'Зачувај во омилени',
      removeFromFavorites: 'Отстрани од омилени',
    },

    // Seller Information
    seller: {
      title: 'Продавач',
      sellerInformation: 'Информации за продавачот',
      dealerRating: 'Рејтинг',
      reviews: 'рецензии',
      verified: 'Верифициран',
      phone: 'Телефон',
      email: 'Е-пошта',
      privateSeller: 'Приватен продавач',
    },

    // Financing Section
    financing: {
      title: 'Финансирање',
      financingOptions: 'Опции за финансирање',
      estimatedPayment: 'Проценето месечно плаќање',
      monthlyPayment: '/мес',
      basedOnTerms: 'Базирано на',
      aprForMonths: 'годишна каматна стапка за',
      withDown: 'месеци со',
      getPreApproved: 'Добиј претходно одобрување',
      calculatePayment: 'Пресметај плаќање',
    },

    // Error States
    errors: {
      carNotFound: 'Автомобилот не е пронајден',
      failedToLoad: 'Не можевме да го вчитаме овој оглас. Обидете се повторно подоцна.',
      doesntExist: 'Овој оглас не постои или е отстранет.',
      hasBeenRemoved: 'Овој оглас е отстранет.',
      backToCars: 'Назад кон автомобили',
    },

    // Loading States
    loading: {
      loadingVehicle: 'Се вчитува возилото...',
      loadingDetails: 'Се вчитуваат деталите...',
    },

    // Contact and Communication
    contact: {
      contactDealer: 'Контактирај продавач',
      interestedIn: 'Ме интересира ова возило',
      preferredContactMethod: 'Претпочитан начин на контакт',
      additionalMessage: 'Дополнителна порака',
      sendInquiry: 'Испрати прашање',
      callNow: 'Повикај сега',
      emailDealer: 'Испрати е-пошта на продавачот',
      scheduleViewing: 'Закажи преглед',
    },

    // Test Drive
    testDrive: {
      scheduleTestDrive: 'Закажи тест возење',
      preferredDate: 'Претпочитан датум',
      preferredTime: 'Претпочитано време',
      contactInfo: 'Контакт информации',
      additionalNotes: 'Дополнителни белешки',
      submitRequest: 'Испрати барање',
    },

    // Share Feature
    share: {
      shareVehicle: 'Сподели возило',
      shareOnSocial: 'Сподели на социјални мрежи',
      copyLink: 'Копирај линк',
      emailToFriend: 'Испрати по е-пошта до пријател',
      generateQR: 'Генерирај QR код',
    },
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
    engineSize: 'Зафатнина на моторот (L)',
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

  // Final fixes section
  finalFixes: {
    expressSell: {
      title: 'Експрес продажба',
      listMyCarQuickly: 'Ставете го вашиот автомобил на продажба брзо и лесно',
      backToHome: 'Назад на почетна',
      
      // Main form fields (duplicated from expressSell section for compatibility)
      carDetails: 'Детали за автомобилот',
      carDetailsDescription: 'Кажете ни за вашиот автомобил за да создадеме атрактивен оглас',
      makeRequired: 'Марка *',
      selectMake: 'Изберете марка',
      modelRequired: 'Модел *',
      selectModel: 'Изберете модел',
      yearRequired: 'Година *',
      selectYear: 'Изберете година',
      mileageRequired: 'Пробег *',
      fuelTypeRequired: 'Тип на гориво *',
      selectFuelType: 'Изберете тип на гориво',
      transmissionRequired: 'Менувач на брзини *',
      selectTransmission: 'Изберете менувач на брзини',
      
      // Step titles
      carDetailsStep: 'Детали за автомобилот',
      photosStep: 'Фотографии',
      priceDescriptionStep: 'Цена и опис',
      contactInfoStep: 'Контакт информации',
      
      // Car details section
      uploadPhotos: 'Прикачи фотографии',
      uploadPhotosDescription: 'Додајте фотографии од вашиот автомобил за да привлечете повеќе купувачи',
      uploadCarPhotos: 'Прикачете фотографии од вашиот автомобил',
      addUpToTenPhotos: 'Можете да додадете до 10 фотографии. Првата слика ќе биде главна фотографија.',
      choosePhotos: 'Избери фотографии',
      mainPhoto: 'Главна фотографија',
      
      // Condition fields
      conditionLabel: 'Состојба на возилото *',
      conditionPlaceholder: 'Изберете состојба',
      
      // Price and description
      priceAndDescription: 'Цена и опис',
      setPriceAndDescription: 'Поставете ја цената и опишете го вашиот автомобил',
      askingPriceEuros: 'Барана цена (EUR) *',
      priceExample: 'пр. 25.000',
      descriptionPlaceholder: 'Опишете ги клучните карактеристики, состојбата и историјата на вашиот автомобил. Повеќе детали значи повеќе заинтересирани купувачи.',
      
      // Contact information
      contactInformation: 'Контакт информации',
      howShouldBuyersContact: 'Како треба купувачите да ве контактираат?',
      fullNameRequired: 'Целосно име *',
      namePlaceholder: 'Внесете го вашето име',
      phoneNumberRequired: 'Телефонски број *',
      phonePlaceholder: '+389 XX XXX XXX',
      emailAddressRequired: 'Е-пошта адреса *',
      yourEmail: 'вашата.е-пошта@пример.ком',
      locationRequired: 'Локација *',
      locationPlaceholder: 'Скопје, Македонија',
      
      // Car brands and models
      carBrands: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 
        'Ford', 'Opel', 'Peugeot', 'Renault', 'Fiat', 'Hyundai',
        'Kia', 'Nissan', 'Honda', 'Mazda', 'Škoda', 'Seat',
        'Citroen', 'Volvo', 'Alfa Romeo', 'Lancia', 'Mitsubishi'
      ],
      carModels: [
        '3 Series', '5 Series', 'X3', 'X5', 'A4', 'A6', 'Q5',
        'Golf', 'Passat', 'Tiguan', 'C-Class', 'E-Class', 'GLA',
        'Corolla', 'Camry', 'RAV4', 'Focus', 'Fiesta', 'Kuga',
        'Astra', 'Insignia', 'Mokka', '208', '308', '3008',
        'Megane', 'Clio', 'Captur', 'Punto', 'Tipo', '500'
      ],
      
      // Navigation
      previous: 'Претходно',
      next: 'Следно',
      listMyCar: 'Постави го мојот автомобил'
    }
  },

  // Hardcoded fixes section for dashboard mock data
  hardcodedFixes: {
    dealerDashboard: {
      mockData: {
        bmw3Series320i2022: 'BMW 3 Series 320i 2022',
        mileage25k: '25.000 км',
        audiA4Avant2021: 'Audi A4 Avant 2021',
        mileage18k: '18.000 км',
        mercedesCClass2020: 'Mercedes C-Class 2020',
        mileage32k: '32.000 км'
      }
    },
    adminDashboard: {
      mockData: {
        johnDealer: 'Јован Дилер',
        johnDealerEmail: 'jovan@пример.ком',
        annaCustomer: 'Ана Купувач',
        annaCustomerEmail: 'ana@пример.ком',
        bobAdmin: 'Бобан Админ',
        bobAdminEmail: 'boban@пример.ком',
        bmw3Series2022: 'BMW 3 Series 2022',
        sedan: 'Седан',
        audiA42021: 'Audi A4 2021',
        premiumMotors: 'Премиум Мотори',
        premiumMotorsGmbH: 'Премиум Мотори ДОО',
        mercedesCClass2020: 'Mercedes C-Class 2020',
        luxury: 'Луксузен',
        eliteCars: 'Елитни Автомобили',
        suspiciousUser: 'Сомнителен корисник',
        autoHausBerlin: 'Авто Куќа Берлин',
        twoHoursAgo: 'пред 2 часа',
        fourHoursAgo: 'пред 4 часа',
        sixHoursAgo: 'пред 6 часа',
        eightHoursAgo: 'пред 8 часа'
      }
    }
  },

  // Mobile App Announcement
  mobileApp: {
    announcement: {
      banner: {
        text: 'Мобилната апликација наскоро! Регистрирај се за известувања.'
      },
      section: {
        title: 'Мобилната Апликација Наскоро!',
        description: 'Носи ја CarMarket365 со себе секаде. Добивај моментални известувања за нови огласи, зачувувај омилени и прегледај автомобили во движење.'
      },
      emailPlaceholder: 'Внеси ја твојата е-пошта за ажурирања',
      notifyMe: 'Извести ме',
      privacy: 'Ќе ја користиме твојата е-пошта само за да те известиме за лансирањето на мобилната апликација. Без спам, никогаш.',
      success: {
        title: 'На листата си!',
        message: 'Ќе те известиме штом мобилната апликација на CarMarket365 биде достапна за преземање.'
      }
    },
    features: {
      notifications: 'Push Известувања',
      notificationsDesc: 'Биди известен моментално кога нови автомобили ќе се совпаднат со твоите критериуми',
      offline: 'Офлајн Пристап',
      offlineDesc: 'Прегледај зачувани автомобили и огласи дури и без интернет',
      seamless: 'Безгранично Искуство',
      seamlessDesc: 'Сите твои веб омилени и пребарувања синхронизирани автоматски'
    }
  }
};

