import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { 
  X, 
  Car, 
  Fuel, 
  Gauge, 
  Calendar, 
  Users, 
  Cog,
  MapPin,
  DollarSign,
  Star
} from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

interface CarForComparison {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType?: string;
  exteriorColor?: string;
  interiorColor?: string;
  drivetrain?: string;
  images?: string[];
  location: string;
  dealer?: string;
  condition?: string;
}

interface CarComparisonModalProps {
  cars: CarForComparison[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
}

export function CarComparisonModal({ 
  cars, 
  isOpen, 
  onClose, 
  onRemoveCar, 
  onClearAll 
}: CarComparisonModalProps) {
  const { t } = useTranslation();
  const [activeImageIndices, setActiveImageIndices] = useState<{ [key: string]: number }>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const nextImage = (carId: string, totalImages: number) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [carId]: ((prev[carId] || 0) + 1) % totalImages
    }));
  };

  const previousImage = (carId: string, totalImages: number) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [carId]: ((prev[carId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const comparisonFields = [
    { key: 'price', label: t('advancedFeatures.comparison.fields.price'), icon: DollarSign, formatter: formatPrice },
    { key: 'year', label: t('advancedFeatures.comparison.fields.year'), icon: Calendar },
    { key: 'mileage', label: t('advancedFeatures.comparison.fields.mileage'), icon: Gauge, formatter: formatMileage },
    { key: 'fuelType', label: t('advancedFeatures.comparison.fields.fuelType'), icon: Fuel },
    { key: 'transmission', label: t('advancedFeatures.comparison.fields.transmission'), icon: Cog },
    { key: 'bodyType', label: t('advancedFeatures.comparison.fields.bodyType'), icon: Car },
    { key: 'drivetrain', label: t('advancedFeatures.comparison.fields.drivetrain'), icon: Users },
    { key: 'condition', label: t('advancedFeatures.comparison.fields.condition'), icon: Star },
    { key: 'exteriorColor', label: t('advancedFeatures.comparison.fields.exteriorColor') },
    { key: 'interiorColor', label: t('advancedFeatures.comparison.fields.interiorColor') },
    { key: 'location', label: t('advancedFeatures.comparison.fields.location'), icon: MapPin },
    { key: 'dealer', label: t('advancedFeatures.comparison.fields.dealer') },
  ];

  if (cars.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-4">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">
                {t('advancedFeatures.comparison.title')} ({cars.length}/3)
              </DialogTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onClearAll}
                  className="text-xs"
                >
                  {t('advancedFeatures.comparison.clearAll')}
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1">
            <div className="p-6 pt-0">
              {/* Car Images */}
              <div className={`grid gap-4 mb-6 ${cars.length === 1 ? 'grid-cols-1' : cars.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {cars.map((car) => {
                  const images = car.images || [];
                  const currentImageIndex = activeImageIndices[car.id] || 0;
                  
                  return (
                    <div key={car.id} className="relative">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group">
                        {images.length > 0 ? (
                          <>
                            <ImageWithFallback
                              src={images[currentImageIndex]}
                              alt={`${car.year} ${car.make} ${car.model}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Navigation arrows for multiple images */}
                            {images.length > 1 && (
                              <>
                                <button
                                  onClick={() => previousImage(car.id, images.length)}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-3 w-3 rotate-45" />
                                </button>
                                <button
                                  onClick={() => nextImage(car.id, images.length)}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-3 w-3 -rotate-45" />
                                </button>
                                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                  {currentImageIndex + 1} / {images.length}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Car className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveCar(car.id)}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      
                      <div className="mt-3 text-center">
                        <h3 className="font-semibold text-lg">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <div className="text-2xl font-bold text-primary mt-1">
                          {formatPrice(car.price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* Comparison Table */}
              <div className="mt-6">
                <div className="space-y-4">
                  {comparisonFields.map((field) => {
                    const Icon = field.icon;
                    
                    return (
                      <div key={field.key} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
                          {Icon && <Icon className="h-4 w-4" />}
                          {field.label}
                        </div>
                        
                        <div className={`grid gap-4 ${cars.length === 1 ? 'grid-cols-1' : cars.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                          {cars.map((car) => {
                            const value = car[field.key as keyof CarForComparison];
                            const displayValue = field.formatter && typeof value === 'number' 
                              ? field.formatter(value)
                              : value || t('advancedFeatures.comparison.notAvailable');
                            
                            return (
                              <div key={`${car.id}-${field.key}`} className="text-center p-3 bg-muted/30 rounded">
                                <div className="font-medium">
                                  {displayValue}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}