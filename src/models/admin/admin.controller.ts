import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateVendorDto } from '../vendor/dto/create-vendor.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('vendor')
  createVendor(@Body() dto: CreateVendorDto): Promise<any> {
    return this.adminService.createVendor(dto)
  }
  
}
