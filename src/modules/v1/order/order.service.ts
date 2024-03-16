import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from 'src/dtos';
import { User } from '../user/user.entity';
import { Organization } from '../organization/organization.entity';
import { ProductService } from '../product/product.service';
import { StatusEnums } from 'src/enums';

@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.REPOSITORY.ORDER_REPOSITORY)
    private orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) {}

  async createOrder(body: CreateOrderDto, user: User) {
    const product = await this.productService.getProduct(body.productId);

    if (!product) {
      throw new BadRequestException(
        'Product not found. Cannot create order for non-existent product',
      );
    }

    const expectedTotalPrice = product.price * body.quantity;
    const passedInTotalPrice = body.unitPrice * body.quantity;

    if (expectedTotalPrice !== passedInTotalPrice) {
      throw new ConflictException(
        'Total price sent in does not match expected total price for that product',
      );
    }

    const order = new Order();

    order.address = body.address;
    order.createdAt = new Date();
    order.updatedAt = new Date();
    order.initiator = user;
    order.organization = user.organization;
    order.product = product;
    order.quantity = body.quantity;
    order.status = StatusEnums.Default;
    order.totalPrice = expectedTotalPrice;
    order.unitPrice = product.price;

    const savedOrder = this.orderRepository.save(order);

    return savedOrder;
  }

  async getCustomerOrders(user: User) {
    const orders = await this.orderRepository.find({
      where: {
        initiator: {
          id: user.id,
        },
      },
    });

    return orders;
  }

  async getOrganizationOrders(organization: Organization) {
    const orders = await this.orderRepository.find({
      where: {
        organization: {
          id: organization.id,
        },
      },
    });

    return orders;
  }

  async getOrganizationSingleOrder(
    organization: Organization,
    orderId: number,
  ) {
    const orders = await this.orderRepository.findOne({
      where: {
        organization,
        id: orderId,
      },
    });

    return orders;
  }

  async getSingleOrder(orderId: number) {
    const orders = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    return orders;
  }

  async getAllOrders() {
    return this.orderRepository.find();
  }
}
