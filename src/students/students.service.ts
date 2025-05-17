import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './students.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RolesService } from 'src/roles/roles.service';
import { Instructor } from 'src/instructors/instructors.model';
import { User } from 'src/users/users.model';
import { Group } from 'src/groups/groups.model';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class StudentsService {
  
  constructor(@InjectModel(Student)
    private studentRepository: typeof Student,
    private categoryService: CategoriesService
  ){}

  async createStudent(dto: CreateStudentDto){
    const student = await this.studentRepository.create(dto);
    const category = await this.categoryService.getCategoryByValue(dto.categoryValue);
    if(category){
      await student.$set('category', category.id)
      student.category = category;
      await student.save();
    }
    return student;
  }

  async getAllStudents(){
    const students = await this.studentRepository.findAll({
      order: [['id', 'ASC']],
      include:[
        {model: Instructor, include: [User]},
        {model: User},
        {model: Group}
      ]
    });
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

  async delete(id: string) {
    return this.studentRepository.destroy({ where: { id } });
  }
}
