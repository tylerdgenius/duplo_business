import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Entity()
export class Organization {
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
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  reference: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;
}
