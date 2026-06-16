import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserRoleGuard } from '../../auth/guards/user-role.guard';

@ApiTags('Job Applications') // Etiqueta solicitada en la tarjeta de Trello
@ApiBearerAuth() // <- Agrega el candadito en la interfaz de Swagger
@UseGuards(UseGuards) // <- Candado maestro: protege TODAS las rutas de abajo
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva postulación a empleo' })
  @ApiResponse({ status: 201, description: 'La postulación ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de postulación inválidos.' })
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(createJobApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las postulaciones' })
  @ApiResponse({ status: 200, description: 'Listado de postulaciones obtenido correctamente.' })
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una postulación por su ID' })
  @ApiResponse({ status: 200, description: 'Postulación encontrada.' })
  @ApiResponse({ status: 404, description: 'Postulación no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.jobApplicationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una postulación por ID' })
  @ApiResponse({ status: 200, description: 'Postulación actualizada con éxito.' })
  update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationsService.update(+id, updateJobApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una postulación por ID' })
  @ApiResponse({ status: 200, description: 'Postulación eliminada correctamente.' })
  remove(@Param('id') id: string) {
    return this.jobApplicationsService.remove(+id);
  }
}