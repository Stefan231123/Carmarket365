import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Heart, Fuel, Calendar, Gauge, ArrowLeft, Trash2, Filter, SortAsc, X, Phone, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { ContactCarModal } from "@/components/ContactCarModal";
import { useTranslation } from '../hooks/useTranslation';
import { mkTranslations } from '../../shared/translations/mk';

// Use the same interface as FavoritesContext
interface SavedCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image?: string;
  images?: string[];
  dateAdded: string;
}


export default function SavedCars() {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [sortBy, setSortBy] = useState<string>("saved-date");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [contactCar, setContactCar] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Translation helper function with Macedonian fallback
  const getSavedCarsText = (key: string, fallback: string) => {
    if (currentLanguage === 'mk' && mkTranslations?.savedCars) {
      const value = mkTranslations.savedCars[key as keyof typeof mkTranslations.savedCars];
      if (value) {
        return value;
      }
    }
    
    const translated = t(`savedCars.${key}`);
    if (translated && translated !== `savedCars.${key}`) {
      return translated;
    }
    
    return fallback;
  };

  const handleRemoveCar = (carId: string) => {
    removeFromFavorites(carId);
  };

  const handleClearAll = () => {
    clearFavorites();
  };

  const handleContactClick = (car: any) => {
    setContactCar(car);
    setIsContactModalOpen(true);
  };

  const filteredAndSortedCars = useMemo(() => {
    return favorites
      .filter(car => {
        if (filterBy === "all") return true;
        if (filterBy === "recent") {
          const savedDate = new Date(car.dateAdded);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return savedDate > weekAgo;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "year-new":
            return b.year - a.year;
          case "year-old":
            return a.year - b.year;
          case "saved-date":
          default:
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
      });
  }, [favorites, filterBy, sortBy]);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="border-b border-zinc-100 bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full px-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {getSavedCarsText('back', 'Back')}
              </Button>
              <h1 className="text-2xl">{getSavedCarsText('title', 'Saved Cars')}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl mb-4">{getSavedCarsText('noSavedCars', 'No saved cars yet')}</h2>
            <p className="text-muted-foreground mb-6">
              {getSavedCarsText('startBrowsing', 'Start browsing to save your favorite vehicles')}
            </p>
            <Button onClick={() => navigate('/cars')} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
              {getSavedCarsText('browseVehicles', 'Browse Vehicles')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full px-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {getSavedCarsText('back', 'Back')}
              </Button>
              <div>
                <h1 className="text-2xl">{getSavedCarsText('title', 'Saved Cars')}</h1>
                <p className="text-muted-foreground">{favorites.length} {getSavedCarsText('carsSaved', 'cars saved')}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleClearAll} className="border-zinc-100 rounded-full px-6 h-12">
              {getSavedCarsText('clearAll', 'Clear All')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder={getSavedCarsText('sortBy', 'Sort by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saved-date">{getSavedCarsText('recentlySaved', 'Recently Saved')}</SelectItem>
              <SelectItem value="price-low">{getSavedCarsText('priceLowToHigh', 'Price: Low to High')}</SelectItem>
              <SelectItem value="price-high">{getSavedCarsText('priceHighToLow', 'Price: High to Low')}</SelectItem>
              <SelectItem value="year-new">{getSavedCarsText('yearNewestFirst', 'Year: Newest First')}</SelectItem>
              <SelectItem value="year-old">{getSavedCarsText('yearOldestFirst', 'Year: Oldest First')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={getSavedCarsText('filterPlaceholder', 'Filter by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{getSavedCarsText('allCars', 'All Cars')}</SelectItem>
              <SelectItem value="recent">{getSavedCarsText('savedThisWeek', 'Saved This Week')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCars.map((car) => (
            <Card key={car.id} className="group border-zinc-100 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="relative">
                <ImageWithFallback
                  src={car.images?.[0] || car.image || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop"}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveCar(car.id)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {car.year} {car.make} {car.model}
                </h3>
                <p className="text-2xl font-bold text-primary mb-3">
                  ${car.price.toLocaleString()}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {car.year}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm mb-3">
                  <span className="text-muted-foreground">
                    {getSavedCarsText('savedDate', 'Saved on')} {new Date(car.dateAdded).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex-1 border-zinc-100 rounded-full hover:bg-zinc-50"
                    onClick={() => handleContactClick(car)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {getSavedCarsText('contact', 'Contact')}
                  </Button>
                  <Button 
                    className="flex-1 bg-black text-white hover:bg-black/90 rounded-full"
                    size="sm"
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {getSavedCarsText('view', 'View')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
    </div>
  );
}
