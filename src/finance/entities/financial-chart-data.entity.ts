import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinancialChartData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('simple-json') // Use 'simple-json' instead of 'simple-array'
  labels: string[];

  @Column('simple-json') // Use 'simple-json' instead of 'simple-array'
  incomeData: number[];

  @Column('simple-json') // Use 'simple-json' instead of 'simple-array'
  expenseData: number[];
}
