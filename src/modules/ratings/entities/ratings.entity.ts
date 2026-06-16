import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'reviewer_id' })
  reviewerId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer!: User;

  @Column({ name: 'reviewee_id' })
  revieweeId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewee_id' })
  reviewee!: User;

  @Column({ name: 'job_id', nullable: true })
  jobId?: number;

  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'job_id' })
  job?: Job;

  @Column({ type: 'int', default: 5 })
  score!: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;
}