import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user/entities/user.entity';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { UserRepository } from '../models/user/user.repository';
import { Role } from '../common/enums/role.enum';
import { Vendor } from '../models/vendor/entities/vendor.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.entityManager.findOne(User,{ where: { email } });
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
    const manager = this.entityManager;
    switch (user.role) {
      case Role.Vendor:
        const vendor = await manager.findOne(Vendor, {
          where: { user: { id: user.id } },
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
    const result = this.entityManager.create(User,dto);

    const payload = { username: result.email, uuid: result.id };
    const { password, ...user } = result;
    return {
      user: { ...user },
      access_token: this.jwtService.sign(payload),
    };
  }
}
