import { Controller, UseInterceptors } from '@nestjs/common';
import { routes } from 'src/helpers';
import { IsProtectedMiddleware } from 'src/middleware';

@Controller(routes.v1.staff.entry)
@UseInterceptors(IsProtectedMiddleware)
export class StaffController {}
