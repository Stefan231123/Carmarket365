import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarInquiry, InquiryType, InquiryStatus } from './car-inquiry.entity';
import { Car } from './car.entity';
import { User } from '../users/user.entity';
import { EmailService } from '../common/email/email.service';

export interface CreateCarInquiryData {
  carId: string;
  inquirerName: string;
  inquirerEmail: string;
  inquirerPhone?: string;
  inquiryType: InquiryType;
  message: string;
  userId?: string;
}

export interface UpdateCarInquiryData {
  status?: InquiryStatus;
  response?: string;
}

@Injectable()
export class CarInquiriesService {
  private readonly logger = new Logger(CarInquiriesService.name);

  constructor(
    @InjectRepository(CarInquiry)
    private readonly carInquiryRepository: Repository<CarInquiry>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly emailService: EmailService,
  ) {}

  async create(inquiryData: CreateCarInquiryData): Promise<CarInquiry> {
    const inquiry = this.carInquiryRepository.create({
      carId: inquiryData.carId,
      name: inquiryData.inquirerName,
      email: inquiryData.inquirerEmail,
      phone: inquiryData.inquirerPhone,
      type: inquiryData.inquiryType,
      message: inquiryData.message,
      userId: inquiryData.userId,
      status: InquiryStatus.PENDING,
    });

    const saved = await this.carInquiryRepository.save(inquiry);

    // Send email notification to the seller (fire-and-forget)
    this.notifySeller(inquiryData).catch(err =>
      this.logger.warn(`Failed to send inquiry notification email: ${err.message}`),
    );

    return saved;
  }

  private async notifySeller(inquiryData: CreateCarInquiryData): Promise<void> {
    const car = await this.carRepository.findOne({
      where: { id: inquiryData.carId },
      relations: ['seller'],
    });
    if (!car?.seller?.email) return;

    const carTitle = `${car.year} ${car.make} ${car.model}`;
    await this.emailService.sendInquiryNotification(
      car.seller.email,
      carTitle,
      inquiryData.inquirerName,
      inquiryData.inquirerEmail,
      inquiryData.message,
      inquiryData.inquirerPhone,
    );
  }

  async findById(id: string): Promise<CarInquiry> {
    const inquiry = await this.carInquiryRepository.findOne({
      where: { id },
      relations: ['car', 'user'],
    });

    if (!inquiry) {
      throw new NotFoundException(`Car inquiry with ID ${id} not found`);
    }

    return inquiry;
  }

  async findByCarId(carId: string): Promise<CarInquiry[]> {
    return this.carInquiryRepository.find({
      where: { carId },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async findByUserId(userId: string): Promise<CarInquiry[]> {
    return this.carInquiryRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['car'],
    });
  }

  async findByCarOwnerId(carOwnerId: string): Promise<CarInquiry[]> {
    return this.carInquiryRepository
      .createQueryBuilder('inquiry')
      .leftJoinAndSelect('inquiry.car', 'car')
      .leftJoinAndSelect('inquiry.user', 'user')
      .where('car.sellerId = :carOwnerId', { carOwnerId })
      .orderBy('inquiry.createdAt', 'DESC')
      .getMany();
  }

  async updateStatus(
    id: string, 
    updateData: UpdateCarInquiryData, 
    user: User
  ): Promise<CarInquiry> {
    const inquiry = await this.findById(id);

    // Check if user owns the car being inquired about
    if (inquiry.car.sellerId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('You can only update inquiries for your own cars');
    }

    await this.carInquiryRepository.update(id, updateData);
    const updated = await this.findById(id);

    // Notify the inquirer when the seller replies
    if (updateData.status === InquiryStatus.REPLIED && updateData.response) {
      const carTitle = `${inquiry.car.year} ${inquiry.car.make} ${inquiry.car.model}`;
      this.emailService.sendInquiryReplyEmail(
        inquiry.email,
        inquiry.name,
        carTitle,
        updateData.response,
        inquiry.carId,
      ).catch(err => this.logger.warn(`Failed to send inquiry reply email: ${err.message}`));
    }

    return updated;
  }

  async remove(id: string, user: User): Promise<boolean> {
    const inquiry = await this.findById(id);

    // Check if user owns the car or made the inquiry or is admin
    const canDelete = 
      inquiry.car.sellerId === user.id || 
      inquiry.userId === user.id || 
      user.role === 'ADMIN';

    if (!canDelete) {
      throw new ForbiddenException('You can only delete your own inquiries');
    }

    const result = await this.carInquiryRepository.delete(id);
    return result.affected > 0;
  }

  async getInquiryStats(carId?: string): Promise<{
    total: number;
    pending: number;
    responded: number;
    closed: number;
  }> {
    const query = this.carInquiryRepository.createQueryBuilder('inquiry');
    
    if (carId) {
      query.where('inquiry.carId = :carId', { carId });
    }

    const [total, pending, responded, closed] = await Promise.all([
      query.getCount(),
      query.andWhere('inquiry.status = :status', { status: InquiryStatus.PENDING }).getCount(),
      query.andWhere('inquiry.status = :status', { status: InquiryStatus.REPLIED }).getCount(),
      query.andWhere('inquiry.status = :status', { status: InquiryStatus.CLOSED }).getCount(),
    ]);

    return { total, pending, responded, closed };
  }

  async getRecentInquiries(limit: number = 20): Promise<CarInquiry[]> {
    return this.carInquiryRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['car', 'user'],
    });
  }
}