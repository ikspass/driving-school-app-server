import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestEventsService } from './test_events.service';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';

@Controller('test-events')
export class TestEventsController {
  constructor(private readonly testLessonsService: TestEventsService) {}

  @Post()
  create(@Body() createTestLessonDto: CreateTestEventDto) {
    return this.testLessonsService.create(createTestLessonDto);
  }

  @Get()
  findAll() {
    return this.testLessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testLessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestLessonDto: UpdateTestLessonDto) {
    return this.testLessonsService.update(+id, updateTestLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testLessonsService.remove(+id);
  }
}
