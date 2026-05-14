import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';

// Clase para que Swagger sepa qué pedir
class LoginDto {
  @ApiProperty({ example: 'admin@laborapps.com' })
  email!: string;

  @ApiProperty({ example: '123456' })
  password!: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión en la plataforma' })
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}