import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestEventsService } from './test_events.service';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';

@Controller('test-events')
export class TestEventsController {
  constructor(private readonly testLessonsService: TestEventsService) {}

  @Post()
  create(@Body() createTestLessonDto: CreateTestEventDto) {
    return this.testLessonsService.createTestEvent(createTestLessonDto);
  }

  @Get()
  findAll() {
    return this.testLessonsService.getAllTestEvents();
  }
}
