import { TranslationStrings } from '../translations';

export const ruTranslations: TranslationStrings = {
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    retry: 'Повторить',
    close: 'Закрыть',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    continue: 'Продолжить',
    back: 'Назад',
    next: 'Далее',
    previous: 'Предыдущий',
    search: 'Поиск',
    filter: 'Фильтр',
    clear: 'Очистить',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    add: 'Добавить',
    view: 'Просмотр',
    contact: 'Контакт',
    phone: 'Телефон',
    email: 'Электронная почта',
    location: 'Местоположение',
    price: 'Цена',
    currency: 'Валюта',
    year: 'Год',
    make: 'Марка',
    model: 'Модель',
    mileage: 'Пробег',
    condition: 'Состояние',
    features: 'Особенности',
    description: 'Описание',
    images: 'Изображения',
    seller: 'Продавец',
    dealer: 'Дилер',
    private: 'Частный',
    yes: 'Да',
    no: 'Нет',
    menu: 'Меню',
    new: 'Новый',
    certified: 'Сертифицированный',
    vehicle: 'транспорт',
    message: 'Сообщение',
    default: 'По умолчанию',
    secondary: 'Вторичный',
    outline: 'Контур',
    ghost: 'Призрак',
    link: 'Ссылка',
    destructive: 'Разрушительный',
    small: 'Маленький',
    large: 'Большой',
    option: 'Опция',
    sending: 'Отправка...',
  },

  // Forms - validation, labels, placeholders, actions
  forms: {
    validation: {
      nameRequired: 'Имя обязательно',
      emailRequired: 'Email обязателен',
      emailInvalid: 'Пожалуйста, введите действительный email',
      phoneRequired: 'Номер телефона обязателен',
      messageRequired: 'Сообщение обязательно',
      loanAmountRequired: 'Сумма кредита обязательна',
      annualIncomeRequired: 'Годовой доход обязателен',
      creditScoreRequired: 'Кредитный рейтинг обязателен',
      employmentStatusRequired: 'Статус занятости обязателен',
      yearsAtJobRequired: 'Стаж на текущей работе обязателен',
      monthlyExpensesRequired: 'Ежемесячные расходы обязательны',
      makeRequired: 'Марка обязательна',
      modelRequired: 'Модель обязательна',
      yearRequired: 'Год обязателен',
      yearInvalid: 'Недействительный год',
      mileageRequired: 'Пробег обязателен',
      mileageNegative: 'Пробег не может быть отрицательным',
      dateRequired: 'Пожалуйста, выберите дату',
      timeRequired: 'Пожалуйста, выберите время',
    },
    labels: {
      fullName: 'Полное имя',
      email: 'Email',
      phone: 'Номер телефона',
      message: 'Сообщение',
    },
    placeholders: {
      enterFullName: 'Введите ваше полное имя',
      enterEmail: 'Введите ваш email',
      enterPhone: 'Введите ваш номер телефона',
      contactMessage: 'Здравствуйте, я заинтересован в {year} {make} {model}. Пожалуйста, свяжитесь со мной для получения подробностей.',
    },
    actions: {
      sendMessage: 'Отправить сообщение',
    },
  },

  // Modals - titles, descriptions, success messages
  modals: {
    contactCar: {
      title: 'Связаться с продавцом',
      description: 'Отправить сообщение об этом автомобиле',
      successTitle: 'Сообщение успешно отправлено!',
      successDescription: 'Ваше сообщение отправлено продавцу. Они свяжутся с вами в ближайшее время.',
    },
    financing: {
      title: 'Получить предварительное одобрение финансирования',
      description: 'Получите предварительное одобрение автомобильного финансирования за минуты',
      badges: {
        financingAvailable: 'Финансирование Доступно',
      },
      employmentStatus: {
        retired: 'Пенсионер',
        student: 'Студент',
        unemployed: 'Безработный',
      },
      placeholders: {
        enterFullName: 'Введите ваше полное имя',
        enterPhone: 'Введите ваш номер телефона',
        enterEmail: 'Введите ваш email адрес',
        enterLoanAmount: 'Введите сумму кредита',
        enterAnnualIncome: 'Введите годовой доход',
        enterMonthlyExpenses: 'Введите ежемесячные расходы',
        selectRange: 'Выберите диапазон',
        selectStatus: 'Выберите статус',
        selectDuration: 'Выберите срок',
      },
      validation: {
        validEmail: 'Пожалуйста, введите действительный email',
        monthlyExpensesRequired: 'Ежемесячные расходы обязательны',
      },
    },
    scheduleTestDrive: {
      title: 'Запланировать тест-драйв',
      description: 'Забронировать встречу для тест-драйва этого автомобиля',
      badge: 'Тест-драйв доступен',
      labels: {
        fullName: 'Полное имя',
        email: 'Email',
        phone: 'Номер телефона',
        preferredDate: 'Предпочтительная дата',
        preferredTime: 'Предпочтительное время',
        specialRequests: 'Специальные пожелания',
      },
      placeholders: {
        enterFullName: 'Введите ваше полное имя',
        enterEmail: 'Введите ваш email адрес',
        enterPhone: 'Введите ваш номер телефона',
        selectDate: 'Выберите предпочтительную дату',
        selectTime: 'Выберите предпочтительное время',
        enterRequests: 'Есть особые пожелания или вопросы?',
      },
      validation: {
        emailInvalid: 'Пожалуйста, введите действительный email',
        dateRequired: 'Пожалуйста, выберите предпочтительную дату',
        timeRequired: 'Пожалуйста, выберите предпочтительное время',
      },
      success: {
        title: 'Тест-драйв запланирован!',
        description: 'Ваш запрос на тест-драйв отправлен продавцу. Они свяжутся с вами для подтверждения встречи.',
      },
      actions: {
        cancel: 'Отмена',
        schedule: 'Запланировать тест-драйв',
        scheduling: 'Планирование...',
      },
    },
    tradeIn: {
      title: 'Оценщик Trade-In',
      description: 'Получите мгновенную оценку стоимости обмена вашего текущего автомобиля',
      tabs: {
        vehicleInfo: 'Информация об автомобиле',
        condition: 'Состояние',
        results: 'Результаты'
      },
      form: {
        labels: {
          make: 'Марка',
          model: 'Модель',
          year: 'Год',
          mileage: 'Пробег (км)',
          condition: 'Общее состояние',
          accident: 'История аварий',
          serviceHistory: 'История обслуживания',
          modifications: 'Модификации'
        },
        placeholders: {
          selectMake: 'Выберите марку',
          selectModel: 'Выберите модель',
          selectYear: 'Выберите год',
          enterMileage: 'Введите пробег в километрах',
          selectCondition: 'Выберите общее состояние',
          selectAccidentHistory: 'Выберите историю аварий',
          selectServiceHistory: 'Выберите историю обслуживания',
          selectModifications: 'Выберите модификации'
        },
        options: {
          condition: {
            excellent: 'Отличное',
            good: 'Хорошее',
            fair: 'Удовлетворительное',
            poor: 'Плохое'
          },
          accident: {
            none: 'Без аварий',
            minor: 'Мелкая авария',
            major: 'Серьезная авария',
            multiple: 'Несколько аварий'
          },
          serviceHistory: {
            complete: 'Полная история обслуживания',
            partial: 'Частичная история обслуживания',
            none: 'Нет истории обслуживания'
          },
          modifications: {
            none: 'Без модификаций',
            minor: 'Небольшие модификации',
            major: 'Значительные модификации'
          }
        }
      },
      validation: {
        makeRequired: 'Пожалуйста, выберите марку',
        modelRequired: 'Пожалуйста, выберите модель',
        yearRequired: 'Пожалуйста, выберите год',
        mileageRequired: 'Пожалуйста, введите пробег',
        mileageInvalid: 'Пожалуйста, введите действительный пробег',
        conditionRequired: 'Пожалуйста, выберите общее состояние',
        accidentRequired: 'Пожалуйста, выберите историю аварий',
        serviceRequired: 'Пожалуйста, выберите историю обслуживания',
        modificationsRequired: 'Пожалуйста, выберите модификации'
      },
      results: {
        title: 'Ваша оценка Trade-In',
        estimatedValue: 'Оценочная стоимость обмена',
        range: 'Диапазон',
        confidence: 'Уровень достоверности',
        confidenceLevels: {
          high: 'Высокий',
          medium: 'Средний',
          low: 'Низкий'
        },
        factors: {
          title: 'Факторы, влияющие на вашу оценку',
          positive: 'Положительные факторы',
          negative: 'Отрицательные факторы',
          neutral: 'Нейтральные факторы'
        },
        recommendations: {
          title: 'Рекомендации',
          maintenance: 'Рассмотрите решение проблем с техническим обслуживанием перед обменом',
          documentation: 'Соберите все сервисные записи и документацию',
          inspection: 'Получите профессиональную инспекцию для точной оценки',
          timing: 'Учитывайте время рынка для вашей конкретной марки и модели'
        },
        disclaimer: {
          title: 'Важная оговорка',
          text: 'Это расчетная стоимость, основанная на предоставленной информации. Фактические стоимости обмена могут варьироваться в зависимости от политики дилера, текущих рыночных условий и физического осмотра автомобиля. Мы рекомендуем получить предложения от нескольких дилеров для наиболее точной оценки.'
        }
      },
      actions: {
        calculate: 'Рассчитать оценку',
        recalculate: 'Пересчитать',
        getQuotes: 'Получить предложения дилеров',
        startOver: 'Начать заново',
        close: 'Закрыть',
        next: 'Далее',
        previous: 'Назад'
      },
      loading: {
        calculating: 'Расчет вашей оценки...',
        fetchingData: 'Получение рыночных данных...'
      }
    },
    badges: {
      new: 'Новый',
      certified: 'Сертифицированный',
    },
  },

  hero: {
    title: 'Найдите Ваш Идеальный Автомобиль',
    subtitle: 'Ищите среди тысяч качественных подержанных автомобилей',
    searchButton: 'Найти Автомобили',
    advancedSearch: 'Расширенный Поиск',
    vehicleTypes: {
      cars: 'Автомобили',
      motorbikes: 'Мотоциклы',
      trucks: 'Грузовики',
    },
    searchForm: {
      make: 'Марка',
      model: 'Модель',
      priceFrom: 'Цена От',
      priceTo: 'Цена До',
      yearFrom: 'Год От',
      mileage: 'Пробег (км)',
      location: 'Местоположение',
      anyMake: 'Любая Марка',
      anyModel: 'Любая Модель',
      minPrice: 'Минимальная Цена',
      maxPrice: 'Максимальная Цена',
      minYear: 'Минимальный Год',
      anyYear: 'Любой Год',
      anyMileage: 'Любой Пробег',
      maxMileage: 'Максимальный Пробег',
      noMin: 'Без Минимума',
      noMax: 'Без Максимума',
      enterLocation: 'Введите город или почтовый индекс',
    },
    availableCars: 'Более 50,000 автомобилей доступны по всей стране',
  },

  // Last Search Section
  lastSearch: {
    title: 'Последний поиск',
    description: 'Автомобили BMW от €20,000 - €35,000, годы 2019-2022 • Найдено 247 результатов',
    viewMore: 'Показать ещё',
    matchPercentage: '% совпадение',
  },

  // Interesting Suggestions Section
  suggestions: {
    title: 'Это может вас заинтересовать',
    description: 'Свежие объявления BMW, соответствующие вашим критериям • Недавно добавлены на платформу',
    seeMore: 'Показать больше предложений',
    daysAgo: 'д назад',
  },

  // Popular Brands Section
  brands: {
    title: 'Покупки по брендам',
    description: 'Просматривайте автомобили от самых популярных производителей',
    carsCount: 'автомобилей',
  },

  header: {
    welcome: 'Добро пожаловать в CarMarket365',
    signIn: 'Войти',
    signOut: 'Выйти',
    myAccount: 'Мой аккаунт',
    dashboard: 'Панель управления',
    home: 'Главная',
    browseCars: 'Просмотр автомобилей',
    sellCar: 'Продать автомобиль',
    savedCars: 'Сохранённые автомобили',
    financing: 'Финансирование',
    about: 'О нас',
    contact: 'Контакты',
    faq: 'Часто задаваемые вопросы',
    help: 'Помощь',
  },

  cars: {
    title: 'Автомобили на продажу',
    searchPlaceholder: 'Марка, модель или ключевое слово',
    noResults: 'Не найдено автомобилей, соответствующих вашим критериям',
    resultsCount: 'Найдено {count} транспортных средств',
    viewDetails: 'Просмотр деталей',
    contactSeller: 'Связаться с продавцом',
    saveToFavorites: 'Сохранить в избранное',
    removeFromFavorites: 'Удалить из избранного',
    carDetails: 'Детали автомобиля',
    specifications: 'Характеристики',
    fuelType: 'Тип топлива',
    transmission: 'Коробка передач',
    bodyType: 'Тип кузова',
    exteriorColor: 'Внешний цвет',
    interiorColor: 'Цвет салона',
    drivetrain: 'Привод',
    vin: 'VIN номер',
    inspection: 'Осмотр',
    history: 'История',
    financing: 'Финансирование',
    testDrive: 'Тест-драйв',
    makeOffer: 'Сделать предложение',
    featured: 'Рекомендуемые объявления',
    handpicked: 'Отобранные автомобили для вас',
    discover: 'Откройте для себя наши тщательно отобранные премиум автомобили',
    allCars: 'Все автомобили',
    newCars: 'Новые автомобили',
    certifiedPreOwned: 'Сертифицированные б/у',
    electric: 'Электрические',
    luxury: 'Люксовые',
    viewAllCars: 'Посмотреть все автомобили',
  },

  filters: {
    title: 'Фильтры поиска',
    anyMake: 'Любая марка',
    anyModel: 'Любая модель',
    anyYear: 'Любой год',
    priceRange: 'Диапазон цен',
    priceMin: 'Минимальная цена',
    priceMax: 'Максимальная цена',
    yearRange: 'Диапазон лет',
    yearMin: 'Минимальный год',
    yearMax: 'Максимальный год',
    mileageMax: 'Максимальный пробег',
    location: 'Местоположение',
    fuelTypes: 'Тип топлива',
    transmissionTypes: 'Коробка передач',
    bodyTypes: 'Тип кузова',
    condition: 'Состояние',
    applyFilters: 'Применить фильтры',
    clearFilters: 'Очистить фильтры',
  },

  auth: {
    signIn: 'Войти',
    signUp: 'Регистрация',
    signOut: 'Выйти',
    email: 'Электронная почта',
    password: 'Пароль',
    confirmPassword: 'Подтвердить пароль',
    firstName: 'Имя',
    lastName: 'Фамилия',
    phoneNumber: 'Номер телефона',
    rememberMe: 'Запомнить меня',
    forgotPassword: 'Забыли пароль?',
    createAccount: 'Создать аккаунт',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    dontHaveAccount: 'Ещё нет аккаунта?',
    loginWith: 'Или продолжить с',
    registerAs: 'Зарегистрироваться как',
    privatePerson: 'Частное лицо',
    dealerAccount: 'Аккаунт дилера',
    userType: 'Я',
    
    // SignIn page specific
    backToHome: 'Назад на главную',
    signInToAccount: 'Войти в ваш аккаунт',
    welcomeBack: 'Добро пожаловать',
    enterCredentials: 'Введите ваши данные для доступа к аккаунту',
    privatePersonDescription: 'Покупайте или продавайте свой автомобиль',
    dealerDescription: 'Профессиональный продавец',
    pro: 'Профи',
    enterYourEmail: 'Введите ваш email',
    enterYourPassword: 'Введите ваш пароль',
    signingIn: 'Выполняется вход...',
    orContinueWith: 'Или продолжить с',
    google: 'Google',
    facebook: 'Facebook',
    createPrivateAccount: 'Создать личный аккаунт',
    registerAsDealer: 'Зарегистрироваться как дилер',
    dealerBenefits: 'Преимущества дилера',
    professionalDashboard: '• Профессиональная панель дилера',
    inventoryManagement: '• Расширенное управление запасами',
    customerTracking: '• Отслеживание клиентских запросов',
    enhancedVisibility: '• Повышенная видимость объявлений',
    analyticsInsights: '• Аналитика и статистика',
    
    // UserSignUp page specific
    createYourAccount: 'Создайте ваш аккаунт',
    joinThousands: 'Присоединяйтесь к тысячам автолюбителей',
    privateAccount: 'Личный аккаунт',
    buyAndSellCars: 'Покупайте и продавайте автомобили, сохраняйте избранное и управляйте объявлениями',
    fullName: 'Полное имя',
    enterFullName: 'Введите ваше полное имя',
    emailAddress: 'Адрес электронной почты',
    createStrongPassword: 'Создайте надёжный пароль',
    confirmYourPassword: 'Подтвердите ваш пароль',
    mustBeCharacters: 'Должно быть не менее 8 символов',
    agreeToTerms: 'Я согласен с',
    termsOfService: 'Условиями обслуживания',
    and: 'и',
    privacyPolicy: 'Политикой конфиденциальности',
    creatingAccount: 'Создание аккаунта...',
    wantSellAsDealer: 'Хотите продавать автомобили как дилер?',
    createDealerAccount: 'Создать аккаунт дилера',
    joinCommunityText: 'Создавая аккаунт, вы присоединяетесь к нашему сообществу автолюбителей и соглашаетесь с правилами платформы.',
    
    // Error messages for signup
    pleaseAgreeTerms: 'Пожалуйста, согласитесь с условиями',
    passwordsNotMatch: 'Пароли не совпадают',
    passwordMinLength: 'Пароль должен содержать не менее 8 символов',
    registrationFailed: 'Регистрация не удалась',
    
    // DealerSignUp page specific
    backToSignIn: 'Назад к входу',
    dealerRegistration: 'Регистрация дилера',
    joinCarMarketDealer: 'Присоединиться к CarMarket365 как профессиональный дилер',
    businessInformation: 'Информация о бизнесе',
    tellUsAboutBusiness: 'Расскажите нам о вашем автосалоне или бизнесе',
    businessName: 'Название компании',
    businessNamePlaceholder: 'Название вашей компании ООО',
    businessType: 'Тип бизнеса',
    selectBusinessType: 'Выберите тип бизнеса',
    carDealership: 'Автосалон',
    usedCarLot: 'Площадка подержанных автомобилей',
    autoTrader: 'Автотрейдер',
    carBroker: 'Автоброкер',
    rentalCompany: 'Прокатная компания',
    other: 'Другое',
    vatNumber: 'НДС номер',
    vatNumberPlaceholder: 'RU123456789',
    taxId: 'Налоговый номер',
    optional: 'Опционально',
    yearEstablished: 'Год основания',
    selectYear: 'Выберите год',
    businessDescription: 'Описание бизнеса',
    businessDescriptionPlaceholder: 'Опишите ваш бизнес, специализации и услуги...',
    contactPerson: 'Контактное лицо',
    primaryContactInfo: 'Основная контактная информация для вашего бизнеса',
    position: 'Должность',
    positionPlaceholder: 'например, Владелец, Менеджер по продажам',
    businessEmail: 'Корпоративный email',
    businessEmailPlaceholder: 'business@example.com',
    businessAddress: 'Адрес бизнеса',
    dealershipLocation: 'Физическое местоположение вашего автосалона',
    streetAddress: 'Уличный адрес',
    streetAddressPlaceholder: 'ул. Бизнес-центр, 123',
    city: 'Город',
    cityPlaceholder: 'Москва',
    stateRegion: 'Регион/Область',
    stateRegionPlaceholder: 'Московская область',
    postalCode: 'Почтовый индекс',
    postalCodePlaceholder: '101000',
    country: 'Страна',
    selectCountry: 'Выберите страну',
    germany: 'Германия',
    austria: 'Австрия',
    switzerland: 'Швейцария',
    netherlands: 'Нидерланды',
    belgium: 'Бельгия',
    france: 'Франция',
    italy: 'Италия',
    spain: 'Испания',
    accountSetup: 'Настройка аккаунта',
    createSecureDealerAccount: 'Создайте ваш защищённый аккаунт дилера',
    termsAndAgreements: 'Условия и соглашения',
    acceptTermsConditions: 'Я принимаю Условия и положения',
    agreeToTermsAndDealer: 'Вы соглашаетесь с нашими Условиями обслуживания и Соглашением с дилером.',
    acceptPrivacyPolicy: 'Я принимаю Политику конфиденциальности',
    understandDataCollection: 'Вы понимаете, как мы собираем и используем ваши данные.',
    receiveMarketingCommunications: 'Я хотел бы получать маркетинговые коммуникации',
    getUpdatesFeatures: 'Получайте обновления о новых функциях и бизнес-возможностях.',
    alreadyHaveAccountSignIn: 'Уже есть аккаунт? Войти',
    
    // Validation error messages for dealer signup
    businessNameRequired: 'Название компании обязательно',
    businessTypeRequired: 'Тип бизнеса обязателен',
    vatNumberRequired: 'НДС номер обязателен',
    firstNameRequired: 'Имя обязательно',
    lastNameRequired: 'Фамилия обязательна',
    emailRequired: 'Email обязателен',
    phoneRequired: 'Номер телефона обязателен',
    streetRequired: 'Уличный адрес обязателен',
    cityRequired: 'Город обязателен',
    postalCodeRequired: 'Почтовый индекс обязателен',
    passwordRequired: 'Пароль обязателен',
    confirmPasswordRequired: 'Пожалуйста, подтвердите пароль',
    validEmailRequired: 'Пожалуйста, введите действительный адрес электронной почты',
    validVatNumber: 'Пожалуйста, введите действительный НДС номер (например, RU123456789)',
    passwordMinEightChars: 'Пароль должен содержать не менее 8 символов',
    acceptTermsRequired: 'Вы должны принять условия и положения',
    acceptPrivacyRequired: 'Вы должны принять политику конфиденциальности',
  },

  sell: {
    title: 'Продайте свой автомобиль',
    sellYourCar: 'Продайте свой транспорт',
    carInformation: 'Информация об автомобиле',
    uploadPhotos: 'Загрузить фотографии',
    setPrice: 'Установить цену',
    contactInformation: 'Контактная информация',
    publish: 'Опубликовать',
    draft: 'Сохранить как черновик',
    preview: 'Предварительный просмотр',
    required: 'Обязательно',
    optional: 'Опционально',
    addPhotos: 'Добавить фотографии',
    removePhoto: 'Удалить фотографию',
    mainPhoto: 'Главная фотография',
    additionalInfo: 'Дополнительная информация',
    sellerNotes: 'Заметки продавца',
    
    // Step titles
    steps: {
      vehicleType: 'Тип транспорта',
      basicInfo: 'Основная информация',
      details: 'Детали',
      photosAndContact: 'Фото и контакты',
    },
    
    // Vehicle type selection
    vehicleTypes: {
      car: {
        name: 'Автомобиль',
        description: 'Седаны, кроссоверы, купе, хэтчбеки',
      },
      truck: {
        name: 'Грузовик',
        description: 'Пикапы, коммерческий транспорт',
      },
      motorbike: {
        name: 'Мотоцикл',
        description: 'Мотоциклы, скутеры, квадроциклы',
      },
    },
    
    // Headers and descriptions
    headers: {
      vehicleTypeQuestion: 'Какой тип транспорта вы продаете?',
      basicInformation: 'Основная информация',
      basicInfoDescription: 'Расскажите нам о вашем {vehicleType}',
      additionalDetails: 'Дополнительные детали',
      additionalDetailsDescription: 'Добавьте больше деталей о вашем {vehicleType}',
      photosAndContact: 'Фотографии и контактная информация',
      photosAndContactDescription: 'Добавьте фотографии и контактные данные',
    },
    
    // Form fields and labels
    fields: {
      make: 'Марка',
      model: 'Модель',
      year: 'Год',
      mileage: 'Пробег',
      condition: 'Состояние',
      fuelType: 'Тип топлива',
      transmission: 'Коробка передач',
      exteriorColor: 'Внешний цвет',
      interiorColor: 'Внутренний цвет',
      askingPrice: 'Запрашиваемая цена',
      featuresAndOptions: 'Характеристики и опции',
      description: 'Описание',
      vehiclePhotos: 'Фотографии транспорта',
      contactName: 'Имя для связи',
      phoneNumber: 'Номер телефона',
      emailAddress: 'Адрес электронной почты',
      location: 'Местоположение',
    },
    
    // Placeholders
    placeholders: {
      selectMake: 'Выберите марку',
      enterModel: 'Введите модель',
      selectYear: 'Выберите год',
      selectCondition: 'Выберите состояние',
      enterMileage: 'Введите пробег',
      selectFuelType: 'Выберите тип топлива',
      selectTransmission: 'Выберите коробку передач',
      exteriorColorExample: 'напр. белый, черный, серебристый',
      interiorColorExample: 'напр. черный, бежевый, серый',
      priceExample: '25.000',
      descriptionExample: 'Опишите состояние вашего транспорта, историю и дополнительные детали...',
      yourFullName: 'Ваше полное имя',
      phoneExample: '(8) 123-456-78',
      emailExample: 'ваш.email@пример.ru',
      cityState: 'Город, Область',
      yourName: 'Ваше имя',
      yourPhoneNumber: 'Ваш номер телефона',
      yourEmail: 'Ваш email',
      cityCountry: 'Город, Страна',
      enterAskingPrice: 'Введите желаемую цену',
      describeYourVehicle: 'Опишите ваш автомобиль...',
      selectFuel: 'Выберите тип топлива',
      selectTransmissionType: 'Выберите тип трансмиссии',
      choosePhotos: 'Выберите фотографии',
    },
    
    // Headers
    headers: {
      vehicleTypeQuestion: 'Какой тип транспорта вы продаете?',
      basicInformation: 'Основная информация',
      basicInfoDescription: 'Расскажите нам о вашем {vehicleType}',
      additionalDetails: 'Дополнительные детали',
      additionalDetailsDescription: 'Добавьте больше деталей о вашем {vehicleType}',
      photosAndContact: 'Фотографии и контактная информация',
      photosAndContactDescription: 'Добавьте фотографии и ваши контактные данные',
      vehicleDetails: 'Детали автомобиля',
      photosAndContactInfo: 'Фотографии и контактная информация',
      uploadVehiclePhotos: 'Загрузить фотографии автомобиля',
      addUpToTenPhotos: 'Добавить до 10 фотографий',
    },
    
    // Button labels
    buttons: {
      nextStep: 'Следующий шаг',
      previous: 'Предыдущий',
      createListing: 'Создать объявление',
    },
    
    // Preview section
    preview: {
      title: 'Предварительный просмотр',
      yourVehicle: 'Ваш транспорт',
      milesLabel: 'километров',
      priceLabel: 'Цена',
      photosCount: '{count} фотографи{plural}',
      photo: 'я',
      photos: 'й',
    },
    
    // Photo upload
    photos: {
      instruction: 'Добавьте до 10 высококачественных фотографий вашего транспорта. Первая фотография будет основным изображением в результатах поиска.',
      selected: '{count} фотографи{plural} выбрано',
      photo: 'я',
      photos: 'й',
    },
    
    // Vehicle makes (can be expanded)
    makes: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Hyundai'],
    
    // Fuel types
    fuelTypes: {
      gasoline: 'Бензин',
      electric: 'Электро',
      hybrid: 'Гибрид',
      diesel: 'Дизель',
      pluginHybrid: 'Подключаемый гибрид',
      flexFuel: 'Гибкое топливо',
      cng: 'КПГ',
      lpg: 'ГБО',
    },
    
    // Transmissions
    transmissions: {
      automatic: 'Автоматическая',
      manual: 'Механическая',
      cvt: 'Вариатор',
    },

    // Body Types
    bodyTypes: {
      sedan: 'Седан',
      suv: 'Внедорожник',
      truck: 'Грузовик',
      coupe: 'Купе',
      hatchback: 'Хэтчбек',
      convertible: 'Кабриолет',
      wagon: 'Универсал',
      van: 'Фургон',
      crossover: 'Кроссовер',
    },

    // Drivetrains
    drivetrains: {
      fwd: 'Передний привод',
      rwd: 'Задний привод',
      awd: 'Полный привод',
      fourwd: 'Привод 4x4',
    },

    // Colors
    colors: {
      black: 'Чёрный',
      white: 'Белый',
      silver: 'Серебристый',
      gray: 'Серый',
      red: 'Красный',
      blue: 'Синий',
      green: 'Зелёный',
      brown: 'Коричневый',
      gold: 'Золотой',
      orange: 'Оранжевый',
      purple: 'Фиолетовый',
      yellow: 'Жёлтый',
    },
    
    // Conditions
    conditions: {
      new: 'Новый',
      likeNew: 'Как новый',
      excellent: 'Отличное',
      veryGood: 'Очень хорошее',
      good: 'Хорошее',
      fair: 'Удовлетворительное',
      poor: 'Плохое',
    },
    
    // Features list
    features: {
      airConditioning: 'Кондиционер',
      leatherSeats: 'Кожаные сидения',
      heatedSeats: 'Подогрев сидений',
      sunroof: 'Люк',
      gpsNavigation: 'GPS навигация',
      backupCamera: 'Камера заднего вида',
      bluetooth: 'Bluetooth',
      usbPorts: 'USB порты',
      premiumSound: 'Премиум аудио',
      keylessEntry: 'Бесключевой доступ',
      remoteStart: 'Удаленный запуск',
      cruiseControl: 'Круиз-контроль',
      parkingSensors: 'Парктроник',
      blindSpotMonitoring: 'Контроль слепых зон',
    },
  },

  countries: {
    northMacedonia: 'Северная Македония',
    albania: 'Албания',
    kosovo: 'Косово',
    slovenia: 'Словения',
    latvia: 'Латвия',
    global: 'Глобальный',
    chooseCountry: 'Выберите свою страну',
    changeCountry: 'Изменить страну',
    detectedLocation: 'Определённое местоположение',
    currentSite: 'Текущий сайт',
    localBenefits: 'Местные преимущества',
    localCurrency: 'Местная валюта и цены',
    localLanguages: 'Поддержка родного языка',
    localDealers: 'Местные дилеры и инвентарь',
    regionalFeatures: 'Региональные особенности',
  },

  redirect: {
    welcome: 'Добро пожаловать в CarMarket365!',
    detectedFrom: 'Мы определили, что вы посещаете из',
    redirectMessage: 'Вы будете перенаправлены на наш сайт {country} для лучшего местного опыта, или вы можете выбрать другую страну.',
    continueToSite: 'Перейти на сайт {country}',
    chooseDifferent: 'Выбрать другую страну',
    localBenefitsTitle: 'Местные преимущества для {country}',
    howDetected: 'Как мы это определили?',
    hideDetails: 'Скрыть детали',
    changeAnytime: 'Вы можете изменить предпочтение страны в любое время в заголовке.',
    countrySpecificExperience: 'Каждый сайт страны предлагает локализованный контент, цены и языковые опции для лучшего опыта.',
    adminTestingMode: 'Режим администратора/тестирования',
    adminNotAvailable: 'Режим администратора/тестирования - недоступен для клиентов',
    selectCountryToContinue: 'Пожалуйста, выберите свою страну, чтобы продолжить. Это определит ваш местный сайт, язык и валюту.',
  },

  modals: {
    close: 'Закрыть',
    confirm: 'Подтвердить',
    cancel: 'Отмена',
    save: 'Сохранить',
    delete: 'Удалить',
    contactSeller: 'Связаться с продавцом',
    scheduleTestDrive: 'Запланировать тест-драйв',
    requestFinancing: 'Запросить финансирование',
    reportListing: 'Пожаловаться на объявление',
    shareListng: 'Поделиться объявлением',
    sendMessage: 'Отправить сообщение',
    yourName: 'Ваше имя',
    yourEmail: 'Ваша электронная почта',
    yourPhone: 'Ваш телефон',
    message: 'Сообщение',
    interestedIn: 'Меня интересует',
    preferredTime: 'Предпочтительное время',
    additionalNotes: 'Дополнительные заметки',
  },

  footer: {
    aboutUs: 'Ваш надёжный рынок качественных подержанных автомобилей. Найдите свой идеальный автомобиль среди тысяч объявлений.',
    quickLinks: 'Быстрые ссылки',
    searchCars: 'Поиск автомобилей',
    sellYourCar: 'Продайте свой автомобиль',
    registeredDealers: 'Зарегистрированные дилеры',
    carReviews: 'Обзоры автомобилей',
    support: 'Поддержка',
    contactUs: 'Свяжитесь с нами',
    safetyTips: 'Советы по безопасности',
    dealerSupport: 'Поддержка дилеров',
    faq: 'Часто задаваемые вопросы',
    legal: 'Правовая информация',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия обслуживания',
    cookiePolicy: 'Политика файлов cookie',
    imprint: 'Выходные данные',
    accessibility: 'Доступность',
    dashboard: 'Панель управления',
    adminPanel: 'Панель администратора',
    dealerDashboard: 'Панель дилера',
    myDashboard: 'Моя панель',
    signInToAccess: 'Войдите для доступа к панели управления',
    followUs: 'Подписывайтесь на нас',
    newsletter: 'Информационная рассылка',
    subscribeNewsletter: 'Подписаться на рассылку',
    emailAddress: 'Адрес электронной почты',
    subscribe: 'Подписаться',
    copyright: 'Авторское право',
    allRightsReserved: 'Все права защищены',
  },

  errors: {
    generic: 'Что-то пошло не так. Пожалуйста, попробуйте ещё раз.',
    network: 'Ошибка сети. Пожалуйста, проверьте своё соединение.',
    notFound: 'Запрашиваемый элемент не найден.',
    unauthorized: 'У вас нет разрешения на доступ к этому ресурсу.',
    forbidden: 'Доступ к этому ресурсу запрещён.',
    serverError: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
    validation: 'Пожалуйста, проверьте свои данные и попробуйте ещё раз.',
    required: 'Это поле обязательно.',
    invalidEmail: 'Пожалуйста, введите действительный адрес электронной почты.',
    invalidPhone: 'Пожалуйста, введите действительный номер телефона.',
    passwordTooShort: 'Пароль должен быть длиной не менее 8 символов.',
    passwordMismatch: 'Пароли не совпадают.',
    fileTooBig: 'Размер файла слишком большой.',
    invalidFileType: 'Недопустимый тип файла.',
    noInternetConnection: 'Нет интернет-соединения.',
    sessionExpired: 'Ваша сессия истекла. Пожалуйста, войдите снова.',
  },

  success: {
    saved: 'Успешно сохранено!',
    updated: 'Успешно обновлено!',
    deleted: 'Успешно удалено!',
    sent: 'Успешно отправлено!',
    published: 'Успешно опубликовано!',
    registered: 'Успешно зарегистрирован!',
    loggedIn: 'Успешный вход в систему!',
    loggedOut: 'Успешный выход из системы!',
    passwordReset: 'Письмо для сброса пароля отправлено!',
    subscribed: 'Успешно подписан!',
    contactSent: 'Контактное сообщение отправлено!',
    favoriteAdded: 'Добавлено в избранное!',
    favoriteRemoved: 'Удалено из избранного!',
  },

  admin: {
    panel: 'Панель администратора',
    dashboard: 'Панель управления администратора',
  },

  pages: {
    helpCenter: 'Центр поддержки',
    feedback: 'Обратная связь',
    disclaimer: 'Отказ от ответственности',
    carInsurance: 'Автострахование',
    underConstruction: 'В разработке',
    underConstructionMessage: 'Данная страница находится в разработке. Мы усердно работаем над созданием потрясающих функций. Пожалуйста, зайдите позже или продолжите изучать нашу главную страницу.',
    backToHome: 'Вернуться на главную',
    contactUs: 'Свяжитесь с нами',
    
    // Условия обслуживания
    termsOfService: {
      title: 'Условия обслуживания',
      subtitle: 'Правовые условия использования нашей платформы автомобильного рынка.',
      backToHome: 'Вернуться на главную',
      termsAndConditions: 'Условия и положения',
      termsDescription: 'Пожалуйста, внимательно ознакомьтесь с этими условиями перед использованием нашей платформы.',
      overviewText: 'Данные Условия обслуживания регулируют использование вами платформы CarMarket365 и определяют права и обязанности всех пользователей. Получая доступ к нашей платформе, вы соглашаетесь соблюдать эти условия.',
      userResponsibilities: 'Обязанности пользователя',
      userResponsibilitiesList: [
        'Предоставлять точную информацию',
        'Поддерживать уважительное общение',
        'Соблюдать все применимые законы',
        'Защищать учетные данные вашего аккаунта'
      ],
      platformRules: 'Правила платформы',
      platformRulesList: [
        'Запрещены мошеннические объявления',
        'Честные описания транспортных средств',
        'Профессиональное общение',
        'Уважение к конфиденциальности других пользователей'
      ],
      serviceLimitations: 'Ограничения услуг',
      serviceLimitationsList: [
        'Доступность платформы не гарантируется',
        'Техническое обслуживание может вызвать простой',
        'Ограниченная ответственность за действия пользователей',
        'Отсутствие гарантий на контент третьих лиц'
      ],
      disputeResolution: 'Разрешение споров',
      disputeResolutionList: [
        'Поощряется прямое общение',
        'Доступно посредничество платформы',
        'Определены процедуры эскалации',
        'Сохраняются правовые средства защиты'
      ],
      additionalTerms: 'Дополнительные важные условия',
      additionalTermsDescription: 'Ключевые положения, регулирующие использование нашей платформы.',
      accountManagement: 'Управление аккаунтом',
      accountManagementList: [
        'Один аккаунт на человека',
        'Требования к безопасности пароля',
        'Политики приостановки аккаунта',
        'Хранение данных после прекращения'
      ],
      intellectualProperty: 'Интеллектуальная собственность',
      intellectualPropertyList: [
        'Владение контентом платформы',
        'Права на пользовательский контент',
        'Рекомендации по использованию торговых марок',
        'Политики нарушения авторских прав'
      ],
      questionsAboutTerms: 'Вопросы об этих условиях?',
      questionsText: 'Если у вас есть вопросы об этих условиях или вам нужны разъяснения по каким-либо положениям, пожалуйста, обратитесь к нашей юридической команде по адресу legal@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      contactLegalTeam: 'Связаться с юридической командой'
    },

    // Политика конфиденциальности
    privacyPolicy: {
      title: 'Политика конфиденциальности',
      subtitle: 'Ваша конфиденциальность важна для нас. Узнайте, как мы собираем, используем и защищаем вашу личную информацию.',
      backToHome: 'Вернуться на главную',
      ourPrivacyCommitment: 'Наши обязательства по конфиденциальности',
      commitmentDescription: 'В CarMarket365 мы привержены защите вашей конфиденциальности и обеспечению безопасности вашей личной информации.',
      overviewText: 'Данная политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании нашей платформы автомобильного рынка. Мы привержены поддержанию высочайших стандартов защиты конфиденциальности и безопасности данных.',
      dataSecurity: 'Безопасность данных',
      dataSecurityList: [
        'Шифрование отраслевого стандарта',
        'Безопасная передача данных',
        'Регулярные аудиты безопасности',
        'Ограниченный контроль доступа'
      ],
      transparency: 'Прозрачность',
      transparencyList: [
        'Четкие практики сбора данных',
        'Открытость об использовании данных',
        'Регулярные обновления политики',
        'Уведомление пользователей об изменениях'
      ],
      userRights: 'Права пользователей',
      userRightsList: [
        'Доступ к вашим данным',
        'Право на исправление информации',
        'Запросы на удаление данных',
        'Отказ от коммуникаций'
      ],
      dataMinimization: 'Минимизация данных',
      dataMinimizationList: [
        'Сбор только необходимых данных',
        'Использование по назначению',
        'Автоматическое истечение данных',
        'Регулярная очистка данных'
      ],
      informationWeCollect: 'Информация, которую мы собираем',
      informationDescription: 'Мы собираем информацию, которую вы предоставляете напрямую и автоматически при использовании нашей платформы.',
      personalInformation: 'Личная информация',
      personalInformationList: [
        'Имя и контактные данные',
        'Информация для регистрации аккаунта',
        'Предпочтения в общении',
        'Информация профиля'
      ],
      usageData: 'Данные об использовании',
      usageDataList: [
        'Данные взаимодействия с веб-сайтом',
        'История поиска и просмотра',
        'Информация об устройстве и браузере',
        'Данные о местоположении (при разрешении)'
      ],
      questionsAboutPrivacy: 'Вопросы о конфиденциальности?',
      privacyQuestionsText: 'Если у вас есть вопросы об этой политике конфиденциальности или наших практиках обработки данных, пожалуйста, обратитесь к нашей команде по конфиденциальности по адресу privacy@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      contactPrivacyTeam: 'Связаться с командой по конфиденциальности'
    },

    // Страница-заглушка
    placeholder: {
      underConstruction: 'В разработке',
      underConstructionMessage: 'Данная страница находится в разработке. Мы усердно работаем над созданием потрясающих функций. Пожалуйста, зайдите позже или продолжите изучать нашу главную страницу.',
      backToHome: 'Вернуться на главную',
      contactUs: 'Свяжитесь с нами'
    },

    // Часто задаваемые вопросы
    faq: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Найдите ответы на распространенные вопросы о покупке, продаже, финансировании и использовании CarMarket365.',
      searchPlaceholder: 'Поиск в FAQ...',
      browseByCategory: 'Поиск по категориям',
      allQuestions: 'Все вопросы',
      stillNeedHelp: 'Нужна дополнительная помощь?',
      stillNeedHelpDescription: 'Не можете найти то, что ищете? Наша команда поддержки готова помочь.',
      callSupport: 'Позвонить в службу поддержки',
      emailUs: 'Написать нам',
      liveChat: 'Живой чат',
      available247: 'Доступно 24/7',
      noResultsFound: 'Результаты не найдены',
      noResultsText: 'Попробуйте поиск с другими ключевыми словами или просмотрите по категориям.',
      clearSearch: 'Очистить поиск',
      commonQuestionsAbout: 'Часто задаваемые вопросы о',
      
      categories: {
        buying: 'Покупка автомобилей',
        selling: 'Продажа автомобилей',
        financing: 'Финансирование и платежи',
        safety: 'Безопасность и защита',
        account: 'Аккаунт и поддержка'
      },

      buyingFaqs: [
        {
          question: 'Как найти автомобили на CarMarket365?',
          answer: 'Вы можете искать автомобили с помощью формы поиска на главной странице или на странице "Просмотр автомобилей". Фильтруйте по марке, модели, году, ценовому диапазону, местоположению и многому другому. Используйте расширенный поиск для детальной фильтрации.'
        },
        {
          question: 'Все ли объявления проверены?',
          answer: 'Да, все объявления на CarMarket365 проверены. Мы проводим проверку биографических данных всех дилеров и частных продавцов, а также проверяем информацию о транспортных средствах на точность перед размещением.'
        },
        {
          question: 'Могу ли я записаться на тест-драйв?',
          answer: 'Конечно! Вы можете записаться на тест-драйв прямо через страницу с деталями автомобиля. Свяжитесь с продавцом, чтобы договориться о подходящем времени и месте для тест-драйва.'
        },
        {
          question: 'Что мне взять с собой для просмотра автомобиля?',
          answer: 'Возьмите действующие водительские права, подтверждение страхования и любые письма о предварительном одобрении финансирования. Если планируете покупать, возьмите банковский чек или документы о финансировании.'
        },
        {
          question: 'Как узнать, справедлива ли цена автомобиля?',
          answer: 'Мы предоставляем оценки рыночной стоимости для всех транспортных средств. Вы также можете сравнить похожие автомобили, проверить отчет об истории транспортного средства и использовать наши инструменты анализа цен.'
        }
      ],

      sellingFaqs: [
        {
          question: 'Как разместить объявление о продаже моего автомобиля?',
          answer: 'Используйте форму "Продать автомобиль" для создания объявления. Вам понадобятся детали транспортного средства, фотографии, информация о состоянии и контактные данные. Процесс занимает около 10-15 минут.'
        },
        {
          question: 'Есть ли плата за размещение объявления?',
          answer: 'Базовые объявления бесплатны для частных продавцов. Мы предлагаем премиум варианты объявлений с повышенной видимостью за небольшую плату. У дилеров разные структуры ценообразования.'
        },
        {
          question: 'Сколько времени требуется для продажи автомобиля?',
          answer: 'В среднем автомобили с правильной ценой и хорошими фотографиями продаются в течение 2-4 недель. Факторы включают ценообразование, состояние, рыночный спрос и качество объявления.'
        },
        {
          question: 'Какие документы мне нужны для продажи автомобиля?',
          answer: 'Вам понадобится свидетельство о праве собственности, регистрация, записи об обслуживании и действующий паспорт. В некоторых регионах требуются дополнительные документы - мы предоставляем региональные рекомендации.'
        },
        {
          question: 'Как установить конкурентную цену на мой автомобиль?',
          answer: 'Используйте наш бесплатный инструмент оценки транспортных средств, изучите похожие объявления, учтите состояние вашего автомобиля, пробег и любой недавний ремонт или улучшения.'
        }
      ],

      financingFaqs: [
        {
          question: 'Могу ли я получить финансирование через CarMarket365?',
          answer: 'Да, мы сотрудничаем с несколькими кредиторами, чтобы предложить конкурентные варианты финансирования. Вы можете получить предварительное одобрение онлайн за несколько минут без влияния на ваш кредитный рейтинг.'
        },
        {
          question: 'Какой кредитный рейтинг мне нужен для автокредитования?',
          answer: 'Мы работаем с кредиторами, которые принимают различные кредитные рейтинги, от отличных до плохих. Требования различаются по кредиторам, но мы помогаем найти варианты для большинства ситуаций.'
        },
        {
          question: 'Как работает процесс подачи заявки на кредит?',
          answer: 'Заполните нашу онлайн-заявку, получите мгновенное предварительное одобрение, выберите ваше транспортное средство и завершите оформление кредита. Весь процесс можно завершить онлайн или по телефону.'
        },
        {
          question: 'В чем разница между предварительной квалификацией и предварительным одобрением?',
          answer: 'Предварительная квалификация дает вам оценку на основе базовой информации. Предварительное одобрение включает проверку кредитной истории и предоставляет твердое кредитное предложение с конкретными условиями.'
        },
        {
          question: 'Могу ли я обменять мой текущий автомобиль?',
          answer: 'Многие из наших партнеров-дилеров принимают автомобили в зачет. Получите оценку обмена с помощью нашего инструмента оценки, затем обсудите варианты с дилером при покупке.'
        }
      ],

      safetyFaqs: [
        {
          question: 'Как оставаться в безопасности при покупке автомобиля?',
          answer: 'Встречайтесь в общественных местах, берите с собой друга, проверяйте личность продавца, тщательно осматривайте транспортное средство и используйте безопасные способы оплаты. Никогда не переводите деньги и не платите до осмотра автомобиля.'
        },
        {
          question: 'Какие способы оплаты самые безопасные?',
          answer: 'Используйте банковские чеки, банковские переводы или финансирование через проверенных кредиторов. Избегайте банковских переводов, личных чеков или наличных для больших сумм.'
        },
        {
          question: 'Как проверить, что продавец законный?',
          answer: 'Проверьте их профиль на CarMarket365, прочтите отзывы, подтвердите их контактную информацию и встретьтесь лично. Все наши дилеры предварительно проверены и прошли проверку биографических данных.'
        },
        {
          question: 'Что делать, если я подозреваю мошенничество?',
          answer: 'Немедленно сообщите о подозрительной активности через нашу платформу или обратитесь к нашей команде поддержки. Мы серьезно относимся к мошенничеству и оперативно расследуем все сообщения.'
        },
        {
          question: 'Надежны ли отчеты об истории транспортного средства?',
          answer: 'Да, мы предоставляем комплексные отчеты об истории транспортных средств из надежных источников. Они включают историю аварий, записи об обслуживании и информацию о правах собственности.'
        }
      ],

      accountFaqs: [
        {
          question: 'Как создать аккаунт?',
          answer: 'Нажмите "Регистрация" на любой странице и предоставьте ваш электронный адрес, номер телефона и основную информацию. Вы также можете зарегистрироваться через Google или Facebook для более быстрой регистрации.'
        },
        {
          question: 'Я забыл пароль. Как его сбросить?',
          answer: 'Нажмите "Забыли пароль?" на странице входа, введите ваш электронный адрес и следуйте инструкциям по сбросу, которые мы вам отправим. Ссылка для сброса действительна в течение 24 часов.'
        },
        {
          question: 'Как обновить информацию в моем профиле?',
          answer: 'Войдите в ваш аккаунт и перейдите в "Настройки аккаунта", где вы можете обновить личную информацию, контактные данные и предпочтения.'
        },
        {
          question: 'Могу ли я сохранить автомобили для просмотра позже?',
          answer: 'Да! Нажмите значок сердца на любом объявлении автомобиля, чтобы сохранить его в избранное. Получите доступ к сохраненным автомобилям в любое время из панели управления вашего аккаунта.'
        },
        {
          question: 'Как связаться с службой поддержки?',
          answer: 'Используйте страницу "Свяжитесь с нами", звоните (555) 123-HELP, отправляйте письмо на support@carmarket365.com или используйте функцию чата в правом нижнем углу любой страницы.'
        }
      ]
    }
  },

  // Browse Cars Page
  browseCars: {
    title: 'на продажу',
    searchPlaceholder: 'Марка, модель или ключевое слово',
    filtersButton: 'Показать фильтры',
    sortBy: 'Сортировать по',
    sortOptions: {
      relevance: 'Релевантность',
      priceLowToHigh: 'Цена: от низкой к высокой',
      priceHighToLow: 'Цена: от высокой к низкой',
      yearNewestFirst: 'Год: новые сначала',
      yearOldestFirst: 'Год: старые сначала',
      mileageLowToHigh: 'Пробег: от малого к большому',
      mileageHighToLow: 'Пробег: от большого к малому',
      addedRecently: 'Недавно добавленные',
    },
    viewOptions: {
      grid: 'Сетка',
      list: 'Список',
    },
    filters: {
      title: 'Фильтры поиска',
      clearAll: 'Очистить всё',
      apply: 'Применить',
      makeModel: 'Марка и модель',
      priceRange: 'Ценовой диапазон',
      from: 'от',
      to: 'до',
      yearRange: 'Год от',
      mileageRange: 'Максимальный пробег',
      location: 'Местоположение',
      withinRadius: 'в радиусе',
      fuelType: 'Тип топлива',
      transmission: 'Коробка передач',
      bodyType: 'Тип кузова',
      condition: 'Состояние',
      features: 'Особенности',
      color: 'Цвет',
      drivetrain: 'Привод',
      minPrice: 'Минимальная цена',
      maxPrice: 'Максимальная цена',
      noMin: 'Без мин.',
      noMax: 'Без макс.',
      anyLocation: 'Введите город или почтовый индекс',
      kilometers: 'км',
      miles: 'мили',
      any: 'Любой',
    },
    results: {
      showing: 'соответствующих вашим критериям',
      of: 'из',
      results: 'автомобилей найдено',
      noResults: 'Автомобили не найдены',
      noResultsMessage: 'Попробуйте изменить условия поиска',
      tryDifferentFilters: 'Попробуйте другие фильтры',
      loadMore: 'Загрузить ещё',
      endOfResults: 'Конец результатов',
    },
    carCard: {
      viewDetails: 'Посмотреть детали',
      contactSeller: 'Контакт',
      saveToFavorites: 'Сохранить в избранное',
      saved: 'Сохранено',
      featured: 'Рекомендуемое',
      certified: 'Сертифицированное',
      newArrival: 'Новое поступление',
      priceReduced: 'Цена снижена',
      greatDeal: 'Отличная сделка',
      kmAbbrev: 'км',
      miAbbrev: 'ми',
      year: 'год',
      automatic: 'Автоматическая',
      manual: 'Механическая',
      gasoline: 'Бензин',
      diesel: 'Дизель',
      electric: 'Электрический',
      hybrid: 'Гибрид',
      showPhone: 'Показать телефон',
      hidePhone: 'Скрыть телефон',
      callNow: 'Позвонить сейчас',
      sendMessage: 'Отправить сообщение',
      scheduleTour: 'Записаться на осмотр',
      reportListing: 'Пожаловаться на объявление',
      shareListing: 'Поделиться объявлением',
    },
    searchSuggestions: {
      title: 'Предложения поиска',
      recentSearches: 'Недавние поиски',
      clearRecent: 'Очистить недавние',
      popularSearches: 'Популярные поиски',
      suggestedBrands: 'Рекомендуемые марки',
      suggestedModels: 'Рекомендуемые модели',
      noRecentSearches: 'Нет недавних поисков',
    },
    errorStates: {
      failedToLoad: 'Не удалось загрузить',
      networkError: 'Ошибка сети',
      tryAgain: 'Попробовать снова',
      contactSupport: 'Связаться с поддержкой',
    },
  },

  // Advanced Search
  advancedSearch: {
    title: 'Расширенный Поиск Автомобилей',
    subtitle: 'Найдите свой идеальный автомобиль с подробными фильтрами поиска и предпочтениями',
    backToHome: 'Вернуться на Главную',
    searchCars: 'Поиск Автомобилей',
    saveSearch: 'Сохранить Поиск',
    clearAll: 'Очистить Всё',
    active: 'активных',
    filters: 'фильтров',
    filter: 'фильтр',
    
    // Page sections
    sections: {
      basicInformation: {
        title: 'Основная Информация',
        description: 'Установите основные критерии поиска',
      },
      technicalSpecs: {
        title: 'Технические Характеристики',
        description: 'Двигатель, коробка передач и детали производительности',
      },
      featuresEquipment: {
        title: 'Функции и Оборудование',
        description: 'Выберите желаемые функции и оборудование',
      },
      preferencesAndCertifications: {
        title: 'Предпочтения и Сертификации',
        description: 'Дополнительные предпочтения и сертификации',
      },
      vehicleDetails: {
        title: 'Детали Автомобиля',
      },
      priceLocation: {
        title: 'Цена и Местоположение',
      },
      featuresOptions: {
        title: 'Функции и Опции',
        description: 'Выберите функции, которые важны для вас',
      },
    },
    
    // Form fields
    fields: {
      make: 'Марка',
      model: 'Модель',
      bodyType: 'Тип Кузова',
      condition: 'Состояние',
      fuelType: 'Тип Топлива',
      transmission: 'Коробка Передач',
      drivetrain: 'Привод',
      doors: 'Двери',
      seats: 'Места',
      exteriorColor: 'Внешний Цвет',
      interiorColor: 'Цвет Салона',
      colorPreference: 'Цветовые Предпочтения',
      certifications: 'Сертификации',
      location: 'Местоположение',
      radius: 'Радиус',
      searchRadius: 'Радиус поиска',
      sellerType: 'Тип Продавца',
      minYear: 'Мин. Год',
      maxYear: 'Макс. Год',
      maxMileage: 'Максимальный Пробег',
    },
    
    // Placeholders
    placeholders: {
      selectMake: 'Выберите марку',
      enterModel: 'Введите название модели',
      anyMake: 'Любая Марка',
      anyModel: 'Любая Модель',
      anyType: 'Любой Тип',
      selectBodyType: 'Выберите тип кузова',
      selectCondition: 'Выберите состояние',
      selectFuelType: 'Выберите тип топлива',
      selectTransmission: 'Выберите коробку передач',
      selectDrivetrain: 'Выберите привод',
      numberOfDoors: 'Количество дверей',
      numberOfSeats: 'Количество мест',
      anyColor: 'Любой Цвет',
      selectPreferredColor: 'Выберите предпочтительный цвет',
      cityOrPostalCode: 'Город или почтовый индекс',
      cityStateOrZip: 'Город, Регион или Индекс',
      anyMileage: 'Любой Пробег',
      anyCondition: 'Любое Состояние',
      anyDistance: 'Любое Расстояние',
      allSellers: 'Все Продавцы',
      any: 'Любой',
    },
    
    // Range labels
    ranges: {
      priceRange: 'Диапазон Цен',
      yearRange: 'Диапазон Лет',
      mileageRange: 'Диапазон Пробега (км)',
    },
    
    // Distance options
    distances: {
      nationwide: 'По Всей Стране',
      '25': '25 км',
      '50': '50 км',
      '100': '100 км',
      '200': '200 км',
      '250': '250 миль',
      '500': '500 миль',
    },
    
    // Mileage options
    mileage: {
      under10k: 'До 10 000 км',
      under25k: 'До 25 000 км',
      under50k: 'До 50 000 км',
      under75k: 'До 75 000 км',
      under100k: 'До 100 000 км',
      under150k: 'До 150 000 км',
    },
    
    // Seller types
    sellerTypes: {
      dealersOnly: 'Только Дилеры',
      privateOnly: 'Только Частные Продавцы',
      certifiedOnly: 'Только Сертифицированные Дилеры',
    },
    
    // Door options
    doors: {
      '2': '2 двери',
      '3': '3 двери',
      '4': '4 двери',
      '5': '5 дверей',
    },
    
    // Seat options
    seats: {
      '2': '2 места',
      '4': '4 места',
      '5': '5 мест',
      '7': '7 мест',
      '8+': '8+ мест',
    },
    
    // Статические данные автомобилей для расширенного поиска
    staticVehicleData: {
      makes: [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Peugeot', 
        'Renault', 'Opel', 'Fiat', 'Citroen', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
        'Subaru', 'Volvo', 'SEAT', 'Skoda', 'Alfa Romeo', 'Mini', 'Jaguar', 'Land Rover',
        'Porsche', 'Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln', 'Buick', 'GMC',
        'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Tesla', 'Lucid', 'Rivian'
      ],
      bodyTypes: [
        'Седан', 'Внедорожник', 'Хэтчбек', 'Купе', 'Кабриолет', 'Универсал', 'Пикап', 'Фургон',
        'Минивэн', 'Кроссовер', 'Компактный', 'Субкомпактный', 'Среднеразмерный', 'Полноразмерный',
        'Спортивный автомобиль', 'Люксовый', 'Электрический', 'Гибридный'
      ],
      fuelTypes: [
        'Бензин', 'Дизель', 'Гибрид', 'Электрический', 'Подключаемый гибрид', 'Природный газ', 'Пропан',
        'Гибкое топливо', 'Водород', 'Биодизель', 'Этанол E85'
      ],
      transmissions: [
        'Механическая', 'Автоматическая', 'Вариатор', 'Полуавтоматическая', 'Двойное сцепление', '6-ступенчатая механическая',
        '7-ступенчатая автоматическая', '8-ступенчатая автоматическая', '9-ступенчатая автоматическая', '10-ступенчатая автоматическая'
      ],
      drivetrains: [
        'Передний привод', 'Задний привод', 'Полный привод', '4WD', 
        'Подключаемый 4WD', 'Постоянный 4WD', 'Электронный полный привод', 'Механический полный привод'
      ],
      colors: [
        'Черный', 'Белый', 'Серебряный', 'Серый', 'Серый', 'Синий', 'Красный', 'Зеленый', 'Коричневый', 
        'Золотой', 'Желтый', 'Оранжевый', 'Фиолетовый', 'Бежевый', 'Коричнево-желтый', 'Бронзовый', 'Медный',
        'Жемчужно-белый', 'Металлик серебряный', 'Темно-синий', 'Гоночный красный', 'Лесной зеленый',
        'Угольный', 'Платиновый', 'Другой'
      ],
      conditions: [
        'Новый', 'Как новый', 'Отличное', 'Очень хорошее', 'Хорошее', 'Удовлетворительное', 'Подержанный', 
        'Сертифицированный подержанный', 'Восстановленный', 'Отреставрированный', 'Классический', 'Винтажный'
      ],
      features: [
        'Кондиционер', 'Кожаные сиденья', 'Навигационная система', 'Bluetooth', 'USB порт',
        'Камера заднего вида', 'Парковочные датчики', 'Подогрев сидений', 'Люк', 'Литые диски',
        'Круиз-контроль', 'ABS', 'Система стабилизации', 'Подушки безопасности',
        'Дистанционный запуск', 'Бесключевой доступ', 'Электростеклоподъемники', 'Усилитель руля', 'Тонированные стекла',
        'Премиум аудиосистема', 'Спутниковое радио', 'CD-проигрыватель', 'MP3-проигрыватель', 'DVD-проигрыватель',
        'Беспроводная зарядка', 'Apple CarPlay', 'Android Auto', 'Предупреждение о выходе из полосы',
        'Контроль слепых зон', 'Предупреждение о столкновении', 'Автоматическое экстренное торможение',
        'Адаптивный круиз-контроль', 'Помощь при парковке', 'Камера заднего вида', '360-градусная камера',
        'Подогрев руля', 'Охлаждение сидений', 'Вентиляция сидений', 'Память сидений',
        'Электрорегулировка сидений', 'Третий ряд сидений', 'Складные задние сиденья', 
        'Шторка багажника', 'Багажник на крыше', 'Буксировочный пакет', 'Подножки', 'Боковые ступеньки'
      ],
      certifications: [
        'Сертифицированный подержанный', 'Гарантия производителя', 'Расширенная гарантия', 
        'Техпомощь на дороге', 'Отчет об истории автомобиля', 'Многоточечная проверка',
        'Проверка выбросов', 'Проверка безопасности', 'Сертифицировано дилером', 'Сертифицировано третьей стороной',
        'Проверено Carfax', 'Проверено AutoCheck', 'Без аварий', 'Один владелец',
        'Доступны сервисные записи', 'Обслуживание актуально'
      ]
    },
  },

  // Contact Us Page
  contact: {
    hero: {
      title: 'Свяжитесь с нами',
      subtitle: 'Свяжитесь с нашей командой. Мы здесь, чтобы помочь вам найти идеальный автомобиль или ответить на любые вопросы.',
    },
    departments: {
      phoneSupport: 'Телефонная поддержка',
      emailAddresses: 'Адреса электронной почты',
      businessHours: 'Часы работы',
      mainOffice: 'Главный офис',
    },
    departmentTypes: {
      salesDepartment: 'Отдел продаж',
      customerService: 'Служба поддержки',
      financingDepartment: 'Отдел финансирования',
      generalInquiries: 'Общие вопросы',
      salesQuestions: 'Вопросы по продажам',
      support: 'Поддержка',
    },
    hours: {
      mondayFriday: 'Понедельник - Пятница',
      saturday: 'Суббота',
      sunday: 'Воскресенье',
      timeRange: {
        mondayFriday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
    },
    office: {
      address: {
        street: 'Авто Плаза 123',
        city: 'Москва 101000',
        country: 'Россия',
      },
      getDirections: 'Получить направления',
    },
    form: {
      title: 'Отправьте нам сообщение',
      subtitle: 'Заполните форму ниже, и мы ответим в течение 24 часов.',
      inquiryType: {
        label: 'Чем мы можем помочь?',
        placeholder: 'Выберите тип запроса',
        options: {
          buying: 'Покупка автомобиля',
          selling: 'Продажа автомобиля',
          financing: 'Вопросы по финансированию',
          dealer: 'Партнерство дилеров',
          support: 'Техническая поддержка',
          other: 'Другое',
        },
      },
      fields: {
        fullName: 'Полное имя',
        email: 'Адрес электронной почты',
        phone: 'Номер телефона',
        subject: 'Тема',
        message: 'Сообщение',
      },
      placeholders: {
        name: 'Ваше полное имя',
        email: 'ваша.почта@пример.ru',
        phone: '+7 912 345 67 89',
        subject: 'Краткое описание темы',
        message: 'Пожалуйста, предоставьте детали вашего запроса...',
      },
      required: '*',
      submitButton: 'Отправить сообщение',
      disclaimer: 'Отправляя эту форму, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности.',
    },
    success: {
      title: 'Сообщение отправлено успешно!',
      message: 'Спасибо, что связались с нами. Мы ответим в течение 24 часов.',
    },
    quickHelp: {
      title: 'Быстрая помощь',
      subtitle: 'Ищете немедленные ответы? Проверьте эти ресурсы.',
      options: {
        buyingGuide: {
          title: 'Руководство по покупке',
          description: 'Узнайте, как купить автомобиль',
        },
        sellingGuide: {
          title: 'Руководство по продаже',
          description: 'Советы по продаже вашего автомобиля',
        },
        faq: {
          title: 'FAQ',
          description: 'Часто задаваемые вопросы',
        },
        safetyTips: {
          title: 'Советы по безопасности',
          description: 'Безопасная покупка и продажа',
        },
      },
    },
  },

  dealerProfile: {
    dealerNotFound: 'Дилер не найден',
    dealerNotFoundMessage: 'Профиль дилера, который вы ищете, не существует.',
    viewAllDealers: 'Посмотреть всех дилеров',
    browseCars: 'Просматривать автомобили',
    backToDealers: 'Вернуться к дилерам',
    showroom: 'автосалон',
    verifiedDealer: 'Проверенный дилер',
    milesAway: 'миль отсюда',
    callDealer: 'Позвонить дилеру',
    viewInventory: 'Просмотр инвентаря',
    visitWebsite: 'Посетить веб-сайт',
    overview: 'Обзор',
    inventory: 'Инвентарь',
    reviews: 'Отзывы',
    contact: 'Контакт',
    about: 'О нас',
    servicesOffered: 'Предлагаемые услуги',
    certificationsAwards: 'Сертификаты и награды',
    quickStats: 'Быстрая статистика',
    established: 'Основан',
    teamSize: 'Размер команды',
    people: 'человек',
    recentSales: 'Недавние продажи',
    thisMonth: 'в этом месяце',
    customerSatisfaction: 'Удовлетворенность клиентов',
    responseTime: 'Время ответа',
    businessHours: 'Рабочие часы',
    mondayFriday: 'Понедельник - Пятница:',
    saturday: 'Суббота:',
    sunday: 'Воскресенье:',
    currentInventory: 'Текущий инвентарь',
    hasVehiclesAvailable: 'автомобилей в наличии',
    viewFullInventory: 'Посмотреть полный инвентарь',
    browseAllVehicles: 'Просмотреть все доступные автомобили от',
    browseCarsCount: 'автомобилей',
    customerReviews: 'Отзывы клиентов',
    verifiedCustomerReviews: 'проверенных отзывов клиентов',
    verifiedPurchase: 'Проверенная покупка',
    contactInformation: 'Контактная информация',
    primaryPhone: 'Основной телефон',
    emailAddress: 'Адрес электронной почты',
    website: 'Веб-сайт',
    physicalAddress: 'Физический адрес',
    getDirections: 'Получить направления',
    interactiveMapPlaceholder: 'Интерактивная карта была бы здесь',
    openInGoogleMaps: 'Открыть в Google Maps',
  },

  dealerSupport: {
    backToHome: 'Вернуться домой',
    title: 'Поддержка дилеров',
    subtitle: 'Специальная поддержка для зарегистрированных дилеров. Получите помощь с вашими объявлениями, управлением аккаунтом и функциями платформы.',
    supportCenter: 'Центр поддержки дилеров',
    supportCenterDescription: 'Комплексная поддержка для наших зарегистрированных дилерских партнеров.',
    quickActions: 'Быстрые действия',
    accountManagement: 'Управление аккаунтом',
    accountManagementDesc: 'Управляйте настройками и предпочтениями вашего дилерского аккаунта',
    manageAccount: 'Управлять аккаунтом',
    listingHelp: 'Помощь с объявлениями',
    listingHelpDesc: 'Получите помощь с вашими объявлениями автомобилей и инвентарем',
    getListingHelp: 'Получить помощь с объявлениями',
    analyticsReports: 'Аналитика и отчеты',
    analyticsReportsDesc: 'Просматривайте метрики производительности и генерируйте отчеты',
    viewAnalytics: 'Посмотреть аналитику',
    contactSupport: 'Связаться с поддержкой',
    contactSupportDesc: 'Свяжитесь с нашей командой поддержки',
    contactUs: 'Свяжитесь с нами',
    supportChannels: 'Каналы поддержки',
    supportChannelsDesc: 'Несколько способов получить помощь, когда она вам нужна',
    phone: 'Телефон',
    phoneNumber: '1-800-555-0199',
    email: 'Email',
    emailAddress: 'dealers@carmarket365.com',
    liveChat: 'Живой чат',
    startChat: 'Начать чат',
    businessHours: 'Рабочие часы',
    mondayFriday: 'Понедельник - Пятница: 8:00 - 20:00 EST',
    weekendHours: 'Суббота: 9:00 - 17:00 EST',
    phoneHours: 'Телефонная поддержка доступна в рабочие часы',
    emailHours: 'Email поддержка: 24/7 ответ в течение 4 часов',
    chatHours: 'Живой чат доступен в рабочие часы',
    commonTopics: 'Общие темы',
    commonTopicsDesc: 'Часто запрашиваемые темы поддержки',
    gettingStarted: 'Начало работы',
    gettingStartedDesc: 'Введение новых дилеров и настройка аккаунта',
    listingOptimization: 'Оптимизация объявлений',
    listingOptimizationDesc: 'Советы по улучшению видимости ваших объявлений',
    paymentBilling: 'Платежи и биллинг',
    paymentBillingDesc: 'Вопросы по биллингу и проблемы с платежами',
  },

  admin: {
    panel: 'Панель администратора',
    dashboard: 'Панель администратора',
  },

  // Личная панель
  privateDashboard: {
    title: 'Моя панель',
    subtitle: 'Управляйте своими объявлениями о транспорте и аккаунтом',
    welcome: 'Добро пожаловать обратно',
    savedCars: 'Сохранённые авто',
    lastSearch: 'Последний поиск',
    search: 'Поиск',
    yourListings: 'Ваши объявления',
    expressSale: 'Экспресс-продажа',
    express: 'Экспресс',
    contact: 'Контакт',
    settings: 'Настройки',
    saved: 'Сохранено',
    viewDetails: 'Посмотреть детали',
    remove: 'Удалить',
    startNewSearch: 'Начать новый поиск',
    viewMyListings: 'Посмотреть мои объявления',
    savedOn: 'Сохранено',
    welcomeBack: 'Добро пожаловать обратно',
    manageExperience: 'управляйте своим опытом на автомобильном рынке',
    // Last Search Tab
    lastSearches: 'Последние поиски',
    recentSearchHistory: 'Ваша недавняя история поиска и сохранённые поиски',
    newSearch: 'Новый поиск',
    resultsFound: 'результатов найдено',
    searchedOn: 'Искали',
    searchAgain: 'Искать снова',
    viewResults: 'Посмотреть результаты',
    results: 'Результаты',
    // User Listings Tab
    myListings: 'Мои объявления',
    carsListedForSale: 'Автомобили, которые вы выставили на продажу',
    createNewListing: 'Создать новое объявление',
    newListing: 'Новое объявление',
    views: 'просмотры',
    inquiries: 'запросы',
    listed: 'Размещено',
    edit: 'Редактировать',
    view: 'Посмотреть',
    delete: 'Удалить',
    // Express Sale Tab
    expressSaleListings: 'Объявления экспресс-продажи',
    quickSaleRequests: 'Запросы быстрой продажи, отправленные дилерам',
    newExpressSale: 'Новая экспресс-продажа',
    newExpress: 'Новый экспресс',
    underReview: 'На рассмотрении',
    photos: 'фотографии',
    estimatedValue: 'Оценочная стоимость:',
    submittedOn: 'Отправлено',
    // Contact Details Tab
    contactDetails: 'Контактные данные',
    manageContactInfo: 'Управляйте своей контактной информацией и профилем',
    personalInformation: 'Личная информация',
    updateProfileDetails: 'Обновить данные профиля',
    changePhoto: 'Изменить фотографию',
    firstName: 'Имя',
    lastName: 'Фамилия',
    emailAddress: 'Адрес электронной почты',
    phoneNumber: 'Номер телефона',
    city: 'Город',
    country: 'Страна',
    saveChanges: 'Сохранить изменения',
    // Account Settings Tab
    accountSettings: 'Настройки аккаунта',
    manageAccountPreferences: 'Управляйте настройками аккаунта и конфиденциальности',
    notifications: 'Уведомления',
    configureNotifications: 'Настройте как получать уведомления',
    emailNotifications: 'Уведомления по электронной почте',
    receiveUpdatesViaEmail: 'Получать обновления по электронной почте',
    newListingsAlerts: 'Оповещения о новых объявлениях',
    notifyNewCarsMatching: 'Получать уведомления о новых автомобилях, соответствующих вашим поискам',
    priceDropAlerts: 'Оповещения о снижении цен',
    notifyPriceDrops: 'Получать уведомления, когда цены на сохранённые автомобили снижаются',
    inquiryNotifications: 'Уведомления о запросах',
    notifyInquiries: 'Получать уведомления о запросах по вашим объявлениям',
    privacySettings: 'Настройки конфиденциальности',
    controlPrivacyPreferences: 'Контролируйте свои настройки конфиденциальности и обмена данными',
    profileVisibility: 'Видимость профиля',
    makeProfileVisible: 'Сделать ваш профиль видимым для других пользователей',
    showContactInfo: 'Показать контактную информацию',
    displayContactOnListings: 'Отображать вашу контактную информацию в объявлениях',
    dataAnalytics: 'Аналитика данных',
    helpImproveService: 'Помогите улучшить наш сервис с помощью аналитики использования',
    accountManagement: 'Управление аккаунтом',
    manageAccountAndData: 'Управляйте своим аккаунтом и данными',
    downloadMyData: 'Скачать мои данные',
    changePassword: 'Изменить пароль',
    deleteAccount: 'Удалить аккаунт',
    // Success/Error Messages
    profileUpdatedSuccessfully: 'Профиль успешно обновлён!',
    carRemovedFromSaved: 'Автомобиль удалён из сохранённых!',
    listingDeletedSuccessfully: 'Объявление успешно удалено!'
  },

  // Сохранённые авто
  savedCars: {
    title: 'Сохранённые авто',
    subtitle: 'Управляйте своими любимыми транспортными средствами и списком желаний',
    filterBySavedDate: 'Фильтровать по дате сохранения',
    filterByPriceRange: 'Фильтровать по ценовому диапазону',
    sortBy: 'Сортировать по',
    newest: 'Новейшие',
    oldest: 'Старейшие',
    priceLowToHigh: 'Цена: От низкой к высокой',
    priceHighToLow: 'Цена: От высокой к низкой',
    noSavedCars: 'Нет сохранённых авто',
    startBrowsing: 'Начните просматривать транспортные средства, чтобы сохранить избранные',
    browseVehicles: 'Просмотреть транспортные средства',
    savedOn: 'Сохранено',
    removeFromSaved: 'Удалить из сохранённых',
    viewDetails: 'Посмотреть детали',
    contactDealer: 'Контакт',
    scheduleViewing: 'Запланировать осмотр',
    compareVehicles: 'Сравнить транспортные средства',
    selectToCompare: 'Выберите транспортные средства для сравнения',
    compare: 'Сравнить',
    clearSelection: 'Очистить выбор',
    clearAll: 'Очистить всё'
  },

  // Продать транспортное средство
  sellVehicle: {
    title: 'Продайте своё транспортное средство',
    subtitle: 'Создайте подробное объявление для вашего транспортного средства',
    stepIndicator: 'Шаг {current} из {total}',
    basicInfo: 'Основная информация',
    vehicleDetails: 'Детали транспортного средства',
    photosUpload: 'Загрузка фотографий',
    pricing: 'Ценообразование',
    review: 'Обзор и публикация',
    
    // Основная информация
    make: 'Марка',
    model: 'Модель',
    year: 'Год',
    mileage: 'Пробег',
    km: 'км',
    condition: 'Состояние',
    conditionOptions: {
      excellent: 'Отличное',
      good: 'Хорошее',
      fair: 'Удовлетворительное',
      poor: 'Плохое'
    },
    fuelType: 'Тип топлива',
    fuelTypes: {
      gasoline: 'Бензин',
      diesel: 'Дизель',
      electric: 'Электрический',
      hybrid: 'Гибрид'
    },
    transmission: 'Коробка передач',
    transmissionTypes: {
      manual: 'Механическая',
      automatic: 'Автоматическая',
      semiautomatic: 'Полуавтоматическая'
    },
    bodyType: 'Тип кузова',
    
    // Детали транспортного средства
    engineSize: 'Объём двигателя',
    horsepower: 'Лошадиные силы',
    color: 'Цвет',
    numberOfDoors: 'Количество дверей',
    numberOfSeats: 'Количество мест',
    features: 'Характеристики',
    safetyFeatures: 'Функции безопасности',
    description: 'Описание',
    descriptionPlaceholder: 'Опишите ваше транспортное средство, его историю, состояние...',
    
    // Фотографии
    uploadPhotos: 'Загрузить фотографии',
    dragDropPhotos: 'Перетащите и отпустите фотографии сюда, или нажмите для выбора',
    maxPhotos: 'Максимум 20 фотографий',
    photoRequirements: 'Требования к фотографиям',
    requirementsList: [
      'Высокое качество (минимум 800x600 пикселей)',
      'Формат JPG, PNG или WebP',
      'Максимум 5MB на фотографию',
      'Фотографии со всех сторон транспортного средства',
      'Фотографии интерьера',
      'Фотографии двигателя и одометра'
    ],
    
    // Ценообразование
    askingPrice: 'Запрашиваемая цена',
    marketValue: 'Рыночная стоимость',
    priceAnalysis: 'Анализ цены',
    competitive: 'Конкурентоспособная',
    aboveMarket: 'Выше рынка',
    belowMarket: 'Ниже рынка',
    negotiable: 'Договорная',
    contactPreferences: 'Предпочтения по контактам',
    allowPhoneCalls: 'Разрешить телефонные звонки',
    allowMessages: 'Разрешить сообщения',
    allowEmails: 'Разрешить электронные письма',
    
    // Обзор
    reviewListing: 'Просмотреть объявление',
    publishListing: 'Опубликовать объявление',
    saveDraft: 'Сохранить черновик',
    termsAndConditions: 'Условия использования',
    agreeToTerms: 'Согласен с условиями использования',
    
    // Сообщения
    listingPublished: 'Объявление успешно опубликовано!',
    draftSaved: 'Черновик сохранён',
    errorSaving: 'Ошибка при сохранении',
    continue: 'Продолжить',
    previous: 'Предыдущий',
    next: 'Следующий'
  },

  // Главная страница
  indexPage: {
    hero: {
      title: 'Найдите своё идеальное транспортное средство',
      subtitle: 'Просматривайте тысячи проверенных транспортных средств от надёжных дилеров и частных продавцов',
      searchPlaceholder: 'Поиск по марке, модели или местоположению...',
      search: 'Поиск',
      advancedSearch: 'Расширенный поиск'
    },
    quickFilters: {
      title: 'Быстрые фильтры',
      allVehicles: 'Все транспортные средства',
      cars: 'Автомобили',
      trucks: 'Грузовики',
      motorcycles: 'Мотоциклы',
      electric: 'Электрические',
      luxury: 'Люксовые'
    },
    stats: {
      title: 'Почему CarMarket365?',
      vehiclesAvailable: 'Доступные транспортные средства',
      verifiedDealers: 'Проверенные дилеры',
      happyCustomers: 'Довольные клиенты',
      yearsExperience: 'Лет опыта'
    },
    featuredListings: {
      title: 'Рекомендуемые объявления',
      subtitle: 'Выбранные транспортные средства от наших партнёров',
      viewAll: 'Посмотреть все'
    },
    howItWorks: {
      title: 'Как это работает',
      subtitle: 'Найдите своё идеальное транспортное средство в три простых шага',
      steps: [
        {
          title: 'Найдите транспортные средства',
          description: 'Просматривайте нашу обширную базу проверенных транспортных средств'
        },
        {
          title: 'Сравните варианты',
          description: 'Сравнивайте цены, характеристики и отзывы'
        },
        {
          title: 'Покупайте с уверенностью',
          description: 'Покупайте у надёжных дилеров с гарантиями'
        }
      ]
    },
    popularBrands: {
      title: 'Популярные марки',
      subtitle: 'Исследуйте транспортные средства от ведущих автопроизводителей'
    },
    testimonials: {
      title: 'Что говорят наши клиенты',
      subtitle: 'Прочитайте реальные отзывы от наших довольных покупателей'
    },
    newsletter: {
      title: 'Оставайтесь в курсе',
      subtitle: 'Получайте последние объявления и эксклюзивные предложения прямо на вашу электронную почту',
      emailPlaceholder: 'Введите ваш email',
      subscribe: 'Подписаться'
    },
    cta: {
      buyer: {
        title: 'Готовы купить?',
        subtitle: 'Найдите своё идеальное транспортное средство сегодня',
        button: 'Просмотреть транспортные средства'
      },
      seller: {
        title: 'Хотите продать?',
        subtitle: 'Выставьте своё транспортное средство на продажу за минуты',
        button: 'Продать транспортное средство'
      }
    }
  },

  // Страницы ошибок
  errors: {
    notFound: {
      title: '404',
      heading: 'Страница не найдена',
      message: 'Страница, которую вы ищете, не существует или была перемещена.',
      goHome: 'Перейти на главную',
      goBack: 'Вернуться назад',
      supportMessage: 'Если вы считаете, что это ошибка, пожалуйста, свяжитесь с нашей командой поддержки.'
    }
  },

  // Юридические страницы
  legal: {
    accessibility: {
      title: 'Доступность',
      subtitle: 'Наша приверженность делать CarMarket365 доступным для всех.',
      backToHome: 'Вернуться на главную',
      commitmentTitle: 'Наша приверженность доступности',
      commitmentDescription: 'CarMarket365 стремится обеспечить инклюзивный опыт.',
      commitmentText: 'Мы считаем, что у всех должен быть равный доступ к нашей платформе, независимо от их способностей.',
      
      visual: {
        title: 'Визуальная поддержка',
        features: [
          'Высокий контраст для лучшей читаемости',
          'Регулируемый размер текста',
          'Чёткая и структурированная навигация',
          'Альтернативные описания изображений'
        ]
      },
      motor: {
        title: 'Двигательная поддержка',
        features: [
          'Полная навигация с клавиатуры',
          'Большие области для клика',
          'Достаточно времени для действий',
          'Простые и понятные элементы управления'
        ]
      },
      audio: {
        title: 'Аудиоподдержка',
        features: [
          'Транскрипции для аудиоконтента',
          'Субтитры для видео',
          'Текстовые альтернативы звукам',
          'Совместимость с программами чтения с экрана'
        ]
      },
      cognitive: {
        title: 'Когнитивная поддержка',
        features: [
          'Простой и понятный язык',
          'Пошаговые инструкции',
          'Полезные сообщения об ошибках',
          'Логическая организация контента'
        ]
      },
      
      standardsTitle: 'Стандарты доступности',
      standardsDescription: 'Наша платформа построена в соответствии с международными стандартами.',
      wcagTitle: 'Соответствие WCAG 2.1',
      wcagDescription: 'Мы стремимся соответствовать рекомендациям WCAG 2.1 AA для веб-доступности.',
      compatibilityTitle: 'Совместимость с вспомогательными технологиями',
      compatibilityDescription: 'Наша платформа протестирована с программами чтения с экрана и другими вспомогательными технологиями.',
      
      feedbackTitle: 'Отзывы о доступности?',
      feedbackText: 'Если у вас возникли проблемы с доступностью или есть предложения по улучшению, свяжитесь с нами по адресу accessibility@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      contactTeam: 'Связаться с командой'
    },

    cookies: {
      title: 'Политика cookies',
      subtitle: 'Как мы используем cookies для улучшения вашего опыта.',
      backToHome: 'Вернуться на главную',
      policyTitle: 'Наша политика cookies',
      policyDescription: 'Мы используем cookies для предоставления наилучшего возможного сервиса.',
      policyText: 'Cookies — это небольшие текстовые файлы, сохраняемые на вашем устройстве при посещении нашего сайта. Они помогают нам обеспечить персонализированный опыт.',
      
      essential: {
        title: 'Основные cookies',
        features: [
          'Поддержка пользовательских сессий',
          'Сохранение настроек безопасности',
          'Базовая функциональность платформы',
          'Реализация настроек конфиденциальности'
        ]
      },
      functional: {
        title: 'Функциональные cookies',
        features: [
          'Запоминание ваших настроек',
          'Сохранение языковых настроек',
          'Персонализация отображения',
          'Сохранение последних поисков'
        ]
      },
      analytics: {
        title: 'Аналитические cookies',
        features: [
          'Понимание использования сайта',
          'Улучшение производительности',
          'Выявление технических проблем',
          'Оптимизация контента'
        ]
      },
      marketing: {
        title: 'Маркетинговые cookies',
        features: [
          'Релевантная реклама',
          'Измерение эффективности рекламы',
          'Персонализация контента',
          'Отслеживание конверсий'
        ]
      },
      
      managementTitle: 'Управление настройками cookies',
      managementDescription: 'У вас есть полный контроль над cookies, которые мы используем на вашем устройстве.',
      
      browserTitle: 'Настройки браузера',
      browserFeatures: [
        'Заблокировать или разрешить cookies',
        'Удалить существующие cookies',
        'Установить срок действия cookies',
        'Управлять cookies третьих сторон'
      ],
      
      platformTitle: 'Элементы управления платформы',
      platformFeatures: [
        'Центр настроек cookies',
        'Варианты отказа',
        'Детальные настройки управления',
        'Регулярные обновления настроек'
      ],
      
      questionsTitle: 'Вопросы о cookies?',
      questionsText: 'Если у вас есть вопросы о нашей политике cookies или нужна помощь в управлении настройками, свяжитесь с нами по адресу cookies@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      cookieSupport: 'Поддержка cookies'
    },

    imprint: {
      title: 'Импрессум',
      subtitle: 'Юридическая информация и данные компании в соответствии с требованиями закона.',
      backToHome: 'Вернуться на главную',
      legalInfoTitle: 'Юридическая информация (Impressum)',
      legalInfoDescription: 'Информация о компании и юридические данные в соответствии с требованиями закона.',
      legalInfoText: 'Эта страница содержит юридически необходимую информацию о CarMarket365 в соответствии с действующими законами и нормативными актами. Вся предоставленная информация актуальна и точна.',
      
      companyDetails: {
        title: 'Данные компании',
        companyName: 'Название компании',
        companyNameValue: 'CarMarket365 GmbH',
        registrationNumber: 'Регистрационный номер',
        registrationNumberValue: 'HRB 123456 B',
        vatId: 'НДС ID',
        vatIdValue: 'DE123456789',
        commercialRegister: 'Торговый реестр',
        commercialRegisterValue: 'Amtsgericht Berlin'
      },
      
      businessAddress: {
        title: 'Деловой адрес',
        registeredAddress: 'Зарегистрированный адрес',
        street: 'Unter den Linden 1',
        city: '10117 Берлин',
        country: 'Германия'
      },
      
      management: {
        title: 'Руководство',
        managingDirector: 'Управляющий директор',
        managingDirectorValue: 'Max Mustermann',
        authorizedRepresentative: 'Уполномоченный представитель',
        authorizedRepresentativeValue: 'Anna Schmidt'
      },
      
      contactInfo: {
        title: 'Контактная информация',
        phone: 'Телефон',
        phoneValue: '+49 (0) 30 12345678',
        email: 'Электронная почта',
        emailValue: 'info@carmarket365.com',
        businessHours: 'Рабочие часы',
        businessHoursValue: 'Пн-Пт: 9:00 - 18:00 CET'
      },
      
      legalNotice: {
        title: 'Юридическое уведомление',
        paragraph1: 'CarMarket365 стремится предоставлять точную и актуальную информацию. Однако мы не можем гарантировать полноту или точность всего контента.',
        paragraph2: 'Эта платформа служит торговой площадкой, соединяющей покупателей и продавцов автомобилей. CarMarket365 не несёт ответственности за точность объявлений или поведение пользователей.',
        paragraph3: 'По спорам или жалобам, пожалуйста, свяжитесь с нами, используя информацию, указанную выше. Мы стремимся решить все вопросы своевременно и справедливо.'
      },
      
      questionsTitle: 'Юридические вопросы?',
      questionsText: 'По юридическим вопросам или для сообщения о проблемах, пожалуйста, свяжитесь с нашим юридическим отделом по адресу legal@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      contactLegal: 'Связаться с юридической командой'
    }
  },

  // Dealer Dashboard
  dealerDashboard: {
    title: 'Панель дилера',
    subtitle: 'Управляйте своими объявлениями, отслеживайте производительность и развивайте бизнес',
    
    // Tab navigation
    tabs: {
      overview: 'Обзор',
      myListings: 'Мои объявления',
      inquiries: 'Запросы',
      analytics: 'Аналитика',
    },
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        activeListings: {
          title: 'Активные объявления',
          description: '+2 с прошлого месяца',
          fromLastMonth: 'с прошлого месяца',
        },
        totalViews: {
          title: 'Всего просмотров',
          description: '+15% с прошлого месяца',
          fromLastMonth: 'с прошлого месяца',
        },
        inquiries: {
          title: 'Запросы',
          description: '+7 со вчера',
          fromYesterday: 'со вчера',
        },
        revenue: {
          title: 'Выручка',
          description: '+12% с прошлого месяца',
          fromLastMonth: 'с прошлого месяца',
        },
      },
      
      // Performance section
      performance: {
        title: 'Месячная производительность',
        description: 'Количество проданных автомобилей по месяцам в этом году',
        monthlyData: {
          january: 'Январь',
          december: 'Декабрь',
          november: 'Ноябрь',
          sold: 'продано',
        },
      },
      
      // Recent inquiries
      recentInquiries: {
        title: 'Последние запросы',
        description: 'Новейшие клиентские запросы',
        inquiryTypes: {
          viewing: 'осмотр',
          price: 'цена',
          financing: 'финансирование',
        },
        timeAgo: {
          hoursAgo: 'ч назад',
        },
      },
      
      // Action buttons
      actions: {
        addNewListing: 'Добавить новое объявление',
        viewAnalytics: 'Посмотреть аналитику',
      },
    },
    
    // My Listings tab
    myListings: {
      title: 'Мои объявления',
      
      // Search and filters
      searchPlaceholder: 'Поиск объявлений...',
      filterByStatus: 'Фильтр по статусу',
      statusOptions: {
        allStatus: 'Все статусы',
        active: 'Активное',
        sold: 'Продано',
        pending: 'Ожидает',
      },
      exportReport: 'Экспортировать отчёт',
      export: 'Экспорт',
      
      // Table headers
      tableHeaders: {
        car: 'Автомобиль',
        price: 'Цена',
        status: 'Статус',
        views: 'Просмотры',
        inquiries: 'Запросы',
        listed: 'Размещено',
        actions: 'Действия',
      },
      
      // Status badges
      statusBadges: {
        active: 'Активное',
        sold: 'Продано',
        pending: 'Ожидает',
      },
      
      // Actions
      actions: {
        viewListing: 'Посмотреть объявление',
        editListing: 'Редактировать объявление',
        deleteListing: 'Удалить объявление',
      },
      
      // Mobile view
      mobileView: {
        views: 'просмотров',
        inquiries: 'запросов',
      },
    },
    
    // Inquiries tab
    inquiries: {
      title: 'Клиентские запросы',
      description: 'Управляйте и отвечайте на клиентские запросы',
      
      // Inquiry types
      inquiryTypes: {
        testDriveRequest: 'Запрос на тест-драйв',
        priceInquiry: 'Запрос о цене',
      },
      
      // Status
      status: {
        new: 'новый',
        responded: 'отвечено',
      },
      
      // Actions
      actions: {
        respond: 'Ответить',
      },
      
      // Time indicators
      time: {
        hoursAgo: 'часов назад',
        dayAgo: 'день назад',
      },
    },
    
    // Analytics tab
    analytics: {
      // Popular listings
      popularListings: {
        title: 'Популярные объявления',
        description: 'Наиболее просматриваемые объявления в этом месяце',
        views: 'просмотров',
        inquiries: 'запросов',
      },
      
      // Performance metrics
      performanceMetrics: {
        title: 'Показатели производительности',
        description: 'Ключевые показатели эффективности',
        metrics: {
          averageTimeToSell: 'Среднее время продажи',
          conversionRate: 'Конверсия',
          averageListingViews: 'Средние просмотры объявления',
          responseTime: 'Время ответа',
        },
        values: {
          days: 'дней',
          hours: 'часов',
        },
      },
    },
    
    // Footer message
    footerMessage: 'Профессиональные инструменты дилера - ',
    activeListingsCount: 'активных объявлений',
  },

  // Admin Dashboard
  adminDashboard: {
    title: 'Панель администратора',
    subtitle: 'Управление платформой, надзор и всеобъемлющий центр контроля',
    
    // Tab navigation
    tabs: {
      overview: 'Обзор',
      allListings: 'Все объявления',
      userManagement: 'Управление пользователями',
      reports: 'Отчёты',
    },
    
    // Overview tab
    overview: {
      // Stats cards
      stats: {
        totalUsers: {
          title: 'Всего пользователей',
          description: '+15% с прошлого месяца',
          fromLastMonth: 'с прошлого месяца',
        },
        activeDealers: {
          title: 'Активные дилеры',
          description: '+8 новых в этом месяце',
          newThisMonth: 'новых в этом месяце',
        },
        totalListings: {
          title: 'Всего объявлений',
          description: '+23 сегодня',
          today: 'сегодня',
        },
        platformRevenue: {
          title: 'Доход платформы',
          description: '+12% с прошлого месяца',
          fromLastMonth: 'с прошлого месяца',
        },
      },
      
      // Recent activity
      recentActivity: {
        title: 'Последняя активность',
        description: 'Новейшие действия на платформе',
        activities: {
          newDealerRegistration: 'Регистрация нового дилера',
          listingFlaggedForReview: 'Объявление отмечено для проверки',
          userAccountSuspended: 'Аккаунт пользователя заблокирован',
          paymentProcessed: 'Платёж обработан',
        },
        timeAgo: {
          hoursAgo: 'ч назад',
        },
      },
      
      // System health
      systemHealth: {
        title: 'Состояние системы',
        description: 'Показатели производительности платформы',
        metrics: {
          serverUptime: 'Время работы сервера',
          averageResponseTime: 'Среднее время отклика',
          activeSessions: 'Активные сессии',
          errorRate: 'Частота ошибок',
        },
      },
      
      // Action buttons
      actions: {
        manageUsers: 'Управлять пользователями',
        viewReports: 'Посмотреть отчёты',
      },
    },
    
    // All Listings tab
    allListings: {
      title: 'Все объявления',
      
      // Search and filters
      searchPlaceholder: 'Поиск объявлений...',
      filterByStatus: 'Фильтр по статусу',
      statusOptions: {
        allStatus: 'Все статусы',
        active: 'Активное',
        sold: 'Продано',
        pending: 'Ожидает',
        flagged: 'Отмечено',
      },
      
      // Table headers
      tableHeaders: {
        image: 'Изображение',
        title: 'Заголовок',
        category: 'Категория',
        seller: 'Продавец',
        price: 'Цена',
        status: 'Статус',
        created: 'Создано',
        actions: 'Действия',
      },
      
      // Status badges
      statusBadges: {
        active: 'Активное',
        sold: 'Продано',
        pending: 'Ожидает',
        flagged: 'Отмечено',
      },
      
      // Actions
      actions: {
        viewListing: 'Посмотреть объявление',
        editListing: 'Редактировать объявление',
        deleteListing: 'Удалить объявление',
      },
    },
    
    // User Management tab
    userManagement: {
      title: 'Управление пользователями',
      description: 'Просматривайте и управляйте всеми пользователями платформы',
      
      // Search and filters
      searchPlaceholder: 'Поиск по email или имени...',
      roleFilter: {
        placeholder: 'Роль',
        options: {
          allRoles: 'Все роли',
          customer: 'Клиент',
          dealer: 'Дилер',
          admin: 'Администратор',
        },
      },
      
      // Table headers
      tableHeaders: {
        user: 'Пользователь',
        role: 'Роль',
        status: 'Статус',
        joinDate: 'Дата присоединения',
        lastLogin: 'Последний вход',
        actions: 'Действия',
      },
      
      // Role badges
      roleBadges: {
        admin: 'Администратор',
        dealer: 'Дилер',
        customer: 'Клиент',
      },
      
      // Status badges
      statusBadges: {
        active: 'Активен',
        suspended: 'Заблокирован',
        pending: 'Ожидает',
      },
      
      // Дополнительные сообщения статуса
      statusMessages: {
        joinedOn: 'Присоединился',
        lastLoginOn: 'Последний вход',
        neverLoggedIn: 'Никогда не входил',
      },
      
      // Actions
      actions: {
        viewProfile: 'Посмотреть профиль',
        editUser: 'Редактировать пользователя',
        suspendUser: 'Заблокировать пользователя',
        activateUser: 'Активировать пользователя',
      },
    },
    
    // Reports tab
    reports: {
      // Platform statistics
      platformStatistics: {
        title: 'Статистика платформы',
        description: 'Ключевые показатели платформы',
        metrics: {
          totalRevenue: 'Общий доход (в этом месяце)',
          newUserRegistrations: 'Регистрации новых пользователей',
          successfulTransactions: 'Успешные транзакции',
          averageListingPrice: 'Средняя цена объявления',
        },
      },
      
      // Content moderation
      contentModeration: {
        title: 'Модерация контента',
        description: 'Контент, требующий проверки',
        items: {
          flaggedListings: 'Отмеченные объявления',
          pendingDealerApplications: 'Заявки дилеров в ожидании',
          reportedUsers: 'Пользователи с жалобами',
          disputes: 'Споры',
        },
      },
    },
    
    // Footer message
    footerMessage: 'Административный контроль - ',
    systemStatus: 'Статус системы: Онлайн',
  },

  uiDemo: {
    title: 'Демонстрация UI-компонентов',
    subtitle: 'Изучите нашу дизайн-систему и UI-компоненты',
    components: 'Компоненты',
    forms: 'Формы',
    buttons: 'Кнопки',
    cards: 'Карточки',
  },

  // Тест страны
  countryTest: {
    title: 'Тест разделения по странам',
    subtitle: 'Проверьте, как объявления автомобилей фильтруются по стране/поддомену',
    currentCountryConfiguration: 'Текущая конфигурация страны',
    currentCountryDescription: 'Это показывает текущую определенную страну и ее настройки',
    detectedCountry: 'Определенная страна',
    domain: 'Домен',
    languages: 'Языки',
    developmentMode: 'Режим разработки',
    enabled: 'Включено',
    disabled: 'Отключено',
    developmentCountrySwitcher: 'Переключатель стран разработки',
    switcherDescription: 'Переключайтесь между странами для тестирования функции разделения',
    selectTestCountry: 'Выберите тестовую страну',
    chooseCountryToTest: 'Выберите страну для тестирования',
    resetToDefault: 'Сбросить на по умолчанию',
    noteTitle: 'Примечание:',
    noteText: 'В продакшене страны автоматически определяются из поддомена (например, mk.carmarket365.com, al.carmarket365.com). Этот переключатель работает только в режиме разработки.',
    carListingsFor: 'Объявления автомобилей для',
    carListingsDescription: 'должны появиться ниже',
    loadingCars: 'Загрузка автомобилей...',
    foundCars: 'Найдено {count} автомобиля(ей) в {country}',
    countryFilteredResults: 'Результаты, отфильтрованные по стране',
    noCarsFound: 'Автомобили не найдены',
    noCarsFoundDescription: 'В настоящее время в {country} нет опубликованных автомобилей.',
    tryDifferentCountry: 'Попробуйте переключиться на другую страну с помощью переключателя выше.',
    howItWorks: 'Как это работает',
    automaticCountryDetection: 'Автоматическое определение страны',
    automaticDetectionDescription: 'Система автоматически определяет страну из поддомена (например, mk.carmarket365.com для Македонии, al.carmarket365.com для Албании).',
    countrySpecificListings: 'Объявления, специфичные для страны',
    countrySpecificDescription: 'Объявления автомобилей автоматически фильтруются для показа только автомобилей из текущей страны. Это обеспечивает, что пользователи в Македонии видят только македонские объявления, албанские пользователи видят только албанские объявления и т.д.',
    crossCountryProtection: 'Защита между странами',
    crossCountryDescription: 'Если кто-то попытается получить доступ к объявлению автомобиля из другой страны (через прямой URL), он получит сообщение об ошибке, что объявление недоступно в их регионе.',
    listingSubmission: 'Подача объявления',
    listingSubmissionDescription: 'Когда пользователи подают новые объявления автомобилей, код страны автоматически устанавливается на основе их текущего поддомена, обеспечивая видимость объявлений только в правильной стране.',
  },

  // Формы и поля ввода
  forms: {
    placeholders: {
      selectMake: 'Выберите марку',
      selectModel: 'Выберите модель',
      selectYear: 'Выберите год',
      selectCondition: 'Выберите состояние',
      selectFuelType: 'Выберите тип топлива',
      selectTransmission: 'Выберите трансмиссию',
      selectBodyType: 'Выберите тип кузова',
      selectDrivetrain: 'Выберите привод',
      enterName: 'Введите имя',
      enterEmail: 'Введите email',
      enterPassword: 'Введите пароль',
      enterPhone: 'Введите телефон',
      enterModel: 'Введите модель',
      enterMileage: 'Введите пробег',
      enterPrice: 'Введите цену',
      enterLocation: 'Введите местоположение',
      enterCity: 'Введите город',
      enterDescription: 'Введите описание',
      searchCars: 'Искать автомобили',
      searchListings: 'Искать объявления',
      searchFAQs: 'Искать в FAQ',
      anyMake: 'Любая марка',
      anyModel: 'Любая модель',
      anyYear: 'Любой год',
      anyMileage: 'Любой пробег',
      minPrice: 'Мин. цена',
      maxPrice: 'Макс. цена',
      role: 'Роль',
      sortBy: 'Сортировать по',
      filterBy: 'Фильтровать по',
      dealerNameOrCity: 'Название дилера или город',
      allStates: 'Все регионы',
      allSpecialties: 'Все специальности',
      egFiftyThousand: 'например, 50,000',
      successMessage: 'Ваше объявление успешно создано!',
      requiredFieldMessage: 'Это поле обязательно для заполнения',
      enterMessage: 'Введите ваше сообщение',
    },
    labels: {
      businessName: 'Название бизнеса',
      businessType: 'Тип бизнеса',
      vatNumber: 'НДС номер',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      phoneNumber: 'Номер телефона',
      street: 'Улица',
      city: 'Город',
      state: 'Регион',
      postalCode: 'Почтовый индекс',
      country: 'Страна',
      make: 'Марка',
      model: 'Модель',
      year: 'Год',
      mileage: 'Пробег',
      condition: 'Состояние',
      fuelType: 'Тип топлива',
      transmission: 'Трансмиссия',
      bodyType: 'Тип кузова',
      exteriorColor: 'Цвет кузова',
      interiorColor: 'Цвет салона',
      price: 'Цена',
      description: 'Описание',
      contactName: 'Контактное лицо',
      contactPhone: 'Контактный телефон',
      contactEmail: 'Контактный email',
      location: 'Местоположение',
      rememberMe: 'Запомнить меня',
      termsAccepted: 'Условия приняты',
      privacyAccepted: 'Политика принята',
    },
    buttons: {
      submit: 'Отправить',
      register: 'Зарегистрироваться',
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
      signOut: 'Выйти',
      backToSignIn: 'Назад к входу',
      backToHome: 'Назад на главную',
      createAccount: 'Создать аккаунт',
      forgotPassword: 'Забыли пароль',
      resetPassword: 'Сбросить пароль',
      updateProfile: 'Обновить профиль',
      uploadPhotos: 'Загрузить фото',
      removePhoto: 'Удалить фото',
      publishListing: 'Опубликовать объявление',
      saveDraft: 'Сохранить как черновик',
      previewListing: 'Предварительный просмотр',
      editListing: 'Редактировать объявление',
      deleteListing: 'Удалить объявление',
      viewListing: 'Просмотреть объявление',
      viewDetails: 'Посмотреть детали',
      contactDealer: 'Связаться с дилером',
      scheduleTestDrive: 'Записаться на тест-драйв',
      requestFinancing: 'Запросить финансирование',
      shareVehicle: 'Поделиться автомобилем',
      saveToFavorites: 'Добавить в избранное',
      removeFromFavorites: 'Убрать из избранного',
      applyFilters: 'Применить фильтры',
      clearFilters: 'Очистить фильтры',
      clearSearch: 'Очистить поиск',
      searchVehicles: 'Искать автомобили',
      viewAllCars: 'Посмотреть все автомобили',
      loadMore: 'Загрузить еще',
      showMore: 'Показать больше',
      showLess: 'Показать меньше',
    },
    validation: {
      nameMinLength: 'Имя должно содержать не менее 2 символов',
      validEmail: 'Пожалуйста, введите действительный адрес электронной почты',
      messageMinLength: 'Сообщение должно содержать не менее 10 символов',
    },
  },

  // Static content for About page
  about: {
    stats: {
      carsSold: 'Продано Автомобилей',
      happyCustomers: 'Довольных Клиентов',
      dealerPartners: 'Партнёров-Дилеров',
      yearsInBusiness: 'Лет в Бизнесе',
    },
    values: {
      trustTransparency: 'Доверие и Прозрачность',
      trustTransparencyDesc: 'Мы верим в честные цены, чёткую коммуникацию и построение долгосрочных отношений с нашими клиентами.',
      customerFirst: 'Клиент Прежде Всего',
      customerFirstDesc: 'Каждое наше решение направлено на обеспечение лучшего возможного опыта для наших клиентов.',
      qualityAssurance: 'Гарантия Качества',
      qualityAssuranceDesc: 'Мы тщательно проверяем и верифицируем каждый автомобиль, чтобы гарантировать качество и надёжность.',
      innovation: 'Инновации',
      innovationDesc: 'Мы постоянно улучшаем нашу платформу с помощью новейших технологий, чтобы лучше служить вам.',
    },
    staticContent: {
      team: [
        {
          name: 'Алексей Петров',
          role: 'Генеральный директор и основатель',
          bio: '15+ лет в автомобильной индустрии. Ранее вице-президент в AutoNation.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Михаил Соколов',
          role: 'Технический директор',
          bio: 'Бывший инженер Tesla с экспертизой в автомобильных технологиях.',
          image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Елена Волкова',
          role: 'Руководитель отдела клиентского сервиса',
          bio: '10+ лет в области превосходного обслуживания клиентов и руководства командой.',
          image: 'https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        },
        {
          name: 'Дмитрий Кузнецов',
          role: 'Вице-президент по операциям',
          bio: 'Эксперт по цепочке поставок с опытом в автомобильной логистике.',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          linkedin: '#'
        }
      ],
      milestones: [
        {
          year: '2009',
          title: 'Основание компании',
          description: 'Начали как небольшая торговая площадка подержанных автомобилей в Москве с видением революционизировать покупку автомобилей.'
        },
        {
          year: '2012',
          title: 'Запуск цифровой платформы',
          description: 'Запустили нашу первую онлайн-площадку, сделав покупку автомобилей более доступной.'
        },
        {
          year: '2015',
          title: '500-й партнёр-дилер',
          description: 'Достигли важной вехи, заключив партнёрство с нашим 500-м верифицированным дилером.'
        },
        {
          year: '2018',
          title: 'Национальная экспансия',
          description: 'Расширили операции для обслуживания клиентов по всей России и странам СНГ.'
        },
        {
          year: '2020',
          title: 'Запуск мобильного приложения',
          description: 'Представили наше мобильное приложение, сделав покупку автомобилей ещё более удобной.'
        },
        {
          year: '2023',
          title: '50,000 проданных автомобилей',
          description: 'Отпраздновали помощь более чем 45,000 клиентам в поиске их идеального автомобиля.'
        }
      ],
      awards: [
        {
          title: 'Лучшая автомобильная площадка 2023',
          organization: 'Премия выбора потребителей',
          year: '2023',
          description: 'Признана за выдающееся обслуживание клиентов и инновации платформы'
        },
        {
          title: 'Самый быстрорастущий стартап',
          organization: 'Премия технологических инноваций',
          year: '2022',
          description: 'Отмечена за быстрый рост и расширение рынка'
        },
        {
          title: 'Превосходство в обслуживании клиентов',
          organization: 'Премии автомобильной индустрии',
          year: '2023',
          description: 'Награждена за исключительное удовлетворение клиентов и поддержку'
        }
      ]
    },
    content: {
      heroTitle: 'О CarMarket365',
      heroSubtitle: 'Мы на миссии сделать покупку и продажу автомобилей простой, прозрачной и приятной. С 2009 года мы соединяем покупателей и продавцов с доверием и инновациями.',
      missionTitle: 'Наша миссия',
      missionContent: 'Революционизировать опыт покупки и продажи автомобилей, предоставляя прозрачную, надёжную и удобную для пользователя платформу, которая соединяет людей с их идеальным автомобилем.',
      missionDescription: 'Мы верим, что каждый заслуживает доступа к надёжному транспорту и справедливым ценам, без стресса и неопределённости, традиционно связанных с покупкой автомобилей.',
      visionTitle: 'Наше видение',
      visionContent: 'Стать самой надёжной автомобильной площадкой в мире, где каждая сделка построена на прозрачности, качестве и удовлетворении клиентов.',
      visionDescription: 'Мы представляем будущее, где покупка или продажа автомобиля так же проста, как несколько кликов, с полным доверием к процессу и результату.',
      valuesTitle: 'Наши ценности',
      valuesDescription: 'Эти основополагающие принципы направляют всё, что мы делаем, и формируют культуру нашей компании',
      teamTitle: 'Познакомьтесь с нашей командой',
      teamDescription: 'Увлечённые профессионалы, посвятившие себя трансформации автомобильной индустрии',
      journeyTitle: 'Наш путь',
      journeyDescription: 'Ключевые вехи, которые формировали нашу компанию на протяжении лет',
      awardsTitle: 'Награды и признание',
      awardsDescription: 'Мы гордимся тем, что признаны лидерами индустрии за наши инновации и сервис',
      ctaTitle: 'Готовы присоединиться к нашему пути?',
      ctaDescription: 'Если вы ищете свой следующий автомобиль или хотите стать частью нашей команды, мы хотели бы услышать от вас.',
      joinTeam: 'Присоединиться к нашей команде',
      contactUs: 'Связаться с нами',
      browseCars: 'Просмотреть автомобили',
      connect: 'Связаться'
    }
  },

  carReviews: {
    title: 'Обзоры автомобилей',
    subtitle: 'Экспертные обзоры и отзывы пользователей, которые помогут вам принимать обоснованные решения при покупке следующего автомобиля.',
    backToHome: 'Назад на главную',
    
    // Main content
    overviewTitle: 'Обзоры и рейтинги автомобилей',
    overviewDescription: 'Комплексные обзоры, которые помогут вам принимать обоснованные решения при покупке транспортных средств.',
    overviewText: 'Наш раздел обзоров автомобилей предоставляет детальный анализ от автомобильных экспертов и реальный опыт владельцев, чтобы помочь вам понять все аспекты рассматриваемых транспортных средств.',
    
    // Review types
    expertReviews: {
      title: 'Экспертные обзоры',
      features: [
        'Профессиональная автомобильная журналистика',
        'Детальный анализ производительности',
        'Рейтинги безопасности и надёжности',
        'Сравнительное тестирование транспортных средств'
      ]
    },
    ownerReviews: {
      title: 'Отзывы владельцев',
      features: [
        'Реальный опыт владения',
        'Долгосрочные отзывы о надёжности',
        'Понимание затрат на обслуживание',
        'Впечатления от ежедневного вождения'
      ]
    },
    ratingSystem: {
      title: 'Система рейтинга',
      features: [
        'Система рейтинга из 5 звёзд',
        'Оценки по конкретным категориям',
        'Общие рекомендации',
        'Разбор преимуществ и недостатков'
      ]
    },
    marketInsights: {
      title: 'Рыночные аналитики',
      features: [
        'Анализ перепродажной стоимости',
        'Отчёты о рыночных тенденциях',
        'Рекомендации лучшей ценности',
        'Сезонные руководства по покупке'
      ]
    },
    
    // Categories
    categoriesTitle: 'Категории обзоров',
    categoriesDescription: 'Наши обзоры охватывают все аспекты владения и производительности транспортных средств.',
    performance: {
      title: 'Производительность',
      items: [
        'Производительность двигателя',
        'Управление и динамика вождения',
        'Эффективность топлива',
        'Разгон и торможение'
      ]
    },
    comfort: {
      title: 'Комфорт и интерьер',
      items: [
        'Комфорт сидений',
        'Внутреннее пространство и хранение',
        'Технологические функции',
        'Качество сборки и материалы'
      ]
    },
    safety: {
      title: 'Безопасность и надёжность',
      items: [
        'Рейтинги и функции безопасности',
        'Надёжность и обслуживание',
        'Гарантийное покрытие',
        'История отзывов'
      ]
    },
    
    // Coming soon
    comingSoonTitle: 'Обзоры скоро появятся!',
    comingSoonText: 'В настоящее время мы строим нашу комплексную базу данных обзоров. Экспертные обзоры и отзывы владельцев скоро будут доступны, чтобы помочь направить ваши решения о покупке автомобилей.',
    browseCars: 'Просмотреть доступные автомобили',
    exploreInventory: 'Изучить инвентарь'
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
        'Седан', 'Внедорожник', 'Хэтчбек', 'Купе', 'Кабриолет', 'Универсал', 'Пикап', 'Фургон',
        'Минивэн', 'Кроссовер', 'Компакт', 'Субкомпакт', 'Средний размер', 'Полный размер',
        'Спортивный автомобиль', 'Люксовый', 'Электрический', 'Гибрид'
      ],
      fuelTypes: [
        'Бензин', 'Дизель', 'Гибрид', 'Электрический', 'Подключаемый гибрид', 'CNG', 'LPG',
        'Flex Fuel', 'Водород', 'Биодизель', 'E85 Этанол'
      ],
      transmissions: [
        'Механическая', 'Автоматическая', 'CVT', 'Полуавтоматическая', 'Двойное сцепление', '6-ступенчатая механическая',
        '7-ступенчатая автоматическая', '8-ступенчатая автоматическая', '9-ступенчатая автоматическая', '10-ступенчатая автоматическая'
      ],
      drivetrains: [
        'Передний привод', 'Задний привод', 'Полный привод', '4WD', 
        'Частичный 4WD', 'Постоянный 4WD', 'Электронный полный привод', 'Механический полный привод'
      ],
      colors: [
        'Чёрный', 'Белый', 'Серебристый', 'Серый', 'Синий', 'Красный', 'Зелёный', 'Коричневый', 
        'Золотой', 'Жёлтый', 'Оранжевый', 'Фиолетовый', 'Бежевый', 'Tan', 'Бронзовый', 'Медный',
        'Перламутровый белый', 'Металлик серебристый', 'Глубокий синий', 'Гоночный красный', 'Лесной зелёный',
        'Угольный', 'Платиновый', 'Другой'
      ],
      conditions: [
        'Новый', 'Как новый', 'Отличное', 'Очень хорошее', 'Хорошее', 'Справедливое', 'Подержанный', 
        'Сертифицированный б/у', 'Восстановленный', 'Отреставрированный', 'Классический', 'Винтажный'
      ],
      features: [
        'Кондиционер', 'Кожаные сиденья', 'Навигационная система', 'Bluetooth', 'USB порт',
        'Камера заднего вида', 'Парковочные сенсоры', 'Обогрев сидений', 'Люк', 'Литые диски',
        'Круиз-контроль', 'ABS', 'Система курсовой устойчивости', 'Подушки безопасности',
        'Дистанционный запуск', 'Бесключевой доступ', 'Электростеклоподъёмники', 'Гидроусилитель руля', 'Тонированные стёкла',
        'Премиум аудиосистема', 'Спутниковое радио', 'CD проигрыватель', 'MP3 проигрыватель', 'DVD проигрыватель',
        'Беспроводная зарядка', 'Apple CarPlay', 'Android Auto', 'Предупреждение о смене полосы',
        'Мониторинг слепых зон', 'Предупреждение о лобовом столкновении', 'Автоматическое экстренное торможение',
        'Адаптивный круиз-контроль', 'Помощник парковки', 'Камера заднего вида', '360-градусная камера',
        'Обогрев руля', 'Охлаждаемые сиденья', 'Вентилируемые сиденья', 'Память сидений',
        'Электрорегулировка сидений', 'Сиденья третьего ряда', 'Складывающиеся задние сиденья', 
        'Шторка багажника', 'Багажник на крыше', 'Прицепное устройство', 'Боковые подножки', 'Боковые ступени'
      ],
      certifications: [
        'Сертифицированный б/у', 'Гарантия производителя', 'Расширенная гарантия', 
        'Техпомощь на дороге', 'Отчёт об истории автомобиля', 'Многоточечная проверка',
        'Проверка выбросов', 'Проверка безопасности', 'Сертификация дилера', 'Сертификация третьей стороны',
        'Carfax проверен', 'AutoCheck проверен', 'Без аварий', 'Один владелец',
        'Записи о техобслуживании доступны', 'Техобслуживание актуально'
      ]
    }
  },

  safetyTips: {
    title: 'Советы по безопасности',
    subtitle: 'Основные рекомендации по безопасности для покупки, продажи и обслуживания вашего автомобиля.',
    backToHome: 'Назад на главную',
    
    // Main content
    mainTitle: 'Рекомендации по безопасности автомобилей',
    mainDescription: 'Комплексные советы по безопасности для безопасной покупки и продажи автомобилей.',
    safetyOverview: 'Покупаете ли вы свой первый автомобиль или продаёте текущий, соблюдение соответствующих рекомендаций безопасности защищает вас от мошенничества, обеспечивает справедливые сделки и помогает поддерживать вашу личную безопасность на протяжении всего процесса.',
    
    // Safety categories
    meetingSafety: {
      title: 'Безопасность встреч',
      items: [
        'Всегда встречайтесь в общественном, хорошо освещённом месте',
        'Возьмите с собой надёжного друга или члена семьи',
        'Сообщите кому-либо о ваших планах встречи',
        'По возможности встречайтесь в дневное время',
        'Доверяйте своим инстинктам - уходите, если что-то кажется неправильным',
        'Никогда не встречайтесь дома и не приглашайте незнакомцев туда'
      ]
    },
    paymentSecurity: {
      title: 'Безопасность платежей',
      items: [
        'Никогда не отправляйте деньги или депозиты до осмотра автомобиля',
        'Используйте безопасные способы оплаты (банковский перевод, заверенный чек)',
        'Избегайте наличных операций на крупные суммы',
        'Остерегайтесь мошенничества с переплатой',
        'По возможности проводите операции в банке',
        'Получайте квитанции за все платежи и операции'
      ]
    },
    vehicleInspection: {
      title: 'Осмотр автомобиля',
      items: [
        'Всегда осматривайте автомобиль лично',
        'Возьмите с собой знающего механика или опытного друга',
        'Протестируйте автомобиль в различных условиях',
        'Проверьте все документы и историю автомобиля',
        'Убедитесь, что VIN-номер совпадает со всеми документами',
        'Не спешите - найдите время для тщательного осмотра'
      ]
    },
    redFlags: {
      title: 'Тревожные сигналы',
      items: [
        'Продавец отказывается встретиться лично',
        'Требование оплаты до осмотра автомобиля',
        'Цена значительно ниже рыночной стоимости',
        'Давление с целью быстрого завершения сделки',
        'Неполная или подозрительная документация',
        'Продавец не может предоставить чёткое подтверждение владения'
      ]
    },
    
    // Documentation
    documentation: {
      title: 'Необходимые документы',
      description: 'Важные документы для проверки и получения при сделках с автомобилями.',
      forBuyers: 'Для покупателей',
      buyerItems: [
        'Свидетельство о регистрации автомобиля',
        'Действующие документы продавца',
        'Записи о техническом обслуживании',
        'Сертификат технического осмотра',
        'Подтверждение страховки',
        'Чистое свидетельство или информация о залоге'
      ],
      forSellers: 'Для продавцов',
      sellerItems: [
        'Текущая регистрация автомобиля',
        'Чистое свидетельство на автомобиль',
        'Последние записи об обслуживании',
        'Действующие водительские права',
        'Шаблон договора купли-продажи',
        'Форма освобождения от ответственности'
      ]
    },
    
    // Emergency contact
    emergency: {
      title: 'Нужна помощь или есть опасения?',
      message: 'Если вы столкнулись с подозрительной деятельностью или нуждаетесь в помощи, не стесняйтесь обратиться к местным властям или сообщить о проблеме нашей службе поддержки.',
      browseCars: 'Просмотреть безопасные объявления',
      reportConcern: 'Сообщить о проблеме'
    }
  },

  expressSell: {
    title: 'Продайте свой автомобиль быстро',
    subtitle: 'Разместите ваш автомобиль за минуты с помощью нашего экспресс-процесса продажи',
    backToHome: 'Назад на главную',
    step: 'Шаг',
    of: 'из',
    carDetails: 'Детали автомобиля',
    carDetailsDescription: 'Расскажите нам о вашем автомобиле, чтобы создать привлекательное объявление',
    make: 'Марка',
    makeRequired: 'Марка *',
    selectMake: 'Выберите марку',
    model: 'Модель',
    modelRequired: 'Модель *',
    selectModel: 'Выберите модель',
    year: 'Год',
    yearRequired: 'Год *',
    selectYear: 'Выберите год',
    mileage: 'Пробег',
    mileageRequired: 'Пробег *',
    enterMileage: 'Введите пробег',
    kilometers: 'километров',
    fuelType: 'Тип топлива',
    fuelTypeRequired: 'Тип топлива *',
    selectFuelType: 'Выберите тип топлива',
    gasoline: 'Бензин',
    diesel: 'Дизель',
    electric: 'Электро',
    hybrid: 'Гибрид',
    transmission: 'Коробка передач',
    transmissionRequired: 'Коробка передач *',
    selectTransmission: 'Выберите коробку передач',
    manual: 'Механическая',
    automatic: 'Автоматическая',
    condition: 'Состояние',
    conditionRequired: 'Состояние *',
    selectCondition: 'Выберите состояние',
    excellent: 'Отличное',
    veryGood: 'Очень хорошее',
    good: 'Хорошее',
    fair: 'Удовлетворительное',
    price: 'Цена',
    priceRequired: 'Цена *',
    enterPrice: 'Введите запрашиваемую цену',
    euros: 'евро',
    description: 'Описание',
    descriptionOptional: 'Описание (Опционально)',
    enterDescription: 'Введите описание',
    descriptionPlaceholder: 'Опишите особенности, состояние и историю вашего автомобиля...',
    photosAndContact: 'Фото и контакты',
    photosAndContactDescription: 'Добавьте фотографии и вашу контактную информацию',
    carPhotos: 'Фотографии автомобиля',
    carPhotosRequired: 'Фотографии автомобиля *',
    uploadPhotos: 'Загрузить фотографии',
    photosUploaded: 'фотографий загружено',
    contactInformation: 'Контактная информация',
    fullName: 'Полное имя',
    fullNameRequired: 'Полное имя *',
    enterFullName: 'Введите ваше полное имя',
    phoneNumber: 'Номер телефона',
    phoneRequired: 'Телефон *',
    enterPhone: 'Введите номер телефона',
    emailAddress: 'Адрес электронной почты',
    emailRequired: 'Email *',
    enterEmail: 'Введите адрес электронной почты',
    location: 'Местоположение',
    locationRequired: 'Местоположение *',
    enterLocation: 'Введите ваше местоположение',
    preview: 'Предварительный просмотр',
    previewDescription: 'Просмотрите ваше объявление перед публикацией',
    yourListing: 'Ваше объявление',
    listingPreview: 'Предварительный просмотр объявления',
    photos: 'Фотографии',
    contactDetails: 'Контактные данные',
    previous: 'Предыдущий',
    next: 'Далее',
    publishListing: 'Опубликовать объявление',
    successMessage: 'Ваш автомобиль успешно размещён!',
    requiredField: 'Это поле обязательно',
  },

  financing: {
    title: 'Автокредитование',
    subtitle: 'Найдите лучшие варианты финансирования для покупки вашего следующего автомобиля.',
    loanCalculator: 'Калькулятор кредита',
    monthlyPayment: 'Ежемесячный платёж',
    totalInterest: 'Общая сумма процентов',
    totalPayment: 'Общая сумма выплат',
    loanAmount: 'Сумма кредита',
    interestRate: 'Процентная ставка',
    loanTerm: 'Срок кредита',
    years: 'лет',
    calculate: 'Рассчитать',
  },

  faq: {
    title: 'Часто задаваемые вопросы',
    subtitle: 'Найдите ответы на распространенные вопросы о покупке, продаже, финансировании и использовании CarMarket365.',
    searchPlaceholder: 'Поиск в FAQ...',
    browseByCategory: 'Поиск по категориям',
    allQuestions: 'Все вопросы',
    stillNeedHelp: 'Нужна дополнительная помощь?',
    stillNeedHelpDescription: 'Не можете найти то, что ищете? Наша команда поддержки готова помочь.',
    callSupport: 'Позвонить в службу поддержки',
    emailUs: 'Написать нам',
    liveChat: 'Живой чат',
    available247: 'Доступно 24/7',
    noResultsFound: 'Результаты не найдены',
    noResultsText: 'Попробуйте поискать с другими ключевыми словами или просмотрите по категориям.',
    clearSearch: 'Очистить поиск',
    staticContent: {
      categories: {
        buying: 'Покупка автомобилей',
        selling: 'Продажа автомобилей',
        financing: 'Финансирование и платежи',
        safety: 'Безопасность и защита',
        account: 'Аккаунт и использование'
      },
      questions: [
        {
          id: 'buy-1',
          category: 'buying',
          question: 'Как я могу купить свой первый автомобиль на CarMarket365?',
          answer: 'Чтобы купить автомобиль, начните с поиска транспортных средств с помощью наших детальных фильтров. Когда найдёте понравившийся автомобиль, свяжитесь с продавцом напрямую через нашу платформу. Мы всегда рекомендуем осмотреть автомобиль перед покупкой и проверить документацию.'
        },
        {
          id: 'buy-2',
          category: 'buying',
          question: 'Проверены ли продавцы на платформе?',
          answer: 'Да, все профессиональные продавцы проверены нашей командой. Частные продавцы также проходят базовый процесс верификации. Ищите знак верификации в профилях продавцов для полной прозрачности.'
        },
        {
          id: 'buy-3',
          category: 'buying',
          question: 'Могу ли я протестировать автомобиль перед покупкой?',
          answer: 'Конечно! Большинство продавцов разрешают тест-драйвы. Свяжитесь с продавцом, чтобы назначить встречу для тест-драйва. Всегда берите действующие водительские права и убедитесь, что у автомобиля есть действующая страховка.'
        },
        {
          id: 'buy-4',
          category: 'buying',
          question: 'Что я должен проверить перед покупкой автомобиля?',
          answer: 'Проверьте: историю автомобиля, правовые документы, физическое состояние, основные системы (двигатель, тормоза, трансмиссия) и совершите тест-драйв. Мы также рекомендуем осмотр у доверенного механика.'
        },
        {
          id: 'buy-5',
          category: 'buying',
          question: 'Предоставляет ли CarMarket365 гарантии на автомобили?',
          answer: 'CarMarket365 - это платформа, которая соединяет покупателей с продавцами. Гарантии предоставляются индивидуальными продавцами. Большинство профессиональных продавцов предлагают ограниченные гарантии. Проверьте детали гарантии с продавцом перед покупкой.'
        },
        {
          id: 'sell-1',
          category: 'selling',
          question: 'Сколько стоит продать автомобиль на CarMarket365?',
          answer: 'Базовое размещение бесплатно для частных продавцов. Мы также предлагаем премиум опции с дополнительными функциями, такими как лучшая экспозиция и профессиональная фотография. У профессиональных продавцов есть месячные планы с расширенными функциями.'
        },
        {
          id: 'sell-2',
          category: 'selling',
          question: 'Сколько времени занимает продажа автомобиля?',
          answer: 'Время продажи зависит от нескольких факторов: цены, состояния автомобиля, спроса на рынке и качества объявления. В среднем автомобили продаются в течение 2-8 недель. Объявления с конкурентными ценами и качественными фотографиями продаются быстрее.'
        },
        {
          id: 'sell-3',
          category: 'selling',
          question: 'Как я могу увеличить шансы продажи моего автомобиля?',
          answer: 'Используйте профессиональные фотографии, пишите детальные описания, устанавливайте конкурентные цены, будьте честны о состоянии автомобиля и быстро отвечайте на вопросы. Также рассмотрите наш сервис профессиональной фотографии.'
        },
        {
          id: 'sell-4',
          category: 'selling',
          question: 'Какие документы мне нужны для продажи автомобиля?',
          answer: 'Вам понадобятся: свидетельство о регистрации, документ удостоверяющий личность, техосмотр и справка о текущей страховке. Для автомобилей старше 4 лет также нужен сертификат техосмотра.'
        },
        {
          id: 'sell-5',
          category: 'selling',
          question: 'Могу ли я изменить цену моего объявления?',
          answer: 'Да, вы можете изменить цену в любое время из вашей панели управления. Мы рекомендуем мониторить рынок и корректировать цены по необходимости для максимизации интереса покупателей.'
        },
        {
          id: 'financing-1',
          category: 'financing',
          question: 'Предлагает ли CarMarket365 варианты финансирования?',
          answer: 'Мы сотрудничаем с несколькими партнёрскими финансовыми учреждениями для предложения кредитных опций. Вы можете подать заявку на предварительное одобрение через нашу платформу. Процентные ставки и условия зависят от вашего финансового профиля и выбранного автомобиля.'
        },
        {
          id: 'financing-2',
          category: 'financing',
          question: 'Какая информация нужна для заявки на кредит?',
          answer: 'Заявка требует: персональную информацию, месячные доходы, информацию о трудоустройстве, кредитную историю и детали об автомобиле, который вы хотите купить. Процесс предварительного одобрения обычно занимает 10-15 минут.'
        },
        {
          id: 'financing-3',
          category: 'financing',
          question: 'Какая самая низкая процентная ставка, которую я могу получить?',
          answer: 'Процентные ставки начинаются от 3.9% годовых для квалифицированных заявителей. Актуальная ставка зависит от вашего кредитного рейтинга, доходов, срока кредита и типа автомобиля. Используйте наш кредитный калькулятор для предварительной оценки.'
        },
        {
          id: 'safety-1',
          category: 'safety',
          question: 'Как быть в безопасности при покупке у частного продавца?',
          answer: 'Всегда встречайтесь в общественных местах, берите с собой друга, осматривайте автомобиль при дневном свете, проверяйте личность продавца и не носите большие суммы наличных. Используйте наши рекомендуемые способы оплаты для безопасных сделок.'
        },
        {
          id: 'safety-2',
          category: 'safety',
          question: 'Что мне делать, если продавец кажется подозрительным?',
          answer: 'Доверяйте своим инстинктам. Если что-то кажется подозрительным, не продолжайте сделку. Сообщите о подозрительной активности нашей команде безопасности на safety@carmarket365.com. Мы расследуем и примем соответствующие меры.'
        },
        {
          id: 'safety-3',
          category: 'safety',
          question: 'Как я могу проверить, украден ли автомобиль?',
          answer: 'Проверьте VIN автомобиля в наших базах данных и запросите отчёт об истории автомобиля. Убедитесь, что VIN на автомобиле соответствует документам. Если у вас есть сомнения, свяжитесь с местными властями перед покупкой.'
        },
        {
          id: 'account-1',
          category: 'account',
          question: 'Как создать аккаунт на CarMarket365?',
          answer: 'Нажмите "Зарегистрироваться" вверху страницы. Вы можете выбрать между частным аккаунтом (для покупателей и частных продавцов) или профессиональным аккаунтом (для продавцов и дилеров). Процесс бесплатный и занимает всего несколько минут.'
        },
        {
          id: 'account-2',
          category: 'account',
          question: 'Могу ли я изменить тип моего аккаунта позже?',
          answer: 'Да, вы можете в любое время обновиться с частного до профессионального аккаунта. Свяжитесь с нашей поддержкой клиентов для помощи с переносом. Обратите внимание, что некоторые функции могут быть не переносимы.'
        },
        {
          id: 'account-3',
          category: 'account',
          question: 'Как сбросить мой пароль?',
          answer: 'Нажмите "Забыли пароль?" на странице входа. Введите ваш email адрес, и мы отправим вам ссылку для сброса. Ссылка действительна 24 часа по соображениям безопасности.'
        },
        {
          id: 'account-4',
          category: 'account',
          question: 'Как удалить мой аккаунт?',
          answer: 'Вы можете удалить ваш аккаунт из настроек аккаунта или связавшись с нами напрямую. Обратите внимание, что удаление постоянно, и вы потеряете все ваши данные и объявления.'
        },
        {
          id: 'account-5',
          category: 'account',
          question: 'Могу ли я иметь несколько аккаунтов?',
          answer: 'Каждый человек может иметь только один активный аккаунт. Несколько аккаунтов могут привести к приостановке аккаунта. Если вам нужно изменить тип аккаунта, свяжитесь с нашей поддержкой для помощи.'
        }
      ]
    }
  },

  dealers: {
    title: 'Найти проверенных дилеров',
    subtitle: 'Свяжитесь с проверенными автосалонами в вашем регионе. Качественные автомобили, профессиональное обслуживание и конкурентные цены.',
    searchDealers: 'Поиск дилеров',
    dealerNameOrCity: 'Название дилера или город',
    allStates: 'Все регионы',
    allSpecialties: 'Все специализации',
    sortBy: 'Сортировать по',
    sortByDistance: 'Расстояние',
    sortByRating: 'Рейтинг',
    sortByInventory: 'Наличие',
    verifiedDealers: 'Проверенные дилеры',
    carsAvailable: 'Доступные автомобили',
    averageRating: 'Средний рейтинг',
  },

  registeredDealers: {
    title: 'Зарегистрированные дилеры',
    subtitle: 'Просмотрите нашу сеть проверенных автомобильных дилеров',
    viewProfile: 'Посмотреть профиль',
    viewInventory: 'Посмотреть инвентарь',
    contactDealer: 'Связаться с дилером',
    backToHome: 'Назад на главную',
    allDealersVerified: 'Все дилеры проверены',
    customerRated: 'Оценка клиентов',
    supportAvailable: 'Поддержка 24/7',
    browseNetwork: 'Просмотрите нашу сеть из {count} проверенных дилеров по всей Германии',
    reviews: 'отзывов',
    verifiedSince: 'Проверен с {year}',
    experience: 'Опыт:',
    totalSales: 'Общие продажи:',
    viewDealerProfile: 'Посмотреть профиль дилера',
    years: 'лет',
    
    // Dealer specialties
    specialties: {
      luxuryCars: 'Люксовые автомобили',
      suvs: 'Внедорожники',
      electricVehicles: 'Электромобили',
      familyCars: 'Семейные автомобили',
      compactCars: 'Компактные автомобили',
      hybrids: 'Гибриды',
      sportsCars: 'Спортивные автомобили',
      convertibles: 'Кабриолеты',
      performance: 'Производительность',
      mercedesBenz: 'Mercedes-Benz',
      porsche: 'Porsche',
      luxury: 'Люксовые',
      businessCars: 'Бизнес-автомобили',
      fleetSales: 'Продажи автопарков',
      leasing: 'Лизинг',
      ecoFriendly: 'Экологичные',
    },
    
    // Dealer descriptions
    descriptions: {
      autoMaxDescription: 'Ведущий дилер люксовых автомобилей в Берлине с более чем 15-летним опытом. Специализация на премиальных немецких брендах.',
      cityMotorsDescription: 'Семейный автосалон, обслуживающий Мюнхен и окрестности. Известен отличным обслуживанием клиентов и справедливыми ценами.',
      ecoWheelsDescription: 'Ведущий специалист по электрическим и гибридным автомобилям в Гамбурге. Привержен решениям устойчивого транспорта.',
      rheinAutoDescription: 'Специалисты по спортивным автомобилям в Рейнской области. Обширная коллекция высокопроизводительных автомобилей.',
      stuttgartLuxuryDescription: 'Авторизованный дилер Mercedes-Benz и Porsche в Штутгарте. Дом лучшей немецкой инженерии.',
      nordFahrzeugeDescription: 'Специалист по корпоративным автомобилям, обслуживающий деловой район Франкфурта. Эксперт по решениям автопарков и лизингу.',
    },
  },

  // Дополнительные переводы для жёстко закодированного текста
  hardcodedFixes: {
    // Специфично для CountryTestPage
    countryTestPage: {
      codeLabel: 'Код:',
      loadingCars: 'Загрузка автомобилей...',
      errorPrefix: 'Ошибка:',
      carListingsFor: 'Списки автомобилей для',
      onlyListedDescription: 'Только автомобили, перечисленные в <strong>{country} ({code})</strong>, должны появиться ниже',
      foundCarsIn: 'Найдено {count} автомобилей в {country}',
      countryFilteredResults: '🔒 Результаты, отфильтрованные по стране',
      noCarsFound: 'Автомобили не найдены',
      noCarsInCountry: 'В настоящее время нет автомобилей, перечисленных в {country}.',
      trySwitchingCountry: 'Попробуйте переключить страну с помощью переключателя выше.',
      carIdAndCountry: 'ID: {id} | Страна: {country}',
      developmentNote: '<strong>Примечание:</strong> В производстве страны автоматически определяются из поддомена (например, mk.carmarket365.com, al.carmarket365.com). Этот переключатель работает только в режиме разработки.',
    },

    // AdminDashboard - значки статуса и мок-данные
    adminDashboard: {
      statusBadges: {
        suspended: 'Приостановлен',
      },
      mockData: {
        // Имена пользователей
        johnDealer: 'Иван Дилер',
        johnDealerEmail: 'ivan@dilerstvo.com',
        annaCustomer: 'Анна Клиент',
        annaCustomerEmail: 'anna@klient.com',
        bobAdmin: 'Боб Администратор',
        bobAdminEmail: 'bob@admin.com',
        
        // Заголовки объявлений
        bmw3Series2022: '2022 BMW 3 серия',
        audiA42021: '2021 Audi A4',
        mercedesCClass2020: '2020 Mercedes C-класс',
        
        // Категории
        sedan: 'Седан',
        luxury: 'Люкс',
        
        // Названия компаний
        premiumMotors: 'Премиум Моторс',
        eliteCars: 'Элит Карс',
        
        // Пользователи активности
        premiumMotorsGmbH: 'Премиум Моторс ГмбХ',
        suspiciousUser: 'Подозрительный пользователь',
        autoHausBerlin: 'АвтоХаус Берлин',
        
        // Временные индикаторы
        twoHoursAgo: '2ч назад',
        fourHoursAgo: '4ч назад',
        sixHoursAgo: '6ч назад',
        eightHoursAgo: '8ч назад',
      },
    },

    // DealerDashboard мок-данные
    dealerDashboard: {
      mockData: {
        // Заголовки автомобилей
        bmw3Series320i2022: '2022 BMW 3 серия 320i',
        audiA4Avant2021: '2021 Audi A4 Avant',
        mercedesCClass2020: '2020 Mercedes C-класс',
        
        // Значения пробега
        mileage25k: '25 000 км',
        mileage18k: '18 000 км',
        mileage32k: '32 000 км',
      },
    },

    // Финансирование жёстко закодированный текст
    financing: {
      features: {
        quickApproval: {
          title: 'Быстрое одобрение',
          description: 'Получите одобрение за минуты',
        },
        lowRates: {
          title: 'Низкие ставки',
          description: 'Конкурентные процентные ставки',
        },
        noCreditImpact: {
          title: 'Без влияния на кредит',
          description: 'Только мягкая кредитная проверка',
        },
        expertSupport: {
          title: 'Экспертная поддержка',
          description: 'Преданные специалисты по кредитам',
        },
      },
      form: {
        creditScoreRange: 'Диапазон кредитного рейтинга',
        loanTerm: 'Срок кредита',
      },
      summary: {
        loanSummary: 'Сводка по кредиту',
        loanAmount: 'Сумма кредита',
        monthlyPayment: 'Ежемесячный платёж',
        totalInterest: 'Общие проценты',
        totalPayment: 'Общий платёж',
      },
      options: {
        financingOptions: 'Варианты финансирования',
        chooseOption: 'Выберите вариант, который лучше всего подходит вам',
        traditionalAutoLoan: 'Традиционный автокредит',
        mostPopular: 'Самый популярный',
        leaseOptions: 'Варианты лизинга',
      },
    },

    contact: {
      title: 'Связаться с нами',
      subtitle: 'Свяжитесь с нашей командой для поддержки, вопросов или помощи в покупке или продаже автомобиля.',
      backToHome: 'Вернуться на главную',
      
      // Main content
      mainTitle: 'Свяжитесь с нами',
      mainDescription: 'Несколько способов связаться с нашей службой поддержки для получения помощи.',
      contactOverview: 'Если у вас есть вопросы о покупке автомобиля, вам нужна помощь в продаже вашего транспортного средства или требуется техническая поддержка, наша преданная команда готова вам помочь. Выберите наиболее удобный для вас способ связи.',
      
      // Contact methods
      phoneSupport: {
        title: 'Телефонная поддержка',
        salesDepartment: 'Отдел продаж',
        customerService: 'Служба поддержки клиентов',
        financingDepartment: 'Финансовый отдел'
      },
      emailSupport: {
        title: 'Поддержка по email',
        generalInquiries: 'Общие вопросы',
        salesQuestions: 'Вопросы по продажам',
        support: 'Техническая поддержка'
      },
      businessHours: {
        title: 'Часы работы',
        mondayFriday: 'Понедельник - Пятница',
        saturday: 'Суббота',
        sunday: 'Воскресенье',
        timeRange: {
          mondayFriday: '8:00 - 20:00',
          saturday: '9:00 - 18:00',
          sunday: '10:00 - 16:00'
        }
      },
      officeLocation: {
        title: 'Местоположение офиса',
        address: {
          street: 'Potsdamer Platz 1',
          city: '10785 Берлин, Германия',
          country: 'Германия'
        },
        getDirections: 'Построить маршрут'
      },
      
      // Contact form
      form: {
        title: 'Отправить нам сообщение',
        subtitle: 'Заполните форму ниже, и мы свяжемся с вами как можно скорее.',
        required: '*',
        inquiryType: {
          label: 'Тип запроса',
          placeholder: 'Выберите тип запроса',
          options: {
            buying: 'Покупка автомобиля',
            selling: 'Продажа автомобиля',
            financing: 'Финансирование',
            dealer: 'Услуги для дилеров',
            support: 'Техническая поддержка',
            other: 'Другое'
          }
        },
        fields: {
          fullName: 'Полное имя',
          email: 'Email адрес',
          phone: 'Номер телефона',
          subject: 'Тема',
          message: 'Сообщение'
        },
        placeholders: {
          name: 'Введите ваше полное имя',
          email: 'Введите ваш email адрес',
          phone: 'Введите ваш номер телефона',
          subject: 'Введите тему сообщения',
          message: 'Расскажите, как мы можем вам помочь...'
        },
        submitButton: 'Отправить сообщение',
        disclaimer: 'Мы обычно отвечаем в течение 24 часов в рабочие дни.'
      },
      
      // Success message
      success: {
        title: 'Сообщение отправлено!',
        message: 'Спасибо за обращение к нам. Мы получили ваше сообщение и ответим в течение 24 часов.'
      },
      
      // Quick help
      quickHelp: {
        title: 'Быстрая помощь',
        subtitle: 'Найдите ответы на часто задаваемые вопросы или получите немедленную помощь.',
        options: {
          buyingGuide: {
            title: 'Руководство по покупке автомобиля',
            description: 'Узнайте о нашем процессе покупки автомобилей'
          },
          sellingGuide: {
            title: 'Руководство по продаже автомобиля', 
            description: 'Получите помощь в продаже вашего транспортного средства'
          },
          faq: {
            title: 'Часто задаваемые вопросы',
            description: 'Просмотрите часто задаваемые вопросы'
          },
          safetyTips: {
            title: 'Советы по безопасности',
            description: 'Важные рекомендации по безопасности'
          }
        }
      },
      
      // Urgent support
      urgentSupport: {
        title: 'Нужна немедленная помощь?',
        message: 'Для срочных вопросов или немедленной помощи звоните на нашу линию поддержки или просматривайте наши доступные автомобили.',
        browseCars: 'Просмотреть автомобили',
        callNow: 'Позвонить сейчас'
      }
    },

    // Страница дилеров - жёстко закодированные строки
    dealers: {
      searchLabel: 'Поиск дилеров',
      stateLabel: 'Регион',
      specialtyLabel: 'Специализация',
      allStatesOption: 'Все регионы',
      allSpecialtiesOption: 'Все специализации',
      sortByDistance: 'По расстоянию',
      sortByRating: 'По рейтингу',
      sortByInventory: 'По количеству авто',
      sortByLabel: 'Сортировать по:',
      dealersFound: 'дилеров найдено',
      specialtiesHeader: 'Специализации',
      certificationsHeader: 'Сертификаты',
      noDealersFound: 'Дилеры не найдены',
      tryAdjustingFilters: 'Попробуйте изменить критерии поиска',
      viewProfile: 'Посмотреть профиль',
      contact: 'Контакты',
      clearFilters: 'Очистить фильтры',
      milesAway: 'км',
      cars: 'автомобилей',
      reviews: 'отзывов',
      hoursLabel: 'Часы работы',
    },

    registeredDealers: {
      title: 'Зарегистрированные дилеры',
      subtitle: 'Просмотрите нашу сеть проверенных автомобильных дилеров',
      viewProfile: 'Посмотреть профиль',
      viewInventory: 'Посмотреть инвентарь',
      contactDealer: 'Связаться с дилером',
      backToHome: 'Вернуться домой',
      allDealersVerified: 'Все дилеры проверены',
      customerRated: 'Оценено клиентами',
      supportAvailable: 'Поддержка 24/7',
      browseNetwork: 'Просмотрите нашу сеть из {count} проверенных дилеров по всей Германии',
      reviews: 'отзывов',
      verifiedSince: 'Проверен с {year}',
      experience: 'Опыт:',
      totalSales: 'Общие продажи:',
      viewDealerProfile: 'Посмотреть профиль дилера',
      verifiedDealers: 'Проверенные дилеры',
      totalDealers: 'Всего дилеров',
      averageRating: 'Средний рейтинг',
      totalInventory: 'Общий инвентарь',
      searchDealers: 'Поиск дилеров',
      allLocations: 'Все местоположения',
      sortBy: 'Сортировать по',
      years: 'лет',
      
      // Dealer specialties
      specialties: {
        luxuryCars: 'Люксовые автомобили',
        suvs: 'Внедорожники',  
        electricVehicles: 'Электромобили',
        familyCars: 'Семейные автомобили',
        compactCars: 'Компактные автомобили',
        hybrids: 'Гибриды',
        sportsCars: 'Спортивные автомобили',
        convertibles: 'Кабриолеты',
        performance: 'Производительность',
        mercedesBenz: 'Mercedes-Benz',
        porsche: 'Porsche',
        luxury: 'Люкс',
        businessCars: 'Бизнес автомобили',
        fleetSales: 'Продажа автопарков',
        leasing: 'Лизинг',
        ecoFriendly: 'Экологичные',
      },

      // Dealer descriptions  
      descriptions: {
        autoMaxDescription: 'Ведущий дилер люксовых автомобилей в Берлине с опытом более 15 лет. Специализируется на премиальных немецких брендах.',
        cityMotorsDescription: 'Семейный дилерский центр, обслуживающий Мюнхен и прилегающие районы. Известен отличным обслуживанием клиентов и честными ценами.',
        ecoWheelsDescription: 'Ведущий специалист по электрическим и гибридным автомобилям в Гамбурге. Привержен экологичным транспортным решениям.',
        rheinAutoDescription: 'Специалисты по производительным и спортивным автомобилям в Рейнланде. Обширная коллекция высокопроизводительных автомобилей.',
        stuttgartLuxuryDescription: 'Авторизованный дилер Mercedes-Benz и Porsche в Штутгарте. Дом лучшего немецкого машиностроения.',
        nordFahrzeugeDescription: 'Специалист по корпоративным автомобилям, обслуживающий деловой район Франкфурта. Эксперт по решениям для автопарков и лизингу.',
      },
    },

    // Страница поддержки дилеров - жёстко закодированные строки
    dealerSupport: {
      supportCenterText: 'Наша специализированная команда поддержки дилеров поможет вам максимизировать успех на CarMarket365. Получите помощь с управлением инвентарём, запросами клиентов и функциями платформы.',
      dashboardSupport: {
        title: 'Поддержка панели управления',
        items: [
          'Помощь в управлении инвентарём',
          'Оптимизация объявлений',
          'Интерпретация аналитики',
          'Настройка аккаунта'
        ],
      },
      customerRelations: {
        title: 'Отношения с клиентами',
        items: [
          'Руководство по управлению лидами',
          'Лучшие практики коммуникации',
          'Обработка запросов клиентов',
          'Управление отзывами'
        ],
      },
      performanceOptimization: {
        title: 'Оптимизация производительности',
        items: [
          'Улучшение видимости объявлений',
          'Советы по ценовой стратегии',
          'Рекомендации по качеству фото',
          'Анализ рыночных трендов'
        ],
      },
      technicalSupport: {
        title: 'Техническая поддержка',
        items: [
          'Проблемы функциональности платформы',
          'Помощь с мобильным приложением',
          'Устранение неполадок интеграции',
          'Обучение функциям'
        ],
      },
      gettingStarted: {
        title: 'Начало работы в качестве дилера',
        description: 'Пошаговое руководство по настройке вашей учётной записи дилера и максимизации успеха.',
        accountSetup: {
          title: 'Настройка аккаунта',
          items: [
            'Пройдите верификацию дилера',
            'Загрузите деловую документацию',
            'Настройте обработку платежей',
            'Настройте бизнес-профиль'
          ],
        },
        inventoryManagement: {
          title: 'Управление инвентарём',
          items: [
            'Добавьте первое объявление о автомобиле',
            'Загрузите качественные фотографии',
            'Напишите убедительные описания',
            'Установите конкурентные цены'
          ],
        },
        performanceTracking: {
          title: 'Отслеживание производительности',
          items: [
            'Мониторинг производительности объявлений',
            'Отслеживание запросов клиентов',
            'Анализ рыночных трендов',
            'Оптимизация на основе данных'
          ],
        },
      },
      helpSection: {
        title: 'Нужна помощь? Мы здесь для вас!',
        message: 'Наша команда поддержки дилеров готова помочь вам добиться успеха. Свяжитесь с нами по адресу dealers@carmarket365.com или через панель дилера.',
        returnToPlatform: 'Вернуться на платформу',
        goToDealerDashboard: 'Перейти на панель дилера',
      },
    },

    // Страница доступности - жёстко закодированные строки
    accessibility: {
      standardsWeFollow: 'Стандарты, которым мы следуем',
      standardsDescription: 'Мы стремимся соответствовать установленным стандартам и рекомендациям доступности.',
      wcagGuidelines: 'Рекомендации WCAG',
      wcagDescription: 'Мы стремимся соответствовать стандартам рекомендаций по доступности веб-контента (WCAG) 2.1 уровня AA.',
      platformCompatibility: 'Совместимость платформы',
      platformCompatibilityDescription: 'Наша платформа разработана для работы с ассистивными технологиями и инструментами доступности.',
      weValueYourFeedback: 'Мы ценим ваши отзывы',
      feedbackMessage: 'Если вы столкнулись с препятствиями доступности или у вас есть предложения по улучшению, не стесняйтесь обращаться к нам по адресу accessibility@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      contactAccessibilityTeam: 'Связаться с командой доступности',
      visualFeatures: [
        'Дизайн с высоким контрастом',
        'Масштабируемый текст и элементы интерфейса',
        'Альтернативный текст для изображений',
        'Совместимость со скрин-ридерами'
      ],
      motorFeatures: [
        'Поддержка навигации с клавиатуры',
        'Большие кликабельные области',
        'Опции сниженного движения',
        'Совместимость с голосовым управлением'
      ],
      audioFeatures: [
        'Визуальные индикаторы для аудио контента',
        'Текстовые альтернативы для аудио информации',
        'Субтитры для видео контента',
        'Настраиваемые аудио настройки'
      ],
      cognitiveFeatures: [
        'Ясный и простой язык',
        'Последовательные навигационные паттерны',
        'Предотвращение ошибок и чёткая обратная связь',
        'Настраиваемые опции интерфейса'
      ],
    },

    // Страница политики cookies - жёстко закодированные строки
    cookiePolicy: {
      managingPreferences: 'Управление настройками cookies',
      managingPreferencesDescription: 'У вас есть контроль над cookies, которые мы используем на вашем устройстве.',
      browserSettings: 'Настройки браузера',
      platformControls: 'Управление платформой',
      questionsAboutCookies: 'Вопросы о cookies?',
      questionsMessage: 'Если у вас есть вопросы о нашей политике cookies или нужна помощь в управлении настройками, свяжитесь с нами по адресу cookies@carmarket365.com',
      returnToPlatform: 'Вернуться на платформу',
      cookieSupport: 'Поддержка cookies',
      browserSettingsItems: [
        'Блокировка или разрешение cookies',
        'Удаление существующих cookies',
        'Установка срока действия cookies',
        'Управление cookies третьих лиц'
      ],
      platformControlsItems: [
        'Центр настроек cookies',
        'Доступные опции отказа',
        'Детальные настройки управления',
        'Регулярные обновления настроек'
      ],
      essentialFeatures: [
        'Вход и аутентификация',
        'Функциональность корзины покупок',
        'Безопасность и предотвращение мошенничества',
        'Основные операции сайта'
      ],
      functionalFeatures: [
        'Запоминание ваших настроек',
        'Выбор языка',
        'Персонализированный пользовательский опыт',
        'Услуги на основе местоположения'
      ],
      analyticsFeatures: [
        'Статистика использования сайта',
        'Оптимизация производительности',
        'Отчётность и исправление ошибок',
        'Анализ поведения пользователей'
      ],
      marketingFeatures: [
        'Персонализированная реклама',
        'Отслеживание эффективности рекламных кампаний',
        'Интеграция социальных сетей',
        'Ретаргетинг и ремаркетинг'
      ],
    },

    // Страница советов по безопасности - жёстко закодированные строки
    safetyTips: {
      mainTitle: 'Безопасность покупки и продажи автомобилей',
      mainDescription: 'Основные рекомендации по безопасности для защиты во время автомобильных сделок.',
      safetyOverview: 'Ваша безопасность - наш главный приоритет. Следуйте этим рекомендациям для обеспечения безопасного и успешного опыта покупки и продажи автомобилей на нашей платформе.',
      meetingSafety: {
        title: 'Безопасность встреч',
        items: [
          'Встречайтесь в общественных, хорошо освещённых местах',
          'Приводите друга или члена семьи',
          'Встречайтесь в дневное время',
          'Доверяйте своим инстинктам'
        ],
      },
      paymentSecurity: {
        title: 'Безопасность платежей',
        items: [
          'Используйте безопасные методы оплаты',
          'Избегайте наличных для больших сумм',
          'Проверяйте оплату перед передачей',
          'Получайте квитанцию за все транзакции'
        ],
      },
      vehicleInspection: {
        title: 'Осмотр автомобиля',
        items: [
          'Рекомендуется профессиональный осмотр',
          'Проверьте все механические системы',
          'Проверьте VIN и регистрацию',
          'Тщательно протестируйте вождение'
        ],
      },
      redFlags: {
        title: 'Тревожные сигналы',
        items: [
          'Давление принять решение быстро',
          'Запросы личной информации заранее',
          'Сделки, которые кажутся слишком хорошими',
          'Нежелание встречаться лично'
        ],
      },
      documentation: {
        title: 'Необходимая документация',
        description: 'Важные документы для проверки и получения во время вашей сделки.',
        forBuyers: 'Для покупателей',
        forSellers: 'Для продавцов',
        buyerItems: [
          'Название автомобиля или регистрация',
          'Записи о техническом обслуживании',
          'Отчёт об истории автомобиля',
          'Счёт-фактура продажи со всеми деталями'
        ],
        sellerItems: [
          'Проверка действительного ID покупателя',
          'Подтверждение страховки (при тест-драйве)',
          'Письменное соглашение о покупке',
          'Подтверждение оплаты'
        ],
      },
      emergency: {
        title: 'Оставайтесь в безопасности и сообщайте о проблемах',
        message: 'Если вы столкнулись с подозрительной активностью или чувствуете себя небезопасно, доверьтесь инстинктам и немедленно уходите. Сообщайте о любых проблемах нашей команде безопасности по адресу safety@carmarket365.com',
        browseCars: 'Безопасно просматривайте автомобили',
        reportConcern: 'Сообщить о проблеме безопасности',
      },
    },
  },

  // Окончательные исправления для оставшегося жестко кодированного английского текста
  finalFixes: {
    // Страница ExpressSell - Марки автомобилей, модели и заполнители
    expressSell: {
      carBrands: [
        'Ауди', 'БМВ', 'Мерседес-Бенц', 'Фольксваген', 'Тойота', 
        'Форд', 'Опель', 'Пежо', 'Рено'
      ],
      carModels: [
        '3 серия', '5 серия', 'X3', 'X5', 'A4', 'A6', 'Гольф', 'Пассат'
      ],
      conditionLabel: 'Состояние *',
      conditionPlaceholder: 'Выберите состояние',
      descriptionPlaceholder: 'Опишите характеристики вашего автомобиля, историю и почему это отличная покупка...',
      namePlaceholder: 'Ваше полное имя',
      locationPlaceholder: 'Город, Область',
      uploadPhotos: 'Загрузить фотографии',
      uploadPhotosDescription: 'Добавьте фотографии, чтобы сделать ваше объявление более привлекательным',
      uploadCarPhotos: 'Загрузить фотографии автомобиля',
      addUpToTenPhotos: 'Добавьте до 10 фотографий. Первая фотография будет главным изображением.',
      choosePhotos: 'Выбрать фотографии',
      mainPhoto: 'Главная фотография',
      priceAndDescription: 'Цена и описание',
      setPriceAndDescription: 'Установите желаемую цену и опишите ваш автомобиль',
      askingPriceEuros: 'Запрашиваемая цена (€) *',
      priceExample: 'например, 25 000',
      contactInformation: 'Контактная информация',
      howShouldBuyersContact: 'Как покупатели должны с вами связаться?',
      fullNameRequired: 'Полное имя *',
      yourFullName: 'Ваше полное имя',
      phoneNumberRequired: 'Номер телефона *',
      emailAddressRequired: 'Адрес электронной почты *',
      yourEmail: 'ваша.почта@пример.com',
      locationRequired: 'Местоположение *',
      cityState: 'Город, Область',
      carDetailsStep: 'Детали автомобиля',
      photosStep: 'Фотографии',
      priceDescriptionStep: 'Цена и описание',
      contactInfoStep: 'Контактная информация',
      backToHome: 'Назад на главную',
      listMyCarQuickly: 'Разместите ваш автомобиль быстро и легко',
      previous: 'Предыдущий',
      next: 'Следующий',
      listMyCar: 'Разместить мой автомобиль',
    },
    
    // Страница DealerSignUp - Заполнители формы
    dealerSignUp: {
      firstNamePlaceholder: 'Иван',
      lastNamePlaceholder: 'Петров',
    },
    
    // Страница SavedCars - Заполнитель фильтра
    savedCars: {
      filterPlaceholder: 'Фильтровать по',
      sortBy: 'Сортировать по',
      recentlySaved: 'Недавно сохраненные',
      priceLowToHigh: 'Цена: От низкой к высокой',
      priceHighToLow: 'Цена: От высокой к низкой',
      yearNewestFirst: 'Год: Новые сначала',
      yearOldestFirst: 'Год: Старые сначала',
      allCars: 'Все автомобили',
      savedThisWeek: 'Сохранено на этой неделе',
      back: 'Назад',
      noSavedCars: 'Нет сохраненных автомобилей',
      startBrowsing: 'Начните просматривать наш обширный инвентарь транспортных средств и сохраняйте избранные здесь.',
      browseVehicles: 'Просмотр транспортных средств',
      title: 'Сохраненные автомобили',
      clearAll: 'Очистить все',
      carsSaved: 'автомобилей сохранено',
      savedDate: 'Сохранено',
      contact: 'Контакт',
      view: 'Посмотреть',
    },
    
    // Страница UIDemo - Демо заполнители
    uiDemo: {
      namePlaceholder: 'Введите ваше имя',
      emailPlaceholder: 'Введите вашу электронную почту',
      optionPlaceholder: 'Выберите опцию',
      enhancedUIComponentsDemo: 'Демонстрация улучшенных UI компонентов',
      showcaseNewlyIntegrated: 'Демонстрация недавно интегрированных UI компонентов с улучшенной функциональностью',
      buttonVariants: 'Варианты кнопок',
      variousButtonStyles: 'Различные стили и размеры кнопок с улучшенными состояниями фокуса',
      enhancedFormComponents: 'Улучшенные компоненты форм',
      formComponentsWithValidation: 'Компоненты форм с улучшенной валидацией и доступностью',
      selectOption: 'Выберите опцию',
      thisIsPublicDisplayName: 'Это ваше публичное отображаемое имя.',
      submitForm: 'Отправить форму',
      cardTitle: 'Заголовок карточки',
      cardDescription: 'Это описание карточки с улучшенным стилем',
      cardContentExample: 'Содержимое карточки идет здесь с улучшенными интервалами и типографикой.',
      anotherCard: 'Другая карточка',
      cardsNowResponsive: 'Карточки теперь имеют лучший адаптивный дизайн',
      cardAction: 'Действие карточки',
      enhancedFeatures: 'Улучшенные функции',
      improvedAccessibility: 'Улучшенная доступность и дизайн токены',
      feature1: 'Функция 1',
      feature2: 'Функция 2',
      enhancedAccordion: 'Улучшенный аккордеон',
      accordionWithAnimations: 'Аккордеон с улучшенными анимациями и доступностью',
      whatAreNewFeatures: 'Какие новые функции?',
      newFeaturesAnswer: 'Улучшенные UI компоненты включают улучшенную доступность, лучшие состояния фокуса, согласованные дизайн токены и улучшенные анимации. Все компоненты теперь следуют современным дизайн паттернам и лучшим практикам.',
      howDoFormsWork: 'Как работают формы?',
      formsWorkAnswer: 'Компоненты форм построены с интеграцией React Hook Form, автоматической валидацией и улучшенными функциями доступности. Они обеспечивают лучшую обработку ошибок и обратную связь с пользователем.',
      whatAboutImages: 'Что с обработкой изображений?',
      imagesAnswer: 'Компонент ImageWithFallback обеспечивает автоматическую обработку ошибок для поврежденных изображений, показывая заполнитель по умолчанию когда изображения не загружаются. Это улучшает пользовательский опыт во всем приложении.',
      imageWithFallback: 'Изображение с резервом',
      demonstratesAutoFallback: 'Демонстрирует автоматический резерв для поврежденных изображений',
      workingImage: 'Рабочее изображение',
      brokenImageFallback: 'Поврежденное изображение (показывает резерв)',
    },
  },

  carDetail: {
    // Header and Navigation
    backToSearch: 'Назад к поиску',
    
    // Vehicle Title and Info
    vehicleTitle: 'Заголовок автомобиля',
    locationLabel: 'Местоположение',
    priceLabel: 'Цена',
    originalPrice: 'Первоначальная цена',
    savingsAmount: 'Скидка',
    
    // Status Badges
    certified: 'Сертифицирован',
    featured: 'Рекомендуется',
    newArrival: 'Новое поступление',
    priceReduced: 'Цена снижена',
    greatDeal: 'Выгодное предложение',
    verified: 'Проверен',
    
    // Image Gallery
    mainImage: 'Главное изображение',
    imageGallery: 'Галерея изображений',
    viewFullscreen: 'Просмотр в полноэкранном режиме',
    imageCounter: 'из',
    
    // Tabs and Content
    tabs: {
      overview: 'Обзор',
      features: 'Особенности',
      inspection: 'Инспекция',
      history: 'История',
    },
    
    // Overview Tab
    overview: {
      vehicleDetails: 'Детали автомобиля',
      mileage: 'Пробег',
      fuelType: 'Тип топлива',
      transmission: 'Коробка передач',
      year: 'Год',
      exteriorColor: 'Внешний цвет',
      interiorColor: 'Внутренний цвет',
      bodyType: 'Тип кузова',
      drivetrain: 'Привод',
      vin: 'VIN',
      description: 'Описание',
      miles: 'км',
    },
    
    // Features Tab
    features: {
      title: 'Особенности',
      featuresAndOptions: 'Особенности и опции',
    },
    
    // Inspection Tab
    inspection: {
      title: 'Отчёт об инспекции',
      lastUpdated: 'Последнее обновление:',
      excellentCondition: 'Отличное состояние',
      pointInspection: 'Завершена 150-точечная инспекция',
      inspectionCompleted: 'инспекция завершена',
      inspectionScore: 'Оценка инспекции',
    },
    
    // History Tab
    history: {
      title: 'История автомобиля',
      vehicleHistory: 'История автомобиля',
      listedForSale: 'Выставлен на продажу',
      vehicleAdded: 'Автомобиль добавлен на площадку',
      lastService: 'Последнее обслуживание',
      regularMaintenance: 'Плановое обслуживание завершено',
    },
    
    // Action Buttons
    actions: {
      callDealer: 'Позвонить дилеру',
      sendMessage: 'Отправить сообщение',
      scheduleTestDrive: 'Записаться на тест-драйв',
      getPreApproved: 'Получить предварительное одобрение',
      calculatePayment: 'Рассчитать платёж',
      viewDealerProfile: 'Просмотреть профиль дилера',
      viewAllDealerCars: 'Посмотреть все автомобили дилера',
      shareVehicle: 'Поделиться автомобилем',
      saveToFavorites: 'Сохранить в избранное',
      removeFromFavorites: 'Удалить из избранного',
    },
    
    // Seller Information
    seller: {
      title: 'Продавец',
      sellerInformation: 'Информация о продавце',
      dealerRating: 'Рейтинг',
      reviews: 'отзывов',
      verified: 'Проверен',
      phone: 'Телефон',
      email: 'Email',
    },
    
    // Financing Section
    financing: {
      title: 'Варианты финансирования',
      financingOptions: 'Варианты финансирования',
      estimatedPayment: 'Расчётный ежемесячный платёж',
      monthlyPayment: '/месяц',
      basedOnTerms: 'На основе',
      aprForMonths: 'годовых на',
      withDown: 'месяцев с первоначальным взносом',
      getPreApproved: 'Получить предварительное одобрение',
      calculatePayment: 'Рассчитать платёж',
    },
    
    // Mock Data Values
    mockData: {
      unknownMake: 'Неизвестная марка',
      unknownModel: 'Неизвестная модель',
      excellent: 'Отличное',
      gasoline: 'Бензин',
      automatic: 'Автоматическая',
      unknown: 'Неизвестно',
      black: 'Чёрный',
      sedan: 'Седан',
      frontWheelDrive: 'Передний привод',
      wellMaintained: 'Хорошо обслуживаемое транспортное средство в отличном состоянии.',
      inspectionReport: 'Автомобиль был проверен и соответствует нашим стандартам качества.',
      locationNotSpecified: 'Местоположение не указано',
      privateSeller: 'Частный продавец',
      features: {
        airConditioning: 'Кондиционер',
        powerSteering: 'Усилитель руля',
        electricWindows: 'Электрические стеклоподъёмники',
        centralLocking: 'Центральный замок',
        airbags: 'Подушки безопасности',
        abs: 'ABS',
        powerBrakes: 'Усилитель тормозов',
        amfmRadio: 'AM/FM радио',
      },
      condition: 'Отличное',
      interiorColor: 'Чёрный',
      drivetrain: 'Передний привод',
      description: 'Хорошо обслуживаемое транспортное средство в отличном состоянии.',
      historyEvents: [
        'Куплен новым в 2020 году',
        'Регулярное обслуживание каждые 10 000 км',
        'Нет аварий в истории',
        'Один владелец до сих пор'
      ],
      // Locations
      locations: {
        'Berlin, Germany': 'Берлин, Германия',
        'Munich, Germany': 'Мюнхен, Германия',
        'Hamburg, Germany': 'Гамбург, Германия',
        'Frankfurt, Germany': 'Франкфурт, Германия',
        'Cologne, Germany': 'Кёльн, Германия',
        'Stuttgart, Germany': 'Штутгарт, Германия',
        'Dresden, Germany': 'Дрезден, Германия',
        'Leipzig, Germany': 'Лейпциг, Германия',
        'Nuremberg, Germany': 'Нюрнберг, Германия',
        'Düsseldorf, Germany': 'Дюссельдорф, Германия'
      },
      // Dealers
      dealers: {
        'Premium Motors': 'Премиум Моторс',
        'BMW Center': 'BMW Центр',
        'Auto House': 'Авто Хаус',
        'Elite Motors': 'Элит Моторс',
        'Sports Cars GmbH': 'Спорт Карс ГмбХ',
        'City Motors': 'Сити Моторс',
        'BMW Dresden': 'BMW Дрезден',
        'Auto Leipzig': 'Авто Лейпциг',
        'Premium Cars': 'Премиум Карс',
        'BMW Düsseldorf': 'BMW Дюссельдорф'
      },
      // Fuel types
      fuel: {
        'Diesel': 'Дизель',
        'Petrol': 'Бензин',
        'Electric': 'Электричество',
        'Hybrid': 'Гибрид'
      },
      // Transmission types
      transmission: {
        'Automatic': 'Автоматическая',
        'Manual': 'Механическая',
        'Semi-Automatic': 'Полуавтоматическая'
      }
    },
    
    // Error States
    errors: {
      carNotFound: 'Автомобиль не найден',
      failedToLoad: 'Не удалось загрузить детали автомобиля.',
      doesntExist: 'Автомобиль, который вы ищете, не существует или был удалён.',
      hasBeenRemoved: 'был удалён',
      backToCars: 'Назад к автомобилям',
    },
    
    // Loading States
    loading: {
      loadingVehicle: 'Загрузка автомобиля...',
      loadingDetails: 'Загрузка деталей...',
    },
    
    // Contact and Communication
    contact: {
      contactDealer: 'Связаться с дилером',
      interestedIn: 'Меня интересует',
      preferredContactMethod: 'Предпочтительный способ связи',
      additionalMessage: 'Дополнительное сообщение',
      sendInquiry: 'Отправить запрос',
      callNow: 'Позвонить сейчас',
      emailDealer: 'Написать дилеру',
      scheduleViewing: 'Записаться на просмотр',
    },
    
    // Test Drive
    testDrive: {
      scheduleTestDrive: 'Записаться на тест-драйв',
      preferredDate: 'Предпочтительная дата',
      preferredTime: 'Предпочтительное время',
      contactInfo: 'Контактная информация',
      additionalNotes: 'Дополнительные заметки',
      submitRequest: 'Отправить запрос',
    },
    
    // Share Feature
    share: {
      shareVehicle: 'Поделиться автомобилем',
      shareOnSocial: 'Поделиться в социальных сетях',
      copyLink: 'Копировать ссылку',
      emailToFriend: 'Отправить другу по email',
      generateQR: 'Создать QR-код',
    },
  },

  // Расширенные функции
  advancedFeatures: {
    // Расширенный поиск
    advancedSearch: {
      title: 'Расширенный поиск',
      active: 'Расширенный поиск активен',
      filters: 'Фильтры',
      clearAll: 'Очистить все',
      searchCars: 'Искать автомобили',
      
      // Разделы
      sections: {
        vehicleDetails: 'Детали автомобиля',
        priceLocation: 'Цена и местоположение',
        featuresOptions: 'Функции и опции',
      },
      
      // Поля деталей автомобиля
      fields: {
        make: 'Марка',
        model: 'Модель',
        yearFrom: 'Год от',
        yearTo: 'Год до',
        priceMin: 'Мин. цена',
        priceMax: 'Макс. цена',
        mileageMax: 'Макс. пробег',
        fuelType: 'Тип топлива',
        transmission: 'Коробка передач',
        bodyType: 'Тип кузова',
        drivetrain: 'Привод',
        exteriorColor: 'Внешний цвет',
        interiorColor: 'Внутренний цвет',
        location: 'Местоположение',
        radius: 'Радиус поиска',
        sellerType: 'Тип продавца',
      },
      
      // Заполнители
      placeholders: {
        anyMake: 'Любая марка',
        anyModel: 'Любая модель',
        anyYear: 'Любой год',
        anyPrice: 'Любая цена',
        anyMileage: 'Любой пробег',
        anyFuel: 'Любое топливо',
        anyTransmission: 'Любая коробка',
        anyBodyType: 'Любой кузов',
        anyDrivetrain: 'Любой привод',
        anyColor: 'Любой цвет',
        cityStateZip: 'Город, область или индекс',
        anyRadius: 'Любое расстояние',
        anySeller: 'Любой продавец',
      },
      
      // Опции
      options: {
        mileage: {
          under10k: 'До 10 000 км',
          under25k: 'До 25 000 км',
          under50k: 'До 50 000 км',
          under75k: 'До 75 000 км',
          under100k: 'До 100 000 км',
          under150k: 'До 150 000 км',
          over100k: 'Свыше 100 000 км',
        },
        radius: {
          miles25: '25 км',
          miles50: '50 км',
          miles100: '100 км',
          miles200: '200 км',
          nationwide: 'По всей стране',
        },
        sellerType: {
          dealer: 'Дилер',
          private: 'Частный продавец',
          both: 'Оба',
        },
      },
      
      // Характеристики
      features: {
        airConditioning: 'Кондиционер',
        allWheelDrive: 'Полный привод',
        backupCamera: 'Камера заднего вида',
        blindSpotMonitoring: 'Контроль слепых зон',
        bluetoothConnectivity: 'Bluetooth-связь',
        cruiseControl: 'Круиз-контроль',
        heatedSeats: 'Подогрев сидений',
        leatherSeats: 'Кожаные сиденья',
        navigationSystem: 'Навигационная система',
        parkingAssist: 'Помощь при парковке',
        powerWindows: 'Электростеклоподъемники',
        pushButtonStart: 'Запуск кнопкой',
        remoteStart: 'Дистанционный запуск',
        sunroof: 'Люк',
        thirdRowSeating: 'Третий ряд сидений',
        towingPackage: 'Прицепное устройство',
        premiumSound: 'Премиум аудиосистема',
        adaptiveCruiseControl: 'Адаптивный круиз-контроль',
        laneKeepAssist: 'Помощь удержания в полосе',
        automaticEmergencyBraking: 'Автоматическое экстренное торможение',
        keylessEntry: 'Бесключевой доступ',
        ventilatedSeats: 'Вентиляция сидений',
        wirelessCharging: 'Беспроводная зарядка',
        panoramicSunroof: 'Панорамный люк',
        memorySeats: 'Память сидений',
        headUpDisplay: 'Проекционный дисплей',
        nightVision: 'Ночное видение',
        massagingSeats: 'Массажные сиденья',
      },
    },
    
    // Сравнение
    comparison: {
      title: 'Сравнение автомобилей',
      clearAll: 'Очистить все',
      compareCars: 'Сравнить автомобили',
      compareNow: 'Сравнить сейчас',
      
      // Поля сравнения
      fields: {
        price: 'Цена',
        year: 'Год',
        mileage: 'Пробег',
        fuelType: 'Тип топлива',
        transmission: 'Коробка передач',
        drivetrain: 'Привод',
        bodyType: 'Тип кузова',
        exteriorColor: 'Внешний цвет',
        interiorColor: 'Внутренний цвет',
        engine: 'Двигатель',
        horsepower: 'Лошадиные силы',
        torque: 'Крутящий момент',
        fuelEconomy: 'Расход топлива',
        seatingCapacity: 'Вместимость',
        features: 'Основные характеристики',
        safety: 'Системы безопасности',
        warranty: 'Гарантия',
        dealerInfo: 'Информация о дилере',
      },
      
      // Панель сравнения
      bar: {
        compareCars: 'Сравнить автомобили',
        selected: 'выбрано',
        max: 'макс.',
        compare: 'Сравнить',
        clear: 'Очистить',
      },
      
      // Недоступно
      notAvailable: 'Н/Д',
    },
    
    // Калькулятор финансирования
    financingCalculator: {
      title: 'Калькулятор финансирования',
      
      // Разделы
      sections: {
        vehicleDetails: 'Детали автомобиля',
        downPayment: 'Первоначальный взнос',
        loanTerms: 'Условия кредита',
        monthlyPayment: 'Ежемесячный платеж',
        loanSummary: 'Сводка по кредиту',
      },
      
      // Поля
      fields: {
        vehiclePrice: 'Цена автомобиля',
        salesTax: 'Налог с продаж',
        dealerFees: 'Комиссии дилера',
        tradeInValue: 'Стоимость обмена',
        downPayment: 'Первоначальный взнос',
        downPaymentPercent: 'Процент первоначального взноса',
        loanTerm: 'Срок кредита',
        interestRate: 'Процентная ставка (ГПС)',
        monthlyPayment: 'Расчетный ежемесячный платеж',
        totalLoanAmount: 'Общая сумма кредита',
        totalInterest: 'Общие проценты',
        totalCost: 'Общая стоимость',
      },
      
      // Метки
      labels: {
        months: 'месяцев',
        years: 'лет',
        percent: '%',
        perMonth: '/месяц',
        loanAmount: 'Сумма кредита',
        interestPaid: 'Выплаченные проценты',
        totalPaid: 'Общая выплата',
      },
      
      // Кнопки
      buttons: {
        calculate: 'Рассчитать платеж',
        reset: 'Сбросить калькулятор',
        getPreApproved: 'Получить предварительное одобрение',
        findFinancing: 'Найти варианты финансирования',
      },
      
      // Примечания
      notes: {
        estimate: 'Это приблизительный расчет. Фактические условия могут отличаться.',
        disclaimer: 'Расчеты платежей являются приблизительными и могут не отражать фактические условия кредита.',
        taxesVary: 'Налоговые ставки различаются в зависимости от местоположения.',
        additionalFees: 'Могут применяться дополнительные сборы.',
      },
    },
  },

  finalFixes: {
    savedCars: {
      title: 'Сохраненные автомобили',
      back: 'Назад',
      noSavedCars: 'Пока нет сохраненных автомобилей',
      startBrowsing: 'Начните просматривать наш инвентарь, чтобы сохранить понравившиеся автомобили на потом.',
      browseVehicles: 'Просмотреть автомобили',
      carsSaved: 'автомобилей сохранено',
      clearAll: 'Очистить все',
      sortBy: 'Сортировать по',
      recentlySaved: 'Недавно сохраненные',
      priceLowToHigh: 'Цена: по возрастанию',
      priceHighToLow: 'Цена: по убыванию',
      yearNewestFirst: 'Год: сначала новые',
      yearOldestFirst: 'Год: сначала старые',
      filterPlaceholder: 'Фильтр',
      allCars: 'Все автомобили',
      savedThisWeek: 'Сохраненные на этой неделе',
      savedDate: 'Сохранено',
      contact: 'Связаться',
      view: 'Подробности'
    }
  }
};