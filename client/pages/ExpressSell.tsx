import React, { useState } from 'react';
import { ArrowLeft, Car, Upload, MapPin, User, Euro, Camera, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

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
  contact: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
}

export default function ExpressSell() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
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
    contact: {
      name: '',
      phone: '',
      email: '',
      location: ''
    }
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Car listing submitted:', carData);
    // Handle submission logic here
    alert(t('expressSell.successMessage'));
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                {t('expressSell.carDetails')}
              </CardTitle>
              <p className="text-muted-foreground">
                {t('expressSell.carDetailsDescription')}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('expressSell.makeRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, make: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('expressSell.selectMake')} />
                    </SelectTrigger>
                    <SelectContent>
                      {(() => {
                        const brands = t('finalFixes.expressSell.carBrands');
                        const brandArray = Array.isArray(brands) ? brands : [
                          'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 
                          'Ford', 'Opel', 'Peugeot', 'Renault'
                        ];
                        return brandArray.map((brand: any, index: number) => (
                          <SelectItem key={index} value={brand.toLowerCase().replace(/[^a-z0-9]/g, '')}>
                            {brand}
                          </SelectItem>
                        ));
                      })()}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('expressSell.modelRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, model: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('expressSell.selectModel')} />
                    </SelectTrigger>
                    <SelectContent>
                      {(() => {
                        const models = t('finalFixes.expressSell.carModels');
                        const modelArray = Array.isArray(models) ? models : [
                          '3 Series', '5 Series', 'X3', 'X5', 'A4', 'A6', 'Golf', 'Passat'
                        ];
                        return modelArray.map((model: any, index: number) => (
                          <SelectItem key={index} value={model.toLowerCase().replace(/[^a-z0-9]/g, '')}>
                            {model}
                          </SelectItem>
                        ));
                      })()}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('expressSell.yearRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, year: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('expressSell.selectYear')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                      <SelectItem value="2018">2018</SelectItem>
                      <SelectItem value="2017">2017</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('expressSell.mileageRequired')}</label>
                  <Input 
                    placeholder={t('forms.placeholders.egFiftyThousand')}
                    value={carData.mileage}
                    onChange={(e) => setCarData({...carData, mileage: e.target.value})}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('expressSell.fuelTypeRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, fuel: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('expressSell.selectFuelType')} />
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
                  <label className="block text-sm mb-2 text-muted-foreground">{t('expressSell.transmissionRequired')}</label>
                  <Select onValueChange={(value) => setCarData({...carData, transmission: value})}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('expressSell.selectTransmission')} />
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
              <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center bg-zinc-50">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg mb-2">{t('finalFixes.expressSell.uploadCarPhotos')}</p>
                <p className="text-muted-foreground mb-4">
                  {t('finalFixes.expressSell.addUpToTenPhotos')}
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button asChild className="bg-black text-white hover:bg-black/90 rounded-full px-6">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {t('finalFixes.expressSell.choosePhotos')}
                  </label>
                </Button>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Car photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-2xl"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 rounded-full">{t('finalFixes.expressSell.mainPhoto')}</Badge>
                      )}
                    </div>
                  ))}
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
                    value={carData.contact.location}
                    onChange={(e) => setCarData({
                      ...carData,
                      contact: { ...carData.contact, location: e.target.value }
                    })}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
              </div>
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
              disabled={currentStep === 1}
              className="border-zinc-100 rounded-full px-6 h-12"
            >
              {t('finalFixes.expressSell.previous')}
            </Button>
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                {t('finalFixes.expressSell.next')}
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                {t('finalFixes.expressSell.listMyCar')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
