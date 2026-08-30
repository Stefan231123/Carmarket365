import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import appleSignin from 'apple-signin-auth';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/email/email.service';
import { CrmService } from '../common/crm/crm.service';
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
    private readonly crmService: CrmService,
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

    // Send verification email (fire-and-forget)
    this.sendVerificationToken(user).catch(err =>
      this.logger.warn(`Failed to send verification email: ${err.message}`),
    );

    // Push new dealers into the CRM (fire-and-forget, no-ops if unconfigured)
    if (role === UserRole.DEALER) {
      this.crmService.createDealerCompany({
        name: registerInput.dealerName!,
        address: registerInput.dealerAddress,
        city: registerInput.dealerCity,
        phone: registerInput.dealerPhoneNumber,
        email: registerInput.email,
      }).catch(err => this.logger.warn(`Failed to push dealer to CRM: ${err.message}`));
    }

    return {
      user,
      access_token,
    };
  }

  async verifyEmail(token: string, email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.emailVerificationToken) {
      return false;
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    if (hashedToken !== user.emailVerificationToken) {
      return false;
    }

    await this.usersService.verifyEmail(user.id);
    return true;
  }

  async resendVerificationEmail(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.isEmailVerified) {
      // Don't reveal user existence
      return true;
    }

    await this.sendVerificationToken(user);
    return true;
  }

  private async sendVerificationToken(user: User): Promise<void> {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    await this.usersService.setEmailVerificationToken(user.id, hashedToken);

    await this.emailService.sendVerificationEmail(
      user.email,
      user.name || '',
      rawToken,
    );
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
      // Accept any of the configured client IDs as a valid audience. The mobile
      // app (expo-auth-session) issues per-platform ID tokens whose `aud` is the
      // web, iOS, or Android client ID, so we verify against all of them.
      // GOOGLE_CLIENT_IDS is a comma-separated list; GOOGLE_CLIENT_ID kept for back-compat.
      const googleClientIds = (
        process.env.GOOGLE_CLIENT_IDS ||
        process.env.GOOGLE_CLIENT_ID ||
        ''
      )
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
      if (googleClientIds.length === 0) {
        throw new UnauthorizedException('Google OAuth is not configured');
      }

      const client = new OAuth2Client(googleClientIds[0]);
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: googleClientIds,
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
    } else if (provider === 'apple') {
      // Apple's identity token audience is the app's bundle ID for native Sign in
      // with Apple (as opposed to a web client ID for the browser flow).
      const appleClientIds = (process.env.APPLE_CLIENT_IDS || 'com.carmarket365.app')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);

      try {
        const payload = await appleSignin.verifyIdToken(token, {
          audience: appleClientIds,
        });
        if (!payload.email) {
          throw new Error('Invalid Apple token payload');
        }
        verifiedEmail = payload.email;
        verifiedName = name;
      } catch (err) {
        this.logger.warn(`Apple token verification failed: ${err}`);
        throw new UnauthorizedException('Invalid Apple token');
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

  async sendContactMessage(
    name: string,
    email: string,
    phone: string | undefined,
    subject: string,
    inquiryType: string,
    message: string,
  ): Promise<boolean> {
    const result = await this.emailService.sendContactFormEmail(name, email, phone, subject, inquiryType, message);

    // Send auto-reply confirmation to sender (fire-and-forget)
    this.emailService.sendContactAutoReplyEmail(email, name).catch(err =>
      this.logger.warn(`Failed to send contact auto-reply: ${err.message}`),
    );

    return result;
  }

  async requestPasswordReset(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal whether email exists — always return true
      return true;
    }

    // Generate a secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.usersService.setPasswordResetToken(user.id, hashedToken, expires);

    // Send email with the raw token (user will present it back to verify)
    this.emailService.sendPasswordResetEmail(user.email, user.name || '', rawToken).catch(err =>
      this.logger.warn(`Failed to send password reset email: ${err.message}`),
    );

    return true;
  }

  async resetPassword(token: string, email: string, newPassword: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Check expiry
    if (new Date() > user.passwordResetExpires) {
      throw new UnauthorizedException('Reset token has expired');
    }

    // Verify token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    if (hashedToken !== user.passwordResetToken) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(user.id, hashedPassword);

    // Notify user that their password was changed (security notice)
    this.emailService.sendPasswordChangedEmail(user.email, user.name || '').catch(err =>
      this.logger.warn(`Failed to send password changed email: ${err.message}`),
    );

    return true;
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