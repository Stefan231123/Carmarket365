import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, ArrowLeft, Settings, Filter, Car, Zap, Shield, Star, Palette, Search, Loader2, X } from 'lucide-react';
import { useAdvancedSearch, useSearchAnalytics } from '../hooks/useAdvancedSearch';
import { FilterChips } from '../components/FilterChips';
import { SearchResults } from '../components/SearchResults';
import { useTranslation } from '../hooks/useTranslation';
import { mkTranslations } from '../../shared/translations/mk';
import { sqTranslations } from '../../shared/translations/sq';
import { AdvancedSearchFiltersInput } from '../lib/graphql/operations';

// Filter interfaces
interface AdvancedSearchFilters {
  // Basic Information
  make: string;
  model: string;
  additionalProperties: string[];
  bodyType: string;
  fuelType: string;
  
  // Registration & Pricing
  firstRegistrationFrom: number;
  firstRegistrationTo: number;
  priceMin: number;
  priceMax: number;
  
  // Location
  cityZipCode: string;
  radiusKm: string;
  
  // Technical Specifications
  mileageMin: number;
  mileageMax: number;
  powerMinKW: number;
  powerMaxKW: number;
  powerMinPS: number;
  powerMaxPS: number;
  gear: string;
  numberOfSeats: string;
  
  // Engine Technical Specifications
  engineDisplacementMin: number;
  engineDisplacementMax: number;
  turboSupercharging: string;
  enginePosition: string;
  
  // Advanced Vehicle History
  serviceBookAvailable: string;
  accidentDamageRepaired: string;
  importVehicle: string;
  taxiRentalHistory: string;
  roadworthinessTest: string;
  
  // Financing & Insurance
  financingAvailable: string;
  leasingAvailable: string;
  insuranceCategory: string;
  vatDeductible: string;
  
  // Advanced Safety Features
  safetyRating: string;
  advancedDriverAssistance: string[];
  collisionAvoidance: string;
  emergencyCallSystem: string;
  
  // Environmental Extended
  co2EmissionsMin: number;
  co2EmissionsMax: number;
  fuelConsumptionMin: number;
  fuelConsumptionMax: number;
  environmentalBadge: string;
  electricRange: string;
  
  
  // Seller & Condition
  seller: string;
  vehicleCondition: string;
  
  // Equipment & Features
  optionalEquipment: string[];
  
  // Appearance
  bodyColor: string;
  paintWork: string;
  interiorColor: string;
  upholstery: string;
  
  // History & Condition
  previousOwners: string;
  hadAccident: string;
  guarantee: string;
  fullServiceHistory: string;
  nonSmokingVehicle: string;
  
  // Environmental
  euroEmissionClass: string;
}

// Data arrays
const carMakes = ['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Ford', 'Opel', 'Peugeot', 'Renault', 'Fiat', 'Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Skoda', 'Seat', 'Mazda', 'Volvo', 'Porsche', 'Jaguar', 'Land Rover', 'Mini', 'Smart', 'Tesla', 'Lexus', 'Infiniti', 'Acura', 'Genesis', 'Alfa Romeo', 'Lancia'];

const carModelsByMake: Record<string, string[]> = {
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron GT'],
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX'],
  'Mercedes-Benz': ['A-Class', 'B-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'S-Class', 'G-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'AMG GT', 'EQC', 'EQS'],
  'Volkswagen': ['Polo', 'Golf', 'Jetta', 'Passat', 'Arteon', 'T-Cross', 'T-Roc', 'Tiguan', 'Touareg', 'ID.3', 'ID.4', 'ID.Buzz'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Mustang', 'EcoSport', 'Kuga', 'Edge', 'Explorer', 'F-150', 'Ranger', 'Transit'],
  'Opel': ['Corsa', 'Astra', 'Insignia', 'Crossland', 'Grandland', 'Mokka', 'Combo', 'Vivaro', 'Movano'],
  'Peugeot': ['108', '208', '308', '508', '2008', '3008', '5008', 'Partner', 'Expert', 'Boxer'],
  'Renault': ['Clio', 'Megane', 'Talisman', 'Captur', 'Kadjar', 'Koleos', 'Scenic', 'Espace', 'Master'],
  'Fiat': ['500', 'Panda', 'Tipo', '500X', '500L', 'Doblo', 'Ducato'],
  'Toyota': ['Yaris', 'Corolla', 'Camry', 'Prius', 'C-HR', 'RAV4', 'Highlander', 'Land Cruiser', 'Hilux'],
  'Honda': ['Civic', 'Accord', 'Jazz', 'HR-V', 'CR-V', 'Pilot', 'Ridgeline'],
  'Nissan': ['Micra', 'Sentra', 'Altima', 'Juke', 'Qashqai', 'X-Trail', 'Pathfinder', 'Leaf'],
  'Hyundai': ['i10', 'i20', 'i30', 'Elantra', 'Sonata', 'Kona', 'Tucson', 'Santa Fe', 'Ioniq'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Forte', 'Optima', 'Stonic', 'Sportage', 'Sorento', 'EV6'],
  'Skoda': ['Citigo', 'Fabia', 'Scala', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq'],
  'Seat': ['Mii', 'Ibiza', 'Leon', 'Toledo', 'Arona', 'Ateca', 'Tarraco'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-9', 'MX-5'],
  'Volvo': ['V40', 'V60', 'V90', 'S60', 'S90', 'XC40', 'XC60', 'XC90'],
  'Porsche': ['911', 'Boxster', 'Cayman', 'Panamera', 'Macan', 'Cayenne', 'Taycan'],
  'Jaguar': ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'],
  'Land Rover': ['Defender', 'Discovery Sport', 'Discovery', 'Range Rover Evoque', 'Range Rover Velar', 'Range Rover Sport', 'Range Rover'],
  'Mini': ['Hatch', 'Clubman', 'Countryman', 'Convertible', 'Electric'],
  'Smart': ['ForTwo', 'ForFour'],
  'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y'],
  'Lexus': ['IS', 'ES', 'GS', 'LS', 'UX', 'NX', 'GX', 'LX'],
  'Infiniti': ['Q30', 'Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX60', 'QX80'],
  'Acura': ['ILX', 'TLX', 'RLX', 'RDX', 'MDX'],
  'Genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  'Alfa Romeo': ['Giulietta', 'Giulia', 'Stelvio'],
  'Lancia': ['Ypsilon']
};

// Macedonian arrays (will be used by getTranslatedArray for MK language)
const fallbackAdditionalProperties = ['Сертифициран предпродажен', 'Еден сопственик', 'Без незгоди', 'Достапни сервисни записи', 'Во гаранција', 'Неодамна сервисиран', 'Мал пробег', 'Чуван во гаража', 'Зимски пакет', 'Спортски пакет'];

const fallbackBodyTypes = ['Мал автомобил', 'Комби', 'SUV/Теренски/Пикап', 'Купе', 'Кабрио', 'Седан', 'Хечбек', 'Караван', 'Минивен', 'Пикап камион', 'Друго'];

const fallbackFuelTypes = ['Бензин', 'Дизел', 'Електричен', 'Хибрид (Бензин/Електричен)', 'Хибрид (Дизел/Електричен)', 'Природен гас (CNG)', 'Течен гас (LPG)', 'Етанол', 'Водород'];

const fallbackGearTypes = ['Мануелна', 'Автоматска', 'Полу-автоматска', 'CVT'];

const fallbackNumberOfSeatsOptions = ['2', '3', '4', '5', '6', '7', '8', '9+'];

const fallbackSellerTypes = ['Приватен продавач', 'Дилер', 'Сертифициран дилер', 'Флота/Лизинг'];

const fallbackVehicleConditionTypes = ['Нов', 'Користен', 'Предрегистриран', 'Демонстрационо возило', 'Класик/Винтиџ'];


const fallbackRadiusOptions = ['5', '10', '25', '50', '100', '200', '300', '500', 'Nationwide'];

// Optional Equipment fallback (will be translated by getTranslatedArray)
const fallbackOptionalEquipment = [
  // Safety & Assistance - Macedonian
  'ABS', 'ESP', 'Воздушна перничка - возач', 'Воздушна перничка - патник', 'Странични воздушни пернички', 'Воздушни пернички за глава',
  'Предупредување за напуштање лента', 'Помош за задржување лента', 'Адаптивен круиз контрол', 'Асистент за итно сопирање',
  'Мониторинг на слепи агол', 'Сензори за паркирање напред', 'Сензори за паркирање назад', 'Камера за паркирање', '360° камера',
  'Ноќно видување', 'Препознавање на сообраќајни знаци', 'Следење на притисок во гуми',
  
  // Comfort & Convenience - Macedonian
  'Клима уред', 'Автоматска клима', 'Мултизонска клима', 'Греани седишта',
  'Ладени/вентилирани седишта', 'Електрични седишта', 'Седишта со меморија', 'Седишта со масажа', 'Кожни седишта',
  'Греан волан', 'Безклучен влез', 'Безклучно стартување', 'Далечинско стартување', 'Круиз контрол',
  'Ограничувач на брзина', 'Електрични прозорци', 'Електрични огледала', 'Самозатемнувачки огледала', 'Сензор за дожд',
  'Светлосен сензор', 'Автоматски светла', 'Отворен кров', 'Панорамски кров', 'Електричен багажник',
  
  // Entertainment & Technology - Macedonian
  'Навигациски систем', 'Екран на допир', 'Apple CarPlay', 'Android Auto', 'Bluetooth', 'WiFi точка',
  'Премиум аудио систем', 'Head-up дисплеј', 'Дигитален кокпит', 'Гласовна контрола', 'USB врска',
  
  // Exterior & Wheels - Macedonian
  'Алуминиумски тркала', 'Спортски тркала', 'Зимски гуми', 'Металик боја', 'Перла боја', 'Кров носачи',
  'Пакет за влечење', 'Спојлер', 'Спортски пакет', 'Хром пакет'
];

const fallbackBodyColors = ['Црна', 'Бела', 'Сребрена', 'Сива', 'Сина', 'Црвена', 'Зелена', 'Кафена', 'Жолта', 'Портокалова', 'Бежова', 'Златна', 'Виолетова', 'Бронзена', 'Друго'];

const fallbackPaintWorkTypes = ['Солидна', 'Металик', 'Перла', 'Мат', 'Двобојна', 'Приспособена'];

const fallbackInteriorColors = ['Црна', 'Сива', 'Бежова', 'Кафена', 'Кафеава', 'Бела', 'Црвена', 'Сина', 'Друго'];

const fallbackUpholsteryTypes = ['Ткаенина', 'Кожа', 'Вештачка кожа', 'Алкантара', 'Винил', 'Комбинација'];

const fallbackPreviousOwnersOptions = ['1', '2', '3', '4', '5+'];

const fallbackYesNoOptions = ['Да', 'Не', 'Непознато'];

const fallbackGuaranteeOptions = ['No Guarantee', 'Dealer Guarantee', 'Manufacturer Guarantee', 'Extended Guarantee'];

const fallbackEuroEmissionClasses = ['Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6', 'Euro 6c', 'Euro 6d-TEMP', 'Euro 6d'];

// Engine Technical Specifications
const fallbackTurboOptions = ['Naturally Aspirated', 'Turbocharged', 'Supercharged', 'Twin Turbo', 'Bi-Turbo'];
const fallbackEnginePositions = ['Front', 'Mid', 'Rear'];

// Advanced Vehicle History
const fallbackServiceBookOptions = ['Yes', 'No', 'Digital', 'Partial'];
const fallbackYesNoUnknownOptions = ['Да', 'Не', 'Непознато'];
const fallbackRoadworthinessOptions = ['Valid', 'Expired', 'New', 'Not Required'];

// Financing & Insurance
const insuranceCategories = Array.from({ length: 25 }, (_, i) => (i + 1).toString());

// Advanced Safety Features
const safetyRatings = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars', 'Not Rated'];
const advancedSafetyFeatures = [
  'Adaptive Cruise Control', 'Lane Departure Warning', 'Lane Keep Assist', 
  'Emergency Braking Assistant', 'Blind Spot Monitor', 'Traffic Sign Recognition',
  'Driver Attention Alert', 'Cross Traffic Alert', 'Automatic High Beams',
  'Collision Mitigation', 'Pedestrian Detection', 'Cyclist Detection'
];
const emergencyCallOptions = ['eCall Available', 'Private Emergency Service', 'Not Available'];

// Environmental Extended
const fallbackEnvironmentalBadges = ['Green Badge', 'Yellow Badge', 'Red Badge', 'Blue Badge', 'No Badge'];
const fallbackElectricRangeOptions = ['0-50 km', '51-100 km', '101-200 km', '201-300 km', '300+ km', 'Not Applicable'];


// Create years array: individual years from current year down to 1990, then decades from 1980s down to 1950s
const currentYear = new Date().getFullYear();
const individualYears = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
const decades = ['1980s', '1970s', '1960s', '1950s'];
const years = [...individualYears, ...decades];
const priceRanges = [0, 1000, 2000, 3000, 4000, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 125000, 150000, 175000, 200000];
const mileageRanges = [0, 5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 400000];
const powerRanges = [0, 30, 50, 70, 90, 110, 130, 150, 170, 200, 220, 250, 280, 300, 350, 400, 450, 500, 550, 600];
const engineDisplacementRanges = [0.5, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 8.0];
const co2EmissionsRanges = [0, 50, 75, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400];
const fuelConsumptionRanges = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  sectionKey: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CheckboxGroupProps {
  options: string[];
  selectedValues: string[];
  filterKey: keyof AdvancedSearchFilters;
  columns?: number;
  onSelectionChange?: (values: string[]) => void;
}

function CheckboxGroup({ options, selectedValues, filterKey, columns = 2, onSelectionChange }: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (onSelectionChange) {
      const newValues = checked 
        ? [...selectedValues, option]
        : selectedValues.filter(value => value !== option);
      onSelectionChange(newValues);
    }
  };
  
  return (
    <div className={`grid grid-cols-${columns} gap-3`}>
      {options.map(option => (
        <div key={option} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
          <Checkbox
            id={`${filterKey}-${option}`}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
          />
          <label htmlFor={`${filterKey}-${option}`} className="text-sm font-medium text-foreground cursor-pointer select-none">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

function FilterSection({ title, children, sectionKey, icon, description }: FilterSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Card className="mb-6 border-zinc-100 rounded-2xl hover:shadow-xl transition-all duration-300">
      <CardHeader 
        className="pb-3 cursor-pointer hover:bg-muted/30 transition-colors rounded-t-2xl" 
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <CardTitle className="text-lg flex items-center justify-between group">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-muted rounded-lg group-hover:bg-muted/80 transition-colors">
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
          <div className="text-muted-foreground group-hover:text-foreground transition-colors">
            {isCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </div>
        </CardTitle>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="pt-0 pb-6">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  

  // Helper function to get nested value from object using dot notation
  const getNestedValue = (obj: any, key: string): string | undefined => {
    return key.split('.').reduce((currentObj, keyPart) => {
      return currentObj && currentObj[keyPart];
    }, obj);
  };

  // Simple language detection helper
  const getSimpleText = (mk: string, sq: string, en: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const effectiveLanguage = urlLang || currentLanguage || 'mk';
    
    switch(effectiveLanguage) {
      case 'mk': return mk;
      case 'sq': return sq;
      default: return en;
    }
  };

  // Reliable translation function with URL parameter fallback
  const getAdvancedSearchText = (key: string, fallback: string) => {
    // Check URL parameter directly as fallback for language detection issues
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const effectiveLanguage = urlLang || currentLanguage;
    
    console.log(`🔍 Translation Debug - Key: ${key}, UrlLang: ${urlLang}, CurrentLang: ${currentLanguage}, Effective: ${effectiveLanguage}`);
    
    // For Macedonian language, return hardcoded Macedonian translations
    if (effectiveLanguage === 'mk' || currentLanguage === 'mk') {
      const mkTranslations: {[key: string]: string} = {
        // Page titles
        'title': 'Напредно пребарување на автомобили',
        'subtitle': 'Користете ги нашите сеопфатни филтери за пребарување за да го откриете точно возилото што го барате',
        'searchingRealTime': 'Пребаруваме во реално време...',
        
        // Section titles and descriptions
        'sections.vehicleDetails.title': 'Основни информации',
        'sections.vehicleDetails.description': 'Марка на возилото, модел и основни својства',
        'sections.priceLocation.title': 'Прва регистрација и цена',
        'sections.priceLocation.description': 'Датум на регистрација и ценовен опсег',
        'sections.technicalSpecs.title': 'Пробег и снага',
        'sections.technicalSpecs.description': 'Спецификации за изведување и употреба на возилото',
        'sections.sellerCondition.title': 'Продавач и состојба на возилото',
        'sections.sellerCondition.description': 'Тип на продавач и состојба на возилото',
        
        // Field labels
        'fields.make': 'Марка',
        'fields.model': 'Модел',
        'fields.additionalProperties': 'Дополнителни својства',
        'fields.bodyType': 'Тип на каросерија',
        'fields.fuelType': 'Тип на гориво',
        'fields.yearFrom': 'Прва регистрација од',
        'fields.yearTo': 'Прва регистрација до',
        'fields.priceMin': 'Цена од (€)',
        'fields.priceMax': 'Цена до (€)',
        'fields.location': 'Град/Поштенски код',
        'fields.radius': 'Радиус (км)',
        'fields.mileageMin': 'Пробег од (км)',
        'fields.mileageMax': 'Пробег до (км)',
        'fields.powerFrom': 'Снага од (kW)',
        'fields.powerTo': 'Снага до (kW)',
        'fields.gear': 'Менувач',
        'fields.numberOfSeats': 'Број на седишта',
        'fields.seller': 'Продавач',
        'fields.vehicleCondition': 'Состојба на возилото',
        'fields.interiorColor': 'Боја на ентериер',
        'fields.upholstery': 'Тапацирање',
        
        // Placeholders
        'placeholders.anyMake': 'Било која марка',
        'placeholders.anyModel': 'Било кој модел',
        'placeholders.anyType': 'Било кој тип на каросерија',
        'placeholders.any': 'Било кое',
        'placeholders.from': 'Од',
        'placeholders.to': 'До',
        'placeholders.anyTransmission': 'Било кој менувач',
        'placeholders.anySeller': 'Било кој продавач',
        'placeholders.anyCondition': 'Било која состојба',
        'placeholders.cityStateOrZip': 'Внесете град или поштенски код',
        'placeholders.anyColor': 'Било која боја',
        'placeholders.anyMaterial': 'Било кој материјал',
        
        // Labels and units
        'labels.km': 'км',
        'labels.kw': 'kW',
        'labels.ps': 'КС',
        'labels.seats': 'седишта',
        'labels.mileage300kPlus': '300.000+ км',
        'labels.zeroPower': '0 kW (0 КС)',
        'distances.nationwide': 'Низ цела земја',
        
        // Optional Equipment section
        'sections.optionalEquipment.title': 'Опциска опрема',
        'sections.optionalEquipment.description': 'Дополнителни карактеристики и опрема',
        
        // Appearance section
        'sections.appearance.title': 'Боја на каросерија и работа на бојата',
        'sections.exteriorAppearance.description': 'Надворешен изглед на возилото',
        
        // Interior section
        'sections.interior.title': 'Боја на ентериер и тапацирање',
        'sections.interiorAppearance.description': 'Изглед на ентериерот и материјали',
        
        // History section
        'sections.history.title': 'Претходни сопственици и историја',
        'sections.ownershipHistory.description': 'Детали за сопственоста и историјата на возилото'
      };
      
      if (mkTranslations[key]) {
        console.log(`✅ Found MK translation for ${key}: ${mkTranslations[key]}`);
        return mkTranslations[key];
      } else {
        console.log(`❌ Missing MK translation for ${key}, using fallback: ${fallback}`);
      }
    }
    
    // For Albanian language, return hardcoded Albanian translations  
    if (effectiveLanguage === 'sq' || currentLanguage === 'sq') {
      const sqTranslations: {[key: string]: string} = {
        // Page titles
        'title': 'Kërkim i avancuar i automjeteve',
        'subtitle': 'Përdorni filtrat tanë të gjithëpërfshirës të kërkimit për të zbuluar automjetin e saktë që po kërkoni',
        'searchingRealTime': 'Duke kërkuar në kohë reale...',
        
        // Section titles and descriptions
        'sections.vehicleDetails.title': 'Informacioni bazë',
        'sections.vehicleDetails.description': 'Marka e automjetit, modeli dhe vetitë bazë',
        'sections.priceLocation.title': 'Regjistrimi i parë dhe çmimi',
        'sections.priceLocation.description': 'Data e regjistrimit dhe diapazoni i çmimit',
        'sections.technicalSpecs.title': 'Kilometrazhi dhe fuqia',
        'sections.technicalSpecs.description': 'Specifikimet e performancës dhe përdorimit të automjetit',
        'sections.sellerCondition.title': 'Shitësi dhe gjendja e automjetit',
        'sections.sellerCondition.description': 'Lloji i shitësit dhe gjendja e automjetit',
        
        // Interior section
        'sections.interior.title': 'Ngjyra e brendshme dhe tapiceria',
        'sections.interiorAppearance.description': 'Pamja e brendshme dhe materialet',
        
        // Field labels
        'fields.make': 'Marka',
        'fields.model': 'Modeli',
        'fields.additionalProperties': 'Vetitë shtesë',
        'fields.bodyType': 'Lloji i karocerisë',
        'fields.fuelType': 'Lloji i karburantit',
        'fields.yearFrom': 'Regjistrimi i parë nga',
        'fields.yearTo': 'Regjistrimi i parë deri',
        'fields.priceMin': 'Çmimi nga (€)',
        'fields.priceMax': 'Çmimi deri (€)',
        'fields.location': 'Qyteti/Kodi postar',
        'fields.radius': 'Radiusi (km)',
        'fields.mileageMin': 'Kilometrazhi nga (km)',
        'fields.mileageMax': 'Kilometrazhi deri (km)',
        'fields.powerFrom': 'Fuqia nga (kW)',
        'fields.powerTo': 'Fuqia deri (kW)',
        'fields.gear': 'Marshet',
        'fields.numberOfSeats': 'Numri i vendeve',
        'fields.seller': 'Shitësi',
        'fields.vehicleCondition': 'Gjendja e automjetit',
        'fields.interiorColor': 'Ngjyra e brendshme',
        'fields.upholstery': 'Tapiceria',
        
        // Placeholders
        'placeholders.anyMake': 'Çdo markë',
        'placeholders.anyModel': 'Çdo model',
        'placeholders.anyType': 'Çdo lloj karocerie',
        'placeholders.any': 'Çdo',
        'placeholders.from': 'Nga',
        'placeholders.to': 'Deri',
        'placeholders.anyTransmission': 'Çdo transmetues',
        'placeholders.anySeller': 'Çdo shitës',
        'placeholders.anyCondition': 'Çdo gjendje',
        'placeholders.cityStateOrZip': 'Futni qytetin ose kodin postar',
        'placeholders.anyColor': 'Çdo ngjyrë',
        'placeholders.anyMaterial': 'Çdo material',
        
        // Labels and units
        'labels.km': 'km',
        'labels.kw': 'kW',
        'labels.ps': 'PS',
        'labels.seats': 'vende',
        'labels.mileage300kPlus': '300.000+ km',
        'labels.zeroPower': '0 kW (0 PS)',
        'distances.nationwide': 'Në të gjithë vendin',
        
        // Optional Equipment section
        'sections.optionalEquipment.title': 'Pajisje të zgjedhshme',
        'sections.optionalEquipment.description': 'Veçori dhe pajisje shtesë',
        
        // Appearance section  
        'sections.appearance.title': 'Ngjyra e karocerisë dhe puna e bojës',
        'sections.exteriorAppearance.description': 'Pamja e jashtme e automjetit'
      };
      
      if (sqTranslations[key]) {
        console.log(`✅ Found SQ translation for ${key}: ${sqTranslations[key]}`);
        return sqTranslations[key];
      } else {
        console.log(`❌ Missing SQ translation for ${key}, using fallback: ${fallback}`);
      }
    }
    
    // Return English fallback
    console.log(`🔄 Using English fallback for ${key}: ${fallback} (Language: ${effectiveLanguage})`);
    return fallback;
  };

  // Simple array translation function
  const getTranslatedArray = (arrayType: 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'additionalProperties' | 'optionalEquipment' | 'sellerTypes' | 'conditions' | 'colors' | 'interiorColors' | 'paintworkTypes' | 'upholsteryTypes' | 'guaranteeOptions' | 'previousOwnersOptions' | 'turboOptions' | 'enginePositions' | 'serviceBookOptions' | 'yesNoUnknownOptions' | 'roadworthinessOptions' | 'environmentalBadges' | 'electricRangeOptions', fallbackArray: string[]): string[] => {
    const effectiveLanguage = new URLSearchParams(window.location.search).get('lang') || currentLanguage;
    
    // For Macedonian, return hardcoded Macedonian arrays
    if (effectiveLanguage === 'mk' || currentLanguage === 'mk') {
      return fallbackArray; // Now contains Macedonian translations
    }
    
    // For Albanian, return Albanian translations
    if (effectiveLanguage === 'sq' || currentLanguage === 'sq') {
      if (arrayType === 'additionalProperties') {
        return ['E çertifikuar para-shitjes', 'Një pronar', 'Pa aksidente', 'Rekordet e servisit të disponueshme', 'Në garanci', 'Kohët e fundit i servisuar', 'Kilometrazh i ulët', 'Ruajtur në garazh', 'Paketa dimërore', 'Paketa sportive'];
      }
      if (arrayType === 'bodyTypes') {
        return ['Makinë e vogël', 'Karroceri', 'SUV/Terren/Pickup', 'Kupe', 'Kabriolet', 'Sedan', 'Hatchback', 'Karavan', 'Minivan', 'Kamion pickup', 'Tjetër'];
      }
      if (arrayType === 'fuelTypes') {
        return ['Benzinë', 'Dizel', 'Elektrik', 'Hibrid (Benzinë/Elektrik)', 'Hibrid (Dizel/Elektrik)', 'Gaz natyror (CNG)', 'Gaz i lëngshëm (LPG)', 'Etanol', 'Hidrogjen'];
      }
      if (arrayType === 'optionalEquipment') {
        return [
          // Safety & Assistance - Albanian
          'ABS', 'ESP', 'Airbag - shofer', 'Airbag - pasagjer', 'Airbag anësor', 'Airbag koke',
          'Paralajmërim ndryshimi korsi', 'Ndihmë mbajtje korsi', 'Kontroll kroçje adaptiv', 'Asistent frenimi emergjent',
          'Monitor pika të verbër', 'Sensorë parkimi përpara', 'Sensorë parkimi prapa', 'Kamerë parkimi', 'Kamerë 360°',
          'Shikim natë', 'Njohja e shenjave', 'Monitorim presion gomash',
          // Comfort & Convenience - Albanian
          'Ajër kondicionuar', 'Klimë automatike', 'Klimë multi-zonë', 'Ulëse të ngrohta',
          'Ulëse të ftohta/të ajrosura', 'Ulëse elektrike', 'Ulëse me kujtesë', 'Ulëse masazhimi', 'Ulëse lëkure',
          'Timon i ngrohtë', 'Hyrje pa çelës', 'Nisje pa çelës', 'Nisje me distancë', 'Kontroll kroçjeje',
          'Kufizues shpejtësie', 'Dritare elektrike', 'Pasqyra elektrike', 'Pasqyra vetë-errësuese', 'Sensor shiu',
          'Sensor drite', 'Dritat automatike', 'Çati e hapur', 'Çati panoramike', 'Bagazh elektrik',
          // Technology - Albanian
          'Sistem navigimi', 'Ekran prekjeje', 'Apple CarPlay', 'Android Auto', 'Bluetooth', 'WiFi hotspot',
          'Sistem audio premium', 'Head-up display', 'Kokpit digjital', 'Kontroll zëri', 'Lidhje USB',
          // Exterior - Albanian
          'Rrotat alumin', 'Rrotat sportive', 'Goma dimri', 'Bojë metalike', 'Bojë perlë', 'Mbështetës çatie',
          'Paketa tërheqje', 'Spoiler', 'Paketa sportive', 'Paketa krom'
        ];
      }
      if (arrayType === 'colors') {
        return ['E zezë', 'E bardhë', 'Argjend', 'Gri', 'Blu', 'E kuqe', 'E gjelbër', 'Kafe', 'E verdhë', 'Portokalli', 'Bezhë', 'Ari', 'Vjollcë', 'Bronz', 'Tjetër'];
      }
      if (arrayType === 'paintworkTypes') {
        return ['Solide', 'Metalike', 'Perlë', 'Mat', 'Dy-ngjyrë', 'E personalizuar'];
      }
      if (arrayType === 'interiorColors') {
        return ['E zezë', 'Gri', 'Bezhë', 'Kafe', 'Kafë', 'E bardhë', 'E kuqe', 'Blu', 'Tjetër'];
      }
      if (arrayType === 'upholsteryTypes') {
        return ['Pëlhurë', 'Lëkurë', 'Lëkurë artificiale', 'Alcantara', 'Vinyl', 'Kombinim'];
      }
      if (arrayType === 'previousOwnersOptions') {
        return ['1', '2', '3', '4', '5+'];
      }
      if (arrayType === 'yesNoUnknownOptions') {
        return ['Po', 'Jo', 'E panjohur'];
      }
    }
    
    // For other languages or untranslated arrays, use English
    if (arrayType === 'additionalProperties') {
      return ['Certified Pre-Owned', 'Single Owner', 'Accident-Free', 'Service Records Available', 'Under Warranty', 'Recently Serviced', 'Low Mileage', 'Garage Kept', 'Winter Package', 'Sport Package'];
    }
    if (arrayType === 'colors') {
      return ['Black', 'White', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Brown', 'Yellow', 'Orange', 'Beige', 'Gold', 'Violet', 'Bronze', 'Other'];
    }
    if (arrayType === 'paintworkTypes') {
      return ['Solid', 'Metallic', 'Pearl', 'Matte', 'Two-tone', 'Custom'];
    }
    if (arrayType === 'interiorColors') {
      return ['Black', 'Gray', 'Beige', 'Brown', 'Tan', 'White', 'Red', 'Blue', 'Other'];
    }
    if (arrayType === 'upholsteryTypes') {
      return ['Fabric', 'Leather', 'Leatherette', 'Alcantara', 'Vinyl', 'Combination'];
    }
    if (arrayType === 'previousOwnersOptions') {
      return ['1', '2', '3', '4', '5+'];
    }
    if (arrayType === 'yesNoUnknownOptions') {
      return ['Yes', 'No', 'Unknown'];
    }
    
    return fallbackArray;
  };

  // Get translated filter arrays
  const additionalProperties = getTranslatedArray('additionalProperties', fallbackAdditionalProperties);
  const bodyTypes = getTranslatedArray('bodyTypes', fallbackBodyTypes);
  const fuelTypes = getTranslatedArray('fuelTypes', fallbackFuelTypes);
  const gearTypes = getTranslatedArray('transmissions', fallbackGearTypes);
  const optionalEquipment = getTranslatedArray('optionalEquipment', fallbackOptionalEquipment);
  
  // Get translated options arrays
  const sellerTypes = getTranslatedArray('sellerTypes', fallbackSellerTypes);
  const vehicleConditionTypes = getTranslatedArray('conditions', fallbackVehicleConditionTypes);
  const bodyColors = getTranslatedArray('colors', fallbackBodyColors);
  const interiorColors = getTranslatedArray('interiorColors', fallbackInteriorColors);
  const paintWorkTypes = getTranslatedArray('paintworkTypes', fallbackPaintWorkTypes);
  const upholsteryTypes = getTranslatedArray('upholsteryTypes', fallbackUpholsteryTypes);
  const guaranteeOptions = getTranslatedArray('guaranteeOptions', fallbackGuaranteeOptions);
  
  // Get translated advanced options arrays
  const previousOwnersOptions = getTranslatedArray('previousOwnersOptions', fallbackPreviousOwnersOptions);
  const turboOptions = getTranslatedArray('turboOptions', fallbackTurboOptions);
  const enginePositions = getTranslatedArray('enginePositions', fallbackEnginePositions);
  const serviceBookOptions = getTranslatedArray('serviceBookOptions', fallbackServiceBookOptions);
  const yesNoUnknownOptions = getTranslatedArray('yesNoUnknownOptions', fallbackYesNoUnknownOptions);
  const roadworthinessOptions = getTranslatedArray('roadworthinessOptions', fallbackRoadworthinessOptions);
  const environmentalBadges = getTranslatedArray('environmentalBadges', fallbackEnvironmentalBadges);
  const electricRangeOptions = getTranslatedArray('electricRangeOptions', fallbackElectricRangeOptions);
  
  // Arrays that don't have translations yet (keep as fallback)
  const numberOfSeatsOptions = fallbackNumberOfSeatsOptions;
  const radiusOptions = fallbackRadiusOptions;
  const yesNoOptions = fallbackYesNoOptions;
  const euroEmissionClasses = fallbackEuroEmissionClasses;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showResults, setShowResults] = useState(false);
  
  // Advanced search hook
  const {
    filters,
    sortOptions,
    searchResults,
    isSearching,
    searchError,
    updateFilters,
    updateSortOptions,
    clearFilters,
    loadMore,
    getActiveFilterCount,
    executeSearch
  } = useAdvancedSearch();
  
  // Search analytics
  const { trackSearch } = useSearchAnalytics();
  
  // Local state for the original static filters structure
  const [localFilters, setLocalFilters] = useState<AdvancedSearchFilters>({
    // Basic Information
    make: '',
    model: '',
    additionalProperties: [],
    bodyType: '',
    fuelType: '',
    
    // Registration & Pricing
    firstRegistrationFrom: 1990,
    firstRegistrationTo: new Date().getFullYear(),
    priceMin: 0,
    priceMax: 200000,
    
    // Location
    cityZipCode: '',
    radiusKm: '',
    
    // Technical Specifications
    mileageMin: 0,
    mileageMax: 400000,
    powerMinKW: 0,
    powerMaxKW: 500,
    powerMinPS: 0,
    powerMaxPS: 680,
    gear: '',
    numberOfSeats: '',
    
    // Engine Technical Specifications
    engineDisplacementMin: 0.5,
    engineDisplacementMax: 8.0,
    turboSupercharging: '',
    enginePosition: '',
    
    // Advanced Vehicle History
    serviceBookAvailable: '',
    accidentDamageRepaired: '',
    importVehicle: '',
    taxiRentalHistory: '',
    roadworthinessTest: '',
    
    // Financing & Insurance
    financingAvailable: '',
    leasingAvailable: '',
    insuranceCategory: '',
    vatDeductible: '',
    
    // Advanced Safety Features
    safetyRating: '',
    advancedDriverAssistance: [],
    collisionAvoidance: '',
    emergencyCallSystem: '',
    
    // Environmental Extended
    co2EmissionsMin: 0,
    co2EmissionsMax: 400,
    fuelConsumptionMin: 0,
    fuelConsumptionMax: 20,
    environmentalBadge: '',
    electricRange: '',
    
    
    // Seller & Condition
    seller: '',
    vehicleCondition: '',
    
    // Equipment & Features
    optionalEquipment: [],
    
    // Appearance
    bodyColor: '',
    paintWork: '',
    interiorColor: '',
    upholstery: '',
    
    // History & Condition
    previousOwners: '',
    hadAccident: '',
    guarantee: '',
    fullServiceHistory: '',
    nonSmokingVehicle: '',
    
    // Environmental
    euroEmissionClass: ''
  });

  // Clear model when make changes
  useEffect(() => {
    if (localFilters.make === '' || localFilters.make === 'all') {
      setLocalFilters(prev => ({ ...prev, model: 'all' }));
    } else {
      // If the current model is not available for the selected make, clear it
      const availableModels = carModelsByMake[localFilters.make] || [];
      if (localFilters.model && localFilters.model !== 'all' && !availableModels.includes(localFilters.model)) {
        setLocalFilters(prev => ({ ...prev, model: 'all' }));
      }
    }
  }, [localFilters.make]);

  // Sync local filters with advanced search filters
  useEffect(() => {
    const advancedFilters: AdvancedSearchFiltersInput = {
      make: localFilters.make && localFilters.make !== 'all' ? localFilters.make : undefined,
      model: localFilters.model && localFilters.model !== 'all' ? localFilters.model : undefined,
      additionalProperties: localFilters.additionalProperties?.length ? localFilters.additionalProperties : undefined,
      bodyType: localFilters.bodyType || undefined,
      fuelType: localFilters.fuelType || undefined,
      firstRegistrationFrom: localFilters.firstRegistrationFrom !== 1990 ? localFilters.firstRegistrationFrom : undefined,
      firstRegistrationTo: localFilters.firstRegistrationTo !== new Date().getFullYear() ? localFilters.firstRegistrationTo : undefined,
      priceMin: localFilters.priceMin > 0 ? localFilters.priceMin : undefined,
      priceMax: localFilters.priceMax < 200000 ? localFilters.priceMax : undefined,
      cityZipCode: localFilters.cityZipCode || undefined,
      radiusKm: localFilters.radiusKm || undefined,
      mileageMin: localFilters.mileageMin > 0 ? localFilters.mileageMin : undefined,
      mileageMax: localFilters.mileageMax < 400000 ? localFilters.mileageMax : undefined,
      powerKwMin: localFilters.powerMinKW > 0 ? localFilters.powerMinKW : undefined,
      gear: localFilters.gear || undefined,
      numberOfSeats: localFilters.numberOfSeats || undefined,
      seller: localFilters.seller || undefined,
      vehicleCondition: localFilters.vehicleCondition || undefined,
      optionalEquipment: localFilters.optionalEquipment?.length ? localFilters.optionalEquipment : undefined,
      bodyColor: localFilters.bodyColor || undefined,
      paintWork: localFilters.paintWork || undefined,
      interiorColor: localFilters.interiorColor || undefined,
      upholstery: localFilters.upholstery || undefined,
      previousOwners: localFilters.previousOwners || undefined,
      hadAccident: localFilters.hadAccident || undefined,
      guarantee: localFilters.guarantee || undefined,
      fullServiceHistory: localFilters.fullServiceHistory || undefined,
      nonSmokingVehicle: localFilters.nonSmokingVehicle || undefined,
      euroEmissionClass: localFilters.euroEmissionClass || undefined
    };
    
    // Only update if there are meaningful changes
    const hasFilters = Object.values(advancedFilters).some(value => 
      value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
    );
    
    if (hasFilters) {
      updateFilters(advancedFilters);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [localFilters, updateFilters]);
  
  // Track search analytics when results change
  useEffect(() => {
    if (searchResults && searchResults.totalCount > 0) {
      trackSearch(filters, searchResults.totalCount);
    }
  }, [searchResults, filters, trackSearch]);

  const handleRangeChange = (minKey: keyof AdvancedSearchFilters, maxKey: keyof AdvancedSearchFilters, values: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      [minKey]: values[0],
      [maxKey]: values[1]
    }));
  };

  const handleSearchSubmit = useCallback(async () => {
    const activeFilterCount = getActiveFilterCount();
    if (activeFilterCount === 0) {
      // If no filters, show all cars or navigate to browse page
      navigate('/cars');
      return;
    }
    
    // Force a fresh search
    await executeSearch(filters, sortOptions, { page: 1, limit: 20 }, false);
    setShowResults(true);
  }, [filters, sortOptions, getActiveFilterCount, executeSearch, navigate]);

  const clearAllFilters = useCallback(() => {
    setLocalFilters({
      // Basic Information
      make: '',
      model: '',
      additionalProperties: [],
      bodyType: '',
      fuelType: '',
      
      // Registration & Pricing
      firstRegistrationFrom: 1990,
      firstRegistrationTo: new Date().getFullYear(),
      priceMin: 0,
      priceMax: 200000,
      
      // Location
      cityZipCode: '',
      radiusKm: '',
      
      // Technical Specifications
      mileageMin: 0,
      mileageMax: 400000,
      powerMinKW: 0,
      powerMaxKW: 500,
      powerMinPS: 0,
      powerMaxPS: 680,
      gear: '',
      numberOfSeats: '',
      
      // Engine Technical Specifications
      engineDisplacementMin: 0.5,
      engineDisplacementMax: 8.0,
      turboSupercharging: '',
      enginePosition: '',
      
      // Advanced Vehicle History
      serviceBookAvailable: '',
      accidentDamageRepaired: '',
      importVehicle: '',
      taxiRentalHistory: '',
      roadworthinessTest: '',
      
      // Financing & Insurance
      financingAvailable: '',
      leasingAvailable: '',
      insuranceCategory: '',
      vatDeductible: '',
      
      // Advanced Safety Features
      safetyRating: '',
      advancedDriverAssistance: [],
      collisionAvoidance: '',
      emergencyCallSystem: '',
      
      // Environmental Extended
      co2EmissionsMin: 0,
      co2EmissionsMax: 400,
      fuelConsumptionMin: 0,
      fuelConsumptionMax: 20,
      environmentalBadge: '',
      electricRange: '',
      
      
      // Seller & Condition
      seller: '',
      vehicleCondition: '',
      
      // Equipment & Features
      optionalEquipment: [],
      
      // Appearance
      bodyColor: '',
      paintWork: '',
      interiorColor: '',
      upholstery: '',
      
      // History & Condition
      previousOwners: '',
      hadAccident: '',
      guarantee: '',
      fullServiceHistory: '',
      nonSmokingVehicle: '',
      
      // Environmental
      euroEmissionClass: ''
    });
    clearFilters();
    setShowResults(false);
  }, [clearFilters]);
  
  // Handle filter chip removal
  const handleRemoveFilter = useCallback((filterKey: string, value?: string) => {
    if (value && Array.isArray(localFilters[filterKey as keyof AdvancedSearchFilters])) {
      // Remove specific value from array
      const currentArray = localFilters[filterKey as keyof AdvancedSearchFilters] as string[];
      const newArray = currentArray.filter(item => item !== value);
      setLocalFilters(prev => ({ ...prev, [filterKey]: newArray }));
    } else {
      // Reset the entire filter
      const resetValue = (() => {
        switch (filterKey) {
          case 'firstRegistrationFrom': return 1990;
          case 'firstRegistrationTo': return new Date().getFullYear();
          case 'priceMin': case 'mileageMin': case 'powerMinKW': case 'powerMinPS': case 'co2EmissionsMin': case 'fuelConsumptionMin': return 0;
          case 'priceMax': return 200000;
          case 'mileageMax': return 400000;
          case 'powerMaxKW': return 500;
          case 'powerMaxPS': return 680;
          case 'engineDisplacementMin': return 0.5;
          case 'engineDisplacementMax': return 8.0;
          case 'co2EmissionsMax': return 400;
          case 'fuelConsumptionMax': return 20;
          case 'additionalProperties': case 'optionalEquipment': case 'advancedDriverAssistance': return [];
          default: return '';
        }
      })();
      
      setLocalFilters(prev => ({ ...prev, [filterKey]: resetValue }));
    }
  }, [localFilters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 h-12 bg-zinc-100 rounded-full border-none font-medium hover:bg-zinc-200 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('navigation.backToHome', 'Back to Home')}
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            {getAdvancedSearchText('title', 'Advanced Car Search')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {getAdvancedSearchText('subtitle', 'Use our comprehensive search filters to discover the exact vehicle you\'re looking for')}
          </p>
          
          {/* Real-time search status */}
          {isSearching && (
            <div className="flex items-center justify-center gap-2 mt-4 text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{getAdvancedSearchText('searchingRealTime', 'Searching in real-time...')}</span>
            </div>
          )}
        </div>
        
        {/* Filter Chips */}
        {getActiveFilterCount() > 0 && (
          <FilterChips
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={clearAllFilters}
            className="mb-8"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            
            {/* Basic Information */}
            <FilterSection 
              title={getAdvancedSearchText('sections.vehicleDetails.title', 'Basic Information')} 
              sectionKey="basic"
              icon={<Car className="h-5 w-5 text-blue-600" />}
              description={getAdvancedSearchText('sections.vehicleDetails.description', 'Vehicle make, model, and basic properties')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.make', 'Make')}</label>
                  <Select value={localFilters.make} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, make: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyMake', 'Any Make')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{getAdvancedSearchText('placeholders.anyMake', 'All Makes')}</SelectItem>
                      {carMakes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.model', 'Model')}</label>
                  <Select 
                    value={localFilters.model} 
                    onValueChange={(value) => setLocalFilters(prev => ({ ...prev, model: value }))}
                  >
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyModel', 'Any Model')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{getAdvancedSearchText('placeholders.anyModel', 'All Models')}</SelectItem>
                      {(localFilters.make && localFilters.make !== 'all' && carModelsByMake[localFilters.make] || []).map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.additionalProperties', 'Additional Properties')}</label>
                  <CheckboxGroup
                    options={additionalProperties}
                    selectedValues={localFilters.additionalProperties}
                    filterKey="additionalProperties"
                    columns={2}
                    onSelectionChange={(values) => setLocalFilters(prev => ({ ...prev, additionalProperties: values }))}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.bodyType', 'Body Type')}</label>
                  <Select value={localFilters.bodyType} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, bodyType: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyType', 'Any Body Type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyType', 'Any Body Type')}</SelectItem>
                      {bodyTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.fuelType', 'Fuel Type')}</label>
                  <Select value={localFilters.fuelType} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, fuelType: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any Fuel Type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any Fuel Type')}</SelectItem>
                      {fuelTypes.map(fuel => (
                        <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* First Registration & Price */}
            <FilterSection 
              title={getAdvancedSearchText('sections.priceLocation.title', 'First Registration & Price')} 
              sectionKey="registration-price"
              icon={<Star className="h-5 w-5 text-green-600" />}
              description={getAdvancedSearchText('sections.priceLocation.description', 'Registration date and price range')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.yearFrom', 'First Registration From')}</label>
                    <Select 
                      value={(() => {
                        const year = localFilters.firstRegistrationFrom;
                        if (year >= 1990) return year.toString();
                        if (year >= 1980) return '1980s';
                        if (year >= 1970) return '1970s';
                        if (year >= 1960) return '1960s';
                        if (year >= 1950) return '1950s';
                        return '1990';
                      })()} 
                      onValueChange={(value) => {
                        if (value === 'any') {
                          const newFromYear = 1990;
                          setLocalFilters(prev => ({ 
                            ...prev, 
                            firstRegistrationFrom: newFromYear,
                            firstRegistrationTo: Math.max(prev.firstRegistrationTo, newFromYear)
                          }));
                        } else if (value.endsWith('s')) {
                          // Handle decades - convert to starting year of decade
                          const decadeStart = parseInt(value.substring(0, 4));
                          setLocalFilters(prev => ({ 
                            ...prev, 
                            firstRegistrationFrom: decadeStart,
                            firstRegistrationTo: Math.max(prev.firstRegistrationTo, decadeStart)
                          }));
                        } else {
                          const newFromYear = parseInt(value);
                          setLocalFilters(prev => ({ 
                            ...prev, 
                            firstRegistrationFrom: newFromYear,
                            firstRegistrationTo: Math.max(prev.firstRegistrationTo, newFromYear)
                          }));
                        }
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'From')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.yearTo', 'First Registration To')}</label>
                    <Select 
                      value={(() => {
                        const year = localFilters.firstRegistrationTo;
                        if (year >= 1990) return year.toString();
                        if (year >= 1980) return '1980s';
                        if (year >= 1970) return '1970s';
                        if (year >= 1960) return '1960s';
                        if (year >= 1950) return '1950s';
                        return new Date().getFullYear().toString();
                      })()} 
                      onValueChange={(value) => {
                        if (value === 'any') {
                          setLocalFilters(prev => ({ ...prev, firstRegistrationTo: new Date().getFullYear() }));
                        } else if (value.endsWith('s')) {
                          // Handle decades - convert to ending year of decade
                          const decadeStart = parseInt(value.substring(0, 4));
                          const decadeEnd = decadeStart + 9;
                          const newToYear = decadeEnd;
                          setLocalFilters(prev => ({ 
                            ...prev, 
                            firstRegistrationTo: newToYear,
                            firstRegistrationFrom: Math.min(prev.firstRegistrationFrom, decadeStart)
                          }));
                        } else {
                          const newToYear = parseInt(value);
                          setLocalFilters(prev => ({ 
                            ...prev, 
                            firstRegistrationTo: newToYear,
                            firstRegistrationFrom: Math.min(prev.firstRegistrationFrom, newToYear)
                          }));
                        }
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'To')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.priceMin', 'Price From (€)')}</label>
                    <Select 
                      value={localFilters.priceMin?.toString() || '0'} 
                      onValueChange={(value) => {
                        const newPriceMin = parseInt(value);
                        const validPriceMax = priceRanges.find(range => range >= Math.max(localFilters.priceMax, newPriceMin)) || priceRanges[priceRanges.length - 1];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          priceMin: newPriceMin,
                          priceMax: validPriceMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'From')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">€0</SelectItem>
                        {priceRanges.slice(1).map(price => (
                          <SelectItem key={price} value={price.toString()}>€{price.toLocaleString()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.priceMax', 'Price To (€)')}</label>
                    <Select 
                      value={localFilters.priceMax?.toString() || '200000'} 
                      onValueChange={(value) => {
                        const newPriceMax = parseInt(value);
                        const validPriceMin = priceRanges.slice().reverse().find(range => range <= Math.min(localFilters.priceMin, newPriceMax)) || priceRanges[0];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          priceMax: newPriceMax,
                          priceMin: validPriceMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'To')} />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map(price => (
                          <SelectItem key={price} value={price.toString()}>€{price.toLocaleString()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection 
              title={getAdvancedSearchText('sections.priceLocation.title', 'Location')} 
              sectionKey="location"
              icon={<Car className="h-5 w-5 text-blue-600" />}
              description={getAdvancedSearchText('sections.priceLocation.description', 'Search area and location preferences')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.location', 'City/Zip Code')}</label>
                    <Input
                      placeholder={getAdvancedSearchText('placeholders.cityStateOrZip', 'Enter city or postal code')}
                      value={localFilters.cityZipCode}
                      onChange={(e) => setLocalFilters(prev => ({ ...prev, cityZipCode: e.target.value }))}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.radius', 'Radius (km)')}</label>
                    <Select value={localFilters.radiusKm} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, radiusKm: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('distances.nationwide', 'Nationwide')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nationwide">{getAdvancedSearchText('distances.nationwide', 'Nationwide')}</SelectItem>
                        {radiusOptions.map(radius => (
                          <SelectItem key={radius} value={radius}>{radius} {getAdvancedSearchText('labels.km', 'km')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Technical Specifications */}
            <FilterSection 
              title={getAdvancedSearchText('sections.technicalSpecs.title', 'Mileage & Power')} 
              sectionKey="technical"
              icon={<Settings className="h-5 w-5 text-purple-600" />}
              description={getAdvancedSearchText('sections.technicalSpecs.description', 'Vehicle performance and usage specifications')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.mileageMin', 'Mileage From (km)')}</label>
                    <Select 
                      value={localFilters.mileageMin?.toString() || '0'} 
                      onValueChange={(value) => {
                        const newMileageMin = parseInt(value);
                        const validMileageMax = mileageRanges.find(range => range >= Math.max(localFilters.mileageMax, newMileageMin)) || mileageRanges[mileageRanges.length - 1];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          mileageMin: newMileageMin,
                          mileageMax: validMileageMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'From')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 {getAdvancedSearchText('labels.km', 'km')}</SelectItem>
                        {mileageRanges.slice(1).map(mileage => (
                          <SelectItem key={mileage} value={mileage.toString()}>{mileage.toLocaleString()} {getAdvancedSearchText('labels.km', 'km')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.mileageMax', 'Mileage To (km)')}</label>
                    <Select 
                      value={localFilters.mileageMax?.toString() || '400000'} 
                      onValueChange={(value) => {
                        const newMileageMax = parseInt(value);
                        const validMileageMin = mileageRanges.slice().reverse().find(range => range <= Math.min(localFilters.mileageMin, newMileageMax)) || mileageRanges[0];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          mileageMax: newMileageMax,
                          mileageMin: validMileageMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'To')} />
                      </SelectTrigger>
                      <SelectContent>
                        {mileageRanges.map(mileage => (
                          <SelectItem key={mileage} value={mileage.toString()}>
                            {mileage === 400000 ? getAdvancedSearchText('labels.mileage300kPlus', '300,000+ km') : `${mileage.toLocaleString()} ${getAdvancedSearchText('labels.km', 'km')}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.powerFrom', 'Power From (kW)')}</label>
                    <Select 
                      value={localFilters.powerMinKW?.toString() || '0'} 
                      onValueChange={(value) => {
                        const newPowerMinKW = parseInt(value);
                        const newPowerMinPS = Math.round(newPowerMinKW * 1.36);
                        const validPowerMaxKW = powerRanges.find(range => range >= Math.max(localFilters.powerMaxKW, newPowerMinKW)) || powerRanges[powerRanges.length - 1];
                        const validPowerMaxPS = Math.round(validPowerMaxKW * 1.36);
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          powerMinKW: newPowerMinKW,
                          powerMinPS: newPowerMinPS,
                          powerMaxKW: validPowerMaxKW,
                          powerMaxPS: validPowerMaxPS
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'From')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">{getAdvancedSearchText('labels.zeroPower', '0 kW (0 PS)')}</SelectItem>
                        {powerRanges.slice(1).map(power => (
                          <SelectItem key={power} value={power.toString()}>{power} {getAdvancedSearchText('labels.kw', 'kW')} ({Math.round(power * 1.36)} {getAdvancedSearchText('labels.ps', 'PS')})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.powerTo', 'Power To (kW)')}</label>
                    <Select 
                      value={localFilters.powerMaxKW?.toString() || '500'} 
                      onValueChange={(value) => {
                        const newPowerMaxKW = parseInt(value);
                        const newPowerMaxPS = Math.round(newPowerMaxKW * 1.36);
                        const validPowerMinKW = powerRanges.slice().reverse().find(range => range <= Math.min(localFilters.powerMinKW, newPowerMaxKW)) || powerRanges[0];
                        const validPowerMinPS = Math.round(validPowerMinKW * 1.36);
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          powerMaxKW: newPowerMaxKW,
                          powerMaxPS: newPowerMaxPS,
                          powerMinKW: validPowerMinKW,
                          powerMinPS: validPowerMinPS
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'To')} />
                      </SelectTrigger>
                      <SelectContent>
                        {powerRanges.map(power => (
                          <SelectItem key={power} value={power.toString()}>{power} {getAdvancedSearchText('labels.kw', 'kW')} ({Math.round(power * 1.36)} {getAdvancedSearchText('labels.ps', 'PS')})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.gear', 'Gear')}</label>
                    <Select value={localFilters.gear} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, gear: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.anyTransmission', 'Any Transmission')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.anyTransmission', 'Any Transmission')}</SelectItem>
                        {gearTypes.map(gear => (
                          <SelectItem key={gear} value={gear}>{gear}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.numberOfSeats', 'Nr. of Seats')}</label>
                    <Select value={localFilters.numberOfSeats} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, numberOfSeats: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {numberOfSeatsOptions.map(seats => (
                          <SelectItem key={seats} value={seats}>{seats} {getAdvancedSearchText('labels.seats', 'seats')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Seller & Condition */}
            <FilterSection 
              title={getAdvancedSearchText('sections.sellerCondition.title', 'Seller & Vehicle Condition')} 
              sectionKey="seller-condition"
              icon={<Shield className="h-5 w-5 text-red-600" />}
              description={getAdvancedSearchText('sections.sellerCondition.description', 'Seller type and vehicle condition')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.seller', 'Seller')}</label>
                  <Select value={localFilters.seller} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, seller: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anySeller', 'Any Seller')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anySeller', 'Any Seller')}</SelectItem>
                      {sellerTypes.map(seller => (
                        <SelectItem key={seller} value={seller}>{seller}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.vehicleCondition', 'Vehicle Condition')}</label>
                  <Select value={localFilters.vehicleCondition} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, vehicleCondition: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyCondition', 'Any Condition')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyCondition', 'Any Condition')}</SelectItem>
                      {vehicleConditionTypes.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Optional Equipment */}
            <FilterSection 
              title={getAdvancedSearchText('sections.optionalEquipment.title', 'Optional Equipment')} 
              sectionKey="equipment"
              icon={<Star className="h-5 w-5 text-amber-600" />}
              description={getAdvancedSearchText('sections.optionalEquipment.description', 'Additional features and equipment')}
            >
              <CheckboxGroup
                options={optionalEquipment}
                selectedValues={localFilters.optionalEquipment}
                filterKey="optionalEquipment"
                columns={3}
              />
            </FilterSection>

            {/* Appearance */}
            <FilterSection 
              title={getAdvancedSearchText('sections.appearance.title', 'Body Color & Paint Work')} 
              sectionKey="appearance"
              icon={<Palette className="h-5 w-5 text-pink-600" />}
              description={getAdvancedSearchText('sections.exteriorAppearance.description', 'Vehicle exterior appearance')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.bodyColor', 'Body Color')}</label>
                  <Select value={localFilters.bodyColor} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, bodyColor: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyColor', 'Било која боја')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyColor', 'Било која боја')}</SelectItem>
                      {bodyColors.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.paintWork', 'Paint Work')}</label>
                  <Select value={localFilters.paintWork} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, paintWork: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyPaintType', 'Any Paint Type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyPaintType', 'Any Paint Type')}</SelectItem>
                      {paintWorkTypes.map(paint => (
                        <SelectItem key={paint} value={paint}>{paint}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Interior - PURE HARDCODED MACEDONIAN */}
            <FilterSection 
              title="Боја на ентериер и тапацирање" 
              sectionKey="interior"
              icon={<Zap className="h-5 w-5 text-indigo-600" />}
              description="Изглед на ентериерот и материјали"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Боја на ентериер</label>
                  <Select value={localFilters.interiorColor} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, interiorColor: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder="Било која боја" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Било која боја</SelectItem>
                      {interiorColors.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Тапацирање</label>
                  <Select value={localFilters.upholstery} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, upholstery: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder="Било кој материјал" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Било кој материјал</SelectItem>
                      {upholsteryTypes.map(material => (
                        <SelectItem key={material} value={material}>{material}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Vehicle History */}
            <FilterSection 
              title={getAdvancedSearchText('sections.history.title', 'Previous Owners & History')} 
              sectionKey="history"
              icon={<Filter className="h-5 w-5 text-emerald-600" />}
              description={getAdvancedSearchText('sections.ownershipHistory.description', 'Vehicle ownership and history details')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.previousOwners', 'Previous Owners')}</label>
                  <Select value={localFilters.previousOwners} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, previousOwners: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {previousOwnersOptions.map(owners => (
                        <SelectItem key={owners} value={owners}>{owners} {getAdvancedSearchText('labels.owner', 'owner')}{owners !== '1' ? getAdvancedSearchText('labels.ownerPlural', 's') : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.hadAccident', 'Had Accident')}</label>
                  <Select value={localFilters.hadAccident} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, hadAccident: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.guarantee', 'Guarantee')}</label>
                  <Select value={localFilters.guarantee} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, guarantee: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {guaranteeOptions.map(guarantee => (
                        <SelectItem key={guarantee} value={guarantee}>{guarantee}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.fullServiceHistory', 'Full Service History')}</label>
                  <Select value={localFilters.fullServiceHistory} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, fullServiceHistory: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Non-smoking Vehicle</label>
                  <Select value={localFilters.nonSmokingVehicle} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, nonSmokingVehicle: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Engine Technical Specifications */}
            <FilterSection 
              title={getAdvancedSearchText('sections.engineTechnical.title', 'Engine Technical Specifications')} 
              sectionKey="engine-tech"
              icon={<Zap className="h-5 w-5 text-orange-600" />}
              description={getAdvancedSearchText('sections.engineTechnical.description', 'Advanced engine specifications and technical details')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.engineDisplacementFrom', 'Engine Displacement From (L)')}</label>
                    <Select 
                      value={localFilters.engineDisplacementMin?.toString() || '0.5'} 
                      onValueChange={(value) => {
                        const newEngineMin = parseFloat(value);
                        const validEngineMax = engineDisplacementRanges.find(range => range >= Math.max(localFilters.engineDisplacementMax, newEngineMin)) || engineDisplacementRanges[engineDisplacementRanges.length - 1];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          engineDisplacementMin: newEngineMin,
                          engineDisplacementMax: validEngineMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'From')} />
                      </SelectTrigger>
                      <SelectContent>
                        {engineDisplacementRanges.map(displacement => (
                          <SelectItem key={displacement} value={displacement.toString()}>{displacement.toFixed(1)}L</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.engineDisplacementTo', 'Engine Displacement To (L)')}</label>
                    <Select 
                      value={localFilters.engineDisplacementMax?.toString() || '8.0'} 
                      onValueChange={(value) => {
                        const newEngineMax = parseFloat(value);
                        const validEngineMin = engineDisplacementRanges.slice().reverse().find(range => range <= Math.min(localFilters.engineDisplacementMin, newEngineMax)) || engineDisplacementRanges[0];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          engineDisplacementMax: newEngineMax,
                          engineDisplacementMin: validEngineMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'To')} />
                      </SelectTrigger>
                      <SelectContent>
                        {engineDisplacementRanges.map(displacement => (
                          <SelectItem key={displacement} value={displacement.toString()}>{displacement.toFixed(1)}L</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Turbo/Supercharging</label>
                    <Select value={localFilters.turboSupercharging} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, turboSupercharging: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {turboOptions.map(turbo => (
                          <SelectItem key={turbo} value={turbo}>{turbo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.enginePosition', 'Engine Position')}</label>
                    <Select value={localFilters.enginePosition} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, enginePosition: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {enginePositions.map(position => (
                          <SelectItem key={position} value={position}>{position} {getAdvancedSearchText('labels.engine', 'Engine')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Advanced Vehicle History */}
            <FilterSection 
              title={getAdvancedSearchText('sections.advancedHistory.title', 'Advanced Vehicle History')} 
              sectionKey="advanced-history"
              icon={<Shield className="h-5 w-5 text-blue-600" />}
              description={getAdvancedSearchText('sections.advancedHistory.description', 'Detailed vehicle history and documentation')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Service Book Available</label>
                  <Select value={localFilters.serviceBookAvailable} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, serviceBookAvailable: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {serviceBookOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Accident Damage Repaired</label>
                  <Select value={localFilters.accidentDamageRepaired} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, accidentDamageRepaired: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoUnknownOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Import Vehicle</label>
                  <Select value={localFilters.importVehicle} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, importVehicle: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoUnknownOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Taxi/Rental History</label>
                  <Select value={localFilters.taxiRentalHistory} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, taxiRentalHistory: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoUnknownOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Roadworthiness Test</label>
                  <Select value={localFilters.roadworthinessTest} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, roadworthinessTest: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {roadworthinessOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Financing & Insurance */}
            <FilterSection 
              title={getAdvancedSearchText('sections.financing.title', 'Financing & Insurance')} 
              sectionKey="financing"
              icon={<Star className="h-5 w-5 text-green-600" />}
              description={getAdvancedSearchText('sections.financing.description', 'Financing options and insurance details')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Financing Available</label>
                  <Select value={localFilters.financingAvailable} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, financingAvailable: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Leasing Available</label>
                  <Select value={localFilters.leasingAvailable} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, leasingAvailable: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Insurance Category</label>
                  <Select value={localFilters.insuranceCategory} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, insuranceCategory: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {insuranceCategories.map(category => (
                        <SelectItem key={category} value={category}>Category {category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">VAT Deductible</label>
                  <Select value={localFilters.vatDeductible} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, vatDeductible: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      {yesNoOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Advanced Safety Features */}
            <FilterSection 
              title={getAdvancedSearchText('sections.advancedSafety.title', 'Advanced Safety Features')} 
              sectionKey="safety"
              icon={<Shield className="h-5 w-5 text-red-600" />}
              description={getAdvancedSearchText('sections.advancedSafety.description', 'Safety ratings and advanced driver assistance systems')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Safety Rating</label>
                    <Select value={localFilters.safetyRating} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, safetyRating: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.anyRating', 'Any Rating')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.anyRating', 'Any Rating')}</SelectItem>
                        {safetyRatings.map(rating => (
                          <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Collision Avoidance</label>
                    <Select value={localFilters.collisionAvoidance} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, collisionAvoidance: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {yesNoOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Emergency Call System</label>
                    <Select value={localFilters.emergencyCallSystem} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, emergencyCallSystem: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {emergencyCallOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Advanced Driver Assistance Systems</label>
                  <CheckboxGroup
                    options={advancedSafetyFeatures}
                    selectedValues={localFilters.advancedDriverAssistance}
                    filterKey="advancedDriverAssistance"
                    columns={2}
                    onSelectionChange={(values) => setLocalFilters(prev => ({ ...prev, advancedDriverAssistance: values }))}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Environmental Extended - PURE HARDCODED MACEDONIAN */}
            <FilterSection 
              title="Еколошки проширени" 
              sectionKey="environmental-extended"
              icon={<Filter className="h-5 w-5 text-emerald-600" />}
              description="Детални еколошки влијанија и ефикасност"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">CO2 емисии од (g/km)</label>
                    <Select 
                      value={localFilters.co2EmissionsMin?.toString() || '0'} 
                      onValueChange={(value) => {
                        const newCO2Min = parseInt(value);
                        const validCO2Max = co2EmissionsRanges.find(range => range >= Math.max(localFilters.co2EmissionsMax, newCO2Min)) || co2EmissionsRanges[co2EmissionsRanges.length - 1];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          co2EmissionsMin: newCO2Min,
                          co2EmissionsMax: validCO2Max
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder="Од" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 g/km</SelectItem>
                        {co2EmissionsRanges.slice(1).map(co2 => (
                          <SelectItem key={co2} value={co2.toString()}>{co2} g/km</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">CO2 емисии до (g/km)</label>
                    <Select 
                      value={localFilters.co2EmissionsMax?.toString() || '400'} 
                      onValueChange={(value) => {
                        const newCO2Max = parseInt(value);
                        const validCO2Min = co2EmissionsRanges.slice().reverse().find(range => range <= Math.min(localFilters.co2EmissionsMin, newCO2Max)) || co2EmissionsRanges[0];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          co2EmissionsMax: newCO2Max,
                          co2EmissionsMin: validCO2Min
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder="До" />
                      </SelectTrigger>
                      <SelectContent>
                        {co2EmissionsRanges.map(co2 => (
                          <SelectItem key={co2} value={co2.toString()}>{co2} g/km</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Потрошувачка на гориво од (l/100km)</label>
                    <Select 
                      value={localFilters.fuelConsumptionMin?.toString() || '0'} 
                      onValueChange={(value) => {
                        const newFuelMin = parseInt(value);
                        const validFuelMax = fuelConsumptionRanges.find(range => range >= Math.max(localFilters.fuelConsumptionMax, newFuelMin)) || fuelConsumptionRanges[fuelConsumptionRanges.length - 1];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          fuelConsumptionMin: newFuelMin,
                          fuelConsumptionMax: validFuelMax
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder="Од" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 l/100km</SelectItem>
                        {fuelConsumptionRanges.slice(1).map(fuel => (
                          <SelectItem key={fuel} value={fuel.toString()}>{fuel} l/100km</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Потрошувачка на гориво до (l/100km)</label>
                    <Select 
                      value={localFilters.fuelConsumptionMax?.toString() || '20'} 
                      onValueChange={(value) => {
                        const newFuelMax = parseInt(value);
                        const validFuelMin = fuelConsumptionRanges.slice().reverse().find(range => range <= Math.min(localFilters.fuelConsumptionMin, newFuelMax)) || fuelConsumptionRanges[0];
                        setLocalFilters(prev => ({ 
                          ...prev, 
                          fuelConsumptionMax: newFuelMax,
                          fuelConsumptionMin: validFuelMin
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder="До" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelConsumptionRanges.map(fuel => (
                          <SelectItem key={fuel} value={fuel.toString()}>{fuel} l/100km</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Еколошка значка</label>
                    <Select value={localFilters.environmentalBadge} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, environmentalBadge: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder="Било која значка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Било која значка</SelectItem>
                        {environmentalBadges.map(badge => (
                          <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Електричен домет</label>
                    <Select value={localFilters.electricRange} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, electricRange: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder="Било кој домет" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Било кој домет</SelectItem>
                        {electricRangeOptions.map(range => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Euro Emission Class</label>
                  <Select value={localFilters.euroEmissionClass} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, euroEmissionClass: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyEmissionClass', 'Any Emission Class')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyEmissionClass', 'Any Emission Class')}</SelectItem>
                      {euroEmissionClasses.map(ec => (
                        <SelectItem key={ec} value={ec}>{ec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>


          </div>

          {/* Search Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-zinc-100 rounded-2xl shadow-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                    <Search className="h-5 w-5" />
                    {getAdvancedSearchText('searchControls', 'Search Controls')}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {getAdvancedSearchText('refineSearchCriteria', 'Refine your search criteria')}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleSearchSubmit} 
                    disabled={isSearching}
                    className="w-full bg-black text-white hover:bg-black/90 font-semibold py-3 rounded-full transition-all duration-200" 
                    size="lg"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {getAdvancedSearchText('searching', 'Searching...')}
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        {getAdvancedSearchText('searchCars', 'Search Cars')}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={clearAllFilters} 
                    variant="outline" 
                    className="w-full py-3 rounded-full"
                    disabled={getActiveFilterCount() === 0}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {getAdvancedSearchText('clearAll', 'Clear All Filters')}
                  </Button>
                  
                  <div className="bg-muted/30 rounded-2xl p-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {getActiveFilterCount()}
                      </div>
                      <div className="text-sm text-foreground font-medium">
                        {getAdvancedSearchText('activeFilters', 'Active Filters')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getAdvancedSearchText('realTimeSearch', 'Real-time search results')}
                      </div>
                    </div>
                  </div>
                  
                  {searchResults && (
                    <div className="bg-blue-50 rounded-2xl p-4 mt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {searchResults.totalCount.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          {getAdvancedSearchText('carsFound', 'Cars Found')}
                        </div>
                        <div className="text-xs text-blue-500 mt-1">
                          {searchResults.hasNextPage ? getAdvancedSearchText('hasMore', 'More available') : getAdvancedSearchText('allShown', 'All shown')}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-muted-foreground">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{optionalEquipment.length}</div>
                      <div>{getAdvancedSearchText('equipment', 'Equipment')}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{bodyColors.length}</div>
                      <div>{getAdvancedSearchText('colors', 'Colors')}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{euroEmissionClasses.length}</div>
                      <div>{getAdvancedSearchText('emissions', 'Emissions')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
        
        {/* Search Results */}
        {showResults && (
          <div className="mt-12">
            <SearchResults
              searchResults={searchResults}
              isLoading={isSearching}
              error={searchError}
              sortOptions={sortOptions}
              onSortChange={updateSortOptions}
              onLoadMore={loadMore}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        )}
        
      </div>
    </div>
  );
}