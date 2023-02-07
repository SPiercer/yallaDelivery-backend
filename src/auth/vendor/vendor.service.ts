import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';
import { Vendor } from '../../models/vendor/entities/vendor.entity';
import { VendorRepository } from '../../models/vendor/vendor.repository';
import { CreateVendorDto } from '../../models/vendor/dto/create-vendor.dto';
@Injectable()
export class VendorAuthService implements AuthService<Vendor> {
  constructor(
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Vendor | null> {
    const user = await this.vendorRepository.findOne({
      where: { email },
    });

    if (
      user &&
      bcrypt.compareSync(pass, user.password) &&
      email === user.email
    ) {
      const { password, ...result } = user;
      return result as Vendor;
    }
    return null;
  }

  async login(user: Vendor) {
    const payload = { username: user.email, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateVendorDto) {
    const user = await this.vendorRepository.create({});
    const payload = { username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
