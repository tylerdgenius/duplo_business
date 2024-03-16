import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';
import { Organization } from '../organization/organization.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ManyToOne(() => User, (user) => user.orders)
  initiator: User;

  @ManyToOne(() => Organization, (organization) => organization.orders)
  organization: Organization;

  @Column()
  address: string;

  @Column()
  unitPrice: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  status: StatusDto['status'];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
