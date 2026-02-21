import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const COOKIE_CONSENT_KEY = "carmarket365_cookie_consent";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

function loadGoogleAnalytics(measurementId: string) {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // We'll send page views manually on route change
  });
}

/**
 * Track a custom GA4 event. No-ops if GA isn't loaded or cookies weren't accepted.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== "accepted") return;
    window.gtag("event", eventName, params);
  } catch {
    // localStorage might be blocked
  }
}

export function Analytics() {
  const location = useLocation();

  // Load GA only if cookies were accepted and measurement ID is configured
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === "accepted") {
      loadGoogleAnalytics(GA_MEASUREMENT_ID);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== "accepted") return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
