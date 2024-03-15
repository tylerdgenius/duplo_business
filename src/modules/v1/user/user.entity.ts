import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums, Types } from 'src/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({
    message: 'Public id is required',
  })
  @IsString({
    message: 'Public id must be of type string to proceed',
  })
  @IsUUID('4', {
    message: 'Public id must be a valid uuid',
  })
  publicId: string;

  @Column()
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name must be of type string to proceed',
  })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Email is invalid. Enter valid email to proceed',
    },
  )
  @IsString({
    message: 'Email must be of type string to proceed',
  })
  email: string;

  @Column()
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Password must be of type string to proceed',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must follow this convention - 1 uppercase letter, 1 symbol, 1 number and at least 8 characters in total in order to proceed',
    },
  )
  password: string;

  @Column()
  @IsOptional()
  role?: string;

  @Column({
    type: 'enum',
    enum: Types,
    default: 'business',
  })
  @IsIn([Types.Business, Types.Staff], {
    message: 'Type must be of type "business" or type "staff"',
  })
  @IsNotEmpty({
    message: 'Type property is required',
  })
  @IsString({
    message: 'Type must be of type string to proceed',
  })
  type: string;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  @IsIn([StatusEnums.Archived, StatusEnums.Default, StatusEnums.Deleted], {
    message: 'Status must be of type "archived", "active" or type "deleted"',
  })
  @IsNotEmpty({
    message: 'Status property is required',
  })
  @IsString({
    message: 'Status must be of type string to proceed',
  })
  status: StatusDto['status'];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate({
    message: 'Created at property is required',
  })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate({
    message: 'Updated at property is required',
  })
  updatedAt: Date;
}
