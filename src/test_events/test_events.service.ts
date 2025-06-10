import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestEvent } from './test_events.model';
import { Group } from 'src/groups/groups.model';
import { GroupsService } from 'src/groups/groups.service';
import { Op } from 'sequelize';
import { Student } from 'src/students/students.model';
import { User } from 'src/users/users.model';
import { Test } from 'src/tests/tests.model';

@Injectable()
export class TestEventsService {
  constructor(@InjectModel(TestEvent)
    private testEventRepository: typeof TestEvent,
    private groupService: GroupsService
  ) {}

  async createTestEvent(dto: CreateTestEventDto) {
    const testEvent = await this.testEventRepository.create(dto)
    return testEvent;
  }

  async getAllTestEvents() {
    const testEvents = await this.testEventRepository.findAll({
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Group},
        {model: Test}
      ]
    });
    return testEvents;
  }

  async getTestEventsByStudent(studentId: number) {
    const group = await this.groupService.getGroupByStudent(studentId);
    const groupId = group?.id;
    const testEvents = await this.testEventRepository.findAll({
      where: {groupId},
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Group},
        {model: Test}
      ]
    });
    return testEvents;
  }

  async getTestEventsById(id: number) {
    const testEvents = await this.testEventRepository.findByPk(id, {
      include:[
        {model: Group, include: [{model: Student, include: [User]}]},
        {model: Test}
      ]
    });
    return testEvents;
  }

  async getTestEventsByTeacher(teacherId: number) {
    const groups = await this.groupService.getGroupsByTeacher(teacherId);
    console.log('groups: ', groups)
    if(groups){
      const groupIds = groups?.map(group => group.id);
  
      const testEvents = await this.testEventRepository.findAll({
          where: {
              groupId: {
                  [Op.in]: groupIds,
              },
          },
          order: [
              ['date', 'ASC'],
              ['time', 'ASC']
          ],
          include: [
              { model: Group },
              {model: Test}
          ]
      });
  
      return testEvents;
    }
    return []
  }

  async updateTestEventStatus(eventId: number, status: string){
    const event = await this.testEventRepository.findByPk(eventId);
    if(!event){
      throw new HttpException('Событие не найдено', HttpStatus.NOT_FOUND)
    }

    event.status = status;
    await event.save();

    return event;
  }

  async deleteTestEvent(id: string) {
    return this.testEventRepository.destroy({ where: { id } });
  }
}
