import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Heart, Fuel, Calendar, Gauge, Sparkles, Clock } from "lucide-react";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useVehicleSpecTranslator } from '../utils/vehicleSpecTranslations';
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";

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
  daysListed: number;
  isNew: boolean;
}

// Mock data simulating newest BMW cars matching the search criteria
const newSuggestions: Car[] = [
  {
    id: 101,
    title: "BMW 4 Series 420d Coupe",
    price: "€34,500",
    year: 2022,
    mileage: "12,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Dresden, Germany",
    image: "https://images.unsplash.com/photo-1617469165786-8007eda307c9?w=400&h=250&fit=crop",
    dealer: "BMW Dresden",
    daysListed: 1,
    isNew: true
  },
  {
    id: 102,
    title: "BMW 2 Series Active Tourer",
    price: "€29,800",
    year: 2021,
    mileage: "25,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Leipzig, Germany",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
    dealer: "Auto Leipzig",
    daysListed: 2,
    isNew: true
  },
  {
    id: 103,
    title: "BMW X2 sDrive18d",
    price: "€27,900",
    year: 2020,
    mileage: "38,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Nuremberg, Germany",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop",
    dealer: "Premium Cars",
    daysListed: 3,
    isNew: true
  },
  {
    id: 104,
    title: "BMW 3 Series Touring 320i",
    price: "€30,200",
    year: 2021,
    mileage: "28,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Düsseldorf, Germany",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=250&fit=crop",
    dealer: "BMW Düsseldorf",
    daysListed: 4,
    isNew: true
  }
];

interface InterestingSuggestionsProps {
  onCarClick?: () => void;
}

export function InterestingSuggestions({ onCarClick }: InterestingSuggestionsProps) {
  const { t } = useTranslation();
  const vehicleTranslator = useVehicleSpecTranslator(t);
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate('/cars?category=suggestions');
  };

  const toggleSave = (car: Car, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click
    
    // Convert InterestingSuggestions car data to FavoritesContext format
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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-3xl">{t('suggestions.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {t('suggestions.description')}
            </p>
          </div>
          <Button variant="outline" className="border-zinc-100 rounded-full px-6" onClick={handleSeeMoreClick}>
            {t('suggestions.seeMore')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newSuggestions.map((car) => (
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
                  onClick={(e) => toggleSave(car, e)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(car.id.toString()) ? 'fill-current' : ''}`} />
                </Button>
                <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                  {car.dealer}
                </Badge>
                {car.isNew && (
                  <Badge className="absolute top-2 left-2 bg-orange-500 text-white flex items-center gap-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    {car.daysListed}{t('suggestions.daysAgo')}
                  </Badge>
                )}
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
