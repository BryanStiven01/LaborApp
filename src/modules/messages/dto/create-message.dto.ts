import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que envía el mensaje (Candidato)' })
  @IsInt()
  @IsNotEmpty()
  senderId: number;

  @ApiProperty({ example: 2, description: 'ID del usuario que recibe el mensaje (Empleador)' })
  @IsInt()
  @IsNotEmpty()
  receiverId: number;

  @ApiProperty({ 
    example: 'Hola, vi su anuncio. Tengo experiencia en mantenimiento.', 
    description: 'Contenido del mensaje inicial' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  content: string;

  @ApiProperty({ 
    example: '88888888', 
    description: 'Número telefónico sin código de país (opcional para generar la redirección wa.me)', 
    required: false 
  })
  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{8}$/, { message: 'El número debe tener exactamente 8 dígitos (formato local)' })
  phoneContact?: string;
}