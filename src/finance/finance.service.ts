import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialSummary } from './entities/financial-summary.entity';
import { FinancialChartData } from './entities/financial-chart-data.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(FinancialSummary)
    private financialSummaryRepository: Repository<FinancialSummary>,

    @InjectRepository(FinancialChartData)
    private financialChartDataRepository: Repository<FinancialChartData>,
  ) {}

  async getSummaryForUser(userId: string): Promise<FinancialSummary> {
    return this.financialSummaryRepository.findOne({ where: { userId } });
  }

  async getChartDataForUser(userId: string): Promise<FinancialChartData> {
    return this.financialChartDataRepository.findOne({ where: { userId } });
  }
}
