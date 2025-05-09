import { Injectable } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './test_results.model';

@Injectable()
export class TestResultsService {
  constructor(@InjectModel(TestResult)
    private testResultRepository: typeof TestResult,
  ){}

  async create(dto: CreateTestResultDto) {
    const testResult = await this.testResultRepository.create(dto);
    return testResult;
  }

  async findAll() {
    const tests = await this.testResultRepository.findAll({
      order: [['id', 'ASC']],
      include:[
        {all: true}
      ]
    });
    return tests;
  }
}
