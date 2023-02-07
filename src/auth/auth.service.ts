import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { User } from '../models/user/entities/user.entity';
export abstract class AuthService<T extends User> {
  abstract validateUser(email: string, pass: string): Promise<T | null>;

  abstract login(user: T);

  abstract register(dto: CreateUserDto);
}
