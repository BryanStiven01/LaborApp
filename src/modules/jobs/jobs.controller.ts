import { Controller, Get, Post, Body, Query, Delete, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto'; 
import { UpdateJobDto } from './dto/update-job.dto';

// <-- Importamos tus nuevas herramientas de seguridad
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // ==========================================
  // 1. ENDPOINTS DE EMPLEOS (Ruta base: /jobs)
  // ==========================================
  
  @Post()
  @Auth(ValidRoles.empleador) // <-- Magia: Solo los empleadores pueden publicar
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publicar un nuevo empleo (Solo Empleadores)' })
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
    // Nota: El GET queda público para que cualquiera pueda ver los trabajos disponibles
    return this.jobsService.findAll(department, municipality);
  }

  @Patch(':id')
  @Auth(ValidRoles.empleador) // <-- Solo los empleadores pueden editar anuncios
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un anuncio de empleo existente (Solo Empleadores)' })
  @ApiParam({ name: 'id', description: 'ID numérico del anuncio de trabajo a modificar', example: 1 })
  @ApiResponse({ status: 200, description: 'Anuncio actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'No se encontró el anuncio especificado.' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto); 
  }

  @Delete(':id')
  @Auth(ValidRoles.empleador, ValidRoles.administrador) // <-- Doble rol permitido
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una publicación de empleo (Empleadores o Administradores)' })
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
    // Público para que el frontend pueda llenar los menús desplegables
    return this.jobsService.findAllCategories();
  }

  @Post('categories')
  @Auth(ValidRoles.administrador) // <-- OJO: Solo el dueño del sistema (Admin) crea categorías nuevas
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva categoría de empleo (Solo Administradores)' })
  createCategory(@Body() createCategoryDto: any) { 
    return this.jobsService.createCategory(createCategoryDto);
  }
}