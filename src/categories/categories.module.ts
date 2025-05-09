import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Instructor } from 'src/instructors/instructors.model';
import { Group } from 'src/groups/groups.model';
import { Test } from 'src/tests/tests.model';
import { Student } from 'src/students/students.model';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category, Instructor, Group, Test, Student])
  ],
  exports: [CategoriesService]
})
export class CategoriesModule {}
