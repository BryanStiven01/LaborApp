import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JobsService } from './jobs.service';

@ApiTags('Jobs') // Para que se agrupe bonito en tu Swagger
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los empleos' })
  findAll() {
    return this.jobsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Publicar un nuevo empleo' })
  create(@Body() createJobDto: any) {
    return this.jobsService.create(createJobDto);
  }

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