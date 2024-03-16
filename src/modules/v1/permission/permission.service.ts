import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from 'src/dtos';
import { PermissionEnums } from 'src/enums';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(constants.REPOSITORY.PERMISSION_REPOSITORY)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findOne(filter: Partial<Permission>) {
    return this.permissionRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  async getAllPermissions() {
    return this.permissionRepository.find();
  }

  async getAllViewPermissions() {
    const data = await this.permissionRepository.find({
      where: [
        {
          action: PermissionEnums.ReadOrder,
        },
        {
          action: PermissionEnums.ReadProduct,
        },
        {
          action: PermissionEnums.ReadUser,
        },
      ],
    });

    return data;
  }

  async createPermission(data: CreatePermissionDto) {
    const permissionExists = await this.findOne({
      action: data.action,
    });

    if (permissionExists) {
      throw new ConflictException(
        'Permission already exists. Cannot create same permission twice',
      );
    }

    const permission = new Permission();
    permission.action = data.action;
    this.permissionRepository.save(permission);
  }

  async getCreateProductPermission() {
    return this.permissionRepository.findOne({
      where: {
        action: PermissionEnums.CreateProduct,
      },
    });
  }
}
