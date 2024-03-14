import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  publicId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  initiatorId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  organisationId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  @IsNotEmpty()
  @IsString()
  status: StatusDto['status'];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;
}
