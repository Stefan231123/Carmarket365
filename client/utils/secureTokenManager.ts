/**
 * Token Manager for CarMarket365
 * Uses localStorage for token storage (backend uses GraphQL auth, not REST cookie endpoints)
 */

import { isValidTokenFormat } from './security';

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

const AUTH_TOKEN_KEY = 'authToken';

class SecureTokenManager {
  private static instance: SecureTokenManager;

  private constructor() {}

  public static getInstance(): SecureTokenManager {
    if (!SecureTokenManager.instance) {
      SecureTokenManager.instance = new SecureTokenManager();
    }
    return SecureTokenManager.instance;
  }

  /**
   * Store token in localStorage
   */
  public async setTokens(tokenData: TokenData): Promise<boolean> {
    try {
      if (!isValidTokenFormat(tokenData.access_token)) {
        console.warn('Invalid token format detected');
        return false;
      }

      localStorage.setItem(AUTH_TOKEN_KEY, tokenData.access_token);
      return true;
    } catch (error) {
      console.error('Failed to store token:', error);
      return false;
    }
  }

  /**
   * Retrieve access token from localStorage
   */
  public async getAccessToken(): Promise<string | null> {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token && isValidTokenFormat(token)) {
        return token;
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
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear tokens:', error);
      return false;
    }
  }

  /**
   * Migrate tokens from any legacy storage keys to the current key
   */
  public migrateLegacyTokens(): void {
    try {
      const legacyKeys = ['token', 'jwt_token', 'auth_token', 'carmarket_token'];
      for (const key of legacyKeys) {
        const legacyToken = localStorage.getItem(key);
        if (legacyToken && isValidTokenFormat(legacyToken)) {
          localStorage.setItem(AUTH_TOKEN_KEY, legacyToken);
          localStorage.removeItem(key);
          break;
        }
      }
    } catch {
      // Silently ignore migration errors
    }
  }

  /**
   * No-op: CSRF is not needed with GraphQL + JWT auth
   */
  public async initializeCSRFToken(): Promise<string | null> {
    return null;
  }
}

export const tokenManager = SecureTokenManager.getInstance();
