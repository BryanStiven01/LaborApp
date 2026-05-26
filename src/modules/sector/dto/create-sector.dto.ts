import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateSectorDto {
  @ApiProperty({ 
    example: 'Construcción y Albañilería', 
    description: 'Nombre del sector económico o rubro comercial' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @ApiProperty({ 
    example: 'Servicios de construcción de viviendas, reparaciones y acabados', 
    required: false,
    description: 'Detalle opcional sobre las actividades del sector'
  })
  @IsString()
  @IsOptional()
  description?: string;
}