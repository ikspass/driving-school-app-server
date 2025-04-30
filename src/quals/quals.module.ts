import { Module } from '@nestjs/common';
import { QualsService } from './quals.service';
import { QualsController } from './quals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Qual } from './quals.model';
import { Teacher } from 'src/teachers/teachers.model';
import { TeacherQuals } from './teacher-quals.model';

@Module({
  controllers: [QualsController],
  providers: [QualsService],
  imports: [
    SequelizeModule.forFeature([Qual, Teacher, TeacherQuals])
  ],
  exports: [
    QualsService
  ]
})
export class QualsModule {}
