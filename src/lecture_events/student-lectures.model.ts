import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "src/students/students.model";
import { LectureEvent } from "./lecture_events.model";

@Table({tableName: 'student_lectures', updatedAt: false})
export class StudentLecture extends Model<StudentLecture>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор курсанта'})
  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER, allowNull: false})
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ApiProperty({example: '1', description: 'Идентификатор лекции'})
  @ForeignKey(() => LectureEvent)
  @Column({type: DataType.INTEGER, allowNull: false})
  lectureId: number;

  @BelongsTo(() => LectureEvent)
  lecture: LectureEvent;

  @ApiProperty({example: 'true', description: 'Признак посещаемости'})
  @Column({type: DataType.BOOLEAN})
  attended: boolean;
}