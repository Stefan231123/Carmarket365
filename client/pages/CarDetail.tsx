import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "@/hooks/useTranslation";
import { SEO } from "@/components/SEO";
import { useFavorites } from "@/hooks/useFavorites";
import { useCar } from "@/hooks/useCars";
import { GET_CARS, Car } from "@/lib/graphql/operations";
import { ContactCarModal } from "@/components/ContactCarModal";
import { ShareCarModal } from "@/components/ShareCarModal";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  ChevronRight,
  Link2,
  Check
} from "lucide-react";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { car, isLoading, error } = useCar(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);


  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Fetch other listings from the same seller (must be before early returns)
  const sellerId = car?.seller?.id;
  const { data: sellerCarsData } = useQuery<{ getCars: Car[] }>(GET_CARS, {
    variables: { filters: { sellerId } },
    skip: !sellerId,
    fetchPolicy: 'cache-first',
  });
  const sellerOtherCars = (sellerCarsData?.getCars || []).filter(c => c.id !== car?.id).slice(0, 6);

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
  const dealerAddress = car.seller?.dealerAddress;
  const dealerCity = car.seller?.dealerCity;

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
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              {carData.images.length > 0 ? (
                <div className="relative overflow-hidden cursor-pointer group border border-zinc-100 bg-zinc-50 flex items-center justify-center rounded-2xl max-h-[300px] sm:max-h-[450px] lg:max-h-[600px]"
                     onClick={() => {
                       setFullscreenImageIndex(currentImageIndex);
                       setIsFullscreenModalOpen(true);
                     }}>
                  <ImageWithFallback
                    src={carData.images[currentImageIndex]}
                    alt={`${carData.year} ${carData.make} ${carData.model}`}
                    className="max-w-full max-h-[300px] sm:max-h-[450px] lg:max-h-[600px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {carData.isCertified && (
                      <Badge className="bg-success text-success-foreground rounded-full">
                        {t('carDetail.certified')}
                      </Badge>
                    )}
                    {carData.originalPrice && carData.originalPrice > carData.price && (
                      <Badge variant="destructive">
                        €{Math.round(carData.originalPrice - carData.price)} {t('carDetail.savingsAmount')}
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4">
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

                </div>

                {/* Share Buttons */}
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">{t('carDetail.shareOnSocial')}</p>
                  <div className="flex items-center gap-2">
                    {/* Facebook */}
                    <button
                      onClick={() => {
                        const url = encodeURIComponent(window.location.href);
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                      }}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </button>
                    {/* X (Twitter) */}
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(`${carData.year} ${carData.make} ${carData.model} - ${formatPrice(carData.price)}`);
                        const url = encodeURIComponent(window.location.href);
                        window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
                      }}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
                      aria-label="Share on X"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </button>
                    {/* Instagram */}
                    <button
                      onClick={() => {
                        window.open('https://www.instagram.com/', '_blank');
                      }}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:opacity-90 transition-opacity"
                      aria-label="Share on Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </button>
                    {/* Copy URL */}
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          setLinkCopied(true);
                          setTimeout(() => setLinkCopied(false), 2000);
                        } catch {
                          const ta = document.createElement('textarea');
                          ta.value = window.location.href;
                          document.body.appendChild(ta);
                          ta.select();
                          document.execCommand('copy');
                          document.body.removeChild(ta);
                          setLinkCopied(true);
                          setTimeout(() => setLinkCopied(false), 2000);
                        }
                      }}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${linkCopied ? 'bg-green-500 text-white border-green-500' : 'bg-white text-muted-foreground border-zinc-200 hover:bg-zinc-50'}`}
                      aria-label="Copy link"
                    >
                      {linkCopied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                    </button>
                  </div>
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
                  {isDealer && (dealerAddress || dealerCity) && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        {dealerAddress && <div>{dealerAddress}</div>}
                        {dealerCity && <div>{dealerCity}</div>}
                      </div>
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

          </div>
        </div>
      </div>

      {/* More from this seller */}
      {sellerOtherCars.length > 0 && (
        <div className="border-t border-zinc-100 bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{t('carDetail.moreFromSeller')}</h2>
              <Button variant="ghost" onClick={handleViewDealerCars} className="text-sm text-muted-foreground hover:text-foreground">
                {t('carDetail.actions.viewAllDealerCars')} →
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sellerOtherCars.map((sellerCar) => {
                const imgUrl = sellerCar.images && sellerCar.images.length > 0
                  ? (typeof sellerCar.images[0] === 'string' ? sellerCar.images[0] : (sellerCar.images[0] as any).url)
                  : '';
                return (
                  <Link key={sellerCar.id} to={`/cars/${sellerCar.id}`} className="group">
                    <Card className="overflow-hidden rounded-2xl border-zinc-100 hover:shadow-md transition-shadow">
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        {imgUrl ? (
                          <ImageWithFallback
                            src={imgUrl}
                            alt={`${sellerCar.year} ${sellerCar.make} ${sellerCar.model}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            {t('carDetail.noImage')}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold truncate">{sellerCar.year} {sellerCar.make} {sellerCar.model}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span>{formatMileage(sellerCar.mileage)} km</span>
                          <span>·</span>
                          <span>{translateFuelType(sellerCar.fuelType)}</span>
                        </div>
                        <p className="text-lg font-bold mt-2">{formatPrice(sellerCar.price)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

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



      {/* Fullscreen Image Modal */}
      {isFullscreenModalOpen && carData.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col" onClick={() => setIsFullscreenModalOpen(false)}>
          {/* Top Bar */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3">
            <div className="text-white text-sm">
              {carData.images.length > 1 && `${fullscreenImageIndex + 1} / ${carData.images.length}`}
            </div>
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Image Area */}
          <div
            className="flex-1 min-h-0 relative flex items-center justify-center px-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Buttons */}
            {carData.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 sm:left-4 z-10 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  onClick={() => {
                    setFullscreenImageIndex(fullscreenImageIndex === 0 ? carData.images.length - 1 : fullscreenImageIndex - 1);
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  className="absolute right-2 sm:right-4 z-10 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  onClick={() => {
                    setFullscreenImageIndex(fullscreenImageIndex === carData.images.length - 1 ? 0 : fullscreenImageIndex + 1);
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <img
              src={carData.images[fullscreenImageIndex]}
              alt={`${carData.year} ${carData.make} ${carData.model} - Image ${fullscreenImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Bottom Thumbnails */}
          {carData.images.length > 1 && (
            <div className="flex-shrink-0 flex justify-center gap-2 px-4 py-3 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
              {carData.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setFullscreenImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                    fullscreenImageIndex === index ? 'border-white' : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
