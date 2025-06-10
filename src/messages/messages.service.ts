import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageRepository: typeof Message) {}

  async createMessage(dto: CreateMessageDto) {
    const message = await this.messageRepository.create(dto)
    return message;
  }

  async getAllMessages() {
    const messages = await this.messageRepository.findAll({include:{all: true}});
    return messages;
  }

  async getMessagesByGroup(groupId: number) {
    const messages = await this.messageRepository.findAll({where: {groupId}});
    return messages;
  }

  async delete(id: string) {
    return this.messageRepository.destroy({ where: { id } });
  }
}
