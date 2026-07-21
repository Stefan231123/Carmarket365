import { Controller, Post, Body, Req, UseGuards, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { IsIn, IsString, IsNotEmpty } from 'class-validator';
import { RestJwtAuthGuard } from '../../auth/guards/rest-jwt-auth.guard';
import { User } from '../../users/user.entity';
import { S3Service, PresignedUpload } from './s3.service';

class PresignRequestDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  contentType: string;
}

@Controller('api/uploads')
export class S3UploadController {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * Issue a short-lived presigned S3 PUT URL. Authenticated users only, so
   * anonymous callers can't write objects into our bucket.
   * POST /api/uploads/presign
   */
  @Post('presign')
  @UseGuards(RestJwtAuthGuard)
  @Throttle({ default: { ttl: 60000, limit: 60 } })
  async presign(@Body() body: PresignRequestDto, @Req() req: Request): Promise<PresignedUpload> {
    const user = (req as any).user as User;
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }
    if (!this.s3Service.isConfigured()) {
      throw new BadRequestException('Image uploads are not configured on the server');
    }

    // Namespace uploads per user — makes abuse traceable and cleanup easy.
    return this.s3Service.createPresignedUpload(`listings/${user.id}`, body.fileName, body.contentType);
  }
}
