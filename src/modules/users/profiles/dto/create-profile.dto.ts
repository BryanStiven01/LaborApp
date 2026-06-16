import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'Jordi', description: 'Nombre completo' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  // --- CAMPOS NUEVOS AÑADIDOS ---
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  profileType?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  servicesOffered?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}