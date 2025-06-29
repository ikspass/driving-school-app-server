import { Module } from '@nestjs/common';
import { LectureEventsService } from './lecture_events.service';
import { LectureEventsController } from './lecture_events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LectureEvent } from './lecture_events.model';
import { Group } from 'src/groups/groups.model';
import { Student } from 'src/students/students.model';
import { Teacher } from 'src/teachers/teachers.model';
import { StudentLecture } from 'src/student_lectures/student_lectures.model';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [LectureEventsController],
  providers: [LectureEventsService],
  imports: [
    SequelizeModule.forFeature([LectureEvent, Group, Student, Teacher, StudentLecture]),
    GroupsModule,
  ]
})
export class LectureEventsModule {}
