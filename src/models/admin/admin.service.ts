import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { EntityManager, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { CreateVendorDto } from '../vendor/dto/create-vendor.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly userRepository: UserRepository,
  ) {}

  async createVendor(dto: CreateVendorDto): Promise<any> {
    try {
      await this.userRepository.create(dto);
      return { message: 'done' };
    } catch (error) {
      return { message: 'any error has occured', ...{ error } };
    }
  }
}
