import {
  Column,
  Entity,
  OneToOne,
} from 'typeorm';
import { Role } from '../../../common/enums/role.enum';
import { BaseModel } from '../../base.model';
import { Cart } from '../../cart/entities/cart.entity';

@Entity('users')
export class User extends BaseModel {

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('enum', {
    name: 'role',
    enum: Role,
  })
  role: Role;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
