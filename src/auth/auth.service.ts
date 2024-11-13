/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse: LoginResponseDto = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        return userResponse;
      }
      return null;
    } catch (error) {
      // Optionally log the error or rethrow it with a more descriptive message
      console.error('Error validating user:', error);
      throw new Error('User validation failed');
    }
  }

  async login(user: LoginResponseDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      name: user.name,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
