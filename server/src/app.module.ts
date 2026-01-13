import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
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
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in development
      logging: process.env.NODE_ENV === 'development',
    }),

    // GraphQL configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'server/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV === 'development',
      introspection: process.env.NODE_ENV === 'development',
      context: ({ req, res }) => ({ req, res }),
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    CarsModule,
  ],
})
export class AppModule {}