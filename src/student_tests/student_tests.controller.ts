import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentTestsService } from './student_tests.service';
import { CreateStudentTestDto } from './dto/create-student_test.dto';

@Controller('student-tests')
export class StudentTestsController {
  constructor(private readonly studentTestsService: StudentTestsService) {}

  @Post()
  create(@Body() createStudentTestDto: CreateStudentTestDto) {
    return this.studentTestsService.create(createStudentTestDto);
  }

  @Get()
  findAll() {
    return this.studentTestsService.findAll();
  }
}
