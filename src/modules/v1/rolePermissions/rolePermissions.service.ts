import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { RolePermissions } from './rolePermissions.entity';
import { CreateRolePermissionDto } from 'src/dtos';

@Injectable()
export class RolePermissionsService {
  constructor(
    @Inject(constants.REPOSITORY.ROLE_PERMISSION_REPOSITORY)
    private rolePermissionRepository: Repository<RolePermissions>,
  ) {}

  async findOne(filter: Partial<RolePermissions>) {
    return this.rolePermissionRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  async getAllPermissions() {
    return this.rolePermissionRepository.find();
  }

  async createRolePermission(rolePermissionData: CreateRolePermissionDto) {
    const rolePermission = new RolePermissions();

    rolePermission.permission = rolePermissionData.permission;
    rolePermission.role = rolePermissionData.role;

    return this.rolePermissionRepository.save(rolePermission);
  }
}
