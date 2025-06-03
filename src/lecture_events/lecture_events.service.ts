import { Injectable } from '@nestjs/common';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LectureEvent } from './lecture_events.model';
import { Teacher } from 'src/teachers/teachers.model';
import { User } from 'src/users/users.model';
import { Group } from 'src/groups/groups.model';
import { GroupsService } from 'src/groups/groups.service';
import { StudentLecture } from 'src/student_lectures/student_lectures.model';
import { Student } from 'src/students/students.model';

@Injectable()
export class LectureEventsService {
  constructor(@InjectModel(LectureEvent) 
    private lectureEventRepository: typeof LectureEvent,
    private groupService: GroupsService    
  ){}

  async createLectureEvent(dto: CreateLectureEventDto) {
    const lectureEvent = await this.lectureEventRepository.create(dto)
    return lectureEvent;
  }

  async getLectureEventById(id: string){
    const lectureEvent = await this.lectureEventRepository.findByPk(id, {
      include:[
        {model: Teacher, include: [User]},
        {model: Group},
        {model: Student},
        {model: StudentLecture}
      ]
    });
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
      ]
    });
    return lectureEvents;
  }
  
  async getLectureEventsByGroup(id: number) {
    const group = await this.groupService.getGroupById(id);
    const groupId = group?.id;
    const lectureEvents = await this.lectureEventRepository.findAll({
      where: {groupId},
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Teacher, include: [User]},
        {model: Group},
      ]
    });
    return lectureEvents;
  }

  async getLectureEventsByTeacher(teacherId: string) {
    const lectureEvents = await this.lectureEventRepository.findAll({
      where: {teacherId},
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ],
      include:[
        {model: Teacher, include: [User]},
        {model: Group},
      ]
    });
    return lectureEvents;
  }

  async delete(id: string) {
    return this.lectureEventRepository.destroy({ where: { id } });
  }
}
