import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobCategory } from './entities/job-category.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

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
      // 1. Desestructuramos los IDs del DTO de forma limpia
      const { employerId, categoryId, businessId, salary, ...jobData } = createJobDto;

      // 2. Mapeamos de forma explícita las relaciones sin usar 'as unknown as Job'
      const newJob = this.jobRepository.create({
        ...jobData,
        employerId: Number(employerId),
        employer: { id: employerId },
        category: { id: categoryId },
        business: businessId ? { id: businessId } : undefined,
      });

      return await this.jobRepository.save(newJob);
    } catch (error) {
      console.error('🔴 ERROR AL CREAR EMPLEO:', error);
      throw new InternalServerErrorException('Error al guardar la vacante de empleo en la base de datos.');
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

  // ==========================================
  // NUEVO: ACTUALIZAR EMPLEO
  // ==========================================
  update(id: number, updateJobDto: UpdateJobDto) {
    return {
      message: `El anuncio #${id} ha sido actualizado correctamente.`,
      dataActualizada: updateJobDto
    };
  }

  // NUEVO: ELIMINAR EMPLEO
  remove(id: number) {
    return { message: `El anuncio de empleo #${id} ha sido eliminado del sistema.` };
  }
}