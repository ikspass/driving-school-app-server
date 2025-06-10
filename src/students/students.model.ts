import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, DataType, Column, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { DrivingEvent } from "src/driving_events/driving_events.model";
import { Group } from "src/groups/groups.model";
import { Instructor } from "src/instructors/instructors.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";
import { StudentLecture } from "src/student_lectures/student_lectures.model";
import { StudentTest } from "src/student_tests/student_tests.model";
import { TestEvent } from "src/test_events/test_events.model";
import { User } from "src/users/users.model";

interface StudentCreationAttrs {
  userId: number
  categoryValue: string
}

@Table({tableName: 'students', updatedAt: false, createdAt: false})
export class Student extends Model<Student, StudentCreationAttrs>{
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, unique: true})
  declare userId: number;

  @BelongsTo(() => User)
  user: User;
  
  @ApiProperty({example: 'Активен', description: 'Статус'})
  @Column({type: DataType.STRING, defaultValue: 'Не активен', allowNull: false})
  declare status: string;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER})
  declare instructorId: number | null;

  @BelongsTo(() => Instructor)
  instructor: Instructor;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER})
  declare groupId: number | null;

  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({example: '1', description: 'Идентификатор категории'})
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  declare categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => LectureEvent, () => StudentLecture)
  lectures: StudentLecture[];

  @HasMany(() => StudentTest)
  studentTests: StudentTest[];

  @HasMany(() => StudentLecture)
  studentLectures: StudentLecture[];

  @HasMany(() => DrivingEvent)
  drivings: DrivingEvent;
}