import { gql } from '@apollo/client';

// Auth Operations
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
        savedListingIds
      }
      access_token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String, $role: UserRole = USER) {
    register(email: $email, password: $password, name: $name, role: $role) {
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
        savedListingIds
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

// Car Operations
export const GET_CARS = gql`
  query GetCars($filters: FilterCarsInput) {
    cars(filters: $filters) {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      user {
        id
        name
        email
        dealerName
        dealerLogoUrl
        dealerPhoneNumber
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: ID!) {
    car(id: $id) {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      engineSize
      powerKw
      numberOfDoors
      numberOfSeats
      previousOwners
      fullServiceHistory
      user {
        id
        name
        email
        dealerName
        dealerLogoUrl
        dealerPhoneNumber
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEATURED_CARS = gql`
  query GetFeaturedCars {
    findCarsForYou {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      user {
        id
        name
        email
        dealerName
        dealerLogoUrl
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CARS_BY_MAKE = gql`
  query GetCarsByMake($makeId: ID!) {
    cars(filters: { makeId: $makeId }) {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      user {
        id
        name
        email
        dealerName
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CAR_MAKES = gql`
  query GetCarMakes {
    carMakes {
      id
      name
      carModels {
        id
        name
      }
    }
  }
`;

export const GET_CAR_MODELS = gql`
  query GetCarModelsByMake($carMakeId: ID!) {
    carModelsByMake(carMakeId: $carMakeId) {
      id
      name
      carMake {
        id
        name
      }
    }
  }
`;

// Advanced Search Operations (using existing cars query with filters)
export const SEARCH_CARS = gql`
  query SearchCars($filters: FilterCarsInput) {
    cars(filters: $filters) {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      user {
        id
        name
        email
        dealerName
        dealerLogoUrl
        dealerPhoneNumber
      }
      createdAt
      updatedAt
    }
  }
`;

// Car Creation/Update Operations
export const CREATE_CAR = gql`
  mutation CreateCar($createCarInput: CreateCarInput!) {
    createCar(createCarInput: $createCarInput) {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      engineSize
      powerKw
      numberOfDoors
      numberOfSeats
      previousOwners
      fullServiceHistory
      user {
        id
        name
        email
      }
      createdAt
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($updateCarInput: UpdateCarInput!) {
    updateCar(updateCarInput: $updateCarInput) {
      id
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
      year
      price
      currency
      mileage
      fuelType
      transmissionType
      bodyType
      exteriorColor
      description
      imageUrls
      location
      status
      features
      engineSize
      powerKw
      numberOfDoors
      numberOfSeats
      previousOwners
      fullServiceHistory
      user {
        id
        name
        email
      }
      updatedAt
    }
  }
`;

export const DELETE_CAR = gql`
  mutation RemoveCar($id: ID!) {
    removeCar(id: $id)
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

export interface CreateCarInput {
  carMakeId: string;
  carModelId: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuelType: FuelType;
  transmissionType: TransmissionType;
  bodyType: BodyType;
  exteriorColor?: string;
  description?: string;
  imageUrls?: string[];
  location: string;
  status?: VehicleStatus;
  features?: string[];
  engineSize?: number;
  powerKw?: number;
  numberOfDoors?: number;
  numberOfSeats?: number;
  previousOwners?: number;
  fullServiceHistory?: boolean;
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  LPG = 'LPG',
  CNG = 'CNG'
}

export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC'
}

export enum BodyType {
  SEDAN = 'SEDAN',
  HATCHBACK = 'HATCHBACK',
  SUV = 'SUV',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  WAGON = 'WAGON',
  PICKUP = 'PICKUP',
  VAN = 'VAN',
  MINIVAN = 'MINIVAN'
}

export enum VehicleStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  REJECTED = 'REJECTED',
  SOLD = 'SOLD',
  EXPIRED = 'EXPIRED'
}

export interface UpdateCarInput {
  id: string;
  carMakeId?: string;
  carModelId?: string;
  year?: number;
  price?: number;
  currency?: string;
  mileage?: number;
  fuelType?: FuelType;
  transmissionType?: TransmissionType;
  bodyType?: BodyType;
  exteriorColor?: string;
  description?: string;
  imageUrls?: string[];
  location?: string;
  status?: VehicleStatus;
  features?: string[];
  engineSize?: number;
  powerKw?: number;
  numberOfDoors?: number;
  numberOfSeats?: number;
  previousOwners?: number;
  fullServiceHistory?: boolean;
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
    savedListingIds: string[];
  };
  access_token: string;
}

export interface Car {
  id: string;
  carMake: {
    id: string;
    name: string;
  };
  carModel: {
    id: string;
    name: string;
  };
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuelType: FuelType;
  transmissionType: TransmissionType;
  bodyType: BodyType;
  exteriorColor?: string;
  description?: string;
  imageUrls: string[];
  location: string;
  status: VehicleStatus;
  features?: string[];
  engineSize?: number;
  powerKw?: number;
  numberOfDoors?: number;
  numberOfSeats?: number;
  previousOwners?: number;
  fullServiceHistory?: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    dealerName?: string;
    dealerLogoUrl?: string;
    dealerPhoneNumber?: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface CarMake {
  id: string;
  name: string;
  carModels?: CarModel[];
}

export interface CarModel {
  id: string;
  name: string;
  carMake?: CarMake;
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
  savedListingIds: string[];
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