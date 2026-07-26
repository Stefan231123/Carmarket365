import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Resolver()
export class BackupResolver {
  constructor(private readonly backup: BackupService) {}

  @Mutation(() => String, {
    description: 'Admin: run a database backup to S3 immediately. Returns the backup object key and size.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async runDatabaseBackup(): Promise<string> {
    const r = await this.backup.runBackup();
    return `${r.key} (${(r.bytes / 1024 / 1024).toFixed(2)} MB)`;
  }
}
