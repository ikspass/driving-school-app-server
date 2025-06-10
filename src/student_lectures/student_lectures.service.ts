import { Injectable } from '@nestjs/common';
import { CreateStudentLectureDto } from './dto/create-student_lecture.dto';
import { UpdateStudentLectureDto } from './dto/update-student_lecture.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentLecture } from './student_lectures.model';
import { Student } from 'src/students/students.model';
import { User } from 'src/users/users.model';

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

  async findByLectureId (lectureId: number) {
    const studentLectures = await this.studentLectureRepository.findAll({
      where: {lectureId},
      order: [['studentId', 'ASC']],
      include:[
        {model: Student, include: [User]}
      ]
    });
    return studentLectures;
  }

  async findByStudentId (studentId: number) {
    const studentLectures = await this.studentLectureRepository.findAll({
      where: {studentId},
      order: [['lectureId', 'ASC']],
      include:[
        {model: Student, include: [User]}
      ]
    });
    return studentLectures;
  }

  async updateStudentLecture(lectureId: number, studentId: number) {
    const studentLecture = await this.studentLectureRepository.findOne({
      where: {
        lectureId: lectureId,
        studentId: studentId,
      },
    });
    console.log('Найденная запись:', studentLecture);
    if (studentLecture) {
      studentLecture.attended = false;
      await studentLecture.save();
    }
  
    return studentLecture;
  }

  async delete(id: string) {
    return this.studentLectureRepository.destroy({ where: { id } });
  }
}
