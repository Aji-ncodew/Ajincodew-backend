import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles specified, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user object is attached to request after authentication
    return roles.some(role => user.roles.includes(role));
  }
}
