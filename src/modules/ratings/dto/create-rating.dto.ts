import { IsInt, IsNotEmpty, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @IsNotEmpty()
  reviewee_id: number; // ID del usuario que recibe la calificación

  @IsInt()
  @IsOptional()
  job_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  score: number; // Puntuación de 1 a 5 

  @IsString()
  @IsOptional()
  comment: string; // Comentario opcional
}