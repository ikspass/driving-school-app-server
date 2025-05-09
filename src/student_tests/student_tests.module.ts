import { Module } from '@nestjs/common';
import { StudentTestsService } from './student_tests.service';
import { StudentTestsController } from './student_tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentTest } from './student_tests.model';
import { TestEvent } from 'src/test_events/test_events.model';
import { Student } from 'src/students/students.model';

@Module({
  controllers: [StudentTestsController],
  providers: [StudentTestsService],
  imports: [
    SequelizeModule.forFeature([StudentTest, TestEvent, Student]),
  ]
})
export class StudentTestsModule {}
