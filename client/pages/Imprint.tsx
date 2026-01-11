import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, MapPin, Phone, Mail, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from '../hooks/useTranslation';

export default function Imprint() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('pages.imprint.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('pages.imprint.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('pages.imprint.subtitle')}
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
                <Building className="h-6 w-6 text-primary" />
                {t('pages.imprint.legalInfoTitle')}
              </CardTitle>
              <CardDescription>
                {t('pages.imprint.legalInfoDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('pages.imprint.legalInfoText')}
              </p>
            </CardContent>
          </Card>

          {/* Company Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('pages.imprint.companyDetails.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{t('pages.imprint.companyDetails.companyName')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.companyDetails.companyNameValue')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('pages.imprint.companyDetails.registrationNumber')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.companyDetails.registrationNumberValue')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('pages.imprint.companyDetails.vatId')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.companyDetails.vatIdValue')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('pages.imprint.companyDetails.commercialRegister')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.companyDetails.commercialRegisterValue')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('pages.imprint.businessAddress.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{t('pages.imprint.businessAddress.registeredAddress')}</p>
                    <div className="text-muted-foreground">
                      <p>{t('pages.imprint.businessAddress.addressLine1')}</p>
                      <p>{t('pages.imprint.businessAddress.addressLine2')}</p>
                      <p>{t('pages.imprint.businessAddress.addressLine3')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('pages.imprint.management.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{t('pages.imprint.management.managingDirector')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.management.managingDirectorValue')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('pages.imprint.management.authorizedRepresentative')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.management.authorizedRepresentativeValue')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('pages.imprint.contactInfo.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{t('pages.imprint.contactInfo.phone')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.contactInfo.phoneValue')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('pages.imprint.contactInfo.email')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.contactInfo.emailValue')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('pages.imprint.contactInfo.businessHours')}</p>
                    <p className="text-muted-foreground">{t('pages.imprint.contactInfo.businessHoursValue')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legal Notice */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                {t('pages.imprint.legalNotice.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  {t('pages.imprint.legalNotice.paragraph1')}
                </p>
                <p>
                  {t('pages.imprint.legalNotice.paragraph2')}
                </p>
                <p>
                  {t('pages.imprint.legalNotice.paragraph3')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-purple-200 bg-purple-50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-purple-900 mb-2">{t('pages.imprint.questionsTitle')}</h3>
                <p className="text-sm text-purple-700 mb-4">
                  {t('pages.imprint.questionsText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleBackToHome} variant="outline" className="bg-white">
                    {t('pages.imprint.returnToPlatform')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-purple-700 text-white hover:bg-purple-800"
                  >
                    {t('pages.imprint.contactLegal')}
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