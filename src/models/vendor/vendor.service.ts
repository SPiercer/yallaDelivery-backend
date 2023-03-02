import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository, EntityManager } from 'typeorm';
import {
  UpdateVendorDto /* UpdateVendorPasswordDto */,
} from './dto/update-vendor.dto';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async update(id: number, data: UpdateVendorDto) {
    return await this.vendorRepository.update(id, data);
  }

  async listOrders(user: User): Promise<Order[]> {
    const vendor = await this.vendorRepository.findOneBy({
      user: { id: user.id },
    });
    return this.entityManager.find(Order, {
      where: { vendor: { id: vendor.id } },
      take: 20,
    });
  }

  async listCategories(user: User): Promise<Category[]> {
    const vendor = await this.vendorRepository.findOneBy({
      user: { id: user.id },
    });
    return this.entityManager.find(Category, {
      where: { vendor: { id: vendor.id } },
      take: 20,
    });
  }
}
