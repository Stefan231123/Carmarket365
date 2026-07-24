import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { AdminModule } from './admin/admin.module';
import { MessagingModule } from './messaging/messaging.module';
import { EmailModule } from './common/email/email.module';
import { RecaptchaModule } from './common/recaptcha/recaptcha.module';
import { S3Module } from './common/s3/s3.module';
import { HealthModule } from './health/health.module';
import { SubscribersModule } from './common/subscribers/subscribers.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Structured logging (JSON in production, pretty in development)
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true, singleLine: true } }
          : undefined,
        autoLogging: process.env.NODE_ENV === 'production',
        redact: ['req.headers.authorization', 'req.headers.cookie'],
      },
    }),

    // Database configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || undefined,
      // Fallback to individual variables for development
      host: process.env.DATABASE_URL ? undefined : (process.env.DB_HOST || 'localhost'),
      port: process.env.DATABASE_URL ? undefined : (parseInt(process.env.DB_PORT) || 5432),
      username: process.env.DATABASE_URL ? undefined : (process.env.DB_USERNAME || 'postgres'),
      password: process.env.DATABASE_URL ? undefined : (process.env.DB_PASSWORD || 'password'),
      database: process.env.DATABASE_URL ? undefined : (process.env.DB_NAME || 'carmarket365'),
      schema: 'public',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
      migrationsRun: true, // Automatically run pending migrations on startup
      synchronize: false, // Never use synchronize - use migrations instead
      logging: process.env.NODE_ENV === 'development',
      // Connection pooling
      extra: {
        max: parseInt(process.env.DB_POOL_MAX) || 10,
        min: parseInt(process.env.DB_POOL_MIN) || 2,
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
        connectionTimeoutMillis: parseInt(process.env.DB_CONNECT_TIMEOUT) || 5000,
      },
      retryAttempts: 3,
      retryDelay: 3000,
    }),

    // GraphQL configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, '..', 'schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV === 'development',
      introspection: process.env.NODE_ENV === 'development',
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
      context: ({ req, res }) => ({ req, res }),
      csrfPrevention: true, // Requires Content-Type: application/json (blocks simple form POSTs)
      cache: 'bounded',
      plugins: [],
    }),

    // Rate limiting
    ThrottlerModule.forRoot({
      // Disabled under test so the integration suite can make many auth calls.
      skipIf: () => process.env.NODE_ENV === 'test',
      throttlers: [
        {
          name: 'default',
          ttl: 60000,
          limit: 30, // 30 requests per minute per IP (halved from 60)
        },
        {
          name: 'auth',
          ttl: 60000,
          limit: 5, // 5 requests per minute per IP (auth endpoints)
        },
        {
          name: 'scrape', // Very tight limit for bulk listing queries
          ttl: 60000,
          limit: 10,
        },
      ],
    }),

    // Feature modules
    RecaptchaModule,
    EmailModule,
    S3Module,
    AuthModule,
    UsersModule,
    CarsModule,
    AdminModule,
    MessagingModule,
    HealthModule,
    SubscribersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}