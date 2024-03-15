import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getters } from 'src/helpers';
import { UserService } from 'src/modules/v1/user/user.service';

@Injectable()
export class IsProtectedMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: false,
          message: 'Unauthorized entry not allowed',
          code: HttpStatus.UNAUTHORIZED,
        });
      }

      const splitToken = token.split(' ');

      const verifiedToken = verify(
        splitToken[1],
        getters.getConfigService().get('ACCESS_TOKEN_SECRET'),
      );

      req['initiatorId'] = verifiedToken['id'];

      next();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        mesage: error.message,
        status: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
