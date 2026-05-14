import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Simulación de login sencillo
  login(body: any) {
    const { email, password } = body;

    // Aquí puedes poner tu correo para la prueba
    if (email === 'admin@laborapps.com' && password === '123456') {
      return {
        message: '¡Bienvenido a LaborApps!',
        user: { email, role: 'Admin' },
        token: 'simulated-jwt-token-123'
      };
    }

    throw new UnauthorizedException('Credenciales incorrectas');
  }
}

