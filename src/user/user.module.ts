import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Make sure the User entity is imported
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User repository
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // If other modules (e.g., AuthModule) need access to UserService
})
export class UserModule {}
