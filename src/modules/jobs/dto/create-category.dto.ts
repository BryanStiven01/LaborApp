import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Construcción', description: 'Nombre de la categoría de empleo' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @ApiProperty({ example: 'Trabajos de albañilería, carpintería, etc.', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}