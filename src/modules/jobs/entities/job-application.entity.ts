import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './job.entity';
import { User } from '../../users/entities/user.entity';

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn()
  id!: number;

  // Relación: job_id
  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job!: Job;

  // Relación: applicant_id
  @ManyToOne(() => User)
  @JoinColumn({ name: 'applicant_id' })
  applicant!: User;

  @Column({ type: 'text' })
  message!: string; // Mensaje de presentación del candidato

  @Column({ type: 'varchar', default: 'Pending' }) 
  status!: string; // 'Pending', 'Contacted', 'Rejected', 'Hired'

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  applied_at!: Date;
}