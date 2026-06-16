import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto'; // Asegúrate de que la ruta sea correcta
import { UserRoleGuard } from '../../auth/guards/user-role.guard'

@ApiTags('Ratings')
@ApiBearerAuth() // Esto ayuda a que Postman sepa que requiere token
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @UseGuards(UserRoleGuard)
  create(@Body() createRatingDto: CreateRatingDto, @Req() req) {
    // req.user.id viene del JWT, garantiza que el que califica es quien dice ser
    return this.ratingsService.create(createRatingDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }
}