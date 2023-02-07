import { Entity, PrimaryGeneratedColumn, OneToOne ,JoinColumn   } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('vendors')
export class Vendor {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User;

}
