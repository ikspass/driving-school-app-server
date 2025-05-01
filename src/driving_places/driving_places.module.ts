import { Module } from '@nestjs/common';
import { DrivingPlacesService } from './driving_places.service';
import { DrivingPlacesController } from './driving_places.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DrivingPlace } from './driving_places.model';
import { DrivingEvent } from 'src/driving_events/driving_events.model';

@Module({
  controllers: [DrivingPlacesController],
  providers: [DrivingPlacesService],
  imports: [
    SequelizeModule.forFeature([DrivingPlace, DrivingEvent])
  ]
})
export class DrivingPlacesModule {}
