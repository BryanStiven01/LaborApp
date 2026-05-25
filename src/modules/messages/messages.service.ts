import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  // Enviar un nuevo mensaje con opción de contacto directo
  async create(createMessageDto: CreateMessageDto) {
    try {
      const { senderId, receiverId, ...messageData } = createMessageDto;

      const newMessage = this.messageRepository.create({
        ...messageData,
        sender: { id: senderId },
        receiver: { id: receiverId },
      } as unknown as Message); // Mapeo seguro contra quejas de TypeScript

      return await this.messageRepository.save(newMessage);
    } catch (error) {
      console.error('🔴 ERROR AL ENVIAR MENSAJE:', error);
      throw new BadRequestException('No se pudo enviar el mensaje. Verifique los IDs de usuario.');
    }
  }

  // Obtener el historial completo de mensajes entre dos usuarios
  async getChatHistory(userA: number, userB: number) {
    return await this.messageRepository.createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where(
        '(sender.id = :userA AND receiver.id = :userB) OR (sender.id = :userB AND receiver.id = :userA)',
        { userA, userB }
      )
      .orderBy('message.createdAt', 'ASC') // Ordenados del más viejo al más nuevo
      .getMany();
  }
}