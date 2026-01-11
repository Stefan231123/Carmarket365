import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Shield, 
  Heart,
  Car,
  Globe,
  Calendar,
  Linkedin,
  Mail
} from "lucide-react";

const getStats = (t: any) => [
  { label: t('about.stats.carsSold'), value: "50,000+", icon: Car },
  { label: t('about.stats.happyCustomers'), value: "45,000+", icon: Users },
  { label: t('about.stats.dealerPartners'), value: "500+", icon: Globe },
  { label: t('about.stats.yearsInBusiness'), value: "15+", icon: Calendar }
];

const getValues = (t: any) => [
  {
    icon: Shield,
    title: t('about.values.trustTransparency'),
    description: t('about.values.trustTransparencyDesc')
  },
  {
    icon: Heart,
    title: t('about.values.customerFirst'),
    description: t('about.values.customerFirstDesc')
  },
  {
    icon: Target,
    title: t('about.values.qualityAssurance'),
    description: t('about.values.qualityAssuranceDesc')
  },
  {
    icon: TrendingUp,
    title: t('about.values.innovation'),
    description: t('about.values.innovationDesc')
  }
];

// Team data now comes from translations

// Milestones data now comes from translations

export default function About() {
  const { t } = useTranslation();
  const stats = getStats(t);
  const values = getValues(t);
  const team = (t('about') as any).team.teamMembers;
  const milestones = (t('about') as any).milestones;
  const awards = (t('about') as any).awards;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-car-blue/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('about.content.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('about.content.heroSubtitle')}
          </p>
          <Button size="lg" className="mr-4">
            {t('about.content.joinTeam')}
          </Button>
          <Button variant="outline" size="lg">
            {t('about.content.contactUs')}
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('about.content.missionTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('about.content.missionContent')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.content.missionDescription')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('about.content.visionTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('about.content.visionContent')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.content.visionDescription')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.content.valuesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.content.valuesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.content.teamTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.content.teamDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member: any, index: number) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="relative mb-4">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4 mr-2" />
                    {t('about.content.connect')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.content.journeyTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.content.journeyDescription')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone: any, index: number) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.content.awardsTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('about.content.awardsDescription')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award: any, index: number) => {
              const iconColors = [
                { bg: 'bg-yellow-100', text: 'text-yellow-600', Icon: Award },
                { bg: 'bg-blue-100', text: 'text-blue-600', Icon: TrendingUp },
                { bg: 'bg-green-100', text: 'text-green-600', Icon: Users }
              ];
              const iconStyle = iconColors[index % iconColors.length];
              const Icon = iconStyle.Icon;
              
              return (
                <div key={index} className="text-center">
                  <div className={`${iconStyle.bg} rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 ${iconStyle.text}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.organization} {award.year}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('about.content.ctaTitle')}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t('about.content.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Car className="h-5 w-5 mr-2" />
              {t('about.content.browseCars')}
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              {t('about.content.contactUs')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
