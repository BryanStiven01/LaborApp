import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'trabajador@correo.com', 
    description: 'Correo electrónico único de acceso' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    example: 'ContraseñaSegura123', 
    description: 'Contraseña en texto plano (se aplicará hash SHA-256 en la base de datos)' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({ 
    example: 'Worker', 
    description: 'Rol del usuario dentro del sistema: Admin, Employer o Worker' 
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ 
    example: 'Zelaya Central', 
    description: 'Departamento para el algoritmo de filtrado geográfico' 
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ 
    example: 'Nueva Guinea', 
    description: 'Municipio de residencia para la conexión de ofertas locales' 
  })
  @IsString()
  @IsNotEmpty()
  municipality: string;
}