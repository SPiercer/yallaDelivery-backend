import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  Point,
  OneToMany,
} from 'typeorm';
import { BaseModel } from '../../base.model';
import { Category } from '../../category/entities/category.entity';
import { Order } from '../../order/entities/order.entity';
import { User } from '../../user/entities/user.entity';

@Entity('vendors')
export class Vendor extends BaseModel {
  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name?: string;

  @Column('varchar', { name: 'address', length: 255, nullable: true })
  address?: string;

  @Column('varchar', { name: 'phone', length: 255, nullable: true })
  phone?: string;

  @Column('varchar', { name: 'logo', length: 255, nullable: true })
  logo?: string;

  @Column('varchar', { name: 'branch', length: 255, nullable: true })
  branch?: string;

  @Column('point', { name: 'location', nullable: true })
  location?: Point;

  @Column('json', { name: 'workingHours', nullable: true })
  workingHours?: {
    sat?: { open: string; close: string };
    sun?: { open: string; close: string };
    mon?: { open: string; close: string };
    tue?: { open: string; close: string };
    wed?: { open: string; close: string };
    thu?: { open: string; close: string };
    fri?: { open: string; close: string };
  };

  @Column('bool', { name: 'isOnline', default: false })
  isOnline: boolean;

  @Column('float', { name: 'balance', default: 0 })
  balance: number;

  @Column('float', { name: 'profitRatio', default: 0 })
  profitRatio: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => Order, (order) => order.vendor)
  orders: Order[];

  @OneToMany(() => Category, (category) => category.vendor)
  categories: Category[];
}
