import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { FinancialSummary } from './entities/financial-summary.entity';
import { FinancialChartData } from './entities/financial-chart-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialSummary, FinancialChartData])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
