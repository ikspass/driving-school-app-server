import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Body() dto: CreateTopicDto) {
    return this.topicsService.createTopic(dto);
  }

  @Get()
  findAll() {
    return this.topicsService.getAllTopics();
  }

  @Delete(':id')
  deleteTopic(@Param('id') id: string) {
    return this.topicsService.deleteTopic(id);
  }
}
