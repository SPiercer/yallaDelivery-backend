import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLE_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;
    console.log(userRole);
    return this.matchRole(roles, userRole);
  }

  private matchRole(handlerRoles: Role[], userRole: Role): boolean {
    if (handlerRoles.includes(userRole)) {
      return true;
    }
    throw new ForbiddenException({
      statusCode: 403,
      message: "Forbidden",
      error: `You don't have the following roles of: [${handlerRoles}]`,
    });
  }
}
