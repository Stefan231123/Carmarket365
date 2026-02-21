import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { initSentry } from './common/sentry/sentry.service';
import { SentryExceptionFilter } from './common/sentry/sentry-exception.filter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import 'reflect-metadata';

// Initialize Sentry before anything else (only if DSN is configured)
initSentry();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));
  const logger = new Logger('Bootstrap');
  
  // Enable CORS for frontend
  const corsOrigins = [
    'http://localhost:8081', // Vite dev server
    'http://localhost:3000', // Next.js dev server (for future migration)
    'http://192.168.0.249:8081', // Mobile access
    'https://www.carmarket365.com', // Production frontend
    'https://carmarket365.com', // Production frontend (without www)
  ];

  // Add additional production frontend URLs if available
  if (process.env.CORS_ORIGIN) {
    corsOrigins.push(...process.env.CORS_ORIGIN.split(','));
  }

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-CSRF-Token'],
  });

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production', // Only enable CSP in production; disabled in dev for GraphQL playground
    crossOriginEmbedderPolicy: false,
  }));

  // Add cookie parser middleware
  app.use(cookieParser());

  // Add session middleware for CSRF protection
  app.use(session({
    secret: (() => {
      const secret = process.env.SESSION_SECRET;
      if (!secret) {
        throw new Error('SESSION_SECRET environment variable is required. Set it in your .env file.');
      }
      return secret;
    })(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global Sentry exception filter (captures unhandled errors)
  app.useGlobalFilters(new SentryExceptionFilter());

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for Railway
  
  const isProduction = process.env.NODE_ENV === 'production';
  const serverUrl = isProduction 
    ? process.env.RAILWAY_STATIC_URL || `http://localhost:${port}`
    : `http://localhost:${port}`;
  
  logger.log(`NestJS GraphQL server running on port ${port}`);
  logger.log(`GraphQL Playground: ${serverUrl}/graphql`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.debug(`CORS Origins: ${corsOrigins.join(', ')}`);
}

bootstrap();