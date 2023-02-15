import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorService } from './vendor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [VendorService],

})
export class VendorModule {}
