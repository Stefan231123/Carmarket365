import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Fuel, Gauge, Calendar, Users, Camera } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import ImageGallery from "@/components/ImageGallery";
import { ContactCarModal } from "@/components/ContactCarModal";
import { useFavorites } from "@/hooks/useFavorites";
import { useTranslation } from "@/hooks/useTranslation";
import { useVehicleSpecTranslator } from "@/utils/vehicleSpecTranslations";

import { Car } from '@/lib/graphql/operations';

interface CarCardProps {
  car: Car | {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    image?: string; // Keep for backward compatibility
    images?: string[]; // New multiple images support
    thumbnails?: string[]; // Optional thumbnails
    location: string;
    dealer: string;
    isNew?: boolean;
    isCertified?: boolean;
  };
  layout?: "grid" | "list"; // Used by SearchResults component
}

export function CarCard({ car, layout }: CarCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const vehicleTranslator = useVehicleSpecTranslator(t);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const formatPrice = (price: number, currencyCode: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  // Handle both old and new car data structures
  const carMake = 'carMake' in car ? car.carMake.name : car.make;
  const carModel = 'carModel' in car ? car.carModel.name : car.model;
  const fuelType = 'transmissionType' in car ? car.fuelType : car.fuelType;
  const transmission = 'transmissionType' in car ? car.transmissionType : car.transmission;
  const images = 'imageUrls' in car ? car.imageUrls : car.images;
  const dealer = 'user' in car ? (car.user.dealerName || car.user.name) : car.dealer;
  const currency = 'currency' in car ? car.currency : 'USD';

  // Determine which images to use
  const displayImages = images && images.length > 0 
    ? images 
    : ('image' in car && car.image) 
    ? [car.image] 
    : [];
  
  const displayThumbnails = ('thumbnails' in car && car.thumbnails && car.thumbnails.length === displayImages.length)
    ? car.thumbnails 
    : undefined;

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: car.id,
      make: carMake,
      model: carModel,
      year: car.year,
      price: car.price,
      image: displayImages[0] || '',
      images: displayImages,
    });
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image Gallery */}
      <div className="relative">
        {displayImages.length > 0 ? (
          <ImageGallery
            images={displayImages}
            thumbnails={displayThumbnails}
            alt={`${car.year} ${carMake} ${carModel}`}
            aspectRatio="video"
            showThumbnails={false} // Don't show thumbnails in card view
            enableZoom={true}
            lazy={true} // Enable lazy loading for car card images
            className="aspect-[4/3]"
          />
        ) : (
          <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Camera className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">{t('common.images')}</p>
            </div>
          </div>
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-auto">
            {'isNew' in car && car.isNew && (
              <Badge className="bg-success text-success-foreground">
                {t('common.new')}
              </Badge>
            )}
            {'isCertified' in car && car.isCertified && (
              <Badge className="bg-primary text-primary-foreground">
                {t('common.certified')}
              </Badge>
            )}
          </div>

          {/* Image count indicator */}
          {displayImages.length > 1 && (
            <div className="absolute top-3 right-12 bg-black/50 text-white text-xs px-2 py-1 rounded">
              <Camera className="h-3 w-3 inline mr-1" />
              {displayImages.length}
            </div>
          )}

          {/* Favorite button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-car-gray hover:text-red-500 shadow-sm pointer-events-auto transition-colors"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isFavorite(car.id) ? 'fill-red-500 text-red-500' : 'hover:text-red-500'}`}
            />
          </Button>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(car.price, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {car.year} {carMake} {carModel}
          </h3>
          <p className="text-sm text-car-gray">{dealer}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-car-gray">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(car.mileage)} {t('common.mileage')}</span>
          </div>
          <div className="flex items-center gap-2 text-car-gray">
            <Fuel className="h-4 w-4" />
            <span>{vehicleTranslator.translateFuelType(fuelType)}</span>
          </div>
          <div className="flex items-center gap-2 text-car-gray">
            <Users className="h-4 w-4" />
            <span>{vehicleTranslator.translateTransmission(transmission)}</span>
          </div>
          <div className="flex items-center gap-2 text-car-gray">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-car-gray">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{car.location}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm" asChild>
            <Link to={`/cars/${car.id}`}>
              {t('cars.viewDetails')}
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleContactClick}>
            {t('common.contact')}
          </Button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactCarModal
        car={car ? {
          id: car.id,
          make: carMake,
          model: carModel,
          year: car.year,
          price: car.price,
          image: displayImages[0],
          images: displayImages,
          dealer: dealer,
          isNew: 'isNew' in car ? car.isNew : undefined,
          isCertified: 'isCertified' in car ? car.isCertified : undefined,
        } : null}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
