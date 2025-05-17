import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Student } from 'src/students/students.model';
import { Group } from 'src/groups/groups.model';
import { Instructor } from 'src/instructors/instructors.model';
import { Teacher } from 'src/teachers/teachers.model';
import { Role } from 'src/roles/roles.model';
import { TeacherQuals } from 'src/teacher_quals/teacher_quals.model';
import { Qual } from 'src/quals/quals.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService
  ){}

  async createUser(dto: CreateUserDto){
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(dto.roleValue);
    if(role){
      await user.$set('role', role.id)
      user.role = role;
      await user.save();
    }
    return user;
  }

  async getAllUsers(){
    const users = await this.userRepository.findAll({
      order: [['id', 'ASC']],
      include: [
        {model: Student, include: [Group, Instructor]},
        {model: Teacher, include: [Qual]},
        {model: Instructor, include: []},
        {model: Role},
      ]});
    return users;
  }

  async getUserById(id: string){
    const user = await this.userRepository.findByPk(id, {
      include: [
        {model: Student, include: [Group, Instructor]},
        {model: Teacher, include: [Qual]},
        {model: Instructor, include: []},
        {model: Role},
      ]
    });
    return user;
  }

  async getUserByIdNumber(idNumber: string){
    const user = await this.userRepository.findOne({
      where: {idNumber}, 
      include: [
        {model: Student, include: [Group, Instructor]},
        {model: Teacher, include: [Qual]},
        {model: Instructor, include: []},
        {model: Role},
      ]
    });
    return user;
  }

  async deleteUser(id: string) {
    return this.userRepository.destroy({ where: { id } });
  }
}
