import { Injectable } from '@nestjs/common';
import { CreateDrivingEventDto } from './dto/create-driving_event.dto';
import { UpdateDrivingEventDto } from './dto/update-driving_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DrivingEvent } from './driving_events.model';

@Injectable()
export class DrivingEventsService {
  constructor(@InjectModel(DrivingEvent) private drivingEventRepository: typeof DrivingEvent) {}

  async createDrivingEvent(dto: CreateDrivingEventDto) {
    const drivingEvent = await this.drivingEventRepository.create(dto)
    return drivingEvent;
  }

  async getAllDrivingEvents() {
    const drivingEvents = await this.drivingEventRepository.findAll({include:{all: true}});
    return drivingEvents;
  }
}
