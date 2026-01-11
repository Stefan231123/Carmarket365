import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  DollarSign, 
  User, 
  Phone, 
  Mail, 
  Car, 
  CheckCircle,
  Building,
  Briefcase,
  Calendar,
  Shield
} from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

interface FinancingFormData {
  name: string;
  email: string;
  phone: string;
  loanAmount: string;
  annualIncome: string;
  creditScore: string;
  employmentStatus: string;
  yearsAtJob: string;
  monthlyExpenses: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images?: string[];
}

interface FinancingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FinancingModal({ car, isOpen, onClose }: FinancingModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FinancingFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      loanAmount: car ? car.price.toString() : "",
      annualIncome: "",
      creditScore: "",
      employmentStatus: "",
      yearsAtJob: "",
      monthlyExpenses: "",
    },
  });

  // Translated employment statuses
  const translatedEmploymentStatuses = [
    { value: "employed-full-time", label: "Employed Full-time" },
    { value: "employed-part-time", label: "Employed Part-time" },
    { value: "self-employed", label: "Self-employed" },
    { value: "retired", label: t('modals.financing.employmentStatus.retired') },
    { value: "student", label: t('modals.financing.employmentStatus.student') },
    { value: "unemployed", label: t('modals.financing.employmentStatus.unemployed') },
  ];

  if (!car) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCarImage = (car: Car) => {
    if (car.images && car.images.length > 0) {
      return car.images[0];
    }
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop";
  };

  const creditScoreRanges = [
    { value: "300-579", label: "300-579 (Poor)" },
    { value: "580-669", label: "580-669 (Fair)" },
    { value: "670-739", label: "670-739 (Good)" },
    { value: "740-799", label: "740-799 (Very Good)" },
    { value: "800-850", label: "800-850 (Excellent)" },
  ];

  const employmentStatuses = [
    { value: "employed-full-time", label: "Employed Full-time" },
    { value: "employed-part-time", label: "Employed Part-time" },
    { value: "self-employed", label: "Self-employed" },
    { value: "retired", label: "Retired" },
    { value: "student", label: "Student" },
    { value: "unemployed", label: "Unemployed" },
  ];

  const yearsAtJobOptions = [
    { value: "less-than-1", label: "Less than 1 year" },
    { value: "1-2", label: "1-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "6-10", label: "6-10 years" },
    { value: "more-than-10", label: "More than 10 years" },
  ];

  const onSubmit = async (data: FinancingFormData) => {
    setIsSubmitting(true);
    
    try {
      // For now, just console.log the data - backend integration will be added later
      console.log("Financing pre-approval application:", {
        car: {
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
        },
        application: data,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error("Failed to submit financing application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('modals.financing.title')}
          </DialogTitle>
          <DialogDescription>
            {t('modals.financing.description')}
          </DialogDescription>
        </DialogHeader>

        {/* Car Information */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-4">
          <div className="flex gap-4">
            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={getCarImage(car)}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-lg leading-tight">
                  {car.year} {car.make} {car.model}
                </h3>
                <Badge className="bg-primary text-primary-foreground text-xs">
                  {t('modals.financing.badges.financingAvailable')}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(car.price)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Estimated payment: <span className="font-medium">${Math.round(car.price * 0.015)}/month</span> based on 72 months at 6.5% APR
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
            <h3 className="font-semibold text-success mb-1">Pre-Approval Submitted!</h3>
            <p className="text-sm text-success/80 mb-3">
              Your pre-approval application has been submitted. You'll hear back from our financing partners within 24 hours.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-success/70">
              <Shield className="h-4 w-4" />
              <span>Your information is secure and protected</span>
            </div>
          </div>
        )}

        {/* Financing Form */}
        {!isSuccess && (
          <div className="space-y-6">
            {/* Financing Information */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Why Get Pre-Approved?
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Know your budget before you shop</li>
                <li>• Negotiate with confidence</li>
                <li>• Streamline the buying process</li>
                <li>• No impact to your credit score for pre-approval</li>
              </ul>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: t('forms.validation.nameRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('modals.financing.placeholders.enterFullName')}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: t('forms.validation.phoneRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={t('modals.financing.placeholders.enterPhone')}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: t('forms.validation.emailRequired'),
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: t('modals.financing.validation.validEmail'),
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t('auth.enterYourEmail')}
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Financial Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">{t('financing.financialInformation')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Loan Amount */}
                    <FormField
                      control={form.control}
                      name="loanAmount"
                      rules={{ required: t('forms.validation.loanAmountRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {t('financing.desiredLoanAmount')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={t('financing.enterLoanAmount')}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Annual Income */}
                    <FormField
                      control={form.control}
                      name="annualIncome"
                      rules={{ required: t('forms.validation.annualIncomeRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Annual Income
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={t('financing.enterAnnualIncome')}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Credit Score */}
                    <FormField
                      control={form.control}
                      name="creditScore"
                      rules={{ required: t('forms.validation.creditScoreRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Credit Score Estimate
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('financing.selectRange')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {creditScoreRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Monthly Expenses */}
                    <FormField
                      control={form.control}
                      name="monthlyExpenses"
                      rules={{ required: t('modals.financing.validation.monthlyExpensesRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Monthly Expenses
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={t('financing.enterMonthlyExpenses')}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Employment Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Employment Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Employment Status */}
                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      rules={{ required: t('forms.validation.employmentStatusRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Employment Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('financing.selectStatus')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {translatedEmploymentStatuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Years at Current Job */}
                    <FormField
                      control={form.control}
                      name="yearsAtJob"
                      rules={{ required: t('forms.validation.yearsAtJobRequired') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Years at Current Job
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('financing.selectDuration')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {yearsAtJobOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                  <p>
                    By submitting this form, you consent to receive communications from our financing partners. 
                    This pre-approval check will not impact your credit score. Final loan terms subject to 
                    full credit approval and vehicle inspection.
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Get Pre-Approved"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}