import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './tests.model';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TestsService {
  constructor(@InjectModel(Test) 
  private testRepository: typeof Test,
  private categoryService: CategoriesService
) {}

  async createTest(dto: CreateTestDto) {
    const test = await this.testRepository.create(dto);
    const category = await this.categoryService.getCategoryByValue(dto.categoryValue);
    if(category){
      await test.$set('category', category.id)
      test.category = category;
      await test.save();
    }
    return test;
  }

  async getAllTests() {
    const tests = await this.testRepository.findAll({include:{all: true}});
    return tests;
  }

  async deleteTest(id: string) {
    return this.testRepository.destroy({ where: { id } });
  }
}
