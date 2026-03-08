import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedCar } from './saved-car.entity';
import { User } from './user.entity';

@Injectable()
export class SavedCarsService {
  constructor(
    @InjectRepository(SavedCar)
    private readonly savedCarRepository: Repository<SavedCar>,
  ) {}

  async saveCar(userId: string, carId: string): Promise<SavedCar> {
    // Check if car is already saved
    const existingSave = await this.savedCarRepository.findOne({
      where: { userId, carId },
    });

    if (existingSave) {
      throw new BadRequestException('Car is already saved');
    }

    const savedCar = this.savedCarRepository.create({ userId, carId });
    return this.savedCarRepository.save(savedCar);
  }

  async unsaveCar(userId: string, carId: string): Promise<boolean> {
    const result = await this.savedCarRepository.delete({ userId, carId });
    return result.affected > 0;
  }

  async getUserSavedCars(userId: string): Promise<SavedCar[]> {
    return this.savedCarRepository.find({
      where: { userId },
      relations: ['car', 'car.images', 'car.seller'],
      order: { createdAt: 'DESC' },
    });
  }

  async isCarSaved(userId: string, carId: string): Promise<boolean> {
    const count = await this.savedCarRepository.count({
      where: { userId, carId },
    });
    return count > 0;
  }

  async getSavedCarCount(userId: string): Promise<number> {
    return this.savedCarRepository.count({
      where: { userId },
    });
  }

  async getCarSaveCount(carId: string): Promise<number> {
    return this.savedCarRepository.count({
      where: { carId },
    });
  }

  async getMostSavedCars(limit: number = 10): Promise<{ carId: string; saveCount: number }[]> {
    const result = await this.savedCarRepository
      .createQueryBuilder('saved')
      .select('saved.carId', 'carId')
      .addSelect('COUNT(*)', 'saveCount')
      .groupBy('saved.carId')
      .orderBy('saveCount', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map(row => ({
      carId: row.carId,
      saveCount: parseInt(row.saveCount),
    }));
  }

  async clearUserSavedCars(userId: string): Promise<boolean> {
    const result = await this.savedCarRepository.delete({ userId });
    return result.affected > 0;
  }
}