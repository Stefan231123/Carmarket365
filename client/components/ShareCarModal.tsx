import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Car,
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images?: string[];
  location: string;
  description: string;
}

interface ShareCarModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareCarModal({ car, isOpen, onClose }: ShareCarModalProps) {
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);

  if (!car) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCarImage = (car: Car) => {
    if (car.images && car.images.length > 0) {
      return car.images[0];
    }
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop";
  };

  // Generate the car URL and share text
  const carUrl = `${window.location.origin}/cars/${car.id}`;
  const shareText = `Check out this ${car.year} ${car.make} ${car.model} for ${formatPrice(car.price)} in ${car.location}!`;
  const shareTitle = `${car.year} ${car.make} ${car.model} - Car Market`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(carUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = carUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${car.description}\n\nView details: ${carUrl}`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText}\n${carUrl}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(carUrl)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(carUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const handleClose = () => {
    setCopySuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            {t('modals.share.title')}
          </DialogTitle>
          <DialogDescription>
            {t('modals.share.description')}
          </DialogDescription>
        </DialogHeader>

        {/* Car Information */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex gap-3">
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={getCarImage(car)}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight">
                {car.year} {car.make} {car.model}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(car.price)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {car.location}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Copy Link Success Message */}
        {copySuccess && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
            <CheckCircle className="h-5 w-5 text-success mx-auto mb-1" />
            <p className="text-sm text-success font-medium">{t('modals.share.linkCopiedToClipboard')}</p>
          </div>
        )}

        {/* Share Options */}
        <div className="space-y-3">
          {/* Copy Link */}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            disabled={copySuccess}
          >
            <Copy className="h-4 w-4" />
            {copySuccess ? t('modals.share.linkCopied') : t('modals.share.copyLink')}
          </Button>

          {/* Email */}
          <Button
            onClick={handleEmailShare}
            variant="outline"
            className="w-full justify-start gap-3 h-12"
          >
            <Mail className="h-4 w-4" />
            {t('modals.share.shareViaEmail')}
          </Button>

          {/* WhatsApp */}
          <Button
            onClick={handleWhatsAppShare}
            variant="outline"
            className="w-full justify-start gap-3 h-12"
          >
            <MessageCircle className="h-4 w-4" />
            {t('modals.share.shareOnWhatsApp')}
            <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
          </Button>

          <Separator />

          {/* Social Media */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleFacebookShare}
              variant="outline"
              className="justify-center gap-2 h-12"
            >
              <Facebook className="h-4 w-4" />
              {t('modals.share.facebook')}
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Button>
            <Button
              onClick={handleTwitterShare}
              variant="outline"
              className="justify-center gap-2 h-12"
            >
              <Twitter className="h-4 w-4" />
              {t('modals.share.twitter')}
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <Button
            onClick={handleClose}
            variant="ghost"
            className="w-full"
          >
            {t('modals.share.close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}