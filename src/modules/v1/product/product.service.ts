import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { UserService } from '../user/user.service';
import { CreateProductDto } from 'src/dtos';

@Injectable()
export class ProductService {
  constructor(
    @Inject(constants.REPOSITORY.PRODUCT_REPOSITORY)
    private productRepository: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  async getProductsByOrganizationId(organizationId: number) {
    return this.productRepository.find({
      where: {
        organization: {
          id: organizationId,
        },
      },
    });
  }

  async getProductsByInitiator(initiatorId: number) {
    return this.productRepository.find({
      where: {
        initiator: {
          id: initiatorId,
        },
      },
    });
  }

  async getProduct(productId: number) {
    if (!productId) {
      throw new BadRequestException('Product id is required to fetch data');
    }

    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'Unable to find that product. Kindly select a new product to proceed',
      );
    }

    return product;
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async createProduct(body: CreateProductDto) {
    return 'hi';
  }
}
