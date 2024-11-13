import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module'; // Assuming FinanceModule is the correct one
import { User } from './user/entities/user.entity';
import { FinanceRecord } from './finance/entities/finance-record.entity';
import { CacheModule } from '@nestjs/cache-manager';

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
        entities: [User, FinanceRecord], // Add your entities here
        synchronize: true, // Disable in production
      }),
    }),
    CacheModule.register({
      ttl: 60, // Default cache TTL (time to live) in seconds
      max: 100, // Maximum number of items in the cache
      isGlobal: true, // Makes cache globally available in the app
    }),
    UserModule,
    AuthModule,
    FinanceModule, // Correcting the import
  ],
})
export class AppModule {}
