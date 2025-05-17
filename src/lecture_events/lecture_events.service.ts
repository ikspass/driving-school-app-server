import { Injectable } from '@nestjs/common';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';
import { UpdateLectureEventDto } from './dto/update-lecture_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LectureEvent } from './lecture_events.model';
import { Teacher } from 'src/teachers/teachers.model';
import { User } from 'src/users/users.model';
import { Group } from 'src/groups/groups.model';
import { Chapter } from 'src/chapters/chapters.model';

@Injectable()
export class LectureEventsService {
  constructor(@InjectModel(LectureEvent) private lectureEventRepository: typeof LectureEvent) {}

  async createLectureEvent(dto: CreateLectureEventDto) {
    const lectureEvent = await this.lectureEventRepository.create(dto)
    return lectureEvent;
  }

  async getAllLectureEvents() {
    const lectureEvents = await this.lectureEventRepository.findAll({
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Teacher, include: [User]},
        {model: Group},
        {model: Chapter}
      ]
    });
    return lectureEvents;
  }

  async delete(id: string) {
    return this.lectureEventRepository.destroy({ where: { id } });
  }
}
