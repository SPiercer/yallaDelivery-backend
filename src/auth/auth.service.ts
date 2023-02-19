import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user/entities/user.entity';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { UserRepository } from '../models/user/user.repository';
import { Role } from '../common/enums/role.enum';
import { Vendor } from '../models/vendor/entities/vendor.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Admin } from '../models/admin/entities/admin.entity';
import { ChangePasswordDto } from '../models/user/dto/change-password.dto';
import { CreateVendorDto } from '../models/vendor/dto/create-vendor.dto';
import { CreateAdminDto } from '../models/admin/dto/create-admin.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.entityManager.findOne(User, { where: { email } });
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
      case Role.Admin:
        const admin = await manager.findOne(Admin, {
          where: { user: { id: user.id } },
        });
        return {
          user,
          admin,
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
    if (
      await this.entityManager.exists(User, {
        where: { email: dto.email },
      })
    ) {
      throw new ConflictException({
        message: 'User with this email already exists',
      });
    }
    const result = this.entityManager.create(User, dto);
    const pass = await bcrypt.hash(dto.password, 10);
    result.password = pass;
    await this.entityManager.save(User, result);
    const { password, ...user } = result;
    const token = this.jwtService.sign({
      username: result.email,
      uuid: result.id,
    });
    switch (dto.role) {
      case Role.Vendor:
        let vdto: any;
        if (dto instanceof CreateVendorDto) {
          const { password, ...vendor } = dto;
          vdto = vendor;
        }
        let vendorDto = dto instanceof CreateVendorDto ? vdto : null;
        let vendor = await this.entityManager.save(Vendor, {
          ...vendorDto,
          user: result,
        });
        const { user, ...vendorData } = vendor;
        return {
          vendor: { ...vendorData },
          ...user,
          access_token: token,
        };
      case Role.Admin:
        let adminDto =
          dto instanceof CreateAdminDto ? { ...dto, password } : null;
        let admin = await this.entityManager.save(Admin, {
          ...adminDto,
          user: result,
        });
        return {
          ...admin,
          ...user,
          access_token: token,
        };
      default:
        return {
          user: { ...user },
          access_token: token,
        };
    }
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const pass = await bcrypt.hash(dto.password, 10);
    const result = await this.entityManager.update(User, id, {
      password: pass,
    });
    if (result.affected === 0) {
      throw new InternalServerErrorException({
        message: 'Password change failed',
      });
    }
    return { message: 'Password changed successfully' };
  }
}
