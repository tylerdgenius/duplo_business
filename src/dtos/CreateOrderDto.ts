import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    description: 'This property details the identifier of the product',
  })
  @IsString({
    message: 'productId must be of type string',
  })
  @IsNotEmpty({
    message: 'productId is required',
  })
  productId: number;

  @ApiProperty({
    required: true,
    description: 'This property details the unit price of a single product',
  })
  @IsNumber(
    {},
    {
      message: 'unitPrice must be of type number',
    },
  )
  @IsNotEmpty({
    message: 'unitPrice is required',
  })
  unitPrice: number;

  @ApiProperty({
    required: true,
    description:
      'This property details the total quantity of all products in this order',
  })
  @IsNumber(
    {},
    {
      message: 'quantity must be of type number',
    },
  )
  @IsNotEmpty({
    message: 'quantity is required',
  })
  quantity: number;

  @ApiProperty({
    required: true,
    description:
      'This property details the address of the person ordering the product',
  })
  @IsString({
    message: 'address must be of type string',
  })
  @IsNotEmpty({
    message: 'address is required',
  })
  address: string;
}
