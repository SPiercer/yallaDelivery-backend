import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../models/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(payload: any) {
    // payload = {username, uuid, iat, exp}
    const user = await this.userRepository.findOne({where: {email: payload.username}});
    return user;
  }
}
