import { Controller } from '@nestjs/common';
import { routes } from 'src/helpers';

@Controller(routes.v1.staff.entry)
export class StaffController {}
