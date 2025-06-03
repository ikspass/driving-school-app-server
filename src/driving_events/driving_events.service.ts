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
import { TransportsService } from 'src/transports/transports.service';

@Injectable()
export class DrivingEventsService {
  constructor(@InjectModel(DrivingEvent) 
    private drivingEventRepository: typeof DrivingEvent,
    private transportService: TransportsService
  ) {}

  async createDrivingEvent(dto: CreateDrivingEventDto) {
    const drivingEvent = await this.drivingEventRepository.create(dto)
    const transport = await this.transportService.getTransportById(dto.transportId);

    if(transport){
      await drivingEvent.$set('transport', transport.id);
      drivingEvent.transport = transport;
      await drivingEvent.save();
    }

    return drivingEvent;
  }

  async getAllDrivingEvents() {
    const drivingEvents = await this.drivingEventRepository.findAll({
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Instructor, include: [{model: User}]},
        {model: Student, include: [{model: User}, {model: DrivingEvent}]},
        {model: DrivingPlace},
        {model: Transport}
      ]
    });
    return drivingEvents;
  }

  async getDrivingEventById(id: number) {
    const drivingEvent = await this.drivingEventRepository.findByPk(id, {
      include:[
        {model: Instructor, include: [{model: User}]},
        {model: Student, include: [{model: User}, {model: DrivingEvent}]},
        {model: DrivingPlace},
        {model: Transport}
      ]
    });
    return drivingEvent;
  }

  async getDrivingEventsByStudent(studentId: string) {
    const drivingEvents = await this.drivingEventRepository.findAll({
      where: {studentId},
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include: [
        {model: Instructor, include: [{model: User}]},
        {model: Student, include: [{model: User}, {model: DrivingEvent}]},
        {model: DrivingPlace},
        {model: Transport}
      ]
    });
    return drivingEvents;
  }

  async getDrivingEventsByInstructor(instructorId: string) {
    const drivingEvents = await this.drivingEventRepository.findAll({
      where: {instructorId},
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include: [
        {model: Instructor, include: [{model: User}]},
        {model: Student, include: [{model: User}, {model: DrivingEvent}]},
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
