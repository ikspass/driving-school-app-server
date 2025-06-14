import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Instructor } from './instructors.model';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorsService.createInstructor(createInstructorDto);
  }

  @Get()
  getAll() {
    return this.instructorsService.getAllInstructors();
  }

  @ApiOperation({summary: 'Изменить статус инструктора'})
  @ApiResponse({status: 200, type: Instructor})
  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() status: string) {
    return this.instructorsService.updateInstructorStatus(id, status);
  }

  @Get(':id')
  getInstructorById(@Param('id') id: number){
    return this.instructorsService.getInstructorById(id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
  //   return this.instructorsService.update(+id, updateInstructorDto);
  // }
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.instructorsService.delete(id);
  }
}
