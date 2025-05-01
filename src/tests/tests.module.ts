import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from './tests.model';
import { Student } from 'src/students/students.model';
import { TestEvent } from 'src/test_events/test_events.model';

@Module({
  controllers: [TestsController],
  providers: [TestsService],
  imports: [
    SequelizeModule.forFeature([Test, Student, TestEvent])
  ]
})
export class TestsModule {}
