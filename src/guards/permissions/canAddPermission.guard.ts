import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PermissionEnums, TypesEnum } from 'src/enums';
import { RolePermissionsService } from 'src/modules/v1/rolePermissions/rolePermissions.service';
import { User } from 'src/modules/v1/user/user.entity';

@Injectable()
export class CanAddPermissionGuard implements CanActivate {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request['user'] as User;

    const rolePermissions =
      await this.rolePermissionsService.findRolePermissionsByRoleId(
        user.role.id,
      );

    //Blocking it so that only system admins can add permissions
    if (
      user.type !== TypesEnum.System &&
      rolePermissions.find(
        (_) => _.permission.action === PermissionEnums.CreatePermission,
      )
    ) {
      return false;
    }

    return true;
  }
}
