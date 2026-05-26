import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../modules/users/services/users.service'; // Ruta exacta de tu proyecto
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto'; // Librería nativa de Node.js para cifrado

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // ==========================================
  // LÓGICA DE REGISTRO CON ALMACENAMIENTO CIFRADO
  // ==========================================
  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;

    // 1. Verificar si el correo ya existe en PostgreSQL
    const users = await this.usersService.findAll();
    const userExists = users.find((u: any) => u.email === email);
    
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya se encuentra registrado.');
    }

    // 2. Cifrar la contraseña usando un Hash SHA-256 seguro
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    // 3. Crear y guardar el usuario en la base de datos real
    const newUser = await this.usersService.create({
      email,
      password_hash: passwordHash, // Guardamos la contraseña cifrada
      role,
      department: 'Zelaya Central', // Valores iniciales obligatorios por la entidad User
      municipality: 'Nueva Guinea'
    });

    return {
      message: 'Usuario registrado exitosamente de forma segura.',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  // ==========================================
  // LÓGICA DE LOGIN CON VERIFICACIÓN CIFRADA
  // ==========================================
  async login(body: any) {
    const { email, password } = body;

    // 1. Buscamos el usuario en la base de datos real
    const users = await this.usersService.findAll();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 2. Ciframos la contraseña entrante para compararla con el hash guardado en la DB
    const inputHash = crypto.createHash('sha256').update(password).digest('hex');

    if (user.password_hash !== inputHash) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      message: '¡Bienvenido a LaborApps!',
      user: { 
        id: user.id,
        email: user.email, 
        role: user.role 
      },
      token: 'simulated-jwt-token-123' // Mantiene compatibilidad con el JwtAuthGuard actual
    };
  }
}