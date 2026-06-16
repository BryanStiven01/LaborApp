import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ==========================================
  // CONEXIÓN A POSTGRESQL
  // ==========================================

async create(createUserDto: any): Promise<any> {
    const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya se encuentra registrado.');
    }

    // 1. Cifrar la contraseña ingresada
    const passwordHash = crypto.createHash('sha256').update(createUserDto.password).digest('hex');

    // 2. Crear el usuario mapeando la columna correctamente
    const newUser = this.userRepository.create({
      ...createUserDto,
      password_hash: passwordHash // <-- Le pasamos el hash a la columna que espera la DB
    });

    const savedUser = await this.userRepository.save(newUser);
    return savedUser as any;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return `Usuario #${id} eliminado permanentemente`;
  }
}