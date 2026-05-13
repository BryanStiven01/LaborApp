import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID del usuario dueño del negocio' })
  @Column({ type: 'int4' })
  owner_id: number;

  @ManyToOne(() => User) 
  @JoinColumn({ name: 'owner_id' })
  owner: User; 

  @ApiProperty({ example: 'Constructora El Esfuerzo', description: 'Nombre de la empresa' })
  @Column()
  name: string;

  @ApiProperty({ example: 'J-12345678-9', description: 'Número de RUC o identificación' })
  @Column({ unique: true })
  tax_id: string;

  @ApiProperty({ example: 'Nueva Guinea, de la gasolinera 2c al norte', description: 'Dirección física' })
  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;
}