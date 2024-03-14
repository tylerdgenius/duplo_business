import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { constants } from 'src/helpers';

@Injectable()
export class StaffService {
  constructor(
    @Inject(constants.REPOSITORY.STAFF_REPOSITORY)
    private staffRepository: Repository<Staff>,
  ) {}
}
