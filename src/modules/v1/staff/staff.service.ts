import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { constants } from 'src/helpers';

@Injectable()
export class StaffService {
  constructor(
    @Inject(constants.REPOSITORY.STAFF_REPOSITORY)
    private staffRepository: Repository<Staff>,
  ) {}

  findStaffById(staffPublicId: string) {
    return this.staffRepository.findOne({
      where: {
        staffId: staffPublicId,
      },
    });
  }

  async createStaff(staffId: string, organizationId: string) {
    if (!staffId || !organizationId) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const foundStaff = await this.findStaffById(staffId);

    if (foundStaff) {
      throw new HttpException(
        'Staff already attached to an organization',
        HttpStatus.CONFLICT,
      );
    }

    const staff = new Staff();

    staff.organizationId = organizationId;
    staff.staffId = staffId;
    staff.status = 'active';
    staff.createdAt = new Date();
    staff.updatedAt = new Date();

    const staffCreation = await this.staffRepository.save(staff);

    return staffCreation;
  }
}
