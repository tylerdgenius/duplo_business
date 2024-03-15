import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let error = {};
    let message = 'An error occurred';

    if (exception && exception.getStatus) {
      status = exception.getStatus();
      message = 'Internal Server Error';
    }

    if (exception && exception.response && exception.response.message) {
      error = exception.response.message;
    }

    if (exception) {
      error = exception.response;
    }

    response.status(status).json({
      status: false,
      code: status,
      message,
      payload: [{ error }],
    });
  }
}
