import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, DataType, Column, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { DrivingEvent } from "src/driving_events/driving_events.model";
import { Group } from "src/groups/groups.model";
import { Instructor } from "src/instructors/instructors.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";
import { StudentLecture } from "src/lecture_events/student-lectures.model";
import { TestEvent } from "src/test_events/test_events.model";
import { TestResult } from "src/tests/test-results.model";
import { User } from "src/users/users.model";

interface StudentCreationAttrs {
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
}

export enum StudentStatus {
  ACTIVE = 'Активен',
  EXPELLED = 'Отчислен',
  GRADUATED = 'Окончил обучение',
}

@Table({tableName: 'students', updatedAt: false})
export class Student extends Model<Student, StudentCreationAttrs>{
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @BelongsTo(() => User)
  user: User;
  
  @ApiProperty({example: 'Активен', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(StudentStatus)), defaultValue: StudentStatus.ACTIVE, allowNull: false})
  status: StudentStatus;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER})
  instructorId: number;

  @BelongsTo(() => Instructor)
  instructor: Instructor;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER, allowNull: false})
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @BelongsToMany(() => TestEvent, () => TestResult)
  tests: TestEvent[];

  @BelongsToMany(() => LectureEvent, () => StudentLecture)
  lectures: LectureEvent[];

  @HasMany(() => TestResult)
  testResults: TestResult[];

  @HasMany(() => DrivingEvent)
  drivings: DrivingEvent;
}