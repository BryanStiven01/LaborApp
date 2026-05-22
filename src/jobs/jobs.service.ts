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

  // --- MÉTODOS DE EMPLEOS (Con soporte de filtrado geográfico) ---
  async findAll(department?: string, municipality?: string) {
    const query = this.jobRepository.createQueryBuilder('job')
      .leftJoinAndSelect('job.category', 'category')
      .leftJoinAndSelect('job.employer', 'employer')
      .leftJoinAndSelect('job.business', 'business');

    if (department) {
      query.andWhere('employer.department = :department', { department });
    }

    if (municipality) {
      query.andWhere('employer.municipality = :municipality', { municipality });
    }

    query.orderBy('job.createdAt', 'DESC');

    return await query.getMany();
  }

  async create(createJobDto: any) {
    try {
      const newJob = this.jobRepository.create(createJobDto);
      return await this.jobRepository.save(newJob);
    } catch (error) {
      console.error('🔴 ERROR AL CREAR EMPLEO:', error);
      throw error;
    }
  }

  // --- MÉTODOS DE CATEGORÍAS ---
  async findAllCategories() {
    return await this.categoryRepository.find();
  }

  async createCategory(createCategoryDto: any) {
    try {
      const newCategory = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      // Esto nos va a imprimir el error real en tu Git Bash para saber qué pasa por debajo
      console.error('🔴 ERROR REAL EN CATEGORÍAS:', error);
      throw error;
    }
  }
}