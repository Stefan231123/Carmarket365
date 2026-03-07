import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, User, MessageCircle, Car, CheckCircle, MapPin } from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';
import { apiClient } from '@shared/api-client';
import { trackEvent } from '@/components/Analytics';

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
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCarImage = (car: Car) => {
    if (car.images && car.images.length > 0) return car.images[0];
    if (car.image) return car.image;
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop";
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!car) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const captchaToken = executeRecaptcha ? await executeRecaptcha('inquiry') : undefined;
      await apiClient.createCarInquiry({
        carId: car.id,
        inquiryType: 'GENERAL',
        message: data.message,
        inquirerName: data.name,
        inquirerEmail: data.email,
        inquirerPhone: data.phone || undefined,
      }, captchaToken);
      setIsSuccess(true);
      trackEvent('generate_lead', { car_id: car.id, inquiry_type: 'GENERAL' });
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setSubmitError(t('forms.errors.sendFailed') || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setSubmitError(null);
    form.reset();
    onClose();
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-white rounded-2xl border-0 shadow-2xl">

        {/* Header */}
        <div className="bg-zinc-900 px-6 pt-6 pb-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white text-base font-semibold">
              <Car className="h-4 w-4" />
              {t('modals.contactCar.title')}
            </DialogTitle>
            <p className="text-zinc-400 text-sm mt-0.5">{t('modals.contactCar.description')}</p>
          </DialogHeader>

          {/* Car info inside header */}
          <div className="flex gap-3 mt-4 bg-white/10 rounded-xl p-3">
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-700">
              <img
                src={getCarImage(car)}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm leading-tight">
                  {car.year} {car.make} {car.model}
                </span>
                {car.isNew && (
                  <Badge className="text-[10px] bg-emerald-500 text-white border-0 px-1.5 py-0">
                    {t('modals.badges.new')}
                  </Badge>
                )}
                {car.isCertified && (
                  <Badge className="text-[10px] bg-blue-500 text-white border-0 px-1.5 py-0">
                    {t('modals.badges.certified')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white font-bold text-lg">{formatPrice(car.price)}</span>
                {car.dealer && (
                  <span className="text-zinc-400 text-xs flex items-center gap-1">
                    <MapPin className="h-3 w-3" />{car.dealer}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 bg-white">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">{t('modals.contactCar.successTitle')}</h3>
              <p className="text-sm text-gray-500">{t('modals.contactCar.successDescription')}</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                <div className="grid grid-cols-2 gap-3">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: t('forms.validation.nameRequired') }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder={t('forms.labels.fullName')}
                              className="pl-9 h-11 bg-gray-50 border-gray-200 rounded-xl text-sm focus:bg-white"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
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
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="tel"
                              placeholder={t('forms.labels.phone')}
                              className="pl-9 h-11 bg-gray-50 border-gray-200 rounded-xl text-sm focus:bg-white"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
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
                    pattern: { value: /\S+@\S+\.\S+/, message: t('forms.validation.emailInvalid') },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder={t('forms.labels.email')}
                            className="pl-9 h-11 bg-gray-50 border-gray-200 rounded-xl text-sm focus:bg-white"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
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
                      <FormControl>
                        <div className="relative">
                          <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea
                            placeholder={t('forms.placeholders.contactMessage')
                              .replace('{year}', car.year.toString())
                              .replace('{make}', car.make)
                              .replace('{model}', car.model)}
                            className="pl-9 min-h-[90px] resize-none bg-gray-50 border-gray-200 rounded-xl text-sm focus:bg-white"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Error */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                    {submitError}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 h-11 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium"
                  >
                    {isSubmitting ? t('common.sending') : t('forms.actions.sendMessage')}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
