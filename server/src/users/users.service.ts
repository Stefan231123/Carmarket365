import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { RegisterInput } from '../auth/dto/auth.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['cars'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['cars'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['cars'],
    });
  }

  async create(registerInput: RegisterInput, role: UserRole = UserRole.USER): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(registerInput.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerInput.password, saltRounds);

    // Create user with server-assigned role (never from client input)
    const user = this.userRepository.create({
      ...registerInput,
      password: hashedPassword,
      role,
    });

    return this.userRepository.save(user);
  }

  async updateSavedListings(userId: string, carId: string, action: 'add' | 'remove'): Promise<User> {
    // This method will be replaced with SavedCar entity operations
    // For now, return the user without modification
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOrCreateOAuthUser(
    email: string,
    name: string | undefined,
    provider: string,
    avatarUrl?: string,
  ): Promise<User> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      // Update provider info and last login
      existingUser.authProvider = provider;
      existingUser.lastLoginAt = new Date();
      if (avatarUrl && !existingUser.avatarUrl) {
        existingUser.avatarUrl = avatarUrl;
      }
      return this.userRepository.save(existingUser);
    }

    // Create new OAuth user (no password needed)
    const [firstName, ...lastParts] = (name || email.split('@')[0]).split(' ');
    const lastName = lastParts.join(' ') || undefined;

    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      authProvider: provider,
      avatarUrl,
      role: UserRole.USER,
      isEmailVerified: true, // OAuth emails are pre-verified
      isActive: true,
    });

    return this.userRepository.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.password) return false;
    return bcrypt.compare(password, user.password);
  }
}