import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'job_id' })
  jobId!: number;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job!: Job;

  @Column({ name: 'applicant_id' })
  applicantId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'applicant_id' })
  applicant!: User;

  // Campo nuevo: Mensaje del postulante
  @Column({ type: 'text', nullable: true })
  message!: string;

  // Campo nuevo: Estado de la postulación
  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  status!: string;

  @CreateDateColumn({ name: 'applied_at', type: 'timestamp' })
  appliedAt!: Date;
}