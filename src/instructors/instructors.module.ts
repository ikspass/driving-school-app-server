import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Instructor } from './instructors.model';
import { Category } from 'src/categories/categories.model';
import { InstructorCategory } from 'src/instructor_categories/instructor_categories.model';
import { DrivingEvent } from 'src/driving_events/driving_events.model';
import { Student } from 'src/students/students.model';
import { User } from 'src/users/users.model';
import { Transport } from 'src/transports/transports.model';

@Module({
  controllers: [InstructorsController],
  providers: [InstructorsService],
  imports: [
    SequelizeModule.forFeature([Instructor, Transport, Category, InstructorCategory, DrivingEvent, Student, User])
  ]
})
export class InstructorsModule {}
