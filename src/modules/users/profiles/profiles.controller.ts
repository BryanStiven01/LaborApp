import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; // <- Agregamos UseGuards
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // <- Agregamos ApiBearerAuth
import { UserRoleGuard } from '../../../auth/guards/user-role.guard';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  //  RUTA PRIVADA: Solo alguien logueado puede crear su perfil
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth() 
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perfil de usuario' })
  @ApiResponse({ status: 201, description: 'El perfil ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  //  RUTA PÚBLICA: Cualquier persona o empresa visitante puede ver el catálogo de trabajadores
  @Get()
  @ApiOperation({ summary: 'Obtener todos los perfiles' })
  @ApiResponse({ status: 200, description: 'Listado obtenido correctamente.' })
  findAll() {
    return this.profilesService.findAll();
  }

  //  RUTA PÚBLICA: Ver el detalle de un trabajador específico
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perfil por su ID' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado.' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  //  RUTA PRIVADA: Solo el dueño del perfil (o admin) debería poder actualizarlo
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un perfil por ID' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado con éxito.' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  // RUTA PRIVADA: Protección total para no borrar perfiles por accidente
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perfil por ID' })
  @ApiResponse({ status: 200, description: 'Perfil eliminado correctamente.' })
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}