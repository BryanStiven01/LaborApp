import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { BusinessService } from '../services/business.service';
import { Business } from '../entities/business.entity';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva empresa o empleador' })
  @ApiBody({ type: Business })
  async create(@Body() createBusinessDto: Business) {
    return await this.businessService.create(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las empresas registradas' })
  async findAll() {
    return await this.businessService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un negocio por ID' })
  async remove(@Param('id') id: string) {
    return await this.businessService.remove(+id);
  }
}