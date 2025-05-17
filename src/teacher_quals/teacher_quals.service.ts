import { Injectable } from '@nestjs/common';
import { CreateTeacherQualDto } from './dto/create-teacher_qual.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TeacherQuals } from './teacher_quals.model';



@Injectable()
export class TeacherQualsService {
  constructor(
    @InjectModel(TeacherQuals)
    private teacherQualRepository: typeof TeacherQuals,
  ){}

  async createTeacherQual(dto: CreateTeacherQualDto) {
    const teacherQual = await this.teacherQualRepository.create(dto);
    return teacherQual;
  }

  async findAllTeacherQuals() {
    const teacherQuals = await this.teacherQualRepository.findAll({
      order: [['id', 'ASC']],
      include: [
        {all: true}
      ]
    });
    return teacherQuals;  
  }

  async delete(id: string) {
    return this.teacherQualRepository.destroy({ where: { id } });
  }
}
