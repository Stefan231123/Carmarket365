import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Car,
  Bike,
  Truck,
  Gauge,
  Fuel,
  Settings,
  Calendar,
  Heart
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useFavorites } from "@/hooks/useFavorites";

interface DealerProfile {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  carListings: VehicleListing[];
  bikeListings: VehicleListing[];
  truckListings: VehicleListing[];
}

interface VehicleListing {
  id: string;
  type: 'car' | 'bike' | 'truck';
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  image: string;
  features: string[];
  condition: string;
  description: string;
  engineSize?: string;
  power?: string;
  acceleration?: string;
  fuelConsumption?: string;
  seats?: number;
  doors?: number;
  cc?: number;
}

// Vehicle listings for each dealer
const getVehicleListingsByDealer = (dealerId: string, type: 'car' | 'bike' | 'truck'): VehicleListing[] => {
  const vehicleListings: Record<string, Record<string, VehicleListing[]>> = {
    "1": {
      "car": [
        {
          id: "car-1-1", type: "car" as const, make: "BMW", model: "X7", year: 2023, price: 95000, mileage: 15000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "SUV", color: "Black", 
          image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
          features: ["Leather", "Navigation", "Climate Control", "Panoramic Roof"], condition: "Like New",
          description: "Luxurious BMW X7 in perfect condition", engineSize: "3.0L", power: "340 HP", seats: 7, doors: 5
        },
        {
          id: "car-1-2", type: "car" as const, make: "Tesla", model: "Model S", year: 2024, price: 89000, mileage: 5000,
          fuelType: "Electric", transmission: "Automatic", bodyType: "Sedan", color: "White",
          image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop",
          features: ["Autopilot", "Premium Sound", "Glass Roof"], condition: "New",
          description: "Latest Tesla Model S with full self-driving capability", power: "670 HP", seats: 5, doors: 4
        },
        {
          id: "car-1-3", type: "car" as const, make: "Audi", model: "Q8", year: 2023, price: 78000, mileage: 12000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "SUV", color: "Grey",
          image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
          features: ["Quattro AWD", "Virtual Cockpit", "Matrix LED"], condition: "Excellent",
          description: "Premium Audi Q8 with advanced technology", engineSize: "3.0L", power: "340 HP", seats: 5, doors: 5
        }
      ],
      "bike": [
        {
          id: "bike-1-1", type: "bike" as const, make: "BMW", model: "R1250GS", year: 2023, price: 18500, mileage: 8000,
          fuelType: "Gasoline", transmission: "Manual", bodyType: "Adventure", color: "Blue",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop",
          features: ["ABS", "Traction Control", "LED Lights"], condition: "Excellent",
          description: "BMW adventure motorcycle", cc: 1254, power: "136 HP"
        }
      ],
      "truck": [
        {
          id: "truck-1-1", type: "truck" as const, make: "Mercedes", model: "Sprinter", year: 2022, price: 45000, mileage: 25000,
          fuelType: "Diesel", transmission: "Manual", bodyType: "Van", color: "White",
          image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=250&fit=crop",
          features: ["GPS", "Bluetooth", "Cargo Space"], condition: "Good",
          description: "Reliable Mercedes Sprinter van", engineSize: "2.1L", power: "150 HP"
        }
      ]
    },
    "2": {
      "car": [
        {
          id: "car-2-1", type: "car" as const, make: "Volkswagen", model: "Golf", year: 2022, price: 28000, mileage: 18000,
          fuelType: "Gasoline", transmission: "Manual", bodyType: "Hatchback", color: "Red",
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
          features: ["AC", "Radio", "Safety Package"], condition: "Good",
          description: "Reliable VW Golf for families", engineSize: "1.5L", power: "150 HP", seats: 5, doors: 5
        },
        {
          id: "car-2-2", type: "car" as const, make: "Toyota", model: "Prius", year: 2023, price: 32000, mileage: 12000,
          fuelType: "Hybrid", transmission: "Automatic", bodyType: "Hatchback", color: "Blue",
          image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop",
          features: ["Hybrid System", "Eco Mode", "Safety Sense"], condition: "Excellent",
          description: "Efficient Toyota Prius hybrid", power: "120 HP", seats: 5, doors: 5
        }
      ],
      "bike": [
        {
          id: "bike-2-1", type: "bike" as const, make: "Honda", model: "CBR600", year: 2021, price: 12000, mileage: 15000,
          fuelType: "Gasoline", transmission: "Manual", bodyType: "Sport", color: "Red",
          image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=250&fit=crop",
          features: ["ABS", "Digital Display"], condition: "Good",
          description: "Honda sport motorcycle", cc: 599, power: "120 HP"
        }
      ],
      "truck": []
    },
    "3": {
      "car": [
        {
          id: "car-3-1", type: "car" as const, make: "Tesla", model: "Model 3", year: 2024, price: 45000, mileage: 3000,
          fuelType: "Electric", transmission: "Automatic", bodyType: "Sedan", color: "Black",
          image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=400&h=250&fit=crop",
          features: ["Autopilot", "Supercharging", "Premium Interior"], condition: "New",
          description: "Tesla Model 3 with latest features", power: "350 HP", seats: 5, doors: 4
        },
        {
          id: "car-3-2", type: "car" as const, make: "Nissan", model: "Leaf", year: 2023, price: 35000, mileage: 8000,
          fuelType: "Electric", transmission: "Automatic", bodyType: "Hatchback", color: "White",
          image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=400&h=250&fit=crop",
          features: ["ProPILOT", "e-Pedal", "Climate Control"], condition: "Excellent",
          description: "Nissan Leaf electric vehicle", power: "150 HP", seats: 5, doors: 5
        }
      ],
      "bike": [
        {
          id: "bike-3-1", type: "bike" as const, make: "Zero", model: "SR/F", year: 2023, price: 22000, mileage: 5000,
          fuelType: "Electric", transmission: "Direct", bodyType: "Sport", color: "Black",
          image: "https://images.unsplash.com/photo-1580310614729-c9d6ac26adb4?w=400&h=250&fit=crop",
          features: ["Fast Charging", "App Connectivity"], condition: "New",
          description: "Zero electric motorcycle", power: "140 HP"
        }
      ],
      "truck": []
    },
    "4": {
      "car": [
        {
          id: "car-4-1", type: "car" as const, make: "Porsche", model: "911", year: 2023, price: 125000, mileage: 8000,
          fuelType: "Gasoline", transmission: "Manual", bodyType: "Coupe", color: "Red",
          image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop",
          features: ["Sport Package", "Premium Audio", "Carbon Fiber"], condition: "Excellent",
          description: "Iconic Porsche 911 sports car", engineSize: "3.0L", power: "450 HP", seats: 4, doors: 2
        },
        {
          id: "car-4-2", type: "car" as const, make: "BMW", model: "Z4", year: 2022, price: 65000, mileage: 12000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "Convertible", color: "Blue",
          image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
          features: ["Convertible Top", "Sport Suspension"], condition: "Good",
          description: "BMW Z4 convertible roadster", engineSize: "2.0L", power: "255 HP", seats: 2, doors: 2
        }
      ],
      "bike": [
        {
          id: "bike-4-1", type: "bike" as const, make: "Ducati", model: "Panigale", year: 2023, price: 28000, mileage: 3000,
          fuelType: "Gasoline", transmission: "Manual", bodyType: "Sport", color: "Red",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
          features: ["Racing Package", "Carbon Fiber", "Track Mode"], condition: "New",
          description: "Ducati Panigale superbike", cc: 1103, power: "215 HP"
        }
      ],
      "truck": []
    },
    "5": {
      "car": [
        {
          id: "car-5-1", type: "car" as const, make: "Mercedes", model: "S-Class", year: 2023, price: 110000, mileage: 10000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "Sedan", color: "Black",
          image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
          features: ["Massage Seats", "Night Vision", "Premium Audio"], condition: "Like New",
          description: "Mercedes S-Class luxury sedan", engineSize: "3.0L", power: "430 HP", seats: 5, doors: 4
        },
        {
          id: "car-5-2", type: "car" as const, make: "Porsche", model: "Cayenne", year: 2024, price: 95000, mileage: 5000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "SUV", color: "White",
          image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
          features: ["Air Suspension", "Sport Chrono", "Panoramic Roof"], condition: "New",
          description: "Porsche Cayenne luxury SUV", engineSize: "3.0L", power: "340 HP", seats: 5, doors: 5
        }
      ],
      "bike": [],
      "truck": []
    },
    "6": {
      "car": [
        {
          id: "car-6-1", type: "car" as const, make: "BMW", model: "3 Series", year: 2023, price: 48000, mileage: 15000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "Sedan", color: "Grey",
          image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
          features: ["Business Package", "Navigation", "Leather"], condition: "Good",
          description: "BMW 3 Series business sedan", engineSize: "2.0L", power: "255 HP", seats: 5, doors: 4
        },
        {
          id: "car-6-2", type: "car" as const, make: "Audi", model: "A4 Avant", year: 2022, price: 52000, mileage: 20000,
          fuelType: "Gasoline", transmission: "Automatic", bodyType: "Wagon", color: "Blue",
          image: "https://images.unsplash.com/photo-1606611719398-b3d80ac2b8ad?w=400&h=250&fit=crop",
          features: ["Quattro", "Virtual Cockpit", "Cargo Space"], condition: "Good",
          description: "Audi A4 Avant business wagon", engineSize: "2.0L", power: "250 HP", seats: 5, doors: 5
        }
      ],
      "bike": [],
      "truck": [
        {
          id: "truck-6-1", type: "truck" as const, make: "Ford", model: "Transit", year: 2022, price: 38000, mileage: 30000,
          fuelType: "Diesel", transmission: "Manual", bodyType: "Van", color: "White",
          image: "https://images.unsplash.com/photo-1586237040238-6d3f84c1beb3?w=400&h=250&fit=crop",
          features: ["Fleet Package", "GPS", "Safety Systems"], condition: "Good",
          description: "Ford Transit commercial van", engineSize: "2.0L", power: "130 HP"
        }
      ]
    }
  };

  return vehicleListings[dealerId]?.[type] || [];
};

// Dealer data
const getDealerById = (id: string): DealerProfile | null => {
  const dealers: Record<string, DealerProfile> = {
    "1": {
      id: "1", name: "AutoMax Premium", location: "Berlin, Germany",
      phone: "+49 30 123-456-78", email: "info@automax-premium.com", rating: 4.8, reviewCount: 245,
      hours: { weekdays: "9:00 AM - 8:00 PM", saturday: "9:00 AM - 6:00 PM", sunday: "11:00 AM - 5:00 PM" },
      carListings: getVehicleListingsByDealer("1", "car"),
      bikeListings: getVehicleListingsByDealer("1", "bike"),
      truckListings: getVehicleListingsByDealer("1", "truck")
    },
    "2": {
      id: "2", name: "City Motors GmbH", location: "Munich, Germany",
      phone: "+49 89 876-543-21", email: "contact@citymotors.com", rating: 4.6, reviewCount: 189,
      hours: { weekdays: "8:00 AM - 7:00 PM", saturday: "9:00 AM - 5:00 PM", sunday: "Closed" },
      carListings: getVehicleListingsByDealer("2", "car"),
      bikeListings: getVehicleListingsByDealer("2", "bike"),
      truckListings: getVehicleListingsByDealer("2", "truck")
    },
    "3": {
      id: "3", name: "EcoWheels Hamburg", location: "Hamburg, Germany",
      phone: "+49 40 112-233-44", email: "hello@ecowheels.com", rating: 4.9, reviewCount: 156,
      hours: { weekdays: "9:00 AM - 7:00 PM", saturday: "9:00 AM - 5:00 PM", sunday: "12:00 PM - 5:00 PM" },
      carListings: getVehicleListingsByDealer("3", "car"),
      bikeListings: getVehicleListingsByDealer("3", "bike"),
      truckListings: getVehicleListingsByDealer("3", "truck")
    },
    "4": {
      id: "4", name: "Rhein Auto Solutions", location: "Cologne, Germany",
      phone: "+49 221 987-654-32", email: "service@rhein-auto.com", rating: 4.7, reviewCount: 312,
      hours: { weekdays: "9:00 AM - 8:00 PM", saturday: "9:00 AM - 6:00 PM", sunday: "11:00 AM - 5:00 PM" },
      carListings: getVehicleListingsByDealer("4", "car"),
      bikeListings: getVehicleListingsByDealer("4", "bike"),
      truckListings: getVehicleListingsByDealer("4", "truck")
    },
    "5": {
      id: "5", name: "Stuttgart Luxury Motors", location: "Stuttgart, Germany",
      phone: "+49 711 556-677-88", email: "info@stuttgart-luxury.com", rating: 4.8, reviewCount: 278,
      hours: { weekdays: "10:00 AM - 8:00 PM", saturday: "10:00 AM - 6:00 PM", sunday: "12:00 PM - 5:00 PM" },
      carListings: getVehicleListingsByDealer("5", "car"),
      bikeListings: getVehicleListingsByDealer("5", "bike"),
      truckListings: getVehicleListingsByDealer("5", "truck")
    },
    "6": {
      id: "6", name: "Nord Fahrzeuge", location: "Frankfurt, Germany",
      phone: "+49 69 445-566-77", email: "verkauf@nordfahrzeuge.com", rating: 4.5, reviewCount: 203,
      hours: { weekdays: "8:00 AM - 7:00 PM", saturday: "9:00 AM - 6:00 PM", sunday: "Closed" },
      carListings: getVehicleListingsByDealer("6", "car"),
      bikeListings: getVehicleListingsByDealer("6", "bike"),
      truckListings: getVehicleListingsByDealer("6", "truck")
    }
  };
  
  return dealers[id] || null;
};

export default function DealerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<'all' | 'car' | 'bike' | 'truck'>('all');
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const dealer = getDealerById(id || '');

  if (!dealer) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle>{t('dealer.notFound')}</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">The requested dealer could not be found.</p>
            <Button onClick={() => navigate('/registered-dealers')} className="w-full">
              {t('common.viewAll')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Combine all vehicle listings
  const allVehicles = [
    ...dealer.carListings,
    ...dealer.bikeListings, 
    ...dealer.truckListings
  ];

  const filteredVehicles = activeFilter === 'all' 
    ? allVehicles 
    : allVehicles.filter(v => v.type === activeFilter);

  const getVehicleIcon = (type: string) => {
    switch(type) {
      case 'car': return <Car className="h-4 w-4" />;
      case 'bike': return <Bike className="h-4 w-4" />;
      case 'truck': return <Truck className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const handleFavoriteClick = (vehicle: VehicleListing, event: React.MouseEvent) => {
    event.stopPropagation();
    
    toggleFavorite({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      image: vehicle.image,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={() => navigate('/registered-dealers')} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dealers
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {dealer.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Professional dealer with {filteredVehicles.length} vehicles in inventory
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Dealer Contact Info */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{t('dealer.information')}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(dealer.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-semibold">{dealer.rating}</span>
                    <span className="text-muted-foreground ml-1">({dealer.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t('common.location')}</span>
                </div>
                <div className="text-muted-foreground">{dealer.location}</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t('common.phone')}</span>
                </div>
                <div className="text-muted-foreground">{dealer.phone}</div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t('common.email')}</span>
                </div>
                <div className="text-muted-foreground">{dealer.email}</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t('dealer.businessHours')}</span>
                </div>
                <div className="text-muted-foreground text-sm space-y-1">
                  <div>Mon-Fri: {dealer.hours.weekdays}</div>
                  <div>Saturday: {dealer.hours.saturday}</div>
                  <div>Sunday: {dealer.hours.sunday}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Filter Buttons */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('dealer.vehicleInventory')}</h2>
              <p className="text-muted-foreground">Browse our selection of {filteredVehicles.length} available vehicles</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                size="sm"
                className="rounded-full"
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'car' ? 'default' : 'outline'} 
                size="sm"
                className="rounded-full"
                onClick={() => setActiveFilter('car')}
              >
                Cars ({dealer.carListings.length})
              </Button>
              <Button 
                variant={activeFilter === 'bike' ? 'default' : 'outline'} 
                size="sm"
                className="rounded-full"
                onClick={() => setActiveFilter('bike')}
              >
                Bikes ({dealer.bikeListings.length})
              </Button>
              <Button 
                variant={activeFilter === 'truck' ? 'default' : 'outline'} 
                size="sm"
                className="rounded-full"
                onClick={() => setActiveFilter('truck')}
              >
                Trucks ({dealer.truckListings.length})
              </Button>
            </div>
          </div>

          {/* Vehicle Grid */}
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No vehicles available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer border-zinc-100 rounded-2xl" onClick={() => navigate(`/cars/${vehicle.id}`)}>
                  <div className="relative">
                    <ImageWithFallback
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full transition-colors ${
                        isFavorite(vehicle.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={(e) => handleFavoriteClick(vehicle, e)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(vehicle.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                      {dealer.name}
                    </Badge>
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white rounded-full">
                      {vehicle.condition}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="mb-2 group-hover:text-primary transition-colors">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="text-2xl font-bold text-primary mb-3">
                      €{vehicle.price.toLocaleString()}
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {vehicle.year}
                        </div>
                        <div className="flex items-center">
                          <Gauge className="h-3 w-3 mr-1" />
                          {vehicle.mileage.toLocaleString()} km
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Fuel className="h-3 w-3 mr-1" />
                          {vehicle.fuelType}
                        </div>
                        <span>{vehicle.transmission}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      📍 {dealer.location}
                    </div>
                    
                    <Button 
                      className="w-full mt-3 bg-black text-white hover:bg-black/90 rounded-full h-12"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/cars/${vehicle.id}`);
                      }}
                    >
                      {t('common.view')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}