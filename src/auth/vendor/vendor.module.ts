import { Module } from '@nestjs/common';
import { VendorAuthService } from './vendor.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../local.strategy';
import { JwtStrategy } from '../jwt.strategy';
import { VendorRepository } from '../../models/vendor/vendor.repository';
import { VendorModule } from '../../models/vendor/vendor.module';
import { Vendor } from '../../models/vendor/entities/vendor.entity';
import { VendorAuthController } from './vendor.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
    VendorModule,
  ],
  controllers: [VendorAuthController],
  providers: [
    VendorAuthService,
    {
      provide: JwtStrategy,
      inject: [VendorRepository],
      useFactory: (vendorRepository: VendorRepository) =>
        new JwtStrategy<Vendor>(vendorRepository),
    },
    {
      provide: LocalStrategy,
      inject: [VendorAuthService],
      useFactory: (vendorService: VendorAuthService) =>
        new LocalStrategy<Vendor, VendorAuthService>(vendorService),
    },
  ],
})
export class VendorAuthModule {}
