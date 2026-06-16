import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un usuario manualmente desde el panel administrativo' })
  @ApiResponse({ status: 201, description: 'Usuario creado y guardado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error. El correo electrónico ya está registrado.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista completa de usuarios registrados' })
  @ApiResponse({ status: 200, description: 'Retorna el arreglo con todos los usuarios.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los datos de un usuario específico por su ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario encontrado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado en la base de datos.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar la ubicación (departamento/municipio) o el rol de un usuario' })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a modificar' })
  @ApiResponse({ status: 200, description: 'Datos del usuario actualizados.' })
  @ApiResponse({ status: 404, description: 'No se pudo actualizar porque el usuario no existe.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario del sistema' })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}