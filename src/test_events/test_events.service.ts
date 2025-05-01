import { Injectable } from '@nestjs/common';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';

@Injectable()
export class TestEventsService {
  create(createTestLessonDto: CreateTestEventDto) {
    return 'This action adds a new testLesson';
  }

  findAll() {
    return `This action returns all testLessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testLesson`;
  }

  update(id: number, updateTestLessonDto: UpdateTestLessonDto) {
    return `This action updates a #${id} testLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} testLesson`;
  }
}
