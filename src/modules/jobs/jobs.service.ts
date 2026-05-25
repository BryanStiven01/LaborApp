import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobCategory } from './entities/job-category.entity';
import { CreateJobDto } from './dto/create-job.dto'; // Importamos tu DTO

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

  async create(createJobDto: CreateJobDto) {
    try {
      // 1. Sacamos el salary del DTO junto a los otros IDs
      const { employerId, categoryId, businessId, salary, ...jobData } = createJobDto;

      const newJob = this.jobRepository.create({
        ...jobData,
        // 2. Convertimos el salary a número usando Number() para que TypeScript no se queje
        salary: salary ? Number(salary) : null, 
        employer: { id: employerId },
        category: { id: categoryId },
        business: businessId ? { id: businessId } : null,
      } as unknown as Job); // 3. Le aseguramos a TypeORM que este objeto cumple con la entidad Job

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
      console.error('🔴 ERROR REAL EN CATEGORÍAS:', error);
      throw new BadRequestException('Error al crear la categoría. Asegúrese de que el nombre sea único.');
    }
  }
}