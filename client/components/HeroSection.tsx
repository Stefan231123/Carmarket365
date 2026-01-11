import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Search, MapPin, Car, Bike, Truck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export interface SearchFormData {
  vehicleType: 'cars' | 'motorbikes' | 'trucks';
  make: string;
  model: string;
  priceFrom: string;
  priceTo: string;
  yearFrom: string;
  mileage: string;
  location: string;
}

interface HeroSectionProps {
  onAdvancedSearchClick?: () => void;
  onSearchCarsClick?: (searchData: SearchFormData) => void;
}

export function HeroSection({ onAdvancedSearchClick, onSearchCarsClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    vehicleType: 'cars',
    make: '',
    model: '',
    priceFrom: '',
    priceTo: '',
    yearFrom: '',
    mileage: '',
    location: ''
  });

  const vehicleTypes = [
    { id: 'cars' as const, label: t('hero.vehicleTypes.cars'), icon: Car },
    { id: 'motorbikes' as const, label: t('hero.vehicleTypes.motorbikes'), icon: Bike },
    { id: 'trucks' as const, label: t('hero.vehicleTypes.trucks'), icon: Truck },
  ];
  const activeTypeLabel = vehicleTypes.find(v => v.id === searchForm.vehicleType)?.label ?? 'Cars';

  const handleFormChange = (field: keyof SearchFormData, value: string) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (onSearchCarsClick) {
      onSearchCarsClick(searchForm);
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl mb-3 text-foreground">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-8 rounded-2xl border border-zinc-100 shadow-xl bg-white">
          {/* Vehicle Type Selector */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center rounded-full p-1">
              {vehicleTypes.map((type) => {
                const IconComponent = type.icon;
                const isActive = searchForm.vehicleType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleFormChange('vehicleType', type.id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-full transition-colors ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-muted-foreground hover:bg-zinc-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.make')}</label>
              <Select value={searchForm.make} onValueChange={(value) => handleFormChange('make', value)}>
                <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <SelectValue placeholder={t('hero.searchForm.anyMake')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-make">{t('hero.searchForm.anyMake')}</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.model')}</label>
              <Select value={searchForm.model} onValueChange={(value) => handleFormChange('model', value)}>
                <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <SelectValue placeholder={t('hero.searchForm.anyModel')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-model">{t('hero.searchForm.anyModel')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.priceFrom')}</label>
              <Select value={searchForm.priceFrom} onValueChange={(value) => handleFormChange('priceFrom', value)}>
                <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <SelectValue placeholder={t('hero.searchForm.minPrice')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-min">{t('hero.searchForm.noMin')}</SelectItem>
                  <SelectItem value="1000">€1,000</SelectItem>
                  <SelectItem value="5000">€5,000</SelectItem>
                  <SelectItem value="10000">€10,000</SelectItem>
                  <SelectItem value="20000">€20,000</SelectItem>
                  <SelectItem value="30000">€30,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.priceTo')}</label>
              <Select value={searchForm.priceTo} onValueChange={(value) => handleFormChange('priceTo', value)}>
                <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <SelectValue placeholder={t('hero.searchForm.maxPrice')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-max">{t('hero.searchForm.noMax')}</SelectItem>
                  <SelectItem value="10000">€10,000</SelectItem>
                  <SelectItem value="20000">€20,000</SelectItem>
                  <SelectItem value="30000">€30,000</SelectItem>
                  <SelectItem value="50000">€50,000</SelectItem>
                  <SelectItem value="100000">€100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.yearFrom')}</label>
              <Select value={searchForm.yearFrom} onValueChange={(value) => handleFormChange('yearFrom', value)}>
                <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <SelectValue placeholder={t('hero.searchForm.minYear')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-year">{t('hero.searchForm.anyYear')}</SelectItem>
                  {Array.from({length: 15}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.mileage')}</label>
              <Select value={searchForm.mileage} onValueChange={(value) => handleFormChange('mileage', value)}>
                <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <SelectValue placeholder={t('hero.searchForm.maxMileage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-mileage">{t('hero.searchForm.anyMileage')}</SelectItem>
                  <SelectItem value="10000">10,000</SelectItem>
                  <SelectItem value="20000">20,000</SelectItem>
                  <SelectItem value="50000">50,000</SelectItem>
                  <SelectItem value="100000">100,000</SelectItem>
                  <SelectItem value="200000">200,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-muted-foreground">{t('hero.searchForm.location')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={searchForm.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  placeholder={t('hero.searchForm.enterLocation')} 
                  className="pl-10 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button size="lg" onClick={handleSearch} className="bg-black text-white hover:bg-black/90 px-8 h-12 rounded-full shadow-md">
              <Search className="h-4 w-4 mr-2" />
              {t('hero.searchButton')}
            </Button>
            <button onClick={onAdvancedSearchClick} className="text-sm text-foreground/70 underline-offset-4 hover:underline">
              {t('hero.advancedSearch')}
            </button>
          </div>
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          {t('hero.availableCars')}
        </p>
      </div>
    </section>
  );
}
