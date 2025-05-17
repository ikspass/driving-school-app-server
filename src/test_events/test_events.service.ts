import { Injectable } from '@nestjs/common';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestEvent } from './test_events.model';
import { Group } from 'src/groups/groups.model';
import { Test } from 'src/tests/tests.model';

@Injectable()
export class TestEventsService {
  constructor(@InjectModel(TestEvent) private testEventRepository: typeof TestEvent) {}

  async createTestEvent(dto: CreateTestEventDto) {
    const testEvent = await this.testEventRepository.create(dto)
    return testEvent;
  }

  async getAllTestEvents() {
    const testEvents = await this.testEventRepository.findAll({
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Group},
        {model: Test},
      ]
    });
    return testEvents;
  }

  async deleteTestEvent(id: string) {
    return this.testEventRepository.destroy({ where: { id } });
  }
}
