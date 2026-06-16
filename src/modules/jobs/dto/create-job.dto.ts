import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ 
    example: 'Pintor de interiores', 
    description: 'Título de la oferta de trabajo' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 150)
  title: string;

  @ApiProperty({ 
    example: 'Se necesita pintor para una casa de dos plantas en el centro.', 
    description: 'Descripción detallada de las tareas' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    example: 150.00, 
    description: 'Salario ofrecido por el trabajo',
    required: false 
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  salary?: number;

  @ApiProperty({ 
    example: 1, 
    description: 'ID del usuario que publica la oferta (Empleador)' 
  })
  @IsNumber()
  @IsNotEmpty()
  employerId: number;

  @ApiProperty({ 
    example: 2, 
    description: 'ID de la empresa (Opcional si es independiente)',
    required: false 
  })
  @IsNumber()
  @IsOptional()
  businessId?: number;

  @ApiProperty({ 
    example: 3, 
    description: 'ID de la categoría del trabajo' 
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}