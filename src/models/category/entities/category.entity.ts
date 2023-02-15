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
import { BaseModel } from '../../base.model';
import { Product } from '../../product/entities/product.entity';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity('categories')
export class Category extends BaseModel {
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    
    @ManyToOne(()=> Vendor , (vendor) => vendor.categories)
    vendor: Vendor;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
