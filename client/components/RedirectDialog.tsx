import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import { CountryConfig } from '@shared/country-config';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useTranslation } from '@/hooks/useTranslation';

interface RedirectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  targetCountry: CountryConfig;
  onAccept: () => void;
  onDecline: () => void;
}

export function RedirectDialog({ 
  isOpen, 
  onClose, 
  targetCountry, 
  onAccept, 
  onDecline 
}: RedirectDialogProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="text-6xl">{targetCountry.flag}</div>
              <div>{t('redirect.welcomeMessage')}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t('redirect.detectionMessage', { country: targetCountry.name })}
            </p>
            
            {/* Country Benefits */}
            <div className="bg-muted/30 rounded-2xl p-4 mb-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                {t('redirect.localBenefits', { country: targetCountry.name })}
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• {t('redirect.benefits.currency')}</li>
                <li>• {targetCountry.hasMultipleLanguages 
                  ? `Multiple languages: ${targetCountry.languages.map(l => l.name).join(', ')}` 
                  : `Native language: ${targetCountry.languages[0]?.name}`}
                </li>
                <li>• {t('redirect.benefits.dealers')}</li>
                <li>• {t('redirect.benefits.features')}</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button onClick={onAccept} className="w-full bg-black text-white hover:bg-black/90 rounded-full h-12">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('redirect.continueButton', { country: targetCountry.name })}
            </Button>
            
            <Button 
              onClick={onDecline} 
              variant="outline" 
              className="w-full border-zinc-300 rounded-full h-12"
            >
              <Globe className="h-4 w-4 mr-2" />
              {t('redirect.chooseCountryButton')}
            </Button>
          </div>
          
          {/* Additional Details */}
          <div className="space-y-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showDetails ? t('redirect.hideDetails') : t('redirect.showDetails')} ↓
            </button>
            
            {showDetails && (
              <div className="text-xs text-muted-foreground bg-muted/30 rounded-xl p-3 space-y-2">
                <p>{t('redirect.details.ipDetection')}</p>
                <p>{t('redirect.details.targetDomain')}: <code className="bg-white px-1 rounded">{targetCountry.domain}</code></p>
                <p>{t('redirect.details.changePreference')}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Auto-redirect dialog component that manages its own state
export function AutoRedirectDialog() {
  const { 
    recommendedRedirect, 
    shouldShowRedirectDialog, 
    acceptRedirect, 
    declineRedirect,
    isLoading 
  } = useGeolocation();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (shouldShowRedirectDialog && recommendedRedirect && !isLoading) {
      setIsOpen(true);
    }
  }, [shouldShowRedirectDialog, recommendedRedirect, isLoading]);

  const handleAccept = () => {
    setIsOpen(false);
    acceptRedirect();
  };

  const handleDecline = () => {
    setIsOpen(false);
    declineRedirect();
  };

  const handleClose = () => {
    setIsOpen(false);
    declineRedirect(); // Closing dialog = declining redirect
  };

  if (!recommendedRedirect) {
    return null;
  }

  return (
    <RedirectDialog
      isOpen={isOpen}
      onClose={handleClose}
      targetCountry={recommendedRedirect}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
}