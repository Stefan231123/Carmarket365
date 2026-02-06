import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchAlert, AlertFrequency } from './search-alert.entity';

export interface CreateSearchAlertData {
  userId: string;
  name: string;
  filters: any;
  frequency: AlertFrequency;
  isActive?: boolean;
}

export interface UpdateSearchAlertData {
  name?: string;
  filters?: any;
  frequency?: AlertFrequency;
  isActive?: boolean;
  lastTriggered?: Date;
}

@Injectable()
export class SearchAlertsService {
  constructor(
    @InjectRepository(SearchAlert)
    private readonly searchAlertRepository: Repository<SearchAlert>,
  ) {}

  async create(alertData: CreateSearchAlertData): Promise<SearchAlert> {
    const searchAlert = this.searchAlertRepository.create({
      ...alertData,
      isActive: alertData.isActive ?? true,
    });

    return this.searchAlertRepository.save(searchAlert);
  }

  async findById(id: string): Promise<SearchAlert> {
    const alert = await this.searchAlertRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!alert) {
      throw new NotFoundException(`Search alert with ID ${id} not found`);
    }

    return alert;
  }

  async findByUserId(userId: string): Promise<SearchAlert[]> {
    return this.searchAlertRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveAlerts(): Promise<SearchAlert[]> {
    return this.searchAlertRepository.find({
      where: { isActive: true },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateData: UpdateSearchAlertData, userId: string): Promise<SearchAlert> {
    const alert = await this.findById(id);

    // Check if user owns the alert
    if (alert.userId !== userId) {
      throw new ForbiddenException('You can only update your own search alerts');
    }

    await this.searchAlertRepository.update(id, updateData);
    return this.findById(id);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const alert = await this.findById(id);

    // Check if user owns the alert
    if (alert.userId !== userId) {
      throw new ForbiddenException('You can only delete your own search alerts');
    }

    const result = await this.searchAlertRepository.delete(id);
    return result.affected > 0;
  }

  async toggleActive(id: string, userId: string): Promise<SearchAlert> {
    const alert = await this.findById(id);

    // Check if user owns the alert
    if (alert.userId !== userId) {
      throw new ForbiddenException('You can only modify your own search alerts');
    }

    await this.searchAlertRepository.update(id, { isActive: !alert.isActive });
    return this.findById(id);
  }

  async updateLastTriggered(id: string): Promise<SearchAlert> {
    await this.searchAlertRepository.update(id, { 
      lastTriggered: new Date() 
    });
    return this.findById(id);
  }

  async getAlertsByFrequency(frequency: AlertFrequency): Promise<SearchAlert[]> {
    return this.searchAlertRepository.find({
      where: { 
        frequency,
        isActive: true,
      },
      relations: ['user'],
    });
  }

  async getUserAlertCount(userId: string): Promise<number> {
    return this.searchAlertRepository.count({
      where: { userId },
    });
  }

  async getUserActiveAlertCount(userId: string): Promise<number> {
    return this.searchAlertRepository.count({
      where: { 
        userId,
        isActive: true,
      },
    });
  }

  async getAlertsDueForTrigger(): Promise<SearchAlert[]> {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return this.searchAlertRepository
      .createQueryBuilder('alert')
      .where('alert.isActive = :isActive', { isActive: true })
      .andWhere(
        '(alert.frequency = :daily AND (alert.lastTriggered IS NULL OR alert.lastTriggered < :oneDayAgo)) OR ' +
        '(alert.frequency = :weekly AND (alert.lastTriggered IS NULL OR alert.lastTriggered < :oneWeekAgo)) OR ' +
        'alert.frequency = :instant',
        {
          daily: AlertFrequency.DAILY,
          weekly: AlertFrequency.WEEKLY,
          instant: AlertFrequency.INSTANT,
          oneDayAgo,
          oneWeekAgo,
        }
      )
      .getMany();
  }
}