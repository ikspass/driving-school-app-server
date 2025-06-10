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
  
  @Get(':id')
  getTestEventById(@Param('id') id: number) {
    return this.testEventsService.getTestEventsById(id);
  }

  @Get('student/:id')
  getTestEventsByStudent(@Param('id') id: number) {
    return this.testEventsService.getTestEventsByStudent(id);
  }

  @Get('teacher/:id')
  getTestEventsByTeacher(@Param('id') id: number) {
    return this.testEventsService.getTestEventsByTeacher(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() body: {status: string}) {
    return this.testEventsService.updateTestEventStatus(id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.testEventsService.deleteTestEvent(id);
  }
}
