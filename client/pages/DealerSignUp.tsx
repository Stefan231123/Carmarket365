import React, { useState } from 'react';
import { ArrowLeft, Building2, User, MapPin, Eye, EyeOff, FileText, Shield, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

interface DealerFormData {
  // Business Information
  businessName: string;
  businessType: string;
  vatNumber: string;
  taxId: string;
  yearEstablished: string;
  businessDescription: string;
  
  // Contact Person
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
  
  // Address
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Account
  password: string;
  confirmPassword: string;
  
  // Agreements
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
}

interface DealerSignUpProps {
  onBackToSignIn?: () => void;
  onSignUpSuccess?: () => void;
}

export default function DealerSignUp({ onBackToSignIn, onSignUpSuccess }: DealerSignUpProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DealerFormData>({
    // Business Information
    businessName: '',
    businessType: '',
    vatNumber: '',
    taxId: '',
    yearEstablished: '',
    businessDescription: '',
    
    // Contact Person
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    
    // Address
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Account
    password: '',
    confirmPassword: '',
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.businessName) newErrors.businessName = t('auth.businessNameRequired');
    if (!formData.businessType) newErrors.businessType = t('auth.businessTypeRequired');
    if (!formData.vatNumber) newErrors.vatNumber = t('auth.vatNumberRequired');
    if (!formData.firstName) newErrors.firstName = t('auth.firstNameRequired');
    if (!formData.lastName) newErrors.lastName = t('auth.lastNameRequired');
    if (!formData.email) newErrors.email = t('auth.emailRequired');
    if (!formData.phone) newErrors.phone = t('auth.phoneRequired');
    if (!formData.street) newErrors.street = t('auth.streetRequired');
    if (!formData.city) newErrors.city = t('auth.cityRequired');
    if (!formData.postalCode) newErrors.postalCode = t('auth.postalCodeRequired');
    if (!formData.password) newErrors.password = t('auth.passwordRequired');
    if (!formData.confirmPassword) newErrors.confirmPassword = t('auth.confirmPasswordRequired');

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.validEmailRequired');
    }

    // VAT number validation (basic format check)
    if (formData.vatNumber && !/^[A-Z]{2}[0-9A-Z]{2,12}$/.test(formData.vatNumber)) {
      newErrors.vatNumber = t('auth.validVatNumber');
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = t('auth.passwordMinEightChars');
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsNotMatch');
    }

    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = t('auth.acceptTermsRequired');
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = t('auth.acceptPrivacyRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle dealer registration logic here
      console.log("Dealer registration:", formData);
      // Navigate to dealer dashboard after successful registration
      navigate('/dealer-dashboard');
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/signin')} className="rounded-full px-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('auth.backToSignIn')}
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl">{t('auth.dealerRegistration')}</h1>
                <p className="text-sm text-muted-foreground">{t('auth.joinCarMarketDealer')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t('auth.businessInformation')}
                </CardTitle>
                <CardDescription>
                  {t('auth.tellUsAboutBusiness')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.businessName')} *</label>
                    <Input
                      placeholder={t('auth.businessNamePlaceholder')}
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.businessName && (
                      <p className="text-sm text-destructive mt-1">{errors.businessName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.businessType')} *</label>
                    <Select onValueChange={(value) => updateFormData('businessType', value)}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('auth.selectBusinessType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dealership">{t('auth.carDealership')}</SelectItem>
                        <SelectItem value="used-car-lot">{t('auth.usedCarLot')}</SelectItem>
                        <SelectItem value="auto-trader">{t('auth.autoTrader')}</SelectItem>
                        <SelectItem value="broker">{t('auth.carBroker')}</SelectItem>
                        <SelectItem value="rental">{t('auth.rentalCompany')}</SelectItem>
                        <SelectItem value="other">{t('auth.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <p className="text-sm text-destructive mt-1">{errors.businessType}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.vatNumber')} *</label>
                    <Input
                      placeholder={t('auth.vatNumberPlaceholder')}
                      value={formData.vatNumber}
                      onChange={(e) => updateFormData('vatNumber', e.target.value.toUpperCase())}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.vatNumber && (
                      <p className="text-sm text-destructive mt-1">{errors.vatNumber}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.taxId')}</label>
                    <Input
                      placeholder={t('auth.optional')}
                      value={formData.taxId}
                      onChange={(e) => updateFormData('taxId', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.yearEstablished')}</label>
                    <Select onValueChange={(value) => updateFormData('yearEstablished', value)}>
                      <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                        <SelectValue placeholder={t('auth.selectYear')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 50 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('auth.businessDescription')}</label>
                  <Textarea
                    placeholder={t('auth.businessDescriptionPlaceholder')}
                    rows={3}
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData('businessDescription', e.target.value)}
                    className="bg-zinc-100 rounded-2xl border-none focus-visible:ring-0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Person */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('auth.contactPerson')}
                </CardTitle>
                <CardDescription>
                  {t('auth.primaryContactInfo')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.firstName')} *</label>
                    <Input
                      placeholder={t('finalFixes.dealerSignUp.firstNamePlaceholder')}
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.lastName')} *</label>
                    <Input
                      placeholder={t('finalFixes.dealerSignUp.lastNamePlaceholder')}
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.position')}</label>
                    <Input
                      placeholder={t('auth.positionPlaceholder')}
                      value={formData.position}
                      onChange={(e) => updateFormData('position', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.phoneNumber')} *</label>
                    <Input
                      placeholder="+49 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('auth.businessEmail')} *</label>
                  <Input
                    type="email"
                    placeholder={t('auth.businessEmailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Address */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t('auth.businessAddress')}
                </CardTitle>
                <CardDescription>
                  {t('auth.dealershipLocation')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('auth.streetAddress')} *</label>
                  <Input
                    placeholder={t('auth.streetAddressPlaceholder')}
                    value={formData.street}
                    onChange={(e) => updateFormData('street', e.target.value)}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                  {errors.street && (
                    <p className="text-sm text-destructive mt-1">{errors.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.city')} *</label>
                    <Input
                      placeholder={t('auth.cityPlaceholder')}
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.stateRegion')}</label>
                    <Input
                      placeholder={t('auth.stateRegionPlaceholder')}
                      value={formData.state}
                      onChange={(e) => updateFormData('state', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.postalCode')} *</label>
                    <Input
                      placeholder={t('auth.postalCodePlaceholder')}
                      value={formData.postalCode}
                      onChange={(e) => updateFormData('postalCode', e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                    {errors.postalCode && (
                      <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">{t('auth.country')}</label>
                  <Select onValueChange={(value) => updateFormData('country', value)}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('auth.selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DE">{t('auth.germany')}</SelectItem>
                      <SelectItem value="AT">{t('auth.austria')}</SelectItem>
                      <SelectItem value="CH">{t('auth.switzerland')}</SelectItem>
                      <SelectItem value="NL">{t('auth.netherlands')}</SelectItem>
                      <SelectItem value="BE">{t('auth.belgium')}</SelectItem>
                      <SelectItem value="FR">{t('auth.france')}</SelectItem>
                      <SelectItem value="IT">{t('auth.italy')}</SelectItem>
                      <SelectItem value="ES">{t('auth.spain')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Account Setup */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('auth.accountSetup')}
                </CardTitle>
                <CardDescription>
                  {t('auth.createSecureDealerAccount')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.password')} *</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t('auth.createStrongPassword')}
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 rounded-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">{t('auth.confirmPassword')} *</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t('auth.confirmYourPassword')}
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 rounded-full"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('auth.termsAndAgreements')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData('termsAccepted', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('auth.acceptTermsConditions')} *
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {t('auth.agreeToTermsAndDealer')}
                    </p>
                    {errors.termsAccepted && (
                      <p className="text-sm text-destructive">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => updateFormData('privacyAccepted', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('auth.acceptPrivacyPolicy')} *
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {t('auth.understandDataCollection')}
                    </p>
                    {errors.privacyAccepted && (
                      <p className="text-sm text-destructive">{errors.privacyAccepted}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketingAccepted}
                    onCheckedChange={(checked) => updateFormData('marketingAccepted', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="marketing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('auth.receiveMarketingCommunications')}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {t('auth.getUpdatesFeatures')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center">
              <Button type="submit" className="w-full sm:w-auto bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                {t('auth.createDealerAccount')}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto border-zinc-100 rounded-full px-6 h-12"
                onClick={() => navigate('/signin')}
              >
{t('auth.alreadyHaveAccount')} {t('auth.signIn')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
