import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(constants.REPOSITORY.PRODUCT_REPOSITORY)
    private productRepository: Repository<Product>,
    private readonly userService: UserService,
  ) {}
}
