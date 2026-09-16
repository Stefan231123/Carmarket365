// Canonical vehicle equipment options.
// Storage: the KEY is what gets saved to the DB and matched by filters
// (columns `features` for non-safety, `safetyFeatures` for safety).
// Display: use `getEquipmentLabel(key, lang)` at render time.

export type EquipmentCategoryKey = 'safety' | 'comfort' | 'tech' | 'exterior';
export type EquipmentLang = 'en' | 'mk' | 'sq';

export interface EquipmentCategory {
  key: EquipmentCategoryKey;
  isSafety: boolean;
  items: string[];
}

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    key: 'safety',
    isSafety: true,
    items: [
      'ABS',
      'ESP',
      'AIRBAG_DRIVER',
      'AIRBAG_PASSENGER',
      'AIRBAG_SIDE',
      'AIRBAG_CURTAIN',
      'LANE_DEPARTURE_WARNING',
      'LANE_KEEP_ASSIST',
      'ADAPTIVE_CRUISE_CONTROL',
      'EMERGENCY_BRAKE_ASSIST',
      'BLIND_SPOT_MONITORING',
      'FRONT_PARKING_SENSORS',
      'REAR_PARKING_SENSORS',
      'REVERSE_CAMERA',
      'CAMERA_360',
      'NIGHT_VISION',
      'TRAFFIC_SIGN_RECOGNITION',
      'TIRE_PRESSURE_MONITORING',
    ],
  },
  {
    key: 'comfort',
    isSafety: false,
    items: [
      'AIR_CONDITIONING',
      'AUTOMATIC_CLIMATE_CONTROL',
      'MULTIZONE_CLIMATE_CONTROL',
      'HEATED_SEATS',
      'COOLED_SEATS',
      'ELECTRIC_SEATS',
      'MEMORY_SEATS',
      'MASSAGE_SEATS',
      'LEATHER_SEATS',
      'HEATED_STEERING_WHEEL',
      'KEYLESS_ENTRY',
      'KEYLESS_START',
      'REMOTE_START',
      'CRUISE_CONTROL',
      'SPEED_LIMITER',
      'POWER_WINDOWS',
      'POWER_MIRRORS',
      'AUTO_DIMMING_MIRRORS',
      'RAIN_SENSOR',
      'LIGHT_SENSOR',
      'AUTO_LIGHTS',
      'SUNROOF',
      'PANORAMIC_ROOF',
      'POWER_TAILGATE',
    ],
  },
  {
    key: 'tech',
    isSafety: false,
    items: [
      'NAVIGATION_SYSTEM',
      'TOUCHSCREEN',
      'APPLE_CARPLAY',
      'ANDROID_AUTO',
      'BLUETOOTH',
      'WIFI_HOTSPOT',
      'PREMIUM_SOUND',
      'HEAD_UP_DISPLAY',
      'DIGITAL_COCKPIT',
      'VOICE_CONTROL',
      'USB_PORTS',
    ],
  },
  {
    key: 'exterior',
    isSafety: false,
    items: [
      'ALLOY_WHEELS',
      'SPORT_WHEELS',
      'WINTER_TIRES',
      'METALLIC_PAINT',
      'PEARL_PAINT',
      'ROOF_RAILS',
      'TOW_PACKAGE',
      'SPOILER',
      'SPORT_PACKAGE',
      'CHROME_PACKAGE',
    ],
  },
];

export const ALL_SAFETY_KEYS: string[] = EQUIPMENT_CATEGORIES
  .filter(c => c.isSafety)
  .flatMap(c => c.items);

export const ALL_FEATURE_KEYS: string[] = EQUIPMENT_CATEGORIES
  .filter(c => !c.isSafety)
  .flatMap(c => c.items);

export const ALL_EQUIPMENT_KEYS: string[] = [...ALL_SAFETY_KEYS, ...ALL_FEATURE_KEYS];

export const EQUIPMENT_CATEGORY_LABELS: Record<EquipmentLang, Record<EquipmentCategoryKey, string>> = {
  en: {
    safety: 'Safety & Assistance',
    comfort: 'Comfort & Convenience',
    tech: 'Entertainment & Technology',
    exterior: 'Exterior & Wheels',
  },
  mk: {
    safety: 'Безбедност и асистенција',
    comfort: 'Комфор и удобност',
    tech: 'Забава и технологија',
    exterior: 'Екстериер и тркала',
  },
  sq: {
    safety: 'Siguria dhe asistenca',
    comfort: 'Rehatia dhe komoditeti',
    tech: 'Argëtimi dhe teknologjia',
    exterior: 'Eksteriori dhe rrotat',
  },
};

const LABELS_EN: Record<string, string> = {
  ABS: 'ABS',
  ESP: 'ESP',
  AIRBAG_DRIVER: 'Driver Airbag',
  AIRBAG_PASSENGER: 'Passenger Airbag',
  AIRBAG_SIDE: 'Side Airbags',
  AIRBAG_CURTAIN: 'Curtain Airbags',
  LANE_DEPARTURE_WARNING: 'Lane Departure Warning',
  LANE_KEEP_ASSIST: 'Lane Keep Assist',
  ADAPTIVE_CRUISE_CONTROL: 'Adaptive Cruise Control',
  EMERGENCY_BRAKE_ASSIST: 'Emergency Brake Assist',
  BLIND_SPOT_MONITORING: 'Blind Spot Monitoring',
  FRONT_PARKING_SENSORS: 'Front Parking Sensors',
  REAR_PARKING_SENSORS: 'Rear Parking Sensors',
  REVERSE_CAMERA: 'Reverse Camera',
  CAMERA_360: '360° Camera',
  NIGHT_VISION: 'Night Vision',
  TRAFFIC_SIGN_RECOGNITION: 'Traffic Sign Recognition',
  TIRE_PRESSURE_MONITORING: 'Tire Pressure Monitoring',
  AIR_CONDITIONING: 'Air Conditioning',
  AUTOMATIC_CLIMATE_CONTROL: 'Automatic Climate Control',
  MULTIZONE_CLIMATE_CONTROL: 'Multi-zone Climate Control',
  HEATED_SEATS: 'Heated Seats',
  COOLED_SEATS: 'Cooled/Ventilated Seats',
  ELECTRIC_SEATS: 'Electric Seats',
  MEMORY_SEATS: 'Memory Seats',
  MASSAGE_SEATS: 'Massage Seats',
  LEATHER_SEATS: 'Leather Seats',
  HEATED_STEERING_WHEEL: 'Heated Steering Wheel',
  KEYLESS_ENTRY: 'Keyless Entry',
  KEYLESS_START: 'Keyless Start',
  REMOTE_START: 'Remote Start',
  CRUISE_CONTROL: 'Cruise Control',
  SPEED_LIMITER: 'Speed Limiter',
  POWER_WINDOWS: 'Power Windows',
  POWER_MIRRORS: 'Power Mirrors',
  AUTO_DIMMING_MIRRORS: 'Auto-dimming Mirrors',
  RAIN_SENSOR: 'Rain Sensor',
  LIGHT_SENSOR: 'Light Sensor',
  AUTO_LIGHTS: 'Automatic Lights',
  SUNROOF: 'Sunroof',
  PANORAMIC_ROOF: 'Panoramic Roof',
  POWER_TAILGATE: 'Power Tailgate',
  NAVIGATION_SYSTEM: 'Navigation System',
  TOUCHSCREEN: 'Touchscreen',
  APPLE_CARPLAY: 'Apple CarPlay',
  ANDROID_AUTO: 'Android Auto',
  BLUETOOTH: 'Bluetooth',
  WIFI_HOTSPOT: 'WiFi Hotspot',
  PREMIUM_SOUND: 'Premium Sound System',
  HEAD_UP_DISPLAY: 'Head-up Display',
  DIGITAL_COCKPIT: 'Digital Cockpit',
  VOICE_CONTROL: 'Voice Control',
  USB_PORTS: 'USB Ports',
  ALLOY_WHEELS: 'Alloy Wheels',
  SPORT_WHEELS: 'Sport Wheels',
  WINTER_TIRES: 'Winter Tires',
  METALLIC_PAINT: 'Metallic Paint',
  PEARL_PAINT: 'Pearl Paint',
  ROOF_RAILS: 'Roof Rails',
  TOW_PACKAGE: 'Tow Package',
  SPOILER: 'Spoiler',
  SPORT_PACKAGE: 'Sport Package',
  CHROME_PACKAGE: 'Chrome Package',
};

const LABELS_MK: Record<string, string> = {
  ABS: 'ABS',
  ESP: 'ESP',
  AIRBAG_DRIVER: 'Воздушна перничка - возач',
  AIRBAG_PASSENGER: 'Воздушна перничка - патник',
  AIRBAG_SIDE: 'Странични воздушни пернички',
  AIRBAG_CURTAIN: 'Воздушни пернички за глава',
  LANE_DEPARTURE_WARNING: 'Предупредување за напуштање лента',
  LANE_KEEP_ASSIST: 'Помош за задржување лента',
  ADAPTIVE_CRUISE_CONTROL: 'Адаптивен круиз контрол',
  EMERGENCY_BRAKE_ASSIST: 'Асистент за итно сопирање',
  BLIND_SPOT_MONITORING: 'Мониторинг на слепи агол',
  FRONT_PARKING_SENSORS: 'Сензори за паркирање напред',
  REAR_PARKING_SENSORS: 'Сензори за паркирање назад',
  REVERSE_CAMERA: 'Камера за паркирање',
  CAMERA_360: '360° камера',
  NIGHT_VISION: 'Ноќно видување',
  TRAFFIC_SIGN_RECOGNITION: 'Препознавање на сообраќајни знаци',
  TIRE_PRESSURE_MONITORING: 'Следење на притисок во гуми',
  AIR_CONDITIONING: 'Клима уред',
  AUTOMATIC_CLIMATE_CONTROL: 'Автоматска клима',
  MULTIZONE_CLIMATE_CONTROL: 'Мултизонска клима',
  HEATED_SEATS: 'Греани седишта',
  COOLED_SEATS: 'Ладени/вентилирани седишта',
  ELECTRIC_SEATS: 'Електрични седишта',
  MEMORY_SEATS: 'Седишта со меморија',
  MASSAGE_SEATS: 'Седишта со масажа',
  LEATHER_SEATS: 'Кожни седишта',
  HEATED_STEERING_WHEEL: 'Греан волан',
  KEYLESS_ENTRY: 'Безклучен влез',
  KEYLESS_START: 'Безклучно стартување',
  REMOTE_START: 'Далечинско стартување',
  CRUISE_CONTROL: 'Круиз контрол',
  SPEED_LIMITER: 'Ограничувач на брзина',
  POWER_WINDOWS: 'Електрични прозорци',
  POWER_MIRRORS: 'Електрични огледала',
  AUTO_DIMMING_MIRRORS: 'Самозатемнувачки огледала',
  RAIN_SENSOR: 'Сензор за дожд',
  LIGHT_SENSOR: 'Светлосен сензор',
  AUTO_LIGHTS: 'Автоматски светла',
  SUNROOF: 'Отворен кров',
  PANORAMIC_ROOF: 'Панорамски кров',
  POWER_TAILGATE: 'Електричен багажник',
  NAVIGATION_SYSTEM: 'Навигациски систем',
  TOUCHSCREEN: 'Екран на допир',
  APPLE_CARPLAY: 'Apple CarPlay',
  ANDROID_AUTO: 'Android Auto',
  BLUETOOTH: 'Bluetooth',
  WIFI_HOTSPOT: 'WiFi точка',
  PREMIUM_SOUND: 'Премиум аудио систем',
  HEAD_UP_DISPLAY: 'Head-up дисплеј',
  DIGITAL_COCKPIT: 'Дигитален кокпит',
  VOICE_CONTROL: 'Гласовна контрола',
  USB_PORTS: 'USB врска',
  ALLOY_WHEELS: 'Алуминиумски тркала',
  SPORT_WHEELS: 'Спортски тркала',
  WINTER_TIRES: 'Зимски гуми',
  METALLIC_PAINT: 'Металик боја',
  PEARL_PAINT: 'Перла боја',
  ROOF_RAILS: 'Кров носачи',
  TOW_PACKAGE: 'Пакет за влечење',
  SPOILER: 'Спојлер',
  SPORT_PACKAGE: 'Спортски пакет',
  CHROME_PACKAGE: 'Хром пакет',
};

const LABELS_SQ: Record<string, string> = {
  ABS: 'ABS',
  ESP: 'ESP',
  AIRBAG_DRIVER: 'Airbag - shofer',
  AIRBAG_PASSENGER: 'Airbag - pasagjer',
  AIRBAG_SIDE: 'Airbag anësor',
  AIRBAG_CURTAIN: 'Airbag koke',
  LANE_DEPARTURE_WARNING: 'Paralajmërim ndryshimi korsi',
  LANE_KEEP_ASSIST: 'Ndihmë mbajtje korsi',
  ADAPTIVE_CRUISE_CONTROL: 'Kontroll kroçje adaptiv',
  EMERGENCY_BRAKE_ASSIST: 'Asistent frenimi emergjent',
  BLIND_SPOT_MONITORING: 'Monitor pika të verbër',
  FRONT_PARKING_SENSORS: 'Sensorë parkimi përpara',
  REAR_PARKING_SENSORS: 'Sensorë parkimi prapa',
  REVERSE_CAMERA: 'Kamerë parkimi',
  CAMERA_360: 'Kamerë 360°',
  NIGHT_VISION: 'Shikim natë',
  TRAFFIC_SIGN_RECOGNITION: 'Njohja e shenjave',
  TIRE_PRESSURE_MONITORING: 'Monitorim presion gomash',
  AIR_CONDITIONING: 'Ajër kondicionuar',
  AUTOMATIC_CLIMATE_CONTROL: 'Klimë automatike',
  MULTIZONE_CLIMATE_CONTROL: 'Klimë multi-zonë',
  HEATED_SEATS: 'Ulëse të ngrohta',
  COOLED_SEATS: 'Ulëse të ftohta/të ajrosura',
  ELECTRIC_SEATS: 'Ulëse elektrike',
  MEMORY_SEATS: 'Ulëse me kujtesë',
  MASSAGE_SEATS: 'Ulëse masazhimi',
  LEATHER_SEATS: 'Ulëse lëkure',
  HEATED_STEERING_WHEEL: 'Timon i ngrohtë',
  KEYLESS_ENTRY: 'Hyrje pa çelës',
  KEYLESS_START: 'Nisje pa çelës',
  REMOTE_START: 'Nisje me distancë',
  CRUISE_CONTROL: 'Kontroll kroçjeje',
  SPEED_LIMITER: 'Kufizues shpejtësie',
  POWER_WINDOWS: 'Dritare elektrike',
  POWER_MIRRORS: 'Pasqyra elektrike',
  AUTO_DIMMING_MIRRORS: 'Pasqyra vetë-errësuese',
  RAIN_SENSOR: 'Sensor shiu',
  LIGHT_SENSOR: 'Sensor drite',
  AUTO_LIGHTS: 'Dritat automatike',
  SUNROOF: 'Çati e hapur',
  PANORAMIC_ROOF: 'Çati panoramike',
  POWER_TAILGATE: 'Bagazh elektrik',
  NAVIGATION_SYSTEM: 'Sistem navigimi',
  TOUCHSCREEN: 'Ekran prekjeje',
  APPLE_CARPLAY: 'Apple CarPlay',
  ANDROID_AUTO: 'Android Auto',
  BLUETOOTH: 'Bluetooth',
  WIFI_HOTSPOT: 'WiFi hotspot',
  PREMIUM_SOUND: 'Sistem audio premium',
  HEAD_UP_DISPLAY: 'Head-up display',
  DIGITAL_COCKPIT: 'Kokpit digjital',
  VOICE_CONTROL: 'Kontroll zëri',
  USB_PORTS: 'Lidhje USB',
  ALLOY_WHEELS: 'Rrotat alumin',
  SPORT_WHEELS: 'Rrotat sportive',
  WINTER_TIRES: 'Goma dimri',
  METALLIC_PAINT: 'Bojë metalike',
  PEARL_PAINT: 'Bojë perlë',
  ROOF_RAILS: 'Mbështetës çatie',
  TOW_PACKAGE: 'Paketa tërheqje',
  SPOILER: 'Spoiler',
  SPORT_PACKAGE: 'Paketa sportive',
  CHROME_PACKAGE: 'Paketa krom',
};

export const EQUIPMENT_LABELS: Record<EquipmentLang, Record<string, string>> = {
  en: LABELS_EN,
  mk: LABELS_MK,
  sq: LABELS_SQ,
};

// Legacy aliases for display fallback: strings observed in existing DB rows
// that predate this canonical list. Keep additions here small — the right
// long-term fix is a one-time DB normalization, not an ever-growing alias map.
const LEGACY_LABEL_ALIASES: Record<string, string> = {
  // MK — safety
  'странични ербези': 'AIRBAG_SIDE',
  'ербег - возач': 'AIRBAG_DRIVER',
  'ербег - патник': 'AIRBAG_PASSENGER',
  'ербези за глава': 'AIRBAG_CURTAIN',
  'предупредување за излегување од лента': 'LANE_DEPARTURE_WARNING',
  'мониторинг на слепа точка': 'BLIND_SPOT_MONITORING',
  'сензори за паркирање': 'REAR_PARKING_SENSORS',
  // MK — comfort/tech
  'usb порти': 'USB_PORTS',
  'климатизација': 'AIR_CONDITIONING',
  'gps навигација': 'NAVIGATION_SYSTEM',
  'темпомат': 'CRUISE_CONTROL',
  'шибер': 'SUNROOF',
  'влез без клуч': 'KEYLESS_ENTRY',
  'далечинско палење': 'REMOTE_START',
};

// Reverse lookup: any known label string (any language, plus legacy aliases) -> canonical key.
// Used to migrate/normalize legacy listings that stored translated labels.
const LABEL_TO_KEY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const lang of Object.keys(EQUIPMENT_LABELS) as EquipmentLang[]) {
    for (const [key, label] of Object.entries(EQUIPMENT_LABELS[lang])) {
      map[label.toLowerCase()] = key;
    }
  }
  Object.assign(map, LEGACY_LABEL_ALIASES);
  return map;
})();

export function getEquipmentLabel(key: string, lang: EquipmentLang | string): string {
  const l = (lang as EquipmentLang) in EQUIPMENT_LABELS ? (lang as EquipmentLang) : 'en';
  return EQUIPMENT_LABELS[l][key] ?? EQUIPMENT_LABELS.en[key] ?? key;
}

// Normalizes a stored value that may be a canonical key OR a legacy display label.
// Returns the canonical key when found, otherwise returns the input unchanged
// so unknown/custom strings still render.
export function normalizeEquipmentValue(value: string): string {
  if (EQUIPMENT_LABELS.en[value]) return value;
  return LABEL_TO_KEY[value.toLowerCase()] ?? value;
}
