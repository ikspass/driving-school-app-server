import { Injectable } from '@nestjs/common';
import { CreateLectureEventDto } from './dto/create-lecture_event.dto';
import { UpdateLectureEventDto } from './dto/update-lecture_event.dto';

@Injectable()
export class LectureEventsService {
  create(createLectureLessonDto: CreateLectureEventDto) {
    return 'This action adds a new lectureLesson';
  }

  findAll() {
    return `This action returns all lectureLessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lectureLesson`;
  }

  update(id: number, updateLectureLessonDto: UpdateLectureEventDto) {
    return `This action updates a #${id} lectureLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lectureLesson`;
  }
}
