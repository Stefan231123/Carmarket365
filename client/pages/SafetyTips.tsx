import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Eye, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function SafetyTips() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-red-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('safetyTips.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('safetyTips.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('safetyTips.subtitle')}
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
                <Shield className="h-6 w-6 text-primary" />
                {t('safetyTips.mainTitle')}
              </CardTitle>
              <CardDescription>
                {t('safetyTips.mainDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('safetyTips.safetyOverview')}
              </p>
            </CardContent>
          </Card>

          {/* Safety Categories */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('safetyTips.meetingSafety.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('safetyTips.meetingSafety.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('safetyTips.paymentSecurity.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('safetyTips.paymentSecurity.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('safetyTips.vehicleInspection.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('safetyTips.vehicleInspection.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('safetyTips.redFlags.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('safetyTips.redFlags.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Essential Documentation */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle>{t('safetyTips.documentation.title')}</CardTitle>
              <CardDescription>
                {t('safetyTips.documentation.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">{t('safetyTips.documentation.forBuyers')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('safetyTips.documentation.buyerItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{t('safetyTips.documentation.forSellers')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('safetyTips.documentation.sellerItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-red-200 bg-red-50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-red-900 mb-2">{t('safetyTips.emergency.title')}</h3>
                <p className="text-sm text-red-700 mb-4">
                  {t('safetyTips.emergency.message')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleBackToHome} variant="outline" className="bg-white">
                    {t('safetyTips.emergency.browseCars')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-red-700 text-white hover:bg-red-800"
                  >
                    {t('safetyTips.emergency.reportConcern')}
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