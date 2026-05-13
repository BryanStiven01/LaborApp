import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BusinessesService } from '../services/business.service'; // Apunta a la carpeta services

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las empresas o empleadores registrados' })
  findAll() {
    return this.businessesService.findAll();
  }
}