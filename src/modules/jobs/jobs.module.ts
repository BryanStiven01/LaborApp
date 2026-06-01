import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from './entities/job.entity';
import { JobCategory } from './entities/job-category.entity';
import { JobApplication } from './entities/job-application.entity'; // <-- Importa tu nueva entidad

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobCategory, JobApplication])], // <-- Regístrala aquí en el arreglo
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}