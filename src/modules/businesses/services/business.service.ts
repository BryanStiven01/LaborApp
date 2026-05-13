import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../entities/business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(data: any): Promise<any> {
    const newBusiness = this.businessRepository.create(data);
    return await this.businessRepository.save(newBusiness);
  }

  async findAll(): Promise<any[]> {
    return await this.businessRepository.find();
  }

  async remove(id: number): Promise<any> {
    return await this.businessRepository.delete(id);
  }
}