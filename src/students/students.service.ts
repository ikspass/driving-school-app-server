import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './students.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class StudentsService {
  
  constructor(@InjectModel(Student)
    private studentRepository: typeof Student,
  ){}

  async createStudent(dto: CreateStudentDto){
    const student = await this.studentRepository.create(dto);
    return student;
  }

  async getAllStudents(){
    const students = await this.studentRepository.findAll();
    return students;
  }

  // async getStudentByIdNumber(idNumber: string){
  //   const student = await this.studentRepository.findOne({where: {idNumber}, include: {all: true}})
  //   return student;
  // }

  async updateStudentStatus(studentId: number, dto: UpdateStatusDto){
    const student = await this.studentRepository.findByPk(studentId);
    if(!student){
      throw new HttpException('Курсант не найден', HttpStatus.NOT_FOUND)
    }

    student.status = dto.status;
    await student.save();

    return student;
  }
}
