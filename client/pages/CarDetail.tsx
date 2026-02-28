import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { SEO } from "@/components/SEO";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { car, isLoading, error } = useCar(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !car) {
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

  // Map API data to display format using real fields
  const imageUrls = car.images && car.images.length > 0
    ? car.images.map((img: any) => typeof img === 'string' ? img : img.url)
    : [];

  const sellerName = car.seller?.dealerName || car.seller?.name || t('carDetail.seller.privateSeller');
  const sellerPhone = car.contactPhone || car.seller?.dealerPhoneNumber;
  const sellerEmail = car.contactEmail || car.seller?.email;
  const isDealer = car.seller?.dealerName != null;

  // Translate stored enum values to localized display strings
  const translateFuelType = (value: string) => {
    const map: Record<string, string> = {
      GASOLINE: t('sell.fuelTypes.gasoline'),
      DIESEL: t('sell.fuelTypes.diesel'),
      ELECTRIC: t('sell.fuelTypes.electric'),
      HYBRID: t('sell.fuelTypes.hybrid'),
      LPG: t('sell.fuelTypes.lpg'),
      CNG: t('sell.fuelTypes.cng'),
    };
    return map[value] || value;
  };

  const translateTransmission = (value: string) => {
    const map: Record<string, string> = {
      AUTOMATIC: t('sell.transmissions.automatic'),
      MANUAL: t('sell.transmissions.manual'),
      CVT: t('sell.transmissions.cvt'),
    };
    return map[value] || value;
  };

  const translateCondition = (value: string) => {
    const map: Record<string, string> = {
      NEW: t('sell.conditions.new'),
      CERTIFIED: t('sell.conditions.excellent'),
      USED: t('sell.conditions.good'),
      DAMAGED: t('sell.conditions.fair'),
    };
    return map[value] || value;
  };

  const translateBodyType = (value: string) => {
    const map: Record<string, string> = {
      CAR: t('sell.vehicleTypes.car.name'),
      TRUCK: t('sell.vehicleTypes.truck.name'),
      MOTORBIKE: t('sell.vehicleTypes.motorbike.name'),
      SEDAN: t('sell.bodyTypes.sedan'),
      SUV: t('sell.bodyTypes.suv'),
      COUPE: t('sell.bodyTypes.coupe'),
      HATCHBACK: t('sell.bodyTypes.hatchback'),
      CONVERTIBLE: t('sell.bodyTypes.convertible'),
      WAGON: t('sell.bodyTypes.wagon'),
      VAN: t('sell.bodyTypes.van'),
      CROSSOVER: t('sell.bodyTypes.crossover'),
    };
    return map[value] || value;
  };

  const translateColor = (value: string) => {
    if (!value) return value;
    const key = value.toLowerCase();
    const map: Record<string, string> = {
      black: t('sell.colors.black'),
      white: t('sell.colors.white'),
      silver: t('sell.colors.silver'),
      gray: t('sell.colors.gray'),
      grey: t('sell.colors.gray'),
      red: t('sell.colors.red'),
      blue: t('sell.colors.blue'),
      green: t('sell.colors.green'),
      brown: t('sell.colors.brown'),
      gold: t('sell.colors.gold'),
      orange: t('sell.colors.orange'),
      purple: t('sell.colors.purple'),
      yellow: t('sell.colors.yellow'),
      beige: t('sell.colors.beige'),
    };
    return map[key] || value;
  };

  const carData = {
    id: car.id,
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    originalPrice: car.originalPrice,
    mileage: car.mileage,
    vin: car.vin,
    condition: car.condition,
    fuelType: car.fuelType,
    transmission: car.transmission,
    exteriorColor: car.color,
    interiorColor: car.interiorColor,
    bodyType: car.vehicleType,
    drivetrain: car.drivetrain,
    description: car.description,
    features: [...(car.features || []), ...(car.safetyFeatures || [])],
    location: car.location,
    dealer: { name: sellerName },
    dealerInfo: {
      name: sellerName,
      phone: sellerPhone,
      email: sellerEmail,
      verified: isDealer,
    },
    images: imageUrls,
    isCertified: car.isCertified,
    history: [
      { date: new Date(car.createdAt || Date.now()).toISOString().split('T')[0], event: t('carDetail.history.listedForSale'), description: t('carDetail.history.vehicleAdded') },
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

  const handleCallDealer = () => {
    if (carData.dealerInfo.phone) {
      const cleanPhone = carData.dealerInfo.phone.replace(/\D/g, '');
      window.location.href = `tel:${cleanPhone}`;
    } else {
      setIsContactModalOpen(true);
    }
  };

  const handleViewDealerCars = () => {
    navigate(`/cars?dealer=${encodeURIComponent(carData.dealerInfo.name)}`);
  };

  const handleViewDealerProfile = () => {
    const dealerId = car.seller?.id || "1";
    navigate(`/dealer/${dealerId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO
        title={`${carData.year} ${carData.make} ${carData.model}`}
        description={`${carData.year} ${carData.make} ${carData.model} - ${carData.mileage.toLocaleString()} km, ${carData.fuelType}, ${carData.transmission}. ${carData.price.toLocaleString()} EUR on CarMarket365.`}
        canonical={`/cars/${car.id}`}
        ogImage={imageUrls[0]}
        ogType="product"
      />
      {/* Header */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/cars" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-full px-4 py-3 min-h-[44px] hover:bg-zinc-100">
              <ArrowLeft className="h-4 w-4" />
              {t('carDetail.backToSearch')}
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleFavoriteClick} aria-label={t('carDetail.saveCar')} className="rounded-full transition-colors">
                <Heart className={`h-5 w-5 ${isFavorite(carData.id) ? 'fill-red-500 text-red-500' : 'hover:text-red-500'}`} />
              </Button>
              <Button variant="ghost" size="icon" aria-label={t('carDetail.shareCar')} className="rounded-full" onClick={() => setIsShareModalOpen(true)}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              {carData.images.length > 0 ? (
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
                    {carData.isCertified && (
                      <Badge className="bg-success text-success-foreground rounded-full">
                        {t('carDetail.certified')}
                      </Badge>
                    )}
                    {carData.originalPrice && carData.originalPrice > carData.price && (
                      <Badge variant="destructive">
                        ${Math.round(carData.originalPrice - carData.price)} {t('carDetail.savingsAmount')}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                      <Expand className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[16/10] overflow-hidden border border-zinc-100 bg-zinc-100 flex items-center justify-center"
                     style={{borderRadius: '16px'}}>
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">{t('carDetail.noImages')}</p>
                  </div>
                </div>
              )}

              {/* Thumbnail Navigation */}
              {carData.images.length > 1 && (
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
              )}
            </div>

            {/* Vehicle Information Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
                <TabsTrigger value="overview">{t('carDetail.tabs.overview')}</TabsTrigger>
                <TabsTrigger value="features">{t('carDetail.tabs.features')}</TabsTrigger>
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
                          <span>{translateFuelType(carData.fuelType)}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.transmission')}</div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{translateTransmission(carData.transmission)}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">{t('carDetail.overview.year')}</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{carData.year}</span>
                        </div>
                      </div>
                      {carData.condition && (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{t('carDetail.overview.condition')}</div>
                          <span>{translateCondition(carData.condition)}</span>
                        </div>
                      )}
                      {carData.exteriorColor && (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{t('carDetail.overview.exteriorColor')}</div>
                          <span>{translateColor(carData.exteriorColor)}</span>
                        </div>
                      )}
                      {carData.interiorColor && (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{t('carDetail.overview.interiorColor')}</div>
                          <span>{translateColor(carData.interiorColor)}</span>
                        </div>
                      )}
                      {carData.bodyType && (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{t('carDetail.overview.bodyType')}</div>
                          <span>{translateBodyType(carData.bodyType)}</span>
                        </div>
                      )}
                      {carData.drivetrain && (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{t('carDetail.overview.drivetrain')}</div>
                          <span>{carData.drivetrain}</span>
                        </div>
                      )}
                      {carData.vin && (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{t('carDetail.overview.vin')}</div>
                          <span className="font-mono text-xs">{carData.vin}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {carData.description && (
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
                )}
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <Card className="border-zinc-100 rounded-2xl">
                  <CardHeader>
                    <CardTitle>{t('carDetail.features.featuresAndOptions')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {carData.features.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {carData.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        {t('carDetail.features.noFeatures')}
                      </p>
                    )}
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
                            <div className="font-medium">{event.event}</div>
                            <div className="text-sm text-muted-foreground">{event.date}</div>
                            <div className="text-sm text-muted-foreground">{event.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Price and Contact (shows first on mobile) */}
          <div className="order-first lg:order-none space-y-6">
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
                  {carData.originalPrice && carData.originalPrice > carData.price && (
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

            {/* Seller Info */}
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    {carData.dealerInfo.verified && (
                      <Badge variant="secondary" className="text-xs rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('carDetail.seller.verified')}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {carData.dealerInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {carData.dealerInfo.phone}
                    </div>
                  )}
                  {carData.dealerInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {carData.dealerInfo.email}
                    </div>
                  )}
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
                <div className="text-2xl font-bold">{formatPrice(Math.round(carData.price / 72))}{t('carDetail.financing.monthlyPayment')}</div>
                <div className="text-xs text-muted-foreground">
                  {t('carDetail.financing.basedOnTerms')} 6.5% {t('carDetail.financing.aprForMonths')} 72
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
          description: carData.description || ''
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
      {carData.images.length > 0 && (
        <Dialog open={isFullscreenModalOpen} onOpenChange={setIsFullscreenModalOpen}>
          <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-black/95" aria-describedby={undefined}>
            <DialogTitle className="sr-only">{t('carDetail.imageGallery')}</DialogTitle>
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
      )}
    </div>
  );
}
