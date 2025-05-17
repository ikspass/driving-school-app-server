import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './tests.model';

@Injectable()
export class TestsService {
  constructor(@InjectModel(Test) private testRepository: typeof Test) {}

  async createTest(dto: CreateTestDto) {
    const test = await this.testRepository.create(dto)
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
