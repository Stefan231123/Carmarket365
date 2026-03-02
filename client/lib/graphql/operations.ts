import { gql } from '@apollo/client';

// Auth Operations
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        name
        role
        dealerName
        dealerLogoUrl
        dealerAddress
        dealerCity
        dealerPhoneNumber
      }
      access_token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        name
        role
        dealerName
        dealerLogoUrl
        dealerAddress
        dealerCity
        dealerPhoneNumber
      }
      access_token
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      email
      name
      role
      dealerName
      dealerLogoUrl
      dealerAddress
      dealerCity
      dealerPhoneNumber
      savedListingIds
    }
  }
`;

// Car Operations - field names match backend Car entity exactly
export const GET_CARS = gql`
  query GetCars($filters: CarFilterInput) {
    getCars(filters: $filters) {
      id
      make
      model
      variant
      year
      price
      mileage
      vehicleType
      fuelType
      transmission
      condition
      color
      description
      features
      safetyFeatures
      engineSize
      horsePower
      doors
      seats
      drivetrain
      fuelConsumption
      emissionClass
      previousOwners
      hadAccident
      nonSmokingVehicle
      fullServiceHistory
      upholsteryType
      paintWorkType
      location
      city
      countryCode
      isAvailable
      isFeatured
      isCertified
      viewCount
      favoriteCount
      seller {
        id
        name
        email
        dealerName
        dealerLogoUrl
        dealerPhoneNumber
        dealerAddress
        dealerCity
      }
      images {
        id
        url
        thumbnailUrl
        isMain
        sortOrder
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: String!) {
    getCarById(id: $id) {
      id
      make
      model
      variant
      year
      price
      mileage
      vehicleType
      fuelType
      transmission
      condition
      color
      interiorColor
      description
      engineSize
      horsePower
      doors
      seats
      drivetrain
      vin
      features
      safetyFeatures
      fuelConsumption
      emissionClass
      warrantyMonths
      previousOwners
      hadAccident
      nonSmokingVehicle
      fullServiceHistory
      upholsteryType
      paintWorkType
      location
      city
      countryCode
      isAvailable
      isFeatured
      isCertified
      contactPhone
      contactEmail
      allowTestDrive
      acceptsTradeIn
      priceNegotiable
      originalPrice
      viewCount
      favoriteCount
      inquiryCount
      seller {
        id
        name
        email
        phone
        dealerName
        dealerLogoUrl
        dealerPhoneNumber
        dealerAddress
        dealerCity
      }
      images {
        id
        url
        thumbnailUrl
        isMain
        isInterior
        sortOrder
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEATURED_CARS = gql`
  query GetFeaturedCars($limit: Int) {
    getFeaturedCars(limit: $limit) {
      id
      make
      model
      variant
      year
      price
      mileage
      vehicleType
      fuelType
      transmission
      condition
      color
      description
      features
      location
      city
      countryCode
      isFeatured
      isCertified
      viewCount
      favoriteCount
      seller {
        id
        name
        email
        dealerName
        dealerLogoUrl
      }
      images {
        id
        url
        thumbnailUrl
        isMain
        sortOrder
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CARS_BY_MAKE = gql`
  query GetCarsByMake($make: String!) {
    getCarsByMake(make: $make) {
      id
      make
      model
      year
      price
      mileage
      fuelType
      transmission
      color
      description
      location
      seller {
        id
        name
        dealerName
      }
      images {
        id
        url
        isMain
      }
      createdAt
    }
  }
`;

export const GET_CAR_MAKES = gql`
  query GetCarMakes {
    getCarMakes
  }
`;

export const GET_CAR_MODELS = gql`
  query GetCarModels($make: String!) {
    getCarModels(make: $make)
  }
`;

export const GET_ALL_CAR_MAKES = gql`
  query GetAllCarMakes {
    getAllCarMakes
  }
`;

export const GET_ALL_CAR_MODELS = gql`
  query GetAllCarModels($make: String!) {
    getAllCarModels(make: $make)
  }
`;

// Advanced Search Operations (same as GET_CARS with filters)
export const SEARCH_CARS = gql`
  query SearchCars($filters: CarFilterInput) {
    getCars(filters: $filters) {
      id
      make
      model
      variant
      year
      price
      mileage
      vehicleType
      fuelType
      transmission
      condition
      color
      description
      features
      location
      city
      countryCode
      isAvailable
      isFeatured
      isCertified
      viewCount
      favoriteCount
      seller {
        id
        name
        email
        dealerName
        dealerLogoUrl
        dealerPhoneNumber
      }
      images {
        id
        url
        thumbnailUrl
        isMain
        sortOrder
      }
      createdAt
      updatedAt
    }
  }
`;

// Car Creation/Update Operations
export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      make
      model
      year
      price
      mileage
      fuelType
      transmission
      condition
      color
      description
      features
      location
      city
      countryCode
      seller {
        id
        name
        email
      }
      createdAt
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $input: UpdateCarInput!) {
    updateCar(id: $id, input: $input) {
      id
      make
      model
      year
      price
      mileage
      fuelType
      transmission
      condition
      color
      description
      features
      location
      updatedAt
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($id: String!) {
    deleteCar(id: $id)
  }
`;

// User Operations
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      role
      dealerName
      dealerLogoUrl
      dealerAddress
      dealerCity
      dealerPhoneNumber
      savedListingIds
      createdAt
    }
  }
`;

// GDPR Operations
export const EXPORT_MY_DATA = gql`
  query ExportMyData {
    exportMyData
  }
`;

export const DELETE_MY_ACCOUNT = gql`
  mutation DeleteMyAccount {
    deleteMyAccount
  }
`;

export const UPDATE_MARKETING_PREFERENCES = gql`
  mutation UpdateMarketingPreferences($marketingEmails: Boolean!, $smsNotifications: Boolean!) {
    updateMarketingPreferences(marketingEmails: $marketingEmails, smsNotifications: $smsNotifications) {
      id
      marketingEmailsEnabled
      smsNotificationsEnabled
    }
  }
`;

// Type definitions for TypeScript
export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  DEALER = 'DEALER',
  USER = 'USER'
}

// Enums matching backend exactly
export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  PLUGIN_HYBRID = 'PLUGIN_HYBRID',
  LPG = 'LPG',
  CNG = 'CNG',
  HYDROGEN = 'HYDROGEN',
}

export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
  CVT = 'CVT',
}

export enum VehicleType {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  TRUCK = 'TRUCK',
  VAN = 'VAN',
  SUV = 'SUV',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  WAGON = 'WAGON',
  HATCHBACK = 'HATCHBACK',
  SEDAN = 'SEDAN',
}

export enum CarCondition {
  NEW = 'NEW',
  USED = 'USED',
  CERTIFIED = 'CERTIFIED',
  DAMAGED = 'DAMAGED',
}

export enum DrivetrainType {
  FWD = 'FWD',
  RWD = 'RWD',
  AWD = 'AWD',
  FOUR_WD = 'FOUR_WD',
}

export interface CreateCarInput {
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  mileage: number;
  vehicleType?: VehicleType;
  fuelType: FuelType;
  transmission: TransmissionType;
  condition?: CarCondition;
  color?: string;
  interiorColor?: string;
  description?: string;
  engineSize?: number;
  horsePower?: number;
  doors?: number;
  seats?: number;
  drivetrain?: DrivetrainType;
  vin?: string;
  features?: string[];
  safetyFeatures?: string[];
  location: string;
  city?: string;
  countryCode?: string;
  contactPhone?: string;
  contactEmail?: string;
  allowTestDrive?: boolean;
  acceptsTradeIn?: boolean;
  priceNegotiable?: boolean;
  quickSale?: boolean;
  isFeatured?: boolean;
}

export interface UpdateCarInput {
  make?: string;
  model?: string;
  variant?: string;
  year?: number;
  price?: number;
  mileage?: number;
  vehicleType?: VehicleType;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  condition?: CarCondition;
  color?: string;
  interiorColor?: string;
  description?: string;
  engineSize?: number;
  horsePower?: number;
  doors?: number;
  seats?: number;
  drivetrain?: DrivetrainType;
  vin?: string;
  features?: string[];
  safetyFeatures?: string[];
  location?: string;
  city?: string;
  countryCode?: string;
  contactPhone?: string;
  contactEmail?: string;
  allowTestDrive?: boolean;
  acceptsTradeIn?: boolean;
  priceNegotiable?: boolean;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    dealerName?: string;
    dealerLogoUrl?: string;
    dealerAddress?: string;
    dealerCity?: string;
    dealerPhoneNumber?: string;
  };
  access_token: string;
}

export interface CarImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  isMain: boolean;
  isInterior?: boolean;
  sortOrder: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  mileage: number;
  vehicleType: VehicleType;
  fuelType: FuelType;
  transmission: TransmissionType;
  condition: CarCondition;
  color?: string;
  interiorColor?: string;
  description?: string;
  engineSize?: number;
  horsePower?: number;
  doors?: number;
  seats?: number;
  drivetrain?: DrivetrainType;
  vin?: string;
  features: string[];
  safetyFeatures?: string[];
  location: string;
  city?: string;
  countryCode?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isCertified: boolean;
  contactPhone?: string;
  contactEmail?: string;
  allowTestDrive?: boolean;
  acceptsTradeIn?: boolean;
  priceNegotiable?: boolean;
  originalPrice?: number;
  viewCount: number;
  favoriteCount: number;
  inquiryCount?: number;
  seller: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    dealerName?: string;
    dealerLogoUrl?: string;
    dealerPhoneNumber?: string;
    dealerAddress?: string;
    dealerCity?: string;
  };
  images: CarImage[];
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  dealerName?: string;
  dealerLogoUrl?: string;
  dealerAddress?: string;
  dealerCity?: string;
  dealerPhoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Filter Types matching backend schema
export interface FilterCarsInput {
  makeId?: string;
  modelId?: string;
  bodyType?: string; // Allow string to support 'any' option
  fuelTypes?: FuelType[];
  transmissionType?: TransmissionType;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  powerKwMin?: number;
  location?: string;
  exteriorColor?: string;
  features?: string[];
  fullServiceHistory?: string | boolean; // Allow string to support 'any' option
  
  // Additional properties used by FilterChips component
  additionalProperties?: string[];
  firstRegistrationFrom?: number;
  firstRegistrationTo?: number;
  powerMinKW?: number;
  powerMaxKW?: number;
  countries?: string[];
  cityZipCode?: string;
  radiusKm?: string | number;
  gear?: string;
  numberOfSeats?: string | number;
  seller?: string;
  vehicleCondition?: string;
  optionalEquipment?: string[];
  bodyColor?: string;
  paintWork?: string;
  interiorColor?: string;
  upholstery?: string;
  previousOwners?: string | number;
  hadAccident?: string;
  guarantee?: string;
  nonSmokingVehicle?: string;
  euroEmissionClass?: string;
  drivetrain?: string;
  searchTerm?: string;
  onlyWithImages?: boolean;
}

// Additional interfaces used by components
export interface SearchResult {
  cars: Car[]; // Array of car results
  // Pagination properties
  hasNextPage?: boolean;
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
}

export interface SortOptionsInput {
  field?: string; // Used by SearchResults component
  direction?: 'ASC' | 'DESC';
  sortBy?: string; // Alias for field
  sortDirection?: 'ASC' | 'DESC'; // Alias for direction
}

export interface AdvancedSearchFiltersInput extends FilterCarsInput {
  // Inherits all FilterCarsInput properties
  make?: string; // Used by useAdvancedSearch hook
  model?: string; // Used by useAdvancedSearch hook
  fuelType?: string; // Used by useAdvancedSearch hook (single value)
  bodyType?: string; // Override to allow string values
}

export interface PaginationInput {
  page?: number;
  limit?: number;
  offset?: number;
}