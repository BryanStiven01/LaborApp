import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: any): Promise<any> {
    const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya se encuentra registrado.');
    }
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser as any;
  }

  async findAll(): Promise<any[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    return user as any;
  }

  async update(id: number, updateUserDto: any): Promise<any> {
    // 1. Verificamos si el usuario existe usando el método interno
    const user = await this.findOne(id);
    
    // 2. Fusionamos los nuevos datos sobre la entidad existente
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    
    // 3. Guardamos los cambios en la base de datos
    const result = await this.userRepository.save(updatedUser);
    
    // 4. Retornamos forzando el tipo para evitar bloqueos de TypeScript
    return result as any;
  }

  async remove(id: number): Promise<any> {
    // Verificamos si existe antes de intentar borrar
    await this.findOne(id);
    await this.userRepository.delete(id);
    return { message: `Usuario #${id} eliminado correctamente.` };
  }
}