import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Cookie, Settings, BarChart3, Target, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from '../hooks/useTranslation';

export default function CookiePolicy() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-orange-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
{t('pages.cookiePolicy.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('pages.cookiePolicy.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
{t('pages.cookiePolicy.subtitle')}
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
                <Cookie className="h-6 w-6 text-primary" />
                {t('pages.cookiePolicy.policyTitle')}
              </CardTitle>
              <CardDescription>
{t('pages.cookiePolicy.policyDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
{t('pages.cookiePolicy.policyText')}
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.cookiePolicy.essential.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.cookiePolicy.essential.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.cookiePolicy.functional.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.cookiePolicy.functional.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.cookiePolicy.analytics.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.cookiePolicy.analytics.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.cookiePolicy.marketing.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.cookiePolicy.marketing.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Cookie Management */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle>{t('pages.cookiePolicy.managingPreferences')}</CardTitle>
              <CardDescription>
                {t('pages.cookiePolicy.managingPreferencesDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    {t('pages.cookiePolicy.browserSettings')}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('pages.cookiePolicy.browserSettingsItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Cookie className="h-4 w-4" />
                    {t('pages.cookiePolicy.platformControls')}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('pages.cookiePolicy.platformControlsItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-orange-200 bg-orange-50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-orange-900 mb-2">{t('pages.cookiePolicy.questionsAboutCookies')}</h3>
                <p className="text-sm text-orange-700 mb-4">
                  {t('pages.cookiePolicy.questionsMessage')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleBackToHome} variant="outline" className="bg-white">
                    {t('pages.cookiePolicy.returnToPlatform')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-orange-700 text-white hover:bg-orange-800"
                  >
                    {t('pages.cookiePolicy.cookieSupport')}
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