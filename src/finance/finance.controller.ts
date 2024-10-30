import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  async getFinancialSummary(@Request() req) {
    const userId = req.user.userId;
    return this.financeService.getSummaryForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('chart-data')
  async getFinancialChartData(@Request() req) {
    const userId = req.user.userId;
    return this.financeService.getChartDataForUser(userId);
  }
}
