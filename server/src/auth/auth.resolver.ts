import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthResponse)
  async socialLogin(
    @Args('provider') provider: string,
    @Args('token') token: string,
    @Args('email') email: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<AuthResponse> {
    return this.authService.socialLogin(provider, token, email, name);
  }

  @Mutation(() => Boolean)
  async sendContactMessage(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('subject') subject: string,
    @Args('inquiryType') inquiryType: string,
    @Args('message') message: string,
    @Args('phone', { nullable: true }) phone?: string,
  ): Promise<boolean> {
    return this.authService.sendContactMessage(name, email, phone, subject, inquiryType, message);
  }

  @Mutation(() => Boolean)
  async requestPasswordReset(
    @Args('email') email: string,
  ): Promise<boolean> {
    return this.authService.requestPasswordReset(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('email') email: string,
    @Args('newPassword') newPassword: string,
  ): Promise<boolean> {
    return this.authService.resetPassword(token, email, newPassword);
  }
}