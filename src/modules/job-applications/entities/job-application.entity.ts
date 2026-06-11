import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn()
  id!: number;

  // Relación Muchos a Uno: Muchas postulaciones pertenecen a un solo Trabajo (job_id)
  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job!: Job;

  // Relación Muchos a Uno: Muchas postulaciones pertenecen a un solo Usuario candidato (applicant_id)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'applicant_id' })
  applicant!: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt!: Date;
}