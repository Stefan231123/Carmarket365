import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { 
  Calculator, 
  DollarSign, 
  Car, 
  Gauge, 
  Calendar,
  Star,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

interface TradeInEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEstimateComplete?: (estimate: TradeInEstimate) => void;
}

interface TradeInFormData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  accidents: string;
  serviceHistory: string;
  modifications: string;
  location: string;
  urgency: string;
  additionalInfo: string;
}

interface TradeInEstimate {
  estimatedValue: number;
  lowRange: number;
  highRange: number;
  factors: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  marketTrend: "up" | "down" | "stable";
  confidence: "high" | "medium" | "low";
  recommendations: string[];
}

const popularMakes = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia",
  "Mazda", "Subaru", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", 
  "Lexus", "Acura", "Infiniti", "Cadillac", "Buick", "GMC", "RAM",
  "Jeep", "Dodge", "Chrysler", "Lincoln", "Tesla", "Volvo", "Jaguar",
  "Land Rover", "Porsche", "Mitsubishi", "Genesis"
];

// Condition options are now translated dynamically inside the component

export function TradeInEstimatorModal({ 
  isOpen, 
  onClose, 
  onEstimateComplete 
}: TradeInEstimatorModalProps) {
  const { t } = useTranslation();
  const [estimate, setEstimate] = useState<TradeInEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Translated dropdown options
  const conditionOptions = [
    { value: "excellent", label: t('modals.tradeIn.conditionOptions.excellent.label'), description: t('modals.tradeIn.conditionOptions.excellent.description') },
    { value: "very-good", label: t('modals.tradeIn.conditionOptions.veryGood.label'), description: t('modals.tradeIn.conditionOptions.veryGood.description') },
    { value: "good", label: t('modals.tradeIn.conditionOptions.good.label'), description: t('modals.tradeIn.conditionOptions.good.description') },
    { value: "fair", label: t('modals.tradeIn.conditionOptions.fair.label'), description: t('modals.tradeIn.conditionOptions.fair.description') },
    { value: "poor", label: t('modals.tradeIn.conditionOptions.poor.label'), description: t('modals.tradeIn.conditionOptions.poor.description') }
  ];

  const accidentOptions = [
    { value: "none", label: t('modals.tradeIn.accidentOptions.none') },
    { value: "minor", label: t('modals.tradeIn.accidentOptions.minor') },
    { value: "major", label: t('modals.tradeIn.accidentOptions.major') }
  ];

  const serviceOptions = [
    { value: "excellent", label: t('modals.tradeIn.serviceOptions.excellent') },
    { value: "regular", label: t('modals.tradeIn.serviceOptions.regular') },
    { value: "poor", label: t('modals.tradeIn.serviceOptions.poor') }
  ];

  const modificationOptions = [
    { value: "none", label: t('modals.tradeIn.modificationOptions.none') },
    { value: "minor", label: t('modals.tradeIn.modificationOptions.minor') },
    { value: "major", label: t('modals.tradeIn.modificationOptions.major') }
  ];

  const form = useForm<TradeInFormData>({
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear() - 5,
      mileage: 60000,
      condition: "good",
      accidents: "none",
      serviceHistory: "regular",
      modifications: "none",
      location: "",
      urgency: "normal",
      additionalInfo: ""
    }
  });

  const calculateEstimate = async (data: TradeInFormData): Promise<TradeInEstimate> => {
    // Simulated calculation - in real app this would call an API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Base value calculation (simplified)
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - data.year;
    const baseValue = Math.max(5000, 30000 - (vehicleAge * 2000) - (data.mileage * 0.1));
    
    // Condition adjustments
    const conditionMultipliers = {
      "excellent": 1.15,
      "very-good": 1.05,
      "good": 1.0,
      "fair": 0.85,
      "poor": 0.65
    };
    
    const conditionAdjusted = baseValue * (conditionMultipliers[data.condition as keyof typeof conditionMultipliers] || 1);
    
    // Accident history adjustment
    const accidentAdjustment = data.accidents === "none" ? 1.0 : 
                              data.accidents === "minor" ? 0.95 : 0.85;
    
    // Service history adjustment
    const serviceAdjustment = data.serviceHistory === "excellent" ? 1.05 :
                             data.serviceHistory === "regular" ? 1.0 : 0.9;
    
    const finalEstimate = conditionAdjusted * accidentAdjustment * serviceAdjustment;
    const lowRange = finalEstimate * 0.85;
    const highRange = finalEstimate * 1.15;
    
    // Generate factors
    const factors = {
      positive: [] as string[],
      negative: [] as string[],
      neutral: [] as string[]
    };
    
    if (data.condition === "excellent") factors.positive.push(t('modals.tradeIn.factors.excellentCondition'));
    if (data.accidents === "none") factors.positive.push(t('modals.tradeIn.factors.noAccidents'));
    if (data.serviceHistory === "excellent") factors.positive.push(t('modals.tradeIn.factors.excellentService'));
    if (vehicleAge <= 3) factors.positive.push(t('modals.tradeIn.factors.lowAge'));
    if (data.mileage < 30000) factors.positive.push(t('modals.tradeIn.factors.lowMileage'));
    
    if (data.condition === "poor") factors.negative.push(t('modals.tradeIn.factors.poorCondition'));
    if (data.accidents === "major") factors.negative.push(t('modals.tradeIn.factors.majorAccidents'));
    if (vehicleAge > 10) factors.negative.push(t('modals.tradeIn.factors.highAge'));
    if (data.mileage > 100000) factors.negative.push(t('modals.tradeIn.factors.highMileage'));
    
    // Market trend (simulated)
    const marketTrend = Math.random() > 0.5 ? "up" : vehicleAge < 5 ? "stable" : "down";
    
    // Confidence based on data completeness
    const confidence = data.additionalInfo.length > 50 ? "high" : "medium";
    
    const recommendations = [
      t('modals.tradeIn.results.recommendations.marketConditions'),
      t('modals.tradeIn.results.recommendations.multipleAppraisals'),
      t('modals.tradeIn.results.recommendations.maintenanceRecords'),
      t('modals.tradeIn.results.recommendations.cleanVehicle')
    ];
    
    return {
      estimatedValue: Math.round(finalEstimate),
      lowRange: Math.round(lowRange),
      highRange: Math.round(highRange),
      factors,
      marketTrend: marketTrend as "up" | "down" | "stable",
      confidence: confidence as "high" | "medium" | "low",
      recommendations
    };
  };

  const onSubmit = async (data: TradeInFormData) => {
    setIsCalculating(true);
    try {
      const result = await calculateEstimate(data);
      setEstimate(result);
      onEstimateComplete?.(result);
    } catch (error) {
      console.error("Error calculating estimate:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const reset = () => {
    setEstimate(null);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {t('modals.tradeIn.title')}
          </DialogTitle>
          <DialogDescription>
            {t('modals.tradeIn.description')}
          </DialogDescription>
        </DialogHeader>

        {!estimate ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vehicle Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      {t('modals.tradeIn.vehicleInformation')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="make"
                        rules={{ required: t('forms.validation.makeRequired') }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('modals.tradeIn.labels.make')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t('modals.tradeIn.placeholders.selectMake')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {popularMakes.map((make) => (
                                  <SelectItem key={make} value={make}>
                                    {make}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="model"
                        rules={{ required: t('forms.validation.modelRequired') }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('modals.tradeIn.labels.model')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('modals.tradeIn.placeholders.modelExample')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="year"
                        rules={{ 
                          required: t('forms.validation.yearRequired'),
                          min: { value: 1990, message: t('modals.tradeIn.validation.yearMin') },
                          max: { value: new Date().getFullYear() + 1, message: t('forms.validation.yearInvalid') }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('modals.tradeIn.labels.year')}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mileage"
                        rules={{ 
                          required: t('forms.validation.mileageRequired'),
                          min: { value: 0, message: t('forms.validation.mileageNegative') }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('modals.tradeIn.labels.mileage')}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder={t('modals.tradeIn.placeholders.mileageExample')}
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('modals.tradeIn.labels.condition')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conditionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div>
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-xs text-muted-foreground">{option.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* History & Condition */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      {t('modals.tradeIn.historyCondition')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="accidents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('modals.tradeIn.labels.accidentHistory')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accidentOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceHistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('modals.tradeIn.labels.serviceHistory')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="modifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('modals.tradeIn.labels.modifications')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {modificationOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('modals.tradeIn.labels.location')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('modals.tradeIn.placeholders.locationExample')} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('modals.tradeIn.labels.additionalInfo')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('modals.tradeIn.placeholders.additionalInfoPlaceholder')}
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  {t('modals.tradeIn.actions.cancel')}
                </Button>
                <Button type="submit" disabled={isCalculating}>
                  {isCalculating ? t('modals.tradeIn.actions.calculating') : t('modals.tradeIn.actions.getEstimate')}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            {/* Estimate Results */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary">
                  <DollarSign className="h-5 w-5" />
                  {t('modals.tradeIn.results.estimatedValue')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatCurrency(estimate.estimatedValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('modals.tradeIn.results.range')}: {formatCurrency(estimate.lowRange)} - {formatCurrency(estimate.highRange)}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Badge variant={estimate.confidence === "high" ? "default" : "secondary"}>
                      {t('modals.tradeIn.results.confidence')}: {estimate.confidence}
                    </Badge>
                    
                    <div className="flex items-center gap-1">
                      {estimate.marketTrend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {estimate.marketTrend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                      {estimate.marketTrend === "stable" && <div className="h-2 w-2 bg-blue-600 rounded-full" />}
                      <span className="text-sm text-muted-foreground capitalize">
                        {t('modals.tradeIn.results.market')}: {estimate.marketTrend}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Factors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('modals.tradeIn.results.positiveFactors')} & {t('modals.tradeIn.results.negativeFactors')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {estimate.factors.positive.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {t('modals.tradeIn.results.positiveFactors')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {estimate.factors.positive.map((factor, index) => (
                          <li key={index} className="text-green-600">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {estimate.factors.negative.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {t('modals.tradeIn.results.negativeFactors')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {estimate.factors.negative.map((factor, index) => (
                          <li key={index} className="text-red-600">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('modals.tradeIn.results.recommendations')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    {estimate.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Info className="h-3 w-3 mt-0.5 flex-shrink-0 text-blue-600" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">{t('modals.tradeIn.results.disclaimer')}:</p>
                    <p className="text-xs">
                      {t('modals.tradeIn.results.disclaimerText')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={reset}>
                {t('modals.tradeIn.actions.calculateAnother')}
              </Button>
              <Button onClick={onClose}>
                {t('modals.tradeIn.actions.done')}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}