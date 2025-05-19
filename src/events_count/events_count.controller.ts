import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsCountService } from './events_count.service';
import { CreateEventsCountDto } from './dto/create-events_count.dto';

@Controller('events-count')
export class EventsCountController {
  constructor(private readonly eventsCountService: EventsCountService) {}

  @Post()
  create(@Body() dto: CreateEventsCountDto) {
    return this.eventsCountService.createEventCount(dto);
  }

  @Get()
  findAll() {
    return this.eventsCountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsCountService.findOneByEvent(id);
  }
}
