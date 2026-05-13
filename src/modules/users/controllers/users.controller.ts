import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation , ApiBody} from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo usuario en LaborApps' })
  @ApiBody({ type: User }) // <-- Esto obliga a Swagger a mostrar los campos de la Entidad User
  async create(@Body() createUserDto: User) { 
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}