import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './groups.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { Student } from 'src/students/students.model';
import { Teacher } from 'src/teachers/teachers.model';
import { TestEvent } from 'src/test_events/test_events.model';
import { CategoriesModule } from 'src/categories/categories.module';
import { ScheduleGroup } from 'src/schedule_groups/schedule_groups.model';
import { ScheduleGroupsModule } from 'src/schedule_groups/schedule_groups.module';
import { User } from 'src/users/users.model';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    CategoriesModule,
    ScheduleGroupsModule,
    SequelizeModule.forFeature([Group, User, Category, LectureEvent, Student, Teacher, TestEvent, ScheduleGroup])
  ]
})
export class GroupsModule {}
