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
import { Product } from '../../product/entities/product.entity';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    
    @ManyToOne(()=> Vendor , (vendor) => vendor.categories)
    vendor: Vendor;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt?: Date | null;
  
    @DeleteDateColumn()
    deletedAt?: Date | null;
}
