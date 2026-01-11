import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SocialLoginModal } from './SocialLoginModal';

export function OAuthTestButtons() {
  const [activeModal, setActiveModal] = useState<'google' | 'facebook' | null>(null);

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-muted/30">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Test OAuth Integration</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveModal('google')}
            className="text-xs"
          >
            Test Google Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveModal('facebook')}
            className="text-xs"
          >
            Test Facebook Login
          </Button>
        </div>
      </div>

      {/* Google Modal */}
      <SocialLoginModal
        isOpen={activeModal === 'google'}
        onClose={() => setActiveModal(null)}
        provider="google"
      />

      {/* Facebook Modal */}
      <SocialLoginModal
        isOpen={activeModal === 'facebook'}
        onClose={() => setActiveModal(null)}
        provider="facebook"
      />
    </div>
  );
}