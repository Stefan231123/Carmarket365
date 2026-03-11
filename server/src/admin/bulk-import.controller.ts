import {
  Controller, Post, UseGuards, UseInterceptors,
  UploadedFile, HttpException, HttpStatus, Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Request } from 'express';
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
