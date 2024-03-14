import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  staffId: string;

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
