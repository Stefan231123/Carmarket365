import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface Brand {
  name: string;
  logo: string;
  count: string;
}

const popularBrands: Brand[] = [
  {
    name: "BMW",
    logo: "https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=80&h=80&fit=crop",
    count: "2,340"
  },
  {
    name: "Mercedes-Benz",
    logo: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=80&h=80&fit=crop",
    count: "1,890"
  },
  {
    name: "Audi",
    logo: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=80&h=80&fit=crop",
    count: "2,120"
  },
  {
    name: "Volkswagen",
    logo: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=80&h=80&fit=crop",
    count: "3,450"
  },
  {
    name: "Toyota",
    logo: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=80&h=80&fit=crop",
    count: "1,680"
  },
  {
    name: "Ford",
    logo: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=80&h=80&fit=crop",
    count: "1,290"
  }
];

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
          {popularBrands.map((brand) => (
            <Card 
              key={brand.name} 
              className="p-6 text-center hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer group border-zinc-100 rounded-2xl"
              onClick={() => handleBrandClick(brand.name)}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-white border border-zinc-100">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mb-1 group-hover:text-primary transition-colors font-medium">
                {brand.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {brand.count} {t('brands.carsCount')}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
