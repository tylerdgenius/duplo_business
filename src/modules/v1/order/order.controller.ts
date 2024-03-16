import { Controller } from '@nestjs/common';
import { getters, routes } from 'src/helpers';

@Controller(getters.getRoute([routes.order.entry]))
export class OrderController {}
