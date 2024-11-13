// src/finance/dto/response-finance-record.dto.ts
export interface ResponseFinanceRecordDto {
  id: number;
  type: string;
  amount: string;
  description: string;
  category: string;
  userId: number;
  createdAt: Date;
}
