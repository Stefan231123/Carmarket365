import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { CarInquiry } from '../cars/car-inquiry.entity';
import { CarView } from '../cars/car-view.entity';
import { AdminStats, RecentActivity, SystemHealth, UserStats } from './dto/admin-stats.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(CarInquiry)
    private carInquiryRepository: Repository<CarInquiry>,
    @InjectRepository(CarView)
    private carViewRepository: Repository<CarView>,
  ) {}

  async getAdminStats(): Promise<AdminStats> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    // Get counts from database
    const [
      totalUsers,
      totalDealers,
      totalListings,
      activeListings,
      pendingListings,
      newUsersThisMonth,
      newUsersThisWeek,
      totalViews,
      totalInquiries,
    ] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.count({ where: { role: UserRole.DEALER } }),
      this.carRepository.count(),
      this.carRepository.count({ where: { isAvailable: true } }),
      this.carRepository.count({ where: { isAvailable: false } }),
      this.userRepository.count({
        where: { createdAt: Between(startOfMonth, now) }
      }),
      this.userRepository.count({
        where: { createdAt: Between(startOfWeek, now) }
      }),
      this.carViewRepository.count(),
      this.carInquiryRepository.count(),
    ]);

    // Calculate average listing price
    const priceResult = await this.carRepository
      .createQueryBuilder('car')
      .select('AVG(car.price)', 'avgPrice')
      .getRawOne();

    const averageListingPrice = parseFloat(priceResult?.avgPrice || '0');

    // Simulate total revenue (in a real app, you'd have a payments/orders table)
    const totalRevenue = totalListings * 50; // Assume $50 per listing fee

    return {
      totalUsers,
      totalDealers,
      totalListings,
      activeListings,
      pendingListings,
      flaggedListings: 0, // Would need a flagged status in car entity
      totalRevenue,
      newUsersThisMonth,
      newUsersThisWeek,
      totalViews,
      totalInquiries,
      averageListingPrice,
    };
  }

  async getRecentActivity(): Promise<RecentActivity[]> {
    // Get recent users
    const recentUsers = await this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    // Get recent car listings
    const recentCars = await this.carRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['seller'],
    });

    // Get recent inquiries
    const recentInquiries = await this.carInquiryRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['car', 'user'],
    });

    const activities: RecentActivity[] = [];

    // Add user registrations
    recentUsers.forEach((user) => {
      activities.push({
        id: `user-${user.id}`,
        action: 'User Registration',
        user: user.name || user.email,
        time: user.createdAt.toISOString(),
        details: `New ${user.role.toLowerCase()} registered`,
        type: 'user',
        entityId: user.id,
      });
    });

    // Add car listings
    recentCars.forEach((car) => {
      activities.push({
        id: `car-${car.id}`,
        action: 'New Listing',
        user: car.seller?.name || 'Unknown User',
        time: car.createdAt.toISOString(),
        details: `${car.year} ${car.make} ${car.model} listed for $${car.price.toLocaleString()}`,
        type: 'listing',
        entityId: car.id,
      });
    });

    // Add inquiries
    recentInquiries.forEach((inquiry) => {
      activities.push({
        id: `inquiry-${inquiry.id}`,
        action: 'Car Inquiry',
        user: inquiry.user?.name || 'Unknown User',
        time: inquiry.createdAt.toISOString(),
        details: `Inquiry about ${inquiry.car?.year} ${inquiry.car?.make} ${inquiry.car?.model}`,
        type: 'inquiry',
        entityId: inquiry.id,
      });
    });

    // Sort by time and return the most recent 15
    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 15);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: 100, // Limit for performance
    });
  }

  async getAllListings(): Promise<Car[]> {
    return this.carRepository.find({
      relations: ['seller'],
      order: { createdAt: 'DESC' },
      take: 100, // Limit for performance
    });
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const now = new Date().toISOString();
    
    // In a real application, you would get these metrics from monitoring tools
    // For now, we'll simulate realistic values
    const cpuUsage = Math.random() * 30 + 10; // 10-40%
    const memoryUsage = Math.random() * 20 + 40; // 40-60%
    const diskUsage = Math.random() * 10 + 20; // 20-30%
    const activeConnections = Math.floor(Math.random() * 50 + 10); // 10-60
    const responseTime = Math.floor(Math.random() * 100 + 50); // 50-150ms
    const errorRate = Math.floor(Math.random() * 2); // 0-2%

    // Determine overall status
    let status = 'healthy';
    if (cpuUsage > 80 || memoryUsage > 90 || errorRate > 5) {
      status = 'critical';
    } else if (cpuUsage > 60 || memoryUsage > 70 || errorRate > 2) {
      status = 'warning';
    }

    return {
      status,
      cpuUsage: Math.round(cpuUsage * 100) / 100,
      memoryUsage: Math.round(memoryUsage * 100) / 100,
      diskUsage: Math.round(diskUsage * 100) / 100,
      activeConnections,
      responseTime,
      errorRate,
      lastUpdated: now,
    };
  }

  async getUserStats(): Promise<UserStats> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalUsers,
      activeUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      newUsersLastMonth,
    ] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.count({ where: { isActive: true } }),
      this.userRepository.count({
        where: { createdAt: Between(startOfDay, now) }
      }),
      this.userRepository.count({
        where: { createdAt: Between(startOfWeek, now) }
      }),
      this.userRepository.count({
        where: { createdAt: Between(startOfMonth, now) }
      }),
      this.userRepository.count({
        where: { createdAt: Between(startOfLastMonth, startOfMonth) }
      }),
    ]);

    // Calculate growth rate
    const userGrowthRate = newUsersLastMonth > 0 
      ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100 
      : 0;

    return {
      totalUsers,
      activeUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      userGrowthRate: Math.round(userGrowthRate * 100) / 100,
    };
  }

  async updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    
    user.isActive = status === 'active';
    return this.userRepository.save(user);
  }

  async flagListing(carId: string, reason: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new Error('Car listing not found');
    }
    
    // In a real app, you'd have a flagged status or separate flagged listings table
    car.isAvailable = false;
    return this.carRepository.save(car);
  }
}