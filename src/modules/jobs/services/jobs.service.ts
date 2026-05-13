import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(jobData: any): Promise<any> {
    const newJob = this.jobRepository.create(jobData);
    return await this.jobRepository.save(newJob);
  }

  async findAll(): Promise<any[]> {
    return await this.jobRepository.find();
  }

  async remove(id: number): Promise<any> {
    return await this.jobRepository.delete(id);
  }
}