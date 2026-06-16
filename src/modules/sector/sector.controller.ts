import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common'; // <- Agregado UseGuards
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger'; // <- Agregado ApiBearerAuth
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { UserRoleGuard } from '../../auth/guards/user-role.guard';

@ApiTags('Sectors')
@Controller('sectors')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  //  PRIVADO: Solo usuarios con token (Administradores) pueden crear sectores
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo sector económico' })
  @ApiResponse({ status: 201, description: 'Sector creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Ya existe un sector con este nombre.' })
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.create(createSectorDto);
  }

  //  PÚBLICO: Cualquiera puede ver los sectores activos
  @Get()
  @ApiOperation({ summary: 'Obtener todos los sectores activos (status: true)' })
  @ApiResponse({ status: 200, description: 'Lista de sectores recuperada con éxito.' })
  findAll() {
    return this.sectorService.findAll();
  }

  //  PÚBLICO: Cualquiera puede buscar un sector específico
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un sector específico por su ID (UUID)' })
  @ApiParam({ name: 'id', description: 'ID único del sector en formato UUID' })
  @ApiResponse({ status: 200, description: 'Sector encontrado.' })
  @ApiResponse({ status: 404, description: 'Sector no encontrado o se encuentra inactivo.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectorService.findOne(id);
  }

  //  PRIVADO: Solo usuarios con token pueden modificar un sector
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un sector' })
  @ApiParam({ name: 'id', description: 'ID del sector a modificar' })
  @ApiResponse({ status: 200, description: 'Sector actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'No se pudo actualizar porque el sector no existe.' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.update(id, updateSectorDto);
  }

  //  PRIVADO: Solo usuarios con token pueden desactivar un sector
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente un sector' })
  @ApiParam({ name: 'id', description: 'ID del sector a desactivar' })
  @ApiResponse({ status: 200, description: 'Sector desactivado con éxito (status cambiado a false).' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectorService.remove(id);
  }
}