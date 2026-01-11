import { useState } from 'react';
import { useCountry } from '@/contexts/CountryContext';
import { useCars } from '@/hooks/useCars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES } from '@shared/country-config';
import { useTranslation } from '../hooks/useTranslation';

export default function CountryTestPage() {
  const { country, setCountry, isDevelopment } = useCountry();
  const { cars, isLoading, error } = useCars();
  const { t } = useTranslation();
  const [selectedTestCountry, setSelectedTestCountry] = useState('');

  const handleCountryChange = (countryCode: string) => {
    if (isDevelopment) {
      setCountry(countryCode);
      setSelectedTestCountry(countryCode);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">🌍 {t('countryTest.title')}</h1>
            <p className="text-muted-foreground">
              {t('countryTest.subtitle')}
            </p>
          </div>

          {/* Current Country Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('countryTest.currentCountryConfiguration')}</CardTitle>
              <CardDescription>
                {t('countryTest.currentCountryDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">{t('countryTest.detectedCountry')}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{country?.flag}</span>
                    <div>
                      <div className="font-medium">{country?.name}</div>
                      <div className="text-sm text-muted-foreground">{t('hardcodedFixes.countryTestPage.codeLabel')} {country?.code}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('countryTest.domain')}</h3>
                  <div className="font-mono text-sm bg-muted/50 p-2 rounded">
                    {country?.domain}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('countryTest.languages')}</h3>
                  <div className="flex gap-1">
                    {country?.languages.map((lang) => (
                      <Badge key={lang.code} variant="outline">
                        {lang.flag} {lang.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('countryTest.developmentMode')}</h3>
                  <Badge variant={isDevelopment ? 'default' : 'secondary'}>
                    {isDevelopment ? t('countryTest.enabled') : t('countryTest.disabled')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Country Switcher (Development Only) */}
          {isDevelopment && (
            <Card>
              <CardHeader>
                <CardTitle>🔧 {t('countryTest.developmentCountrySwitcher')}</CardTitle>
                <CardDescription>
                  {t('countryTest.switcherDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t('countryTest.selectTestCountry')}</label>
                      <Select value={selectedTestCountry} onValueChange={handleCountryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('countryTest.chooseCountryToTest')} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(COUNTRIES).map((testCountry) => (
                            <SelectItem key={testCountry.code} value={testCountry.code}>
                              {testCountry.flag} {testCountry.name} ({testCountry.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={() => window.location.reload()} 
                        variant="outline"
                        className="w-full"
                      >
                        {t('countryTest.resetToDefault')}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded" dangerouslySetInnerHTML={{
                    __html: t('hardcodedFixes.countryTestPage.developmentNote')
                  }} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Car Listings Results */}
          <Card>
            <CardHeader>
              <CardTitle>🚗 {t('hardcodedFixes.countryTestPage.carListingsFor')} {country?.name}</CardTitle>
              <CardDescription>
                <span dangerouslySetInnerHTML={{
                  __html: t('hardcodedFixes.countryTestPage.onlyListedDescription')
                    .replace('{country}', country?.name || '')
                    .replace('{code}', country?.code || '')
                }} />
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-2">{t('hardcodedFixes.countryTestPage.loadingCars')}</p>
                </div>
              )}
              
              {error && (
                <div className="text-center py-8">
                  <p className="text-destructive">{t('hardcodedFixes.countryTestPage.errorPrefix')} {error}</p>
                </div>
              )}
              
              {!isLoading && !error && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {t('hardcodedFixes.countryTestPage.foundCarsIn')
                        .replace('{count}', cars.length.toString())
                        .replace('{country}', country?.name || '')}
                    </p>
                    {country?.code !== 'global' && (
                      <Badge variant="outline">
                        {t('hardcodedFixes.countryTestPage.countryFilteredResults')}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cars.length === 0 ? (
                      <div className="col-span-full text-center py-8">
                        <div className="text-4xl mb-2">🚫</div>
                        <h3 className="font-semibold">{t('hardcodedFixes.countryTestPage.noCarsFound')}</h3>
                        <p className="text-muted-foreground">
                          {t('hardcodedFixes.countryTestPage.noCarsInCountry')
                            .replace('{country}', country?.name || '')}
                        </p>
                        {isDevelopment && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {t('hardcodedFixes.countryTestPage.trySwitchingCountry')}
                          </p>
                        )}
                      </div>
                    ) : (
                      cars.map((car) => (
                        <Card key={car.id} className="border-l-4 border-l-primary">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold">
                                  {car.year} {car.make} {car.model}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {car.countryCode?.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                📍 {car.location}
                              </p>
                              <p className="font-semibold text-primary">
                                ${car.price.toLocaleString()}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                {t('hardcodedFixes.countryTestPage.carIdAndCountry')
                                  .replace('{id}', car.id)
                                  .replace('{country}', car.countryCode || '')}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card>
            <CardHeader>
              <CardTitle>📖 {t('countryTest.howItWorks')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">🔍 {t('countryTest.automaticCountryDetection')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('countryTest.automaticDetectionDescription')}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">🚗 {t('countryTest.countrySpecificListings')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('countryTest.countrySpecificDescription')}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">🔒 {t('countryTest.crossCountryProtection')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('countryTest.crossCountryDescription')}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">📝 {t('countryTest.listingSubmission')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('countryTest.listingSubmissionDescription')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}