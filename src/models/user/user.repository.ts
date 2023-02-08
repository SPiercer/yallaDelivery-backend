import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../common/enums/role.enum';
import { Vendor } from '../vendor/entities/vendor.entity';
import { ConflictException } from '@nestjs/common';
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

  async create(dto: CreateUserDto): Promise<User> {
    // check if user exists
    const user = await this.userRepository.exist({
      where: { email: dto.email },
    });
    if (user) {
      throw new ConflictException({
        message: 'User with this email already exists',
      });
    }

    const password = await bcrypt.hash(dto.password, 10);
    console.log(dto);
    switch (dto.role) {
      case Role.Vendor:
        // create vendor

        return await this.userRepository
          .save({ ...dto, password })
          .then(async (user) => {
            await this.entityManager.save(Vendor, { user: user });

            return user;
          });

      default:
        return this.userRepository.save({ ...dto, password });
    }
  }
}
