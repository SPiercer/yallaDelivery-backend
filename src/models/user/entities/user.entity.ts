import {
  Column,
  Entity,
  OneToOne,
} from 'typeorm';
import { Role } from '../../../common/enums/role.enum';
import { BaseModel } from '../../base.model';

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
}
