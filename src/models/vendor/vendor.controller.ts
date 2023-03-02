import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/enums/role.enum';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Category } from '../category/entities/category.entity';
import { Order } from '../order/entities/order.entity';
import {
  UpdateVendorDto,
  // UpdateVendorPasswordDto,
} from './dto/update-vendor.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('listOrders')
  @Roles(Role.Vendor)
  listOrders(@Req() req: any): Promise<Order[]> {
    return this.vendorService.listOrders(req.user);
  }

  @Get('listCategories')
  @Roles(Role.Vendor)
   listCategories(@Req() req: any): Promise<Category[]> {
    return this.vendorService.listCategories(req.user);
  } 
  

}

@Controller('vendor/profile')
export class VendorProfileController {
  constructor(private readonly vendorService: VendorService) {}

  @Put('update')
  @Roles(Role.Vendor)
  update(@Req() req: any, @Body() data: UpdateVendorDto) {
    return this.vendorService.update(req.user.id, data);
  }
}
