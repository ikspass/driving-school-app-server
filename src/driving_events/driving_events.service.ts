import { Injectable } from '@nestjs/common';
import { CreateDrivingEventDto } from './dto/create-driving_event.dto';
import { UpdateDrivingEventDto } from './dto/update-driving_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DrivingEvent } from './driving_events.model';
import { Instructor } from 'src/instructors/instructors.model';
import { User } from 'src/users/users.model';
import { Student } from 'src/students/students.model';
import { DrivingPlace } from 'src/driving_places/driving_places.model';
import { Transport } from 'src/transports/transports.model';

@Injectable()
export class DrivingEventsService {
  constructor(@InjectModel(DrivingEvent) private drivingEventRepository: typeof DrivingEvent) {}

  async createDrivingEvent(dto: CreateDrivingEventDto) {
    const drivingEvent = await this.drivingEventRepository.create(dto)
    return drivingEvent;
  }

  async getAllDrivingEvents() {
    const drivingEvents = await this.drivingEventRepository.findAll({
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Instructor, include: [User]},
        {model: Student, include: [User]},
        {model: DrivingPlace},
        {model: Transport}
      ]
    });
    return drivingEvents;
  }

  async delete(id: string) {
    return this.drivingEventRepository.destroy({ where: { id } });
  }
}
