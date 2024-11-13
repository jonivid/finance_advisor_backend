// src/finance/dto/create-finance-record.dto.ts
import { IsString, IsNumber, IsIn, IsNotEmpty } from 'class-validator';

export class CreateFinanceRecordDto {
  @IsString()
  @IsIn(['income', 'expense'])
  type: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
