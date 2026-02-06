import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Smartphone, Bell, Download, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface MobileAppAnnouncementProps {
  variant?: 'banner' | 'modal' | 'section';
  onClose?: () => void;
}

export function MobileAppAnnouncement({ 
  variant = 'banner', 
  onClose 
}: MobileAppAnnouncementProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Integrate with real email service
      console.log('Mobile app notification signup:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      setEmail('');
      
      // Store in localStorage to prevent showing again
      localStorage.setItem('carmarket365_mobile_app_signup', JSON.stringify({
        email,
        timestamp: Date.now()
      }));
      
    } catch (error) {
      console.error('Failed to subscribe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBannerContent = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Smartphone className="h-5 w-5" />
          <span className="text-sm font-medium">
            {t('mobileApp.announcement.banner.text', 'Mobile app coming soon! Get notified when it launches.')}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <form onSubmit={handleNotifyMe} className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder={t('mobileApp.announcement.emailPlaceholder', 'Enter your email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-48 h-8 text-sm bg-white text-black"
              required
            />
            <Button
              type="submit"
              size="sm"
              variant="secondary"
              disabled={isSubmitting}
              className="h-8 px-3 text-sm bg-white text-blue-600 hover:bg-gray-100"
            >
              {isSubmitting ? (
                <Bell className="h-4 w-4 animate-pulse" />
              ) : (
                t('mobileApp.announcement.notifyMe', 'Notify Me')
              )}
            </Button>
          </form>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const getSectionContent = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <div className="bg-blue-600 text-white rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Smartphone className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {t('mobileApp.announcement.section.title', 'Mobile App Coming Soon!')}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t('mobileApp.announcement.section.description', 
              'Take CarMarket365 with you everywhere. Get instant notifications for new listings, save favorites, and browse cars on the go.')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 mb-3 w-16 h-16 mx-auto flex items-center justify-center shadow-md">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {t('mobileApp.features.notifications', 'Push Notifications')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('mobileApp.features.notificationsDesc', 'Get alerted instantly when new cars match your criteria')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 mb-3 w-16 h-16 mx-auto flex items-center justify-center shadow-md">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {t('mobileApp.features.offline', 'Offline Access')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('mobileApp.features.offlineDesc', 'Browse saved cars and listings even without internet')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 mb-3 w-16 h-16 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {t('mobileApp.features.seamless', 'Seamless Experience')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('mobileApp.features.seamlessDesc', 'All your web favorites and searches synced automatically')}
            </p>
          </div>
        </div>

        {isSubscribed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              {t('mobileApp.announcement.success.title', 'You\'re on the list!')}
            </h3>
            <p className="text-green-700">
              {t('mobileApp.announcement.success.message', 
                'We\'ll notify you as soon as the CarMarket365 mobile app is available for download.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleNotifyMe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t('mobileApp.announcement.emailPlaceholder', 'Enter your email for updates')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {isSubmitting ? (
                  <>
                    <Bell className="h-4 w-4 mr-2 animate-pulse" />
                    {t('common.loading', 'Loading...')}
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    {t('mobileApp.announcement.notifyMe', 'Get Notified')}
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {t('mobileApp.announcement.privacy', 
                'We\'ll only use your email to notify you about the mobile app launch. No spam, ever.')}
            </p>
          </form>
        )}
      </div>
    </div>
  );

  if (variant === 'banner') return getBannerContent();
  if (variant === 'section') return getSectionContent();

  // Modal variant could be implemented here
  return null;
}

export default MobileAppAnnouncement;