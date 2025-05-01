import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LectureEventsService } from './lecture_events.service';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';
import { UpdateLectureEventDto } from './dto/update-lecture_event.dto';

@Controller('lecture-lessons')
export class LectureEventsController {
  constructor(private readonly lectureLessonsService: LectureEventsService) {}

  @Post()
  create(@Body() createLectureLessonDto: CreateLectureEventDto) {
    return this.lectureLessonsService.create(createLectureLessonDto);
  }

  @Get()
  findAll() {
    return this.lectureLessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureLessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLectureLessonDto: UpdateLectureEventDto) {
    return this.lectureLessonsService.update(+id, updateLectureLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureLessonsService.remove(+id);
  }
}
