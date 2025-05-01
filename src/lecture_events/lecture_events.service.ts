import { Injectable } from '@nestjs/common';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';
import { UpdateLectureEventDto } from './dto/update-lecture_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LectureEvent } from './lecture_events.model';

@Injectable()
export class LectureEventsService {
  constructor(@InjectModel(LectureEvent) private lectureEventRepository: typeof LectureEvent) {}

  async createLectureEvent(dto: CreateLectureEventDto) {
    const lectureEvent = await this.lectureEventRepository.create(dto)
    return lectureEvent;
  }

  async getAllLectureEvents() {
    const lectureEvents = await this.lectureEventRepository.findAll({include:{all: true}});
    return lectureEvents;
  }
}
