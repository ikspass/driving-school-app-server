import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chapter } from './chapters.model';
import { Topic } from 'src/topics/topics.model';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService],
  imports: [
    SequelizeModule.forFeature([Chapter, Topic])
  ]
})
export class ChaptersModule {}
