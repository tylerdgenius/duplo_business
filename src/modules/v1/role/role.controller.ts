import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { routes } from 'src/helpers';

@Controller(routes.v1.roles.entry)
export class RoleController {
  constructor(private readonly permissionsService: RoleService) {}
}
