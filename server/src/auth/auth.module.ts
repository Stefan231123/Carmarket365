import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { SecureTokenController } from './secure-token.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'carmarket365-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  controllers: [SecureTokenController],
  exports: [AuthService],
})
export class AuthModule {}