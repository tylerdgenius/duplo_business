import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.organization)
  superAdmin: User;

  @OneToMany(() => Product, (product) => product.organization)
  products: Product[];

  @OneToMany(() => Order, (order) => order.organization)
  orders: Order[];

  @OneToMany(() => User, (user) => user.organization)
  staff: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
