import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { POPULAR_BRANDS } from "@shared/car-data";

export function PopularBrands() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    navigate(`/browse-cars?make=${encodeURIComponent(brandName)}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">{t('brands.title')}</h2>
          <p className="text-muted-foreground">
            {t('brands.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {POPULAR_BRANDS.map((brand) => (
            <Card
              key={brand.name}
              className="p-6 text-center hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer group border-zinc-100 rounded-2xl"
              onClick={() => handleBrandClick(brand.name)}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: brand.color }}
              >
                {brand.initials}
              </div>
              <h3 className="mb-1 group-hover:text-primary transition-colors font-medium">
                {brand.name}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
