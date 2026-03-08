import { useState, useEffect, useRef } from "react";
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
import { ArrowLeft, Car, Truck, Bike, Camera, Upload, Euro, CheckCircle, AlertCircle, Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload";
import { trackEvent } from "@/components/Analytics";
import { apiClient } from '@shared/api-client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { CAR_MAKES, getModelsForMake } from '@shared/car-data';
import { getLocationsForCountry } from '@shared/locations';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

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
  bodyType: string;
  engineSizeFrom: string;
  engineSizeTo: string;
  horsePower: string;
  doors: string;
  seats: string;
  drivetrain: string;
  safetyFeatures: string[];
  fuelConsumption: string;
  emissionClass: string;
  warrantyMonths: string;
  previousOwners: string;
  hadAccident: string;
  nonSmokingVehicle: boolean;
  fullServiceHistory: boolean;
  allowTestDrive: boolean;
  acceptsTradeIn: boolean;
  priceNegotiable: boolean;
  upholsteryType: string;
  paintWorkType: string;
}

const SELL_CAR_DRAFT_KEY = 'sellcar_draft';

function loadDraft(): Partial<VehicleDetails> | null {
  try {
    const raw = localStorage.getItem(SELL_CAR_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Never restore image files (they can't be serialized)
    delete parsed.images;
    return parsed;
  } catch {
    return null;
  }
}

export default function SellCar() {
  const navigate = useNavigate();
  const { country } = useCountry();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const [locationOpen, setLocationOpen] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const locations = getLocationsForCountry(country?.code || 'mk');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>(() => {
    const draft = loadDraft();
    if (draft && Object.keys(draft).some(k => draft[k as keyof typeof draft])) {
      return {
        type: null,
        make: "", model: "", year: "", mileage: "", condition: "",
        fuelType: "", transmission: "", exteriorColor: "", interiorColor: "",
        price: "", description: "", features: [], location: "",
        countryCode: country?.code || 'global', contactName: "", contactPhone: "", contactEmail: "",
        images: [], bodyType: "", engineSizeFrom: "", engineSizeTo: "",
        horsePower: "", doors: "", seats: "", drivetrain: "", safetyFeatures: [],
        fuelConsumption: "", emissionClass: "", warrantyMonths: "", previousOwners: "",
        hadAccident: "", nonSmokingVehicle: false, fullServiceHistory: false,
        allowTestDrive: false, acceptsTradeIn: false, priceNegotiable: false,
        upholsteryType: "", paintWorkType: "",
        ...draft,
      };
    }
    return {
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
    bodyType: "",
    engineSizeFrom: "",
    engineSizeTo: "",
    horsePower: "",
    doors: "",
    seats: "",
    drivetrain: "",
    safetyFeatures: [],
    fuelConsumption: "",
    emissionClass: "",
    warrantyMonths: "",
    previousOwners: "",
    hadAccident: "",
    nonSmokingVehicle: false,
    fullServiceHistory: false,
    allowTestDrive: false,
    acceptsTradeIn: false,
    priceNegotiable: false,
    upholsteryType: "",
    paintWorkType: "",
    };
  });

  // Show "draft restored" banner on mount if a draft was found
  useEffect(() => {
    if (loadDraft()) setDraftRestored(true);
  }, []);

  // Debounced auto-save on every vehicleDetails change (skip images — can't serialize File objects)
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        const { images: _images, ...saveable } = vehicleDetails;
        localStorage.setItem(SELL_CAR_DRAFT_KEY, JSON.stringify(saveable));
      } catch { /* storage full or blocked */ }
    }, 1500);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [vehicleDetails]);

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

  const colorOptions = [
    { value: 'Black', label: t('sell.colors.black') },
    { value: 'White', label: t('sell.colors.white') },
    { value: 'Silver', label: t('sell.colors.silver') },
    { value: 'Gray', label: t('sell.colors.gray') },
    { value: 'Red', label: t('sell.colors.red') },
    { value: 'Blue', label: t('sell.colors.blue') },
    { value: 'Green', label: t('sell.colors.green') },
    { value: 'Brown', label: t('sell.colors.brown') },
    { value: 'Gold', label: t('sell.colors.gold') },
    { value: 'Orange', label: t('sell.colors.orange') },
    { value: 'Purple', label: t('sell.colors.purple') },
    { value: 'Yellow', label: t('sell.colors.yellow') },
    { value: 'Beige', label: t('sell.colors.beige') },
  ];

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

  const handleSafetyFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setVehicleDetails(prev => ({
        ...prev,
        safetyFeatures: [...prev.safetyFeatures, feature]
      }));
    } else {
      setVehicleDetails(prev => ({
        ...prev,
        safetyFeatures: prev.safetyFeatures.filter(f => f !== feature)
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

  const mapVehicleType = (type: VehicleType, bodyType?: string): string => {
    if (bodyType) {
      const bodyTypeMap: Record<string, string> = {
        sedan: 'SEDAN', suv: 'SUV', coupe: 'COUPE',
        convertible: 'CONVERTIBLE', wagon: 'WAGON',
        hatchback: 'HATCHBACK', van: 'VAN',
      };
      if (bodyTypeMap[bodyType.toLowerCase()]) return bodyTypeMap[bodyType.toLowerCase()];
    }
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
    if (vehicleDetails.images.length === 0) {
      setSubmitError(t('sell.validation.imageRequired') || 'At least one photo is required');
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
        vehicleType: mapVehicleType(vehicleDetails.type, vehicleDetails.bodyType),
        fuelType: mapFuelType(vehicleDetails.fuelType),
        transmission: mapTransmission(vehicleDetails.transmission),
        condition: mapCondition(vehicleDetails.condition),
        color: vehicleDetails.exteriorColor || undefined,
        interiorColor: vehicleDetails.interiorColor || undefined,
        description: vehicleDetails.description || undefined,
        features: vehicleDetails.features,
        location: vehicleDetails.location,
        city: vehicleDetails.location,
        countryCode: (vehicleDetails.countryCode && vehicleDetails.countryCode !== 'global') ? vehicleDetails.countryCode : undefined,
        contactPhone: vehicleDetails.contactPhone || undefined,
        contactEmail: vehicleDetails.contactEmail || undefined,
        engineSize: vehicleDetails.engineSizeTo ? parseInt(vehicleDetails.engineSizeTo) : (vehicleDetails.engineSizeFrom ? parseInt(vehicleDetails.engineSizeFrom) : undefined),
        horsePower: vehicleDetails.horsePower ? parseInt(vehicleDetails.horsePower) : undefined,
        doors: vehicleDetails.doors ? parseInt(vehicleDetails.doors) : undefined,
        seats: vehicleDetails.seats ? parseInt(vehicleDetails.seats) : undefined,
        drivetrain: vehicleDetails.drivetrain || undefined,
        safetyFeatures: vehicleDetails.safetyFeatures.length > 0 ? vehicleDetails.safetyFeatures : undefined,
        fuelConsumption: vehicleDetails.fuelConsumption ? parseFloat(vehicleDetails.fuelConsumption) : undefined,
        emissionClass: vehicleDetails.emissionClass || undefined,
        warrantyMonths: vehicleDetails.warrantyMonths ? parseInt(vehicleDetails.warrantyMonths) : undefined,
        previousOwners: vehicleDetails.previousOwners ? parseInt(vehicleDetails.previousOwners) : undefined,
        hadAccident: vehicleDetails.hadAccident || undefined,
        nonSmokingVehicle: vehicleDetails.nonSmokingVehicle || undefined,
        fullServiceHistory: vehicleDetails.fullServiceHistory || undefined,
        allowTestDrive: vehicleDetails.allowTestDrive || undefined,
        acceptsTradeIn: vehicleDetails.acceptsTradeIn || undefined,
        priceNegotiable: vehicleDetails.priceNegotiable || undefined,
        upholsteryType: vehicleDetails.upholsteryType || undefined,
        paintWorkType: vehicleDetails.paintWorkType || undefined,
      };

      // Step 1: Create the car listing
      setUploadProgress(t('sell.progress.creatingListing') || 'Creating listing...');
      const car = await apiClient.createCar(input);

      // Step 2: Upload images to Cloudinary and create image records
      console.log('[SellCar] vehicleDetails.images:', vehicleDetails.images.length, vehicleDetails.images);
      const imagesToUpload = vehicleDetails.images.filter(
        (img: any) => img.compressed || img.file
      );
      console.log('[SellCar] imagesToUpload after filter:', imagesToUpload.length);

      const failedImages: number[] = [];
      const imageErrors: string[] = [];
      if (imagesToUpload.length > 0) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          const img = imagesToUpload[i];
          const file = img.compressed || img.file;
          console.log(`[SellCar] Uploading image ${i + 1}:`, file?.name, file?.size, file?.type);

          setUploadProgress(
            `${t('sell.progress.uploadingImage') || 'Uploading image'} ${i + 1}/${imagesToUpload.length}...`
          );

          try {
            const uploadResult = await uploadToCloudinary(file);
            console.log(`[SellCar] Cloudinary upload success:`, uploadResult.url);
            await apiClient.createCarImage({
              carId: car.id,
              url: uploadResult.url,
              fileName: uploadResult.originalFileName,
              fileSize: uploadResult.fileSize,
              sortOrder: i,
              isPrimary: i === 0,
            });
            console.log(`[SellCar] createCarImage success for image ${i + 1}`);
          } catch (imgError) {
            const errMsg = imgError instanceof Error ? imgError.message : String(imgError);
            console.error(`[SellCar] Image ${i + 1} upload failed:`, errMsg, imgError);
            failedImages.push(i + 1);
            imageErrors.push(`Image ${i + 1}: ${errMsg}`);
          }
        }
      } else {
        console.warn('[SellCar] No images to upload! vehicleDetails.images:', JSON.stringify(vehicleDetails.images.map((img: any) => ({ hasFile: !!img.file, hasCompressed: !!img.compressed, hasPreview: !!img.preview, id: img.id }))));
      }

      localStorage.removeItem(SELL_CAR_DRAFT_KEY);

      trackEvent('create_listing', {
        vehicle_type: vehicleDetails.type || 'car',
        make: vehicleDetails.make || '',
      });

      if (failedImages.length > 0) {
        setSubmitError(`Listing created, but ${failedImages.length} image(s) failed: ${imageErrors.join('; ')}. You can add them later from your dashboard.`);
      } else if (vehicleDetails.images.length > 0 && imagesToUpload.length === 0) {
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

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO title={t('meta.pages.sellCar')} canonical="/sell" />
      {draftRestored && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between text-sm text-blue-700">
          <span>Draft restored — your previous progress has been loaded.</span>
          <button
            className="underline ml-4"
            onClick={() => {
              localStorage.removeItem(SELL_CAR_DRAFT_KEY);
              window.location.reload();
            }}
          >
            Start fresh
          </button>
        </div>
      )}
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
                      {vehicleDetails.price ? `€${vehicleDetails.price}` : t('sell.preview.priceLabel')}
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
                        <Input
                          type="number"
                          min="0"
                          max="9999999"
                          placeholder={t('sell.placeholders.enterMileage')}
                          value={vehicleDetails.mileage}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, mileage: e.target.value})}
                        />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {vehicleDetails.type === 'car' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.bodyType')}</label>
                          <Select value={vehicleDetails.bodyType} onValueChange={(value) => setVehicleDetails({...vehicleDetails, bodyType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('sell.placeholders.selectBodyType')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sedan">{t('sell.bodyTypes.sedan')}</SelectItem>
                              <SelectItem value="suv">{t('sell.bodyTypes.suv')}</SelectItem>
                              <SelectItem value="coupe">{t('sell.bodyTypes.coupe')}</SelectItem>
                              <SelectItem value="convertible">{t('sell.bodyTypes.convertible')}</SelectItem>
                              <SelectItem value="wagon">{t('sell.bodyTypes.wagon')}</SelectItem>
                              <SelectItem value="hatchback">{t('sell.bodyTypes.hatchback')}</SelectItem>
                              <SelectItem value="van">{t('sell.bodyTypes.van')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.drivetrain')}</label>
                        <Select value={vehicleDetails.drivetrain} onValueChange={(value) => setVehicleDetails({...vehicleDetails, drivetrain: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectDrivetrain')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FWD">{t('sell.drivetrains.fwd')}</SelectItem>
                            <SelectItem value="RWD">{t('sell.drivetrains.rwd')}</SelectItem>
                            <SelectItem value="AWD">{t('sell.drivetrains.awd')}</SelectItem>
                            <SelectItem value="4WD">{t('sell.drivetrains.fourwd')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.engineSize')}</label>
                        <div className="grid grid-cols-2 gap-3">
                          <Select value={vehicleDetails.engineSizeFrom} onValueChange={(value) => setVehicleDetails({...vehicleDetails, engineSizeFrom: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('sell.placeholders.engineSizeFrom')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="500">0.5L</SelectItem>
                              <SelectItem value="800">0.8L</SelectItem>
                              <SelectItem value="1000">1.0L</SelectItem>
                              <SelectItem value="1200">1.2L</SelectItem>
                              <SelectItem value="1400">1.4L</SelectItem>
                              <SelectItem value="1600">1.6L</SelectItem>
                              <SelectItem value="1800">1.8L</SelectItem>
                              <SelectItem value="2000">2.0L</SelectItem>
                              <SelectItem value="2200">2.2L</SelectItem>
                              <SelectItem value="2500">2.5L</SelectItem>
                              <SelectItem value="2800">2.8L</SelectItem>
                              <SelectItem value="3000">3.0L</SelectItem>
                              <SelectItem value="3500">3.5L</SelectItem>
                              <SelectItem value="4000">4.0L</SelectItem>
                              <SelectItem value="5000">5.0L</SelectItem>
                              <SelectItem value="6000">6.0L</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={vehicleDetails.engineSizeTo} onValueChange={(value) => setVehicleDetails({...vehicleDetails, engineSizeTo: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('sell.placeholders.engineSizeTo')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="500">0.5L</SelectItem>
                              <SelectItem value="800">0.8L</SelectItem>
                              <SelectItem value="1000">1.0L</SelectItem>
                              <SelectItem value="1200">1.2L</SelectItem>
                              <SelectItem value="1400">1.4L</SelectItem>
                              <SelectItem value="1600">1.6L</SelectItem>
                              <SelectItem value="1800">1.8L</SelectItem>
                              <SelectItem value="2000">2.0L</SelectItem>
                              <SelectItem value="2200">2.2L</SelectItem>
                              <SelectItem value="2500">2.5L</SelectItem>
                              <SelectItem value="2800">2.8L</SelectItem>
                              <SelectItem value="3000">3.0L</SelectItem>
                              <SelectItem value="3500">3.5L</SelectItem>
                              <SelectItem value="4000">4.0L</SelectItem>
                              <SelectItem value="5000">5.0L</SelectItem>
                              <SelectItem value="6000">6.0L</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.horsePower')}</label>
                        <Input
                          type="number"
                          placeholder="e.g. 150"
                          value={vehicleDetails.horsePower}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, horsePower: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.doors')}</label>
                        <div className="flex rounded-2xl border border-input overflow-hidden h-11">
                          {[
                            { label: 'All', value: '' },
                            { label: '2/3', value: '2/3' },
                            { label: '4/5', value: '4/5' },
                            { label: '6/7', value: '6/7' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setVehicleDetails({...vehicleDetails, doors: option.value})}
                              className={`flex-1 text-sm font-medium transition-colors ${
                                vehicleDetails.doors === option.value
                                  ? 'bg-black text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                              } ${option.value !== '' ? 'border-l border-input' : ''}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.seats')}</label>
                        <Select value={vehicleDetails.seats} onValueChange={(value) => setVehicleDetails({...vehicleDetails, seats: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectSeats')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="9">9</SelectItem>
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
                        <Select value={vehicleDetails.exteriorColor} onValueChange={(value) => setVehicleDetails({...vehicleDetails, exteriorColor: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.exteriorColorExample')} />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.interiorColor')}</label>
                        <Select value={vehicleDetails.interiorColor} onValueChange={(value) => setVehicleDetails({...vehicleDetails, interiorColor: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.interiorColorExample')} />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">{t('sell.headers.vehicleHistory')}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.upholsteryType')}</label>
                        <Select value={vehicleDetails.upholsteryType} onValueChange={(value) => setVehicleDetails({...vehicleDetails, upholsteryType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectUpholstery')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fabric">{t('sell.upholsteryTypes.fabric')}</SelectItem>
                            <SelectItem value="Leather">{t('sell.upholsteryTypes.leather')}</SelectItem>
                            <SelectItem value="Leatherette">{t('sell.upholsteryTypes.leatherette')}</SelectItem>
                            <SelectItem value="Alcantara">{t('sell.upholsteryTypes.alcantara')}</SelectItem>
                            <SelectItem value="Vinyl">{t('sell.upholsteryTypes.vinyl')}</SelectItem>
                            <SelectItem value="Combination">{t('sell.upholsteryTypes.combination')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.paintWorkType')}</label>
                        <Select value={vehicleDetails.paintWorkType} onValueChange={(value) => setVehicleDetails({...vehicleDetails, paintWorkType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectPaintWork')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Solid">{t('sell.paintWorkTypes.solid')}</SelectItem>
                            <SelectItem value="Metallic">{t('sell.paintWorkTypes.metallic')}</SelectItem>
                            <SelectItem value="Pearl">{t('sell.paintWorkTypes.pearl')}</SelectItem>
                            <SelectItem value="Matte">{t('sell.paintWorkTypes.matte')}</SelectItem>
                            <SelectItem value="Two-tone">{t('sell.paintWorkTypes.twoTone')}</SelectItem>
                            <SelectItem value="Custom">{t('sell.paintWorkTypes.custom')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.previousOwners')}</label>
                        <Select value={vehicleDetails.previousOwners} onValueChange={(value) => setVehicleDetails({...vehicleDetails, previousOwners: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectPreviousOwners')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.hadAccident')}</label>
                        <Select value={vehicleDetails.hadAccident} onValueChange={(value) => setVehicleDetails({...vehicleDetails, hadAccident: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectAccidentHistory')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">{t('sell.accidentHistory.yes')}</SelectItem>
                            <SelectItem value="No">{t('sell.accidentHistory.no')}</SelectItem>
                            <SelectItem value="Unknown">{t('sell.accidentHistory.unknown')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.emissionClass')}</label>
                        <Select value={vehicleDetails.emissionClass} onValueChange={(value) => setVehicleDetails({...vehicleDetails, emissionClass: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('sell.placeholders.selectEmissionClass')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Euro 1">{t('sell.emissionClasses.euro1')}</SelectItem>
                            <SelectItem value="Euro 2">{t('sell.emissionClasses.euro2')}</SelectItem>
                            <SelectItem value="Euro 3">{t('sell.emissionClasses.euro3')}</SelectItem>
                            <SelectItem value="Euro 4">{t('sell.emissionClasses.euro4')}</SelectItem>
                            <SelectItem value="Euro 5">{t('sell.emissionClasses.euro5')}</SelectItem>
                            <SelectItem value="Euro 6">{t('sell.emissionClasses.euro6')}</SelectItem>
                            <SelectItem value="Euro 6d">{t('sell.emissionClasses.euro6d')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.fuelConsumption')}</label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="e.g. 7.5 L/100km"
                          value={vehicleDetails.fuelConsumption}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, fuelConsumption: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.warrantyMonths')}</label>
                        <Input
                          type="number"
                          placeholder="e.g. 12"
                          value={vehicleDetails.warrantyMonths}
                          onChange={(e) => setVehicleDetails({...vehicleDetails, warrantyMonths: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fullServiceHistory"
                          checked={vehicleDetails.fullServiceHistory}
                          onCheckedChange={(checked) => setVehicleDetails({...vehicleDetails, fullServiceHistory: checked as boolean})}
                        />
                        <label htmlFor="fullServiceHistory" className="text-sm text-gray-700">
                          {t('sell.fields.fullServiceHistory')}
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="nonSmokingVehicle"
                          checked={vehicleDetails.nonSmokingVehicle}
                          onCheckedChange={(checked) => setVehicleDetails({...vehicleDetails, nonSmokingVehicle: checked as boolean})}
                        />
                        <label htmlFor="nonSmokingVehicle" className="text-sm text-gray-700">
                          {t('sell.fields.nonSmokingVehicle')}
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('sell.fields.askingPrice')} *</label>
                        <div className="relative">
                          <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                      <label className="block text-sm font-medium text-gray-700 mb-4">{t('sell.fields.safetyFeatures')}</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          t('sell.safetyFeaturesList.abs'),
                          t('sell.safetyFeaturesList.esp'),
                          t('sell.safetyFeaturesList.driverAirbag'),
                          t('sell.safetyFeaturesList.passengerAirbag'),
                          t('sell.safetyFeaturesList.sideAirbags'),
                          t('sell.safetyFeaturesList.curtainAirbags'),
                          t('sell.safetyFeaturesList.blindSpotMonitor'),
                          t('sell.safetyFeaturesList.laneDepartureWarning'),
                          t('sell.safetyFeaturesList.emergencyBraking'),
                          t('sell.safetyFeaturesList.parkingSensors'),
                          t('sell.safetyFeaturesList.backupCamera'),
                          t('sell.safetyFeaturesList.camera360'),
                          t('sell.safetyFeaturesList.tirePressureMonitor'),
                        ].map((safetyFeature) => (
                          <div key={safetyFeature} className="flex items-center space-x-2">
                            <Checkbox
                              id={safetyFeature}
                              checked={vehicleDetails.safetyFeatures.includes(safetyFeature)}
                              onCheckedChange={(checked) => handleSafetyFeatureChange(safetyFeature, checked as boolean)}
                            />
                            <label htmlFor={safetyFeature} className="text-sm text-gray-700">
                              {safetyFeature}
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
                        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={locationOpen}
                              className="w-full justify-between font-normal h-11 rounded-2xl bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                            >
                              <span className={vehicleDetails.location ? "text-gray-900" : "text-gray-400"}>
                                {vehicleDetails.location || t('sell.placeholders.selectLocation')}
                              </span>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden" align="start">
                            <Command className="bg-white">
                              <CommandInput placeholder={t('sell.placeholders.searchLocation')} className="bg-white" />
                              <CommandList className="bg-white max-h-60">
                                <CommandEmpty className="bg-white text-sm text-gray-500 py-3 text-center">{t('sell.noLocationFound')}</CommandEmpty>
                                <CommandGroup className="bg-white">
                                  {locations.map((loc) => (
                                    <CommandItem
                                      key={loc.value}
                                      value={loc.value}
                                      onSelect={(value) => {
                                        setVehicleDetails({...vehicleDetails, location: value});
                                        setLocationOpen(false);
                                      }}
                                      className="bg-white hover:bg-gray-50 cursor-pointer"
                                    >
                                      <Check className={cn("mr-2 h-4 w-4", vehicleDetails.location === loc.value ? "opacity-100" : "opacity-0")} />
                                      {loc.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{t('sell.headers.listingOptions')}</h3>
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="priceNegotiable"
                            checked={vehicleDetails.priceNegotiable}
                            onCheckedChange={(checked) => setVehicleDetails({...vehicleDetails, priceNegotiable: checked as boolean})}
                          />
                          <label htmlFor="priceNegotiable" className="text-sm text-gray-700">
                            {t('sell.fields.priceNegotiable')}
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acceptsTradeIn"
                            checked={vehicleDetails.acceptsTradeIn}
                            onCheckedChange={(checked) => setVehicleDetails({...vehicleDetails, acceptsTradeIn: checked as boolean})}
                          />
                          <label htmlFor="acceptsTradeIn" className="text-sm text-gray-700">
                            {t('sell.fields.acceptsTradeIn')}
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowTestDrive"
                            checked={vehicleDetails.allowTestDrive}
                            onCheckedChange={(checked) => setVehicleDetails({...vehicleDetails, allowTestDrive: checked as boolean})}
                          />
                          <label htmlFor="allowTestDrive" className="text-sm text-gray-700">
                            {t('sell.fields.allowTestDrive')}
                          </label>
                        </div>
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
