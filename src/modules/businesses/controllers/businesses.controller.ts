import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessService } from '../services/business.service'; // O '../businesses.service' si no lo metiste en carpeta services
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'; // Verifica que esta ruta apunte bien a tu AuthGuard

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar un nuevo negocio o microempresa (Requiere Autenticación)' })
  @ApiResponse({ status: 201, description: 'Negocio registrado exitosamente.' })
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessesService.create(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de todos los negocios registrados' })
  @ApiResponse({ status: 200, description: 'Retorna el arreglo de empresas.' })
  findAll() {
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar los datos de un negocio (Requiere Autenticación)' })
  @ApiParam({ name: 'id', description: 'ID numérico del negocio a editar' })
  @ApiResponse({ status: 200, description: 'Negocio actualizado correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessesService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un negocio del sistema (Requiere Autenticación)' })
  @ApiParam({ name: 'id', description: 'ID numérico del negocio a eliminar' })
  @ApiResponse({ status: 200, description: 'Negocio eliminado exitosamente.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessesService.remove(id);
  }
}