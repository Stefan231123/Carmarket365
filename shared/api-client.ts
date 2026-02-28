/**
 * GraphQL API Client for Car Market Platform
 * Handles all communication with the backend NestJS GraphQL API
 */

export interface ApiResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: any;
  }>;
}

export interface AuthTokens {
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'DEALER' | 'ADMIN';
  dealerName?: string;
  dealerLogoUrl?: string;
  dealerAddress?: string;
  dealerCity?: string;
  dealerPhoneNumber?: string;
  savedListingIds: string[];
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType?: string;
  color?: string;
  description?: string;
  images: string[];
  location: string;
  countryCode?: string; // Country where the car is listed
  isAvailable: boolean;
  isFeatured: boolean;
  sellerId: string;
  seller: User;
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  dealerName?: string;
  dealerAddress?: string;
  dealerCity?: string;
  dealerPhoneNumber?: string;
}

export interface OAuthLoginInput {
  provider: 'google' | 'facebook';
  token: string;
  email?: string;
  name?: string;
}

// This interface should match the backend's FilterCarsInput exactly
export interface CarFilterInput {
  makeId?: string;
  modelId?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  fuelTypes?: string[];
  transmissionType?: string;
  bodyType?: string;
  powerKwMin?: number;
  exteriorColor?: string;
  features?: string[];
  fullServiceHistory?: boolean;
  location?: string;
  countryCode?: string; // Country-specific filtering
}

// OAuth Response interfaces
export interface GoogleTokenResponse {
  credential: string;
  select_by: string;
}

export interface FacebookLoginResponse {
  authResponse: {
    accessToken: string;
    userID: string;
    expiresIn: number;
  };
  status: string;
}

class ApiClient {
  private baseUrl: string;
  private readonly isProduction: boolean;
  private accessToken: string | null = null;

  constructor() {
    this.isProduction = import.meta.env.PROD || false;

    // Determine API endpoint: use env variable, detect production by hostname, or fallback to localhost
    const envEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
    if (envEndpoint) {
      this.baseUrl = envEndpoint;
    } else if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // Production: connect to Railway backend
      this.baseUrl = 'https://carmarket365-production.up.railway.app/graphql';
    } else {
      this.baseUrl = 'http://localhost:3002/graphql';
    }
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private async request<T>(query: string, variables?: any): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Send JWT as Authorization header (fallback for cross-origin when cookies aren't sent)
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        credentials: 'include', // httpOnly cookies sent automatically
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication Methods
  async login(input: LoginInput, captchaToken?: string): Promise<{ user: User; tokens: AuthTokens }> {
    const query = `
      mutation Login($input: LoginInput!, $captchaToken: String) {
        login(input: $input, captchaToken: $captchaToken) {
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

    const response = await this.request<{ login: { user: User; access_token: string } }>(
      query,
      { input, captchaToken }
    );

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (response.data?.login) {
      const { user, access_token } = response.data.login;
      // Store token in memory for Authorization header (cross-origin fallback)
      if (access_token) this.accessToken = access_token;
      return { user, tokens: { access_token: access_token || '' } };
    }

    throw new Error('Login failed');
  }

  async register(input: RegisterInput, captchaToken?: string): Promise<{ user: User; tokens: AuthTokens }> {
    const query = `
      mutation Register($input: RegisterInput!, $captchaToken: String) {
        register(input: $input, captchaToken: $captchaToken) {
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

    const response = await this.request<{ register: { user: User; access_token: string } }>(
      query,
      { input, captchaToken }
    );

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (response.data?.register) {
      const { user, access_token } = response.data.register;
      // Store token in memory for Authorization header (cross-origin fallback)
      if (access_token) this.accessToken = access_token;
      return { user, tokens: { access_token: access_token || '' } };
    }

    throw new Error('Registration failed');
  }

  async logout(): Promise<void> {
    try {
      // Backend clears the httpOnly cookie via Set-Cookie
      const query = `
        mutation Logout {
          logout
        }
      `;

      await this.request<{ logout: boolean }>(query);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.accessToken = null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const query = `
      query GetCurrentUser {
        getCurrentUser {
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

    try {
      const response = await this.request<{ getCurrentUser: User }>(query);

      if (response.errors) {
        return null;
      }

      return response.data?.getCurrentUser || null;
    } catch {
      return null;
    }
  }

  // Car Methods
  async getCars(filters?: CarFilterInput): Promise<Car[]> {
    try {
      // First attempt: Try with the correct schema
      const hasFilters = filters && Object.keys(filters).length > 0;
      
      const query = `
        query GetCars${hasFilters ? '($filters: FilterCarsInput!)' : ''} {
          cars${hasFilters ? '(filters: $filters)' : ''} {
            id
            title
            description
            price
            currency
            location
            countryCode
            imageUrls
            status
            year
            mileage
            fuelType
            transmissionType
            bodyType
            exteriorColor
            user {
              id
              email
              name
              role
              dealerName
              dealerLogoUrl
              dealerPhoneNumber
            }
            carMake {
              name
            }
            carModel {
              name
            }
            createdAt
            updatedAt
          }
        }
      `;

      // Only pass filters if they exist and have properties
      const variables: any = {};
      if (hasFilters) {
        variables.filters = filters;
      }

      const response = await this.request<{ cars: any[] }>(query, variables);

      if (response.errors) {
        console.warn('GraphQL errors:', response.errors);
        if (this.isProduction) return [];
        return this.getMockCars(filters);
      }

      // Transform backend data to frontend Car interface
      const backendCars = response.data?.cars || [];
      if (backendCars.length === 0) {
        if (this.isProduction) return [];
        console.log('No cars returned from backend, using mock data');
        return this.getMockCars(filters);
      }

      return backendCars.map(car => ({
        id: car.id,
        make: car.carMake?.name || 'Unknown',
        model: car.carModel?.name || 'Unknown', 
        year: car.year,
        price: parseFloat(car.price),
        mileage: car.mileage,
        fuelType: car.fuelType,
        transmission: car.transmissionType,
        bodyType: car.bodyType,
        color: car.exteriorColor,
        description: car.description,
        images: car.imageUrls || [],
        location: car.location,
        countryCode: car.countryCode,
        isAvailable: car.status === 'ACTIVE',
        isFeatured: car.promotedAt != null,
        sellerId: car.user.id,
        seller: {
          id: car.user.id,
          email: car.user.email,
          name: car.user.name,
          role: car.user.role,
          dealerName: car.user.dealerName,
          dealerLogoUrl: car.user.dealerLogoUrl,
          dealerAddress: car.user.dealerAddress,
          dealerCity: car.user.dealerCity,
          dealerPhoneNumber: car.user.dealerPhoneNumber,
          savedListingIds: []
        },
        createdAt: car.createdAt,
        updatedAt: car.updatedAt
      }));

    } catch (error) {
      console.warn('Backend connection failed:', error);
      if (this.isProduction) return [];
      return this.getMockCars(filters);
    }
  }

  // Temporary mock data while backend integration is being resolved
  private getMockCars(filters?: CarFilterInput): Car[] {
    const allMockCars: Car[] = [
      // Macedonian listings (mk)
      {
        id: 'mk-1',
        make: 'BMW',
        model: '320i',
        year: 2022,
        price: 35000,
        mileage: 15000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        color: 'Black',
        description: 'Beautiful BMW 320i in excellent condition. Full service history, single owner.',
        images: [
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
        ],
        location: 'Skopje, Macedonia',
        countryCode: 'mk',
        isAvailable: true,
        isFeatured: true,
        sellerId: 'user1',
        seller: {
          id: 'user1',
          email: 'marko@example.com',
          name: 'Marko Petrovski',
          role: 'DEALER',
          dealerName: 'Premium Auto Skopje',
          dealerLogoUrl: '',
          dealerAddress: '123 Partizanska',
          dealerCity: 'Skopje',
          dealerPhoneNumber: '+389 70 123 456',
          savedListingIds: []
        },
        createdAt: '2023-08-20T10:00:00Z',
        updatedAt: '2023-08-20T10:00:00Z'
      },
      {
        id: 'mk-2',
        make: 'Mercedes-Benz',
        model: 'C300',
        year: 2021,
        price: 42000,
        mileage: 25000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        color: 'White',
        description: 'Luxury Mercedes-Benz C300 with premium interior and advanced features.',
        images: [
          'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
        ],
        location: 'Ohrid, Macedonia',
        countryCode: 'mk',
        isAvailable: true,
        isFeatured: false,
        sellerId: 'user2',
        seller: {
          id: 'user2',
          email: 'ana@example.com',
          name: 'Ana Stojanovski',
          role: 'USER',
          dealerName: '',
          dealerLogoUrl: '',
          dealerAddress: '',
          dealerCity: '',
          dealerPhoneNumber: '+389 78 987 654',
          savedListingIds: []
        },
        createdAt: '2023-08-19T14:30:00Z',
        updatedAt: '2023-08-19T14:30:00Z'
      },
      // Albanian listings (al)
      {
        id: 'al-1',
        make: 'Audi',
        model: 'A4',
        year: 2023,
        price: 48000,
        mileage: 5000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        color: 'Silver',
        description: 'Brand new Audi A4 with latest technology and premium features.',
        images: [
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop'
        ],
        location: 'Tirana, Albania',
        countryCode: 'al',
        isAvailable: true,
        isFeatured: true,
        sellerId: 'user3',
        seller: {
          id: 'user3',
          email: 'ardi@example.com',
          name: 'Ardi Hoxha',
          role: 'DEALER',
          dealerName: 'Auto Albania',
          dealerLogoUrl: '',
          dealerAddress: 'Rruga e Kavajes',
          dealerCity: 'Tirana',
          dealerPhoneNumber: '+355 69 123 456',
          savedListingIds: []
        },
        createdAt: '2023-08-18T09:15:00Z',
        updatedAt: '2023-08-18T09:15:00Z'
      },
      // Slovenian listings (si)
      {
        id: 'si-1',
        make: 'Volkswagen',
        model: 'Golf',
        year: 2022,
        price: 28000,
        mileage: 18000,
        fuelType: 'Gasoline',
        transmission: 'Manual',
        bodyType: 'Hatchback',
        color: 'Red',
        description: 'Reliable Volkswagen Golf in excellent condition.',
        images: [
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop'
        ],
        location: 'Ljubljana, Slovenia',
        countryCode: 'si',
        isAvailable: true,
        isFeatured: false,
        sellerId: 'user4',
        seller: {
          id: 'user4',
          email: 'marjan@example.com',
          name: 'Marjan Novak',
          role: 'USER',
          dealerName: '',
          dealerLogoUrl: '',
          dealerAddress: '',
          dealerCity: '',
          dealerPhoneNumber: '+386 31 123 456',
          savedListingIds: []
        },
        createdAt: '2023-08-17T12:00:00Z',
        updatedAt: '2023-08-17T12:00:00Z'
      },
      // Latvian listings (lv)
      {
        id: 'lv-1',
        make: 'Toyota',
        model: 'Camry',
        year: 2021,
        price: 32000,
        mileage: 22000,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        color: 'Blue',
        description: 'Eco-friendly Toyota Camry Hybrid with excellent fuel economy.',
        images: [
          'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
        ],
        location: 'Riga, Latvia',
        countryCode: 'lv',
        isAvailable: true,
        isFeatured: true,
        sellerId: 'user5',
        seller: {
          id: 'user5',
          email: 'janis@example.com',
          name: 'Jānis Ozols',
          role: 'DEALER',
          dealerName: 'Baltic Motors',
          dealerLogoUrl: '',
          dealerAddress: 'Brīvības iela 123',
          dealerCity: 'Riga',
          dealerPhoneNumber: '+371 20 123 456',
          savedListingIds: []
        },
        createdAt: '2023-08-16T15:30:00Z',
        updatedAt: '2023-08-16T15:30:00Z'
      }
    ];

    // Apply basic filtering if provided
    if (!filters) return allMockCars;

    return allMockCars.filter(car => {
      // Country filtering is the most important - only show cars from the specified country
      if (filters.countryCode && car.countryCode !== filters.countryCode) return false;
      
      if (filters.makeId && car.make.toLowerCase() !== filters.makeId.toLowerCase()) return false;
      if (filters.yearMin && car.year < filters.yearMin) return false;
      if (filters.yearMax && car.year > filters.yearMax) return false;
      if (filters.priceMin && car.price < filters.priceMin) return false;
      if (filters.priceMax && car.price > filters.priceMax) return false;
      if (filters.mileageMin && car.mileage < filters.mileageMin) return false;
      if (filters.mileageMax && car.mileage > filters.mileageMax) return false;
      if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      return true;
    });
  }

  async getCarById(id: string): Promise<Car | null> {
    try {
      const query = `
        query GetCar($id: ID!) {
          car(id: $id) {
            id
            title
            description
            price
            currency
            location
            imageUrls
            status
            year
            mileage
            fuelType
            transmissionType
            bodyType
            exteriorColor
            user {
              id
              email
              name
              role
              dealerName
              dealerLogoUrl
              dealerPhoneNumber
            }
            carMake {
              name
            }
            carModel {
              name
            }
            createdAt
            updatedAt
          }
        }
      `;

      const response = await this.request<{ car: any }>(query, { id });

      if (response.errors) {
        console.warn('GraphQL errors for single car:', response.errors);
        if (this.isProduction) return null;
        return this.getMockCarById(id);
      }

      const car = response.data?.car;
      if (!car) {
        if (this.isProduction) return null;
        return this.getMockCarById(id);
      }

      // Transform backend data to frontend Car interface
      return {
        id: car.id,
        make: car.carMake?.name || 'Unknown',
        model: car.carModel?.name || 'Unknown', 
        year: car.year,
        price: parseFloat(car.price),
        mileage: car.mileage,
        fuelType: car.fuelType,
        transmission: car.transmissionType,
        bodyType: car.bodyType,
        color: car.exteriorColor,
        description: car.description,
        images: car.imageUrls || [],
        location: car.location,
        isAvailable: car.status === 'ACTIVE',
        isFeatured: car.promotedAt != null,
        sellerId: car.user.id,
        seller: {
          id: car.user.id,
          email: car.user.email,
          name: car.user.name,
          role: car.user.role,
          dealerName: car.user.dealerName,
          dealerLogoUrl: car.user.dealerLogoUrl,
          dealerAddress: car.user.dealerAddress,
          dealerCity: car.user.dealerCity,
          dealerPhoneNumber: car.user.dealerPhoneNumber,
          savedListingIds: []
        },
        createdAt: car.createdAt,
        updatedAt: car.updatedAt
      };

    } catch (error) {
      console.warn('Backend connection failed for single car:', error);
      if (this.isProduction) return null;
      return this.getMockCarById(id);
    }
  }

  private getMockCarById(id: string): Car | null {
    const mockCars = this.getMockCars();
    return mockCars.find(car => car.id === id) || mockCars[0] || null;
  }

  async createCar(carData: any): Promise<any> {
    const query = `
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

    const response = await this.request<{ createCar: any }>(query, { input: carData });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    const car = response.data?.createCar;
    if (!car) {
      throw new Error('Failed to create car');
    }

    return car;
  }

  async createCarImage(input: {
    carId: string;
    url: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    sortOrder?: number;
    isPrimary?: boolean;
  }): Promise<any> {
    const query = `
      mutation CreateCarImage($input: CreateCarImageInput!) {
        createCarImage(input: $input) {
          id
          url
          thumbnailUrl
          isMain
          sortOrder
        }
      }
    `;

    const response = await this.request<{ createCarImage: any }>(query, { input });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.createCarImage;
  }

  async createCarInquiry(input: {
    carId: string;
    inquiryType: string;
    message: string;
    inquirerName: string;
    inquirerEmail: string;
    inquirerPhone?: string;
  }, captchaToken?: string): Promise<any> {
    const query = `
      mutation CreateCarInquiry($input: CreateCarInquiryInput!, $captchaToken: String) {
        createCarInquiry(input: $input, captchaToken: $captchaToken) {
          id
          type
          message
          status
          createdAt
        }
      }
    `;

    const response = await this.request<{ createCarInquiry: any }>(query, { input, captchaToken });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.createCarInquiry;
  }

  async getSellerInquiries(): Promise<any[]> {
    const query = `
      query GetSellerInquiries {
        getSellerInquiries {
          id
          type
          message
          name
          email
          phone
          status
          sellerResponse
          repliedAt
          createdAt
          car {
            id
            make
            model
          }
          user {
            id
            name
            email
          }
        }
      }
    `;

    try {
      const response = await this.request<{ getSellerInquiries: any[] }>(query);
      if (response.errors) {
        console.warn('SellerInquiries GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getSellerInquiries || [];
    } catch (error) {
      console.warn('Failed to fetch seller inquiries:', error);
      return [];
    }
  }

  async getUserSavedCars(): Promise<any[]> {
    const query = `
      query GetUserSavedCars {
        getUserSavedCars {
          id
          car {
            id
            make
            model
            year
            price
            mileage
            fuelType
            location
            images {
              url
              thumbnailUrl
            }
          }
          createdAt
        }
      }
    `;

    try {
      const response = await this.request<{ getUserSavedCars: any[] }>(query);
      if (response.errors) {
        console.warn('UserSavedCars GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getUserSavedCars || [];
    } catch (error) {
      console.warn('Failed to fetch saved cars:', error);
      return [];
    }
  }

  async saveCar(carId: string): Promise<any> {
    const query = `
      mutation SaveCar($carId: String!) {
        saveCar(carId: $carId) {
          id
        }
      }
    `;

    const response = await this.request<{ saveCar: any }>(query, { carId });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data?.saveCar;
  }

  async getMyListings(): Promise<any[]> {
    const query = `
      query GetMyListings {
        getMyListings {
          id
          make
          model
          year
          price
          mileage
          fuelType
          transmission
          condition
          location
          countryCode
          isAvailable
          isFeatured
          quickSale
          viewCount
          inquiryCount
          description
          images {
            id
            url
            thumbnailUrl
            isMain
            sortOrder
          }
          seller {
            id
            name
            email
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await this.request<{ getMyListings: any[] }>(query);
      if (response.errors) {
        console.warn('GetMyListings GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getMyListings || [];
    } catch (error) {
      console.warn('Failed to fetch my listings:', error);
      return [];
    }
  }

  async deleteCar(id: string): Promise<boolean> {
    const query = `
      mutation DeleteCar($id: String!) {
        deleteCar(id: $id)
      }
    `;

    const response = await this.request<{ deleteCar: boolean }>(query, { id });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data?.deleteCar || false;
  }

  async unsaveCar(carId: string): Promise<boolean> {
    const query = `
      mutation UnsaveCar($carId: String!) {
        unsaveCar(carId: $carId)
      }
    `;

    const response = await this.request<{ unsaveCar: boolean }>(query, { carId });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data?.unsaveCar || false;
  }

  // Car Makes & Models
  async getCarMakes(): Promise<Array<{ id: string; name: string }>> {
    const query = `
      query GetCarMakes {
        carMakes {
          id
          name
        }
      }
    `;

    const response = await this.request<{ carMakes: Array<{ id: string; name: string }> }>(query);
    return response.data?.carMakes || [];
  }

  async getCarModels(carMakeId: string): Promise<Array<{ id: string; name: string }>> {
    const query = `
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

    const response = await this.request<{ carModelsByMake: Array<{ id: string; name: string }> }>(query, { carMakeId });
    return response.data?.carModelsByMake || [];
  }

  // Auth state is managed by httpOnly cookies — use getCurrentUser() to check
  isAuthenticated(): boolean {
    // Cannot check httpOnly cookie from JS; callers should use getCurrentUser()
    return false;
  }

  // Admin-specific methods
  async getAdminStats(): Promise<any> {
    const query = `
      query GetAdminStats {
        getAdminStats {
          totalUsers
          totalDealers
          totalListings
          activeListings
          pendingListings
          flaggedListings
          totalRevenue
          newUsersThisMonth
          newUsersThisWeek
          totalViews
          totalInquiries
          averageListingPrice
        }
      }
    `;

    try {
      const response = await this.request<{ getAdminStats: any }>(query);
      if (response.errors) {
        console.warn('AdminStats GraphQL errors:', response.errors);
        return {};
      }
      return response.data?.getAdminStats || {};
    } catch (error) {
      console.warn('Backend connection failed for admin stats:', error);
      return {};
    }
  }

  async getRecentActivity(): Promise<any[]> {
    const query = `
      query GetRecentActivity {
        getRecentActivity {
          id
          action
          user
          time
          details
          type
          entityId
        }
      }
    `;

    try {
      const response = await this.request<{ getRecentActivity: any[] }>(query);
      if (response.errors) {
        console.warn('RecentActivity GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getRecentActivity || [];
    } catch (error) {
      console.warn('Backend connection failed for recent activity:', error);
      return [];
    }
  }

  async getAllUsers(): Promise<any[]> {
    const query = `
      query GetAllUsers {
        getAllUsers {
          id
          email
          name
          role
          isActive
          createdAt
          updatedAt
          lastLoginAt
          dealerName
          dealerPhoneNumber
        }
      }
    `;

    try {
      const response = await this.request<{ getAllUsers: any[] }>(query);
      if (response.errors) {
        console.warn('AllUsers GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getAllUsers || [];
    } catch (error) {
      console.warn('Backend connection failed for all users:', error);
      return [];
    }
  }

  async getAllListings(): Promise<any[]> {
    const query = `
      query GetAllListings {
        getAllListings {
          id
          make
          model
          description
          price
          year
          mileage
          isAvailable
          vehicleType
          location
          fuelType
          transmission
          condition
          seller {
            id
            name
            email
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await this.request<{ getAllListings: any[] }>(query);
      if (response.errors) {
        console.warn('AllListings GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getAllListings || [];
    } catch (error) {
      console.warn('Backend connection failed for all listings:', error);
      return [];
    }
  }

  async getSystemHealth(): Promise<any> {
    const query = `
      query GetSystemHealth {
        getSystemHealth {
          status
          cpuUsage
          memoryUsage
          diskUsage
          activeConnections
          responseTime
          errorRate
          lastUpdated
        }
      }
    `;

    try {
      const response = await this.request<{ getSystemHealth: any }>(query);
      if (response.errors) {
        console.warn('SystemHealth GraphQL errors:', response.errors);
        return {};
      }
      return response.data?.getSystemHealth || {};
    } catch (error) {
      console.warn('Backend connection failed for system health:', error);
      return {};
    }
  }

  // OAuth Login Methods
  async loginWithOAuth(input: OAuthLoginInput): Promise<{ user: User; tokens: AuthTokens }> {
    const socialLoginQuery = `
      mutation SocialLogin($provider: String!, $token: String!, $email: String!, $name: String) {
        socialLogin(provider: $provider, token: $token, email: $email, name: $name) {
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

    const response = await this.request<{ socialLogin: { user: User; access_token: string } }>(
      socialLoginQuery,
      {
        provider: input.provider,
        token: input.token,
        email: input.email || '',
        name: input.name || ''
      }
    );

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (!response.data?.socialLogin) {
      throw new Error('Social login failed — no response from server');
    }

    const { user, access_token } = response.data.socialLogin;
    // Store token in memory for Authorization header (cross-origin fallback)
    if (access_token) this.accessToken = access_token;
    return { user, tokens: { access_token: access_token || '' } };
  }

  async sendContactMessage(input: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    inquiryType: string;
    message: string;
  }, captchaToken?: string): Promise<boolean> {
    const query = `
      mutation SendContactMessage($name: String!, $email: String!, $subject: String!, $inquiryType: String!, $message: String!, $phone: String, $captchaToken: String) {
        sendContactMessage(name: $name, email: $email, subject: $subject, inquiryType: $inquiryType, message: $message, phone: $phone, captchaToken: $captchaToken)
      }
    `;

    const response = await this.request<{ sendContactMessage: boolean }>(query, { ...input, captchaToken });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.sendContactMessage ?? false;
  }

  async requestPasswordReset(email: string, captchaToken?: string): Promise<boolean> {
    const query = `
      mutation RequestPasswordReset($email: String!, $captchaToken: String) {
        requestPasswordReset(email: $email, captchaToken: $captchaToken)
      }
    `;

    const response = await this.request<{ requestPasswordReset: boolean }>(query, { email, captchaToken });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.requestPasswordReset ?? false;
  }

  async resetPassword(token: string, email: string, newPassword: string, captchaToken?: string): Promise<boolean> {
    const query = `
      mutation ResetPassword($token: String!, $email: String!, $newPassword: String!, $captchaToken: String) {
        resetPassword(token: $token, email: $email, newPassword: $newPassword, captchaToken: $captchaToken)
      }
    `;

    const response = await this.request<{ resetPassword: boolean }>(query, { token, email, newPassword, captchaToken });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.resetPassword ?? false;
  }

  // --- GDPR Operations ---

  async exportMyData(): Promise<Record<string, unknown>> {
    const query = `
      query ExportMyData {
        exportMyData
      }
    `;

    const response = await this.request<{ exportMyData: Record<string, unknown> }>(query);

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data!.exportMyData;
  }

  async deleteMyAccount(): Promise<boolean> {
    const query = `
      mutation DeleteMyAccount {
        deleteMyAccount
      }
    `;

    const response = await this.request<{ deleteMyAccount: boolean }>(query);

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.deleteMyAccount ?? false;
  }

  async getExpressSaleOpportunities(): Promise<any[]> {
    const query = `
      query GetExpressSaleOpportunities {
        getExpressSaleOpportunities {
          id
          make
          model
          year
          price
          mileage
          fuelType
          transmission
          condition
          location
          countryCode
          description
          isAvailable
          quickSale
          images {
            id
            url
            thumbnailUrl
            isMain
          }
          seller {
            id
            name
            email
            dealerName
            dealerPhoneNumber
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await this.request<{ getExpressSaleOpportunities: any[] }>(query);
      if (response.errors) {
        console.warn('ExpressSaleOpportunities GraphQL errors:', response.errors);
        return [];
      }
      return response.data?.getExpressSaleOpportunities || [];
    } catch (error) {
      console.warn('Failed to fetch express sale opportunities:', error);
      return [];
    }
  }

  async updateMarketingPreferences(marketingEmails: boolean, smsNotifications: boolean): Promise<void> {
    const query = `
      mutation UpdateMarketingPreferences($marketingEmails: Boolean!, $smsNotifications: Boolean!) {
        updateMarketingPreferences(marketingEmails: $marketingEmails, smsNotifications: $smsNotifications) {
          id
          marketingEmailsEnabled
          smsNotificationsEnabled
        }
      }
    `;

    const response = await this.request(query, { marketingEmails, smsNotifications });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;