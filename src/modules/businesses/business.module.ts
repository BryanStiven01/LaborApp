import { Module } from '@nestjs/common';
import { BusinessesController } from './controllers/businesses.controller';
import { BusinessesService } from './services/business.service';

@Module({
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {} // ¡Aquí está el nombre que app.module.ts estaba buscando!