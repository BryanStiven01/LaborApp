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
import { User } from '../../users/entities/user.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id!: number;

  // Mantenemos la columna para poder guardar el ID directamente
  @Column({ type: 'int4' })
  employer_id!: number;

  // ¡Aquí está la conexión! Un Trabajo pertenece a Un Usuario (Empleador)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'employer_id' })
  employer!: User;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 50 })
  job_type!: string; // Permanent, Temporary, DailyChore

  @Column({ type: 'varchar', length: 50, nullable: true })
  ad_payment_status?: string; // Pending, Paid

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;
}