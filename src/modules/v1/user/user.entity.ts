import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { StatusEnums, TypesEnum } from 'src/enums';
import { Organization } from '../organization/organization.entity';
import { Product } from '../product/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role?: string;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: TypesEnum,
    default: TypesEnum.User,
  })
  type: string;

  @ManyToOne(() => Organization, (organization) => organization.staff)
  organization: Organization;

  @OneToMany(() => Product, (product) => product.initiator)
  products: Product;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
