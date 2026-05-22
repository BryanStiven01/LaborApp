import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobCategory } from './entities/job-category.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectRepository(JobCategory)
    private readonly categoryRepository: Repository<JobCategory>,
  ) {}

  // --- MÉTODOS DE EMPLEOS ---
  async findAll() {
    return await this.jobRepository.find({ relations: ['category', 'employer', 'business'] });
  }

  async create(createJobDto: any) {
    const newJob = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(newJob);
  }

  // --- MÉTODOS DE CATEGORÍAS ---
  async findAllCategories() {
    return await this.categoryRepository.find();
  }

  async createCategory(createCategoryDto: any) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }
}