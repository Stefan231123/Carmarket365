import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  CheckCircle,
  ExternalLink,
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
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCarImage = (car: Car) => {
    if (car.images && car.images.length > 0) return car.images[0];
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop";
  };

  const carUrl = `${window.location.origin}/cars/${car.id}`;
  const shareText = `${car.year} ${car.make} ${car.model} - ${formatPrice(car.price)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(carUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = carUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareText);
    const body = encodeURIComponent(`${shareText}\n\n${car.description}\n\n${carUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${carUrl}`)}`, "_blank");
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(carUrl)}`, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(carUrl)}`, "_blank", "width=600,height=400");
  };

  const handleClose = () => {
    setCopySuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-md p-0 overflow-hidden bg-white rounded-2xl sm:rounded-2xl border-0 shadow-2xl">

        {/* Header */}
        <div className="bg-zinc-900 px-6 pt-6 pb-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white text-base font-semibold">
              <Share2 className="h-4 w-4" />
              {t('modals.share.title')}
            </DialogTitle>
            <p className="text-zinc-400 text-sm mt-0.5">{t('modals.share.description')}</p>
          </DialogHeader>

          {/* Car info */}
          <div className="flex gap-3 mt-4 bg-white/10 rounded-xl p-3">
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-700">
              <img
                src={getCarImage(car)}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-white font-semibold text-sm leading-tight block">
                {car.year} {car.make} {car.model}
              </span>
              <span className="text-white font-bold text-lg block mt-0.5">
                {formatPrice(car.price)}
              </span>
              <span className="text-zinc-400 text-xs">{car.location}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 bg-white space-y-2">
          {copySuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              {t('modals.share.linkCopiedToClipboard')}
            </div>
          )}

          <Button onClick={handleCopyLink} variant="outline" className="w-full justify-start gap-3 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white" disabled={copySuccess}>
            <Copy className="h-4 w-4" />
            {copySuccess ? t('modals.share.linkCopied') : t('modals.share.copyLink')}
          </Button>

          <Button onClick={handleEmailShare} variant="outline" className="w-full justify-start gap-3 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white">
            <Mail className="h-4 w-4" />
            {t('modals.share.shareViaEmail')}
            <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
          </Button>

          <Button onClick={handleWhatsAppShare} variant="outline" className="w-full justify-start gap-3 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white">
            <MessageCircle className="h-4 w-4" />
            {t('modals.share.shareOnWhatsApp')}
            <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
          </Button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button onClick={handleFacebookShare} variant="outline" className="justify-center gap-2 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white">
              <Facebook className="h-4 w-4" />
              {t('modals.share.facebook')}
            </Button>
            <Button onClick={handleTwitterShare} variant="outline" className="justify-center gap-2 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white">
              <Twitter className="h-4 w-4" />
              {t('modals.share.twitter')}
            </Button>
          </div>

          <div className="pt-2">
            <Button onClick={handleClose} variant="ghost" className="w-full h-11 rounded-xl text-gray-600 hover:bg-gray-50">
              {t('modals.share.close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
