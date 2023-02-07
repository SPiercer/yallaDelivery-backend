import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { Vendor } from './entities/vendor.entity';

export class VendorRepository {
    constructor(
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
    ) {}

    findOne(query: any): Promise<Vendor> {
        this.vendorRepository.createQueryBuilder('vendor', )
        return this.vendorRepository.findOne(query);
    }
    create(dto: CreateVendorDto): Promise<Vendor> {
        return this.vendorRepository.save(dto);
    }
}