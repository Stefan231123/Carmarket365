/**
 * Secure Token Manager for CarMarket365
 * Replaces localStorage with secure httpOnly cookie-based token storage
 */

import { isValidTokenFormat } from './security';

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

class SecureTokenManager {
  private static instance: SecureTokenManager;
  private tokenCache: TokenData | null = null;
  private readonly CSRF_TOKEN_KEY = 'csrf_token';
  
  private constructor() {}
  
  public static getInstance(): SecureTokenManager {
    if (!SecureTokenManager.instance) {
      SecureTokenManager.instance = new SecureTokenManager();
    }
    return SecureTokenManager.instance;
  }

  /**
   * Store tokens securely using httpOnly cookies via API call
   */
  public async setTokens(tokenData: TokenData): Promise<boolean> {
    try {
      // Validate token format before storage
      if (!isValidTokenFormat(tokenData.access_token)) {
        console.warn('Invalid token format detected');
        return false;
      }

      // Send tokens to backend for secure httpOnly cookie storage
      const response = await fetch('http://localhost:3001/api/auth/store-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.getCSRFToken(),
        },
        credentials: 'include',
        body: JSON.stringify(tokenData),
      });

      if (response.ok) {
        this.tokenCache = tokenData;
        
        // Store CSRF token in sessionStorage (safer than localStorage for CSRF)
        const csrfToken = response.headers.get('X-CSRF-Token');
        if (csrfToken) {
          sessionStorage.setItem(this.CSRF_TOKEN_KEY, csrfToken);
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to store tokens securely:', error);
      return false;
    }
  }

  /**
   * Retrieve access token from secure httpOnly cookie
   */
  public async getAccessToken(): Promise<string | null> {
    try {
      // Try cache first
      if (this.tokenCache?.access_token && this.isTokenValid(this.tokenCache)) {
        return this.tokenCache.access_token;
      }

      // Fetch from secure cookie via API
      const response = await fetch('http://localhost:3001/api/auth/get-token', {
        method: 'GET',
        headers: {
          'X-CSRF-Token': this.getCSRFToken(),
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token && isValidTokenFormat(data.access_token)) {
          this.tokenCache = data;
          return data.access_token;
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      return null;
    }
  }

  /**
   * Clear all tokens (logout)
   */
  public async clearTokens(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': this.getCSRFToken(),
        },
        credentials: 'include',
      });

      this.tokenCache = null;
      sessionStorage.removeItem(this.CSRF_TOKEN_KEY);
      
      return response.ok;
    } catch (error) {
      console.error('Failed to clear tokens:', error);
      return false;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  public async refreshToken(): Promise<string | null> {
    try {
      const response = await fetch('http://localhost:3001/api/auth/refresh', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': this.getCSRFToken(),
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token && isValidTokenFormat(data.access_token)) {
          this.tokenCache = data;
          return data.access_token;
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  }

  /**
   * Get CSRF token for requests
   */
  private getCSRFToken(): string {
    return sessionStorage.getItem(this.CSRF_TOKEN_KEY) || '';
  }

  /**
   * Initialize CSRF token from backend
   */
  public async initializeCSRFToken(): Promise<string | null> {
    try {
      const response = await fetch('http://localhost:3001/api/auth/csrf-token', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.csrf_token) {
          sessionStorage.setItem(this.CSRF_TOKEN_KEY, data.csrf_token);
          return data.csrf_token;
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to initialize CSRF token:', error);
      return null;
    }
  }

  /**
   * Check if token is still valid
   */
  private isTokenValid(tokenData: TokenData): boolean {
    if (!tokenData.expires_at) {
      return true; // No expiry set, assume valid
    }
    
    return Date.now() < tokenData.expires_at;
  }

  /**
   * Fallback method for legacy localStorage migration
   * ONLY used during migration period, should be removed after migration
   */
  public migrateLegacyTokens(): void {
    try {
      const legacyToken = localStorage.getItem('auth_token') || 
                          localStorage.getItem('authToken');
      
      if (legacyToken && isValidTokenFormat(legacyToken)) {
        // Store in secure system
        this.setTokens({ access_token: legacyToken });
        
        // Clear legacy storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('authToken');
        
        console.log('Legacy tokens migrated to secure storage');
      }
    } catch (error) {
      console.error('Failed to migrate legacy tokens:', error);
    }
  }
}

export const tokenManager = SecureTokenManager.getInstance();