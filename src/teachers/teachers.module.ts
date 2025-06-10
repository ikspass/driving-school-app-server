import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './teachers.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'src/groups/groups.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [
    SequelizeModule.forFeature([Teacher, Group, LectureEvent, User]),
    
  ],
  exports: [TeachersService]
})
export class TeachersModule {}
