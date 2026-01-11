// Translation function type
type TranslationFunction = (key: string) => string;

/**
 * Maps database/display values to translation keys for vehicle specifications
 */
export class VehicleSpecTranslator {
  private t: TranslationFunction;

  constructor(t: TranslationFunction) {
    this.t = t;
  }

  /**
   * Translates fuel type from database value to localized string
   */
  translateFuelType(fuelType: string): string {
    const normalizedFuelType = fuelType.toLowerCase().replace(/[^a-z]/g, '');
    
    const fuelTypeMap: Record<string, string> = {
      'gasoline': 'sell.fuelTypes.gasoline',
      'petrol': 'sell.fuelTypes.gasoline',
      'electric': 'sell.fuelTypes.electric',
      'hybrid': 'sell.fuelTypes.hybrid',
      'pluginhybrid': 'sell.fuelTypes.pluginHybrid',
      'diesel': 'sell.fuelTypes.diesel',
      'flexfuel': 'sell.fuelTypes.flexFuel',
      'cng': 'sell.fuelTypes.cng',
      'lpg': 'sell.fuelTypes.lpg',
    };

    const translationKey = fuelTypeMap[normalizedFuelType];
    return translationKey ? this.t(translationKey) : fuelType; // Fallback to original value
  }

  /**
   * Translates transmission type from database value to localized string
   */
  translateTransmission(transmission: string): string {
    const normalizedTransmission = transmission.toLowerCase().replace(/[^a-z]/g, '');
    
    const transmissionMap: Record<string, string> = {
      'automatic': 'sell.transmissions.automatic',
      'auto': 'sell.transmissions.automatic',
      'manual': 'sell.transmissions.manual',
      'stick': 'sell.transmissions.manual',
      'cvt': 'sell.transmissions.cvt',
      'continuously': 'sell.transmissions.cvt', // "Continuously Variable"
    };

    const translationKey = transmissionMap[normalizedTransmission];
    return translationKey ? this.t(translationKey) : transmission; // Fallback to original value
  }

  /**
   * Translates body type from database value to localized string
   */
  translateBodyType(bodyType: string): string {
    const normalizedBodyType = bodyType.toLowerCase().replace(/[^a-z]/g, '');
    
    const bodyTypeMap: Record<string, string> = {
      'sedan': 'sell.bodyTypes.sedan',
      'suv': 'sell.bodyTypes.suv',
      'truck': 'sell.bodyTypes.truck',
      'pickup': 'sell.bodyTypes.truck',
      'coupe': 'sell.bodyTypes.coupe',
      'hatchback': 'sell.bodyTypes.hatchback',
      'convertible': 'sell.bodyTypes.convertible',
      'wagon': 'sell.bodyTypes.wagon',
      'van': 'sell.bodyTypes.van',
      'minivan': 'sell.bodyTypes.van',
      'crossover': 'sell.bodyTypes.crossover',
    };

    const translationKey = bodyTypeMap[normalizedBodyType];
    return translationKey ? this.t(translationKey) : bodyType; // Fallback to original value
  }

  /**
   * Translates drivetrain from database value to localized string
   */
  translateDrivetrain(drivetrain: string): string {
    const normalizedDrivetrain = drivetrain.toLowerCase().replace(/[^a-z]/g, '');
    
    const drivetrainMap: Record<string, string> = {
      'fwd': 'sell.drivetrains.fwd',
      'frontwheeldrive': 'sell.drivetrains.fwd',
      'rwd': 'sell.drivetrains.rwd',
      'rearwheeldrive': 'sell.drivetrains.rwd',
      'awd': 'sell.drivetrains.awd',
      'allwheeldrive': 'sell.drivetrains.awd',
      'fourwd': 'sell.drivetrains.fourwd',
      'fourwheeldrive': 'sell.drivetrains.fourwd',
    };

    const translationKey = drivetrainMap[normalizedDrivetrain];
    return translationKey ? this.t(translationKey) : drivetrain; // Fallback to original value
  }

  /**
   * Translates condition from database value to localized string
   */
  translateCondition(condition: string): string {
    const normalizedCondition = condition.toLowerCase().replace(/[^a-z]/g, '');
    
    const conditionMap: Record<string, string> = {
      'new': 'sell.conditions.new',
      'likenew': 'sell.conditions.likeNew',
      'excellent': 'sell.conditions.excellent',
      'verygood': 'sell.conditions.veryGood',
      'good': 'sell.conditions.good',
      'fair': 'sell.conditions.fair',
      'poor': 'sell.conditions.poor',
    };

    const translationKey = conditionMap[normalizedCondition];
    return translationKey ? this.t(translationKey) : condition; // Fallback to original value
  }

  /**
   * Translates color from database value to localized string
   */
  translateColor(color: string): string {
    const normalizedColor = color.toLowerCase().replace(/[^a-z]/g, '');
    
    const colorMap: Record<string, string> = {
      'black': 'sell.colors.black',
      'white': 'sell.colors.white',
      'silver': 'sell.colors.silver',
      'gray': 'sell.colors.gray',
      'grey': 'sell.colors.gray',
      'red': 'sell.colors.red',
      'blue': 'sell.colors.blue',
      'green': 'sell.colors.green',
      'brown': 'sell.colors.brown',
      'gold': 'sell.colors.gold',
      'orange': 'sell.colors.orange',
      'purple': 'sell.colors.purple',
      'yellow': 'sell.colors.yellow',
    };

    const translationKey = colorMap[normalizedColor];
    return translationKey ? this.t(translationKey) : color; // Fallback to original value
  }
}

/**
 * Hook to get vehicle spec translator instance
 */
export const useVehicleSpecTranslator = (t: TranslationFunction) => {
  return new VehicleSpecTranslator(t);
};