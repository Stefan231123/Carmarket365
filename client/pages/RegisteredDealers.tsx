import { ArrowLeft, MapPin, Phone, Mail, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface Dealer {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  specialties: string[];
  yearsInBusiness: number;
  totalSales: number;
  description: string;
  verifiedSince: string;
  logo: string;
}

// Mock dealer data with translation keys
const registeredDealers: Dealer[] = [
  {
    id: "1",
    name: "AutoMax Premium",
    location: "Berlin, Germany",
    rating: 4.8,
    reviewCount: 245,
    phone: "+49 30 12345678",
    email: "info@automax-premium.de",
    specialties: ["luxuryCars", "suvs", "electricVehicles"],
    yearsInBusiness: 15,
    totalSales: 1250,
    description: "autoMaxDescription",
    verifiedSince: "2018",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "2", 
    name: "City Motors GmbH",
    location: "Munich, Germany",
    rating: 4.6,
    reviewCount: 189,
    phone: "+49 89 87654321",
    email: "contact@citymotors.de",
    specialties: ["familyCars", "compactCars", "hybrids"],
    yearsInBusiness: 22,
    totalSales: 2100,
    description: "cityMotorsDescription",
    verifiedSince: "2017",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "3",
    name: "EcoWheels Hamburg",
    location: "Hamburg, Germany", 
    rating: 4.9,
    reviewCount: 156,
    phone: "+49 40 11223344",
    email: "hello@ecowheels-hh.de",
    specialties: ["electricVehicles", "hybrids", "ecoFriendly"],
    yearsInBusiness: 8,
    totalSales: 680,
    description: "ecoWheelsDescription",
    verifiedSince: "2020",
    logo: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "4",
    name: "Rhein Auto Solutions",
    location: "Cologne, Germany",
    rating: 4.7,
    reviewCount: 312,
    phone: "+49 221 98765432",
    email: "service@rhein-auto.de",
    specialties: ["sportsCars", "convertibles", "performance"],
    yearsInBusiness: 18,
    totalSales: 1850,
    description: "rheinAutoDescription",
    verifiedSince: "2016",
    logo: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "5",
    name: "Stuttgart Luxury Motors",
    location: "Stuttgart, Germany",
    rating: 4.8,
    reviewCount: 278,
    phone: "+49 711 55667788",
    email: "info@stuttgart-luxury.de",
    specialties: ["mercedesBenz", "porsche", "luxury"],
    yearsInBusiness: 25,
    totalSales: 3200,
    description: "stuttgartLuxuryDescription",
    verifiedSince: "2015",
    logo: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: "6",
    name: "Nord Fahrzeuge",
    location: "Frankfurt, Germany",
    rating: 4.5,
    reviewCount: 203,
    phone: "+49 69 44556677",
    email: "verkauf@nordfahrzeuge.de",
    specialties: ["businessCars", "fleetSales", "leasing"],
    yearsInBusiness: 12,
    totalSales: 1600,
    description: "nordFahrzeugeDescription",
    verifiedSince: "2019",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=center"
  }
];

export default function RegisteredDealers() {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  
  // Helper function to get translated dealer name for MK and SQ only
  const getDealerName = (originalName: string) => {
    // Only translate for Macedonian and Albanian languages as requested
    if (currentLanguage === 'mk' || currentLanguage === 'sq') {
      const dealerKey = originalName.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const translatedName = t(`pages.registeredDealers.dealers.${dealerKey}`);
      // If translation exists and is not the key itself, use it
      if (translatedName && translatedName !== `pages.registeredDealers.dealers.${dealerKey}`) {
        return translatedName;
      }
    }
    // For all other languages (EN, SL, RU, LV) or if translation not found, return original name
    return originalName;
  };

  const handleDealerClick = (dealerId: string) => {
    navigate(`/dealer/${dealerId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 mb-4 rounded-full px-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('registeredDealers.backToHome')}</span>
          </Button>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-primary">{t('registeredDealers.title')}</h1>
              <p className="text-muted-foreground">
                {t('registeredDealers.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>{t('registeredDealers.allDealersVerified')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{t('registeredDealers.customerRated')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{t('registeredDealers.supportAvailable')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-lg text-muted-foreground">
            {t('registeredDealers.browseNetwork').replace('{count}', registeredDealers.length.toString())}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredDealers.map((dealer) => (
            <Card 
              key={dealer.id} 
              className="border-zinc-100 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleDealerClick(dealer.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-zinc-100 flex-shrink-0">
                    <ImageWithFallback
                      src={dealer.logo}
                      alt={`${dealer.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{getDealerName(dealer.name)}</h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{dealer.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{dealer.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({dealer.reviewCount} {t('registeredDealers.reviews')})
                      </span>
                      <Badge variant="secondary" className="text-xs rounded-full">
                        {t('registeredDealers.verifiedSince').replace('{year}', dealer.verifiedSince)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {t(`registeredDealers.descriptions.${dealer.description}`)}
                </p>

                <div className="flex flex-wrap gap-1">
                  {dealer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs rounded-full border-zinc-100">
                      {t(`registeredDealers.specialties.${specialty}`)}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('registeredDealers.experience')}</span>
                    <div className="font-medium">{dealer.yearsInBusiness} {t('registeredDealers.years')}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('registeredDealers.totalSales')}</span>
                    <div className="font-medium">{dealer.totalSales.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{dealer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{dealer.email}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-black text-white hover:bg-black/90 rounded-full h-12">
                  {t('registeredDealers.viewDealerProfile')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
