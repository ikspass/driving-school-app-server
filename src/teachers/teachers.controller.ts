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

  @Get(':id')
  getTeacherById(@Param('id') id: number) {
    return this.teachersService.getTeacherById(id);
  }

  // @Get(':id/groups')
  // getTeacherGroups(@Param('id') id: number) {
  //   return this.teachersService.getTeacherGroups(id);
  // }

  @Patch(':id/:status')
  updateTeacherStatus(@Param('id') id: number, @Param('status') status: string){
    return this.teachersService.updateTeacherStatus(id, status);
  }

  @Delete(':id')  // Метод для удаления группы
  deleteTeacher(@Param('id') id: string) {
    return this.teachersService.deleteTeacher(id);
  }
}
