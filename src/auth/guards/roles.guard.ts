// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si el endpoint no tiene el decorador @Roles, cualquiera puede entrar
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Se extrae el usuario de la petición

    const mockUser = user || { role: Role.EMPLOYER }; 

    if (!mockUser || !mockUser.role) {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }

    // Compara que el rol del usuario esté en la lista permitida
    const hasRole = requiredRoles.includes(mockUser.role as Role);
    
    if (!hasRole) {
      throw new ForbiddenException('Acceso denegado: Rol insuficiente');
    }

    return true;
  }
}