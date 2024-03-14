import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  publicId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  initiatorId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  organizationId: string;

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
