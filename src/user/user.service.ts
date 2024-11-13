import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'; // Use bcryptjs instead of bcrypt
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const { name, email, password } = registerDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user entity
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await this.userRepository.save(user);

    // Return the response DTO
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
