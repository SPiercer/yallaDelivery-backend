import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  Point,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Vendor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date | null;

  @DeleteDateColumn()
  deletedAt?: Date | null;s
}
