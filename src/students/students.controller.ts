import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @UsePipes(new ValidationPipe)
  async create(@Body() dto: CreateStudentDto) {
    return this.studentsService.createStudent(dto);
  }

  @ApiOperation({summary: 'Получение всех курсантов'})
  @ApiResponse({status: 200, type: [Student]})
  @Get()
  async getAll() {
    return this.studentsService.getAllStudents();
  }

  @ApiOperation({summary: 'Изменить статус курсанта'})
  @ApiResponse({status: 200, type: Student})
  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateStatusDto) {
    return this.studentsService.updateStudentStatus(id, dto);
  }
}
