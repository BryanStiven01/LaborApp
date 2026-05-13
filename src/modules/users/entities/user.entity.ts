import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // <-- Asegúrate de que esta línea esté presente

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'usuario@correo.com', description: 'Correo electrónico único' })
  @Column({ type: 'varchar', unique: true })
  email!: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @Column({ type: 'varchar' })
  password_hash!: string;

  @ApiProperty({ example: 'Worker', description: 'Rol del usuario: Admin, Employer o Worker' })
  @Column({ type: 'varchar' }) 
  role!: string;

  @ApiProperty({ example: 'Zelaya Central', description: 'Departamento de residencia' })
  @Column({ type: 'varchar' })
  department!: string;

  @ApiProperty({ example: 'Nueva Guinea', description: 'Municipio de residencia' })
  @Column({ type: 'varchar' })
  municipality!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}