import { Module } from '@nestjs/common';
import { EventsCountService } from './events_count.service';
import { EventsCountController } from './events_count.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsCount } from './events_count.model';

@Module({
  controllers: [EventsCountController],
  providers: [EventsCountService],
  imports: [
    SequelizeModule.forFeature([EventsCount])
  ],
})
export class EventsCountModule {}
