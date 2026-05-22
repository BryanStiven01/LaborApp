import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Job } from '../../../jobs/entities/job.entity';

@Entity('ratings') // [cite: 92]
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number; // [cite: 93]

  // Quien da la calificación 
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer!: User;

  // Quien recibe la calificación 
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewee_id' })
  reviewee!: User;

  // El trabajo por el cual se califica (es opcional, por eso el ?) 
  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'job_id' })
  job?: Job;

  @Column({ type: 'int4' })
  score!: number; // Valor del 1 al 5 [cite: 97]

  @Column({ type: 'text', nullable: true })
  comment?: string; // [cite: 98]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date; // [cite: 99]
}