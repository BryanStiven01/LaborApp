import { IsEmail, IsString, MinLength, IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidRoles } from '../interfaces/valid-roles.interface';

export class RegisterDto {
  @ApiProperty({ example: 'jefe@empresa.com', description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El formato del correo no es válido.' })
  email!: string; // <-- Observa el "!"

  @ApiProperty({ example: 'Password123!', description: 'Contraseña segura' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password!: string;

  @ApiProperty({ example: 'Empleador', description: 'Rol en la plataforma' })
  @IsString()
  @IsIn([ValidRoles.empleador, ValidRoles.trabajador, ValidRoles.administrador], {
    message: `El rol debe ser exactamente: ${ValidRoles.empleador} o ${ValidRoles.trabajador} o ${ValidRoles.administrador}.`,
  })
  role!: string;

  @ApiProperty({ example: 'Zelaya Central', description: 'Departamento de residencia' })
  @IsString()
  @IsNotEmpty({ message: 'El departamento es obligatorio.' })
  department!: string;

  @ApiProperty({ example: 'Nueva Guinea', description: 'Municipio de residencia' })
  @IsString()
  @IsNotEmpty({ message: 'El municipio es obligatorio.' })
  municipality!: string;

  @ApiProperty({ example: 'Pedro', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  first_name!: string;

  @ApiProperty({ example: 'Albañil', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  last_name!: string;
}