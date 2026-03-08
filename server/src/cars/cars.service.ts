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
      .leftJoinAndSelect('car.images', 'images')
      .where('car.isAvailable = :isAvailable', { isAvailable: true })
      .andWhere('(car.quickSale = false OR car.quickSale IS NULL)');

    this.applyFilters(query, filters);

    return query
      .orderBy('car.createdAt', 'DESC')
      .addOrderBy('images.sortOrder', 'ASC')
      .getMany();
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['seller', 'images'],
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async findByMake(make: string): Promise<Car[]> {
    return this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.seller', 'seller')
      .leftJoinAndSelect('car.images', 'images')
      .where('car.make = :make', { make })
      .andWhere('car.isAvailable = :isAvailable', { isAvailable: true })
      .andWhere('(car.quickSale = false OR car.quickSale IS NULL)')
      .orderBy('car.createdAt', 'DESC')
      .addOrderBy('images.sortOrder', 'ASC')
      .getMany();
  }

  async getFeaturedCars(limit: number = 10): Promise<Car[]> {
    return this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.seller', 'seller')
      .leftJoinAndSelect('car.images', 'images')
      .where('car.isFeatured = :isFeatured', { isFeatured: true })
      .andWhere('car.isAvailable = :isAvailable', { isAvailable: true })
      .andWhere('(car.quickSale = false OR car.quickSale IS NULL)')
      .orderBy('car.createdAt', 'DESC')
      .addOrderBy('images.sortOrder', 'ASC')
      .take(limit)
      .getMany();
  }

  async getCarMakes(): Promise<string[]> {
    const result = await this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT car.make', 'make')
      .where('car.isAvailable = :isAvailable', { isAvailable: true })
      .andWhere('(car.quickSale = false OR car.quickSale IS NULL)')
      .orderBy('car.make', 'ASC')
      .getRawMany();

    return result.map(row => row.make);
  }

  async getCarModels(make: string): Promise<string[]> {
    const result = await this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT car.model', 'model')
      .where('car.make = :make AND car.isAvailable = :isAvailable', { make, isAvailable: true })
      .andWhere('(car.quickSale = false OR car.quickSale IS NULL)')
      .orderBy('car.model', 'ASC')
      .getRawMany();

    return result.map(row => row.model);
  }

  async findByUser(userId: string): Promise<Car[]> {
    return this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.seller', 'seller')
      .leftJoinAndSelect('car.images', 'images')
      .where('car.sellerId = :userId', { userId })
      .orderBy('car.createdAt', 'DESC')
      .getMany();
  }

  async findQuickSaleListings(): Promise<Car[]> {
    return this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.seller', 'seller')
      .leftJoinAndSelect('car.images', 'images')
      .where('car.quickSale = :quickSale', { quickSale: true })
      .andWhere('car.isAvailable = :isAvailable', { isAvailable: true })
      .orderBy('car.createdAt', 'DESC')
      .addOrderBy('images.sortOrder', 'ASC')
      .getMany();
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

    if (filters.minMileage) {
      query.andWhere('car.mileage >= :minMileage', { minMileage: filters.minMileage });
    }

    if (filters.maxMileage) {
      query.andWhere('car.mileage <= :maxMileage', { maxMileage: filters.maxMileage });
    }

    if (filters.vehicleType) {
      query.andWhere('car.vehicleType = :vehicleType', { vehicleType: filters.vehicleType });
    }

    if (filters.fuelType) {
      query.andWhere('car.fuelType = :fuelType', { fuelType: filters.fuelType });
    }

    if (filters.transmission) {
      query.andWhere('car.transmission = :transmission', { transmission: filters.transmission });
    }

    if (filters.condition) {
      query.andWhere('car.condition = :condition', { condition: filters.condition });
    }

    if (filters.color) {
      query.andWhere('LOWER(car.color) = LOWER(:color)', { color: filters.color });
    }

    if (filters.isCertified !== undefined) {
      query.andWhere('car.isCertified = :isCertified', { isCertified: filters.isCertified });
    }

    if (filters.location) {
      query.andWhere('LOWER(car.location) LIKE LOWER(:location)', { location: `%${filters.location}%` });
    }

    if (filters.countryCode) {
      // 'global' means visible in every country; also do case-insensitive match for legacy uppercase codes (e.g. 'MK' vs 'mk')
      query.andWhere(
        "(LOWER(car.countryCode) = LOWER(:countryCode) OR car.countryCode IS NULL OR car.countryCode = '' OR LOWER(car.countryCode) = 'global')",
        { countryCode: filters.countryCode },
      );
    }

    if (filters.isFeatured !== undefined) {
      query.andWhere('car.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
    }

    if (filters.minEngineSize) {
      query.andWhere('car.engineSize >= :minEngineSize', { minEngineSize: filters.minEngineSize });
    }

    if (filters.maxEngineSize) {
      query.andWhere('car.engineSize <= :maxEngineSize', { maxEngineSize: filters.maxEngineSize });
    }

    if (filters.minHorsePower) {
      query.andWhere('car.horsePower >= :minHorsePower', { minHorsePower: filters.minHorsePower });
    }

    if (filters.maxHorsePower) {
      query.andWhere('car.horsePower <= :maxHorsePower', { maxHorsePower: filters.maxHorsePower });
    }

    if (filters.doors) {
      query.andWhere('car.doors = :doors', { doors: filters.doors });
    }

    if (filters.seats) {
      query.andWhere('car.seats = :seats', { seats: filters.seats });
    }

    if (filters.drivetrain) {
      query.andWhere('car.drivetrain = :drivetrain', { drivetrain: filters.drivetrain });
    }

    if (filters.maxPreviousOwners) {
      query.andWhere('car.previousOwners <= :maxPreviousOwners', { maxPreviousOwners: filters.maxPreviousOwners });
    }

    if (filters.hadAccident) {
      query.andWhere('car.hadAccident = :hadAccident', { hadAccident: filters.hadAccident });
    }

    if (filters.nonSmokingVehicle !== undefined) {
      query.andWhere('car.nonSmokingVehicle = :nonSmokingVehicle', { nonSmokingVehicle: filters.nonSmokingVehicle });
    }

    if (filters.fullServiceHistory !== undefined) {
      query.andWhere('car.fullServiceHistory = :fullServiceHistory', { fullServiceHistory: filters.fullServiceHistory });
    }

    if (filters.upholsteryType) {
      query.andWhere('car.upholsteryType = :upholsteryType', { upholsteryType: filters.upholsteryType });
    }

    if (filters.paintWorkType) {
      query.andWhere('car.paintWorkType = :paintWorkType', { paintWorkType: filters.paintWorkType });
    }

    if (filters.emissionClass) {
      query.andWhere('car.emissionClass = :emissionClass', { emissionClass: filters.emissionClass });
    }

    if (filters.interiorColor) {
      query.andWhere('LOWER(car.interiorColor) = LOWER(:interiorColor)', { interiorColor: filters.interiorColor });
    }

    if (filters.sellerId) {
      query.andWhere('car.sellerId = :sellerId', { sellerId: filters.sellerId });
    }

    if (filters.minFuelConsumption !== undefined) {
      query.andWhere('car.fuelConsumption >= :minFuelConsumption', { minFuelConsumption: filters.minFuelConsumption });
    }

    if (filters.maxFuelConsumption !== undefined) {
      query.andWhere('car.fuelConsumption <= :maxFuelConsumption', { maxFuelConsumption: filters.maxFuelConsumption });
    }

    if (filters.hasWarranty !== undefined) {
      if (filters.hasWarranty) {
        query.andWhere('car.warrantyMonths > 0');
      } else {
        query.andWhere('(car.warrantyMonths IS NULL OR car.warrantyMonths = 0)');
      }
    }

    if (filters.allowTestDrive !== undefined) {
      query.andWhere('car.allowTestDrive = :allowTestDrive', { allowTestDrive: filters.allowTestDrive });
    }

    if (filters.acceptsTradeIn !== undefined) {
      query.andWhere('car.acceptsTradeIn = :acceptsTradeIn', { acceptsTradeIn: filters.acceptsTradeIn });
    }

    if (filters.priceNegotiable !== undefined) {
      query.andWhere('car.priceNegotiable = :priceNegotiable', { priceNegotiable: filters.priceNegotiable });
    }

    if (filters.quickSale !== undefined) {
      if (filters.quickSale) {
        query.andWhere('car.quickSale = true');
      } else {
        query.andWhere('(car.quickSale = false OR car.quickSale IS NULL)');
      }
    }

    if (filters.features?.length) {
      // Each selected feature must appear in the car's features array
      filters.features.forEach((feature, i) => {
        query.andWhere(`:feat${i} = ANY(car.features)`, { [`feat${i}`]: feature });
      });
    }

    if (filters.sellerType === 'private') {
      query.andWhere('seller.role = :sellerRole', { sellerRole: 'USER' });
    } else if (filters.sellerType === 'dealer') {
      query.andWhere('seller.role = :sellerRole', { sellerRole: 'DEALER' });
    }
  }
}