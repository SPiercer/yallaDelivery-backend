import { VendorAuthService } from './vendor.service';
import { AuthController } from '../auth.controller';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';

@Controller('auth')
export class VendorAuthController implements AuthController {
  constructor(private readonly vendorService: VendorAuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.vendorService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Request() req: any) {
    return this.vendorService.register(req.body);
  }
}
