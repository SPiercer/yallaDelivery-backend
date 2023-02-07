import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user/entities/user.entity';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { UserRepository } from '../models/user/user.repository';
import { Role } from '../common/enums/role.enum';
import { Vendor } from '../models/vendor/entities/vendor.entity';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (
      user &&
      bcrypt.compareSync(pass, user.password) &&
      email === user.email
    ) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, uuid: user.id };
    const manager = this.userRepository.userRepository.manager;
    let vendor: Vendor;
    switch (user.role) {
      case Role.Vendor:
        // find vendor
        vendor = await manager.findOneBy(Vendor, {
          user: { id: user.id },
        });
        return {
          user,
          vendor,
          access_token: this.jwtService.sign(payload),
        };

      default:
        return {
          user,
          access_token: this.jwtService.sign(payload),
        };
    }
  }

  async register(dto: CreateUserDto) {
    const result = await this.userRepository.create(dto);

    const payload = { username: result.email, uuid: result.id };
    const { password, ...user } = result;
    return {
      user: { ...user },
      access_token: this.jwtService.sign(payload),
    };
  }
}
