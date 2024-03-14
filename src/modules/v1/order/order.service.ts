import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.REPOSITORY.ORDER_REPOSITORY)
    private orderRepository: Repository<Order>,
  ) {}
}
