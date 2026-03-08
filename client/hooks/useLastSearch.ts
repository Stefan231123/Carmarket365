const STORAGE_KEY = 'carmarket_last_search';

export interface LastSearchParams {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxMileage?: number;
  fuelType?: string;
  transmission?: string;
  vehicleType?: string;
  location?: string;
}

export function saveLastSearch(params: LastSearchParams): void {
  // Only save if there's at least one meaningful filter
  const hasFilter = Object.values(params).some(v => v !== undefined && v !== '');
  if (!hasFilter) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // Ignore storage errors (private browsing, etc.)
  }
}

export function getLastSearch(): LastSearchParams | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastSearchParams;
  } catch {
    return null;
  }
}

export function clearLastSearch(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
