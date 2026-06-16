import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly repo: Repository<JobApplication>,
  ) {}

async create(dto: any): Promise<JobApplication> {
    const newApp = this.repo.create({
      jobId: dto.jobId,              // <-- Añadimos esta línea
      applicantId: dto.candidateId,  // <-- Añadimos esta línea
      job: { id: dto.jobId } as any,
      applicant: { id: dto.candidateId } as any,
    });
    return await this.repo.save(newApp);
  }

  
  async findAll(): Promise<JobApplication[]> {
    return await this.repo.find({ relations: ['job', 'applicant'] });
  }

  async findOne(id: number): Promise<JobApplication> {
    const app = await this.repo.findOne({ where: { id }, relations: ['job', 'applicant'] });
    if (!app) throw new NotFoundException(`Postulación #${id} no existe.`);
    return app;
  }

  async update(id: number, dto: any) {
    // Las postulaciones usualmente no cambian de relaciones directas, pero guardamos metadatos si fuesen necesarios
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: `Postulación #${id} removida.` };
  }
}