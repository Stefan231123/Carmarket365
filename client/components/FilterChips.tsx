import React from 'react';
import { X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterCarsInput } from '../lib/graphql/operations';
import { useTranslation } from '../hooks/useTranslation';

interface FilterChipsProps {
  filters: FilterCarsInput;
  onRemoveFilter: (filterKey: string, value?: string) => void;
  onClearAll: () => void;
  className?: string;
}

interface FilterChip {
  key: string;
  label: string;
  value?: string;
  removable: boolean;
}

export function FilterChips({ filters, onRemoveFilter, onClearAll, className = '' }: FilterChipsProps) {
  const { t } = useTranslation();

  // Convert filters to chip data
  const getFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];

    // Basic Information
    if (filters.makeId && filters.makeId !== 'all') {
      chips.push({
        key: 'makeId',
        label: `${t('advancedSearch.make')}: ${filters.makeId}`,
        removable: true
      });
    }

    if (filters.modelId) {
      chips.push({
        key: 'modelId',
        label: `${t('advancedSearch.model')}: ${filters.modelId}`,
        removable: true
      });
    }

    if (filters.bodyType && filters.bodyType !== 'any') {
      chips.push({
        key: 'bodyType',
        label: `${t('advancedSearch.bodyType')}: ${t(`vehicleData.bodyTypes.${filters.bodyType}`, filters.bodyType)}`,
        removable: true
      });
    }

    if (filters.fuelTypes && filters.fuelTypes.length > 0) {
      filters.fuelTypes.forEach((fuelType) => {
        chips.push({
          key: 'fuelTypes',
          label: `${t('advancedSearch.fuelType')}: ${t(`vehicleData.fuelTypes.${fuelType}`, fuelType)}`,
          value: fuelType,
          removable: true
        });
      });
    }

    // Additional Properties
    if (filters.additionalProperties && filters.additionalProperties.length > 0) {
      filters.additionalProperties.forEach((prop: string) => {
        chips.push({
          key: 'additionalProperties',
          label: t(`vehicleData.additionalProperties.${prop}`, prop),
          value: prop,
          removable: true
        });
      });
    }

    // Price Range
    if (filters.priceMin && filters.priceMin > 0) {
      chips.push({
        key: 'priceMin',
        label: `${t('advancedSearch.priceFrom')}: €${filters.priceMin.toLocaleString()}`,
        removable: true
      });
    }

    if (filters.priceMax && filters.priceMax < 200000) {
      chips.push({
        key: 'priceMax',
        label: `${t('advancedSearch.priceTo')}: €${filters.priceMax.toLocaleString()}`,
        removable: true
      });
    }

    // Registration Years
    if (filters.firstRegistrationFrom && filters.firstRegistrationFrom > 1990) {
      chips.push({
        key: 'firstRegistrationFrom',
        label: `${t('advancedSearch.yearFrom')}: ${filters.firstRegistrationFrom}`,
        removable: true
      });
    }

    if (filters.firstRegistrationTo && filters.firstRegistrationTo < new Date().getFullYear()) {
      chips.push({
        key: 'firstRegistrationTo',
        label: `${t('advancedSearch.yearTo')}: ${filters.firstRegistrationTo}`,
        removable: true
      });
    }

    // Mileage Range
    if (filters.mileageMin && filters.mileageMin > 0) {
      chips.push({
        key: 'mileageMin',
        label: `${t('advancedSearch.mileageFrom')}: ${filters.mileageMin.toLocaleString()} km`,
        removable: true
      });
    }

    if (filters.mileageMax && filters.mileageMax < 300000) {
      chips.push({
        key: 'mileageMax',
        label: `${t('advancedSearch.mileageTo')}: ${filters.mileageMax.toLocaleString()} km`,
        removable: true
      });
    }

    // Power Range
    if (filters.powerMinKW && filters.powerMinKW > 0) {
      chips.push({
        key: 'powerMinKW',
        label: `${t('advancedSearch.powerFrom')}: ${filters.powerMinKW} kW`,
        removable: true
      });
    }

    if (filters.powerMaxKW && filters.powerMaxKW < 500) {
      chips.push({
        key: 'powerMaxKW',
        label: `${t('advancedSearch.powerTo')}: ${filters.powerMaxKW} kW`,
        removable: true
      });
    }

    // Location
    if (filters.countries && filters.countries.length > 0) {
      filters.countries.forEach((country: string) => {
        chips.push({
          key: 'countries',
          label: t(`countries.${country}`, country),
          value: country,
          removable: true
        });
      });
    }

    if (filters.cityZipCode) {
      chips.push({
        key: 'cityZipCode',
        label: `${t('advancedSearch.location')}: ${filters.cityZipCode}`,
        removable: true
      });
    }

    if (filters.radiusKm && filters.radiusKm !== 'nationwide') {
      chips.push({
        key: 'radiusKm',
        label: `${t('advancedSearch.radius')}: ${filters.radiusKm} km`,
        removable: true
      });
    }

    // Technical Specifications
    if (filters.gear && filters.gear !== 'any') {
      chips.push({
        key: 'gear',
        label: `${t('advancedSearch.transmission')}: ${t(`vehicleData.transmissions.${filters.gear}`, filters.gear)}`,
        removable: true
      });
    }

    if (filters.numberOfSeats && filters.numberOfSeats !== 'any') {
      chips.push({
        key: 'numberOfSeats',
        label: `${t('advancedSearch.seats')}: ${filters.numberOfSeats}`,
        removable: true
      });
    }

    // Seller & Condition
    if (filters.seller && filters.seller !== 'any') {
      chips.push({
        key: 'seller',
        label: `${t('advancedSearch.seller')}: ${t(`vehicleData.sellerTypes.${filters.seller}`, filters.seller)}`,
        removable: true
      });
    }

    if (filters.vehicleCondition && filters.vehicleCondition !== 'any') {
      chips.push({
        key: 'vehicleCondition',
        label: `${t('advancedSearch.condition')}: ${t(`vehicleData.conditions.${filters.vehicleCondition}`, filters.vehicleCondition)}`,
        removable: true
      });
    }

    // Optional Equipment
    if (filters.optionalEquipment && filters.optionalEquipment.length > 0) {
      filters.optionalEquipment.forEach(equipment => {
        chips.push({
          key: 'optionalEquipment',
          label: t(`vehicleData.features.${equipment}`, equipment),
          value: equipment,
          removable: true
        });
      });
    }

    // Appearance
    if (filters.bodyColor && filters.bodyColor !== 'any') {
      chips.push({
        key: 'bodyColor',
        label: `${t('advancedSearch.bodyColor')}: ${t(`vehicleData.colors.${filters.bodyColor}`, filters.bodyColor)}`,
        removable: true
      });
    }

    if (filters.paintWork && filters.paintWork !== 'any') {
      chips.push({
        key: 'paintWork',
        label: `${t('advancedSearch.paintWork')}: ${t(`vehicleData.paintTypes.${filters.paintWork}`, filters.paintWork)}`,
        removable: true
      });
    }

    if (filters.interiorColor && filters.interiorColor !== 'any') {
      chips.push({
        key: 'interiorColor',
        label: `${t('advancedSearch.interiorColor')}: ${t(`vehicleData.colors.${filters.interiorColor}`, filters.interiorColor)}`,
        removable: true
      });
    }

    if (filters.upholstery && filters.upholstery !== 'any') {
      chips.push({
        key: 'upholstery',
        label: `${t('advancedSearch.upholstery')}: ${t(`vehicleData.upholsteryTypes.${filters.upholstery}`, filters.upholstery)}`,
        removable: true
      });
    }

    // History & Condition
    if (filters.previousOwners && filters.previousOwners !== 'any') {
      chips.push({
        key: 'previousOwners',
        label: `${t('advancedSearch.previousOwners')}: ${filters.previousOwners}`,
        removable: true
      });
    }

    if (filters.hadAccident && filters.hadAccident !== 'any') {
      chips.push({
        key: 'hadAccident',
        label: `${t('advancedSearch.hadAccident')}: ${t(`common.${filters.hadAccident.toLowerCase()}`, filters.hadAccident)}`,
        removable: true
      });
    }

    if (filters.guarantee && filters.guarantee !== 'any') {
      chips.push({
        key: 'guarantee',
        label: `${t('advancedSearch.guarantee')}: ${t(`vehicleData.guaranteeTypes.${filters.guarantee}`, filters.guarantee)}`,
        removable: true
      });
    }

    if (filters.fullServiceHistory && filters.fullServiceHistory !== 'any') {
      chips.push({
        key: 'fullServiceHistory',
        label: `${t('advancedSearch.fullServiceHistory')}: ${t(`common.${filters.fullServiceHistory.toLowerCase()}`, filters.fullServiceHistory)}`,
        removable: true
      });
    }

    if (filters.nonSmokingVehicle && filters.nonSmokingVehicle !== 'any') {
      chips.push({
        key: 'nonSmokingVehicle',
        label: `${t('advancedSearch.nonSmoking')}: ${t(`common.${filters.nonSmokingVehicle.toLowerCase()}`, filters.nonSmokingVehicle)}`,
        removable: true
      });
    }

    // Environmental
    if (filters.euroEmissionClass && filters.euroEmissionClass !== 'any') {
      chips.push({
        key: 'euroEmissionClass',
        label: `${t('advancedSearch.euroEmission')}: ${filters.euroEmissionClass}`,
        removable: true
      });
    }

    // Search specific
    if (filters.searchTerm) {
      chips.push({
        key: 'searchTerm',
        label: `${t('advancedSearch.searchTerm')}: "${filters.searchTerm}"`,
        removable: true
      });
    }

    if (filters.onlyWithImages) {
      chips.push({
        key: 'onlyWithImages',
        label: t('advancedSearch.onlyWithImages'),
        removable: true
      });
    }

    return chips;
  };

  const handleRemoveChip = (chip: FilterChip) => {
    if (chip.value) {
      onRemoveFilter(chip.key, chip.value);
    } else {
      onRemoveFilter(chip.key);
    }
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className={`bg-muted/30 rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {t('advancedSearch.activeFilters')} ({chips.length})
          </span>
        </div>
        
        {chips.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {t('advancedSearch.clearAll')}
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <Badge
            key={`${chip.key}-${chip.value || ''}-${index}`}
            variant="secondary"
            className="pl-3 pr-1 py-1 bg-white border-zinc-200 text-foreground hover:bg-zinc-50 transition-colors"
          >
            <span className="text-xs font-medium truncate max-w-[200px]">
              {chip.label}
            </span>
            {chip.removable && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-4 w-4 p-0 hover:bg-zinc-200 rounded-full"
                onClick={() => handleRemoveChip(chip)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </Badge>
        ))}
      </div>
      
      {chips.length > 5 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {t('advancedSearch.filterHint', 'Tip: Use specific filters to narrow down your search results')}
        </div>
      )}
    </div>
  );
}

export default FilterChips;