import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'ID del empleador que publica el anuncio' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  employer_id!: number;

  @ApiProperty({ description: 'Título del trabajo (ej. Se necesita electricista)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title!: string;

  @ApiProperty({ description: 'Descripción completa del requerimiento' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description!: string;

  @ApiProperty({ description: 'Puede ser: Permanent, Temporary, DailyChore' })
  @IsString()
  @IsNotEmpty()
  job_type!: string;

  @ApiProperty({ description: 'Estado del pago: Pending o Paid', required: false })
  @IsString()
  @IsOptional()
  ad_payment_status?: string;
}

// Genera el DTO para actualizar, volviendo todos los campos opcionales
export class UpdateJobDto extends PartialType(CreateJobDto) {}