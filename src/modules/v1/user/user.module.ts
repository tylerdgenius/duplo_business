import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationModule } from '../organization';
import { RolePermissionsModule } from '../rolePermissions';
import { RoleModule } from '../role';
import { PermissionModule } from '../permission';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
    OrganizationModule,
    RolePermissionsModule,
    RoleModule,
    PermissionModule,
  ],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
