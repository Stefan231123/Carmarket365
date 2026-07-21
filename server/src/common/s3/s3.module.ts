import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3UploadController } from './s3-upload.controller';

@Module({
  providers: [S3Service],
  controllers: [S3UploadController],
  exports: [S3Service],
})
export class S3Module {}
