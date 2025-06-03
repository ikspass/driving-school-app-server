import { Module } from '@nestjs/common';
import { DrivingEventsService } from './driving_events.service';
import { DrivingEventsController } from './driving_events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DrivingEvent } from './driving_events.model';
import { DrivingPlace } from 'src/driving_places/driving_places.model';
import { Instructor } from 'src/instructors/instructors.model';
import { Student } from 'src/students/students.model';
import { Transport } from 'src/transports/transports.model';
import { TransportsModule } from 'src/transports/transports.module';

@Module({
  controllers: [DrivingEventsController],
  providers: [DrivingEventsService],
  imports: [
    SequelizeModule.forFeature([DrivingEvent, DrivingPlace, Instructor, Student, Transport]),
    TransportsModule
  ]
})
export class DrivingEventsModule {}
