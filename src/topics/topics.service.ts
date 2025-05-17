import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Topic } from './topics.model';

@Injectable()
export class TopicsService {

  constructor(@InjectModel(Topic) private topicRepository: typeof Topic) {}

  async createTopic(dto: CreateTopicDto) {
    const topic = await this.topicRepository.create(dto)
    return topic;
  }

  async getAllTopics() {
    const topics = await this.topicRepository.findAll({include:{all: true}});
    return topics;
  }

  async deleteTopic(id: string) {
    return this.topicRepository.destroy({ where: { id } });
  }
}
