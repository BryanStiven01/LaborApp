import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './entities/sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  async create(createSectorDto: CreateSectorDto): Promise<Sector> {
    const sectorExists = await this.sectorRepository.findOne({
      where: { name: createSectorDto.name },
    });

    if (sectorExists) {
      throw new BadRequestException('El sector con este nombre ya existe.');
    }

    const newSector = this.sectorRepository.create(createSectorDto);
    return await this.sectorRepository.save(newSector);
  }

  async findAll(): Promise<Sector[]> {
    // Solo traemos los sectores que tengan status: true (activos)
    return await this.sectorRepository.find({ where: { status: true } });
  }

  async findOne(id: string): Promise<Sector> {
    const sector = await this.sectorRepository.findOne({ where: { id, status: true } });
    if (!sector) {
      throw new NotFoundException(`Sector con ID ${id} no fue encontrado o está inactivo.`);
    }
    return sector;
  }

  async update(id: string, updateSectorDto: UpdateSectorDto): Promise<Sector> {
    const sector = await this.findOne(id); // Reutiliza la validación de si existe activo
    
    const updatedSector = Object.assign(sector, updateSectorDto);
    return await this.sectorRepository.save(updatedSector);
  }

  async remove(id: string): Promise<{ message: string }> {
    const sector = await this.findOne(id);
    
    // Borrado lógico: cambiamos el status a false
    sector.status = false;
    await this.sectorRepository.save(sector);
    
    return { message: `Sector eliminado lógicamente con éxito.` };
  }
}