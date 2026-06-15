import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a este perfil' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'Jordi', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Desarrollador Backend NestJS', required: false })
  @IsString()
  @IsOptional()
  bio?: string;
}