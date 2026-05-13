import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { BusinessService } from './services/business.service'; 
import { BusinessesController } from './controllers/businesses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessesController],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessesModule {}