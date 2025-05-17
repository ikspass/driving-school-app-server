import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Qual } from 'src/quals/quals.model';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() dto: CreateTeacherDto, quals: Qual[]) {
    return this.teachersService.createTeacher(dto, quals);
  }

  @Get()
  getAll() {
    return this.teachersService.getAllTeachers();
  }

  @Delete(':id')  // Метод для удаления группы
  deleteTeacher(@Param('id') id: string) {
    return this.teachersService.deleteTeacher(id);
  }
}
