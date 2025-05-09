import { Injectable } from '@nestjs/common';
import { CreateInstructorCategoryDto } from './dto/create-instructor_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InstructorCategory } from './instructor_categories.model';

@Injectable()
export class InstructorCategoriesService {

  constructor(
    @InjectModel(InstructorCategory)
    private instructorCategoryRepository: typeof InstructorCategory,
  ){}

  async createInstructorCategory(dto: CreateInstructorCategoryDto) {
    const instructorCategory = await this.instructorCategoryRepository.create(dto);
    return instructorCategory;
  }

  async findAllInstructorCategories() {
    const instructorCategories = await this.instructorCategoryRepository.findAll({
      order: [['id', 'ASC']],
      include: [
        {all: true}
      ]
    });
    return instructorCategories;  
  }
}
