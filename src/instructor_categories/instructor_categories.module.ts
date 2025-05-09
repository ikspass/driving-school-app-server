import { Module } from '@nestjs/common';
import { InstructorCategoriesService } from './instructor_categories.service';
import { InstructorCategoriesController } from './instructor_categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstructorCategory } from './instructor_categories.model';
import { Instructor } from 'src/instructors/instructors.model';
import { Category } from 'src/categories/categories.model';

@Module({
  controllers: [InstructorCategoriesController],
  providers: [InstructorCategoriesService],
  imports:[
    SequelizeModule.forFeature([InstructorCategory, Instructor, Category])
  ]
})
export class InstructorCategoriesModule {}
