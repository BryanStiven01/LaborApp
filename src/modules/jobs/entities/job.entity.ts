import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Business } from '../../businesses/entities/business.entity';
import { JobCategory } from './job-category.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'employer_id' })
  employerId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'employer_id' })
  employer!: User;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  // Campo nuevo solicitado
  @Column({ name: 'job_type', type: 'varchar', length: 50, nullable: true })
  jobType!: string;

  // Campo nuevo solicitado
  @Column({ name: 'ad_payment_status', type: 'varchar', length: 50, nullable: true })
  adPaymentStatus!: string;

  // Campo nuevo solicitado
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @ManyToOne(() => Business, { nullable: true })
  @JoinColumn({ name: 'business_id' })
  business?: Business;

  @ManyToOne(() => JobCategory, (category) => category.jobs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category!: JobCategory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}