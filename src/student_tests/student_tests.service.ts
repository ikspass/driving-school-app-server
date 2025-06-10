import { Injectable } from '@nestjs/common';
import { CreateStudentTestDto } from './dto/create-student_test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentTest } from './student_tests.model';
import { Student } from 'src/students/students.model';
import { User } from 'src/users/users.model';

@Injectable()
export class StudentTestsService {
  constructor(@InjectModel(StudentTest)
    private studentTestRepository: typeof StudentTest
  ){}

  async create(dto: CreateStudentTestDto) {
    const studentTest = await this.studentTestRepository.create(dto);
    return studentTest;
  }

  async findAll() {
    const studentTests = await this.studentTestRepository.findAll({
      order: [['id', 'ASC']],
      include: {all: true}
    })
    return studentTests;
  }

  async findAllByStudentId(studentId: number) {
    const studentTests = await this.studentTestRepository.findAll({
      where: {studentId},
      order: [['id', 'ASC']],
      include: {all: true}
    })
    return studentTests;
  }

  async updateStudentTestAttended(testId: number, studentId: number) {
    const studentTest = await this.studentTestRepository.findOne({
      where: {
        testEventId: testId,
        studentId: studentId,
      },
    });
    console.log('Найденная запись:', studentTest);
    if (studentTest) {
      studentTest.attended = false;
      await studentTest.save();
    }
  
    return studentTest;
  }

  async updateStudentTestPassed(testId: number, studentId: number) {
    const studentTest = await this.studentTestRepository.findOne({
      where: {
        testEventId: testId,
        studentId: studentId,
      },
    });
    console.log('Найденная запись:', studentTest);
    if (studentTest) {
      studentTest.passed = true;
      await studentTest.save();
    }
  
    return studentTest;
  }

  async findAllByTestId(testEventId: number) {
    const studentTests = await this.studentTestRepository.findAll({
      where: {testEventId},
      order: [['id', 'ASC']],
      include: [
        {model: Student, include: [User]}
      ]
    })
    return studentTests;
  }

  async delete(id: string) {
    return this.studentTestRepository.destroy({ where: { id } });
  }
}
