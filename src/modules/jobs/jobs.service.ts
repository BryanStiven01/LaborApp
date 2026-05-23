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

  async create(createJobDto: CreateJobDto) { // Tipado con tu CreateJobDto
    try {
      const { employerId, categoryId, businessId, ...jobData } = createJobDto;

      // Mapeamos los IDs numéricos a la estructura que TypeORM necesita para las relaciones
      const newJob = this.jobRepository.create({
        ...jobData,
        employer: { id: employerId }, // TypeORM entiende esto automáticamente como la FK
        category: { id: categoryId },
        business: businessId ? { id: businessId } : null, // Opcional por si es independiente
      });

      return await this.jobRepository.save(newJob);
    } catch (error) {
      console.error('🔴 ERROR AL CREAR EMPLEO:', error);
      throw new BadRequestException('No se pudo crear la oferta de empleo. Verifique los IDs relacionales.');
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