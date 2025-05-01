import { Module } from '@nestjs/common';
import { TestEventsService } from './test_events.service';
import { TestEventsController } from './test_events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestEvent } from './test_events.model';
import { Group } from 'src/groups/groups.model';
import { Test } from 'src/tests/tests.model';

@Module({
  controllers: [TestEventsController],
  providers: [TestEventsService],
  imports: [
    SequelizeModule.forFeature([TestEvent, Group, Test])
  ]
})
export class TestLessonsModule {}
