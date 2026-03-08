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
import { useFeaturedCars } from "@/hooks/useFeaturedCars";
import { Car, CarImage } from "@/lib/graphql/operations";

interface InterestingSuggestionsProps {
  onCarClick?: () => void;
}

export function InterestingSuggestions({ onCarClick }: InterestingSuggestionsProps) {
  const { t } = useTranslation();
  const vehicleTranslator = useVehicleSpecTranslator(t);
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const { cars, isLoading } = useFeaturedCars();

  if (isLoading || cars.length === 0) return null;

  const displayCars = cars.slice(0, 4);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

  const formatMileage = (mileage: number) =>
    new Intl.NumberFormat('de-DE').format(mileage) + ' km';

  const getMainImage = (images: CarImage[]) => {
    if (!images || images.length === 0) return undefined;
    return (images.find(i => i.isMain) ?? images[0]).url;
  };

  const getDaysListed = (createdAt: string) =>
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);

  const handleCardClick = (carId: string) => {
    if (onCarClick) onCarClick();
    navigate(`/cars/${carId}`);
  };

  const handleToggleFavorite = (car: Car, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      image: getMainImage(car.images),
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
          <Button variant="outline" className="border-zinc-100 rounded-full px-6" onClick={() => navigate('/cars')}>
            {t('suggestions.seeMore')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCars.map((car) => {
            const daysListed = getDaysListed(car.createdAt);
            const dealerLabel = car.seller?.dealerName || car.seller?.name || '';
            const image = getMainImage(car.images);

            return (
              <Card
                key={car.id}
                className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer border-zinc-100 rounded-2xl"
                onClick={() => handleCardClick(car.id)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={image}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                    width={400}
                    height={250}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full transition-colors ${
                      isFavorite(car.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={(e) => handleToggleFavorite(car, e)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(car.id) ? 'fill-current' : ''}`} />
                  </Button>
                  {dealerLabel && (
                    <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                      {dealerLabel}
                    </Badge>
                  )}
                  {daysListed <= 7 && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 text-white flex items-center gap-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {daysListed}{t('suggestions.daysAgo')}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="mb-2 group-hover:text-primary transition-colors">
                    {car.year} {car.make} {car.model}{car.variant ? ` ${car.variant}` : ''}
                  </h3>
                  <div className="text-2xl font-bold text-primary mb-3">
                    {formatPrice(car.price)}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {car.year}
                      </div>
                      <div className="flex items-center">
                        <Gauge className="h-3 w-3 mr-1" />
                        {formatMileage(car.mileage)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Fuel className="h-3 w-3 mr-1" />
                        {vehicleTranslator.translateFuelType(car.fuelType)}
                      </div>
                      <span>{vehicleTranslator.translateTransmission(car.transmission)}</span>
                    </div>
                  </div>

                  {car.location && (
                    <div className="text-xs text-muted-foreground mb-3">
                      📍 {car.location}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
