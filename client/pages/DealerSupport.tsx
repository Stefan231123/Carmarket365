import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, Phone, Mail, MessageSquare, Users, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function DealerSupport() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    // For now, this could open a contact modal or redirect to contact page
    console.log('Opening dealer support contact...');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-green-600/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('dealerSupport.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('dealerSupport.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('dealerSupport.subtitle')}
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
                <Building2 className="h-6 w-6 text-primary" />
                {t('dealerSupport.supportCenter')}
              </CardTitle>
              <CardDescription>
                {t('dealerSupport.supportCenterDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('hardcodedFixes.dealerSupport.supportCenterText')}
              </p>
            </CardContent>
          </Card>

          {/* Support Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('hardcodedFixes.dealerSupport.dashboardSupport.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {t('hardcodedFixes.dealerSupport.dashboardSupport.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('hardcodedFixes.dealerSupport.customerRelations.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {t('hardcodedFixes.dealerSupport.customerRelations.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('hardcodedFixes.dealerSupport.performanceOptimization.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {t('hardcodedFixes.dealerSupport.performanceOptimization.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('hardcodedFixes.dealerSupport.technicalSupport.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {t('hardcodedFixes.dealerSupport.technicalSupport.items').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started Guide */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle>{t('hardcodedFixes.dealerSupport.gettingStarted.title')}</CardTitle>
              <CardDescription>
                {t('hardcodedFixes.dealerSupport.gettingStarted.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {t('hardcodedFixes.dealerSupport.gettingStarted.accountSetup.title')}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t('hardcodedFixes.dealerSupport.gettingStarted.accountSetup.items').map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    {t('hardcodedFixes.dealerSupport.gettingStarted.inventoryManagement.title')}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t('hardcodedFixes.dealerSupport.gettingStarted.inventoryManagement.items').map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    {t('hardcodedFixes.dealerSupport.gettingStarted.performanceTracking.title')}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t('hardcodedFixes.dealerSupport.gettingStarted.performanceTracking.items').map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="border-green-200 bg-green-50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-green-900 mb-2">{t('hardcodedFixes.dealerSupport.helpSection.title')}</h3>
                <p className="text-sm text-green-700 mb-4">
                  {t('hardcodedFixes.dealerSupport.helpSection.message')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleBackToHome} variant="outline" className="bg-white">
                    {t('hardcodedFixes.dealerSupport.helpSection.returnToPlatform')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/dealer-dashboard'}
                    className="bg-green-700 text-white hover:bg-green-800"
                  >
                    {t('hardcodedFixes.dealerSupport.helpSection.goToDealerDashboard')}
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