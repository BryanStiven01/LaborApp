import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({ description: 'ID del usuario (Empleador) dueño del negocio', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Nombre oficial o comercial de la empresa', example: 'Ferretería El Constructor' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  companyName: string;

  @ApiProperty({ description: 'Descripción de los servicios o rubro del negocio', example: 'Venta de materiales de construcción y herramientas de ferretería.', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Dirección física del local', example: 'Zona 2, del parque central 1c al norte, Nueva Guinea.', required: false })
  @IsString()
  @IsOptional()
  address?: string;
}