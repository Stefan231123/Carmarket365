import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Ear, Hand, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from '../hooks/useTranslation';

export default function Accessibility() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
{t('pages.accessibility.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
{t('pages.accessibility.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
{t('pages.accessibility.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Accessibility Overview */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
{t('pages.accessibility.commitmentTitle')}
              </CardTitle>
              <CardDescription>
{t('pages.accessibility.commitmentDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
{t('pages.accessibility.commitmentText')}
              </p>
            </CardContent>
          </Card>

          {/* Accessibility Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.accessibility.visual.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.accessibility.visual.features', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Hand className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.accessibility.motor.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.accessibility.motor.features', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Ear className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.accessibility.audio.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.accessibility.audio.features', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-primary" />
<CardTitle className="text-lg">{t('pages.accessibility.cognitive.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('pages.accessibility.cognitive.features', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Standards and Guidelines */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle>{t('pages.accessibility.standards.title')}</CardTitle>
              <CardDescription>
                {t('pages.accessibility.standards.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">{t('pages.accessibility.standards.wcagGuidelines')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('pages.accessibility.standards.wcagDescription')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{t('pages.accessibility.standards.platformCompatibility')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('pages.accessibility.standards.platformCompatibilityDescription')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card className="border-green-200 bg-green-50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-green-900 mb-2">{t('pages.accessibility.feedback.title')}</h3>
                <p className="text-sm text-green-700 mb-4">
                  {t('pages.accessibility.feedback.message')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleBackToHome} variant="outline" className="bg-white">
                    {t('pages.accessibility.feedback.returnToPlatform')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-green-700 text-white hover:bg-green-800"
                  >
                    {t('pages.accessibility.feedback.contactTeam')}
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