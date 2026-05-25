import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'ID del usuario que envía el mensaje', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @ApiProperty({ description: 'ID del usuario que recibe el mensaje', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  receiverId: number;

  @ApiProperty({ description: 'Contenido de texto del mensaje', example: 'Hola, vi tu vacante y me interesa el puesto.' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Teléfono opcional para contacto directo', example: '+50588888888', required: false })
  @IsString()
  @IsOptional()
  phoneContact?: string;

  @ApiProperty({ description: 'Enlace opcional directo a WhatsApp', example: 'https://wa.me/50588888888', required: false })
  @IsString()
  @IsOptional()
  whatsappLink?: string;
}