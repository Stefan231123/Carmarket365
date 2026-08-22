import { Button } from '@/components/ui/button';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Info, Loader2 } from 'lucide-react';
import { useSafeAuth } from '@/contexts/AuthContextSafe';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: 'google';
}

declare global {
  interface Window {
    google: any;
  }
}

export function SocialLoginModal({ isOpen, onClose, provider }: SocialLoginModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginWithOAuth } = useSafeAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSdkReady(false);
      loadGoogleSDK()
        .then(() => setSdkReady(true))
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load Google SDK'));
    }
  }, [isOpen]);

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

  const handleCredentialResponse = async (response: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));

      await loginWithOAuth({
        provider: 'google',
        token: response.credential,
        email: payload.email,
        name: payload.name,
      });

      onClose();
      navigate('/');
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      setError(error instanceof Error ? error.message : 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Render Google's own button once the SDK is ready. A genuine click on
  // Google's button (not a synthetic/programmatic one) is required for the
  // sign-in popup to open — browsers block popups triggered outside a real
  // user gesture, which is why the previous auto-click approach silently failed.
  useEffect(() => {
    if (!sdkReady || !window.google || !buttonContainerRef.current) return;

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
    });

    buttonContainerRef.current.innerHTML = '';
    window.google.accounts.id.renderButton(buttonContainerRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      width: 328,
    });
  }, [sdkReady]);

  const googleIcon = (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

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
          <DialogPrimitive.Title className="sr-only">
            Sign in with Google
          </DialogPrimitive.Title>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-red-500">
                <div className="scale-150">
                  {googleIcon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Sign in with Google
              </h2>
              <p className="text-gray-600">
                Continue with your Google account to access CarMarket365
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-medium">Google Login Error</span>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                {error.includes('SDK') && (
                  <div className="mt-2 text-xs text-red-500">
                    <p>Check your internet connection</p>
                    <p>Disable ad blockers for this site</p>
                    <p>Try refreshing the page</p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2 text-blue-700">
                <Info className="h-4 w-4 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Sign in with Google</p>
                  <p className="text-blue-600">
                    {t('auth.socialLogin.google.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center items-center min-h-[44px]">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t('auth.socialLogin.signingIn')}</span>
                  </div>
                ) : (
                  <>
                    {!sdkReady && !error && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    )}
                    {/* Google renders its own real, clickable button here — required
                        so the sign-in popup opens as a direct user gesture. */}
                    <div ref={buttonContainerRef} />
                  </>
                )}
              </div>

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

// Re-export Dialog components used by the component
import { Dialog } from '@/components/ui/dialog';
import { DialogPortal } from '@/components/ui/dialog';
