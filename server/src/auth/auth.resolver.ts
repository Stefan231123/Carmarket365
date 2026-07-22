import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RecaptchaService } from '../common/recaptcha/recaptcha.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';

// In production the API is served from api.carmarket365.com while the site is
// on www.carmarket365.com. Scoping the cookie to the parent domain makes it
// valid on both, so it counts as first-party rather than a third-party cookie
// (which Safari's tracking prevention and Chrome's 3p-cookie phase-out block).
const COOKIE_DOMAIN =
  process.env.COOKIE_DOMAIN ||
  (process.env.NODE_ENV === 'production' ? '.carmarket365.com' : undefined);

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
  path: '/',
  ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  private setAuthCookie(res: Response, token: string) {
    res.cookie('access_token', token, COOKIE_OPTIONS);
  }

  private clearAuthCookie(res: Response) {
    // Domain must match how the cookie was set, or the browser won't clear it.
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    });
  }

  @Mutation(() => AuthResponse, { description: 'Authenticate with email and password. Sets httpOnly cookie.' })
  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  async login(
    @Args('input') loginInput: LoginInput,
    @Args('captchaToken', { nullable: true }) captchaToken: string | undefined,
    @Context() ctx: { res: Response },
  ): Promise<AuthResponse> {
    const isHuman = await this.recaptchaService.verify(captchaToken, 'login');
    if (!isHuman) {
      throw new UnauthorizedException('CAPTCHA verification failed');
    }
    const result = await this.authService.login(loginInput);
    this.setAuthCookie(ctx.res, result.access_token);
    return result;
  }

  @Mutation(() => AuthResponse, { description: 'Register a new user or dealer account. Requires reCAPTCHA.' })
  @Throttle({ auth: { ttl: 60000, limit: 3 } })
  async register(
    @Args('input') registerInput: RegisterInput,
    @Args('captchaToken', { nullable: true }) captchaToken: string | undefined,
    @Context() ctx: { res: Response },
  ): Promise<AuthResponse> {
    const isHuman = await this.recaptchaService.verify(captchaToken, 'register');
    if (!isHuman) {
      throw new UnauthorizedException('CAPTCHA verification failed');
    }
    const result = await this.authService.register(registerInput);
    this.setAuthCookie(ctx.res, result.access_token);
    return result;
  }

  @Mutation(() => AuthResponse, { description: 'Login or register via Google OAuth.' })
  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  async socialLogin(
    @Args('provider') provider: string,
    @Args('token') token: string,
    @Args('email') email: string,
    @Args('name', { nullable: true }) name: string | undefined,
    @Context() ctx: { res: Response },
  ): Promise<AuthResponse> {
    const result = await this.authService.socialLogin(provider, token, email, name);
    this.setAuthCookie(ctx.res, result.access_token);
    return result;
  }

  @Mutation(() => Boolean, { description: 'Logout and clear authentication cookie.' })
  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  async logout(
    @Context() ctx: { res: Response },
  ): Promise<boolean> {
    this.clearAuthCookie(ctx.res);
    return true;
  }

  @Mutation(() => Boolean)
  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  async sendContactMessage(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('subject') subject: string,
    @Args('inquiryType') inquiryType: string,
    @Args('message') message: string,
    @Args('phone', { nullable: true }) phone?: string,
    @Args('captchaToken', { nullable: true }) captchaToken?: string,
  ): Promise<boolean> {
    const isHuman = await this.recaptchaService.verify(captchaToken, 'contact');
    if (!isHuman) {
      throw new UnauthorizedException('CAPTCHA verification failed');
    }
    return this.authService.sendContactMessage(name, email, phone, subject, inquiryType, message);
  }

  @SkipThrottle({ auth: true })
  @Mutation(() => Boolean)
  async verifyEmail(
    @Args('token') token: string,
    @Args('email') email: string,
  ): Promise<boolean> {
    return this.authService.verifyEmail(token, email);
  }

  @Mutation(() => Boolean)
  @Throttle({ auth: { ttl: 60000, limit: 3 } })
  async resendVerificationEmail(
    @Args('email') email: string,
  ): Promise<boolean> {
    return this.authService.resendVerificationEmail(email);
  }

  @Mutation(() => Boolean)
  @Throttle({ auth: { ttl: 60000, limit: 3 } })
  async requestPasswordReset(
    @Args('email') email: string,
    @Args('captchaToken', { nullable: true }) captchaToken: string | undefined,
  ): Promise<boolean> {
    const isHuman = await this.recaptchaService.verify(captchaToken, 'request_password_reset');
    if (!isHuman) {
      throw new UnauthorizedException('CAPTCHA verification failed');
    }
    return this.authService.requestPasswordReset(email);
  }

  @Mutation(() => Boolean)
  @Throttle({ auth: { ttl: 60000, limit: 3 } })
  async resetPassword(
    @Args('token') token: string,
    @Args('email') email: string,
    @Args('newPassword') newPassword: string,
    @Args('captchaToken', { nullable: true }) captchaToken: string | undefined,
  ): Promise<boolean> {
    const isHuman = await this.recaptchaService.verify(captchaToken, 'reset_password');
    if (!isHuman) {
      throw new UnauthorizedException('CAPTCHA verification failed');
    }
    return this.authService.resetPassword(token, email, newPassword);
  }
}
