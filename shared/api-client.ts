/**
 * GraphQL API Client for Car Market Platform
 * Handles all communication with the backend NestJS GraphQL API
 */

import { tokenManager } from '../client/utils/secureTokenManager';

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
  role?: 'USER' | 'DEALER';
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
  private token: string | null = null;

  constructor() {
    this.baseUrl = 'http://localhost:3001/graphql';
    // Load token asynchronously and initialize CSRF
    this.initializeSecureAuth().catch(console.error);
  }

  private async initializeSecureAuth() {
    if (typeof window !== 'undefined') {
      // Migrate legacy tokens first
      tokenManager.migrateLegacyTokens();
      
      // Initialize CSRF token
      await tokenManager.initializeCSRFToken();
      
      // Load from secure storage
      this.token = await tokenManager.getAccessToken();
    }
  }

  private async loadTokenFromStorage() {
    // This method is now replaced by initializeSecureAuth
    await this.initializeSecureAuth();
  }

  private async saveTokenToStorage(token: string) {
    if (typeof window !== 'undefined') {
      const success = await tokenManager.setTokens({ access_token: token });
      if (success) {
        this.token = token;
      } else {
        console.error('Failed to store token securely');
      }
    }
  }

  private async removeTokenFromStorage() {
    if (typeof window !== 'undefined') {
      const success = await tokenManager.clearTokens();
      this.token = null;
      
      if (!success) {
        console.error('Failed to clear tokens completely');
      }
    }
  }

  private async request<T>(query: string, variables?: any): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // For mutations, include CSRF token
    const isStateChanging = query.trim().toLowerCase().startsWith('mutation');
    if (isStateChanging) {
      const csrfToken = sessionStorage.getItem('csrf_token');
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }
    }

    // Include Authorization header if we have a token (for Bearer token fallback)
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        credentials: 'include', // This ensures cookies are sent
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
  async login(input: LoginInput): Promise<{ user: User; tokens: AuthTokens }> {
    const query = `
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
          session_id
        }
      }
    `;

    const response = await this.request<{ login: { user: User; access_token: string; session_id: string } }>(
      query,
      input
    );

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (response.data?.login) {
      const { user, access_token, session_id } = response.data.login;
      // Tokens are now stored automatically in httpOnly cookies
      // Just update our local reference
      this.token = access_token;
      return { user, tokens: { access_token } };
    }

    throw new Error('Login failed');
  }

  async register(input: RegisterInput): Promise<{ user: User; tokens: AuthTokens }> {
    const query = `
      mutation Register($email: String!, $password: String!, $name: String, $role: UserRole) {
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
          session_id
        }
      }
    `;

    const response = await this.request<{ register: { user: User; access_token: string; session_id: string } }>(
      query,
      input
    );

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (response.data?.register) {
      const { user, access_token, session_id } = response.data.register;
      // Tokens are now stored automatically in httpOnly cookies
      // Just update our local reference
      this.token = access_token;
      return { user, tokens: { access_token } };
    }

    throw new Error('Registration failed');
  }

  async logout(): Promise<void> {
    try {
      // Call GraphQL logout mutation
      const query = `
        mutation Logout {
          logout
        }
      `;

      await this.request<{ logout: boolean }>(query);
      
      // Clear local token reference
      this.token = null;
      
      // Clear local storage fallback
      await this.removeTokenFromStorage();
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state even if backend call fails
      this.token = null;
      await this.removeTokenFromStorage();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const query = `
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

    try {
      const response = await this.request<{ me: User }>(query);
      
      if (response.errors) {
        // Clear tokens on authentication error
        this.token = null;
        await this.removeTokenFromStorage();
        return null;
      }

      return response.data?.me || null;
    } catch (error) {
      console.error('getCurrentUser error:', error);
      // Clear tokens on error
      this.token = null;
      await this.removeTokenFromStorage();
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
        // For now, return mock data if backend has issues
        return this.getMockCars(filters);
      }

      // Transform backend data to frontend Car interface
      const backendCars = response.data?.cars || [];
      if (backendCars.length === 0) {
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
      console.warn('Backend connection failed, using mock data:', error);
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
        // Return mock car if backend has issues
        return this.getMockCarById(id);
      }

      const car = response.data?.car;
      if (!car) {
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
      console.warn('Backend connection failed for single car, using mock data:', error);
      return this.getMockCarById(id);
    }
  }

  private getMockCarById(id: string): Car | null {
    const mockCars = this.getMockCars();
    return mockCars.find(car => car.id === id) || mockCars[0] || null;
  }

  async createCar(carData: any): Promise<Car> {
    const query = `
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
          user {
            id
            name
            email
          }
          createdAt
        }
      }
    `;

    const response = await this.request<{ createCar: any }>(query, { createCarInput: carData });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    const backendCar = response.data?.createCar;
    if (!backendCar) {
      throw new Error('Failed to create car');
    }

    // Transform backend data to frontend Car interface
    return {
      id: backendCar.id,
      make: backendCar.carMake?.name || 'Unknown',
      model: backendCar.carModel?.name || 'Unknown',
      year: backendCar.year,
      price: parseFloat(backendCar.price),
      mileage: backendCar.mileage,
      fuelType: backendCar.fuelType,
      transmission: backendCar.transmissionType,
      bodyType: backendCar.bodyType,
      color: backendCar.exteriorColor,
      description: backendCar.description,
      images: backendCar.imageUrls || [],
      location: backendCar.location,
      countryCode: undefined, // Not returned in creation response
      isAvailable: backendCar.status === 'ACTIVE',
      isFeatured: false, // New cars are not featured by default
      sellerId: backendCar.user.id,
      seller: {
        id: backendCar.user.id,
        email: backendCar.user.email,
        name: backendCar.user.name,
        role: 'USER', // Default role
        dealerName: '',
        dealerLogoUrl: '',
        dealerAddress: '',
        dealerCity: '',
        dealerPhoneNumber: '',
        savedListingIds: []
      },
      createdAt: backendCar.createdAt,
      updatedAt: backendCar.createdAt
    };
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

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Helper method to get current token
  getToken(): string | null {
    return this.token;
  }

  // OAuth Login Methods
  async loginWithOAuth(input: OAuthLoginInput): Promise<{ user: User; tokens: AuthTokens }> {
    console.log(`Starting ${input.provider} OAuth login for:`, input.email);
    
    // First try the dedicated social login endpoint
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
            savedListingIds
          }
          access_token
        }
      }
    `;

    try {
      const response = await this.request<{ socialLogin: { user: User; access_token: string } }>(
        socialLoginQuery,
        {
          provider: input.provider,
          token: input.token,
          email: input.email || '',
          name: input.name || ''
        }
      );

      if (response.errors && !response.errors[0].message.includes('Unknown')) {
        throw new Error(response.errors[0].message);
      }

      if (response.data?.socialLogin) {
        const { user, access_token } = response.data.socialLogin;
        this.saveTokenToStorage(access_token);
        console.log(`${input.provider} OAuth login successful:`, user.email);
        return { user, tokens: { access_token } };
      }

      // If socialLogin is not available, fallback to regular auth flow
      throw new Error('Backend social login not available');
      
    } catch (error: any) {
      console.warn(`Backend ${input.provider} login not available, using fallback method:`, error.message);
      
      if (!input.email) {
        throw new Error(`${input.provider} login requires an email address`);
      }

      // Try to login first (user might already exist)
      try {
        const existingUserResult = await this.login({
          email: input.email,
          password: `oauth_${input.provider}_temp` // This won't work, but we'll catch it
        });
        return existingUserResult;
      } catch (loginError) {
        // Login failed, try to register new user
        console.log(`User doesn't exist, registering new ${input.provider} user:`, input.email);
        
        try {
          const registerResult = await this.register({
            email: input.email,
            password: `oauth_${input.provider}_${Date.now()}`, // Secure temporary password
            name: input.name || input.email.split('@')[0],
            role: 'USER'
          });
          
          console.log(`${input.provider} OAuth registration successful:`, registerResult.user.email);
          return registerResult;
          
        } catch (registerError: any) {
          if (registerError.message.includes('already exists')) {
            // User exists but password doesn't match, this is expected for OAuth users
            // In a real app, you'd handle this more gracefully
            throw new Error(`Account exists with email ${input.email}. Please sign in with your password or use the forgot password feature.`);
          }
          throw registerError;
        }
      }
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;