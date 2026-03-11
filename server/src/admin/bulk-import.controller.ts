import {
  Controller, Get, Post, UseGuards, UseInterceptors,
  UploadedFile, HttpException, HttpStatus, Req, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { RestJwtAuthGuard } from '../auth/guards/rest-jwt-auth.guard';
import { User, UserRole } from '../users/user.entity';
import { BulkImportService, ImportPreview, ImportResult } from './bulk-import.service';

@Controller('api/admin/bulk-import')
@UseGuards(RestJwtAuthGuard)
export class BulkImportController {
  constructor(private readonly bulkImportService: BulkImportService) {}

  /**
   * Parse & normalize the Excel file, return a preview without writing anything.
   * POST /api/admin/bulk-import/preview
   * Body: multipart/form-data  field name: "file"
   */
  @Post('preview')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async preview(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ImportPreview> {
    this.requireAdmin(req);
    if (!file) throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    this.validateExcelFile(file);

    try {
      return await this.bulkImportService.preview(file.buffer);
    } catch (err) {
      throw new HttpException(`Parse error: ${err.message}`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  /**
   * Parse, normalize, and commit all valid rows to the database.
   * POST /api/admin/bulk-import/execute
   * Body: multipart/form-data  field name: "file"
   */
  @Post('execute')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async execute(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ImportResult> {
    this.requireAdmin(req);
    if (!file) throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    this.validateExcelFile(file);

    try {
      return await this.bulkImportService.execute(file.buffer);
    } catch (err) {
      throw new HttpException(`Import error: ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Download a pre-filled Excel template with headers + 2 example rows.
   * GET /api/admin/bulk-import/template
   */
  @Get('template')
  async downloadTemplate(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.requireAdmin(req);

    const headers = [
      // Required
      'make', 'model', 'year', 'price', 'mileage', 'fuelType', 'transmission', 'location', 'seller_email',
      // Optional — vehicle details
      'vehicleType', 'condition', 'variant', 'color', 'engineSize', 'horsePower',
      'doors', 'seats', 'drivetrain', 'vin',
      // Optional — extras
      'features', 'safetyFeatures',
      // Optional — listing info
      'description', 'priceNegotiable', 'previousOwners', 'hadAccident',
      'contactPhone', 'image_urls',
      // Optional — seller info (for new profiles)
      'seller_name', 'seller_phone',
    ];

    const examples = [
      {
        make: 'Volkswagen', model: 'Golf', year: 2019, price: 13500, mileage: 87000,
        fuelType: 'diesel', transmission: 'manual', location: 'Skopje', seller_email: 'seller@example.com',
        vehicleType: 'hatchback', condition: 'used', variant: 'Comfortline', color: 'Silver',
        engineSize: 1968, horsePower: 115, doors: 5, seats: 5, drivetrain: 'fwd', vin: '',
        features: 'Air Conditioning, Bluetooth, Cruise Control',
        safetyFeatures: 'ABS, Driver Airbag, Passenger Airbag',
        description: 'Well maintained, one owner, full service history.',
        priceNegotiable: 'yes', previousOwners: 1, hadAccident: 'no',
        contactPhone: '+38970123456',
        image_urls: 'https://example.com/img1.jpg,https://example.com/img2.jpg',
        seller_name: 'Marko Petrovski', seller_phone: '+38970123456',
      },
      {
        make: 'BMW', model: '3 Series', year: 2021, price: 28900, mileage: 42000,
        fuelType: 'benzin', transmission: 'automatic', location: 'Bitola', seller_email: 'dealer@showroom.com',
        vehicleType: 'sedan', condition: 'used', variant: '320i M-Sport', color: 'Black',
        engineSize: 1998, horsePower: 184, doors: 4, seats: 5, drivetrain: 'rwd', vin: 'WBA1A2C55FV271000',
        features: 'Leather Seats, GPS Navigation, Sunroof, Keyless Entry, Heated Seats',
        safetyFeatures: 'ABS, ESP/ESC, Driver Airbag, Passenger Airbag, Lane Departure Warning',
        description: 'Ex-company car, immaculate condition, panoramic roof.',
        priceNegotiable: 'no', previousOwners: 1, hadAccident: 'no',
        contactPhone: '+38971987654',
        image_urls: 'https://example.com/bmw1.jpg',
        seller_name: 'Auto Showroom Bitola', seller_phone: '+38971987654',
      },
    ];

    const wb = XLSX.utils.book_new();

    // ── Listings sheet ─────────────────────────────────────────────────────────
    const ws = XLSX.utils.json_to_sheet(examples, { header: headers });

    // Style the header row (bold + background) — basic column width hints
    const colWidths = headers.map(h => ({ wch: Math.max(h.length + 2, 18) }));
    colWidths[headers.indexOf('description')] = { wch: 40 };
    colWidths[headers.indexOf('features')] = { wch: 45 };
    colWidths[headers.indexOf('safetyFeatures')] = { wch: 45 };
    colWidths[headers.indexOf('image_urls')] = { wch: 50 };
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Listings');

    // ── Reference sheet with allowed values ───────────────────────────────────
    const refData = [
      { field: 'fuelType', allowed_values: 'diesel, benzin, petrol, electric, hybrid, lpg, cng' },
      { field: 'transmission', allowed_values: 'manual, automatic, dsg, cvt, semi-automatic' },
      { field: 'vehicleType', allowed_values: 'sedan, hatchback, suv, kombi, van, coupe, convertible, car, truck, motorcycle' },
      { field: 'drivetrain', allowed_values: 'fwd, rwd, awd, 4wd' },
      { field: 'condition', allowed_values: 'new, used, certified, damaged' },
      { field: 'priceNegotiable', allowed_values: 'yes / no' },
      { field: 'hadAccident', allowed_values: 'yes / no / unknown' },
      { field: '', allowed_values: '' },
      { field: 'features (pick any)', allowed_values: 'Air Conditioning, Leather Seats, Heated Seats, Sunroof, GPS Navigation, Backup Camera, Bluetooth, USB Ports, Premium Sound System, Keyless Entry, Remote Start, Cruise Control, Parking Sensors, Blind Spot Monitoring' },
      { field: 'safetyFeatures (pick any)', allowed_values: 'ABS, ESP/ESC, Driver Airbag, Passenger Airbag, Side Airbags, Head/Curtain Airbags, Blind Spot Monitor, Lane Departure Warning, Emergency Braking, Parking Sensors, Backup Camera, 360° Camera, Tire Pressure Monitor' },
    ];
    const wsRef = XLSX.utils.json_to_sheet(refData, { header: ['field', 'allowed_values'] });
    wsRef['!cols'] = [{ wch: 28 }, { wch: 100 }];
    XLSX.utils.book_append_sheet(wb, wsRef, 'Reference');

    // Use 'binary' + manual Buffer conversion — more reliable than type:'buffer'
    const binaryStr = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const buffer = Buffer.from(binaryStr, 'binary');

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="bulk-import-template.xlsx"',
      'Content-Length': String(buffer.length),
    });
    res.end(buffer);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private requireAdmin(req: Request): void {
    const user = (req as any).user as User;
    if (!user || user.role !== UserRole.ADMIN) {
      throw new HttpException('Admin access required', HttpStatus.FORBIDDEN);
    }
  }

  private validateExcelFile(file: Express.Multer.File): void {
    const allowed = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/octet-stream',
    ];
    const ext = file.originalname.split('.').pop()?.toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(ext ?? '') && !allowed.includes(file.mimetype)) {
      throw new HttpException('File must be .xlsx, .xls, or .csv', HttpStatus.BAD_REQUEST);
    }
    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      throw new HttpException('File too large (max 10 MB)', HttpStatus.BAD_REQUEST);
    }
  }
}
