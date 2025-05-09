import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherQualsService } from './teacher_quals.service';
import { CreateTeacherQualDto } from './dto/create-teacher_qual.dto';

@Controller('teacher-quals')
export class TeacherQualsController {
  constructor(private readonly teacherQualsService: TeacherQualsService) {}

  @Post()
  create(@Body() dto: CreateTeacherQualDto) {
    return this.teacherQualsService.createTeacherQual(dto);
  }

  @Get()
  findAll() {
    return this.teacherQualsService.findAllTeacherQuals();
  }
}
