import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto'; // Importamos tu nuevo DTO
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // 1. Importamos tu nuevo Guard

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // ==========================================
  // 1. ENDPOINTS DE EMPLEOS (Ruta base: /jobs)
  // ==========================================
  @Post()
  @UseGuards(JwtAuthGuard) // 2. Ponemos el candado aquí: Solo logueados pueden publicar
  @ApiOperation({ summary: 'Publicar un nuevo empleo (Requiere Autenticación)' })
  create(@Body() createJobDto: CreateJobDto) { // Cambiado 'any' por 'CreateJobDto'
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
    // Nota: Si luego creas un DTO para categorías, puedes cambiar este 'any' también.
    return this.jobsService.createCategory(createCategoryDto);
  }
}