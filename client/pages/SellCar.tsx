import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/contexts/CountryContext";
import { useTranslation } from "@/hooks/useTranslation";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Car, Truck, Bike, Camera, Upload, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload";
import { trackEvent } from "@/components/Analytics";
import { apiClient } from '@shared/api-client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { CAR_MAKES, getModelsForMake } from '@shared/car-data';

type VehicleType = 'car' | 'truck' | 'motorbike' | null;

interface VehicleDetails {
  type: VehicleType;
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  fuelType: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  price: string;
  description: string;
  features: string[];
  location: string;
  countryCode: string; // Country where the car is being sold
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  images: any[]; // Will store image files for upload
}

export default function SellCar() {
  const navigate = useNavigate();
  const { country } = useCountry();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    type: null,
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    fuelType: "",
    transmission: "",
    exteriorColor: "",
    interiorColor: "",
    price: "",
    description: "",
    features: [],
    location: "",
    countryCode: country?.code || 'global', // Automatically set to current country
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    images: [],
  });

  const handleVehicleTypeSelect = (type: VehicleType) => {
    setVehicleDetails(prev => ({ ...prev, type }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: t('sell.steps.vehicleType'), active: currentStep === 1, completed: currentStep > 1 },
    { number: 2, title: t('sell.steps.basicInfo'), active: currentStep === 2, completed: currentStep > 2 },
    { number: 3, title: t('sell.steps.details'), active: currentStep === 3, completed: currentStep > 3 },
    { number: 4, title: t('sell.steps.photosAndContact'), active: currentStep === 4, completed: currentStep > 4 }
  ];

  const vehicleTypes = [
    {
      id: 'car',
      name: t('sell.vehicleTypes.car.name'),
      icon: Car,
      description: t('sell.vehicleTypes.car.description')
    },
    {
      id: 'truck',
      name: t('sell.vehicleTypes.truck.name'),
      icon: Truck,
      description: t('sell.vehicleTypes.truck.description')
    },
    {
      id: 'motorbike',
      name: t('sell.vehicleTypes.motorbike.name'),
      icon: Bike,
      description: t('sell.vehicleTypes.motorbike.description')
    }
  ];

  const carMakes = CAR_MAKES;
  const carModels = vehicleDetails.make ? getModelsForMake(vehicleDetails.make) : [];
  const fuelTypes = [t('sell.fuelTypes.gasoline'), t('sell.fuelTypes.electric'), t('sell.fuelTypes.hybrid'), t('sell.fuelTypes.diesel')];
  const transmissions = [t('sell.transmissions.automatic'), t('sell.transmissions.manual'), t('sell.transmissions.cvt')];
  const conditions = [t('sell.conditions.excellent'), t('sell.conditions.veryGood'), t('sell.conditions.good'), t('sell.conditions.fair')];

  const features = [
    t('sell.features.airConditioning'), t('sell.features.leatherSeats'), t('sell.features.heatedSeats'), t('sell.features.sunroof'), t('sell.features.gpsNavigation'),
    t('sell.features.backupCamera'), t('sell.features.bluetooth'), t('sell.features.usbPorts'), t('sell.features.premiumSound'), t('sell.features.keylessEntry'),
    t('sell.features.remoteStart'), t('sell.features.cruiseControl'), t('sell.features.parkingSensors'), t('sell.features.blindSpotMonitoring')
  ];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setVehicleDetails(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    } else {
      setVehicleDetails(prev => ({
        ...prev,
        features: prev.features.filter(f => f !== feature)
      }));
    }
  };

  const handleImagesChange = (images: any[]) => {
    setVehicleDetails(prev => ({ ...prev, images }));
  };

  // Map frontend form values to backend enum values
  const mapFuelType = (fuel: string): string => {
    const map: Record<string, string> = {
      [t('sell.fuelTypes.gasoline')]: 'GASOLINE',
      [t('sell.fuelTypes.diesel')]: 'DIESEL',
      [t('sell.fuelTypes.electric')]: 'ELECTRIC',
      [t('sell.fuelTypes.hybrid')]: 'HYBRID',
    };
    return map[fuel] || 'GASOLINE';
  };

  const mapTransmission = (trans: string): string => {
    const map: Record<string, string> = {
      [t('sell.transmissions.automatic')]: 'AUTOMATIC',
      [t('sell.transmissions.manual')]: 'MANUAL',
      [t('sell.transmissions.cvt')]: 'CVT',
    };
    return map[trans] || 'MANUAL';
  };

  const mapCondition = (cond: string): string => {
    const map: Record<string, string> = {
      [t('sell.conditions.excellent')]: 'CERTIFIED',
      [t('sell.conditions.veryGood')]: 'USED',
      [t('sell.conditions.good')]: 'USED',
      [t('sell.conditions.fair')]: 'DAMAGED',
    };
    return map[cond] || 'USED';
  };

  const mapVehicleType = (type: VehicleType): string => {
    const map: Record<string, string> = { car: 'CAR', truck: 'TRUCK', motorbike: 'MOTORCYCLE' };
    return map[type || 'car'] || 'CAR';
  };

  const handleCreateListing = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    setUploadProgress('');

    // Validate required fields
    if (!vehicleDetails.make || !vehicleDetails.model) {
      setSubmitError(t('sell.validation.makeModelRequired') || 'Make and model are required');
      setIsSubmitting(false);
      return;
    }
    if (!vehicleDetails.price || parseFloat(vehicleDetails.price) <= 0) {
      setSubmitError(t('sell.validation.priceRequired') || 'Please enter a valid price');
      setIsSubmitting(false);
      return;
    }
    if (!vehicleDetails.mileage || parseInt(vehicleDetails.mileage) < 0) {
      setSubmitError(t('sell.validation.mileageRequired') || 'Please enter a valid mileage');
      setIsSubmitting(false);
      return;
    }
    if (!vehicleDetails.location) {
      setSubmitError(t('sell.validation.locationRequired') || 'Location is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const input = {
        make: vehicleDetails.make,
        model: vehicleDetails.model,
        year: parseInt(vehicleDetails.year) || new Date().getFullYear(),
        price: parseFloat(vehicleDetails.price) || 0,
        mileage: parseInt(vehicleDetails.mileage) || 0,
        vehicleType: mapVehicleType(vehicleDetails.type),
        fuelType: mapFuelType(vehicleDetails.fuelType),
        transmission: mapTransmission(vehicleDetails.transmission),
        condition: mapCondition(vehicleDetails.condition),
        color: vehicleDetails.exteriorColor || undefined,
        interiorColor: vehicleDetails.interiorColor || undefined,
        description: vehicleDetails.description || undefined,
        features: vehicleDetails.features,
        location: vehicleDetails.location,
        city: vehicleDetails.location,
        countryCode: vehicleDetails.countryCode || undefined,
        contactPhone: vehicleDetails.contactPhone || undefined,
        contactEmail: vehicleDetails.contactEmail || undefined,
      };

      // Step 1: Create the car listing
      setUploadProgress(t('sell.progress.creatingListing') || 'Creating listing...');
      const car = await apiClient.createCar(input);

      // Step 2: Upload images to Cloudinary and create image records
      const imagesToUpload = vehicleDetails.images.filter(
        (img: any) => img.compressed || img.file
      );

      const failedImages: number[] = [];
      if (imagesToUpload.length > 0) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          const img = imagesToUpload[i];
          const file = img.compressed || img.file;

          setUploadProgress(
            `${t('sell.progress.uploadingImage') || 'Uploading image'} ${i + 1}/${imagesToUpload.length}...`
          );

          try {
            const uploadResult = await uploadToCloudinary(file);
            await apiClient.createCarImage({
              carId: car.id,
              url: uploadResult.url,
              fileName: uploadResult.originalFileName,
              fileSize: uploadResult.fileSize,
              sortOrder: i,
              isPrimary: i === 0,
            });
          } catch (imgError) {
            failedImages.push(i + 1);
          }
        }
      }

      trackEvent('create_listing', {
        vehicle_type: vehicleDetails.type || 'car',
        make: vehicleDetails.make || '',
      });

      if (failedImages.length > 0) {
        setSubmitError(`Listing created, but ${failedImages.length} image(s) failed to upload. You can add them later from your dashboard.`);
        setTimeout(() => navigate('/private-dashboard'), 3000);
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

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO title="Sell Your Car" canonical="/sell" />
      {/* Header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-full px-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">{t('sell.sellYourCar')}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('sell.preview.title')}</h2>
                <div className="space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {vehicleDetails.images.length > 0 && vehicleDetails.images[0].preview ? (
                      <img 
                        src={vehicleDetails.images[0].preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {vehicleDetails.make && vehicleDetails.model 
                        ? `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}`
                        : t('sell.preview.yourVehicle')
                      }
                    </h3>
                    <p className="text-sm text-gray-500">{vehicleDetails.mileage ? `${vehicleDetails.mileage} ${t('sell.preview.milesLabel')}` : t('common.mileage')}</p>
                    <p className="text-lg font-bold text-primary">
                      {vehicleDetails.price ? `$${vehicleDetails.price}` : t('sell.preview.priceLabel')}
                    </p>
                    {vehicleDetails.images.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {t('sell.preview.photosCount').replace('{count}', vehicleDetails.images.length.toString()).replace('{plural}', vehicleDetails.images.length !== 1 ? 's' : '')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Progress Steps */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step.completed 
                            ? 'bg-black text-white' 
                            : step.active 
                            ? 'bg-black text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step.completed ? <CheckCircle className="h-4 w-4" /> : step.number}
                        </div>
                        <span className="mt-2 text-xs font-medium text-gray-900">{step.title}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-px mx-4 ${
                          step.completed ? 'bg-black' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                {/* Step 1: Vehicle Type */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {t('sell.headers.vehicleTypeQuestion')}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {vehicleTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => handleVehicleTypeSelect(type.id as VehicleType)}
                            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-center hover:border-gray-300 ${
                              vehicleDetails.type === type.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <Icon className={`h-12 w-12 mx-auto mb-3 ${
                              vehicleDetails.type === type.id ? 'text-black' : 'text-gray-400'
                            }`} />
                            <h3 className="font-medium text-gray-900 mb-1">{type.name}</h3>
                            <p className="text-xs text-gray-500">{type.description}</p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button 
                        onClick={handleNextStep} 
                        disabled={!vehicleDetails.type}
                        className="bg-black hover:bg-gray-800 text-white"
                      >
                        {t('sell.buttons.nextStep')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Basic Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('sell.headers.basicInformation')}</h2>
                      <p className="text-gray-600">{t('sell.headers.basicInfoDescription').replace('{vehicleType}', vehicleDetails.type || t('common.vehicle'))}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.make')} *</label>
                        <Select value={vehicleDetails.make} onValueChange={(value) => setVehicleDetails({...vehicleDetails, make: value, model: ''})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectMake')} />
                          </SelectTrigger>
                          <SelectContent>
                            {carMakes.map((make) => (
                              <SelectItem key={make} value={make}>{make}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.model')} *</label>
                        {carModels.length > 0 ? (
                          <Select value={vehicleDetails.model} onValueChange={(value) => setVehicleDetails({...vehicleDetails, model: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('sell.placeholders.enterModel')} />
                            </SelectTrigger>
                            <SelectContent>
                              {carModels.map((model) => (
                                <SelectItem key={model} value={model}>{model}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            placeholder={t('sell.placeholders.enterModel')}
                            value={vehicleDetails.model}
                            onChange={(e) => setVehicleDetails({...vehicleDetails, model: e.target.value})}
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.year')} *</label>
                        <Select value={vehicleDetails.year} onValueChange={(value) => setVehicleDetails({...vehicleDetails, year: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectYear')} />
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.mileage')} *</label>
                        <Select value={vehicleDetails.mileage} onValueChange={(value) => setVehicleDetails({...vehicleDetails, mileage: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.enterMileage')} />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000,
                              60000, 70000, 80000, 90000, 100000, 125000, 150000,
                              175000, 200000, 250000, 300000, 400000, 500000
                            ].map((km) => (
                              <SelectItem key={km} value={km.toString()}>
                                {km.toLocaleString()} km
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.condition')} *</label>
                        <Select value={vehicleDetails.condition} onValueChange={(value) => setVehicleDetails({...vehicleDetails, condition: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectCondition')} />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((condition) => (
                              <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.fuelType')}</label>
                        <Select value={vehicleDetails.fuelType} onValueChange={(value) => setVehicleDetails({...vehicleDetails, fuelType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectFuelType')} />
                          </SelectTrigger>
                          <SelectContent>
                            {fuelTypes.map((fuel) => (
                              <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button variant="outline" onClick={handlePrevStep}>
                        {t('sell.buttons.previous')}
                      </Button>
                      <Button onClick={handleNextStep} className="bg-black hover:bg-gray-800 text-white">
                        {t('sell.buttons.nextStep')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('sell.headers.additionalDetails')}</h2>
                      <p className="text-gray-600">{t('sell.headers.additionalDetailsDescription').replace('{vehicleType}', vehicleDetails.type || t('common.vehicle'))}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.transmission')}</label>
                        <Select value={vehicleDetails.transmission} onValueChange={(value) => setVehicleDetails({...vehicleDetails, transmission: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectTransmission')} />
                          </SelectTrigger>
                          <SelectContent>
                            {transmissions.map((trans) => (
                              <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.exteriorColor')}</label>
                        <Input
                          placeholder={t('sell.placeholders.exteriorColorExample')}
                          value={vehicleDetails.exteriorColor}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, exteriorColor: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.interiorColor')}</label>
                        <Input
                          placeholder={t('sell.placeholders.interiorColorExample')}
                          value={vehicleDetails.interiorColor}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, interiorColor: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.askingPrice')} *</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="number"
                            min="0"
                            max="99999999"
                            className="pl-10"
                            placeholder={t('sell.placeholders.priceExample')}
                            value={vehicleDetails.price}
                            onChange={(e) => setVehicleDetails({...vehicleDetails, price: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">{t('sell.fields.featuresAndOptions')}</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={vehicleDetails.features.includes(feature)}
                              onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                            />
                            <label htmlFor={feature} className="text-sm text-gray-700">
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.description')}</label>
                      <Textarea
                        placeholder={t('sell.placeholders.descriptionExample')}
                        rows={4}
                        value={vehicleDetails.description}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, description: e.target.value})}
                      />
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button variant="outline" onClick={handlePrevStep}>
                        {t('sell.buttons.previous')}
                      </Button>
                      <Button onClick={handleNextStep} className="bg-black hover:bg-gray-800 text-white">
                        {t('sell.buttons.nextStep')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Photos & Contact */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('sell.headers.photosAndContact')}</h2>
                      <p className="text-gray-600">{t('sell.headers.photosAndContactDescription')}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">{t('sell.fields.vehiclePhotos')} *</label>
                      <p className="text-sm text-gray-600 mb-4">
                        {t('sell.photos.instruction')}
                      </p>
                      <ImageUpload
                        onImagesChange={handleImagesChange}
                        maxFiles={10}
                        maxSizePerFile={5}
                        acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                        className="w-full"
                      />
                      {vehicleDetails.images.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          {t('sell.photos.selected').replace('{count}', vehicleDetails.images.length.toString()).replace('{plural}', vehicleDetails.images.length !== 1 ? 's' : '')}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.contactName')} *</label>
                        <Input
                          placeholder={t('sell.placeholders.yourFullName')}
                          value={vehicleDetails.contactName}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, contactName: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.phoneNumber')} *</label>
                        <Input
                          placeholder={t('sell.placeholders.phoneExample')}
                          value={vehicleDetails.contactPhone}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, contactPhone: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.emailAddress')} *</label>
                        <Input
                          type="email"
                          placeholder={t('sell.placeholders.emailExample')}
                          value={vehicleDetails.contactEmail}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, contactEmail: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.location')} *</label>
                        <Input
                          placeholder={t('sell.placeholders.cityState')}
                          value={vehicleDetails.location}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, location: e.target.value})}
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

                    <div className="flex justify-between pt-6">
                      <Button variant="outline" onClick={handlePrevStep} disabled={isSubmitting}>
                        {t('sell.buttons.previous')}
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleCreateListing}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (uploadProgress || t('common.loading') || 'Creating...') : t('sell.buttons.createListing')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
