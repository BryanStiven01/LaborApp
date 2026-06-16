import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../modules/users/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> { // <-- ¡Adiós Observable y problema de rxjs resuelto!
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException(
        'Usuario no encontrado en la petición (Revisa los Guards).',
      );
    }

    // <-- Adaptado a tu PDF: Evaluamos directamente la columna de texto "role"
    if (validRoles.includes(user.role)) {
      return true;
    }

    // <-- Adaptado a tu PDF: Usamos el email porque "first_name" no está en esta tabla
    throw new ForbiddenException(
      `El usuario con correo ${user.email} requiere uno de estos roles: [${validRoles}] para ejecutar esta acción.`,
    );
  }
}