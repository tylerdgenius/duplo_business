import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isError } from 'util';
import { UserService } from 'src/modules/v1/user/user.service';

@Injectable()
export class IsProtectedMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  use(req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;

    try {
      const user = req['user'];

      statusCode = 200;

      console.log(user);

      next();
    } catch (error) {
      let errorMessage = 'Unable to validate user authorization status';

      if (isError(error)) {
        errorMessage = error.message;
      }

      throw new HttpException(errorMessage, statusCode);
    }
  }
}
