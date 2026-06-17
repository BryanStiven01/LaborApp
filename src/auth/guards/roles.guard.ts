import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../modules/users/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Extraemos los roles requeridos para el endpoint usando el Reflector
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si el endpoint no tiene el decorador @Roles, se permite el acceso por defecto
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtenemos el usuario de la petición de Express
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 3. RESPALDO PARA PRUEBAS (Mock): 
    // Si tus compañeros no han inyectado el JwtAuthGuard todavía, forzamos un simulacro de Employer
    // para que Swagger te deje probar el flujo sin romper nada.
    const mockUser = user || { role: Role.EMPLOYER };

    // 4. Validamos si el rol del usuario coincide con los requeridos
    return requiredRoles.includes(mockUser.role);
  }
}