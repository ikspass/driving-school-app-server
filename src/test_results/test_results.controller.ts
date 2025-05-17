import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { CreateTestResultDto } from './dto/create-test_result.dto';

@Controller('test-results')
export class TestResultsController {
  constructor(private readonly testResultsService: TestResultsService) {}

  @Post()
  create(@Body() createTestResultDto: CreateTestResultDto) {
    return this.testResultsService.create(createTestResultDto);
  }

  @Get()
  findAll() {
    return this.testResultsService.findAll();
  }

  @Delete(':id')
  deleteTestResult(@Param('id') id: string) {
    return this.testResultsService.deleteTestResult(id);
  }
}
