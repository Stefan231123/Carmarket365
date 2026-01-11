import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="bg-car-gray-light rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Construction className="h-12 w-12 text-car-gray" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {title}
        </h1>
        
        <p className="text-car-gray mb-8 leading-relaxed">
          {t('pages.placeholder.underConstructionMessage')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('pages.placeholder.backToHome')}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">
              {t('pages.placeholder.contactUs')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
