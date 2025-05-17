import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestEventsService } from './test_events.service';
import { CreateTestEventDto } from './dto/create-test_event.dto';

@Controller('test-events')
export class TestEventsController {
  constructor(private readonly testEventsService: TestEventsService) {}

  @Post()
  create(@Body() createTestLessonDto: CreateTestEventDto) {
    return this.testEventsService.createTestEvent(createTestLessonDto);
  }

  @Get()
  findAll() {
    return this.testEventsService.getAllTestEvents();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.testEventsService.deleteTestEvent(id);
  }
}
