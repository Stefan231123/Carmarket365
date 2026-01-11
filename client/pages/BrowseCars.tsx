import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  MapPin, 
  Fuel, 
  Gauge, 
  Calendar, 
  Heart, 
  ArrowLeft,
  Eye,
  Phone,
  AlertCircle
} from "lucide-react";
import { useCars, useCarMakes } from "@/hooks/useCars";
import { useFavorites } from "@/hooks/useFavorites";
import { ContactCarModal } from "@/components/ContactCarModal";
import { useTranslation } from "@/hooks/useTranslation";

interface CarFilterInput {
  countryCode?: string;
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  transmission?: string;
}

export default function BrowseCars() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [priceFromFilter, setPriceFromFilter] = useState("");
  const [priceToFilter, setPriceToFilter] = useState("");
  const [yearFromFilter, setYearFromFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [contactCar, setContactCar] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const type = params.get('type');
    const make = params.get('make');
    const model = params.get('model');
    const priceFrom = params.get('priceFrom');
    const priceTo = params.get('priceTo');
    const yearFrom = params.get('yearFrom');
    const mileage = params.get('mileage');
    const locationParam = params.get('location');

    if (type) setVehicleTypeFilter(type);
    if (make) setMakeFilter(make);
    if (model) setModelFilter(model);
    if (priceFrom) setPriceFromFilter(priceFrom);
    if (priceTo) setPriceToFilter(priceTo);
    if (yearFrom) setYearFromFilter(yearFrom);
    if (mileage) setMileageFilter(mileage);
    if (locationParam) setLocationFilter(locationParam);
  }, [location.search]);

  // Create filters object for the API call
  const filters = useMemo((): CarFilterInput => {
    const apiFilters: CarFilterInput = {};
    
    // TODO: We need to convert make names to makeIds - for now using make names directly
    // This will need to be updated when we have a makeId mapping
    if (makeFilter && makeFilter !== "any-make") {
      // Temporarily using makeId field with make name - this will need proper ID mapping
      apiFilters.makeId = makeFilter;
    }
    
    if (modelFilter && modelFilter !== "any-model") {
      // Temporarily using modelId field with model name - this will need proper ID mapping
      apiFilters.modelId = modelFilter;
    }
    
    if (priceFromFilter && priceFromFilter !== "no-min") {
      apiFilters.priceMin = parseInt(priceFromFilter);
    }
    
    if (priceToFilter && priceToFilter !== "no-max") {
      apiFilters.priceMax = parseInt(priceToFilter);
    }
    
    if (yearFromFilter && yearFromFilter !== "any-year") {
      apiFilters.yearMin = parseInt(yearFromFilter);
    }
    
    if (mileageFilter && mileageFilter !== "any-mileage") {
      apiFilters.mileageMax = parseInt(mileageFilter);
    }
    
    if (locationFilter) {
      apiFilters.location = locationFilter;
    }
    
    // TODO: Implement search functionality by combining searchQuery with other filters
    // For now, searchQuery is handled client-side in the UI but not sent to the API
    
    return apiFilters;
  }, [makeFilter, modelFilter, priceFromFilter, priceToFilter, yearFromFilter, mileageFilter, locationFilter]);

  // Fetch cars and makes from API
  const { cars, isLoading, error, refetch } = useCars(filters);
  const { makes: carMakes, isLoading: makesLoading } = useCarMakes();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleCarClick = (carId: string) => {
    navigate(`/cars/${carId}`);
  };

  const handleContactClick = (car: any) => {
    setContactCar(car);
    setIsContactModalOpen(true);
  };

  const handleFavoriteClick = (car: any) => {
    toggleFavorite({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      image: car.images?.[0],
      images: car.images,
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-zinc-100 text-muted-foreground hover:bg-zinc-200 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
{t('common.back')}
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-5xl mb-3 text-foreground">
{vehicleTypeFilter === 'motorbikes' ? 
              (makeFilter && makeFilter !== "any-make" ? `${makeFilter} ${t('hero.vehicleTypes.motorbikes')} ${t('browseCars.title')}` : `${t('hero.vehicleTypes.motorbikes')} ${t('browseCars.title')}`) : 
             vehicleTypeFilter === 'trucks' ? 
              (makeFilter && makeFilter !== "any-make" ? `${makeFilter} ${t('hero.vehicleTypes.trucks')} ${t('browseCars.title')}` : `${t('hero.vehicleTypes.trucks')} ${t('browseCars.title')}`) : 
             (makeFilter && makeFilter !== "any-make" ? `${makeFilter} ${t('browseCars.title')}` : t('browseCars.title'))}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
{isLoading ? t('common.loading') : `${cars.length} ${t('browseCars.results.results')}${(makeFilter && makeFilter !== "any-make") || (modelFilter && modelFilter !== "any-model") || (priceFromFilter && priceFromFilter !== "no-min") || locationFilter ? ` ${t('browseCars.results.showing')}` : ''}`}
          </p>
        </div>

        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar Filters - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <Card className="p-6 rounded-2xl border border-zinc-100 shadow-xl bg-white sticky top-24">
              <div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-foreground">{t('browseCars.filters.title')}</h3>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
<label className="text-sm font-medium text-foreground mb-3 block">{t('common.search')}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
placeholder={t('browseCars.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                </div>

                {/* Make */}
                <div>
<label className="text-sm font-medium text-foreground mb-3 block">{t('common.make')}</label>
                  <Select value={makeFilter} onValueChange={setMakeFilter}>
<SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('filters.anyMake')} />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
                      <SelectItem value="any-make">{t('filters.anyMake')}</SelectItem>
                      {carMakes.map((make) => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
<label className="text-sm font-medium text-foreground mb-3 block">{t('browseCars.filters.priceRange')}</label>
                  <div className="space-y-2">
                    <Select value={priceFromFilter} onValueChange={setPriceFromFilter}>
<SelectTrigger className="h-10 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('browseCars.filters.minPrice')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
                        <SelectItem value="no-min">{t('browseCars.filters.noMin')}</SelectItem>
                        <SelectItem value="1100">$1,100</SelectItem>
                        <SelectItem value="5500">$5,500</SelectItem>
                        <SelectItem value="11000">$11,000</SelectItem>
                        <SelectItem value="22000">$22,000</SelectItem>
                        <SelectItem value="33000">$33,000</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={priceToFilter} onValueChange={setPriceToFilter}>
<SelectTrigger className="h-10 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('browseCars.filters.maxPrice')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
                        <SelectItem value="no-max">{t('browseCars.filters.noMax')}</SelectItem>
                        <SelectItem value="11000">$11,000</SelectItem>
                        <SelectItem value="22000">$22,000</SelectItem>
                        <SelectItem value="33000">$33,000</SelectItem>
                        <SelectItem value="55000">$55,000</SelectItem>
                        <SelectItem value="110000">$110,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Year */}
                <div>
<label className="text-sm font-medium text-foreground mb-3 block">{t('browseCars.filters.yearRange')}</label>
                  <Select value={yearFromFilter} onValueChange={setYearFromFilter}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
<SelectValue placeholder={t('filters.anyYear')} />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
<SelectItem value="any-year">{t('filters.anyYear')}</SelectItem>
                      {Array.from({length: 15}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mileage */}
                <div>
<label className="text-sm font-medium text-foreground mb-3 block">{t('browseCars.filters.mileageRange')}</label>
                  <Select value={mileageFilter} onValueChange={setMileageFilter}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
<SelectValue placeholder={t('filters.anyMileage')} />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
<SelectItem value="any-mileage">{t('filters.anyMileage')}</SelectItem>
                      <SelectItem value="6200">6,200 miles</SelectItem>
                      <SelectItem value="12500">12,500 miles</SelectItem>
                      <SelectItem value="31000">31,000 miles</SelectItem>
                      <SelectItem value="62000">62,000 miles</SelectItem>
                      <SelectItem value="124000">124,000 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
<label className="text-sm font-medium text-foreground mb-3 block">{t('browseCars.filters.location')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
<Input
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      placeholder={t('browseCars.filters.anyLocation')}
                      className="pl-10 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Error Display */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
{t('browseCars.errorStates.networkError')}
                  <Button
                    variant="link"
                    className="p-0 h-auto ml-2 underline"
                    onClick={() => refetch()}
                  >
{t('browseCars.errorStates.tryAgain')}
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Card className="p-8 rounded-2xl border border-zinc-100 shadow-xl bg-white">
              {/* Mobile Filters Toggle */}
              <div className="block md:hidden mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200 px-6 w-full"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
{showFilters ? t('browseCars.filters.clearAll') : t('browseCars.filtersButton')}
                </Button>
              </div>

              {/* Mobile Filters Panel */}
              {showFilters && (
                <div className="md:hidden mb-6 p-6 bg-zinc-50 rounded-2xl space-y-4">
                  <div>
                    <Input
placeholder={t('browseCars.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12 bg-white rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <Select value={makeFilter} onValueChange={setMakeFilter}>
                      <SelectTrigger className="h-12 bg-white rounded-full border-none focus-visible:ring-0">
<SelectValue placeholder={t('filters.anyMake')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
<SelectItem value="any-make">{t('filters.anyMake')}</SelectItem>
                        {carMakes.map((make) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={priceFromFilter} onValueChange={setPriceFromFilter}>
                      <SelectTrigger className="h-12 bg-white rounded-full border-none focus-visible:ring-0">
<SelectValue placeholder={t('browseCars.filters.minPrice')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
<SelectItem value="no-min">{t('browseCars.filters.noMin')}</SelectItem>
                        <SelectItem value="1100">$1,100</SelectItem>
                        <SelectItem value="5500">$5,500</SelectItem>
                        <SelectItem value="11000">$11,000</SelectItem>
                        <SelectItem value="22000">$22,000</SelectItem>
                        <SelectItem value="33000">$33,000</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={priceToFilter} onValueChange={setPriceToFilter}>
                      <SelectTrigger className="h-12 bg-white rounded-full border-none focus-visible:ring-0">
<SelectValue placeholder={t('browseCars.filters.maxPrice')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl border border-zinc-100 bg-white shadow-lg overflow-hidden p-2">
<SelectItem value="no-max">{t('browseCars.filters.noMax')}</SelectItem>
                        <SelectItem value="11000">$11,000</SelectItem>
                        <SelectItem value="22000">$22,000</SelectItem>
                        <SelectItem value="33000">$33,000</SelectItem>
                        <SelectItem value="55000">$55,000</SelectItem>
                        <SelectItem value="110000">$110,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
placeholder={t('browseCars.filters.anyLocation')}
                      className="pl-10 h-12 bg-white rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              )}

              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
{isLoading ? t('common.loading') : `${cars.length} ${t('browseCars.results.results')}`}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex rounded-full p-1 bg-zinc-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`rounded-full h-10 px-3 ${
                        viewMode === "list" 
                          ? "bg-black text-white shadow-sm hover:bg-black/90" 
                          : "bg-transparent text-muted-foreground hover:bg-zinc-200"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`rounded-full h-10 px-3 ${
                        viewMode === "grid" 
                          ? "bg-black text-white shadow-sm hover:bg-black/90" 
                          : "bg-transparent text-muted-foreground hover:bg-zinc-200"
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Loading Skeletons */}
              {isLoading && (
                <div className={viewMode === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="border-zinc-100 rounded-2xl">
                      <CardContent className={viewMode === "list" ? "p-6" : "p-4"}>
                        <div className={viewMode === "list" ? "flex flex-col sm:flex-row gap-6" : ""}>
                          <Skeleton className={`${viewMode === "list" ? "w-full sm:w-64 h-48 sm:h-40" : "w-full h-48"} rounded-2xl mb-4`} />
                          <div className="flex-1 space-y-4">
                            <div>
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <div className={`grid gap-3 mb-4 ${viewMode === "list" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-20" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <Skeleton className="h-8 w-24" />
                              <div className="flex gap-2">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-16" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Results */}
              {!isLoading && !error && (
                <div className={viewMode === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                  {cars.map((car) => (
                  <Card key={car.id} className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer" onClick={() => handleCarClick(car.id)}>
                    <CardContent className={viewMode === "list" ? "p-6" : "p-4"}>
                      <div className={viewMode === "list" ? "flex flex-col sm:flex-row gap-6" : ""}>
                        <div className={`relative overflow-hidden rounded-2xl ${viewMode === "list" ? "w-full sm:w-64 h-48 sm:h-40" : "w-full h-48"} mb-4`}>
                          <img
                            src={car.images?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Button
                              variant="ghost"
                              className="bg-white/90 backdrop-blur-sm rounded-full p-3 min-w-[44px] min-h-[44px] hover:bg-white transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteClick(car);
                              }}
                            >
                              <Heart className={`h-5 w-5 transition-colors ${isFavorite(car.id) ? 'fill-red-500 text-red-500' : 'hover:text-red-500'}`} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className={`font-bold text-gray-900 ${viewMode === "list" ? "text-xl" : "text-lg"}`}>
                                {car.year} {car.make} {car.model}
                              </h3>
                              {car.isFeatured && (
                                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {t('browseCars.carCard.featured')}
                                </div>
                              )}
                            </div>
                            <div className={`grid gap-3 mb-4 text-sm text-muted-foreground ${viewMode === "list" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
                              <div className="flex items-center gap-2">
                                <Gauge className="h-4 w-4 text-blue-600" />
<span>{Math.round((car.mileage || 0) / 1.60934).toLocaleString()} miles</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Fuel className="h-4 w-4 text-green-600" />
<span>{car.fuelType || t('browseCars.carCard.gasoline')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-purple-600" />
<span>{car.transmission || t('browseCars.carCard.automatic')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-red-600" />
<span>{car.location || t('browseCars.filters.anyLocation')}</span>
                              </div>
                            </div>
                          </div>

                          <div className={`flex items-center justify-between pt-2 border-t border-zinc-100 ${viewMode === "list" ? "sm:flex-row" : "flex-col"} gap-4`}>
                            <div>
                              <div className={`font-bold text-blue-600 ${viewMode === "list" ? "text-2xl" : "text-xl"} mb-1`}>
                                ${(car.price || 0).toLocaleString()}
                              </div>
<div className="text-sm text-muted-foreground">
                                {car.seller?.dealerName || car.seller?.name || t('auth.privatePerson')}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                className="bg-zinc-100 border-none rounded-full hover:bg-zinc-200 h-10 min-h-[40px] px-4" 
                                variant="outline" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleContactClick(car);
                                }}
                              >
                                <Phone className="h-4 w-4 mr-2" />
{t('browseCars.carCard.contactSeller')}
                              </Button>
                              <Button 
                                className="bg-black text-white hover:bg-black/90 rounded-full shadow-md h-10 min-h-[40px] px-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCarClick(car.id);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
{t('browseCars.carCard.viewDetails')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && !error && cars.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-zinc-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-zinc-400" />
                  </div>
<h3 className="text-xl font-semibold text-foreground mb-2">{t('browseCars.results.noResults')}</h3>
<p className="text-muted-foreground mb-4">{t('browseCars.results.noResultsMessage')}</p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setMakeFilter("");
                    setModelFilter("");
                    setPriceFromFilter("");
                    setPriceToFilter("");
                    setYearFromFilter("");
                    setMileageFilter("");
                    setLocationFilter("");
                    setVehicleTypeFilter("");
                  }} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
{t('browseCars.filters.clearAll')}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

<p className="text-center text-muted-foreground mt-8">
          {t('business.qualityUsedCars')} <span className="font-semibold">{t('business.registeredDealers')}</span> {t('countries.global')}
        </p>
      </div>

      {/* Contact Modal */}
      <ContactCarModal
        car={contactCar}
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setContactCar(null);
        }}
      />
    </section>
  );
}