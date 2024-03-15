import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { constants, getters } from 'src/helpers';
import { CreateUserDto, LoginUserDto } from 'src/dtos';
import { StatusEnums, TypesEnum } from 'src/enums';
import { OrganizationService } from '../organization/organization.service';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(constants.REPOSITORY.USER_REPOSITORY)
    private userRepository: Repository<User>,
    private organizationService: OrganizationService,
    private roleService: RoleService,
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
    user.status = StatusEnums.Default;
    user.type = data.type;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async createStaff(data: CreateUserDto) {
    if (!data.organizationId) {
      throw new HttpException(
        'Organization id is required when creating a staff',
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedUser = await this.createUser(data);

    const organization = await this.organizationService.findOne({
      id: data.organizationId,
    });

    if (!organization) {
      throw new HttpException(
        'Unable to find matching organization to staff to. Kindly provide appropriate organization key',
        HttpStatus.BAD_REQUEST,
      );
    }

    savedUser.organization = organization;

    const role = await this.roleService.createViewRole(organization);

    savedUser.role = role;

    this.userRepository.save(savedUser);

    return savedUser;
  }

  async createBusiness(data: CreateUserDto) {
    if (!data.organizationName) {
      throw new HttpException(
        'Organization name is required when creating a business account',
        HttpStatus.BAD_REQUEST,
      );
    }

    const organization = await this.organizationService.findOne({
      name: data.organizationName,
    });

    if (organization) {
      throw new HttpException(
        'Organization already exists in database. Kindly provide a unique organization name',
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.createUser(data);

    const createdOrganization =
      await this.organizationService.createOrganization({
        baseUser: user,
        organizationName: data.organizationName,
      });

    const role =
      await this.roleService.createSuperAdminRole(createdOrganization);

    user.role = role;

    user.organization = createdOrganization;

    this.userRepository.save(user);

    return user;
  }

  async registerUser(data: CreateUserDto) {
    if (!data) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userExists = await this.findUserByEmail(data.email);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    if (data.type === TypesEnum.Staff) {
      return this.createStaff(data);
    }

    if (data.type === TypesEnum.Business) {
      return this.createBusiness(data);
    }

    return this.createUser(data);
  }

  async loginUser(data: LoginUserDto): Promise<User & { accessToken: string }> {
    if (!data) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userExists = await this.findUserByEmail(data.email);

    if (!userExists) {
      // Intentionally keeping log in error details vague to disuade attackers from guessing right in most cases
      throw new BadRequestException('Invalid login details');
    }

    const checkPassword = await compare(data.password, userExists.password);

    if (!checkPassword) {
      throw new BadRequestException('Invalid login details');
    }

    const accessToken = sign(
      {
        id: userExists.id,
      },
      getters.getConfigService().get('ACCESS_TOKEN_SECRET'),
      {
        expiresIn: '2h',
      },
    );

    return {
      ...userExists,
      accessToken,
    };
  }
}
