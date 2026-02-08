import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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