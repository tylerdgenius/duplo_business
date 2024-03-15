import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { routes } from 'src/helpers';
import { ResponseObject } from 'src/models';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { AuthBearer } from 'src/decorators';

@Controller(routes.v1.product.entry)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(routes.v1.product.create)
  createProduct() {}

  @Get(routes.v1.product.getAll)
  getOwnedProducts() {}

  @Get(routes.v1.product.getSingle)
  @AuthBearer()
  async getSingleProduct(
    @Req() req: Request,
    @Param('id', new ValidationPipe()) id: number,
  ): Promise<ResponseObject<Product>> {
    const product = await this.productService.getProduct(id);

    return {
      status: true,
      message: 'Successfully fetched product',
      payload: product,
    };
  }
}
