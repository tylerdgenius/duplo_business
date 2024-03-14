import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { constants } from 'src/helpers';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.REPOSITORY.USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}
}
