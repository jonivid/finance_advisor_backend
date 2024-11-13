// src/finance/dto/create-finance-record.dto.ts
import { IsEnum, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { FinanceRecordType } from '../entities/finance-record.entity';

export class CreateFinanceRecordDto {
  @IsEnum(FinanceRecordType)
  type: FinanceRecordType;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
