import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  Point,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BaseModel } from '../../base.model';
import { User } from '../../user/entities/user.entity';

@Entity('admins')
export class Admin extends BaseModel {
  
  

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
