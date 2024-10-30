import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module'; // Assuming FinanceModule is the correct one
import { User } from './user/entities/user.entity';
import { FinancialSummary } from './finance/entities/financial-summary.entity';
import { FinancialChartData } from './finance/entities/financial-chart-data.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, FinancialSummary, FinancialChartData], // Add your entities here
        synchronize: true, // Disable in production
      }),
    }),
    UserModule,
    AuthModule,
    FinanceModule, // Correcting the import
  ],
})
export class AppModule {}
