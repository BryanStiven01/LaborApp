import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/ratings.entity';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  // Método para crear una nueva valoración
  async create(createRatingDto: CreateRatingDto, reviewerId: number) {
  const newRating = this.ratingRepository.create({
    ...createRatingDto,
    // Debe ser reviewerId (como está en tu entidad)
    reviewerId: reviewerId, 
  });
  
    return await this.ratingRepository.save(newRating);
  }

  // Método para listar todas las valoraciones
  async findAll() {
    return await this.ratingRepository.find();
  }
}