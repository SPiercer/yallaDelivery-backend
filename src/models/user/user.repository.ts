import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../common/enums/role.enum';
import { Vendor } from '../vendor/entities/vendor.entity';
export class UserRepository {
  constructor(@InjectRepository(User) 
    readonly userRepository: Repository<User>,
  ){}
 
  findOne(query: any): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(dto.password, 10);
    const manager = this.userRepository.manager;
    switch (dto.role) {
      case Role.Vendor:
        // create vendor
        const vendor = manager.create(Vendor, {user: dto});
        await manager.save(vendor);
        return await this.userRepository.save({...dto, password});
      default:
        return this.userRepository.save({...dto, password});
    }
  }
}
