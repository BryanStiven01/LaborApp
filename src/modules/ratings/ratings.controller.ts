import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RatingsService } from './ratings.service'; // Ruta directa

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}
}