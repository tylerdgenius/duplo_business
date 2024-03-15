import { Controller, Get, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionEnums } from 'src/enums';
import { routes } from 'src/helpers';

const allPermissions = [
  PermissionEnums.CreateOrder,
  PermissionEnums.CreateProduct,
  PermissionEnums.CreateUser,
  PermissionEnums.DeleteOrder,
  PermissionEnums.DeleteProduct,
  PermissionEnums.DeleteUser,
  PermissionEnums.ReadOrder,
  PermissionEnums.ReadProduct,
  PermissionEnums.ReadUser,
  PermissionEnums.UpdateOrder,
  PermissionEnums.UpdateProduct,
  PermissionEnums.UpdateUser,
];

@Controller(routes.v1.permissions.entry)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  async createPermissions() {
    for (let i = 0; i <= allPermissions.length; i++) {
      await this.permissionService.createPermission({
        action: allPermissions[i],
      });
    }

    return {
      status: true,
      message: 'Created all base permissions successfully',
      payload: allPermissions,
    };
  }

  @Get(routes.v1.permissions.getAll)
  async getAllPermissions() {
    const permissions = await this.permissionService.getAllPermissions();

    return {
      status: true,
      message: 'Successfully gotten all base permissions',
      payload: permissions,
    };
  }

  @Get(routes.v1.permissions.getViews)
  async getAllViewPermissions() {
    const permissions = await this.permissionService.getAllViewPermissions();

    return {
      status: true,
      message: 'Successfully gotten all base view permissions',
      payload: permissions,
    };
  }
}
