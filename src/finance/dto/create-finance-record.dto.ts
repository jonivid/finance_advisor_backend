// src/finance/dto/create-finance-record.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateFinanceRecordDto {
  @IsString()
  type: string; // 'income' or 'expense'

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  category: string; // New field for category
}
