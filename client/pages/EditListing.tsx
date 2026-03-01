import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useCar } from "@/hooks/useCars";
import { apiClient } from "@shared/api-client";
import { CAR_MAKES, getModelsForMake } from "@shared/car-data";
import ImageUpload from "@/components/ImageUpload";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function EditListing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { car, isLoading: isLoadingCar, error: loadError } = useCar(id || "");

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
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl" />
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
