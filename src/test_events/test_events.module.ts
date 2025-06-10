import { Module } from '@nestjs/common';
import { TestEventsService } from './test_events.service';
import { TestEventsController } from './test_events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestEvent } from './test_events.model';
import { Group } from 'src/groups/groups.model';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [TestEventsController],
  providers: [TestEventsService],
  imports: [
    SequelizeModule.forFeature([TestEvent, Group]),
    GroupsModule
  ]
})
export class TestLessonsModule {}
