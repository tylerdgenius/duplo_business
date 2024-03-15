import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';
import { Organization } from '../organization/organization.entity';
import { User } from '../user/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.products)
  initiator: User;

  @ManyToOne(() => Organization, (organization) => organization.products)
  organization: Organization;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  status: StatusDto['status'];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;
}
