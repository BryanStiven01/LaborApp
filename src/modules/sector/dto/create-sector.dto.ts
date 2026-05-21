import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}