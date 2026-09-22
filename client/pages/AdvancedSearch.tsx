import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, ArrowLeft, Settings, Filter, Car, Bike, Truck, Zap, Shield, Star, Palette, Search, Loader2, X } from 'lucide-react';
import { useAdvancedSearch, useSearchAnalytics } from '../hooks/useAdvancedSearch';
import { FilterChips } from '../components/FilterChips';
import { SearchResults } from '../components/SearchResults';
import { useTranslation } from '../hooks/useTranslation';
import { mkTranslations } from '../../shared/translations/mk';
import { sqTranslations } from '../../shared/translations/sq';
import { AdvancedSearchFiltersInput } from '../lib/graphql/operations';
import { trackEvent } from '../components/Analytics';
import { CAR_MAKES_SORTED, CAR_MODELS_BY_MAKE, POPULAR_MAKE_NAMES, MOTORCYCLE_MAKES_SORTED, POPULAR_MOTORCYCLE_MAKES, MOTORCYCLE_MODELS_BY_MAKE, MOTORCYCLE_BODY_TYPES, TRUCK_MAKES_SORTED, POPULAR_TRUCK_MAKES, TRUCK_MODELS_BY_MAKE, TRUCK_BODY_TYPES, CAR_BODY_TYPES, GEARS_OPTIONS, MOTORCYCLE_COOLING_TYPES, MOTORCYCLE_STARTER_TYPES, MOTORCYCLE_LICENSE_CLASSES, MOTORCYCLE_CYLINDER_TYPES } from '@shared/car-data';
import { useCountry } from '@/contexts/CountryContext';
import { getLocationsForCountry } from '@shared/locations';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_CATEGORY_LABELS, ALL_SAFETY_KEYS, ALL_FEATURE_KEYS, getEquipmentLabel, type EquipmentLang } from '@shared/equipmentOptions';

// Filter interfaces
type VehicleTypeFilter = 'car' | 'motorbike' | 'truck';

interface AdvancedSearchFilters {
  // Vehicle Type
  vehicleType: VehicleTypeFilter;
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
  numberOfDoors: string;

  // Engine Technical Specifications
  engineDisplacementMin: number;
  engineDisplacementMax: number;

  // History & Service
  serviceBookAvailable: string;

  // Environmental Extended
  fuelConsumptionMin: number;
  fuelConsumptionMax: number;
  
  
  // Seller & Condition
  seller: string;
  vehicleCondition: string;
  
  // Equipment & Features (stored as canonical English keys from shared/equipmentOptions)
  optionalEquipment: string[]; // non-safety keys → backend `features` filter
  safetyEquipment: string[];   // safety keys → backend `safetyFeatures` filter
  
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

  // Seller Options
  allowTestDrive: string;
  acceptsTradeIn: string;
  priceNegotiable: string;
  quickSale: string;

  // Environmental
  euroEmissionClass: string;

  // New car fields
  numberOfGears: string;
  co2Emissions: string;
  weight: string;

  // Motorcycle-specific
  coolingType: string;
  starterType: string;
  licenseClass: string;
  cylinders: string;
}

// Data arrays — now dynamic based on vehicle type (set in component body)

// Macedonian arrays (will be used by getTranslatedArray for MK language)
const fallbackAdditionalProperties = ['Сертифициран предпродажен', 'Еден сопственик', 'Без незгоди', 'Достапни сервисни записи', 'Во гаранција', 'Неодамна сервисиран', 'Мал пробег', 'Чуван во гаража', 'Зимски пакет', 'Спортски пакет'];

// Body types come from shared/car-data CAR_BODY_TYPES (canonical English strings
// the sell form stores in the DB). Translated at render time via
// translateBodyTypeLabel below.

const fallbackFuelTypes = ['Бензин', 'Дизел', 'Електричен', 'Хибрид (Бензин/Електричен)', 'Хибрид (Дизел/Електричен)', 'Природен гас (CNG)', 'Течен гас (LPG)', 'Етанол', 'Водород'];

const fallbackGearTypes = ['Мануелна', 'Автоматска', 'Полу-автоматска', 'CVT'];

const fallbackNumberOfSeatsOptions = ['2', '3', '4', '5', '6', '7', '8', '9+'];

const fallbackSellerTypes = ['Приватен продавач', 'Дилер', 'Сертифициран дилер', 'Флота/Лизинг'];

const fallbackVehicleConditionTypes = ['Нов', 'Користен', 'Предрегистриран', 'Демонстрационо возило', 'Класик/Винтиџ'];


const fallbackRadiusOptions = ['5', '10', '25', '50', '100', '200', '300', '500'];

// Optional equipment lives in shared/equipmentOptions.ts (categorized + translated).

const fallbackBodyColors = ['Црна', 'Бела', 'Сребрена', 'Сива', 'Сина', 'Црвена', 'Зелена', 'Кафена', 'Жолта', 'Портокалова', 'Бежова', 'Златна', 'Виолетова', 'Бронзена', 'Друго'];

const fallbackPaintWorkTypes = ['Солидна', 'Металик', 'Перла', 'Мат', 'Двобојна', 'Приспособена'];

const fallbackInteriorColors = ['Црна', 'Сива', 'Бежова', 'Кафена', 'Кафеава', 'Бела', 'Црвена', 'Сина', 'Друго'];

const fallbackUpholsteryTypes = ['Ткаенина', 'Кожа', 'Вештачка кожа', 'Алкантара', 'Винил', 'Комбинација'];

const fallbackPreviousOwnersOptions = ['1', '2', '3', '4', '5+'];

const fallbackYesNoOptions = ['Да', 'Не', 'Непознато'];

const fallbackGuaranteeOptions = ['No Guarantee', 'Dealer Guarantee', 'Manufacturer Guarantee', 'Extended Guarantee'];

const fallbackEuroEmissionClasses = ['Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6', 'Euro 6c', 'Euro 6d-TEMP', 'Euro 6d'];



// Create years array: individual years from current year down to 1990, then decades from 1980s down to 1950s
const currentYear = new Date().getFullYear();
const individualYears = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
const decades = ['1980s', '1970s', '1960s', '1950s'];
const years = [...individualYears, ...decades];
const priceRanges = [0, 1000, 2000, 3000, 4000, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 125000, 150000, 175000, 200000];
const mileageRanges = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000];
const powerRanges = [0, 30, 50, 70, 90, 110, 130, 150, 170, 200, 220, 250, 280, 300, 350, 400, 450, 500, 550, 600];
const engineDisplacementRanges = [0.5, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 8.0];
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

const CHECKBOX_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
};

function CheckboxGroup({ options, selectedValues, filterKey, columns = 2, onSelectionChange }: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (onSelectionChange) {
      const newValues = checked
        ? [...selectedValues, option]
        : selectedValues.filter(value => value !== option);
      onSelectionChange(newValues);
    }
  };

  const colClass = CHECKBOX_COLS[columns] ?? CHECKBOX_COLS[2];

  return (
    <div className={`grid ${colClass} gap-3`}>
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
  const { country } = useCountry();
  const municipalities = getLocationsForCountry(country?.code || 'mk');

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
        'sections.locationDistance.title': 'Локација и радиус',
        'sections.locationDistance.description': 'Град или поштенски код и радиус за пребарување',
        'sections.technicalSpecs.title': 'Изминати километри и снага',
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
        'fields.mileageMin': 'Изминати километри од',
        'fields.mileageMax': 'Изминати километри до',
        'fields.powerFrom': 'Снага од (kW)',
        'fields.powerTo': 'Снага до (kW)',
        'fields.gear': 'Менувач',
        'fields.numberOfSeats': 'Број на седишта',
        'fields.seller': 'Продавач',
        'fields.vehicleCondition': 'Состојба на возилото',
        'fields.interiorColor': 'Боја на ентериер',
        'fields.bodyColor': 'Боја на каросерија',
        'fields.paintWork': 'Работа на бојата',
        'fields.upholstery': 'Тапацирање',
        'fields.previousOwners': 'Претходни сопственици',
        'fields.hadAccident': 'Имал несреќа',
        'fields.guarantee': 'Гаранција',
        'fields.fullServiceHistory': 'Целосна сервисна историја',
        'fields.nonSmokingVehicle': 'Возило за непушачи',
        'fields.advancedDriverAssistance': 'Напредни системи за помош на возачот',
        'fields.euroEmissionClass': 'Евро емисиона класа',

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
        'placeholders.anyPaintType': 'Било кој тип на боја',
        'placeholders.anyEmissionClass': 'Било која емисиона класа',
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
        'sections.optionalEquipment.title': 'Дополнителна опрема',
        'sections.optionalEquipment.description': 'Дополнителни карактеристики и опрема',
        
        // Appearance section
        'sections.appearance.title': 'Боја на каросерија и работа на бојата',
        'sections.exteriorAppearance.description': 'Надворешен изглед на возилото',
        
        // Interior section
        'sections.interior.title': 'Боја на ентериер и тапацирање',
        'sections.interiorAppearance.description': 'Изглед на ентериерот и материјали',
        
        // History section
        'sections.history.title': 'Претходни сопственици и историја',
        'sections.ownershipHistory.description': 'Детали за сопственоста и историјата на возилото',

        // Search controls sidebar
        'searchControls': 'Контроли за пребарување',
        'refineSearchCriteria': 'Прилагоди ги критериумите за пребарување',
        'searchCars': 'Пребарај автомобили',
        'clearAll': 'Исчисти ги филтрите',
        'activeFilters': 'Активни филтри',
        'realTimeSearch': 'Резултати во реално време',
        'carsFound': 'Најдени автомобили',
        'equipment': 'Опрема',
        'colors': 'Бои',
        'emissions': 'Емисиони класи',
        'hasMore': 'Уште е достапно',
        'allShown': 'Сите се прикажани',

        // Engine tech + environmental (previously hardcoded Macedonian)
        'sections.engineTech.title': 'Технички спецификации на моторот',
        'sections.engineTech.description': 'Напредни спецификации и технички детали на моторот',
        'sections.environmental.title': 'Еколошки',
        'sections.environmental.description': 'Потрошувачка на гориво и еколошка класа',
        'fields.engineDisplacementMin': 'Зафатнина на моторот од (L)',
        'fields.engineDisplacementMax': 'Зафатнина на моторот до (L)',
        'fields.fuelConsumptionMin': 'Потрошувачка на гориво од (l/100km)',
        'fields.fuelConsumptionMax': 'Потрошувачка на гориво до (l/100km)',
      };
      
      if (mkTranslations[key]) {
        return mkTranslations[key];
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
        'sections.locationDistance.title': 'Vendndodhja dhe rrezja',
        'sections.locationDistance.description': 'Qyteti ose kodi postar dhe rrezja e kërkimit',
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
        'fields.bodyColor': 'Ngjyra e karocerisë',
        'fields.paintWork': 'Puna e bojës',
        'fields.upholstery': 'Tapiceria',
        'fields.previousOwners': 'Pronarët e mëparshëm',
        'fields.hadAccident': 'Ka pasur aksident',
        'fields.guarantee': 'Garancia',
        'fields.fullServiceHistory': 'Histori e plotë e shërbimit',
        'fields.nonSmokingVehicle': 'Automjet për jo-duhanpirës',
        'fields.advancedDriverAssistance': 'Sistemet e avancuara të ndihmës së shoferit',
        'fields.euroEmissionClass': 'Klasa e emisionit Euro',

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
        'placeholders.anyPaintType': 'Çdo lloj boje',
        'placeholders.anyEmissionClass': 'Çdo klasë emisioni',
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
        'sections.exteriorAppearance.description': 'Pamja e jashtme e automjetit',

        // Search controls sidebar
        'searchControls': 'Kontrollet e kërkimit',
        'refineSearchCriteria': 'Përshtat kriteret e kërkimit',
        'searchCars': 'Kërko makina',
        'clearAll': 'Pastro filtrat',
        'activeFilters': 'Filtrat aktivë',
        'realTimeSearch': 'Rezultate në kohë reale',
        'carsFound': 'Makina të gjetura',
        'equipment': 'Pajisje',
        'colors': 'Ngjyra',
        'emissions': 'Klasa emetimi',
        'hasMore': 'Ka më shumë',
        'allShown': 'Të gjitha të shfaqura',

        // Engine tech + environmental
        'sections.engineTech.title': 'Specifikimet teknike të motorit',
        'sections.engineTech.description': 'Specifikime të avancuara dhe detaje teknike të motorit',
        'sections.environmental.title': 'Ekologjik',
        'sections.environmental.description': 'Konsumi i karburantit dhe klasa e emetimit',
        'fields.engineDisplacementMin': 'Kubatura e motorit nga (L)',
        'fields.engineDisplacementMax': 'Kubatura e motorit deri (L)',
        'fields.fuelConsumptionMin': 'Konsumi i karburantit nga (l/100km)',
        'fields.fuelConsumptionMax': 'Konsumi i karburantit deri (l/100km)',
      };

      if (sqTranslations[key]) {
        return sqTranslations[key];
      }
    }
    
    return fallback;
  };

  // Simple array translation function
  const getTranslatedArray = (arrayType: 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'additionalProperties' | 'optionalEquipment' | 'sellerTypes' | 'conditions' | 'colors' | 'interiorColors' | 'paintworkTypes' | 'upholsteryTypes' | 'guaranteeOptions' | 'previousOwnersOptions' | 'turboOptions' | 'enginePositions' | 'serviceBookOptions' | 'yesNoUnknownOptions' | 'roadworthinessOptions' | 'environmentalBadges' | 'electricRangeOptions' | 'advancedSafetyFeatures', fallbackArray: string[]): string[] => {
    const effectiveLanguage = new URLSearchParams(window.location.search).get('lang') || currentLanguage;
    
    // For Macedonian, return hardcoded Macedonian arrays
    if (effectiveLanguage === 'mk' || currentLanguage === 'mk') {
      if (arrayType === 'guaranteeOptions') {
        return ['Без гаранција', 'Гаранција од дилер', 'Гаранција од производител', 'Продолжена гаранција'];
      }
      return fallbackArray; // Now contains Macedonian translations
    }
    
    // For Albanian, return Albanian translations
    if (effectiveLanguage === 'sq' || currentLanguage === 'sq') {
      if (arrayType === 'additionalProperties') {
        return ['E çertifikuar para-shitjes', 'Një pronar', 'Pa aksidente', 'Rekordet e servisit të disponueshme', 'Në garanci', 'Kohët e fundit i servisuar', 'Kilometrazh i ulët', 'Ruajtur në garazh', 'Paketa dimërore', 'Paketa sportive'];
      }
      if (arrayType === 'fuelTypes') {
        return ['Benzinë', 'Dizel', 'Elektrik', 'Hibrid (Benzinë/Elektrik)', 'Hibrid (Dizel/Elektrik)', 'Gaz natyror (CNG)', 'Gaz i lëngshëm (LPG)', 'Etanol', 'Hidrogjen'];
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
      if (arrayType === 'advancedSafetyFeatures') {
        return [
          'Kontroll kroçjeje adaptiv', 'Paralajmërim largimi korsi', 'Ndihmë mbajtje korsi',
          'Asistent frenimi emergjent', 'Monitor pika të verbër', 'Njohja e shenjave',
          'Paralajmërim vëmendjes së shoferit', 'Paralajmërim trafiku kryqëzues', 'Drita të gjata automatike',
          'Zbutje e përplasjes', 'Zbulimi i këmbësorëve', 'Zbulimi i çiklistëve'
        ];
      }
      if (arrayType === 'transmissions') {
        return ['Manuale', 'Automatike', 'Gjysmë-automatike', 'CVT'];
      }
      if (arrayType === 'sellerTypes') {
        return ['Shitës privat', 'Diler', 'Diler i çertifikuar', 'Flotë / Qira'];
      }
      if (arrayType === 'conditions') {
        return ['E re', 'E përdorur', 'E para-regjistruar', 'Automjet demonstrimi', 'Klasike / Vintage'];
      }
      if (arrayType === 'guaranteeOptions') {
        return ['Pa garanci', 'Garanci nga dileri', 'Garanci nga prodhuesi', 'Garanci e zgjatur'];
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

  // Localizes a body-type canonical value (CAR_BODY_TYPES entries such as
  // 'Sedan', 'Limousine') for display. Kept as a case-insensitive lookup so
  // legacy DB rows with variant casing still render translated.
  const translateBodyTypeLabel = (raw: string): string => {
    if (!raw) return raw;
    const key = raw.toLowerCase().replace(/[\s-]+/g, '');
    const map: Record<string, string> = {
      sedan: t('sell.bodyTypes.sedan'),
      hatchback: t('sell.bodyTypes.hatchback'),
      stationwagon: t('sell.bodyTypes.wagon'),
      suv: t('sell.bodyTypes.suv'),
      coupe: t('sell.bodyTypes.coupe'),
      convertible: t('sell.bodyTypes.convertible'),
      van: t('sell.bodyTypes.van'),
      smallcar: t('sell.bodyTypes.smallCar'),
      compact: t('sell.bodyTypes.compact'),
      sportscar: t('sell.bodyTypes.sportsCar'),
      offroad: t('sell.bodyTypes.offRoad'),
      limousine: t('sell.bodyTypes.limousine'),
      other: t('sell.bodyTypes.other'),
    };
    return map[key] || raw;
  };

  // Get translated filter arrays
  const additionalProperties = getTranslatedArray('additionalProperties', fallbackAdditionalProperties);
  const fuelTypes = getTranslatedArray('fuelTypes', fallbackFuelTypes);
  const gearTypes = getTranslatedArray('transmissions', fallbackGearTypes);
  // optionalEquipment list is now sourced from @shared/equipmentOptions and rendered inline below,
  // grouped by category and with per-key translations.
  const equipLang: EquipmentLang = (['en', 'mk', 'sq'].includes(currentLanguage) ? currentLanguage : 'en') as EquipmentLang;

  // Get translated options arrays
  const sellerTypes = getTranslatedArray('sellerTypes', fallbackSellerTypes);
  const vehicleConditionTypes = getTranslatedArray('conditions', fallbackVehicleConditionTypes);
  const bodyColors = getTranslatedArray('colors', fallbackBodyColors);
  const interiorColors = getTranslatedArray('interiorColors', fallbackInteriorColors);
  const paintWorkTypes = getTranslatedArray('paintworkTypes', fallbackPaintWorkTypes);
  const upholsteryTypes = getTranslatedArray('upholsteryTypes', fallbackUpholsteryTypes);
  const guaranteeOptions = getTranslatedArray('guaranteeOptions', fallbackGuaranteeOptions);
  const previousOwnersOptions = getTranslatedArray('previousOwnersOptions', fallbackPreviousOwnersOptions);
  
  // Arrays that don't have translations yet (keep as fallback)
  const numberOfSeatsOptions = fallbackNumberOfSeatsOptions;
  const radiusOptions = fallbackRadiusOptions;
  const yesNoOptions = getTranslatedArray('yesNoUnknownOptions', fallbackYesNoOptions);
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
  } = useAdvancedSearch();
  
  // Search analytics
  const { trackSearch } = useSearchAnalytics();
  
  // Local state for the original static filters structure
  const [localFilters, setLocalFilters] = useState<AdvancedSearchFilters>({
    // Vehicle Type
    vehicleType: 'car',
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
    numberOfDoors: '',

    // Engine Technical Specifications
    engineDisplacementMin: 0.5,
    engineDisplacementMax: 8.0,

    // History & Service
    serviceBookAvailable: '',

    // Environmental Extended
    fuelConsumptionMin: 0,
    fuelConsumptionMax: 20,
    
    
    // Seller & Condition
    seller: '',
    vehicleCondition: '',
    
    // Equipment & Features
    optionalEquipment: [],
    safetyEquipment: [],

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

    // Seller Options
    allowTestDrive: '',
    acceptsTradeIn: '',
    priceNegotiable: '',
    quickSale: '',

    // Environmental
    euroEmissionClass: '',

    // New car fields
    numberOfGears: '',
    co2Emissions: '',
    weight: '',

    // Motorcycle-specific
    coolingType: '',
    starterType: '',
    licenseClass: '',
    cylinders: '',
  });

  // Dynamic data based on vehicle type
  const isMotorbike = localFilters.vehicleType === 'motorbike';
  const isTruck = localFilters.vehicleType === 'truck';
  const carMakes = isMotorbike ? MOTORCYCLE_MAKES_SORTED : isTruck ? TRUCK_MAKES_SORTED : CAR_MAKES_SORTED;
  const activePopularMakes = isMotorbike ? POPULAR_MOTORCYCLE_MAKES : isTruck ? POPULAR_TRUCK_MAKES : POPULAR_MAKE_NAMES;
  const carModelsByMake = isMotorbike ? MOTORCYCLE_MODELS_BY_MAKE : isTruck ? TRUCK_MODELS_BY_MAKE : CAR_MODELS_BY_MAKE;

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
  }, [localFilters.make, carModelsByMake]);

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
      powerMaxKW: localFilters.powerMaxKW < 500 ? localFilters.powerMaxKW : undefined,
      powerMinPS: localFilters.powerMinPS > 0 ? localFilters.powerMinPS : undefined,
      powerMaxPS: localFilters.powerMaxPS < 680 ? localFilters.powerMaxPS : undefined,
      engineDisplacementMin: localFilters.engineDisplacementMin > 0.5 ? Math.round(localFilters.engineDisplacementMin * 1000) : undefined,
      engineDisplacementMax: localFilters.engineDisplacementMax < 8.0 ? Math.round(localFilters.engineDisplacementMax * 1000) : undefined,
      fuelConsumptionMin: localFilters.fuelConsumptionMin > 0 ? localFilters.fuelConsumptionMin : undefined,
      fuelConsumptionMax: localFilters.fuelConsumptionMax < 20 ? localFilters.fuelConsumptionMax : undefined,
      gear: localFilters.gear || undefined,
      numberOfSeats: localFilters.numberOfSeats || undefined,
      numberOfDoors: localFilters.numberOfDoors || undefined,
      sellerType: localFilters.seller || undefined,
      vehicleCondition: localFilters.vehicleCondition || undefined,
      features: localFilters.optionalEquipment?.length ? localFilters.optionalEquipment : undefined,
      safetyFeatures: localFilters.safetyEquipment?.length ? localFilters.safetyEquipment : undefined,
      bodyColor: localFilters.bodyColor || undefined,
      paintWork: localFilters.paintWork || undefined,
      interiorColor: localFilters.interiorColor || undefined,
      upholstery: localFilters.upholstery || undefined,
      previousOwners: localFilters.previousOwners || undefined,
      hadAccident: localFilters.hadAccident || undefined,
      guarantee: localFilters.guarantee || undefined,
      serviceBookAvailable: localFilters.fullServiceHistory || undefined,
      fullServiceHistory: localFilters.fullServiceHistory || undefined,
      nonSmokingVehicle: localFilters.nonSmokingVehicle || undefined,
      allowTestDrive: localFilters.allowTestDrive === 'yes' ? true : localFilters.allowTestDrive === 'no' ? false : undefined,
      acceptsTradeIn: localFilters.acceptsTradeIn === 'yes' ? true : localFilters.acceptsTradeIn === 'no' ? false : undefined,
      priceNegotiable: localFilters.priceNegotiable === 'yes' ? true : localFilters.priceNegotiable === 'no' ? false : undefined,
      quickSale: localFilters.quickSale === 'yes' ? true : localFilters.quickSale === 'no' ? false : undefined,
      euroEmissionClass: localFilters.euroEmissionClass || undefined,
      numberOfGears: localFilters.numberOfGears && localFilters.numberOfGears !== 'any' ? localFilters.numberOfGears : undefined,
      co2Emissions: localFilters.co2Emissions && localFilters.co2Emissions !== 'any' ? localFilters.co2Emissions : undefined,
      weight: localFilters.weight && localFilters.weight !== 'any' ? localFilters.weight : undefined,
      coolingType: localFilters.coolingType && localFilters.coolingType !== 'any' ? localFilters.coolingType : undefined,
      starterType: localFilters.starterType && localFilters.starterType !== 'any' ? localFilters.starterType : undefined,
      licenseClass: localFilters.licenseClass && localFilters.licenseClass !== 'any' ? localFilters.licenseClass : undefined,
      cylinders: localFilters.cylinders && localFilters.cylinders !== 'any' ? localFilters.cylinders : undefined,
    };

    updateFilters(advancedFilters);
  }, [localFilters, updateFilters]);
  
  // Track search analytics when results change
  useEffect(() => {
    if (searchResults && (searchResults.totalCount ?? 0) > 0) {
      trackSearch(filters, searchResults.totalCount ?? 0);
    }
  }, [searchResults, filters, trackSearch]);

  const handleRangeChange = (minKey: keyof AdvancedSearchFilters, maxKey: keyof AdvancedSearchFilters, values: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      [minKey]: values[0],
      [maxKey]: values[1]
    }));
  };

  const handleSearchSubmit = useCallback(() => {
    // Serialize the entire advancedFilters object into URL params, so /cars
    // (BrowseCars) can reconstruct the same filter for its API call. Keys mirror
    // the backend CarFilterInput field names, so BrowseCars can pass them through
    // to useCars() with no name-mapping layer.
    const params = new URLSearchParams();
    const set = (k: string, v: string | number | boolean | null | undefined) => {
      if (v === undefined || v === null || v === '') return;
      params.set(k, String(v));
    };
    const setList = (k: string, v?: string[] | null) => {
      if (v && v.length > 0) params.set(k, v.join(','));
    };
    const yn = (v: string): boolean | undefined => v === 'yes' ? true : v === 'no' ? false : undefined;

    // Vehicle Type
    if (localFilters.vehicleType && localFilters.vehicleType !== 'car') set('vehicleType', localFilters.vehicleType);
    // Basic
    if (localFilters.make && localFilters.make !== 'all') set('make', localFilters.make);
    if (localFilters.model && localFilters.model !== 'all') set('model', localFilters.model);
    setList('additionalProperties', localFilters.additionalProperties);
    if (localFilters.bodyType && localFilters.bodyType !== 'any') set('bodyType', localFilters.bodyType);
    if (localFilters.fuelType && localFilters.fuelType !== 'any') set('fuelType', localFilters.fuelType);
    // Registration & Price
    if (localFilters.firstRegistrationFrom > 1990) set('minYear', localFilters.firstRegistrationFrom);
    if (localFilters.firstRegistrationTo < new Date().getFullYear()) set('maxYear', localFilters.firstRegistrationTo);
    if (localFilters.priceMin > 0) set('minPrice', localFilters.priceMin);
    if (localFilters.priceMax < 200000) set('maxPrice', localFilters.priceMax);
    // Location
    if (localFilters.cityZipCode) set('location', localFilters.cityZipCode);
    if (localFilters.radiusKm) set('radiusKm', localFilters.radiusKm as string);
    // Technical
    if (localFilters.mileageMin > 0) set('minMileage', localFilters.mileageMin);
    if (localFilters.mileageMax < 400000) set('maxMileage', localFilters.mileageMax);
    if (localFilters.powerMinKW > 0) set('minPowerKW', localFilters.powerMinKW);
    if (localFilters.powerMaxKW < 500) set('maxPowerKW', localFilters.powerMaxKW);
    if (localFilters.engineDisplacementMin > 0.5) set('minEngineSize', Math.round(localFilters.engineDisplacementMin * 1000));
    if (localFilters.engineDisplacementMax < 8.0) set('maxEngineSize', Math.round(localFilters.engineDisplacementMax * 1000));
    if (localFilters.fuelConsumptionMin > 0) set('minFuelConsumption', localFilters.fuelConsumptionMin);
    if (localFilters.fuelConsumptionMax < 20) set('maxFuelConsumption', localFilters.fuelConsumptionMax);
    if (localFilters.gear && localFilters.gear !== 'any') set('transmission', localFilters.gear);
    if (localFilters.numberOfSeats && localFilters.numberOfSeats !== 'any') set('seats', localFilters.numberOfSeats);
    if (localFilters.numberOfDoors && localFilters.numberOfDoors !== 'any') set('doors', localFilters.numberOfDoors);
    // Seller & Condition
    if (localFilters.seller && localFilters.seller !== 'any') set('sellerType', localFilters.seller);
    if (localFilters.vehicleCondition && localFilters.vehicleCondition !== 'any') set('condition', localFilters.vehicleCondition);
    // Equipment
    setList('features', localFilters.optionalEquipment);
    setList('safetyFeatures', localFilters.safetyEquipment);
    // Appearance
    if (localFilters.bodyColor && localFilters.bodyColor !== 'any') set('color', localFilters.bodyColor);
    if (localFilters.paintWork && localFilters.paintWork !== 'any') set('paintWorkType', localFilters.paintWork);
    if (localFilters.interiorColor && localFilters.interiorColor !== 'any') set('interiorColor', localFilters.interiorColor);
    if (localFilters.upholstery && localFilters.upholstery !== 'any') set('upholsteryType', localFilters.upholstery);
    // History & Condition
    if (localFilters.previousOwners && localFilters.previousOwners !== 'any') set('maxPreviousOwners', localFilters.previousOwners);
    if (localFilters.hadAccident && localFilters.hadAccident !== 'any') set('hadAccident', localFilters.hadAccident);
    const guarantee = yn(localFilters.guarantee);
    if (guarantee !== undefined) set('hasWarranty', guarantee);
    const fullService = yn(localFilters.fullServiceHistory);
    if (fullService !== undefined) set('fullServiceHistory', fullService);
    const nonSmoking = yn(localFilters.nonSmokingVehicle);
    if (nonSmoking !== undefined) set('nonSmokingVehicle', nonSmoking);
    // Seller Options
    const testDrive = yn(localFilters.allowTestDrive);
    if (testDrive !== undefined) set('allowTestDrive', testDrive);
    const tradeIn = yn(localFilters.acceptsTradeIn);
    if (tradeIn !== undefined) set('acceptsTradeIn', tradeIn);
    const negotiable = yn(localFilters.priceNegotiable);
    if (negotiable !== undefined) set('priceNegotiable', negotiable);
    const quickSale = yn(localFilters.quickSale);
    if (quickSale !== undefined) set('quickSale', quickSale);
    // Environmental
    if (localFilters.euroEmissionClass && localFilters.euroEmissionClass !== 'any') set('emissionClass', localFilters.euroEmissionClass);
    // New car fields
    if (localFilters.numberOfGears && localFilters.numberOfGears !== 'any') set('numberOfGears', localFilters.numberOfGears);
    if (localFilters.co2Emissions && localFilters.co2Emissions !== 'any') set('maxCo2Emissions', localFilters.co2Emissions);
    if (localFilters.weight && localFilters.weight !== 'any') set('maxWeight', localFilters.weight);
    // Motorcycle-specific
    if (localFilters.coolingType && localFilters.coolingType !== 'any') set('coolingType', localFilters.coolingType);
    if (localFilters.starterType && localFilters.starterType !== 'any') set('starterType', localFilters.starterType);
    if (localFilters.licenseClass && localFilters.licenseClass !== 'any') set('licenseClass', localFilters.licenseClass);
    if (localFilters.cylinders && localFilters.cylinders !== 'any') set('cylinders', localFilters.cylinders);

    trackEvent('search', { filter_count: getActiveFilterCount() });
    navigate(`/cars?${params.toString()}`);
  }, [localFilters, getActiveFilterCount, navigate]);

  const clearAllFilters = useCallback(() => {
    setLocalFilters({
      // Vehicle Type
      vehicleType: 'car',
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
      numberOfDoors: '',

      // Engine Technical Specifications
      engineDisplacementMin: 0.5,
      engineDisplacementMax: 8.0,

      // History & Service
      serviceBookAvailable: '',

      // Environmental Extended
      fuelConsumptionMin: 0,
      fuelConsumptionMax: 20,
      
      
      // Seller & Condition
      seller: '',
      vehicleCondition: '',

      // Equipment & Features
      optionalEquipment: [],
      safetyEquipment: [],

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

      // Seller Options
      allowTestDrive: '',
      acceptsTradeIn: '',
      priceNegotiable: '',
      quickSale: '',

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
          case 'priceMin': case 'mileageMin': case 'powerMinKW': case 'powerMinPS': case 'fuelConsumptionMin': return 0;
          case 'priceMax': return 200000;
          case 'mileageMax': return 400000;
          case 'powerMaxKW': return 500;
          case 'powerMaxPS': return 680;
          case 'engineDisplacementMin': return 0.5;
          case 'engineDisplacementMax': return 8.0;
          case 'fuelConsumptionMax': return 20;
          case 'additionalProperties': case 'optionalEquipment': case 'safetyEquipment': return [];
          default: return '';
        }
      })();
      
      setLocalFilters(prev => ({ ...prev, [filterKey]: resetValue }));
    }
  }, [localFilters]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t('meta.pages.advancedSearch')} canonical="/advanced-search" />
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
            
            {/* Vehicle Type Selector */}
            <div className="flex gap-2 mb-6">
              {([
                { id: 'car' as const, label: t('hero.vehicleTypes.cars', 'Cars'), icon: Car },
                { id: 'motorbike' as const, label: t('hero.vehicleTypes.motorbikes', 'Motorbikes'), icon: Bike },
                { id: 'truck' as const, label: t('hero.vehicleTypes.trucks', 'Trucks'), icon: Truck },
              ]).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setLocalFilters(prev => ({ ...prev, vehicleType: id, make: '', model: '', bodyType: '' }))}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-200 ${
                    localFilters.vehicleType === id
                      ? 'bg-black text-white shadow-md'
                      : 'bg-zinc-100 text-gray-600 hover:bg-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

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
                      {carMakes.map((make, idx) => (
                        <React.Fragment key={make}>
                          {idx === activePopularMakes.length && (
                            <SelectSeparator />
                          )}
                          <SelectItem value={make}>{make}</SelectItem>
                        </React.Fragment>
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
                      {(isMotorbike ? MOTORCYCLE_BODY_TYPES : isTruck ? TRUCK_BODY_TYPES : CAR_BODY_TYPES).map(type => (
                        <SelectItem key={type} value={type}>
                          {isMotorbike || isTruck ? type : translateBodyTypeLabel(type)}
                        </SelectItem>
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
              title={getAdvancedSearchText('sections.locationDistance.title', 'Location')}
              sectionKey="location"
              icon={<Car className="h-5 w-5 text-blue-600" />}
              description={getAdvancedSearchText('sections.locationDistance.description', 'Search area and location preferences')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.location', 'City/Zip Code')}</label>
                    <Select value={localFilters.cityZipCode} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, cityZipCode: value === 'any-location' ? '' : value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.cityStateOrZip', 'Enter city or postal code')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any-location">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {municipalities.map(m => (
                          <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

                  {!isMotorbike && !isTruck && (
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
                  )}

                  {!isMotorbike && !isTruck && (
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Врати', 'Dyert', 'Doors')}</label>
                    <Select value={localFilters.numberOfDoors} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, numberOfDoors: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {['2', '3', '4', '5'].map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  )}

                  {/* Number of gears — cars & trucks */}
                  {!isMotorbike && (
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Број на брзини', 'Numri i marsheve', 'Number of Gears')}</label>
                    <Select value={localFilters.numberOfGears} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, numberOfGears: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {GEARS_OPTIONS.map(g => (
                          <SelectItem key={g} value={String(g)}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  )}

                  {/* CO2 Emissions */}
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('CO₂ емисии (g/km)', 'Emetimet CO₂ (g/km)', 'CO₂ Emissions (g/km)')}</label>
                    <Select value={localFilters.co2Emissions} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, co2Emissions: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {['50', '100', '120', '150', '200', '250', '300'].map(v => (
                          <SelectItem key={v} value={v}>≤ {v} g/km</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Тежина (кг)', 'Pesha (kg)', 'Weight (kg)')}</label>
                    <Select value={localFilters.weight} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, weight: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {['500', '750', '1000', '1250', '1500', '1750', '2000', '2500', '3000'].map(v => (
                          <SelectItem key={v} value={v}>≤ {v} kg</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Motorcycle-specific filters */}
                  {isMotorbike && (
                  <>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Возачка категорија', 'Kategoria e patentës', 'License Class')}</label>
                    <Select value={localFilters.licenseClass} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, licenseClass: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {MOTORCYCLE_LICENSE_CLASSES.map(lc => (
                          <SelectItem key={lc} value={lc}>{lc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Цилиндри', 'Cilindrat', 'Cylinders')}</label>
                    <Select value={localFilters.cylinders} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, cylinders: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {MOTORCYCLE_CYLINDER_TYPES.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Ладење', 'Ftohja', 'Cooling Type')}</label>
                    <Select value={localFilters.coolingType} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, coolingType: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {MOTORCYCLE_COOLING_TYPES.map(ct => (
                          <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getSimpleText('Стартер', 'Starteri', 'Starter Type')}</label>
                    <Select value={localFilters.starterType} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, starterType: value }))}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                        {MOTORCYCLE_STARTER_TYPES.map(st => (
                          <SelectItem key={st} value={st}>{st}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  </>
                  )}
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
              <div className="space-y-4">
                {EQUIPMENT_CATEGORIES.map((cat) => {
                  const filterKey: keyof AdvancedSearchFilters = cat.isSafety ? 'safetyEquipment' : 'optionalEquipment';
                  const selected = (localFilters[filterKey] as string[]) ?? [];
                  const toggle = (key: string, checked: boolean) => {
                    const next = checked ? [...selected, key] : selected.filter(v => v !== key);
                    setLocalFilters(prev => ({ ...prev, [filterKey]: next }));
                  };
                  return (
                    <details key={cat.key} open className="rounded-lg border border-border bg-card">
                      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/40 flex items-center justify-between">
                        <span>{EQUIPMENT_CATEGORY_LABELS[equipLang][cat.key]}</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {cat.items.filter(k => selected.includes(k)).length} / {cat.items.length}
                        </span>
                      </summary>
                      <div className="px-4 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {cat.items.map((key) => {
                          const inputId = `advfilter-${cat.key}-${key}`;
                          return (
                            <div key={key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                              <Checkbox
                                id={inputId}
                                checked={selected.includes(key)}
                                onCheckedChange={(checked) => toggle(key, checked as boolean)}
                              />
                              <label htmlFor={inputId} className="text-sm font-medium text-foreground cursor-pointer select-none">
                                {getEquipmentLabel(key, equipLang)}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  );
                })}
              </div>
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
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.interiorColor', 'Боја на ентериер')}</label>
                  <Select value={localFilters.interiorColor} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, interiorColor: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyColor', 'Било која боја')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyColor', 'Било која боја')}</SelectItem>
                      {interiorColors.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.upholstery', 'Тапацирање')}</label>
                  <Select value={localFilters.upholstery} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, upholstery: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.anyMaterial', 'Било кој материјал')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.anyMaterial', 'Било кој материјал')}</SelectItem>
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
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.nonSmokingVehicle', 'Non-smoking Vehicle')}</label>
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

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">
                    {getSimpleText('Тест вожња', 'Provë Drejtimi', 'Test Drive')}
                  </label>
                  <Select value={localFilters.allowTestDrive} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, allowTestDrive: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      <SelectItem value="yes">{getSimpleText('Да', 'Po', 'Yes')}</SelectItem>
                      <SelectItem value="no">{getSimpleText('Не', 'Jo', 'No')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">
                    {getSimpleText('Замена', 'Ndërrimi', 'Trade-In')}
                  </label>
                  <Select value={localFilters.acceptsTradeIn} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, acceptsTradeIn: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      <SelectItem value="yes">{getSimpleText('Да', 'Po', 'Yes')}</SelectItem>
                      <SelectItem value="no">{getSimpleText('Не', 'Jo', 'No')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">
                    {getSimpleText('Цената е по договор', 'Çmimi është i negociueshëm', 'Price Negotiable')}
                  </label>
                  <Select value={localFilters.priceNegotiable} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, priceNegotiable: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      <SelectItem value="yes">{getSimpleText('Да', 'Po', 'Yes')}</SelectItem>
                      <SelectItem value="no">{getSimpleText('Не', 'Jo', 'No')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">
                    {getSimpleText('Брза продажба', 'Shitje e shpejtë', 'Quick Sale')}
                  </label>
                  <Select value={localFilters.quickSale} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, quickSale: value }))}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                      <SelectItem value="yes">{getSimpleText('Да', 'Po', 'Yes')}</SelectItem>
                      <SelectItem value="no">{getSimpleText('Не', 'Jo', 'No')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Engine Technical Specifications */}
            <FilterSection
              title={getAdvancedSearchText('sections.engineTech.title', 'Engine technical specifications')}
              sectionKey="engine-tech"
              icon={<Zap className="h-5 w-5 text-orange-600" />}
              description={getAdvancedSearchText('sections.engineTech.description', 'Advanced engine specifications and technical details')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.engineDisplacementMin', 'Engine displacement from (L)')}</label>
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
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'Од')} />
                      </SelectTrigger>
                      <SelectContent>
                        {engineDisplacementRanges.map(displacement => (
                          <SelectItem key={displacement} value={displacement.toString()}>{displacement.toFixed(1)}L</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.engineDisplacementMax', 'Engine displacement to (L)')}</label>
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
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'До')} />
                      </SelectTrigger>
                      <SelectContent>
                        {engineDisplacementRanges.map(displacement => (
                          <SelectItem key={displacement} value={displacement.toString()}>{displacement.toFixed(1)}L</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </div>
            </FilterSection>

            {/* Environmental */}
            <FilterSection
              title={getAdvancedSearchText('sections.environmental.title', 'Environmental')}
              sectionKey="environmental"
              icon={<Filter className="h-5 w-5 text-emerald-600" />}
              description={getAdvancedSearchText('sections.environmental.description', 'Fuel consumption and emission class')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.fuelConsumptionMin', 'Fuel consumption from (l/100km)')}</label>
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
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.from', 'Од')} />
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
                    <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.fuelConsumptionMax', 'Fuel consumption to (l/100km)')}</label>
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
                        <SelectValue placeholder={getAdvancedSearchText('placeholders.to', 'До')} />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelConsumptionRanges.map(fuel => (
                          <SelectItem key={fuel} value={fuel.toString()}>{fuel} l/100km</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{getAdvancedSearchText('fields.euroEmissionClass', 'Euro Emission Class')}</label>
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
                          {(searchResults.totalCount ?? 0).toLocaleString()}
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
                      <div className="font-semibold text-foreground">{ALL_FEATURE_KEYS.length + ALL_SAFETY_KEYS.length}</div>
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