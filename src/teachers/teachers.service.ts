import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teachers.model';
import { QualsService } from 'src/quals/quals.service';
import { Qual } from 'src/quals/quals.model';
import { Group } from 'src/groups/groups.model';
import { Category } from 'src/categories/categories.model';
import { User } from 'src/users/users.model';

@Injectable()
export class TeachersService {

  constructor(@InjectModel(Teacher) 
    private teacherRepository: typeof Teacher,
    private qualService: QualsService
  ){}

  async createTeacher(dto: CreateTeacherDto, quals: Qual[]) {
    const teacher = await this.teacherRepository.create(dto);
    if (quals && quals.length > 0) {
      // Извлекаем только идентификаторы квалификаций
      const qualIds = quals.map(qual => qual.description);
      await teacher.$set('quals', qualIds);
    } else {
      console.warn('Квалификации не найдены для установки');
    }
    return teacher;
  }

  async getAllTeachers() {
    const teachers = await this.teacherRepository.findAll({
      order: [['id', 'ASC']],
      include:[
        {model: Group, include: [{model: Category}]},
        {model: Qual},
        {model: User}
      ]
    });
    return teachers;
  }

  async getTeacherById(id: number) {
    const teacher = await this.teacherRepository.findByPk(id, {
      include:[
        {model: Group, include: [{model: Category}]},
        {model: Qual},
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
