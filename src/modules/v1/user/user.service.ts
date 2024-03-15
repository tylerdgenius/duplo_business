import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { constants, getters } from 'src/helpers';
import { CreateUserDto } from 'src/dtos';
import { StatusEnums, Types } from 'src/enums';
import { OrganizationService } from '../organization/organization.service';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.REPOSITORY.USER_REPOSITORY)
    private userRepository: Repository<User>,
    private organizationService: OrganizationService,
    private staffService: StaffService,
  ) {}

  async findUserByEmail(email: string) {
    if (!email) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    const encryptedPassword = await hash(
      data.password,
      parseInt(
        getters.getConfigService().get<string>('PASSWORD_ENCRYPTION_SALT'),
      ),
    );

    const user = new User();

    user.password = encryptedPassword;
    user.email = data.email;
    user.role = data.role ? data.role : '';
    user.name = data.name;
    user.publicId = uuidv4();
    user.status = StatusEnums.Default;
    user.type = data.type;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async createStaff(data: CreateUserDto) {
    const organization =
      await this.organizationService.findOrganizationByReference(
        data.organizationReference,
      );

    if (!organization) {
      throw new NotFoundException(
        'Unable to find matching organization. Kindly provide appropriate organization key',
      );
    }

    const savedUser = await this.createUser(data);

    await this.staffService.createStaff(
      savedUser.publicId,
      organization.publicId,
    );

    return savedUser;
  }

  async createBusiness(data: CreateUserDto) {
    const organization = await this.organizationService.findOrganizationByName(
      data.organizationName || data.name,
    );

    if (organization) {
      throw new HttpException(
        'You can not create another root account for an already existing organization. Kindly login to your organization root account',
        HttpStatus.CONFLICT,
      );
    }

    const savedUser = await this.createUser(data);

    await this.organizationService.createOrganization({
      name: data.organizationName || data.name,
      ownerId: savedUser.publicId,
    });

    return savedUser;
  }

  async registerUser(data: CreateUserDto) {
    if (!data) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.findUserByEmail(data.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    if (data.type === Types.Staff) {
      return this.createStaff(data);
    }

    if (data.type === Types.Business) {
      return this.createBusiness(data);
    }
  }
}
