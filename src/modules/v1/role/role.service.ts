import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { PermissionService } from '../permission/permission.service';
import { CreateRoleDto } from 'src/dtos';
import { Organization } from '../organization/organization.entity';
import { RolePermissionsService } from '../rolePermissions/rolePermissions.service';

@Injectable()
export class RoleService {
  constructor(
    @Inject(constants.REPOSITORY.ROLE_REPOSITORY)
    private roleRepository: Repository<Role>,
    private permissionsService: PermissionService,
    private rolePermissionsService: RolePermissionsService,
  ) {}

  async findOne(filter: Partial<Role>) {
    return this.roleRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  async createRole(
    roleData: CreateRoleDto & {
      organization: Organization;
    },
  ) {
    const role = new Role();
    role.description = roleData.description;
    role.name = roleData.name;
    role.organization = roleData.organization;

    return this.roleRepository.save(role);
  }

  async createSuperAdminRole(organization: Organization) {
    const permissions = await this.permissionsService.getAllPermissions();

    const role = await this.createRole({
      description:
        'This role is the primary role created for every business after their signup',
      name: 'SUPER_ADMIN',
      organization,
    });

    for (let i = 0; i <= permissions.length; i++) {
      await this.rolePermissionsService.createRolePermission({
        role,
        permission: permissions[i],
      });
    }

    return role;
  }

  async createViewRole(organization: Organization) {
    const permissions = await this.permissionsService.getAllViewPermissions();

    const role = await this.createRole({
      description:
        'This role is the primary role created for every normal staff or customer until their roles are altered. It allows them view users, orders or products',
      name: 'VIEWER',
      organization,
    });

    for (let i = 0; i <= permissions.length; i++) {
      await this.rolePermissionsService.createRolePermission({
        role,
        permission: permissions[i],
      });
    }

    return role;
  }
}
