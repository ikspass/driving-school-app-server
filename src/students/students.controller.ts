import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Student } from './students.model';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Студенты')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({summary: 'Создание курсанта'})
  @ApiResponse({status: 200, type: Student})
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }

  @ApiOperation({summary: 'Получение всех курсантов'})
  @ApiResponse({status: 200, type: [Student]})
  @Get()
  getAll() {
    return this.studentsService.getAllStudents();
  }

  @ApiOperation({summary: 'Изменить статус курсанта'})
  @ApiResponse({status: 200, type: Student})
  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() dto: UpdateStatusDto) {
    return this.studentsService.updateStudentStatus(id, dto);
  }
}
