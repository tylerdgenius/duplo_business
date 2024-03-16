import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CanAddPermissionGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (
      !request.headers['x-token'] ||
      request.headers['x-token'] !== 'x-allow-6783'
    ) {
      return false;
    }

    return true;
  }
}
