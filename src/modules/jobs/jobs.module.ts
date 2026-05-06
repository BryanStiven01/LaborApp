import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { Job } from './entities/job.entity';

@Module({
  // Registramos la entidad Job para que TypeORM cree la tabla en la base de datos
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService],
  // Exportamos el servicio por si otro módulo (como Users) necesita usarlo en el futuro
  exports: [TypeOrmModule, JobsService], 
})
export class JobsModule {}