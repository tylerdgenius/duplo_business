import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from './order.provider';

@Module({
  controllers: [OrderController],
  imports: [DatabaseModule],
  providers: [...orderProviders, OrderService],
})
export class OrderModule {}
