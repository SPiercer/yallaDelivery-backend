import { Entity, PrimaryGeneratedColumn, OneToOne ,JoinColumn ,Column ,Point,OneToMany, ManyToOne } from 'typeorm';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity({ name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: number;

    @ManyToOne(() => Vendor, (vendor) => vendor.orders)
    vendor: Vendor;
}
