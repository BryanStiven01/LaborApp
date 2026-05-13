import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: any): Promise<any> { // Usamos 'any' para evitar conflictos
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<any[]> {
    return await this.userRepository.find();
  }

  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}