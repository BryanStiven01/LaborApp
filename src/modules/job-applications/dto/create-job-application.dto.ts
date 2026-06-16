import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJobApplicationDto {
  @ApiProperty({ example: 1, description: 'ID del empleo al que se postula' })
  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @ApiProperty({ example: 2, description: 'ID del usuario trabajador' })
  @IsNumber()
  @IsNotEmpty()
  candidateId: number;
}