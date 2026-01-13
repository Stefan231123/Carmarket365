import { CountryConfig, COUNTRIES, getCountryFromDomain, getAvailableCountries } from './country-config';
import { geolocationService } from './geolocation-service';

export interface RedirectOptions {
  skipRedirect?: boolean;
  forceCountry?: string;
  preservePath?: boolean;
  preserveQuery?: boolean;
}

export class RedirectService {
  private static readonly USER_PREFERENCE_KEY = 'carmarket365_country_preference';
  private static readonly REDIRECT_SHOWN_KEY = 'carmarket365_redirect_shown';
  private static readonly MAIN_DOMAIN = 'carmarket365.com';

  /**
   * Check if we should perform automatic redirection
   */
  async shouldRedirect(): Promise<{ shouldRedirect: boolean; targetCountry?: CountryConfig }> {
    // Always default to Macedonia - no redirects needed since we only support Macedonia
    return { shouldRedirect: false };
  }

  /**
   * Perform the actual redirect
   */
  redirectToCountry(country: CountryConfig, options: RedirectOptions = {}): void {
    if (options.skipRedirect) {
      return;
    }

    const currentUrl = new URL(window.location.href);
    const targetDomain = this.getTargetDomain(country);
    const isVercel = window.location.hostname.includes('vercel.app');
    
    // Build target URL
    let targetUrl = `${currentUrl.protocol}//${targetDomain}`;
    
    if (options.preservePath !== false) {
      targetUrl += currentUrl.pathname;
    }
    
    // Handle query parameters
    const urlParams = new URLSearchParams(currentUrl.search);
    
    if (isVercel) {
      // For Vercel, add country as a query parameter
      urlParams.set('country', country.code);
      if (country.defaultLanguage) {
        urlParams.set('lang', country.defaultLanguage);
      }
    }
    
    if (options.preserveQuery !== false && urlParams.toString()) {
      targetUrl += '?' + urlParams.toString();
    }

    // Mark redirect as shown
    this.markRedirectShown();

    // Perform redirect
    if (isVercel) {
      console.log(`Redirecting to country site with parameters: ${targetUrl}`);
    } else {
      console.log(`Redirecting to country subdomain: ${targetUrl}`);
    }
    window.location.href = targetUrl;
  }

  /**
   * Show redirect dialog instead of automatic redirect
   */
  async showRedirectDialog(): Promise<boolean> {
    const { shouldRedirect, targetCountry } = await this.shouldRedirect();
    
    if (!shouldRedirect || !targetCountry) {
      return false;
    }

    // Create and show modal dialog
    return new Promise((resolve) => {
      const dialog = this.createRedirectDialog(targetCountry, (accepted: boolean, selectedCountry?: CountryConfig) => {
        const countryToRedirectTo = selectedCountry || targetCountry;
        if (accepted) {
          this.setUserPreference(countryToRedirectTo.code);
          this.redirectToCountry(countryToRedirectTo);
        } else {
          // User must choose a different country, show country selection
          this.showCountrySelectionDialog(resolve);
          return;
        }
        resolve(accepted);
      });
      
      document.body.appendChild(dialog);
    });
  }

  /**
   * Get user's country preference from localStorage
   */
  getUserPreference(): string | null {
    try {
      return localStorage.getItem(RedirectService.USER_PREFERENCE_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Set user's country preference
   */
  setUserPreference(countryCode: string): void {
    try {
      localStorage.setItem(RedirectService.USER_PREFERENCE_KEY, countryCode);
    } catch {
      // Ignore localStorage errors
    }
  }

  /**
   * Check if redirect dialog was already shown in this session
   */
  private wasRedirectShown(): boolean {
    try {
      return sessionStorage.getItem(RedirectService.REDIRECT_SHOWN_KEY) === 'true';
    } catch {
      return false;
    }
  }

  /**
   * Mark redirect dialog as shown for this session
   */
  private markRedirectShown(): void {
    try {
      sessionStorage.setItem(RedirectService.REDIRECT_SHOWN_KEY, 'true');
    } catch {
      // Ignore sessionStorage errors
    }
  }

  /**
   * Check if current URL is on a country subdomain or has country parameters
   */
  private isOnCountrySubdomain(): boolean {
    const isVercel = window.location.hostname.includes('vercel.app');
    
    if (isVercel) {
      // For Vercel, check if country parameter exists
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.has('country');
    } else {
      // For non-Vercel, check subdomain
      const country = getCountryFromDomain(window.location.hostname);
      return country !== null;
    }
  }

  /**
   * Get target domain for a country (handles development vs production)
   */
  private getTargetDomain(country: CountryConfig): string {
    const isLocalhost = window.location.hostname.includes('localhost') || 
                       window.location.hostname.includes('127.0.0.1');
    
    // Check if we're on Vercel deployment
    const isVercel = window.location.hostname.includes('vercel.app');
    
    if (isLocalhost) {
      // Development: use .localhost format
      return `${country.code}.localhost:${window.location.port}`;
    } else if (isVercel) {
      // Vercel deployment: use same domain with country parameter
      return window.location.hostname;
    } else {
      // Production: use actual domain
      return country.domain;
    }
  }

  /**
   * Show country selection dialog when user declines the suggested country
   */
  private showCountrySelectionDialog(resolve: (value: boolean) => void): void {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const countries = getAvailableCountries();
    
    overlay.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-lg mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="text-4xl mb-4">🌍</div>
          <h2 class="text-2xl font-bold mb-2">Choose Your Country</h2>
          <p class="text-gray-600 mb-6">
            Please select your country to continue. This will determine your local site, language, and currency.
          </p>
        </div>
        
        <div class="space-y-3 mb-6">
          ${countries.map(country => `
            <button class="country-option w-full flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left" data-country="${country.code}">
              <div class="flex items-center gap-4">
                <span class="text-3xl">${country.flag}</span>
                <div>
                  <div class="font-semibold">${country.name}</div>
                  <div class="text-sm text-gray-500">
                    ${country.languages.map(l => l.name).join(', ')}
                  </div>
                </div>
              </div>
              <div class="text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          `).join('')}
        </div>
        
        <p class="text-xs text-gray-500 text-center">
          You can change this preference anytime from the header.
        </p>
      </div>
    `;

    // Add event listeners for country selection
    const countryButtons = overlay.querySelectorAll('.country-option');
    countryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const countryCode = button.getAttribute('data-country');
        const selectedCountry = countryCode ? COUNTRIES[countryCode] : null;
        if (selectedCountry) {
          overlay.remove();
          this.setUserPreference(selectedCountry.code);
          this.redirectToCountry(selectedCountry);
          resolve(true);
        }
      });
    });

    document.body.appendChild(overlay);
  }

  /**
   * Create redirect confirmation dialog
   */
  private createRedirectDialog(country: CountryConfig, callback: (accepted: boolean, selectedCountry?: CountryConfig) => void): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    overlay.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        <div class="text-center">
          <div class="text-6xl mb-4">${country.flag}</div>
          <h2 class="text-2xl font-bold mb-2">Welcome to CarMarket365!</h2>
          <p class="text-gray-600 mb-6">
            We detected you're visiting from <strong>${country.name}</strong>. 
            You'll be redirected to our ${country.name} site for the best local experience.
          </p>
          
          <div class="bg-muted/30 rounded-2xl p-4 mb-6">
            <h4 class="font-semibold text-sm mb-3">Local Benefits for ${country.name}</h4>
            <ul class="text-xs text-muted-foreground space-y-1 text-left">
              <li>• Local currency and pricing</li>
              <li>• ${country.hasMultipleLanguages 
                ? `Multiple languages: ${country.languages.map(l => l.name).join(', ')}` 
                : `Native language: ${country.languages[0]?.name}`}
              </li>
              <li>• Local dealers and inventory</li>
              <li>• Region-specific features</li>
            </ul>
          </div>
          
          <div class="space-y-3">
            <button id="redirect-accept" class="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors">
              Continue to ${country.name} site
            </button>
            <button id="redirect-decline" class="w-full border border-gray-300 py-3 px-6 rounded-full hover:bg-gray-50 transition-colors">
              Choose a different country
            </button>
          </div>
          
          <p class="text-xs text-gray-500 mt-4">
            You can change your country preference anytime from the header.
          </p>
        </div>
      </div>
    `;

    // Add event listeners
    const acceptBtn = overlay.querySelector('#redirect-accept') as HTMLButtonElement;
    const declineBtn = overlay.querySelector('#redirect-decline') as HTMLButtonElement;

    const cleanup = () => {
      overlay.remove();
    };

    acceptBtn?.addEventListener('click', () => {
      cleanup();
      callback(true);
    });

    declineBtn?.addEventListener('click', () => {
      cleanup();
      callback(false);
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        callback(false);
      }
    });

    return overlay;
  }

  /**
   * Initialize automatic redirection (call on app startup)
   */
  async initializeAutoRedirect(options: RedirectOptions = {}): Promise<void> {
    try {
      const { shouldRedirect, targetCountry } = await this.shouldRedirect();
      
      if (shouldRedirect && targetCountry) {
        // For better UX, show dialog instead of immediate redirect
        await this.showRedirectDialog();
      }
    } catch (error) {
      console.warn('Auto-redirect initialization failed:', error);
    }
  }
}

// Singleton instance
export const redirectService = new RedirectService();