import { Button } from "@/components/ui/button";
import { CarCard } from "./CarCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";
import { useFeaturedCars } from "@/hooks/useFeaturedCars";
import { LoadingSpinner } from "./LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const featuredCars = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42990,
    mileage: 5420,
    fuelType: "Electric",
    transmission: "Automatic",
    image: "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    location: "San Francisco, CA",
    dealer: "Tesla San Francisco",
    isNew: false,
    isCertified: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    make: "BMW",
    model: "X5",
    year: 2024,
    price: 67800,
    mileage: 1200,
    fuelType: "Gasoline",
    transmission: "Automatic",
    image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    location: "Los Angeles, CA",
    dealer: "BMW of Los Angeles",
    isNew: true,
    isCertified: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28450,
    mileage: 8900,
    fuelType: "Hybrid",
    transmission: "CVT",
    image: "https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    location: "Austin, TX",
    dealer: "Toyota of Austin",
    isNew: false,
    isCertified: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 45600,
    mileage: 3200,
    fuelType: "Gasoline",
    transmission: "Automatic",
    image: "https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    location: "Miami, FL",
    dealer: "Mercedes-Benz of Miami",
    isNew: false,
    isCertified: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    make: "Honda",
    model: "Civic",
    year: 2024,
    price: 24200,
    mileage: 500,
    fuelType: "Gasoline",
    transmission: "Manual",
    image: "https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    location: "Chicago, IL",
    dealer: "Honda of Chicago",
    isNew: true,
    isCertified: false,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    make: "Audi",
    model: "A4",
    year: 2023,
    price: 39800,
    mileage: 6700,
    fuelType: "Gasoline",
    transmission: "Automatic",
    image: "https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    location: "Seattle, WA",
    dealer: "Audi Seattle",
    isNew: false,
    isCertified: true,
  },
];

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

  // Use API cars if available, otherwise fallback to mock data
  const displayCars = apiCars.length > 0 ? apiCars : featuredCars;

  if (error) {
    console.warn('Failed to load featured cars from API, using mock data:', error);
  }
  
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            // Show loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            ))
          ) : (
            displayCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))
          )}
        </div>

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
