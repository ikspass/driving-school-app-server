import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstructorCategoriesService } from './instructor_categories.service';
import { CreateInstructorCategoryDto } from './dto/create-instructor_category.dto';

@Controller('instructor-categories')
export class InstructorCategoriesController {
  constructor(private readonly instructorCategoriesService: InstructorCategoriesService) {}

  @Post()
  create(@Body() dto: CreateInstructorCategoryDto) {
    return this.instructorCategoriesService.createInstructorCategory(dto);
  }

  @Get()
  findAll() {
    return this.instructorCategoriesService.findAllInstructorCategories();
  }
}
