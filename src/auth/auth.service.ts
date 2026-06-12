import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../modules/users/services/users.service'; 
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto'; 
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, 
  ) {}

  // ==========================================
  // LÓGICA DE REGISTRO
  // ==========================================
  async register(registerDto: RegisterDto) {
    // EXTRAEMOS TODOS LOS CAMPOS NUEVOS
    const { email, password, role, department, municipality, first_name, last_name } = registerDto;

    const users = await this.usersService.findAll();
    const userExists = users.find((u: any) => u.email === email);
    
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya se encuentra registrado.');
    }

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    // ENVIAMOS TODOS LOS CAMPOS AL SERVICIO PARA QUE POSTGRES LOS RECIBA
    const newUser = await this.usersService.create({
        email,
        password_hash: passwordHash,
        role,
        department,
        municipality,
        first_name,
        last_name
}); // <-- ¡Ya no necesitas el 'as any'! // <--- Este "as any" le dice a TypeScript: "Confía en mí, yo sé lo que hago"

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
  // LÓGICA DE LOGIN 
  // ==========================================
  async login(body: any) {
    const { email, password } = body;

    const users = await this.usersService.findAll();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas: Usuario no encontrado.');
    }

    const inputHash = crypto.createHash('sha256').update(password).digest('hex');

    if (user.password_hash !== inputHash) {
      throw new UnauthorizedException('Credenciales incorrectas: Contraseña inválida.');
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    return {
      message: '¡Bienvenido a LaborApps!',
      user: { 
        id: user.id,
        email: user.email, 
        role: user.role 
      },
      token: this.jwtService.sign(payload) 
    };
  }
}