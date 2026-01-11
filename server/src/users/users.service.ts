import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
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

  async create(registerInput: RegisterInput): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(registerInput.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerInput.password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...registerInput,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async updateSavedListings(userId: string, carId: string, action: 'add' | 'remove'): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (action === 'add') {
      if (!user.savedListingIds.includes(carId)) {
        user.savedListingIds.push(carId);
      }
    } else {
      user.savedListingIds = user.savedListingIds.filter(id => id !== carId);
    }

    return this.userRepository.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}