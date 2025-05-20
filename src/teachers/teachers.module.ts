import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './teachers.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Qual } from 'src/quals/quals.model';
import { QualsModule } from 'src/quals/quals.module';
import { Group } from 'src/groups/groups.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { TeacherQuals } from 'src/teacher_quals/teacher_quals.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [
    SequelizeModule.forFeature([Teacher, Qual, Group, LectureEvent, TeacherQuals, User]),
    QualsModule
  ],
  exports: [TeachersService]
})
export class TeachersModule {}
