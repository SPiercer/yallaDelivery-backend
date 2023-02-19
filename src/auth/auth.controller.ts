import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Put,
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { ChangePasswordDto } from '../models/user/dto/change-password.dto';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Put('change-password')
  async changePassword(@Request() req: any, @Body() data: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, data);
  }
}
