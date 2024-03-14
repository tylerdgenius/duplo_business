import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus() || 500;

    response.status(status).json({
      code: status,
      message: exception.message || 'Internal Server Error',
      payload: [{ error: exception.response.message }],
    });
  }
}
