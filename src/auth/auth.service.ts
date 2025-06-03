import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { RolesService } from 'src/roles/roles.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { StudentsService } from 'src/students/students.service';
import { InstructorsService } from 'src/instructors/instructors.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService, 
    private roleService: RolesService,
    private jwtService: JwtService,
    private teacherService: TeachersService,
    private studentService: StudentsService,
    private instructorService: InstructorsService
  ){}

  async adminLogin(body: {password: string}){
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (body.password === adminPassword) {
      const payload = { role: { id: 0, value: 'admin', description: 'Администратор'} }; 
      return {
        token: this.jwtService.sign(payload)
      }
    } else {
      throw new Error('Неверный пароль');
    }
  }

  async login(dto: CreateUserDto & {password: string}){
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto & { password: string }) {
    const candidate = await this.userService.getUserByIdNumber(dto.idNumber);
    
    if (candidate) {
      if (candidate.getDataValue('password') === null) {
        if(dto.password.length >= 8 && dto.password.length <= 20){
          const hashPassword = await bcrypt.hash(dto.password, 5);
          candidate.setDataValue('password', hashPassword);
      
          if (candidate.student) {
            await this.studentService.updateStudentStatus(candidate.student.id, 'Активен');
          } else {
            console.log('Student is undefined');
          }
    
           // Check teacher
          if (candidate.teacher) {
            console.log('Updating teacher status:', candidate.teacher.id);
            await this.teacherService.updateTeacherStatus(candidate.teacher.id, 'Активен');
            console.log('Teacher status updated to Активен');
          } else {
            console.log('Teacher is undefined');
          }
    
          if (candidate.instructor) {
            await this.instructorService.updateInstructorStatus(candidate.instructor.id, 'Активен');
          } else {
            console.log('Instructor is undefined');
          }
    
          await candidate.save();
    
          return this.generateToken(candidate);

        }
        
        throw new HttpException('Пароль должен содержать от 8 до 20 символов', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Пользователь с таким идентификационным номером уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Пользователя с таким идентификационным номером не существует', HttpStatus.BAD_REQUEST);
  }

  private async generateToken(user: User){
    const payload = {idNumber: user.dataValues.idNumber, id: user.dataValues.id, role: user.dataValues.role}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto & {password: string}){
    const user = await this.userService.getUserByIdNumber(dto.idNumber);
    if(user && user.dataValues.password){
      const passwordEquals = await bcrypt.compare(dto.password, user.dataValues.password);
      
      if(passwordEquals){
        return user;
      }
      throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
    throw new UnauthorizedException({message: 'Некорректный идентификационный номер'})
  }
}
