import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@ApiTags('Sectors') // <-- Agrupa los endpoints en una sección limpia
@Controller('sectors')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo sector económico' })
  @ApiResponse({ status: 201, description: 'Sector creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Ya existe un sector con este nombre.' })
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.create(createSectorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los sectores activos (status: true)' })
  @ApiResponse({ status: 200, description: 'Lista de sectores recuperada con éxito.' })
  findAll() {
    return this.sectorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un sector específico por su ID (UUID)' })
  @ApiParam({ name: 'id', description: 'ID único del sector en formato UUID' })
  @ApiResponse({ status: 200, description: 'Sector encontrado.' })
  @ApiResponse({ status: 404, description: 'Sector no encontrado o se encuentra inactivo.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un sector' })
  @ApiParam({ name: 'id', description: 'ID del sector a modificar' })
  @ApiResponse({ status: 200, description: 'Sector actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'No se pudo actualizar porque el sector no existe.' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.update(id, updateSectorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente un sector' })
  @ApiParam({ name: 'id', description: 'ID del sector a desactivar' })
  @ApiResponse({ status: 200, description: 'Sector desactivado con éxito (status cambiado a false).' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectorService.remove(id);
  }
}