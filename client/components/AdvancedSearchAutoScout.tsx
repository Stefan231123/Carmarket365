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
  ChevronUp
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface AutoScoutFilters {
  // Basic Specifications
  make: string;
  model: string;
  bodyTypes: string[];
  
  // Powertrain & Performance
  fuelTypes: string[];
  yearMin: string;
  yearMax: string;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  powerMin: number; // kW
  powerMax: number; // kW
  transmissions: string[];
  
  // Vehicle Configuration
  doorsMin: number;
  doorsMax: number;
  seatsMin: number;
  seatsMax: number;
  
  // Seller & Condition
  sellerTypes: string[];
  conditions: string[];
  
  // Equipment & Features
  features: string[];
  
  // Exterior & Interior
  exteriorColors: string[];
  paintworkTypes: string[];
  interiorColors: string[];
  upholsteryTypes: string[];
  
  // Additional
  previousOwnersMax: number;
  hasAccidentHistory: boolean | null;
  guaranteeOptions: string[];
  emissionClass: string;
  emissionLabel: string;
  
  // Location
  location: string;
  radius: string;
  countries: string[];
  
  // Sorting
  sortBy: string;
}

interface AdvancedSearchAutoScoutProps {
  onSearch: (filters: AutoScoutFilters) => void;
  onClose?: () => void;
}

export function AdvancedSearchAutoScout({ onSearch, onClose }: AdvancedSearchAutoScoutProps) {
  const { t } = useTranslation();
  
  const [filters, setFilters] = useState<AutoScoutFilters>({
    make: "",
    model: "",
    bodyTypes: [],
    fuelTypes: [],
    yearMin: "",
    yearMax: "",
    priceMin: 0,
    priceMax: 200000,
    mileageMin: 0,
    mileageMax: 300000,
    powerMin: 0,
    powerMax: 1000,
    transmissions: [],
    doorsMin: 2,
    doorsMax: 5,
    seatsMin: 2,
    seatsMax: 9,
    sellerTypes: [],
    conditions: [],
    features: [],
    exteriorColors: [],
    paintworkTypes: [],
    interiorColors: [],
    upholsteryTypes: [],
    previousOwnersMax: 10,
    hasAccidentHistory: null,
    guaranteeOptions: [],
    emissionClass: "",
    emissionLabel: "",
    location: "",
    radius: "",
    countries: [],
    sortBy: "standard"
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    powertrain: true,
    configuration: false,
    seller: false,
    features: false,
    exterior: false,
    additional: false,
    location: false
  });

  // AutoScout24 exact filter options
  const carMakes = [
    "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Opel", "Ford", "Renault", 
    "Peugeot", "Fiat", "Citroen", "Skoda", "SEAT", "Toyota", "Nissan", 
    "Honda", "Mazda", "Hyundai", "Kia", "Volvo", "Jaguar", "Land Rover", 
    "Porsche", "Ferrari", "Lamborghini", "Maserati", "Bentley", "Rolls-Royce",
    "Tesla", "Lexus", "Infiniti", "Acura", "Genesis", "Alfa Romeo", "Lancia",
    "Subaru", "Mitsubishi", "Suzuki", "Dacia", "Mini", "Smart", "Jeep"
  ];

  const bodyTypes = [
    "Compact", "Convertible", "Coupe", "SUV/Off-Road/Pick-up", 
    "Station wagon", "Sedans", "Van", "Transporter", "Other"
  ];

  const fuelTypes = [
    "Hybrid (Electric/Gasoline)", "Hybrid (Electric/Diesel)", 
    "Gasoline", "CNG", "Diesel", "Electric", "Hydrogen", "LPG", "Ethanol", "Others"
  ];

  const transmissions = ["Automatic", "Manual", "Semi-automatic"];

  const sellerTypes = ["Dealer", "Private"];

  const conditions = ["New", "Used", "Employee's car", "Antique/Classic", "Demonstration", "Pre-registered"];

  const exteriorColors = [
    "Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Brown", 
    "Gold", "Orange", "Purple", "Yellow", "Beige", "Bronze"
  ];

  const paintworkTypes = ["Metallic", "Pearl", "Matt", "Other"];

  const interiorColors = ["Black", "Gray", "Beige", "Brown", "Red", "Blue", "White", "Other"];

  const upholsteryTypes = ["Fabric", "Full leather", "Part leather", "Alcantara", "Other"];

  const countries = ["Germany", "Austria", "Italy", "Belgium", "Netherlands", "Spain", "Luxembourg", "France"];

  const emissionClasses = ["Euro 6", "Euro 5", "Euro 4", "Euro 3", "Euro 2", "Euro 1"];

  const emissionLabels = ["Green (4)", "Yellow (3)", "Orange (2)", "Red (1)", "No badge"];

  const guaranteeOptions = ["Manufacturer guarantee", "Dealer guarantee", "No guarantee"];
  
  // AutoScout24 comprehensive features list organized by category
  const featureCategories = {
    "Drivetrain & Performance": [
      "4WD", "All-wheel drive", "Sport suspension", "Adaptive suspension"
    ],
    "Safety & Driver Assistance": [
      "ABS", "ESP", "Adaptive Cruise Control", "Parking sensors", "Parking assist", 
      "Blind spot monitoring", "Lane departure warning", "Emergency brake assist",
      "Traffic sign recognition", "360° camera", "Head-up display", "Night vision"
    ],
    "Comfort & Convenience": [
      "Air conditioning", "Automatic climate control", "Multi-zone climate control",
      "Heated seats", "Ventilated seats", "Massage seats", "Electric seats", 
      "Seat memory", "Heated steering wheel", "Keyless entry", "Keyless start",
      "Remote engine start", "Cruise control", "Power windows", "Electric mirrors"
    ],
    "Interior & Technology": [
      "Navigation system", "Bluetooth", "Apple CarPlay", "Android Auto", 
      "Wireless charging", "USB ports", "Premium audio system", "Sound system",
      "Digital cockpit", "Ambient lighting", "Panoramic roof", "Sunroof",
      "Leather upholstery", "Alcantara upholstery", "Sports seats"
    ],
    "Exterior": [
      "Alloy wheels", "Xenon headlights", "LED headlights", "LED daytime running lights",
      "Adaptive headlights", "Fog lights", "Tinted windows", "Electric tailgate",
      "Roof rails", "Tow bar", "Metallic paint", "Sport package"
    ]
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  // Handler functions
  const handleMultiSelectChange = (
    filterKey: keyof Pick<AutoScoutFilters, 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'sellerTypes' | 'conditions' | 'features' | 'exteriorColors' | 'paintworkTypes' | 'interiorColors' | 'upholsteryTypes' | 'guaranteeOptions' | 'countries'>,
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
    minKey: keyof AutoScoutFilters,
    maxKey: keyof AutoScoutFilters,
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
      yearMin: "",
      yearMax: "",
      priceMin: 0,
      priceMax: 200000,
      mileageMin: 0,
      mileageMax: 300000,
      powerMin: 0,
      powerMax: 1000,
      transmissions: [],
      doorsMin: 2,
      doorsMax: 5,
      seatsMin: 2,
      seatsMax: 9,
      sellerTypes: [],
      conditions: [],
      features: [],
      exteriorColors: [],
      paintworkTypes: [],
      interiorColors: [],
      upholsteryTypes: [],
      previousOwnersMax: 10,
      hasAccidentHistory: null,
      guaranteeOptions: [],
      emissionClass: "",
      emissionLabel: "",
      location: "",
      radius: "",
      countries: [],
      sortBy: "standard"
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.make) count++;
    if (filters.model) count++;
    if (filters.bodyTypes.length > 0) count++;
    if (filters.fuelTypes.length > 0) count++;
    if (filters.yearMin || filters.yearMax) count++;
    if (filters.priceMin > 0 || filters.priceMax < 200000) count++;
    if (filters.mileageMin > 0 || filters.mileageMax < 300000) count++;
    if (filters.powerMin > 0 || filters.powerMax < 1000) count++;
    if (filters.transmissions.length > 0) count++;
    if (filters.doorsMin > 2 || filters.doorsMax < 5) count++;
    if (filters.seatsMin > 2 || filters.seatsMax < 9) count++;
    if (filters.sellerTypes.length > 0) count++;
    if (filters.conditions.length > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.exteriorColors.length > 0) count++;
    if (filters.paintworkTypes.length > 0) count++;
    if (filters.interiorColors.length > 0) count++;
    if (filters.upholsteryTypes.length > 0) count++;
    if (filters.previousOwnersMax < 10) count++;
    if (filters.hasAccidentHistory !== null) count++;
    if (filters.guaranteeOptions.length > 0) count++;
    if (filters.emissionClass) count++;
    if (filters.emissionLabel) count++;
    if (filters.location) count++;
    if (filters.radius) count++;
    if (filters.countries.length > 0) count++;
    return count;
  };

  const FilterSection = ({ title, sectionKey, children }: { title: string; sectionKey: string; children: React.ReactNode }) => (
    <Card className="mb-4">
      <CardHeader 
        className="cursor-pointer py-3 px-4 border-b hover:bg-gray-50"
        onClick={() => toggleSection(sectionKey)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {expandedSections[sectionKey] ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
          }
        </div>
      </CardHeader>
      {expandedSections[sectionKey] && (
        <CardContent className="p-4">
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
    filterKey: keyof Pick<AutoScoutFilters, 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'sellerTypes' | 'conditions' | 'features' | 'exteriorColors' | 'paintworkTypes' | 'interiorColors' | 'upholsteryTypes' | 'guaranteeOptions' | 'countries'>;
    columns?: number;
  }) => (
    <div className={`grid grid-cols-${columns} gap-3`}>
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
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Advanced Search Filters</h2>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={clearAllFilters}>
              Clear All
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar with filters */}
          <div className="w-80 border-r max-h-[calc(90vh-140px)] overflow-y-auto p-4">
            
            {/* Basic Specifications */}
            <FilterSection title="Basic Specifications" sectionKey="basic">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Make</label>
                  <Select value={filters.make} onValueChange={(value) => setFilters(prev => ({ ...prev, make: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Make</SelectItem>
                      {carMakes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <Input
                    placeholder="Any Model"
                    value={filters.model}
                    onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Body Type</label>
                  <CheckboxGroup
                    options={bodyTypes}
                    selectedValues={filters.bodyTypes}
                    filterKey="bodyTypes"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Powertrain & Performance */}
            <FilterSection title="Powertrain & Performance" sectionKey="powertrain">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Fuel Type</label>
                  <CheckboxGroup
                    options={fuelTypes}
                    selectedValues={filters.fuelTypes}
                    filterKey="fuelTypes"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">First Registration</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={filters.yearMin} onValueChange={(value) => setFilters(prev => ({ ...prev, yearMin: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="From" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filters.yearMax} onValueChange={(value) => setFilters(prev => ({ ...prev, yearMax: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Price: €{filters.priceMin.toLocaleString()} - €{filters.priceMax.toLocaleString()}
                  </label>
                  <Slider
                    min={0}
                    max={200000}
                    step={1000}
                    value={[filters.priceMin, filters.priceMax]}
                    onValueChange={(values) => handleRangeChange('priceMin', 'priceMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Mileage: {filters.mileageMin.toLocaleString()} - {filters.mileageMax.toLocaleString()} km
                  </label>
                  <Slider
                    min={0}
                    max={300000}
                    step={5000}
                    value={[filters.mileageMin, filters.mileageMax]}
                    onValueChange={(values) => handleRangeChange('mileageMin', 'mileageMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Power: {filters.powerMin} - {filters.powerMax} kW
                  </label>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.powerMin, filters.powerMax]}
                    onValueChange={(values) => handleRangeChange('powerMin', 'powerMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Transmission</label>
                  <CheckboxGroup
                    options={transmissions}
                    selectedValues={filters.transmissions}
                    filterKey="transmissions"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Vehicle Configuration */}
            <FilterSection title="Vehicle Configuration" sectionKey="configuration">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Number of Doors: {filters.doorsMin} - {filters.doorsMax}
                  </label>
                  <Slider
                    min={2}
                    max={5}
                    step={1}
                    value={[filters.doorsMin, filters.doorsMax]}
                    onValueChange={(values) => handleRangeChange('doorsMin', 'doorsMax', values)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Number of Seats: {filters.seatsMin} - {filters.seatsMax}
                  </label>
                  <Slider
                    min={2}
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
            <FilterSection title="Seller & Condition" sectionKey="seller">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Seller Type</label>
                  <CheckboxGroup
                    options={sellerTypes}
                    selectedValues={filters.sellerTypes}
                    filterKey="sellerTypes"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Vehicle Condition</label>
                  <CheckboxGroup
                    options={conditions}
                    selectedValues={filters.conditions}
                    filterKey="conditions"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Equipment & Features */}
            <FilterSection title="Equipment & Features" sectionKey="features">
              <div className="space-y-6">
                {Object.entries(featureCategories).map(([category, categoryFeatures]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium mb-3 text-gray-700">{category}</h4>
                    <CheckboxGroup
                      options={categoryFeatures}
                      selectedValues={filters.features}
                      filterKey="features"
                      columns={1}
                    />
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Exterior & Interior */}
            <FilterSection title="Exterior & Interior" sectionKey="exterior">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Exterior Color</label>
                  <CheckboxGroup
                    options={exteriorColors}
                    selectedValues={filters.exteriorColors}
                    filterKey="exteriorColors"
                    columns={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Paintwork</label>
                  <CheckboxGroup
                    options={paintworkTypes}
                    selectedValues={filters.paintworkTypes}
                    filterKey="paintworkTypes"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Interior Color</label>
                  <CheckboxGroup
                    options={interiorColors}
                    selectedValues={filters.interiorColors}
                    filterKey="interiorColors"
                    columns={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Upholstery</label>
                  <CheckboxGroup
                    options={upholsteryTypes}
                    selectedValues={filters.upholsteryTypes}
                    filterKey="upholsteryTypes"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Additional Filters */}
            <FilterSection title="Additional" sectionKey="additional">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Max Previous Owners: {filters.previousOwnersMax}
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

                <div>
                  <label className="block text-sm font-medium mb-3">Accident History</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="no-accident"
                        checked={filters.hasAccidentHistory === false}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, hasAccidentHistory: checked ? false : null }))
                        }
                      />
                      <label htmlFor="no-accident" className="text-sm cursor-pointer">No accident history</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has-accident"
                        checked={filters.hasAccidentHistory === true}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, hasAccidentHistory: checked ? true : null }))
                        }
                      />
                      <label htmlFor="has-accident" className="text-sm cursor-pointer">Has accident history</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Guarantee</label>
                  <CheckboxGroup
                    options={guaranteeOptions}
                    selectedValues={filters.guaranteeOptions}
                    filterKey="guaranteeOptions"
                    columns={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Emission Class</label>
                  <Select value={filters.emissionClass} onValueChange={(value) => setFilters(prev => ({ ...prev, emissionClass: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      {emissionClasses.map(ec => (
                        <SelectItem key={ec} value={ec}>{ec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Emission Label</label>
                  <Select value={filters.emissionLabel} onValueChange={(value) => setFilters(prev => ({ ...prev, emissionLabel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      {emissionLabels.map(el => (
                        <SelectItem key={el} value={el}>{el}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection title="Location" sectionKey="location">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Search Radius</label>
                  <Select value={filters.radius} onValueChange={(value) => setFilters(prev => ({ ...prev, radius: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nationwide" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nationwide">Nationwide</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                      <SelectItem value="100">100 km</SelectItem>
                      <SelectItem value="200">200 km</SelectItem>
                      <SelectItem value="500">500 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Countries</label>
                  <CheckboxGroup
                    options={countries}
                    selectedValues={filters.countries}
                    filterKey="countries"
                    columns={1}
                  />
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Main content area - could show results preview */}
          <div className="flex-1 p-6">
            <div className="text-center py-16">
              <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Search</h3>
              <p className="text-gray-600 mb-6">
                Configure your search filters on the left to find the perfect car.
                You have {getActiveFiltersCount()} active filters.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sort Results By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                    <SelectTrigger className="w-48 mx-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="year-desc">Year: Newest First</SelectItem>
                      <SelectItem value="year-asc">Year: Oldest First</SelectItem>
                      <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                      <SelectItem value="mileage-desc">Mileage: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {getActiveFiltersCount() > 0 && (
                <span>{getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => onSearch(filters)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { AutoScoutFilters };