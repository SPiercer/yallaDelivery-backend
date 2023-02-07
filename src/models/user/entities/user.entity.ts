import { Role } from '../../../common/enums/role.enum';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date | null;

  @DeleteDateColumn()
  deleted_at?: Date | null;
}
