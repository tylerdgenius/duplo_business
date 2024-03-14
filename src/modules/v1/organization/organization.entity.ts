import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

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
