import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogOverlay,
  DialogPortal
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, ExternalLink, Mail, Loader2 } from 'lucide-react';
import { useSafeAuth } from '@/contexts/AuthContextSafe';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: 'google' | 'facebook';
}

declare global {
  interface Window {
    google: any;
    FB: any;
    gapi: any;
  }
}

export function SocialLoginModal({ isOpen, onClose, provider }: SocialLoginModalProps) {
  const { t } = useTranslation();
  // const { loginWithOAuth } = useSafeAuth(); // OAuth not implemented in SafeAuthProvider yet
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const providerInfo = {
    google: {
      name: 'Google',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      color: 'text-red-500'
    },
    facebook: {
      name: 'Facebook',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'text-blue-600'
    }
  };

  const current = providerInfo[provider];

  // Load OAuth SDKs
  useEffect(() => {
    if (provider === 'google') {
      loadGoogleSDK();
    } else if (provider === 'facebook') {
      loadFacebookSDK();
    }
  }, [provider]);

  const loadGoogleSDK = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Wait a bit for Google SDK to initialize
        setTimeout(() => {
          if (window.google) {
            resolve();
          } else {
            reject(new Error('Google SDK failed to load'));
          }
        }, 1000);
      };
      
      script.onerror = () => reject(new Error('Failed to load Google SDK'));
      document.body.appendChild(script);
    });
  };

  const loadFacebookSDK = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.FB) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        
        window.FB.AppEvents.logPageView();
        
        // Wait for FB to be ready
        window.FB.getLoginStatus(() => {
          resolve();
        });
      };
      
      script.onerror = () => reject(new Error('Failed to load Facebook SDK'));
      document.body.appendChild(script);
    });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure Google SDK is loaded
      await loadGoogleSDK();
      
      if (!window.google) {
        throw new Error('Google SDK failed to load');
      }

      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            // Decode JWT to get user info
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            // TODO: Implement OAuth in SafeAuthProvider
            console.log('Google OAuth login:', payload);
            setError('OAuth login not yet implemented');
            // await loginWithOAuth({
            //   provider: 'google',
            //   token: response.credential,
            //   email: payload.email,
            //   name: payload.name
            // });
            
            // onClose(); // Don't close on error
          } catch (error) {
            console.error('Google OAuth callback error:', error);
            setError(error instanceof Error ? error.message : 'Google login failed');
          } finally {
            setIsLoading(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: false
      });

      // Show the Google One Tap dialog
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('Google One Tap was not displayed or skipped');
          // Fallback to renderButton
          const buttonDiv = document.createElement('div');
          buttonDiv.id = 'google-signin-button';
          document.body.appendChild(buttonDiv);
          
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular'
          });
          
          // Trigger click programmatically
          setTimeout(() => {
            const button = buttonDiv.querySelector('div[role="button"]') as HTMLElement;
            if (button) {
              button.click();
            }
            document.body.removeChild(buttonDiv);
          }, 100);
        }
      });

    } catch (error) {
      console.error('Google login error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize Google login');
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure Facebook SDK is loaded
      await loadFacebookSDK();
      
      if (!window.FB) {
        throw new Error('Facebook SDK failed to load');
      }

      // Check current login status first
      window.FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          // User is already logged in, get their info
          getUserInfoAndLogin(response.authResponse.accessToken);
        } else {
          // User needs to log in
          window.FB.login((loginResponse: any) => {
            if (loginResponse.authResponse) {
              getUserInfoAndLogin(loginResponse.authResponse.accessToken);
            } else {
              setError('Facebook login was cancelled or failed');
              setIsLoading(false);
            }
          }, { 
            scope: 'email,public_profile',
            return_scopes: true 
          });
        }
      });

      const getUserInfoAndLogin = (accessToken: string) => {
        window.FB.api('/me', { 
          fields: 'id,name,email,picture.type(large)' 
        }, async (userInfo: any) => {
          try {
            if (!userInfo.email) {
              throw new Error('Facebook account must have a verified email address');
            }

            // TODO: Implement OAuth in SafeAuthProvider
            console.log('Facebook OAuth login:', userInfo);
            setError('OAuth login not yet implemented');
            // await loginWithOAuth({
            //   provider: 'facebook',
            //   token: accessToken,
            //   email: userInfo.email,
            //   name: userInfo.name
            // });
            
            // onClose(); // Don't close on error
          } catch (error) {
            console.error('Facebook OAuth error:', error);
            setError(error instanceof Error ? error.message : 'Facebook login failed');
          } finally {
            setIsLoading(false);
          }
        });
      };

    } catch (error) {
      console.error('Facebook login initialization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize Facebook login');
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = () => {
    if (provider === 'google') {
      handleGoogleLogin();
    } else if (provider === 'facebook') {
      handleFacebookLogin();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-white/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-6 bg-white border border-gray-200 p-8 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl"
          )}
        >
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 ${current.color}`}>
                <div className="scale-150">
                  {current.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Sign in with {current.name}
              </h2>
              <p className="text-gray-600">
                Continue with your {current.name} account to access CarMarket365
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {provider === 'google' ? 'Google' : 'Facebook'} Login Error
                  </span>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                {error.includes('SDK') && (
                  <div className="mt-2 text-xs text-red-500">
                    <p>• Check your internet connection</p>
                    <p>• Disable ad blockers for this site</p>
                    <p>• Try refreshing the page</p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2 text-blue-700">
                <Info className="h-4 w-4 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Sign in with {current.name}</p>
                  <p className="text-blue-600">
                    {provider === 'google' 
                      ? t('auth.socialLogin.google.description')
                      : t('auth.socialLogin.facebook.description')
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleOAuthLogin}
                disabled={isLoading}
                className={cn(
                  "w-full h-12 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                  provider === 'google' 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t('auth.socialLogin.signingIn')}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="text-white">
                      {current.icon}
                    </div>
                    <span>Continue with {current.name}</span>
                  </div>
                )}
              </Button>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={onClose}
                  disabled={isLoading}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 border-t pt-4">
              <p>By continuing, you agree to CarMarket365's</p>
              <p>
                <a href="/terms" className="underline hover:text-gray-700">Terms of Service</a>
                {' '}&{' '}
                <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>
              </p>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}