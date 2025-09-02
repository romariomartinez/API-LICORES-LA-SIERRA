import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ length: 120 }) name: string;
  @Column({ length: 255, nullable: true }) description?: string;
  @Column({ type: 'int', default: 0 }) order: number;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @OneToMany(() => Product, p => p.category) products: Product[];
}
