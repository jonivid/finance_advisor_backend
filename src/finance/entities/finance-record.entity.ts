// src/finance/entities/finance-record.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class FinanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  type: string; // 'income' or 'expense'

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column()
  category: string; // New field for categorizing income/expenses

  @CreateDateColumn()
  createdAt: Date;
}
