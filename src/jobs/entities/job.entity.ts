import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Business } from '../../modules/businesses/entities/business.entity';
import { JobCategory } from './job-category.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn() // Cambiado a secuencial numérico (1, 2, 3...)
  id: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ type: 'varchar', default: 'Open' }) // Open, Closed, In_Progress
  status: string;

  // Relación con el creador/empleador (ID numérico)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'employer_id' })
  employer: User;

  // Relación con la empresa (opcional si trabaja independiente)
  @ManyToOne(() => Business, { nullable: true })
  @JoinColumn({ name: 'business_id' })
  business?: Business;

  // Relación con la categoría de empleo (ID numérico)
  @ManyToOne(() => JobCategory, (category) => category.jobs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: JobCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}