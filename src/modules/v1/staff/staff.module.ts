import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { staffProviders } from './staff.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [StaffController],
  imports: [DatabaseModule],
  providers: [...staffProviders, StaffService],
})
export class StaffModule {}
