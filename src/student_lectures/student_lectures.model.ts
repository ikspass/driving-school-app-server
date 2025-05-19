import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "src/students/students.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";

interface StudentLectureCreationAttrs{
  studentId: number
  lectureId: number
}

@Table({tableName: 'student_lectures', updatedAt: false})
export class StudentLecture extends Model<StudentLecture, StudentLectureCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор курсанта'})
  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare studentId: number;

  @BelongsTo(() => Student, {as: 'studentLectureStudentInfo'})
  student: Student;

  @ApiProperty({example: '1', description: 'Идентификатор лекции'})
  @ForeignKey(() => LectureEvent)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare lectureId: number;

  @BelongsTo(() => LectureEvent)
  lecture: LectureEvent;

  @ApiProperty({example: 'true', description: 'Признак посещаемости'})
  @Column({type: DataType.BOOLEAN})
  declare attended: boolean;
}