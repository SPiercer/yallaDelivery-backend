import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository, EntityManager } from 'typeorm';
import { UpdateVendorDto, /* UpdateVendorPasswordDto */ } from './dto/update-vendor.dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  update(id: number, data: UpdateVendorDto) {
    return this.vendorRepository.update(id, data);
  }

}
