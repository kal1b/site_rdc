import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) { return this.service.register(dto); }

  @Post('login')
  login(@Body() dto: AuthDto) { return this.service.login(dto); }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) { return this.service.me(req.user.sub); }
}
