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
    // Inner-join car so rows whose car has been hard-deleted are dropped from
    // the result, and require car.isAvailable so cars that were marked
    // hidden/sold stop showing up in the saved list. Also opportunistically
    // clean up any orphan SavedCar rows we find (legacy data from before the
    // cars.service delete path was cascading to saved_car).
    const rows = await this.savedCarRepository
      .createQueryBuilder('saved')
      .innerJoinAndSelect('saved.car', 'car')
      .leftJoinAndSelect('car.images', 'images')
      .leftJoinAndSelect('car.seller', 'seller')
      .where('saved.userId = :userId', { userId })
      .andWhere('car.isAvailable = :isAvailable', { isAvailable: true })
      .orderBy('saved.createdAt', 'DESC')
      .addOrderBy('images.sortOrder', 'ASC')
      .getMany();

    // Fire-and-forget orphan cleanup: any saved_car whose carId no longer
    // points at a real car (or points at an unavailable one). Keeps the DB
    // tidy without blocking the response.
    this.savedCarRepository
      .createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .andWhere(
        `carId NOT IN (SELECT id FROM cars WHERE "isAvailable" = true)`,
      )
      .execute()
      .catch(() => { /* best-effort cleanup */ });

    return rows;
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

  async getUsersWhoSavedCar(carId: string): Promise<SavedCar[]> {
    return this.savedCarRepository.find({
      where: { carId },
      relations: ['user'],
    });
  }
}