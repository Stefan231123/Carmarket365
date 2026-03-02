import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle, Check, ChevronsUpDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useCountry } from "@/contexts/CountryContext";
import { useCar } from "@/hooks/useCars";
import { apiClient } from "@shared/api-client";
import { CAR_MAKES, getModelsForMake } from "@shared/car-data";
import { getLocationsForCountry } from "@shared/locations";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/ImageUpload";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function EditListing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { country } = useCountry();
  const { car, isLoading: isLoadingCar, error: loadError } = useCar(id || "");
  const [locationOpen, setLocationOpen] = useState(false);
  const locations = getLocationsForCountry(country?.code || 'mk');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  // Form state
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [condition, setCondition] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [newImages, setNewImages] = useState<any[]>([]);

  // New enriched fields
  const [engineSizeFrom, setEngineSizeFrom] = useState("");
  const [engineSizeTo, setEngineSizeTo] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [doors, setDoors] = useState("");
  const [seats, setSeats] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [emissionClass, setEmissionClass] = useState("");
  const [warrantyMonths, setWarrantyMonths] = useState("");
  const [previousOwners, setPreviousOwners] = useState("");
  const [hadAccident, setHadAccident] = useState("");
  const [upholsteryType, setUpholsteryType] = useState("");
  const [paintWorkType, setPaintWorkType] = useState("");
  const [nonSmokingVehicle, setNonSmokingVehicle] = useState(false);
  const [fullServiceHistory, setFullServiceHistory] = useState(false);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [acceptsTradeIn, setAcceptsTradeIn] = useState(false);
  const [allowTestDrive, setAllowTestDrive] = useState(false);

  // Populate form when car data loads
  useEffect(() => {
    if (car) {
      setMake(car.make || "");
      setModel(car.model || "");
      setYear(String(car.year || ""));
      setPrice(String(car.price || ""));
      setMileage(String(car.mileage || ""));
      setFuelType(car.fuelType || "");
      setTransmission(car.transmission || "");
      setCondition(car.condition || "");
      setExteriorColor(car.color || "");
      setInteriorColor(car.interiorColor || "");
      setDescription(car.description || "");
      setLocation(car.location || "");
      setContactPhone(car.contactPhone || "");
      setContactEmail(car.contactEmail || "");
      if (car.engineSize) {
        const nearest = String([500,800,1000,1200,1400,1600,1800,2000,2200,2500,2800,3000,3500,4000,5000,6000].reduce((prev, curr) => Math.abs(curr - car.engineSize!) < Math.abs(prev - car.engineSize!) ? curr : prev));
        setEngineSizeFrom(nearest);
        setEngineSizeTo(nearest);
      }
      setHorsePower(car.horsePower ? String(car.horsePower) : "");
      setDoors(car.doors ? (car.doors <= 3 ? '2/3' : car.doors <= 5 ? '4/5' : '6/7') : "");
      setSeats(car.seats ? String(car.seats) : "");
      setDrivetrain(car.drivetrain || "");
      setFuelConsumption(car.fuelConsumption ? String(car.fuelConsumption) : "");
      setEmissionClass(car.emissionClass || "");
      setWarrantyMonths(car.warrantyMonths ? String(car.warrantyMonths) : "");
      setPreviousOwners(car.previousOwners ? String(car.previousOwners) : "");
      setHadAccident(car.hadAccident || "");
      setUpholsteryType(car.upholsteryType || "");
      setPaintWorkType(car.paintWorkType || "");
      setNonSmokingVehicle(car.nonSmokingVehicle || false);
      setFullServiceHistory(car.fullServiceHistory || false);
      setPriceNegotiable(car.priceNegotiable || false);
      setAcceptsTradeIn(car.acceptsTradeIn || false);
      setAllowTestDrive(car.allowTestDrive || false);
    }
  }, [car]);

  const carModels = make ? getModelsForMake(make) : [];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => String(currentYear + 1 - i));

  const colorOptions = [
    { value: "Black", label: t("sell.colors.black") },
    { value: "White", label: t("sell.colors.white") },
    { value: "Silver", label: t("sell.colors.silver") },
    { value: "Gray", label: t("sell.colors.gray") },
    { value: "Red", label: t("sell.colors.red") },
    { value: "Blue", label: t("sell.colors.blue") },
    { value: "Green", label: t("sell.colors.green") },
    { value: "Brown", label: t("sell.colors.brown") },
    { value: "Gold", label: t("sell.colors.gold") },
    { value: "Orange", label: t("sell.colors.orange") },
    { value: "Purple", label: t("sell.colors.purple") },
    { value: "Yellow", label: t("sell.colors.yellow") },
    { value: "Beige", label: t("sell.colors.beige") },
  ];

  const handleSave = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    setUploadProgress("");

    if (!make || !model) {
      setSubmitError(t("sell.validation.makeModelRequired") || "Make and model are required");
      setIsSubmitting(false);
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setSubmitError(t("sell.validation.priceRequired") || "Please enter a valid price");
      setIsSubmitting(false);
      return;
    }

    try {
      const input: Record<string, any> = {
        make,
        model,
        year: parseInt(year) || currentYear,
        price: parseFloat(price) || 0,
        mileage: parseInt(mileage) || 0,
        fuelType: fuelType || undefined,
        transmission: transmission || undefined,
        condition: condition || undefined,
        color: exteriorColor || undefined,
        interiorColor: interiorColor || undefined,
        description: description || undefined,
        location: location || undefined,
        city: location || undefined,
        contactPhone: contactPhone || undefined,
        contactEmail: contactEmail || undefined,
        engineSize: engineSizeTo ? parseInt(engineSizeTo) : (engineSizeFrom ? parseInt(engineSizeFrom) : undefined),
        horsePower: horsePower ? parseInt(horsePower) : undefined,
        doors: doors ? parseInt(doors) : undefined,
        seats: seats ? parseInt(seats) : undefined,
        drivetrain: drivetrain || undefined,
        fuelConsumption: fuelConsumption ? parseFloat(fuelConsumption) : undefined,
        emissionClass: emissionClass || undefined,
        warrantyMonths: warrantyMonths ? parseInt(warrantyMonths) : undefined,
        previousOwners: previousOwners ? parseInt(previousOwners) : undefined,
        hadAccident: hadAccident || undefined,
        upholsteryType: upholsteryType || undefined,
        paintWorkType: paintWorkType || undefined,
        nonSmokingVehicle: nonSmokingVehicle || undefined,
        fullServiceHistory: fullServiceHistory || undefined,
        priceNegotiable: priceNegotiable || undefined,
        acceptsTradeIn: acceptsTradeIn || undefined,
        allowTestDrive: allowTestDrive || undefined,
      };

      setUploadProgress(t("sell.progress.creatingListing") || "Saving changes...");
      await apiClient.updateCar(id!, input);

      // Upload new images if any
      const imagesToUpload = newImages.filter((img: any) => img.compressed || img.file);
      if (imagesToUpload.length > 0) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          const img = imagesToUpload[i];
          const file = img.compressed || img.file;
          setUploadProgress(`${t("sell.progress.uploadingImage") || "Uploading image"} ${i + 1}/${imagesToUpload.length}...`);
          try {
            const uploadResult = await uploadToCloudinary(file);
            await apiClient.createCarImage({
              carId: id!,
              url: uploadResult.url,
              fileName: uploadResult.originalFileName,
              fileSize: uploadResult.fileSize,
              sortOrder: i + (car?.images?.length || 0),
              isPrimary: false,
            });
          } catch (imgError) {
            console.error(`Image ${i + 1} upload failed:`, imgError);
          }
        }
      }

      setSubmitSuccess(true);
      setUploadProgress("");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to update listing");
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  if (isLoadingCar) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (loadError || !car) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p>{loadError || "Listing not found"}</p>
            <Button className="mt-4" onClick={() => navigate(-1)}>
              {t("carDetail.backToSearch")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("carDetail.backToSearch")}
            </Button>
            <h1 className="text-xl font-semibold">
              {t("dealer.editListing") || "Edit Listing"}: {car.year} {car.make} {car.model}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {t("sell.success") || "Listing updated successfully!"}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Vehicle Info */}
          <Card className="rounded-2xl border-zinc-100">
            <CardHeader>
              <CardTitle>{t("sell.steps.basicInfo") || "Basic Info"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.makeLabel") || "Make"}</label>
                  <Select value={make} onValueChange={(v) => { setMake(v); setModel(""); }}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CAR_MAKES.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.modelLabel") || "Model"}</label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {carModels.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.yearLabel") || "Year"}</label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.priceLabel") || "Price"} (EUR)</label>
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.mileageLabel") || "Mileage"} (km)</label>
                  <Input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.locationLabel") || "Location"}</label>
                  <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={locationOpen}
                        className="w-full justify-between font-normal h-11 rounded-xl"
                      >
                        {location || t('sell.placeholders.selectLocation')}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder={t('sell.placeholders.searchLocation')} />
                        <CommandList>
                          <CommandEmpty>{t('sell.noLocationFound')}</CommandEmpty>
                          <CommandGroup>
                            {locations.map((loc) => (
                              <CommandItem
                                key={loc.value}
                                value={loc.value}
                                onSelect={(value) => {
                                  setLocation(value);
                                  setLocationOpen(false);
                                }}
                              >
                                <Check className={cn("mr-2 h-4 w-4", location === loc.value ? "opacity-100" : "opacity-0")} />
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
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="rounded-2xl border-zinc-100">
            <CardHeader>
              <CardTitle>{t("sell.steps.details") || "Details"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fuelTypeLabel") || "Fuel Type"}</label>
                  <Select value={fuelType} onValueChange={setFuelType}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GASOLINE">{t("sell.fuelTypes.gasoline")}</SelectItem>
                      <SelectItem value="DIESEL">{t("sell.fuelTypes.diesel")}</SelectItem>
                      <SelectItem value="ELECTRIC">{t("sell.fuelTypes.electric")}</SelectItem>
                      <SelectItem value="HYBRID">{t("sell.fuelTypes.hybrid")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.transmissionLabel") || "Transmission"}</label>
                  <Select value={transmission} onValueChange={setTransmission}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AUTOMATIC">{t("sell.transmissions.automatic")}</SelectItem>
                      <SelectItem value="MANUAL">{t("sell.transmissions.manual")}</SelectItem>
                      <SelectItem value="CVT">{t("sell.transmissions.cvt")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.conditionLabel") || "Condition"}</label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">{t("sell.conditions.new") || "New"}</SelectItem>
                      <SelectItem value="CERTIFIED">{t("sell.conditions.excellent")}</SelectItem>
                      <SelectItem value="USED">{t("sell.conditions.good")}</SelectItem>
                      <SelectItem value="DAMAGED">{t("sell.conditions.fair")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.exteriorColorLabel") || "Exterior Color"}</label>
                  <Select value={exteriorColor} onValueChange={setExteriorColor}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.interiorColorLabel") || "Interior Color"}</label>
                  <Select value={interiorColor} onValueChange={setInteriorColor}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">{t("sell.descriptionLabel") || "Description"}</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="rounded-xl" />
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="rounded-2xl border-zinc-100">
            <CardHeader>
              <CardTitle>{t("sell.headers.vehicleDetails") || "Specifications"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.drivetrain")}</label>
                  <Select value={drivetrain} onValueChange={setDrivetrain}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectDrivetrain")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FWD">{t("sell.drivetrains.fwd")}</SelectItem>
                      <SelectItem value="RWD">{t("sell.drivetrains.rwd")}</SelectItem>
                      <SelectItem value="AWD">{t("sell.drivetrains.awd")}</SelectItem>
                      <SelectItem value="4WD">{t("sell.drivetrains.fourwd")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.engineSize")}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Select value={engineSizeFrom} onValueChange={setEngineSizeFrom}>
                      <SelectTrigger><SelectValue placeholder={t("sell.placeholders.engineSizeFrom")} /></SelectTrigger>
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
                    <Select value={engineSizeTo} onValueChange={setEngineSizeTo}>
                      <SelectTrigger><SelectValue placeholder={t("sell.placeholders.engineSizeTo")} /></SelectTrigger>
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
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.horsePower")}</label>
                  <Input type="number" placeholder="e.g. 150" value={horsePower} onChange={(e) => setHorsePower(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.doors")}</label>
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
                        onClick={() => setDoors(option.value)}
                        className={`flex-1 text-sm font-medium transition-colors ${
                          doors === option.value
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
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.seats")}</label>
                  <Select value={seats} onValueChange={setSeats}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectSeats")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.fuelConsumption")}</label>
                  <Input type="number" step="0.1" placeholder="e.g. 7.5" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle History & Condition */}
          <Card className="rounded-2xl border-zinc-100">
            <CardHeader>
              <CardTitle>{t("sell.headers.vehicleHistory") || "Vehicle History"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.upholsteryType")}</label>
                  <Select value={upholsteryType} onValueChange={setUpholsteryType}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectUpholstery")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fabric">{t("sell.upholsteryTypes.fabric")}</SelectItem>
                      <SelectItem value="Leather">{t("sell.upholsteryTypes.leather")}</SelectItem>
                      <SelectItem value="Leatherette">{t("sell.upholsteryTypes.leatherette")}</SelectItem>
                      <SelectItem value="Alcantara">{t("sell.upholsteryTypes.alcantara")}</SelectItem>
                      <SelectItem value="Vinyl">{t("sell.upholsteryTypes.vinyl")}</SelectItem>
                      <SelectItem value="Combination">{t("sell.upholsteryTypes.combination")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.paintWorkType")}</label>
                  <Select value={paintWorkType} onValueChange={setPaintWorkType}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectPaintWork")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solid">{t("sell.paintWorkTypes.solid")}</SelectItem>
                      <SelectItem value="Metallic">{t("sell.paintWorkTypes.metallic")}</SelectItem>
                      <SelectItem value="Pearl">{t("sell.paintWorkTypes.pearl")}</SelectItem>
                      <SelectItem value="Matte">{t("sell.paintWorkTypes.matte")}</SelectItem>
                      <SelectItem value="Two-tone">{t("sell.paintWorkTypes.twoTone")}</SelectItem>
                      <SelectItem value="Custom">{t("sell.paintWorkTypes.custom")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.previousOwners")}</label>
                  <Select value={previousOwners} onValueChange={setPreviousOwners}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectPreviousOwners")} /></SelectTrigger>
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
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.hadAccident")}</label>
                  <Select value={hadAccident} onValueChange={setHadAccident}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectAccidentHistory")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">{t("sell.accidentHistory.yes")}</SelectItem>
                      <SelectItem value="No">{t("sell.accidentHistory.no")}</SelectItem>
                      <SelectItem value="Unknown">{t("sell.accidentHistory.unknown")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.emissionClass")}</label>
                  <Select value={emissionClass} onValueChange={setEmissionClass}>
                    <SelectTrigger><SelectValue placeholder={t("sell.placeholders.selectEmissionClass")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Euro 1">{t("sell.emissionClasses.euro1")}</SelectItem>
                      <SelectItem value="Euro 2">{t("sell.emissionClasses.euro2")}</SelectItem>
                      <SelectItem value="Euro 3">{t("sell.emissionClasses.euro3")}</SelectItem>
                      <SelectItem value="Euro 4">{t("sell.emissionClasses.euro4")}</SelectItem>
                      <SelectItem value="Euro 5">{t("sell.emissionClasses.euro5")}</SelectItem>
                      <SelectItem value="Euro 6">{t("sell.emissionClasses.euro6")}</SelectItem>
                      <SelectItem value="Euro 6d">{t("sell.emissionClasses.euro6d")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.fields.warrantyMonths")}</label>
                  <Input type="number" placeholder="e.g. 12" value={warrantyMonths} onChange={(e) => setWarrantyMonths(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-fullServiceHistory" checked={fullServiceHistory} onCheckedChange={(checked) => setFullServiceHistory(checked as boolean)} />
                  <label htmlFor="edit-fullServiceHistory" className="text-sm">{t("sell.fields.fullServiceHistory")}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-nonSmokingVehicle" checked={nonSmokingVehicle} onCheckedChange={(checked) => setNonSmokingVehicle(checked as boolean)} />
                  <label htmlFor="edit-nonSmokingVehicle" className="text-sm">{t("sell.fields.nonSmokingVehicle")}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-priceNegotiable" checked={priceNegotiable} onCheckedChange={(checked) => setPriceNegotiable(checked as boolean)} />
                  <label htmlFor="edit-priceNegotiable" className="text-sm">{t("sell.fields.priceNegotiable")}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-acceptsTradeIn" checked={acceptsTradeIn} onCheckedChange={(checked) => setAcceptsTradeIn(checked as boolean)} />
                  <label htmlFor="edit-acceptsTradeIn" className="text-sm">{t("sell.fields.acceptsTradeIn")}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-allowTestDrive" checked={allowTestDrive} onCheckedChange={(checked) => setAllowTestDrive(checked as boolean)} />
                  <label htmlFor="edit-allowTestDrive" className="text-sm">{t("sell.fields.allowTestDrive")}</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="rounded-2xl border-zinc-100">
            <CardHeader>
              <CardTitle>{t("sell.contactInfoTitle") || "Contact Info"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.phoneLabel") || "Phone"}</label>
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("sell.emailLabel") || "Email"}</label>
                  <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add New Images */}
          <Card className="rounded-2xl border-zinc-100">
            <CardHeader>
              <CardTitle>{t("sell.addPhotosTitle") || "Add Photos"}</CardTitle>
            </CardHeader>
            <CardContent>
              {car.images && car.images.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("sell.existingPhotos") || "Existing photos"}: {car.images.length}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {car.images.map((img: any, idx: number) => (
                      <img
                        key={idx}
                        src={typeof img === "string" ? img : img.url}
                        alt=""
                        className="w-20 h-16 object-cover rounded-lg border border-zinc-200"
                      />
                    ))}
                  </div>
                </div>
              )}
              <ImageUpload onImagesChange={setNewImages} />
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4 pb-8">
            <Button variant="outline" onClick={() => navigate(-1)} className="rounded-xl flex-1" disabled={isSubmitting}>
              {t("common.cancel") || "Cancel"}
            </Button>
            <Button onClick={handleSave} className="rounded-xl flex-1 bg-black text-white hover:bg-black/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {uploadProgress || (t("sell.progress.creatingListing") || "Saving...")}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t("common.save") || "Save Changes"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
