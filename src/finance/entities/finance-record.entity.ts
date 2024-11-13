// src/finance/entities/finance-record.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum FinanceRecordType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('finance_records')
export class FinanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({
    type: 'enum',
    enum: FinanceRecordType,
  })
  type: FinanceRecordType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}
