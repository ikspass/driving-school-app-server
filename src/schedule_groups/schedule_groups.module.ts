import { Module } from '@nestjs/common';
import { ScheduleGroupsService } from './schedule_groups.service';
import { ScheduleGroupsController } from './schedule_groups.controller';
import { ScheduleGroup } from './schedule_groups.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ScheduleGroupsService],
  controllers: [ScheduleGroupsController],
  imports: [
    SequelizeModule.forFeature([ScheduleGroup]),
  ]
})
export class ScheduleGroupsModule {}
