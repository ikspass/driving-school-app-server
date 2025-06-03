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
import { InstructorsService } from 'src/instructors/instructors.service';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class StudentsService {
  
  constructor(
    @InjectModel(Student)
    private studentRepository: typeof Student,
    private categoryService: CategoriesService,
    private instructorService: InstructorsService,
    private groupService: GroupsService,
    @InjectModel(Group)
    private groupModel: typeof Group,
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

  async getStudentById(id: number){
    const student = await this.studentRepository.findByPk(id, {
      include:[
        {model: Instructor, include: [User]},
        {model: User},
        {model: Group}
      ]
    });
    return student;
  }

  // async getStudentGroup(id: number){
  //   const student = await this.studentRepository.findByPk(id, {
  //     include:[
  //       {model: Group}
  //     ]
  //   });
  //   return student ? student.group : {};
  // }

  async getStudentsWithoutGroup(){
    const groupId = null;
    const students = await this.studentRepository.findAll({
      where: {groupId},
      order: [['id', 'ASC']],
      include:[
        {model: Instructor, include: [User]},
        {model: User},
        {model: Group}
      ]
    });
    return students;
  }

  async setStudentGroup(studentId: number, groupId: number){
    const student = await this.studentRepository.findByPk(studentId, {
      include:[
        {model: Group}
      ]
    })
    const group = await this.groupService.getGroupById(groupId);
    if(group && student){
      await student.$set('group', group.id)
      student.group = group;
      await student.save();
    }
    return student ? student : {};    
  }

  async getStudentsByInstructor(instructorId: number){
    const students = await this.studentRepository.findAll({
      where: {instructorId},
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

  async getStudentsByTeacher(teacherId: number) {
    const groups = await this.groupModel.findAll({
      where: { teacherId },
      include: [{ model: Student, include: [{model: User}] }], // Включаем студентов
    });
    console.log('groups: ', groups)
    
    const students = groups.map(group => group.students);
    console.log('students: ', students)
    
    return students;
  }

  async updateStudentStatus(studentId: number, status: string){
    const student = await this.studentRepository.findByPk(studentId);
    if(!student){
      throw new HttpException('Курсант не найден', HttpStatus.NOT_FOUND)
    }

    student.status = status;
    await student.save();

    return student;
  }

  async updateStudentInstructor(id: string, instructorId: number){
    console.log('studentId: ', id)

    const student = await this.studentRepository.findByPk(id);
    if(!student){
      throw new HttpException('Курсант не найден', HttpStatus.NOT_FOUND)
    }
    
    console.log('instructorId: ', instructorId)

    const instructor = await this.instructorService.getInstructorById(instructorId);
    if(instructor){
      await student.$set('instructor', instructor.id);
      student.instructor = instructor
      await student.save()
    }
    return student;
  }

  async delete(id: string) {
    return this.studentRepository.destroy({ where: { id } });
  }
}
