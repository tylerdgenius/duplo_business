import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationModule } from '../organization';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, OrganizationModule],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
