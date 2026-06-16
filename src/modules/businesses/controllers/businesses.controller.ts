import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessService } from '../services/business.service'; 
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';

// <-- Importamos el sistema de roles personalizado
import { Auth } from '../../../auth/decorators/auth.decorator'; 
import { ValidRoles } from '../../../auth/interfaces/valid-roles.interface';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessService) {}

  @Post()
  // <-- Magia: Solo el Empleador registra su negocio (y el Admin si es necesario)
  @Auth(ValidRoles.empleador, ValidRoles.administrador)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar un nuevo negocio o microempresa (Solo Empleadores)' })
  @ApiResponse({ status: 201, description: 'Negocio registrado exitosamente.' })
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessesService.create(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de todos los negocios registrados' })
  @ApiResponse({ status: 200, description: 'Retorna el arreglo de empresas.' })
  findAll() {
    // Nota: Es público porque los trabajadores necesitan poder ver qué empresas existen
    return this.businessesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los datos de un negocio por su ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del negocio', example: 1 })
  @ApiResponse({ status: 200, description: 'Negocio encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.businessesService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.empleador, ValidRoles.administrador) // <-- Solo el dueño o el admin editan
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar los datos de un negocio (Solo Empleadores o Admin)' })
  @ApiParam({ name: 'id', description: 'ID numérico del negocio a editar' })
  @ApiResponse({ status: 200, description: 'Negocio actualizado correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessesService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.empleador, ValidRoles.administrador) // <-- Control total para borrar
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un negocio del sistema (Solo Empleadores o Admin)' })
  @ApiParam({ name: 'id', description: 'ID numérico del negocio a eliminar' })
  @ApiResponse({ status: 200, description: 'Negocio eliminado exitosamente.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessesService.remove(id);
  }
}