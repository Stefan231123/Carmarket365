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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Car, 
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

interface TestDriveFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  specialRequests: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images?: string[];
  dealer?: {
    name: string;
  };
}

interface ScheduleTestDriveModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleTestDriveModal({ car, isOpen, onClose }: ScheduleTestDriveModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TestDriveFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      specialRequests: "",
    },
  });

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

  // Generate available dates (next 30 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays
      if (date.getDay() !== 0) {
        const dateStr = date.toISOString().split('T')[0];
        const displayDate = date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
        dates.push({ value: dateStr, label: displayDate });
      }
    }
    
    return dates;
  };

  // Available time slots
  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ];

  const onSubmit = async (data: TestDriveFormData) => {
    setIsSubmitting(true);
    
    try {
      // For now, just console.log the data - backend integration will be added later
      console.log("Test drive scheduling:", {
        car: {
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
        },
        appointment: data,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
        onClose();
      }, 2500);
      
    } catch (error) {
      console.error("Failed to schedule test drive:", error);
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
            <Calendar className="h-5 w-5" />
            {t('modals.scheduleTestDrive.title')}
          </DialogTitle>
          <DialogDescription>
            {t('modals.scheduleTestDrive.description')}
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
                <Badge className="bg-success text-success-foreground text-xs">
                  {t('modals.scheduleTestDrive.badge')}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(car.price)}
                </span>
                {car.dealer && (
                  <span className="text-sm text-muted-foreground">
                    {car.dealer.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
            <h3 className="font-semibold text-success mb-1">{t('modals.scheduleTestDrive.success.title')}</h3>
            <p className="text-sm text-success/80">
              {t('modals.scheduleTestDrive.success.description')}
            </p>
          </div>
        )}

        {/* Scheduling Form */}
        {!isSuccess && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        {t('modals.scheduleTestDrive.labels.fullName')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('modals.scheduleTestDrive.placeholders.fullName')}
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
                        {t('modals.scheduleTestDrive.labels.phone')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={t('modals.scheduleTestDrive.placeholders.phone')}
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
                    message: t('modals.scheduleTestDrive.validation.emailInvalid'),
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t('modals.scheduleTestDrive.labels.email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('modals.scheduleTestDrive.placeholders.email')}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Preferred Date */}
                <FormField
                  control={form.control}
                  name="preferredDate"
                  rules={{ required: t('modals.scheduleTestDrive.validation.dateRequired') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t('modals.scheduleTestDrive.labels.preferredDate')}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('modals.scheduleTestDrive.placeholders.selectDate')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getAvailableDates().map((date) => (
                            <SelectItem key={date.value} value={date.value}>
                              {date.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Time */}
                <FormField
                  control={form.control}
                  name="preferredTime"
                  rules={{ required: t('modals.scheduleTestDrive.validation.timeRequired') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t('modals.scheduleTestDrive.labels.preferredTime')}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('modals.scheduleTestDrive.placeholders.selectTime')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Special Requests */}
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {t('modals.scheduleTestDrive.labels.specialRequests')}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('modals.scheduleTestDrive.placeholders.specialRequests')}
                        className="min-h-[80px] resize-none"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {t('modals.scheduleTestDrive.actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? t('modals.scheduleTestDrive.actions.scheduling') : t('modals.scheduleTestDrive.actions.schedule')}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}