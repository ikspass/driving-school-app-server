import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Student } from "src/students/students.model";
import { Teacher } from "src/teachers/teachers.model";
import { StudentLecture } from "src/student_lectures/student_lectures.model";

interface LectureEventCreationAttrs{
  date: string
  time: string
  teacherId: number
  groupId: number
}

@Table({tableName: 'lecture_events', updatedAt: false, createdAt: false})
export class LectureEvent extends Model<LectureEvent, LectureEventCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '2025-05-01', description: 'Дата'})
  @Column({type: DataType.STRING, allowNull: false})
  declare date: string;

  @ApiProperty({example: '18:00:00', description: 'Время'})
  @Column({type: DataType.STRING, allowNull: false})
  declare time: string;

  @ApiProperty({example: '1', description: 'Идентификатор преподавателя'})
  @ForeignKey(() => Teacher)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare teacherId: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({example: 'В будущем', description: 'Статус темы'})
  @Column({type: DataType.STRING, defaultValue: 'В будущем'})
  declare status: string;

  @BelongsToMany(() => Student, () => StudentLecture)
  students: Student[];

  @HasMany(() => StudentLecture)
  studentLectures: StudentLecture[];
}