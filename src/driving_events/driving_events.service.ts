import { Injectable } from '@nestjs/common';
import { CreateDrivingEventDto } from './dto/create-driving_event.dto';
import { UpdateDrivingEventDto } from './dto/update-driving_event.dto';

@Injectable()
export class DrivingEventsService {
  create(createDrivingEventDto: CreateDrivingEventDto) {
    return 'This action adds a new drivingEvent';
  }

  findAll() {
    return `This action returns all drivingEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drivingEvent`;
  }

  update(id: number, updateDrivingEventDto: UpdateDrivingEventDto) {
    return `This action updates a #${id} drivingEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} drivingEvent`;
  }
}
