import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teachers.model';
import { Group } from 'src/groups/groups.model';
import { Category } from 'src/categories/categories.model';
import { User } from 'src/users/users.model';
import { ScheduleGroup } from 'src/schedule_groups/schedule_groups.model';

@Injectable()
export class TeachersService {

  constructor(@InjectModel(Teacher) 
    private teacherRepository: typeof Teacher,
  ){}

  async createTeacher(dto: CreateTeacherDto) {
    const teacher = await this.teacherRepository.create(dto);
    return teacher;
  }

  async getAllTeachers() {
    const teachers = await this.teacherRepository.findAll({
      order: [['id', 'ASC']],
      include:[
        {model: Group, include: [{model: Category}]},
        {model: User}
      ]
    });
    return teachers;
  }

  async getTeacherById(id: number) {
    const teacher = await this.teacherRepository.findByPk(id, {
      include:[
        {model: Group, include: [Category, ScheduleGroup]},
        {model: User}
      ]
    });
    return teacher;
  }

  // async getTeacherGroups(id: number){
  //   const teacher = await this.teacherRepository.findByPk(id, {
  //     include:[
  //       {model: Group, include: [{model: Category}]},
  //     ]
  //   });
  //   return teacher ? teacher.groups : {};
  // }

  async updateTeacherStatus(id: number, status: string){
    const teacher = await this.teacherRepository.findByPk(id);
    if(!teacher){
      throw new HttpException('Преподаватель не найден', HttpStatus.NOT_FOUND)
    }

    teacher.status = status;
    await teacher.save();

    return teacher;
  }

  async deleteTeacher(id: string) {
    return this.teacherRepository.destroy({ where: { id } });
  }
}
