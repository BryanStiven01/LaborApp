import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Constructora El Esfuerzo', description: 'Nombre de la empresa' })
  @Column()
  name!: string;

  @ApiProperty({ example: 'J-12345678-9', description: 'Número de RUC o identificación' })
  @Column({ unique: true })
  tax_id!: string;

  @ApiProperty({ example: 'Nueva Guinea, de la gasolinera 2c al norte', description: 'Dirección física' })
  @Column()
  address!: string;

  // Cambiado con éxito a Relación 1 a 1 vinculada por user_id
  @OneToOne(() => User) 
  @JoinColumn({ name: 'user_id' })
  user!: User; 

  @CreateDateColumn()
  createdAt!: Date;
}