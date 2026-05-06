import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importamos el DTO y la Entidad de Jobs
import { CreateJobDto } from '../dto/job.dto';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    try {
      // Creamos el trabajo con los datos que vienen del frontend
      const job = this.jobRepository.create(createJobDto);
      await this.jobRepository.save(job);
      return job;
    } catch (error) {
      console.log(error);
      // Cambiamos el mensaje de error para que tenga sentido en tu proyecto
      throw new InternalServerErrorException('Error al crear el anuncio de trabajo');
    }
  }

  async findAll() {
    // Busca y devuelve todos los anuncios de trabajo en la base de datos
    return this.jobRepository.find({});
  }
}
