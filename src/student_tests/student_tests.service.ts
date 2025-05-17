import { Injectable } from '@nestjs/common';
import { CreateStudentTestDto } from './dto/create-student_test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentTest } from './student_tests.model';

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

  async delete(id: string) {
    return this.studentTestRepository.destroy({ where: { id } });
  }
}
