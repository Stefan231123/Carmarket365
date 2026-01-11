import { Button } from "@/components/ui/button";
import { useComparison } from "@/contexts/ComparisonContext";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

interface ComparisonButtonProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType?: string;
    exteriorColor?: string;
    interiorColor?: string;
    drivetrain?: string;
    images?: string[];
    location: string;
    dealer?: string;
    condition?: string;
  };
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export function ComparisonButton({ car, variant = "outline", size = "sm" }: ComparisonButtonProps) {
  const { 
    addToComparison, 
    removeFromComparison, 
    isInComparison, 
    canAddMore,
    comparisonCars
  } = useComparison();

  const isInCompare = isInComparison(car.id);

  const handleClick = () => {
    if (isInCompare) {
      removeFromComparison(car.id);
      toast.success(`${car.year} ${car.make} ${car.model} removed from comparison`);
    } else {
      if (!canAddMore) {
        toast.error("You can only compare up to 3 cars at a time");
        return;
      }
      
      const added = addToComparison(car);
      if (added) {
        toast.success(`${car.year} ${car.make} ${car.model} added to comparison`);
      } else {
        toast.error("This car is already in your comparison");
      }
    }
  };

  return (
    <Button
      variant={isInCompare ? "default" : variant}
      size={size}
      onClick={handleClick}
      className={isInCompare ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
    >
      {isInCompare ? (
        <>
          <Minus className="h-4 w-4 mr-1" />
          Remove
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-1" />
          Compare {comparisonCars.length > 0 && `(${comparisonCars.length})`}
        </>
      )}
    </Button>
  );
}