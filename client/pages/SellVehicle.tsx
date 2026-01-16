import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, Check, Car, Truck, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from '../hooks/useTranslation';

export default function SellVehicle() {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  
  // Debug logging for language detection
  console.log('🔍 SellVehicle Debug - Current Language:', currentLanguage);
  console.log('🔍 SellVehicle Debug - Translation test keys:');
  const stepVehicleType = t('sell.steps.vehicleType');
  const carName = t('sell.vehicleTypes.car.name');
  const vehicleQuestion = t('sell.headers.vehicleTypeQuestion');
  console.log('  - sell.steps.vehicleType:', stepVehicleType);
  console.log('  - sell.vehicleTypes.car.name:', carName);
  console.log('  - sell.headers.vehicleTypeQuestion:', vehicleQuestion);
  
  // Check if they're coming back as English
  const isEnglish = stepVehicleType.includes('Vehicle Type') || carName === 'Car' || vehicleQuestion.includes('What type');
  if (isEnglish) {
    console.error('❌ SellVehicle: Getting English translations despite currentLanguage being:', currentLanguage);
  } else {
    console.log('✅ SellVehicle: Getting correct translations for language:', currentLanguage);
  }
  const [vehicleType, setVehicleType] = useState<'car' | 'truck' | 'motorbike'>('car');
  const [images, setImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const vehicleTypes = [
    { id: 'car' as const, label: t('sell.vehicleTypes.car.name'), emoji: '🚗', icon: Car },
    { id: 'truck' as const, label: t('sell.vehicleTypes.truck.name'), emoji: '🚛', icon: Truck },
    { id: 'motorbike' as const, label: t('sell.vehicleTypes.motorbike.name'), emoji: '🏍️', icon: Bike },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these to a server
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10)); // Max 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Vehicle listing submitted');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Debug information - remove after testing */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        fontSize: '12px', 
        borderRadius: '5px', 
        zIndex: 9999,
        maxWidth: '400px'
      }}>
        <div><strong>Debug Info:</strong></div>
        <div>Current Language: {currentLanguage}</div>
        <div>Step text: {stepVehicleType}</div>
        <div>Car name: {carName}</div>
        <div>Question: {vehicleQuestion}</div>
        <div style={{ color: isEnglish ? 'red' : 'green' }}>
          Status: {isEnglish ? '❌ English (Wrong)' : '✅ Correct Language'}
        </div>
      </div>
      {/* Header */}
      <div className="border-b border-zinc-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full px-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
{t('common.back')}
            </Button>
            <h1 className="text-2xl font-bold">{t('sellVehicle.title')}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      step <= currentStep
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-100 text-muted-foreground border-zinc-200'
                    }`}
                  >
                    {step < currentStep ? <Check className="h-4 w-4" /> : step}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{t('sell.steps.vehicleType')}</span>
                <span>{t('sell.steps.basicInfo')}</span>
                <span>{t('sell.steps.details')}</span>
                <span>{t('sell.steps.photosAndContact')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Vehicle Type */}
          {currentStep === 1 && (
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('sell.headers.vehicleTypeQuestion')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vehicleTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                          vehicleType === type.id
                            ? 'border-black bg-zinc-50'
                            : 'border-zinc-100 hover:border-zinc-200'
                        }`}
                        onClick={() => setVehicleType(type.id)}
                      >
                        <div className="text-center">
                          <IconComponent className={`h-16 w-16 mx-auto mb-4 ${vehicleType === type.id ? 'text-black' : 'text-muted-foreground'}`} />
                          <h3 className="font-semibold">{type.label}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={nextStep} className="bg-black text-white hover:bg-black/90 rounded-full px-6">{t('sell.buttons.nextStep')}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Basic Information */}
          {currentStep === 2 && (
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('sell.headers.basicInformation')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make" className="text-muted-foreground">{t('sell.fields.make')}</Label>
                    <Select>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('sell.placeholders.selectMake')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="volkswagen">Volkswagen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="model" className="text-muted-foreground">{t('sell.fields.model')}</Label>
                    <Input id="model" placeholder={t('sell.placeholders.enterModel')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-muted-foreground">{t('sell.fields.year')}</Label>
                    <Select>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('sell.placeholders.selectYear')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 25}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mileage" className="text-muted-foreground">{t('sell.fields.mileage')}</Label>
                    <Input id="mileage" placeholder={t('sell.placeholders.enterMileage')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep} className="border-zinc-100 rounded-full px-6">{t('sell.buttons.previous')}</Button>
                  <Button onClick={nextStep} className="bg-black text-white hover:bg-black/90 rounded-full px-6">{t('sell.buttons.nextStep')}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('sell.headers.vehicleDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fuel" className="text-muted-foreground">{t('sell.fields.fuelType')}</Label>
                    <Select>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('sell.placeholders.selectFuelType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">{t('sell.fuelTypes.gasoline')}</SelectItem>
                        <SelectItem value="diesel">{t('sell.fuelTypes.diesel')}</SelectItem>
                        <SelectItem value="electric">{t('sell.fuelTypes.electric')}</SelectItem>
                        <SelectItem value="hybrid">{t('sell.fuelTypes.hybrid')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transmission" className="text-muted-foreground">{t('sell.fields.transmission')}</Label>
                    <Select>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('sell.placeholders.selectTransmission')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">{t('sell.transmissions.manual')}</SelectItem>
                        <SelectItem value="automatic">{t('sell.transmissions.automatic')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition" className="text-muted-foreground">{t('sell.fields.condition')}</Label>
                    <Select>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('sell.placeholders.selectCondition')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">{t('sell.conditions.excellent')}</SelectItem>
                        <SelectItem value="very-good">{t('sell.conditions.veryGood')}</SelectItem>
                        <SelectItem value="good">{t('sell.conditions.good')}</SelectItem>
                        <SelectItem value="fair">{t('sell.conditions.fair')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-muted-foreground">{t('sell.fields.askingPrice')}</Label>
                    <Input id="price" placeholder={t('sell.placeholders.enterAskingPrice')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-muted-foreground">{t('sell.fields.description')}</Label>
                  <Textarea id="description" placeholder={t('sell.placeholders.describeYourVehicle')} rows={4} className="bg-zinc-100 rounded-2xl border-none focus-visible:ring-0" />
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep} className="border-zinc-100 rounded-full px-6">{t('sell.buttons.previous')}</Button>
                  <Button onClick={nextStep} className="bg-black text-white hover:bg-black/90 rounded-full px-6">{t('sell.buttons.nextStep')}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Photos & Contact */}
          {currentStep === 4 && (
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('sell.headers.photosAndContactInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">{t('sell.headers.uploadVehiclePhotos')}</Label>
                  <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center bg-zinc-50">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-2">{t('sell.headers.uploadVehiclePhotos')}</p>
                    <p className="text-muted-foreground mb-4">{t('sell.headers.addUpToTenPhotos')}</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button asChild className="bg-black text-white hover:bg-black/90 rounded-full px-6">
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        {t('sell.placeholders.choosePhotos')}
                      </label>
                    </Button>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-2xl"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-muted-foreground">{t('sell.fields.contactName')}</Label>
                    <Input id="contact-name" placeholder={t('sell.placeholders.yourName')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone" className="text-muted-foreground">{t('sell.fields.phoneNumber')}</Label>
                    <Input id="contact-phone" placeholder={t('sell.placeholders.yourPhoneNumber')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-muted-foreground">{t('sell.fields.emailAddress')}</Label>
                    <Input id="contact-email" type="email" placeholder={t('sell.placeholders.yourEmail')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-muted-foreground">{t('sell.fields.location')}</Label>
                    <Input id="location" placeholder={t('sell.placeholders.cityCountry')} className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0" />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep} className="border-zinc-100 rounded-full px-6">{t('sell.buttons.previous')}</Button>
                  <Button onClick={handleSubmit} className="bg-black text-white hover:bg-black/90 rounded-full px-6">{t('sell.buttons.createListing')}</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
