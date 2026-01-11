import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  const corsOrigins = [
    'http://localhost:8081', // Vite dev server
    'http://localhost:3000', // Next.js dev server (for future migration)
    'http://192.168.0.249:8081', // Mobile access
  ];

  // Add production frontend URL if available
  if (process.env.CORS_ORIGIN) {
    corsOrigins.push(...process.env.CORS_ORIGIN.split(','));
  }

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for Railway
  
  const isProduction = process.env.NODE_ENV === 'production';
  const serverUrl = isProduction 
    ? process.env.RAILWAY_STATIC_URL || `http://localhost:${port}`
    : `http://localhost:${port}`;
  
  console.log(`🚀 NestJS GraphQL server running on port ${port}`);
  console.log(`📊 GraphQL Playground: ${serverUrl}/graphql`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS Origins: ${corsOrigins.join(', ')}`);
}

bootstrap();