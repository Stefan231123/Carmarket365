import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Car } from './car.entity';
import { User } from '../users/user.entity';
import { CreateCarInput, UpdateCarInput, CarFilterInput } from './dto/car.input';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async findAll(filters?: CarFilterInput): Promise<Car[]> {
    const query = this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.seller', 'seller')
      .where('car.isAvailable = :isAvailable', { isAvailable: true });

    this.applyFilters(query, filters);

    return query
      .orderBy('car.createdAt', 'DESC')
      .getMany();
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['seller'],
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async findByMake(make: string): Promise<Car[]> {
    return this.carRepository.find({
      where: { make, isAvailable: true },
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });
  }

  async getFeaturedCars(limit: number = 10): Promise<Car[]> {
    return this.carRepository.find({
      where: { isFeatured: true, isAvailable: true },
      relations: ['seller'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getCarMakes(): Promise<string[]> {
    const result = await this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT car.make', 'make')
      .where('car.isAvailable = :isAvailable', { isAvailable: true })
      .orderBy('car.make', 'ASC')
      .getRawMany();

    return result.map(row => row.make);
  }

  async getCarModels(make: string): Promise<string[]> {
    const result = await this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT car.model', 'model')
      .where('car.make = :make AND car.isAvailable = :isAvailable', { 
        make, 
        isAvailable: true 
      })
      .orderBy('car.model', 'ASC')
      .getRawMany();

    return result.map(row => row.model);
  }

  async create(createCarInput: CreateCarInput, seller: User): Promise<Car> {
    const car = this.carRepository.create({
      ...createCarInput,
      sellerId: seller.id,
      seller,
    });

    return this.carRepository.save(car);
  }

  async update(id: string, updateCarInput: UpdateCarInput, user: User): Promise<Car> {
    const car = await this.findById(id);

    // Check if user owns the car or is admin
    if (car.sellerId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own cars');
    }

    await this.carRepository.update(id, updateCarInput);
    return this.findById(id);
  }

  async remove(id: string, user: User): Promise<boolean> {
    const car = await this.findById(id);

    // Check if user owns the car or is admin
    if (car.sellerId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own cars');
    }

    await this.carRepository.delete(id);
    return true;
  }

  private applyFilters(query: SelectQueryBuilder<Car>, filters?: CarFilterInput): void {
    if (!filters) return;

    if (filters.make) {
      query.andWhere('LOWER(car.make) = LOWER(:make)', { make: filters.make });
    }

    if (filters.model) {
      query.andWhere('LOWER(car.model) = LOWER(:model)', { model: filters.model });
    }

    if (filters.minYear) {
      query.andWhere('car.year >= :minYear', { minYear: filters.minYear });
    }

    if (filters.maxYear) {
      query.andWhere('car.year <= :maxYear', { maxYear: filters.maxYear });
    }

    if (filters.minPrice) {
      query.andWhere('car.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters.maxPrice) {
      query.andWhere('car.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters.maxMileage) {
      query.andWhere('car.mileage <= :maxMileage', { maxMileage: filters.maxMileage });
    }

    if (filters.fuelType) {
      query.andWhere('LOWER(car.fuelType) = LOWER(:fuelType)', { fuelType: filters.fuelType });
    }

    if (filters.transmission) {
      query.andWhere('LOWER(car.transmission) = LOWER(:transmission)', { transmission: filters.transmission });
    }

    if (filters.bodyType) {
      query.andWhere('LOWER(car.bodyType) = LOWER(:bodyType)', { bodyType: filters.bodyType });
    }

    if (filters.location) {
      query.andWhere('LOWER(car.location) LIKE LOWER(:location)', { location: `%${filters.location}%` });
    }

    if (filters.countryCode) {
      query.andWhere('car.countryCode = :countryCode', { countryCode: filters.countryCode });
    }

    if (filters.isFeatured !== undefined) {
      query.andWhere('car.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
    }
  }
}