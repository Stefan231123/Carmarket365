import { Button } from "@/components/ui/button";
import { CarCard } from "./CarCard";
import { ArrowRight, Sparkles, Car } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";
import { useFeaturedCars } from "@/hooks/useFeaturedCars";

export function FeaturedCars() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cars: apiCars, isLoading, error } = useFeaturedCars();

  const handleFilterClick = (filter: string) => {
    navigate(`/cars?filter=${filter}`);
  };

  const handleViewAllClick = () => {
    navigate('/cars');
  };

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-primary font-medium">{t('cars.featured')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('cars.handpicked')}
          </h2>
          <p className="text-lg text-car-gray max-w-2xl mx-auto">
            {t('cars.discover')}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button variant="default" size="sm" onClick={() => handleFilterClick('all')}>
            {t('cars.allCars')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFilterClick('new')}>
            {t('cars.newCars')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFilterClick('certified')}>
            {t('cars.certifiedPreOwned')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFilterClick('electric')}>
            {t('cars.electric')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleFilterClick('luxury')}>
            {t('cars.luxury')}
          </Button>
        </div>

        {/* Cars grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : apiCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {apiCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-12">
            <Car className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {t('cars.noFeaturedCars')}
            </h3>
            <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
              {t('cars.noFeaturedCarsDescription')}
            </p>
          </div>
        )}

        {/* View all button */}
        <div className="text-center">
          <Button size="lg" className="group" onClick={handleViewAllClick}>
            {t('cars.viewAllCars')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
