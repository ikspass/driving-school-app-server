import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LectureEventsService } from './lecture_events.service';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';
import { UpdateLectureEventDto } from './dto/update-lecture_event.dto';

@Controller('lecture-events')
export class LectureEventsController {
  constructor(private readonly lectureLessonsService: LectureEventsService) {}

  @Post()
  create(@Body() dto: CreateLectureEventDto) {
    return this.lectureLessonsService.createLectureEvent(dto);
  }

  @Get()
  findAll() {
    return this.lectureLessonsService.getAllLectureEvents();
  }
}
