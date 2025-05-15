import { Injectable } from '@nestjs/common';
import { ScheduleGroup } from './schedule_groups.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateScheduleGroupDto } from './dto/create-schedule_group.dto';

@Injectable()
export class ScheduleGroupsService {
  constructor(@InjectModel(ScheduleGroup) 
  private scheduleGroupRepository: typeof ScheduleGroup,
) {}

  async createScheduleGroup(dto: CreateScheduleGroupDto) {
    const scheduleGroup = await this.scheduleGroupRepository.create(dto)
    return scheduleGroup;
  }

  async getAllScheduleGroups() {
    const scheduleGroups = await this.scheduleGroupRepository.findAll({
      order: [['id', 'ASC']],
    });
    return scheduleGroups;
  }

  async getScheduleGroupByName(name: string){
    const scheduleGroup = await this.scheduleGroupRepository.findOne({where: {name}})
    return scheduleGroup;
  }
}
