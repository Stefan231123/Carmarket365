import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  DollarSign,
  Car,
  Filter,
  ChevronDown,
  ChevronUp,
  MapPin,
  Settings,
  Fuel,
  Gauge,
  Calendar,
  Users,
  Shield,
  Zap,
  Music,
  Sun
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface AutoScout24CompleteFilters {
  // Basic Vehicle Information
  make: string;
  model: string;
  bodyTypes: string[];
  
  // Technical Specifications
  fuelTypes: string[];
  firstRegistrationMin: string;
  firstRegistrationMax: string;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  powerMinKW: number;
  powerMaxKW: number;
  powerMinPS: number;
  powerMaxPS: number;
  engineDisplacementMin: number; // ccm
  engineDisplacementMax: number; // ccm
  transmissions: string[];
  driveTypes: string[];
  
  // Vehicle Configuration
  doorsMin: number;
  doorsMax: number;
  seatsMin: number;
  seatsMax: number;
  
  // Seller & Condition
  sellerTypes: string[];
  conditions: string[];
  
  // Colors
  exteriorColors: string[];
  interiorColors: string[];
  upholsteryTypes: string[];
  
  // Safety & Security Features
  safetyFeatures: string[];
  
  // Comfort & Convenience Features
  comfortFeatures: string[];
  
  // Entertainment & Media Features
  entertainmentFeatures: string[];
  
  // Extras & Styling Features
  extrasFeatures: string[];
  
  // Environmental & Efficiency
  emissionClass: string;
  efficiencyClass: string;
  co2EmissionsMax: number;
  fuelConsumptionMax: number;
  
  // Electric Vehicle Specific
  batteryCapacityMin: number; // kWh
  batteryCapacityMax: number; // kWh
  electricRangeMin: number; // km
  electricRangeMax: number; // km
  
  // Location
  countries: string[];
  location: string;
  radius: string;
  
  // Special Filters
  hasWarranty: boolean | null;
  hasInspection: boolean | null;
  hasServiceHistory: boolean | null;
  previousOwnersMax: number;
  hasAccidentHistory: boolean | null;
  
  // Sorting
  sortBy: string;
}

interface AdvancedSearchAutoScout24CompleteProps {
  onSearch: (filters: AutoScout24CompleteFilters) => void;
  onClose?: () => void;
}

export function AdvancedSearchAutoScout24Complete({ onSearch, onClose }: AdvancedSearchAutoScout24CompleteProps) {
  const { t } = useTranslation();
  
  const [filters, setFilters] = useState<AutoScout24CompleteFilters>({
    // Basic Vehicle Information
    make: "",
    model: "",
    bodyTypes: [],
    
    // Technical Specifications
    fuelTypes: [],
    firstRegistrationMin: "",
    firstRegistrationMax: "",
    priceMin: 500,
    priceMax: 100000,
    mileageMin: 0,
    mileageMax: 500000,
    powerMinKW: 0,
    powerMaxKW: 1000,
    powerMinPS: 0,
    powerMaxPS: 1360, // converted from 1000kW
    engineDisplacementMin: 0,
    engineDisplacementMax: 8000,
    transmissions: [],
    driveTypes: [],
    
    // Vehicle Configuration
    doorsMin: 2,
    doorsMax: 6,
    seatsMin: 1,
    seatsMax: 9,
    
    // Seller & Condition
    sellerTypes: [],
    conditions: [],
    
    // Colors
    exteriorColors: [],
    interiorColors: [],
    upholsteryTypes: [],
    
    // Safety & Security Features
    safetyFeatures: [],
    
    // Comfort & Convenience Features
    comfortFeatures: [],
    
    // Entertainment & Media Features
    entertainmentFeatures: [],
    
    // Extras & Styling Features
    extrasFeatures: [],
    
    // Environmental & Efficiency
    emissionClass: "",
    efficiencyClass: "",
    co2EmissionsMax: 300,
    fuelConsumptionMax: 20,
    
    // Electric Vehicle Specific
    batteryCapacityMin: 0,
    batteryCapacityMax: 200,
    electricRangeMin: 0,
    electricRangeMax: 1000,
    
    // Location
    countries: [],
    location: "",
    radius: "",
    
    // Special Filters
    hasWarranty: null,
    hasInspection: null,
    hasServiceHistory: null,
    previousOwnersMax: 10,
    hasAccidentHistory: null,
    
    // Sorting
    sortBy: "bestresults"
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    technical: true,
    configuration: false,
    seller: false,
    colors: false,
    safety: false,
    comfort: false,
    entertainment: false,
    extras: false,
    environmental: false,
    electric: false,
    location: false,
    special: false
  });

  // Complete AutoScout24 data arrays
  const carMakes = [
    "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Opel", "Ford", "Renault", 
    "Peugeot", "Fiat", "Citroen", "Skoda", "SEAT", "Toyota", "Nissan", 
    "Honda", "Mazda", "Hyundai", "Kia", "Volvo", "Jaguar", "Land Rover", 
    "Porsche", "Ferrari", "Lamborghini", "Maserati", "Bentley", "Rolls-Royce",
    "Tesla", "Lexus", "Infiniti", "Acura", "Genesis", "Alfa Romeo", "Lancia",
    "Subaru", "Mitsubishi", "Suzuki", "Dacia", "Mini", "Smart", "Jeep",
    "Chevrolet", "Cadillac", "Buick", "GMC", "Lincoln", "Chrysler", "Dodge",
    "Ram", "Saab", "Maybach", "McLaren", "Aston Martin", "Bugatti", "Koenigsegg"
  ];

  const bodyTypes = [
    "Kleinwagen", // Compact/Small cars
    "SUV/Geländewagen/Pickup", // SUV/Off-Road/Pick-up
    "Transporter", // Commercial vehicles
    "Cabrio", // Convertible
    "Van/Kleinbus", // Vans
    "Limousine", // Sedan
    "Kombi", // Station Wagon/Estate
    "Coupé", // Coupe
    "Andere" // Other
  ];

  const fuelTypes = [
    "Benzin", // Gasoline/Petrol
    "Diesel",
    "Elektro", // Electric
    "Hybrid (Benzin/Elektro)", // Hybrid (Electric/Gasoline)
    "Hybrid (Diesel/Elektro)", // Hybrid (Electric/Diesel)
    "Autogas (LPG)", // LPG (Liquefied Petroleum Gas)
    "Erdgas (CNG)", // CNG (Compressed Natural Gas)
    "Wasserstoff", // Hydrogen
    "Ethanol",
    "Andere" // Others
  ];

  const transmissions = [
    "Schaltgetriebe", // Manual
    "Automatik", // Automatic
    "Halbautomatik" // Semi-automatic
  ];

  const driveTypes = [
    "Vorderradantrieb", // Front-wheel drive
    "Hinterradantrieb", // Rear-wheel drive
    "Allradantrieb" // All-wheel drive/4WD
  ];

  const sellerTypes = [
    "Händler", // Dealer
    "Privat" // Private
  ];

  const conditions = [
    "Neu", // New
    "Gebraucht", // Used
    "Jahreswagen", // Employee's car
    "Oldtimer", // Antique/Classic
    "Vorführwagen", // Demonstration
    "Neufahrzeug" // Pre-registered
  ];

  const exteriorColors = [
    "Schwarz", "Weiß", "Silber", "Grau", "Blau", "Rot", "Grün", "Braun", 
    "Gelb", "Orange", "Violett", "Gold", "Beige", "Bronze"
  ];

  const interiorColors = [
    "Schwarz", "Beige", "Braun", "Grau", "Rot", "Blau", "Weiß", "Andere"
  ];

  const upholsteryTypes = [
    "Stoff", // Fabric
    "Volleder", // Full leather
    "Teilleder", // Part leather
    "Alcantara",
    "Andere" // Other
  ];

  const countries = [
    "Deutschland", "Österreich", "Italien", "Belgien", "Niederlande", 
    "Spanien", "Luxemburg", "Frankreich", "Schweiz", "Tschechien",
    "Polen", "Dänemark", "Schweden", "Norwegen", "Finnland"
  ];

  const emissionClasses = [
    "Euro 6", "Euro 5", "Euro 4", "Euro 3", "Euro 2", "Euro 1", "Ohne Angabe"
  ];

  const efficiencyClasses = [
    "A+++", "A++", "A+", "A", "B", "C", "D", "E", "F", "G"
  ];

  // Comprehensive Equipment Categories - Exactly from AutoScout24
  const safetyFeatures = [
    "ABS", "ESP", "Fahrerairbag", "Beifahrerairbag", "Seitenairbags", 
    "Kopfairbags", "ISOFIX", "Zentralverriegelung", "Funk-Zentralverriegelung",
    "Alarmanlage", "Reifendruckkontrolle", "Notbremsassistent", 
    "Xenon-/LED-Scheinwerfer", "Antriebsschlupfregelung", "Tagfahrlicht",
    "Adaptive Scheinwerfer", "Totwinkel-Assistent", "Spurhalteassistent",
    "Verkehrszeichenerkennung", "Nachtsicht-Assistent", "Head-up Display",
    "Überrollbügel", "Stabilitätskontrolle", "Bremsassistent"
  ];

  const comfortFeatures = [
    "Klimaanlage", "Klimaautomatik", "Tempomat", "Servolenkung", 
    "elektr. Fensterheber", "elektr. verstellbare Sitze", "Sitzheizung",
    "Ledersitze", "Navigationssystem", "Einparkhilfe hinten", "Einparkhilfe vorne",
    "Rückfahrkamera", "Keyless Go", "Start/Stopp-Automatik", "Panoramadach",
    "Schiebedach", "Regensensor", "Lichtsensor", "Lordosenstütze",
    "Armlehne", "Multifunktionslenkrad", "Lederlenkrad", "Lenksäulenverstellung",
    "Lenkradheizung", "Sitzbelüftung", "Massagesitze", "Memorysitze",
    "Standheizung", "Klimazonen-Automatik", "Luftfederung", "Adaptive Dämpfer"
  ];

  const entertainmentFeatures = [
    "Radio", "CD-Spieler", "Bluetooth", "USB-Anschluss", "Touchscreen",
    "Bordcomputer", "Sound-System", "Premium Sound-System", "Freisprecheinrichtung",
    "CD-Wechsler", "MP3-Schnittstelle", "Aux-In", "Apple CarPlay", "Android Auto",
    "DAB+ Radio", "Digitalradio", "TV", "DVD-Player", "Internet",
    "WLAN / WiFi", "Induktives Laden", "Sprachsteuerung"
  ];

  const extrasFeatures = [
    "Alufelgen", "Sportpaket", "Sportsitze", "Sportfahrwerk", 
    "Schaltwippen", "getönte Scheiben", "Skisack", "Anhängerkupplung",
    "Dachträger", "automatisch abblendbare Außenspiegel", 
    "Scheinwerfer-Reinigungsanlage", "Metallic-Lackierung", "Perleffekt-Lackierung",
    "Chrompaket", "Sportauspuff", "Tuning", "Breitbereifung", "Winterreifen",
    "Ganzjahresreifen", "Reserverad", "Panoramaglas", "Privacy-Verglasung",
    "Elektrische Heckklappe", "Hands-free Heckklappe", "Dachantenne",
    "Ambiente-Beleuchtung", "Einstiegsleisten", "Schwellerpaket"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, i) => (currentYear - i).toString());

  // Handler functions
  const handleMultiSelectChange = (
    filterKey: keyof Pick<AutoScout24CompleteFilters, 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'driveTypes' | 'sellerTypes' | 'conditions' | 'exteriorColors' | 'interiorColors' | 'upholsteryTypes' | 'safetyFeatures' | 'comfortFeatures' | 'entertainmentFeatures' | 'extrasFeatures' | 'countries'>,
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => {
      const currentArray = prev[filterKey] as string[];
      if (checked) {
        return { ...prev, [filterKey]: [...currentArray, value] };
      } else {
        return { ...prev, [filterKey]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleRangeChange = (
    minKey: keyof AutoScout24CompleteFilters,
    maxKey: keyof AutoScout24CompleteFilters,
    values: number[]
  ) => {
    setFilters(prev => ({
      ...prev,
      [minKey]: values[0],
      [maxKey]: values[1]
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      make: "",
      model: "",
      bodyTypes: [],
      fuelTypes: [],
      firstRegistrationMin: "",
      firstRegistrationMax: "",
      priceMin: 500,
      priceMax: 100000,
      mileageMin: 0,
      mileageMax: 500000,
      powerMinKW: 0,
      powerMaxKW: 1000,
      powerMinPS: 0,
      powerMaxPS: 1360,
      engineDisplacementMin: 0,
      engineDisplacementMax: 8000,
      transmissions: [],
      driveTypes: [],
      doorsMin: 2,
      doorsMax: 6,
      seatsMin: 1,
      seatsMax: 9,
      sellerTypes: [],
      conditions: [],
      exteriorColors: [],
      interiorColors: [],
      upholsteryTypes: [],
      safetyFeatures: [],
      comfortFeatures: [],
      entertainmentFeatures: [],
      extrasFeatures: [],
      emissionClass: "",
      efficiencyClass: "",
      co2EmissionsMax: 300,
      fuelConsumptionMax: 20,
      batteryCapacityMin: 0,
      batteryCapacityMax: 200,
      electricRangeMin: 0,
      electricRangeMax: 1000,
      countries: [],
      location: "",
      radius: "",
      hasWarranty: null,
      hasInspection: null,
      hasServiceHistory: null,
      previousOwnersMax: 10,
      hasAccidentHistory: null,
      sortBy: "bestresults"
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.make) count++;
    if (filters.model) count++;
    if (filters.bodyTypes.length > 0) count++;
    if (filters.fuelTypes.length > 0) count++;
    if (filters.firstRegistrationMin || filters.firstRegistrationMax) count++;
    if (filters.priceMin > 500 || filters.priceMax < 100000) count++;
    if (filters.mileageMin > 0 || filters.mileageMax < 500000) count++;
    if (filters.powerMinKW > 0 || filters.powerMaxKW < 1000) count++;
    if (filters.engineDisplacementMin > 0 || filters.engineDisplacementMax < 8000) count++;
    if (filters.transmissions.length > 0) count++;
    if (filters.driveTypes.length > 0) count++;
    if (filters.doorsMin > 2 || filters.doorsMax < 6) count++;
    if (filters.seatsMin > 1 || filters.seatsMax < 9) count++;
    if (filters.sellerTypes.length > 0) count++;
    if (filters.conditions.length > 0) count++;
    if (filters.exteriorColors.length > 0) count++;
    if (filters.interiorColors.length > 0) count++;
    if (filters.upholsteryTypes.length > 0) count++;
    if (filters.safetyFeatures.length > 0) count++;
    if (filters.comfortFeatures.length > 0) count++;
    if (filters.entertainmentFeatures.length > 0) count++;
    if (filters.extrasFeatures.length > 0) count++;
    if (filters.emissionClass) count++;
    if (filters.efficiencyClass) count++;
    if (filters.co2EmissionsMax < 300) count++;
    if (filters.fuelConsumptionMax < 20) count++;
    if (filters.batteryCapacityMin > 0 || filters.batteryCapacityMax < 200) count++;
    if (filters.electricRangeMin > 0 || filters.electricRangeMax < 1000) count++;
    if (filters.countries.length > 0) count++;
    if (filters.location) count++;
    if (filters.radius) count++;
    if (filters.hasWarranty !== null) count++;
    if (filters.hasInspection !== null) count++;
    if (filters.hasServiceHistory !== null) count++;
    if (filters.previousOwnersMax < 10) count++;
    if (filters.hasAccidentHistory !== null) count++;
    return count;
  };

  const FilterSection = ({ title, sectionKey, icon, children }: { 
    title: string; 
    sectionKey: string; 
    icon: React.ReactNode;
    children: React.ReactNode 
  }) => (
    <Card className="mb-3 border-gray-200">
      <CardHeader 
        className="cursor-pointer py-3 px-4 border-b hover:bg-gray-50 transition-colors"
        onClick={() => toggleSection(sectionKey)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
          </div>
          {expandedSections[sectionKey] ? 
            <ChevronUp className="h-4 w-4 text-gray-500" /> : 
            <ChevronDown className="h-4 w-4 text-gray-500" />
          }
        </div>
      </CardHeader>
      {expandedSections[sectionKey] && (
        <CardContent className="p-4 bg-gray-50">
          {children}
        </CardContent>
      )}
    </Card>
  );

  const CheckboxGroup = ({ 
    options, 
    selectedValues, 
    filterKey, 
    columns = 2 
  }: { 
    options: string[]; 
    selectedValues: string[]; 
    filterKey: keyof Pick<AutoScout24CompleteFilters, 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'driveTypes' | 'sellerTypes' | 'conditions' | 'exteriorColors' | 'interiorColors' | 'upholsteryTypes' | 'safetyFeatures' | 'comfortFeatures' | 'entertainmentFeatures' | 'extrasFeatures' | 'countries'>;
    columns?: number;
  }) => (
    <div className={`grid grid-cols-${columns} gap-2`}>
      {options.map(option => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={`${filterKey}-${option}`}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => 
              handleMultiSelectChange(filterKey, option, checked as boolean)
            }
          />
          <label
            htmlFor={`${filterKey}-${option}`}
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Erweiterte Suche - AutoScout24</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2 bg-white text-blue-600">
                {getActiveFiltersCount()} Filter
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={clearAllFilters} className="bg-white text-blue-600 border-white hover:bg-gray-100">
              Alle Filter löschen
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Left sidebar with filters */}
          <div className="w-96 border-r max-h-[calc(95vh-80px)] overflow-y-auto p-4 bg-gray-50">
            
            {/* Basic Vehicle Information */}
            <FilterSection title="Fahrzeug" sectionKey="basic" icon={<Car className="h-4 w-4" />}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">Marke</label>
                  <Select value={filters.make} onValueChange={(value) => setFilters(prev => ({ ...prev, make: value }))}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Alle Marken" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alle">Alle Marken</SelectItem>
                      {carMakes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">Modell</label>
                  <Input
                    placeholder="Alle Modelle"
                    value={filters.model}
                    onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                    className="h-8 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Fahrzeugtyp</label>
                  <CheckboxGroup
                    options={bodyTypes}
                    selectedValues={filters.bodyTypes}
                    filterKey="bodyTypes"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Technical Specifications */}
            <FilterSection title="Technische Daten" sectionKey="technical" icon={<Settings className="h-4 w-4" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Kraftstoff</label>
                  <CheckboxGroup
                    options={fuelTypes}
                    selectedValues={filters.fuelTypes}
                    filterKey="fuelTypes"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Erstzulassung</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={filters.firstRegistrationMin} onValueChange={(value) => setFilters(prev => ({ ...prev, firstRegistrationMin: value }))}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="von" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beliebig">Beliebig</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filters.firstRegistrationMax} onValueChange={(value) => setFilters(prev => ({ ...prev, firstRegistrationMax: value }))}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="bis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beliebig">Beliebig</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Preis: €{filters.priceMin.toLocaleString()} - €{filters.priceMax.toLocaleString()}
                  </label>
                  <Slider
                    min={500}
                    max={100000}
                    step={500}
                    value={[filters.priceMin, filters.priceMax]}
                    onValueChange={(values) => handleRangeChange('priceMin', 'priceMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Kilometerstand: {filters.mileageMin.toLocaleString()} - {filters.mileageMax.toLocaleString()} km
                  </label>
                  <Slider
                    min={0}
                    max={500000}
                    step={5000}
                    value={[filters.mileageMin, filters.mileageMax]}
                    onValueChange={(values) => handleRangeChange('mileageMin', 'mileageMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Leistung: {filters.powerMinKW} - {filters.powerMaxKW} kW ({filters.powerMinPS} - {filters.powerMaxPS} PS)
                  </label>
                  <Slider
                    min={0}
                    max={1000}
                    step={5}
                    value={[filters.powerMinKW, filters.powerMaxKW]}
                    onValueChange={(values) => {
                      handleRangeChange('powerMinKW', 'powerMaxKW', values);
                      // Convert kW to PS (1 kW = 1.36 PS)
                      setFilters(prev => ({
                        ...prev,
                        powerMinPS: Math.round(values[0] * 1.36),
                        powerMaxPS: Math.round(values[1] * 1.36)
                      }));
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Hubraum: {filters.engineDisplacementMin} - {filters.engineDisplacementMax} ccm
                  </label>
                  <Slider
                    min={0}
                    max={8000}
                    step={100}
                    value={[filters.engineDisplacementMin, filters.engineDisplacementMax]}
                    onValueChange={(values) => handleRangeChange('engineDisplacementMin', 'engineDisplacementMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Getriebe</label>
                  <CheckboxGroup
                    options={transmissions}
                    selectedValues={filters.transmissions}
                    filterKey="transmissions"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Antrieb</label>
                  <CheckboxGroup
                    options={driveTypes}
                    selectedValues={filters.driveTypes}
                    filterKey="driveTypes"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Vehicle Configuration */}
            <FilterSection title="Konfiguration" sectionKey="configuration" icon={<Users className="h-4 w-4" />}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Türen: {filters.doorsMin} - {filters.doorsMax}
                  </label>
                  <Slider
                    min={2}
                    max={6}
                    step={1}
                    value={[filters.doorsMin, filters.doorsMax]}
                    onValueChange={(values) => handleRangeChange('doorsMin', 'doorsMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Sitze: {filters.seatsMin} - {filters.seatsMax}
                  </label>
                  <Slider
                    min={1}
                    max={9}
                    step={1}
                    value={[filters.seatsMin, filters.seatsMax]}
                    onValueChange={(values) => handleRangeChange('seatsMin', 'seatsMax', values)}
                    className="w-full"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Seller & Condition */}
            <FilterSection title="Anbieter & Zustand" sectionKey="seller" icon={<Badge className="h-4 w-4" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Anbieter</label>
                  <CheckboxGroup
                    options={sellerTypes}
                    selectedValues={filters.sellerTypes}
                    filterKey="sellerTypes"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Fahrzeugzustand</label>
                  <CheckboxGroup
                    options={conditions}
                    selectedValues={filters.conditions}
                    filterKey="conditions"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Colors & Design */}
            <FilterSection title="Farbe & Design" sectionKey="colors" icon={<Sun className="h-4 w-4" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Außenfarbe</label>
                  <CheckboxGroup
                    options={exteriorColors}
                    selectedValues={filters.exteriorColors}
                    filterKey="exteriorColors"
                    columns={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Innenfarbe</label>
                  <CheckboxGroup
                    options={interiorColors}
                    selectedValues={filters.interiorColors}
                    filterKey="interiorColors"
                    columns={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Polsterung</label>
                  <CheckboxGroup
                    options={upholsteryTypes}
                    selectedValues={filters.upholsteryTypes}
                    filterKey="upholsteryTypes"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Safety & Security */}
            <FilterSection title="Sicherheit" sectionKey="safety" icon={<Shield className="h-4 w-4" />}>
              <div className="space-y-2">
                <CheckboxGroup
                  options={safetyFeatures}
                  selectedValues={filters.safetyFeatures}
                  filterKey="safetyFeatures"
                  columns={1}
                />
              </div>
            </FilterSection>

            {/* Comfort & Convenience */}
            <FilterSection title="Komfort" sectionKey="comfort" icon={<Settings className="h-4 w-4" />}>
              <div className="space-y-2">
                <CheckboxGroup
                  options={comfortFeatures}
                  selectedValues={filters.comfortFeatures}
                  filterKey="comfortFeatures"
                  columns={1}
                />
              </div>
            </FilterSection>

            {/* Entertainment & Media */}
            <FilterSection title="Entertainment" sectionKey="entertainment" icon={<Music className="h-4 w-4" />}>
              <div className="space-y-2">
                <CheckboxGroup
                  options={entertainmentFeatures}
                  selectedValues={filters.entertainmentFeatures}
                  filterKey="entertainmentFeatures"
                  columns={1}
                />
              </div>
            </FilterSection>

            {/* Extras & Styling */}
            <FilterSection title="Extras" sectionKey="extras" icon={<Car className="h-4 w-4" />}>
              <div className="space-y-2">
                <CheckboxGroup
                  options={extrasFeatures}
                  selectedValues={filters.extrasFeatures}
                  filterKey="extrasFeatures"
                  columns={1}
                />
              </div>
            </FilterSection>

            {/* Environmental & Efficiency */}
            <FilterSection title="Umwelt & Effizienz" sectionKey="environmental" icon={<Gauge className="h-4 w-4" />}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">Schadstoffklasse</label>
                  <Select value={filters.emissionClass} onValueChange={(value) => setFilters(prev => ({ ...prev, emissionClass: value }))}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Beliebig" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beliebig">Beliebig</SelectItem>
                      {emissionClasses.map(ec => (
                        <SelectItem key={ec} value={ec}>{ec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">Effizienzklasse</label>
                  <Select value={filters.efficiencyClass} onValueChange={(value) => setFilters(prev => ({ ...prev, efficiencyClass: value }))}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Beliebig" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beliebig">Beliebig</SelectItem>
                      {efficiencyClasses.map(ec => (
                        <SelectItem key={ec} value={ec}>{ec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    CO₂-Emission: max. {filters.co2EmissionsMax} g/km
                  </label>
                  <Slider
                    min={0}
                    max={300}
                    step={5}
                    value={[filters.co2EmissionsMax]}
                    onValueChange={(values) => setFilters(prev => ({ ...prev, co2EmissionsMax: values[0] }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Verbrauch: max. {filters.fuelConsumptionMax} l/100km
                  </label>
                  <Slider
                    min={0}
                    max={20}
                    step={0.5}
                    value={[filters.fuelConsumptionMax]}
                    onValueChange={(values) => setFilters(prev => ({ ...prev, fuelConsumptionMax: values[0] }))}
                    className="w-full"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Electric Vehicle Specific */}
            <FilterSection title="Elektrofahrzeug" sectionKey="electric" icon={<Zap className="h-4 w-4" />}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Batteriekapazität: {filters.batteryCapacityMin} - {filters.batteryCapacityMax} kWh
                  </label>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={[filters.batteryCapacityMin, filters.batteryCapacityMax]}
                    onValueChange={(values) => handleRangeChange('batteryCapacityMin', 'batteryCapacityMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Reichweite: {filters.electricRangeMin} - {filters.electricRangeMax} km
                  </label>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.electricRangeMin, filters.electricRangeMax]}
                    onValueChange={(values) => handleRangeChange('electricRangeMin', 'electricRangeMax', values)}
                    className="w-full"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection title="Standort" sectionKey="location" icon={<MapPin className="h-4 w-4" />}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">Ort/PLZ</label>
                  <Input
                    placeholder="Ort oder Postleitzahl eingeben"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="h-8 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600">Umkreis</label>
                  <Select value={filters.radius} onValueChange={(value) => setFilters(prev => ({ ...prev, radius: value }))}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Bundesweit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bundesweit">Bundesweit</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                      <SelectItem value="100">100 km</SelectItem>
                      <SelectItem value="200">200 km</SelectItem>
                      <SelectItem value="500">500 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">Länder</label>
                  <CheckboxGroup
                    options={countries}
                    selectedValues={filters.countries}
                    filterKey="countries"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Special Filters */}
            <FilterSection title="Besondere Merkmale" sectionKey="special" icon={<Settings className="h-4 w-4" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2 text-gray-600">
                    Max. Vorbesitzer: {filters.previousOwnersMax}
                  </label>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[filters.previousOwnersMax]}
                    onValueChange={(values) => setFilters(prev => ({ ...prev, previousOwnersMax: values[0] }))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="warranty"
                      checked={filters.hasWarranty === true}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, hasWarranty: checked ? true : null }))
                      }
                    />
                    <label htmlFor="warranty" className="text-xs cursor-pointer">Mit Garantie</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inspection"
                      checked={filters.hasInspection === true}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, hasInspection: checked ? true : null }))
                      }
                    />
                    <label htmlFor="inspection" className="text-xs cursor-pointer">TÜV neu</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="service"
                      checked={filters.hasServiceHistory === true}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, hasServiceHistory: checked ? true : null }))
                      }
                    />
                    <label htmlFor="service" className="text-xs cursor-pointer">Scheckheftgepflegt</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="no-accident"
                      checked={filters.hasAccidentHistory === false}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, hasAccidentHistory: checked ? false : null }))
                      }
                    />
                    <label htmlFor="no-accident" className="text-xs cursor-pointer">Unfallfrei</label>
                  </div>
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-6 bg-white">
            <div className="text-center py-16">
              <Car className="h-20 w-20 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">AutoScout24 Erweiterte Suche</h3>
              <p className="text-gray-600 mb-6">
                Konfigurieren Sie Ihre Suchfilter links, um das perfekte Fahrzeug zu finden.
                Sie haben {getActiveFiltersCount()} aktive Filter.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sortierung</label>
                  <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                    <SelectTrigger className="w-64 mx-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bestresults">Beste Ergebnisse</SelectItem>
                      <SelectItem value="price-asc">Preis: Niedrig zu Hoch</SelectItem>
                      <SelectItem value="price-desc">Preis: Hoch zu Niedrig</SelectItem>
                      <SelectItem value="year-desc">Baujahr: Neuste zuerst</SelectItem>
                      <SelectItem value="year-asc">Baujahr: Älteste zuerst</SelectItem>
                      <SelectItem value="mileage-asc">Kilometerstand: Niedrig zu Hoch</SelectItem>
                      <SelectItem value="mileage-desc">Kilometerstand: Hoch zu Niedrig</SelectItem>
                      <SelectItem value="power-desc">Leistung: Hoch zu Niedrig</SelectItem>
                      <SelectItem value="latest">Neueste Anzeigen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="border-t p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {getActiveFiltersCount() > 0 && (
                <span>{getActiveFiltersCount()} Filter angewandt</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
              <Button 
                onClick={() => onSearch(filters)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Fahrzeuge suchen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { AutoScout24CompleteFilters };