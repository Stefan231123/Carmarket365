import React, { useState } from 'react';
import { ArrowLeft, Car, Upload, Euro, Camera, Check, User, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { SEO } from '../components/SEO';
import ImageUpload from '../components/ImageUpload';
import { trackEvent } from '../components/Analytics';
import { apiClient } from '@shared/api-client';
import { uploadToCloudinary } from '../lib/cloudinary';
import { CAR_MAKES, getModelsForMake } from '@shared/car-data';
import { useCountry } from '../contexts/CountryContext';

interface CarData {
  make: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  condition: string;
  price: string;
  description: string;
  location: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  images: any[];
}

export default function ExpressSell() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { country } = useCountry();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const [carData, setCarData] = useState<CarData>({
    make: '',
    model: '',
    year: '',
    mileage: '',
    fuel: '',
    transmission: '',
    condition: '',
    price: '',
    description: '',
    location: '',
    contact: {
      name: '',
      phone: '',
      email: '',
    },
    images: [],
  });

  const carModels = carData.make ? getModelsForMake(carData.make) : [];

  const handleImagesChange = (images: any[]) => {
    setCarData(prev => ({ ...prev, images }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Map frontend form values to backend enum values
  const mapFuelType = (fuel: string): string => {
    const map: Record<string, string> = {
      petrol: 'GASOLINE',
      diesel: 'DIESEL',
      hybrid: 'HYBRID',
      electric: 'ELECTRIC',
      lpg: 'LPG',
    };
    return map[fuel] || 'GASOLINE';
  };

  const mapTransmission = (trans: string): string => {
    const map: Record<string, string> = {
      manual: 'MANUAL',
      automatic: 'AUTOMATIC',
      'semi-automatic': 'CVT',
    };
    return map[trans] || 'MANUAL';
  };

  const mapCondition = (cond: string): string => {
    const map: Record<string, string> = {
      excellent: 'CERTIFIED',
      'very-good': 'USED',
      good: 'USED',
      fair: 'DAMAGED',
      'needs-work': 'DAMAGED',
    };
    return map[cond] || 'USED';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    setUploadProgress('');

    // Validate required fields
    if (!carData.make || !carData.model) {
      setSubmitError(t('sell.validation.makeModelRequired') || 'Make and model are required');
      setIsSubmitting(false);
      return;
    }
    if (!carData.price || parseFloat(carData.price) <= 0) {
      setSubmitError(t('sell.validation.priceRequired') || 'Please enter a valid price');
      setIsSubmitting(false);
      return;
    }
    if (!carData.mileage || parseInt(carData.mileage) < 0) {
      setSubmitError(t('sell.validation.mileageRequired') || 'Please enter a valid mileage');
      setIsSubmitting(false);
      return;
    }
    if (!carData.location) {
      setSubmitError(t('sell.validation.locationRequired') || 'Location is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const input = {
        make: carData.make,
        model: carData.model,
        year: parseInt(carData.year) || new Date().getFullYear(),
        price: parseFloat(carData.price) || 0,
        mileage: parseInt(carData.mileage) || 0,
        vehicleType: 'CAR',
        fuelType: mapFuelType(carData.fuel),
        transmission: mapTransmission(carData.transmission),
        condition: mapCondition(carData.condition),
        description: carData.description || undefined,
        location: carData.location,
        city: carData.location,
        countryCode: country?.code || 'global',
        contactPhone: carData.contact.phone || undefined,
        contactEmail: carData.contact.email || undefined,
        quickSale: true, // Express sell listings are only visible to dealers
      };

      // Step 1: Create the car listing
      setUploadProgress(t('sell.progress.creatingListing') || 'Creating listing...');
      const car = await apiClient.createCar(input);

      // Step 2: Upload images to Cloudinary and create image records
      console.log('[ExpressSell] carData.images:', carData.images.length, carData.images);
      const imagesToUpload = carData.images.filter(
        (img: any) => img.compressed || img.file
      );
      console.log('[ExpressSell] imagesToUpload after filter:', imagesToUpload.length);

      const failedImages: number[] = [];
      const imageErrors: string[] = [];
      if (imagesToUpload.length > 0) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          const img = imagesToUpload[i];
          const file = img.compressed || img.file;
          console.log(`[ExpressSell] Uploading image ${i + 1}:`, file?.name, file?.size, file?.type);

          setUploadProgress(
            `${t('sell.progress.uploadingImage') || 'Uploading image'} ${i + 1}/${imagesToUpload.length}...`
          );

          try {
            const uploadResult = await uploadToCloudinary(file);
            console.log(`[ExpressSell] Cloudinary upload success:`, uploadResult.url);
            await apiClient.createCarImage({
              carId: car.id,
              url: uploadResult.url,
              fileName: uploadResult.originalFileName,
              fileSize: uploadResult.fileSize,
              sortOrder: i,
              isPrimary: i === 0,
            });
            console.log(`[ExpressSell] createCarImage success for image ${i + 1}`);
          } catch (imgError) {
            const errMsg = imgError instanceof Error ? imgError.message : String(imgError);
            console.error(`[ExpressSell] Image ${i + 1} upload failed:`, errMsg, imgError);
            failedImages.push(i + 1);
            imageErrors.push(`Image ${i + 1}: ${errMsg}`);
          }
        }
      } else {
        console.warn('[ExpressSell] No images to upload! carData.images:', JSON.stringify(carData.images.map((img: any) => ({ hasFile: !!img.file, hasCompressed: !!img.compressed, hasPreview: !!img.preview, id: img.id }))));
      }

      trackEvent('create_express_listing', {
        make: carData.make || '',
      });

      if (failedImages.length > 0) {
        setSubmitError(`Listing created! Image upload failed: ${imageErrors.join('; ')}`);
      } else if (carData.images.length > 0 && imagesToUpload.length === 0) {
        setSubmitError('Listing created, but images could not be processed. Please add images from your dashboard.');
      } else {
        navigate('/private-dashboard');
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create listing');
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                {t('finalFixes.expressSell.carDetails')}
              </CardTitle>
              <p className="text-muted-foreground">
                {t('finalFixes.expressSell.carDetailsDescription')}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.makeRequired')}</label>
                  <Select value={carData.make} onValueChange={(value) => setCarData({...carData, make: value, model: ''})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('finalFixes.expressSell.selectMake')} />
                    </SelectTrigger>
                    <SelectContent>
                      {CAR_MAKES.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.modelRequired')}</label>
                  {carModels.length > 0 ? (
                    <Select value={carData.model} onValueChange={(value) => setCarData({...carData, model: value})}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('finalFixes.expressSell.selectModel')} />
                      </SelectTrigger>
                      <SelectContent>
                        {carModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      placeholder={t('finalFixes.expressSell.selectModel')}
                      value={carData.model}
                      onChange={(e) => setCarData({...carData, model: e.target.value})}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.yearRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, year: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('finalFixes.expressSell.selectYear')} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.mileageRequired')}</label>
                  <Input
                    type="number"
                    min="0"
                    max="9999999"
                    placeholder={t('forms.placeholders.egFiftyThousand')}
                    value={carData.mileage}
                    onChange={(e) => setCarData({...carData, mileage: e.target.value})}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.fuelTypeRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, fuel: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('finalFixes.expressSell.selectFuelType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">{t('sell.fuelTypes.gasoline')}</SelectItem>
                      <SelectItem value="diesel">{t('sell.fuelTypes.diesel')}</SelectItem>
                      <SelectItem value="hybrid">{t('sell.fuelTypes.hybrid')}</SelectItem>
                      <SelectItem value="electric">{t('sell.fuelTypes.electric')}</SelectItem>
                      <SelectItem value="lpg">{t('sell.fuelTypes.lpg')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.transmissionRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, transmission: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('finalFixes.expressSell.selectTransmission')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">{t('sell.transmissions.manual')}</SelectItem>
                      <SelectItem value="automatic">{t('sell.transmissions.automatic')}</SelectItem>
                      <SelectItem value="semi-automatic">{t('sell.transmissions.semiAutomatic')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.conditionLabel')}</label>
                <Select onValueChange={(value) => setCarData({...carData, condition: value})}>
                  <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                    <SelectValue placeholder={t('finalFixes.expressSell.conditionPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">{t('sell.conditions.excellent')}</SelectItem>
                    <SelectItem value="very-good">{t('sell.conditions.veryGood')}</SelectItem>
                    <SelectItem value="good">{t('sell.conditions.good')}</SelectItem>
                    <SelectItem value="fair">{t('sell.conditions.fair')}</SelectItem>
                    <SelectItem value="needs-work">{t('sell.conditions.needsWork')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                {t('finalFixes.expressSell.uploadPhotos')}
              </CardTitle>
              <p className="text-muted-foreground">
                {t('finalFixes.expressSell.uploadPhotosDescription')}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUpload
                onImagesChange={handleImagesChange}
                maxFiles={10}
                maxSizePerFile={5}
                acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                className="w-full"
              />
              {carData.images.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {carData.images.length} photo{carData.images.length !== 1 ? 's' : ''} selected
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                {t('finalFixes.expressSell.priceAndDescription')}
              </CardTitle>
              <p className="text-muted-foreground">
                {t('finalFixes.expressSell.setPriceAndDescription')}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.askingPriceEuros')}</label>
                <Input
                  type="number"
                  min="0"
                  max="99999999"
                  placeholder={t('finalFixes.expressSell.priceExample')}
                  value={carData.price}
                  onChange={(e) => setCarData({...carData, price: e.target.value})}
                  className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-muted-foreground">{t('common.description')}</label>
                <Textarea
                  placeholder={t('finalFixes.expressSell.descriptionPlaceholder')}
                  rows={6}
                  value={carData.description}
                  onChange={(e) => setCarData({...carData, description: e.target.value})}
                  className="bg-zinc-100 rounded-2xl border-none focus-visible:ring-0"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('finalFixes.expressSell.contactInformation')}
              </CardTitle>
              <p className="text-muted-foreground">
                {t('finalFixes.expressSell.howShouldBuyersContact')}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.fullNameRequired')}</label>
                  <Input
                    placeholder={t('finalFixes.expressSell.namePlaceholder')}
                    value={carData.contact.name}
                    onChange={(e) => setCarData({
                      ...carData,
                      contact: { ...carData.contact, name: e.target.value }
                    })}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.phoneNumberRequired')}</label>
                  <Input
                    placeholder={t('finalFixes.expressSell.phonePlaceholder')}
                    value={carData.contact.phone}
                    onChange={(e) => setCarData({
                      ...carData,
                      contact: { ...carData.contact, phone: e.target.value }
                    })}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.emailAddressRequired')}</label>
                  <Input
                    type="email"
                    placeholder={t('finalFixes.expressSell.yourEmail')}
                    value={carData.contact.email}
                    onChange={(e) => setCarData({
                      ...carData,
                      contact: { ...carData.contact, email: e.target.value }
                    })}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('finalFixes.expressSell.locationRequired')}</label>
                  <Input
                    placeholder={t('finalFixes.expressSell.locationPlaceholder')}
                    value={carData.location}
                    onChange={(e) => setCarData({...carData, location: e.target.value})}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>

              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              {uploadProgress && (
                <p className="text-sm text-blue-600 font-medium">{uploadProgress}</p>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: t('finalFixes.expressSell.carDetailsStep'), completed: currentStep > 1 },
    { number: 2, title: t('finalFixes.expressSell.photosStep'), completed: currentStep > 2 },
    { number: 3, title: t('finalFixes.expressSell.priceDescriptionStep'), completed: currentStep > 3 },
    { number: 4, title: t('finalFixes.expressSell.contactInfoStep'), completed: currentStep > 4 }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO title="Express Sell" canonical="/express-sell" />
      {/* Header */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full px-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('finalFixes.expressSell.backToHome')}
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{t('finalFixes.expressSell.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('finalFixes.expressSell.listMyCarQuickly')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        step.completed
                          ? 'bg-black text-white'
                          : currentStep === step.number
                          ? 'bg-black text-white'
                          : 'bg-zinc-100 text-muted-foreground border-zinc-200'
                      }`}
                    >
                      {step.completed ? <Check className="h-4 w-4" /> : step.number}
                    </div>
                    <span className="ml-2 text-sm font-medium hidden sm:block">
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-8 sm:w-16 h-px bg-zinc-200 mx-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className="border-zinc-100 rounded-full px-6 h-12"
            >
              {t('finalFixes.expressSell.previous')}
            </Button>
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                {t('finalFixes.expressSell.next')}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12"
              >
                {isSubmitting ? (uploadProgress || t('common.loading') || 'Creating...') : t('finalFixes.expressSell.listMyCar')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
