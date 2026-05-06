import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
// 2. Importamos el DTO
import { CreateJobDto } from '../dto/job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Post()
  createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }
}