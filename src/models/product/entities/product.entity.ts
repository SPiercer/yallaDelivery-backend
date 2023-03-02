import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Column,
    Point,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
  } from 'typeorm';
import { BaseModel } from '../../base.model';
import { Category } from '../../category/entities/category.entity';

@Entity('products')
export class Product extends BaseModel {
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
 
    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;
 
    @Column({ type: 'varchar', length: 255, nullable: false })
    image: string;
 
    @Column({ type: 'varchar', length: 255, nullable: false })
    price: string;
 
    @Column({ type: 'varchar', length: 255, nullable: false })
    stock: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category; 
}
