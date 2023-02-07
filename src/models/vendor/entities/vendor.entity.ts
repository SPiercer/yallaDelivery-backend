import { Entity } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('vendors' )
export class Vendor extends User {}
