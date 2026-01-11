import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Car,
  DollarSign,
  Users,
  ArrowLeft,
  HeadphonesIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('contact.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Overview Card */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
                {t('contact.mainTitle')}
              </CardTitle>
              <CardDescription>
                {t('contact.mainDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('contact.contactOverview')}
              </p>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('contact.phoneSupport.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">{t('contact.phoneSupport.salesDepartment')}</div>
                    <div className="text-muted-foreground">+49 (0) 30 123-CARS</div>
                  </div>
                  <div>
                    <div className="font-medium">{t('contact.phoneSupport.customerService')}</div>
                    <div className="text-muted-foreground">+49 (0) 30 123-HELP</div>
                  </div>
                  <div>
                    <div className="font-medium">{t('contact.phoneSupport.financingDepartment')}</div>
                    <div className="text-muted-foreground">+49 (0) 30 123-LOAN</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('contact.emailSupport.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">{t('contact.emailSupport.generalInquiries')}</div>
                    <div className="text-muted-foreground">info@carmarket365.com</div>
                  </div>
                  <div>
                    <div className="font-medium">{t('contact.emailSupport.salesQuestions')}</div>
                    <div className="text-muted-foreground">sales@carmarket365.com</div>
                  </div>
                  <div>
                    <div className="font-medium">{t('contact.emailSupport.support')}</div>
                    <div className="text-muted-foreground">support@carmarket365.com</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('contact.businessHours.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{t('contact.businessHours.mondayFriday')}</span>
                    <span className="text-muted-foreground">{t('contact.businessHours.timeRange.mondayFriday')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('contact.businessHours.saturday')}</span>
                    <span className="text-muted-foreground">{t('contact.businessHours.timeRange.saturday')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t('contact.businessHours.sunday')}</span>
                    <span className="text-muted-foreground">{t('contact.businessHours.timeRange.sunday')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('contact.officeLocation.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">{t('contact.officeLocation.address.street')}</div>
                    <div className="text-muted-foreground">{t('contact.officeLocation.address.city')}</div>
                    <div className="text-muted-foreground">{t('contact.officeLocation.address.country')}</div>
                  </div>
                  <Button variant="outline" className="w-full rounded-full">
                    {t('contact.officeLocation.getDirections')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                {t('contact.form.title')}
              </CardTitle>
              <CardDescription>
                {t('contact.form.subtitle')}
              </CardDescription>
            </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {t('contact.success.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.success.message')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('contact.form.inquiryType.label')} {t('contact.form.required')}
                      </label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.form.inquiryType.placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4" />
                              {t('contact.form.inquiryType.options.buying')}
                            </div>
                          </SelectItem>
                          <SelectItem value="selling">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              {t('contact.form.inquiryType.options.selling')}
                            </div>
                          </SelectItem>
                          <SelectItem value="financing">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              {t('contact.form.inquiryType.options.financing')}
                            </div>
                          </SelectItem>
                          <SelectItem value="dealer">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {t('contact.form.inquiryType.options.dealer')}
                            </div>
                          </SelectItem>
                          <SelectItem value="support">
                            <div className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              {t('contact.form.inquiryType.options.support')}
                            </div>
                          </SelectItem>
                          <SelectItem value="other">{t('contact.form.inquiryType.options.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          {t('contact.form.fields.fullName')} {t('contact.form.required')}
                        </label>
                        <Input
                          placeholder={t('contact.form.placeholders.name')}
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          {t('contact.form.fields.email')} {t('contact.form.required')}
                        </label>
                        <Input
                          type="email"
                          placeholder={t('contact.form.placeholders.email')}
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          {t('contact.form.fields.phone')}
                        </label>
                        <Input
                          type="tel"
                          placeholder={t('contact.form.placeholders.phone')}
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          {t('contact.form.fields.subject')} {t('contact.form.required')}
                        </label>
                        <Input
                          placeholder={t('contact.form.placeholders.subject')}
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {t('contact.form.fields.message')} {t('contact.form.required')}
                      </label>
                      <Textarea
                        placeholder={t('contact.form.placeholders.message')}
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-black text-white hover:bg-black/90 rounded-full h-12" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      {t('contact.form.submitButton')}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t('contact.form.disclaimer')}
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Quick Help Section */}
            <Card className="mb-8 border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('contact.quickHelp.title')}</CardTitle>
                <CardDescription>
                  {t('contact.quickHelp.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl">
                    <div className="text-left">
                      <div className="font-medium">{t('contact.quickHelp.options.buyingGuide.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact.quickHelp.options.buyingGuide.description')}</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl">
                    <div className="text-left">
                      <div className="font-medium">{t('contact.quickHelp.options.sellingGuide.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact.quickHelp.options.sellingGuide.description')}</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl" onClick={() => navigate('/faq')}>
                    <div className="text-left">
                      <div className="font-medium">{t('contact.quickHelp.options.faq.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact.quickHelp.options.faq.description')}</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl" onClick={() => navigate('/safety-tips')}>
                    <div className="text-left">
                      <div className="font-medium">{t('contact.quickHelp.options.safetyTips.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact.quickHelp.options.safetyTips.description')}</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Urgent Support */}
            <Card className="border-blue-200 bg-blue-50 rounded-2xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-blue-900 mb-2">{t('contact.urgentSupport.title')}</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    {t('contact.urgentSupport.message')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={handleBackToHome} variant="outline" className="bg-white rounded-full">
                      {t('contact.urgentSupport.browseCars')}
                    </Button>
                    <Button 
                      onClick={() => window.location.href = 'tel:+49-30-123-HELP'}
                      className="bg-blue-700 text-white hover:bg-blue-800 rounded-full"
                    >
                      {t('contact.urgentSupport.callNow')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
