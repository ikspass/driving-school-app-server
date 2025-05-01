import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

  async createGroup(dto: CreateGroupDto) {
    const group = await this.groupRepository.create(dto)
    return group;
  }

  async getAllGroups() {
    const groups = await this.groupRepository.findAll({include:{all: true}});
    return groups;
  }
}
