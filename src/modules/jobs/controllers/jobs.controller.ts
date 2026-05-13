import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { JobsService } from '../services/jobs.service';
import { Job } from '../entities/job.entity'; // Asegúrate de importar la entidad

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Publicar una nueva vacante de trabajo' })
  @ApiBody({ type: Job }) // Esto hace que aparezca el formulario
  async create(@Body() createJobDto: Job) {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los trabajos disponibles' })
  async findAll() {
    return await this.jobsService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una vacante por ID' })
  async remove(@Param('id') id: string) {
    return await this.jobsService.remove(+id);
  }
}