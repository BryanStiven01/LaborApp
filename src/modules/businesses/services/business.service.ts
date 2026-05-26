import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';

@Injectable()
export class BusinessService {
  // Simulamos una base de datos temporal en memoria
  private businesses: any[] = [];

  create(createBusinessDto: CreateBusinessDto) {
    const newBusiness = {
      id: Date.now(), // Generamos un ID numérico falso
      ...createBusinessDto,
    };
    this.businesses.push(newBusiness);
    return newBusiness; 
  }

  findAll() {
    return this.businesses;
  }

  findOne(id: number) {
    const business = this.businesses.find(b => b.id === id);
    return business ? business : `El negocio #${id} no existe`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return {
      message: `El negocio #${id} ha sido actualizado`,
      data: updateBusinessDto
    };
  }

  remove(id: number) {
    return `El negocio #${id} fue eliminado del sistema`;
  }
}