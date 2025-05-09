import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teachers.model';
import { QualsService } from 'src/quals/quals.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class TeachersService {

  constructor(@InjectModel(Teacher) 
    private teacherRepository: typeof Teacher,
    private qualService: QualsService
  ){}

  async createTeacher(dto: CreateTeacherDto) {
    const teacher = await this.teacherRepository.create(dto);
    const qual = await this.qualService.getQualByValue('theory');
    if (qual){
      await teacher.$set('quals', [qual.id])
    }
    return teacher;
  }

  async getAllTeachers() {
    const teachers = await this.teacherRepository.findAll({
      order: [['id', 'ASC']],
      include:{all: true}});
    return teachers;
  }

  async updateStudentStatus(studentId: number, dto: UpdateStatusDto){
    const teacher = await this.teacherRepository.findByPk(studentId);
    if(!teacher){
      throw new HttpException('Курсант не найден', HttpStatus.NOT_FOUND)
    }

    teacher.status = dto.status;
    await teacher.save();

    return teacher;
  }
}
