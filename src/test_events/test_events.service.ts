import { Injectable } from '@nestjs/common';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestEvent } from './test_events.model';

@Injectable()
export class TestEventsService {
  constructor(@InjectModel(TestEvent) private testEventRepository: typeof TestEvent) {}

  async createTestEvent(dto: CreateTestEventDto) {
    const testEvent = await this.testEventRepository.create(dto)
    return testEvent;
  }

  async getAllTestEvents() {
    const testEvents = await this.testEventRepository.findAll({include:{all: true}});
    return testEvents;
  }
}
