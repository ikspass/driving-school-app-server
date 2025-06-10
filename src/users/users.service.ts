import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Student } from 'src/students/students.model';
import { Group } from 'src/groups/groups.model';
import { Instructor } from 'src/instructors/instructors.model';
import { Teacher } from 'src/teachers/teachers.model';
import { Role } from 'src/roles/roles.model';
import { Transport } from 'src/transports/transports.model';
import { Category } from 'src/categories/categories.model';
import { ScheduleGroup } from 'src/schedule_groups/schedule_groups.model';
import { DrivingEvent } from 'src/driving_events/driving_events.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { TestEvent } from 'src/test_events/test_events.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { StudentLecture } from 'src/student_lectures/student_lectures.model';
import { StudentTest } from 'src/student_tests/student_tests.model';
import { Test } from 'src/tests/tests.model';

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

  async updateUser(id: number, dto: UpdateUserDto) {
    console.log('Received dto:', dto); // Логируем полученные данные
  
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  
    // Убедитесь, что dto не undefined
    if (!dto) {
      throw new HttpException('Данные для обновления не переданы', HttpStatus.BAD_REQUEST);
    }
  
    user.idNumber = dto.idNumber;
    user.passportNumber = dto.passportNumber;
    user.fullName = dto.fullName;
    user.dateOfBirth = dto.dateOfBirth;
    user.phoneNumber = dto.phoneNumber;
  
    await user.save();
    return user;
  }

  async getAllUsers(){
    const users = await this.userRepository.findAll({
      order: [['id', 'ASC']],
      include: [
        {model: Student, include: [{model: Group, include: [Category, ScheduleGroup]}, {model: Instructor, include: [{model: Transport, include: [Category]}]}]},
        {model: Teacher, include: [{model: Group, include: [Category, ScheduleGroup, {model: Student, include: [User]}]}]},
        {model: Instructor, include: [{model: Transport, include: [Category]}, {model: Category}]},
        {model: Role},
      ]});
    return users;
  }

  async getUserById(id: string){
    const user = await this.userRepository.findByPk(id, {
      include: [
        {
          model: Student,
          include: [
            { model: Group, include: [{model: Category}, {model: ScheduleGroup}, {model: Teacher, include: [{model: User}]}, {model: Student, include: [User]}] },
            { model: Instructor, include: [{ model: Transport, include: [Category] }, {model: User}] },
            { model: DrivingEvent },
            { model: User },
            { model: StudentLecture, include: [LectureEvent]},
            { model: StudentTest,
              include: [{model: TestEvent, include: [Test]}]}
          ]
        },
        {
          model: Teacher,
          include: [
            { model: Group, include: [
              {model: Category},
              {model: ScheduleGroup},
              {model: Student, include: [
                User, {model: Instructor, include: [User, Transport]}, Group
              ]},
              {model: TestEvent},
              {model: LectureEvent}

            ]},
            {model: LectureEvent},
          ]
        },
        {
          model: Instructor,
          include: [
            { model: Transport, include: [Category] },
            { model: Category },
            { model: Student, include: [User, Group, Category] }
        ]
        },
        { model: Role },
      ]
    });
    return user;
  }

  async getUserByIdNumber(idNumber: string){
    const user = await this.userRepository.findOne({
      where: {idNumber}, 
      include: [
        {model: Student},
        {model: Teacher},
        {model: Instructor},
        {model: Role},
      ]
    });
    return user;
  }

  async deleteUser(id: string) {
    return this.userRepository.destroy({ where: { id } });
  }
}
