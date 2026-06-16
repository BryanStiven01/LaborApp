import { Controller, UseGuards } from '@nestjs/common'; // <-- Agregamos UseGuards aquí
import { ApiTags } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { UserRoleGuard } from '../../auth/guards/user-role.guard';

@ApiTags('Ratings')
@UseGuards(UserRoleGuard) // <-- Candado maestro activado
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  // Cuando comiences a programar tus endpoints aquí adentro (@Post, @Get, etc.), 
  // ya estarán 100% protegidos obligando a usar el Token JWT.
}