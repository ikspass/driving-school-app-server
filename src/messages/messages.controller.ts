import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get()
  getAllMessages() {
    return this.messagesService.getAllMessages();
  }

  @Get('group/:groupId')
  getMessagesByGroup(@Param('groupId') groupId: number) {
    return this.messagesService.getMessagesByGroup(groupId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }
}
