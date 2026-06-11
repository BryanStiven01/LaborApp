import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // <- Importante importar esto

@ApiTags('Profiles') // <- La etiqueta de Swagger para esta sección
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perfil de usuario' })
  @ApiResponse({ status: 201, description: 'El perfil ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los perfiles' })
  @ApiResponse({ status: 200, description: 'Listado obtenido correctamente.' })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perfil por su ID' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado.' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un perfil por ID' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado con éxito.' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perfil por ID' })
  @ApiResponse({ status: 200, description: 'Perfil eliminado correctamente.' })
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}