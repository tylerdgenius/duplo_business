import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/dtos';
import { getters, routes } from 'src/helpers';
import { ResponseObject } from 'src/models';
import { UserService } from './user.service';
import { User } from './user.entity';

console.log({ urls: getters.getConfigService().get('APP_VERSION') });

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(routes.v1.user.create)
  async registerUser(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<ResponseObject<User>> {
    const registeredUser = await this.userService.registerUser(data);

    return {
      code: 200,
      message: 'Successfully registered user',
      payload: registeredUser,
      status: true,
    };
  }

  @Post(routes.v1.user.login)
  async loginUser(
    @Body(new ValidationPipe()) data: LoginUserDto,
  ): Promise<ResponseObject<User>> {
    const loggedInUser = await this.userService.loginUser(data);

    return {
      code: 200,
      message: 'Successfully logged user in',
      payload: loggedInUser,
      status: true,
    };
  }
}
