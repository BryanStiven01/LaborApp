import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar' })
  password_hash!: string;

  @Column({ type: 'varchar' }) 
  role!: string; // 'Admin', 'Employer', o 'Worker'

  @Column({ type: 'varchar' })
  department!: string; // Para los filtros de zona geográfica

  @Column({ type: 'varchar' })
  municipality!: string; // Para los filtros de zona geográfica

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}