import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications') // [cite: 102]
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number; // [cite: 103]

  // El usuario que recibe la notificación 
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar' })
  title!: string; // [cite: 105]

  @Column({ type: 'text' })
  content!: string; // [cite: 106]

  @Column({ type: 'boolean', default: false })
  is_read!: boolean; // [cite: 107]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date; // [cite: 108]
}