import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "carmarket365_cookie_consent";

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage might be blocked in some browsers
    }
  }, []);

  const handleAccept = () => {
    try { localStorage.setItem(COOKIE_CONSENT_KEY, "accepted"); } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try { localStorage.setItem(COOKIE_CONSENT_KEY, "declined"); } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      padding: '16px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#18181b' }}>
            🍪 We use cookies
          </p>
          <p style={{ fontSize: '12px', color: '#71717a' }}>
            We use cookies to improve your experience and analyze site traffic.{' '}
            <a href="/cookie-policy" style={{ textDecoration: 'underline' }}>Learn more</a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={handleDecline}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              borderRadius: '9999px',
              border: '1px solid #e4e4e7',
              background: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              borderRadius: '9999px',
              border: 'none',
              background: '#18181b',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
