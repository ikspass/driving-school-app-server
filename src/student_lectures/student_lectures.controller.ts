import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentLecturesService } from './student_lectures.service';
import { CreateStudentLectureDto } from './dto/create-student_lecture.dto';

@Controller('student-lectures')
export class StudentLecturesController {
  constructor(private readonly studentLecturesService: StudentLecturesService) {}

  @Post()
  create(@Body() dto: CreateStudentLectureDto) {
    return this.studentLecturesService.create(dto);
  }

  @Get()
  findAll() {
    return this.studentLecturesService.findAll();
  }
}
