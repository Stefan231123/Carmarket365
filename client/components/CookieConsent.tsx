import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "carmarket365_cookie_consent";

export function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium mb-1">
                {t('cookies.title') || 'We use cookies'}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('cookies.description') || 'We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our use of cookies.'}
                {' '}
                <a href="/cookie-policy" className="underline hover:text-foreground">
                  {t('cookies.learnMore') || 'Learn more'}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="rounded-full h-9 px-4 text-xs"
            >
              {t('cookies.decline') || 'Decline'}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="rounded-full h-9 px-4 text-xs bg-black text-white hover:bg-black/90"
            >
              {t('cookies.accept') || 'Accept'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
