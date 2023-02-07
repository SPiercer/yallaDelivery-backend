import { Module } from '@nestjs/common';
import { VendorAuthModule } from './vendor/vendor.module';

@Module({
  imports: [VendorAuthModule],
  providers: [],
  exports: [VendorAuthModule],
})
export class AuthModule {}
