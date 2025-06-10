import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/categories.model';
import { Teacher } from 'src/teachers/teachers.model';
import { User } from 'src/users/users.model';
import { ScheduleGroup } from 'src/schedule_groups/schedule_groups.model';
import { ScheduleGroupsService } from 'src/schedule_groups/schedule_groups.service';
import { Student } from 'src/students/students.model';
import { TestEvent } from 'src/test_events/test_events.model';
import { LectureEvent } from 'src/lecture_events/lecture_events.model';
import { Message } from 'src/messages/messages.model';
import { Instructor } from 'src/instructors/instructors.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private groupRepository: typeof Group,
    @InjectModel(Student)
    private studentRepository: typeof Student,
    @InjectModel(Teacher)
    private teacherRepository: typeof Teacher,
    private categoryService: CategoriesService,
    private scheduleService: ScheduleGroupsService
  ) {}

  async createGroup(dto: CreateGroupDto) {
    const group = await this.groupRepository.create(dto);
    
    const [category, schedule] = await Promise.all([
      this.categoryService.getCategoryByValue(dto.categoryValue),
      this.scheduleService.getScheduleGroupByName(dto.scheduleGroupName),
    ]);

    if (category) {
      await group.$set('category', category.id);
      group.category = category;
    }
    
    if (schedule) {
      await group.$set('scheduleGroup', schedule.id);
      group.scheduleGroup = schedule;
    }

    await group.save();
    return group;
  }

  async getAllGroups() {
    return this.groupRepository.findAll({
      order: [['name', 'ASC']],
      include: [
        { model: Category },
        { model: ScheduleGroup },
        { model: Teacher, include: [User] },
        { model: Student },
        { model: TestEvent },
        { model: LectureEvent },
        { model: Message },
      ],
    });
  }

  async getGroupById(id: number) {
    return this.groupRepository.findByPk(id, {
      include: [
        { model: Category },
        { model: ScheduleGroup },
        { model: Teacher, include: [User] },
        { model: Student, include: [
          {model: User},
          {model: Instructor, include: [User]}
        ]},
        { model: TestEvent },
        { model: LectureEvent },
        { model: Message },
      ],
    });
  }

  async getGroupByStudent(studentId: number) {
    const student = await this.studentRepository.findByPk(studentId, {
      include: [{ model: Group }],
    });
    return student ? student.getDataValue('group') : null;
  }

  async getGroupsByTeacher(teacherId: number) {
    const groups = await this.groupRepository.findAll({
      where: {teacherId},
    });
    return groups
  }

  async updateGroupTeacher(groupId: number, teacherId: number) {
    const group = await this.groupRepository.findByPk(groupId, {
      include: [{ model: Teacher }],
    })
    const teacher = await this.teacherRepository.findByPk(teacherId)
    if(group && teacher){
      await group.$set('teacher', teacher.id);
      group.teacherId = teacher.id;
      await group.save();
    }
    return group ? group : {};
  }

  async deleteGroup(id: string) {
    return this.groupRepository.destroy({ where: { id } });
  }
}