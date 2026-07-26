import { Module } from '@nestjs/common';
import { S3Module } from '../common/s3/s3.module';
import { BackupService } from './backup.service';
import { BackupResolver } from './backup.resolver';

@Module({
  imports: [S3Module],
  providers: [BackupService, BackupResolver],
  exports: [BackupService],
})
export class BackupModule {}
