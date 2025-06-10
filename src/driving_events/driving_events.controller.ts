import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrivingEventsService } from './driving_events.service';
import { CreateDrivingEventDto } from './dto/create-driving_event.dto';
import { UpdateDrivingEventDto } from './dto/update-driving_event.dto';

@Controller('driving-events')
export class DrivingEventsController {
  constructor(private readonly drivingEventsService: DrivingEventsService) {}

  @Post()
  create(@Body() dto: CreateDrivingEventDto) {
    return this.drivingEventsService.createDrivingEvent(dto);
  }

  @Get()
  findAll() {
    return this.drivingEventsService.getAllDrivingEvents();
  }

  @Get('student/:id')
  getDrivingEventsByStudent(@Param('id') id: string) {
    return this.drivingEventsService.getDrivingEventsByStudent(id);
  }

  @Get('instructor/:id')
  getDrivingEventsByInstructor(@Param('id') id: string) {
    return this.drivingEventsService.getDrivingEventsByInstructor(id);
  }

  @Get(':id')
  getDrivingEventsById(@Param('id') id: number) {
    return this.drivingEventsService.getDrivingEventById(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() body: {status: string}) {
    return this.drivingEventsService.updateDrivingEventStatus(id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.drivingEventsService.delete(id);
  }
}
