import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isError } from 'util';
import jwt from 'jsonwebtoken';
import { getters } from 'src/helpers';

@Injectable()
export class IsProtectedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    try {
      const token = req.headers.authorization;

      if (!token) {
        statusCode = HttpStatus.UNAUTHORIZED;
        throw new Error('Unauthorized entry not allowed');
      }

      const verifiedToken = jwt.verify(
        token,
        getters.getConfigService().get('ACCESS_TOKEN_SECRET'),
      );

      req['user']['initiatorId'] = verifiedToken['id'];
      req['user']['initiatorPublicId'] = verifiedToken['publicId'];

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
