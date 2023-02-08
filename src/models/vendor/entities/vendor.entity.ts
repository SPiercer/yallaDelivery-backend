import { Entity, PrimaryGeneratedColumn, OneToOne ,JoinColumn ,Column ,Point } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('vendors')
export class Vendor {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @Column('varchar', { name: 'name', length: 255 , nullable: true })
    name?: string;

    @Column('varchar', { name: 'address', length: 255, nullable: true  })
    address?: string;

    @Column('varchar', { name: 'phone', length: 255, nullable: true  })
    phone?: string;

    @Column('varchar', { name: 'branch', length: 255, nullable: true  })
    branch?: string;

    @Column('point', { name: 'location', nullable: true  })
    location?: Point;

    @Column('bool', { name: 'isOnline', nullable: true })
    isOnline?: boolean;

    @Column('float', { name: 'balance', nullable: true })
    balance?: number;
    
    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User;

}
