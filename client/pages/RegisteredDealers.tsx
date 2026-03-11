import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Phone, Mail, Shield, Clock, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { SEO } from "@/components/SEO";
import { apiClient } from "@shared/api-client";

export default function RegisteredDealers() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dealers, setDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.getApprovedDealers()
      .then(setDealers)
      .catch(() => setError(t('common.error') || 'Failed to load dealers'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO title={t('meta.pages.registeredDealers')} canonical="/registered-dealers" />

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
              <p className="text-muted-foreground">{t('registeredDealers.subtitle')}</p>
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
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && dealers.length === 0 && (
          <div className="text-center py-16">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {t('registeredDealers.noDealers') || 'No registered dealers yet.'}
            </p>
          </div>
        )}

        {!loading && dealers.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-lg text-muted-foreground">
                {t('registeredDealers.browseNetwork').replace('{count}', dealers.length.toString())}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealers.map((dealer) => {
                const displayName = dealer.dealerName || `${dealer.firstName || ''} ${dealer.lastName || ''}`.trim() || dealer.email;
                const location = [dealer.dealerCity, dealer.dealerCountry].filter(Boolean).join(', ');
                const phone = dealer.dealerPhoneNumber || dealer.phone;
                const verifiedYear = new Date(dealer.createdAt).getFullYear();

                return (
                  <Card
                    key={dealer.id}
                    className="border-zinc-100 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/dealer/${dealer.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-zinc-100 flex-shrink-0">
                          <ImageWithFallback
                            src={dealer.dealerLogoUrl || ''}
                            alt={`${displayName} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate">{displayName}</h3>
                          {location && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{location}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground bg-zinc-100 px-2 py-0.5 rounded-full">
                              {t('registeredDealers.verifiedSince').replace('{year}', String(verifiedYear))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {dealer.dealerDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {dealer.dealerDescription}
                        </p>
                      )}

                      {(dealer.dealerServices?.length > 0) && (
                        <div className="flex flex-wrap gap-1">
                          {dealer.dealerServices.slice(0, 3).map((service: string) => (
                            <span key={service} className="text-xs border border-zinc-100 rounded-full px-2 py-0.5 text-muted-foreground">
                              {service}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2">
                        {phone && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{phone}</span>
                          </div>
                        )}
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
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
