import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export abstract class UserRepository<T extends User> {
  
  abstract findOne(query: any): Promise<T>;

  abstract create(dto: CreateUserDto): Promise<T>;
}
