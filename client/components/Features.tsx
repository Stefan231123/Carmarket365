import { Shield, Search, DollarSign, Truck, Clock, Users } from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

export function Features() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Shield,
      titleKey: "features.items.verifiedListings.title",
      descriptionKey: "features.items.verifiedListings.description"
    },
    {
      icon: Search,
      titleKey: "features.items.advancedSearch.title",
      descriptionKey: "features.items.advancedSearch.description"
    },
    {
      icon: DollarSign,
      titleKey: "features.items.bestPrices.title",
      descriptionKey: "features.items.bestPrices.description"
    },
    {
      icon: Truck,
      titleKey: "features.items.freeDelivery.title",
      descriptionKey: "features.items.freeDelivery.description"
    },
    {
      icon: Clock,
      titleKey: "features.items.quickProcess.title",
      descriptionKey: "features.items.quickProcess.description"
    },
    {
      icon: Users,
      titleKey: "features.items.expertSupport.title",
      descriptionKey: "features.items.expertSupport.description"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-car-gray-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-car-gray max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-car-gray leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
