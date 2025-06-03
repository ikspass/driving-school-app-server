import { Injectable } from '@nestjs/common';
import { CreateTestEventDto } from './dto/create-test_event.dto';
import { UpdateTestLessonDto } from './dto/update-test_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestEvent } from './test_events.model';
import { Group } from 'src/groups/groups.model';
import { Test } from 'src/tests/tests.model';
import { GroupsService } from 'src/groups/groups.service';
import { Op } from 'sequelize';

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
        // {model: Test},
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
        // {model: Test}
      ]
    });
    return testEvents;
  }

  async getTestEventsById(id: number) {
    const testEvents = await this.testEventRepository.findByPk(id, {
      include:[
        {model: Group},
        // {model: Test}
      ]
    });
    return testEvents;
  }

  async getTestEventsByTeacher(teacherId: number) {
    const groups = await this.groupService.getGroupsByTeacher(teacherId); // Предполагается, что метод возвращает массив групп
    console.log('groups: ', groups)
    if(groups){
      const groupIds = groups?.map(group => group.id); // Извлекаем идентификаторы групп
  
      const testEvents = await this.testEventRepository.findAll({
          where: {
              groupId: {
                  [Op.in]: groupIds, // Используем оператор Op.in для фильтрации по массиву groupIds
              },
          },
          order: [
              ['date', 'ASC'],
              ['time', 'ASC']
          ],
          include: [
              { model: Group },
              // { model: Test }
          ]
      });
  
      return testEvents;
    }
    return []
  }

  async deleteTestEvent(id: string) {
    return this.testEventRepository.destroy({ where: { id } });
  }
}
