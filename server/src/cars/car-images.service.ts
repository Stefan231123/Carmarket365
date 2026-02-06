import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarImage } from './car-image.entity';

@Injectable()
export class CarImagesService {
  constructor(
    @InjectRepository(CarImage)
    private readonly carImageRepository: Repository<CarImage>,
  ) {}

  async findByCarId(carId: string): Promise<CarImage[]> {
    return this.carImageRepository.find({
      where: { carId },
      order: { sortOrder: 'ASC' },
    });
  }

  async findById(id: string): Promise<CarImage> {
    const carImage = await this.carImageRepository.findOne({
      where: { id },
      relations: ['car'],
    });

    if (!carImage) {
      throw new NotFoundException(`Car image with ID ${id} not found`);
    }

    return carImage;
  }

  async create(carImageData: Partial<CarImage>): Promise<CarImage> {
    const carImage = this.carImageRepository.create(carImageData);
    return this.carImageRepository.save(carImage);
  }

  async update(id: string, updateData: Partial<CarImage>): Promise<CarImage> {
    await this.carImageRepository.update(id, updateData);
    return this.findById(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.carImageRepository.delete(id);
    return result.affected > 0;
  }

  async reorderImages(carId: string, imageOrders: { id: string; order: number }[]): Promise<CarImage[]> {
    const updatePromises = imageOrders.map(({ id, order }) =>
      this.carImageRepository.update(id, { sortOrder: order })
    );

    await Promise.all(updatePromises);
    return this.findByCarId(carId);
  }
}