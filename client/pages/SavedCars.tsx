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
  const { t } = useTranslation();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [sortBy, setSortBy] = useState<string>("saved-date");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [contactCar, setContactCar] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
                {t('finalFixes.savedCars.back')}
              </Button>
              <h1 className="text-2xl">{t('finalFixes.savedCars.title')}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl mb-4">{t('finalFixes.savedCars.noSavedCars')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('finalFixes.savedCars.startBrowsing')}
            </p>
            <Button onClick={() => navigate('/cars')} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
              {t('finalFixes.savedCars.browseVehicles')}
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
                {t('finalFixes.savedCars.back')}
              </Button>
              <div>
                <h1 className="text-2xl">{t('finalFixes.savedCars.title')}</h1>
                <p className="text-muted-foreground">{favorites.length} {t('finalFixes.savedCars.carsSaved')}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleClearAll} className="border-zinc-100 rounded-full px-6 h-12">
              {t('finalFixes.savedCars.clearAll')}
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
              <SelectValue placeholder={t('finalFixes.savedCars.sortBy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saved-date">{t('finalFixes.savedCars.recentlySaved')}</SelectItem>
              <SelectItem value="price-low">{t('finalFixes.savedCars.priceLowToHigh')}</SelectItem>
              <SelectItem value="price-high">{t('finalFixes.savedCars.priceHighToLow')}</SelectItem>
              <SelectItem value="year-new">{t('finalFixes.savedCars.yearNewestFirst')}</SelectItem>
              <SelectItem value="year-old">{t('finalFixes.savedCars.yearOldestFirst')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('finalFixes.savedCars.filterPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('finalFixes.savedCars.allCars')}</SelectItem>
              <SelectItem value="recent">{t('finalFixes.savedCars.savedThisWeek')}</SelectItem>
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
                    {t('finalFixes.savedCars.savedDate')} {new Date(car.dateAdded).toLocaleDateString()}
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
                    {t('finalFixes.savedCars.contact')}
                  </Button>
                  <Button 
                    className="flex-1 bg-black text-white hover:bg-black/90 rounded-full"
                    size="sm"
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t('finalFixes.savedCars.view')}
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
