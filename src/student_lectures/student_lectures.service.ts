import { Injectable } from '@nestjs/common';
import { CreateStudentLectureDto } from './dto/create-student_lecture.dto';
import { UpdateStudentLectureDto } from './dto/update-student_lecture.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentLecture } from './student_lectures.model';

@Injectable()
export class StudentLecturesService {
  constructor(@InjectModel(StudentLecture)
    private studentLectureRepository: typeof StudentLecture,
  ){}

  async create(dto: CreateStudentLectureDto) {
    const studentLecture = await this.studentLectureRepository.create(dto);
    return studentLecture;
  }

  async findAll() {
    const studentLectures = await this.studentLectureRepository.findAll({
      order: [['id', 'ASC']],
      include:[
        {all: true}
      ]
    });
    return studentLectures;
  }
}
