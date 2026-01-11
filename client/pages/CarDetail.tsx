import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useFavorites } from "@/hooks/useFavorites";
import { useCar } from "@/hooks/useCars";
import { ContactCarModal } from "@/components/ContactCarModal";
import { ShareCarModal } from "@/components/ShareCarModal";
import { ScheduleTestDriveModal } from "@/components/ScheduleTestDriveModal";
import { FinancingModal } from "@/components/FinancingModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Users,
  Shield,
  CheckCircle,
  Star,
  AlertCircle,
  Expand,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock data for demo cars that don't exist in the database
const mockCars: { [key: string]: any } = {
  "550e8400-e29b-41d4-a716-446655440001": {
    id: "550e8400-e29b-41d4-a716-446655440001",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42990,
    mileage: 5420,
    fuelType: "Electric",
    transmission: "Automatic",
    images: ["https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    location: "San Francisco, CA",
    seller: {
      name: "Tesla San Francisco",
      dealerName: "Tesla San Francisco",
      role: "DEALER",
      dealerPhoneNumber: "(415) 555-0123",
      email: "contact@teslasf.com"
    },
    description: "This certified pre-owned Tesla Model 3 delivers incredible performance and efficiency with its all-electric powertrain. Features include Autopilot, premium interior, and over-the-air updates.",
    createdAt: new Date().toISOString()
  },
  "550e8400-e29b-41d4-a716-446655440002": {
    id: "550e8400-e29b-41d4-a716-446655440002",
    make: "BMW",
    model: "X5",
    year: 2024,
    price: 67800,
    mileage: 1200,
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: ["https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    location: "Los Angeles, CA",
    seller: {
      name: "BMW of Los Angeles",
      dealerName: "BMW of Los Angeles",
      role: "DEALER",
      dealerPhoneNumber: "(323) 555-0456",
      email: "sales@bmwla.com"
    },
    description: "Brand new BMW X5 with luxurious interior, advanced driver assistance features, and powerful twin-turbo engine. Perfect for families who demand both performance and comfort.",
    createdAt: new Date().toISOString()
  },
  "550e8400-e29b-41d4-a716-446655440003": {
    id: "550e8400-e29b-41d4-a716-446655440003",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28450,
    mileage: 8900,
    fuelType: "Hybrid",
    transmission: "CVT",
    images: ["https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    location: "Austin, TX",
    seller: {
      name: "Toyota of Austin",
      dealerName: "Toyota of Austin",
      role: "DEALER",
      dealerPhoneNumber: "(512) 555-0789",
      email: "info@toyotaaustin.com"
    },
    description: "Excellent fuel economy and reliability in this hybrid Camry. Features Toyota Safety Sense 2.0, premium audio system, and spacious interior perfect for daily commuting.",
    createdAt: new Date().toISOString()
  },
  "550e8400-e29b-41d4-a716-446655440004": {
    id: "550e8400-e29b-41d4-a716-446655440004",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 45600,
    mileage: 3200,
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: ["https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    location: "Miami, FL",
    seller: {
      name: "Mercedes-Benz of Miami",
      dealerName: "Mercedes-Benz of Miami",
      role: "DEALER",
      dealerPhoneNumber: "(305) 555-0321",
      email: "sales@mbmiami.com"
    },
    description: "Luxury and performance meet in this stunning C-Class sedan. Features MBUX infotainment, premium leather seats, and advanced safety technology.",
    createdAt: new Date().toISOString()
  },
  "550e8400-e29b-41d4-a716-446655440005": {
    id: "550e8400-e29b-41d4-a716-446655440005",
    make: "Honda",
    model: "Civic",
    year: 2024,
    price: 24200,
    mileage: 500,
    fuelType: "Gasoline",
    transmission: "Manual",
    images: ["https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    location: "Chicago, IL",
    seller: {
      name: "Honda of Chicago",
      dealerName: "Honda of Chicago",
      role: "DEALER",
      dealerPhoneNumber: "(312) 555-0654",
      email: "contact@hondachicago.com"
    },
    description: "Brand new Honda Civic with manual transmission for driving enthusiasts. Excellent fuel economy, spacious interior, and Honda's legendary reliability.",
    createdAt: new Date().toISOString()
  },
  "550e8400-e29b-41d4-a716-446655440006": {
    id: "550e8400-e29b-41d4-a716-446655440006",
    make: "Audi",
    model: "A4",
    year: 2023,
    price: 39800,
    mileage: 6700,
    fuelType: "Gasoline",
    transmission: "Automatic",
    images: ["https://images.pexels.com/photos/33419739/pexels-photo-33419739.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    location: "Seattle, WA",
    seller: {
      name: "Audi Seattle",
      dealerName: "Audi Seattle",
      role: "DEALER",
      dealerPhoneNumber: "(206) 555-0987",
      email: "info@audiseattle.com"
    },
    description: "Sophisticated Audi A4 with quattro all-wheel drive, Virtual Cockpit, and premium Bang & Olufsen sound system. Perfect balance of luxury and performance.",
    createdAt: new Date().toISOString()
  }
};

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { car: apiCar, isLoading, error } = useCar(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Use mock data if API fails and we have mock data for this ID
  const car = apiCar || (id && mockCars[id] ? mockCars[id] : null);
  const isMockCar = !apiCar && id && mockCars[id];

  if (isLoading && !isMockCar) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if ((error && !isMockCar) || !car) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              {t('carDetail.errors.carNotFound')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <p className="text-muted-foreground">
              {error ? t('carDetail.errors.failedToLoad') : t('carDetail.errors.doesntExist')}
            </p>
            <Button onClick={() => navigate('/cars')} className="w-full">
              {t('carDetail.errors.backToCars')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transform the API data to match the expected format
  const carData = {
    id: car.id,
    make: car.make || t('carDetail.mockData.unknownMake'),
    model: car.model || t('carDetail.mockData.unknownModel'),
    year: car.year || 2023,
    price: car.price || 0,
    originalPrice: car.price ? car.price + 3000 : 3000, // Mock original price for demo
    mileage: car.mileage || 0,
    vin: `VIN${car.id.slice(-8).toUpperCase()}`, // Mock VIN
    condition: t('carDetail.mockData.excellent'), // Mock condition
    fuelType: car.fuelType || t('carDetail.mockData.gasoline'),
    transmission: car.transmission || t('carDetail.mockData.automatic'),
    exteriorColor: car.color || t('carDetail.mockData.unknown'),
    interiorColor: t('carDetail.mockData.black'), // Mock interior color
    bodyType: car.bodyType || t('carDetail.mockData.sedan'),
    drivetrain: t('carDetail.mockData.frontWheelDrive'), // Mock drivetrain
    description: car.description || t('carDetail.mockData.wellMaintained'),
    features: [
      t('carDetail.mockData.features.airConditioning'),
      t('carDetail.mockData.features.powerSteering'),
      t('carDetail.mockData.features.electricWindows'),
      t('carDetail.mockData.features.centralLocking'),
      t('carDetail.mockData.features.airbags'),
      t('carDetail.mockData.features.abs'),
      t('carDetail.mockData.features.powerBrakes'),
      t('carDetail.mockData.features.amfmRadio')
    ], // Mock features
    location: car.location || t('carDetail.mockData.locationNotSpecified'),
    dealer: {
      name: car.seller?.dealerName || car.seller?.name || t('carDetail.mockData.privateSeller')
    },
    dealerInfo: {
      name: car.seller?.dealerName || car.seller?.name || t('carDetail.mockData.privateSeller'),
      rating: 4.5, // Mock rating
      reviewCount: 89, // Mock review count
      phone: car.seller?.dealerPhoneNumber || "(555) 123-4567",
      email: car.seller?.email || "contact@dealer.com",
      verified: car.seller?.role === 'DEALER'
    },
    images: car.images && car.images.length > 0 
      ? car.images 
      : ["https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"],
    inspection: {
      date: new Date(car.createdAt || Date.now()).toISOString().split('T')[0],
      score: 8.5, // Mock inspection score
      report: t('carDetail.mockData.inspectionReport')
    },
    history: [
      { date: new Date(car.createdAt || Date.now()).toISOString().split('T')[0], event: t('carDetail.history.listedForSale'), description: t('carDetail.history.vehicleAdded') },
      { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], event: t('carDetail.history.lastService'), description: t('carDetail.history.regularMaintenance') }
    ]
  };

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

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: carData.id,
      make: carData.make,
      model: carData.model,
      year: carData.year,
      price: carData.price,
      images: carData.images,
    });
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCallDealer = () => {
    if (carData.dealerInfo.phone) {
      // Remove any formatting and create tel: link
      const cleanPhone = carData.dealerInfo.phone.replace(/\D/g, '');
      window.location.href = `tel:+1${cleanPhone}`;
    } else {
      // If no phone available, show message modal
      setIsContactModalOpen(true);
    }
  };

  const handleViewDealerCars = () => {
    // Navigate to BrowseCars page with dealer filter
    navigate(`/cars?dealer=${encodeURIComponent(carData.dealerInfo.name)}`);
  };

  const handleViewDealerProfile = () => {
    // Navigate to dealer profile page - using dealer ID (for now use "1" as demo)
    const dealerId = "1"; // In real app, this would come from the car data
    navigate(`/dealer/${dealerId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/cars" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-full px-4 py-2 hover:bg-zinc-100">
              <ArrowLeft className="h-4 w-4" />
              {t('carDetail.backToSearch')}
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleFavoriteClick} className="rounded-full transition-colors">
                <Heart className={`h-5 w-5 ${isFavorite(carData.id) ? 'fill-red-500 text-red-500' : 'hover:text-red-500'}`} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsShareModalOpen(true)}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden cursor-pointer group border border-zinc-100 bg-zinc-50"
                   style={{borderRadius: '16px'}}
                   onClick={() => {
                     setFullscreenImageIndex(currentImageIndex);
                     setIsFullscreenModalOpen(true);
                   }}>
                <ImageWithFallback
                  src={carData.images[currentImageIndex]}
                  alt={`${carData.year} ${carData.make} ${carData.model}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-success text-success-foreground rounded-full">
                    {t('carDetail.certified')}
                  </Badge>
                  {carData.originalPrice > carData.price && (
                    <Badge variant="destructive">
                      ${carData.originalPrice - carData.price} {t('carDetail.savingsAmount')}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                    <Expand className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex gap-2 overflow-x-auto">
                {carData.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 overflow-hidden border-2 transition-colors hover:border-primary/60 ${
                      currentImageIndex === index ? 'border-primary' : 'border-zinc-100'
                    }`}
                    style={{borderRadius: '12px'}}
                  >
                    <ImageWithFallback src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Information Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">{t('carDetail.tabs.overview')}</TabsTrigger>
                <TabsTrigger value="features">{t('carDetail.tabs.features')}</TabsTrigger>
                <TabsTrigger value="inspection">{t('carDetail.tabs.inspection')}</TabsTrigger>
                <TabsTrigger value="history">{t('carDetail.tabs.history')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card className="border-zinc-100 rounded-2xl">
                  <CardHeader>
                    <CardTitle>{t('carDetail.overview.vehicleDetails')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.mileage')}</div>
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <span>{formatMileage(carData.mileage)} {t('carDetail.overview.miles')}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.fuelType')}</div>
                        <div className="flex items-center gap-2">
                          <Fuel className="h-4 w-4 text-muted-foreground" />
                          <span>{carData.fuelType}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.transmission')}</div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{carData.transmission}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.year')}</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{carData.year}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.exteriorColor')}</div>
                        <span>{carData.exteriorColor}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.interiorColor')}</div>
                        <span>{carData.interiorColor}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.bodyType')}</div>
                        <span>{carData.bodyType}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.drivetrain')}</div>
                        <span>{carData.drivetrain}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.vin')}</div>
                        <span className="font-mono text-xs">{carData.vin}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-zinc-100 rounded-2xl">
                  <CardHeader>
                    <CardTitle>{t('carDetail.overview.description')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {carData.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <Card className="border-zinc-100 rounded-2xl">
                  <CardHeader>
                    <CardTitle>{t('carDetail.features.featuresAndOptions')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {carData.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inspection" className="space-y-4">
                <Card className="border-zinc-100 rounded-2xl">
                  <CardHeader>
                    <CardTitle>{t('carDetail.inspection.title')}</CardTitle>
                    <CardDescription>{t('carDetail.inspection.lastUpdated')} {carData.inspection.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-success">{carData.inspection.score}/10</div>
                      <div>
                        <div className="font-medium">{t('carDetail.inspection.excellentCondition')}</div>
                        <div className="text-sm text-muted-foreground">{t('carDetail.inspection.pointInspection')}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{carData.inspection.report}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card className="border-zinc-100 rounded-2xl">
                  <CardHeader>
                    <CardTitle>{t('carDetail.history.vehicleHistory')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {carData.history.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium">{event.event === 'Listed for sale' ? t('carDetail.history.listedForSale') : event.event === 'Last service' ? t('carDetail.history.lastService') : event.event}</div>
                            <div className="text-sm text-muted-foreground">{event.date}</div>
                            <div className="text-sm text-muted-foreground">{event.description === 'Vehicle added to marketplace' ? t('carDetail.history.vehicleAdded') : event.description === 'Regular maintenance completed' ? t('carDetail.history.regularMaintenance') : event.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {carData.year} {carData.make} {carData.model}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {carData.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {formatPrice(carData.price)}
                  </div>
                  {carData.originalPrice > carData.price && (
                    <div className="text-sm text-muted-foreground line-through">
                      {formatPrice(carData.originalPrice)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button onClick={handleCallDealer} className="w-full bg-black text-white hover:bg-black/90 rounded-full h-12" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    {t('carDetail.actions.callDealer')}
                  </Button>
                  <Button onClick={() => setIsContactModalOpen(true)} variant="outline" className="w-full border-zinc-100 rounded-full h-12" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('carDetail.actions.sendMessage')}
                  </Button>
                  <Button onClick={() => setIsTestDriveModalOpen(true)} variant="outline" className="w-full border-zinc-100 rounded-full h-12">
                    {t('carDetail.actions.scheduleTestDrive')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dealer Info */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  {t('carDetail.seller.sellerInformation')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <button 
                    onClick={handleViewDealerProfile}
                    className="font-medium text-left hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    {carData.dealerInfo.name}
                  </button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(carData.dealerInfo.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      <span className="ml-1">{carData.dealerInfo.rating}</span>
                    </div>
                    <span>({carData.dealerInfo.reviewCount} {t('carDetail.seller.reviews')})</span>
                    {carData.dealerInfo.verified && (
                      <Badge variant="secondary" className="text-xs rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('carDetail.seller.verified')}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {carData.dealerInfo.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {carData.dealerInfo.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button onClick={handleViewDealerProfile} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12">
                    {t('carDetail.actions.viewDealerProfile')}
                  </Button>
                  <Button onClick={handleViewDealerCars} variant="outline" className="w-full border-zinc-100 rounded-full h-12">
                    {t('carDetail.actions.viewAllDealerCars')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financing Options */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('carDetail.financing.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  {t('carDetail.financing.estimatedPayment')}
                </div>
                <div className="text-2xl font-bold">€649{t('carDetail.financing.monthlyPayment')}</div>
                <div className="text-xs text-muted-foreground">
                  {t('carDetail.financing.basedOnTerms')} 6.5% {t('carDetail.financing.aprForMonths')} 72 {t('carDetail.financing.withDown')} €5,000 down
                </div>
                <Button onClick={() => setIsFinancingModalOpen(true)} variant="outline" className="w-full border-zinc-100 rounded-full h-12">
                  {t('carDetail.actions.getPreApproved')}
                </Button>
                <Link to="/financing" className="block">
                  <Button variant="ghost" className="w-full text-sm rounded-full h-12">
                    {t('carDetail.actions.calculatePayment')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactCarModal
        car={{
          id: carData.id,
          make: carData.make,
          model: carData.model,
          year: carData.year,
          price: carData.price,
          images: carData.images,
          dealer: carData.dealerInfo.name
        }}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Share Modal */}
      <ShareCarModal
        car={{
          id: carData.id,
          make: carData.make,
          model: carData.model,
          year: carData.year,
          price: carData.price,
          images: carData.images,
          location: carData.location,
          description: carData.description
        }}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Schedule Test Drive Modal */}
      <ScheduleTestDriveModal
        car={{
          id: carData.id,
          make: carData.make,
          model: carData.model,
          year: carData.year,
          price: carData.price,
          images: carData.images,
          dealer: carData.dealer
        }}
        isOpen={isTestDriveModalOpen}
        onClose={() => setIsTestDriveModalOpen(false)}
      />

      {/* Financing Modal */}
      <FinancingModal
        car={{
          id: carData.id,
          make: carData.make,
          model: carData.model,
          year: carData.year,
          price: carData.price,
          images: carData.images
        }}
        isOpen={isFinancingModalOpen}
        onClose={() => setIsFinancingModalOpen(false)}
      />

      {/* Fullscreen Image Modal */}
      <Dialog open={isFullscreenModalOpen} onOpenChange={setIsFullscreenModalOpen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsFullscreenModalOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image Navigation Buttons */}
            {carData.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => {
                    const newIndex = fullscreenImageIndex === 0 
                      ? carData.images.length - 1 
                      : fullscreenImageIndex - 1;
                    setFullscreenImageIndex(newIndex);
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => {
                    const newIndex = fullscreenImageIndex === carData.images.length - 1 
                      ? 0 
                      : fullscreenImageIndex + 1;
                    setFullscreenImageIndex(newIndex);
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <ImageWithFallback
                src={carData.images[fullscreenImageIndex]}
                alt={`${carData.year} ${carData.make} ${carData.model} - Image ${fullscreenImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Image Counter */}
            {carData.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {fullscreenImageIndex + 1} {t('carDetail.imageCounter')} {carData.images.length}
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            {carData.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex gap-2 max-w-sm overflow-x-auto px-2">
                  {carData.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setFullscreenImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                        fullscreenImageIndex === index ? 'border-white' : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <ImageWithFallback src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
