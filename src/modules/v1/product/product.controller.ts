import { Controller } from '@nestjs/common';
import { routes } from 'src/helpers';

@Controller(routes.v1.product.entry)
export class ProductController {}
