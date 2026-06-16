import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Constructora El Esfuerzo', description: 'Nombre de la empresa' })
  @Column({ name: 'company_name' })
  companyName!: string;

  @ApiProperty({ example: 'Empresa dedicada a la construcción civil...', description: 'Descripción de la empresa' })
  @Column({ type: 'text', nullable: true })
  description!: string;

  @ApiProperty({ example: 'J-12345678-9', description: 'Número de RUC o identificación' })
  @Column({ name: 'tax_id', unique: true })
  taxId!: string;

  @ApiProperty({ example: 'Nueva Guinea, de la gasolinera 2c al norte', description: 'Dirección física' })
  @Column()
  address!: string;

  // Relación correcta con el usuario
  @OneToOne(() => User) 
  @JoinColumn({ name: 'user_id' })
  user!: User; 

  // Este campo se añade automáticamente al campo user_id de la BD
  @Column({ name: 'user_id' })
  userId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}