import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { permissionProviders } from './permission.provider';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionController } from './permission.controller';

@Module({
  controllers: [PermissionController],
  imports: [DatabaseModule],
  providers: [...permissionProviders, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
