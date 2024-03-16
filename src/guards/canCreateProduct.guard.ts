import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolePermissionsService } from 'src/modules/v1/rolePermissions/rolePermissions.service';
import { UserService } from 'src/modules/v1/user/user.service';

@Injectable()
export class CanCreateProductGuard implements CanActivate {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getNext().req;

    console.log({ request });
    return true;
  }
}
