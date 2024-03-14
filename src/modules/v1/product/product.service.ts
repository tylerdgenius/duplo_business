import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(constants.REPOSITORY.PRODUCT_REPOSITORY)
    private productRepository: Repository<Product>,
  ) {}
}
