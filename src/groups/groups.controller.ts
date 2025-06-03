import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(dto);
  }

  @Get()
  findAll() {
    return this.groupsService.getAllGroups();
  }

  @Get(':id')
  getGroupById(@Param('id') id: number) {
    return this.groupsService.getGroupById(id);
  } 

  @Patch(':groupId/teacher/:teacherId')
  updateGroupTeacher(@Param('groupId') groupId: number, @Param('teacherId') teacherId: number) {
    return this.groupsService.updateGroupTeacher(groupId, teacherId);
  } 

  @Delete(':id')
  deleteGroup(@Param('id') id: string) {
    return this.groupsService.deleteGroup(id);
  }
}
