import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Car, 
  DollarSign, 
  Shield, 
  Users, 
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBackToHome = () => {
    navigate('/');
  };

  // Fallback FAQ categories in case translation fails
  const fallbackFaqCategories = [
    {
      id: 'buying',
      name: 'Buying Cars',
      icon: 'Car',
      color: 'bg-blue-100 text-blue-600',
      faqs: [
        {
          question: 'How do I buy a car on CarMarket365?',
          answer: 'To buy a car, start by searching for vehicles using our detailed filters. When you find a car you like, contact the seller directly through our platform.'
        }
      ]
    },
    {
      id: 'selling',
      name: 'Selling Cars',
      icon: 'DollarSign',
      color: 'bg-green-100 text-green-600',
      faqs: [
        {
          question: 'How much does it cost to sell a car?',
          answer: 'Basic listing is free for private sellers. We also offer premium options with additional features.'
        }
      ]
    },
    {
      id: 'safety',
      name: 'Safety & Security',
      icon: 'Shield',
      color: 'bg-red-100 text-red-600',
      faqs: [
        {
          question: 'How do I stay safe when buying a car?',
          answer: 'Meet in public places, bring someone with you, verify seller identity, and use secure payment methods.'
        }
      ]
    }
  ];

  // Get translated FAQ categories with error handling
  const translatedFaqCategories = t('pages.faq.faqCategories') as any[];
  
  // Icon mapping for the categories
  const iconMap: Record<string, any> = {
    'Car': Car,
    'DollarSign': DollarSign,
    'Shield': Shield,
    'Users': Users
  };

  // Use translated categories if available, otherwise use fallback
  const rawCategories = Array.isArray(translatedFaqCategories) && translatedFaqCategories.length > 0 
    ? translatedFaqCategories 
    : fallbackFaqCategories;

  // Map the categories with proper icons
  const faqCategories = rawCategories.map(category => ({
    ...category,
    icon: iconMap[category.icon] || Car
  }));

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter((faq: any) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    selectedCategory ? category.id === selectedCategory : true
  ).filter(category => 
    searchQuery ? category.faqs.length > 0 : true
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('faq.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('faq.subtitle')}
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('faq.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 bg-white/50 rounded-full border-none focus-visible:ring-0 pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter Card */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-primary" />
                {t('pages.faq.content.browseByCategory')}
              </CardTitle>
              <CardDescription>
                {t('pages.faq.content.browseDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full ${
                    selectedCategory === null 
                      ? 'bg-black text-white hover:bg-black/90' 
                      : ''
                  }`}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {t('pages.faq.content.allQuestions')}
                </Button>
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`rounded-full ${
                        selectedCategory === category.id 
                          ? 'bg-black text-white hover:bg-black/90' 
                          : ''
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Sections */}
          {filteredFAQs.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="mb-8 border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {category.name}
                    <Badge variant="secondary" className="rounded-full">{category.faqs.length}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {t('pages.faq.content.commonQuestionsAbout')} {category.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq: any, index: number) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline hover:text-foreground font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}

          {/* No Results */}
          {searchQuery && filteredFAQs.every(cat => cat.faqs.length === 0) && (
            <Card className="mb-8 border-zinc-100 rounded-2xl">
              <CardContent className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('pages.faq.content.noResultsFound')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('pages.faq.content.noResultsText')}
                </p>
                <Button onClick={() => setSearchQuery("")} className="bg-black text-white hover:bg-black/90 rounded-full px-6">
                  {t('pages.faq.content.clearSearch')}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Still Need Help */}
          <Card className="mb-8 border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle>{t('pages.faq.content.stillNeedHelp')}</CardTitle>
              <CardDescription>
                {t('pages.faq.content.stillNeedHelpDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{t('pages.faq.content.callSupport')}</div>
                      <div className="text-sm text-muted-foreground">{t('pages.faq.content.supportPhoneNumber')}</div>
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{t('pages.faq.content.emailUs')}</div>
                      <div className="text-sm text-muted-foreground">{t('pages.faq.content.supportEmail')}</div>
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start rounded-2xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{t('pages.faq.content.liveChat')}</div>
                      <div className="text-sm text-muted-foreground">{t('pages.faq.content.available247')}</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}