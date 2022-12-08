import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto';
import { JwtGuard } from './guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google')
  async googleLogin(@Body() dto: GoogleLoginDto) {
    return this.authService.googleLogin(dto);
  }

  @Get('/check')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Auth is successfully passed' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. user is not logged in.',
  })
  async check() {
    return { message: 'OK' };
  }
}
