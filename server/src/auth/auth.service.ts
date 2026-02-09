import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/email/email.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginInput.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(user, loginInput.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.generateJwtToken(user);

    return {
      user,
      access_token,
    };
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    // Auto-assign DEALER role if dealer fields are provided, otherwise USER
    const role = registerInput.dealerName ? UserRole.DEALER : UserRole.USER;
    const user = await this.usersService.create(registerInput, role);
    const access_token = this.generateJwtToken(user);

    // Send welcome email (fire-and-forget)
    this.emailService.sendWelcomeEmail(user.email, user.name || '').catch(err =>
      this.logger.warn(`Failed to send welcome email: ${err.message}`),
    );

    return {
      user,
      access_token,
    };
  }

  async socialLogin(
    provider: string,
    token: string,
    email: string,
    name?: string,
  ): Promise<AuthResponse> {
    let verifiedEmail: string;
    let verifiedName: string | undefined;
    let avatarUrl: string | undefined;

    if (provider === 'google') {
      const googleClientId = process.env.GOOGLE_CLIENT_ID;
      if (!googleClientId) {
        throw new UnauthorizedException('Google OAuth is not configured');
      }

      const client = new OAuth2Client(googleClientId);
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: googleClientId,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
          throw new Error('Invalid Google token payload');
        }
        verifiedEmail = payload.email;
        verifiedName = payload.name || name;
        avatarUrl = payload.picture;
      } catch (err) {
        this.logger.warn(`Google token verification failed: ${err}`);
        throw new UnauthorizedException('Invalid Google token');
      }
    } else if (provider === 'facebook') {
      try {
        // Verify token by calling Facebook Graph API
        const fbUrl = `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${encodeURIComponent(token)}`;
        const fbResponse = await fetch(fbUrl);
        const fbData = await fbResponse.json() as any;

        if (fbData.error) {
          throw new Error(fbData.error.message);
        }
        if (!fbData.email) {
          throw new UnauthorizedException('Facebook account must have a verified email address');
        }
        verifiedEmail = fbData.email;
        verifiedName = fbData.name || name;
        avatarUrl = fbData.picture?.data?.url;
      } catch (err) {
        if (err instanceof UnauthorizedException) throw err;
        this.logger.warn(`Facebook token verification failed: ${err}`);
        throw new UnauthorizedException('Invalid Facebook token');
      }
    } else {
      throw new UnauthorizedException(`Unsupported OAuth provider: ${provider}`);
    }

    // Find or create user
    const user = await this.usersService.findOrCreateOAuthUser(
      verifiedEmail,
      verifiedName,
      provider,
      avatarUrl,
    );

    const access_token = this.generateJwtToken(user);

    // Send welcome email for new users (fire-and-forget)
    if (!user.lastLoginAt) {
      this.emailService.sendWelcomeEmail(user.email, user.name || '').catch(err =>
        this.logger.warn(`Failed to send welcome email: ${err.message}`),
      );
    }

    return { user, access_token };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.usersService.findById(userId);
  }

  private generateJwtToken(user: User): string {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role,
    };
    
    return this.jwtService.sign(payload);
  }
}