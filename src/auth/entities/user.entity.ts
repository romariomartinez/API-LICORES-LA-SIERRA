import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ length: 120 }) name: string;
  @Column({ length: 160 }) email: string;
  @Column() passwordHash: string;
  @Column({ default: 'admin' }) role: 'admin' | 'viewer';
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
