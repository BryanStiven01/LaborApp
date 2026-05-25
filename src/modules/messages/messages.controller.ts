import { Controller, Post, Body, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar un mensaje interno con opción de contacto directo' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Obtener el historial de chat entre dos usuarios' })
  @ApiQuery({ name: 'userA', description: 'ID del primer usuario (ej: Candidato)' })
  @ApiQuery({ name: 'userB', description: 'ID del segundo usuario (ej: Empleador)' })
  getChatHistory(
    @Query('userA', ParseIntPipe) userA: number,
    @Query('userB', ParseIntPipe) userB: number,
  ) {
    return this.messagesService.getChatHistory(userA, userB);
  }
}