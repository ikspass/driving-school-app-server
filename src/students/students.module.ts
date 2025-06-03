import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './students.model';
import { DrivingEvent } from 'src/driving_events/driving_events.model';
import { Group } from 'src/groups/groups.model';
import { Instructor } from 'src/instructors/instructors.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { StudentLecture } from 'src/student_lectures/student_lectures.model';
import { TestEvent } from 'src/test_events/test_events.model';
import { TestResult } from 'src/test_results/test_results.model';
import { User } from 'src/users/users.model';
import { CategoriesModule } from 'src/categories/categories.module';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    CategoriesModule,
    InstructorsModule,
    GroupsModule,
    SequelizeModule.forFeature([Student, DrivingEvent, Group, Instructor, LectureEvent, StudentLecture, TestEvent, TestResult, User])
  ],
  exports: [StudentsService]
})
export class StudentsModule {}
