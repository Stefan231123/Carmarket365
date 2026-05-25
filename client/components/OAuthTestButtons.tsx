import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SocialLoginModal } from './SocialLoginModal';

export function OAuthTestButtons() {
  const [showGoogle, setShowGoogle] = useState(false);

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-muted/30">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Test OAuth Integration</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowGoogle(true)}
            className="text-xs"
          >
            Test Google Login
          </Button>
        </div>
      </div>

      <SocialLoginModal
        isOpen={showGoogle}
        onClose={() => setShowGoogle(false)}
        provider="google"
      />
    </div>
  );
}
