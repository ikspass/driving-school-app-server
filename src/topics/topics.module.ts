import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from './topics.model';
import { User } from 'src/users/users.model';
import { Chapter } from 'src/chapters/chapters.model';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  imports: [
    SequelizeModule.forFeature([Topic, User, Chapter])
  ]
})
export class TopicsModule {}
