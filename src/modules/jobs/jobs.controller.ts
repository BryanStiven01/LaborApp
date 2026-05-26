import { Controller, Get, Post, Body, Query, Delete, UseGuards, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto'; 
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; 

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // ==========================================
  // 1. ENDPOINTS DE EMPLEOS (Ruta base: /jobs)
  // ==========================================
  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publicar un nuevo empleo (Requiere Autenticación)' })
  @ApiResponse({ status: 201, description: 'Empleo publicado exitosamente.' })
  create(@Body() createJobDto: CreateJobDto) { 
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los empleos con opción de filtrado geográfico' })
  @ApiQuery({ name: 'department', required: false, description: 'Filtrar por departamento (ej: Zelaya Central)' })
  @ApiQuery({ name: 'municipality', required: false, description: 'Filtrar por municipio (ej: Nueva Guinea)' })
  findAll(
    @Query('department') department?: string,
    @Query('municipality') municipality?: string,
  ) {
    return this.jobsService.findAll(department, municipality);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un anuncio de empleo existente (Requiere Autenticación)' })
  @ApiParam({ name: 'id', description: 'ID numérico del anuncio de trabajo a modificar', example: 1 })
  @ApiResponse({ status: 200, description: 'Anuncio actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'No se encontró el anuncio especificado.' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto); 
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una publicación de empleo (Requiere Autenticación)' })
  @ApiParam({ name: 'id', description: 'ID numérico del empleo a eliminar' })
  @ApiResponse({ status: 200, description: 'Empleo eliminado exitosamente.' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }

  // ====================================================
  // 2. ENDPOINTS DE CATEGORÍAS (Ruta: /jobs/categories)
  // ====================================================
  @Get('categories')
  @ApiOperation({ summary: 'Obtener todas las categorías de empleos' })
  findAllCategories() {
    return this.jobsService.findAllCategories();
  }

  @Post('categories')
  @ApiOperation({ summary: 'Crear una nueva categoría de empleo' })
  createCategory(@Body() createCategoryDto: any) { 
    return this.jobsService.createCategory(createCategoryDto);
  }
}