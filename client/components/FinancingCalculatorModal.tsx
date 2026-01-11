import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Percent, 
  TrendingUp,
  Info,
  Car
} from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

interface FinancingCalculatorModalProps {
  carPrice: number;
  carMake?: string;
  carModel?: string;
  carYear?: number;
  isOpen: boolean;
  onClose: () => void;
}

interface CalculatorFormData {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  loanTerm: number;
  interestRate: number;
  salesTax: number;
  fees: number;
}

interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayments: number;
  totalCost: number;
}

export function FinancingCalculatorModal({ 
  carPrice, 
  carMake = "", 
  carModel = "", 
  carYear,
  isOpen, 
  onClose 
}: FinancingCalculatorModalProps) {
  const { t } = useTranslation();
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const form = useForm<CalculatorFormData>({
    defaultValues: {
      vehiclePrice: carPrice,
      downPayment: Math.round(carPrice * 0.2), // 20% down payment
      tradeInValue: 0,
      loanTerm: 60, // 5 years
      interestRate: 6.5,
      salesTax: 8.5,
      fees: 500
    }
  });

  const watchedValues = form.watch();

  const calculateFinancing = (data: CalculatorFormData): CalculationResult => {
    const { vehiclePrice, downPayment, tradeInValue, loanTerm, interestRate, salesTax, fees } = data;
    
    // Calculate tax on vehicle price
    const taxAmount = (vehiclePrice * salesTax) / 100;
    
    // Total amount before financing
    const totalVehicleCost = vehiclePrice + taxAmount + fees;
    
    // Loan amount after down payment and trade-in
    const loanAmount = totalVehicleCost - downPayment - tradeInValue;
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Number of payments
    const numPayments = loanTerm;
    
    // Calculate monthly payment using loan formula
    const monthlyPayment = loanAmount > 0 
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;
    
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - loanAmount;
    const totalCost = downPayment + tradeInValue + totalPayments;
    
    return {
      loanAmount: Math.max(0, loanAmount),
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalInterest: Math.max(0, totalInterest),
      totalPayments,
      totalCost
    };
  };

  useEffect(() => {
    const calculation = calculateFinancing(watchedValues);
    setResult(calculation);
  }, [watchedValues]);

  useEffect(() => {
    if (carPrice) {
      form.setValue('vehiclePrice', carPrice);
      form.setValue('downPayment', Math.round(carPrice * 0.2));
    }
  }, [carPrice, form]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const downPaymentPercentage = watchedValues.vehiclePrice > 0 
    ? (watchedValues.downPayment / watchedValues.vehiclePrice * 100).toFixed(1)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {t('advancedFeatures.financingCalculator.title')}
            {carMake && carModel && (
              <Badge variant="outline" className="ml-2">
                {carYear} {carMake} {carModel}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  {t('advancedFeatures.financingCalculator.sections.vehicleDetails')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="vehiclePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('advancedFeatures.financingCalculator.fields.vehiclePrice')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="text-lg font-semibold"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('advancedFeatures.financingCalculator.fields.salesTax')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('advancedFeatures.financingCalculator.labels.feesDescription')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  {t('advancedFeatures.financingCalculator.sections.paymentDetails')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="downPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('advancedFeatures.financingCalculator.fields.downPayment')} ({downPaymentPercentage}%)
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="text-lg font-semibold"
                          />
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={watchedValues.vehiclePrice * 0.5}
                            step={1000}
                            className="py-2"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tradeInValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('advancedFeatures.financingCalculator.fields.tradeInValue')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  {t('advancedFeatures.financingCalculator.sections.loanTerms')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="loanTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('advancedFeatures.financingCalculator.fields.loanTerm')} ({field.value} {t('advancedFeatures.financingCalculator.labels.months')})</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={12}
                            max={84}
                            step={12}
                            className="py-2"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{t('advancedFeatures.financingCalculator.labels.oneYear')}</span>
                            <span>{t('advancedFeatures.financingCalculator.labels.sevenYears')}</span>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('advancedFeatures.financingCalculator.fields.interestRate')} ({t('advancedFeatures.financingCalculator.labels.aprPercent')})</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            min={0.1}
                            max={15}
                            step={0.1}
                            className="py-2"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <>
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-primary">
                      <TrendingUp className="h-5 w-5" />
                      {t('advancedFeatures.financingCalculator.sections.monthlyPayment')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {formatCurrency(result.monthlyPayment)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('advancedFeatures.financingCalculator.labels.forMonths')} {watchedValues.loanTerm} {t('advancedFeatures.financingCalculator.labels.months')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('advancedFeatures.financingCalculator.sections.loanSummary')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('advancedFeatures.financingCalculator.labels.loanAmount')}</p>
                        <p className="text-lg font-semibold">{formatCurrency(result.loanAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('advancedFeatures.financingCalculator.labels.totalInterest')}</p>
                        <p className="text-lg font-semibold text-orange-600">
                          {formatCurrency(result.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{t('advancedFeatures.financingCalculator.fields.vehiclePrice')}</span>
                        <span className="font-medium">{formatCurrency(watchedValues.vehiclePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{t('advancedFeatures.financingCalculator.labels.salesTax')}</span>
                        <span className="font-medium">
                          {formatCurrency(watchedValues.vehiclePrice * watchedValues.salesTax / 100)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{t('advancedFeatures.financingCalculator.fields.fees')}</span>
                        <span className="font-medium">{formatCurrency(watchedValues.fees)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{t('advancedFeatures.financingCalculator.labels.downPayment')}</span>
                        <span className="font-medium text-green-600">
                          -{formatCurrency(watchedValues.downPayment)}
                        </span>
                      </div>
                      {watchedValues.tradeInValue > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t('advancedFeatures.financingCalculator.fields.tradeInValue')}</span>
                          <span className="font-medium text-green-600">
                            -{formatCurrency(watchedValues.tradeInValue)}
                          </span>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold text-lg">
                        <span>{t('advancedFeatures.financingCalculator.labels.totalCost')}</span>
                        <span>{formatCurrency(result.totalCost)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">{t('advancedFeatures.financingCalculator.notes.title')}:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• {t('advancedFeatures.financingCalculator.notes.estimate')}</li>
                          <li>• {t('advancedFeatures.financingCalculator.notes.ratesSubject')}</li>
                          <li>• {t('advancedFeatures.financingCalculator.notes.additionalFees')}</li>
                          <li>• {t('advancedFeatures.financingCalculator.notes.considerPreApproval')}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}