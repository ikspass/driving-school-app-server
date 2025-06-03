import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LectureEventsService } from './lecture_events.service';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';

@Controller('lecture-events')
export class LectureEventsController {
  constructor(private readonly lectureEventsService: LectureEventsService) {}

  @Post()
  create(@Body() dto: CreateLectureEventDto) {
    return this.lectureEventsService.createLectureEvent(dto);
  }

  @Get(':id')
  getLectureEventById(@Param('id') id: string) {
    return this.lectureEventsService.getLectureEventById(id);
  }

  @Get()
  findAll() {
    return this.lectureEventsService.getAllLectureEvents();
  }

  @Get('group/:id')
  getLectureEventsByGroup(@Param('id') id: number) {
    return this.lectureEventsService.getLectureEventsByGroup(id);
  } 

  @Get('teacher/:id')
  getLectureEventsByTeacher(@Param('id') id: string) {
    return this.lectureEventsService.getLectureEventsByTeacher(id);
  } 

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.lectureEventsService.delete(id);
  }
}
