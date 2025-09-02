import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment') id: number;

  @ManyToOne(() => Category, c => c.products, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ length: 160 }) name: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) price: number;
  @Column({ name: 'image_url', nullable: true }) imageUrl?: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
