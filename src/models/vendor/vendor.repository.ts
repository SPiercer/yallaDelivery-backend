import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import * as bcrypt from 'bcryptjs';
export class VendorRepository {
    constructor(
        @InjectRepository(Vendor) 
        private readonly vendorRepository: Repository<Vendor>,
    ) {}

    findOne(email: string): Promise<Vendor> {
        return this.vendorRepository.findOne({ where: {email: email} });
    }
   async create(dto: CreateVendorDto): Promise<Vendor> {
        const password = await bcrypt.hash(dto.password, 10);
        return this.vendorRepository.save({...dto, password});
    }
}