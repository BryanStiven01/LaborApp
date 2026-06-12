import { Controller, Post, Body, Patch, Param, Get, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

// <-- Importamos tus nuevas herramientas de seguridad
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  // <-- Magia: Solo los actores principales del negocio pueden chatear
  @Auth(ValidRoles.empleador, ValidRoles.trabajador) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar un mensaje inicial y generar link de WhatsApp' })
  @ApiResponse({ status: 201, description: 'Mensaje guardado en base de datos y link de wa.me generado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de validación (ej. formato de teléfono incorrecto).' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('history')
  // <-- Nota: El administrador se incluye aquí por si necesita auditar conversaciones en caso de reportes
  @Auth(ValidRoles.empleador, ValidRoles.trabajador, ValidRoles.administrador) 
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
  @Auth(ValidRoles.empleador, ValidRoles.trabajador)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Editar el contenido de un mensaje (Solo antes de la redirección a WhatsApp)' })
  @ApiParam({ name: 'id', description: 'ID numérico del mensaje a editar', example: 1 })
  @ApiResponse({ status: 200, description: 'Mensaje actualizado correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  // ==========================================
  // ELIMINAR MENSAJE (DELETE)
  // ==========================================
  @Delete(':id')
  // <-- El administrador también tiene poder de moderación para borrar mensajes inapropiados
  @Auth(ValidRoles.empleador, ValidRoles.trabajador, ValidRoles.administrador)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un mensaje del historial' })
  @ApiParam({ name: 'id', description: 'ID numérico del mensaje a eliminar' })
  @ApiResponse({ status: 200, description: 'Mensaje eliminado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}