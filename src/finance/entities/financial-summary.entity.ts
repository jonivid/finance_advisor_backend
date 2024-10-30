import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinancialSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalIncome: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalExpenses: number;

  @Column('decimal', { precision: 10, scale: 2 })
  netSavings: number;
}
