import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  create(@Body() dto: CreateTestDto) {
    return this.testsService.createTest(dto);
  }

  @Get()
  findAll() {
    return this.testsService.getAllTests();
  }
}
