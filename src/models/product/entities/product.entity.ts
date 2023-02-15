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
import { Category } from '../../category/entities/category.entity';
export class Product {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: number;
 
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
