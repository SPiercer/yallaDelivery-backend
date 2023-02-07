import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorRepository } from './vendor.repository';
import { VendorService } from './vendor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [VendorRepository, VendorService],
  exports: [VendorRepository],
})
export class VendorModule {}
