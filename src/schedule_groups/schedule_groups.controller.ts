import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleGroupsService } from './schedule_groups.service';
import { CreateScheduleGroupDto } from './dto/create-schedule_group.dto';

@Controller('schedule-groups')
export class ScheduleGroupsController {
  constructor(private readonly scheduleGroupService: ScheduleGroupsService) {}

  @Post()
  create(@Body() dto: CreateScheduleGroupDto) {
    return this.scheduleGroupService.createScheduleGroup(dto);
  }

  @Get()
  getAll() {
    return this.scheduleGroupService.getAllScheduleGroups();
  }

  @Get()
  getByName(@Body() name: string) {
    return this.scheduleGroupService.getScheduleGroupByName(name);
  }
}
