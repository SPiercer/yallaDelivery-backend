import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../models/user/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy<U extends User,T extends AuthService<U>> extends PassportStrategy(Strategy) {
  constructor(private authService: T) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<U> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
