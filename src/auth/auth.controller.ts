import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Put,
  Get,
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { ChangePasswordDto } from '../models/user/dto/change-password.dto';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Put('auth/change-password')
  async changePassword(@Request() req: any, @Body() data: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, data);
  }

  @Get('user/profile')
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user);
  }

  async editProfile(@Request() req: any) {
    
  }
}
