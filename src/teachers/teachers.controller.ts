import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.createTeacher(dto);
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
