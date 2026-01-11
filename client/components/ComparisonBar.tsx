import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/contexts/ComparisonContext";
import { CarComparisonModal } from "@/components/CarComparisonModal";
import { X, Eye, Car } from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

export function ComparisonBar() {
  const { t } = useTranslation();
  const { 
    comparisonCars, 
    isComparisonOpen,
    clearComparison, 
    openComparison, 
    closeComparison,
    removeFromComparison
  } = useComparison();

  if (comparisonCars.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">
                    {t('advancedFeatures.comparison.bar.compareCars')}
                  </span>
                  <Badge variant="secondary">
                    {comparisonCars.length}/3
                  </Badge>
                </div>
                
                <div className="hidden sm:flex items-center gap-2">
                  {comparisonCars.map((car, index) => (
                    <div key={car.id} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
                      <span className="max-w-[120px] truncate">
                        {car.year} {car.make} {car.model}
                      </span>
                      <button
                        onClick={() => removeFromComparison(car.id)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearComparison}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {t('advancedFeatures.comparison.clearAll')}
                </Button>
                <Button
                  onClick={openComparison}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t('advancedFeatures.comparison.compareNow')}
                </Button>
              </div>
            </div>
            
            {/* Mobile view - show car names */}
            <div className="sm:hidden mt-2 flex flex-wrap gap-1">
              {comparisonCars.map((car) => (
                <div key={car.id} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 text-xs">
                  <span className="max-w-[100px] truncate">
                    {car.year} {car.make}
                  </span>
                  <button
                    onClick={() => removeFromComparison(car.id)}
                    className="hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      <CarComparisonModal
        cars={comparisonCars}
        isOpen={isComparisonOpen}
        onClose={closeComparison}
        onRemoveCar={removeFromComparison}
        onClearAll={clearComparison}
      />
    </>
  );
}