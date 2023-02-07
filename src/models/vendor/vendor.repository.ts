import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { Role } from '../../common/enums/role.enum';
export class VendorRepository {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async findOne(email: string): Promise<Vendor> {
    return this.vendorRepository.findOne({
      where: {
        user: {
          email: email,
        },
      },
    });
  }
  async create(dto: CreateVendorDto): Promise<Vendor> {
    throw Error('unimplemented error type');
    const password = await bcrypt.hash(dto.password, 10);
    // return this.vendorRepository.save(dto);
  }
}
