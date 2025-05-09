import { Module } from '@nestjs/common';
import { StudentLecturesService } from './student_lectures.service';
import { StudentLecturesController } from './student_lectures.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from 'src/students/students.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { StudentLecture } from './student_lectures.model';

@Module({
  controllers: [StudentLecturesController],
  providers: [StudentLecturesService],
  imports: [
    SequelizeModule.forFeature([Student, LectureEvent, StudentLecture]),
  ]
})
export class StudentLecturesModule {}
