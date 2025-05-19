import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";
import { Message } from "src/messages/messages.model";
import { ScheduleGroup } from "src/schedule_groups/schedule_groups.model";
import { Student } from "src/students/students.model";
import { Teacher } from "src/teachers/teachers.model";
import { TestEvent } from "src/test_events/test_events.model";
import { User } from "src/users/users.model";

interface GroupCreationAttrs{
  name: string,
  categoryValue: string,
  teacherId: number,
  dateOfStart: string,
  scheduleGroupName: string 
}

@Table({tableName: 'groups', updatedAt: false})
export class Group extends Model<Group, GroupCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '17B', description: 'Имя группы'})
  @Column({type: DataType.STRING, allowNull: false})
  declare name: string;

  @ApiProperty({example: '1', description: 'Идентификатор категории'})
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  declare categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({example: '1', description: 'Идентификатор преподавателя'})
  @ForeignKey(() => Teacher)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare teacherId: number;

  @ApiProperty({example: '1', description: 'Количество студентов'})
  @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
  declare studentsCount: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @Column({type: DataType.STRING, allowNull: false})
  declare dateOfStart: string;

  @Column({type: DataType.INTEGER})
  @ForeignKey(() => ScheduleGroup)
  declare scheduleGroupId: number;

  @BelongsTo(() => ScheduleGroup)
  scheduleGroup: ScheduleGroup;

  @Column({type: DataType.STRING, defaultValue: 'Активна', allowNull: false})
  declare status: string;

  @HasMany(() => Student)
  students: Student[];

  @HasMany(() => TestEvent)
  tests: TestEvent[];

  @HasMany(() => Message)
  messages: Message;

  @HasMany(() => LectureEvent)
  lectureLessons: LectureEvent[];
}