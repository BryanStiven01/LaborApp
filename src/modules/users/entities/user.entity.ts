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

  // --- AGREGA ESTAS DOS LÍNEAS ---
  @ApiProperty({ example: 'Pedro', description: 'Nombre del usuario' })
  @Column({ type: 'varchar' })
  first_name!: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @Column({ type: 'varchar' })
  last_name!: string;
  // -------------------------------

  @ApiProperty({ example: 'Worker', description: 'Rol del usuario' })
  @Column({ type: 'varchar' }) 
  role!: string;

  @ApiProperty({ example: 'Zelaya Central', description: 'Departamento' })
  @Column({ type: 'varchar' })
  department!: string;

  @ApiProperty({ example: 'Nueva Guinea', description: 'Municipio' })
  @Column({ type: 'varchar' })
  municipality!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  
}