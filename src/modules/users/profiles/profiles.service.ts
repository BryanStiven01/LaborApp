import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { userId, ...profileData } = createProfileDto;
    
    const newProfile = this.profileRepository.create({
      ...profileData, // Guarda todos los campos (bio, phone, profileType, etc)
      user: { id: userId } as any,
    });
    return await this.profileRepository.save(newProfile);
  }
  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id }, relations: ['user'] });
    if (!profile) throw new NotFoundException(`Perfil #${id} no encontrado.`);
    return profile;
  }

async update(id: number, updateProfileDto: UpdateProfileDto) {
  // Ahora actualiza cualquier campo que le mandes, no solo la bio
    await this.profileRepository.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.profileRepository.delete(id);
    return { message: `Perfil #${id} eliminado.` };
  }
}