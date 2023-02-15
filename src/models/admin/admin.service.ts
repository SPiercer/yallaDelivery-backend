import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { EntityManager, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
@Injectable()
export class AdminService {
  constructor(
    @InjectEntityManager()
    readonly entityManager: EntityManager,
    private readonly adminRepository: Repository<Admin>,
    private readonly userRepository: UserRepository,
  ) {
    this.adminRepository = entityManager.getRepository(Admin);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }
}
