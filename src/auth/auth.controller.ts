import { Controller, Post, Body, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';         
import { RegisterDto } from './dto/register.dto';   

// <-- Importamos tu nuevo super-decorador personalizado
import { Auth } from './decorators/auth.decorator'; 

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // NestJS por defecto da 201 en los POST, con esto lo forzamos a 200 OK
  @ApiOperation({ summary: 'Iniciar sesión en la plataforma' })
  @ApiResponse({ status: 200, description: 'Login exitoso. Retorna el token JWT de acceso.' })
  @ApiResponse({ status: 401, description: 'Error de autenticación. Credenciales inválidas.' })
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario (Empleador o Trabajador)' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de validación o el correo ya se encuentra registrado.' })

  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // ==========================================
  // OBTENER PERFIL LOGUEADO
  // ==========================================
  @Get('profile')
  @Auth() // <-- Magia pura: Al no pasarle parámetros, exige token válido pero permite cualquier rol.
  @ApiBearerAuth() // <-- Activa el botoncito del candado verde en Swagger
  @ApiOperation({ summary: 'Obtener los datos del usuario autenticado actualmente' })
  @ApiResponse({ status: 200, description: 'Retorna la información del usuario descifrada del token.' })
  @ApiResponse({ status: 401, description: 'No autorizado. Token faltante o expirado.' })
  getProfile(@Request() req) {
    // El decorador @Auth() valida el token mediante la estrategia y mete la info en "req.user"
    return req.user;
  }
}