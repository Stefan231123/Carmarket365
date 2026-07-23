/**
 * Test environment. Runs before the app is imported so these are set when
 * ConfigModule / data-source read process.env.
 *
 * DATABASE_URL is provided by CI (a Postgres service container). Locally you
 * can point it at any throwaway Postgres. Nothing here touches production.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-not-for-production';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'test-session-secret-not-for-production';
process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/carmarket365_test';

// Leave RESEND_API_KEY / RECAPTCHA_SECRET_KEY / SENTRY_DSN unset so those
// integrations no-op (emails log to console, captcha passes, Sentry disabled).
