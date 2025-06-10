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

  @Get('lecture/:id')
  findByLectureId(@Param('id') id: number) {
    return this.studentLecturesService.findByLectureId(id);
  }

  @Get('student/:id')
  findByStudentId(@Param('id') id: number) {
    return this.studentLecturesService.findByStudentId(id);
  }

  @Patch('student/:studentId/lecture/:lectureId')
  updateStudentLectureAbsent(@Param('studentId') studentId: number, @Param('lectureId') lectureId: number) {
    return this.studentLecturesService.updateStudentLecture(lectureId, studentId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentLecturesService.delete(id);
  }
}
