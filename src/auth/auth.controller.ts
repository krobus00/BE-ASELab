import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google')
  async googleLogin(@Body('token') token: string) {
    return this.authService.googleLogin(token);
  }

  @Get('/check')
  async check() {
    return { message: 'OK' };
  }
}
