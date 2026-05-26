import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  // Simulamos una base de datos temporal en memoria
  private users: any[] = [];

  // Usamos 'any' temporalmente para que acepte el password_hash que le manda el AuthService
  create(createUserDto: any) {
    const newUser = {
      id: Date.now(), // Generamos un ID numérico simulado
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser; // Ahora sí retornamos un OBJETO (newUser.id ya no dará error)
  }

  findAll() {
    return this.users; // Retornamos el ARREGLO completo (ya se podrá usar el .find)
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { id, ...updateUserDto };
  }

  remove(id: number) {
    return `Usuario #${id} eliminado`;
  }
}