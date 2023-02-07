import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController  {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Request() req: any) {
    return this.authService.register(req.body);
  }
}
