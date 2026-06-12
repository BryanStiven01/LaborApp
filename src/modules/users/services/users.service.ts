import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'; // <-- Verifica que esta ruta sea la correcta
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  // Inyectamos el repositorio real de PostgreSQL
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ==========================================
  // CONEXIÓN A POSTGRESQL
  // ==========================================

// ... dentro de UsersService

// ... dentro de tu clase UsersService
async create(userData: Partial<User>): Promise<User> {
  const newUser = this.userRepository.create(userData);
  return await this.userRepository.save(newUser);
}

  async findAll() {
    // Traemos todos los usuarios reales de la base de datos
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    // Buscamos un usuario específico por su ID numérico
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Actualizamos datos reales
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    // Eliminamos de PostgreSQL
    await this.userRepository.delete(id);
    return `Usuario #${id} eliminado permanentemente`;
  }
}