import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity'; // Verifica que la ruta sea correcta
import { BusinessesService } from './services/business.service';
import { BusinessesController } from './controllers/businesses.controller';

@Module({
  // ¡ESTA ES LA PARTE CLAVE QUE TE FALTA!
  imports: [TypeOrmModule.forFeature([Business])], 
  controllers: [BusinessesController],
  providers: [BusinessesService],
  exports: [BusinessesService],
})
export class BusinessesModule {}