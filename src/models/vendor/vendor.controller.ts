import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import {
  UpdateVendorDto,
  // UpdateVendorPasswordDto,
} from './dto/update-vendor.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
}

@Controller('vendor/profile')
export class VendorProfileController {
  constructor(private readonly vendorService: VendorService) {}

  @Put('update')
  update(@Req() req: any, @Body() data: UpdateVendorDto) {
    return this.vendorService.update(req.user.id, data);
  }

}
