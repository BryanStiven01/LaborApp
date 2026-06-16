import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  // Quién envía el mensaje (Candidato o Empleador)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  // Quién recibe el mensaje
  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  // El contenido del texto de la conversación
  @Column({ type: 'text' })
  content: string;

  // Campos de contacto rápido opcionales (Teléfono o enlace directo a WhatsApp)
  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneContact: string;

  @Column({ type: 'text', nullable: true })
  whatsappLink: string;

  @CreateDateColumn()
  createdAt: Date;
}