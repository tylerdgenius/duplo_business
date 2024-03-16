import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { getters, routes } from 'src/helpers';
import { ResponseObject } from 'src/models';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { AuthBearer } from 'src/decorators';
import { CreateProductDto } from 'src/dtos';
import { CanCreateProductGuard } from 'src/guards';
import { RolePermissionsService } from '../rolePermissions/rolePermissions.service';

@Controller(getters.getRoute(routes.product.entry))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(routes.product.create)
  @UseGuards(CanCreateProductGuard)
  async createProduct(@Body(new ValidationPipe()) body: CreateProductDto) {
    const product = await this.productService.createProduct(body);

    return {
      status: true,
      message: 'Successfully created product',
      payload: product,
    };
  }

  @Get(routes.product.getAll)
  @AuthBearer()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();

    return {
      status: true,
      message: 'Successfully fetched all products',
      payload: products,
    };
  }

  @Get(routes.product.getOwned)
  @AuthBearer()
  async getOwnedProducts(
    @Param('id', new ValidationPipe()) organizationId: number,
  ) {
    const products =
      await this.productService.getProductsByOrganizationId(organizationId);

    return {
      status: true,
      message: 'Successfully fetched owned products',
      payload: products,
    };
  }

  @Get(routes.product.getInitiator)
  @AuthBearer()
  async getInitiatorProducts(
    @Param('id', new ValidationPipe()) initiatorId: number,
  ) {
    const products =
      await this.productService.getProductsByInitiator(initiatorId);

    return {
      status: true,
      message: 'Successfully fetched user posted products',
      payload: products,
    };
  }

  @Get(routes.product.getSingle)
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
