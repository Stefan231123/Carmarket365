import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Heart, Fuel, Calendar, Gauge, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useVehicleSpecTranslator } from '../utils/vehicleSpecTranslations';
import { useFavorites } from "@/hooks/useFavorites";

interface Car {
  id: number;
  title: string;
  price: string;
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  location: string;
  image: string;
  dealer: string;
  relevanceScore: number;
}

// Mock data simulating cars from user's last search for "BMW, €20,000-€35,000, 2019-2022"
const lastSearchCars: Car[] = [
  {
    id: 1,
    title: "BMW 3 Series 320d",
    price: "€28,500",
    year: 2020,
    mileage: "45,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Berlin, Germany",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
    dealer: "Premium Motors",
    relevanceScore: 98
  },
  {
    id: 2,
    title: "BMW X3 xDrive20d",
    price: "€32,900",
    year: 2021,
    mileage: "32,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Munich, Germany",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
    dealer: "BMW Center",
    relevanceScore: 95
  },
  {
    id: 3,
    title: "BMW 1 Series 118i",
    price: "€24,800",
    year: 2019,
    mileage: "48,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Hamburg, Germany",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
    dealer: "Auto House",
    relevanceScore: 92
  },
  {
    id: 4,
    title: "BMW 5 Series 520d",
    price: "€33,900",
    year: 2022,
    mileage: "18,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Frankfurt, Germany",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
    dealer: "Elite Motors",
    relevanceScore: 89
  },
  {
    id: 5,
    title: "BMW Z4 sDrive20i",
    price: "€31,500",
    year: 2020,
    mileage: "35,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Cologne, Germany",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop",
    dealer: "Sports Cars GmbH",
    relevanceScore: 87
  },
  {
    id: 6,
    title: "BMW X1 sDrive18i",
    price: "€26,200",
    year: 2019,
    mileage: "52,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    location: "Stuttgart, Germany",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
    dealer: "City Motors",
    relevanceScore: 85
  }
];

interface LastSearchProps {
  onCarClick?: () => void;
}

export function LastSearch({ onCarClick }: LastSearchProps) {
  const { t } = useTranslation();
  const vehicleTranslator = useVehicleSpecTranslator(t);
  const { isFavorite, toggleFavorite } = useFavorites();
  // Show top 4 most relevant cars from last search
  const displayCars = lastSearchCars.slice(0, 4);
  const navigate = useNavigate();

  const handleFavoriteClick = (car: Car, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click
    
    // Convert the LastSearch car data to FavoritesContext format
    const [make, ...modelParts] = car.title.split(' ');
    const model = modelParts.join(' ');
    const priceNumber = parseFloat(car.price.replace(/[^0-9.]/g, ''));
    
    toggleFavorite({
      id: car.id.toString(), // Convert number to string
      make: make || 'Unknown',
      model: model || 'Unknown',
      year: car.year,
      price: priceNumber || 0,
      image: car.image,
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-5 w-5 text-primary" />
              <h2 className="text-3xl">{t('lastSearch.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {t('lastSearch.description')}
            </p>
          </div>
          <Button 
            variant="outline"
            className="border-zinc-100 rounded-full px-6"
            onClick={() => {
              const params = new URLSearchParams({
                make: "BMW",
                minPrice: "20000",
                maxPrice: "35000",
                yearMin: "2019",
                yearMax: "2022",
              });
              navigate(`/cars?${params.toString()}`);
            }}
          >
            {t('lastSearch.viewMore')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer border-zinc-100 rounded-2xl" onClick={onCarClick}>
              <div className="relative">
                <ImageWithFallback
                  src={car.image}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full transition-colors ${
                    isFavorite(car.id.toString()) ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={(e) => handleFavoriteClick(car, e)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(car.id.toString()) ? 'fill-current' : ''}`} />
                </Button>
                <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                  {car.dealer}
                </Badge>
                <Badge className="absolute top-2 left-2 bg-green-600 text-white rounded-full">
                  {car.relevanceScore}{t('lastSearch.matchPercentage')}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="mb-2 group-hover:text-primary transition-colors">
                  {car.title}
                </h3>
                <div className="text-2xl font-bold text-primary mb-3">
                  {car.price}
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {car.year}
                    </div>
                    <div className="flex items-center">
                      <Gauge className="h-3 w-3 mr-1" />
                      {car.mileage}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Fuel className="h-3 w-3 mr-1" />
                      {vehicleTranslator.translateFuelType(car.fuel)}
                    </div>
                    <span>{vehicleTranslator.translateTransmission(car.transmission)}</span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mb-3">
                  📍 {car.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
