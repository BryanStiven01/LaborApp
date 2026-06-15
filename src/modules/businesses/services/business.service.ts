import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../entities/business.entity';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
  const { userId, companyName, address, taxId, description } = createBusinessDto;
  const newBusiness = this.businessRepository.create({
    companyName,
    taxId,
    description,
    address,
    userId,
  });

  return await this.businessRepository.save(newBusiness);
}

  async findAll(): Promise<Business[]> {
    return await this.businessRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { id }, relations: ['user'] });
    if (!business) throw new NotFoundException(`El negocio #${id} no existe.`);
    return business;
  }

  async update(id: number, updateBusinessDto: UpdateBusinessDto) {
    await this.businessRepository.update(id, updateBusinessDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.businessRepository.delete(id);
    return { message: `El negocio #${id} fue eliminado.` };
  }
}