import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

import { FinanceRecord } from './entities/finance-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinanceRecord])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
