import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";
import { Student } from "src/students/students.model";
import { Teacher } from "src/teachers/teachers.model";
import { TestEvent } from "src/test_events/test_events.model";

interface GroupCreationAttrs{
  number: string,
  categoryValue: string,
  teacherId: string,
}

enum GroupStatus {
  ACTIVE = 'Активна',
  GRADUATED = 'Обучение закончено'
}

@Table({tableName: 'groups', updatedAt: false})
export class Group extends Model<Group, GroupCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '17B', description: 'Имя группы'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({example: '1', description: 'Идентификатор категории'})
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER, allowNull: false})
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({example: '1', description: 'Идентификатор преподавателя'})
  @ForeignKey(() => Teacher)
  @Column({type: DataType.INTEGER, allowNull: false})
  teacherId: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @Column({type: DataType.DATEONLY, allowNull: false})
  dateOfStart: string;

  @Column({type: DataType.ENUM(...Object.values(GroupStatus)), defaultValue: GroupStatus.ACTIVE, allowNull: false})
  status: GroupStatus;

  @HasMany(() => Student)
  students: Student[];

  @HasMany(() => TestEvent)
  tests: TestEvent[];

  @HasMany(() => LectureEvent)
  lectureLessons: LectureEvent[];
}