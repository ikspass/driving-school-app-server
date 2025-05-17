import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/categories.model';
import { Teacher } from 'src/teachers/teachers.model';
import { User } from 'src/users/users.model';
import { ScheduleGroup } from 'src/schedule_groups/schedule_groups.model';
import { ScheduleGroupsService } from 'src/schedule_groups/schedule_groups.service';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) 
  private groupRepository: typeof Group,
  private categoryService: CategoriesService,
  private scheduleService: ScheduleGroupsService
) {}

  async createGroup(dto: CreateGroupDto) {
    const group = await this.groupRepository.create(dto)
    const category = await this.categoryService.getCategoryByValue(dto.categoryValue);
    if(category){
      await group.$set('category', category.id)
      group.category = category;
      await group.save();
    }
    const schedule = await this.scheduleService.getScheduleGroupByName(dto.scheduleGroupName);
    if(schedule){
      await group.$set('scheduleGroup', schedule.id)
      group.scheduleGroup = schedule;
      await group.save();
    }
    return group;
  }

  async getAllGroups() {
    const groups = await this.groupRepository.findAll({
      order: [['id', 'ASC']],
      include:[
        {model: Category},
        {model: ScheduleGroup},
        {model: Teacher, include: [User]}
      ]
    });
    return groups;
  }

  async getGroupById(id: number){
    const group = await this.groupRepository.findByPk(id, {
      include: [
        {model: Category},
        {model: ScheduleGroup},
        {model: Teacher, include: [User]}
      ]
    })
    return group;
  }

  async deleteGroup(id: string) {
    return this.groupRepository.destroy({ where: { id } });
  }
}
