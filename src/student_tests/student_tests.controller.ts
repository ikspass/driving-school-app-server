import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentTestsService } from './student_tests.service';
import { CreateStudentTestDto } from './dto/create-student_test.dto';

@Controller('student-tests')
export class StudentTestsController {
  constructor(private readonly studentTestsService: StudentTestsService) {}

  @Post()
  create(@Body() dto: CreateStudentTestDto) {
    return this.studentTestsService.create(dto);
  }

  @Get()
  findAll() {
    return this.studentTestsService.findAll()
  }

  @Get('student/:id')
  findAllByStudentId(@Param('id') studentId: number) {
    return this.studentTestsService.findAllByStudentId(studentId)
  }

  @Get('test-event/:id')
  findAllByTestEventId(@Param('id') testEventId: number) {
    return this.studentTestsService.findAllByTestId(testEventId)
  }

  @Patch('attended/student/:studentId/test/:testId')
  updateStudentTestAbsent(@Param('studentId') studentId: number, @Param('testId') testId: number) {
    return this.studentTestsService.updateStudentTestAttended(testId, studentId);
  }

  @Patch('passed/student/:studentId/test/:testId')
  updateStudentTestPassed(@Param('studentId') studentId: number, @Param('testId') testId: number) {
    return this.studentTestsService.updateStudentTestPassed(testId, studentId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentTestsService.delete(id);
  }
}
