import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarView } from './car-view.entity';
import { Car } from './car.entity';
import { User, UserRole } from '../users/user.entity';

export interface CreateCarViewData {
  carId: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  sessionId?: string;
  countryCode?: string;
  city?: string;
}

@Injectable()
export class CarViewsService {
  constructor(
    @InjectRepository(CarView)
    private readonly carViewRepository: Repository<CarView>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async recordView(viewData: CreateCarViewData): Promise<CarView> {
    // For authenticated users, check if they've already viewed this car
    if (viewData.userId) {
      const existingView = await this.carViewRepository.findOne({
        where: {
          carId: viewData.carId,
          userId: viewData.userId,
        },
      });

      if (existingView) {
        // Update the existing view timestamp
        await this.carViewRepository.update(existingView.id, {
          createdAt: new Date(),
        });
        return this.carViewRepository.findOne({ where: { id: existingView.id } });
      }
    }

    const carView = this.carViewRepository.create(viewData);
    return this.carViewRepository.save(carView);
  }

  async getViewsByCarId(carId: string, user: User): Promise<CarView[]> {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }
    if (car.sellerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only view views for your own cars');
    }

    return this.carViewRepository.find({
      where: { carId },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async getViewCountByCarId(carId: string): Promise<number> {
    return this.carViewRepository.count({
      where: { carId },
    });
  }

  async getUniqueViewCountByCarId(carId: string): Promise<number> {
    const result = await this.carViewRepository
      .createQueryBuilder('view')
      .select('COUNT(DISTINCT COALESCE(view.userId, view.ipAddress))', 'count')
      .where('view.carId = :carId', { carId })
      .getRawOne();

    return parseInt(result.count) || 0;
  }

  async getRecentViews(limit: number = 50): Promise<CarView[]> {
    return this.carViewRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['car', 'user'],
    });
  }

  async getUserViewHistory(userId: string, limit: number = 20): Promise<CarView[]> {
    return this.carViewRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['car'],
    });
  }

  async getPopularCars(limit: number = 10): Promise<{ carId: string; viewCount: number }[]> {
    const result = await this.carViewRepository
      .createQueryBuilder('view')
      .select('view.carId', 'carId')
      .addSelect('COUNT(*)', 'viewCount')
      .groupBy('view.carId')
      .orderBy('viewCount', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map(row => ({
      carId: row.carId,
      viewCount: parseInt(row.viewCount),
    }));
  }
}