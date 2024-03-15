import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './product.provider';
import { UserModule } from '../user';

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule, UserModule],
  providers: [...productProviders, ProductService],
})
export class ProductModule {}
