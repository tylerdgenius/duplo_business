import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';

@Entity()
export class User {
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
  @IsEmail()
  @IsString()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

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
