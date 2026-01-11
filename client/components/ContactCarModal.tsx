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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, User, MessageCircle, Car, CheckCircle } from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image?: string;
  images?: string[];
  dealer?: string;
  isNew?: boolean;
  isCertified?: boolean;
}

interface ContactCarModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactCarModal({ car, isOpen, onClose }: ContactCarModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

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
    if (car.image) {
      return car.image;
    }
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop";
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!car) return;

    setIsSubmitting(true);
    
    try {
      // For now, just console.log the data - backend integration will be added later
      console.log("Contact form submission:", {
        car: {
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
        },
        contact: data,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    form.reset();
    onClose();
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            {t('modals.contactCar.title')}
          </DialogTitle>
          <DialogDescription>
            {t('modals.contactCar.description')}
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
                {car.isNew && (
                  <Badge variant="secondary" className="text-xs">
                    {t('modals.badges.new')}
                  </Badge>
                )}
                {car.isCertified && (
                  <Badge className="text-xs">
                    {t('modals.badges.certified')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(car.price)}
                </span>
                {car.dealer && (
                  <span className="text-sm text-muted-foreground">
                    {car.dealer}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800 mb-1">{t('modals.contactCar.successTitle')}</h3>
            <p className="text-sm text-green-600">
              {t('modals.contactCar.successDescription')}
            </p>
          </div>
        )}

        {/* Contact Form */}
        {!isSuccess && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: t('forms.validation.nameRequired') }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t('forms.labels.fullName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('forms.placeholders.enterFullName')}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: t('forms.validation.emailRequired'),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t('forms.validation.emailInvalid'),
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t('forms.labels.email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('forms.placeholders.enterEmail')}
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
                      {t('forms.labels.phone')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t('forms.placeholders.enterPhone')}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                rules={{ required: t('forms.validation.messageRequired') }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {t('forms.labels.message')}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('forms.placeholders.contactMessage')
                          .replace('{year}', car.year.toString())
                          .replace('{make}', car.make)
                          .replace('{model}', car.model)}
                        className="min-h-[100px] resize-none"
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
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? t('common.sending') : t('forms.actions.sendMessage')}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}