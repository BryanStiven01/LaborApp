import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'trabajador@correo.com', description: 'Correo electrónico único para el registro' })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña segura (mínimo 6 caracteres)' })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @ApiProperty({ example: 'Worker', description: 'Rol en la app: Employer o Worker' })
  @IsString()
  @IsNotEmpty({ message: 'El rol es obligatorio.' })
  @IsIn(['Employer', 'Worker'], { message: 'El rol debe ser Employer o Worker.' })
  role: string;
}