import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // <-- IMPORTANTE
import { User } from '../../users/entities/user.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id!: number;

  @ApiProperty({ example: 1, description: 'ID del usuario que publica el empleo' })
  @Column({ type: 'int4' })
  employer_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'employer_id' })
  employer!: User;

  @ApiProperty({ example: 'Desarrollador Backend', description: 'Título de la vacante' })
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @ApiProperty({ example: 'Se busca experto en NestJS para proyecto universitario', description: 'Detalle del trabajo' })
  @Column({ type: 'text' })
  description!: string;

  @ApiProperty({ example: 'Permanent', description: 'Tipo: Permanent, Temporary, o DailyChore' })
  @Column({ type: 'varchar', length: 50 })
  job_type!: string; 

  @ApiProperty({ example: 'Pending', description: 'Estado del pago: Pending o Paid' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  ad_payment_status?: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;
}