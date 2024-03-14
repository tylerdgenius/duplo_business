import { Controller } from '@nestjs/common';
import { routes } from 'src/helpers';

@Controller(routes.v1.order.entry)
export class OrderController {}
