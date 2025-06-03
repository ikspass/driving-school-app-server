import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Student } from './students.model';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Instructor } from 'src/instructors/instructors.model';

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

  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    return this.studentsService.getStudentById(id);
  }

  // @Get(':id/group')
  // async getStudentGroup(@Param('id') id: number) {
  //   return this.studentsService.getStudentGroup(id);
  // }

  @Get('instructor/:instructorId')
  async getStudentsByInstructor(@Param('instructorId') instructorId: number) {
    return this.studentsService.getStudentsByInstructor(instructorId);
  }

  @Get('teacher/:teacherId')
  async getStudentsByTeacher(@Param('teacherId') teacherId: number) {
    return this.studentsService.getStudentsByTeacher(teacherId);
  }

  @Get('group/not')
  async getStudentsWithoutGroup() {
    return this.studentsService.getStudentsWithoutGroup();
  }

  @ApiOperation({summary: 'Изменить статус курсанта'})
  @ApiResponse({status: 200, type: Student})
  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() body: {status: string}) {
    return this.studentsService.updateStudentStatus(id, body.status);
  }

  @ApiResponse({status: 200, type: Student})
  @Patch(':id/instructor/:instructorId')
  async updateInstructor(@Param('id') id: string, @Param('instructorId') instructorId: number) {
    return this.studentsService.updateStudentInstructor(id, instructorId);
  }

  @Patch(':id/group/:groupId')
  async setStudentGroup(@Param('id') id: number, @Param('groupId') groupId: number) {
    return this.studentsService.setStudentGroup(id, groupId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}
