import {
  Injectable,
  Logger,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager'; // Updated import for CacheInterceptor
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceRecord } from './entities/finance-record.entity';
import { CreateFinanceRecordDto } from './dto/create-finance-record.dto';
import { ResponseFinanceRecordDto } from './dto/response-finance-record.dto.ts';

@Injectable()
export class FinanceService {
  private readonly logger = new Logger(FinanceService.name);

  constructor(
    @InjectRepository(FinanceRecord)
    private financeRecordRepository: Repository<FinanceRecord>,
  ) {}

  async createFinanceRecord(
    userId: number,
    createFinanceRecordDto: CreateFinanceRecordDto,
  ): Promise<ResponseFinanceRecordDto> {
    try {
      // Create a new finance record
      const financeRecord = this.financeRecordRepository.create({
        ...createFinanceRecordDto,
        userId,
        type: createFinanceRecordDto.type,
        amount: createFinanceRecordDto.amount.toString(), // Convert amount to string for decimal type
      });

      // Save the finance record to the database
      const savedRecord =
        await this.financeRecordRepository.save(financeRecord);

      // Map the saved record to the ResponseFinanceRecordDto
      return {
        id: savedRecord.id,
        type: savedRecord.type,
        amount: savedRecord.amount,
        description: savedRecord.description,
        category: savedRecord.category,
        userId: savedRecord.userId,
        createdAt: savedRecord.createdAt,
      };
    } catch (error) {
      // Handle errors and log them
      throw new HttpException(
        'Failed to create finance record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Method to get financial summary
  @UseInterceptors(CacheInterceptor)
  async getFinancialSummary(
    userId: string,
  ): Promise<{ totalIncome: number; totalExpense: number; netSaving: number }> {
    try {
      this.logger.log(`Fetching financial summary for user ${userId}`);
      const result = await this.financeRecordRepository
        .createQueryBuilder('record')
        .select(
          'SUM(CASE WHEN record.type = :income THEN record.amount ELSE 0 END)',
          'totalIncome',
        )
        .addSelect(
          'SUM(CASE WHEN record.type = :expense THEN record.amount ELSE 0 END)',
          'totalExpense',
        )
        .setParameters({ income: 'income', expense: 'expense' })
        .where('record.userId = :userId', { userId })
        .getRawOne();

      const totalIncome = parseFloat(result.totalIncome) || 0;
      const totalExpense = parseFloat(result.totalExpense) || 0;
      const netSaving = totalIncome - totalExpense;

      return { totalIncome, totalExpense, netSaving };
    } catch (error) {
      this.logger.error(
        `Error fetching financial summary for user ${userId}: ${error.message}`,
      );
      throw new HttpException(
        'Failed to fetch financial summary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Method to get chart data (income vs. expenses over time)
  @UseInterceptors(CacheInterceptor)
  async getChartDataForUser(userId: string): Promise<any[]> {
    try {
      this.logger.log(`Fetching chart data for user ${userId}`);
      return await this.financeRecordRepository
        .createQueryBuilder('record')
        .select("DATE_FORMAT(record.createdAt, '%Y-%m')", 'month')
        .addSelect(
          'SUM(CASE WHEN record.type = :income THEN record.amount ELSE 0 END)',
          'totalIncome',
        )
        .addSelect(
          'SUM(CASE WHEN record.type = :expense THEN record.amount ELSE 0 END)',
          'totalExpense',
        )
        .setParameters({ income: 'income', expense: 'expense' })
        .where('record.userId = :userId', { userId })
        .groupBy('month')
        .orderBy('month')
        .getRawMany();
    } catch (error) {
      this.logger.error(
        `Error fetching chart data for user ${userId}: ${error.message}`,
      );
      throw new HttpException(
        'Failed to fetch chart data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Method to get category distribution
  @UseInterceptors(CacheInterceptor)
  async getCategoryDistribution(userId: string): Promise<any[]> {
    try {
      this.logger.log(`Fetching category distribution for user ${userId}`);
      return await this.financeRecordRepository
        .createQueryBuilder('record')
        .select('record.category', 'category')
        .addSelect('SUM(record.amount)', 'totalAmount')
        .where('record.userId = :userId', { userId })
        .groupBy('record.category')
        .getRawMany();
    } catch (error) {
      this.logger.error(
        `Error fetching category distribution for user ${userId}: ${error.message}`,
      );
      throw new HttpException(
        'Failed to fetch category distribution',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Method for year-over-year comparison
  @UseInterceptors(CacheInterceptor)
  async getYearOverYearComparison(userId: string): Promise<any[]> {
    try {
      this.logger.log(`Fetching year-over-year comparison for user ${userId}`);
      return await this.financeRecordRepository
        .createQueryBuilder('record')
        .select("DATE_FORMAT(record.createdAt, '%Y-%m')", 'month')
        .addSelect(
          'SUM(CASE WHEN YEAR(record.createdAt) = YEAR(CURDATE()) THEN record.amount ELSE 0 END)',
          'currentYear',
        )
        .addSelect(
          'SUM(CASE WHEN YEAR(record.createdAt) = YEAR(CURDATE()) - 1 THEN record.amount ELSE 0 END)',
          'previousYear',
        )
        .where('record.userId = :userId', { userId })
        .groupBy('month')
        .orderBy('month')
        .getRawMany();
    } catch (error) {
      this.logger.error(
        `Error fetching year-over-year comparison for user ${userId}: ${error.message}`,
      );
      throw new HttpException(
        'Failed to fetch year-over-year comparison',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
