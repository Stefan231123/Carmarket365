import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User, UserRole } from './user.entity';
import { SavedCar } from './saved-car.entity';
import { SearchAlert } from './search-alert.entity';
import { Car } from '../cars/car.entity';
import { CarInquiry } from '../cars/car-inquiry.entity';
import { CarView } from '../cars/car-view.entity';
import { CarImage } from '../cars/car-image.entity';
import { RegisterInput } from '../auth/dto/auth.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SavedCar)
    private readonly savedCarRepository: Repository<SavedCar>,
    @InjectRepository(SearchAlert)
    private readonly searchAlertRepository: Repository<SearchAlert>,
    private readonly dataSource: DataSource,
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

  async setEmailVerificationToken(userId: string, hashedToken: string): Promise<void> {
    await this.userRepository.update(userId, {
      emailVerificationToken: hashedToken,
      isEmailVerified: false,
    });
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      isEmailVerified: true,
      emailVerificationToken: undefined,
    });
  }

  async setPasswordResetToken(userId: string, hashedToken: string, expires: Date): Promise<void> {
    await this.userRepository.update(userId, {
      passwordResetToken: hashedToken,
      passwordResetExpires: expires,
    });
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.userRepository.update(userId, {
      password: hashedPassword,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.password) return false;
    return bcrypt.compare(password, user.password);
  }

  // --- GDPR: Right to Data Portability (Art. 20) ---

  async exportUserData(userId: string): Promise<Record<string, unknown>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['cars', 'cars.images', 'savedCars', 'savedCars.car', 'searchAlerts'],
    });
    if (!user) throw new NotFoundException('User not found');

    const inquiries = await this.dataSource.getRepository(CarInquiry).find({
      where: { userId },
      relations: ['car'],
    });

    const views = await this.dataSource.getRepository(CarView).find({
      where: { userId },
      relations: ['car'],
    });

    // Strip sensitive internal fields
    const { password, passwordResetToken, passwordResetExpires, emailVerificationToken, ...profileData } = user;

    return {
      exportedAt: new Date().toISOString(),
      profile: profileData,
      listings: (user.cars || []).map(car => ({
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        location: car.location,
        createdAt: car.createdAt,
        images: (car.images || []).map(img => ({ url: img.url, isMain: img.isMain })),
      })),
      savedCars: (user.savedCars || []).map(sc => ({
        carId: sc.carId,
        make: sc.car?.make,
        model: sc.car?.model,
        savedAt: sc.createdAt,
      })),
      searchAlerts: (user.searchAlerts || []).map(sa => ({
        name: sa.name,
        make: sa.make,
        model: sa.model,
        priceFrom: sa.priceFrom,
        priceTo: sa.priceTo,
        frequency: sa.frequency,
        isActive: sa.isActive,
        createdAt: sa.createdAt,
      })),
      inquiries: inquiries.map(inq => ({
        carId: inq.carId,
        carMake: inq.car?.make,
        carModel: inq.car?.model,
        type: inq.type,
        message: inq.message,
        status: inq.status,
        createdAt: inq.createdAt,
      })),
      viewHistory: views.map(v => ({
        carId: v.carId,
        viewedAt: v.createdAt,
      })),
      preferences: {
        marketingEmailsEnabled: user.marketingEmailsEnabled,
        smsNotificationsEnabled: user.smsNotificationsEnabled,
        languagePreference: user.languagePreference,
        countryPreference: user.countryPreference,
      },
    };
  }

  // --- GDPR: Right to Erasure / Right to be Forgotten (Art. 17) ---

  async deleteAccount(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['cars', 'cars.images'],
    });
    if (!user) throw new NotFoundException('User not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Anonymize inquiries (preserve for seller records but remove PII)
      await queryRunner.manager.update(CarInquiry, { userId }, {
        userId: null,
        name: '[Deleted User]',
        email: '[deleted]',
        phone: null,
        ipAddress: null,
        userAgent: null,
      } as Partial<CarInquiry>);

      // 2. Anonymize car views
      await queryRunner.manager.update(CarView, { userId }, {
        userId: null,
        ipAddress: null,
        userAgent: null,
      } as Partial<CarView>);

      // 3. Delete car images for user's listings
      for (const car of user.cars || []) {
        await queryRunner.manager.delete(CarImage, { carId: car.id });
      }

      // 4. Delete user's car listings
      await queryRunner.manager.delete(Car, { sellerId: userId });

      // 5. SavedCars and SearchAlerts cascade automatically via onDelete: CASCADE

      // 6. Delete the user account
      await queryRunner.manager.delete(User, { id: userId });

      await queryRunner.commitTransaction();
      this.logger.log(`Account deleted for user ${userId} (GDPR Art. 17)`);
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Failed to delete account for user ${userId}`, error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // --- Preferences ---

  async updateLanguagePreference(
    userId: string,
    languageCode: string,
    countryCode?: string,
  ): Promise<User> {
    await this.userRepository.update(userId, {
      languagePreference: languageCode,
      ...(countryCode ? { countryPreference: countryCode } : {}),
    });
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateCookieConsent(userId: string, accepted: boolean): Promise<User> {
    await this.userRepository.update(userId, {
      cookieConsent: accepted,
      cookieConsentAt: new Date(),
    });
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // --- GDPR: Marketing Preferences ---

  async updateMarketingPreferences(
    userId: string,
    marketingEmails: boolean,
    smsNotifications: boolean,
  ): Promise<User> {
    await this.userRepository.update(userId, {
      marketingEmailsEnabled: marketingEmails,
      smsNotificationsEnabled: smsNotifications,
    });
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}