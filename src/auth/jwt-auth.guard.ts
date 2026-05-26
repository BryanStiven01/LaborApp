import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // 1. Verificar si viene el header Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No autorizado. Debe proporcionar un token Bearer válido.');
    }

    // 2. Extraer el token
    const token = authHeader.split(' ')[1];

    // 3. Validación simulada con el token del grupo
    if (token === 'simulated-jwt-token-123' || token.length > 5) {
      return true;
    }

    throw new UnauthorizedException('Token inválido o expirado.');
  }
}