import { Controller, Post, Body, Patch, Param, Get, Query, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar un mensaje inicial y generar link de WhatsApp (Requiere Autenticación)' })
  @ApiResponse({ status: 201, description: 'Mensaje guardado en base de datos y link de wa.me generado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de validación (ej. formato de teléfono incorrecto).' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener el historial de chat entre dos usuarios' })
  @ApiQuery({ name: 'userA', description: 'ID del primer usuario (ej: Candidato)' })
  @ApiQuery({ name: 'userB', description: 'ID del segundo usuario (ej: Empleador)' })
  @ApiResponse({ status: 200, description: 'Historial de mensajes devuelto correctamente.' })
  getChatHistory(
    @Query('userA', ParseIntPipe) userA: number,
    @Query('userB', ParseIntPipe) userB: number,
  ) {
    return this.messagesService.getChatHistory(userA, userB);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Editar el contenido de un mensaje (Solo antes de la redirección a WhatsApp)' })
  @ApiParam({ name: 'id', description: 'ID numérico del mensaje a editar', example: 1 })
  @ApiResponse({ status: 200, description: 'Mensaje actualizado correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  // ==========================================
  // NUEVO: ELIMINAR MENSAJE (DELETE)
  // ==========================================
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un mensaje del historial (Requiere Autenticación)' })
  @ApiParam({ name: 'id', description: 'ID numérico del mensaje a eliminar' })
  @ApiResponse({ status: 200, description: 'Mensaje eliminado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}