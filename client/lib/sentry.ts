import * as Sentry from "@sentry/react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || "https://6aa21f5c56b76af9cec1400b2f84f1a6@o4510857157804032.ingest.de.sentry.io/4510857167306832";

export function initSentry() {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
    ],
    tracesSampleRate: 0.1, // 10% of transactions
    replaysSessionSampleRate: 0.05, // 5% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    beforeSend(event) {
      // Don't send events in development
      if (import.meta.env.DEV) {
        console.warn("[Sentry] Event suppressed in dev:", event);
        return null;
      }
      return event;
    },
  });
}

export { Sentry };
