import { Module } from '@nestjs/common';
import { TeacherQualsService } from './teacher_quals.service';
import { TeacherQualsController } from './teacher_quals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from 'src/teachers/teachers.model';
import { Qual } from 'src/quals/quals.model';
import { TeacherQuals } from './teacher_quals.model';

@Module({
  controllers: [TeacherQualsController],
  providers: [TeacherQualsService],
  imports: [
    SequelizeModule.forFeature([Teacher, Qual, TeacherQuals]),
  ]
})
export class TeacherQualsModule {}
