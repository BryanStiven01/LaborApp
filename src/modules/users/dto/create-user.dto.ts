import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'trabajador@correo.com', description: 'Correo electrónico único de acceso' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'ContraseñaSegura123', description: 'Contraseña en texto plano' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  // --- AGREGA ESTAS DOS PROPIEDADES ---
  @ApiProperty({ example: 'Jordi', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Vargas', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty()
  last_name: string;
  // ------------------------------------

  @ApiProperty({ example: 'Worker', description: 'Rol del usuario: Admin, Employer o Worker' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: 'Zelaya Central', description: 'Departamento para el filtro geográfico' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: 'Nueva Guinea', description: 'Municipio de residencia' })
  @IsString()
  @IsNotEmpty()
  municipality: string;
}