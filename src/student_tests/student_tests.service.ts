import { Injectable } from '@nestjs/common';
import { CreateStudentTestDto } from './dto/create-student_test.dto';

@Injectable()
export class StudentTestsService {
  create(createStudentTestDto: CreateStudentTestDto) {
    return 'This action adds a new studentTest';
  }

  findAll() {
    return `This action returns all studentTests`;
  }
}
