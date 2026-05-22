import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './job.entity';

@Entity('job_categories')
export class JobCategory {
  @PrimaryGeneratedColumn() // Autoincremental numérico (1, 2, 3...)
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Job, (job) => job.category)
  jobs: Job[];
}