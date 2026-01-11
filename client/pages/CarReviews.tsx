import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, Calendar, User, ThumbsUp, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function CarReviews() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-yellow-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('carReviews.backToHome')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('carReviews.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('carReviews.subtitle')}
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
                <Star className="h-6 w-6 text-primary" />
                {t('carReviews.overviewTitle')}
              </CardTitle>
              <CardDescription>
                {t('carReviews.overviewDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('carReviews.overviewText')}
              </p>
            </CardContent>
          </Card>

          {/* Review Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('carReviews.expertReviews.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('carReviews.expertReviews.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('carReviews.ownerReviews.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('carReviews.ownerReviews.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('carReviews.ratingSystem.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('carReviews.ratingSystem.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t('carReviews.marketInsights.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {(t('carReviews.marketInsights.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Review Categories */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle>{t('carReviews.categoriesTitle')}</CardTitle>
              <CardDescription>
                {t('carReviews.categoriesDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">{t('carReviews.performance.title')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('carReviews.performance.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{t('carReviews.comfort.title')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('carReviews.comfort.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{t('carReviews.safety.title')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('carReviews.safety.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon Notice */}
          <Card className="border-yellow-200 bg-yellow-50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-yellow-900 mb-2">{t('carReviews.comingSoonTitle')}</h3>
                <p className="text-sm text-yellow-700 mb-4">
                  {t('carReviews.comingSoonText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleBackToHome} variant="outline" className="bg-white">
                    {t('carReviews.browseCars')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/cars'}
                    className="bg-yellow-700 text-white hover:bg-yellow-800"
                  >
                    {t('carReviews.exploreInventory')}
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