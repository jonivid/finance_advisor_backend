// src/finance/finance.controller.ts
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FinanceService } from './finance.service';
import { CreateFinanceRecordDto } from './dto/create-finance-record.dto';

@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  async getFinancialSummary(@Request() req) {
    const userId = req.user.userId;
    return this.financeService.getFinancialSummary(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('chart-data')
  async getFinancialChartData(@Request() req) {
    const userId = req.user.userId;
    return this.financeService.getChartDataForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('finance_record')
  async createFinanceRecord(
    @Request() req,
    @Body() createFinanceRecordDto: CreateFinanceRecordDto,
  ) {
    const userId = req.user.userId;
    return this.financeService.createFinanceRecord(
      userId,
      createFinanceRecordDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('category-distribution')
  async getCategoryDistribution(@Request() req) {
    const userId = req.user.userId;
    return this.financeService.getCategoryDistribution(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('year-over-year-comparison')
  async getYearOverYearComparison(@Request() req) {
    const userId = req.user.userId;
    return this.financeService.getYearOverYearComparison(userId);
  }
}
