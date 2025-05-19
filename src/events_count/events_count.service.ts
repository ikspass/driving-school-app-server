import { Injectable } from '@nestjs/common';
import { CreateEventsCountDto } from './dto/create-events_count.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EventsCount } from './events_count.model';

@Injectable()
export class EventsCountService {

  constructor(@InjectModel(EventsCount)
    private eventCountRepository: typeof EventsCount
  ){}

  async createEventCount(dto: CreateEventsCountDto) {
    const eventCount = await this.eventCountRepository.create(dto);
    switch (dto.event) {
      case 'driving_event':
        eventCount.description = 'Вождение';
        break;
      case 'lecture_event':
        eventCount.description = 'Лекция';
        break;
      case 'test_event':
        eventCount.description = 'Зачёт';
        break;
    }
    await eventCount.save();
    return eventCount;
  }

  async findAll() {
    const eventCounts = await this.eventCountRepository.findAll();
    return eventCounts;
  }

  async findOneByEvent(event: string) {
    const eventCount = await this.eventCountRepository.findOne({where: {event}})
    return eventCount;
  }
}
