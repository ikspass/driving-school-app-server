import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrivingEventsService } from './driving_events.service';
import { CreateDrivingEventDto } from './dto/create-driving_event.dto';
import { UpdateDrivingEventDto } from './dto/update-driving_event.dto';

@Controller('driving-events')
export class DrivingEventsController {
  constructor(private readonly drivingEventsService: DrivingEventsService) {}

  @Post()
  create(@Body() createDrivingEventDto: CreateDrivingEventDto) {
    return this.drivingEventsService.create(createDrivingEventDto);
  }

  @Get()
  findAll() {
    return this.drivingEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drivingEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrivingEventDto: UpdateDrivingEventDto) {
    return this.drivingEventsService.update(+id, updateDrivingEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drivingEventsService.remove(+id);
  }
}
