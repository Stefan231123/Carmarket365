import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
    const user = await this.usersService.create(registerInput);
    const access_token = this.generateJwtToken(user);

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