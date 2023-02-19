import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserRepository } from '../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([Admin])],
  providers: [UserRepository, AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
