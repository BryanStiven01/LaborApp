import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../entities/user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  // Relación 1 a 1 requerida vinculada por user_id
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}