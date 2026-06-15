import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({ description: 'ID del usuario dueño del negocio', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Nombre comercial de la empresa', example: 'Ferretería El Constructor' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  companyName: string;

  // --- AGREGA ESTO ---
  @ApiProperty({ description: 'Número de identificación fiscal (RUC)', example: 'J-12345678-9' })
  @IsString()
  @IsNotEmpty()
  taxId: string;
  // --------------------

  @ApiProperty({ description: 'Descripción del negocio', example: 'Venta de materiales', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Dirección física', example: 'Nueva Guinea...', required: false })
  @IsString()
  @IsOptional()
  address?: string;
}