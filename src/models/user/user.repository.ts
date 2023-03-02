import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../common/enums/role.enum';
import { Vendor } from '../vendor/entities/vendor.entity';
import { ConflictException } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';
import { CreateVendorDto } from '../vendor/dto/create-vendor.dto';
export class UserRepository {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,

    @InjectEntityManager()
    readonly entityManager: EntityManager,
  ) {}

  findOne(query: any): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async create(dto: CreateUserDto): Promise<any> {
    // check if user exists
    const user = await this.userRepository.exist({
      where: { email: dto.email },
    });
    console.log(user);
    if (user) {
      throw new ConflictException({
        message: 'User with this email already exists',
      });
    }

    const password = await bcrypt.hash(dto.password, 10);
    console.log(dto);
    switch (dto.role) {
      case Role.Vendor:
        return await this.userRepository
          .save({ ...dto, password })
          .then(async (user) => {
            return await this.entityManager.save(Vendor, {
              ...dto,
              user: user,
            });
          });

      case Role.Admin:
        // create admin
        return await this.userRepository
          .save({ ...dto, password })
          .then(async (user) => {
            await this.entityManager.save(Admin, { user: user });
            return user;
          });
      default:
        return this.userRepository.save({ ...dto, password });
    }
  }
}
